import React from "react";
import { Product } from "@/app/tienda/product";

interface ProductSchemaProps {
  product: Product;
}

export default function ProductSchema({ product }: ProductSchemaProps) {
  if (!product) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || product.name,
    image: product.variants?.[0]?.images?.[0]?.image_url || "",
    sku: product.serial_number,
    brand: {
      "@type": "Brand",
      name: product.brand?.name || "Generic",
    },
    offers: {
      "@type": "Offer",
      url: `https://teamcelular.com/tienda/${product.id}`,
      priceCurrency: "ARS",
      price: product.retail_price,
      availability: product.variants?.some((v) => v.stock > 0)
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
