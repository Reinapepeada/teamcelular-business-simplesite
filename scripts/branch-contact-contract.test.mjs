import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import { runInNewContext } from "node:vm";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";
import * as businessProfile from "../src/lib/businessProfile.ts";

const require = createRequire(import.meta.url);
let pathname = "/";
const source = readFileSync(new URL("../src/components/seo/StructuredData.tsx", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
});
const compiledModule = { exports: {} };
runInNewContext(outputText, {
  module: compiledModule,
  exports: compiledModule.exports,
  require: (name) => {
    if (name === "next/navigation") return { usePathname: () => pathname };
    if (name === "@/lib/businessProfile") return businessProfile;
    return require(name);
  },
});
const StructuredData = compiledModule.exports.default;

function renderSchema(path) {
  pathname = path;
  const html = renderToStaticMarkup(createElement(StructuredData));
  return [...html.matchAll(/<script[^>]*>(.*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
}

test("las sucursales no heredan el teléfono ni el LocalBusiness de Recoleta", () => {
  for (const branch of businessProfile.BRANCHES) {
    const schemas = renderSchema(branch.url);
    assert.equal(schemas.length, 2);
    assert.ok(schemas.every((schema) => schema["@type"] !== "LocalBusiness"));
    const organization = schemas.find((schema) => schema["@type"] === "Organization");
    assert.equal(organization["@id"], businessProfile.businessId("organization"));
    assert.ok(!("telephone" in organization));
    assert.ok(!("contactPoint" in organization));
    assert.ok(schemas.some((schema) => schema["@type"] === "WebSite"));
  }
});

test("la marca es una Organization y cada sucursal su único LocalBusiness", () => {
  for (const path of ["/", "/reparaciones/reparacion-placa-caba", "/tienda/cargador"]) {
    const schemas = renderSchema(path);
    assert.ok(schemas.every((schema) => schema["@type"] !== "LocalBusiness"));
    const organization = schemas.find((schema) => schema["@type"] === "Organization");
    assert.equal(organization.telephone, businessProfile.BUSINESS_PROFILE.phone);
    assert.deepEqual(
      organization.subOrganization.map((branch) => [branch["@id"], branch.telephone, branch.address.streetAddress, branch.address.addressLocality, branch.sameAs]),
      businessProfile.BRANCHES.map((branch) => [businessProfile.branchId(branch), branch.phone, branch.street, "Ciudad Autónoma de Buenos Aires", [branch.mapUrl]]),
    );
  }
  for (const branch of businessProfile.BRANCHES) {
    const organization = renderSchema(branch.url).find((schema) => schema["@type"] === "Organization");
    assert.deepEqual(organization.subOrganization, businessProfile.BRANCHES.map((item) => ({ "@id": businessProfile.branchId(item) })));
  }
});

test("las fichas de Google son de cada sucursal y usan su cid estable", () => {
  const { sameAs } = businessProfile.BUSINESS_PROFILE;
  assert.equal(new Set(sameAs).size, sameAs.length);
  assert.ok(sameAs.every((url) => !url.includes("share.google")));
  for (const branch of businessProfile.BRANCHES) {
    assert.match(branch.mapUrl, /^https:\/\/maps\.google\.com\/\?cid=\d+$/);
    assert.ok(!sameAs.includes(branch.mapUrl), "La marca no se identifica con la ficha de una sucursal");
  }
});
