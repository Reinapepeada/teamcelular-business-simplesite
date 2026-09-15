"use client";

import useCartStore from "@/store/cartStore";
import type { Product } from "@/app/tienda/product";

interface AddToCartButtonProps {
    product: Product;
    /**
     * El slug del producto EN EL BACKEND de Fixbee, que es lo único que entiende
     * el checkout: el catálogo público no expone ids.
     *
     * Opcional mientras el catálogo siga leyéndose del backend viejo, que no lo
     * conoce. Sin él el producto entra al carrito igual —se puede mirar, sumar y
     * consultar por WhatsApp— pero el checkout lo va a listar como "volvé a
     * agregarlo" en vez de venderlo: es preferible a mandarlo y recibir un error
     * sobre un producto que está publicado y con stock.
     */
    storeSlug?: string | null;
}

export default function AddToCartButton({ product, storeSlug = null }: AddToCartButtonProps) {
    const addToCart = useCartStore((state) => state.addToCart);

    return (
        <button
            type="button"
            onClick={() => addToCart(product, null, 1, storeSlug)}
            aria-label={`Agregar al carrito: ${product.name}`}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-primary/90"
        >
            Agregar al carrito
        </button>
    );
}
