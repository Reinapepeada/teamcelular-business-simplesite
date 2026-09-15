/**
 * Del carrito guardado a las líneas que entiende el checkout.
 *
 * **El carrito vive en `localStorage` y sobrevive al deploy.** Quien tenía cosas
 * agregadas antes de esta versión vuelve con un carrito de la forma vieja, sin
 * el slug del backend —el sitio lo armaba en el navegador como `nombre-{id}`, y
 * ese nunca matcheó con el del servidor—. De ese carrito no se puede deducir el
 * slug real: el id era del backend viejo.
 *
 * Así que esos ítems no se pueden comprar, y lo único honesto es decirlo. La
 * alternativa —mandarlos igual— es un `PRODUCT_UNAVAILABLE` sobre un producto
 * que está publicado y en stock, y nadie puede entender ese mensaje.
 */

/** Lo mínimo que hace falta de un ítem del carrito para poder comprarlo. */
export interface ItemComprable {
    /** El slug del backend. Los ítems guardados antes de esta versión no lo tienen. */
    slug?: string | null;
    quantity: number;
    /** Solo para poder nombrarlo en el aviso. */
    nombre?: string | null;
}

export interface LineasDelCarrito {
    /** Lo que se puede comprar, listo para el checkout. */
    lineas: { slug: string; quantity: number }[];
    /** Lo que hay que volver a agregar, por nombre cuando se sabe. */
    hayQueReagregar: string[];
}

/**
 * Junta las cantidades del mismo producto.
 *
 * El carrito guarda una fila por producto+variante, así que el mismo producto
 * puede aparecer dos veces. El checkout tiene un unique por `(pedido, producto)`
 * y mandarlo dos veces revienta contra la base con un error interno en vez de
 * comprar.
 */
export const aLineasDeCheckout = (items: ItemComprable[]): LineasDelCarrito => {
    const porSlug = new Map<string, number>();
    const hayQueReagregar: string[] = [];

    for (const item of items) {
        const cantidad = Math.floor(item.quantity);
        if (!Number.isFinite(cantidad) || cantidad <= 0) continue;

        const slug = typeof item.slug === "string" ? item.slug.trim() : "";
        if (!slug) {
            // Sin slug no hay forma de identificarlo contra el catálogo.
            hayQueReagregar.push(item.nombre?.trim() || "un producto");
            continue;
        }
        porSlug.set(slug, (porSlug.get(slug) ?? 0) + cantidad);
    }

    return {
        lineas: [...porSlug.entries()].map(([slug, quantity]) => ({ slug, quantity })),
        hayQueReagregar,
    };
};

/**
 * Si este carrito se puede comprar tal cual.
 *
 * **Un carrito a medias no se compra.** Cobrar lo que sí tiene slug y callar el
 * resto es entregar menos de lo que la persona armó, y encima cobrado: el error
 * aparece recién cuando abre el paquete.
 */
export const carritoComprable = (resumen: LineasDelCarrito): boolean =>
    resumen.lineas.length > 0 && resumen.hayQueReagregar.length === 0;
