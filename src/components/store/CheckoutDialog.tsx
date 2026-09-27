"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { PROVINCIAS } from "@/lib/provincias";
import useCartStore from "@/store/cartStore";
import { intentoDeCheckout, prepararIntento } from "@/lib/checkoutKey";
import {
    olvidarPedido,
    pedidoGuardado,
    pedidoYaNoSePuedePagar,
    recordarPedido,
} from "@/lib/vueltaDelPago";
import {
    abrirElPago,
    armarPedido,
    reservarYPagarSiCoincide,
    recuperarIntento,
    revisarPedido,
    problemaDeCheckout,
    type ProblemaDeCheckout,
    ErrorDeCompra,
    mensajePedidoTerminado,
    hayErrores,
    LARGOS_DE_ENVIO,
    validarDatos,
    type DatosDeCompra,
    type DireccionDelFormulario,
    type ErroresDeCompra,
} from "@/lib/checkoutFlow";
import { aLineasDeCheckout } from "@/lib/cartLines";
import { huellaDelCarrito } from "@/lib/checkoutKey";
import { queHacerConElPendiente } from "@/lib/pedidoPendiente";
import { whatsappUrl } from "@/lib/businessProfile";
import { resumenParaConfirmar, vencimientoReserva } from "@/lib/resumenDelPedido";
import { totalesDelCarrito } from "@/lib/totalesDelCarrito";
import {
    quoteShipping,
    createOrder,
    fetchOrderStatus,
    fetchPickupPoint,
    requestPaymentLink,
    type PickupPoint,
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
    estimadoDeEnvio,
    enviando,
    fallo,
    onPagar,
    onVolver,
}: {
    pedido: StoreOrder;
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
            <ul>{pedido.items?.map(item => (
                <li key={item.product_id}>{item.current_product_name || `Producto ${item.product_id}`} · {item.quantity} × {pesos(item.unit_price, pedido.currency)}</li>
            ))}</ul>
            <p>{pedido.customer_name} · {pedido.customer_email} {pedido.customer_phone}</p>
            <p>{pedido.shipping === null ? "Retiro en el local" : pedido.shipping
                ? [pedido.shipping.street, pedido.shipping.extra, pedido.shipping.city,
                    PROVINCIAS.find(([codigo]) => codigo === pedido.shipping?.province)?.[1] ?? pedido.shipping.province,
                    pedido.shipping.postal_code && "CP " + pedido.shipping.postal_code].filter(Boolean).join(" · ")
                : "No pudimos obtener la entrega del pedido. Escribinos para confirmarla."}</p>
            <p className="text-sm">Estos son los datos guardados en tu pedido. Si necesitás cambiarlos, escribinos antes de pagar.</p>
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
                lo podés retomar desde el carrito. {vencimientoReserva(pedido) && `Reservado hasta las ${vencimientoReserva(pedido)}.`}
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

/**
 * Un campo con su error enganchado: el lector de pantalla anuncia el error al
 * entrar al campo, no solo quien lo ve en rojo.
 */
function Campo({
    id,
    label,
    error,
    children,
}: {
    id: string;
    label: string;
    error?: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <label className="text-sm font-medium" htmlFor={id}>{label}</label>
            {children}
            {error && (
                <p id={`${id}-error`} className="mt-1 text-xs text-red-600 dark:text-red-400">
                    {error}
                </p>
            )}
        </div>
    );
}

// 16 px en el celular: con menos, Safari hace zoom al tocar el campo y el
// comprador pierde de vista el formulario.
const propsDeCampo = (id: string, error?: string) => ({
    id,
    className:
        "w-full rounded-lg border border-slate-300 px-3 py-2 text-base sm:text-sm dark:border-slate-600 dark:bg-slate-900",
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
});

export default function CheckoutDialog({ abierto, onCerrar }: CheckoutDialogProps) {
    const router = useRouter();
    const { cart, destinoEnvio, removeFromCart } = useCartStore();
    const dialogRef = useRef<HTMLDialogElement>(null);

    const [datos, setDatos] = useState<DatosDeCompra>({
        nombre: "",
        email: "",
        telefono: "",
        entrega: "retiro",
        direccion: {},
    });
    const ocupado = useRef(false);
    const [revision, setRevision] = useState<(Awaited<ReturnType<typeof revisarPedido>> & { huella: string; datos: DatosDeCompra }) | null>(null);
    const [problema, setProblema] = useState<ProblemaDeCheckout | null>(null);
    const [productosRevisados, setProductosRevisados] = useState(0);
    const [estimadoEnvio, setEstimadoEnvio] = useState(0);
    const [errores, setErrores] = useState<ErroresDeCompra>({});
    const [enviando, setEnviando] = useState(false);
    const [comprobandoIntento, setComprobandoIntento] = useState(true);
    const [intentoPendiente, setIntentoPendiente] = useState(false);
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
    // El local donde se retira de verdad: lo elige el backend, no esta página.
    // Si no se puede saber, la opción queda sin detalle antes que con uno falso.
    const [retiro, setRetiro] = useState<PickupPoint | null>(null);

    useEffect(() => {
        if (!abierto) return;
        const comprobar = () => {
            try {
                setIntentoPendiente(!!intentoDeCheckout(window.localStorage));
            } catch (error) {
                setIntentoPendiente(true);
                setFallo(error instanceof Error ? error.message : "No pudimos recuperar tu compra. Escribinos antes de volver a comprar.");
            }
            setComprobandoIntento(false);
        };
        const frame = requestAnimationFrame(comprobar);
        // Si otra pestaña confirma, este formulario también deja de ofrecer cambios.
        window.addEventListener("storage", comprobar);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("storage", comprobar);
        };
    }, [abierto]);

    useEffect(() => {
        if (!abierto) return;
        let vivo = true;
        fetchPickupPoint()
            .then(punto => {
                if (vivo) setRetiro(punto);
            })
            .catch(() => undefined);
        return () => {
            vivo = false;
        };
    }, [abierto]);

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
                ...g.reserva,
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

    const recuperarCompra = async (): Promise<boolean> => {
        const payload = intentoDeCheckout(window.localStorage);
        if (!payload) return false;
        setIntentoPendiente(true);
        const pedido = await recuperarIntento(window.localStorage, {
            crearPedido: createOrder,
            pedirLink: requestPaymentLink,
            recordar: pedido => recordarPedido(window.localStorage, {
                clave: pedido.commerce_key, checkoutKey: payload.checkout_key,
                token: pedido.access_token, total: pedido.total_amount, moneda: pedido.currency,
                huella: huellaDelCarrito(payload.items),
                reserva: { created_at: pedido.created_at, expires_at: pedido.expires_at, reserved_until: pedido.reserved_until },
            }),
        });
        if (!pedido) return false;
        setPedidoPendiente(pedido);
        setAConfirmar(pedido);
        setRevision(null);
        setHuellaPendiente(huellaDelCarrito(payload.items));
        setProductosRevisados(pedido.subtotal_amount);
        setEstimadoEnvio(pedido.shipping_amount);
        return true;
    };

    const retomarIntento = async () => {
        if (ocupado.current) return;
        ocupado.current = true;
        setEnviando(true);
        setFallo(null);
        try {
            await recuperarCompra();
        } catch (error) {
            if (error instanceof ErrorDeCompra && error.pedido && mensajePedidoTerminado(error.pedido)) {
                if (error.pedido.status === "paid" || error.pedido.status === "paid_pending_stock_commit") {
                    router.push("/checkout/exito");
                } else {
                    olvidarPedido(window.localStorage, error.pedido.commerce_key);
                    setIntentoPendiente(false);
                    setPedidoPendiente(null);
                    setHuellaPendiente(null);
                }
                setFallo(error.message);
            } else {
                setFallo(error instanceof Error && !(error instanceof ErrorDeCompra) ? error.message
                    : "No pudimos recuperar tu pedido. Reintentá o escribinos antes de cambiar los datos o pagar.");
            }
        } finally {
            ocupado.current = false;
            setEnviando(false);
        }
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Otra pestaña puede haber enviado el pedido mientras este formulario estaba abierto.
        try {
            if (intentoDeCheckout(window.localStorage)) {
                await retomarIntento();
                return;
            }
        } catch (error) {
            setIntentoPendiente(true);
            setFallo(error instanceof Error ? error.message : "No pudimos recuperar tu compra.");
            return;
        }
        const encontrados = validarDatos(datos, items);
        setErrores(encontrados);
        setFallo(null);
        if (hayErrores(encontrados)) {
            // El foco va al primer campo con error: en el celular el mensaje
            // puede quedar fuera de la pantalla y el botón no parece hacer nada.
            requestAnimationFrame(() => {
                dialogRef.current
                    ?.querySelector<HTMLElement>('[aria-invalid="true"]')
                    ?.focus();
            });
            return;
        }
        if (ocupado.current || pedidoPendiente || aConfirmar) return;
        ocupado.current = true;
        setEnviando(true);
        setProblema(null);
        try {
            const r = await revisarPedido(datos, items, estimadoDeProductos, quoteShipping);
            setRevision({ ...r, datos: structuredClone(datos), huella: huellaActual });
            setEstimadoEnvio(r.envio);
            setProductosRevisados(r.productos);
        } catch (error) {
            const p = problemaDeCheckout(error, items);
            setProblema({ ...p, ofrecerRetiro: datos.entrega === "envio" || p.ofrecerRetiro });
            setFallo(p.mensaje);
        } finally {
            ocupado.current = false;
            setEnviando(false);
        }
    };

    const confirmarRevision = async () => {
        if (!revision || ocupado.current || pedidoPendiente || aConfirmar) return;
        if (revision.huella !== huellaActual || revision.productos !== estimadoDeProductos) {
            setRevision(null);
            setFallo("El carrito cambió. Revisá el pedido otra vez.");
            return;
        }
        if (!window.navigator.locks) {
            setFallo("Para comprar, abrí la tienda con HTTPS en un navegador actualizado.");
            return;
        }

        ocupado.current = true;
        setEnviando(true);
        setFallo(null);
        try {
            const { payload, recuperado } = await prepararIntento(window.localStorage, aLineasDeCheckout(items).lineas,
                (clave, secreto) => armarPedido(revision.datos, items, clave, secreto));
            setIntentoPendiente(true);
            const { pedido, checkoutUrl } = await reservarYPagarSiCoincide(
                {
                    crearPedido: createOrder,
                    pedirLink: requestPaymentLink,
                    // Se anota apenas el pedido existe, antes de pedir el link:
                    // es lo que permite volver si el pago no llega a abrirse, y
                    // lo que la pantalla de vuelta usa para preguntar el estado
                    // sin depender de los parametros de la URL.
                    recordar: (pedido) => {
                        setPedidoPendiente(pedido);
                        setHuellaPendiente(huellaDelCarrito(payload.items));
                        recordarPedido(window.localStorage, {
                            clave: pedido.commerce_key,
                            checkoutKey: payload.checkout_key,
                            token: pedido.access_token ?? null,
                            total: pedido.total_amount,
                            moneda: pedido.currency,
                            // Con que carrito se creo: es lo que despues
                            // decide si este pedido todavia es el de la compra
                            // que el comprador tiene a la vista.
                            huella: huellaDelCarrito(payload.items),
                            reserva: { created_at: pedido.created_at, expires_at: pedido.expires_at, reserved_until: pedido.reserved_until },
                        });
                    },
                },
                payload, revision.productos, revision.envio, recuperado
            );
            setRevision(null);
            if (checkoutUrl) irAPagar(checkoutUrl);
            else setAConfirmar(pedido);
            setHuellaPendiente(huellaDelCarrito(payload.items));
            setEnviando(false);
        } catch (error) {
            if (error instanceof ErrorDeCompra) {
                const p = problemaDeCheckout(error, items);
                setProblema(p);
                setFallo(error.pedido ? p.mensaje : "No pudimos confirmar tu pedido. Recuperalo antes de cambiar los datos o pagar.");
                setErrores(p.campos ?? {});
                setRevision(null);
                if (error.pedido && mensajePedidoTerminado(error.pedido)) {
                    if (error.pedido.status === "paid" || error.pedido.status === "paid_pending_stock_commit") {
                        router.push("/checkout/exito");
                    } else {
                        olvidarPedido(window.localStorage, error.pedido.commerce_key);
                        setIntentoPendiente(false);
                    }
                    setPedidoPendiente(null);
                    setHuellaPendiente(null);
                    setEnviando(false);
                    return;
                }
                const recuperable = error.pedido;
                setPedidoPendiente(recuperable);
                setHuellaPendiente(recuperable ? huellaActual : null);
            } else {
                setIntentoPendiente(true);
                setRevision(null);
                setFallo(error instanceof Error ? error.message : "No pudimos completar la compra. Probá de nuevo.");
            }
            setEnviando(false);
        } finally {
            ocupado.current = false;
        }
    };

    const confirmarYPagar = async () => {
        if (!aConfirmar || ocupado.current) return;
        ocupado.current = true;
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
        } finally {
            ocupado.current = false;
        }
    };

    const reintentarSoloElLink = async () => {
        if (!pedidoPendiente?.access_token || ocupado.current) return;
        ocupado.current = true;
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
        } finally {
            ocupado.current = false;
        }
    };

    if (!abierto) return null;

    const numeroPedido = (aConfirmar ?? pedidoPendiente)?.commerce_key;
    const esEnvio = datos.entrega === "envio";
    const cambiarDireccion = (cambio: Partial<DireccionDelFormulario>) =>
        setDatos({ ...datos, direccion: { ...datos.direccion, ...cambio } });

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

                {(comprobandoIntento || intentoPendiente) && !aConfirmar ? (
                    <div className="mt-4 flex flex-col gap-3">
                        <p>Antes de continuar, recuperá tu pedido y revisá los datos que quedaron guardados.</p>
                        {fallo && <p role="alert">{fallo}</p>}
                        <button type="button" onClick={retomarIntento} disabled={enviando || comprobandoIntento} className="min-h-12 rounded-full bg-primary px-5 text-white disabled:opacity-50">
                            {enviando || comprobandoIntento ? "Un momento…" : "Recuperar y revisar pedido"}
                        </button>
                    </div>
                ) : aConfirmar ? (
                    <ResumenAConfirmar
                        pedido={aConfirmar}
                        estimadoDeProductos={productosRevisados}
                        estimadoDeEnvio={estimadoEnvio}
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
                ) : revision ? (
                    <div className="mt-4 flex flex-col gap-3" aria-live="polite">
                        <h3 className="font-semibold">Revisá tu pedido</h3>
                        {pedidoPendiente && <p>Pedido {pedidoPendiente.commerce_key}. Reservado hasta las {vencimientoReserva(pedidoPendiente)}.</p>}
                        <ul>{cart.map(item => <li key={item.cartKey}>{item.product.name} · {item.quantity} × {pesos(item.product.retail_price)}</li>)}</ul>
                        <p>{revision.datos.nombre} · {revision.datos.email} {revision.datos.telefono}</p>
                        <p>{revision.datos.entrega === "retiro"
                            ? retiro ? [retiro.name, retiro.address].filter(Boolean).join(" · ") : "Retiro en el local. No pudimos obtener la dirección; escribinos para confirmarla."
                            : [revision.datos.direccion?.street, revision.datos.direccion?.number,
                                revision.datos.direccion?.floor && "Piso " + revision.datos.direccion.floor,
                                revision.datos.direccion?.apartment && "Depto " + revision.datos.direccion.apartment,
                                revision.datos.direccion?.city,
                                PROVINCIAS.find(([codigo]) => codigo === revision.datos.direccion?.province)?.[1] ?? revision.datos.direccion?.province,
                                "CP " + revision.datos.direccion?.postal_code].filter(Boolean).join(" · ")}</p>
                        <p>Productos: {pesos(revision.productos)} · Envío: {pesos(revision.envio)}</p>
                        <p className="font-semibold">Total estimado: {pesos(revision.total)}</p>
                        <p className="text-sm">Todavía no reservaste. Si cambia el total, te vamos a pedir que lo confirmes.</p>
                        {fallo && <p role="alert">{fallo}</p>}
                        <button type="button" disabled={enviando} onClick={confirmarRevision} className="min-h-12 rounded-full bg-primary px-5 text-white disabled:opacity-50">{enviando ? "Un momento…" : "Confirmar y pagar"}</button>
                        <button type="button" disabled={enviando} onClick={() => { setRevision(null); setFallo(null); }} className="min-h-11 rounded-full border px-5">Cambiar datos</button>
                    </div>
                ) : (
                <form className="mt-4 flex flex-col gap-3" onSubmit={onSubmit}>
                    <fieldset disabled={enviando || pedidoPendiente !== null} className="flex flex-col gap-3 border-0 p-0">
                    <p className="text-sm text-slate-600 dark:text-slate-400">Comprás como invitado. No necesitás crear una cuenta.</p>
                    <Campo id="ck-nombre" label="Nombre y apellido" error={errores.nombre}>
                        <input
                            {...propsDeCampo("ck-nombre", errores.nombre)}
                            autoComplete="name"
                            value={datos.nombre}
                            onChange={e => setDatos({ ...datos, nombre: e.target.value })}
                        />
                    </Campo>

                    {/* Por acá llega el aviso de que el pedido salió. */}
                    <Campo id="ck-email" label="Mail" error={errores.email}>
                        <input
                            {...propsDeCampo("ck-email", errores.email)}
                            type="email"
                            autoComplete="email"
                            inputMode="email"
                            value={datos.email}
                            onChange={e => setDatos({ ...datos, email: e.target.value })}
                        />
                    </Campo>

                    <Campo
                        id="ck-tel"
                        label={esEnvio ? "Teléfono (para que el correo te ubique)" : "Teléfono (opcional)"}
                        error={errores.telefono}
                    >
                        <input
                            {...propsDeCampo("ck-tel", errores.telefono)}
                            type="tel"
                            autoComplete="tel"
                            value={datos.telefono ?? ""}
                            onChange={e => setDatos({ ...datos, telefono: e.target.value })}
                        />
                    </Campo>

                    <fieldset className="mt-1">
                        <legend className="text-sm font-medium">¿Cómo lo recibís?</legend>
                        <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:gap-4">
                            <label className="flex items-start gap-2 text-sm">
                                <input
                                    type="radio"
                                    name="entrega"
                                    className="mt-1"
                                    checked={!esEnvio}
                                    onChange={() => setDatos({ ...datos, entrega: "retiro" })}
                                />
                                <span>
                                    Retiro en el local
                                    {retiro && (
                                        <span className="block text-xs text-slate-500 dark:text-slate-400">
                                            {[retiro.name, retiro.address, retiro.hours].filter(Boolean).join(" · ")}
                                        </span>
                                    )}
                                </span>
                            </label>
                            <label className="flex items-start gap-2 text-sm">
                                <input
                                    type="radio"
                                    name="entrega"
                                    className="mt-1"
                                    checked={esEnvio}
                                    onChange={() => setDatos({ ...datos, entrega: "envio", direccion: {
                                        ...datos.direccion,
                                        province: datos.direccion?.province || destinoEnvio.province,
                                        postal_code: datos.direccion?.postal_code || destinoEnvio.postal_code,
                                    } })}
                                />
                                Envío a domicilio
                            </label>
                        </div>
                    </fieldset>

                    {/* La dirección aparece solo para envío: pedirla siempre hace
                        abandonar a quien iba a retirar por el local. */}
                    {esEnvio && (
                        <div className="flex flex-col gap-3 rounded-lg border border-slate-200 p-3 dark:border-slate-700">
                            <div className="grid grid-cols-[1fr_6rem] gap-3">
                                <Campo id="ck-calle" label="Calle" error={errores.street}>
                                    <input
                                        {...propsDeCampo("ck-calle", errores.street)}
                                        autoComplete="address-line1"
                                        maxLength={LARGOS_DE_ENVIO.street}
                                        value={datos.direccion?.street ?? ""}
                                        onChange={e => cambiarDireccion({ street: e.target.value })}
                                    />
                                </Campo>
                                <Campo id="ck-numero" label="Número" error={errores.number}>
                                    <input
                                        {...propsDeCampo("ck-numero", errores.number)}
                                        inputMode="numeric"
                                        maxLength={LARGOS_DE_ENVIO.number}
                                        value={datos.direccion?.number ?? ""}
                                        onChange={e => cambiarDireccion({ number: e.target.value })}
                                    />
                                </Campo>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <Campo id="ck-piso" label="Piso (opcional)" error={errores.floor}>
                                    <input
                                        {...propsDeCampo("ck-piso", errores.floor)}
                                        autoComplete="address-line2"
                                        maxLength={LARGOS_DE_ENVIO.floor}
                                        value={datos.direccion?.floor ?? ""}
                                        onChange={e => cambiarDireccion({ floor: e.target.value })}
                                    />
                                </Campo>
                                <Campo id="ck-depto" label="Depto (opcional)" error={errores.apartment}>
                                    <input
                                        {...propsDeCampo("ck-depto", errores.apartment)}
                                        maxLength={LARGOS_DE_ENVIO.apartment}
                                        value={datos.direccion?.apartment ?? ""}
                                        onChange={e => cambiarDireccion({ apartment: e.target.value })}
                                    />
                                </Campo>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <Campo id="ck-ciudad" label="Localidad" error={errores.city}>
                                    <input
                                        {...propsDeCampo("ck-ciudad", errores.city)}
                                        autoComplete="address-level2"
                                        maxLength={LARGOS_DE_ENVIO.city}
                                        value={datos.direccion?.city ?? ""}
                                        onChange={e => cambiarDireccion({ city: e.target.value })}
                                    />
                                </Campo>
                                <Campo id="ck-cp" label="Código postal" error={errores.postal_code}>
                                    <input
                                        {...propsDeCampo("ck-cp", errores.postal_code)}
                                        autoComplete="postal-code"
                                        value={datos.direccion?.postal_code ?? ""}
                                        onChange={e => cambiarDireccion({ postal_code: e.target.value })}
                                    />
                                </Campo>
                            </div>
                            <Campo id="ck-prov" label="Provincia" error={errores.province}>
                                <select
                                    {...propsDeCampo("ck-prov", errores.province)}
                                    autoComplete="address-level1"
                                    value={datos.direccion?.province ?? ""}
                                    onChange={e => cambiarDireccion({ province: e.target.value })}
                                >
                                    <option value="">Elegí una</option>
                                    {PROVINCIAS.map(([codigo, nombre]) => (
                                        <option key={codigo} value={codigo}>{nombre}</option>
                                    ))}
                                </select>
                            </Campo>
                        </div>
                    )}

                    </fieldset>
                    {/* La revisión cotiza antes de reservar; el servidor confirma el importe. */}
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        {esEnvio
                            ? "Antes de reservar vas a ver el costo del envío y el total estimado."
                            : "Retirás por el local, así que no se cobra envío."}
                    </p>

                    {fallo && (
                        <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-300">
                            <p role="alert">{fallo}</p>
                            {!pedidoPendiente && problema?.ofrecerRetiro && <button type="button" className="min-h-11 underline" onClick={() => { setDatos({ ...datos, entrega: "retiro" }); setFallo(null); setProblema(null); }}>Retirar en el local</button>}
                            {!pedidoPendiente && problema?.quitarSlug && <button type="button" className="min-h-11 underline" onClick={() => { cart.filter(i => i.storeSlug === problema.quitarSlug).forEach(i => removeFromCart(i.cartKey)); setFallo(null); setProblema(null); }}>Quitar del carrito</button>}
                            {pedidoPendiente && (
                                <>
                                    <p className="mt-1 text-xs">
                                        Tu pedido {pedidoPendiente.commerce_key} quedó reservado por{" "}
                                        {pesos(pedidoPendiente.total_amount, pedidoPendiente.currency)}. No lo
                                        pidas de nuevo: reintentá el pago. {vencimientoReserva(pedidoPendiente) && `Reservado hasta las ${vencimientoReserva(pedidoPendiente)}.`}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={reintentarSoloElLink}
                                        disabled={enviando || !pedidoPendiente.access_token}
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
                <a className="mt-3 block min-h-11 text-sm underline" href={whatsappUrl("Hola, necesito ayuda con " + (numeroPedido ? "el pedido " + numeroPedido : "mi compra en la tienda") + ".")} target="_blank" rel="noopener noreferrer">Escribinos por WhatsApp</a>
            </dialog>
    );
}
