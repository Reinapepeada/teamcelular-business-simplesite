'use client'
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Product, ProductVariant } from "@/app/tienda/product";
import { claveDeCarrito } from "@/lib/cartKey";
import { errorDeCantidades } from "@/lib/commerceValidation";
import { aLineasDeCheckout, carritoComprable } from "@/lib/cartLines";
import { claveDeCheckoutGuardada, huellaDelCarrito } from "@/lib/checkoutKey";
import { pedidoGuardado } from "@/lib/vueltaDelPago";
import { limitarCantidadAlStock } from "@/lib/stockDeLaFicha";

// Item del carrito con variante seleccionada opcional
export interface CartItem {
    /** Ausente en carritos anteriores: permite envío hasta que el servidor indique lo contrario. */
    shipping_enabled?: boolean;
    product: Product;
    variant?: ProductVariant | null;
    quantity: number;
    // Key única para identificar el item (product_id + variant_id)
    cartKey: string;
    /**
     * El slug del producto EN EL BACKEND, que es lo único que entiende el
     * checkout: el catálogo público no expone ids.
     *
     * Opcional porque el carrito se persiste en localStorage y sobrevive al
     * deploy: los ítems agregados antes de esta versión vuelven sin él. De esos
     * no se puede deducir —el slug que armaba el sitio, `nombre-{id}`, usaba el
     * id del backend viejo y nunca matcheó con el del servidor— así que se
     * avisa que hay que volver a agregarlos, en vez de mandarlos y recibir un
     * error incomprensible sobre un producto que está publicado y con stock.
     */
    storeSlug?: string | null;
}

interface CartState {
    destinoEnvio: { province: string; postal_code: string };
    setDestinoEnvio: (destino: Partial<{ province: string; postal_code: string }>) => Promise<void>;
    open: boolean;
    openCart: () => void;
    closeCart: () => void;
    cart: CartItem[];
    cartRevision: string | null;
    totalItems: number;
    totalPrice: number;
    
    // Acciones
    addToCart: (
        product: Product,
        variant?: ProductVariant | null,
        quantity?: number,
        storeSlug?: string | null
    ) => Promise<void>;
    removeFromCart: (cartKey: string) => Promise<void>;
    updateQuantity: (cartKey: string, newQuantity: number) => Promise<void>;
    adjustQuantity: (cartKey: string, delta: number) => Promise<void>;
    clearCart: () => Promise<void>;
    clearPurchasedCart: (orderKey: string) => Promise<boolean>;
    
    // Utilidades
    getItemByKey: (cartKey: string) => CartItem | undefined;
    isInCart: (productId: number, variantId?: number) => boolean;
}

// Generar key única para el carrito. La regla vive en src/lib/cartKey.ts, que
// explica por qué con Fixbee manda el slug y no el id.
const generateCartKey = claveDeCarrito;

// Calcular totales
function calculateTotals(cart: CartItem[]) {
    return {
        totalItems: cart.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: cart.reduce((sum, item) => sum + item.product.retail_price * item.quantity, 0),
    };
}

function changeQuantity(cart: CartItem[], cartKey: string, quantity: (actual: number) => number): CartItem[] {
    return cart.flatMap(item => {
        if (item.cartKey !== cartKey) return [item];
        const next = quantity(item.quantity);
        if (next <= 0) return [];
        return [{ ...item, quantity: limitarCantidadAlStock(next,
            item.variant?.stock ?? item.product.variants.reduce((sum, variant) => sum + variant.stock, 0)) || item.quantity }];
    });
}

// Toda escritura persistida usa el mismo lock y relee el carrito de las otras
// pestañas. Abrir/cerrar el panel no puede volver a guardar una copia vieja.
const newCartRevision = () => globalThis.crypto?.randomUUID?.()
    ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
let persistChange = false;
async function changeCart<T>(change: () => T): Promise<T> {
    const run = async () => {
        await useCartStore.persist.rehydrate();
        persistChange = true;
        try { return change(); } finally { persistChange = false; }
    };
    return globalThis.navigator?.locks
        ? navigator.locks.request("tc.cart", run)
        : run();
}

