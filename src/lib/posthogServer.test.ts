import assert from "node:assert/strict";
import { createServer } from "node:http";
import { gunzipSync } from "node:zlib";
import { test } from "node:test";
import { capturePostHogRequestError } from "./analytics/posthogServer";

test("el SDK vacía errores de servidor sin datos privados y excluye previews, DNT y rutas privadas", async () => {
  const batches: Array<{ batch: Array<{ event: string; properties: Record<string, unknown> }> }> = [];
  const server = createServer(async (request, response) => {
    const chunks = [];
    for await (const chunk of request) chunks.push(chunk);
    const body = Buffer.concat(chunks);
    batches.push(JSON.parse((request.headers["content-encoding"] === "gzip" ? gunzipSync(body) : body).toString()));
    response.writeHead(200, { "Content-Type": "application/json" }).end('{"status":"ok"}');
  });
  await new Promise<void>(resolve => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(address && typeof address !== "string");
  const values = {
    VERCEL_ENV: "production", NEXT_PUBLIC_BASE_URL: "https://teamcelular.com",
    NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN: "phc_test_only", NEXT_PUBLIC_POSTHOG_HOST: `http://127.0.0.1:${address.port}`,
  };
  const previous = Object.fromEntries(Object.keys(values).map(key => [key, process.env[key]]));
  Object.assign(process.env, values);
  try {
    const error = new TypeError("private@example.test");
    error.stack = "TypeError: private@example.test\n    at purchase (/var/task/.next/server/app/page.js:12:34)";
    await capturePostHogRequestError(error, "/tienda?email=private@example.test");
    assert.equal(batches.length, 1);
    const event = batches[0].batch[0];
    assert.equal(event.event, "$exception");
    assert.equal(event.properties.$current_url, "https://teamcelular.com/tienda");
    assert.equal(event.properties.$geoip_disable, true);
    assert.equal(event.properties.$process_person_profile, false);
    assert.equal(JSON.stringify(batches).includes("private"), false);
    assert.match(JSON.stringify(event.properties.$exception_list), /\.next\/server\/app\/page\.js/);

    for (const path of ["/admin/leads", "/checkout/exito?token=private", "/api/store/orders"]) {
      await capturePostHogRequestError(error, path);
    }
    await capturePostHogRequestError(error, "/tienda", true);
    process.env.VERCEL_ENV = "preview";
    await capturePostHogRequestError(error, "/tienda");
    process.env.VERCEL_ENV = "production";
    process.env.NEXT_PUBLIC_BASE_URL = "https://preview.vercel.app";
    await capturePostHogRequestError(error, "/tienda");
    assert.equal(batches.length, 1);
    process.env.NEXT_PUBLIC_BASE_URL = values.NEXT_PUBLIC_BASE_URL;
    process.env.NEXT_PUBLIC_POSTHOG_HOST = "http://127.0.0.1:1";
    await assert.doesNotReject(capturePostHogRequestError(error, "/tienda"));
  } finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key]; else process.env[key] = value;
    }
    await new Promise<void>(resolve => server.close(() => resolve()));
  }
});
