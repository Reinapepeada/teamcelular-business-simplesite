/**
 * Qué hace que dos ítems del carrito sean el mismo ítem.
 *
 * **Con los productos de Fixbee manda el slug, no el id.** El catálogo público
 * no expone ids, así que todo lo que sale de Fixbee llega al sitio con `id: 0`.
 * Con una clave armada sobre el id, los productos se pisarían entre sí: agregar
 * un cargador después de una funda sumaría cantidad sobre la funda, y el
 * carrito mostraría un solo renglón con el producto equivocado.
 *
 * La clave vieja sigue viva para los ítems que ya están guardados en
 * localStorage —el carrito sobrevive al deploy— y para lo que todavía no pasa
 * por Fixbee. Cambiársela los duplicaría de golpe.
 */
export function claveDeCarrito(
    productId: number,
    variantId?: number | null,
    storeSlug?: string | null
): string {
    const base =
        typeof storeSlug === "string" && storeSlug.trim() !== ""
            ? `s:${storeSlug.trim()}`
            : String(productId);
    return variantId ? `${base}-${variantId}` : base;
}