const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            destinoEnvio: { province: "", postal_code: "" },
            setDestinoEnvio: (cambios) => changeCart(() => { set({ destinoEnvio: { ...get().destinoEnvio, ...cambios } }); }),
            open: false,
            openCart: () => set({ open: true }),
            closeCart: () => set({ open: false }),
            cart: [],
            cartRevision: null,
            totalItems: 0,
            totalPrice: 0,

            addToCart: (product, variant = null, quantity = 1, storeSlug = null) => changeCart(() => {
                const { cart } = get();
                const cartKey = generateCartKey(product.id, variant?.id, storeSlug);
                const existingItem = cart.find((item) => item.cartKey === cartKey);
                const stock = variant?.stock ?? product.variants.reduce((sum, item) => sum + item.stock, 0);
                const nextQuantity = limitarCantidadAlStock((existingItem?.quantity ?? 0) + quantity, stock);
                if (nextQuantity === 0) return;

                let updatedCart: CartItem[];

                if (existingItem) {
                    // Incrementar cantidad si ya existe
                    updatedCart = cart.map((item) =>
                        item.cartKey === cartKey
                            ? {
                                  ...item,
                                  product,
                                  variant,
                                  quantity: nextQuantity,
                                  shipping_enabled: product.shipping_enabled !== false,
                                  // Volver a agregar un producto que venia del
                                  // carrito viejo lo deja comprable.
                                  storeSlug: storeSlug ?? item.storeSlug ?? null,
                              }
                            : item
                    );
                } else {
                    // Agregar nuevo item
                    updatedCart = [
                        ...cart, 
                        {
                            product,
                            variant,
                            quantity: nextQuantity,
                            shipping_enabled: product.shipping_enabled !== false,
                            cartKey,
                            storeSlug,
                        }
                    ];
                }

                const totals = calculateTotals(updatedCart);
                set({ cart: updatedCart, cartRevision: newCartRevision(), ...totals });
            }),

            removeFromCart: (cartKey) => changeCart(() => {
                const { cart } = get();
                const updatedCart = cart.filter((item) => item.cartKey !== cartKey);
                const totals = calculateTotals(updatedCart);
                set({ cart: updatedCart, cartRevision: newCartRevision(), ...totals });
            }),

            updateQuantity: (cartKey, newQuantity) => changeCart(() => {
                const updatedCart = changeQuantity(get().cart, cartKey, () => newQuantity);
                set({ cart: updatedCart, cartRevision: newCartRevision(), ...calculateTotals(updatedCart) });
            }),
            adjustQuantity: (cartKey, delta) => changeCart(() => {
                const updatedCart = changeQuantity(get().cart, cartKey, actual => actual + delta);
                set({ cart: updatedCart, cartRevision: newCartRevision(), ...calculateTotals(updatedCart) });
            }),

            clearCart: () => changeCart(() => {
                set({ cart: [], cartRevision: newCartRevision(), totalItems: 0, totalPrice: 0 });
            }),
            clearPurchasedCart: async (orderKey) => {
                // Sin exclusión entre pestañas, conservar es más seguro que borrar.
                if (!globalThis.navigator?.locks) return false;
                return changeCart(() => {
                    const order = pedidoGuardado(localStorage);
                    const checkoutKey = claveDeCheckoutGuardada(localStorage);
                    if (checkoutKey && checkoutKey !== order?.checkoutKey) return false;
                    // Quitar y volver a agregar lo mismo crea otra selección,
                    // aunque termine con las mismas cantidades.
                    if (!order?.cartRevision || order.cartRevision !== get().cartRevision) return false;
                    const items = get().cart.map(item => ({ slug: item.storeSlug, quantity: item.quantity }));
                    if (errorDeCantidades(items)) return false;
                    const lines = aLineasDeCheckout(items);
                    if (order?.clave !== orderKey || !order.huella || !carritoComprable(lines)
                        || lines.lineas.some(item => !Number.isSafeInteger(item.quantity))
                        || huellaDelCarrito(lines.lineas) !== order.huella) return false;
                    set({ cart: [], cartRevision: newCartRevision(), totalItems: 0, totalPrice: 0 });
                    return true;
                });
            },
            
            getItemByKey: (cartKey) => {
                return get().cart.find((item) => item.cartKey === cartKey);
            },
            
            isInCart: (productId, variantId) => {
                const cartKey = generateCartKey(productId, variantId);
                return get().cart.some((item) => item.cartKey === cartKey);
            },
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => ({
                getItem: (name) => localStorage.getItem(name),
                setItem: (name, value) => { if (persistChange) localStorage.setItem(name, value); },
                removeItem: (name) => localStorage.removeItem(name),
            })),
            merge: (persisted, current) => {
                const saved = (persisted ?? {}) as Partial<CartState>;
                return { ...current, ...saved, cartRevision: typeof saved.cartRevision === "string" ? saved.cartRevision : null };
            },
            // Abrir el carrito es transitorio; recargar conserva solo la compra.
            partialize: ({ cart, cartRevision, totalItems, totalPrice, destinoEnvio }) => ({ cart, cartRevision, totalItems, totalPrice, destinoEnvio }),
        }
    )
);

if (typeof window !== "undefined") {
    window.addEventListener("storage", event => {
        if (event.key === "cart-storage") void useCartStore.persist.rehydrate();
    });
}

export default useCartStore;
