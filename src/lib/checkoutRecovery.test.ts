import { test } from "node:test";
import assert from "node:assert/strict";
import { claveDeCheckout, secretoDeCheckout, olvidarClave, prepararCheckout } from "./checkoutKey.ts";
import { armarPedido } from "./checkoutFlow.ts";

const storage = () => {
    const data = new Map<string, string>();
    return {
        getItem: (key: string) => data.get(key) ?? null,
        setItem: (key: string, value: string) => { data.set(key, value); },
        removeItem: (key: string) => { data.delete(key); },
    };
};
const items = [{ slug: "pantalla", quantity: 1 }];

test("respuesta perdida: reintento conserva clave y secreto enviados al backend", () => {
    const almacen = storage();
    const key = claveDeCheckout(almacen, items);
    const secret = secretoDeCheckout(almacen, key);
    assert.match(secret, /^[a-f0-9]{64}$/);
    const retryKey = claveDeCheckout(almacen, items);
    assert.equal(retryKey, key);
    assert.equal(secretoDeCheckout(almacen, retryKey), secret);
    assert.equal(armarPedido({ nombre: "Ana", email: "ana@example.com", entrega: "retiro" }, items, key, secret).recovery_token, secret);
    olvidarClave(almacen, key);
    const nextKey = claveDeCheckout(almacen, items);
    assert.notEqual(nextKey, key);
    assert.notEqual(secretoDeCheckout(almacen, nextKey), secret);
});

test("almacenamiento bloqueado: no permite iniciar reserva sin secreto persistido", () => {
    const almacen = storage();
    const key = claveDeCheckout(almacen, items);
    almacen.setItem = () => { throw new Error("storage blocked"); };
    assert.throws(() => secretoDeCheckout(almacen, key), /storage blocked/);
    assert.throws(() => secretoDeCheckout(storage(), key), /Checkout no persistido/);
});

test("dos intentos esperan el mismo lock y recuperan el mismo par persistido", async () => {
    const almacen = storage();
    let release!: () => void;
    let entered!: () => void;
    const ready = new Promise<void>(resolve => { entered = resolve; });
    const held = navigator.locks.request("tc.checkout", async () => {
        entered();
        await new Promise<void>(resolve => { release = resolve; });
    });
    await ready;
    try {
        const first = prepararCheckout(almacen, items);
        const second = prepararCheckout(almacen, items);
        await new Promise(resolve => setTimeout(resolve, 10));
        assert.equal(almacen.getItem("tc.checkout"), null, "no escribe antes de obtener lock");
        release();
        const [a, b] = await Promise.all([first, second]);
        assert.deepEqual(a, b);
        assert.equal(secretoDeCheckout(almacen, a.clave), a.secreto);
    } finally {
        release();
        await held;
    }
});
