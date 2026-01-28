import { notFound } from 'next/navigation';
import CategoryClient from '../CategoryClient';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import { apiUrl } from '@/services/products';

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
    const data = await getCategoryData(String(slug));
    if (!data?.categoryName) {
      return {
        title: 'Categoría no encontrada',
        robots: { index: false, follow: false },
      } as any;
    }

    const title = `Tienda · ${data.categoryName}`;
    const description = `Productos en la categoría ${data.categoryName} — Teamcelular.`;
    const url = `${SITE_URL}/tienda/categoria/${slug}`;
    const fallbackImage = `${SITE_URL}/opengraph-image.png`;

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
            alt: `Categoría ${data.categoryName} - Teamcelular`,
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
  const data = await getCategoryData(String(slug));
  if (!data?.categoryName) {
    notFound();
  }
  const products = data.products;
  const categoryName = data.categoryName;
  const url = `${SITE_URL}/tienda/categoria/${slug}`;
  const intro = categoryName
    ? `Descubrí ${products.length} productos disponibles en la categoría ${categoryName}. Envíos en CABA y asesoramiento personalizado.`
    : 'Explorá productos de esta categoría con repuestos y accesorios seleccionados.';

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
      <h1 className="text-3xl font-bold mb-3">{categoryName || 'Categoría'}</h1>
      <p className="text-slate-600 dark:text-slate-300 mb-6">{intro}</p>
      {products.length > 0 ? (
        <CategoryClient products={products} />
      ) : (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Por el momento no hay productos disponibles en esta categoría.
        </p>
      )}
    </div>
  );
}

const getCategoryData = async (slug: string) => {
  if (!apiUrl) return null;

  try {
    const categoriesResponse = await fetch(`${apiUrl}/categories/get/all`, {
      next: { revalidate: 86400 },
    });
    if (!categoriesResponse.ok) return null;
    const categories = await categoriesResponse.json();
    const category = categories.find((cat: any) => slugify(cat.name) === slug);
    if (!category?.name) return null;

    const queryParams = new URLSearchParams();
    queryParams.set('page', '1');
    queryParams.set('size', '24');
    queryParams.set('categories', category.name);

    const productsResponse = await fetch(
      `${apiUrl}/products/?${queryParams.toString()}`,
      { next: { revalidate: 3600 } }
    );
    if (!productsResponse.ok) {
      return { categoryName: category.name, products: [] };
    }

    const data = await productsResponse.json();
    return { categoryName: category.name, products: data.products || [] };
  } catch (error) {
    console.error('Category fetch error', error);
    return null;
  }
};
