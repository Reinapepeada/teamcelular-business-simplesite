/**
 * Cuánto se puede comprar de lo que la ficha tiene a la vista.
 *
 * **Vive acá y no en la ficha por la misma razón que el pedido pendiente**: es
 * la regla que decide si el botón de comprar se puede apretar, y adentro de un
 * componente no la mira ningún test.
 */

/** Lo mínimo que hace falta de una variante para saber cuánto hay. */
export interface VarianteConStock {
    stock: number;
}

/**
 * El stock que manda: el de la variante elegida, o el total si no hay variante.
 *
 * **Con `??` y no con `||`.** El operador viejo trataba el `0` como "no hay
 * dato" y caía al total: una variante agotada mostraba el stock de las otras y
 * dejaba agregar al carrito algo que no existe. Hoy Fixbee manda una sola
 * variante, así que el bug no se dispara —el total es esa misma variante— pero
 * queda armado para el día que alguien agregue una segunda.
 */
export const stockQueManda = (
    variante: VarianteConStock | null | undefined,
    stockTotal: number
): number => variante?.stock ?? stockTotal;

/** Si se puede sumar una unidad más sin pasarse de lo que hay. */
export const sePuedeSumar = (
    cantidad: number,
    variante: VarianteConStock | null | undefined,
    stockTotal: number
): boolean => cantidad < stockQueManda(variante, stockTotal);

/** Si se puede restar. Nunca por debajo de uno: cero se saca del carrito. */
export const sePuedeRestar = (cantidad: number): boolean => cantidad > 1;

/** Si hay algo para comprar. */
export const hayParaComprar = (
    variante: VarianteConStock | null | undefined,
    stockTotal: number
): boolean => stockQueManda(variante, stockTotal) > 0;

/** Tope visual; el checkout vuelve a validar el stock actual en el servidor. */
export const limitarCantidadAlStock = (cantidad: number, stock: number): number =>
    Number.isFinite(cantidad) && Number.isFinite(stock)
        ? Math.max(0, Math.min(Math.floor(cantidad), Math.floor(stock)))
        : 0;
