import React from 'react';
import { buildProductSlug } from '@/lib/productSlug';
import { BUSINESS_PROFILE, absoluteUrl, businessId, getBranch } from '@/lib/businessProfile';
import { formatWarranty } from '@/app/tienda/product';
import { condicionSchema } from '@/lib/fixbeeCatalog';

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL?.trim() || 'https://teamcelular.com';
const PICKUP_BRANCH = getBranch('recoleta');

interface ProductStructuredDataProps {
  product: any;
  images?: string[];
}

function toAbsolute(url?: string) {
  if (!url) return undefined;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  const path = url.startsWith('/') ? url : `/${url}`;
  return `${SITE_URL}${path}`;
}

export default function ProductStructuredData({ product, images = [] }: ProductStructuredDataProps) {
  if (!product) return null;

  const imageUrls = (images || []).map(toAbsolute).filter(Boolean) as string[];
  const productUrl = `${SITE_URL}/tienda/${buildProductSlug(product)}`;
  const categoryName = product.category?.name;
  const warranty = formatWarranty(
    product,
    `${BUSINESS_PROFILE.warrantyDays} días sobre trabajo y repuesto instalado cuando aplica`
  );
  const imageObjects = imageUrls.map((u) => ({
    '@type': 'ImageObject',
    url: u,
  }));

  const offers: any = {
    "@type": "Offer",
    priceCurrency: "ARS",
    price: String(product.retail_price || 0),
    availability: (product.variants && product.variants.length && product.variants.some((v:any) => v.stock > 0))
      ? "https://schema.org/InStock"
      : "https://schema.org/OutOfStock",
    url: productUrl,
    seller: { "@id": businessId("localbusiness") },
    itemCondition: condicionSchema(product.storeCondition),
    // El retiro de la tienda online sale de una sola sucursal (/store/pickup-point);
    // se referencia la misma entidad que declara su página para no crear otra.
    availableAtOrFrom: { "@id": `${absoluteUrl(PICKUP_BRANCH.url)}#localbusiness` },
    // La politica publicada en /devoluciones da 10 dias corridos desde la entrega.
    hasMerchantReturnPolicy: {
      "@type": "MerchantReturnPolicy",
      applicableCountry: "AR",
      returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
      merchantReturnDays: 10,
      returnMethod: "https://schema.org/ReturnInStore",
      name: "10 dias corridos desde la entrega del producto",
    },
  };

  // Optional priceValidUntil
  if (product.price_valid_until) {
    offers.priceValidUntil = product.price_valid_until;
  }

  const schema: any = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "@id": `${productUrl}#product`,
    name: product.name,
    description:
      product.description ||
      `${product.name} disponible en Team Celular. Retiro en el local o envío a domicilio. Consultanos por compatibilidad y garantía antes de comprar.`,
    sku: product.serial_number || undefined,
    category: categoryName || undefined,
    image: imageObjects.length ? imageObjects : undefined,
    brand: product.brand ? { "@type": "Brand", name: product.brand.name } : undefined,
    model: product.model || undefined,
    mpn: product.model || undefined,
    gtin: product.gtin || undefined,
    audience: {
      "@type": "PeopleAudience",
      geographicArea: {
        "@type": "AdministrativeArea",
        name: "CABA",
      },
    },
    isRelatedTo: [
      { "@type": "Service", name: "Instalacion y diagnostico de repuestos para celulares" },
      { "@id": businessId("localbusiness") },
    ],
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Garantia",
        value: warranty,
      },
      {
        "@type": "PropertyValue",
        name: "Retiro",
        value: `${PICKUP_BRANCH.street}, ${PICKUP_BRANCH.neighborhood}, CABA`,
      },
      {
        "@type": "PropertyValue",
        name: "Consulta previa",
        value: BUSINESS_PROFILE.responseWindow,
      },
    ],
    offers,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
