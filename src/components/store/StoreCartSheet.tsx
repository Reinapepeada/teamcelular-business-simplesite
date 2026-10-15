"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
    BsArrowRight,
    BsBag,
    BsDash,
    BsPlus,
    BsShieldCheck,
    BsShop,
    BsTrash3,
    BsTruck,
    BsWhatsapp,
    BsXLg,
} from "react-icons/bs";
import { buildProductSlug } from "@/lib/productSlug";
import useCartStore, { type CartItem } from "@/store/cartStore";
import { codigoPostalValido, errorDeCantidades, errorDeDestino, normalizarCodigoPostal } from "@/lib/commerceValidation";
import { exigirCotizacionLista, plazoDeTransporte } from "@/lib/shippingQuote";
import { problemaDeCheckout } from "@/lib/checkoutFlow";
import { usePickupPoint } from "@/hooks/usePickupPoint";
import { PickupDetails } from "./PickupDetails";
import ProductCondition from "./ProductCondition";
import StoreImage from "./StoreImage";
import StoreCartButton from "./StoreCartButton";
import { PROVINCIAS } from "@/lib/provincias";
import { aLineasDeCheckout, carritoComprable, productosSoloRetiro } from "@/lib/cartLines";
import { quoteShipping, StoreApiError, type ShippingQuote } from "@/lib/storeApi";
import {
    nombreDeVariante,
    totalDeLinea,
    totalEstimadoConEnvio,
    totalesDelCarrito,
} from "@/lib/totalesDelCarrito";

const CheckoutDialog = dynamic(() => import("./CheckoutDialog"), {
    loading: () => <p role="status" className="fixed inset-x-4 bottom-5 z-50 rounded-2xl bg-slate-900 p-4 text-center text-white">Preparando la compra…</p>,
});

/**
 * El carrito.
 *
 * Armado como los carritos que más convierten (drawer lateral, Baymard):
 * - Lista compacta arriba: foto, nombre, cantidad y total de la línea.
 * - **Resumen fijo abajo, siempre a la vista**: cómo lo recibís, el costo de
 *   envío, el total y un solo botón principal. Antes el cálculo de envío estaba
 *   al final de la lista y había que scrollear todo el carrito para verlo.
 * - El envío se cotiza solo al completar el código postal; no hay que buscar
 *   el botón. El retiro gratis está primero porque deja el total cerrado.
 * - Lo secundario (consultar por WhatsApp, vaciar) queda chico y abajo.
 */

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

type Entrega = "retiro" | "envio";

