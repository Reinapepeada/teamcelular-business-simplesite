/**
 * Qué hacer con un pedido creado y sin pagar.
 *
 * Esta regla vivía dentro de dos `useEffect` y ahí no la miraba ningún test:
 * las últimas tres rondas de revisión encontraron bugs justo en sus bordes.
 * Lo que se prueba acá son esos bordes, no el camino feliz.
 *
 * Corre con `npm test`.
 */

import { test, describe } from "node:test";
import assert from "node:assert/strict";

import { queHacerConElPendiente } from "./pedidoPendiente.ts";
import type { PedidoGuardado } from "./vueltaDelPago.ts";

const guardado = (over: Partial<PedidoGuardado> = {}): PedidoGuardado => ({
    clave: "CK-1",
    token: "tok",
    total: 15000,
    moneda: "ARS",
    huella: "pantalla:1",
    ...over,
});

describe("recuperar un pedido a medio pagar", () => {
    test("se recupera si es el pedido de este carrito", () => {
        const d = queHacerConElPendiente({
            guardado: guardado(),
            huellaActual: "pantalla:1",
            huellaEnPantalla: null,
        });
        assert.equal(d.accion, "recuperar");
    });

    test("NO se recupera el de otro carrito", () => {
        // Ofreceria pagar una compra que no es la que el comprador tiene a la
        // vista: otros productos, otro importe.
        const d = queHacerConElPendiente({
            guardado: guardado({ huella: "funda:2" }),
            huellaActual: "pantalla:1",
            huellaEnPantalla: null,
        });
        assert.equal(d.accion, "nada");
    });

    test("sin token no se recupera: no se puede pedir el link", () => {
        // El backend entrega el access_token una sola vez. Sin el, mostrar el
        // boton es prometer algo que no va a andar.
        const d = queHacerConElPendiente({
            guardado: guardado({ token: null }),
            huellaActual: "pantalla:1",
            huellaEnPantalla: null,
        });
        assert.equal(d.accion, "nada");
    });

    test("sin huella guardada no se recupera", () => {
        // El formato viejo del almacenamiento no la trae: no hay forma de
        // saber si el pedido es de este carrito.
        const d = queHacerConElPendiente({
            guardado: guardado({ huella: null }),
            huellaActual: "pantalla:1",
            huellaEnPantalla: null,
        });
        assert.equal(d.accion, "nada");
    });

    test("sin nada guardado no hay nada que hacer", () => {
        const d = queHacerConElPendiente({
            guardado: null,
            huellaActual: "pantalla:1",
            huellaEnPantalla: null,
        });
        assert.equal(d.accion, "nada");
    });

    test("un carrito vacio no recupera nada", () => {
        // La huella del carrito vacio es la cadena vacia, y la guardada nunca
        // lo es: si se compararan como iguales, cualquier pedido viejo
        // "coincidiria" con el carrito vacio.
        const d = queHacerConElPendiente({
            guardado: guardado(),
            huellaActual: "",
            huellaEnPantalla: null,
        });
        assert.equal(d.accion, "nada");
    });
});

describe("soltar el pedido que ya se esta mostrando", () => {
    test("se suelta si el carrito paso a ser otro", () => {
        const d = queHacerConElPendiente({
            guardado: guardado(),
            huellaActual: "funda:2",
            huellaEnPantalla: "pantalla:1",
        });
        assert.equal(d.accion, "soltar");
    });

    test("NO se suelta si el carrito sigue siendo el mismo", () => {
        const d = queHacerConElPendiente({
            guardado: guardado(),
            huellaActual: "pantalla:1",
            huellaEnPantalla: "pantalla:1",
        });
        assert.equal(d.accion, "nada");
    });

    test("vaciar el carrito NO lo suelta", () => {
        // El pedido sigue reservado y pagable; esconderlo deja al comprador
        // sin forma de pagar algo que ya tiene el stock tomado.
        const d = queHacerConElPendiente({
            guardado: guardado(),
            huellaActual: "",
            huellaEnPantalla: "pantalla:1",
        });
        assert.equal(d.accion, "nada");
    });

    test("lo que esta en pantalla manda: no se recupera encima", () => {
        // Sin esto, un pedido ya mostrado se volveria a leer del
        // almacenamiento en cada render y el estado no se asentaria nunca.
        const d = queHacerConElPendiente({
            guardado: guardado({ clave: "CK-OTRO", huella: "pantalla:1" }),
            huellaActual: "pantalla:1",
            huellaEnPantalla: "pantalla:1",
        });
        assert.equal(d.accion, "nada");
    });
});
