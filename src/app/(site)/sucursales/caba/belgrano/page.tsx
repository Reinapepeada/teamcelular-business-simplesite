import type { Metadata } from "next";
import Link from "next/link";
import {
  FaGoogle,
  FaMapMarkerAlt,
  FaRegClock,
  FaShieldAlt,
  FaTools,
  FaUserCheck,
} from "react-icons/fa";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { getBranch, whatsappUrl as buildWhatsappUrl } from "@/lib/businessProfile";
import BranchMap from "@/components/cards/BranchMap";
import RepairFaqList from "@/components/repairs/RepairFaqList";
import TrackedCtaLink from "@/components/cro/TrackedCtaLink";
import RepairPriceTable from "@/components/seo/RepairPriceTable";
import { POPULAR_REPAIR_PRICES, PRICES_UPDATED_LABEL } from "@/lib/repairPrices";

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
    a: "Sí. Mandanos por WhatsApp marca, modelo y qué le pasa, y te confirmamos precio y si hay repuesto antes de que vayas.",
  },
  {
    q: "¿Qué reparaciones hacen en la sucursal Belgrano?",
    a: "Pantalla, batería, pin de carga, cámara, microelectrónica y recuperación por agua. Te confirmamos el costo de revisión y el plazo según la falla antes de avanzar.",
  },
  {
    q: "¿Dan garantía escrita en Belgrano?",
    a: "Sí. Cada reparación sale con garantía escrita de 90 días sobre trabajo y repuesto instalado.",
  },
];

const trustSignals = [
  {
    title: "Laboratorio físico en Belgrano",
    desc: "Pantalla, batería y carga se hacen acá mismo. Si el equipo necesita trabajo de placa, te lo decimos antes y te damos el plazo.",
    Icon: FaTools,
  },
  {
    title: "Garantía escrita por cada servicio",
    desc: "Cada trabajo sale con garantía escrita de 90 días sobre trabajo y repuesto instalado.",
    Icon: FaShieldAlt,
  },
  {
    title: "Seguimiento por WhatsApp",
    desc: "Te avisamos por WhatsApp cuando está listo o si aparece algo que no estaba en el presupuesto.",
    Icon: FaUserCheck,
  },
];

export const metadata: Metadata = {
  title: "Reparación de Celulares en Belgrano CABA | Team Celular",
  description:
    "Team Celular, Amenábar 2032, Belgrano. Reparación de celulares con garantía escrita de 90 días. Confirmamos repuesto y plazo antes de avanzar.",
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
      "Team Celular, Amenábar 2032, Belgrano. Reparación de celulares con garantía escrita de 90 días. Confirmamos repuesto y plazo antes de avanzar.",
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
      "Team Celular, Amenábar 2032, Belgrano. Reparación de celulares con garantía escrita de 90 días. Confirmamos repuesto y plazo antes de avanzar.",
    images: [`${SITE_URL}/opengraph-image.png`],
  },
};

