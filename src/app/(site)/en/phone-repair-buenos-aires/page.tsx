import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import TrackedCtaLink from "@/components/cro/TrackedCtaLink";
import { buildWebsiteMetadata, getSiteUrl } from "@/lib/seoMetadata";
import { BRANCHES, businessId } from "@/lib/businessProfile";
import {
  IPHONE_PRICES_UPDATED,
  formatArs,
  getIphoneModel,
} from "@/app/(site)/reparaciones/iphone/iphoneModels";

const SITE_URL = getSiteUrl();
const PAGE_PATH = "/en/phone-repair-buenos-aires";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

/**
 * Página en inglés. Search Console registra 136 impresiones en 28 días para
 * "phone repair" desde Argentina, en posición 1.1 y con cero clicks: son
 * angloparlantes en Buenos Aires que ven un resultado en español y no entran.
 * La posición ya está ganada; lo único que faltaba era el idioma.
 */
export const metadata: Metadata = buildWebsiteMetadata({
  path: PAGE_PATH,
  title: "Phone Repair in Buenos Aires | English-Speaking Technician",
  description:
    "Phone repair in Buenos Aires: screens and batteries same day, no appointment. English-speaking technician in Recoleta and Belgrano. 90-day warranty.",
  keywords: [
    "phone repair buenos aires",
    "iphone repair buenos aires",
    "english speaking phone repair argentina",
    "cell phone repair recoleta",
    "screen replacement buenos aires",
  ],
  languages: {
    en: PAGE_PATH,
    "es-AR": "/",
  },
  openGraphTitle: "Phone Repair in Buenos Aires | Team Celular",
  openGraphDescription:
    "Same-day screen and battery repair in Recoleta and Belgrano. English spoken. 90-day written warranty.",
});

const priced = ["11", "12", "13", "14-pro-max"] as const;

