import { test } from "node:test";
import assert from "node:assert/strict";
import { productoDeVidriera } from "./fixbeeCatalog";
import { buildProductSeoDescription, buildProductFacts } from "./productSeo";
import { buildProductSchema } from "./productSchema";
import { serializeJsonLd } from "./jsonLd";
import { buildWebsiteMetadata } from "./seoMetadata";
import { getCategoryContent } from "./catalogCategories";
import { formatWarranty, getProductWarranty } from "@/app/tienda/product";

const product = productoDeVidriera({
  slug: "cargador-cld-cw-45", name: "Cargador CLD CW-45", description: "Cargador USB-C. Incluye cable.",
  price: 39000, currency: "ARS", brand: "CLD", model: "CW-45", condition: "new", category: "CARGADOR",
  imageUrl: "/foto.jpg", imageUrls: ["/foto.jpg"], gtin: "696603080459", warrantyMonths: 1,
  available: 2, inStock: true,
});

test("el snippet reserva espacio para entrega y garantía completas, incluso con una introducción larga", () => {
  const description = buildProductSeoDescription({ ...product, description: "Descripción extensa del cargador para equipos compatibles ".repeat(10) });
  assert.ok(description.length <= 155);
  assert.match(description, /… Retiro en Recoleta o envío\. Garantía legal: 6 meses\.$/);
});

test("un producto nuevo sin garantía comercial informada conserva la legal y respeta retiro sin envío", () => {
  const pickupOnly = { ...product, shipping_enabled: false, warranty_time: null, warranty_unit: null };
  const description = buildProductSeoDescription(pickupOnly);
  assert.match(description, /Retiro en Recoleta\. Garantía legal: 6 meses\.$/);
  assert.doesNotMatch(description, /envío|90 días|30 días/);
  assert.equal(new Map(buildProductFacts(pickupOnly)).get("Entrega"), "Solo retiro en Recoleta");
  assert.equal(new Map(buildProductFacts(pickupOnly)).get("Garantía legal"), "6 meses");
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
  assert.equal(facts.get("Garantía legal"), schema.additionalProperty[0].value);
  assert.equal(schema.additionalProperty[0].name, "Garantía legal");
  assert.equal(schema.additionalProperty[0].value, "6 meses");
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
  assert.equal(schema.additionalProperty[0].name, "Garantía informada");
  assert.doesNotMatch(buildProductSeoDescription(missing), /Garantía legal|6 meses|3 meses/);
  const labels = buildProductFacts(missing).map(([label]) => label);
  for (const label of ["Marca", "Modelo", "GTIN", "Condición"]) assert.ok(!labels.includes(label));
});

test("un producto usado conserva condición, precio y stock del catálogo", () => {
  const schema = buildProductSchema({ ...product, storeCondition: "used", variants: [{ ...product.variants[0], stock: 0 }] });
  assert.equal(schema.offers.itemCondition, "https://schema.org/UsedCondition");
  assert.equal(schema.offers.availability, "https://schema.org/OutOfStock");
  assert.equal(schema.offers.price, String(product.retail_price));
  assert.equal(schema.additionalProperty[0].value, "3 meses");
});

test("la presentación legal respeta condición conocida y conserva el dato comercial sin modificarlo", () => {
  for (const storeCondition of ["new", "nuevo", " NUEVO "]) {
    assert.deepEqual(getProductWarranty({ ...product, storeCondition }), { label: "Garantía legal", value: "6 meses" });
  }
  for (const storeCondition of ["used", "usado", " USADO "]) {
    assert.deepEqual(getProductWarranty({ ...product, storeCondition }), { label: "Garantía legal", value: "3 meses" });
  }
  assert.equal(formatWarranty(product), "1 mes");
  assert.equal(product.warranty_time, 1);
  assert.equal(product.warranty_unit, "MONTHS");
});

test("garantías mayores y expresadas en días se conservan separadas sin equiparar días y meses", () => {
  const cases = [
    { warranty_time: 12, warranty_unit: "MONTHS" as const, expected: "6 meses; garantía informada: 12 meses" },
    { warranty_time: 1, warranty_unit: "YEARS" as const, expected: "6 meses; garantía informada: 1 año" },
    { warranty_time: 365, warranty_unit: "DAYS" as const, expected: "6 meses; garantía informada: 365 días" },
    { warranty_time: 30, warranty_unit: "DAYS" as const, expected: "6 meses; garantía informada: 30 días" },
    { warranty_time: 6, warranty_unit: "MONTHS" as const, expected: "6 meses" },
  ];
  for (const { expected, ...warranty } of cases) {
    const candidate = { ...product, ...warranty };
    assert.equal(getProductWarranty(candidate).value, expected);
    const facts = new Map(buildProductFacts(candidate));
    assert.equal(facts.get("Garantía legal"), expected);
    assert.equal(buildProductSchema(candidate).additionalProperty[0].value, expected);
    const description = buildProductSeoDescription(candidate);
    assert.ok(description.length <= 155);
    assert.ok(description.endsWith(`Garantía legal: ${expected}.`));
  }
});

test("condición desconocida o reacondicionada no recibe un plazo legal supuesto", () => {
  for (const storeCondition of [undefined, "unknown", "refurbished", "reacondicionado"]) {
    assert.deepEqual(getProductWarranty({ ...product, storeCondition }), { label: "Garantía informada", value: "1 mes" });
    for (const warranty_time of [null, 0, -1, Number.NaN, Number.POSITIVE_INFINITY]) {
      assert.deepEqual(getProductWarranty({ ...product, storeCondition, warranty_time }), { label: "Garantía informada", value: "consultar antes de comprar" });
    }
  }
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
