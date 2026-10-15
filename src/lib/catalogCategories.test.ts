import assert from "node:assert/strict";
import test from "node:test";
import { getCategoryContent } from "./catalogCategories";

test("las categorías publicadas normalizan nombres y dan orientación específica", () => {
  assert.equal(getCategoryContent(" AURICULAR BT ").title, "Auriculares Bluetooth");
  assert.match(getCategoryContent("CABLE").description, /transmite video/);
  assert.notEqual(getCategoryContent("POWER BANK").description, getCategoryContent("CARGADOR PORTATIL").description);
});

test("una categoría nueva conserva su nombre y no accede al prototipo del diccionario", () => {
  for (const name of ["Fundas", "constructor"]) {
    const content = getCategoryContent(` ${name} `);
    assert.equal(content.title, name);
    assert.match(content.description, /compatibilidad/);
  }
});
