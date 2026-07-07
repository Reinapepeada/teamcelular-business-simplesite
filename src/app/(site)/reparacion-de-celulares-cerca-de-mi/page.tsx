import type { Metadata } from "next";
import Link from "next/link";
import TrackedCtaLink from "@/components/cro/TrackedCtaLink";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { BUDGET_RESPONSE_MESSAGE, WARRANTY_SCOPE_MESSAGE } from "@/lib/copyStandards";
import { buildWebsiteMetadata, getSiteUrl } from "@/lib/seoMetadata";

const SITE_URL = getSiteUrl();
const PAGE_URL = `${SITE_URL}/reparacion-de-celulares-cerca-de-mi`;

const nearbyZones = [
  { name: "Recoleta", href: "/zonas/recoleta" },
  { name: "Palermo", href: "/zonas/palermo" },
  { name: "Belgrano", href: "/zonas/belgrano" },
  { name: "Caballito", href: "/zonas/caballito" },
  { name: "Almagro", href: "/zonas/almagro" },
  { name: "Balvanera", href: "/zonas/balvanera" },
  { name: "Microcentro", href: "/zonas/microcentro" },
];

const frequentRepairs = [
  {
    title: "Pantalla rota o touch sin respuesta",
    href: "/reparaciones/cambio-pantalla-caba",
    description:
      "Cambio de mÃ³dulo con prueba funcional para brillo, touch y sensores antes de entrega.",
  },
  {
    title: "BaterÃ­a que dura poco o se apaga",
    href: "/reparaciones/cambio-bateria-caba",
    description:
      "DiagnÃ³stico para confirmar desgaste real y reemplazo con garantÃ­a escrita 90 dÃ­as.",
  },
  {
    title: "Celular que no carga bien",
    href: "/reparaciones/cambio-pin-carga-caba",
    description:
      "RevisiÃ³n de pin/flex y soluciÃ³n para carga intermitente o falso contacto.",
  },
];

const highIntentLinks = [
  {
    label: "Cambio de pantalla en CABA",
    href: "/reparaciones/cambio-pantalla-caba",
  },
  {
    label: "Cambio de bateria en CABA",
    href: "/reparaciones/cambio-bateria-caba",
  },
  {
    label: "Cambio de pin de carga en CABA",
    href: "/reparaciones/cambio-pin-carga-caba",
  },
  {
    label: "Reparacion iPhone en Buenos Aires",
    href: "/guias/reparacion-iphone-buenos-aires",
  },
  {
    label: "Reparacion Samsung en Buenos Aires",
    href: "/guias/reparacion-samsung-buenos-aires",
  },
];

const faqs = [
  {
    q: "Si busco reparaciÃ³n de celulares cerca de mi, Â¿atienden en el dÃ­a?",
    a: "Pantalla, baterÃ­a y carga suelen resolverse en el dÃ­a segÃºn stock y estado del equipo. Siempre confirmamos el tiempo real antes de abrir el celular.",
  },
  {
    q: "Â¿QuÃ© zonas cubren cerca de Recoleta?",
    a: "Atendemos equipos de Recoleta, Palermo, Belgrano, Caballito, Almagro, Balvanera, Microcentro y otras zonas de CABA.",
  },
  {
    q: "Â¿CuÃ¡nto tardan en responder un presupuesto?",
    a: BUDGET_RESPONSE_MESSAGE,
  },
  {
    q: "Â¿La reparaciÃ³n tiene garantÃ­a?",
    a: WARRANTY_SCOPE_MESSAGE,
  },
];

const localSignals = [
  "Sucursal Recoleta: Paraguay 2451, CABA. Sucursal Belgrano: Amenábar 2032, CABA.",
  "AtenciÃ³n comercial de lunes a viernes de 10:30 a 18:00, sin turno previo.",
  "Seguimiento por WhatsApp y garantÃ­a escrita de 90 dÃ­as en cada trabajo.",
];

export const metadata: Metadata = buildWebsiteMetadata({
  path: "/reparacion-de-celulares-cerca-de-mi",
  title: "ReparaciÃ³n de Celulares Cerca de Mi en CABA | Team Celular",
  description:
    "ReparaciÃ³n de celulares cerca de vos en CABA. Team Celular, Paraguay 2451 Recoleta. Pantalla, baterÃ­a y carga en el dÃ­a. GarantÃ­a escrita 90 dÃ­as.",
  keywords: [
    "reparacion de celulares cerca de mi",
    "arreglo de celulares cerca de mi",
    "servicio tecnico celulares cerca de mi",
    "reparacion celulares recoleta",
    "reparacion de celulares caba",
    "cambio pantalla celular cerca",
    "cambio bateria celular recoleta",
  ],
  languages: {
    "es-AR": "/reparacion-de-celulares-cerca-de-mi",
  },
  openGraphTitle: "ReparaciÃ³n de Celulares Cerca de Mi en CABA | Team Celular",
  openGraphDescription:
    "Team Celular, Paraguay 2451 Recoleta CABA. ReparaciÃ³n de celulares cerca de vos con diagnÃ³stico el mismo dÃ­a y garantÃ­a escrita 90 dÃ­as.",
  openGraphImageAlt: "Team Celular - ReparaciÃ³n de celulares cerca de mi en CABA",
  twitterTitle: "ReparaciÃ³n de Celulares Cerca de Mi en CABA | Team Celular",
  twitterDescription:
    "Team Celular, Paraguay 2451 Recoleta. Pantalla, baterÃ­a y carga cerca de vos en CABA. GarantÃ­a escrita 90 dÃ­as.",
});

