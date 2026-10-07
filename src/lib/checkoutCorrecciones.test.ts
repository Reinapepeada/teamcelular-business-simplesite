import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { parseStoreError, StoreApiError, type StoreOrderStatus } from "./storeApi.ts";
import { armarPedido, crearPedidoConRecuperacion, ErrorDeCompra, problemaDeCheckout, recuperarIntento, rechazoDefinitivo } from "./checkoutFlow.ts";
import { intentoDeCheckout, prepararIntento } from "./checkoutKey.ts";
import { vencimientoReserva } from "./resumenDelPedido.ts";
import { estadoDeEntrega, pedidoGuardado, recordarPedido } from "./vueltaDelPago.ts";
import { etiquetaCondicion } from "./fixbeeCatalog.ts";
import { leerConPartes } from "../../tools/leerFuente.mjs";

const items = [{ slug: "equipo", nombre: "Equipo", quantity: 1 }];
const datos = { nombre: "Ana", email: "ana@example.com", entrega: "retiro" as const };
const almacenNuevo = () => {
    const valores = new Map<string, string>();
    return { getItem: (k: string) => valores.get(k) ?? null, setItem: (k: string, v: string) => { valores.set(k, v); }, removeItem: (k: string) => { valores.delete(k); } };
};
const rechazo = (code: string, status = 422, details = {}) => parseStoreError(status, { error: { code, message: "Revisá tu compra", details } });
const fuente = leerConPartes("src/components/store/CheckoutDialog.tsx", "src/components/store/checkout");

test("F1 conserva mensaje, slug, slugs y todos los campos del sobre público", () => {
    const error = rechazo("validation_error", 422, { field: "postal_code", fields: ["postal_code", "street_name", 1], slugs: ["equipo", null], slug: "equipo" });
    assert.equal(error.message, "Revisá tu compra");
    assert.equal(error.code, "VALIDATION_ERROR");
    assert.equal(error.slug, "equipo");
    assert.deepEqual(error.slugs, ["equipo"]);
    assert.deepEqual(error.fields, ["postal_code", "street_name"]);
    assert.deepEqual(Object.keys(problemaDeCheckout(error).campos!), ["postal_code", "street"]);
});

test("F1 mantiene detail y message antiguos y normaliza rutas de validación", () => {
    for (const body of [
        { detail: { code: "product_unavailable", slug: "equipo" } },
        { error: { code: "CONFLICT", message: { code: "product_unavailable", slug: "equipo" } } },
    ]) {
        const error = parseStoreError(409, body);
        assert.equal(error.code, "PRODUCT_UNAVAILABLE");
        assert.equal(problemaDeCheckout(error, items).quitarSlug, "equipo");
    }
    for (const body of [
        { error: { code: "VALIDATION_ERROR", details: { validation_errors: [{ field: "body -> shipping_address -> postal_code" }] } } },
        { detail: [{ loc: ["body", "shipping_address", "postal_code"] }] },
    ]) assert.ok(problemaDeCheckout(parseStoreError(422, body)).campos?.postal_code);
    for (const body of [null, [], "fallo", { error: { details: [] } }]) assert.doesNotThrow(() => parseStoreError(502, body));
});

test("F1 conecta todos los campos del servidor con aria-invalid y foco tras renderizar", () => {
    const mapa = { street_name: ["street", "ck-calle"], street_number: ["number", "ck-numero"], floor: ["floor", "ck-piso"], apartment: ["apartment", "ck-depto"], city: ["city", "ck-ciudad"], postal_code: ["postal_code", "ck-cp"], province: ["province", "ck-prov"], customer_name: ["nombre", "ck-nombre"], customer_email: ["email", "ck-email"] };
    for (const [field, [campo, id]] of Object.entries(mapa)) {
        const problema = problemaDeCheckout(rechazo("validation_error", 422, { fields: [field] }));
        assert.deepEqual(Object.keys(problema.campos!), [campo]);
        assert.ok(fuente.includes(`propsDeCampo("${id}", errores.${campo})`));
    }
    assert.match(fuente, /"aria-invalid": error \? true : undefined/);
    assert.match(fuente, /\[errores, abierto, enviando, revision, aConfirmar, intentoPendiente\]/);
    assert.match(fuente, /querySelector<HTMLElement>\('\[aria-invalid="true"\]'\)\?\.focus\(\)/);
    assert.match(fuente, /removeFromCart\(i.cartKey\)/);
    assert.match(fuente, /Quitar del carrito/);
});

