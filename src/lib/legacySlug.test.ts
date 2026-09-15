/**
 * El puente entre las URLs viejas de producto y las de Fixbee.
 *
 * Lo que se prueba es el filo del asunto: un slug legítimo de Fixbee puede
 * terminar en números igual que uno viejo terminaba en el id, así que el orden
 * en que se prueban decide si el comprador llega a la pantalla del iPhone 13 o
 * a otra ficha parecida.
 *
 * Corre con `npm test`.
 */

import { test, describe } from "node:test";
import assert from "node:assert/strict";

import { slugsAProbar } from "./legacySlug.ts";

describe("slugsAProbar", () => {
    test("primero el slug pedido, siempre", () => {
        assert.equal(slugsAProbar("pantalla-iphone-13")[0], "pantalla-iphone-13");
    });

    test("un slug que termina en numeros ofrece el recorte como segundo intento", () => {
        assert.deepEqual(slugsAProbar("pantalla-iphone-13"), [
            "pantalla-iphone-13",
            "pantalla-iphone",
        ]);
    });

    test("sin sufijo numerico no hay segundo intento", () => {
        assert.deepEqual(slugsAProbar("funda-silicona"), ["funda-silicona"]);
    });

    test("solo se recorta el ultimo tramo de numeros", () => {
        assert.deepEqual(slugsAProbar("cable-2-en-1-4821"), [
            "cable-2-en-1-4821",
            "cable-2-en-1",
        ]);
    });

    test("una URL que es solo un id no deja nada que buscar", () => {
        assert.deepEqual(slugsAProbar("4821"), ["4821"]);
    });

    test("un slug que se recorta a nada no se pregunta", () => {
        // `/tienda/-4821` recorta a "". Preguntarlo seria pedir
        // `/store/products/`, que es la lista y no una ficha: el catalogo
        // entero devuelto como si fuera un producto.
        assert.deepEqual(slugsAProbar("-4821"), ["-4821"]);
    });

    test("un slug vacio no manda a preguntar nada", () => {
        assert.deepEqual(slugsAProbar(""), []);
        assert.deepEqual(slugsAProbar("   "), []);
    });

    test("no se inventan intentos duplicados", () => {
        const intentos = slugsAProbar("pantalla-iphone-13");
        assert.equal(new Set(intentos).size, intentos.length);
    });
});
