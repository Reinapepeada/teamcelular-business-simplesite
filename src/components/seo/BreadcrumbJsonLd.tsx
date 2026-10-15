import React from 'react';
import buildBreadcrumbSchema, { BreadcrumbItem } from './breadcrumb';
import { serializeJsonLd } from '@/lib/jsonLd';

interface Props {
  items: BreadcrumbItem[];
}

export default function BreadcrumbJsonLd({ items }: Props) {
  if (!items || items.length === 0) return null;
  const schema = buildBreadcrumbSchema(items);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
    />
  );
}
