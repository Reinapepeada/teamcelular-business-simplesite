"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { fetchOrderStatus, fetchPickupPoint, requestPaymentLink, type PickupPoint, type StoreOrderStatus } from "@/lib/storeApi";
import {
    claveDeLaVuelta,
    esperaAntesDeReintentar,
    estadoDeEntrega,
    olvidarPedido,
    pedidoGuardado,
    tokenParaReintentar,
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
    const [retiro, setRetiro] = useState<PickupPoint | null>(null);
    const [reintentando, setReintentando] = useState(false);
    const bloqueoPago = useRef(false);
    const [aviso, setAviso] = useState("");
    const [textoParaCopiar, setTextoParaCopiar] = useState("");
    const copiaRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (textoParaCopiar) {
            copiaRef.current?.focus();
            copiaRef.current?.select();
        }
    }, [textoParaCopiar]);

    useEffect(() => {
        if (estadoDeEntrega(estado) !== "Listo para retirar") return;
        let vivo = true;
        void fetchPickupPoint().then(punto => { if (vivo) setRetiro(punto); });
        return () => { vivo = false; };
    }, [estado]);

    const copiar = async (texto: string) => {
        setTextoParaCopiar("");
        try {
            await navigator.clipboard.writeText(texto);
            setAviso("Copiado.");
        } catch {
            setTextoParaCopiar(texto);
            setAviso("Seleccionamos el texto. Copialo desde este campo.");
        }
    };

    const reintentarPago = async () => {
        if (!estado || !vueltaMostrable(estado).canRetry || bloqueoPago.current) return;
        const guardado = almacen();
        const pedido = guardado ? pedidoGuardado(guardado) : null;
        const token = tokenParaReintentar(estado, pedido);
        if (!token) {
            setAviso(`Este navegador no tiene el acceso para pagar el pedido ${estado.commerce_key}. Volvé desde el carrito o escribinos por WhatsApp con ese número.`);
            return;
        }
        bloqueoPago.current = true;
        setReintentando(true);
        setAviso("");
        try {
            // La consulta evita ofrecer otro cobro si el aviso llegó mientras miraba la página.
            const actual = await fetchOrderStatus(estado.commerce_key);
            setEstado(actual);
            if (!vueltaMostrable(actual).canRetry) {
                setAviso("El estado del pedido cambió. Revisá la información antes de continuar.");
                return;
            }
            const { checkout_url } = await requestPaymentLink(token);
            if (!/^https:\/\//i.test(checkout_url)) throw new Error("Enlace inválido");
            window.location.assign(checkout_url);
        } catch {
            setAviso("No pudimos abrir el pago. Tu pedido sigue guardado. Revisá si hubo un cargo antes de reintentar o escribinos.");
        } finally {
            bloqueoPago.current = false;
            setReintentando(false);
        }
    };

    useEffect(() => {
        setEstado(null);
        setSinPedido(false);
        setSeGastaronLosIntentos(false);
        setAviso("");
        setTextoParaCopiar("");
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

                if (vueltaMostrable(respuesta).desenlace === "pagado") {
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
    const entrega = estadoDeEntrega(estado);
    const esperando = !sinPedido && !seGastaronLosIntentos && vista.seguirPreguntando;
    const cobrado = !sinPedido && vista.desenlace === "pagado";

    const titulo = sinPedido
        ? "No encontramos tu pedido"
        : seGastaronLosIntentos && !cobrado
          ? "Todavía no nos llegó la confirmación"
          : vista.titulo;

    const detalle = sinPedido
        ? "Si pagaste, conservá el comprobante y escribinos para buscar tu pedido."
        : seGastaronLosIntentos && !cobrado
          ? "El aviso de Mercado Pago está demorando. Revisá si hubo un cargo y escribinos con el comprobante antes de reintentar."
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
                        {entrega ? (
                            <div className="flex justify-between gap-4">
                                <dt className="text-slate-600 dark:text-slate-400">Entrega</dt>
                                <dd className="text-right font-medium text-slate-900 dark:text-slate-100">{entrega}</dd>
                            </div>
                        ) : null}
                        {cobrado && estado.tracking_ref ? (
                            <div className="flex justify-between gap-4">
                                <dt className="text-slate-600 dark:text-slate-400">Seguimiento</dt>
                                <dd className="break-all text-right font-medium text-slate-900 dark:text-slate-100">{estado.tracking_ref}</dd>
                            </div>
                        ) : null}
                    </dl>
                ) : null}

                {cobrado ? (
                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                        Volvé a este enlace para consultar el estado actualizado de tu pedido.
                    </p>
                ) : null}

                {entrega === "Listo para retirar" && (
                    <p className="mt-3 text-sm">{retiro ? [retiro.name, retiro.address, retiro.hours].filter(Boolean).join(" · ") : "Escribinos para confirmar la dirección y el horario de retiro."}</p>
                )}
                <p role="status" className="mt-3 text-sm">{aviso}</p>
                {textoParaCopiar && <input ref={copiaRef} aria-label="Texto para copiar" readOnly value={textoParaCopiar} onFocus={event => event.target.select()} className="mt-2 w-full rounded-lg border p-3 text-base dark:bg-slate-900" />}

                <div className="mt-8 flex flex-wrap gap-3">
                    {estado && !sinPedido && <>
                        {vista.canRetry && <button type="button" disabled={reintentando} onClick={() => void reintentarPago()} className="min-h-12 rounded-full bg-primary px-5 text-sm font-semibold text-white disabled:opacity-50">{reintentando ? "Abriendo el pago…" : "Reintentar el pago"}</button>}
                        <button type="button" onClick={() => void copiar(`${window.location.origin}/checkout/exito?external_reference=${encodeURIComponent(estado.commerce_key)}`)} className="min-h-12 rounded-full border px-5 text-sm">Copiar enlace del pedido</button>
                        {cobrado && estado.tracking_url && /^https?:\/\//i.test(estado.tracking_url)
                            ? <a href={estado.tracking_url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center rounded-full border px-5 text-sm">Seguir el envío</a>
                            : cobrado && estado.tracking_ref && <button type="button" onClick={() => void copiar(estado.tracking_ref!)} className="min-h-12 rounded-full border px-5 text-sm">Copiar código</button>}
                    </>}
                    <Link
                        href="/tienda"
                        className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-white transition hover:bg-primary/90"
                    >
                        {vista.desenlace === "rechazado" ? "Volver al carrito" : "Seguir comprando"}
                    </Link>
                    <Link
                        href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || "5491151034595"}?text=${encodeURIComponent(estado ? `Hola, quiero consultar por el pedido ${estado.commerce_key}` : "Hola, quiero consultar por mi pedido")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-300 px-5 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary dark:border-slate-600 dark:text-slate-300"
                    >
                        Escribinos
                    </Link>
                </div>
            </div>
        </div>
    );
}
