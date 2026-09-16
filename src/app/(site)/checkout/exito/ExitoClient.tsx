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
    type Intencion,
} from "@/lib/vueltaDelPago";
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

/**
 * Cuántas veces preguntar antes de parar.
 *
 * Con la espera creciente esto da cerca de dos minutos, que es de sobra para el
 * aviso de una tarjeta. Sin tope, una pestaña olvidada en un pedido que nunca
 * se va a acreditar golpea el backend para siempre.
 */
const INTENTOS = 12;

export default function ExitoClient({ intencion = "exito" }: { intencion?: Intencion }) {
    const params = useSearchParams();
    const [estado, setEstado] = useState<StoreOrderStatus | null>(null);
    const [sinPedido, setSinPedido] = useState(false);
    const [seGastaronLosIntentos, setSeGastaronLosIntentos] = useState(false);
    const clearCart = useCartStore((s) => s.clearCart);

    useEffect(() => {
        const guardado = almacen();
        const pedido = claveDeLaVuelta(guardado, params);
        if (!pedido) {
            setSinPedido(true);
            return;
        }

        let vivo = true;
        let intento = 0;
        let timer: ReturnType<typeof setTimeout>;

        const preguntar = async () => {
            try {
                const respuesta = await fetchOrderStatus(pedido.clave);
                if (!vivo) return;
                setEstado(respuesta);

                if (respuesta.paid) {
                    // **El carrito se vacía solo si el pedido es de este
                    // navegador.** Con la clave de otro en la URL —pegada a
                    // mano, compartida por WhatsApp— esto le borraría al que
                    // mira el carrito que está armando ahora, y la clave que le
                    // permite recuperar su propio pedido.
                    //
                    // Y se olvida NOMBRANDO el pedido: esta confirmación puede
                    // llegar tarde, con el comprador ya en otra compra, y
                    // borrar a ciegas se llevaría la credencial de esa otra.
                    if (pedido.esNuestro) {
                        clearCart();
                        if (guardado) {
                            // **La clave de checkout se borra solo si el
                            // pedido guardado era este.** Si el comprador ya
                            // arrancó otra compra, esa clave es la que impide
                            // que un reintento cree un segundo pedido con su
                            // propia reserva sobre el mismo stock: llevársela
                            // por la confirmación de un pedido anterior es
                            // fabricar exactamente el cobro duplicado que la
                            // clave existe para evitar.
                            olvidarPedido(guardado, pedido.clave);
                        }
                    }
                    return;
                }

                // **La decisión de seguir sale de lo que contestó el backend**,
                // no de un estado inventado: un pago pendiente de verdad dice
                // que no hay nada que esperar en esta pestaña, y preguntarle a
                // un `null` lo trataba como una demora anormal.
                if (!vueltaMostrable(respuesta, intencion).seguirPreguntando) return;
            } catch (error) {
                if (!vivo) return;
                // Un pedido que no existe no se va a acreditar nunca: seguir
                // preguntando deja al comprador esperando algo imposible.
                const status = (error as { status?: number } | null)?.status;
                if (status === 404) {
                    setSinPedido(true);
                    return;
                }
                // Cualquier otra falla es de red: se vuelve a preguntar.
            }

            if (!vivo) return;
            intento += 1;
            if (intento >= INTENTOS) {
                setSeGastaronLosIntentos(true);
                return;
            }
            timer = setTimeout(preguntar, esperaAntesDeReintentar(intento));
        };

        preguntar();

        return () => {
            vivo = false;
            clearTimeout(timer);
        };
    }, [params, clearCart, intencion]);

    const vista = vueltaMostrable(estado, intencion);
    const esperando = !sinPedido && !seGastaronLosIntentos && vista.seguirPreguntando;
    const cobrado = !sinPedido && vista.desenlace === "pagado";

    const titulo = sinPedido
        ? "No encontramos tu pedido"
        : seGastaronLosIntentos && !cobrado
          ? "Todavía no nos llegó la confirmación"
          : vista.titulo;

    const detalle = sinPedido
        ? "Si pagaste, el comprobante te llega por mail igual. Escribinos y lo buscamos con tu nombre."
        : seGastaronLosIntentos && !cobrado
          ? "El aviso de Mercado Pago está demorando más de lo normal. Si el pago salió, lo vas a ver en tu mail; escribinos y lo confirmamos."
          : vista.detalle;

    return (
        <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10 dark:border-slate-700/70 dark:bg-slate-900">
                <div className="flex items-center gap-3">
                    {esperando ? (
                        <span
                            aria-hidden
                            className="h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-slate-300 border-t-primary"
                        />
                    ) : cobrado ? (
                        <span
                            aria-hidden
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                        >
                            ✓
                        </span>
                    ) : (
                        <span
                            aria-hidden
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300"
                        >
                            !
                        </span>
                    )}
                    <h1 className="text-2xl font-semibold text-slate-950 sm:text-3xl dark:text-slate-50">
                        {titulo}
                    </h1>
                </div>

                <p
                    className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400"
                    aria-live="polite"
                >
                    {detalle}
                </p>

                {estado && !sinPedido ? (
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

                <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                        href="/tienda"
                        className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-white transition hover:bg-primary/90"
                    >
                        {vista.desenlace === "rechazado" ? "Volver al carrito" : "Seguir comprando"}
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
