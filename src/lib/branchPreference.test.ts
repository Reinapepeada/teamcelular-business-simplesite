import assert from "node:assert/strict";
import { test } from "node:test";
import { readBranchPreference, saveBranchPreference } from "./branchPreference";

test("elegir sucursal tolera almacenamiento bloqueado o lleno y conserva la preferencia cuando está disponible", (t) => {
  const originalWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
  t.after(() => {
    if (originalWindow) Object.defineProperty(globalThis, "window", originalWindow);
    else Reflect.deleteProperty(globalThis, "window");
  });

  for (const name of ["SecurityError", "QuotaExceededError"]) {
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: { localStorage: { setItem: () => { throw new DOMException("Storage unavailable", name); } } },
    });
    assert.doesNotThrow(() => saveBranchPreference("belgrano", "manual"));
  }
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: { get localStorage() { throw new DOMException("Storage blocked", "SecurityError"); } },
  });
  assert.doesNotThrow(() => saveBranchPreference("recoleta", "manual"));
  assert.equal(readBranchPreference(), null);

  const data = new Map<string, string>();
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: { localStorage: { setItem: (key: string, value: string) => data.set(key, value), getItem: (key: string) => data.get(key) ?? null } },
  });
  saveBranchPreference("belgrano", "manual");
  assert.equal(readBranchPreference()?.slug, "belgrano");
  assert.equal(readBranchPreference()?.method, "manual");
});