export default function PhoneRepairEnglishPage() {
  const recoleta = BRANCHES.find((branch) => branch.slug === "recoleta");
  const belgrano = BRANCHES.find((branch) => branch.slug === "belgrano");

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${PAGE_URL}#service`,
    name: "Phone repair in Buenos Aires",
    serviceType: "Mobile phone repair",
    url: PAGE_URL,
    inLanguage: "en",
    areaServed: [
      { "@type": "City", name: "Buenos Aires" },
      { "@type": "City", name: "CABA" },
    ],
    provider: { "@id": businessId("localbusiness") },
    availableLanguage: ["es", "en"],
  };

  return (
    <section className="w-full max-w-5xl px-6 py-14 pb-24 md:px-8">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Phone repair in Buenos Aires", url: PAGE_URL },
        ]}
      />

      <header>
        <span className="inline-flex rounded-full bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
          English spoken
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
          Phone repair in Buenos Aires
        </h1>

        {/* Bloque citable: respuesta completa y autocontenida en el primer 30%. */}
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          Team Celular repairs phones in Buenos Aires at two walk-in workshops: Paraguay 2451
          in Recoleta and Amenábar 2032 in Belgrano. No appointment is needed. We are open
          Monday to Friday, 10:30 to 18:00. Screen and battery replacements are usually done
          in 2 to 4 hours, diagnostics are free of commitment and quoted before any work
          starts, and every repair comes with a 90-day written warranty covering both labour
          and parts. Alejandro Biarrieta, the founding technician, speaks English, so you can
          explain the problem directly instead of relying on a translation app. We repair
          iPhone, Samsung, Motorola, Xiaomi and most other brands, including phones bought
          abroad. We also do board-level microsoldering for water damage and phones that will
          not turn on, which most repair shops decline.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <TrackedCtaLink
            href={`https://wa.me/5491151034595?text=${encodeURIComponent(
              "Hi Team Celular, I need a phone repair in Buenos Aires. My phone and the problem:"
            )}`}
            ctaName="en_phone_repair_whatsapp"
            ctaLocation="en_hero"
            ctaVariant="whatsapp"
            external
            className="inline-flex min-h-12 items-center rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-primary/90"
          >
            WhatsApp us in English
          </TrackedCtaLink>
          <TrackedCtaLink
            href="/presupuesto-reparacion#solicitar-presupuesto"
            ctaName="en_phone_repair_budget"
            ctaLocation="en_hero"
            ctaVariant="primary"
            className="inline-flex min-h-12 items-center rounded-full border-2 border-primary px-8 py-4 text-base font-semibold text-primary transition hover:bg-primary/10"
          >
            Request a quote
          </TrackedCtaLink>
        </div>
      </header>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Where are you located?
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {[recoleta, belgrano].map((branch) =>
            branch ? (
              <article
                key={branch.slug}
                className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900"
              >
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {branch.neighborhood}
                </h3>
                <p className="mt-2 text-slate-600 dark:text-slate-300">{branch.street}</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Monday to Friday, 10:30–18:00
                </p>
                <a
                  href={branch.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block font-semibold text-primary hover:underline"
                >
                  Open in Google Maps →
                </a>
              </article>
            ) : null
          )}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          How much does a repair cost?
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Prices in Argentine pesos, updated {IPHONE_PRICES_UPDATED === "agosto de 2026" ? "August 2026" : IPHONE_PRICES_UPDATED}. Payment in
          cash, card, or three interest-free instalments.
        </p>
        <div className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white dark:divide-slate-700 dark:border-slate-700 dark:bg-slate-900">
          {priced.map((slug) => {
            const model = getIphoneModel(slug);
            if (!model) return null;
            return (
              <div key={slug} className="grid grid-cols-3 gap-4 px-6 py-4 text-sm">
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {model.name}
                </span>
                <span className="text-slate-500 dark:text-slate-400">
                  Screen {model.screen ? formatArs(model.screen) : "on request"}
                </span>
                <span className="text-slate-500 dark:text-slate-400">
                  Battery {model.battery ? formatArs(model.battery) : "on request"}
                </span>
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
          Other brands and models are quoted after a free diagnostic. Send us the model and
          the fault on WhatsApp and we will give you a figure before you come.
        </p>
      </section>

      <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Can you repair a phone bought outside Argentina?
        </h2>
        <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300">
          Yes. Where the phone was purchased does not change the technical work, only parts
          availability for some models, which we confirm before you leave the phone with us.
          Keep in mind that a manufacturer warranty from another country will usually not be
          honoured locally, and that any repair outside the official channel voids a warranty
          that is still active. If your phone is still under warranty at home, it is worth
          checking that first. Our own 90-day written warranty covers the work we do.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Common questions
        </h2>
        <div className="mt-6 space-y-5">
          {[
            {
              q: "Do I need an appointment?",
              a: "No. Walk in during opening hours and we will look at the phone. Sending a message first only helps us confirm we have the part in stock.",
            },
            {
              q: "How long does a screen replacement take?",
              a: "Usually 2 to 4 hours depending on the model and stock. If you are short on time, message us before coming so we can check availability.",
            },
            {
              q: "My phone got wet and will not turn on. Is it worth trying?",
              a: "Often yes, but it needs board-level work rather than a part swap: cleaning, inspection under a microscope and component repair. Bring it switched off and do not charge it. We will tell you honestly if it cannot be recovered.",
            },
            {
              q: "Can I pay by card?",
              a: "Yes, including three interest-free instalments. Cash is also accepted.",
            },
          ].map((item) => (
            <div key={item.q}>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">{item.q}</h3>
              <p className="mt-1 text-slate-600 dark:text-slate-300">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <p className="mt-12 text-sm text-slate-500 dark:text-slate-400">
        ¿Preferís leer esta página en español?{" "}
        <Link href="/" className="font-semibold text-primary hover:underline">
          Ir a la versión en español
        </Link>
      </p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
    </section>
  );
}
