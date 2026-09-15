/**
 * La vuelta de Mercado Pago.
 *
 * Lo que se prueba acá es sobre todo lo que la pantalla NO debe creer: los
 * parámetros de la redirección los puede escribir cualquiera en la barra de
 * direcciones, y decir "pagado" ahí no puede alcanzar para dar una compra por
 * cobrada.
 *
 * Corre con `npm test`.
 */

import { test, describe } from "node:test";
import assert from "node:assert/strict";

import {
    claveDeLaVuelta,
    esperaAntesDeReintentar,
    olvidarPedido,
    pedidoRecordado,
    recordarPedido,
    vueltaMostrable,
} from "./vueltaDelPago.ts";
import type { AlmacenClave } from "./checkoutKey.ts";
import type { StoreOrderStatus } from "./storeApi.ts";

const almacenFalso = (inicial: Record<string, string> = {}): AlmacenClave => {
    const datos = { ...inicial };
    return {
        getItem: (k) => (k in datos ? datos[k] : null),
        setItem: (k, v) => {
            datos[k] = v;
        },
        removeItem: (k) => {
            delete datos[k];
        },
    };
};

const almacenRoto = (): AlmacenClave => ({
    getItem: () => {
        throw new Error("bloqueado");
    },
    setItem: () => {
        throw new Error("bloqueado");
    },
    removeItem: () => {
        throw new Error("bloqueado");
    },
});

const query = (pares: Record<string, string>) => new URLSearchParams(pares);

const estado = (over: Partial<StoreOrderStatus> = {}): StoreOrderStatus => ({
    commerce_key: "CK-1",
    status: "pending",
    paid: false,
    total_amount: 15000,
    currency: "ARS",
    fulfillment_status: "pending",
    tracking_ref: null,
    ...over,
});

describe("el pedido recordado", () => {
    test("se guarda y se recupera", () => {
        const almacen = almacenFalso();
        recordarPedido(almacen, "CK-42");
        assert.equal(pedidoRecordado(almacen), "CK-42");
    });

    test("se olvida cuando se pide", () => {
        const almacen = almacenFalso();
        recordarPedido(almacen, "CK-42");
        olvidarPedido(almacen);
        assert.equal(pedidoRecordado(almacen), null);
    });

    test("un almacenamiento bloqueado no rompe la compra", () => {
        const almacen = almacenRoto();
        assert.doesNotThrow(() => recordarPedido(almacen, "CK-42"));
        assert.doesNotThrow(() => olvidarPedido(almacen));
        assert.equal(pedidoRecordado(almacen), null);
    });

    test("una clave vacia no se guarda", () => {
        const almacen = almacenFalso();
        recordarPedido(almacen, "");
        assert.equal(pedidoRecordado(almacen), null);
    });

    test("una clave vacia no pisa el pedido que ya estaba", () => {
        // Si la pisara, el comprador vuelve de Mercado Pago y la pantalla
        // queda sin saber de que pedido preguntar.
        const almacen = almacenFalso();
        recordarPedido(almacen, "CK-42");
        recordarPedido(almacen, "");
        assert.equal(pedidoRecordado(almacen), "CK-42");
    });
});

describe("claveDeLaVuelta", () => {
    test("manda la referencia de la URL: es el pedido que MP acaba de procesar", () => {
        const almacen = almacenFalso();
        recordarPedido(almacen, "CK-VIEJO");
        const pedido = claveDeLaVuelta(almacen, query({ external_reference: "CK-NUEVO" }));
        assert.equal(pedido?.clave, "CK-NUEVO");
    });

    test("una referencia ajena se mira pero no cuenta como propia", () => {
        const almacen = almacenFalso();
        recordarPedido(almacen, "CK-MIO");
        const pedido = claveDeLaVuelta(almacen, query({ external_reference: "CK-DE-OTRO" }));
        assert.equal(pedido?.esNuestro, false);
    });

    test("la misma clave que guardo este navegador si es propia", () => {
        const almacen = almacenFalso();
        recordarPedido(almacen, "CK-MIO");
        const pedido = claveDeLaVuelta(almacen, query({ external_reference: "CK-MIO" }));
        assert.equal(pedido?.esNuestro, true);
    });

    test("sin referencia en la URL usa la guardada, que es propia", () => {
        const almacen = almacenFalso();
        recordarPedido(almacen, "CK-MIO");
        assert.deepEqual(claveDeLaVuelta(almacen, query({})), {
            clave: "CK-MIO",
            esNuestro: true,
        });
    });

    test("sirve aunque no haya almacenamiento: pagar en otro dispositivo", () => {
        const pedido = claveDeLaVuelta(null, query({ external_reference: "CK-7" }));
        assert.equal(pedido?.clave, "CK-7");
        assert.equal(pedido?.esNuestro, false);
    });

    test("sin pedido por ningun lado no hay nada que preguntar", () => {
        assert.equal(claveDeLaVuelta(almacenFalso(), query({})), null);
        assert.equal(claveDeLaVuelta(almacenFalso(), query({ external_reference: "  " })), null);
    });

    test("no toma el payment_id como si fuera el pedido", () => {
        assert.equal(
            claveDeLaVuelta(almacenFalso(), query({ payment_id: "123456", status: "approved" })),
            null,
        );
    });
});

