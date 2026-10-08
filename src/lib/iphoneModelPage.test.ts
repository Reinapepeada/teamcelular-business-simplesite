import { test } from "node:test";
import assert from "node:assert/strict";
import { iphoneModelPageForProductSlug } from "@/app/(site)/reparaciones/iphone/iphoneModels";

const modelo = (slug: string) => iphoneModelPageForProductSlug(slug)?.slug;

test("un cambio de batería de iPhone enlaza a la página de su modelo", () => {
  assert.equal(modelo("cambio-de-bateria-iphone-13-ck-13"), "13");
  assert.equal(modelo("cambio-de-bateria-iphone-13-mini-jc-11"), "13-mini");
  assert.equal(modelo("cambio-de-bateria-iphone-14-pro-max-ampsentrix-31"), "14-pro-max");
  // El producto que cubre 12 y 12 Pro va a la página del 12.
  assert.equal(modelo("cambio-de-bateria-iphone-12-12-pro-ck-4"), "12");
});

test("un modelo más largo sin página no cae en el más corto que sí la tiene", () => {
  // 13 Pro Max no tiene página; no debe enlazar a la del 13 Pro.
  assert.equal(modelo("cambio-de-bateria-iphone-13-pro-max-jc-20"), undefined);
  assert.equal(modelo("cambio-de-bateria-iphone-x-xs-ck-37"), undefined);
});

test("los productos que no son cambio de batería de iPhone no enlazan", () => {
  assert.equal(modelo("pantalla-iphone-13"), undefined);
  assert.equal(modelo("cambio-de-bateria-samsung-a52-ck-1"), undefined);
});
