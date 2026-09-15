import type { PedidoGuardado } from "./vueltaDelPago";

/**
 * Qué hacer con un pedido creado y sin pagar.
 *
 * **Vive acá y no en el componente porque es donde estuvieron los últimos tres
 * bugs.** Las reglas son dos frases, pero cada una tiene un borde que se paga
 * caro: recuperar de más le ofrece al comprador pagar una compra que no es la
 * que tiene a la vista, y recuperar de menos lo deja con stock reservado que no
 * puede pagar hasta que venza. En un `useEffect` eso no lo mira ningún test;
 * acá sí.
 */

export type QueHacerConElPendiente =
    | { accion: "nada" }
    | { accion: "recuperar"; pedido: PedidoGuardado }
    | { accion: "soltar" };

export interface SituacionDelPendiente {
    /** Lo que hay en el almacenamiento, si hay algo. */
    guardado: PedidoGuardado | null;
    /** La huella del carrito que el comprador tiene a la vista ahora. */
    huellaActual: string;
    /** Si la pantalla ya está mostrando un pedido pendiente, y con qué huella. */
    huellaEnPantalla: string | null;
}

/**
 * La decisión, en un solo lugar.
 *
 * - **Recuperar** solo si el pedido guardado tiene token —sin él no se puede
 *   pedir el link, y el backend lo entrega una sola vez— y su huella es la del
 *   carrito actual.
 * - **Soltar** lo que ya se está mostrando cuando el carrito pasó a ser OTRO.
 *   Un carrito vacío no cuenta: ahí no hay con qué confundirse y el pedido
 *   sigue reservado y pagable, así que esconderlo solo le saca al comprador la
 *   forma de pagar algo que ya tiene el stock tomado.
 */
export const queHacerConElPendiente = (
    s: SituacionDelPendiente
): QueHacerConElPendiente => {
    if (s.huellaEnPantalla) {
        if (s.huellaActual && s.huellaActual !== s.huellaEnPantalla) {
            return { accion: "soltar" };
        }
        return { accion: "nada" };
    }

    const g = s.guardado;
    if (!g?.token) return { accion: "nada" };
    if (!g.huella || g.huella !== s.huellaActual) return { accion: "nada" };

    return { accion: "recuperar", pedido: g };
};
