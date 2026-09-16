"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import useCartStore from "@/store/cartStore";
import { prepararCheckout } from "@/lib/checkoutKey";
import {
    olvidarPedido,
    pedidoGuardado,
    pedidoYaNoSePuedePagar,
    recordarPedido,
} from "@/lib/vueltaDelPago";
import {
    abrirElPago,
    armarPedido,
    reservar,
    ErrorDeCompra,
    mensajePedidoTerminado,
    hayErrores,
    validarDatos,
    type DatosDeCompra,
    type ErroresDeCompra,
} from "@/lib/checkoutFlow";
import { aLineasDeCheckout } from "@/lib/cartLines";
import { huellaDelCarrito } from "@/lib/checkoutKey";
import { queHacerConElPendiente } from "@/lib/pedidoPendiente";
import { resumenParaConfirmar } from "@/lib/resumenDelPedido";
import { totalesDelCarrito } from "@/lib/totalesDelCarrito";
import {
    createOrder,
    fetchOrderStatus,
    requestPaymentLink,
    type StoreOrder,
} from "@/lib/storeApi";

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

/**
 * El resumen que se confirma antes de pagar.
 *
 * Tonto a propósito: qué mostrar lo decide `resumenParaConfirmar`, que sí está
 * probado. Acá solo se dibuja.
 */
