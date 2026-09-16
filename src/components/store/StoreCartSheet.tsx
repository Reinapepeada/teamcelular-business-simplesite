"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { buildProductSlug } from "@/lib/productSlug";
import { cargaDirectaImagen } from "@/lib/storeCatalog";
import useCartStore, { type CartItem } from "@/store/cartStore";
import CheckoutDialog from "./CheckoutDialog";
import {
    nombreDeVariante,
    totalDeLinea,
    totalesDelCarrito,
} from "@/lib/totalesDelCarrito";

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

function getProductStock(item: CartItem) {
    return item.variant?.stock ?? item.product.variants.reduce((sum, variant) => sum + variant.stock, 0);
}

export default function StoreCartSheet() {
    const [open, setOpen] = useState(false);
    const [comprando, setComprando] = useState(false);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const { cart, removeFromCart, updateQuantity, clearCart } = useCartStore();

    // Las sumas viven en src/lib/totalesDelCarrito.ts, que explica por que
    // esto es un estimado: los precios salen de lo que el navegador guardo.
    const { unidades: totalItems, productos: totalPrice } = totalesDelCarrito(cart);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (!open) {
            if (dialog.open) dialog.close();
            return;
        }
        if (!dialog.open) dialog.showModal();
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previousOverflow;
            if (dialog.open) dialog.close();
        };
    }, [open]);

    const whatsappMessage = encodeURIComponent(
        [
            "Hola Team Celular, quiero consultar por estos productos:",
            "",
            ...cart.map((item, index) => {
                const variantParts = nombreDeVariante(item);

                return `${index + 1}. ${item.product.name}${
                    variantParts ? ` (${variantParts})` : ""
                } x${item.quantity} - $${formatPrice(totalDeLinea(item))}`;
            }),
            "",
            `Total estimado: $${formatPrice(totalPrice)}`,
        ].join("\n"),
    );

    return (
        <>
            <button
                ref={triggerRef}
                type="button"
                onClick={() => setOpen((current) => !current)}
                aria-expanded={open}
                aria-controls="store-cart-sheet"
                className="fixed bottom-5 right-5 z-40 inline-flex min-h-14 items-center gap-3 rounded-full bg-slate-950 px-5 text-sm font-semibold text-white shadow-xl transition hover:bg-slate-800"
            >
                <span>Carrito</span>
                <span className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-primary px-2 text-xs font-bold">
                    {totalItems}
                </span>
            </button>

            <dialog
                ref={dialogRef}
                id="store-cart-sheet"
                aria-label="Resumen del carrito"
                onClose={() => {
                    setOpen(false);
                    if (!comprando) triggerRef.current?.focus();
                }}
                onCancel={() => setOpen(false)}
                className="fixed inset-auto bottom-0 right-0 m-0 hidden h-[85dvh] max-h-none w-full max-w-md flex-col rounded-t-[2rem] border border-slate-200 bg-white p-0 shadow-2xl backdrop:bg-slate-950/40 open:flex dark:border-slate-700 dark:bg-slate-950 sm:top-0 sm:h-dvh sm:rounded-l-[2rem] sm:rounded-tr-none"
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
                                Elegí un producto y agregalo para comenzar tu compra.
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
                                            unoptimized={cargaDirectaImagen(getProductImage(item))}
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
                                            disabled={item.quantity <= 1}
                                            onClick={() =>
                                                updateQuantity(
                                                    item.cartKey,
                                                    item.quantity - 1,
                                                )
                                            }
                                            className="inline-flex min-h-11 min-w-11 items-center justify-center text-slate-700 transition hover:bg-slate-50 disabled:opacity-40 dark:text-slate-300 dark:hover:bg-slate-800"
                                            aria-label={`Reducir cantidad de ${item.product.name}`}
                                        >
                                            -
                                        </button>
                                        <span className="min-w-10 text-center text-sm font-semibold text-slate-900 dark:text-slate-100">
                                            {item.quantity}
                                        </span>
                                        <button
                                            type="button"
                                            disabled={item.quantity >= getProductStock(item)}
                                            onClick={() =>
                                                updateQuantity(
                                                    item.cartKey,
                                                    item.quantity + 1,
                                                )
                                            }
                                            className="inline-flex min-h-11 min-w-11 items-center justify-center text-slate-700 transition hover:bg-slate-50 disabled:opacity-40 dark:text-slate-300 dark:hover:bg-slate-800"
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
                        {/* Estimado de verdad: el envio lo cotiza el servidor
                            al confirmar, y el total final sale de ahi. */}
                        <span>Productos</span>
                        <span className="text-lg font-semibold text-slate-950 dark:text-slate-50">
                            ${formatPrice(totalPrice)}
                        </span>
                    </div>
                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                        El envío y el total final se confirman en el siguiente paso.
                    </p>
                    <div className="mt-4 flex flex-col gap-3">
                        {/* **Comprar es la salida principal, no el chat.** El
                            carrito termina en el checkout: datos, envio o
                            retiro, y a pagar. WhatsApp queda abajo como
                            consulta, que es para lo que siempre sirvio:
                            preguntar algo antes de comprar. */}
                        <button
                            type="button"
                            onClick={() => {
                                setOpen(false);
                                setComprando(true);
                            }}
                            disabled={cart.length === 0}
                            className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500 dark:disabled:bg-slate-800"
                        >
                            Continuar con la compra
                        </button>
                        <Link
                            href={
                                cart.length > 0
                                    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`
                                    : "/tienda"
                            }
                            target={cart.length > 0 ? "_blank" : undefined}
                            rel={cart.length > 0 ? "noopener noreferrer" : undefined}
                            className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-300 px-5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:bg-slate-800"
                            onClick={() => setOpen(false)}
                            aria-disabled={cart.length === 0}
                        >
                            Consultar por WhatsApp
                        </Link>
                        <button
                            type="button"
                            onClick={clearCart}
                            disabled={cart.length === 0}
                            className="inline-flex min-h-11 items-center justify-center text-sm text-slate-500 underline underline-offset-4 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-400"
                        >
                            Vaciar carrito
                        </button>
                    </div>
                </div>
            </dialog>

            <CheckoutDialog abierto={comprando} onCerrar={() => {
                setComprando(false);
                setOpen(true);
            }} />
        </>
    );
}
