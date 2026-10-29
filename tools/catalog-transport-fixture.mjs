import assert from "node:assert/strict";
import { channel } from "node:diagnostics_channel";
import { createServer } from "node:http";
import { writeFile } from "node:fs/promises";
import { createCatalogTraceObserver, catalogTraceChannels, installCatalogTransportTrace } from "../src/lib/catalogTransportTrace.ts";

const records = [], shapes = {}, counts = {};
const observe = createCatalogTraceObserver(record => records.push(record));
const requests = new WeakMap();
const callbacks = new Map();
for (const name of catalogTraceChannels) {
  const callback = value => {
    counts[name] = (counts[name] ?? 0) + 1;
    shapes[name] = Object.keys(value).sort();
    if (value.request) {
      if (!requests.has(value.request)) requests.set(value.request, { method: value.request.method, origin: "https://api.beescend.com", path: value.request.path });
      observe(name, { request: requests.get(value.request), response: value.response && { statusCode: value.response.statusCode }, error: value.error && { code: value.error.code }, connectParams: value.connectParams, socket: value.socket });
    } else observe(name, value);
  };
  callbacks.set(name, callback);
  channel(name).subscribe(callback);
}
const server = createServer((request, response) => {
  response.setHeader("Connection", "close");
  setTimeout(() => {
    response.writeHead(200, { "content-type": "application/json" });
    response.write("{");
    setTimeout(() => response.end("}"), 90);
  }, 80);
});
await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
const base = `http://127.0.0.1:${server.address().port}`;
try {
  await (await fetch(`${base}/store/facets?secret=never-log`, { headers: { cookie: "secret-cookie" } })).text();
  await assert.rejects(fetch(`${base}/store/products/private-slug?email=private`, { signal: AbortSignal.timeout(25) }));
  await (await fetch(`${base}/store/orders`, { method: "POST", body: "private-body" })).text();
  server.closeAllConnections();
  await new Promise(resolve => server.close(resolve));
  await assert.rejects(fetch(`${base}/store/facets`));
} finally {
  server.closeAllConnections();
  if (server.listening) await new Promise(resolve => server.close(resolve));
  for (const [name, callback] of callbacks) channel(name).unsubscribe(callback);
}
const stages = records.filter(r => r.resource === "/store/facets");
await writeFile(process.argv[2], JSON.stringify({ passed: false, counts, shapes, records, note: "Pre-assertion sanitized evidence; replaced on full fixture success." }, null, 2));
for (const name of ["create", "connect", "sendHeaders", "headers", "body"]) assert.ok(stages.some(r => r.stage === name), name);
const headers = stages.find(r => r.stage === "headers"), body = stages.find(r => r.stage === "body"), sent = stages.find(r => r.stage === "sendHeaders");
assert.ok(headers.elapsed_ms - sent.elapsed_ms >= 60);
assert.ok(body.elapsed_ms - headers.elapsed_ms >= 60);
assert.ok(records.some(r => r.resource === "/store/products/{slug}" && r.stage === "error"));
assert.ok(counts["undici:client:connectError"] > 0);
assert.ok(!records.some(r => r.resource.includes("orders")));
const text = JSON.stringify(records);
for (const value of ["secret", "cookie", "email", "private", "127.0.0.1", "headers\":", "body\":"]) assert.ok(!text.includes(value), value);
for (const method of ["POST", "PUT", "DELETE"]) observe("undici:request:create", { request: { method, origin: "https://api.beescend.com", path: "/store/products" } });
const before = records.length;
for (const origin of ["https://example.test", "http://api.beescend.com", "https://api.beescend.com.attacker.test", "https://secret@api.beescend.com"]) observe("undici:request:create", { request: { method: "GET", origin, path: "/store/facets" } });
assert.equal(records.length, before);
assert.doesNotThrow(() => createCatalogTraceObserver(() => { throw Error("sink failure"); })("undici:request:create", { request: { method: "GET", origin: "https://api.beescend.com", path: "/store/facets" } }));
assert.doesNotThrow(() => observe("undici:request:create", { request: { method: "GET", origin: "invalid", path: "/store/facets" } }));
const oldEnv = { vercel: process.env.VERCEL_ENV, runtime: process.env.NEXT_RUNTIME };
for (const [vercel, runtime] of [["production", "nodejs"], ["preview", "edge"], ["development", "nodejs"]]) {
  process.env.VERCEL_ENV = vercel; process.env.NEXT_RUNTIME = runtime;
  installCatalogTransportTrace();
  for (const name of catalogTraceChannels) assert.equal(channel(name).hasSubscribers, false);
}
if (oldEnv.vercel === undefined) delete process.env.VERCEL_ENV; else process.env.VERCEL_ENV = oldEnv.vercel;
if (oldEnv.runtime === undefined) delete process.env.NEXT_RUNTIME; else process.env.NEXT_RUNTIME = oldEnv.runtime;
const result = { passed: true, runtime: { node: process.version, undici: process.versions.undici }, channels_observed: counts, message_shape_keys_only: shapes, records, privacy: "No headers,cookies,queries,bodies,identities,IPs or raw errors retained. Runtime gate production/edge/development rejects subscription.", limits: "Connection completion is emitted only after sendHeaders associates its socket with an allowed request; unassociated connectError is omitted. No DNS/TLS subphase inferred." };
await writeFile(process.argv[2], JSON.stringify(result, null, 2));
console.log(JSON.stringify({ passed: true, runtime: result.runtime, stages: records.map(r => r.stage) }));
