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
import StickyLocalCta from "@/components/cro/StickyLocalCta";

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";
const PAGE_URL = `${SITE_URL}/sucursales/caba/recoleta`;

const faqs = [
  {
    q: "Donde esta la sucursal Recoleta?",
    a: "Estamos en Paraguay 2451, Recoleta, Ciudad Autonoma de Buenos Aires.",
  },
  {
    q: "Que horario tiene la sucursal?",
    a: "Atendemos de lunes a viernes de 10:30 a 18:00 hs.",
  },
  {
    q: "Puedo pedir presupuesto por WhatsApp antes de ir?",
    a: "Si. Escribinos con marca, modelo y falla para agilizar el diagnostico.",
  },
  {
    q: "Atienden clientes de otros barrios?",
    a: "Si. Esta sucursal atiende Recoleta y toda CABA.",
  },
];

const trustSignals = [
  {
    title: "Taller fisico y equipo tecnico",
    desc: "Atencion real en sucursal, con laboratorio para reparaciones simples y complejas.",
    Icon: FaTools,
  },
  {
    title: "Garantia escrita por servicio",
    desc: "Cada trabajo se entrega con condiciones de cobertura claras.",
    Icon: FaShieldAlt,
  },
  {
    title: "Seguimiento directo",
    desc: "Canal rapido por WhatsApp para estado, dudas y coordinacion de entrega.",
    Icon: FaUserCheck,
  },
];

export const metadata: Metadata = {
  title: "Sucursal Recoleta (CABA) | Team Celular",
  description:
    "Ficha oficial de Team Celular Recoleta, CABA. Direccion, horarios, contacto, servicios, mapa y canales rapidos para presupuesto.",
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
    title: "Sucursal Recoleta (CABA) | Team Celular",
    description:
      "Direccion, horarios y contacto de Team Celular Recoleta para reparacion de celulares, tablets y notebooks.",
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
    title: "Sucursal Recoleta (CABA) | Team Celular",
    description:
      "Ubicacion y contacto oficial de Team Celular Recoleta para soporte tecnico.",
    images: [`${SITE_URL}/opengraph-image.png`],
  },
};

export default function SucursalRecoletaPage() {
  const whatsappUrl = `https://wa.me/5491151034595?text=${encodeURIComponent(
    "Hola! Quiero pedir un presupuesto para la sucursal Recoleta. Marca y modelo:"
  )}`;

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${PAGE_URL}#localbusiness`,
    name: "Team Celular - Sucursal Recoleta",
    url: PAGE_URL,
    telephone: "+54 11 5103-4595",
    email: "teamcelular.arg@gmail.com",
    image: `${SITE_URL}/opengraph-image.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Paraguay 2451",
      addressLocality: "Recoleta",
      addressRegion: "CABA",
      postalCode: "C1121",
      addressCountry: "AR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -34.597528,
      longitude: -58.403048,
    },
    hasMap: "https://maps.app.goo.gl/3rCgYamQ4e9S4WkA9",
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
      "https://www.instagram.com/teamcelular.arg/",
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

      <header className="relative overflow-hidden rounded-3xl border border-white/15 bg-slate-900 p-8 text-white shadow-2xl md:p-12">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(14,165,233,0.3),transparent_38%),radial-gradient(circle_at_84%_86%,rgba(16,185,129,0.25),transparent_36%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:36px_36px]"
        />
        <div className="relative z-10 grid gap-8 md:grid-cols-5">
          <div className="space-y-5 md:col-span-3">
            <p className="inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white/90">
              Sucursal oficial Team Celular
            </p>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Sucursal Recoleta (CABA)
            </h1>
            <p className="text-lg leading-relaxed text-slate-100/90">
              Punto de atencion para reparacion de celulares, tablets y notebooks.
              Atendemos clientes de Recoleta y toda CABA con diagnostico tecnico,
              garantia escrita y seguimiento directo.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center rounded-full bg-white px-6 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                WhatsApp directo
              </a>
              <a
                href="tel:+541151034595"
                className="inline-flex min-h-11 items-center rounded-full border border-white/35 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Llamar ahora
              </a>
              <Link
                href="/presupuesto-reparacion#solicitar-presupuesto"
                className="inline-flex min-h-11 items-center rounded-full border border-white/35 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Pedir presupuesto
              </Link>
            </div>
          </div>

          <aside className="md:col-span-2">
            <div className="rounded-2xl border border-white/20 bg-black/25 p-5 backdrop-blur-md">
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
                  Pantalla, bateria, carga, placa y notebook
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
              className="rounded-2xl border border-white/15 bg-white/5 p-6 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/30"
            >
              <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900 dark:text-white">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Icon className="text-sm" />
                </span>
                {signal.title}
              </h2>
              <p className="mt-3 text-slate-600 dark:text-slate-300">{signal.desc}</p>
            </article>
          );
        })}
      </section>

      <section className="mt-10 rounded-2xl border border-white/15 bg-white/5 p-8 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Servicios destacados en esta sucursal
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            "Cambio de pantalla y modulo display",
            "Cambio de bateria",
            "Reparacion de pin de carga",
            "Microelectronica y reparacion de placa",
            "Reparacion de tablets y notebooks",
            "Diagnostico y presupuesto sin cargo",
          ].map((service) => (
            <div
              key={service}
              className="rounded-xl border border-white/10 bg-white/10 p-5 text-sm text-slate-700 dark:border-white/5 dark:bg-slate-900/40 dark:text-slate-300"
            >
              {service}
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/reparaciones"
            className="rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-secondary/90"
          >
            Ver servicios
          </Link>
          <Link
            href="/zonas"
            className="rounded-full border border-secondary/50 px-6 py-3 text-sm font-semibold text-secondary transition hover:bg-secondary/10"
          >
            Ver zonas atendidas
          </Link>
          <Link
            href="/contacto"
            className="rounded-full border border-primary/40 px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10"
          >
            Ver mapa y contacto
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

      <StickyLocalCta
        whatsappUrl={whatsappUrl}
        budgetHref="/presupuesto-reparacion#solicitar-presupuesto"
        phoneHref="tel:+541151034595"
        primaryLabel="Turno"
      />

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
