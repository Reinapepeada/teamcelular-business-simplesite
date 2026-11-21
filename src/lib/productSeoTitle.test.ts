import { test } from "node:test";
import assert from "node:assert/strict";
import { buildProductSeoTitle } from "./productSeo";

test("un nombre corto conserva el sufijo de marca", () => {
  assert.equal(buildProductSeoTitle("Cargador CLD CW-45"), "Cargador CLD CW-45 | Team Celular");
});

test("un nombre mediano pierde el sufijo antes que palabras propias", () => {
  const name = "Cable USB-C a USB-C CLD Mesh 60W 2 metros";
  assert.equal(name.length + " | Team Celular".length > 60, false);
  const medium = "Auriculares Bluetooth Puxida C-82 Open Ear Clip Gris";
  assert.equal(buildProductSeoTitle(medium), medium);
});

test("un nombre largo se corta en una palabra completa y nunca supera 60 caracteres", () => {
  const long = "Adaptador Hub USB-C 8 en 1 CLD HDMI 4K, Ethernet RJ45, USB 3.0, SD/TF y Carga PD";
  const title = buildProductSeoTitle(long);
  assert.ok(title.length <= 60, title);
  assert.equal(long.startsWith(title), true);
  assert.equal(/[\s,;:/-]$/.test(title), false);
  assert.equal(long[title.length] === " " || long[title.length] === ",", true);
});

test("un corte no deja un '+' colgando", () => {
  const title = buildProductSeoTitle("Power Bank CLD Fast 10000 mAh con Pantalla Digital, 2 USB + USB-C y Linterna");
  assert.equal(title, "Power Bank CLD Fast 10000 mAh con Pantalla Digital, 2 USB");
});

test("sin nombre usa un genérico", () => {
  assert.equal(buildProductSeoTitle(undefined), "Producto | Team Celular");
  assert.equal(buildProductSeoTitle("   "), "Producto | Team Celular");
});
