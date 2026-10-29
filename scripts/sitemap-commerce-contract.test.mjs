import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { createServer } from "node:http";
import { once } from "node:events";

const source = readFileSync(
  new URL("../src/app/sitemap.ts", import.meta.url),
  "utf8",
);

test("sitemap uses the published store facets without a development fallback", () => {
  assert.doesNotMatch(source, /fastapi-teamcelular-dev/);
  assert.match(source, /NEXT_PUBLIC_STORE_API_URL/);
  assert.match(source, /new URL\("\/store\/facets"/);
  assert.match(source, /new URL\(`\/store\/products\?page=/);
  assert.match(source, /export const dynamic = "force-dynamic"/);
});

test("sitemap lists every published product URL and excludes invalid slugs", async () => {
  const { default: sitemap } = await import("../src/app/sitemap.ts");
  const originalFetch = globalThis.fetch;
  const requests = [];
  globalThis.fetch = async (url) => {
    const path = new URL(url).pathname;
    const page = Number(new URL(url).searchParams.get("page"));
    requests.push(`${path}?page=${page}`);
    const data = path === "/store/facets"
      ? { categories: ["Cargadores"] }
      : page === 1
        ? { items: [
            ...Array.from({ length: 59 }, (_, i) => ({ slug: `producto-${i + 1}` })),
            { slug: "bad/slug" },
          ], total: 61 }
        : { items: [{ slug: "cw-45-cargador" }], total: 61 };
    return new Response(JSON.stringify(data), { status: 200 });
  };
  try {
    const entries = await sitemap();
    assert.ok(entries.some((entry) => entry.url === "https://teamcelular.com/tienda/cw-45-cargador"));
    assert.ok(entries.some((entry) => entry.url === "https://teamcelular.com/tienda/categoria/cargadores"));
    assert.ok(!entries.some((entry) => entry.url.includes("bad/slug")));
    assert.ok(requests.includes("/store/products?page=2"));
  } finally {
    globalThis.fetch = originalFetch;
  }
});
for (const blockedResource of ["facets", "products", "second-page"]) {
  for (const stage of ["headers", "body"]) {
    test(`sitemap limita ${stage} de ${blockedResource} y recupera el catálogo completo`, async (t) => {
      const { default: sitemap } = await import("../src/app/sitemap.ts");
      let blocked = true;
      const server = createServer((request, response) => {
        const url = new URL(request.url, "http://fixture.test");
        const facet = url.pathname === "/store/facets";
        const page = Number(url.searchParams.get("page"));
        const target = blockedResource === "facets" ? facet
          : blockedResource === "products" ? !facet : !facet && page === 2;
        if (blocked && target) {
          if (stage === "body") {
            response.writeHead(200, { "Content-Type": "application/json" });
            response.flushHeaders();
            response.write('{"items":');
          }
          return;
        }
        response.setHeader("Content-Type", "application/json");
        response.end(JSON.stringify(facet ? { categories: ["CABLE"] } : {
          items: page === 1
            ? Array.from({ length: 60 }, (_, i) => ({ slug: `producto-${i + 1}` }))
            : [{ slug: "producto-61" }],
          total: 61,
        }));
      });
      server.listen(0, "127.0.0.1");
      await once(server, "listening");
      const nativeFetch = globalThis.fetch;
      const timeout = AbortSignal.timeout.bind(AbortSignal);
      const deadlines = [];
      t.mock.method(AbortSignal, "timeout", (milliseconds) => {
        deadlines.push(milliseconds);
        return timeout(150);
      });
      t.mock.method(console, "error", () => {});
      t.mock.method(globalThis, "fetch", (input, init) => {
        const url = new URL(input);
        return nativeFetch(`http://127.0.0.1:${server.address().port}${url.pathname}${url.search}`, init);
      });
      try {
        const started = Date.now();
        await assert.rejects(sitemap(), (error) => ["AbortError", "TimeoutError"].includes(error.name));
        assert.ok(Date.now() - started < 1_500, "el sitemap debe fallar antes del límite de la función");
        blocked = false;
        const entries = await sitemap();
        const products = entries.filter((entry) => /\/tienda\/producto-\d+$/.test(entry.url));
        assert.equal(products.length, 61, "la siguiente petición debe recuperar todas las páginas");
        assert.ok(entries.some((entry) => entry.url.endsWith("/tienda/categoria/cable")));
        assert.deepEqual(deadlines, [8_000, 8_000], "cada petición tiene su propio plazo, sin reiniciarlo por página");
      } finally {
        server.closeAllConnections();
        await new Promise((resolve) => server.close(resolve));
      }
    });
  }
}

