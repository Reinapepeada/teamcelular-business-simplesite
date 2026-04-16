"use client";

import useCartStore from "@/store/cartStore";
import type { Product } from "@/app/tienda/product";

export default function AddToCartButton({ product }: { product: Product }) {
    const addToCart = useCartStore((state) => state.addToCart);

    return (
        <button
            type="button"
            onClick={() => addToCart(product, null, 1)}
            aria-label={`Agregar al carrito: ${product.name}`}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-primary/90"
        >
            Agregar al carrito
        </button>
    );
}
