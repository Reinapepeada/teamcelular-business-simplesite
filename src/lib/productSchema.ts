import type { Product } from "@/app/tienda/product";
import { getProductWarranty } from "@/app/tienda/product";
import { buildProductSlug } from "./productSlug";
import { absoluteUrl, businessId, getBranch } from "./businessProfile";
import { condicionSchema, etiquetaCondicion } from "./fixbeeCatalog";
import { getSiteUrl, toAbsoluteUrl } from "./seoMetadata";

export function buildProductSchema(product: Product, images: string[] = [], siteUrl = getSiteUrl()) {
  const pickup = getBranch("recoleta");
  const productUrl = toAbsoluteUrl(`/tienda/${buildProductSlug(product)}`, siteUrl);
  const warranty = getProductWarranty(product);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${productUrl}#product`,
    url: productUrl,
    name: product.name,
    description: product.description || `${product.name} en Team Celular. Consultanos por compatibilidad y garantía antes de comprar.`,
    sku: product.serial_number || undefined,
    category: product.category?.name || undefined,
    image: images.length ? images.map((image) => toAbsoluteUrl(image, siteUrl)) : undefined,
    brand: product.brand?.name ? { "@type": "Brand", name: product.brand.name } : undefined,
    model: product.model || undefined,
    // El modelo no acredita un MPN del fabricante. El catálogo no expone MPN.
    gtin: product.gtin || undefined,
    additionalProperty: [
      { "@type": "PropertyValue", name: warranty.label, value: warranty.value },
      { "@type": "PropertyValue", name: "Retiro", value: `${pickup.street}, ${pickup.neighborhood}, CABA` },
    ],
    offers: {
      "@type": "Offer",
      priceCurrency: "ARS",
      price: String(product.retail_price),
      availability: product.variants.some((variant) => variant.stock > 0)
        ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: productUrl,
      seller: { "@id": businessId("localbusiness") },
      itemCondition: etiquetaCondicion(product.storeCondition) ? condicionSchema(product.storeCondition) : undefined,
      availableAtOrFrom: { "@id": `${absoluteUrl(pickup.url)}#localbusiness` },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "AR",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 10,
        returnMethod: "https://schema.org/ReturnInStore",
        merchantReturnLink: toAbsoluteUrl("/devoluciones", siteUrl),
        name: "10 días corridos desde la entrega del producto",
      },
    },
  };
}
