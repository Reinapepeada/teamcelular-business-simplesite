import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import CatalogFilters from "@/components/store/CatalogFilters";
import CatalogResults, {
  CatalogResultsFallback,
} from "@/components/store/CatalogResults";
import {
  getCatalogFilters,
  isCatalogIndexable,
  normalizeCatalogFilters,
  type CatalogSearchParams,
} from "@/lib/catalog";

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";
const PAGE_URL = `${SITE_URL}/tienda`;

export const revalidate = 300;

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<CatalogSearchParams>;
}): Promise<Metadata> {
  const filters = normalizeCatalogFilters((await searchParams) ?? {});
  const shouldIndex = isCatalogIndexable(filters);

    return {
      title: "Tienda Online | Accesorios y Repuestos para Celulares | Team Celular",
      description:
      "Compra accesorios, fundas, cargadores, cables y repuestos para celulares con envío a todo CABA. Productos con garantía y asesoramiento en Team Celular.",
    alternates: {
      canonical: PAGE_URL,
    },
    openGraph: {
      title: "Tienda Online | Team Celular Buenos Aires",
      description:
        "Accesorios y repuestos de calidad para tu celular con envío a todo CABA.",
      type: "website",
      url: PAGE_URL,
      locale: "es_AR",
      images: [
        {
          url: `${SITE_URL}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: "Tienda Online - Team Celular",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Tienda Online | Team Celular",
      description: "Accesorios y repuestos de calidad para tu celular",
      images: [`${SITE_URL}/opengraph-image.png`],
    },
    robots: {
      index: shouldIndex,
      follow: true,
    },
  };
}

export default async function TiendaPage({
  searchParams,
}: {
  searchParams?: Promise<CatalogSearchParams>;
}) {
  const filters = normalizeCatalogFilters((await searchParams) ?? {});
  const filterOptions = await getCatalogFilters();
  const suspenseKey = JSON.stringify(filters);

  return (
    <div className="w-full bg-slate-50 pb-16">
      <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-slate-600">
          <Link href="/" className="transition hover:text-primary">
            Inicio
          </Link>
          <span>/</span>
          <span className="font-semibold text-slate-950">Tienda</span>
        </nav>
      </div>

      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: `${SITE_URL}/` },
          { name: "Tienda", url: PAGE_URL },
        ]}
      />

      <section className="mx-auto max-w-screen-2xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-slate-200 bg-white px-6 py-8 shadow-sm sm:px-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Tienda Team Celular
              </p>
              <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Accesorios y repuestos para celulares con retiro en Recoleta y envío en CABA
              </h1>
              <p className="max-w-3xl text-base leading-7 text-slate-600">
                Compra cables, cargadores, fundas, templados y repuestos con
                asesoramiento real. Si no encontrás lo que buscás, te ayudamos
                por WhatsApp para validar compatibilidad antes de comprar.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-900">
                Atención comercial
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>Retiro por Paraguay 2451, Recoleta.</li>
                <li>Enviamos en CABA y coordinamos por WhatsApp.</li>
                <li>Consulta compatibilidad antes de cerrar la compra.</li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/contacto"
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-300 px-4 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary"
                >
                  Ver ubicación
                </Link>
                <Link
                  href="/presupuesto-reparacion"
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-4 text-sm font-semibold text-white transition hover:bg-primary/90"
                >
                  Pedir asesoramiento
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-screen-2xl gap-6 px-4 sm:px-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:px-8">
        <CatalogFilters
          basePath="/tienda"
          filters={filters}
          options={filterOptions}
        />
        <Suspense key={suspenseKey} fallback={<CatalogResultsFallback />}>
          {/* @ts-expect-error Async Server Component */}
          <CatalogResults
            basePath="/tienda"
            filters={filters}
            siteUrl={SITE_URL}
            title="Productos para compra inmediata"
            emptyMessage="No encontramos productos con esos filtros. Probá otra marca, categoría o rango de precio."
          />
        </Suspense>
      </section>
    </div>
  );
}


