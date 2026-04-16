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
import { buildWebsiteMetadata, getSiteUrl } from "@/lib/seoMetadata";

const SITE_URL = getSiteUrl();

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
    return buildWebsiteMetadata({
      path: "/tienda",
      title: "Categoria no encontrada | Team Celular",
      description: "Esta categoria no esta disponible en Team Celular.",
      robots: { index: false, follow: false },
    });
  }

  const canonicalSlug = slugify(category.name);
  const canonicalPath = `/tienda/categoria/${canonicalSlug}`;
  const categoryUrl = `${SITE_URL}${canonicalPath}`;
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

  const snippetTitle = `${category.name} para Celulares en CABA | Team Celular`;
  const snippetDescription = `Compra ${category.name} para celular con retiro en Recoleta y envio en CABA. Filtra por marca y precio con asesoramiento real.`;

  return buildWebsiteMetadata({
    path: canonicalPath,
    title: snippetTitle,
    description: snippetDescription,
    robots: {
      index: shouldIndex,
      follow: true,
    },
    languages: {
      "es-AR": canonicalPath,
    },
    openGraphTitle: snippetTitle,
    openGraphDescription: `Productos de ${category.name} con asesoramiento real y disponibilidad en CABA.`,
    openGraphImageAlt: `${category.name} - Team Celular`,
    twitterTitle: snippetTitle,
    twitterDescription: `Productos de ${category.name} con retiro en Recoleta y envio en CABA.`,
  });
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
    <div className="w-full bg-slate-50 dark:bg-slate-800/70 pb-16">
      <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <Link href="/" className="transition hover:text-primary">
            Inicio
          </Link>
          <span>/</span>
          <Link href="/tienda" className="transition hover:text-primary">
            Tienda
          </Link>
          <span>/</span>
          <span className="font-semibold text-slate-950 dark:text-slate-50">{category.name}</span>
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
        <div className="rounded-[2rem] border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-900 px-6 py-8 shadow-sm sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Categoria destacada
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-50 sm:text-4xl">
            {category.name}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-400">
            Filtra por marca, precio o busqueda puntual dentro de {category.name}.
            Si necesitas validar compatibilidad, te asesoramos por WhatsApp antes
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
            emptyMessage={`No encontramos productos en ${category.name} con esos filtros. Prueba otra marca o rango de precio.`}
          />
        </Suspense>
      </section>
    </div>
  );
}

