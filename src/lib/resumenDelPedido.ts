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
    /** Los productos, al precio del servidor. */
    subtotal: number;
    /** Lo que cotizó el envío. Cero cuando retira por el local. */
    envio: number;
    /** **Lo que se cobra.** */
    total: number;
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

const numeroSano = (n: unknown): number =>
    typeof n === "number" && Number.isFinite(n) ? n : 0;

/**
 * Un peso de tolerancia.
 *
 * Los importes viajan como número y pueden volver con centavos de redondeo del
 * proveedor. Avisar "el precio cambió" por un centavo asusta sin motivo.
 */
const TOLERANCIA = 1;

/**
 * El resumen, a partir del pedido del servidor y de lo que el carrito mostraba.
 *
 * `estimadoDeProductos` es solo para decidir si hubo cambio: **ningún importe
 * que se muestre sale de ahí**.
 */
export const resumenParaConfirmar = (
    pedido: Pick<StoreOrder, "subtotal_amount" | "shipping_amount" | "total_amount" | "currency">,
    estimadoDeProductos: number
): ResumenParaConfirmar => {
    const subtotal = numeroSano(pedido?.subtotal_amount);
    const envio = numeroSano(pedido?.shipping_amount);
    const total = numeroSano(pedido?.total_amount);
    const estimado = numeroSano(estimadoDeProductos);

    const diferencia = subtotal - estimado;

    return {
        subtotal,
        envio,
        total,
        moneda: pedido?.currency || "ARS",
        hayEnvio: envio > 0,
        // Sin estimado no se afirma que cambió: un carrito recuperado de una
        // versión vieja puede no tener con qué comparar, y decir "el precio
        // cambió" sobre eso es inventar.
        precioCambio: estimado > 0 && Math.abs(diferencia) > TOLERANCIA,
        diferencia,
    };
};
