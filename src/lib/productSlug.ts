export function slugify(value: string): string {
    return value
        .toString()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export function buildProductSlug(product: { id?: number | string | null; name?: string | null }): string {
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
