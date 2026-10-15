"use client";

import type { RefObject } from "react";
import { BsBag } from "react-icons/bs";
import useCartStore from "@/store/cartStore";
import { totalesDelCarrito } from "@/lib/totalesDelCarrito";

export default function StoreCartButton({ triggerRef, loading = false }: {
    triggerRef?: RefObject<HTMLButtonElement | null>;
    loading?: boolean;
}) {
    const { cart, open, openCart } = useCartStore();
    const { unidades } = totalesDelCarrito(cart);
    return (
        <button
            ref={triggerRef}
            type="button"
            onClick={openCart}
            disabled={loading}
            aria-busy={loading || undefined}
            aria-expanded={open}
            aria-controls={open ? "store-cart-sheet" : undefined}
            aria-haspopup="dialog"
            aria-label={loading ? "Preparando carrito…" : `Abrir carrito, ${unidades} artículo${unidades === 1 ? "" : "s"}`}
            className="fixed bottom-5 right-5 z-40 inline-flex min-h-14 items-center gap-3 rounded-full bg-slate-950 pl-5 pr-2 text-sm font-semibold text-white shadow-xl ring-1 ring-white/10 transition hover:bg-slate-800"
        >
            <BsBag aria-hidden="true" className="h-5 w-5" />
            <span>{loading ? "Preparando…" : "Carrito"}</span>
            <span className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-full bg-primary px-2 text-xs font-bold">{unidades}</span>
        </button>
    );
}
