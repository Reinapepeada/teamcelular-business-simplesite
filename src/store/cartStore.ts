'use client'
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product, ProductVariant } from "@/app/tienda/product";

// Item del carrito con variante seleccionada opcional
export interface CartItem {
    product: Product;
    variant?: ProductVariant | null;
    quantity: number;
    // Key única para identificar el item (product_id + variant_id)
    cartKey: string;
}

interface CartState {
    cart: CartItem[];
    totalItems: number;
    totalPrice: number;
    
    // Acciones
    addToCart: (product: Product, variant?: ProductVariant | null, quantity?: number) => void;
    removeFromCart: (cartKey: string) => void;
    updateQuantity: (cartKey: string, newQuantity: number) => void;
    clearCart: () => void;
    
    // Utilidades
    getItemByKey: (cartKey: string) => CartItem | undefined;
    isInCart: (productId: number, variantId?: number) => boolean;
}

// Generar key única para el carrito
function generateCartKey(productId: number, variantId?: number): string {
    return variantId ? `${productId}-${variantId}` : `${productId}`;
}

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

            addToCart: (product, variant = null, quantity = 1) => {
                const { cart } = get();
                const cartKey = generateCartKey(product.id, variant?.id);
                const existingItem = cart.find((item) => item.cartKey === cartKey);

                let updatedCart: CartItem[];

                if (existingItem) {
                    // Incrementar cantidad si ya existe
                    updatedCart = cart.map((item) =>
                        item.cartKey === cartKey
                            ? { ...item, quantity: item.quantity + quantity }
                            : item
                    );
                } else {
                    // Agregar nuevo item
                    updatedCart = [
                        ...cart, 
                        { 
                            product, 
                            variant, 
                            quantity,
                            cartKey 
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
                        ? { ...item, quantity: newQuantity } 
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
