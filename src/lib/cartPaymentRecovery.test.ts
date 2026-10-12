import { test } from "node:test";
import assert from "node:assert/strict";
import { productoDeVidriera } from "./fixbeeCatalog.ts";
import { enlaceDelPedido, finalizarPedidoPagado, pedidoGuardado, recordarPedido, recordarPedidoDelIntento } from "./vueltaDelPago.ts";
import { huellaDelCarrito, prepararIntento, intentoDeCheckout, revisionDelIntento, type AlmacenClave } from "./checkoutKey.ts";
import { armarPedido, reservarYPagarSiCoincide } from "./checkoutFlow.ts";

const crearAlmacen = (): AlmacenClave => {
    const datos = new Map<string, string>();
    return { getItem: key => datos.get(key) ?? null, setItem: (key, value) => { datos.set(key, value); }, removeItem: key => { datos.delete(key); } };
};
const producto = (slug = "funda") => productoDeVidriera({ slug, name: slug, description: null, price: 100, currency: "ARS", brand: null, model: null, condition: "new", category: null, imageUrl: null, warrantyMonths: null, available: 50, inStock: true });
const lines = [{ slug: "funda", quantity: 1 }];

test("F10 pago tardío conserva cambios del carrito y credenciales de otro pedido", async t => {
    const almacen = crearAlmacen();
    const anterior = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
    Object.defineProperty(globalThis, "localStorage", { configurable: true, value: almacen });
    t.after(() => anterior ? Object.defineProperty(globalThis, "localStorage", anterior) : Reflect.deleteProperty(globalThis, "localStorage"));
    const { default: cart } = await import("@/store/cartStore");
    const guardar = () => { almacen.removeItem("tc.checkout"); recordarPedido(almacen, { clave: "TC-A", checkoutKey: "ck-A", token: "token-A", huella: huellaDelCarrito(lines), cartRevision: cart.getState().cartRevision }); };
    await cart.getState().clearCart();
    await cart.getState().addToCart(producto(), null, 1, "funda");
    guardar();
    await cart.getState().addToCart(producto("cable"), null, 1, "cable");
    assert.equal(await cart.getState().clearPurchasedCart("TC-A"), false);
    assert.equal(cart.getState().cart.length, 2);
    await cart.getState().removeFromCart(cart.getState().cart.find(item => item.storeSlug === "cable")!.cartKey);
    await cart.getState().addToCart(producto(), null, 1, "funda");
    assert.equal(await cart.getState().clearPurchasedCart("TC-A"), false, "cantidad nueva no se borra");
    assert.equal(cart.getState().cart[0].quantity, 2);

    const nuevo = await prepararIntento(almacen, [{ slug: "funda", quantity: 2 }], (key, token) => armarPedido({ nombre: "Ana", email: "ana@example.test", entrega: "retiro" }, [{ slug: "funda", quantity: 2 }], key, token));
    recordarPedido(almacen, { clave: "TC-B", checkoutKey: nuevo.payload.checkout_key, token: "token-B", huella: "cable:2" });
    await finalizarPedidoPagado(almacen, "TC-A", cart.getState().clearPurchasedCart);
    assert.equal(cart.getState().cart[0].quantity, 2);
    assert.equal(pedidoGuardado(almacen)?.token, "token-B");
    assert.deepEqual(intentoDeCheckout(almacen), nuevo.payload);
    // B inició la misma compra, pero todavía no llegó su respuesta/reserva.
    await cart.getState().updateQuantity(cart.getState().cart[0].cartKey, 1);
    recordarPedido(almacen, { clave: "TC-A", checkoutKey: "ck-A", huella: "funda:1" });
    assert.equal(await cart.getState().clearPurchasedCart("TC-A"), false);
    assert.deepEqual(intentoDeCheckout(almacen), nuevo.payload);

    // Una pestaña con copia vieja no debe pisar cambios ya persistidos en otra.
    guardar();
    await cart.getState().updateQuantity(cart.getState().cart[0].cartKey, 1);
    const persisted = JSON.parse(almacen.getItem("cart-storage")!);
    persisted.state.cart[0].quantity = 3;
    persisted.state.totalItems = 3; persisted.state.totalPrice = 300;
    await navigator.locks.request("tc.cart", () => almacen.setItem("cart-storage", JSON.stringify(persisted)));
    cart.getState().openCart(); cart.getState().closeCart();
    assert.equal(JSON.parse(almacen.getItem("cart-storage")!).state.cart[0].quantity, 3, "apertura no persiste copia vieja");
    assert.equal(await cart.getState().clearPurchasedCart("TC-A"), false);
    assert.equal(cart.getState().cart[0].quantity, 3, "limpieza relee estado de otra pestaña");

    await cart.getState().updateQuantity(cart.getState().cart[0].cartKey, 1);
    guardar();
    // Mismos productos y cantidades, pero una selección hecha después del pago.
    await cart.getState().removeFromCart(cart.getState().cart[0].cartKey);
    await cart.getState().addToCart(producto(), null, 1, "funda");
    assert.equal(await cart.getState().clearPurchasedCart("TC-A"), false, "reagregar lo mismo no es la selección pagada");
    guardar();
    await cart.getState().updateQuantity(cart.getState().cart[0].cartKey, 2);
    await cart.getState().updateQuantity(cart.getState().cart[0].cartKey, 1);
    assert.equal(await cart.getState().clearPurchasedCart("TC-A"), false, "restaurar cantidad tampoco vuelve a la revisión pagada");
    guardar();
    assert.equal(await cart.getState().clearPurchasedCart("TC-A"), true);
    assert.equal(await cart.getState().clearPurchasedCart("TC-A"), false, "limpieza repetida no tiene efecto");
    assert.equal(cart.getState().cart.length, 0);
});

