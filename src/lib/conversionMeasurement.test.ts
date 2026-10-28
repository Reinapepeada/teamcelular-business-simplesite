import assert from "node:assert/strict";
import { test } from "node:test";
import { acquisition } from "./analytics/attribution";
import { sanitizeMeasurementProperties } from "./analytics/measurement";
import { measureConfirmedPayment, rememberAnalyticsOrder } from "./analytics/storeMeasurement";
import type { StoreOrder, StoreOrderStatus } from "./storeApi";

function storage() {
  const entries = new Map<string, string>();
  return { getItem: (key: string) => entries.get(key) ?? null,
    setItem: (key: string, value: string) => { entries.set(key, value); } };
}
const paid = { commerce_key: "reference-not-a-token", paid: true, status: "paid", payment_result: "approved",
  currency: "ARS", total_amount: 120, fulfillment_status: "pending", tracking_ref: null } satisfies StoreOrderStatus;

test("la atribución conserva campañas útiles y no conserva contactos, búsqueda libre ni el texto de WhatsApp", () => {
  const result = acquisition("https://teamcelular.com/tienda?utm_source=google&utm_medium=organic&utm_campaign=gbp_recoleta&email=private@example.test&search=private&text=secret", "https://www.google.com/search?q=private");
  assert.equal(result.acquisition_channel, "organic_search");
  assert.equal(result.utm_campaign, "gbp_recoleta");
  assert.equal(result.referrer_domain, "www.google.com");
  assert.equal(result.entry_path, "/tienda");
  assert.ok(!JSON.stringify(result).includes("private"));
  assert.equal(acquisition("https://teamcelular.com/?utm_campaign=private@example.test", "").utm_campaign, undefined);
  assert.equal(acquisition("https://teamcelular.com/", "https://chatgpt.com/").acquisition_channel, "ai_referral");
  assert.equal(acquisition("https://teamcelular.com/checkout/exito", "https://www.mercadopago.com.ar/").utm_source, "direct");
});

test("el contrato rechaza datos personales y objetos anidados ajenos también dentro de los productos", () => {
  assert.deepEqual(sanitizeMeasurementProperties({
    email: "private@example.test", destination: "https://wa.me/123?text=secret", model: "free text",
    cta_name: "home_hero", currency: "ARS", value: 100, order_total: Infinity,
    utm_campaign: "5491155551111", transaction_id: "secret-token", items: [
      { item_id: "cable-usb", quantity: 2, price: 50, customer: { email: "private@example.test" } },
      { item_id: "private@example.test", price: 100 },
    ],
  }), { cta_name: "home_hero", currency: "ARS", value: 100, items: [{ item_id: "cable-usb", quantity: 2, price: 50 }] });
});

test("no se registra compra por una redirección, pago pendiente, rechazado o revertido", async () => {
  const sent: unknown[] = [];
  for (const status of [
    { ...paid, paid: false, status: "awaiting_payment", payment_result: "pending" },
    { ...paid, paid: false, status: "awaiting_payment", payment_result: "approved" },
    { ...paid, paid: false, status: "awaiting_payment", payment_result: "rejected" },
    { ...paid, status: "payment_reversed", payment_result: "reversed" },
  ]) {
    assert.equal(await measureConfirmedPayment(status as StoreOrderStatus, storage(), (...args) => { sent.push(args); }), false);
  }
  assert.equal(sent.length, 0);
});

test("la compra usa el total del servidor, separa envío, oculta la referencia y evita duplicados", async () => {
  const saved = storage();
  rememberAnalyticsOrder({ ...paid, shipping_amount: 20, subtotal_amount: 100,
    customer_email: "private@example.test", customer_phone: "private-phone", access_token: "secret-token",
    items: [{ product_id: 5, unit_price: 50, quantity: 2, current_product_name: "Cable" }],
  } as StoreOrder, saved);
  assert.ok(!saved.getItem(`tc.analytics.order.${paid.commerce_key}`)!.includes("private"));
  const sent: Array<[string, Record<string, unknown> | undefined]> = [];
  const send = (name: string, props?: Record<string, unknown>) => { sent.push([name, props]); };
  assert.equal(await measureConfirmedPayment(paid, saved, send), true);
  assert.equal(await measureConfirmedPayment(paid, saved, send), false);
  assert.equal(sent.length, 1);
  assert.equal(sent[0][0], "purchase");
  assert.equal(sent[0][1]?.value, 100);
  assert.equal(sent[0][1]?.shipping, 20);
  assert.equal(sent[0][1]?.order_total, 120);
  assert.match(String(sent[0][1]?.transaction_id), /^tc_[a-f0-9]{64}$/);
  assert.ok(!JSON.stringify(sent).includes(paid.commerce_key));
  assert.ok(!JSON.stringify(sent).includes("private"));
});

test("sin snapshot no se inventa ingreso neto ni productos y un fallo analítico no afecta el pago", async () => {
  const sent: Record<string, unknown>[] = [];
  await measureConfirmedPayment(paid, storage(), (_name, props) => { sent.push(props!); });
  assert.equal(sent[0].order_total, 120);
  assert.equal(sent[0].value, undefined);
  assert.equal(sent[0].items, undefined);
  assert.equal(await measureConfirmedPayment(paid, { getItem: () => { throw new Error("storage denied"); }, setItem: () => undefined }), false);
});

test("un snapshot alterado no aumenta el ingreso ni reenvía propiedades ajenas", async () => {
  const saved = storage();
  saved.setItem(`tc.analytics.order.${paid.commerce_key}`, JSON.stringify({ saved_at: Date.now(), shipping: -50,
    items: [{ item_id: "product-5", email: "private@example.test", price: 50, quantity: 2 }] }));
  const sent: Record<string, unknown>[] = [];
  await measureConfirmedPayment(paid, saved, (_name, props) => { sent.push(props!); });
  assert.equal(sent[0].value, undefined);
  assert.equal(sent[0].shipping, undefined);
  assert.equal(sent[0].order_total, 120);
  assert.ok(!JSON.stringify(sent).includes("private"));
});
