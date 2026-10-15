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

test("portada, servicios y productos conservan la entidad global de sus referencias", () => {
  for (const path of ["/", "/reparaciones/reparacion-placa-caba", "/tienda/cargador"]) {
    const schemas = renderSchema(path);
    const local = schemas.find((schema) => schema["@id"] === businessProfile.businessId("localbusiness"));
    assert.equal(local.telephone, businessProfile.BUSINESS_PROFILE.phone);
    assert.equal(local.department.length, businessProfile.BRANCHES.length);
    assert.equal(schemas.find((schema) => schema["@type"] === "Organization").telephone, businessProfile.BUSINESS_PROFILE.phone);
  }
});
