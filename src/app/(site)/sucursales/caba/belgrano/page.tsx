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
import { getBranch, whatsappUrl as buildWhatsappUrl } from "@/lib/businessProfile";

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";
const PAGE_URL = `${SITE_URL}/sucursales/caba/belgrano`;

const faqs = [
  {
    q: "¿Dónde está la sucursal Belgrano de Team Celular?",
    a: "Estamos en Amenábar 2032, Belgrano, Ciudad Autónoma de Buenos Aires.",
  },
  {
    q: "¿Qué horario tiene la sucursal Belgrano?",
    a: "Atendemos de lunes a viernes de 10:30 a 18:00 hs.",
  },
  {
    q: "¿Puedo pedir presupuesto antes de ir a Belgrano?",
    a: "Sí. Escribinos por WhatsApp con marca, modelo y falla para agilizar el diagnóstico y evitar esperas.",
  },
  {
    q: "¿Qué reparaciones hacen en la sucursal Belgrano?",
    a: "Pantalla, batería, pin de carga, cámara, microelectrónica y recuperación por agua. El diagnóstico se hace el mismo día.",
  },
  {
    q: "¿Dan garantía escrita en Belgrano?",
    a: "Sí. Cada reparación sale con garantía escrita de 90 días sobre trabajo y repuesto instalado.",
  },
];

const trustSignals = [
  {
    title: "Laboratorio físico en Belgrano",
    desc: "Atención real en sucursal con equipamiento técnico para reparaciones simples y complejas.",
    Icon: FaTools,
  },
  {
    title: "Garantía escrita por cada servicio",
    desc: "Cada trabajo sale con garantía escrita de 90 días sobre trabajo y repuesto instalado.",
    Icon: FaShieldAlt,
  },
  {
    title: "Seguimiento por WhatsApp",
    desc: "Canal directo para consultar estado, coordinar entrega y resolver dudas sin filas.",
    Icon: FaUserCheck,
  },
];

export const metadata: Metadata = {
  title: "Reparación de Celulares en Belgrano CABA | Team Celular",
  description:
    "Reparación de celulares en Belgrano CABA — Team Celular, Amenábar 2032. Pantalla, batería y carga el mismo día con diagnóstico técnico y garantía escrita 90 días.",
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
    title: "Reparación de Celulares en Belgrano CABA | Team Celular",
    description:
      "Team Celular, Amenábar 2032 Belgrano CABA. Pantalla, batería y carga el mismo día, diagnóstico técnico y garantía escrita 90 días. Lun–Vie 10:30–18:00.",
    url: PAGE_URL,
    type: "website",
    locale: "es_AR",
    images: [
      {
        url: `${SITE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Sucursal Belgrano Team Celular",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reparación de Celulares en Belgrano CABA | Team Celular",
    description:
      "Team Celular, Amenábar 2032 Belgrano CABA. Pantalla y batería el mismo día, garantía escrita 90 días. Lun–Vie 10:30–18:00.",
    images: [`${SITE_URL}/opengraph-image.png`],
  },
};

export default function SucursalBelgranoPage() {
  const branch = getBranch("belgrano");
  const whatsappUrl = buildWhatsappUrl(branch.whatsappText, branch.whatsapp);

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${PAGE_URL}#localbusiness`,
    name: branch.name,
    url: PAGE_URL,
    telephone: branch.phone,
    email: "teamcelular.arg@gmail.com",
    image: `${SITE_URL}/opengraph-image.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Amenábar 2032",
      addressLocality: "Belgrano",
      addressRegion: "CABA",
      postalCode: "C1428",
      addressCountry: "AR",
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
          { name: "Belgrano", url: PAGE_URL },
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
              Sucursal oficial Team Celular · Belgrano
            </p>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Reparación de celulares en Belgrano CABA
            </h1>
            <p className="text-lg leading-relaxed text-slate-100/90">
              Team Celular, en Amenábar 2032 Belgrano CABA, repara celulares con
              diagnóstico el mismo día, pantalla y batería en 2–4 h, y garantía
              escrita de 90 días sobre trabajo y repuesto. Lunes a viernes 10:30–18:00.
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
                Datos de la sucursal
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-white/90">
                <li className="flex items-start gap-2">
                  <FaMapMarkerAlt className="mt-0.5 text-primary" />
                  Amenábar 2032, Belgrano, CABA
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
          ¿Qué reparaciones hacemos en la sucursal Belgrano?
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Team Celular Belgrano, en Amenábar 2032, cubre las mismas reparaciones que el laboratorio central: desde pantallas rotas hasta fallas de placa con microscopio.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            "Cambio de pantalla y módulo display",
            "Cambio de batería con test de autonomía",
            "Reparación de pin de carga",
            "Microelectrónica y reparación de placa",
            "Recuperación por agua o humedad",
            "Revisión técnica arancelada y presupuesto detallado",
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
            Ver todos los servicios
          </Link>
          <Link
            href="/sucursales"
            className="rounded-full border border-secondary/50 px-6 py-3 text-sm font-semibold text-secondary transition hover:bg-secondary/10"
          >
            Ver todas las sucursales
          </Link>
          <Link
            href="/presupuesto-reparacion#solicitar-presupuesto"
            className="rounded-full border border-primary/40 px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10"
          >
            Pedir presupuesto
          </Link>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-white/15 bg-white/5 p-8 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          ¿Cómo llegar a la sucursal Belgrano?
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Amenábar 2032 está en el corazón de Belgrano, con fácil acceso en transporte público. Podés llegar por Subte D (estación Juramento) a pocas cuadras, o en múltiples líneas de colectivo que pasan por la zona. Si venís en auto, la calle tiene estacionamiento disponible en la cuadra.
        </p>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          Si tenés dudas sobre cómo llegar, escribinos por WhatsApp y te mandamos el punto exacto.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-white/15 bg-white/5 p-8 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Preguntas frecuentes sobre la sucursal Belgrano
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
