import type { Metadata } from "next";
import Link from "next/link";
import { FaMapMarkedAlt, FaPhoneAlt } from "react-icons/fa";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { getBranch, whatsappUrl as buildWhatsappUrl } from "@/lib/businessProfile";
import BranchMap from "@/components/cards/BranchMap";
import GoogleReviewsAPI from "@/components/cards/GoogleReviewsAPI";

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";
const PAGE_URL = `${SITE_URL}/sucursales`;

export const metadata: Metadata = {
  title: "Sucursales Team Celular en CABA | Recoleta y Belgrano",
  description:
    "Sucursales Team Celular en CABA: Paraguay 2451, Recoleta, y Amenábar 2032, Belgrano. Consultá repuesto y plazo antes de acercarte.",
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
  const recoleta = getBranch("recoleta");
  const belgrano = getBranch("belgrano");
  const whatsappUrl = buildWhatsappUrl(
    "Hola Team Celular, quiero coordinar atencion en sucursal.",
  );

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
      {
        "@type": "WebPage",
        name: "Sucursal Belgrano",
        url: `${SITE_URL}/sucursales/caba/belgrano`,
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

      <header className="relative overflow-hidden text-white py-6 md:py-10">
        <div
          aria-hidden
          className="hidden"
        />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="inline-flex rounded-full border border-white/35 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/90">
            Presencia local real
          </p>
          <h1 className="tc-display mt-4">
            Sucursales Team Celular en CABA
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-[#a1a1a6]">
            Team Celular tiene dos sucursales en CABA: Paraguay 2451 en Recoleta y
            Amenábar 2032 en Belgrano. Presupuesto previo, garantía escrita de
            90 días y atención de lunes a viernes 10:30–18:00.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/sucursales/caba/recoleta"
              className="tc-btn tc-btn-primary"
            >
              Ver ficha Recoleta
            </Link>
            <Link
              href="/sucursales/caba/belgrano"
              className="tc-btn tc-btn-ghost"
            >
              Ver ficha Belgrano
            </Link>
            <Link
              href="/contacto"
              className="tc-btn tc-btn-ghost"
            >
              Ver mapa y contacto
            </Link>
          </div>
        </div>
      </header>

      <section className="mt-8 grid gap-6 md:grid-cols-2">
        <article className="bg-[#1d1d1f] rounded-[28px] p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary dark:text-secondary">
            Sucursal 1
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-[#f5f5f7]">
            Recoleta (CABA)
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-[#86868b]">
            Paraguay 2451 · Lun–Vie 10:30–18:00
          </p>
          <p className="mt-3 text-slate-600 dark:text-[#a1a1a6]">
            Laboratorio principal: pantalla, batería, carga y trabajos de placa bajo microscopio. También tablets y notebooks. Confirmamos repuesto y plazo antes de avanzar.
          </p>
          <a href={`tel:${recoleta.phone.replace(/[^\d+]/g, "")}`} className="tc-link mt-3 inline-flex min-h-11 items-center gap-2">
            <FaPhoneAlt aria-hidden className="shrink-0" /> {recoleta.phone}
          </a>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/sucursales/caba/recoleta"
              className="tc-btn tc-btn-primary"
            >
              Ver ficha de sucursal
            </Link>
            <a
              href={buildWhatsappUrl(recoleta.whatsappText, recoleta.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-emerald-600/50 px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50 dark:text-emerald-300 dark:hover:bg-emerald-500/10"
            >
              Cotizar en Recoleta
            </a>
            <a href={recoleta.mapUrl} target="_blank" rel="noopener noreferrer" className="tc-link inline-flex min-h-11 items-center underline underline-offset-4">Cómo llegar a Recoleta</a>
          </div>
        </article>

        <article className="bg-[#1d1d1f] rounded-[28px] p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
            Sucursal 2
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-[#f5f5f7]">
            Belgrano (CABA)
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-[#86868b]">
            Amenábar 2032 · Lun–Vie 10:30–18:00
          </p>
          <p className="mt-3 text-slate-600 dark:text-[#a1a1a6]">
            Pantalla, batería, carga, placa y recuperación por agua. Consultá repuesto y plazo antes de acercarte. Garantía escrita de 90 días.
          </p>
          <a href={`tel:${belgrano.phone.replace(/[^\d+]/g, "")}`} className="tc-link mt-3 inline-flex min-h-11 items-center gap-2">
            <FaPhoneAlt aria-hidden className="shrink-0" /> {belgrano.phone}
          </a>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/sucursales/caba/belgrano"
              className="tc-btn tc-btn-primary"
            >
              Ver ficha de sucursal
            </Link>
            <a
              href={buildWhatsappUrl(belgrano.whatsappText, belgrano.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-emerald-600/50 px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50 dark:text-emerald-300 dark:hover:bg-emerald-500/10"
            >
              Cotizar en Belgrano
            </a>
            <a href={belgrano.mapUrl} target="_blank" rel="noopener noreferrer" className="tc-link inline-flex min-h-11 items-center underline underline-offset-4">Cómo llegar a Belgrano</a>
          </div>
        </article>
      </section>

      <nav
        aria-label="Cómo llegar desde otros barrios"
        className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm"
      >
        <span className="inline-flex items-center gap-2 text-[#a1a1a6]">
          <FaMapMarkedAlt aria-hidden="true" />
          ¿Venís desde otro barrio?
        </span>
        <Link href="/zonas/palermo" className="tc-link inline-flex min-h-11 items-center underline underline-offset-4">
          Desde Palermo
        </Link>
        <Link href="/zonas/balvanera" className="tc-link inline-flex min-h-11 items-center underline underline-offset-4">
          Desde Balvanera / Once
        </Link>
      </nav>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <BranchMap
          address={`${recoleta.street}, ${recoleta.neighborhood}, CABA`}
          name={recoleta.shortName}
        />
        <BranchMap
          address={`${belgrano.street}, ${belgrano.neighborhood}, CABA`}
          name={belgrano.shortName}
        />
      </section>

      <section className="mt-10">
        <GoogleReviewsAPI />
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
    </section>
  );
}
