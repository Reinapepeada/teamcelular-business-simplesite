"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { buildProductSlug } from "@/lib/productSlug";
import useCartStore, { type CartItem } from "@/store/cartStore";

const WHATSAPP_NUMBER =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || "5491151034595";

function formatPrice(price: number) {
    return new Intl.NumberFormat("es-AR").format(price);
}

function getProductImage(item: CartItem) {
    if (item.variant?.images?.[0]?.image_url) {
        return item.variant.images[0].image_url;
    }

    return (
        item.product.variants?.find((variant) => variant.images?.length)?.images?.[0]
            ?.image_url || "/placeholder.jpg"
    );
}

export default function StoreCartSheet() {
    const [open, setOpen] = useState(false);
    const { cart, removeFromCart, updateQuantity, clearCart } = useCartStore();

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce(
        (sum, item) => sum + item.product.retail_price * item.quantity,
        0,
    );

    useEffect(() => {
        if (!open) {
            return undefined;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [open]);

    const whatsappMessage = encodeURIComponent(
        [
            "Hola Team Celular, quiero consultar por estos productos:",
            "",
            ...cart.map((item, index) => {
                const variantParts = [
                    item.variant?.color || "",
                    item.variant?.size || "",
                ]
                    .filter(Boolean)
                    .join(" / ");

                return `${index + 1}. ${item.product.name}${
                    variantParts ? ` (${variantParts})` : ""
                } x${item.quantity} - $${formatPrice(
                    item.product.retail_price * item.quantity,
                )}`;
            }),
            "",
            `Total estimado: $${formatPrice(totalPrice)}`,
        ].join("\n"),
    );

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen((current) => !current)}
                aria-expanded={open}
                aria-controls="store-cart-sheet"
                className="fixed bottom-5 right-5 z-40 inline-flex min-h-14 items-center gap-3 rounded-full bg-slate-950 px-5 text-sm font-semibold text-white shadow-xl transition hover:bg-slate-800"
            >
                <span>Carrito</span>
                <span className="inline-flex min-h-8 min-w-8 items-center justify-center rounded-full bg-primary px-2 text-xs font-bold">
                    {totalItems}
                </span>
            </button>

            {open ? (
                <button
                    type="button"
                    aria-label="Cerrar carrito"
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 z-40 bg-slate-950/40"
                />
            ) : null}

            <aside
                id="store-cart-sheet"
                aria-label="Resumen del carrito"
                className={`fixed bottom-0 right-0 z-50 flex h-[85vh] w-full max-w-md flex-col rounded-t-[2rem] border border-slate-200 bg-white shadow-2xl transition-transform duration-300 dark:border-slate-700 dark:bg-slate-950 sm:top-0 sm:h-full sm:rounded-l-[2rem] sm:rounded-tr-none ${
                    open ? "translate-y-0 sm:translate-x-0" : "translate-y-full sm:translate-x-full"
                }`}
            >
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-700">
                    <div>
                        <p className="text-lg font-semibold text-slate-950 dark:text-slate-50">Tu carrito</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            {totalItems} articulo{totalItems === 1 ? "" : "s"}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:bg-slate-800"
                    >
                        Cerrar
                    </button>
                </div>

                <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
                    {cart.length === 0 ? (
                        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center dark:border-slate-700 dark:bg-slate-900/70">
                            <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                Todavia no agregaste productos
                            </p>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                Usa el carrito para pedir accesorios o repuestos por WhatsApp.
                            </p>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <article
                                key={item.cartKey}
                                className="rounded-3xl border border-slate-200 p-4 dark:border-slate-700"
                            >
                                <div className="flex gap-4">
                                    <div className="relative h-20 w-20 flex-none overflow-hidden rounded-2xl bg-slate-50 dark:bg-slate-900">
                                        <Image
                                            src={getProductImage(item)}
                                            alt={item.product.name}
                                            fill
                                            className="object-contain p-2"
                                            sizes="80px"
                                        />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <Link
                                            href={`/tienda/${buildProductSlug(item.product)}`}
                                            prefetch={false}
                                            onClick={() => setOpen(false)}
                                            className="line-clamp-2 text-sm font-semibold text-slate-950 transition hover:text-primary dark:text-slate-50"
                                        >
                                            {item.product.name}
                                        </Link>
                                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                                            ${formatPrice(item.product.retail_price)} c/u
                                        </p>
                                        {item.variant?.color || item.variant?.size ? (
                                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                                {[item.variant?.color, item.variant?.size]
                                                    .filter(Boolean)
                                                    .join(" / ")}
                                            </p>
                                        ) : null}
                                    </div>
                                </div>
                                
                                <div className="mt-4 flex items-center justify-between gap-3">
                                    <div className="flex items-center rounded-full border border-slate-300 dark:border-slate-600">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                updateQuantity(
                                                    item.cartKey,
                                                    item.quantity - 1,
                                                )
                                            }
                                            className="inline-flex min-h-11 min-w-11 items-center justify-center text-slate-700 transition hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                                            aria-label={`Reducir cantidad de ${item.product.name}`}
                                        >
                                            -
                                        </button>
                                        <span className="min-w-10 text-center text-sm font-semibold text-slate-900 dark:text-slate-100">
                                            {item.quantity}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                updateQuantity(
                                                    item.cartKey,
                                                    item.quantity + 1,
                                                )
                                            }
                                            className="inline-flex min-h-11 min-w-11 items-center justify-center text-slate-700 transition hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                                            aria-label={`Aumentar cantidad de ${item.product.name}`}
                                        >
                                            +
                                        </button>
                                    </div>
                                        <button
                                            type="button"
                                            onClick={() => removeFromCart(item.cartKey)}
                                            className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-300 px-4 text-sm font-medium text-slate-700 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700 dark:border-slate-600 dark:text-slate-300 dark:hover:border-rose-400 dark:hover:bg-rose-900/20 dark:hover:text-rose-300"
                                        >
                                            Quitar
                                        </button>
                                </div>
                            </article>
                        ))
                    )}
                </div>

                <div className="border-t border-slate-200 px-5 py-4 dark:border-slate-700">
                    <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
                        <span>Total estimado</span>
                        <span className="text-lg font-semibold text-slate-950 dark:text-slate-50">
                            ${formatPrice(totalPrice)}
                        </span>
                    </div>
                    <div className="mt-4 flex flex-col gap-3">
                        <Link
                            href={
                                cart.length > 0
                                    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`
                                    : "/tienda"
                            }
                            target={cart.length > 0 ? "_blank" : undefined}
                            rel={cart.length > 0 ? "noopener noreferrer" : undefined}
                            className={`inline-flex min-h-12 items-center justify-center rounded-full px-5 text-sm font-semibold transition ${
                                cart.length > 0
                                    ? "bg-primary text-white hover:bg-primary/90"
                                    : "bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-500"
                            }`}
                            onClick={() => setOpen(false)}
                            aria-disabled={cart.length === 0}
                        >
                            Pedir por WhatsApp
                        </Link>
                        <button
                            type="button"
                            onClick={clearCart}
                            disabled={cart.length === 0}
                            className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-300 px-5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:bg-slate-800"
                        >
                            Vaciar carrito
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
