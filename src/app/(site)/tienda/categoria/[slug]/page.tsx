import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import CatalogFilters from "@/components/store/CatalogFilters";
import CatalogResults, {
  CatalogResultsFallback,
} from "@/components/store/CatalogResults";
import {
  getCatalogCategoryBySlug,
  getCatalogFilters,
  getCatalogPage,
  normalizeCatalogFilters,
  type CatalogSearchParams,
} from "@/lib/catalog";
import { slugify } from "@/lib/productSlug";

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";

function isCategoryPageIndexable(
  filters: Awaited<ReturnType<typeof normalizeCatalogFilters>>,
) {
  return (
    filters.page === 1 &&
    !filters.search &&
    filters.categories.length === 0 &&
    filters.brands.length === 0 &&
    !filters.minPrice &&
    !filters.maxPrice &&
    !filters.sort
  );
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<CatalogSearchParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCatalogCategoryBySlug(String(slug));

  if (!category) {
    return {
      title: "Categoría no encontrada | Team Celular",
      robots: { index: false, follow: false },
    };
  }

  const canonicalSlug = slugify(category.name);
  const categoryUrl = `${SITE_URL}/tienda/categoria/${canonicalSlug}`;
  const filters = normalizeCatalogFilters((await searchParams) ?? {});
  const categoryPage = await getCatalogPage(
    {
      ...filters,
      categories: [],
    },
    category.name,
  );
  const hasProducts = (categoryPage.products || []).length > 0;
  const shouldIndex = hasProducts && isCategoryPageIndexable(filters);

  return {
    title: `${category.name} | Tienda Team Celular`,
    description: `Explora productos de ${category.name} disponibles en Team Celular con retiro en Recoleta y envío en CABA.`,
    alternates: {
      canonical: categoryUrl,
      languages: {
        "es-AR": categoryUrl,
      },
    },
    robots: {
      index: shouldIndex,
      follow: true,
    },
    openGraph: {
      title: `${category.name} | Tienda Team Celular`,
      description: `Productos de ${category.name} con asesoramiento real y disponibilidad en CABA.`,
      url: categoryUrl,
      siteName: "Team Celular",
      type: "website",
      locale: "es_AR",
      images: [
        {
          url: `${SITE_URL}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: `${category.name} - Team Celular`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} | Tienda Team Celular`,
      description: `Productos de ${category.name} con retiro en Recoleta y envío en CABA.`,
      images: [`${SITE_URL}/opengraph-image.png`],
    },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<CatalogSearchParams>;
}) {
  const [{ slug }, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);
  const filters = normalizeCatalogFilters(resolvedSearchParams ?? {});
  const [category, filterOptions] = await Promise.all([
    getCatalogCategoryBySlug(String(slug)),
    getCatalogFilters(),
  ]);

  if (!category) {
    notFound();
  }

  const canonicalSlug = slugify(category.name);
  if (slug !== canonicalSlug) {
    permanentRedirect(`/tienda/categoria/${canonicalSlug}`);
  }

  const categoryUrl = `${SITE_URL}/tienda/categoria/${canonicalSlug}`;
  const suspenseKey = `${category.name}:${JSON.stringify(filters)}`;

  return (
    <div className="w-full bg-slate-50 pb-16">
      <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-slate-600">
          <Link href="/" className="transition hover:text-primary">
            Inicio
          </Link>
          <span>/</span>
          <Link href="/tienda" className="transition hover:text-primary">
            Tienda
          </Link>
          <span>/</span>
          <span className="font-semibold text-slate-950">{category.name}</span>
        </nav>
      </div>

      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: `${SITE_URL}/` },
          { name: "Tienda", url: `${SITE_URL}/tienda` },
          { name: category.name, url: categoryUrl },
        ]}
      />

      <section className="mx-auto max-w-screen-2xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-slate-200 bg-white px-6 py-8 shadow-sm sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Categoría destacada
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            {category.name}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
            Filtra por marca, precio o búsqueda puntual dentro de {category.name}.
            Si necesitás validar compatibilidad, te asesoramos por WhatsApp antes
            de comprar.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-screen-2xl gap-6 px-4 sm:px-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:px-8">
        <CatalogFilters
          basePath={`/tienda/categoria/${canonicalSlug}`}
          filters={filters}
          options={filterOptions}
          forcedCategoryName={category.name}
        />
        <Suspense key={suspenseKey} fallback={<CatalogResultsFallback />}>
          {/* @ts-expect-error Async Server Component */}
          <CatalogResults
            basePath={`/tienda/categoria/${canonicalSlug}`}
            filters={{
              ...filters,
              categories: [],
            }}
            forcedCategoryName={category.name}
            siteUrl={SITE_URL}
            title={`Productos en ${category.name}`}
            emptyMessage={`No encontramos productos en ${category.name} con esos filtros. Probá otra marca o rango de precio.`}
          />
        </Suspense>
      </section>
    </div>
  );
}

