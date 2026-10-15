import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";
import robots from "../src/app/robots.ts";

const require = createRequire(import.meta.url);
const config = require("../next.config.js");

test("admin y checkout permiten leer noindex; las API y rutas privadas siguen bloqueadas", async () => {
  const headers = await config.headers();
  const privatePages = headers.find((rule) => rule.source === "/:section(admin|checkout)/:path*");
  assert.ok(privatePages?.headers.some((header) => header.key === "X-Robots-Tag" && header.value === "noindex, nofollow"));
  for (const rule of robots().rules) {
    assert.ok(!rule.disallow.includes("/admin"));
    assert.ok(!rule.disallow.includes("/checkout"));
    assert.ok(rule.disallow.includes("/api"));
    assert.ok(rule.disallow.includes("/private"));
  }
});
