import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import TrackedCtaLink from "@/components/cro/TrackedCtaLink";
import { REVIEW_COST_MESSAGE, WARRANTY_SCOPE_MESSAGE } from "@/lib/copyStandards";
import { buildWebsiteMetadata, getSiteUrl } from "@/lib/seoMetadata";

const SITE_URL = getSiteUrl();
const PAGE_URL = `${SITE_URL}/tecnico-de-celulares`;

const faqs = [
  {
    q: "¿Cuándo conviene un técnico especialista y no solo un arreglo rápido?",
    a: "Cuando el equipo se reinicia, no enciende, tuvo humedad, ya fue abierto o tiene fallas intermitentes. En esos casos priorizamos diagnóstico técnico completo.",
  },
  {
    q: "¿Trabajan placa y microelectrónica?",
    a: "Sí. Hacemos diagnóstico de placa, mediciones y reparación avanzada cuando el caso lo permite. También te damos alternativa si no conviene reparar.",
  },
  {
    q: "¿El diagnóstico técnico tiene costo?",
    a: `Si. ${REVIEW_COST_MESSAGE} Se informa siempre antes de ingresar el equipo.`,
  },
  {
    q: "¿Pueden revisar equipos mal reparados en otro lugar?",
    a: "Sí. Revisamos equipos con intervenciones previas, evaluamos riesgo real y te explicamos con claridad qué se puede recuperar y en qué plazo.",
  },
];

export const metadata: Metadata = buildWebsiteMetadata({
  path: "/tecnico-de-celulares",
  title: "Tecnico de Celulares en Recoleta | Diagnostico Avanzado | Team Celular",
  description:
    "Tecnico especialista en celulares en Recoleta para diagnostico avanzado, placa compleja y segunda opinion tecnica. Ruta para casos inciertos o intervenidos.",
  keywords: [
    "tecnico de celulares recoleta",
    "diagnostico tecnico celular caba",
    "microelectronica celulares buenos aires",
    "reparacion de placa celular",
    "segunda opinion tecnica celular",
  ],
  robots: {
    index: true,
    follow: true,
  },
  languages: {
    "es-AR": "/tecnico-de-celulares",
  },
  openGraphTitle: "Técnico de Celulares en Recoleta (CABA) | Team Celular",
  openGraphDescription:
    "Diagnostico avanzado para fallas complejas de celulares en CABA, con criterio tecnico y seguimiento real.",
  openGraphImageAlt: "Técnico de celulares en Recoleta - Team Celular",
  twitterTitle: "Técnico de Celulares en Recoleta | Team Celular",
  twitterDescription:
    "Diagnostico avanzado de celulares en CABA para placa, humedad y segunda opinion tecnica.",
});

