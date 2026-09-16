/**
 * El catálogo leído del backend nuevo.
 *
 * Lo que se prueba es el desajuste que rompía la compra sin que se notara: el
 * sitio armaba el slug en el navegador y el backend lo tiene guardado. Los dos
 * son "el slug del producto" y no coinciden nunca.
 *
 * Corre con `node --test src/lib/storeCatalog.test.ts`.
 */

import { test, describe } from "node:test";
import assert from "node:assert/strict";

import { adaptarProducto, lineasDelCarrito, imagenDe } from "./storeCatalog.ts";
import type { StoreProduct } from "./storeApi.ts";

const crudo = (over: Partial<StoreProduct> = {}): StoreProduct => ({
    slug: "pantalla-iphone-13",
    name: "Pantalla iPhone 13",
    description: "Original",
    price: 15000,
    currency: "ARS",
    brand: "Apple",
    model: "13",
    condition: "new",
    category: "Pantallas",
    image_key: null,
    image_urls: [],
    warranty_months: 6,
    available: 3,
    ...over,
});

describe("el slug", () => {
    test("es el del servidor, no uno armado en el navegador", () => {
        // El sitio construia `nombre-{id}` con el id del backend viejo. Un
        // carrito armado con ese slug y mandado al checkout nuevo devuelve
        // PRODUCT_UNAVAILABLE sobre productos que existen y estan publicados.
        const producto = adaptarProducto(crudo())!;

        assert.equal(producto.slug, "pantalla-iphone-13");
        assert.ok(!/-\d+$/.test(producto.slug) || producto.slug === "pantalla-iphone-13");
    });

    test("un producto sin slug se descarta en vez de mostrarse", () => {
        // No se puede comprar: el checkout lo identifica por ahi. Una tarjeta
        // que al hacer clic no lleva a ningun lado es peor que no estar.
        assert.equal(adaptarProducto(crudo({ slug: null })), null);
    });
});

describe("el stock", () => {
    test("agotado se sigue mostrando, pero no se puede comprar", () => {
        // Sacarlo del catalogo rompe el link que ya se compartio y lo borra de
        // Google. Lo que hay que impedir es el clic en comprar, no la visita.
        const producto = adaptarProducto(crudo({ available: 0 }))!;

        assert.equal(producto.inStock, false);
        assert.equal(producto.name, "Pantalla iPhone 13");
    });

    test("con stock se puede comprar", () => {
        assert.equal(adaptarProducto(crudo({ available: 1 }))!.inStock, true);
    });

    test("un disponible raro no se toma como stock", () => {
        // Si el backend manda algo que no es un numero, asumir que hay stock
        // deja comprar lo que no existe.
        const producto = adaptarProducto(crudo({ available: NaN as unknown as number }))!;

        assert.equal(producto.available, 0);
        assert.equal(producto.inStock, false);
    });
});

describe("la foto", () => {
    test("una URL completa se usa tal cual", () => {
        assert.equal(imagenDe("https://cdn.test/a.jpg"), "https://cdn.test/a.jpg");
    });

    test("sin base configurada devuelve null en vez de una ruta rota", () => {
        // `image_key` es la clave del bucket, no una URL. Un <img> apuntando a
        // una ruta que no existe se ve peor que el placeholder.
        assert.equal(imagenDe("fotos/a.jpg"), null);
    });

    test("sin foto, null", () => {
        assert.equal(imagenDe(null), null);
    });

    test("la galería pública conserva todas las fotos", () => {
        const producto = adaptarProducto(crudo({
            image_urls: ["/store/products/a/images/0", "/store/products/a/images/1"],
        }))!;
        assert.deepEqual(producto.imageUrls, [
            "/store/products/a/images/0",
            "/store/products/a/images/1",
        ]);
    });
});

describe("las lineas que van al checkout", () => {
    test("llevan slug y cantidad, y nada mas", () => {
        // El precio NO viaja: lo pone el servidor. Mandarlo desde el navegador
        // lo convierte en algo que el comprador puede editar.
        const lineas = lineasDelCarrito([{ slug: "a", quantity: 2 }]);

        assert.deepEqual(lineas, [{ slug: "a", quantity: 2 }]);
        assert.deepEqual(Object.keys(lineas[0]), ["slug", "quantity"]);
    });

    test("una linea sin slug no viaja", () => {
        assert.deepEqual(lineasDelCarrito([{ slug: "", quantity: 1 }]), []);
    });

    test("cantidad cero o negativa no viaja", () => {
        assert.deepEqual(lineasDelCarrito([{ slug: "a", quantity: 0 }]), []);
        assert.deepEqual(lineasDelCarrito([{ slug: "a", quantity: -2 }]), []);
    });

    test("una cantidad fraccionada se trunca", () => {
        // El backend exige entero; mandar 1.5 es un 422 que el comprador no
        // puede entender ni arreglar.
        assert.deepEqual(lineasDelCarrito([{ slug: "a", quantity: 1.9 }]), [
            { slug: "a", quantity: 1 },
        ]);
    });
});
