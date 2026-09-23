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

export const dynamic = "force-dynamic";

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
    title: "Repuestos y Accesorios para Celulares en CABA | Team Celular",
    description:
      "Repuestos, fundas y cargadores para celular con retiro en Paraguay 2451, Recoleta CABA. Validamos compatibilidad por WhatsApp antes de comprar.",
    robots: {
      index: shouldIndex,
      follow: true,
    },
    languages: {
      "es-AR": "/tienda",
    },
    openGraphTitle: "Repuestos y Accesorios para Celulares en CABA | Team Celular",
    openGraphDescription:
      "Team Celular, Paraguay 2451 Recoleta. Repuestos, fundas y cargadores con asesoramiento real y retiro en CABA.",
    openGraphImageAlt: "Tienda de repuestos para celulares - Team Celular Recoleta",
    twitterTitle: "Repuestos y Accesorios para Celulares en CABA | Team Celular",
    twitterDescription: "Team Celular, Paraguay 2451 Recoleta. Validamos compatibilidad por WhatsApp antes de pagar.",
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
    <div className="w-full bg-black pb-20 text-[#f5f5f7]">
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: `${SITE_URL}/` },
          { name: "Tienda", url: PAGE_URL },
        ]}
      />

      <section className="tc-intro mx-auto max-w-[1200px] px-4 pb-12 pt-10 text-center sm:px-6 sm:pt-16">
        <nav aria-label="Migas de pan" className="flex items-center justify-center gap-2 text-[12px] text-[#86868b]">
          <Link href="/" className="transition hover:text-white">
            Inicio
          </Link>
          <span aria-hidden>›</span>
          <span className="text-[#f5f5f7]">Tienda</span>
        </nav>
        <p className="tc-eyebrow mt-6">Tienda Team Celular</p>
        <h1 className="tc-display mx-auto mt-2 max-w-4xl">
          Repuestos y accesorios para tu celular
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-[19px] leading-[1.4] text-[#86868b] sm:text-[21px]">
          Comprá online con Mercado Pago. Retirá en Recoleta o elegí envío a domicilio.
        </p>
        <div>
          <TrackedCtaLink
            href="https://wa.me/5491151034595?text=Hola%20Team%20Celular,%20necesito%20ayuda%20para%20elegir%20un%20repuesto"
            ctaName="store_hero_whatsapp"
            ctaLocation="store_hero_panel"
            ctaVariant="whatsapp"
            external
            target="_blank"
            className="tc-link mt-6 inline-flex min-h-11 items-center gap-1 text-[17px]"
          >
            ¿Necesitás ayuda para elegir? ›
          </TrackedCtaLink>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] items-start gap-6 px-4 sm:px-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:px-8">
        <CatalogFilters
          basePath="/tienda"
          filters={filters}
          options={filterOptions}
        />
        <Suspense key={suspenseKey} fallback={<CatalogResultsFallback />}>
          <CatalogResults
            basePath="/tienda"
            filters={filters}
            siteUrl={SITE_URL}
            title="Productos para compra inmediata"
            emptyMessage="No encontramos productos con esos filtros. Prueba otra marca, categoria o rango de precio."
          />
        </Suspense>
      </section>

      <section className="tc-section tc-reveal">
        <div className="tc-card grid gap-8 !p-8 sm:!p-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <h2 className="tc-heading">No sabes que repuesto elegir?</h2>
            <p className="tc-body mt-4 max-w-2xl">
              Te ayudamos a validar compatibilidad por marca y modelo antes de pagar. Si el cambio no conviene, te derivamos al servicio de reparacion para evitar compras innecesarias.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-1 text-[17px]">
              <Link href="/guias/reparacion-iphone-buenos-aires" className="tc-link inline-flex min-h-11 items-center">Guia iPhone ›</Link>
              <Link href="/guias/reparacion-samsung-buenos-aires" className="tc-link inline-flex min-h-11 items-center">Guia Samsung ›</Link>
              <Link href="/guias/reparacion-xiaomi-buenos-aires" className="tc-link inline-flex min-h-11 items-center">Guia Xiaomi ›</Link>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <TrackedCtaLink
              href="https://wa.me/5491151034595?text=Hola%20Team%20Celular,%20quiero%20validar%20compatibilidad%20de%20un%20repuesto"
              ctaName="store_strip_whatsapp"
              ctaLocation="store_conversion_strip"
              ctaVariant="whatsapp"
              external
              target="_blank"
              className="tc-btn tc-btn-ghost"
            >
              Validar en WhatsApp
            </TrackedCtaLink>
            <TrackedCtaLink
              href="/presupuesto-reparacion#solicitar-presupuesto"
              ctaName="store_strip_budget"
              ctaLocation="store_conversion_strip"
              ctaVariant="primary"
              className="tc-btn tc-btn-primary"
            >
              Pedir diagnostico
            </TrackedCtaLink>
          </div>
        </div>
      </section>

      <section className="tc-section !pt-0">
        <h2 className="tc-heading tc-reveal">Preguntas frecuentes de compra</h2>
        <p className="tc-body mt-4 max-w-2xl">
          Resolvemos lo mas comun antes de comprar para que elijas bien y cierres rapido.
        </p>
        <div className="mt-10 divide-y divide-[#333336] border-y border-[#333336]">
          {storeFaqs.map((faq) => (
            <details key={faq.question} className="group py-6">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 text-[19px] font-semibold sm:text-[21px]">
                {faq.question}
                <span className="text-2xl font-light text-[#86868b] transition-transform group-open:rotate-45" aria-hidden>+</span>
              </summary>
              <p className="tc-body mt-3 max-w-3xl">{faq.answer}</p>
            </details>
          ))}
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
