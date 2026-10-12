"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { fetchOrderStatus, requestPaymentLink, type StoreOrderStatus } from "@/lib/storeApi";
import {
    claveDeLaVuelta,
    enlaceDelPedido,
    finalizarPedidoPagado,
    estadoDeEntrega,
    pedidoGuardado,
    tokenParaReintentar,
    vueltaMostrable,
    type Intencion,
} from "@/lib/vueltaDelPago";
import { usePickupPoint } from "@/hooks/usePickupPoint";
import { PickupDetails } from "@/components/store/PickupDetails";
import { vencimientoReserva, importeConfirmado } from "@/lib/resumenDelPedido";
import { consultarPedido } from "@/lib/consultaDelPedido";
import useCartStore from "@/store/cartStore";
import { datosParaResenas, entregaEstimada } from "@/lib/resenasGoogle";

const MERCHANT_ID = 5711320288;

type Gapi = { load(m: string, cb: () => void): void; surveyoptin: { render(o: Record<string, unknown>): void } };

/** Opt-in de Reseñas de Clientes en Google; Google dibuja su propio cartel. */
function OptInResenasGoogle({ clave }: { clave: string }) {
    useEffect(() => {
        const datos = datosParaResenas(almacen(), clave);
        if (!datos) return;
        const w = window as unknown as { renderOptIn?: () => void; gapi?: Gapi };
        w.renderOptIn = () => w.gapi?.load("surveyoptin", () => w.gapi?.surveyoptin.render({
            merchant_id: MERCHANT_ID,
            order_id: clave,
            email: datos.email,
            delivery_country: "AR",
            estimated_delivery_date: entregaEstimada(datos.envio),
        }));
        if (w.gapi) return w.renderOptIn();
        const s = document.createElement("script");
        s.src = "https://apis.google.com/js/platform.js?onload=renderOptIn";
        s.async = true;
        document.body.appendChild(s);
    }, [clave]);
    return null;
}

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

export default function ExitoClient({ intencion = "exito" }: { intencion?: Intencion }) {
    const params = useSearchParams();
    const [estado, setEstado] = useState<StoreOrderStatus | null>(null);
    const [sinPedido, setSinPedido] = useState(false);
    const [seGastaronLosIntentos, setSeGastaronLosIntentos] = useState(false);
    const quedanProductos = useCartStore((s) => s.cart.length > 0);
    const clearPurchasedCart = useCartStore((s) => s.clearPurchasedCart);
    const [consultando, setConsultando] = useState(false);
    const actualizarRef = useRef<(() => void) | null>(null);
    const necesitaRetiro = estadoDeEntrega(estado) === "Listo para retirar" || (vueltaMostrable(estado).canRetry && (estado?.delivery_mode === "pickup" || (estado?.delivery_mode === undefined && estado?.shipping === null)));
    const { state: retiro, retry: reintentarRetiro } = usePickupPoint(necesitaRetiro);
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
        if (!estado || !vueltaMostrable(estado).canRetry || bloqueoPago.current || (necesitaRetiro && retiro.status !== "ready")) return;
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

        // Primero dejamos una referencia durable. Borrar tc.pedido nunca debe
        // convertir una recarga de esta pantalla en una consulta sin pedido.
        const canonical = enlaceDelPedido(pedido.clave);
        if (window.location.pathname + window.location.search !== canonical) {
            window.history.replaceState(window.history.state, "", canonical);
        }
        const consultas = consultarPedido({
            consultar: () => fetchOrderStatus(pedido.clave),
            recibir: respuesta => { setSinPedido(false); setEstado(respuesta); },
            pagado: async () => {
                if (guardado) await finalizarPedidoPagado(guardado, pedido.clave, clearPurchasedCart);
            },
            noEncontrado: () => setSinPedido(true),
            consultando: setConsultando,
            agotado: setSeGastaronLosIntentos,
            intencion,
        });
        actualizarRef.current = consultas.actualizar;
        let ultimaActualizacion = Date.now();
        const alVolver = () => {
            if (document.visibilityState === "hidden" || Date.now() - ultimaActualizacion < 5000) return;
            ultimaActualizacion = Date.now();
            consultas.actualizar();
        };
        window.addEventListener("focus", alVolver);
        return () => {
            consultas.detener();
            actualizarRef.current = null;
            window.removeEventListener("focus", alVolver);
        };
    }, [params, clearPurchasedCart, intencion]);

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
                            <dd className="min-w-0 break-all text-right font-medium text-slate-900 dark:text-slate-100">
                                {estado.commerce_key}
                            </dd>
                        </div>
                        <div className="flex justify-between gap-4">
                            <dt className="text-slate-600 dark:text-slate-400">Total del pedido</dt>
                            <dd className="min-w-0 break-all text-right font-medium text-slate-900 dark:text-slate-100">
                                {importeConfirmado(estado.total_amount) === null ? "Por confirmar" : plata(estado.total_amount, estado.currency)}
                            </dd>
                        </div>
                        {!estado.paid && estado.payment_result !== "reversed" && estado.status !== "payment_reversed" && vencimientoReserva(estado) && <div>
                            <dt>Reserva hasta</dt><dd>{vencimientoReserva(estado)}</dd>
                        </div>}
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

                {cobrado && estado ? <OptInResenasGoogle clave={estado.commerce_key} /> : null}
                {cobrado ? (
                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                        Volvé a este enlace para consultar el estado actualizado de tu pedido.
                    </p>
                ) : null}

                {cobrado && quedanProductos && (
                    <p role="status" className="mt-3 rounded-xl bg-amber-50 p-3 text-sm text-amber-900 dark:bg-amber-500/10 dark:text-amber-200">
                        Tu carrito todavía tiene productos. Revisalos antes de iniciar otra compra para evitar repetir este pedido.
                    </p>
                )}
                {necesitaRetiro && (
                    <PickupDetails state={retiro} retry={reintentarRetiro} existingOrder />
                )}
                <p role="status" className="mt-3 text-sm">{aviso}</p>
                {textoParaCopiar && <input ref={copiaRef} aria-label="Texto para copiar" readOnly value={textoParaCopiar} onFocus={event => event.target.select()} className="mt-2 w-full rounded-lg border p-3 text-base dark:bg-slate-900" />}

                <div className="mt-8 flex flex-wrap gap-3">
                    {!sinPedido && <button type="button" aria-disabled={consultando} onClick={() => actualizarRef.current?.()} className="min-h-12 rounded-full border px-5 text-sm aria-disabled:opacity-50">{consultando ? "Actualizando…" : "Actualizar estado"}</button>}
                    {estado && !sinPedido && <>
                        {vista.canRetry && <button type="button" disabled={reintentando || (necesitaRetiro && retiro.status !== "ready")} onClick={() => void reintentarPago()} className="min-h-12 rounded-full bg-primary px-5 text-sm font-semibold text-white disabled:opacity-50">{reintentando ? "Abriendo el pago…" : "Reintentar el pago"}</button>}
                        <button type="button" onClick={() => void copiar(`${window.location.origin}${enlaceDelPedido(estado.commerce_key)}`)} className="min-h-12 rounded-full border px-5 text-sm">Copiar enlace del pedido</button>
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
