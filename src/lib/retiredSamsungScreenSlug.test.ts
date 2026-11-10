import { test } from "node:test";
import assert from "node:assert/strict";
import { isRetiredSamsungScreenSlug } from "./retiredSamsungScreenSlug.ts";

test("las fichas viejas de módulo Samsung se reconocen", () => {
  assert.equal(isRetiredSamsungScreenSlug("cambio-modulo-samsung-a15-calidad-original-56"), true);
  assert.equal(isRetiredSamsungScreenSlug("cambio-modulo-samsung-s10-plus-calidad-original-83"), true);
  assert.equal(isRetiredSamsungScreenSlug("cambio-modulo-samsung-a20s-calidad-oled-63"), true);
  assert.equal(
    isRetiredSamsungScreenSlug("cambio-de-modulo-display-a54-calidad-original-service-pack-75"),
    true,
  );
});

test("otros productos retirados no caen en la guía de Samsung", () => {
  assert.equal(isRetiredSamsungScreenSlug("cambio-de-bateria-iphone-13-ck-13"), false);
  assert.equal(isRetiredSamsungScreenSlug("cable-usb-a-lightning-puxida-86"), false);
  assert.equal(isRetiredSamsungScreenSlug("cambio-de-modulo-display-iphone-13"), false);
  assert.equal(isRetiredSamsungScreenSlug("31"), false);
});
