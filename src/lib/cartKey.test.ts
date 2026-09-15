/**
 * La identidad de un ítem del carrito.
 *
 * Con Fixbee todos los productos llegan con `id: 0` —el catálogo público no
 * expone ids—, así que una clave armada sobre el id los haría colapsar en uno
 * solo: agregar un cargador después de una funda sumaría cantidad sobre la
 * funda. Eso es lo que se prueba acá.
 *
 * Corre con `npm test`.
 */

import { test, describe } from "node:test";
import assert from "node:assert/strict";

import { claveDeCarrito } from "./cartKey.ts";
import { buildProductSlug } from "./productSlug.ts";

describe("claveDeCarrito", () => {
    test("dos productos de Fixbee no son el mismo item", () => {
        assert.notEqual(
            claveDeCarrito(0, undefined, "pantalla-iphone-13"),
            claveDeCarrito(0, undefined, "funda-iphone-13"),
        );
    });

    test("el mismo producto agregado dos veces es el mismo item", () => {
        assert.equal(
            claveDeCarrito(0, undefined, "pantalla-iphone-13"),
            claveDeCarrito(0, undefined, "pantalla-iphone-13"),
        );
    });

    test("sin slug sigue mandando el id: el carrito guardado no se duplica", () => {
        assert.equal(claveDeCarrito(7), "7");
        assert.equal(claveDeCarrito(7, undefined, null), "7");
        assert.equal(claveDeCarrito(7, undefined, "   "), "7");
    });

    test("la variante separa dos items del mismo producto", () => {
        assert.notEqual(
            claveDeCarrito(0, 1, "pantalla-iphone-13"),
            claveDeCarrito(0, 2, "pantalla-iphone-13"),
        );
        assert.notEqual(claveDeCarrito(7, 1), claveDeCarrito(7, 2));
    });

    test("un slug no se confunde con un id", () => {
        // Sin prefijo, un producto viejo con id 7 y uno de Fixbee llamado "7"
        // compartirian renglon.
        assert.notEqual(claveDeCarrito(0, undefined, "7"), claveDeCarrito(7));
    });
});

describe("buildProductSlug con productos de Fixbee", () => {
    test("usa el slug del backend y no arma nada", () => {
        assert.equal(
            buildProductSlug({ id: 0, name: "Pantalla iPhone 13", storeSlug: "pantalla-iphone-13-pro" }),
            "pantalla-iphone-13-pro",
        );
    });

    test("un slug vacio no cuenta: cae al armado viejo", () => {
        assert.equal(buildProductSlug({ id: 42, name: "Funda", storeSlug: "" }), "funda-42");
        assert.equal(buildProductSlug({ id: 42, name: "Funda", storeSlug: null }), "funda-42");
    });

    test("lo que no paso por Fixbee sigue con nombre-id", () => {
        assert.equal(buildProductSlug({ id: 42, name: "Funda" }), "funda-42");
    });
});
