import React from 'react';

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
  const imageObjects = imageUrls.map((u) => ({
    '@type': 'ImageObject',
    url: u,
  }));
  const aggregateRating = (product as any).rating ? {
    "@type": "AggregateRating",
    ratingValue: String((product as any).rating?.value || 4.5),
    reviewCount: String((product as any).rating?.count || 10),
  } : undefined;

  const offers: any = {
    "@type": "Offer",
    priceCurrency: "ARS",
    price: String(product.retail_price || 0),
    availability: (product.variants && product.variants.length && product.variants.some((v:any) => v.stock > 0))
      ? "https://schema.org/InStock"
      : "https://schema.org/OutOfStock",
    url: `${SITE_URL}/tienda/${product.id}`,
  };

  // Optional priceValidUntil
  if (product.price_valid_until) {
    offers.priceValidUntil = product.price_valid_until;
  }

  const schema: any = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    description: product.description || undefined,
    sku: product.serial_number || undefined,
    image: imageObjects.length ? imageObjects : undefined,
    brand: product.brand ? { "@type": "Brand", name: product.brand.name } : undefined,
    offers,
    aggregateRating,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
