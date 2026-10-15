import type { Product } from '@/app/tienda/product';
import { buildProductSchema } from '@/lib/productSchema';
import { serializeJsonLd } from '@/lib/jsonLd';

export default function ProductStructuredData({ product, images = [] }: { product: Product; images?: string[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildProductSchema(product, images)) }}
    />
  );
}
