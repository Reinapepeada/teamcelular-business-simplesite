import { test } from "node:test";
import assert from "node:assert/strict";
import { productoDeVidriera } from "./fixbeeCatalog";
import { buildProductSeoDescription, buildProductFacts } from "./productSeo";
import { buildProductSchema } from "./productSchema";
import { serializeJsonLd } from "./jsonLd";
import { buildWebsiteMetadata } from "./seoMetadata";
import { getCategoryContent } from "./catalogCategories";

const product = productoDeVidriera({
  slug: "cargador-cld-cw-45", name: "Cargador CLD CW-45", description: "Cargador USB-C. Incluye cable.",
  price: 39000, currency: "ARS", brand: "CLD", model: "CW-45", condition: "new", category: "CARGADOR",
  imageUrl: "/foto.jpg", imageUrls: ["/foto.jpg"], gtin: "696603080459", warrantyMonths: 1,
  available: 2, inStock: true,
});

test("el snippet reserva espacio para entrega y garantía completas, incluso con una introducción larga", () => {
  const description = buildProductSeoDescription({ ...product, description: "Descripción extensa del cargador para equipos compatibles ".repeat(10) });
  assert.ok(description.length <= 155);
  assert.match(description, /… Retiro en Recoleta o envío\. Garantía: 1 mes\.$/);
});

test("un producto sin envío ni garantía declarada no recibe esas promesas en metadata ni ficha", () => {
  const pickupOnly = { ...product, shipping_enabled: false, warranty_time: null, warranty_unit: null };
  const description = buildProductSeoDescription(pickupOnly);
  assert.match(description, /Retiro en Recoleta\. Consultá la garantía\.$/);
  assert.doesNotMatch(description, /envío|90 días|30 días/);
  assert.equal(new Map(buildProductFacts(pickupOnly)).get("Entrega"), "Solo retiro en Recoleta");
  assert.equal(new Map(buildProductFacts(pickupOnly)).get("Garantía"), "consultar antes de comprar");
});

test("sin descripción se usa el nombre; la metadata no añade la marca otra vez", () => {
  const description = buildProductSeoDescription({ ...product, description: null });
  assert.ok(description.startsWith("Cargador CLD CW-45 "));
  assert.equal(description.match(/CLD/g)?.length, 1);
});

test("la ficha muestra los mismos datos del fabricante y garantía que el schema", () => {
  const facts = new Map(buildProductFacts(product));
  const schema = buildProductSchema(product, ["/foto.jpg"], "https://teamcelular.com");
  assert.equal(facts.get("Modelo"), schema.model);
  assert.equal(facts.get("GTIN"), schema.gtin);
  assert.equal(facts.get("Marca"), schema.brand?.name);
  assert.equal(facts.get("Garantía"), schema.additionalProperty[0].value);
  assert.equal(schema.offers.price, "39000");
  assert.equal(schema.offers.priceCurrency, "ARS");
  assert.equal(schema.offers.availability, "https://schema.org/InStock");
  assert.deepEqual(schema.image, ["https://teamcelular.com/foto.jpg"]);
  assert.equal(schema.url, "https://teamcelular.com/tienda/cargador-cld-cw-45");
  assert.equal(schema.offers.url, schema.url);
  assert.ok(!("mpn" in schema));
  assert.equal(schema.offers.hasMerchantReturnPolicy.merchantReturnLink, "https://teamcelular.com/devoluciones");
});

test("el schema omite identificadores y condición desconocidos; no transforma modelo en MPN", () => {
  const missing = { ...product, model: null, gtin: null, brand: null, storeCondition: "unknown", warranty_time: null, variants: [] };
  const schema = JSON.parse(serializeJsonLd(buildProductSchema(missing)));
  for (const key of ["model", "gtin", "sku", "mpn", "brand"]) assert.ok(!(key in schema));
  assert.ok(!("itemCondition" in schema.offers));
  assert.equal(schema.offers.availability, "https://schema.org/OutOfStock");
  assert.equal(schema.additionalProperty[0].value, "consultar antes de comprar");
  const labels = buildProductFacts(missing).map(([label]) => label);
  for (const label of ["Marca", "Modelo", "GTIN", "Condición"]) assert.ok(!labels.includes(label));
});

test("un producto usado conserva condición, precio y stock del catálogo", () => {
  const schema = buildProductSchema({ ...product, storeCondition: "used", variants: [{ ...product.variants[0], stock: 0 }] });
  assert.equal(schema.offers.itemCondition, "https://schema.org/UsedCondition");
  assert.equal(schema.offers.availability, "https://schema.org/OutOfStock");
  assert.equal(schema.offers.price, String(product.retail_price));
});

test("JSON-LD con nombres o descripciones hostiles no cierra script y conserva los datos", () => {
  const malicious = { name: '</script><script>alert("catalogo")</script>', description: "<!-- <img src=x onerror=alert(1)>" };
  const serialized = serializeJsonLd(malicious);
  assert.ok(!serialized.includes("<"));
  assert.deepEqual(JSON.parse(serialized), malicious);
});

test("las fotos de producto no heredan dimensiones inventadas; la imagen institucional mantiene las suyas", () => {
  const base = { path: "/tienda/cargador", title: "Cargador", description: "Descripción" };
  const institutional = buildWebsiteMetadata(base).openGraph?.images as { width?: number; height?: number }[];
  assert.equal(institutional[0].width, 1200);
  assert.equal(institutional[0].height, 630);
  const photo = buildWebsiteMetadata({ ...base, openGraphImagePath: "/foto.jpg", openGraphImageDimensions: null }).openGraph?.images as { width?: number; height?: number }[];
  assert.equal(photo[0].width, undefined);
  assert.equal(photo[0].height, undefined);
});

test("la orientación por categoría enlaza complementos; una categoría nueva tiene respaldo útil", () => {
  assert.ok(getCategoryContent("CARGADOR").relatedSlugs.includes("cable"));
  assert.ok(getCategoryContent("AURICULAR BT").relatedSlugs.includes("auricular"));
  assert.deepEqual(getCategoryContent("Categoría nueva").relatedSlugs, []);
  assert.match(getCategoryContent("Categoría nueva").buyingAdvice, /compatibilidad/);
  assert.equal(getCategoryContent("__proto__").title, "__proto__");
});
