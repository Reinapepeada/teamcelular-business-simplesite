import assert from "node:assert/strict";

// Comprueba HTML servido por el build o por producción, sin crear consultas ni pedidos.
const base = (process.argv[2] || "http://127.0.0.1:3299").replace(/\/$/, "");
const canonicalBase = "https://teamcelular.com";
const paths = [
  "/guias/presupuesto-service-oficial-segunda-opinion",
  "/guias/reparacion-pantalla-celular",
  "/guias/reparar-celular-o-comprar-otro",
  "/guias/team-celular-vs-gofix-view-phone",
];
const normalize = (text) => text.replace(/&(?:amp|quot|lt|gt|nbsp|#x27|#39);/g, (entity) => ({ "&amp;": "&", "&quot;": '"', "&lt;": "<", "&gt;": ">", "&nbsp;": " ", "&#x27;": "'", "&#39;": "'" })[entity]).replace(/\s+/g, " ").trim();
const read = async (path) => {
  const response = await fetch(`${base}${path}`, { signal: AbortSignal.timeout(30000), redirect: "manual" });
  assert.equal(response.status, 200, `${path}: HTTP ${response.status}`);
  return response.text();
};

const index = await read("/guias");
const sitemap = await read("/sitemap.xml");
for (const path of paths) {
  const html = await read(path);
  assert.equal([...html.matchAll(/<h1(?:\s[^>]*)?>/g)].length, 1, `${path}: un H1`);
  assert.ok(html.includes(`rel="canonical" href="${canonicalBase}${path}"`), `${path}: canonical propio`);
  assert.doesNotMatch(html, /<meta[^>]*name="robots"[^>]*content="[^"]*noindex/);
  assert.match(html, /<table[\s>]/, `${path}: comparación visible`);
  assert.ok(index.includes(`href="${path}"`), `${path}: enlace desde guías`);
  assert.ok(sitemap.includes(`<loc>${canonicalBase}${path}</loc>`), `${path}: sitemap`);

  const schemas = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
  const article = schemas.find((item) => item["@type"] === "Article");
  assert.equal(article?.mainEntityOfPage?.["@id"], `${canonicalBase}${path}`);
  assert.equal(article?.dateModified, "2026-10-15T00:00:00Z");
  const faq = schemas.find((item) => item["@type"] === "FAQPage");
  assert.ok(faq?.mainEntity?.length >= 5, `${path}: FAQ estructurada`);
  const visibleText = normalize(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ").replace(/<[^>]*>/g, " "));
  for (const question of faq.mainEntity) {
    assert.ok(visibleText.includes(normalize(question.name)), `${path}: pregunta visible: ${question.name}`);
    assert.ok(visibleText.includes(normalize(question.acceptedAnswer.text)), `${path}: respuesta visible: ${question.name}`);
  }
  assert.ok(html.includes('href="/presupuesto-reparacion'), `${path}: presupuesto`);
  console.log(`OK ${path}: HTTP, H1, canonical, tabla, enlaces y ${faq.mainEntity.length} FAQ coherentes`);
}
const comparison = await read(paths[3]);
assert.match(comparison, /viewphone\.com\.ar/);
assert.match(comparison, /gofix\.com\.ar/);
console.log("OK cuatro propuestas; fuentes de GoFix y View Phone presentes");
