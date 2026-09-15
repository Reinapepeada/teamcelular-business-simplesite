/**
 * El carrito guardado, convertido en algo que el checkout pueda cobrar.
 *
 * El caso que importa es el carrito viejo: `localStorage` sobrevive al deploy y
 * quien tenía cosas agregadas vuelve con ítems sin el slug del backend.
 *
 * Corre con `node --test src/lib/cartLines.test.ts`.
 */

import { test, describe } from "node:test";
import assert from "node:assert/strict";

import { aLineasDeCheckout, carritoComprable } from "./cartLines.ts";

describe("el carrito de siempre", () => {
    test("se convierte en lineas de slug y cantidad", () => {
        const r = aLineasDeCheckout([
            { slug: "pantalla-iphone-13", quantity: 1 },
            { slug: "funda-silicona", quantity: 2 },
        ]);

        assert.deepEqual(r.lineas, [
            { slug: "pantalla-iphone-13", quantity: 1 },
            { slug: "funda-silicona", quantity: 2 },
        ]);
        assert.deepEqual(r.hayQueReagregar, []);
        assert.equal(carritoComprable(r), true);
    });

    test("el mismo producto dos veces se suma en una sola linea", () => {
        // El carrito guarda una fila por producto+variante, asi que el mismo
        // producto puede aparecer repetido. El checkout tiene un unique por
        // (pedido, producto): mandarlo dos veces revienta contra la base con un
        // error interno en vez de comprar.
        const r = aLineasDeCheckout([
            { slug: "pantalla", quantity: 1 },
            { slug: "pantalla", quantity: 2 },
        ]);

        assert.deepEqual(r.lineas, [{ slug: "pantalla", quantity: 3 }]);
    });
});

describe("el carrito guardado antes de esta version", () => {
    test("los items sin slug no se mandan, se avisan", () => {
        // **El caso que haria un mensaje imposible de entender.** Mandarlos
        // igual devuelve PRODUCT_UNAVAILABLE sobre un producto que esta
        // publicado y con stock.
        const r = aLineasDeCheckout([
            { slug: "pantalla", quantity: 1 },
            { quantity: 1, nombre: "Funda de silicona" },
        ]);

        assert.deepEqual(r.lineas, [{ slug: "pantalla", quantity: 1 }]);
        assert.deepEqual(r.hayQueReagregar, ["Funda de silicona"]);
    });

    test("un carrito a medias no se compra", () => {
        // Cobrar lo que si tiene slug y callar el resto entrega menos de lo que
        // la persona armo, y encima cobrado: se entera al abrir el paquete.
        const r = aLineasDeCheckout([
            { slug: "pantalla", quantity: 1 },
            { quantity: 1, nombre: "Funda" },
        ]);

        assert.equal(carritoComprable(r), false);
    });

    test("sin nombre, igual avisa que hay algo que reagregar", () => {
        const r = aLineasDeCheckout([{ quantity: 1 }]);

        assert.equal(r.hayQueReagregar.length, 1);
        assert.ok(r.hayQueReagregar[0].length > 0);
    });

    test("un slug en blanco cuenta como que no lo tiene", () => {
        const r = aLineasDeCheckout([{ slug: "   ", quantity: 1, nombre: "Cargador" }]);

        assert.deepEqual(r.lineas, []);
        assert.deepEqual(r.hayQueReagregar, ["Cargador"]);
    });
});

describe("cantidades raras", () => {
    test("cero y negativas se descartan sin avisar", () => {
        // No son un problema que el comprador tenga que resolver: son filas que
        // no deberian existir.
        const r = aLineasDeCheckout([
            { slug: "a", quantity: 0 },
            { slug: "b", quantity: -3 },
            { slug: "c", quantity: 1 },
        ]);

        assert.deepEqual(r.lineas, [{ slug: "c", quantity: 1 }]);
        assert.deepEqual(r.hayQueReagregar, []);
    });

    test("fraccionadas se truncan", () => {
        // El backend exige entero; 1.5 es un 422 que el comprador no puede
        // entender ni arreglar.
        const r = aLineasDeCheckout([{ slug: "a", quantity: 2.7 }]);

        assert.deepEqual(r.lineas, [{ slug: "a", quantity: 2 }]);
    });

    test("una cantidad que no es numero no rompe el carrito", () => {
        const r = aLineasDeCheckout([
            { slug: "a", quantity: NaN as unknown as number },
            { slug: "b", quantity: 1 },
        ]);

        assert.deepEqual(r.lineas, [{ slug: "b", quantity: 1 }]);
    });
});

describe("el carrito vacio", () => {
    test("no es comprable", () => {
        // Sin esto, el boton de comprar manda un checkout sin items y el
        // backend contesta 422: un error tecnico donde alcanzaba con no dejar
        // apretar.
        assert.equal(carritoComprable(aLineasDeCheckout([])), false);
    });
});
