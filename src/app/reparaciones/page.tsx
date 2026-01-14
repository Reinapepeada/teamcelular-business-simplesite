import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";

const REPAIR_SERVICES = [
  {
    title: "Cambio de batería",
    description:
      "Baterías originales o certificadas. Diagnóstico y presupuesto rápido. Atención en CABA.",
    href: "/reparaciones/cambio-bateria-caba",
  },
  {
    title: "Cambio de pantalla / módulo display",
    description:
      "Cambio de módulo completo (display + touch) con repuestos premium. CABA.",
    href: "/reparaciones/cambio-pantalla-caba",
  },
  {
    title: "Cambio de pin / ficha de carga",
    description:
      "Problemas de carga, falso contacto o no reconoce cargador. Atención en CABA.",
    href: "/reparaciones/cambio-pin-carga-caba",
  },
  {
    title: "Reparación de placa (microelectrónica)",
    description:
      "Fallas complejas: no enciende, se reinicia, mojado, corto, etc. CABA.",
    href: "/reparaciones/reparacion-placa-caba",
  },
  {
    title: "Cambio de flex (carga / botón encendido)",
    description:
      "Flex de carga, botón power, volumen u otros flex. Diagnóstico y reemplazo. CABA.",
    href: "/reparaciones/cambio-flex-caba",
  },
  {
    title: "Cambio de tapa trasera",
    description:
      "Tapa rota, levantada o marcada. Reemplazo con terminación prolija. CABA.",
    href: "/reparaciones/cambio-tapa-caba",
  },
];

export const metadata: Metadata = {
  title: "Reparaciones de Celulares en CABA | Presupuesto Rápido | Team Celular",
  description:
    "Reparaciones de celulares en CABA (Capital Federal). Cambio de batería, pantalla, pin de carga, flex, tapa trasera y reparación de placa. Presupuesto rápido por WhatsApp o formulario.",
  alternates: { canonical: `${SITE_URL}/reparaciones` },
  openGraph: {
    title: "Reparaciones de Celulares en CABA | Team Celular",
    description:
      "Atención en CABA (Capital Federal). Presupuesto rápido para reparación de celulares: batería, pantalla, pin de carga, flex, tapa trasera y placa.",
    url: `${SITE_URL}/reparaciones`,
    type: "website",
    locale: "es_AR",
    images: [
      {
        url: `${SITE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Team Celular - Reparaciones en CABA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reparaciones de Celulares en CABA | Team Celular",
    description:
      "Atención en CABA (Capital Federal). Presupuesto rápido por WhatsApp o formulario.",
    images: [`${SITE_URL}/opengraph-image.png`],
  },
};

export default function ReparacionesPage() {
  return (
    <section className="w-full max-w-6xl px-6 py-14 md:px-8">
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: `${SITE_URL}/` },
          { name: "Reparaciones", url: `${SITE_URL}/reparaciones` },
        ]}
      />

      <header className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
          Reparaciones de celulares en CABA
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          Taller en Recoleta, con atención para toda{" "}
          <strong>CABA (Capital Federal)</strong>. Trabajamos con{" "}
          <strong>todas las marcas</strong> (iPhone, Samsung, Motorola, Xiaomi y
          más).
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/presupuesto-reparacion#solicitar-presupuesto"
            className="rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
          >
            Pedir presupuesto
          </Link>
          <Link
            href="/contacto"
            className="rounded-full border border-primary/40 px-8 py-4 text-base font-semibold text-primary transition hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:border-primary/60 dark:text-primary/80"
          >
            Ver contacto y ubicación
          </Link>
        </div>
      </header>

      <section className="mt-12 grid gap-6 md:grid-cols-2">
        {REPAIR_SERVICES.map((service) => (
          <Link
            key={service.href}
            href={service.href}
            className="group rounded-2xl border border-white/15 bg-white/5 p-8 shadow-lg backdrop-blur-2xl transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/30"
          >
            <h2 className="text-2xl font-semibold text-slate-900 transition group-hover:text-primary dark:text-white">
              {service.title}
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              {service.description}
            </p>
            <p className="mt-6 text-sm font-semibold text-primary">
              Ver servicio →
            </p>
          </Link>
        ))}
      </section>

      <section className="mt-12 rounded-2xl border border-white/15 bg-white/5 p-8 text-center shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          ¿Querés un presupuesto hoy?
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Contanos marca, modelo y la falla. Te respondemos rápido con opciones
          y tiempos estimados.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link
            href="/presupuesto-reparacion#solicitar-presupuesto"
            className="rounded-full bg-secondary px-8 py-4 font-semibold text-white shadow-lg transition hover:bg-secondary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
          >
            Ir al formulario
          </Link>
          <a
            href="https://wa.me/5491151034595?text=Hola%21%20Quiero%20pedir%20un%20presupuesto%20de%20reparaci%C3%B3n%20en%20CABA."
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-secondary px-8 py-4 font-semibold text-secondary transition hover:bg-secondary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
          >
            WhatsApp directo
          </a>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": `${SITE_URL}/reparaciones#collection`,
            name: "Reparaciones de celulares en CABA",
            url: `${SITE_URL}/reparaciones`,
            about: "Reparación de celulares en Ciudad Autónoma de Buenos Aires (CABA)",
            hasPart: REPAIR_SERVICES.map((s) => ({
              "@type": "WebPage",
              name: s.title,
              url: `${SITE_URL}${s.href}`,
            })),
          }),
        }}
      />
    </section>
  );
}

