'use client'
import { create } from "zustand";
import Cookies from "js-cookie";

import { Product } from "@/app/tienda/product";

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, newQuantity: number) => void;
}

const initialCart = Cookies.get("cart") ? JSON.parse(Cookies.get("cart") as string) : [];
const useCartStore = create<CartState>((set, get) => ({
  cart: initialCart,
  totalItems: 0,
  totalPrice: 0,

  addToCart: (product) => {
    const { cart } = get();
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      set({
        cart: cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      set({ cart: [...cart, { ...product, quantity: 1 }] });
    }

    // Recalcula totales
    const updatedCart = get().cart;
    set({
      totalItems: updatedCart.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: updatedCart.reduce((sum, item) => sum + item.retail_price * item.quantity, 0),
    });
    Cookies.set("cart", JSON.stringify(updatedCart));
  },

  removeFromCart: (productId) => {
    const { cart } = get();
    const updatedCart = cart.filter((item) => item.id !== productId);
    set({ cart: updatedCart });

    // Recalcula totales
    set({
      totalItems: updatedCart.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: updatedCart.reduce((sum, item) => sum + item.retail_price * item.quantity, 0),
    });
    Cookies.set("cart", JSON.stringify(updatedCart));
  },

  updateQuantity: (productId, newQuantity) => {
    const { cart } = get();

    if (newQuantity === 0) {
      get().removeFromCart(productId);
    } else {
      const updatedCart = cart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
      set({ cart: updatedCart });

      // Recalcula totales
      set({
        totalItems: updatedCart.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: updatedCart.reduce((sum, item) => sum + item.retail_price * item.quantity, 0),
      });
      Cookies.set("cart", JSON.stringify(updatedCart));
    }
  },

  clearCart: () => {
    set({ cart: [] });
    set({ totalItems: 0 });
    set({ totalPrice: 0 });
    Cookies.remove("cart");
  },

}));

export default useCartStore;
