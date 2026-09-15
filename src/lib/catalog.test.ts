/**
 * El catálogo del sitio, ya leyendo de Fixbee.
 *
 * Lo que se prueba acá es la traducción entre dos vocabularios que casi
 * coinciden: los filtros del sitio (de a muchos, `price-asc`, `minPrice` como
 * texto) y los de la vidriera (de a uno, `price_asc`, números). Un desajuste
 * en esa traducción no rompe nada visible: devuelve la página equivocada.
 *
 * Corre con `npm test`.
 */

import { test, describe } from "node:test";
import assert from "node:assert/strict";

import {
    ITEMS_PER_PAGE,
    parametrosDeCatalogo,
    type CatalogFiltersState,
} from "./catalog.ts";
import { productoDeVidriera } from "./fixbeeCatalog.ts";
import type { CatalogProduct } from "./storeCatalog.ts";

const filtros = (over: Partial<CatalogFiltersState> = {}): CatalogFiltersState => ({
    page: 1,
    search: "",
    categories: [],
    brands: [],
    minPrice: "",
    maxPrice: "",
    sort: "",
    ...over,
});

describe("parametrosDeCatalogo", () => {
    test("pide la pagina que se le pidio, del tamano del sitio", () => {
        const p = parametrosDeCatalogo(filtros({ page: 3 }));
        assert.equal(p.page, 3);
        assert.equal(p.size, ITEMS_PER_PAGE);
    });

    test("sin filtros no manda nada de mas", () => {
        assert.deepEqual(parametrosDeCatalogo(filtros()), {
            page: 1,
            size: ITEMS_PER_PAGE,
        });
    });

    test("manda la busqueda tal cual la escribio el comprador", () => {
        assert.equal(parametrosDeCatalogo(filtros({ search: "pantalla 13" })).search, "pantalla 13");
    });

    test("de varias categorias manda la primera: el backend filtra de a una", () => {
        const p = parametrosDeCatalogo(filtros({ categories: ["Pantallas", "Fundas"] }));
        assert.equal(p.category, "Pantallas");
    });

    test("la categoria forzada de /tienda/categoria gana sobre la elegida", () => {
        const p = parametrosDeCatalogo(filtros({ categories: ["Fundas"] }), "Pantallas");
        assert.equal(p.category, "Pantallas");
    });

    test("de varias marcas manda la primera", () => {
        assert.equal(parametrosDeCatalogo(filtros({ brands: ["Apple", "Samsung"] })).brand, "Apple");
    });

    test("el rango de precios viaja como numero", () => {
        const p = parametrosDeCatalogo(filtros({ minPrice: "1000", maxPrice: "5000" }));
        assert.equal(p.min_price, 1000);
        assert.equal(p.max_price, 5000);
    });

    test("un precio ilegible no se manda: seria un 422 sobre toda la pagina", () => {
        const p = parametrosDeCatalogo(filtros({ minPrice: "mil", maxPrice: "-5" }));
        assert.ok(!("min_price" in p));
        assert.ok(!("max_price" in p));
    });

    test("los ordenes se traducen a los nombres del backend", () => {
        assert.equal(parametrosDeCatalogo(filtros({ sort: "price-asc" })).sort, "price_asc");
        assert.equal(parametrosDeCatalogo(filtros({ sort: "price-desc" })).sort, "price_desc");
        assert.equal(parametrosDeCatalogo(filtros({ sort: "name-asc" })).sort, "name");
    });

    test("un orden que el backend no tiene no se manda", () => {
        // Mandarlo crudo lo haria caer en el orden por defecto igual, pero el
        // dia que el backend valide `sort` seria un error sobre toda la pagina.
        assert.ok(!("sort" in parametrosDeCatalogo(filtros({ sort: "name-desc" }))));
        assert.ok(!("sort" in parametrosDeCatalogo(filtros({ sort: "" }))));
    });
});

const deFixbee = (over: Partial<CatalogProduct> = {}): CatalogProduct => ({
    slug: "pantalla-iphone-13",
    name: "Pantalla iPhone 13",
    description: "Original",
    price: 15000,
    currency: "ARS",
    brand: "Apple",
    model: "13",
    condition: "new",
    category: "Pantallas",
    imageUrl: null,
    warrantyMonths: 6,
    available: 3,
    inStock: true,
    ...over,
});

describe("productoDeVidriera", () => {
    test("lleva el slug del backend, que es lo unico que entiende el checkout", () => {
        assert.equal(productoDeVidriera(deFixbee()).storeSlug, "pantalla-iphone-13");
    });

    test("el precio que se muestra es el de la publicacion", () => {
        assert.equal(productoDeVidriera(deFixbee({ price: 999 })).retail_price, 999);
    });

    test("el stock viaja en una variante: el sitio suma variantes para saber si hay", () => {
        const p = productoDeVidriera(deFixbee({ available: 7 }));
        const stock = p.variants.reduce((total, v) => total + v.stock, 0);
        assert.equal(stock, 7);
    });

    test("sin stock queda en cero y no en 'no se sabe'", () => {
        const p = productoDeVidriera(deFixbee({ available: 0, inStock: false }));
        assert.equal(p.variants.reduce((t, v) => t + v.stock, 0), 0);
    });

    test("la garantia en meses llega con su unidad, o la ficha no la muestra", () => {
        const p = productoDeVidriera(deFixbee({ warrantyMonths: 6 }));
        assert.equal(p.warranty_time, 6);
        assert.equal(p.warranty_unit, "MONTHS");
    });

    test("sin garantia declarada no se inventa una", () => {
        const p = productoDeVidriera(deFixbee({ warrantyMonths: null }));
        assert.equal(p.warranty_time, null);
        assert.equal(p.warranty_unit, null);
    });

    test("sin foto la variante no trae una imagen rota", () => {
        assert.deepEqual(productoDeVidriera(deFixbee({ imageUrl: null })).variants[0].images, []);
    });

    test("con foto la lleva para que la tarjeta la muestre", () => {
        const p = productoDeVidriera(deFixbee({ imageUrl: "https://cdn/x.jpg" }));
        assert.equal(p.variants[0].images[0].image_url, "https://cdn/x.jpg");
    });

    test("no publica el costo: es el margen de compra", () => {
        assert.equal(productoDeVidriera(deFixbee()).cost, 0);
    });

    test("categoria y marca llegan como nombre, o la tarjeta no las muestra", () => {
        const p = productoDeVidriera(deFixbee({ category: "Fundas", brand: "Samsung" }));
        assert.equal(p.category?.name, "Fundas");
        assert.equal(p.brand?.name, "Samsung");
    });

    test("sin categoria ni marca no se inventan etiquetas vacias", () => {
        const p = productoDeVidriera(deFixbee({ category: null, brand: null }));
        assert.equal(p.category, null);
        assert.equal(p.brand, null);
    });
});