describe("vueltaMostrable", () => {
    test("sin estado todavia, espera", () => {
        const v = vueltaMostrable(null);
        assert.equal(v.desenlace, "esperando");
        assert.equal(v.seguirPreguntando, true);
    });

    test("paid en true es lo unico que da la compra por cobrada", () => {
        const v = vueltaMostrable(estado({ paid: true, status: "paid" }));
        assert.equal(v.desenlace, "pagado");
        assert.equal(v.seguirPreguntando, false);
    });

    test("un status que dice approved pero paid en false NO alcanza", () => {
        // El status es texto del proveedor; `paid` lo decide la base. Si la
        // pantalla mirara el texto, felicitaria por un pago que no entro.
        const v = vueltaMostrable(estado({ paid: false, status: "approved" }));
        assert.equal(v.desenlace, "esperando");
        assert.equal(v.seguirPreguntando, true);
    });

    test("mientras espera, sigue preguntando", () => {
        assert.equal(vueltaMostrable(estado({ paid: false })).seguirPreguntando, true);
    });
});

describe("esperaAntesDeReintentar", () => {
    test("arranca corto: el aviso suele llegar enseguida", () => {
        assert.equal(esperaAntesDeReintentar(0), 1000);
    });

    test("se va estirando", () => {
        assert.ok(esperaAntesDeReintentar(1) > esperaAntesDeReintentar(0));
        assert.ok(esperaAntesDeReintentar(3) > esperaAntesDeReintentar(1));
    });

    test("tiene techo: no se espera un minuto entre preguntas", () => {
        assert.equal(esperaAntesDeReintentar(50), 15000);
    });

    test("un intento negativo no da una espera negativa", () => {
        assert.ok(esperaAntesDeReintentar(-3) > 0);
    });
});

describe("vueltaMostrable segun la puerta por la que volvio", () => {
    test("lo pagado manda sobre la puerta: aprobado que vuelve por /error sigue pagado", () => {
        // Si la puerta ganara, la pantalla le diria "no se hizo ningun cargo"
        // a alguien que ya pago.
        const v = vueltaMostrable(estado({ paid: true }), "error");
        assert.equal(v.desenlace, "pagado");
    });

    test("un rechazo no se queda preguntando", () => {
        const v = vueltaMostrable(estado({ paid: false }), "error");
        assert.equal(v.desenlace, "rechazado");
        assert.equal(v.seguirPreguntando, false);
    });

    test("un rechazo dice que no se cobro nada", () => {
        assert.match(vueltaMostrable(estado({ paid: false }), "error").detalle, /ningún cargo/i);
    });

    test("un pago demorado tampoco se espera con la pestana abierta", () => {
        // Efectivo o Rapipago pueden tardar dias: reintentar es dejar una
        // pestana olvidada golpeando el backend.
        const v = vueltaMostrable(estado({ paid: false }), "pendiente");
        assert.equal(v.seguirPreguntando, false);
        assert.notEqual(v.desenlace, "rechazado");
    });

    test("por la puerta de exito si espera, que es donde el aviso llega en segundos", () => {
        assert.equal(vueltaMostrable(estado({ paid: false }), "exito").seguirPreguntando, true);
    });

    test("sin estado todavia, la puerta de error ya puede decir que no entro", () => {
        assert.equal(vueltaMostrable(null, "error").desenlace, "rechazado");
    });

    test("sin estado todavia, la puerta de exito espera", () => {
        assert.equal(vueltaMostrable(null, "exito").seguirPreguntando, true);
    });
});
