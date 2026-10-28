import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Image, { getImageProps } from "next/image";
import { BsCheckCircleFill, BsWhatsapp } from "react-icons/bs";
import {
  FaCheckCircle,
  FaClipboardCheck,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaStopwatch,
  FaTools,
} from "react-icons/fa";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import TrackedCtaLink from "@/components/cro/TrackedCtaLink";
import { buildWebsiteMetadata, getSiteUrl } from "@/lib/seoMetadata";
import { PRICES_UPDATED, PRICES_UPDATED_LABEL } from "@/lib/repairPrices";
import { IPHONE_PRICES_UPDATED } from "./iphone/iphoneModels";
import { BUSINESS_PROFILE } from "@/lib/businessProfile";
import RepairBrandLinks from "@/components/repairs/RepairBrandLinks";
import ScreenQuoteDetails from "@/components/repairs/ScreenQuoteDetails";

const SITE_URL = getSiteUrl();

const SERVICE_ILLUSTRATIONS: Record<string, string> = {
  "cambio-bateria-caba": "/images/celuPorDentro.webp",
  "cambio-pantalla-caba": "/images/landings/pantalla-concepto-20261023.webp",
  "cambio-pin-carga-caba": "/images/landings/carga-concepto-20261023.webp",
  "reparacion-placa-caba": "/images/reparacion_placa.webp",
  "cambio-flex-caba": "/images/celuPorDentro.webp",
};

const WORKFLOW = [
  {
    title: "1. Lo revisamos",
    desc: "Lo probamos con vos adelante y buscamos la falla de origen, no solo el síntoma que se ve.",
    Icon: FaTools,
  },
  {
    title: "2. Te pasamos el precio",
    desc: "Precio, plazo y tipo de repuesto antes de tocar nada. Si no te cierra, te lo llevás y pagás solo la revisión.",
    Icon: FaClipboardCheck,
  },
  {
    title: "3. Lo reparamos",
    desc: "Pantalla y batería suelen salir en el día. Si aparece otro daño al abrirlo, te avisamos antes de seguir.",
    Icon: FaCheckCircle,
  },
  {
    title: "4. Lo probás y te lo llevás",
    desc: "Lo revisás con nosotros antes de irte y te llevás la garantía de 90 días por escrito. Cualquier cosa, nos escribís al mismo WhatsApp.",
    Icon: FaShieldAlt,
  },
];

type RelatedGuide = {
  href: string;
  title: string;
  description: string;
};

const DEFAULT_RELATED_GUIDES: RelatedGuide[] = [
  {
    href: "/guias/reparacion-pantalla-celular",
    title: "Guía de pantalla",
    description: "Cómo evaluar daño de módulo y elegir repuesto según uso real.",
  },
  {
    href: "/guias/cambio-bateria-celular",
    title: "Guía de batería",
    description: "Señales de desgaste y criterios para reemplazo sin gastar de más.",
  },
  {
    href: "/guias/presupuesto-service-oficial-segunda-opinion",
    title: "Segunda opinión",
    description: "Qué comparar si el service oficial te pasó un presupuesto alto.",
  },
];

