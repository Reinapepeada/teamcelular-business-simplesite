import React from 'react';
import { buildProductSlug } from '@/lib/productSlug';
import { BUSINESS_PROFILE, businessId } from '@/lib/businessProfile';

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL?.trim() || 'https://teamcelular.com';

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
  const warranty = product.warranty_time && product.warranty_unit
    ? `${product.warranty_time} ${String(product.warranty_unit).toLowerCase()}`
    : `${BUSINESS_PROFILE.warrantyDays} dias sobre trabajo y repuesto instalado cuando aplica`;
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
    itemCondition: "https://schema.org/NewCondition",
    availableAtOrFrom: {
      "@type": "Place",
      name: "Team Celular Recoleta",
      address: `${BUSINESS_PROFILE.primaryAddress.street}, ${BUSINESS_PROFILE.primaryAddress.neighborhood}, CABA`,
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
      `${product.name} disponible en Team Celular CABA. Consultar compatibilidad, stock, garantia y retiro en Recoleta o Belgrano antes de comprar.`,
    sku: product.serial_number || undefined,
    category: categoryName || undefined,
    image: imageObjects.length ? imageObjects : undefined,
    brand: product.brand ? { "@type": "Brand", name: product.brand.name } : undefined,
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
        value: "Recoleta o Belgrano, CABA",
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