test("sitemap comparte el plazo entre páginas lentas y conserva una lectura sana posterior", async (t) => {
  const { default: sitemap } = await import("../src/app/sitemap.ts");
  let slow = true;
  const server = createServer((request, response) => {
    const url = new URL(request.url, "http://fixture.test");
    const facet = url.pathname === "/store/facets";
    const page = Number(url.searchParams.get("page"));
    const send = () => {
      if (response.destroyed) return;
      response.setHeader("Content-Type", "application/json");
      response.end(JSON.stringify(facet ? { categories: ["CABLE"] } : {
        items: page === 1
          ? Array.from({ length: 60 }, (_, i) => ({ slug: `producto-${i + 1}` }))
          : [{ slug: "producto-61" }],
        total: 61,
      }));
    };
    // Cada página cabe en120ms; juntas no. Un timeout nuevo por página sería incorrecto.
    if (slow && !facet) setTimeout(send, page === 1 ? 70 : 100);
    else send();
  });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const nativeFetch = globalThis.fetch;
  const timeout = AbortSignal.timeout.bind(AbortSignal);
  t.mock.method(AbortSignal, "timeout", () => timeout(120));
  t.mock.method(console, "error", () => {});
  t.mock.method(globalThis, "fetch", (input, init) => {
    const url = new URL(input);
    return nativeFetch(`http://127.0.0.1:${server.address().port}${url.pathname}${url.search}`, init);
  });
  try {
    await assert.rejects(sitemap(), (error) => ["AbortError", "TimeoutError"].includes(error.name));
    slow = false;
    const entries = await sitemap();
    assert.ok(entries.some((entry) => entry.url.endsWith("/tienda/producto-61")));
  } finally {
    server.closeAllConnections();
    await new Promise((resolve) => server.close(resolve));
  }
});

test("sitemap has no product URL when the published catalog is empty", async () => {
  const { default: sitemap } = await import("../src/app/sitemap.ts");
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => new Response(JSON.stringify(
    new URL(url).pathname === "/store/facets"
      ? { categories: [] }
      : { items: [], total: 0 }
  ), { status: 200 });
  try {
    const entries = await sitemap();
    assert.ok(!entries.some((entry) => /\/tienda\/[^/]+$/.test(entry.url)));
  } finally {
    globalThis.fetch = originalFetch;
  }
});

for (const failure of ["facets", "products", "second-page", "invalid-facets"]) {
  test(`sitemap no publica una lista incompleta ante falla de ${failure}`, async (t) => {
    const { default: sitemap } = await import("../src/app/sitemap.ts");
    t.mock.method(console, "error", () => {});
    t.mock.method(globalThis, "fetch", async (url) => {
      const parsed = new URL(url);
      const facet = parsed.pathname === "/store/facets";
      if (facet && failure === "invalid-facets") return Response.json({});
      if (facet && failure === "facets" || !facet && failure === "products" || parsed.searchParams.get("page") === "2" && failure === "second-page") {
        return new Response("", { status: 503 });
      }
      return Response.json(facet ? { categories: ["CABLE"] } : {
        items: Array.from({ length: 60 }, (_, i) => ({ slug: `producto-${i}` })), total: 61,
      });
    });
    await assert.rejects(sitemap());
  });
}

test("sitemap omits unknown modification dates and matches the HTML language alternatives", async () => {
  const { default: sitemap } = await import("../src/app/sitemap.ts");
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => new Response(JSON.stringify(
    new URL(url).pathname === "/store/facets"
      ? { categories: ["Cargadores"] }
      : { items: [{ slug: "cargador-usb-c" }], total: 1 }
  ), { status: 200 });
  try {
    const entries = await sitemap();
    assert.ok(entries.every((entry) => entry.lastModified === undefined));
    const expectedLanguages = {
      "es-AR": "https://teamcelular.com",
      en: "https://teamcelular.com/en/phone-repair-buenos-aires",
      "x-default": "https://teamcelular.com",
    };
    for (const url of [expectedLanguages["es-AR"], expectedLanguages.en]) {
      const entry = entries.find((item) => item.url === url);
      assert.deepEqual(entry?.alternates?.languages, expectedLanguages);
    }
    for (const path of ["reparaciones", "guias", "tienda/categoria/cargadores", "tienda/cargador-usb-c"]) {
      const url = `https://teamcelular.com/${path}`;
      const entry = entries.find((item) => item.url === url);
      assert.deepEqual(entry?.alternates?.languages, { "es-AR": url });
    }
    assert.deepEqual(await sitemap(), entries);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
