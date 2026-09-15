/**
 * Lo que el carrito muestra sumado.
 *
 * **Es un estimado, y el código tiene que decirlo.** Los precios salen de lo
 * que el navegador guardó cuando se agregó cada producto, y el carrito
 * sobrevive al deploy: si la tienda cambió el precio en el medio, esto muestra
 * el viejo. **Lo que se cobra lo pone el servidor** al crear el pedido, y ese
 * es el número que el comprador ve en Mercado Pago.
 *
 * Por eso no hay ninguna función acá que se llame "total": el total con envío
 * no existe de este lado.
 */

/** Lo mínimo de un ítem del carrito para poder sumarlo. */
export interface ItemSumable {
    quantity: number;
    product: { retail_price: number; name?: string | null };
    variant?: { color?: string | null; size?: string | null } | null;
}

export interface TotalesDelCarrito {
    /** Cuántas unidades, para el globito del carrito. */
    unidades: number;
    /** Lo que suman los productos. **Sin envío y con precios del navegador.** */
    productos: number;
}

const cantidadSana = (n: number) => (Number.isFinite(n) && n > 0 ? Math.floor(n) : 0);
const precioSano = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);

/**
 * Suma unidades y precios.
 *
 * Una cantidad o un precio ilegibles cuentan como cero en vez de propagar un
 * `NaN`: un carrito que dice "$ NaN" no lo entiende nadie, y el caso llega solo
 * —el carrito se guarda en el navegador y sobrevive a cualquier cambio de
 * formato.
 */
export const totalesDelCarrito = (items: ItemSumable[]): TotalesDelCarrito =>
    (items ?? []).reduce<TotalesDelCarrito>(
        (acc, item) => {
            const cantidad = cantidadSana(item?.quantity);
            const precio = precioSano(item?.product?.retail_price);
            return {
                unidades: acc.unidades + cantidad,
                productos: acc.productos + precio * cantidad,
            };
        },
        { unidades: 0, productos: 0 }
    );

/** Lo que suma una línea, con las mismas defensas. */
export const totalDeLinea = (item: ItemSumable): number =>
    precioSano(item?.product?.retail_price) * cantidadSana(item?.quantity);

/** Cómo se nombra una variante en el mensaje de WhatsApp: "Rojo / L". */
export const nombreDeVariante = (item: ItemSumable): string =>
    [item?.variant?.color || "", item?.variant?.size || ""].filter(Boolean).join(" / ");
