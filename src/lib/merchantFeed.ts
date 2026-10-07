import type { CatalogProduct } from "./storeCatalog";

/**
 * El feed de Google Merchant Center (RSS 2.0 con el namespace `g:`).
 *
 * Merchant no tenía fuente principal: dependía de "Encontrado por Google" y
 * mostraba 0 productos. Este feed sale del mismo catálogo público que la tienda,
 * así que solo lista lo publicado en la web.
 */

const escapar = (texto: string) =>
    texto
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;")
        // Caracteres de control rompen el XML entero, no solo el item.
        .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "");

const absoluta = (url: string, siteUrl: string) =>
    /^https?:\/\//i.test(url) ? url : new URL(url, `${siteUrl}/`).toString();

/** Mismo criterio que `condicionSchema`: lo desconocido cae en usado. */
const condicionMerchant = (condicion: string) => {
    switch (condicion.trim().toLowerCase()) {
        case "new":
        case "nuevo":
            return "new";
        case "refurbished":
        case "reacondicionado":
            return "refurbished";
        default:
            return "used";
    }
};

/**
 * Categorías del catálogo → taxonomía de Google (IDs de taxonomy-with-ids.en-US.txt).
 * Sin mapeo no se manda: Google infiere la categoría, y una equivocada es peor.
 */
const CATEGORIA_GOOGLE: Record<string, string> = {
    ADAPTADOR: "258", // Electronics Accessories > Adapters
    AURICULAR: "543626", // Audio Components > Headphones & Headsets > Headphones
    "AURICULAR BT": "543626",
    CABLE: "259", // Electronics Accessories > Cables
    CARGADOR: "505295", // Power > Power Adapters & Chargers
    "CARGADOR PORTATIL": "505295",
    "POWER BANK": "505295",
};

export const categoriaGoogle = (categoria: string | null) =>
    categoria
        ? CATEGORIA_GOOGLE[categoria.normalize("NFD").replace(/\p{Diacritic}/gu, "").trim().toUpperCase().replace(/\s+/g, " ")]
        : undefined;

const campo = (nombre: string, valor: string | null | undefined) =>
    valor ? `<g:${nombre}>${escapar(valor)}</g:${nombre}>` : "";

export const itemMerchant = (p: CatalogProduct, siteUrl: string): string | null => {
    // Sin precio o sin foto Merchant lo rechaza; mejor no mandarlo.
    if (!(p.price > 0) || p.imageUrls.length === 0) return null;
    const [imagen, ...extras] = p.imageUrls.map((u) => absoluta(u, siteUrl));
    const link = `${siteUrl}/tienda/${p.slug}`;
    const descripcion = (p.description?.trim() || `${p.name} disponible en Team Celular.`).slice(0, 5000);
    return [
        "<item>",
        campo("id", p.slug),
        campo("title", p.name.slice(0, 150)),
        campo("description", descripcion),
        campo("link", link),
        campo("image_link", imagen),
        ...extras.slice(0, 10).map((u) => campo("additional_image_link", u)),
        campo("availability", p.inStock ? "in_stock" : "out_of_stock"),
        campo("price", `${p.price.toFixed(2)} ${p.currency}`),
        campo("condition", condicionMerchant(p.condition)),
        campo("brand", p.brand),
        campo("gtin", p.gtin),
        campo("mpn", p.model),
        // Sin GTIN ni MPN hay que decirlo; si no, Merchant lo marca como faltante.
        !p.gtin && !p.model ? campo("identifier_exists", "no") : "",
        campo("product_type", p.category),
        campo("google_product_category", categoriaGoogle(p.category)),
        "</item>",
    ].join("");
};

export const feedMerchant = (productos: CatalogProduct[], siteUrl: string): string => {
    const items = productos
        .map((p) => itemMerchant(p, siteUrl))
        .filter((i): i is string => i !== null);
    return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0"><channel>',
        "<title>Team Celular</title>",
        `<link>${escapar(siteUrl)}/tienda</link>`,
        "<description>Productos publicados en teamcelular.com</description>",
        ...items,
        "</channel></rss>",
    ].join("\n");
};
