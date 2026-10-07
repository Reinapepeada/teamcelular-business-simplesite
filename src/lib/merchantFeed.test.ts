/**
 * El feed de Merchant Center. Corre con `npm test`.
 */

import { test } from "node:test";
import assert from "node:assert/strict";

import { categoriaGoogle, feedMerchant } from "./merchantFeed.ts";
import type { CatalogProduct } from "./storeCatalog.ts";

const base: CatalogProduct = {
    slug: "hub-usb-c",
    name: "Hub USB-C <8 en 1> & HDMI",
    description: null,
    price: 30000,
    currency: "ARS",
    brand: "CLD",
    model: null,
    condition: "new",
    category: "ADAPTADOR",
    imageUrl: "/store/products/hub-usb-c/images/0/a",
    imageUrls: ["/store/products/hub-usb-c/images/0/a", "https://cdn.x/b.jpg"],
    gtin: null,
    warrantyMonths: 1,
    available: 0,
    inStock: false,
};

test("arma el item con URLs absolutas, precio y XML escapado", () => {
    const xml = feedMerchant([base], "https://teamcelular.com");
    assert.match(xml, /<g:id>hub-usb-c<\/g:id>/);
    assert.match(xml, /<g:title>Hub USB-C &lt;8 en 1&gt; &amp; HDMI<\/g:title>/);
    assert.match(xml, /<g:link>https:\/\/teamcelular.com\/tienda\/hub-usb-c<\/g:link>/);
    assert.match(xml, /<g:image_link>https:\/\/teamcelular.com\/store\/products\/hub-usb-c\/images\/0\/a<\/g:image_link>/);
    assert.match(xml, /<g:additional_image_link>https:\/\/cdn.x\/b.jpg<\/g:additional_image_link>/);
    assert.match(xml, /<g:price>30000.00 ARS<\/g:price>/);
    assert.match(xml, /<g:availability>out_of_stock<\/g:availability>/);
    assert.match(xml, /<g:identifier_exists>no<\/g:identifier_exists>/);
});

test("con GTIN no declara identifier_exists; sin precio o foto no entra", () => {
    const xml = feedMerchant(
        [
            { ...base, gtin: "6982089741101", condition: "otro", inStock: true },
            { ...base, slug: "gratis", price: 0 },
            { ...base, slug: "sin-foto", imageUrls: [] },
        ],
        "https://teamcelular.com",
    );
    assert.match(xml, /<g:gtin>6982089741101<\/g:gtin>/);
    assert.match(xml, /<g:condition>used<\/g:condition>/);
    assert.doesNotMatch(xml, /identifier_exists/);
    assert.doesNotMatch(xml, /gratis|sin-foto/);
});

test("mapea la categoría a la taxonomía de Google y omite las desconocidas", () => {
    assert.match(feedMerchant([base], "https://teamcelular.com"), /<g:google_product_category>258<\/g:google_product_category>/);
    assert.equal(categoriaGoogle("Cargador  Portátil"), "505295");
    assert.equal(categoriaGoogle("auricular bt"), "543626");
    assert.equal(categoriaGoogle("FUNDA"), undefined);
    assert.equal(categoriaGoogle(null), undefined);
    assert.doesNotMatch(feedMerchant([{ ...base, category: "FUNDA" }], "https://teamcelular.com"), /google_product_category/);
});
