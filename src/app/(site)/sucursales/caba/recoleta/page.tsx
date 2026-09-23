import type { Metadata } from "next";
import Link from "next/link";
import {
  FaMapMarkerAlt,
  FaRegClock,
  FaShieldAlt,
  FaTools,
  FaUserCheck,
} from "react-icons/fa";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { getBranch, whatsappUrl as buildWhatsappUrl } from "@/lib/businessProfile";
import BranchMap from "@/components/cards/BranchMap";
import GoogleReviewsAPI from "@/components/cards/GoogleReviewsAPI";

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";
const PAGE_URL = `${SITE_URL}/sucursales/caba/recoleta`;

const faqs = [
  {
    q: "¿Dónde está la sucursal Recoleta?",
    a: "En Paraguay 2451, Recoleta, a unas cuadras de Santa Fe y Pueyrredón.",
  },
  {
    q: "¿Qué horario tiene la sucursal?",
    a: "De lunes a viernes de 10:30 a 18:00, sin turno.",
  },
  {
    q: "¿Puedo pedir presupuesto por WhatsApp antes de ir?",
    a: "Sí. Mandanos marca, modelo y qué le pasa, y te respondemos en hasta 2 horas hábiles con precio y si hay repuesto.",
  },
  {
    q: "¿Atienden gente de otros barrios?",
    a: "Sí. Viene gente de toda CABA; si te queda más cerca Belgrano, tenemos sucursal en Amenábar 2032.",
  },
  {
    q: "¿Dan garantía escrita?",
    a: "Sí. Cada reparación se entrega con garantía escrita de 90 días sobre trabajo y repuesto instalado.",
  },
];

const trustSignals = [
  {
    title: "El laboratorio está acá",
    desc: "Es el laboratorio principal: acá se hacen los trabajos de placa y reballing bajo microscopio.",
    Icon: FaTools,
  },
  {
    title: "Garantía escrita",
    desc: "Cada trabajo sale con garantía escrita de 90 días sobre trabajo y repuesto instalado.",
    Icon: FaShieldAlt,
  },
  {
    title: "Seguimiento directo",
    desc: "Te avisamos por WhatsApp cuando está listo o si aparece algo que no estaba en el presupuesto.",
    Icon: FaUserCheck,
  },
];

