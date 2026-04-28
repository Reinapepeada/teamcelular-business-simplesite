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
      "Cambio de modulo con prueba funcional para brillo, touch y sensores antes de entrega.",
  },
  {
    title: "Bateria que dura poco o se apaga",
    href: "/reparaciones/cambio-bateria-caba",
    description:
      "Diagnostico para confirmar desgaste real y reemplazo con garantia escrita.",
  },
  {
    title: "Celular que no carga bien",
    href: "/reparaciones/cambio-pin-carga-caba",
    description:
      "Revision de pin/flex y solucion para carga intermitente o falso contacto.",
  },
];

const faqs = [
  {
    q: "Si busco reparacion de celulares cerca de mi, atienden en el dia?",
    a: "Pantalla, bateria y carga suelen resolverse en el dia segun stock y estado del equipo. Siempre confirmamos tiempo real antes de abrir el celular.",
  },
  {
    q: "Que zonas cubren cerca de Recoleta?",
    a: "Atendemos equipos de Recoleta, Palermo, Belgrano, Caballito, Almagro, Balvanera, Microcentro y otras zonas de CABA.",
  },
  {
    q: "Cuanto tardan en responder un presupuesto?",
    a: BUDGET_RESPONSE_MESSAGE,
  },
  {
    q: "La reparacion tiene garantia?",
    a: WARRANTY_SCOPE_MESSAGE,
  },
];

export const metadata: Metadata = buildWebsiteMetadata({
  path: "/reparacion-de-celulares-cerca-de-mi",
  title: "Reparacion de Celulares Cerca de Mi en CABA | Team Celular",
  description:
    "Si buscas reparacion de celulares cerca de mi en CABA, atendemos en Recoleta con diagnostico claro, tiempos reales y garantia escrita.",
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
  openGraphTitle: "Reparacion de Celulares Cerca de Mi en CABA | Team Celular",
  openGraphDescription:
    "Laboratorio tecnico en Recoleta para reparar celulares con trazabilidad, garantia por escrito y respuesta comercial rapida.",
  openGraphImageAlt: "Team Celular - Reparacion de celulares cerca de mi en CABA",
  twitterTitle: "Reparacion de Celulares Cerca de Mi en CABA | Team Celular",
  twitterDescription:
    "Consulta por WhatsApp y te orientamos rapido con tiempos y opciones de reparacion reales.",
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
          Reparacion de celulares cerca de mi, con taller en Recoleta
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          Si estas comparando opciones cercanas para reparar tu celular en CABA,
          te damos un proceso claro: diagnostico, presupuesto y reparacion con
          garantia escrita.
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
          Nuestro laboratorio esta en Recoleta, con atencion para barrios cercanos y toda CABA.
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
    </section>
  );
}