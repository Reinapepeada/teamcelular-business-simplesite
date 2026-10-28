import type { CartItem } from "@/store/cartStore";
import type { StoreOrder, StoreOrderStatus } from "@/lib/storeApi";
import { vueltaMostrable } from "@/lib/vueltaDelPago";
import { measure } from "./posthog";
import { sanitizeMeasurementProperties } from "./measurement";

type StorageLike = Pick<Storage, "getItem" | "setItem">;

export function cartMeasurement(cart: CartItem[]) {
  return {
    currency: "ARS", value: cart.reduce((sum, item) => sum + item.product.retail_price * item.quantity, 0),
    item_count: cart.reduce((sum, item) => sum + item.quantity, 0),
    items: cart.map(item => ({ item_id: item.storeSlug || `product-${item.product.id}`,
      item_name: item.product.name, price: item.product.retail_price, quantity: item.quantity })),
  };
}

export function measureCartMutation(before: CartItem[], after: CartItem[]) {
  const keys = new Set([...before, ...after].map(item => item.cartKey));
  for (const key of keys) {
    const old = before.find(item => item.cartKey === key);
    const current = after.find(item => item.cartKey === key);
    const delta = (current?.quantity ?? 0) - (old?.quantity ?? 0);
    const item = current || old;
    if (delta && item) measure(delta > 0 ? "add_to_cart" : "remove_from_cart", cartMeasurement([{ ...item, quantity: Math.abs(delta) }]));
  }
}

export function rememberAnalyticsOrder(order: StoreOrder, storage?: StorageLike) {
  try {
    const target = storage || (typeof window === "undefined" ? undefined : window.localStorage);
    if (!target || !order.commerce_key) return;
    const safe = sanitizeMeasurementProperties({ currency: order.currency, shipping: order.shipping_amount,
      items: order.items?.map(item => ({ item_id: `product-${item.product_id}`, item_name: item.current_product_name,
        price: item.unit_price, quantity: item.quantity })) });
    target.setItem(`tc.analytics.order.${order.commerce_key}`, JSON.stringify({ ...safe, saved_at: Date.now() }));
  } catch { /* El pedido no depende del almacenamiento analítico. */ }
}

/** Pago confirmado por la API; nunca se interpreta status=approved de la URL. */
export async function measureConfirmedPayment(status: StoreOrderStatus, storage: StorageLike,
  send: typeof measure = measure, digest = async (value: string) => {
    const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
    return Array.from(new Uint8Array(bytes), byte => byte.toString(16).padStart(2, "0")).join("");
  }) {
  if (vueltaMostrable(status).desenlace !== "pagado" || !Number.isFinite(status.total_amount) || status.total_amount < 0) return false;
  try {
    const id = `tc_${await digest(`tc.purchase:${status.commerce_key}`)}`;
    const run = () => {
      try {
      const seen: unknown = JSON.parse(storage.getItem("tc.analytics.purchases.v1") || "[]");
      const entries = Array.isArray(seen) ? seen.filter(value => typeof value === "string") : [];
      if (entries.includes(id)) return false;
      const raw = storage.getItem(`tc.analytics.order.${status.commerce_key}`);
      const saved = raw ? JSON.parse(raw) : null;
      const snapshot = saved && Date.now() - saved.saved_at < 90 * 24 * 60 * 60 * 1000 ? saved : null;
      const shipping = Number.isFinite(snapshot?.shipping) && snapshot.shipping >= 0 && snapshot.shipping <= status.total_amount ? snapshot.shipping : undefined;
      storage.setItem("tc.analytics.purchases.v1", JSON.stringify([...entries, id].slice(-200)));
      send("purchase", sanitizeMeasurementProperties({ transaction_id: id, currency: status.currency, order_total: status.total_amount,
        ...(shipping !== undefined ? { shipping, value: status.total_amount - shipping } : {}),
        ...(snapshot?.items ? { items: snapshot.items } : {}), measurement_source: "server_confirmed_browser_return" }));
      return true;
      } catch { return false; }
    };
    return typeof navigator !== "undefined" && navigator.locks
      ? await navigator.locks.request("tc.analytics.purchase", run) : run();
  } catch { return false; }
}
