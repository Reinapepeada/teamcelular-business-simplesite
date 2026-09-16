'use client'
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product, ProductVariant } from "@/app/tienda/product";
import { claveDeCarrito } from "@/lib/cartKey";
import { limitarCantidadAlStock } from "@/lib/stockDeLaFicha";

// Item del carrito con variante seleccionada opcional
export interface CartItem {
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
    cart: CartItem[];
    totalItems: number;
    totalPrice: number;
    
    // Acciones
    addToCart: (
        product: Product,
        variant?: ProductVariant | null,
        quantity?: number,
        storeSlug?: string | null
    ) => void;
    removeFromCart: (cartKey: string) => void;
    updateQuantity: (cartKey: string, newQuantity: number) => void;
    clearCart: () => void;
    
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

const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            cart: [],
            totalItems: 0,
            totalPrice: 0,

            addToCart: (product, variant = null, quantity = 1, storeSlug = null) => {
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
                            cartKey,
                            storeSlug,
                        }
                    ];
                }

                const totals = calculateTotals(updatedCart);
                set({ cart: updatedCart, ...totals });
            },

            removeFromCart: (cartKey) => {
                const { cart } = get();
                const updatedCart = cart.filter((item) => item.cartKey !== cartKey);
                const totals = calculateTotals(updatedCart);
                set({ cart: updatedCart, ...totals });
            },

            updateQuantity: (cartKey, newQuantity) => {
                const { cart, removeFromCart } = get();

                if (newQuantity <= 0) {
                    removeFromCart(cartKey);
                    return;
                }

                const updatedCart = cart.map((item) =>
                    item.cartKey === cartKey 
                        ? {
                            ...item,
                            quantity: limitarCantidadAlStock(
                                newQuantity,
                                item.variant?.stock ?? item.product.variants.reduce((sum, variant) => sum + variant.stock, 0),
                            ) || item.quantity,
                        }
                        : item
                );
                
                const totals = calculateTotals(updatedCart);
                set({ cart: updatedCart, ...totals });
            },

            clearCart: () => {
                set({ cart: [], totalItems: 0, totalPrice: 0 });
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
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useCartStore;