export default function ReparacionCelularesCercaPage() {
  const whatsappUrl = `https://wa.me/5491151034595?text=${encodeURIComponent(
    "Hola! Busque reparacion de celulares cerca de mi y quiero cotizar. Marca, modelo y falla:"
  )}`;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${PAGE_URL}#service`,
    name: "Reparacion de celulares cerca de mi en CABA",
    serviceType: "Reparacion de celulares",
    areaServed: [
      { "@type": "City", name: "Recoleta" },
      { "@type": "City", name: "CABA" },
      { "@type": "City", name: "Buenos Aires" },
    ],
    provider: { "@id": `${SITE_URL}#localbusiness` },
    url: PAGE_URL,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}#localbusiness`,
    name: "Team Celular",
    image: `${SITE_URL}/images/brand/imagotipo-dark.png`,
    url: `${SITE_URL}/sucursales/caba/recoleta`,
    telephone: "+54 11 5103-4595",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Paraguay 2451",
      addressLocality: "Recoleta",
      addressRegion: "CABA",
      postalCode: "C1121",
      addressCountry: "AR",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "10:30",
        closes: "18:00",
      },
    ],
    areaServed: ["Recoleta", "Palermo", "Belgrano", "Caballito", "CABA"],
    sameAs: ["https://wa.me/5491151034595"],
  };

  return (
    <section className="w-full max-w-6xl px-6 py-14 md:px-8">
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: `${SITE_URL}/` },
          { name: "Reparacion de celulares cerca de mi", url: PAGE_URL },
        ]}
      />

      <header className="rounded-2xl border border-white/15 bg-white/5 p-10 text-center shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30 md:p-12">
        <span className="inline-flex rounded-full bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
          Cobertura local CABA
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
          ReparaciÃ³n de celulares cerca de vos, con talleres en Recoleta y Belgrano, CABA
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          Team Celular tiene dos sucursales en CABA: <strong>Paraguay 2451, Recoleta</strong> y <strong>Amenábar 2032, Belgrano</strong>. DiagnÃ³stico el mismo dÃ­a, presupuesto claro sin compromiso
          y garantÃ­a escrita de <strong>90 dÃ­as</strong> sobre trabajo y repuesto.
          Pantalla, baterÃ­a y carga suelen salir en el dÃ­a.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <TrackedCtaLink
            href="/presupuesto-reparacion#solicitar-presupuesto"
            ctaName="near_me_hero_budget"
            ctaLocation="near_me_hero"
            ctaVariant="primary"
            className="rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-primary/90 hover:shadow-xl"
          >
            Pedir presupuesto
          </TrackedCtaLink>
          <TrackedCtaLink
            href={whatsappUrl}
            ctaName="near_me_hero_whatsapp"
            ctaLocation="near_me_hero"
            ctaVariant="whatsapp"
            external
            target="_blank"
            className="rounded-full border border-emerald-700 bg-emerald-700 px-8 py-4 text-base font-semibold text-white transition hover:bg-emerald-800"
          >
            WhatsApp directo
          </TrackedCtaLink>
        </div>
      </header>

      <section className="mt-10 rounded-2xl border border-white/15 bg-white/5 p-8 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Reparaciones frecuentes cerca tuyo
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {frequentRepairs.map((repair) => (
            <article
              key={repair.title}
              className="rounded-xl border border-white/10 bg-white/10 p-5 text-sm leading-relaxed text-slate-700 dark:border-white/5 dark:bg-slate-900/40 dark:text-slate-300"
            >
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                {repair.title}
              </h3>
              <p className="mt-2">{repair.description}</p>
              <Link href={repair.href} className="mt-4 inline-flex font-semibold text-primary hover:underline">
                Ver servicio
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-white/15 bg-white/5 p-8 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Barrios que atendemos en CABA
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Dos sucursales en CABA: Recoleta (Paraguay 2451) y Belgrano (Amenábar 2032), con atenciÃ³n para toda la ciudad.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {nearbyZones.map((zone) => (
            <Link
              key={zone.href}
              href={zone.href}
              className="rounded-xl border border-white/10 bg-white/10 px-5 py-4 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/5 dark:bg-slate-900/40 dark:text-slate-200"
            >
              {zone.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-white/15 bg-white/5 p-8 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          SeÃ±ales locales para validar cercania real
        </h2>
        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          {localSignals.map((signal) => (
            <li key={signal} className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 dark:border-white/5 dark:bg-slate-900/40">
              {signal}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/sucursales/caba/recoleta" className="inline-flex font-semibold text-primary hover:underline">
            Ver sucursal Recoleta
          </Link>
          <span className="text-slate-400">â€¢</span>
          <Link href="/sucursales/caba/belgrano" className="inline-flex font-semibold text-primary hover:underline">
            Ver sucursal Belgrano
          </Link>
          <span className="text-slate-400">â€¢</span>
          <Link href="/contacto" className="inline-flex font-semibold text-primary hover:underline">
            Ver datos de contacto
          </Link>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-white/15 bg-white/5 p-8 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Rutas recomendadas para resolver la falla rÃ¡pido
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Si ya sabÃ©s el sÃ­ntoma, entrÃ¡ directo en la pÃ¡gina exacta para acelerar diagnÃ³stico y presupuesto.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          {highIntentLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/5 dark:bg-slate-900/40 dark:text-slate-200"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-white/15 bg-white/5 p-8 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Preguntas frecuentes</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {faqs.map((faq) => (
            <article
              key={faq.q}
              className="rounded-xl border border-white/10 bg-white/10 p-5 text-sm leading-relaxed text-slate-700 dark:border-white/5 dark:bg-slate-900/40 dark:text-slate-300"
            >
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">{faq.q}</h3>
              <p className="mt-2">{faq.a}</p>
            </article>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
    </section>
  );
}