export default function TecnicoDeCelularesPage() {
  const whatsappUrl = `https://wa.me/5491151034595?text=${encodeURIComponent(
    "Hola! Necesito un técnico de celulares en CABA. Marca y modelo:"
  )}`;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${PAGE_URL}#service`,
    name: "Técnico de celulares en Recoleta (CABA)",
    serviceType: "Servicio técnico y reparación de celulares",
    url: PAGE_URL,
    areaServed: [
      { "@type": "City", name: "Recoleta" },
      { "@type": "City", name: "CABA" },
      { "@type": "City", name: "Buenos Aires" },
    ],
    provider: { "@id": `${SITE_URL}#localbusiness` },
    offers: {
      "@type": "Offer",
      priceCurrency: "ARS",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/presupuesto-reparacion`,
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <section className="w-full max-w-6xl px-6 py-14 md:px-8">
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: `${SITE_URL}/` },
          { name: "Técnico de celulares", url: PAGE_URL },
        ]}
      />

      <header className="rounded-2xl border border-white/15 bg-white/5 p-10 text-center shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30 md:p-12">
        <span className="inline-flex rounded-full bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
          Enfoque técnico especialista
        </span>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
          Técnico de celulares en Recoleta para fallas complejas y diagnóstico experto
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          Si ya intentaste reparar y el problema volvió, o si tu equipo tiene
          síntomas de placa, este es el camino correcto. Trabajamos en <strong>Recoleta</strong>
          para clientes de toda <strong>CABA</strong> con criterio técnico real.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <TrackedCtaLink
            href="/presupuesto-reparacion#solicitar-presupuesto"
            ctaName="tecnico_hero_budget"
            ctaLocation="tecnico_hero"
            ctaVariant="primary"
            className="rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-primary/90 hover:shadow-xl"
          >
            Pedir diagnóstico
          </TrackedCtaLink>
          <TrackedCtaLink
            href={whatsappUrl}
            ctaName="tecnico_hero_whatsapp"
            ctaLocation="tecnico_hero"
            ctaVariant="whatsapp"
            external
            target="_blank"
            className="rounded-full border border-emerald-700 bg-emerald-700 px-8 py-4 text-base font-semibold text-white transition hover:bg-emerald-800"
          >
            WhatsApp directo
          </TrackedCtaLink>
        </div>
        <p className="mt-5 text-sm text-slate-600 dark:text-slate-300">
          Si tu falla es puntual (pantalla, batería o carga), podés ir directo a{" "}
          <Link href="/arreglo-de-celulares" className="font-semibold text-primary underline-offset-4 hover:underline">
            Arreglo de celulares
          </Link>
          {" "}o ver el catalogo completo en{" "}
          <Link href="/reparaciones" className="font-semibold text-primary underline-offset-4 hover:underline">
            Reparaciones en CABA
          </Link>
          .
        </p>
      </header>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Diagnóstico profesional",
            desc: "Chequeo técnico por síntomas, historial y pruebas para encontrar la causa raíz, no solo el síntoma.",
          },
          {
            title: "Criterio técnico",
            desc: "Te explicamos si conviene reparar, qué riesgo tiene y qué alternativa te deja mejor resultado costo-beneficio.",
          },
          {
            title: "Trazabilidad y garantía",
            desc: WARRANTY_SCOPE_MESSAGE,
          },
        ].map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-white/15 bg-white/5 p-6 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/30"
          >
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              {item.title}
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              {item.desc}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-10 rounded-2xl border border-white/15 bg-white/5 p-8 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Servicios que resolvemos
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Trabajamos fallas comunes y casos de mayor complejidad técnica. Si no
          estás seguro de la falla, empezamos por diagnóstico y plan de acción.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            "Cambio de pantalla / módulo display",
            "Cambio de batería y calibración",
            "Reparación de pin de carga",
            "Cámaras, audio y sensores",
            "Microelectrónica (placa)",
            "Diagnóstico avanzado",
          ].map((service) => (
            <div
              key={service}
              className="rounded-xl border border-white/10 bg-white/10 p-5 text-sm text-slate-700 dark:border-white/5 dark:bg-slate-900/40 dark:text-slate-300"
            >
              {service}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-white/15 bg-white/5 p-6 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          Elegí la ruta correcta según tu caso
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Si tu problema es puntual y ya sabés la falla, podés ahorrar tiempo con
          la landing general. Si es un caso incierto o complejo, seguí por diagnóstico.
        </p>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          {REVIEW_COST_MESSAGE}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <TrackedCtaLink
            href="/reparaciones"
            ctaName="tecnico_route_reparaciones"
            ctaLocation="tecnico_route_selector"
            ctaVariant="secondary"
            className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary dark:border-slate-600 dark:text-slate-200"
          >
            Ver servicios por falla
          </TrackedCtaLink>
          <TrackedCtaLink
            href="/arreglo-de-celulares"
            ctaName="tecnico_route_arreglo"
            ctaLocation="tecnico_route_selector"
            ctaVariant="secondary"
            className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary dark:border-slate-600 dark:text-slate-200"
          >
            Ir a arreglo general
          </TrackedCtaLink>
          <TrackedCtaLink
            href="/reparaciones/reparacion-placa-caba"
            ctaName="tecnico_route_board"
            ctaLocation="tecnico_route_selector"
            ctaVariant="secondary"
            className="rounded-full border border-primary/40 px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/10"
          >
            Ver reparación de placa
          </TrackedCtaLink>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-white/15 bg-white/5 p-8 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Preguntas frecuentes
        </h2>
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
