import type { CatalogProduct } from "./storeCatalog";
import type { Product } from "@/app/tienda/product";

/**
 * El puente entre el catálogo de Fixbee y lo que el sitio ya sabe mostrar.
 *
 * **La tienda entera habla `Product`**: las tarjetas, la ficha, el carrito, los
 * JSON-LD. Cambiar ese tipo obligaría a tocar todo de una, así que el producto
 * de Fixbee se adapta a esa forma y el resto del sitio no se entera de que
 * cambió el backend. Lo único que sí viaja hacia afuera es `storeSlug`, porque
 * es lo que identifica al producto de punta a punta.
 */

/** Un `Product` que además sabe cómo se llama en Fixbee. */
export type VidrieraProduct = Product & {
    /** El slug del backend. **Nunca se construye acá.** */
    storeSlug: string;
};

const AHORA = "1970-01-01T00:00:00.000Z";

/**
 * Meses a la forma que el sitio ya formatea.
 *
 * Fixbee guarda la garantía en meses y nada más; `formatWarranty` espera un
 * número y una unidad. Sin unidad la ficha dice "consultar antes de comprar"
 * sobre un producto que tiene garantía declarada.
 */
const garantia = (meses: number | null) =>
    meses && meses > 0
        ? { warranty_time: meses, warranty_unit: "MONTHS" as const }
        : { warranty_time: null, warranty_unit: null };

/**
 * Adapta un producto de Fixbee a la forma que muestra el sitio.
 *
 * **`id` queda en 0 a propósito.** El catálogo público no expone ids —son
 * correlativos de la base y recorrerlos deja leer el inventario entero— así que
 * no hay ninguno que poner, e inventar uno derivado del slug sería fingir que
 * existe. Nada lo usa para identificar: el carrito se lleva por `storeSlug` y
 * las listas se recorren por slug.
 *
 * El stock viaja como **una sola variante sintética**. El sitio suma el stock
 * de las variantes para decidir si dice "sin stock" o "últimas N unidades";
 * Fixbee no tiene variantes y devuelve un disponible ya descontadas las
 * reservas vivas. Una lista vacía haría que todo el catálogo se muestre
 * agotado.
 */
export const productoDeVidriera = (p: CatalogProduct): VidrieraProduct => ({
    id: 0,
    storeSlug: p.slug,
    serial_number: "",
    name: p.name,
    description: p.description,
    brand_id: null,
    category_id: null,
    ...garantia(p.warrantyMonths),
    // El costo es el margen de compra: el catálogo público no lo trae, y no
    // tiene por qué. Cero acá es "no se sabe", y nada del sitio lo muestra.
    cost: 0,
    retail_price: p.price,
    status: "ACTIVE",
    category: p.category ? { id: 0, name: p.category, description: null, created_at: AHORA } : null,
    brand: p.brand ? { id: 0, name: p.brand, created_at: AHORA } : null,
    created_at: AHORA,
    updated_at: AHORA,
    variants: [
        {
            id: 0,
            product_id: 0,
            sku: p.slug,
            color: null,
            size: null,
            size_unit: null,
            unit: null,
            branch_id: null,
            stock: p.available,
            created_at: AHORA,
            updated_at: AHORA,
            images: p.imageUrl
                ? [{ id: 0, variant_id: 0, image_url: p.imageUrl, created_at: AHORA }]
                : [],
        },
    ],
});
