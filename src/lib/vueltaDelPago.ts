/**
 * La vuelta de Mercado Pago.
 *
 * **Nada de lo que dice la redirección se toma como verdad.** El comprador
 * vuelve a `/checkout/exito?...` con parámetros que cualquiera puede escribir a
 * mano en la barra de direcciones: escribir `status=approved` en la URL no hace
 * que el pago exista. Lo único que sabe si se cobró es el backend, y lo dice
 * leyendo la base, no la redirección.
 *
 * De los parámetros se usa una sola cosa: `external_reference`, que es el
 * `commerce_key` del pedido. Eso es un **identificador, no una afirmación**:
 * decir "contame del pedido X" no es decir "el pedido X está pagado". Con la
 * clave en la mano se pregunta el estado, y si el pedido es de otro o no
 * existe, el backend no cuenta nada.
 */

import type { AlmacenClave } from "./checkoutKey";
import type { StoreOrderStatus } from "./storeApi";

const ESPACIO = "tc.pedido";

/**
 * Se recuerda el pedido antes de mandar a pagar.
 *
 * Es la fuente preferida para la vuelta: sale del navegador del comprador y no
 * de una URL que se puede editar. Los parámetros quedan como respaldo para
 * cuando el pago se termina en otro dispositivo, o cuando el almacenamiento
 * está bloqueado.
 */
export const recordarPedido = (almacen: AlmacenClave, commerceKey: string): void => {
    try {
        if (commerceKey) almacen.setItem(ESPACIO, commerceKey);
    } catch {
        // Sin poder guardar la compra sigue: la vuelta usa el parámetro.
    }
};

export const pedidoRecordado = (almacen: AlmacenClave): string | null => {
    try {
        const valor = almacen.getItem(ESPACIO);
        return valor && valor.trim() !== "" ? valor.trim() : null;
    } catch {
        return null;
    }
};

export const olvidarPedido = (almacen: AlmacenClave): void => {
    try {
        almacen.removeItem(ESPACIO);
    } catch {
        // La próxima compra lo reemplaza.
    }
};

/**
 * De qué pedido hay que preguntar el estado.
 *
 * Primero el recordado, que es del navegador; después `external_reference`, que
 * es lo único de la URL que se mira. El resto de los parámetros que manda
 * Mercado Pago —`status`, `collection_status`, `payment_id`— se ignoran a
 * propósito: son afirmaciones sobre el cobro, y esas las hace el backend.
 */
export const claveDeLaVuelta = (
    almacen: AlmacenClave | null,
    params: { get(nombre: string): string | null }
): string | null => {
    const recordado = almacen ? pedidoRecordado(almacen) : null;
    if (recordado) return recordado;

    const referencia = params.get("external_reference");
    return referencia && referencia.trim() !== "" ? referencia.trim() : null;
};

export type Desenlace = "pagado" | "esperando" | "sin_pedido";

/** Lo que la pantalla tiene que mostrar, derivado del estado que dio el backend. */
export interface VueltaMostrable {
    desenlace: Desenlace;
    titulo: string;
    detalle: string;
    /** Mientras sea true la pantalla vuelve a preguntar. */
    seguirPreguntando: boolean;
}

const ESPERANDO: VueltaMostrable = {
    desenlace: "esperando",
    titulo: "Estamos confirmando tu pago",
    detalle:
        "Mercado Pago nos tiene que avisar y a veces tarda unos segundos. No cierres esta página.",
    seguirPreguntando: true,
};

/**
 * Traduce el estado del pedido a lo que ve el comprador.
 *
 * **`paid` sale de la base**, no de la redirección: es el backend el que dice
 * si el pago entró. Mientras no lo diga, la pantalla espera en vez de felicitar
 * a alguien que todavía no pagó —o de asustar a alguien que sí pagó y cuyo
 * aviso está en camino.
 */
export const vueltaMostrable = (estado: StoreOrderStatus | null): VueltaMostrable => {
    if (!estado) return ESPERANDO;

    if (estado.paid) {
        return {
            desenlace: "pagado",
            titulo: "¡Listo! Tu pago entró",
            detalle:
                "Te mandamos el detalle por mail. Preparamos el pedido y te avisamos cuando salga.",
            seguirPreguntando: false,
        };
    }

    return ESPERANDO;
};

/**
 * Cuánto esperar antes de volver a preguntar, en milisegundos.
 *
 * Arranca rápido y se va estirando: el aviso de Mercado Pago suele llegar en
 * los primeros segundos, y preguntar cada medio segundo durante dos minutos es
 * castigar al backend por el caso raro.
 */
export const esperaAntesDeReintentar = (intento: number): number =>
    Math.min(1000 * 2 ** Math.max(0, intento), 15000);
