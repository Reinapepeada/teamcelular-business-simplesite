/**
 * El puente entre las URLs viejas de producto y las de Fixbee.
 *
 * **Las URLs cambiaron de forma.** El sitio armaba `/tienda/{nombre}-{id}` con
 * el id del backend anterior; Fixbee deriva el slug del nombre y no expone
 * ids, así que el mismo producto ahora vive en `/tienda/{nombre}`. Todo lo que
 * Google indexó, lo que está en un WhatsApp y lo que alguien tenga en favoritos
 * apunta a la forma vieja.
 *
 * El id viejo no se puede traducir —es de otra base— pero el nombre sí: sacarle
 * el sufijo numérico deja el slug que Fixbee guardó, si el producto se llama
 * igual. Cuando eso da con algo, la ficha redirige con un 301 y el link viejo
 * sigue valiendo.
 */

/**
 * Los slugs a probar contra el catálogo, en orden.
 *
 * **Primero el pedido tal cual, siempre.** Un slug legítimo de Fixbee puede
 * terminar en números —`pantalla-iphone-13`— y ahí el sufijo es parte del
 * nombre, no un id. Recortar antes de preguntar mandaría al comprador que pidió
 * la pantalla del 13 a la ficha de "pantalla iphone".
 *
 * El recorte se ofrece solo como segundo intento, para cuando el primero no
 * existe: si `pantalla-iphone-13` no está publicado, vale la pena ver si el
 * producto es `pantalla-iphone` y el `-13` era el id viejo.
 */
export function slugsAProbar(slug: string): string[] {
    const pedido = (slug ?? "").trim();
    if (!pedido) return [];

    const candidatos = [pedido];

    const sinSufijo = pedido.replace(/-\d+$/, "");
    // Un slug que es solo un número (`/tienda/1234`, la forma más vieja de
    // todas) se recorta a nada: no hay nombre que buscar.
    if (sinSufijo && sinSufijo !== pedido) {
        candidatos.push(sinSufijo);
    }

    return candidatos;
}
