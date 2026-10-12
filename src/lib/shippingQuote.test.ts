import { test } from 'node:test';
import assert from 'node:assert/strict';
import { exigirCotizacionLista, plazoDeTransporte } from './shippingQuote.ts';
import { armarPedido, crearPedidoConRecuperacion, problemaDeCheckout, recuperarIntento, revisarPedido, type DatosDeCompra } from './checkoutFlow.ts';
import { intentoDeCheckout, prepararIntento } from './checkoutKey.ts';
import { parseStoreError, type ShippingQuote } from './storeApi.ts';
import { resumenParaConfirmar } from './resumenDelPedido.ts';

const id = '11111111-1111-4111-8111-111111111111';
const quote: ShippingQuote = { quote_id: id, expires_at: '2099-01-01T12:00:00Z', checkout_ready: true, package_status: 'estimated', hours_basis: 'carrier_transit_after_dispatch', cheapest: { price: 20, hours: 48 }, options: [{ price: 20 }] };
const datos: DatosDeCompra = { entrega: 'envio', nombre: 'Ana Prueba', email: 'ana@example.test', direccion: { street: 'Prueba', number: '123', city: 'CABA', province: 'C', postal_code: 'C1425ABC' } };
const items = [{ slug: 'funda', quantity: 2 }];
const storage = () => { const values = new Map<string, string>(); return { getItem: (k: string) => values.get(k) ?? null, setItem: (k: string, v: string) => { values.set(k, v); }, removeItem: (k: string) => { values.delete(k); } }; };
const businessError = (code: string, status = 409) => parseStoreError(status, { error: { code, message: 'No se creó un pedido' } });

test('quote listo conserva referencia propia, sin pedir origen ni paquete al comprador', async () => {
    const revision = await revisarPedido(datos, items, 100, async () => quote);
    assert.equal(revision.quoteId, id);
    assert.equal(revision.total, 120);
    const payload = armarPedido(datos, items, 'key', 'secret', revision.quoteId);
    assert.equal(payload.quote_id, id);
    assert.deepEqual(Object.keys(payload).sort(), ['checkout_key', 'customer_email', 'customer_name', 'items', 'quote_id', 'recovery_token', 'shipping_address']);
    assert.equal(exigirCotizacionLista(quote), quote);
});

for (const checkout_ready of [undefined, false, null, 'true', 1]) {
    test(`readiness ${String(checkout_ready)} no permite revisión ni pago`, async () => {
        await assert.rejects(revisarPedido(datos, items, 100, async () => ({ ...quote, checkout_ready } as ShippingQuote)), { code: 'SHIPPING_CONFIGURATION_REQUIRED' });
    });
}
for (const partial of [
    { quote_id: undefined }, { quote_id: '' }, { quote_id: 'not-an-id' },
    { expires_at: undefined }, { expires_at: '' }, { expires_at: 'invalid' },
    { expires_at: '2099-01-01T12:00:00' }, { expires_at: '2099-01-01Z' },
]) {
    test(`snapshot incompleto falla cerrado ${JSON.stringify(partial)}`, () => {
        assert.throws(() => exigirCotizacionLista({ ...quote, ...partial }), { code: 'SHIPPING_QUOTE_REQUIRED' });
    });
}

test('offset válido y reloj local no sustituyen la validación de vigencia del servidor', () => {
    for (const expires_at of ['2099-01-01T09:00:00-03:00', '2001-01-01T12:00:00Z']) {
        assert.equal(exigirCotizacionLista({ ...quote, expires_at }).quote_id, id);
    }
});

test('horas sólo describen tránsito desde despacho, nunca llegada desde compra', () => {
    assert.equal(plazoDeTransporte(quote), 'Tránsito estimado: ~48 h desde el despacho. No incluye preparación.');
    assert.equal(plazoDeTransporte({ ...quote, hours_basis: undefined }), null);
    for (const hours of [null, undefined, NaN, Infinity, 0, -1]) assert.equal(plazoDeTransporte({ ...quote, cheapest: { price: 20, hours } }), null);
});

