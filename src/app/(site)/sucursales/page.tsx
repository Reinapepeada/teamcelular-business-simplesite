import type { Metadata } from "next";
import Link from "next/link";
import { FaMapMarkedAlt, FaPhoneAlt, FaRegClock } from "react-icons/fa";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import StickyLocalCta from "@/components/cro/StickyLocalCta";

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";
const PAGE_URL = `${SITE_URL}/sucursales`;

export const metadata: Metadata = {
  title: "Sucursales Team Celular en CABA",
  description:
    "Conoce las sucursales de Team Celular. Servicio tecnico de celulares, tablets y notebooks con taller principal en Recoleta, CABA.",
  alternates: {
    canonical: PAGE_URL,
    languages: {
      "es-AR": PAGE_URL,
    },
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Sucursales Team Celular en CABA",
    description:
      "Ubicaciones oficiales de Team Celular para diagnostico y reparacion.",
    url: PAGE_URL,
    type: "website",
    locale: "es_AR",
    images: [
      {
        url: `${SITE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Sucursales Team Celular",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sucursales Team Celular en CABA",
    description: "Ubicaciones oficiales para reparacion y soporte tecnico.",
    images: [`${SITE_URL}/opengraph-image.png`],
  },
};

export default function SucursalesPage() {
  const whatsappUrl =
    "https://wa.me/5491151034595?text=Hola%20Team%20Celular,%20quiero%20coordinar%20atencion%20en%20sucursal";

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${PAGE_URL}#collection`,
    name: "Sucursales Team Celular",
    url: PAGE_URL,
    hasPart: [
      {
        "@type": "WebPage",
        name: "Sucursal Recoleta",
        url: `${SITE_URL}/sucursales/caba/recoleta`,
      },
    ],
  };

  return (
    <section className="w-full max-w-6xl px-6 py-14 pb-28 md:px-8 md:pb-20">
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: `${SITE_URL}/` },
          { name: "Sucursales", url: PAGE_URL },
        ]}
      />

      <header className="relative overflow-hidden rounded-3xl border border-white/15 bg-slate-900 p-8 text-white shadow-2xl md:p-12">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(14,165,233,0.32),transparent_40%),radial-gradient(circle_at_80%_86%,rgba(16,185,129,0.25),transparent_38%)]"
        />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="inline-flex rounded-full border border-white/35 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/90">
            Presencia local real
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Sucursales Team Celular
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-slate-100/90">
            Estas son las ubicaciones oficiales para atencion, diagnostico y
            reparacion. Nuestro laboratorio principal esta en Recoleta y atiende
            clientes de toda CABA.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/sucursales/caba/recoleta"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Ver ficha Recoleta
            </Link>
            <Link
              href="/contacto"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Ver mapa y contacto
            </Link>
          </div>
        </div>
      </header>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-white/15 bg-white/5 p-5 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/30">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
            <FaMapMarkedAlt className="text-primary" />
            Direccion
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Paraguay 2451, Recoleta, CABA.
          </p>
        </article>
        <article className="rounded-2xl border border-white/15 bg-white/5 p-5 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/30">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
            <FaRegClock className="text-primary" />
            Horario
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Lunes a viernes de 10:30 a 18:00 hs.
          </p>
        </article>
        <article className="rounded-2xl border border-white/15 bg-white/5 p-5 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/30">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
            <FaPhoneAlt className="text-primary" />
            Contacto
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">+54 11 5103-4595</p>
        </article>
      </section>

      <section className="mt-8 grid gap-6">
        <article className="rounded-2xl border border-white/15 bg-white/5 p-8 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
            Recoleta (CABA)
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            Sucursal con atencion integral para pantalla, bateria, carga y
            microelectronica. Tambien trabajamos tablets y notebooks.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/sucursales/caba/recoleta"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary/90"
            >
              Ver ficha de sucursal
            </Link>
            <Link
              href="/reparaciones"
              className="rounded-full border border-secondary/50 px-6 py-3 text-sm font-semibold text-secondary transition hover:bg-secondary/10"
            >
              Ver servicios
            </Link>
            <Link
              href="/zonas"
              className="rounded-full border border-primary/40 px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10"
            >
              Ver zonas atendidas
            </Link>
          </div>
        </article>
      </section>

      <StickyLocalCta
        whatsappUrl={whatsappUrl}
        budgetHref="/presupuesto-reparacion#solicitar-presupuesto"
        phoneHref="tel:+541151034595"
        primaryLabel="Reservar"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
    </section>
  );
}