export default function StoreCartSheet() {
    const [confirmarVaciado, setConfirmarVaciado] = useState(false);
    const [comprando, setComprando] = useState(false);
    const [checkoutSolicitado, setCheckoutSolicitado] = useState(false);
    const [retiroSolicitado, setRetiroSolicitado] = useState(0);
    const [entrega, setEntrega] = useState<Entrega>("retiro");
    const dialogRef = useRef<HTMLDialogElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const { cart, removeFromCart, adjustQuantity, clearCart, open, openCart, closeCart, destinoEnvio, setDestinoEnvio } = useCartStore();

    const { state: retiro, retry: reintentarRetiro } = usePickupPoint(open);

    function abrirCheckout() {
        setCheckoutSolicitado(true);
        closeCart();
        setComprando(true);
    }

    // Las sumas viven en src/lib/totalesDelCarrito.ts, que explica por que
    // esto es un estimado: los precios salen de lo que el navegador guardo.
    const { unidades: totalItems, productos: totalPrice } = totalesDelCarrito(cart);
    const [cotizacion, setCotizacion] = useState<{ clave: string; opcion: ShippingQuote["cheapest"]; plazo: string | null } | null>(null);
    const [falloEnvio, setFalloEnvio] = useState<{ clave: string; mensaje: string; soloRetiro?: boolean; consultar?: boolean } | null>(null);
    const [calculando, setCalculando] = useState(false);
    const solicitudEnvio = useRef(0);
    const items = cart.map(item => ({ slug: item.storeSlug, quantity: item.quantity, nombre: item.product.name, shipping_enabled: item.shipping_enabled }));
    const soloRetiro = productosSoloRetiro(items);
    const lineasEnvio = aLineasDeCheckout(items);
    const claveEnvio = JSON.stringify([destinoEnvio, lineasEnvio, totalPrice, soloRetiro]);
    const claveActual = useRef(claveEnvio);
    useEffect(() => {
        claveActual.current = claveEnvio;
    }, [claveEnvio]);
    const eligeEnvio = entrega === "envio" && soloRetiro.length === 0;
    const envio = eligeEnvio && cotizacion?.clave === claveEnvio ? cotizacion.opcion : null;
    const totalEstimado = eligeEnvio ? totalEstimadoConEnvio(totalPrice, envio?.price ?? null) : totalPrice;
    const cpCompleto = codigoPostalValido(destinoEnvio.postal_code);

    const calcularEnvio = async () => {
        if (soloRetiro.length) return;
        const solicitud = ++solicitudEnvio.current;
        setCotizacion(null);
        setFalloEnvio(null);
        if (!carritoComprable(lineasEnvio)) {
            setFalloEnvio({ clave: claveEnvio, mensaje: "Volvé a agregar los productos desde la tienda para calcular el envío." });
            return;
        }
        const validacion = errorDeCantidades(items) || errorDeDestino(destinoEnvio.province, destinoEnvio.postal_code);
        if (validacion) {
            setCalculando(false);
            setFalloEnvio({ clave: claveEnvio, mensaje: validacion });
            return;
        }
        setCalculando(true);
        try {
            const resultado = exigirCotizacionLista(await quoteShipping(destinoEnvio.province, normalizarCodigoPostal(destinoEnvio.postal_code), lineasEnvio.lineas));
            if (solicitud !== solicitudEnvio.current || claveActual.current !== claveEnvio) return;
            if (totalEstimadoConEnvio(totalPrice, resultado.cheapest?.price ?? null) === null) throw new Error("Cotización inválida");
            setCotizacion({ clave: claveEnvio, opcion: resultado.cheapest, plazo: plazoDeTransporte(resultado) });
        } catch (error) {
            if (solicitud !== solicitudEnvio.current || claveActual.current !== claveEnvio) return;
            if (error instanceof StoreApiError && error.code === "PICKUP_ONLY") {
                setFalloEnvio({ clave: claveEnvio, mensaje: problemaDeCheckout(error, items).mensaje, soloRetiro: true });
                return;
            }
            const problema = problemaDeCheckout(error, items);
            const mensaje = error instanceof StoreApiError && (error.code.startsWith("SHIPPING_") || error.code === "STOCK_REQUIRES_CONSOLIDATION")
                ? problema.mensaje
                : error instanceof StoreApiError && error.code === "PRODUCT_NOT_FOUND"
                  ? "Un producto ya no está disponible. Revisá el carrito."
                  : "No pudimos calcular el envío en este momento. Reintentá sin cambiar tus datos.";
            setFalloEnvio({ clave: claveEnvio, mensaje, consultar: problema.consultarEnvio });
        } finally {
            if (solicitud === solicitudEnvio.current) setCalculando(false);
        }
    };

    // Cotiza solo cuando el destino está completo: el comprador no tiene que
    // encontrar un botón. La protección contra respuestas viejas es la misma
    // de calcularEnvio (solicitud + clave).
    const calcularRef = useRef(calcularEnvio);
    useEffect(() => {
        calcularRef.current = calcularEnvio;
    });
    const yaCotizado = cotizacion?.clave === claveEnvio || falloEnvio?.clave === claveEnvio;
    useEffect(() => {
        if (!open || !eligeEnvio || !destinoEnvio.province || !cpCompleto || yaCotizado) return;
        const espera = window.setTimeout(() => void calcularRef.current(), 600);
        return () => window.clearTimeout(espera);
    }, [open, eligeEnvio, destinoEnvio.province, cpCompleto, yaCotizado, claveEnvio]);


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

    const vacio = cart.length === 0;
    const etiquetaEnvio = !eligeEnvio
        ? "Gratis"
        : envio
          ? `$${formatPrice(envio.price)}`
          : calculando
            ? "Calculando…"
            : "A calcular";

    return (
        <>
            <StoreCartButton triggerRef={triggerRef} />

            <dialog
                ref={dialogRef}
                id="store-cart-sheet"
                aria-label="Resumen del carrito"
                onClose={() => {
                    closeCart();
                    setConfirmarVaciado(false);
                    if (!comprando) triggerRef.current?.focus();
                }}
                onCancel={() => closeCart()}
                className="fixed inset-auto bottom-0 right-0 m-0 hidden h-[92dvh] max-h-none w-full max-w-md flex-col rounded-t-[2rem] border border-slate-200 bg-white p-0 text-slate-950 shadow-2xl backdrop:bg-slate-950/60 open:flex dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50 sm:top-0 sm:h-dvh sm:rounded-l-[2rem] sm:rounded-tr-none"
            >
                {/* Encabezado */}
                <div className="flex shrink-0 items-center justify-between px-5 pb-3 pt-4">
                    <h2 className="text-lg font-semibold">
                        Tu carrito{" "}
                        {!vacio && (
                            <span className="text-sm font-normal text-slate-500 dark:text-slate-400">
                                ({totalItems} {totalItems === 1 ? "artículo" : "artículos"})
                            </span>
                        )}
                    </h2>
                    <button
                        type="button"
                        onClick={() => closeCart()}
                        aria-label="Cerrar carrito"
                        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                        <BsXLg aria-hidden="true" className="h-4 w-4" />
                    </button>
                </div>

                {/* Productos */}
                <div className="flex-1 overflow-y-auto px-5">
                    {vacio ? (
                        <div className="flex h-full flex-col items-center justify-center gap-3 pb-10 text-center">
                            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                                <BsBag aria-hidden="true" className="h-7 w-7 text-slate-500 dark:text-slate-400" />
                            </span>
                            <p className="text-lg font-semibold">Tu carrito está vacío</p>
                            <p className="max-w-xs text-sm text-slate-600 dark:text-slate-400">
                                Elegí un producto y agregalo para comenzar tu compra.
                            </p>
                            <Link
                                href="/tienda"
                                prefetch={false}
                                onClick={() => closeCart()}
                                className="mt-2 inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-white transition hover:bg-primary/90"
                            >
                                Ver productos
                                <BsArrowRight aria-hidden="true" />
                            </Link>
                        </div>
                    ) : (
                        <ul className="divide-y divide-slate-200 dark:divide-slate-800">
                            {cart.map((item) => {
                                const stock = getProductStock(item);
                                const variante = [item.variant?.color, item.variant?.size].filter(Boolean).join(" / ");
                                return (
                                    <li key={item.cartKey} className="flex gap-3 py-4">
                                        <div className="relative h-20 w-20 flex-none overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-900">
                                            <StoreImage
                                                src={getProductImage(item)}
                                                alt={item.product.name}
                                                fill
                                                className="object-contain p-2"
                                                sizes="80px"
                                            />
                                        </div>
                                        <div className="flex min-w-0 flex-1 flex-col">
                                            <div className="flex items-start justify-between gap-3">
                                                <Link
                                                    href={`/tienda/${buildProductSlug(item.product)}`}
                                                    prefetch={false}
                                                    onClick={() => closeCart()}
                                                    className="line-clamp-2 text-sm font-semibold leading-snug transition hover:text-primary"
                                                >
                                                    {item.product.name}
                                                </Link>
                                                <p className="shrink-0 text-sm font-semibold tabular-nums">
                                                    ${formatPrice(totalDeLinea(item))}
                                                </p>
                                            </div>
                                            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                                                {variante ? `${variante} · ` : ""}${formatPrice(item.product.retail_price)} c/u
                                            </p>
                                            <div className="mt-1">
                                                <ProductCondition condition={item.product.storeCondition} />
                                            </div>
                                            <div className="mt-2 flex items-center justify-between gap-3">
                                                <div className="inline-flex items-center rounded-full border border-slate-300 dark:border-slate-700">
                                                    <button
                                                        type="button"
                                                        disabled={item.quantity <= 1}
                                                        onClick={() => adjustQuantity(item.cartKey, -1)}
                                                        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition hover:bg-slate-100 disabled:opacity-30 dark:text-slate-300 dark:hover:bg-slate-800"
                                                        aria-label={`Reducir cantidad de ${item.product.name}`}
                                                    >
                                                        <BsDash aria-hidden="true" className="h-4 w-4" />
                                                    </button>
                                                    <span className="min-w-8 text-center text-sm font-semibold tabular-nums" aria-live="polite">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        disabled={item.quantity >= stock}
                                                        onClick={() => adjustQuantity(item.cartKey, 1)}
                                                        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition hover:bg-slate-100 disabled:opacity-30 dark:text-slate-300 dark:hover:bg-slate-800"
                                                        aria-label={`Aumentar cantidad de ${item.product.name}`}
                                                    >
                                                        <BsPlus aria-hidden="true" className="h-5 w-5" />
                                                    </button>
                                                </div>
                                                {item.quantity >= stock && (
                                                    <span className="text-xs text-slate-500 dark:text-slate-400">Máximo disponible</span>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() => removeFromCart(item.cartKey)}
                                                    aria-label={`Quitar ${item.product.name} del carrito`}
                                                    className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-rose-50 hover:text-rose-600 dark:text-slate-400 dark:hover:bg-rose-500/10 dark:hover:text-rose-300"
                                                >
                                                    <BsTrash3 aria-hidden="true" className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    )}

                    {!vacio && (
                        <div className="flex items-center justify-between py-3 text-xs">
                            <a
                                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => closeCart()}
                                className="inline-flex min-h-11 items-center gap-1.5 text-slate-600 underline-offset-4 hover:underline dark:text-slate-400"
                            >
                                <BsWhatsapp aria-hidden="true" />
                                Consultar por WhatsApp
                            </a>
                            {confirmarVaciado ? (
                                <span className="inline-flex items-center gap-3">
                                    <button type="button" onClick={() => { clearCart(); setConfirmarVaciado(false); }} className="min-h-11 font-semibold text-rose-600 dark:text-rose-300">
                                        Confirmar vaciar
                                    </button>
                                    <button type="button" onClick={() => setConfirmarVaciado(false)} className="min-h-11 text-slate-600 dark:text-slate-400">
                                        Conservar productos
                                    </button>
                                </span>
                            ) : (
                                <button type="button" onClick={() => setConfirmarVaciado(true)} className="min-h-11 text-slate-500 underline-offset-4 hover:underline dark:text-slate-400">
                                    Vaciar carrito
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Resumen fijo: entrega, totales y compra */}
                {!vacio && (
                    <div className="shrink-0 border-t border-slate-200 bg-white px-5 pb-4 pt-3 dark:border-slate-800 dark:bg-slate-950">
                        <fieldset>
                            <legend className="mb-2 text-sm font-semibold">¿Cómo lo recibís?</legend>
                            <div className="grid grid-cols-2 gap-2">
                                <label className={`flex min-h-12 cursor-pointer items-center gap-2 rounded-2xl border px-3 text-sm transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary ${entrega === "retiro" || soloRetiro.length ? "border-primary bg-primary/10" : "border-slate-300 hover:border-slate-400 dark:border-slate-700"}`}>
                                    <input type="radio" name="carrito-entrega" className="sr-only" checked={entrega === "retiro" || soloRetiro.length > 0} onChange={() => setEntrega("retiro")} />
                                    <BsShop aria-hidden="true" className="shrink-0" />
                                    <span className="font-semibold">Retiro</span>
                                    <span className="ml-auto text-xs text-emerald-600 dark:text-emerald-400">Gratis</span>
                                </label>
                                <label className={`flex min-h-12 items-center gap-2 rounded-2xl border px-3 text-sm transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary ${soloRetiro.length ? "cursor-not-allowed opacity-50" : "cursor-pointer"} ${eligeEnvio ? "border-primary bg-primary/10" : "border-slate-300 hover:border-slate-400 dark:border-slate-700"}`}>
                                    <input type="radio" name="carrito-entrega" className="sr-only" checked={eligeEnvio} disabled={soloRetiro.length > 0} onChange={() => setEntrega("envio")} />
                                    <BsTruck aria-hidden="true" className="shrink-0" />
                                    <span className="font-semibold">Envío</span>
                                    <span className="ml-auto text-xs text-slate-500 dark:text-slate-400">{envio ? `$${formatPrice(envio.price)}` : "a domicilio"}</span>
                                </label>
                            </div>
                        </fieldset>

                        {soloRetiro.length > 0 && <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">Solo retiro en el local: {soloRetiro.join(", ")}. Podés retirar tu compra en el local.</p>}
                        {!eligeEnvio && <PickupDetails state={retiro} retry={reintentarRetiro} />}

                        {cart.length > 0 && soloRetiro.length === 0 && eligeEnvio && (
                            <form className="mt-3" onSubmit={event => { event.preventDefault(); void calcularEnvio(); }}>
                                <div className="grid grid-cols-2 gap-2 sm:grid-cols-[1fr_7rem_auto]">
                                    <label className="sr-only" htmlFor="carrito-provincia">Provincia</label>
                                    <select
                                        id="carrito-provincia"
                                        required
                                        value={destinoEnvio.province}
                                        onChange={event => setDestinoEnvio({ province: event.target.value })}
                                        className="min-h-11 w-full rounded-xl border border-slate-300 bg-transparent px-2 text-base sm:text-sm dark:border-slate-700 dark:bg-slate-900"
                                    >
                                        <option value="">Provincia</option>
                                        {PROVINCIAS.map(([codigo, nombre]) => <option key={codigo} value={codigo}>{nombre}</option>)}
                                    </select>
                                    <label className="sr-only" htmlFor="carrito-cp">Código postal</label>
                                    <input
                                        id="carrito-cp"
                                        required
                                        autoComplete="postal-code"
                                        placeholder="Cód. postal"
                                        value={destinoEnvio.postal_code}
                                        onChange={event => setDestinoEnvio({ postal_code: event.target.value })}
                                        className="min-h-11 w-full rounded-xl border border-slate-300 bg-transparent px-3 text-base sm:text-sm dark:border-slate-700 dark:bg-slate-900"
                                    />
                                    <button disabled={calculando || !destinoEnvio.postal_code.trim()} className="col-span-2 min-h-11 rounded-xl border border-slate-300 px-3 text-sm font-medium transition hover:bg-slate-100 disabled:opacity-50 sm:col-span-1 dark:border-slate-700 dark:hover:bg-slate-800">
                                        {calculando ? "Calculando…" : falloEnvio?.clave === claveEnvio ? "Reintentar envío" : "Calcular"}
                                    </button>
                                </div>
                                <div aria-live="polite" className="mt-2 text-xs">
                                    {envio && (
                                        <p className="text-slate-600 dark:text-slate-400">
                                            Envío a CP {destinoEnvio.postal_code.trim()}: <strong className="text-slate-950 dark:text-slate-50">${formatPrice(envio.price)}</strong>
                                            {cotizacion?.plazo && <span className="mt-1 block">{cotizacion.plazo}</span>}
                                        </p>
                                    )}
                                    {falloEnvio?.clave === claveEnvio && (
                                        <div className="text-rose-600 dark:text-rose-300">
                                            <p>{falloEnvio.mensaje}</p>
                                            {falloEnvio.consultar && <a className="inline-flex min-h-11 items-center underline" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer">Consultar por este envío</a>}
                                            {falloEnvio.soloRetiro && <button type="button" className="min-h-11 underline" onClick={() => { setEntrega("retiro"); setRetiroSolicitado(value => value + 1); abrirCheckout(); }}>Retirar en el local</button>}
                                        </div>
                                    )}
                                </div>
                            </form>
                        )}

                        {/* Estimado de verdad: el envío lo cotiza el servidor al
                            confirmar, y el total final sale de ahí. */}
                        <dl className="mt-3 space-y-1 text-sm">
                            <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                <dt>Productos</dt>
                                <dd className="tabular-nums">${formatPrice(totalPrice)}</dd>
                            </div>
                            <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                <dt>Envío</dt>
                                <dd className={`tabular-nums ${!eligeEnvio ? "text-emerald-600 dark:text-emerald-400" : ""}`}>{etiquetaEnvio}</dd>
                            </div>
                            <div className="flex items-baseline justify-between border-t border-slate-200 pt-2 dark:border-slate-800">
                                <dt className="font-semibold">Total{eligeEnvio && !envio ? " sin envío" : ""}</dt>
                                <dd className="text-xl font-semibold tabular-nums">${formatPrice(totalEstimado ?? totalPrice)}</dd>
                            </div>
                        </dl>

                        {/* **Comprar es la salida principal, no el chat.** El
                            carrito termina en el checkout: datos, envío o retiro,
                            y a pagar. WhatsApp queda arriba como consulta. */}
                        <button
                            type="button"
                            onClick={abrirCheckout}
                            disabled={vacio}
                            className="mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 text-base font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Continuar con la compra
                            <BsArrowRight aria-hidden="true" />
                        </button>
                        <p className="mt-2 flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                            <BsShieldCheck aria-hidden="true" />
                            Pago seguro con Mercado Pago
                        </p>
                    </div>
                )}
            </dialog>

            {checkoutSolicitado && <CheckoutDialog
                retiroSolicitado={retiroSolicitado}
                entregaInicial={soloRetiro.length ? "retiro" : entrega}
                abierto={comprando}
                onEntregaChange={setEntrega}
                onCerrar={() => {
                    setComprando(false);
                    openCart();
                }}
            />}
        </>
    );
}
