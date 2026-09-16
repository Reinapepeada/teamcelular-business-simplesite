import React from "react";
import { Product } from "@/app/tienda/product";
import { esquemaDeProducto } from "@/lib/esquemaDeProducto";

interface ProductSchemaProps {
  product: Product;
}

export default function ProductSchema({ product }: ProductSchemaProps) {
  if (!product) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(esquemaDeProducto(product)) }}
    />
  );
}
