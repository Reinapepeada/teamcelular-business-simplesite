import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";
const PAGE_URL = `${SITE_URL}/zonas`;

const ZONES = [
  {
    slug: "recoleta",
    name: "Recoleta",
    description:
      "Arreglo de celulares en Recoleta (taller en Paraguay 2451): pantalla, batería, carga y microelectrónica con garantía escrita.",
  },
  {
    slug: "palermo",
    name: "Palermo",
    description:
      "Arreglo de celulares para Palermo: pantalla, batería, carga y placa. Taller en Recoleta y presupuesto rápido.",
  },
  {
    slug: "belgrano",
    name: "Belgrano",
    description:
      "Reparación de celulares para Belgrano: iPhone y Android. Garantía por escrito y tiempos estimados claros.",
  },
  {
    slug: "caballito",
    name: "Caballito",
    description:
      "Servicio técnico para Caballito: diagnóstico, repuestos premium y microelectrónica para fallas complejas.",
  },
  {
    slug: "almagro",
    name: "Almagro",
    description:
      "Arreglo de celulares para Almagro: cambio de pantalla, batería y pin de carga. Atención en CABA.",
  },
  {
    slug: "balvanera",
    name: "Balvanera",
    description:
      "Reparación de celulares para Balvanera/Once: soluciones rápidas y avanzadas con garantía escrita.",
  },
  {
    slug: "microcentro",
    name: "Microcentro",
    description:
      "Arreglo de celulares para Microcentro: presupuesto rápido y coordinación simple para equipos de trabajo.",
  },
];

export const metadata: Metadata = {
  title: "Zonas de Servicio en CABA | Arreglo de Celulares | Team Celular",
  description:
    "Zonas de servicio de Team Celular en CABA: Palermo, Belgrano, Caballito, Almagro, Balvanera y Microcentro. Taller en Recoleta con garantía escrita y presupuesto rápido.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Zonas de Servicio en CABA | Team Celular",
    description:
      "Arreglo de celulares en CABA por zonas. Taller en Recoleta con garantía escrita y presupuesto rápido.",
    url: PAGE_URL,
    type: "website",
    locale: "es_AR",
    images: [
      {
        url: `${SITE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Team Celular - Zonas de servicio en CABA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zonas de Servicio en CABA | Team Celular",
    description:
      "Arreglo de celulares por zonas en CABA. Presupuesto rápido por WhatsApp o formulario.",
    images: [`${SITE_URL}/opengraph-image.png`],
  },
};

export default function ZonasPage() {
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${PAGE_URL}#collection`,
    name: "Zonas de servicio en CABA",
    url: PAGE_URL,
    about: "Arreglo y reparación de celulares en CABA por zonas",
    hasPart: ZONES.map((zone) => ({
      "@type": "WebPage",
      name: `Arreglo de celulares en ${zone.name} (CABA)`,
      url: `${SITE_URL}/zonas/${zone.slug}`,
    })),
  };

  return (
    <section className="w-full max-w-6xl px-6 py-14 md:px-8">
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: `${SITE_URL}/` },
          { name: "Zonas", url: PAGE_URL },
        ]}
      />

      <header className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
          Zonas de servicio en CABA
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          Estamos en <strong>Recoleta</strong> y atendemos consultas y
          reparaciones para toda <strong>CABA</strong>. Estas páginas te ayudan a
          encontrar rápido lo que necesitás según tu zona.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/arreglo-de-celulares"
            className="rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:shadow-xl"
          >
            Ver arreglo de celulares
          </Link>
          <Link
            href="/presupuesto-reparacion#solicitar-presupuesto"
            className="rounded-full border border-primary/40 px-8 py-4 text-base font-semibold text-primary transition hover:bg-primary/10 dark:border-primary/60 dark:text-primary/80"
          >
            Pedir presupuesto
          </Link>
        </div>
      </header>

      <section className="mt-12 grid gap-6 md:grid-cols-2">
        {ZONES.map((zone) => (
          <Link
            key={zone.slug}
            href={`/zonas/${zone.slug}`}
            className="group rounded-2xl border border-white/15 bg-white/5 p-8 shadow-lg backdrop-blur-2xl transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/30"
          >
            <h2 className="text-2xl font-semibold text-slate-900 transition group-hover:text-primary dark:text-white">
              {zone.name}
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              {zone.description}
            </p>
            <p className="mt-6 text-sm font-semibold text-primary">
              Ver detalles →
            </p>
          </Link>
        ))}
      </section>

      <section className="mt-12 rounded-2xl border border-white/15 bg-white/5 p-8 text-center shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          ¿Querés resolverlo hoy?
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Contanos marca, modelo y falla. Te respondemos con opciones y tiempos
          estimados.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link
            href="/presupuesto-reparacion#solicitar-presupuesto"
            className="rounded-full bg-secondary px-8 py-4 font-semibold text-white shadow-lg transition hover:bg-secondary/90"
          >
            Ir al formulario
          </Link>
          <a
            href="https://wa.me/5491151034595?text=Hola%21%20Quiero%20pedir%20un%20presupuesto%20de%20reparaci%C3%B3n%20en%20CABA."
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-secondary px-8 py-4 font-semibold text-secondary transition hover:bg-secondary/10"
          >
            WhatsApp directo
          </a>
          <Link
            href="/contacto"
            className="rounded-full border border-slate-300 px-8 py-4 font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-white/15 dark:text-slate-200 dark:hover:bg-white/10"
          >
            Ver ubicación
          </Link>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
    </section>
  );
}