function ResumenAConfirmar({
    pedido,
    estimadoDeProductos,
    enviando,
    fallo,
    onPagar,
    onVolver,
}: {
    pedido: StoreOrder;
    estimadoDeProductos: number;
    enviando: boolean;
    fallo: string | null;
    onPagar: () => void;
    onVolver: () => void;
}) {
    const r = resumenParaConfirmar(pedido, estimadoDeProductos);

    return (
        <div className="mt-4 flex flex-col gap-3">
            {r.precioCambio && (
                <p className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:bg-amber-500/10 dark:text-amber-300">
                    {r.diferencia > 0
                        ? "El precio de algún producto subió desde que lo agregaste al carrito."
                        : "El precio de algún producto bajó desde que lo agregaste al carrito."}{" "}
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
                lo podés retomar desde el carrito.
            </p>

            {fallo && (
                <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-800 dark:bg-rose-500/10 dark:text-rose-300">
                    {fallo}
                </p>
            )}

            <button
                type="button"
                onClick={onPagar}
                disabled={enviando}
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

export default function CheckoutDialog({ abierto, onCerrar }: CheckoutDialogProps) {
    const { cart } = useCartStore();
    const dialogRef = useRef<HTMLDialogElement>(null);

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
    // El pedido creado y esperando que el comprador confirme el total.
    // **Tiene stock reservado**: irse de esta pantalla no lo cancela, lo deja
    // recuperable por el mismo camino que un fallo del link.
    const [aConfirmar, setAConfirmar] = useState<StoreOrder | null>(null);
    const [pedidoPendiente, setPedidoPendiente] = useState<StoreOrder | null>(null);
    // Con qué carrito se armó el pedido pendiente. Comparar la huella una sola
    // vez, al recuperarlo, no alcanza: el comprador puede cambiar el carrito
    // DESPUÉS y quedarse con un botón que ofrece pagar otra cosa.
    const [huellaPendiente, setHuellaPendiente] = useState<string | null>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!abierto || !dialog) return;
        dialog.showModal();
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previousOverflow;
            dialog.close();
        };
    }, [abierto]);

    const items = useMemo(
        () =>
            cart.map(item => ({
                slug: item.storeSlug,
                quantity: item.quantity,
                nombre: item.product?.name,
            })),
        [cart]
    );

    // Lo que el carrito venía mostrando por los productos. **Solo sirve para
    // avisar si el precio cambió**: ningún importe de la confirmación sale de
    // acá, todos salen del pedido que creó el servidor.
    const estimadoDeProductos = useMemo(() => totalesDelCarrito(cart).productos, [cart]);

    const huellaActual = useMemo(
        () => huellaDelCarrito(aLineasDeCheckout(items).lineas),
        [items]
    );

    // **Un pedido creado y sin pagar sobrevive a la recarga**, y se suelta si
    // el carrito pasa a ser otro. La regla completa, con sus bordes, vive en
    // `src/lib/pedidoPendiente.ts`, que es lo que se puede probar.
    useEffect(() => {
        let almacen: Storage | null = null;
        try {
            almacen = window.localStorage;
        } catch {
            // Modo privado: no hay pedido que recuperar ni que soltar.
            return;
        }

        const decision = queHacerConElPendiente({
            guardado: almacen ? pedidoGuardado(almacen) : null,
            huellaActual,
            huellaEnPantalla: huellaPendiente,
        });

        if (decision.accion === "recuperar") {
            const g = decision.pedido;
            setPedidoPendiente({
                commerce_key: g.clave,
                access_token: g.token,
                total_amount: g.total ?? 0,
                currency: g.moneda ?? "ARS",
            } as StoreOrder);
            setHuellaPendiente(g.huella);
            setFallo("Tenés un pedido reservado esperando el pago.");
            return;
        }

        if (decision.accion === "soltar") {
            setPedidoPendiente(null);
            setHuellaPendiente(null);
            setFallo(null);
        }
    }, [huellaActual, huellaPendiente]);

    const irAPagar = (url: string) => {
        window.location.href = url;
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const encontrados = validarDatos(datos, items);
        setErrores(encontrados);
        setFallo(null);
        if (hayErrores(encontrados)) return;
        if (!window.navigator.locks) {
            setFallo("Para comprar, abrí la tienda con HTTPS en un navegador actualizado.");
            return;
        }

        setEnviando(true);
        try {
            const { clave, secreto } = await prepararCheckout(window.localStorage, aLineasDeCheckout(items).lineas);
            const pedido = await reservar(
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
                            checkoutKey: clave,
                            token: pedido.access_token ?? null,
                            total: pedido.total_amount,
                            moneda: pedido.currency,
                            // Con que carrito se creo: es lo que despues
                            // decide si este pedido todavia es el de la compra
                            // que el comprador tiene a la vista.
                            huella: huellaActual,
                        }),
                },
                armarPedido(datos, items, clave, secreto)
            );
            // **Acá NO se manda a pagar.** El total que se cobra —con el precio
            // de hoy y el envío cotizado— recién existe ahora, y el comprador
            // tiene que verlo antes de que le cobren.
            setAConfirmar(pedido);
            setHuellaPendiente(huellaActual);
            setEnviando(false);
        } catch (error) {
            if (error instanceof ErrorDeCompra) {
                setFallo(error.message);
                if (error.pedido && mensajePedidoTerminado(error.pedido)) {
                    if (error.pedido.status === "paid" || error.pedido.status === "paid_pending_stock_commit") {
                        window.location.assign("/checkout/exito");
                    } else {
                        olvidarPedido(window.localStorage, error.pedido.commerce_key);
                    }
                    setPedidoPendiente(null);
                    setHuellaPendiente(null);
                    setEnviando(false);
                    return;
                }
                const recuperable = error.pedido?.access_token ? error.pedido : null;
                setPedidoPendiente(recuperable);
                setHuellaPendiente(recuperable ? huellaActual : null);
            } else {
                setFallo("No pudimos completar la compra. Probá de nuevo.");
            }
            setEnviando(false);
        }
    };

    const confirmarYPagar = async () => {
        if (!aConfirmar) return;
        setEnviando(true);
        setFallo(null);
        try {
            const url = await abrirElPago(
                { crearPedido: createOrder, pedirLink: requestPaymentLink },
                aConfirmar
            );
            // La clave NO se olvida acá: entre esto y el pago hay una pantalla
            // de Mercado Pago de la que se puede volver, y ahí todavía tiene que
            // servir para recuperar el mismo pedido.
            irAPagar(url);
        } catch (error) {
            setFallo(
                error instanceof ErrorDeCompra
                    ? error.message
                    : "No pudimos abrir el pago. Probá de nuevo."
            );
            // El pedido sigue vivo y con su token: se ofrece reintentar solo el
            // link en vez de crear otro.
            setPedidoPendiente(aConfirmar);
            setAConfirmar(null);
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
            const status = (error as { status?: number } | null)?.status;

            // **El 409 no dice qué pasó.** El backend contesta lo mismo para
            // "el pedido ya no acepta un link" y para "la tienda no puede
            // cobrar ahora" —credenciales vencidas o ilegibles—, y lo hace a
            // propósito, para no delatar qué empresas cobran online. Tomarlo
            // como "este pedido murió" tira el token de un pedido perfectamente
            // pagable cada vez que la tienda tiene un problema de credenciales.
            //
            // Quién sabe de verdad es el estado del pedido, que es lo que se
            // pregunta acá antes de soltar nada.
            if (status === 409) {
                let terminado = false;
                try {
                    const estado = await fetchOrderStatus(pedidoPendiente.commerce_key);
                    terminado = pedidoYaNoSePuedePagar(estado);
                } catch {
                    // Sin poder confirmarlo, el pedido se conserva: perderlo es
                    // irreversible y volver a intentar no cuesta nada.
                }

                if (terminado) {
                    try {
                        olvidarPedido(window.localStorage, pedidoPendiente.commerce_key);
                    } catch {
                        // Si no se puede limpiar, al menos el diálogo se destraba.
                    }
                    setPedidoPendiente(null);
                    setHuellaPendiente(null);
                    setFallo(
                        "Ese pedido ya no se puede pagar: puede que ya esté pagado o que haya vencido. Revisá tu mail o escribinos."
                    );
                } else {
                    setFallo(
                        "No pudimos abrir el pago ahora. Tu pedido sigue reservado: probá de nuevo en un rato o escribinos."
                    );
                }
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
            <dialog
                ref={dialogRef}
                aria-label="Finalizar compra"
                onCancel={event => {
                    event.preventDefault();
                    if (!enviando) onCerrar();
                }}
                className="fixed inset-x-0 bottom-0 top-auto m-0 hidden max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-t-2xl border-0 bg-white p-5 text-slate-950 backdrop:bg-black/50 open:block dark:bg-slate-950 dark:text-slate-50 sm:inset-0 sm:m-auto sm:rounded-2xl"
            >
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-950 dark:text-slate-50">
                        {aConfirmar ? "Revisá y confirmá tu compra" : "Tus datos y entrega"}
                    </h2>
                    <button type="button" onClick={onCerrar} disabled={enviando} aria-label="Volver al carrito" className="inline-flex min-h-11 items-center justify-center px-3 text-sm text-slate-500 disabled:opacity-40">
                        Volver
                    </button>
                </div>

                {errores.carrito && (
                    <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:bg-amber-500/10 dark:text-amber-300">
                        {errores.carrito}
                    </p>
                )}

                {aConfirmar ? (
                    <ResumenAConfirmar
                        pedido={aConfirmar}
                        estimadoDeProductos={estimadoDeProductos}
                        enviando={enviando}
                        fallo={fallo}
                        onPagar={confirmarYPagar}
                        onVolver={() => {
                            // **No se cancela el pedido.** Ya tiene stock
                            // reservado; queda recuperable por el mismo camino
                            // que un fallo del link, y vence solo si nadie lo
                            // paga.
                            setPedidoPendiente(aConfirmar);
                            setAConfirmar(null);
                            setFallo("Tenés un pedido reservado esperando el pago.");
                        }}
                    />
                ) : (
                <form className="mt-4 flex flex-col gap-3" onSubmit={onSubmit}>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Comprás como invitado. No necesitás crear una cuenta.</p>
                    <div>
                        <label className="text-sm font-medium" htmlFor="ck-nombre">Nombre y apellido</label>
                        <input
                            id="ck-nombre"
                            autoComplete="name"
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
                            autoComplete="email"
                            inputMode="email"
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
                            type="tel"
                            autoComplete="tel"
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
                                    autoComplete="street-address"
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
                                        autoComplete="address-level2"
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
                                        autoComplete="postal-code"
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
                                    autoComplete="address-level1"
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
                        {enviando ? "Un momento…" : "Revisar pedido"}
                    </button>
                </form>
                )}
            </dialog>
    );
}