test("F10 modificación en espera del mismo lock se conserva antes o después de limpiar", async t => {
    const almacen = crearAlmacen();
    const anterior = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
    Object.defineProperty(globalThis, "localStorage", { configurable: true, value: almacen });
    t.after(() => anterior ? Object.defineProperty(globalThis, "localStorage", anterior) : Reflect.deleteProperty(globalThis, "localStorage"));
    const { default: cart } = await import("@/store/cartStore");
    for (const cleanupFirst of [true, false]) {
        await cart.getState().clearCart();
        await cart.getState().addToCart(producto(), null, 1, "funda");
        recordarPedido(almacen, { clave: "TC-A", huella: "funda:1", cartRevision: cart.getState().cartRevision });
        let release!: () => void;
        let entered!: () => void;
        const ready = new Promise<void>(resolve => { entered = resolve; });
        const held = navigator.locks.request("tc.cart", async () => {
            entered(); await new Promise<void>(resolve => { release = resolve; });
        });
        await ready;
        const add = () => cart.getState().addToCart(producto("cable"), null, 1, "cable");
        const clean = () => cart.getState().clearPurchasedCart("TC-A");
        const pending = cleanupFirst ? [clean(), add()] : [add(), clean()];
        release(); await held; await Promise.all(pending);
        assert.equal(cart.getState().cart.find(item => item.storeSlug === "cable")?.quantity, 1);
    }
});

test("F10 sin Web Locks conserva pedido e intento; una confirmación vieja no olvida el nuevo", async () => {
    const almacen = crearAlmacen();
    recordarPedido(almacen, { clave: "TC-A", token: "token-A" });
    const noLocks = null as unknown as LockManager;
    await finalizarPedidoPagado(almacen, "TC-A", async () => { assert.fail("No debe limpiar"); }, noLocks);
    assert.equal(pedidoGuardado(almacen)?.token, "token-A");
    const locks = { request: async (_name: string, fn: () => Promise<void>) => {
        recordarPedido(almacen, { clave: "TC-B", token: "token-B" });
        await fn();
    } } as unknown as LockManager;
    await finalizarPedidoPagado(almacen, "TC-A", async () => { assert.fail("No debe limpiar"); }, locks);
    assert.equal(pedidoGuardado(almacen)?.token, "token-B");
});

test("F12 enlace durable contiene solo referencia pública escapada y sobrevive a limpieza", async () => {
    const almacen = crearAlmacen();
    const clave = "TC-A/B & C";
    recordarPedido(almacen, { clave, token: "private-token" });
    const url = enlaceDelPedido(clave);
    assert.equal(new URL(url, "https://store.example.test").searchParams.get("external_reference"), clave);
    assert.doesNotMatch(url, /private-token|access_token|recovery_token/);
    await finalizarPedidoPagado(almacen, clave, async () => true);
    assert.equal(pedidoGuardado(almacen), null);
    assert.equal(new URL(url, "https://store.example.test").searchParams.get("external_reference"), clave);
});


