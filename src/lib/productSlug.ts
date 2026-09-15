export function slugify(value: string): string {
    return value
        .toString()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

/**
 * La URL pública de un producto.
 *
 * **Si el producto viene de Fixbee, manda su slug y no se arma nada.** El
 * backend deriva el slug del nombre y lo guarda; el sitio lo venía armando en
 * el navegador como `nombre-{id}` con el id del backend viejo. Los dos se
 * llaman "el slug del producto" y no coinciden nunca, así que un link armado
 * acá cae en un 404 del catálogo nuevo, y el mismo desajuste hacía que el
 * checkout rechazara productos publicados y con stock.
 *
 * El armado viejo sobrevive para lo que todavía no pasó por Fixbee —el admin
 * lista productos del backend anterior— y muere solo cuando no queda ninguno.
 */
export function buildProductSlug(product: {
    id?: number | string | null;
    name?: string | null;
    storeSlug?: string | null;
}): string {
    const delBackend = product?.storeSlug;
    if (typeof delBackend === "string" && delBackend.trim() !== "") {
        return delBackend;
    }

    const id = product?.id ?? "";
    const name = product?.name ?? "";
    const nameSlug = slugify(name ? String(name) : "");

    if (id === "" || id === null || typeof id === "undefined") {
        return nameSlug;
    }

    if (nameSlug) {
        return `${nameSlug}-${id}`;
    }

    return String(id);
}

export function parseProductIdFromSlug(slug?: string | string[] | null): number | null {
    if (!slug) return null;
    const value = Array.isArray(slug) ? slug[0] : slug;
    if (!value) return null;
    if (/^\d+$/.test(value)) return Number(value);

    const match = value.match(/-(\d+)$/);
    if (match) return Number(match[1]);

    return null;
}
