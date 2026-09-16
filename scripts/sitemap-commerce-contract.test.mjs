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
  assert.match(source, /export const dynamic = "force-dynamic"/);
});
