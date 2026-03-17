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

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";

type ServiceVisual = {
  cover: string;
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
  const serviceUrl = `${SITE_URL}/reparaciones/${config.slug}`;

  return {
    title: config.metaTitle,
    description: config.metaDescription,
    keywords: config.keywords,
    alternates: {
      canonical: serviceUrl,
      languages: {
        "es-AR": serviceUrl,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: config.socialTitle,
      description: config.socialDescription,
      url: serviceUrl,
      type: "website",
      locale: "es_AR",
      images: [
        {
          url: `${SITE_URL}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: `${config.serviceName} - Team Celular`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: config.socialTitle,
      description: config.socialDescription,
      images: [`${SITE_URL}/opengraph-image.png`],
    },
  };
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
              <Link
                href="/presupuesto-reparacion#solicitar-presupuesto"
                className="inline-flex min-h-11 items-center rounded-full bg-white px-6 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Pedir presupuesto
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center rounded-full border border-white/40 bg-white/10 px-6 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                WhatsApp directo
              </a>
              <Link
                href="/sucursales/caba/recoleta"
                className="inline-flex min-h-11 items-center rounded-full border border-white/30 px-6 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                Ver sucursal Recoleta
              </Link>
            </div>
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
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center rounded-full bg-emerald-500 px-6 text-sm font-semibold text-white transition hover:bg-emerald-600"
          >
            Iniciar por WhatsApp
          </a>
          <Link
            href="/presupuesto-reparacion#solicitar-presupuesto"
            className="inline-flex min-h-11 items-center rounded-full border border-white/40 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Completar formulario
          </Link>
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