const SERVICE_RELATED_GUIDES: Record<string, RelatedGuide[]> = {
  "cambio-pantalla-caba": [
    {
      href: "/guias/reparacion-pantalla-celular",
      title: "Guía de pantalla",
      description: "Diferencias entre módulo, vidrio y criterios de calidad post-reparación.",
    },
    {
      href: "/guias/reparacion-iphone-buenos-aires",
      title: "Guía iPhone",
      description: "Buenas prácticas para conservar funciones delicadas en Apple.",
    },
    {
      href: "/guias/reparacion-samsung-buenos-aires",
      title: "Guía Samsung",
      description: "Escenarios frecuentes de AMOLED, touch y calibración final.",
    },
  ],
  "cambio-bateria-caba": [
    {
      href: "/guias/cambio-bateria-celular",
      title: "Guía de batería",
      description: "Cómo detectar desgaste real y evitar cambios innecesarios.",
    },
    {
      href: "/guias/mantenimiento-preventivo-celulares",
      title: "Guía de mantenimiento",
      description: "Rutinas para alargar autonomía y reducir nuevas fallas.",
    },
    {
      href: "/guias/reparacion-xiaomi-buenos-aires",
      title: "Guía Xiaomi",
      description: "Referencia útil para equipos con carga rápida y consumo irregular.",
    },
  ],
  "cambio-pin-carga-caba": [
    {
      href: "/guias/pin-de-carga-suelto-solucion",
      title: "Pin de carga suelto: qué hacer y qué evitar",
      description: "Cómo reconocer el problema y qué evitar para no agravar el daño.",
    },
    {
      href: "/guias/reparacion-samsung-buenos-aires",
      title: "Guía Samsung",
      description: "Casos comunes de USB-C, humedad y falso contacto en Galaxy.",
    },
    {
      href: "/guias/reparacion-xiaomi-buenos-aires",
      title: "Guía Xiaomi",
      description: "Recomendaciones para puertos exigidos por carga rápida diaria.",
    },
  ],
  "reparacion-placa-caba": [
    {
      href: "/guias/celular-mojado-que-hacer",
      title: "Guía de celular mojado",
      description: "Qué hacer en la primera hora para que la placa tenga chances.",
    },
    {
      href: "/guias/presupuesto-service-oficial-segunda-opinion",
      title: "Segunda opinión",
      description: "Si el service oficial te dijo que hay que cambiar la placa entera.",
    },
    {
      href: "/guias/reparacion-iphone-buenos-aires",
      title: "Guía iPhone",
      description: "Escenarios típicos de placa y recuperación en dispositivos Apple.",
    },
  ],
  "cambio-flex-caba": [
    {
      href: "/guias/reparacion-pantalla-celular",
      title: "Guía de pantalla",
      description: "Cuándo una falla de display puede estar ligada a flex o conectores.",
    },
    {
      href: "/guias/reparacion-iphone-buenos-aires",
      title: "Guía iPhone",
      description: "Referencia para fallas de botones, cámara y módulos internos.",
    },
    {
      href: "/guias/reparacion-samsung-buenos-aires",
      title: "Guía Samsung",
      description: "Checklist técnico para síntomas intermitentes en equipos Galaxy.",
    },
  ],
  "cambio-tapa-caba": [
    {
      href: "/guias/reparacion-pantalla-celular",
      title: "Guía de pantalla",
      description: "Qué revisar cuando hay golpes combinados en frente y parte trasera.",
    },
    {
      href: "/guias/mantenimiento-preventivo-celulares",
      title: "Guía de mantenimiento",
      description: "Buenas prácticas para conservar terminación y estructura del equipo.",
    },
    {
      href: "/guias/reparacion-iphone-buenos-aires",
      title: "Guía iPhone",
      description: "Referencia para equipos con tapa trasera quebrada y uso intensivo.",
    },
  ],
  "cambio-camara-caba": [
    {
      href: "/guias/reparacion-iphone-buenos-aires",
      title: "Guía iPhone",
      description: "Referencias para sensores y módulos de cámara en equipos Apple.",
    },
    {
      href: "/guias/reparacion-samsung-buenos-aires",
      title: "Guía Samsung",
      description: "Casos frecuentes de cámara en líneas Galaxy con uso intensivo.",
    },
    {
      href: "/guias/reparacion-xiaomi-buenos-aires",
      title: "Guía Xiaomi",
      description: "Escenarios de enfoque, lente y estabilidad en cámara Xiaomi.",
    },
  ],
  "reparacion-audio-celular-caba": [
    {
      href: "/guias/pin-de-carga-suelto-solucion",
      title: "Guía de pin de carga",
      description: "Fallas que suelen convivir con problemas de audio y conectores.",
    },
    {
      href: "/guias/mantenimiento-preventivo-celulares",
      title: "Guía de mantenimiento",
      description: "Buenas prácticas para evitar deterioro de micrófono y parlante.",
    },
    {
      href: "/guias/celular-mojado-que-hacer",
      title: "Guía de celular mojado",
      description: "Protocolo útil cuando el audio falla después de humedad o líquidos.",
    },
  ],
  "recuperacion-celular-mojado-caba": [
    {
      href: "/guias/celular-mojado-que-hacer",
      title: "Guía de celular mojado",
      description: "Pasos urgentes para reducir daño y mejorar chances de recuperación.",
    },
    {
      href: "/guias/pin-de-carga-suelto-solucion",
      title: "Guía de pin de carga",
      description: "Cuando el líquido deja sulfato en el puerto y carga a medias.",
    },
    {
      href: "/guias/face-id-touch-id-no-funciona",
      title: "Guía de sensores",
      description: "Referencia para fallas en sensores que aparecen después de humedad.",
    },
  ],
};

