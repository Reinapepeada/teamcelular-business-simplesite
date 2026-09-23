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
import { BsWhatsapp } from "react-icons/bs";
import TrackedCtaLink from "@/components/cro/TrackedCtaLink";
import { buildWebsiteMetadata, getSiteUrl } from "@/lib/seoMetadata";
import { getBranch } from "@/lib/businessProfile";
import { ZONE_CONFIGS } from "./zoneConfigs";

const SITE_URL = getSiteUrl();

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
  noIndex?: boolean;
  slug: string;
  zoneName: string;
  zoneAlias?: string;
  /**
   * Branch that physically serves this zone. When set, the Service schema
   * points at that branch's LocalBusiness entity instead of the site-level
   * one, which carries the Recoleta address.
   */
  branchSlug?: "recoleta" | "belgrano";
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

type ZoneRelatedGuide = {
  href: string;
  title: string;
  description: string;
};

const GUIDE_SIGNAL_MAP: Array<{ token: string; guide: ZoneRelatedGuide }> = [
  {
    token: "pantalla",
    guide: {
      href: "/guias/reparacion-pantalla-celular",
      title: "Guía de pantalla",
      description: "Cómo validar el daño del módulo y evitar reemplazos que duran poco.",
    },
  },
  {
    token: "bateria",
    guide: {
      href: "/guias/cambio-bateria-celular",
      title: "Guía de batería",
      description: "Señales reales de desgaste y recomendaciones por tipo de uso.",
    },
  },
  {
    token: "carga",
    guide: {
      href: "/guias/reparacion-samsung-buenos-aires",
      title: "Guía Samsung",
      description: "Casos frecuentes de USB-C, carga intermitente y diagnóstico técnico.",
    },
  },
  {
    token: "pin",
    guide: {
      href: "/guias/reparacion-xiaomi-buenos-aires",
      title: "Guía Xiaomi",
      description: "Referencia útil para fallas de carga en equipos de uso intensivo.",
    },
  },
  {
    token: "placa",
    guide: {
      href: "/guias/microelectronica-reballing-caba",
      title: "Guía de microelectrónica",
      description: "Cuándo conviene revisar la placa y cómo se evalúa si tiene arreglo.",
    },
  },
  {
    token: "microelectronica",
    guide: {
      href: "/guias/microelectronica-reballing-caba",
      title: "Guía de microelectrónica",
      description: "Proceso de laboratorio para equipos que no encienden o reinician.",
    },
  },
  {
    token: "diagnostico",
    guide: {
      href: "/guias/mantenimiento-preventivo-celulares",
      title: "Guía de mantenimiento",
      description: "Checklist para reducir fallas repetidas y extender la vida útil.",
    },
  },
];

const GUIDE_FALLBACK: ZoneRelatedGuide[] = [
  {
    href: "/guias/reparacion-iphone-buenos-aires",
    title: "Guía iPhone",
    description: "Casos reales de reparación de equipos Apple en CABA.",
  },
  {
    href: "/guias/reparacion-samsung-buenos-aires",
    title: "Guía Samsung",
    description: "Fallas comunes en Galaxy y qué reparar primero.",
  },
  {
    href: "/guias/reparacion-xiaomi-buenos-aires",
    title: "Guía Xiaomi",
    description: "Diagnóstico práctico para Redmi, POCO y Xiaomi con carga rápida.",
  },
];

function pageUrl(slug: string) {
  return `${SITE_URL}/zonas/${slug}`;
}

function getZoneRelatedGuides(focusServices: string[]) {
  const normalized = focusServices.join(" ").toLowerCase();
  const selected = new Map<string, ZoneRelatedGuide>();

  GUIDE_SIGNAL_MAP.forEach((entry) => {
    if (normalized.includes(entry.token)) {
      selected.set(entry.guide.href, entry.guide);
    }
  });

  GUIDE_FALLBACK.forEach((guide) => {
    if (!selected.has(guide.href) && selected.size < 3) {
      selected.set(guide.href, guide);
    }
  });

  return Array.from(selected.values()).slice(0, 3);
}

export function buildZoneMetadata(config: ZoneLandingConfig): Metadata {
  return buildWebsiteMetadata({
    path: `/zonas/${config.slug}`,
    title: config.metaTitle,
    description: config.metaDescription,
    robots: {
      index: !config.noIndex,
      follow: true,
    },
    languages: {
      "es-AR": `/zonas/${config.slug}`,
    },
    openGraphDescription: config.socialDescription,
    openGraphImageAlt: `Team Celular - Arreglo de celulares en ${config.zoneName}`,
    twitterDescription: config.socialDescription,
  });
}

