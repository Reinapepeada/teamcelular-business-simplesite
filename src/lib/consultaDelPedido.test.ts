import { test } from "node:test";
import assert from "node:assert/strict";
import { consultarPedido } from "./consultaDelPedido.ts";
import type { StoreOrderStatus } from "./storeApi.ts";
const esperar = () => new Promise<void>(resolve => setImmediate(resolve));
const estado = (paid = false): StoreOrderStatus => ({ commerce_key: "TC-1", status: paid ? "paid" : "pending_payment", paid, payment_result: paid ? "approved" : "pending", total_amount: 100, currency: "ARS", fulfillment_status: "pending", tracking_ref: null });

const armar = (consultar: () => Promise<StoreOrderStatus>, limite = 3) => {
    let timer: (() => void) | undefined;
    const recibidos: StoreOrderStatus[] = [];
    let pagos = 0, agotado = false, noEncontrado = false;
    const consulta = consultarPedido({ consultar, limite, recibir: dato => recibidos.push(dato),
        pagado: async () => { pagos++; }, consultando: () => {}, agotado: value => { agotado = value; },
        noEncontrado: () => { noEncontrado = true; },
        programar: fn => { timer = fn; return 1 as unknown as ReturnType<typeof setTimeout>; },
        cancelar: () => { timer = undefined; },
    });
    return { consulta, recibidos, get pagos() { return pagos; }, get agotado() { return agotado; }, get noEncontrado() { return noEncontrado; },
        siguiente: async () => { const fn = timer; timer = undefined; fn?.(); await esperar(); }, get programado() { return !!timer; } };
};

test("F11 pending se vuelve a consultar y solo backend aprobado confirma pago", async () => {
    let llamadas = 0;
    const c = armar(async () => estado(++llamadas === 2));
    await esperar();
    assert.equal(c.pagos, 0); assert.equal(c.programado, true);
    await c.siguiente();
    assert.equal(c.pagos, 1); assert.equal(c.programado, false);
    c.consulta.detener();
});

test("F11 límite real sin más timers; actualización manual abre otra ventana de solo consulta", async () => {
    let llamadas = 0;
    const c = armar(async () => { llamadas++; return estado(); });
    await esperar(); await c.siguiente(); await c.siguiente(); await c.siguiente();
    assert.equal(llamadas, 3); assert.equal(c.agotado, true); assert.equal(c.programado, false);
    c.consulta.actualizar(); await esperar();
    assert.equal(llamadas, 4); assert.equal(c.agotado, false); assert.equal(c.pagos, 0);
    c.consulta.detener();
});

test("F11 red desconocida reintenta consulta, 404 termina sin acreditar", async () => {
    let llamadas = 0;
    const c = armar(async () => { if (++llamadas === 1) throw new Error("red"); throw { status: 404 }; });
    await esperar(); assert.equal(c.programado, true);
    await c.siguiente(); assert.equal(c.noEncontrado, true); assert.equal(c.pagos, 0); assert.equal(c.programado, false);
    c.consulta.detener();
});

test("F11 doble actualización/foco no solapa; navegar descarta respuesta tardía y limpieza", async () => {
    let resolver!: (dato: StoreOrderStatus) => void;
    let llamadas = 0;
    const c = armar(() => { llamadas++; return new Promise(resolve => { resolver = resolve; }); });
    c.consulta.actualizar(); c.consulta.actualizar(); assert.equal(llamadas, 1);
    c.consulta.detener(); resolver(estado(true)); await esperar();
    assert.equal(c.recibidos.length, 0); assert.equal(c.pagos, 0); assert.equal(c.programado, false);
});
