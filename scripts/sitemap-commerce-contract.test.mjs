import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

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
