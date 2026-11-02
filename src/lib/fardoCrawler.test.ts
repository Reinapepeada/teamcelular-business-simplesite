import test from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { fardoCrawlerPayload, signFardoEvent, collectFardoBot } from "./fardoCrawler";
import { NextRequest } from "next/server";

test("el collector descarta personas, previews, métodos de escritura y rutas ajenas a la lista pública", () => {
  const bot = "Mozilla/5.0; compatible; GPTBot/1.1; +https://openai.com/gptbot";
  assert.equal(fardoCrawlerPayload(new URL("https://teamcelular.com/"), "GET", "Mozilla/5.0"), null);
  assert.equal(fardoCrawlerPayload(new URL("https://preview.vercel.app/ai"), "GET", bot), null);
  assert.equal(fardoCrawlerPayload(new URL("https://teamcelular.com/ai"), "POST", bot), null);
  for (const path of ["/api/pedidos", "/admin", "/checkout", "/private", "/tienda/cliente-identificable", "/archivo-desconocido.txt"]) {
    assert.equal(fardoCrawlerPayload(new URL(path, "https://teamcelular.com"), "GET", bot), null);
  }
  assert.equal(fardoCrawlerPayload(new URL("https://teamcelular.com/ai"), "GET", "NotGPTBot"), null);
});

test("un bot reconocido sólo transmite su nombre y una ruta pública, sin query ni user-agent crudo", () => {
  const payload = fardoCrawlerPayload(new URL("https://teamcelular.com/ai-feed.jsonld?email=privado@example.test"), "GET", "GPTBot/1.1 email=privado@example.test");
  assert.ok(payload);
  assert.equal(payload.bot_name, "GPTBot");
  assert.equal(payload.user_agent, "GPTBot");
  assert.equal(payload.path, "/ai-feed.jsonld");
  assert.equal(payload.status_code, null, "El proxy no conoce el status final de la página");
  assert.ok(!JSON.stringify(payload).includes("privado"));
  assert.equal(fardoCrawlerPayload(new URL("https://www.teamcelular.com/ai/"), "HEAD", "claude-searchbot/1.0")?.bot_name, "Claude-SearchBot");
});

test("la firma coincide con el contrato HMAC de Fardo sobre timestamp y cuerpo exacto", async () => {
  const secret = "fixture-no-es-una-clave-real";
  const message = '1793630000.{"path":"/ai"}';
  assert.equal(await signFardoEvent(secret, message), createHmac("sha256", secret).update(message).digest("hex"));
});

test("el envío firmado se mantiene en waitUntil y una falla del proveedor no rompe la respuesta", async (context) => {
  const previous = process.env.FARDO_CRAWLER_SECRET;
  process.env.FARDO_CRAWLER_SECRET = "fixture-no-es-una-clave-real";
  const pending: Promise<unknown>[] = [];
  const event = { waitUntil: (promise: Promise<unknown>) => { pending.push(promise); } };
  const request = new NextRequest("https://teamcelular.com/ai?token=privado", {
    headers: { "user-agent": "GPTBot/1.1", cookie: "sesion=privada" },
  });
  const warnings = context.mock.method(console, "warn", () => {});
  let posts = 0;
  context.mock.method(globalThis, "fetch", async (url: string, init: RequestInit) => {
    posts++;
    assert.equal(url, "https://api.platform-fardo.com/api/crawler-events");
    const body = init.body as string;
    assert.ok(!body.includes("privad"));
    const headers = init.headers as Record<string, string>;
    assert.equal(headers["X-Fardo-Signature"], createHmac("sha256", "fixture-no-es-una-clave-real").update(`${headers["X-Fardo-Timestamp"]}.${body}`).digest("hex"));
    assert.ok(init.signal instanceof AbortSignal);
    return new Response(null, { status: 503 });
  });
  try {
    assert.equal(collectFardoBot(request, event), undefined);
    assert.equal(pending.length, 1);
    await pending[0];
    assert.equal(posts, 1);
    assert.equal(warnings.mock.callCount(), 1);
    delete process.env.FARDO_CRAWLER_SECRET;
    collectFardoBot(request, event);
    assert.equal(pending.length, 1, "Sin clave el collector queda inactivo");
  } finally {
    if (previous === undefined) delete process.env.FARDO_CRAWLER_SECRET;
    else process.env.FARDO_CRAWLER_SECRET = previous;
  }
});