export default function SucursalBelgranoPage() {
  const branch = getBranch("belgrano");
  const whatsappUrl = buildWhatsappUrl(branch.whatsappText, branch.whatsapp);
  // Belgrano has its own line; the schema already declares it, so it must be visible too.
  const branchPhoneHref = `tel:${branch.phone.replace(/[^+\d]/g, "")}`;

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
    // Ficha de GBP propia: ata esta pagina a su ficha (senal de entidad local).
    sameAs: [
      branch.mapUrl,
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
          { name: "Belgrano", url: PAGE_URL },
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
              Sucursal oficial Team Celular · Belgrano
            </p>
            <h1 className="tc-display">
              Reparación de celulares en Belgrano CABA
            </h1>
            <p className="max-w-[50ch] text-lg leading-relaxed text-[#a1a1a6]">Pantalla, batería, carga y placa. Te informamos el costo de revisión y el presupuesto antes de reparar. Garantía escrita de 90 días.</p>
            <div className="flex flex-wrap gap-3">
              <TrackedCtaLink href={whatsappUrl} external target="_blank" directBranch ctaName="branch_belgrano_whatsapp" ctaLocation="branch_belgrano_hero" ctaVariant="whatsapp" className="tc-btn tc-btn-primary">
                WhatsApp de Belgrano
              </TrackedCtaLink>
              <a
                href={branchPhoneHref}
                className="tc-btn tc-btn-ghost"
              >
                Llamar al {branch.phone}
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
                Datos de la sucursal
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-white/90">
                <li className="flex items-start gap-2">
                  <FaMapMarkerAlt className="mt-0.5 text-primary dark:text-secondary" />
                  Amenábar 2032, Belgrano, CABA
                </li>
                <li className="flex items-start gap-2">
                  <FaRegClock className="mt-0.5 text-primary dark:text-secondary" />
                  Lunes a viernes, 10:30 a 18:00 hs
                </li>
                <li className="flex items-start gap-2">
                  <FaTools className="mt-0.5 text-primary dark:text-secondary" />
                  Pantalla, batería, carga, placa y notebook
                </li>
              </ul>
              <a href={branch.mapUrl} target="_blank" rel="noopener noreferrer" className="tc-link mt-4 inline-flex min-h-11 items-center gap-2 text-[17px]"><FaMapMarkerAlt aria-hidden /> Cómo llegar en Maps</a>
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
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary dark:text-secondary">
                  <Icon className="text-sm" />
                </span>
                {signal.title}
              </h2>
              <p className="mt-3 text-slate-600 dark:text-[#a1a1a6]">{signal.desc}</p>
            </article>
          );
        })}
      </section>

      <section className="mt-10">
        <RepairPriceTable brand="celular" prices={POPULAR_REPAIR_PRICES} updatedLabel={PRICES_UPDATED_LABEL} singlePriceColumn />
      </section>

      <section className="bg-[#1d1d1f] mt-10 rounded-[28px] p-8">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-[#f5f5f7]">
          ¿Qué reparaciones hacemos en la sucursal Belgrano?
        </h2>
        <p className="mt-2 text-slate-600 dark:text-[#a1a1a6]">
          Team Celular Belgrano, en Amenábar 2032, cubre las mismas reparaciones que el laboratorio central: desde pantallas rotas hasta fallas de placa con microscopio.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            "Cambio de pantalla y módulo display",
            "Cambio de batería",
            "Reparación de pin de carga",
            "Microelectrónica y reparación de placa",
            "Recuperación por agua o humedad",
            "Revisión técnica arancelada y presupuesto detallado",
          ].map((service) => (
            <div
              key={service}
              className="flex items-center gap-3 border-b border-[#333336] py-4 text-[15px] text-[#a1a1a6]"
            >
              <FaTools aria-hidden className="shrink-0 text-[#6aa6ff]" />{service}
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/reparaciones"
            className="tc-btn tc-btn-primary"
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
            className="rounded-full border border-primary/40 px-6 py-3 text-sm font-semibold text-primary dark:text-secondary transition hover:bg-primary/10"
          >
            Pedir presupuesto
          </Link>
        </div>
      </section>

      <section className="bg-[#1d1d1f] mt-10 rounded-[28px] p-8">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-[#f5f5f7]">
          ¿Cómo llegar a la sucursal Belgrano?
        </h2>
        <p className="mt-3 text-slate-600 dark:text-[#a1a1a6]">
          La estación de subte más cercana es Juramento, de la línea D, sobre Av. Cabildo. Desde ahí caminás hasta Amenábar 2032; también te dejan cerca los colectivos que van por Cabildo.
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

      <section className="mt-10 space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Reseñas de nuestra sucursal Belgrano
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Leé las opiniones de quienes se atendieron en Amenábar 2032 en la ficha
          de Google de esta sucursal.
        </p>
        <a
          href={branch.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-primary/90 hover:shadow-xl"
        >
          <FaGoogle aria-hidden="true" />
          Ver reseñas de Belgrano en Google
        </a>
      </section>

      <section className="bg-[#1d1d1f] mt-10 rounded-[28px] p-8">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-[#f5f5f7]">
          Preguntas frecuentes sobre la sucursal Belgrano
        </h2>
        <div className="mt-6"><RepairFaqList items={faqs.map(({ q, a }) => ({ question: q, answer: a }))} /></div>
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
