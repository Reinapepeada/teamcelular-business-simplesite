import { test } from "node:test";
import assert from "node:assert/strict";
import { ALL_MODEL_PRICE_TABLES, formatPriceMonth } from "./modelScreenPrices.ts";
import { BATTERY_PRICE_FLOOR, BRAND_REPAIR_PRICES, SAMSUNG_CHARGING_PORT_PRICES as PIN_LINES } from "./repairPrices.ts";
import { getBrandGuideConfig } from "@/app/(site)/guias/brandGuideConfigs";
import {
  BRAND_CHARGED_PRICES,
  MOTOROLA_BATTERY_PRICES,
  MOTOROLA_SCREEN_PRICES,
  SAMSUNG_BATTERY_PRICES,
  SAMSUNG_CHARGING_PORT_PRICES,
  SAMSUNG_SCREEN_PRICES,
  XIAOMI_BATTERY_PRICES,
  XIAOMI_SCREEN_PRICES,
} from "./modelScreenPrices.ts";

test("el rango de pin de carga por línea de Samsung contiene el precio cobrado de sus modelos", () => {
  const lineOf = (model: string) =>
    PIN_LINES.find((line) => line.models.split(", ").some((m) => model.replace("Galaxy ", "").startsWith(m)));
  // La auditoría del 27/11/2026 encontró A03 a $59.000 y A05 a $79.000 fuera del rango "$35.000 a $55.000".
  assert.equal(lineOf("Galaxy A05")?.to, 79000);
  for (const row of SAMSUNG_CHARGING_PORT_PRICES) {
    const line = lineOf(row.model);
    if (!line) continue;
    assert.ok(row.from >= line.from && row.from <= line.to, `${row.model} fuera de ${line.name}`);
  }
});

test("los precios por modelo respetan la regla acordada: desde agosto de 2026 y con importe", () => {
  for (const table of ALL_MODEL_PRICE_TABLES) {
    for (const row of table) {
      assert.ok(row.from > 0, `${row.model} sin importe`);
      assert.match(row.month, /^2026-(08|09|10|11)$/, `${row.model} fuera del período`);
    }
  }
});

test("no hay modelos repetidos ni tablets dentro de una misma tabla", () => {
  for (const table of ALL_MODEL_PRICE_TABLES) {
    const names = table.map((row) => row.model);
    assert.equal(new Set(names).size, names.length);
    assert.equal(names.some((name) => /tab/i.test(name)), false);
  }
});

test("el piso de los rangos de pantalla por marca no supera lo cobrado por modelo", () => {
  const lowestScreen = (brand: string) =>
    Math.min(...BRAND_REPAIR_PRICES[brand].filter((p) => p.name.includes("pantalla")).map((p) => p.from));
  const lowestCharged = (rows: { from: number }[]) => Math.min(...rows.map((row) => row.from));

  assert.ok(lowestScreen("samsung") <= lowestCharged(SAMSUNG_SCREEN_PRICES));
  assert.ok(lowestScreen("motorola") <= lowestCharged(MOTOROLA_SCREEN_PRICES));
  assert.ok(lowestScreen("xiaomi") <= lowestCharged(XIAOMI_SCREEN_PRICES));
});

test("ninguna batería se publica por debajo del piso de $69.900", () => {
  for (const table of [SAMSUNG_BATTERY_PRICES, MOTOROLA_BATTERY_PRICES, XIAOMI_BATTERY_PRICES]) {
    for (const row of table) assert.ok(row.from >= BATTERY_PRICE_FLOOR, `${row.model} bajo el piso`);
  }
  const batteryFloors = Object.values(BRAND_REPAIR_PRICES).flat().filter((p) => p.name.includes("bateria")).map((p) => p.from);
  assert.equal(Math.min(...batteryFloors), BATTERY_PRICE_FLOOR);
});

test("las marcas con pocas órdenes siguen la misma regla y no contradicen las tablas de Xiaomi", () => {
  for (const [brand, rows] of Object.entries(BRAND_CHARGED_PRICES)) {
    const keys = rows.map((row) => `${row.model}|${row.service}`);
    assert.equal(new Set(keys).size, keys.length, `${brand} repite modelo y reparación`);
    for (const row of rows) {
      assert.ok(row.from > 0, `${row.model} sin importe`);
      assert.match(row.month, /^2026-(08|09|10|11)$/, `${row.model} fuera del período`);
      assert.equal(/tab/i.test(row.model), false, `${row.model} es una tablet`);
      if (row.service === "batería") assert.ok(row.from >= BATTERY_PRICE_FLOOR, `${row.model} bajo el piso`);
    }
  }
  // Mismo invariante que Samsung, Motorola y Xiaomi: el "desde" de la guía no supera lo cobrado.
  const pixelBattery = BRAND_CHARGED_PRICES["google pixel"].filter((r) => r.service === "batería").map((r) => r.from);
  const pixelGuide = getBrandGuideConfig("reparacion-google-pixel-buenos-aires").repairPrices ?? [];
  assert.ok(pixelGuide.find((p) => p.name.includes("bateria"))!.from <= Math.min(...pixelBattery));
  for (const row of BRAND_CHARGED_PRICES.poco.filter((r) => r.service === "batería")) {
    assert.equal(XIAOMI_BATTERY_PRICES.find((x) => x.model === row.model)?.from, row.from, row.model);
  }
});

test("el mes se muestra en castellano", () => {
  assert.equal(formatPriceMonth("2026-10"), "octubre de 2026");
  assert.equal(formatPriceMonth("2026-08"), "agosto de 2026");
});
