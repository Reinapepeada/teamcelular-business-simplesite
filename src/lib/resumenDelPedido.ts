import type { StoreOrder } from "./storeApi";

/**
 * Lo que el comprador ve antes de que le cobren.
 *
 * **Todo lo que hay acá sale del pedido que creó el servidor, y nada se
 * recalcula.** Los precios del carrito son los que el navegador guardó al
 * agregar cada producto, y el carrito sobrevive al deploy: si la tienda cambió
 * un precio en el medio, el carrito muestra el viejo. El servidor pone el
 * precio de verdad y suma el envío que cotizó, y ese es el número que se cobra.
 *
 * Por eso esta pantalla existe: hasta ahora el comprador veía el importe real
 * recién en Mercado Pago, con el pedido ya creado y el stock reservado.
 */

export interface ResumenParaConfirmar {
    importesConfirmados: boolean;
    /** Los productos, al precio del servidor. */
    subtotal: number | null;
    /** Lo que cotizó el envío. Cero cuando retira por el local. */
    envio: number | null;
    /** **Lo que se cobra.** */
    total: number | null;
    moneda: string;
    /** `true` cuando hay envío que mostrar como renglón aparte. */
    hayEnvio: boolean;
    /**
     * `true` cuando lo que el carrito venía mostrando por los productos no es
     * lo que el servidor va a cobrar.
     *
     * No es un error: es la razón por la que esta pantalla existe. Se avisa en
     * vez de dejar que el comprador se entere en Mercado Pago.
     */
    precioCambio: boolean;
    /** Cuánto cambió el subtotal. Positivo si subió. */
    diferencia: number;
}

export const importeConfirmado = (n: unknown): number | null =>
    typeof n === "number" && Number.isFinite(n) && n >= 0 ? n : null;

/** Comparar dinero en centavos evita diferencias sólo de representación binaria. */
const centavos = (importe: number) => Math.round(importe * 100);

/**
 * El resumen, a partir del pedido del servidor y de lo que el carrito mostraba.
 *
 * `estimadoDeProductos` es solo para decidir si hubo cambio: **ningún importe
 * que se muestre sale de ahí**.
 */
export const resumenParaConfirmar = (
    pedido: Pick<StoreOrder, "subtotal_amount" | "shipping_amount" | "total_amount" | "currency">,
    estimadoDeProductos: number,
    estimadoDeEnvio?: number
): ResumenParaConfirmar => {
    const subtotal = importeConfirmado(pedido?.subtotal_amount);
    const envio = importeConfirmado(pedido?.shipping_amount);
    const total = importeConfirmado(pedido?.total_amount);
    const estimado = importeConfirmado(estimadoDeProductos) ?? 0;
    const importesConfirmados = subtotal !== null && envio !== null && total !== null;

    const diferencia = !importesConfirmados ? 0 : estimadoDeEnvio === undefined
        ? subtotal! - estimado
        : total! - estimado - estimadoDeEnvio;

    return {
        importesConfirmados,
        subtotal,
        envio,
        total,
        moneda: pedido?.currency || "ARS",
        hayEnvio: envio === null || envio > 0,
        // Sin estimado no se afirma que cambió: un carrito recuperado de una
        // versión vieja puede no tener con qué comparar, y decir "el precio
        // cambió" sobre eso es inventar.
        precioCambio: importesConfirmados && (estimadoDeEnvio !== undefined
            ? centavos(subtotal!) !== centavos(estimado) || centavos(envio!) !== centavos(estimadoDeEnvio)
                || centavos(total!) !== centavos(estimado) + centavos(estimadoDeEnvio)
            : estimado > 0 && centavos(subtotal!) !== centavos(estimado)),
        diferencia,
    };
};

/** Renderizar otra vez no extiende la reserva. */
export const vencimientoReserva = (pedido: Pick<StoreOrder, "reservation_expires_at" | "expires_at" | "reserved_until" | "created_at">): string | null => {
    // null confirma que no quedan reservas activas; no se inventa un vencimiento.
    if (pedido.reservation_expires_at === null) return null;
    // Una fecha sin offset no confirma un instante: no depende de la zona del navegador.
    const exacto = [pedido.reservation_expires_at, pedido.expires_at, pedido.reserved_until].find(v => v && /(?:Z|[+-]\d{2}:\d{2})$/i.test(v) && Number.isFinite(Date.parse(v)));
    if (!exacto) return null;
    return new Intl.DateTimeFormat("es-AR", {
        timeZone: "America/Argentina/Buenos_Aires", day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
    }).format(new Date(exacto)) + " (hora de Argentina)";
};
