import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  FaCheckCircle,
  FaClipboardCheck,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaStopwatch,
  FaTools,
} from "react-icons/fa";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import StickyLocalCta from "@/components/cro/StickyLocalCta";
import TrackedCtaLink from "@/components/cro/TrackedCtaLink";
import { buildWebsiteMetadata, getSiteUrl } from "@/lib/seoMetadata";

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
    badge: "Bateria y energia",
  },
  "cambio-pantalla-caba": {
    cover: "/images/handsome-young-man-smiling-while-repairing-old-smartphone-male-technician-using-screwdriver-fix-brok.webp",
    glow:
      "bg-[radial-gradient(circle_at_84%_18%,rgba(59,130,246,0.35),transparent_42%)]",
    badge: "Pantallas y modulos",
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
    badge: "Microelectronica",
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
    badge: "Estetica y terminacion",
  },
  "cambio-camara-caba": {
    cover: "/images/landings/landing-cambio-camara-caba-hero.webp",
    support: "/images/landings/landing-cambio-camara-caba-apoyo.webp",
    glow:
      "bg-[radial-gradient(circle_at_82%_18%,rgba(249,115,22,0.3),transparent_40%)]",
    badge: "Camaras y sensores",
  },
  "reparacion-audio-celular-caba": {
    cover: "/images/landings/landing-audio-celular-caba-hero.webp",
    support: "/images/landings/landing-audio-celular-caba-apoyo.webp",
    glow:
      "bg-[radial-gradient(circle_at_84%_18%,rgba(6,182,212,0.32),transparent_42%)]",
    badge: "Audio y microfonos",
  },
  "recuperacion-celular-mojado-caba": {
    cover: "/images/landings/landing-celular-mojado-caba-hero.webp",
    support: "/images/landings/landing-celular-mojado-caba-apoyo.webp",
    glow:
      "bg-[radial-gradient(circle_at_84%_18%,rgba(34,197,94,0.28),transparent_42%)]",
    badge: "Danos por liquidos",
  },
};

const DEFAULT_VISUAL: ServiceVisual = {
  cover: "/images/teamcelular.webp",
  glow:
    "bg-[radial-gradient(circle_at_84%_16%,rgba(56,189,248,0.32),transparent_42%)]",
  badge: "Servicio tecnico local",
};

const WORKFLOW = [
  {
    title: "1. Diagnostico inicial",
    desc: "Revisamos sintomas, equipo y prioridad para confirmar la falla real antes de cotizar.",
    Icon: FaTools,
  },
  {
    title: "2. Presupuesto claro",
    desc: "Te explicamos opciones de repuesto, tiempos estimados y alcance de garantia por escrito.",
    Icon: FaClipboardCheck,
  },
  {
    title: "3. Reparacion profesional",
    desc: "Trabajamos con herramientas de laboratorio y control de calidad tecnico antes de entregar.",
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
    title: "Guia de pantalla",
    description: "Como evaluar dano de modulo y elegir repuesto segun uso real.",
  },
  {
    href: "/guias/cambio-bateria-celular",
    title: "Guia de bateria",
    description: "Senales de desgaste y criterios para reemplazo sin gastar de mas.",
  },
  {
    href: "/guias/microelectronica-reballing-caba",
    title: "Guia de microelectronica",
    description: "Cuando conviene diagnostico de placa y que esperar de un caso complejo.",
  },
];

