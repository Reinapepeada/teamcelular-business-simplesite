import type { StoreProduct } from "./storeApi";
import { fetchStoreProduct, fetchStoreProducts } from "./storeApi";

/**
 * El catálogo, leído del backend de Fixbee.
 *
 * **Existe para arreglar un desajuste que rompía la compra en silencio.** El
 * sitio venía armando el slug del producto en el navegador —`nombre-{id}`, con
 * el id del backend viejo— y el backend nuevo lo deriva del nombre y lo guarda.
 * Los dos son "el slug del producto" y no coinciden nunca, así que un carrito
 * armado con el slug de acá y mandado al checkout de allá devuelve
 * `PRODUCT_UNAVAILABLE` sobre productos que existen y están publicados.
 *
 * El slug ahora viene del servidor y se usa tal cual: es lo único que identifica
 * un producto de punta a punta, porque el catálogo público no expone ids.
 */

/** Un producto listo para la tienda, con el slug que entiende el checkout. */
export interface CatalogProduct {
    /** El del backend. **No se construye acá.** */
    slug: string;
    name: string;
    description: string | null;
    price: number;
    currency: string;
    brand: string | null;
    model: string | null;
    condition: string;
    category: string | null;
    imageUrl: string | null;
    imageUrls: string[];
    warrantyMonths: number | null;
    /** Lo que se puede comprar ahora, ya descontadas las reservas vivas. */
    available: number;
    /** `false` cuando no queda stock. El producto sigue visible: ver abajo. */
    inStock: boolean;
}

export interface CatalogPage {
    items: CatalogProduct[];
    total: number;
    page: number;
    size: number;
}

/**
 * De dónde sale la foto.
 *
 * `image_key` es la clave en el bucket, no una URL. Sin base configurada se
 * devuelve `null` y la tarjeta muestra su placeholder: es preferible a un
 * `<img>` roto apuntando a una ruta que no existe.
 */
const BASE_IMAGENES = (process.env.NEXT_PUBLIC_STORE_IMAGES_URL ?? "").replace(/\/+$/, "");

export const imagenDe = (imageKey: string | null): string | null => {
    if (!imageKey) return null;
    if (imageKey.startsWith("/")) return imageKey;
    if (/^https?:\/\//i.test(imageKey)) return imageKey;
    if (!BASE_IMAGENES) return null;
    return `${BASE_IMAGENES}/${imageKey.replace(/^\/+/, "")}`;
};

// Estas rutas redirigen a una URL firmada. Vercel no puede resolverlas desde
// su optimizador de imágenes, pero el navegador sí puede seguir la redirección.
export const cargaDirectaImagen = (url: string): boolean =>
    url.startsWith("/store/products/");

/**
 * Adapta un producto del backend a lo que muestra la tienda.
 *
 * Un producto sin slug no se puede comprar —el checkout lo identifica por
 * ahí— así que se descarta en vez de mostrarse: una tarjeta que al hacer clic
 * no lleva a ningún lado es peor que una tarjeta que no está.
 */
export const adaptarProducto = (crudo: StoreProduct): CatalogProduct | null => {
    if (!crudo.slug) return null;
    const disponible = Number.isFinite(crudo.available) ? crudo.available : 0;
    const imageUrls = (crudo.image_urls ?? [])
        .map(imagenDe)
        .filter((url): url is string => Boolean(url));
    const imageUrl = imageUrls[0] ?? imagenDe(crudo.image_key);
    return {
        slug: crudo.slug,
        name: crudo.name,
        description: crudo.description,
        price: crudo.price,
        currency: crudo.currency ?? "ARS",
        brand: crudo.brand,
        model: crudo.model,
        condition: crudo.condition,
        category: crudo.category,
        imageUrl,
        imageUrls: imageUrls.length ? imageUrls : (imageUrl ? [imageUrl] : []),
        warrantyMonths: crudo.warranty_months,
        available: disponible,
        // **Agotado se muestra igual, sin poder comprarse.** Sacarlo del
        // catálogo rompe el link que ya se compartió y borra el producto de
        // Google; lo que hay que impedir es el clic en comprar, no la visita.
        inStock: disponible > 0,
    };
};

export const listarCatalogo = async (
    params: Record<string, string | number> = {}
): Promise<CatalogPage> => {
    const pagina = await fetchStoreProducts(params);
    const items = (pagina.items ?? [])
        .map(adaptarProducto)
        .filter((p): p is CatalogProduct => p !== null);
    return { items, total: pagina.total, page: pagina.page, size: pagina.size };
};

export const verProducto = async (slug: string): Promise<CatalogProduct | null> => {
    const crudo = await fetchStoreProduct(slug);
    return adaptarProducto(crudo);
};

/**
 * Lo que va al checkout: slug y cantidad, nada más.
 *
 * El precio no viaja **a propósito**: lo pone el servidor. Mandarlo desde el
 * navegador convierte el precio en algo que el comprador puede editar.
 */
export const lineasDelCarrito = (
    items: { slug: string; quantity: number }[]
): { slug: string; quantity: number }[] =>
    items
        .filter(i => i.slug && i.quantity > 0)
        .map(i => ({ slug: i.slug, quantity: Math.floor(i.quantity) }));
