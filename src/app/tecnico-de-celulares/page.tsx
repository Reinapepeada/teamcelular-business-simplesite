import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";
const PAGE_URL = `${SITE_URL}/tecnico-de-celulares`;

const faqs = [
  {
    q: "¿Qué hace un técnico de celulares en Team Celular?",
    a: "Realizamos diagnóstico, reparación y test completo del equipo: pantalla, batería, pin de carga, cámaras, audio y microelectrónica (placa) cuando corresponde.",
  },
  {
    q: "¿Atienden en Recoleta o trabajan a distancia?",
    a: "Nuestro taller está en Recoleta (Paraguay 2451). También coordinamos presupuestos online y asistencia por WhatsApp para CABA.",
  },
  {
    q: "¿Entregan garantía por escrito?",
    a: "Sí. Todas las reparaciones incluyen garantía por escrito según el tipo de trabajo y repuesto utilizado.",
  },
  {
    q: "¿Cuánto tarda una reparación típica?",
    a: "Pantalla, batería o pin de carga pueden resolverse en el día según disponibilidad. Placa/microelectrónica requiere diagnóstico y tiempos estimados previos.",
  },
];

export const metadata: Metadata = {
  title: "Técnico de Celulares en Recoleta (CABA) | Team Celular",
  description:
    "Técnico de celulares en Recoleta, CABA. Diagnóstico profesional, reparación de pantalla, batería, pin de carga y microelectrónica con garantía escrita. Presupuesto rápido.",
  keywords: [
    "técnico de celulares",
    "técnico de celulares Recoleta",
    "servicio técnico celulares CABA",
    "arreglo de celulares",
    "reparación de celulares Buenos Aires",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Técnico de Celulares en Recoleta (CABA) | Team Celular",
    description:
      "Técnico de celulares con diagnóstico profesional y garantía escrita. Taller en Recoleta para CABA.",
    url: PAGE_URL,
    type: "website",
    locale: "es_AR",
    images: [
      {
        url: `${SITE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Técnico de celulares en Recoleta - Team Celular",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Técnico de Celulares en Recoleta | Team Celular",
    description:
      "Diagnóstico y reparación de celulares con garantía escrita en CABA.",
    images: [`${SITE_URL}/opengraph-image.png`],
  },
};

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
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
          Técnico de celulares en Recoleta (CABA)
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          Diagnóstico profesional y reparación de celulares con garantía escrita.
          Taller en <strong>Recoleta</strong> para clientes de toda <strong>CABA</strong>.
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
        {[
          {
            title: "Diagnóstico profesional",
            desc: "Chequeo completo de pantalla, batería, carga, cámaras, audio y placa cuando corresponde.",
          },
          {
            title: "Repuestos premium",
            desc: "Opciones originales y alternativas premium con explicación clara de costos y tiempos.",
          },
          {
            title: "Garantía escrita",
            desc: "Todos los trabajos incluyen garantía por escrito con cobertura de repuestos y mano de obra.",
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
          Pantalla, batería, pin de carga, cámaras, audio y microelectrónica.
          Si no sabés qué tiene tu equipo, pedí diagnóstico.
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
