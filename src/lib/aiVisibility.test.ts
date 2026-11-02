import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { AI_PAGES, createAiGraph } from "./aiVisibility";
import { BRANCHES, absoluteUrl, businessId } from "./businessProfile";
import { GET as feed } from "../app/ai-feed.jsonld/route";
import { GET as knowledgeGraph } from "../app/knowledge-graph.json/route";
import { GET as facts } from "../app/llms-full.txt/route";
import { GET as sitemap } from "../app/sitemap-ai.xml/route";
import { GET as agents } from "../app/agents.md/route";
import { NextRequest } from "next/server";
import { proxy } from "../proxy";

test("el grafo identifica una sola marca y resuelve sus referencias sin mezclar sucursales", () => {
  const graph = createAiGraph()["@graph"];
  const ids = graph.map((entity) => entity["@id"]);
  assert.equal(new Set(ids).size, ids.length, "No repetir @id para entidades diferentes");
  assert.equal(graph.filter((entity) => entity["@type"] === "WebSite").length, 1);
  const organization = graph.find((entity) => entity["@type"] === "Organization");
  assert.equal(organization?.["@id"], businessId("organization"));
  assert.match(organization?.disambiguatingDescription ?? "", /CABA, Argentina/);
  assert.match(organization?.disambiguatingDescription ?? "", /No corresponde a Team Celular Panamá/);
  for (const branch of BRANCHES) {
    const entity = graph.find((item) => item["@id"] === `${absoluteUrl(branch.url)}#localbusiness`);
    assert.equal(entity?.telephone, branch.phone);
    assert.equal(entity?.address?.streetAddress, branch.street);
    assert.equal(entity?.parentOrganization?.["@id"], organization?.["@id"]);
  }
  function checkReferences(value: unknown) {
    if (!value || typeof value !== "object") return;
    const record = value as Record<string, unknown>;
    if (typeof record["@id"] === "string") assert.ok(ids.includes(record["@id"]), record["@id"]);
    for (const item of Object.values(record)) checkReferences(item);
  }
  checkReferences(graph);
});

test("el kit responde con formatos reales, datos públicos consistentes y un sitemap de páginas existentes", async () => {
  const feedResponse = feed();
  assert.match(feedResponse.headers.get("content-type") ?? "", /^application\/ld\+json/);
  assert.deepEqual(await feedResponse.json(), await knowledgeGraph().json());
  const text = await facts().text();
  for (const branch of BRANCHES) {
    assert.ok(text.includes(branch.phone));
    assert.ok(text.includes(branch.street));
  }
  const xml = await sitemap().text();
  assert.ok(!xml.includes("<lastmod>"));
  assert.equal(new Set(AI_PAGES.map(([path]) => path)).size, AI_PAGES.length);
  for (const [path] of AI_PAGES) {
    assert.ok(xml.includes(`<loc>${absoluteUrl(path)}</loc>`));
    assert.ok(existsSync(`src/app/(site)${path === "/" ? "" : path}/page.tsx`), path);
  }
});

test("agents.md se sirve como archivo y conserva la negociación Markdown de las demás páginas", async () => {
  const result = proxy(new NextRequest("https://teamcelular.com/agents.md", { headers: { accept: "text/markdown" } }));
  assert.equal(result.headers.get("x-middleware-rewrite"), null);
  assert.match(agents().headers.get("content-type") ?? "", /^text\/markdown/);
  assert.match(await agents().text(), /no concede autorización/);
  const other = proxy(new NextRequest("https://teamcelular.com/contacto.md"));
  assert.equal(other.headers.get("x-middleware-rewrite"), "https://teamcelular.com/api/markdown/contacto");
});
