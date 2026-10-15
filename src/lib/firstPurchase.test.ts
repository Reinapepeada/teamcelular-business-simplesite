import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadPickupPoint } from './pickupPoint.ts';
import { StoreApiError, fetchPickupPointDetails, fetchPickupPoint, type StoreOrder, type StoreOrderStatus } from './storeApi.ts';
import { resumenParaConfirmar, vencimientoReserva } from './resumenDelPedido.ts';
import { abrirElPago, mensajePedidoTerminado, reservarYPagarSiCoincide } from './checkoutFlow.ts';
import { vueltaMostrable } from './vueltaDelPago.ts';

const point = { name: 'Local ficticio', address: 'Dirección de prueba 123', hours: 'Lunes 10 a 18' };
const order: StoreOrder = { commerce_key: 'TC-TEST', access_token: 'fake-token', status: 'pending_payment', subtotal_amount: 100, shipping_amount: 0, total_amount: 100, currency: 'ARS' };
const status: StoreOrderStatus = { commerce_key: 'TC-TEST', status: 'paid', paid: true, payment_result: 'approved', total_amount: 100, currency: 'ARS', fulfillment_status: 'pending', tracking_ref: null };

test('retiro diferencia datos completos, configuración incompleta y falla temporal', async () => {
    assert.deepEqual(await loadPickupPoint(async () => point), { status: 'ready', point });
    assert.deepEqual(await loadPickupPoint(async () => ({ ...point, hours: null })), { status: 'incomplete', point: { ...point, hours: null }, missing: ['el horario'] });
    assert.deepEqual(await loadPickupPoint(async () => ({ ...point, address: ' ', hours: ' ' })), { status: 'incomplete', point: { ...point, address: ' ', hours: ' ' }, missing: ['la dirección', 'el horario'] });
    assert.deepEqual(await loadPickupPoint(async () => null), { status: 'unavailable' });
    assert.deepEqual(await loadPickupPoint(async () => { throw new StoreApiError('', 404, 'PICKUP_UNAVAILABLE'); }), { status: 'unavailable' });
    for (const error of [new TypeError('network'), new StoreApiError('', 503, 'UNKNOWN'), new StoreApiError('', 404, 'UNKNOWN')]) {
        assert.deepEqual(await loadPickupPoint(async () => { throw error; }), { status: 'error' });
    }
});

test('consulta detallada conserva error; consumidor anterior sigue recibiendo null', async (t) => {
    t.mock.method(globalThis, 'fetch', async () => new Response(JSON.stringify({ detail: { code: 'pickup_unavailable' } }), { status: 404 }));
    await assert.rejects(fetchPickupPointDetails(), (error: unknown) => error instanceof StoreApiError && error.code === 'PICKUP_UNAVAILABLE');
    assert.equal(await fetchPickupPoint(), null);
});

for (const field of ['subtotal_amount', 'shipping_amount', 'total_amount'] as const) {
    for (const value of [undefined, null, NaN, Infinity, -1, '100', 'inválido']) {
        test(`${field} ${String(value)} no se convierte a cero ni permite abrir pago`, async () => {
            const invalid = { ...order, [field]: value } as StoreOrder;
            const summary = resumenParaConfirmar(invalid, 100, 0);
            assert.equal(summary.importesConfirmados, false);
            assert.equal(summary.precioCambio, false);
            assert.equal(summary[field === 'subtotal_amount' ? 'subtotal' : field === 'shipping_amount' ? 'envio' : 'total'], null);
            let links = 0, remembered = 0;
            const ports = { crearPedido: async () => invalid, recordar: async () => { remembered++; }, pedirLink: async () => { links++; return { checkout_url: 'https://payment.example.test' }; } };
            const result = await reservarYPagarSiCoincide(ports, { checkout_key: 'same', customer_name: 'Ana', customer_email: 'a@example.test', items: [{ slug: 'test', quantity: 1 }] }, 100, 0);
            assert.equal(result.checkoutUrl, null);
            assert.equal(remembered, 1);
            await assert.rejects(abrirElPago(ports, invalid), /importe.*no está confirmado/);
            assert.equal(links, 0);
        });
    }
}

test('cero explícito permanece cero y pedido válido abre un link', async () => {
    const zero = { ...order, subtotal_amount: 0, shipping_amount: 0, total_amount: 0 };
    assert.equal(resumenParaConfirmar(zero, 0).importesConfirmados, true);
    assert.equal(resumenParaConfirmar(zero, 0).total, 0);
    assert.equal(await abrirElPago({ crearPedido: async () => zero, pedirLink: async () => ({ checkout_url: 'https://payment.example.test' }) }, zero), 'https://payment.example.test');
});

test('reserva sin timestamp explícito o sin zona no inventa plazo', () => {
    for (const value of [undefined, null, '', 'invalid', '2026-10-12T22:00:00']) {
        assert.equal(vencimientoReserva({ reservation_expires_at: value, created_at: '2026-10-12T21:00:00Z' }), null);
    }
    assert.equal(vencimientoReserva({ reservation_expires_at: null, expires_at: '2026-10-12T22:00:00Z' }), null);
    assert.equal(vencimientoReserva({ reservation_expires_at: '2026-10-13T01:00:00Z' }), '12/10/2026, 22:00 (hora de Argentina)');
    assert.equal(vencimientoReserva({ reservation_expires_at: '2026-10-12T22:00:00-03:00' }), '12/10/2026, 22:00 (hora de Argentina)');
});

test('retorno aprobado habla de la modalidad y avance reales, sin prometer mails', () => {
    assert.match(vueltaMostrable({ ...status, delivery_mode: 'pickup' }).detalle, /retirar en el local/);
    assert.match(vueltaMostrable({ ...status, delivery_mode: 'shipping' }).detalle, /envío a domicilio/);
    assert.doesNotMatch(vueltaMostrable(status).detalle, /envío|retirar|mail|salga/);
    assert.match(vueltaMostrable({ ...status, delivery_mode: 'pickup', fulfillment_status: 'delivered' }).detalle, /ya fue retirado/);
    assert.match(vueltaMostrable({ ...status, delivery_mode: 'shipping', fulfillment_status: 'delivered' }).detalle, /figura como entregado/);
    assert.match(vueltaMostrable({ ...status, fulfillment_status: 'shipped' }).detalle, /ya fue despachado/);
    assert.match(vueltaMostrable({ ...status, fulfillment_status: 'ready_for_pickup' }).detalle, /listo para retirar/);
    assert.doesNotMatch(vueltaMostrable({ ...status, delivery_mode: 'shipping', fulfillment_status: 'delivered' }).detalle, /cuando|salga|preparación/);
});

test('reversa no afirma devolución voluntaria total ni monto confirmado', () => {
    const reversed = vueltaMostrable({ ...status, payment_result: 'reversed', can_retry: true });
    assert.equal(reversed.titulo, 'Este pago fue revertido');
    assert.match(reversed.detalle, /confirmar su alcance/);
    assert.doesNotMatch(reversed.detalle, /total|reembolso|devolvimos|\$/);
    assert.equal(reversed.canRetry, false);
    assert.match(mensajePedidoTerminado({ ...order, status: 'payment_reversed' })!, /revertido/);
});

test('retorno público con importe inválido no habilita reintento de pago', () => {
    for (const amount of [null, undefined, NaN, Infinity, '100']) {
        assert.equal(vueltaMostrable({ ...status, paid: false, payment_result: 'rejected', can_retry: true, total_amount: amount } as StoreOrderStatus).canRetry, false);
    }
});