export default function ZoneLandingPage({ config }: { config: ZoneLandingConfig }) {
  const url = pageUrl(config.slug);
  const displayZone = config.zoneAlias || config.zoneName;
  const relatedGuides = getZoneRelatedGuides(config.focusServices);
  const whatsappUrl = `https://wa.me/5491151034595?text=${encodeURIComponent(
    config.whatsappText
  )}`;

  // Zones with their own branch name it; the rest state both, instead of
  // anchoring every zone to Recoleta regardless of distance.
  const localBranch = config.branchSlug ? getBranch(config.branchSlug) : null;
  const localBranchLine = localBranch
    ? `Taller físico en ${localBranch.neighborhood}, ${localBranch.street}, a minutos de tu casa.`
    : "Dos talleres en CABA, Recoleta y Belgrano, para atención de toda la ciudad.";

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
    provider: {
      "@id": config.branchSlug
        ? `${SITE_URL}/sucursales/caba/${config.branchSlug}#localbusiness`
        : `${SITE_URL}#localbusiness`,
    },
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
          { name: "Sucursales", url: `${SITE_URL}/sucursales` },
          { name: displayZone, url },
        ]}
      />

      <header className="tc-intro mx-auto max-w-[1200px] px-4 pt-12 text-center sm:px-6 sm:pt-16">
        <p className="tc-eyebrow">{config.heroBadge}</p>
        <h1 className="tc-display mx-auto mt-3 max-w-4xl">
          Arreglo de celulares en {displayZone}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-[19px] leading-[1.42] text-[#86868b] sm:text-[21px]">
          {config.heroIntro}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5">
          <TrackedCtaLink
            href="/presupuesto-reparacion#solicitar-presupuesto"
            ctaName="zone_hero_budget"
            ctaLocation={`zone_hero_${config.slug}`}
            ctaVariant="primary"
            className="tc-btn tc-btn-primary"
          >
            Pedir presupuesto
          </TrackedCtaLink>
          <TrackedCtaLink
            href={whatsappUrl}
            ctaName="zone_hero_whatsapp"
            ctaLocation={`zone_hero_${config.slug}`}
            ctaVariant="whatsapp"
            external
            target="_blank"
            className="tc-link inline-flex min-h-11 items-center gap-2 text-[17px]"
          >
            <BsWhatsapp aria-hidden /> WhatsApp directo ›
          </TrackedCtaLink>
        </div>
        <p className="mt-4 text-[14px] text-[#86868b]">
          Atención presencial en Recoleta y Belgrano, sin turno.
        </p>
        {/* Salida explicita para la intencion generica: estas paginas de
            barrio venian ranqueando head terms ("reparacion de celulares",
            496 impresiones y 0 clicks en 26 dias) y el visitante no
            encontraba donde seguir. */}
        <p className="mx-auto mt-3 max-w-2xl text-[14px] text-[#86868b]">
          ¿No buscabas {displayZone} en particular? Entrá por{" "}
          <Link href="/" className="tc-link">
            reparación de celulares en CABA
          </Link>{" "}
          para ver el servicio completo, o por{" "}
          <Link href="/sucursales" className="tc-link">
            las dos sucursales
          </Link>
          .
        </p>
      </header>

      <div className="mx-auto mt-12 max-w-[1200px] px-4 sm:px-6">
        <div className="tc-zoom relative aspect-[3/4] overflow-hidden rounded-[28px] sm:aspect-[16/9] lg:aspect-[16/7]">
          <Image
            src={config.heroImage}
            alt={`Arreglo de celulares en ${displayZone}`}
            fill
            priority
            quality={82}
            sizes="(max-width: 768px) 200vw, 1200px"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          {/* Señales locales de confianza sobre la foto, en vidrio. */}
          <section aria-label="Señales locales de confianza" className="tc-glass absolute bottom-4 left-4 right-4 rounded-[24px] px-5 py-4 sm:bottom-6 sm:left-6 sm:right-6">
            <h2 className="sr-only">Señales locales de confianza</h2>
            <ul className="grid gap-2 text-[14px] text-white/90 md:grid-cols-3 md:gap-6">
              <li className="flex items-start gap-2.5">
                <FaMapMarkedAlt className="mt-0.5 shrink-0 text-[#6aa6ff]" aria-hidden />
                {localBranchLine}
              </li>
              <li className="flex items-start gap-2.5">
                <FaShieldAlt className="mt-0.5 shrink-0 text-[#6aa6ff]" aria-hidden />
                Garantía escrita de 90 días y explicación clara antes de reparar.
              </li>
              <li className="flex items-start gap-2.5">
                <FaSubway className="mt-0.5 shrink-0 text-[#6aa6ff]" aria-hidden />
                Coordinación por WhatsApp para acortar tiempos de espera.
              </li>
            </ul>
          </section>
        </div>
      </div>

      <section className="tc-section">
        <div className="tc-stagger grid gap-5 md:grid-cols-3">
          {config.highlights.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <article key={item.title} className="tc-card flex min-h-[15rem] flex-col">
                <Icon className="text-3xl text-[#f5f5f7]" aria-hidden />
                <h2 className="tc-subheading mt-auto pt-8">{item.title}</h2>
                <p className="tc-body mt-3">{item.desc}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="w-full bg-[#f5f5f7] text-[#1d1d1f]">
        <div className="tc-section grid gap-10 lg:grid-cols-2">
          <div className="tc-reveal">
            <h2 className="tc-heading !text-[#1d1d1f]">Casos frecuentes desde {displayZone}</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {config.focusServices.map((service) => (
                <span key={service} className="rounded-full bg-white px-3 py-1.5 text-[12px] text-[#424245]">
                  {service}
                </span>
              ))}
            </div>
          </div>
          <ul className="tc-reveal divide-y divide-[#d2d2d7] rounded-[28px] bg-white px-7">
            {config.localScenarios.map((item) => (
              <li key={item} className="py-5 text-[17px] leading-[1.47] text-[#1d1d1f]">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="tc-section">
        <div className="tc-card tc-reveal grid gap-8 !p-8 sm:!p-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <h2 className="tc-heading">¿Cómo llego desde {displayZone}?</h2>
            <p className="tc-body mt-4 max-w-2xl">{config.transportTip}</p>
            {/* Las paginas de zona absorben impresiones de "phone repair" en ingles
                (1229 en 13 dias solo Palermo). Este enlace le pasa esa relevancia a
                la pagina en ingles, que es la que deberia atender esa consulta. */}
            <p className="mt-4 text-[14px] text-[#86868b]" lang="en">
              Looking for phone repair in English?{" "}
              <Link href="/en/phone-repair-buenos-aires" className="tc-link">
                We speak English
              </Link>
              .
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link href="/contacto" className="tc-btn tc-btn-primary">
              Ver mapa y cómo llegar
            </Link>
            <Link href="/sucursales" className="tc-btn tc-btn-ghost">
              Ver las dos sucursales
            </Link>
          </div>
        </div>
      </section>

      <section className="tc-section !pt-0">
        <div className="tc-reveal flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="tc-heading">Guías técnicas recomendadas para {displayZone}</h2>
            <p className="tc-body mt-4 max-w-2xl">
              Si querés comparar opciones antes de traer el equipo, estas lecturas te ayudan a decidir mejor.
            </p>
          </div>
          <TrackedCtaLink
            href="/guias"
            ctaName="zone_related_guides_hub"
            ctaLocation={`zone_related_guides_${config.slug}`}
            ctaVariant="secondary"
            className="tc-link inline-flex min-h-11 shrink-0 items-center text-[17px]"
          >
            Ver todas las guías ›
          </TrackedCtaLink>
        </div>
        <div className="tc-stagger mt-10 grid gap-5 md:grid-cols-3">
          {relatedGuides.map((guide) => (
            <TrackedCtaLink
              key={guide.href}
              href={guide.href}
              ctaName={`zone_related_guide_${config.slug}_${guide.href.replace("/guias/", "").replaceAll("-", "_")}`}
              ctaLocation={`zone_related_guides_${config.slug}`}
              ctaVariant="secondary"
              className="tc-card group block transition-colors hover:bg-[#262628]"
            >
              <span className="tc-subheading block">{guide.title}</span>
              <span className="tc-body mt-3 block">{guide.description}</span>
              <span className="tc-link mt-5 block text-[17px]">Leer guía ›</span>
            </TrackedCtaLink>
          ))}
        </div>
        <div className="mt-10 text-center">
          <TrackedCtaLink
            href="/presupuesto-reparacion#solicitar-presupuesto"
            ctaName="zone_related_guides_budget"
            ctaLocation={`zone_related_guides_${config.slug}`}
            ctaVariant="primary"
            className="tc-btn tc-btn-primary"
          >
            Pedir diagnóstico
          </TrackedCtaLink>
        </div>
      </section>

      <section className="tc-section !pt-0">
        <h2 className="tc-heading tc-reveal">¿Atienden otros barrios cerca?</h2>
        <div className="mt-8 flex flex-wrap gap-3">
          {config.nearbyZones.filter((zone) => !ZONE_CONFIGS[zone.slug]?.noIndex).map((zone) => (
            <Link
              key={zone.slug}
              href={
                // /zonas/recoleta y /zonas/belgrano redirigen (301) a las sucursales.
                zone.slug === "recoleta" || zone.slug === "belgrano"
                  ? `/sucursales/caba/${zone.slug}`
                  : `/zonas/${zone.slug}`
              }
              className="inline-flex min-h-11 items-center rounded-full bg-[#1d1d1f] px-5 text-[15px] text-[#cccccc] transition hover:bg-[#333336] hover:text-white"
            >
              {zone.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="tc-section !pt-0">
        <h2 className="tc-heading tc-reveal">Preguntas frecuentes desde {displayZone}</h2>
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
