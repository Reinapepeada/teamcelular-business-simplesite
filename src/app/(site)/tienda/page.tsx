import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import TrackedCtaLink from "@/components/cro/TrackedCtaLink";
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
import { buildWebsiteMetadata, getSiteUrl } from "@/lib/seoMetadata";

const SITE_URL = getSiteUrl();
const PAGE_URL = `${SITE_URL}/tienda`;

export const revalidate = 300;

const storeFaqs = [
  {
    question: "Como valido compatibilidad antes de comprar?",
    answer:
      "Nos escribis por WhatsApp con marca, modelo y producto que te interesa. Confirmamos compatibilidad antes de pagar para evitar compras equivocadas.",
  },
  {
    question: "Hacen envios o solo retiro en sucursal?",
    answer:
      "Ofrecemos retiro en Recoleta y envio en CABA. La modalidad se coordina durante la compra segun zona y disponibilidad.",
  },
  {
    question: "Que pasa si no encuentro el repuesto exacto?",
    answer:
      "Te ayudamos a buscar alternativa compatible o te derivamos al servicio tecnico si conviene reparar en lugar de comprar una pieza.",
  },
  {
    question: "Puedo comprar y pedir instalacion tecnica?",
    answer:
      "Si. Podemos evaluar instalacion segun el producto y el equipo. Te confirmamos alcance, costo y tiempos antes de avanzar.",
  },
];

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<CatalogSearchParams>;
}): Promise<Metadata> {
  const filters = normalizeCatalogFilters((await searchParams) ?? {});
  const shouldIndex = isCatalogIndexable(filters);

  return buildWebsiteMetadata({
    path: "/tienda",
    title: "Tienda de Repuestos y Accesorios para Celulares en CABA | Team Celular",
    description:
      "Compra repuestos, fundas, cargadores y cables para celular con retiro en Recoleta y envio en CABA. Validamos compatibilidad por WhatsApp.",
    robots: {
      index: shouldIndex,
      follow: true,
    },
    languages: {
      "es-AR": "/tienda",
    },
    openGraphTitle: "Tienda de Repuestos y Accesorios para Celulares en CABA | Team Celular",
    openGraphDescription:
      "Repuestos y accesorios con asesoramiento real, retiro en Recoleta y envio en CABA.",
    openGraphImageAlt: "Tienda Online - Team Celular",
    twitterTitle: "Tienda de Repuestos y Accesorios para Celulares en CABA | Team Celular",
    twitterDescription: "Compra con asesoramiento real y valida compatibilidad por WhatsApp antes de pagar.",
  });
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
    <div className="w-full bg-slate-50 dark:bg-slate-800/70 pb-16">
      <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <Link href="/" className="transition hover:text-primary">
            Inicio
          </Link>
          <span>/</span>
          <span className="font-semibold text-slate-950 dark:text-slate-50">Tienda</span>
        </nav>
      </div>

      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: `${SITE_URL}/` },
          { name: "Tienda", url: PAGE_URL },
        ]}
      />

      <section className="mx-auto max-w-screen-2xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-900 px-6 py-8 shadow-sm sm:px-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Tienda Team Celular
              </p>
              <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-50 sm:text-4xl">
                Accesorios y repuestos para celulares con retiro en Recoleta y envio en CABA
              </h1>
              <p className="max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-400">
                Compra cables, cargadores, fundas, templados y repuestos con
                asesoramiento real. Si no encuentras lo que buscas, te ayudamos
                por WhatsApp para validar compatibilidad antes de comprar.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 dark:border-slate-700/70 bg-slate-50 dark:bg-slate-800/70 p-5">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Atencion comercial
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>Retiro por Paraguay 2451, Recoleta.</li>
                <li>Enviamos en CABA y coordinamos por WhatsApp.</li>
                <li>Consulta compatibilidad antes de cerrar la compra.</li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-3">
                <TrackedCtaLink
                  href="/contacto"
                  ctaName="store_hero_contact"
                  ctaLocation="store_hero_panel"
                  ctaVariant="secondary"
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-300 dark:border-slate-600 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300 transition hover:border-primary hover:text-primary"
                >
                  Ver ubicacion
                </TrackedCtaLink>
                <TrackedCtaLink
                  href="/presupuesto-reparacion#solicitar-presupuesto"
                  ctaName="store_hero_budget"
                  ctaLocation="store_hero_panel"
                  ctaVariant="primary"
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-4 text-sm font-semibold text-white transition hover:bg-primary/90"
                >
                  Pedir asesoramiento
                </TrackedCtaLink>
                <TrackedCtaLink
                  href="https://wa.me/5491151034595?text=Hola%20Team%20Celular,%20necesito%20ayuda%20para%20elegir%20un%20repuesto"
                  ctaName="store_hero_whatsapp"
                  ctaLocation="store_hero_panel"
                  ctaVariant="whatsapp"
                  external
                  target="_blank"
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-emerald-500/35 bg-emerald-50 px-4 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-300"
                >
                  Validar por WhatsApp
                </TrackedCtaLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-screen-2xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-sm dark:border-slate-700/70 dark:bg-slate-900/85 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                No sabes que repuesto elegir?
              </h2>
              <p className="max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                Te ayudamos a validar compatibilidad por marca y modelo antes de pagar. Si el cambio no conviene, te derivamos al servicio de reparacion para evitar compras innecesarias.
              </p>
              <div className="flex flex-wrap gap-2">
                <Link href="/guias/reparacion-iphone-buenos-aires" className="rounded-full border border-slate-300/80 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-primary/35 hover:text-primary dark:border-slate-600/70 dark:bg-slate-900/70 dark:text-slate-200">
                  Guia iPhone
                </Link>
                <Link href="/guias/reparacion-samsung-buenos-aires" className="rounded-full border border-slate-300/80 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-primary/35 hover:text-primary dark:border-slate-600/70 dark:bg-slate-900/70 dark:text-slate-200">
                  Guia Samsung
                </Link>
                <Link href="/guias/reparacion-xiaomi-buenos-aires" className="rounded-full border border-slate-300/80 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-primary/35 hover:text-primary dark:border-slate-600/70 dark:bg-slate-900/70 dark:text-slate-200">
                  Guia Xiaomi
                </Link>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <TrackedCtaLink
                href="https://wa.me/5491151034595?text=Hola%20Team%20Celular,%20quiero%20validar%20compatibilidad%20de%20un%20repuesto"
                ctaName="store_strip_whatsapp"
                ctaLocation="store_conversion_strip"
                ctaVariant="whatsapp"
                external
                target="_blank"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-emerald-700 px-5 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                Validar en WhatsApp
              </TrackedCtaLink>
              <TrackedCtaLink
                href="/presupuesto-reparacion#solicitar-presupuesto"
                ctaName="store_strip_budget"
                ctaLocation="store_conversion_strip"
                ctaVariant="primary"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-white transition hover:bg-primary/90"
              >
                Pedir diagnostico
              </TrackedCtaLink>
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
            emptyMessage="No encontramos productos con esos filtros. Prueba otra marca, categoria o rango de precio."
          />
        </Suspense>
      </section>

      <section className="mx-auto max-w-screen-2xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-sm dark:border-slate-700/70 dark:bg-slate-900/85 md:p-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            No encontraste el producto exacto?
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-400">
            Podemos conseguirlo o sugerirte una reparacion mas rentable segun el estado del equipo. Tambien coordinamos retiro en Recoleta y seguimiento por WhatsApp.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <TrackedCtaLink
              href="https://wa.me/5491151034595?text=Hola%20Team%20Celular,%20no%20encuentro%20el%20producto%20en%20tienda"
              ctaName="store_bottom_whatsapp"
              ctaLocation="store_bottom_conversion"
              ctaVariant="whatsapp"
              external
              target="_blank"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-emerald-700 px-5 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              Resolver por WhatsApp
            </TrackedCtaLink>
            <TrackedCtaLink
              href="/reparaciones"
              ctaName="store_bottom_repairs"
              ctaLocation="store_bottom_conversion"
              ctaVariant="secondary"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-primary/40 px-5 text-sm font-semibold text-primary transition hover:bg-primary/10"
            >
              Ver reparaciones
            </TrackedCtaLink>
            <TrackedCtaLink
              href="/contacto"
              ctaName="store_bottom_contact"
              ctaLocation="store_bottom_conversion"
              ctaVariant="secondary"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-300 dark:border-slate-600 px-5 text-sm font-semibold text-slate-700 dark:text-slate-300 transition hover:border-primary hover:text-primary"
            >
              Visitar sucursal
            </TrackedCtaLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-screen-2xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-sm dark:border-slate-700/70 dark:bg-slate-900/85 md:p-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Preguntas frecuentes de compra
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-400">
            Resolvemos lo mas comun antes de comprar para que elijas bien y cierres rapido.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {storeFaqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-2xl border border-slate-200/80 bg-slate-50/90 p-5 dark:border-slate-700/70 dark:bg-slate-800/70"
              >
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: storeFaqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
            isPartOf: {
              "@type": "WebPage",
              "@id": PAGE_URL,
            },
          }),
        }}
      />
    </div>
  );
}