const SERVICE_RELATED_GUIDES: Record<string, RelatedGuide[]> = {
  "cambio-pantalla-caba": [
    {
      href: "/guias/reparacion-pantalla-celular",
      title: "Guia de pantalla",
      description: "Diferencias entre modulo, vidrio y criterios de calidad post-reparacion.",
    },
    {
      href: "/guias/reparacion-iphone-buenos-aires",
      title: "Guia iPhone",
      description: "Buenas practicas para conservar funciones delicadas en Apple.",
    },
    {
      href: "/guias/reparacion-samsung-buenos-aires",
      title: "Guia Samsung",
      description: "Escenarios frecuentes de AMOLED, touch y calibracion final.",
    },
  ],
  "cambio-bateria-caba": [
    {
      href: "/guias/cambio-bateria-celular",
      title: "Guia de bateria",
      description: "Como detectar desgaste real y evitar cambios innecesarios.",
    },
    {
      href: "/guias/mantenimiento-preventivo-celulares",
      title: "Guia de mantenimiento",
      description: "Rutinas para alargar autonomia y reducir nuevas fallas.",
    },
    {
      href: "/guias/reparacion-xiaomi-buenos-aires",
      title: "Guia Xiaomi",
      description: "Referencia util para equipos con carga rapida y consumo irregular.",
    },
  ],
  "cambio-pin-carga-caba": [
    {
      href: "/guias/reparacion-samsung-buenos-aires",
      title: "Guia Samsung",
      description: "Casos comunes de USB-C, humedad y falso contacto en Galaxy.",
    },
    {
      href: "/guias/reparacion-xiaomi-buenos-aires",
      title: "Guia Xiaomi",
      description: "Recomendaciones para puertos exigidos por carga rapida diaria.",
    },
    {
      href: "/guias/mantenimiento-preventivo-celulares",
      title: "Guia de mantenimiento",
      description: "Cuidados simples para evitar dano progresivo en conectores.",
    },
  ],
  "reparacion-placa-caba": [
    {
      href: "/guias/microelectronica-reballing-caba",
      title: "Guia de microelectronica",
      description: "Proceso real para placa, reballing y evaluacion de viabilidad.",
    },
    {
      href: "/guias/soporte-empresas-servicio-tecnico",
      title: "Guia de soporte empresas",
      description: "Como gestionar casos criticos cuando el equipo es de trabajo.",
    },
    {
      href: "/guias/reparacion-iphone-buenos-aires",
      title: "Guia iPhone",
      description: "Escenarios tipicos de placa y recuperacion en dispositivos Apple.",
    },
  ],
  "cambio-flex-caba": [
    {
      href: "/guias/reparacion-pantalla-celular",
      title: "Guia de pantalla",
      description: "Cuando una falla de display puede estar ligada a flex o conectores.",
    },
    {
      href: "/guias/reparacion-iphone-buenos-aires",
      title: "Guia iPhone",
      description: "Referencia para fallas de botones, camara y modulos internos.",
    },
    {
      href: "/guias/reparacion-samsung-buenos-aires",
      title: "Guia Samsung",
      description: "Checklist tecnico para sintomas intermitentes en equipos Galaxy.",
    },
  ],
  "cambio-tapa-caba": [
    {
      href: "/guias/reparacion-pantalla-celular",
      title: "Guia de pantalla",
      description: "Que revisar cuando hay golpes combinados en frente y parte trasera.",
    },
    {
      href: "/guias/mantenimiento-preventivo-celulares",
      title: "Guia de mantenimiento",
      description: "Buenas practicas para conservar terminacion y estructura del equipo.",
    },
    {
      href: "/guias/reparacion-iphone-buenos-aires",
      title: "Guia iPhone",
      description: "Referencia para equipos con tapa trasera quebrada y uso intensivo.",
    },
  ],
  "cambio-camara-caba": [
    {
      href: "/guias/reparacion-iphone-buenos-aires",
      title: "Guia iPhone",
      description: "Referencias para sensores y modulos de camara en equipos Apple.",
    },
    {
      href: "/guias/reparacion-samsung-buenos-aires",
      title: "Guia Samsung",
      description: "Casos frecuentes de camara en lineas Galaxy con uso intensivo.",
    },
    {
      href: "/guias/reparacion-xiaomi-buenos-aires",
      title: "Guia Xiaomi",
      description: "Escenarios de enfoque, lente y estabilidad en camara Xiaomi.",
    },
  ],
  "reparacion-audio-celular-caba": [
    {
      href: "/guias/pin-de-carga-suelto-solucion",
      title: "Guia de pin de carga",
      description: "Fallas que suelen convivir con problemas de audio y conectores.",
    },
    {
      href: "/guias/mantenimiento-preventivo-celulares",
      title: "Guia de mantenimiento",
      description: "Buenas practicas para evitar deterioro de microfono y parlante.",
    },
    {
      href: "/guias/celular-mojado-que-hacer",
      title: "Guia de celular mojado",
      description: "Protocolo util cuando el audio falla despues de humedad o liquidos.",
    },
  ],
  "recuperacion-celular-mojado-caba": [
    {
      href: "/guias/celular-mojado-que-hacer",
      title: "Guia de celular mojado",
      description: "Pasos urgentes para reducir dano y mejorar chances de recuperacion.",
    },
    {
      href: "/guias/microelectronica-reballing-caba",
      title: "Guia de microelectronica",
      description: "Cuando un caso por liquidos escala a diagnostico de placa.",
    },
    {
      href: "/guias/face-id-touch-id-no-funciona",
      title: "Guia de sensores",
      description: "Referencia para fallas en sensores que aparecen despues de humedad.",
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

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
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
              Taller en Recoleta y reseñas públicas en Google para validar experiencia real.
            </p>
          </div>

          <aside className="md:col-span-2">
            <div className="rounded-2xl border border-white/20 bg-black/25 p-5 backdrop-blur-md">
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-white/75">
                Confianza local
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-white/90">
                <li className="flex items-start gap-3">
                  <FaMapMarkerAlt className="mt-0.5 text-primary" />
                  Taller fisico en Recoleta con atencion para toda CABA.
                </li>
                <li className="flex items-start gap-3">
                  <FaShieldAlt className="mt-0.5 text-primary" />
                  Garantia por escrito y proceso claro antes de abrir el equipo.
                </li>
                <li className="flex items-start gap-3">
                  <FaStopwatch className="mt-0.5 text-primary" />
                  Tiempos estimados segun modelo, stock y complejidad tecnica.
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </header>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        {config.highlights.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-white/15 bg-white/5 p-6 shadow-lg backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/30"
          >
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              {item.title}
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">{item.desc}</p>
          </article>
        ))}
      </section>

      <section className="mt-10 rounded-3xl border border-white/15 bg-white/5 p-8 shadow-xl backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Como trabajamos este servicio
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Proceso pensado para que sepas que pasa con tu equipo en cada etapa.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {WORKFLOW.map((step) => {
            const Icon = step.Icon;
            return (
              <article
                key={step.title}
                className="rounded-2xl border border-white/10 bg-white/70 p-5 dark:border-white/10 dark:bg-slate-900/45"
              >
                <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Icon className="text-sm" />
                  </span>
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {step.desc}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-white/15 bg-gradient-to-br from-primary/10 via-white/5 to-secondary/10 p-8 shadow-xl backdrop-blur-2xl dark:border-white/10 dark:from-slate-900/40 dark:via-slate-900/30 dark:to-slate-900/40">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Marcas y modelos que atendemos
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">{config.brandsText}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {[
            "Diagnostico profesional",
            "Taller en Recoleta",
            "Garantia escrita",
            "Seguimiento por WhatsApp",
          ].map((signal) => (
            <span
              key={signal}
              className="rounded-full border border-primary/30 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-primary dark:border-primary/40 dark:bg-slate-900/45"
            >
              {signal}
            </span>
          ))}
        </div>
      </section>

      {visual.support ? (
        <section className="mt-10 grid gap-6 rounded-3xl border border-white/15 bg-white/5 p-6 shadow-xl backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30 md:grid-cols-[1.15fr_0.85fr] md:items-center md:p-8">
          <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-slate-900/40">
            <Image
              src={visual.support}
              alt={`${config.serviceName} en laboratorio tecnico`}
              width={1200}
              height={900}
              sizes="(max-width: 768px) 100vw, 60vw"
              className="h-auto w-full object-cover"
            />
          </div>
          <article className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Diagnostico real, sin respuestas genericas
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              Evaluamos sintomas, pruebas y contexto del equipo para darte una recomendacion
              concreta. Si no conviene reparar, te lo decimos claro antes de avanzar.
            </p>
            <div className="flex flex-wrap gap-3">
              <TrackedCtaLink
                href={whatsappUrl}
                ctaName="service_support_visual_whatsapp"
                ctaLocation={`service_support_visual_${config.slug}`}
                ctaVariant="whatsapp"
                external
                target="_blank"
                className="inline-flex min-h-11 items-center rounded-full bg-emerald-700 px-5 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                Consultar por WhatsApp
              </TrackedCtaLink>
              <TrackedCtaLink
                href="/presupuesto-reparacion#solicitar-presupuesto"
                ctaName="service_support_visual_budget"
                ctaLocation={`service_support_visual_${config.slug}`}
                ctaVariant="secondary"
                className="inline-flex min-h-11 items-center rounded-full border border-slate-300 px-5 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary dark:border-slate-600 dark:text-slate-200"
              >
                Ver presupuesto
              </TrackedCtaLink>
            </div>
          </article>
        </section>
      ) : null}

      <section className="mt-10 rounded-3xl border border-white/15 bg-white/5 p-8 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Guias recomendadas para este servicio
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Si queres comparar opciones antes de decidir, estas lecturas te dan contexto tecnico y comercial real.
        </p>
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
        <div className="mt-6 flex flex-wrap gap-3">
          <TrackedCtaLink
            href="/guias"
            ctaName="service_related_guides_hub"
            ctaLocation={`service_related_guides_${config.slug}`}
            ctaVariant="secondary"
            className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary dark:border-slate-600 dark:text-slate-200"
          >
            Ver todas las guias
          </TrackedCtaLink>
          <TrackedCtaLink
            href="/presupuesto-reparacion#solicitar-presupuesto"
            ctaName="service_related_guides_budget"
            ctaLocation={`service_related_guides_${config.slug}`}
            ctaVariant="primary"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90"
          >
            Pedir diagnostico
          </TrackedCtaLink>
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
              <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900 dark:text-white">
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
        <h2 className="text-2xl font-bold">Queres que lo revisemos hoy?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-200">
          Escribinos con marca, modelo y falla. Te respondemos con una orientacion clara
          para que sepas si conviene reparar y en que plazo.
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

      <StickyLocalCta
        whatsappUrl={whatsappUrl}
        budgetHref="/presupuesto-reparacion#solicitar-presupuesto"
        phoneHref="tel:+541151034595"
        primaryLabel="Presupuesto"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </section>
  );
}
