"use client";

import { useEffect, useMemo, useState } from "react";
import useCartStore from "@/store/cartStore";
import { claveDeCheckout, olvidarClave } from "@/lib/checkoutKey";
import { olvidarPedido, pedidoGuardado, recordarPedido } from "@/lib/vueltaDelPago";
import {
    armarPedido,
    comprar,
    ErrorDeCompra,
    hayErrores,
    validarDatos,
    type DatosDeCompra,
    type ErroresDeCompra,
} from "@/lib/checkoutFlow";
import { aLineasDeCheckout } from "@/lib/cartLines";
import { huellaDelCarrito } from "@/lib/checkoutKey";
import { createOrder, requestPaymentLink, type StoreOrder } from "@/lib/storeApi";

/**
 * El checkout del comprador.
 *
 * Reemplaza la salida por WhatsApp: datos mínimos, envío o retiro, y al pago.
 *
 * **La lógica no vive acá.** Validar, armar el pedido y orquestar
 * crear → pedir link está en `src/lib/checkoutFlow.ts`, con tests: es donde
 * están los casos que cuestan plata, y un componente no se puede probar con la
 * misma facilidad.
 */

const PROVINCIAS = [
    ["B", "Buenos Aires"], ["C", "CABA"], ["K", "Catamarca"], ["H", "Chaco"],
    ["U", "Chubut"], ["X", "Córdoba"], ["W", "Corrientes"], ["E", "Entre Ríos"],
    ["P", "Formosa"], ["Y", "Jujuy"], ["L", "La Pampa"], ["F", "La Rioja"],
    ["M", "Mendoza"], ["N", "Misiones"], ["Q", "Neuquén"], ["R", "Río Negro"],
    ["A", "Salta"], ["J", "San Juan"], ["D", "San Luis"], ["Z", "Santa Cruz"],
    ["S", "Santa Fe"], ["G", "Santiago del Estero"], ["V", "Tierra del Fuego"],
    ["T", "Tucumán"],
] as const;

const pesos = (monto: number, moneda = "ARS") =>
    new Intl.NumberFormat("es-AR", { style: "currency", currency: moneda }).format(monto);

interface CheckoutDialogProps {
    abierto: boolean;
    onCerrar: () => void;
}

