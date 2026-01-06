import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";
const SERVICE_URL = `${SITE_URL}/reparaciones/cambio-bateria-caba`;

const faqs = [
  {
    q: "¿Cuánto tarda el cambio de batería?",
    a: "Depende del modelo y del estado del equipo. En muchos casos se resuelve en el día. Te confirmamos tiempos con el presupuesto.",
  },
  {
    q: "¿Trabajan con todas las marcas?",
    a: "Sí. iPhone, Samsung, Motorola, Xiaomi y más. Si tu modelo es poco común, te confirmamos disponibilidad al momento de cotizar.",
  },
  {
    q: "¿Qué garantía tiene el cambio de batería?",
    a: "Entregamos garantía escrita. El plazo depende del repuesto y del equipo; te lo detallamos en el presupuesto.",
  },
  {
    q: "¿La batería se descarga rápido pero carga bien: igual conviene cambiarla?",
    a: "Muchas veces sí. Hacemos diagnóstico para confirmar si el problema es batería, consumo anormal (software) o placa.",
  },
];

export const metadata: Metadata = {
  title: "Cambio de Batería en CABA | Repuestos Certificados | Team Celular",
  description:
    "Cambio de batería en CABA (Capital Federal). Repuestos certificados, garantía escrita y presupuesto rápido. iPhone, Samsung, Motorola, Xiaomi y más.",
  keywords: [
    "cambio de batería CABA",
    "reemplazo batería Capital Federal",
    "cambio batería iPhone CABA",
    "cambio batería Samsung CABA",
    "batería celular se descarga rápido",
  ],
  alternates: { canonical: SERVICE_URL },
  openGraph: {
    title: "Cambio de Batería en CABA | Team Celular",
    description:
      "Cambio de batería en CABA (Capital Federal). Presupuesto rápido y garantía escrita.",
    url: SERVICE_URL,
    type: "website",
    locale: "es_AR",
    images: [
      {
        url: `${SITE_URL}/images/teamcelular.webp`,
        width: 1200,
        height: 630,
        alt: "Cambio de batería en CABA - Team Celular",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cambio de Batería en CABA | Team Celular",
    description: "Presupuesto rápido y garantía escrita.",
    images: [`${SITE_URL}/images/teamcelular.webp`],
  },
};

export default function CambioBateriaCabaPage() {
  const whatsappUrl = `https://wa.me/5491151034595?text=${encodeURIComponent(
    "Hola! Quiero un presupuesto para cambio de batería en CABA. Marca y modelo:"
  )}`;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SERVICE_URL}#service`,
    name: "Cambio de batería en CABA",
    serviceType: "Cambio de batería / reemplazo de batería",
    description:
      "Cambio de batería para celulares en CABA (Capital Federal) con repuestos certificados y garantía escrita.",
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Ciudad Autónoma de Buenos Aires (CABA)",
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
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section className="w-full max-w-6xl px-6 py-14 md:px-8">
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: `${SITE_URL}/` },
          { name: "Reparaciones", url: `${SITE_URL}/reparaciones` },
          { name: "Cambio de batería (CABA)", url: SERVICE_URL },
        ]}
      />

      <header className="rounded-2xl border border-white/15 bg-white/5 p-10 text-center shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30 md:p-12">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
          Cambio de batería en CABA
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          Si tu batería dura poco, se apaga con porcentaje o se calienta, te
          hacemos diagnóstico y te damos un presupuesto rápido. Atención en{" "}
          <strong>CABA (Capital Federal)</strong>. Taller en Recoleta.
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
        </div>
      </header>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Diagnóstico claro",
            desc: "Confirmamos si es batería, software o consumo anormal. Sin vueltas.",
          },
          {
            title: "Repuestos certificados",
            desc: "Opciones según equipo y necesidad: original / premium / certificada.",
          },
          {
            title: "Garantía escrita",
            desc: "Te entregamos garantía por escrito según el servicio y repuesto.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-white/15 bg-white/5 p-6 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/30"
          >
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              {item.title}
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              {item.desc}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-10 rounded-2xl border border-white/15 bg-white/5 p-8 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Marcas que trabajamos
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Trabajamos con <strong>todas las marcas</strong>. Entre las más
          comunes:
        </p>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          iPhone, Samsung, Motorola, Xiaomi, Huawei, OnePlus, Google Pixel, LG,
          entre otras.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-white/15 bg-white/5 p-8 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Preguntas frecuentes
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {faqs.map((f) => (
            <article
              key={f.q}
              className="rounded-xl border border-white/10 bg-white/10 p-5 text-sm leading-relaxed text-slate-700 dark:border-white/5 dark:bg-slate-900/40 dark:text-slate-300"
            >
              <h3 className="font-semibold text-primary">{f.q}</h3>
              <p className="mt-2">{f.a}</p>
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

