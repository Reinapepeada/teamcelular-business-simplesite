import { test } from "node:test";
import assert from "node:assert/strict";
import { etiquetaCondicion, productoDeVidriera } from "./fixbeeCatalog.ts";

test("el carrito conserva condición, admite compras viejas y no persiste su apertura", async (t) => {
    const product = productoDeVidriera({
        slug: "equipo-usado", name: "Equipo", description: null, price: 100,
        currency: "ARS", brand: null, model: null, condition: "used",
        category: null, imageUrl: null, warrantyMonths: null, available: 3, inStock: true,
    });
    let saved: string | null = null;
    const previousStorage = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
    Object.defineProperty(globalThis, "localStorage", { configurable: true, value: {
        getItem: () => saved,
        setItem: (_key: string, value: string) => { saved = value; },
        removeItem: () => { saved = null; },
    } });
    t.after(() => {
        if (previousStorage) Object.defineProperty(globalThis, "localStorage", previousStorage);
        else Reflect.deleteProperty(globalThis, "localStorage");
    });
    const { default: useCartStore } = await import("@/store/cartStore");
    useCartStore.getState().clearCart();
    assert.deepEqual(useCartStore.getState().destinoEnvio, { province: "", postal_code: "" });
    useCartStore.getState().setDestinoEnvio({ province: "B", postal_code: "1900" });
    useCartStore.getState().addToCart(product, null, 1, product.storeSlug);
    useCartStore.getState().openCart();
    assert.equal(useCartStore.getState().open, true);
    const persisted = JSON.parse(saved!);
    assert.equal(persisted.state.open, undefined);
    assert.deepEqual(persisted.state.destinoEnvio, { province: "B", postal_code: "1900" });
    assert.equal(persisted.state.cart[0].product.storeCondition, "used");
    assert.equal(persisted.state.cart[0].shipping_enabled, true);
    useCartStore.getState().closeCart();
    await useCartStore.persist.rehydrate();
    assert.deepEqual(useCartStore.getState().destinoEnvio, { province: "B", postal_code: "1900" });
    assert.equal(useCartStore.getState().open, false);
    assert.equal(etiquetaCondicion(useCartStore.getState().cart[0].product.storeCondition), "Usado");

    // El mismo formato de localStorage anterior a la condición sigue siendo comprable.
    delete persisted.state.cart[0].product.storeCondition;
    delete persisted.state.cart[0].shipping_enabled;
    delete persisted.state.cart[0].product.shipping_enabled;
    saved = JSON.stringify(persisted);
    await useCartStore.persist.rehydrate();
    const oldItem = useCartStore.getState().cart[0];
    assert.equal(etiquetaCondicion(oldItem.product.storeCondition), null);
    assert.equal(oldItem.storeSlug, "equipo-usado");
    assert.equal(oldItem.quantity, 1);
    assert.equal(oldItem.shipping_enabled, undefined);
    useCartStore.getState().updateQuantity(oldItem.cartKey, 2);
    assert.equal(useCartStore.getState().totalPrice, 200);
    useCartStore.getState().addToCart(product, null, 1, product.storeSlug);
    assert.equal(useCartStore.getState().cart[0].product.storeCondition, "used");
    assert.equal(useCartStore.getState().cart[0].quantity, 3);
    useCartStore.getState().addToCart({ ...product, shipping_enabled: false }, null, 1, product.storeSlug);
    assert.equal(useCartStore.getState().cart[0].shipping_enabled, false);
    await useCartStore.persist.rehydrate();
    assert.equal(useCartStore.getState().cart[0].shipping_enabled, false);
    useCartStore.getState().clearCart();
    useCartStore.getState().addToCart({ ...product, shipping_enabled: false }, null, 1, product.storeSlug);
    assert.equal(useCartStore.getState().cart[0].shipping_enabled, false);
    useCartStore.getState().clearCart();
});

test("condición en español sin inventar estado para datos ausentes", () => {
    for (const [value, label] of Object.entries({ new: "Nuevo", nuevo: "Nuevo", used: "Usado", usado: "Usado", refurbished: "Reacondicionado", reacondicionado: "Reacondicionado" })) {
        assert.equal(etiquetaCondicion(value), label);
    }
    assert.equal(etiquetaCondicion(undefined), null);
    assert.equal(etiquetaCondicion(""), null);
    assert.equal(etiquetaCondicion("desconocido"), null);
});
