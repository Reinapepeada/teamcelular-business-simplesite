import React from 'react';
import CategoryClient from '../CategoryClient';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import { getAllProducts } from '@/services/products';

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL?.trim() || 'https://teamcelular.com';

function slugify(text = '') {
  return text
    .toString()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function generateMetadata({ params }: any) {
  const { slug } = await params;
  try {
    const all = await getAllProducts();
    const products = all.filter(p => p.category && slugify(p.category.name) === String(slug));
    const categoryName = products.length ? products[0]?.category?.name : null;
    const title = categoryName ? `Tienda · ${categoryName}` : 'Tienda';
    const description = categoryName
      ? `Productos en la categoría ${categoryName} — Teamcelular.`
      : 'Categoría de productos en Teamcelular.';

    const url = `${SITE_URL}/tienda/categoria/${slug}`;
    const fallbackImage = `${SITE_URL}/images/teamcelular.webp`;

    return {
      title,
      description,
      alternates: {
        canonical: url,
        languages: {
          "es-AR": url,
        },
      },
      openGraph: {
        title,
        description,
        url,
        siteName: 'Teamcelular',
        type: 'website',
        locale: 'es_AR',
        images: [
          {
            url: fallbackImage,
            width: 1200,
            height: 630,
            alt: `Categoría ${categoryName || 'Productos'} - Teamcelular`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [fallbackImage],
      },
    } as any;
  } catch (err) {
    console.error('Category metadata error', err);
    return { title: 'Tienda' };
  }
}

export default async function Page({ params }: any) {
  const { slug } = await params;
  const all = await getAllProducts();
  const products = all.filter(p => p.category && slugify(p.category.name) === String(slug));
  const categoryName = products.length ? products[0]?.category?.name : null;
  const url = `${SITE_URL}/tienda/categoria/${slug}`;

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      {/* BreadcrumbList JSON-LD for this category */}
      {categoryName && (
        <BreadcrumbJsonLd
          items={[
            { name: 'Inicio', url: `${SITE_URL}/` },
            { name: 'Tienda', url: `${SITE_URL}/tienda` },
            { name: categoryName, url },
          ]}
        />
      )}
      <h1 className="text-3xl font-bold mb-6">{categoryName || 'Categoría'}</h1>
      <CategoryClient products={products} />
    </div>
  );
}
