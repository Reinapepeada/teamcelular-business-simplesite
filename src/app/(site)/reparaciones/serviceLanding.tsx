import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BsCheckCircleFill } from "react-icons/bs";
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
    cover: "/images/cargadores.webp",
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
    cover: "/images/dispositivoshdpro.webp",
    glow:
      "bg-[radial-gradient(circle_at_84%_18%,rgba(14,165,233,0.32),transparent_42%)]",
    badge: "Carga y conectividad",
  },
  "reparacion-placa-caba": {
    cover: "/images/teamcelular.webp",
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
    cover: "/images/fundaOtter.webp",
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
  cover: "/images/teamcelular.webp",
  glow:
    "bg-[radial-gradient(circle_at_84%_16%,rgba(56,189,248,0.32),transparent_42%)]",
  badge: "Servicio técnico local",
};

const WORKFLOW = [
  {
    title: "1. Diagnóstico inicial",
    desc: "Revisamos síntomas, equipo y prioridad para confirmar la falla real antes de cotizar.",
    Icon: FaTools,
  },
  {
    title: "2. Presupuesto claro",
    desc: "Te explicamos opciones de repuesto, tiempos estimados y garantía de 90 días por escrito.",
    Icon: FaClipboardCheck,
  },
  {
    title: "3. Reparación profesional",
    desc: "Trabajamos con herramientas de laboratorio y control de calidad técnico antes de entregar.",
    Icon: FaCheckCircle,
  },
  {
    title: "4. Entrega y seguimiento",
    desc: "Probamos funciones clave con vos y te dejamos canales directos para soporte post-servicio.",
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
    <section className="w-full max-w-6xl px-6 py-14 pb-28 md:px-8 md:pb-20">
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: `${SITE_URL}/` },
          { name: "Reparaciones", url: `${SITE_URL}/reparaciones` },
          { name: config.breadcrumbLabel, url: serviceUrl },
        ]}
      />

      <header className="relative overflow-hidden rounded-3xl border border-white/15 bg-slate-900 text-white shadow-2xl">
        <div className="absolute inset-0">
          <Image
            src={visual.cover}
            alt={config.serviceName}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1100px"
            className="object-cover opacity-35"
          />
        </div>
        <div aria-hidden className={`absolute inset-0 ${visual.glow}`} />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-900/75 to-slate-900/55"
        />

        <div className="relative z-10 grid gap-8 p-8 md:grid-cols-5 md:p-12">
          <div className="space-y-6 md:col-span-3">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/90">
              {visual.badge}
            </p>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{config.h1}</h1>
            <p className="max-w-3xl text-lg leading-relaxed text-slate-100/90">
              {config.intro}
            </p>
            {config.prices?.length ? (
              <dl className="max-w-md divide-y divide-white/15 rounded-2xl border border-white/20 bg-black/25 text-sm">
                {config.prices.map((row) => (
                  <div key={row.label} className="flex items-center justify-between gap-4 px-4 py-2.5">
                    <dt className="text-white/80">{row.label}</dt>
                    <dd className="font-semibold tabular-nums text-white">{row.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
            <div className="flex flex-wrap gap-3">
              <TrackedCtaLink
                href="/presupuesto-reparacion#solicitar-presupuesto"
                ctaName="service_hero_budget"
                ctaLocation={`service_hero_${config.slug}`}
                ctaVariant="primary"
                className="inline-flex min-h-11 items-center rounded-full bg-white px-6 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
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
                className="inline-flex min-h-11 items-center rounded-full border border-white/40 bg-white/10 px-6 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                WhatsApp directo
              </TrackedCtaLink>
            </div>
            <p className="text-sm text-slate-200/90">
              Dos sucursales en CABA (Recoleta y Belgrano). {GOOGLE_RATING_FALLBACK.rating.toFixed(1).replace(".", ",")} en Google con {GOOGLE_RATING_FALLBACK.total} reseñas (Recoleta).
            </p>
          </div>

          <aside className="hidden md:col-span-2 md:block">
            <div className="rounded-2xl border border-white/20 bg-black/25 p-5 backdrop-blur-md">
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-white/75">
                ¿Dónde reparamos?
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-white/90">
                <li className="flex items-start gap-3">
                  <FaMapMarkerAlt className="mt-0.5 text-primary" />
                  Dos talleres en CABA: Recoleta (Paraguay 2451) y Belgrano (Amenábar 2032).
                </li>
                <li className="flex items-start gap-3">
                  <FaShieldAlt className="mt-0.5 text-primary" />
                  Garantía escrita de 90 días sobre trabajo y repuesto instalado.
                </li>
                <li className="flex items-start gap-3">
                  <FaStopwatch className="mt-0.5 text-primary" />
                  Tiempos estimados según modelo, stock y complejidad técnica.
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </header>

      <ul className="mt-10 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white dark:divide-slate-700 dark:border-slate-700 dark:bg-slate-900">
        {config.highlights.map((item) => (
          <li key={item.title} className="flex gap-3 p-5">
            <BsCheckCircleFill className="mt-1 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden />
            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">{item.title}</h2>
              <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.desc}</p>
            </div>
          </li>
        ))}
      </ul>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          ¿Qué pasa con tu equipo desde que lo dejás?
        </h2>
        <ol className="mt-4 divide-y divide-slate-200 dark:divide-slate-700">
          {WORKFLOW.map((step, index) => (
            <li key={step.title} className="flex gap-4 py-4">
              <span className="text-lg font-black tabular-nums text-primary">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">{step.title.replace(/^\d+\.\s*/, "")}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10 rounded-3xl border border-white/15 bg-gradient-to-br from-primary/10 via-white/5 to-secondary/10 p-8 shadow-xl backdrop-blur-2xl dark:border-white/10 dark:from-slate-900/40 dark:via-slate-900/30 dark:to-slate-900/40">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          ¿Qué marcas reparan?
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">{config.brandsText}</p>
      </section>


      <section className="mt-10 rounded-3xl border border-white/15 bg-white/5 p-8 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Guías recomendadas para este servicio
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {relatedGuides.map((guide) => (
            <TrackedCtaLink
              key={guide.href}
              href={guide.href}
              ctaName={`service_related_guide_${config.slug}`}
              ctaLocation={`service_related_guides_${config.slug}`}
              ctaVariant="secondary"
              className="rounded-2xl border border-white/15 bg-white/70 p-5 transition hover:-translate-y-0.5 hover:border-primary/40 dark:border-white/10 dark:bg-slate-900/45"
            >
              <span className="block text-base font-semibold text-slate-900 dark:text-white">
                {guide.title}
              </span>
              <span className="mt-2 block text-sm text-slate-600 dark:text-slate-300">
                {guide.description}
              </span>
            </TrackedCtaLink>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-white/15 bg-white/5 p-8 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Preguntas frecuentes
        </h2>
        <div className="mt-6 space-y-3">
          {config.faqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-xl border border-white/15 bg-white/70 p-4 dark:border-white/10 dark:bg-slate-900/45"
            >
              <summary className="flex min-h-11 items-center cursor-pointer list-none text-sm font-semibold text-slate-900 dark:text-white">
                {faq.q}
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-white/15 bg-slate-900 p-8 text-center text-white shadow-lg">
        <h2 className="text-2xl font-bold">¿Querés que lo revisemos hoy?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-200">
          Mandanos marca, modelo y falla por WhatsApp y te pasamos precio y plazo.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <TrackedCtaLink
            href={whatsappUrl}
            ctaName="service_bottom_whatsapp"
            ctaLocation={`service_bottom_${config.slug}`}
            ctaVariant="whatsapp"
            external
            target="_blank"
            className="inline-flex min-h-11 items-center rounded-full bg-emerald-700 px-6 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            Iniciar por WhatsApp
          </TrackedCtaLink>
          <TrackedCtaLink
            href="/presupuesto-reparacion#solicitar-presupuesto"
            ctaName="service_bottom_form"
            ctaLocation={`service_bottom_${config.slug}`}
            ctaVariant="secondary"
            className="inline-flex min-h-11 items-center rounded-full border border-white/40 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Completar formulario
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
    </section>
  );
}
