import assert from "node:assert/strict";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import { GA4_INIT_SCRIPT, isGa4ProductionHost } from "./analytics/ga4";
import { recordLeadInteraction } from "./analytics/leadInteractions";

function boot(hostname: string) {
  const scripts: { src?: string }[] = [];
  const listeners: Record<string, (event: unknown) => void> = {};
  const browser = {
    dataLayer: [] as Array<IArguments>,
    gtag: undefined as undefined | ((...args: unknown[]) => void),
    // Sin requestIdleCallback el script usa setTimeout: acá corre en el acto.
    setTimeout: (callback: () => void) => callback(),
    addEventListener: (name: string, handler: (event: unknown) => void) => { listeners[`window:${name}`] = handler; },
  };
  runInNewContext(GA4_INIT_SCRIPT, {
    window: browser,
    location: { hostname, pathname: "/guias/reparacion-iphone-buenos-aires" },
    document: {
      readyState: "loading",
      createElement: () => ({}),
      head: { appendChild: (script: { src?: string }) => scripts.push(script) },
      addEventListener: (name: string, handler: (event: unknown) => void) => { listeners[name] = handler; },
    },
    URL,
  });
  return { scripts, listeners, browser };
}

test("GA4 no carga ni crea eventos en local, previews o dominios parecidos", () => {
  for (const hostname of ["localhost", "127.0.0.1", "192.168.1.18", "preview.vercel.app", "teamcelular.com.evil.test"]) {
    assert.equal(isGa4ProductionHost(hostname), false);
    const result = boot(hostname);
    assert.equal(result.scripts.length, 0);
    assert.equal(result.browser.dataLayer.length, 0);
    assert.equal(result.browser.gtag, undefined);
    assert.equal(result.listeners.click, undefined);
    assert.equal(result.listeners["window:load"], undefined);
  }
});

test("GA4 conserva page view automático y pide gtag.js recién con la página cargada", () => {
  for (const hostname of ["teamcelular.com", "www.teamcelular.com"]) {
    assert.equal(isGa4ProductionHost(hostname), true);
    const result = boot(hostname);
    assert.equal(result.scripts.length, 0);
    assert.deepEqual(Array.from(result.browser.dataLayer[1]), ["config", "G-1S64KMRF99"]);
    result.listeners["window:load"]({});
    assert.equal(result.scripts.length, 1);
    assert.equal(result.scripts[0].src, "https://www.googletagmanager.com/gtag/js?id=G-1S64KMRF99");
  }
});

test("un lead antes de la carga pide gtag.js en el acto y una sola vez; una vista no", () => {
  const result = boot("teamcelular.com");
  result.browser.gtag!("event", "cta_view", {});
  result.browser.gtag!("event", "page_engagement", {});
  assert.equal(result.scripts.length, 0);
  result.browser.gtag!("event", "lead_form_submit", {});
  assert.equal(result.scripts.length, 1);
  result.browser.gtag!("event", "branch_whatsapp_redirect", {});
  result.listeners["window:load"]({});
  assert.equal(result.scripts.length, 1);
  assert.equal(result.browser.dataLayer.length, 6);
});

test("los enlaces directos a WhatsApp identifican la sucursal por destino", () => {
  const result = boot("teamcelular.com");
  for (const [phone, branch] of [["5491151034595", "recoleta"], ["5491131739099", "belgrano"]]) {
    const anchor = { href: `https://wa.me/${phone}?text=Consulta`, closest: () => null, getAttribute: () => null };
    result.listeners.click({ target: { closest: () => anchor } });
    const event = Array.from(result.browser.dataLayer.at(-1)!);
    assert.equal(event[1], "whatsapp_click");
    assert.equal((event[2] as Record<string, unknown>).preferred_branch, branch);
  }
});

test("el enlace nativo del selector conserva su evento sin sumar whatsapp_click genérico", () => {
  const result = boot("teamcelular.com");
  const before = result.browser.dataLayer.length;
  const anchor = {
    href: "https://wa.me/5491131739099?text=Consulta",
    getAttribute: (name: string) => name === "data-whatsapp-tracked" ? "true" : null,
  };
  result.listeners.click({ target: { closest: () => anchor } });
  assert.equal(result.browser.dataLayer.length, before);
});

test("selector y formulario envían una sucursal explícita una sola vez y no envían a GA4 en local", (t) => {
  const originals = Object.fromEntries(["window", "document", "navigator"].map((key) => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  t.after(() => {
    for (const [key, descriptor] of Object.entries(originals)) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else Reflect.deleteProperty(globalThis, key);
    }
  });
  const calls: unknown[][] = [];
  const location = { hostname: "teamcelular.com", pathname: "/presupuesto-reparacion", search: "" };
  Object.defineProperty(globalThis, "window", { configurable: true, value: { location, gtag: (...args: unknown[]) => calls.push(args) } });
  Object.defineProperty(globalThis, "document", { configurable: true, value: { title: "Presupuesto", referrer: "" } });
  Object.defineProperty(globalThis, "navigator", { configurable: true, value: { sendBeacon: () => true } });
  for (const preferredBranch of ["recoleta", "belgrano"] as const) {
    for (const eventName of ["branch_whatsapp_redirect", "lead_form_submit"]) {
      calls.length = 0;
      recordLeadInteraction({ eventName, ctaName: "test", ctaLocation: "test", ctaVariant: "whatsapp", preferredBranch, formVersion: "v3" });
      assert.equal(calls.length, 1);
      assert.equal((calls[0][2] as Record<string, unknown>).preferred_branch, preferredBranch);
      assert.equal((calls[0][2] as Record<string, unknown>).form_version, "v3");
    }
  }
  for (const hostname of ["localhost", "127.0.0.1", "preview.vercel.app"]) {
    location.hostname = hostname;
    calls.length = 0;
    recordLeadInteraction({ eventName: "lead_form_submit", ctaName: "test", ctaLocation: "test", ctaVariant: "whatsapp", preferredBranch: "belgrano" });
    assert.equal(calls.length, 0);
  }
});
