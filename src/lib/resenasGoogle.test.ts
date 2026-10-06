import { test } from "node:test";
import assert from "node:assert/strict";
import { anotarParaResenas, datosParaResenas, entregaEstimada } from "./resenasGoogle.ts";

test("el mail solo vuelve para el pedido que lo anotó", () => {
    const m = new Map<string, string>();
    const almacen = { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => void m.set(k, v) };
    anotarParaResenas(almacen, { clave: "TC-1", email: "ana@example.com", envio: true });
    assert.equal(datosParaResenas(almacen, "TC-1")?.email, "ana@example.com");
    assert.equal(datosParaResenas(almacen, "TC-2"), null);
    assert.equal(datosParaResenas(null, "TC-1"), null);
});

test("entrega: retiro hoy, envío +3 días, en hora argentina", () => {
    const hoy = new Date("2026-10-02T02:00:00Z"); // 1/10 23:00 en AR
    assert.equal(entregaEstimada(false, hoy), "2026-10-01");
    assert.equal(entregaEstimada(true, hoy), "2026-10-04");
});
