import type React from "react";

import { PROVINCIAS } from "@/lib/provincias";
import { resumenParaConfirmar, vencimientoReserva } from "@/lib/resumenDelPedido";
import type { StoreOrder } from "@/lib/storeApi";

import { pesos, tarjeta } from "./estilo";

/**
 * El resumen que se confirma antes de pagar.
 *
 * Tonto a propósito: qué mostrar lo decide `resumenParaConfirmar`, que sí está
 * probado. Acá solo se dibuja.
 */
export function ResumenAConfirmar({
    pedido,
    estimadoDeProductos,
    condiciones,
    estimadoDeEnvio,
    enviando,
    fallo,
    onPagar,
    onVolver,
}: {
    pedido: StoreOrder;
    condiciones: React.ReactNode;
    estimadoDeProductos: number;
    estimadoDeEnvio: number;
    enviando: boolean;
    fallo: string | null;
    onPagar: () => void;
    onVolver: () => void;
}) {
    const r = resumenParaConfirmar(pedido, estimadoDeProductos, estimadoDeEnvio);

    return (
        <div className="mt-4 flex flex-col gap-3">
            <section className={tarjeta}>
                <h3 className="text-sm font-semibold">Productos</h3>
                <ul className="mt-2 space-y-1 text-sm">{pedido.items?.map(item => (
                    <li key={item.product_id} className="flex justify-between gap-3">
                        <span className="min-w-0">{item.current_product_name || `Producto ${item.product_id}`} <span className="text-slate-500 dark:text-slate-400">· {item.quantity} × {pesos(item.unit_price, pedido.currency)}</span></span>
                    </li>
                ))}</ul>
                <div className="mt-3 text-sm">{condiciones}</div>
            </section>
            <section className={`${tarjeta} grid gap-3 text-sm sm:grid-cols-2`}>
                <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Contacto</h3>
                    <p className="mt-1 break-words">{pedido.customer_name} · {pedido.customer_email} {pedido.customer_phone}</p>
                </div>
                <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Entrega</h3>
                    <p className="mt-1">{pedido.shipping === null ? "Retiro en el local" : pedido.shipping
                        ? [pedido.shipping.street, pedido.shipping.extra, pedido.shipping.city,
                            PROVINCIAS.find(([codigo]) => codigo === pedido.shipping?.province)?.[1] ?? pedido.shipping.province,
                            pedido.shipping.postal_code && "CP " + pedido.shipping.postal_code].filter(Boolean).join(" · ")
                        : "No pudimos obtener la entrega del pedido. Escribinos para confirmarla."}</p>
                </div>
            </section>
            <p className="text-xs text-slate-500 dark:text-slate-400">Estos son los datos guardados en tu pedido. Si necesitás cambiarlos, escribinos antes de pagar.</p>
            {r.precioCambio && (
                <p className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:bg-amber-500/10 dark:text-amber-300">
                    {"El total cambió " + pesos(r.diferencia, r.moneda) + " respecto del estimado."}{" "}
                    Este es el importe que se va a cobrar.
                </p>
            )}

            <dl className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm dark:border-slate-700/70 dark:bg-slate-800/70">
                <div className="flex justify-between gap-4">
                    <dt className="text-slate-600 dark:text-slate-400">Productos</dt>
                    <dd className="font-medium">{pesos(r.subtotal, r.moneda)}</dd>
                </div>
                {r.hayEnvio && (
                    <div className="mt-2 flex justify-between gap-4">
                        <dt className="text-slate-600 dark:text-slate-400">Envío</dt>
                        <dd className="font-medium">{pesos(r.envio, r.moneda)}</dd>
                    </div>
                )}
                <div className="mt-3 flex justify-between gap-4 border-t border-slate-200 pt-3 dark:border-slate-700/70">
                    <dt className="font-semibold text-slate-900 dark:text-slate-100">Total</dt>
                    <dd className="text-lg font-bold text-slate-950 dark:text-slate-50">
                        {pesos(r.total, r.moneda)}
                    </dd>
                </div>
            </dl>

            <p className="text-xs text-slate-500 dark:text-slate-400">
                Tu pedido {pedido.commerce_key} ya quedó reservado. Si salís de acá,
                lo podés retomar desde el carrito. {vencimientoReserva(pedido) && `Reservado hasta ${vencimientoReserva(pedido)}.`}
            </p>

            {fallo && (
                <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-800 dark:bg-rose-500/10 dark:text-rose-300">
                    {fallo}
                </p>
            )}

            <button
                type="button"
                onClick={onPagar}
                disabled={enviando || !pedido.customer_name || !pedido.customer_email || pedido.shipping === undefined || !pedido.items?.length}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:opacity-50"
            >
                {enviando ? "Abriendo el pago…" : "Ir a pagar"}
            </button>
            <button
                type="button"
                onClick={onVolver}
                disabled={enviando}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-300 px-5 text-sm font-medium text-slate-700 transition hover:border-slate-400 disabled:opacity-50 dark:border-slate-600 dark:text-slate-300"
            >
                Volver
            </button>
        </div>
    );
}
