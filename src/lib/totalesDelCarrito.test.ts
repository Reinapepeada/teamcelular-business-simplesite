/**
 * Lo que el carrito muestra sumado.
 *
 * El carrito se guarda en el navegador y sobrevive a cualquier cambio de
 * formato, así que lo que se prueba acá es sobre todo la basura que llega sola:
 * cantidades y precios que no son números. Un carrito que dice "$ NaN" no lo
 * entiende nadie.
 *
 * Corre con `npm test`.
 */

import { test, describe } from "node:test";
import assert from "node:assert/strict";

import {
    nombreDeVariante,
    totalDeLinea,
    totalesDelCarrito,
    type ItemSumable,
} from "./totalesDelCarrito.ts";

const item = (over: Partial<ItemSumable> = {}): ItemSumable => ({
    quantity: 1,
    product: { retail_price: 15000, name: "Pantalla" },
    variant: null,
    ...over,
});

describe("totalesDelCarrito", () => {
    test("un carrito vacio suma cero", () => {
        assert.deepEqual(totalesDelCarrito([]), { unidades: 0, productos: 0 });
    });

    test("suma unidades y precios", () => {
        const t = totalesDelCarrito([
            item({ quantity: 2 }),
            item({ quantity: 1, product: { retail_price: 5000 } }),
        ]);
        assert.equal(t.unidades, 3);
        assert.equal(t.productos, 35000);
    });

    test("una cantidad ilegible cuenta como cero y no como NaN", () => {
        const t = totalesDelCarrito([item({ quantity: NaN as number })]);
        assert.equal(t.unidades, 0);
        assert.equal(t.productos, 0);
    });

    test("un precio ilegible cuenta como cero", () => {
        const t = totalesDelCarrito([
            item({ product: { retail_price: undefined as unknown as number } }),
        ]);
        assert.equal(t.productos, 0);
        assert.equal(t.unidades, 1);
    });

    test("una cantidad negativa no descuenta del total", () => {
        // Si restara, alguien podria armarse un carrito que suma menos de lo
        // que lleva. Lo que se cobra lo pone el servidor igual, pero mostrarlo
        // seria mentirle al comprador sobre lo que va a pagar.
        const t = totalesDelCarrito([item({ quantity: 2 }), item({ quantity: -5 })]);
        assert.equal(t.unidades, 2);
        assert.equal(t.productos, 30000);
    });

    test("un precio negativo no descuenta del total", () => {
        // Mismo motivo que la cantidad: un carrito que suma menos de lo que
        // lleva le miente al comprador sobre lo que va a pagar.
        const t = totalesDelCarrito([
            item({ product: { retail_price: 15000 } }),
            item({ product: { retail_price: -9000 } }),
        ]);
        assert.equal(t.productos, 15000);
    });

    test("una cantidad fraccionada se trunca", () => {
        assert.equal(totalesDelCarrito([item({ quantity: 2.7 })]).unidades, 2);
    });

    test("sin items no explota", () => {
        assert.deepEqual(totalesDelCarrito(undefined as unknown as ItemSumable[]), {
            unidades: 0,
            productos: 0,
        });
    });
});

describe("totalDeLinea", () => {
    test("es precio por cantidad", () => {
        assert.equal(totalDeLinea(item({ quantity: 3 })), 45000);
    });

    test("con basura da cero, no NaN", () => {
        assert.equal(totalDeLinea(item({ quantity: NaN as number })), 0);
    });
});

describe("nombreDeVariante", () => {
    test("junta color y talle", () => {
        assert.equal(nombreDeVariante(item({ variant: { color: "Rojo", size: "L" } })), "Rojo / L");
    });

    test("con uno solo no deja la barra colgando", () => {
        assert.equal(nombreDeVariante(item({ variant: { color: "Rojo" } })), "Rojo");
        assert.equal(nombreDeVariante(item({ variant: { size: "L" } })), "L");
    });

    test("sin variante, vacio", () => {
        assert.equal(nombreDeVariante(item()), "");
    });
});
