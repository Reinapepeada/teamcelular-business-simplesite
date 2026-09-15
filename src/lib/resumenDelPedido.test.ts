/**
 * Lo que el comprador ve antes de que le cobren.
 *
 * Lo que se prueba es que ningún importe salga del carrito: todos tienen que
 * salir del pedido que creó el servidor. El estimado del carrito se usa para
 * una sola cosa, avisar que el precio cambió, y ni siquiera para eso se muestra.
 *
 * Corre con `npm test`.
 */

import { test, describe } from "node:test";
import assert from "node:assert/strict";

import { resumenParaConfirmar } from "./resumenDelPedido.ts";

const pedido = (over: Record<string, unknown> = {}) =>
    ({
        subtotal_amount: 15000,
        shipping_amount: 3000,
        total_amount: 18000,
        currency: "ARS",
        ...over,
    }) as Parameters<typeof resumenParaConfirmar>[0];

describe("los importes salen del servidor", () => {
    test("subtotal, envio y total son los del pedido", () => {
        const r = resumenParaConfirmar(pedido(), 999);
        assert.equal(r.subtotal, 15000);
        assert.equal(r.envio, 3000);
        assert.equal(r.total, 18000);
    });

    test("el total NO se recalcula sumando", () => {
        // Si se recalculara, un envio con descuento o un redondeo del servidor
        // se perderian, y la pantalla mostraria un numero distinto del que se
        // cobra. El servidor manda.
        const r = resumenParaConfirmar(
            pedido({ subtotal_amount: 15000, shipping_amount: 3000, total_amount: 17000 }),
            15000,
        );
        assert.equal(r.total, 17000);
    });

    test("un importe ilegible cuenta como cero y no como NaN", () => {
        const r = resumenParaConfirmar(pedido({ total_amount: undefined }), 15000);
        assert.equal(r.total, 0);
    });

    test("sin moneda se asume ARS", () => {
        assert.equal(resumenParaConfirmar(pedido({ currency: null }), 0).moneda, "ARS");
    });
});

describe("el renglon del envio", () => {
    test("aparece cuando hay envio", () => {
        assert.equal(resumenParaConfirmar(pedido({ shipping_amount: 3000 }), 0).hayEnvio, true);
    });

    test("no aparece cuando retira por el local", () => {
        assert.equal(resumenParaConfirmar(pedido({ shipping_amount: 0 }), 0).hayEnvio, false);
    });
});

describe("avisar que el precio cambio", () => {
    test("avisa cuando el servidor cobra mas que lo que mostraba el carrito", () => {
        const r = resumenParaConfirmar(pedido({ subtotal_amount: 18000 }), 15000);
        assert.equal(r.precioCambio, true);
        assert.equal(r.diferencia, 3000);
    });

    test("avisa tambien cuando bajo", () => {
        const r = resumenParaConfirmar(pedido({ subtotal_amount: 12000 }), 15000);
        assert.equal(r.precioCambio, true);
        assert.ok(r.diferencia < 0);
    });

    test("no avisa cuando es el mismo precio", () => {
        assert.equal(resumenParaConfirmar(pedido({ subtotal_amount: 15000 }), 15000).precioCambio, false);
    });

    test("no avisa por un peso de redondeo", () => {
        // Los importes vuelven del proveedor con centavos: asustar por eso es
        // peor que no decir nada.
        assert.equal(resumenParaConfirmar(pedido({ subtotal_amount: 15000.5 }), 15000).precioCambio, false);
    });

    test("sin estimado no se afirma que cambio", () => {
        // Un carrito recuperado de una version vieja puede no tener con que
        // comparar: decir "el precio cambio" sobre eso es inventar.
        assert.equal(resumenParaConfirmar(pedido({ subtotal_amount: 18000 }), 0).precioCambio, false);
    });
});