export default function CheckoutDialog({ abierto, onCerrar }: CheckoutDialogProps) {
    const { cart } = useCartStore();

    const [datos, setDatos] = useState<DatosDeCompra>({
        nombre: "",
        email: "",
        telefono: "",
        entrega: "retiro",
        direccion: {},
    });
    const [errores, setErrores] = useState<ErroresDeCompra>({});
    const [enviando, setEnviando] = useState(false);
    const [fallo, setFallo] = useState<string | null>(null);
    // Un pedido que quedó creado y sin link. Guardarlo es lo que permite
    // reintentar SOLO el link: volver a comprar crearía un segundo pedido con
    // su propia reserva sobre el mismo stock.
    const [pedidoPendiente, setPedidoPendiente] = useState<StoreOrder | null>(null);

    const items = useMemo(
        () =>
            cart.map(item => ({
                slug: item.storeSlug,
                quantity: item.quantity,
                nombre: item.product?.name,
            })),
        [cart]
    );

    const huellaActual = useMemo(
        () => huellaDelCarrito(aLineasDeCheckout(items).lineas),
        [items]
    );

    // **Un pedido creado y sin pagar sobrevive a la recarga.** El backend
    // entrega el `access_token` una sola vez, al crear el pedido: si el link
    // falla y el comprador recarga, sin esto la reserva queda viva y sin forma
    // de pagarla desde la tienda.
    //
    // **Solo si es el pedido de ESTE carrito.** Un pedido abandonado deja su
    // token guardado; sin comparar la huella, la tienda le ofreceria a alguien
    // que ya armo otro carrito pagar el pedido viejo —otros productos, otro
    // importe— con el carrito nuevo a la vista.
    useEffect(() => {
        if (pedidoPendiente) return;
        let almacen: Storage | null = null;
        try {
            almacen = window.localStorage;
        } catch {
            return;
        }
        const guardado = almacen ? pedidoGuardado(almacen) : null;
        if (!guardado?.token) return;
        if (!guardado.huella || guardado.huella !== huellaActual) return;

        setPedidoPendiente({
            commerce_key: guardado.clave,
            access_token: guardado.token,
            total_amount: guardado.total ?? 0,
            currency: guardado.moneda ?? "ARS",
        } as StoreOrder);
        setFallo("Tenés un pedido reservado esperando el pago.");
    }, [pedidoPendiente, huellaActual]);

    const irAPagar = (url: string) => {
        window.location.href = url;
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const encontrados = validarDatos(datos, items);
        setErrores(encontrados);
        setFallo(null);
        if (hayErrores(encontrados)) return;

        setEnviando(true);
        try {
            const clave = claveDeCheckout(window.localStorage, aLineasDeCheckout(items).lineas);
            const { checkoutUrl } = await comprar(
                {
                    crearPedido: createOrder,
                    pedirLink: requestPaymentLink,
                    // Se anota apenas el pedido existe, antes de pedir el link:
                    // es lo que permite volver si el pago no llega a abrirse, y
                    // lo que la pantalla de vuelta usa para preguntar el estado
                    // sin depender de los parametros de la URL.
                    recordar: (pedido) =>
                        recordarPedido(window.localStorage, {
                            clave: pedido.commerce_key,
                            token: pedido.access_token ?? null,
                            total: pedido.total_amount,
                            moneda: pedido.currency,
                            // Con que carrito se creo: es lo que despues
                            // decide si este pedido todavia es el de la compra
                            // que el comprador tiene a la vista.
                            huella: huellaActual,
                        }),
                },
                armarPedido(datos, items, clave)
            );
            // La clave NO se olvida acá: entre esto y el pago hay una pantalla
            // de Mercado Pago de la que se puede volver, y ahí todavía tiene que
            // servir para recuperar el mismo pedido.
            irAPagar(checkoutUrl);
        } catch (error) {
            if (error instanceof ErrorDeCompra) {
                setFallo(error.message);
                setPedidoPendiente(error.pedido?.access_token ? error.pedido : null);
            } else {
                setFallo("No pudimos completar la compra. Probá de nuevo.");
            }
            setEnviando(false);
        }
    };

    const reintentarSoloElLink = async () => {
        if (!pedidoPendiente?.access_token) return;
        setEnviando(true);
        setFallo(null);
        try {
            const { checkout_url } = await requestPaymentLink(pedidoPendiente.access_token);
            irAPagar(checkout_url);
        } catch (error) {
            // **Un 409 no es "probemos de nuevo".** El backend contesta eso
            // cuando el pedido ya no acepta un link: pagado, vencido o
            // cancelado. Dejar el token guardado ahi deja el checkout trabado
            // ofreciendo reintentar algo que nunca va a andar.
            const status = (error as { status?: number } | null)?.status;
            if (status === 409) {
                try {
                    olvidarPedido(window.localStorage, pedidoPendiente.commerce_key);
                } catch {
                    // Si no se puede limpiar, al menos el dialogo se destraba.
                }
                setPedidoPendiente(null);
                setFallo(
                    "Ese pedido ya no se puede pagar: puede que ya esté pagado o que haya vencido. Revisá tu mail o escribinos."
                );
            } else {
                setFallo("Seguimos sin poder abrir el pago. Escribinos y lo resolvemos.");
            }
            setEnviando(false);
        }
    };

    if (!abierto) return null;

    const esEnvio = datos.entrega === "envio";
    const campo = "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900";
    const error = "mt-1 text-xs text-red-600 dark:text-red-400";

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center">
            <div
                role="dialog"
                aria-modal="true"
                aria-label="Finalizar compra"
                className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white p-5 dark:bg-slate-950 sm:rounded-2xl"
            >
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-950 dark:text-slate-50">
                        Finalizar compra
                    </h2>
                    <button type="button" onClick={onCerrar} aria-label="Cerrar" className="text-slate-500">
                        ✕
                    </button>
                </div>

                {errores.carrito && (
                    <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:bg-amber-500/10 dark:text-amber-300">
                        {errores.carrito}
                    </p>
                )}

                <form className="mt-4 flex flex-col gap-3" onSubmit={onSubmit}>
                    <div>
                        <label className="text-sm font-medium" htmlFor="ck-nombre">Nombre y apellido</label>
                        <input
                            id="ck-nombre"
                            className={campo}
                            value={datos.nombre}
                            onChange={e => setDatos({ ...datos, nombre: e.target.value })}
                        />
                        {errores.nombre && <p className={error}>{errores.nombre}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-medium" htmlFor="ck-email">Mail</label>
                        <input
                            id="ck-email"
                            type="email"
                            className={campo}
                            value={datos.email}
                            onChange={e => setDatos({ ...datos, email: e.target.value })}
                        />
                        {/* Por acá llega el aviso de que el pedido salió. */}
                        {errores.email && <p className={error}>{errores.email}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-medium" htmlFor="ck-tel">Teléfono (opcional)</label>
                        <input
                            id="ck-tel"
                            className={campo}
                            value={datos.telefono ?? ""}
                            onChange={e => setDatos({ ...datos, telefono: e.target.value })}
                        />
                    </div>

                    <fieldset className="mt-1">
                        <legend className="text-sm font-medium">¿Cómo lo recibís?</legend>
                        <div className="mt-2 flex gap-4">
                            <label className="flex items-center gap-2 text-sm">
                                <input
                                    type="radio"
                                    name="entrega"
                                    checked={!esEnvio}
                                    onChange={() => setDatos({ ...datos, entrega: "retiro" })}
                                />
                                Retiro en el local
                            </label>
                            <label className="flex items-center gap-2 text-sm">
                                <input
                                    type="radio"
                                    name="entrega"
                                    checked={esEnvio}
                                    onChange={() => setDatos({ ...datos, entrega: "envio" })}
                                />
                                Envío a domicilio
                            </label>
                        </div>
                    </fieldset>

                    {/* La dirección aparece solo para envío: pedirla siempre hace
                        abandonar a quien iba a retirar por el local. */}
                    {esEnvio && (
                        <div className="flex flex-col gap-3 rounded-lg border border-slate-200 p-3 dark:border-slate-700">
                            <div>
                                <label className="text-sm font-medium" htmlFor="ck-calle">Calle y número</label>
                                <input
                                    id="ck-calle"
                                    className={campo}
                                    value={datos.direccion?.street ?? ""}
                                    onChange={e =>
                                        setDatos({ ...datos, direccion: { ...datos.direccion, street: e.target.value } })
                                    }
                                />
                                {errores.street && <p className={error}>{errores.street}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-sm font-medium" htmlFor="ck-ciudad">Localidad</label>
                                    <input
                                        id="ck-ciudad"
                                        className={campo}
                                        value={datos.direccion?.city ?? ""}
                                        onChange={e =>
                                            setDatos({ ...datos, direccion: { ...datos.direccion, city: e.target.value } })
                                        }
                                    />
                                    {errores.city && <p className={error}>{errores.city}</p>}
                                </div>
                                <div>
                                    <label className="text-sm font-medium" htmlFor="ck-cp">Código postal</label>
                                    <input
                                        id="ck-cp"
                                        className={campo}
                                        value={datos.direccion?.postal_code ?? ""}
                                        onChange={e =>
                                            setDatos({
                                                ...datos,
                                                direccion: { ...datos.direccion, postal_code: e.target.value },
                                            })
                                        }
                                    />
                                    {errores.postal_code && <p className={error}>{errores.postal_code}</p>}
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium" htmlFor="ck-prov">Provincia</label>
                                <select
                                    id="ck-prov"
                                    className={campo}
                                    value={datos.direccion?.province ?? ""}
                                    onChange={e =>
                                        setDatos({ ...datos, direccion: { ...datos.direccion, province: e.target.value } })
                                    }
                                >
                                    <option value="">Elegí una</option>
                                    {PROVINCIAS.map(([codigo, nombre]) => (
                                        <option key={codigo} value={codigo}>{nombre}</option>
                                    ))}
                                </select>
                                {errores.province && <p className={error}>{errores.province}</p>}
                            </div>
                        </div>
                    )}

                    {/* **El total final lo dice el servidor.** El envío se cotiza
                        contra el proveedor al crear el pedido, así que acá no se
                        puede prometer un número: prometerlo y cobrar otro es
                        peor que no mostrarlo. */}
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        {esEnvio
                            ? "El costo del envío se calcula al confirmar, y se suma al total que vas a pagar."
                            : "Retirás por el local, así que no se cobra envío."}
                    </p>

                    {fallo && (
                        <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-300">
                            <p>{fallo}</p>
                            {pedidoPendiente && (
                                <>
                                    <p className="mt-1 text-xs">
                                        Tu pedido {pedidoPendiente.commerce_key} quedó reservado por{" "}
                                        {pesos(pedidoPendiente.total_amount, pedidoPendiente.currency)}. No lo
                                        pidas de nuevo: reintentá el pago.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={reintentarSoloElLink}
                                        disabled={enviando}
                                        className="mt-2 inline-flex min-h-10 items-center justify-center rounded-full bg-primary px-4 text-sm font-semibold text-white disabled:opacity-50"
                                    >
                                        Reintentar el pago
                                    </button>
                                </>
                            )}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={enviando || cart.length === 0 || pedidoPendiente !== null}
                        className="mt-1 inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {enviando ? "Un momento…" : "Ir a pagar"}
                    </button>
                </form>
            </div>
        </div>
    );
}