export const metadata: Metadata = {
  title: "Reparación de Celulares en Recoleta CABA | Team Celular",
  description:
    "Team Celular en Paraguay 2451, Recoleta: pantalla, batería y carga el mismo día, sin turno. Lunes a viernes 10:30–18:00, garantía escrita 90 días.",
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
    title: "Reparación de Celulares en Recoleta CABA | Team Celular",
    description:
      "Team Celular, Paraguay 2451 Recoleta CABA. Pantalla, batería y carga el mismo día, diagnóstico técnico y garantía escrita 90 días. Lun–Vie 10:30–18:00.",
    url: PAGE_URL,
    type: "website",
    locale: "es_AR",
    images: [
      {
        url: `${SITE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Sucursal Recoleta Team Celular",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reparación de Celulares en Recoleta CABA | Team Celular",
    description:
      "Team Celular, Paraguay 2451 Recoleta CABA. Pantalla y batería el mismo día, garantía escrita 90 días. Lun–Vie 10:30–18:00.",
    images: [`${SITE_URL}/opengraph-image.png`],
  },
};

export default function SucursalRecoletaPage() {
  const branch = getBranch("recoleta");
  const whatsappUrl = buildWhatsappUrl(branch.whatsappText, branch.whatsapp);

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${PAGE_URL}#localbusiness`,
    additionalType: ["https://schema.org/ElectronicsStore", "https://schema.org/ProfessionalService"],
    parentOrganization: { "@id": `${SITE_URL}#organization` },
    priceRange: "$$",
    name: branch.name,
    url: PAGE_URL,
    telephone: branch.phone,
    email: "teamcelular.arg@gmail.com",
    image: `${SITE_URL}/opengraph-image.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: branch.street,
      addressLocality: branch.neighborhood,
      addressRegion: branch.region,
      postalCode: branch.postalCode,
      addressCountry: branch.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: branch.latitude,
      longitude: branch.longitude,
    },
    hasMap: branch.mapUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:30",
        closes: "18:00",
      },
    ],
    areaServed: [
      { "@type": "AdministrativeArea", name: "Ciudad Autonoma de Buenos Aires" },
    ],
    sameAs: [
      "https://www.instagram.com/teamcelular.ar/",
      "https://www.facebook.com/TeamCelular/",
    ],
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
    <section className="w-full max-w-6xl px-6 py-14 pb-28 md:px-8 md:pb-20">
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: `${SITE_URL}/` },
          { name: "Sucursales", url: `${SITE_URL}/sucursales` },
          { name: "Recoleta", url: PAGE_URL },
        ]}
      />

      <header className="relative overflow-hidden text-white py-6 md:py-10">
        <div
          aria-hidden
          className="hidden"
        />
        <div
          aria-hidden
          className="hidden"
        />
        <div className="relative z-10 grid gap-8 md:grid-cols-5">
          <div className="space-y-5 md:col-span-3">
            <p className="inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white/90">
              Sucursal oficial Team Celular
            </p>
            <h1 className="tc-display">
              Reparación de celulares en Recoleta CABA
            </h1>
            <p className="text-lg leading-relaxed text-[#a1a1a6]">
              Team Celular, en Paraguay 2451 Recoleta, repara celulares con diagnóstico
              el mismo día, pantalla y batería en 2–4 h, y garantía escrita de 90 días
              sobre trabajo y repuesto. Atendemos toda CABA.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tc-btn tc-btn-primary"
              >
                WhatsApp directo
              </a>
              <a
                href="tel:+541151034595"
                className="tc-btn tc-btn-ghost"
              >
                Llamar ahora
              </a>
              <Link
                href="/presupuesto-reparacion#solicitar-presupuesto"
                className="tc-btn tc-btn-ghost"
              >
                Pedir presupuesto
              </Link>
            </div>
          </div>

          <aside className="md:col-span-2">
            <div className="rounded-[28px] bg-[#1d1d1f] p-6">
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-white/75">
                Datos clave
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-white/90">
                <li className="flex items-start gap-2">
                  <FaMapMarkerAlt className="mt-0.5 text-primary" />
                  Paraguay 2451, Recoleta, CABA
                </li>
                <li className="flex items-start gap-2">
                  <FaRegClock className="mt-0.5 text-primary" />
                  Lunes a viernes, 10:30 a 18:00 hs
                </li>
                <li className="flex items-start gap-2">
                  <FaTools className="mt-0.5 text-primary" />
                  Pantalla, batería, carga, placa y notebook
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </header>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        {trustSignals.map((signal) => {
          const Icon = signal.Icon;
          return (
            <article
              key={signal.title}
              className="bg-[#1d1d1f] rounded-[28px] p-6"
            >
              <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900 dark:text-[#f5f5f7]">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Icon className="text-sm" />
                </span>
                {signal.title}
              </h2>
              <p className="mt-3 text-slate-600 dark:text-[#a1a1a6]">{signal.desc}</p>
            </article>
          );
        })}
      </section>

      <section className="bg-[#1d1d1f] mt-10 rounded-[28px] p-8">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-[#f5f5f7]">
          Servicios destacados en esta sucursal
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            "Cambio de pantalla (módulo completo)",
            "Cambio de batería",
            "Reparación de pin de carga",
            "Microelectrónica y reparación de placa",
            "Reparación de tablets y notebooks",
            "Revisión técnica arancelada y presupuesto detallado",
          ].map((service) => (
            <div
              key={service}
              className="bg-[#1d1d1f] rounded-xl p-5 text-sm text-slate-700 dark:text-[#a1a1a6]"
            >
              {service}
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/reparaciones"
            className="tc-btn tc-btn-primary"
          >
            Ver servicios
          </Link>
          <Link
            href="/sucursales/caba/belgrano"
            className="rounded-full border border-secondary/50 px-6 py-3 text-sm font-semibold text-secondary transition hover:bg-secondary/10"
          >
            Ver sucursal Belgrano
          </Link>
          <Link
            href="/contacto"
            className="rounded-full border border-primary/40 px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10"
          >
            Ver mapa y contacto
          </Link>
        </div>
      </section>

      <section className="bg-[#1d1d1f] mt-10 rounded-[28px] p-8">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-[#f5f5f7]">
          Preguntas frecuentes
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {faqs.map((faq) => (
            <article
              key={faq.q}
              className="bg-[#1d1d1f] rounded-xl p-5 text-sm leading-relaxed text-slate-700 dark:text-[#a1a1a6]"
            >
              <h3 className="font-semibold text-primary">{faq.q}</h3>
              <p className="mt-2">{faq.a}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#1d1d1f] mt-10 rounded-[28px] p-8">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-[#f5f5f7]">
          ¿Cómo llegar a la sucursal Recoleta?
        </h2>
        <p className="mt-3 text-slate-600 dark:text-[#a1a1a6]">
          Paraguay 2451 queda a pocas cuadras de la estación Pueyrredón de la línea D (Av. Santa Fe y Pueyrredón). Bajás en
          Santa Fe y Pueyrredón y caminás por Pueyrredón hasta Paraguay.
        </p>
        <p className="mt-3 text-sm text-slate-500 dark:text-[#86868b]">
          Si tenés dudas sobre cómo llegar, escribinos por WhatsApp y te mandamos el punto exacto.
        </p>
        <BranchMap
          address={`${branch.street}, ${branch.neighborhood}, CABA`}
          name={branch.shortName}
          className="mt-6"
        />
      </section>

      <section className="mt-10">
        <GoogleReviewsAPI />
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </section>
  );
}
