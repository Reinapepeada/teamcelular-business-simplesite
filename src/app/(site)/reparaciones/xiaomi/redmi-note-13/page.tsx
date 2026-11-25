import { MULTIBRAND_WARRANTY_MESSAGE } from "@/lib/copyStandards";
import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import AuthorByline from "@/components/seo/AuthorByline";
import TrackedCtaLink from "@/components/cro/TrackedCtaLink";
import RepairFaqList from "@/components/repairs/RepairFaqList";
import { buildWebsiteMetadata, getSiteUrl } from "@/lib/seoMetadata";
import { BUSINESS_PROFILE, businessId } from "@/lib/businessProfile";
import { INSTALLMENTS_MESSAGE } from "@/lib/copyStandards";
import { PLACA_REVISION_PRICE, formatArsPrice } from "@/lib/repairPrices";
import {
  XIAOMI_BATTERY_PRICES,
  XIAOMI_SCREEN_PRICES,
  formatPriceMonth,
} from "@/lib/modelScreenPrices";

// Única página por modelo fuera de iPhone: es el único Xiaomi con demanda propia
// en Search Console (19 impresiones en 90 días al 16/11/2026) y 14 órdenes en
// Fixbee en 12 meses.
// shortcut: página estática de un solo modelo; generalizar la plantilla de
// /reparaciones/iphone/[model] cuando haya un segundo modelo con demanda.

const MODEL = "Redmi Note 13";
const PATH = "/reparaciones/xiaomi/redmi-note-13";
const REVIEWED = "18 de noviembre de 2026";

// Pantalla y batería salen de la misma tabla que la guía de Xiaomi.
const screen = XIAOMI_SCREEN_PRICES.find((p) => p.model === MODEL);
const batteries = XIAOMI_BATTERY_PRICES.filter((p) => p.model.startsWith(MODEL));
const batteryFrom = Math.min(...batteries.map((p) => p.from));

// Pin de carga del Redmi Note 13 en Fixbee (agosto a noviembre de 2026): dos
// limpiezas a $45.000 y un cambio de pin a $69.000.
const PIN_CLEANING = 45000;
const PIN_CHANGE = 69000;

const SPECS = {
  "4G": "https://www.mi.com/global/product/redmi-note-13/specs/",
  "5G": "https://www.mi.com/global/product/redmi-note-13-5g/specs/",
};

export const metadata: Metadata = buildWebsiteMetadata({
    path: PATH,
    title: `Reparación Redmi Note 13 en CABA: batería desde ${formatArsPrice(batteryFrom)}`,
    description: `Batería del Redmi Note 13 desde ${formatArsPrice(batteryFrom)} y pantalla OLED desde ${screen ? formatArsPrice(screen.from) : "consultar"}. 4G y 5G en Recoleta y Belgrano.`,
    keywords: [
      "reparacion redmi note 13 caba",
      "cambio de bateria redmi note 13",
      "cambio de pantalla redmi note 13",
      "redmi note 13 no carga",
      "redmi note 13 bateria hinchada",
    ],
    languages: { "es-AR": PATH },
});

