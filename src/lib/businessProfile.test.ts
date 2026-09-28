/**
 * Nombre de marca en el schema: Organization, LocalBusiness y WebSite declaran
 * el mismo `name` y las variantes con que se busca la marca (`alternateName`).
 *
 * Corre con `npm test`.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { BUSINESS_PROFILE } from "./businessProfile.ts";

test("la marca declara variantes de búsqueda que apuntan al dominio", () => {
    assert.equal(BUSINESS_PROFILE.name, "Team Celular");
    assert.deepEqual(BUSINESS_PROFILE.alternateName, ["TeamCelular", "teamcelular.com"]);
});

test("LocalBusiness, Organization y WebSite publican el alternateName", () => {
    const source = readFileSync(new URL("../components/seo/StructuredData.tsx", import.meta.url), "utf8");
    const conNombre = source.match(/name: BUSINESS_PROFILE\.name,\n\s+alternateName: BUSINESS_PROFILE\.alternateName,/g) ?? [];
    assert.equal(conNombre.length, 3);
});
