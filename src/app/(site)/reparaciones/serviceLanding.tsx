import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
import { GOOGLE_RATING_FALLBACK } from "@/lib/googleReviews";
import { PRICES_UPDATED } from "@/lib/repairPrices";

const SITE_URL = getSiteUrl();

type ServiceVisual = {
  cover: string;
  support?: string;
  glow: string;
  badge: string;
};

const SERVICE_VISUALS: Record<string, ServiceVisual> = {
  "cambio-bateria-caba": {
    cover: "/images/celuPorDentro.webp",
    glow:
      "bg-[radial-gradient(circle_at_80%_20%,rgba(34,197,94,0.35),transparent_40%)]",
    badge: "Batería y energía",
  },
  "cambio-pantalla-caba": {
    cover: "/images/handsome-young-man-smiling-while-repairing-old-smartphone-male-technician-using-screwdriver-fix-brok.webp",
    glow:
      "bg-[radial-gradient(circle_at_84%_18%,rgba(59,130,246,0.35),transparent_42%)]",
    badge: "Pantallas y módulos",
  },
  "cambio-pin-carga-caba": {
    cover: "/images/handsome-young-man-smiling-while-repairing-old-smartphone-male-technician-using-screwdriver-fix-brok.webp",
    glow:
      "bg-[radial-gradient(circle_at_84%_18%,rgba(14,165,233,0.32),transparent_42%)]",
    badge: "Carga y conectividad",
  },
  "reparacion-placa-caba": {
    cover: "/images/reparacion_placa.webp",
    glow:
      "bg-[radial-gradient(circle_at_82%_16%,rgba(139,92,246,0.35),transparent_42%)]",
    badge: "Microelectrónica",
  },
  "cambio-flex-caba": {
    cover: "/images/celuPorDentro.webp",
    glow:
      "bg-[radial-gradient(circle_at_86%_16%,rgba(16,185,129,0.35),transparent_40%)]",
    badge: "Flex y componentes",
  },
  "cambio-tapa-caba": {
    cover: "/images/handsome-young-man-smiling-while-repairing-old-smartphone-male-technician-using-screwdriver-fix-brok.webp",
    glow:
      "bg-[radial-gradient(circle_at_86%_16%,rgba(244,114,182,0.3),transparent_42%)]",
    badge: "Estética y terminación",
  },
  "cambio-camara-caba": {
    cover: "/images/landings/landing-cambio-camara-caba-hero.webp",
    support: "/images/landings/landing-cambio-camara-caba-apoyo.webp",
    glow:
      "bg-[radial-gradient(circle_at_82%_18%,rgba(249,115,22,0.3),transparent_40%)]",
    badge: "Cámaras y sensores",
  },
  "reparacion-audio-celular-caba": {
    cover: "/images/landings/landing-audio-celular-caba-hero.webp",
    support: "/images/landings/landing-audio-celular-caba-apoyo.webp",
    glow:
      "bg-[radial-gradient(circle_at_84%_18%,rgba(6,182,212,0.32),transparent_42%)]",
    badge: "Audio y micrófonos",
  },
  "recuperacion-celular-mojado-caba": {
    cover: "/images/landings/landing-celular-mojado-caba-hero.webp",
    support: "/images/landings/landing-celular-mojado-caba-apoyo.webp",
    glow:
      "bg-[radial-gradient(circle_at_84%_18%,rgba(34,197,94,0.28),transparent_42%)]",
    badge: "Daños por líquidos",
  },
};

