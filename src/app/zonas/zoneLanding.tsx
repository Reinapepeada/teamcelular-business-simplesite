import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  FaBolt,
  FaBusinessTime,
  FaMapMarkedAlt,
  FaMicrochip,
  FaMobileAlt,
  FaShieldAlt,
  FaSubway,
  FaTools,
} from "react-icons/fa";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import StickyLocalCta from "@/components/cro/StickyLocalCta";

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";

type HighlightIcon = "screen" | "battery" | "chip" | "speed" | "business" | "repair";

const iconMap: Record<HighlightIcon, React.ComponentType<{ className?: string }>> = {
  screen: FaMobileAlt,
  battery: FaBolt,
  chip: FaMicrochip,
  speed: FaBusinessTime,
  business: FaMapMarkedAlt,
  repair: FaTools,
};

export interface ZoneHighlight {
  title: string;
  desc: string;
  icon: HighlightIcon;
}

export interface ZoneFaq {
  q: string;
  a: string;
}

export interface NearbyZone {
  name: string;
  slug: string;
}

export interface ZoneLandingConfig {
  slug: string;
  zoneName: string;
  zoneAlias?: string;
  metaTitle: string;
  metaDescription: string;
  socialDescription: string;
  heroBadge: string;
  heroIntro: string;
  heroImage: string;
  heroGlowClass: string;
  whatsappText: string;
  highlights: ZoneHighlight[];
  localScenarios: string[];
  transportTip: string;
  nearbyZones: NearbyZone[];
  focusServices: string[];
  faqs: ZoneFaq[];
}

function pageUrl(slug: string) {
  return `${SITE_URL}/zonas/${slug}`;
}

export function buildZoneMetadata(config: ZoneLandingConfig): Metadata {
  const url = pageUrl(config.slug);
  const title = config.metaTitle;
  const description = config.metaDescription;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        "es-AR": url,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description: config.socialDescription,
      url,
      type: "website",
      locale: "es_AR",
      images: [
        {
          url: `${SITE_URL}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: `Team Celular - Arreglo de celulares en ${config.zoneName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: config.socialDescription,
      images: [`${SITE_URL}/opengraph-image.png`],
    },
  };
}

export default function ZoneLandingPage({ config }: { config: ZoneLandingConfig }) {
  const url = pageUrl(config.slug);
  const displayZone = config.zoneAlias || config.zoneName;
  const whatsappUrl = `https://wa.me/5491151034595?text=${encodeURIComponent(
    config.whatsappText
  )}`;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: `Arreglo de celulares en ${displayZone} (CABA)`,
    serviceType: "Reparacion de celulares",
    url,
    areaServed: [
      { "@type": "City", name: config.zoneName },
      { "@type": "City", name: "CABA" },
      { "@type": "City", name: "Buenos Aires" },
    ],
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
          { name: "Zonas", url: `${SITE_URL}/zonas` },
          { name: displayZone, url },
        ]}
      />

      <header className="relative overflow-hidden rounded-3xl border border-white/15 bg-slate-900 text-white shadow-2xl">
        <div className="absolute inset-0">
          <Image
            src={config.heroImage}
            alt={`Arreglo de celulares en ${displayZone}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1100px"
            className="object-cover opacity-35"
          />
        </div>
        <div aria-hidden className={`absolute inset-0 ${config.heroGlowClass}`} />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-900/75 to-slate-900/55"
        />

        <div className="relative z-10 grid gap-8 p-8 md:grid-cols-5 md:p-12">
          <div className="space-y-6 md:col-span-3">
            <p className="inline-flex rounded-full border border-white/35 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/90">
              {config.heroBadge}
            </p>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Arreglo de celulares para {displayZone} (CABA)
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-slate-100/90">
              {config.heroIntro}
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
                href="/contacto"
                className="inline-flex min-h-11 items-center rounded-full border border-white/35 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Ver ubicacion
              </Link>
            </div>
          </div>

          <aside className="md:col-span-2">
            <div className="rounded-2xl border border-white/20 bg-black/25 p-5 backdrop-blur-md">
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-white/75">
                Senales locales de confianza
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-white/90">
                <li className="flex items-start gap-3">
                  <FaMapMarkedAlt className="mt-0.5 text-primary" />
                  Taller fisico en Recoleta para atencion de toda CABA.
                </li>
                <li className="flex items-start gap-3">
                  <FaShieldAlt className="mt-0.5 text-primary" />
                  Garantia por escrito y explicacion clara antes de reparar.
                </li>
                <li className="flex items-start gap-3">
                  <FaSubway className="mt-0.5 text-primary" />
                  Coordinacion por WhatsApp para acortar tiempos de espera.
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </header>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        {config.highlights.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <article
              key={item.title}
              className="rounded-2xl border border-white/15 bg-white/5 p-6 shadow-lg backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/30"
            >
              <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900 dark:text-white">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Icon className="text-sm" />
                </span>
                {item.title}
              </h2>
              <p className="mt-3 text-slate-600 dark:text-slate-300">{item.desc}</p>
            </article>
          );
        })}
      </section>

      <section className="mt-10 rounded-2xl border border-white/15 bg-white/5 p-8 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Casos frecuentes desde {displayZone}
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-300">
          {config.localScenarios.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          {config.focusServices.map((service) => (
            <span
              key={service}
              className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-primary"
            >
              {service}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-white/15 bg-gradient-to-br from-primary/10 via-white/5 to-secondary/10 p-8 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:from-slate-900/40 dark:via-slate-900/30 dark:to-slate-900/40">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Como venir desde {displayZone}
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">{config.transportTip}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/contacto"
            className="rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-secondary/90"
          >
            Ver mapa y como llegar
          </Link>
          <Link
            href="/sucursales/caba/recoleta"
            className="rounded-full border border-secondary/50 px-6 py-3 text-sm font-semibold text-secondary transition hover:bg-secondary/10"
          >
            Ver sucursal Recoleta
          </Link>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-white/15 bg-white/5 p-8 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Zonas cercanas que tambien atendemos
        </h2>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {config.nearbyZones.map((zone) => (
            <Link
              key={zone.slug}
              href={`/zonas/${zone.slug}`}
              className="rounded-xl border border-white/10 bg-white/10 p-4 text-sm font-semibold text-slate-700 transition hover:border-primary/40 hover:text-primary dark:border-white/10 dark:bg-slate-900/40 dark:text-slate-200"
            >
              {zone.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-white/15 bg-white/5 p-8 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30">
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

      <StickyLocalCta
        whatsappUrl={whatsappUrl}
        budgetHref="/presupuesto-reparacion#solicitar-presupuesto"
        phoneHref="tel:+541151034595"
        primaryLabel="Cotizar"
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
