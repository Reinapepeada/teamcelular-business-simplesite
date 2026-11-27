import assert from "node:assert/strict";
import { test } from "node:test";
import { sanitizeMeasurementProperties } from "./analytics/measurement";
import {
  installReelWhatsappRewrite, reelKeyword, reelKeywordOf, sanitizeReelKeyword, withReelKeyword,
} from "./analytics/reelKeyword";

const DAY = 24 * 60 * 60 * 1000;
const social = { utm_source: "instagram", utm_medium: "social", utm_content: "paciente" };

function browser(t: { after: (fn: () => void) => void }, href: string, stored?: unknown, doNotTrack?: string) {
  const original = Object.getOwnPropertyDescriptor(globalThis, "window");
  t.after(() => {
    if (original) Object.defineProperty(globalThis, "window", original);
    else Reflect.deleteProperty(globalThis, "window");
  });
  const data = new Map<string, string>();
  if (stored) data.set("tc.analytics.attribution.v1", JSON.stringify(stored));
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: {
      location: { href }, navigator: { doNotTrack },
      localStorage: { getItem: (key: string) => data.get(key) ?? null, setItem: (key: string, value: string) => data.set(key, value) },
    },
  });
}

test("la palabra del reel se limpia: sólo A-Z0-9, mayúsculas y 24 caracteres", () => {
  assert.equal(sanitizeReelKeyword("paciente"), "PACIENTE");
  assert.equal(sanitizeReelKeyword("pan-ta lla_2!"), "PANTALLA2");
  assert.equal(sanitizeReelKeyword("a".repeat(40)), "A".repeat(24));
  assert.equal(sanitizeReelKeyword("¡¿ !"), null);
  assert.equal(sanitizeReelKeyword("cámara"), "CAMARA");
  assert.equal(sanitizeReelKeyword("señal"), "SENAL");
  assert.equal(sanitizeReelKeyword(undefined), null);
});

test("reelKeywordOf prefiere la sesión social y cae al first-touch social de hasta 30 días", () => {
  const now = Date.now();
  assert.equal(reelKeywordOf(social, undefined, undefined, now), "PACIENTE");
  const direct = { utm_source: "direct", utm_medium: "none" };
  assert.equal(reelKeywordOf(direct, social, now - 29 * DAY, now), "PACIENTE");
  assert.equal(reelKeywordOf(direct, social, now - 31 * DAY, now), null);
  // utm no social: ni la sesión ni el first-touch aportan palabra.
  const cpc = { utm_source: "google", utm_medium: "cpc", utm_content: "paciente" };
  assert.equal(reelKeywordOf(cpc, cpc, now, now), null);
});

test("reelKeyword sobrevive a la sesión de 30 minutos gracias a first_content", (t) => {
  const now = Date.now();
  const first = { ...social, entry_path: "/" };
  browser(t, "https://teamcelular.com/checkout/exito", { first, session: first, created: now - 2 * DAY, updated: now - 2 * DAY });
  assert.equal(reelKeyword(), "PACIENTE");
});

test("reelKeyword lee la visita actual y respeta Do Not Track", (t) => {
  browser(t, "https://teamcelular.com/?utm_source=tiktok&utm_medium=social&utm_campaign=reels&utm_content=bateria");
  assert.equal(reelKeyword(), "BATERIA");
  browser(t, "https://teamcelular.com/?utm_source=tiktok&utm_medium=social&utm_content=bateria", undefined, "1");
  assert.equal(reelKeyword(), null);
  browser(t, "https://teamcelular.com/?utm_source=newsletter&utm_medium=email&utm_content=bateria");
  assert.equal(reelKeyword(), null);
});

test("withReelKeyword agrega la palabra al texto de WhatsApp sin duplicarla", () => {
  assert.equal(withReelKeyword("https://wa.me/5491151034595?text=Hola%20quiero%20presupuesto", "PACIENTE"),
    "https://wa.me/5491151034595?text=Hola%20quiero%20presupuesto%20(Vengo%20por%20PACIENTE)");
  assert.equal(withReelKeyword("https://wa.me/5491151034595", "PACIENTE"),
    "https://wa.me/5491151034595?text=Hola%20Team%20Celular!%20Vengo%20por%20PACIENTE");
  assert.equal(withReelKeyword("https://api.whatsapp.com/send?phone=5491151034595&text=Hola", "PACIENTE"),
    "https://api.whatsapp.com/send?phone=5491151034595&text=Hola%20(Vengo%20por%20PACIENTE)");
  const already = "https://wa.me/5491151034595?text=Hola%20(Vengo%20por%20PACIENTE)";
  assert.equal(withReelKeyword(already, "PACIENTE"), already);
  assert.equal(withReelKeyword(withReelKeyword("https://wa.me/1?text=Hola", "PACIENTE"), "PACIENTE"),
    "https://wa.me/1?text=Hola%20(Vengo%20por%20PACIENTE)");
  // Sin palabra o fuera de WhatsApp, el enlace queda igual.
  assert.equal(withReelKeyword("https://wa.me/1?text=Hola", null), "https://wa.me/1?text=Hola");
  assert.equal(withReelKeyword("https://teamcelular.com/?text=Hola", "PACIENTE"), "https://teamcelular.com/?text=Hola");
  assert.equal(withReelKeyword("/contacto", "PACIENTE"), "/contacto");
});

test("el listener en captura reescribe el enlace de WhatsApp antes de navegar", () => {
  const listeners: Record<string, { handler: (event: Event) => void; capture: unknown }> = {};
  const doc = { addEventListener: (name: string, handler: (event: Event) => void, capture: unknown) => {
    listeners[name] = { handler, capture };
  } } as unknown as Document;
  let keyword: string | null = "PACIENTE";
  installReelWhatsappRewrite(doc, () => keyword);
  assert.equal(listeners.click.capture, true);
  const click = (href: string) => {
    const anchor = { href };
    listeners.click.handler({ target: { closest: () => anchor } } as unknown as Event);
    return anchor.href;
  };
  assert.equal(click("https://wa.me/1?text=Hola"), "https://wa.me/1?text=Hola%20(Vengo%20por%20PACIENTE)");
  assert.equal(click("https://teamcelular.com/tienda"), "https://teamcelular.com/tienda");
  keyword = null;
  assert.equal(click("https://wa.me/1?text=Hola"), "https://wa.me/1?text=Hola");
});

test("la lista permitida acepta reel_keyword, first_content y first_term, y sigue descartando el resto", () => {
  assert.deepEqual(sanitizeMeasurementProperties({
    reel_keyword: "PACIENTE", first_content: "PACIENTE", first_term: "reels", text: "Hola (Vengo por PACIENTE)",
  }), { reel_keyword: "PACIENTE", first_content: "PACIENTE", first_term: "reels" });
});