for (const [code, status] of [["product_unavailable", 409], ["shipping_unavailable", 409], ["validation_error", 422], ["shipping_field_too_long", 422], ["pickup_only", 422], ["storefront_paused", 403], ["other_business_rejection", 400]] as const) {
    test(`#16 ${code} libera intento original, incluso al recuperar, y permite corregir`, async () => {
        const almacen = almacenNuevo();
        const anterior = await prepararIntento(almacen, items, (k, s) => armarPedido(datos, items, k, s));
        const error = rechazo(code, status);
        const crearPedido = (payload: typeof anterior.payload) => crearPedidoConRecuperacion(async () => { throw error; }, payload, almacen);
        await assert.rejects(recuperarIntento(almacen, { crearPedido, pedirLink: async () => { throw Error("No debe pagar"); } }), ErrorDeCompra);
        assert.equal(intentoDeCheckout(almacen), null);
        const nuevo = await prepararIntento(almacen, items, (k, s) => armarPedido({ ...datos, email: "corregido@example.com" }, items, k, s));
        assert.notEqual(nuevo.payload.checkout_key, anterior.payload.checkout_key);
        assert.equal(nuevo.payload.customer_email, "corregido@example.com");
    });
}

test("#16 red, timeout, 5xx y conflictos inciertos conservan payload y clave", async () => {
    for (const error of [new TypeError("Red"), new DOMException("Timeout", "TimeoutError"), rechazo("timeout", 408), rechazo("product_unavailable", 500), rechazo("conflict", 409), rechazo("UNKNOWN", 400), rechazo("too_many_requests", 429)]) {
        const almacen = almacenNuevo();
        const anterior = await prepararIntento(almacen, items, (k, s) => armarPedido(datos, items, k, s));
        await assert.rejects(crearPedidoConRecuperacion(async () => { throw error; }, anterior.payload, almacen));
        assert.deepEqual(intentoDeCheckout(almacen), anterior.payload);
        assert.equal(rechazoDefinitivo(error), false);
    }
});

test("#16 rechazo tardío no borra otro intento y rechazo de pago no descarta pedido creado", async () => {
    const almacen = almacenNuevo();
    const actual = await prepararIntento(almacen, items, (k, s) => armarPedido(datos, items, k, s));
    await assert.rejects(crearPedidoConRecuperacion(async () => { throw rechazo("validation_error"); }, { ...actual.payload, checkout_key: "anterior" }, almacen));
    assert.deepEqual(intentoDeCheckout(almacen), actual.payload);
    const pedido = { commerce_key: "TC-1", status: "pending_payment", total_amount: 100, subtotal_amount: 100, shipping_amount: 0, currency: "ARS" };
    assert.equal(rechazoDefinitivo(new ErrorDeCompra("Falló pago", pedido, rechazo("validation_error"))), false);
});

test("F2 prioriza vencimiento real, persiste null y estima solamente sin dato", () => {
    const created_at = "2026-09-27T12:00:00Z";
    const exacto = "2026-09-27T12:07:00Z";
    const esperado = new Date(exacto).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
    assert.equal(vencimientoReserva({ created_at, reservation_expires_at: exacto, expires_at: created_at }), esperado);
    assert.match(vencimientoReserva({ created_at })!, /aprox\./);
    assert.equal(vencimientoReserva({ created_at, reservation_expires_at: null }), null);
    for (const reservation_expires_at of [exacto, null]) {
        const almacen = almacenNuevo();
        recordarPedido(almacen, { clave: "TC-1", reserva: { created_at, reservation_expires_at } });
        assert.equal(pedidoGuardado(almacen)?.reserva?.reservation_expires_at, reservation_expires_at);
        assert.equal(vencimientoReserva(pedidoGuardado(almacen)!.reserva!), reservation_expires_at ? esperado : null);
    }
    assert.match(fuente, /Reservado hasta \$\{vencimientoReserva\(pedido\)\}/);
});

test("#9 revisión y confirmación muestran condición sin cruzar líneas por posición o nombre", () => {
    assert.equal(etiquetaCondicion("used"), "Usado");
    assert.equal(etiquetaCondicion("refurbished"), "Reacondicionado");
    assert.equal(etiquetaCondicion(undefined), null);
    assert.equal(fuente.match(/<ProductCondition condition=\{item.product.storeCondition\}/g)?.length, 2);
    assert.match(fuente, /condiciones=\{huellaPendiente === huellaActual/);
});

test("F8 distingue retiro confirmado, envío y dirección desconocida", () => {
    const base: StoreOrderStatus = { commerce_key: "TC-1", status: "paid", paid: true, total_amount: 100, currency: "ARS", fulfillment_status: "delivered", tracking_ref: null };
    assert.equal(estadoDeEntrega({ ...base, shipping: null }), "Retirado");
    assert.equal(estadoDeEntrega({ ...base, shipping: { street: "Calle 123" } }), "Entregado");
    assert.equal(estadoDeEntrega(base), "Entregado");
    assert.equal(estadoDeEntrega({ ...base, shipping: null, payment_result: "reversed" }), null);
});