test("F10 revisión del carrito se captura antes del POST y persiste al recuperar", async () => {
    const almacen = crearAlmacen();
    const state = { cart: [{ storeSlug: "funda", quantity: 1 }], cartRevision: "revision-original" };
    almacen.setItem("cart-storage", JSON.stringify({ state }));
    const intento = await prepararIntento(almacen, lines, (key, token) => armarPedido({ nombre: "Ana", email: "ana@example.test", entrega: "retiro" }, lines, key, token));
    almacen.setItem("cart-storage", JSON.stringify({ state: { ...state, cartRevision: "revision-nueva" } }));
    assert.equal(revisionDelIntento(almacen, intento.payload.checkout_key), "revision-original");
    await recordarPedidoDelIntento(almacen, { clave: "TC-A", checkoutKey: intento.payload.checkout_key, huella: "funda:1" });
    assert.equal(pedidoGuardado(almacen)?.cartRevision, "revision-original");
    const recuperado = await prepararIntento(almacen, lines, () => { assert.fail("No debe reconstruir el intento"); });
    assert.equal(recuperado.recuperado, true);
    assert.equal(revisionDelIntento(almacen, intento.payload.checkout_key), "revision-original");
});

test("F10 respuesta vieja no pisa credenciales ni abre pago de otra compra", async () => {
    const almacen = crearAlmacen();
    const intento = await prepararIntento(almacen, lines, (key, token) => armarPedido({ nombre: "Ana", email: "ana@example.test", entrega: "retiro" }, lines, key, token));
    recordarPedido(almacen, { clave: "TC-B", checkoutKey: intento.payload.checkout_key, token: "token-B" });
    await assert.rejects(recordarPedidoDelIntento(almacen, { clave: "TC-A", checkoutKey: "ck-anterior", token: "token-A" }), /otra pestaña/);
    assert.equal(pedidoGuardado(almacen)?.token, "token-B");
    assert.deepEqual(intentoDeCheckout(almacen), intento.payload);
});

test("F10 otra pestaña cambia carrito antes de persistir intento: no reserva datos viejos", async () => {
    const almacen = crearAlmacen();
    almacen.setItem("cart-storage", JSON.stringify({ state: { cart: [{ storeSlug: "cable", quantity: 1 }], cartRevision: "nueva" } }));
    await assert.rejects(prepararIntento(almacen, lines, () => { assert.fail("No debe construir compra vieja"); }), /carrito cambió/);
    assert.equal(intentoDeCheckout(almacen), null);
});


test("la persistencia fallida o silenciosa del pedido no abre pago y conserva intento", async () => {
    for (const rechazar of [true, false]) {
        const almacen = crearAlmacen();
        const originalSet = almacen.setItem;
        almacen.setItem = (key, value) => {
            if (key === "tc.pedido") { if (rechazar) throw new Error("sin espacio"); return; }
            originalSet(key, value);
        };
        const intento = await prepararIntento(almacen, lines, (key, token) => armarPedido({ nombre: "Ana", email: "ana@example.test", entrega: "retiro" }, lines, key, token));
        let links = 0;
        await assert.rejects(reservarYPagarSiCoincide({
            crearPedido: async () => ({ commerce_key: "TC-A", status: "pending_payment", access_token: "token-A", total_amount: 100, subtotal_amount: 100, shipping_amount: 0, currency: "ARS" }),
            recordar: pedido => recordarPedidoDelIntento(almacen, { clave: pedido.commerce_key, checkoutKey: intento.payload.checkout_key, token: pedido.access_token }),
            pedirLink: async () => { links++; return { checkout_url: "https://payment.example.test" }; },
        }, intento.payload, 100, 0), /guardar el acceso/);
        assert.equal(links, 0);
        assert.deepEqual(intentoDeCheckout(almacen), intento.payload);
    }
});

test("ediciones encoladas incrementan sobre el carrito actual y fusionan destino por campo", async t => {
    const almacen = crearAlmacen();
    const anterior = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
    Object.defineProperty(globalThis, "localStorage", { configurable: true, value: almacen });
    t.after(() => anterior ? Object.defineProperty(globalThis, "localStorage", anterior) : Reflect.deleteProperty(globalThis, "localStorage"));
    const { default: cart } = await import("@/store/cartStore");
    await cart.getState().clearCart();
    await cart.getState().addToCart(producto(), null, 1, "funda");
    const key = cart.getState().cart[0].cartKey;
    let release!: () => void;
    let entered!: () => void;
    const ready = new Promise<void>(resolve => { entered = resolve; });
    const held = navigator.locks.request("tc.cart", async () => {
        entered(); await new Promise<void>(resolve => { release = resolve; });
    });
    await ready;
    const changes = [cart.getState().adjustQuantity(key, 1), cart.getState().adjustQuantity(key, 1), cart.getState().setDestinoEnvio({ province: "B" }), cart.getState().setDestinoEnvio({ postal_code: "1900" })];
    release(); await held; await Promise.all(changes);
    assert.equal(cart.getState().cart[0].quantity, 3);
    assert.deepEqual(cart.getState().destinoEnvio, { province: "B", postal_code: "1900" });
});
