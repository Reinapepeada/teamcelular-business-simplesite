import { condicionSchema } from "./fixbeeCatalog";
import { buildProductSlug } from "./productSlug";

/**
 * El JSON-LD de una ficha de producto.
 *
 * **Vive acá y no adentro del componente** porque es lo que lee Google: si se
 * arma mal, el sitio se ve bien y el resultado de búsqueda miente. Un objeto
 * plano se puede recorrer con tests; un `<script>` adentro de un `.tsx`, no.
 */

const BASE = "https://teamcelular.com/tienda";

type ProductoParaEsquema = {
    name?: string | null;
    description?: string | null;
    serial_number?: string | null;
    retail_price?: number | null;
    id?: number | string | null;
    storeSlug?: string | null;
    storeCondition?: string | null;
    brand?: { name?: string | null } | null;
    variants?: Array<{ stock?: number | null; images?: Array<{ image_url?: string | null }> | null } | null> | null;
};

/**
 * La primera imagen que exista, recorriendo todas las variantes.
 *
 * Mirar solo `variants[0]` deja la ficha sin imagen cuando la primera variante
 * no tiene ninguna y las demás sí.
 */
const primeraImagen = (producto: ProductoParaEsquema): string => {
    for (const variante of producto.variants ?? []) {
        for (const imagen of variante?.images ?? []) {
            const url = imagen?.image_url;
            if (typeof url === "string" && url.trim() !== "") return url;
        }
    }
    return "";
};

/**
 * Hay stock si alguna variante tiene disponible mayor a cero.
 *
 * El stock puede venir negativo cuando las reservas superan lo contado; eso es
 * sin stock, no con stock.
 */
export const hayStock = (producto: ProductoParaEsquema): boolean =>
    (producto.variants ?? []).some((v) => (v?.stock ?? 0) > 0);

export const esquemaDeProducto = (producto: ProductoParaEsquema): Record<string, unknown> => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: producto.name ?? "",
    description: producto.description || producto.name || "",
    image: primeraImagen(producto),
    sku: producto.serial_number ?? "",
    brand: {
        "@type": "Brand",
        name: producto.brand?.name || "Generic",
    },
    offers: {
        "@type": "Offer",
        url: `${BASE}/${buildProductSlug(producto)}`,
        priceCurrency: "ARS",
        price: producto.retail_price ?? 0,
        availability: hayStock(producto)
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
        // **Nunca fijo en nuevo.** Declarar NewCondition sobre un usado es
        // decirle a Google, y a quien lee el resultado, algo que no es cierto.
        itemCondition: condicionSchema(producto.storeCondition),
    },
});
