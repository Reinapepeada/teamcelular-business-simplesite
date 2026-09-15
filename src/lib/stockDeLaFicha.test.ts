/**
 * Cuánto se puede comprar de lo que la ficha tiene a la vista.
 *
 * El caso que importa es el `0`: con `||` se tomaba como "no hay dato" y se
 * caía al stock total, o sea que una variante agotada mostraba el stock de las
 * otras y dejaba agregar al carrito algo que no existe.
 *
 * Corre con `npm test`.
 */

import { test, describe } from "node:test";
import assert from "node:assert/strict";

import {
    hayParaComprar,
    sePuedeRestar,
    sePuedeSumar,
    stockQueManda,
} from "./stockDeLaFicha.ts";

describe("stockQueManda", () => {
    test("manda la variante elegida", () => {
        assert.equal(stockQueManda({ stock: 3 }, 10), 3);
    });

    test("una variante agotada es cero, no el total de las otras", () => {
        // Este es el bug que el `||` escondia: 0 se tomaba como "sin dato".
        assert.equal(stockQueManda({ stock: 0 }, 10), 0);
    });

    test("sin variante elegida manda el total", () => {
        assert.equal(stockQueManda(null, 10), 10);
        assert.equal(stockQueManda(undefined, 10), 10);
    });
});

describe("sePuedeSumar", () => {
    test("se puede mientras quede stock", () => {
        assert.equal(sePuedeSumar(1, { stock: 3 }, 10), true);
        assert.equal(sePuedeSumar(2, { stock: 3 }, 10), true);
    });

    test("no se puede pasar del stock de la variante", () => {
        assert.equal(sePuedeSumar(3, { stock: 3 }, 10), false);
        assert.equal(sePuedeSumar(4, { stock: 3 }, 10), false);
    });

    test("con la variante agotada no se puede sumar nada", () => {
        assert.equal(sePuedeSumar(1, { stock: 0 }, 10), false);
    });

    test("sin variante se mide contra el total", () => {
        assert.equal(sePuedeSumar(9, null, 10), true);
        assert.equal(sePuedeSumar(10, null, 10), false);
    });
});

describe("sePuedeRestar", () => {
    test("no baja de uno: cero se saca del carrito, no se elige acá", () => {
        assert.equal(sePuedeRestar(1), false);
        assert.equal(sePuedeRestar(2), true);
    });
});

describe("hayParaComprar", () => {
    test("con stock, si", () => {
        assert.equal(hayParaComprar({ stock: 1 }, 0), true);
    });

    test("la variante agotada no se compra aunque haya total", () => {
        assert.equal(hayParaComprar({ stock: 0 }, 10), false);
    });

    test("sin variante y sin total, no", () => {
        assert.equal(hayParaComprar(null, 0), false);
    });
});