export interface ServiceHighlight {
  title: string;
  desc: string;
}

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServiceLandingConfig {
  slug: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  socialTitle: string;
  socialDescription: string;
  keywords: string[];
  intro: string;
  budgetCtaLabel?: string;
  quoteHint?: string;
  priceNote?: string;
  whatsappText: string;
  breadcrumbLabel: string;
  serviceName: string;
  serviceType: string;
  serviceDescription: string;
  modifiedTime?: string;
  closingDescription?: string;
  highlights: ServiceHighlight[];
  brandsText: string;
  /** Precios cortos para el hero (una fila por caso). Mejor que meterlos en el parrafo. */
  prices?: { label: string; value: string }[];
  /** Reemplaza las dos ultimas lineas de "¿Dónde reparamos?" cuando la garantia o el plazo general no aplican. */
  asideNotes?: [string, string];
  /** Reglas que el cliente tiene que leer antes de dejar el equipo. */
  conditions?: ServiceHighlight[];
  /** Pasos propios cuando el recorrido no es el de una reparacion en el dia. */
  workflow?: ServiceHighlight[];
  faqs: ServiceFaq[];
}

export function buildServiceMetadata(config: ServiceLandingConfig): Metadata {
  return buildWebsiteMetadata({
    path: `/reparaciones/${config.slug}`,
    title: config.metaTitle,
    description: config.metaDescription,
    keywords: config.keywords,
    robots: {
      index: true,
      follow: true,
    },
    languages: {
      "es-AR": `/reparaciones/${config.slug}`,
    },
    openGraphTitle: config.socialTitle,
    openGraphDescription: config.socialDescription,
    openGraphImageAlt: `${config.serviceName} - Team Celular`,
    twitterTitle: config.socialTitle,
    twitterDescription: config.socialDescription,
  });
}

