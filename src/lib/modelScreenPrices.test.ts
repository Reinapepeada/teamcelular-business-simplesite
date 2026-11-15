import { test } from "node:test";
import assert from "node:assert/strict";
import {
  MOTOROLA_SCREEN_PRICES,
  SAMSUNG_SCREEN_PRICES,
  formatPriceMonth,
} from "./modelScreenPrices.ts";

const ALL = [...SAMSUNG_SCREEN_PRICES, ...MOTOROLA_SCREEN_PRICES];

test("los precios por modelo respetan la regla acordada: desde agosto de 2026 y con importe", () => {
  for (const row of ALL) {
    assert.ok(row.from > 0, `${row.model} sin importe`);
    assert.match(row.month, /^2026-(08|09|10|11)$/, `${row.model} fuera del período`);
  }
});

test("no hay modelos repetidos ni tablets en las tablas", () => {
  const names = ALL.map((row) => row.model);
  assert.equal(new Set(names).size, names.length);
  assert.equal(names.some((name) => /tab/i.test(name)), false);
});

test("el mes se muestra en castellano", () => {
  assert.equal(formatPriceMonth("2026-10"), "octubre de 2026");
  assert.equal(formatPriceMonth("2026-08"), "agosto de 2026");
});
