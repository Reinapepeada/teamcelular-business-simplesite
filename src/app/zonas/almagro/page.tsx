import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";
const ZONE_NAME = "Almagro";
const PAGE_URL = `${SITE_URL}/zonas/almagro`;

const highlights = [
  {
    title: "Pantalla y vidrio",
    desc: "Roturas por caída, líneas o touch que falla. Cambio de módulo y control de calidad antes de entregar.",
  },
  {
    title: "Batería",
    desc: "Dura poco, se apaga o se calienta. Diagnóstico para confirmar si es batería, software o consumo anormal.",
  },
  {
    title: "Pin de carga",
    desc: "No carga, carga lento o intermitente. Solución de conector/flex según el equipo.",
  },
];

const localNotes = [
  "Muchos arreglos salen por pantalla y batería en el día (según modelo y stock).",
  "En equipos con carga intermitente, suele ser pin sucio/desgastado o flex.",
  "Cuando el equipo se mojó o tuvo corto, hacemos diagnóstico de placa (microelectrónica).",
];

const faqs = [
  {
    q: `¿Atienden arreglos de celulares para ${ZONE_NAME}?`,
    a: "Sí. Nuestro taller está en Recoleta y atendemos clientes de Almagro. Podés pedir presupuesto por WhatsApp o formulario.",
  },
  {
    q: `¿Cómo llego desde ${ZONE_NAME} al taller?`,
    a: "Una opción práctica es Subte B hasta Callao (zona Corrientes) y luego caminar o combinar con colectivo hacia Paraguay 2451. En contacto tenés el mapa.",
  },
  {
    q: "¿Trabajan iPhone y Android?",
    a: "Sí. iPhone, Samsung, Motorola, Xiaomi y más. Si tu modelo es poco común, confirmamos disponibilidad de repuesto al cotizar.",
  },
  {
    q: "¿Qué incluye el presupuesto?",
    a: "Incluye detalle del repuesto, mano de obra y tiempos estimados. Si requiere diagnóstico físico, te avisamos antes de avanzar.",
  },
];

export const metadata: Metadata = {
  title: `Arreglo de Celulares en ${ZONE_NAME} (CABA) | Team Celular`,
  description: `Arreglo de celulares para ${ZONE_NAME}, CABA: pantalla, batería y pin de carga. Taller en Recoleta con garantía por escrito y presupuesto rápido.`,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: `Arreglo de Celulares en ${ZONE_NAME} (CABA) | Team Celular`,
    description:
      "Pantalla, batería y carga. Presupuesto rápido por WhatsApp o formulario, con garantía por escrito.",
    url: PAGE_URL,
    type: "website",
    locale: "es_AR",
    images: [
      {
        url: `${SITE_URL}/images/teamcelular.webp`,
        width: 1200,
        height: 630,
        alt: `Team Celular - Arreglo de celulares en ${ZONE_NAME} (CABA)`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Arreglo de Celulares en ${ZONE_NAME} (CABA) | Team Celular`,
    description:
      "Arreglo de celulares con garantía escrita. Presupuesto rápido por WhatsApp o formulario.",
    images: [`${SITE_URL}/images/teamcelular.webp`],
  },
};

export default function ZonaAlmagroPage() {
  const whatsappUrl = `https://wa.me/5491151034595?text=${encodeURIComponent(
    `Hola! Quiero un presupuesto para arreglo de celular desde ${ZONE_NAME}. Marca y modelo:`
  )}`;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${PAGE_URL}#service`,
    name: `Arreglo de celulares en ${ZONE_NAME} (CABA)`,
    serviceType: "Reparación de celulares",
    url: PAGE_URL,
    areaServed: [
      { "@type": "City", name: ZONE_NAME },
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
          { name: "Zonas", url: `${SITE_URL}/zonas` },
          { name: ZONE_NAME, url: PAGE_URL },
        ]}
      />

      <header className="rounded-2xl border border-white/15 bg-white/5 p-10 text-center shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30 md:p-12">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
          Arreglo de celulares para {ZONE_NAME} (CABA)
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          Para {ZONE_NAME} y alrededores: pantalla, batería, carga y diagnóstico
          profesional. Taller en <strong>Recoleta</strong> con{" "}
          <strong>garantía por escrito</strong> y presupuesto rápido.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/presupuesto-reparacion#solicitar-presupuesto"
            className="rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:shadow-xl"
          >
            Pedir presupuesto
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-primary/40 px-8 py-4 text-base font-semibold text-primary transition hover:bg-primary/10 dark:border-primary/60 dark:text-primary/80"
          >
            WhatsApp directo
          </a>
          <Link
            href="/contacto"
            className="rounded-full border border-secondary/50 px-8 py-4 text-base font-semibold text-secondary transition hover:bg-secondary/10"
          >
            Ver ubicación
          </Link>
        </div>
      </header>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        {highlights.map((h) => (
          <article
            key={h.title}
            className="rounded-2xl border border-white/15 bg-white/5 p-6 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/30"
          >
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              {h.title}
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">{h.desc}</p>
          </article>
        ))}
      </section>

      <section className="mt-10 rounded-2xl border border-white/15 bg-white/5 p-8 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Reparaciones comunes desde {ZONE_NAME}
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-300">
          {localNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
        <p className="mt-5 text-slate-600 dark:text-slate-300">
          Si tu caso es distinto, igual te orientamos: contanos marca, modelo y
          síntomas.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-white/15 bg-white/5 p-8 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Cómo llegar desde {ZONE_NAME}
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Estamos en Paraguay 2451 (Recoleta). Desde {ZONE_NAME} podés llegar en
          subte/colectivo. Para la ruta exacta desde tu dirección, usá el mapa en
          contacto.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            href="/contacto"
            className="rounded-full bg-secondary px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-secondary/90"
          >
            Ver mapa y cómo llegar
          </Link>
          <Link
            href="/arreglo-de-celulares"
            className="rounded-full border border-secondary/50 px-6 py-3 font-semibold text-secondary transition hover:bg-secondary/10"
          >
            Ver servicios
          </Link>
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
              <h3 className="font-semibold text-primary">{faq.q}</h3>
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

