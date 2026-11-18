import { test } from "node:test";
import assert from "node:assert/strict";
import { ALL_MODEL_PRICE_TABLES, formatPriceMonth } from "./modelScreenPrices.ts";
import { BATTERY_PRICE_FLOOR, BRAND_REPAIR_PRICES } from "./repairPrices.ts";
import {
  MOTOROLA_BATTERY_PRICES,
  MOTOROLA_SCREEN_PRICES,
  SAMSUNG_BATTERY_PRICES,
  SAMSUNG_SCREEN_PRICES,
  XIAOMI_BATTERY_PRICES,
  XIAOMI_SCREEN_PRICES,
} from "./modelScreenPrices.ts";

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

test("el mes se muestra en castellano", () => {
  assert.equal(formatPriceMonth("2026-10"), "octubre de 2026");
  assert.equal(formatPriceMonth("2026-08"), "agosto de 2026");
});
