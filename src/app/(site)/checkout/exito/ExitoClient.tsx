"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { fetchOrderStatus, type StoreOrderStatus } from "@/lib/storeApi";
import {
    claveDeLaVuelta,
    esperaAntesDeReintentar,
    olvidarPedido,
    vueltaMostrable,
} from "@/lib/vueltaDelPago";
import { olvidarClave } from "@/lib/checkoutKey";
import useCartStore from "@/store/cartStore";

const almacen = () => {
    try {
        return typeof window !== "undefined" ? window.localStorage : null;
    } catch {
        // Modo privado o cookies bloqueadas: la vuelta usa el parámetro.
        return null;
    }
};

const plata = (monto: number, moneda: string) =>
    new Intl.NumberFormat("es-AR", { style: "currency", currency: moneda || "ARS" }).format(monto);

export default function ExitoClient() {
    const params = useSearchParams();
    const [estado, setEstado] = useState<StoreOrderStatus | null>(null);
    const [sinPedido, setSinPedido] = useState(false);
    const clearCart = useCartStore((s) => s.clearCart);

    useEffect(() => {
        const guardado = almacen();
        const clave = claveDeLaVuelta(guardado, params);
        if (!clave) {
            setSinPedido(true);
            return;
        }

        let vivo = true;
        let intento = 0;
        let timer: ReturnType<typeof setTimeout>;

        const preguntar = async () => {
            try {
                const respuesta = await fetchOrderStatus(clave);
                if (!vivo) return;
                setEstado(respuesta);

                if (respuesta.paid) {
                    // **Recién acá se limpia.** El carrito y la clave de
                    // checkout son lo que permite recuperar el mismo pedido si
                    // el comprador vuelve atrás desde Mercado Pago sin pagar;
                    // borrarlos antes de que el pago entre lo dejaría armando
                    // todo de nuevo.
                    clearCart();
                    if (guardado) {
                        olvidarPedido(guardado);
                        olvidarClave(guardado);
                    }
                    return;
                }
            } catch {
                // Un error de red no es "no pagó": se vuelve a preguntar.
            }

            if (!vivo) return;
            timer = setTimeout(preguntar, esperaAntesDeReintentar(intento));
            intento += 1;
        };

        preguntar();

        return () => {
            vivo = false;
            clearTimeout(timer);
        };
    }, [params, clearCart]);

    const vista = vueltaMostrable(estado);
    const esperando = !sinPedido && vista.seguirPreguntando;

    return (
        <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10 dark:border-slate-700/70 dark:bg-slate-900">
                {sinPedido ? (
                    <>
                        <h1 className="text-2xl font-semibold text-slate-950 sm:text-3xl dark:text-slate-50">
                            No encontramos tu pedido
                        </h1>
                        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                            Si pagaste, el comprobante te llega por mail igual. Escribinos y lo
                            buscamos con tu nombre.
                        </p>
                    </>
                ) : (
                    <>
                        <div className="flex items-center gap-3">
                            {esperando ? (
                                <span
                                    aria-hidden
                                    className="h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-slate-300 border-t-primary"
                                />
                            ) : (
                                <span
                                    aria-hidden
                                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                                >
                                    ✓
                                </span>
                            )}
                            <h1 className="text-2xl font-semibold text-slate-950 sm:text-3xl dark:text-slate-50">
                                {vista.titulo}
                            </h1>
                        </div>
                        <p
                            className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400"
                            aria-live="polite"
                        >
                            {vista.detalle}
                        </p>

                        {estado ? (
                            <dl className="mt-6 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm dark:border-slate-700/70 dark:bg-slate-800/70">
                                <div className="flex justify-between gap-4">
                                    <dt className="text-slate-600 dark:text-slate-400">Pedido</dt>
                                    <dd className="font-medium text-slate-900 dark:text-slate-100">
                                        {estado.commerce_key}
                                    </dd>
                                </div>
                                <div className="flex justify-between gap-4">
                                    <dt className="text-slate-600 dark:text-slate-400">Total</dt>
                                    <dd className="font-medium text-slate-900 dark:text-slate-100">
                                        {plata(estado.total_amount, estado.currency)}
                                    </dd>
                                </div>
                            </dl>
                        ) : null}
                    </>
                )}

                <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                        href="/tienda"
                        className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-white transition hover:bg-primary/90"
                    >
                        Seguir comprando
                    </Link>
                    <Link
                        href="/contacto"
                        className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-300 px-5 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary dark:border-slate-600 dark:text-slate-300"
                    >
                        Escribinos
                    </Link>
                </div>
            </div>
        </div>
    );
}
