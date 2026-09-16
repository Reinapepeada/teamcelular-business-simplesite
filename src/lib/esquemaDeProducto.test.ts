import test from "node:test";
import assert from "node:assert/strict";

import { esquemaDeProducto, hayStock } from "./esquemaDeProducto";

const variante = (stock: number, imagen?: string) => ({
    stock,
    images: imagen ? [{ image_url: imagen }] : [],
});

const base = {
    name: "iPhone 11",
    description: "",
    serial_number: "",
    retail_price: 250000,
    storeSlug: "iphone-11",
    storeCondition: "used",
    brand: { name: "Apple" },
    variants: [variante(3, "https://cdn/iphone.jpg")],
};

const oferta = (p: Parameters<typeof esquemaDeProducto>[0]) =>
    esquemaDeProducto(p).offers as Record<string, unknown>;

test("la condicion sale del producto y no es siempre nueva", () => {
    assert.equal(oferta(base).itemCondition, "https://schema.org/UsedCondition");
    assert.equal(
        oferta({ ...base, storeCondition: "new" }).itemCondition,
        "https://schema.org/NewCondition",
    );
    assert.equal(
        oferta({ ...base, storeCondition: "refurbished" }).itemCondition,
        "https://schema.org/RefurbishedCondition",
    );
});

test("sin condicion declarada no se publica como nuevo", () => {
    assert.equal(oferta({ ...base, storeCondition: null }).itemCondition, "https://schema.org/UsedCondition");
});

test("la url usa el slug del backend, no uno armado con el id", () => {
    assert.equal(oferta(base).url, "https://teamcelular.com/tienda/iphone-11");
    assert.equal(
        oferta({ ...base, storeSlug: null, id: 7 }).url,
        "https://teamcelular.com/tienda/iphone-11-7",
    );
});

test("el stock negativo es sin stock", () => {
    assert.equal(hayStock({ variants: [variante(-2)] }), false);
    assert.equal(oferta({ ...base, variants: [variante(-2)] }).availability, "https://schema.org/OutOfStock");
    assert.equal(oferta({ ...base, variants: [variante(0)] }).availability, "https://schema.org/OutOfStock");
    assert.equal(oferta({ ...base, variants: [variante(1)] }).availability, "https://schema.org/InStock");
});

test("sin variantes es sin stock, no un error", () => {
    assert.equal(oferta({ ...base, variants: [] }).availability, "https://schema.org/OutOfStock");
    assert.equal(esquemaDeProducto({}).image, "");
});

test("la imagen se busca en todas las variantes", () => {
    const p = { ...base, variants: [variante(1), variante(2, "https://cdn/b.jpg")] };
    assert.equal(esquemaDeProducto(p).image, "https://cdn/b.jpg");
});

test("la descripcion vacia cae al nombre", () => {
    assert.equal(esquemaDeProducto(base).description, "iPhone 11");
    assert.equal(esquemaDeProducto({ ...base, description: "Impecable" }).description, "Impecable");
});

test("sin marca declarada dice Generic", () => {
    const b = esquemaDeProducto({ ...base, brand: null }).brand as Record<string, unknown>;
    assert.equal(b.name, "Generic");
});