export default function ServiceLandingPage({
  config,
  children,
}: {
  config: ServiceLandingConfig;
  children?: ReactNode;
}) {
  const serviceUrl = `${SITE_URL}/reparaciones/${config.slug}`;
  const whatsappUrl = `https://wa.me/5491151034595?text=${encodeURIComponent(
    config.whatsappText
  )}`;
  const illustration = SERVICE_ILLUSTRATIONS[config.slug];
  // La ilustración de pantalla aparece después de los precios en móvil; en escritorio sí es LCP.
  const desktopScreenImage = illustration && config.slug === "cambio-pantalla-caba"
    ? getImageProps({ src: illustration, alt: "", fill: true, quality: 82, sizes: "(max-width: 1024px) 100vw, 660px" }).props
    : null;
  const relatedGuides = SERVICE_RELATED_GUIDES[config.slug] ?? DEFAULT_RELATED_GUIDES;
  const workflow = config.workflow ?? WORKFLOW.map(({ title, desc }) => ({ title, desc }));
  const workflowSteps = (
    <ol className="tc-stagger mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      {workflow.map((step, index) => (
        <li key={step.title} className="rounded-[28px] bg-white p-7">
          <span className="text-[14px] tabular-nums text-[#86868b]">{String(index + 1).padStart(2, "0")}</span>
          <h3 className="mt-6 text-[21px] font-semibold leading-tight">{step.title.replace(/^\d+\.\s*/, "")}</h3>
          <p className="mt-3 text-[15px] leading-6 text-[#424245]">{step.desc}</p>
        </li>
      ))}
    </ol>
  );
  const [warrantyNote, timeNote] = config.asideNotes ?? [
    "Garantía escrita de 90 días sobre trabajo y repuesto instalado.",
    "Confirmamos precio y plazo según modelo, falla y disponibilidad de repuesto.",
  ];

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${serviceUrl}#service`,
    dateModified: config.modifiedTime ?? PRICES_UPDATED,
    name: config.serviceName,
    serviceType: config.serviceType,
    description: config.serviceDescription,
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Ciudad Autonoma de Buenos Aires (CABA)",
    },
    provider: { "@id": `${SITE_URL}#localbusiness` },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/presupuesto-reparacion`,
      priceCurrency: "ARS",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className="w-full bg-black pb-28 text-[#f5f5f7] md:pb-20">
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: `${SITE_URL}/` },
          { name: "Reparaciones", url: `${SITE_URL}/reparaciones` },
          { name: config.breadcrumbLabel, url: serviceUrl },
        ]}
      />

      <header className="tc-intro mx-auto max-w-[1200px] px-4 pt-12 text-center sm:px-6 sm:pt-16">
        <h1 className="tc-display mx-auto mt-3 max-w-4xl !text-[clamp(2rem,5vw,3.5rem)]">{config.h1}</h1>
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-[17px] leading-relaxed text-[#a1a1a6] sm:text-[19px]">
          {config.intro}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5">
          <TrackedCtaLink
            href="/presupuesto-reparacion#solicitar-presupuesto"
            ctaName="service_hero_budget"
            ctaLocation={`service_hero_${config.slug}`}
            ctaVariant="primary"
            className="tc-btn tc-btn-primary"
          >
            {config.budgetCtaLabel ?? "Pedir presupuesto"}
          </TrackedCtaLink>
          <TrackedCtaLink
            href={whatsappUrl}
            ctaName="service_hero_whatsapp"
            ctaLocation={`service_hero_${config.slug}`}
            ctaVariant="whatsapp"
            external
            target="_blank"
            className="tc-link inline-flex min-h-11 items-center gap-2 text-[17px]"
          >
            <BsWhatsapp aria-hidden /> WhatsApp directo ›
          </TrackedCtaLink>
        </div>
        {config.quoteHint && <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-6 text-[#a1a1a6]">{config.quoteHint}</p>}
        <p className="mt-4 text-[14px] text-[#a1a1a6]">
          Recoleta y Belgrano · Sin turno · Lun–Vie 10:30–18:00
        </p>
      </header>

      <div className={`mx-auto mt-8 grid max-w-[1200px] gap-5 px-4 sm:px-6 ${illustration ? "lg:grid-cols-[1.2fr_1fr]" : ""}`}>
        {desktopScreenImage && <link
          rel="preload"
          as="image"
          href={desktopScreenImage.src}
          imageSrcSet={desktopScreenImage.srcSet}
          imageSizes={desktopScreenImage.sizes}
          media="(min-width: 1024px)"
        />}
        {illustration && <figure className="relative order-2 aspect-[4/3] overflow-hidden rounded-[28px] lg:order-none lg:aspect-auto lg:min-h-[24rem]">
          <Image
            src={illustration}
            alt={`Imagen ilustrativa del componente: ${config.serviceName}`}
            fill
            priority={!desktopScreenImage}
            quality={82}
            sizes="(max-width: 1024px) 100vw, 660px"
            className="bg-black object-contain pb-12"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-black/90 px-5 py-3 text-xs leading-5 text-[#a1a1a6]">Imagen ilustrativa del componente. La reparación depende del modelo y el diagnóstico.</figcaption>
        </figure>}
        <div className={`order-1 grid min-w-0 gap-5 lg:order-none ${!illustration && config.prices?.length ? "lg:grid-cols-2" : ""}`}>
          {config.prices?.length ? (
            <div className="rounded-[28px] bg-[#f5f5f7] px-7 py-3 text-[#1d1d1f]">
              {config.priceNote && <h2 className="pt-3 text-xl font-semibold">Precio y revisión técnica</h2>}
              <dl>
              {config.prices.map((row) => (
                <div key={row.label} className="grid gap-1 border-b border-[#d2d2d7] py-4 last:border-0 sm:flex sm:items-baseline sm:justify-between sm:gap-4">
                  <dt className="text-[15px] text-[#424245]">{row.label}</dt>
                  <dd className="text-[19px] font-semibold tabular-nums">{row.value}</dd>
                </div>
              ))}
              </dl>
              {config.priceNote && <p className="pb-3 text-[15px] leading-6 text-[#424245]">{config.priceNote}</p>}
              {config.slug === "cambio-pantalla-caba" && <div className="pb-4"><p className="text-sm leading-6 text-[#424245]">Precios orientativos. iPhone: {IPHONE_PRICES_UPDATED}; Samsung y Motorola: {PRICES_UPDATED_LABEL}.</p><p className="mt-3 text-sm leading-6 text-[#424245]">Revisión técnica arancelada: {BUSINESS_PROFILE.reviewCostRange}. Confirmamos el valor antes de ingresar el equipo.</p><ScreenQuoteDetails light /></div>}
            </div>
          ) : null}
          <aside className="tc-card flex-1">
            <h2 className="text-[12px] uppercase tracking-[0.08em] text-[#86868b]">
              ¿Dónde reparamos?
            </h2>
            <ul className="mt-4 space-y-4 text-[15px] leading-6 text-[#f5f5f7]">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 shrink-0 text-[#6aa6ff]" aria-hidden />
                Dos talleres en CABA: Recoleta (Paraguay 2451) y Belgrano (Amenábar 2032).
              </li>
              <li className="flex items-start gap-3">
                <FaShieldAlt className="mt-1 shrink-0 text-[#6aa6ff]" aria-hidden />
                {warrantyNote}
              </li>
              <li className="flex items-start gap-3">
                <FaStopwatch className="mt-1 shrink-0 text-[#6aa6ff]" aria-hidden />
                {timeNote}
              </li>
            </ul>
          </aside>
        </div>
      </div>

      <section className="tc-section">
        <h2 className="sr-only">Detalle del servicio</h2>
        <ul className="divide-y divide-[#333336]">
          {config.highlights.map((item) => (
            <li key={item.title}>
              <details className="group py-5">
                <summary className="flex min-h-11 cursor-pointer list-none items-center gap-4 rounded-lg text-[19px] font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6aa6ff] [&::-webkit-details-marker]:hidden"><BsCheckCircleFill aria-hidden className="shrink-0 text-[#6aa6ff]" /><h3>{item.title}</h3><span aria-hidden className="ml-auto text-2xl text-[#a1a1a6] group-open:rotate-45">+</span></summary>
                <p className="mt-3 max-w-[65ch] pl-9 text-[16px] leading-relaxed text-[#a1a1a6]">{item.desc}</p>
              </details>
            </li>
          ))}
        </ul>
      </section>

      {config.conditions?.length ? (
        <section className="tc-section !pt-0">
          <div className="tc-reveal grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <h2 className="tc-heading">Antes de dejarlo, leé esto</h2>
            <ul className="divide-y divide-[#333336] rounded-[28px] bg-[#1d1d1f] px-7">
              {config.conditions.map((item) => (
                <li key={item.title} className="flex gap-4 py-6">
                  <BsCheckCircleFill className="mt-1 shrink-0 text-[#6aa6ff]" aria-hidden />
                  <div>
                    <h3 className="text-[19px] font-semibold leading-tight">{item.title}</h3>
                    <p className="mt-2 text-[15px] leading-6 text-[#a1a1a6]">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="w-full bg-[#f5f5f7] text-[#1d1d1f]">
        <div className="tc-section">
          <details className="group">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-5 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1a6dff] [&::-webkit-details-marker]:hidden">
          <h2 className="tc-heading max-w-3xl !text-[#1d1d1f]">
            ¿Qué pasa con tu equipo desde que lo dejás?
          </h2>
          <span aria-hidden className="text-3xl group-open:rotate-45">+</span>
          </summary>
          {workflowSteps}
          </details>
        </div>
      </section>

      {children}

      <section className="tc-section">
        <div className="mb-8"><RepairBrandLinks /></div>
        <div className="tc-reveal grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-baseline">
          <h2 className="tc-heading">¿Qué marcas reparan?</h2>
          <p className="text-[19px] leading-[1.42] text-[#a1a1a6] sm:text-[21px]">{config.brandsText}</p>
        </div>
      </section>

      <section className="tc-section !pt-0">
        <h2 className="tc-heading tc-reveal">Guías recomendadas para este servicio</h2>
        <div className="tc-stagger mt-10 grid gap-5 md:grid-cols-3">
          {relatedGuides.map((guide) => (
            <TrackedCtaLink
              key={guide.href}
              href={guide.href}
              ctaName={`service_related_guide_${config.slug}`}
              ctaLocation={`service_related_guides_${config.slug}`}
              ctaVariant="secondary"
              className="tc-card group block transition-colors hover:bg-[#262628]"
            >
              <span className="tc-subheading block">{guide.title}</span>
              <span className="tc-body mt-3 block">{guide.description}</span>
              <span className="tc-link mt-5 block text-[17px]">Leer guía ›</span>
            </TrackedCtaLink>
          ))}
        </div>
      </section>

      <section className="tc-section !pt-0">
        <h2 className="tc-heading tc-reveal">Preguntas frecuentes</h2>
        <div className="mt-10 divide-y divide-[#333336] border-y border-[#333336]">
          {config.faqs.map((faq) => (
            <details key={faq.q} className="group py-6">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 text-[19px] font-semibold sm:text-[21px]">
                {faq.q}
                <span className="text-2xl font-light text-[#86868b] transition-transform group-open:rotate-45" aria-hidden>+</span>
              </summary>
              <p className="tc-body mt-3 max-w-3xl">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="tc-section tc-reveal text-center">
        <h2 className="tc-heading mx-auto max-w-3xl">¿Querés que lo revisemos hoy?</h2>
        <p className="tc-body mx-auto mt-5 max-w-xl">
          {config.closingDescription ?? "Mandanos marca, modelo y falla por WhatsApp y te pasamos precio y plazo."}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5">
          <TrackedCtaLink
            href={whatsappUrl}
            ctaName="service_bottom_whatsapp"
            ctaLocation={`service_bottom_${config.slug}`}
            ctaVariant="whatsapp"
            external
            target="_blank"
            className="tc-btn tc-btn-primary"
          >
            Iniciar por WhatsApp
          </TrackedCtaLink>
          <TrackedCtaLink
            href="/presupuesto-reparacion#solicitar-presupuesto"
            ctaName="service_bottom_form"
            ctaLocation={`service_bottom_${config.slug}`}
            ctaVariant="secondary"
            className="tc-link inline-flex min-h-11 items-center text-[17px]"
          >
            Completar formulario ›
          </TrackedCtaLink>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: config.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          }),
        }}
      />
    </div>
  );
}
