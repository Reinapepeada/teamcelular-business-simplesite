import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";
const ZONE_NAME = "Belgrano";
const PAGE_URL = `${SITE_URL}/zonas/belgrano`;

const highlights = [
  {
    title: "Pantalla (vidrio / OLED / LCD)",
    desc: "Pantalla rota, sin imagen o con líneas. Reemplazo con repuestos premium y prueba de funcionamiento.",
  },
  {
    title: "Batería y diagnóstico",
    desc: "Batería degradada, equipo que se apaga o se calienta. Confirmamos causa y te damos opciones.",
  },
  {
    title: "Carga y conectores",
    desc: "Pin/ficha de carga, flex y conectores. Solución prolija para evitar falsos contactos.",
  },
];

const localNotes = [
  "Muchos arreglos salen por pantalla y batería (iPhone y Samsung) con entrega en el día según stock.",
  "En equipos con uso intenso, vemos conectores de carga desgastados y flex dañados.",
  "Cuando hay golpes fuertes o humedad, puede requerir diagnóstico de placa (microelectrónica).",
];

const faqs = [
  {
    q: `¿Reparan celulares para ${ZONE_NAME} (CABA)?`,
    a: "Sí. Atendemos clientes de Belgrano todos los días hábiles. Podés venir al taller o pedir presupuesto por WhatsApp/formulario.",
  },
  {
    q: `¿Cómo conviene venir desde ${ZONE_NAME}?`,
    a: "Suele ser cómodo usar Subte D hacia Callao y caminar unas cuadras hasta Paraguay 2451 (Recoleta). También hay varias líneas de colectivo.",
  },
  {
    q: "¿Hacen trabajos de microelectrónica?",
    a: "Sí. Diagnóstico y reparación de placa para fallas complejas: no enciende, reinicios, mojado, corto y más.",
  },
  {
    q: "¿El presupuesto tiene costo?",
    a: "No. Te pasamos un presupuesto estimado con la info disponible; si hace falta diagnóstico físico, te lo indicamos antes de avanzar.",
  },
];

export const metadata: Metadata = {
  title: `Arreglo de Celulares en ${ZONE_NAME} (CABA) | Team Celular`,
  description: `Arreglo de celulares para ${ZONE_NAME}, CABA: pantalla, batería, carga y diagnóstico de placa. Taller en Recoleta con garantía por escrito y presupuesto rápido.`,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: `Arreglo de Celulares en ${ZONE_NAME} (CABA) | Team Celular`,
    description:
      "Pantalla, batería, carga y microelectrónica. Presupuesto rápido por WhatsApp o formulario, con garantía por escrito.",
    url: PAGE_URL,
    type: "website",
    locale: "es_AR",
    images: [
      {
        url: `${SITE_URL}/opengraph-image.png`,
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
    images: [`${SITE_URL}/opengraph-image.png`],
  },
};

export default function ZonaBelgranoPage() {
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
          Si estás en {ZONE_NAME} y buscás{" "}
          <strong>arreglo de celulares</strong>, te ayudamos con pantalla,
          batería, carga y reparación de placa. Taller en{" "}
          <strong>Recoleta</strong> y <strong>garantía por escrito</strong>.
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
          Lo que más reparamos para {ZONE_NAME}
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-300">
          {localNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
        <p className="mt-5 text-slate-600 dark:text-slate-300">
          Te pasamos tiempos y precio estimado según la falla y el modelo.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-white/15 bg-white/5 p-8 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Cómo llegar desde {ZONE_NAME}
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Estamos en Paraguay 2451 (Recoleta). Desde {ZONE_NAME} suele ser rápido
          venir por Subte D hasta Callao y caminar. Si venís en auto, te
          recomendamos salir con tiempo por el tránsito.
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