export default function RedmiNote13Page() {
  const SITE_URL = getSiteUrl();
  const pageUrl = `${SITE_URL}${PATH}`;

  const repairs = [
    {
      name: "Cambio de batería",
      from: batteryFrom,
      time: "1 a 2 horas",
      detail: `${batteries.map((p) => `${p.model} ${formatArsPrice(p.from)}`).join(" · ")}. Según la batería disponible puede llegar a ${formatArsPrice(120000)}; te lo confirmamos antes de abrir el equipo.`,
    },
    {
      name: "Cambio de pantalla OLED",
      from: screen?.from ?? null,
      time: "2 a 4 horas",
      detail: "Módulo completo con marco. El 4G y el 5G usan módulos distintos: confirmamos la versión antes de pedir el repuesto.",
    },
    {
      name: "Limpieza del pin de carga",
      from: PIN_CLEANING,
      time: "En el día",
      detail: "Cuando no carga o dejó de hacer carga rápida, primero limpiamos el conector con microscopio.",
    },
    {
      name: "Cambio de pin de carga",
      from: PIN_CHANGE,
      time: "2 a 3 horas",
      detail: "Si la limpieza no alcanza, cambiamos la placa de carga USB-C.",
    },
    {
      name: "Revisión de placa",
      from: PLACA_REVISION_PRICE,
      fixed: true,
      time: "Informe en hasta 72 h hábiles",
      detail: "Si no enciende o se mojó. Se cobra aunque no se repare y se descuenta si se repara.",
    },
  ];

  const faqs = [
    {
      question: "¿Cuánto sale cambiar la batería del Redmi Note 13?",
      answer: `Desde ${formatArsPrice(batteryFrom)} en Team Celular, en 1 a 2 horas si hay repuesto. ${batteries.map((p) => `${p.model}: ${formatArsPrice(p.from)}`).join("; ")}. Antes medimos el consumo para confirmar que la falla es la batería.`,
    },
    {
      question: "¿Por qué se levantó la tapa de mi Redmi Note 13?",
      answer: "Casi siempre es la batería hinchada: de los siete cambios de batería de este modelo que hicimos en el último año, cinco llegaron con la batería inflada. Dejá de cargarlo y traelo cuanto antes; una batería inflada puede romper la pantalla desde adentro.",
    },
    {
      question: "Mi Redmi Note 13 no hace carga rápida, ¿hay que cambiar el pin?",
      answer: `No siempre. De los tres equipos que llegaron sin carga o sin carga rápida, dos se resolvieron con una limpieza del conector (${formatArsPrice(PIN_CLEANING)}). Si no alcanza, el cambio de pin sale ${formatArsPrice(PIN_CHANGE)}. Probá antes con otro cable y cargador de 33 W.`,
    },
    {
      question: "¿Cómo sé si mi Redmi Note 13 es 4G o 5G?",
      answer: "Entrá a Ajustes > Sobre el teléfono: el 5G figura como Redmi Note 13 5G. Los dos tienen pantalla AMOLED de 6,67 pulgadas y batería de 5000 mAh, pero el 4G usa Snapdragon 685 y el 5G Dimensity 6080, y sus módulos de pantalla no son intercambiables.",
    },
    {
      question: "¿Necesito turno?",
      answer: `No. Atendemos sin turno de ${BUSINESS_PROFILE.hours.text.toLowerCase()} en Paraguay 2451 (Recoleta) y Amenábar 2032 (Belgrano).`,
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: `Reparación de ${MODEL} en CABA`,
    serviceType: "Reparación de celulares",
    url: pageUrl,
    areaServed: [
      { "@type": "City", name: "CABA" },
      { "@type": "City", name: "Buenos Aires" },
    ],
    provider: { "@id": businessId("organization") },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Reparaciones para ${MODEL}`,
      // Precios "desde": van como minPrice, no como precio único.
      itemListElement: repairs
        .filter((repair) => repair.from !== null)
        .map((repair) => ({
          "@type": "Offer",
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "ARS",
            minPrice: repair.from,
          },
          itemOffered: { "@type": "Service", name: `${repair.name} ${MODEL}` },
        })),
    },
  };

  return (
    <section className="w-full max-w-5xl px-6 py-14 pb-24 md:px-8">
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: `${SITE_URL}/` },
          { name: "Xiaomi", url: `${SITE_URL}/guias/reparacion-xiaomi-buenos-aires` },
          { name: MODEL, url: pageUrl },
        ]}
      />

      <header>
        <span className="tc-eyebrow">Precios cobrados en el taller</span>
        <h1 className="tc-display mt-6 text-slate-900 dark:text-[#f5f5f7]">
          Reparación de Redmi Note 13 en CABA
        </h1>

        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600 dark:text-[#a1a1a6]">
          El cambio de batería del Redmi Note 13 cuesta desde{" "}
          <strong>{formatArsPrice(batteryFrom)}</strong> y el de pantalla OLED desde{" "}
          <strong>{screen ? formatArsPrice(screen.from) : "consultar"}</strong> en Team Celular,
          con sucursales en Paraguay 2451 (Recoleta) y Amenábar 2032 (Belgrano), CABA.
          Reparamos la versión 4G y la 5G. La batería se cambia en 1 a 2 horas y la pantalla
          en 2 a 4 horas, según stock. Son los precios más bajos
          que cobramos por este modelo
          {screen ? ` desde agosto de 2026 (pantalla: ${formatPriceMonth(screen.month)})` : ""}; el
          número exacto se confirma antes de abrir el equipo.
        </p>

        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600 dark:text-[#a1a1a6]">
          {MULTIBRAND_WARRANTY_MESSAGE}
        </p>

        <AuthorByline updatedLabel={REVIEWED} className="mt-6" />

        <div className="mt-8 flex flex-wrap gap-4">
          <TrackedCtaLink
            href="/presupuesto-reparacion#solicitar-presupuesto"
            ctaName="redmi_note_13_budget"
            ctaLocation="model_page_hero"
            ctaVariant="primary"
            className="tc-btn tc-btn-primary"
          >
            Pedir presupuesto
          </TrackedCtaLink>
          <TrackedCtaLink
            href={`https://wa.me/5491151034595?text=${encodeURIComponent(
              "Hola Team Celular, quiero reparar mi Redmi Note 13. La falla es:",
            )}`}
            ctaName="redmi_note_13_whatsapp"
            ctaLocation="model_page_hero"
            ctaVariant="whatsapp"
            external
            className="tc-btn tc-btn-ghost"
          >
            Consultar por WhatsApp
          </TrackedCtaLink>
        </div>
      </header>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-[#f5f5f7]">
          ¿Cuánto sale reparar un Redmi Note 13?
        </h2>
        <div className="mt-6 divide-y divide-slate-700 rounded-[28px] bg-[#1d1d1f]">
          {repairs.map((repair) => (
            <div key={repair.name} className="grid gap-2 px-6 py-5 md:grid-cols-[1.1fr_0.6fr_0.6fr]">
              <div>
                <p className="font-semibold text-[#f5f5f7]">{repair.name}</p>
                <p className="mt-1 text-sm text-[#a1a1a6]">{repair.detail}</p>
              </div>
              <p className="text-sm text-[#a1a1a6]">{repair.time}</p>
              <p className="font-semibold text-primary dark:text-secondary">
                {repair.from === null
                  ? "A consultar"
                  : `${"fixed" in repair ? "" : "desde "}${formatArsPrice(repair.from)}`}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-slate-500 dark:text-[#86868b]">
          La revisión técnica cuesta {BUSINESS_PROFILE.reviewCostRange} y te la informamos antes de
          hacerla. Si el equipo tiene más de una falla, te lo decimos antes de avanzar.{" "}
          {INSTALLMENTS_MESSAGE}
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-[#f5f5f7]">
          Lo que más vemos en el Redmi Note 13
        </h2>
        <ul className="mt-6 space-y-4">
          <li className="rounded-[28px] bg-[#1d1d1f] p-6 leading-relaxed text-[#a1a1a6]">
            <strong className="text-[#f5f5f7]">Batería hinchada.</strong> Es la falla más
            frecuente: cinco de los siete cambios de batería del último año llegaron con la
            batería inflada y la tapa trasera levantada. Si ves la tapa despegada, no lo
            cargues más.
          </li>
          <li className="rounded-[28px] bg-[#1d1d1f] p-6 leading-relaxed text-[#a1a1a6]">
            <strong className="text-[#f5f5f7]">No carga o perdió la carga rápida.</strong> El
            puerto USB-C junta pelusa y deja de hacer contacto. En dos de tres casos alcanzó con
            limpiarlo; el cambio de pin quedó para cuando el conector estaba dañado.
          </li>
          <li className="rounded-[28px] bg-[#1d1d1f] p-6 leading-relaxed text-[#a1a1a6]">
            <strong className="text-[#f5f5f7]">Pantalla sin imagen.</strong> Pasa después de
            un golpe o de humedad. Antes de cambiar el módulo confirmamos si es 4G o 5G y
            revisamos que la placa no tenga corrosión.
          </li>
        </ul>
        <p className="mt-4 text-sm text-slate-500 dark:text-[#a1a1a6]">
          Las características de fábrica están en las especificaciones de Xiaomi del{" "}
          <a href={SPECS["4G"]} className="font-semibold text-primary underline underline-offset-4 dark:text-secondary">
            Redmi Note 13
          </a>{" "}
          y del{" "}
          <a href={SPECS["5G"]} className="font-semibold text-primary underline underline-offset-4 dark:text-secondary">
            Redmi Note 13 5G
          </a>
          . No describen la calidad ni el stock del repuesto. Somos un servicio técnico
          independiente de Xiaomi.
        </p>
      </section>

      <section className="mt-12 rounded-[28px] bg-[#1d1d1f] p-8">
        <h2 className="text-2xl font-semibold text-[#f5f5f7]">Preguntas frecuentes sobre el Redmi Note 13</h2>
        <div className="mt-6"><RepairFaqList items={faqs} /></div>
      </section>

      <nav aria-label="Más sobre Xiaomi" className="mt-8 flex flex-wrap gap-4">
        <Link href="/guias/reparacion-xiaomi-buenos-aires" className="inline-flex min-h-11 items-center font-semibold text-primary hover:underline dark:text-secondary">
          Precios de todos los Xiaomi, Redmi y POCO
        </Link>
        <Link href="/reparaciones/cambio-bateria-caba" className="inline-flex min-h-11 items-center font-semibold text-primary hover:underline dark:text-secondary">
          Cómo revisamos la batería
        </Link>
        <Link href="/reparaciones/cambio-pin-carga-caba" className="inline-flex min-h-11 items-center font-semibold text-primary hover:underline dark:text-secondary">
          Cambio de pin de carga
        </Link>
      </nav>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </section>
  );
}