const DEFAULT_VISUAL: ServiceVisual = {
  cover: "/images/handsome-young-man-smiling-while-repairing-old-smartphone-male-technician-using-screwdriver-fix-brok.webp",
  glow:
    "bg-[radial-gradient(circle_at_84%_16%,rgba(56,189,248,0.32),transparent_42%)]",
  badge: "Servicio técnico local",
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
    href: "/guias/microelectronica-reballing-caba",
    title: "Guía de microelectrónica",
    description: "Cuándo conviene diagnóstico de placa y qué esperar de un caso complejo.",
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
      href: "/guias/reparacion-samsung-buenos-aires",
      title: "Guía Samsung",
      description: "Casos comunes de USB-C, humedad y falso contacto en Galaxy.",
    },
    {
      href: "/guias/reparacion-xiaomi-buenos-aires",
      title: "Guía Xiaomi",
      description: "Recomendaciones para puertos exigidos por carga rápida diaria.",
    },
    {
      href: "/guias/mantenimiento-preventivo-celulares",
      title: "Guía de mantenimiento",
      description: "Cuidados simples para evitar daño progresivo en conectores.",
    },
  ],
  "reparacion-placa-caba": [
    {
      href: "/guias/microelectronica-reballing-caba",
      title: "Guía de microelectrónica",
      description: "Proceso real para placa, reballing y evaluación de viabilidad.",
    },
    {
      href: "/guias/soporte-empresas-servicio-tecnico",
      title: "Guía de soporte empresas",
      description: "Cómo gestionar casos críticos cuando el equipo es de trabajo.",
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
      href: "/guias/microelectronica-reballing-caba",
      title: "Guía de microelectrónica",
      description: "Cuándo un caso por líquidos escala a diagnóstico de placa.",
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
  whatsappText: string;
  breadcrumbLabel: string;
  serviceName: string;
  serviceType: string;
  serviceDescription: string;
  highlights: ServiceHighlight[];
  brandsText: string;
  /** Precios cortos para el hero (una fila por caso). Mejor que meterlos en el parrafo. */
  prices?: { label: string; value: string }[];
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
}: {
  config: ServiceLandingConfig;
}) {
  const serviceUrl = `${SITE_URL}/reparaciones/${config.slug}`;
  const whatsappUrl = `https://wa.me/5491151034595?text=${encodeURIComponent(
    config.whatsappText
  )}`;
  const visual = SERVICE_VISUALS[config.slug] ?? DEFAULT_VISUAL;
  const relatedGuides = SERVICE_RELATED_GUIDES[config.slug] ?? DEFAULT_RELATED_GUIDES;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${serviceUrl}#service`,
    dateModified: PRICES_UPDATED,
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
        <p className="tc-eyebrow">{visual.badge}</p>
        <h1 className="tc-display mx-auto mt-3 max-w-4xl">{config.h1}</h1>
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-[19px] leading-[1.42] text-[#86868b] sm:text-[21px]">
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
            Pedir presupuesto
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
        <p className="mt-4 text-[14px] text-[#86868b]">
          Dos sucursales en CABA (Recoleta y Belgrano). {GOOGLE_RATING_FALLBACK.rating.toFixed(1).replace(".", ",")} en Google con {GOOGLE_RATING_FALLBACK.total} reseñas (Recoleta).
        </p>
      </header>

      <div className="mx-auto mt-12 grid max-w-[1200px] gap-5 px-4 sm:px-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="tc-zoom relative aspect-[4/3] overflow-hidden rounded-[28px] lg:aspect-auto lg:min-h-[26rem]">
          <Image
            src={visual.cover}
            alt={config.serviceName}
            fill
            priority
            quality={82}
            sizes="(max-width: 1024px) 150vw, 720px"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-5">
          {config.prices?.length ? (
            <dl className="rounded-[28px] bg-[#f5f5f7] px-7 py-3 text-[#1d1d1f]">
              {config.prices.map((row) => (
                <div key={row.label} className="flex items-baseline justify-between gap-4 border-b border-[#d2d2d7] py-4 last:border-0">
                  <dt className="text-[15px] text-[#424245]">{row.label}</dt>
                  <dd className="text-[19px] font-semibold tabular-nums">{row.value}</dd>
                </div>
              ))}
            </dl>
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
                Garantía escrita de 90 días sobre trabajo y repuesto instalado.
              </li>
              <li className="flex items-start gap-3">
                <FaStopwatch className="mt-1 shrink-0 text-[#6aa6ff]" aria-hidden />
                Pantalla y batería en 2 a 4 horas si el repuesto está en stock.
              </li>
            </ul>
          </aside>
        </div>
      </div>

      <section className="tc-section">
        <ul className="tc-stagger grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {config.highlights.map((item) => (
            <li key={item.title} className="tc-card">
              <BsCheckCircleFill className="text-2xl text-[#6aa6ff]" aria-hidden />
              <h2 className="tc-subheading mt-6">{item.title}</h2>
              <p className="tc-body mt-3">{item.desc}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="w-full bg-[#f5f5f7] text-[#1d1d1f]">
        <div className="tc-section">
          <h2 className="tc-heading tc-reveal max-w-3xl !text-[#1d1d1f]">
            ¿Qué pasa con tu equipo desde que lo dejás?
          </h2>
          <ol className="tc-stagger mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {WORKFLOW.map((step, index) => (
              <li key={step.title} className="rounded-[28px] bg-white p-7">
                <span className="text-[14px] tabular-nums text-[#86868b]">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 text-[21px] font-semibold leading-tight">{step.title.replace(/^\d+\.\s*/, "")}</h3>
                <p className="mt-3 text-[15px] leading-6 text-[#424245]">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="tc-section">
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
          Mandanos marca, modelo y falla por WhatsApp y te pasamos precio y plazo.
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