test('retiro sigue sin quote ni selección de origen', async () => {
    const retiro: DatosDeCompra = { ...datos, entrega: 'retiro' };
    const revision = await revisarPedido(retiro, items, 100, async () => { assert.fail('Retiro no cotiza'); });
    assert.equal(revision.envio, 0); assert.equal(revision.quoteId, undefined);
    const payload = armarPedido(retiro, items, 'key', 'secret', id);
    assert.equal(payload.quote_id, undefined); assert.equal(payload.shipping_address, undefined);
});

const preReservationErrors = ['shipping_quote_required', 'shipping_quote_expired', 'shipping_quote_changed', 'stock_requires_consolidation', 'shipping_configuration_required', 'shipping_package_review_required'];
for (const code of preReservationErrors) {
    test(`${code}: mensaje útil, sin quitar ítems/retiro prometido; sólo libera rechazo explícito`, async () => {
        const problem = problemaDeCheckout(businessError(code), items);
        assert.equal(problem.quitarSlug, undefined); assert.equal(problem.ofrecerRetiro, undefined);
        assert.doesNotMatch(problem.mensaje, /sin stock|No hay envío|gratis|asegurad/i);
        assert.equal(problem.recalcularEnvio, code.startsWith('shipping_quote') ? true : undefined);
        assert.equal(problem.consultarEnvio, code.startsWith('shipping_quote') ? undefined : true);
        const almacen = storage(); almacen.setItem('cart-storage', 'carrito que no debe tocarse');
        // Sin cart-storage inválido durante preparación; el snapshot del carrito se verifica por otro contrato.
        almacen.removeItem('cart-storage');
        const first = await prepararIntento(almacen, items, (key, secret) => armarPedido(datos, items, key, secret, id));
        almacen.setItem('cart-storage', 'carrito que no debe tocarse');
        await assert.rejects(crearPedidoConRecuperacion(async () => { throw businessError(code); }, first.payload, almacen));
        assert.equal(intentoDeCheckout(almacen), null);
        assert.equal(almacen.getItem('cart-storage'), 'carrito que no debe tocarse');
    });
}

for (const quoteId of [id, undefined]) {
    test(`recovery conserva quote ${quoteId ?? 'legacy ausente'} antes de recotizar`, async () => {
        const almacen = storage();
        const first = await prepararIntento(almacen, items, (key, secret) => armarPedido(datos, items, key, secret, quoteId));
        await assert.rejects(crearPedidoConRecuperacion(async () => { throw new TypeError('respuesta perdida'); }, first.payload, almacen));
        const second = await prepararIntento(almacen, items, () => { assert.fail('No sustituir por quote nueva'); });
        assert.deepEqual(second.payload, first.payload);
        let calls = 0;
        const order = { commerce_key: 'TC-TEST', access_token: 'fake-token', status: 'pending_payment', subtotal_amount: 100, shipping_amount: 20, total_amount: 120, currency: 'ARS' };
        assert.equal(await recuperarIntento(almacen, { crearPedido: async payload => { calls++; assert.deepEqual(payload, first.payload); return order; }, pedirLink: async () => { assert.fail('Recuperar no paga'); } }), order);
        assert.equal(calls, 1);
    });
}

test('comparación exacta de centavos también detecta cambios compensados entre productos/envío', () => {
    const order = { subtotal_amount: 100, shipping_amount: 20, total_amount: 120, currency: 'ARS' };
    for (const difference of [0.01, 0.99, -0.01, -0.99]) {
        assert.equal(resumenParaConfirmar({ ...order, total_amount: 120 + difference }, 100, 20).precioCambio, true);
        assert.equal(resumenParaConfirmar({ ...order, subtotal_amount: 100 - difference, shipping_amount: 20 + difference }, 100, 20).precioCambio, true);
    }
    assert.equal(resumenParaConfirmar({ subtotal_amount: 0.1 + 0.2, shipping_amount: 0.2, total_amount: 0.5, currency: 'ARS' }, 0.3, 0.2).precioCambio, false);
});
