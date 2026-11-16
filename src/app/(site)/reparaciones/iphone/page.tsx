import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BsBatteryHalf,
  BsCameraFill,
  BsChatDots,
  BsCheck2Circle,
  BsClock,
  BsCpu,
  BsCreditCard,
  BsDroplet,
  BsLightningChargeFill,
  BsPhone,
  BsSearch,
  BsShieldCheck,
  BsTools,
} from "react-icons/bs";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import TrackedCtaLink from "@/components/cro/TrackedCtaLink";
import { buildWebsiteMetadata, getSiteUrl } from "@/lib/seoMetadata";
import { BUSINESS_PROFILE } from "@/lib/businessProfile";
import { INSTALLMENTS_MESSAGE } from "@/lib/copyStandards";
import { PLACA_REVISION_PRICE, formatArsPrice } from "@/lib/repairPrices";
import {
  IPHONE_MODELS,
  IPHONE_MODELS_WITH_PAGE,
  IPHONE_PRICES_UPDATED,
  getIphoneModel,
  getIphoneModelNotes,
  priceLabel,
} from "./iphoneModels";

const PATH = "/reparaciones/iphone";

// Selector visual para quien llega recortando la URL de un modelo (antes 404).
// noindex: "reparación iPhone" ya la responde /guias/reparacion-iphone-buenos-aires
// y una segunda URL indexable competiría con ella. Para indexarla hay que decidir
// primero cuál de las dos queda como página del tema.
export const metadata: Metadata = buildWebsiteMetadata({
  path: PATH,
  title: "Reparación de iPhone por modelo: elegí el tuyo | Team Celular",
  description:
    "Elegí tu iPhone y mirá el precio de pantalla y batería en Team Celular, Recoleta y Belgrano. En 2 a 4 horas con repuesto en stock y garantía escrita de 90 días.",
  robots: { index: false, follow: true },
});

const pagedModels = IPHONE_MODELS_WITH_PAGE.flatMap((slug) => {
  const model = getIphoneModel(slug);
  const notes = getIphoneModelNotes(slug);
  return model && notes ? [{ model, notes }] : [];
});

const otherModels = IPHONE_MODELS.filter(
  (model) => !(IPHONE_MODELS_WITH_PAGE as readonly string[]).includes(model.slug),
);

/** Pulgadas del panel, ej. 'OLED … de 6,1"' → 6.1. Sin dato, tamaño medio. */
function inchesOf(panel: string): number {
  const match = /(\d),(\d)"/.exec(panel);
  return match ? Number(`${match[1]}.${match[2]}`) : 6.1;
}

const SCREEN_TINTS = [
  "from-[#1766f2] to-[#2D2E83]",
  "from-[#6aa6ff] to-[#1766f2]",
  "from-[#2D2E83] to-[#0b1a3d]",
  "from-[#3b82f6] to-[#0f2f7a]",
];

/** Silueta del equipo: el alto sigue las pulgadas y el recorte, el tipo de panel. */
function PhoneSilhouette({ panel, tint }: { panel: string; tint: string }) {
  const height = Math.round(inchesOf(panel) * 22);
  const island = panel.includes("Dynamic Island");
  return (
    <div
      aria-hidden="true"
      style={{ height, width: Math.round(height * 0.49) }}
      className="relative shrink-0 rounded-[18px] bg-[#333336] p-[3px] transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105 motion-reduce:transform-none"
    >
      <div className={`h-full w-full rounded-[15px] bg-gradient-to-br ${tint}`} />
      <span
        className={
          island
            ? "absolute left-1/2 top-[9px] h-[7px] w-[22px] -translate-x-1/2 rounded-full bg-black"
            : "absolute left-1/2 top-[3px] h-[9px] w-[30px] -translate-x-1/2 rounded-b-[8px] bg-[#333336]"
        }
      />
    </div>
  );
}

const TRUST = [
  { icon: BsClock, title: "2 a 4 horas", text: "Pantalla y batería, con repuesto en stock." },
  { icon: BsShieldCheck, title: `${BUSINESS_PROFILE.warrantyDays} días de garantía`, text: "Por escrito, sobre trabajo y repuesto." },
  { icon: BsCheck2Circle, title: "Sin turno", text: `${BUSINESS_PROFILE.hours.text}.` },
  { icon: BsCreditCard, title: "3 cuotas sin interés", text: INSTALLMENTS_MESSAGE },
];

const SYMPTOMS = [
  { icon: BsPhone, title: "Pantalla rota o con líneas", text: "Vidrio, imagen o táctil.", href: "/reparaciones/cambio-pantalla-caba" },
  { icon: BsBatteryHalf, title: "La batería no dura", text: "Medimos el consumo antes de cambiarla.", href: "/reparaciones/cambio-bateria-caba" },
  { icon: BsLightningChargeFill, title: "No carga", text: "Puede ser pin, flex o placa.", href: "/reparaciones/cambio-pin-carga-caba" },
  { icon: BsCameraFill, title: "Cámara borrosa", text: "Lente exterior o módulo.", href: "/reparaciones/cambio-camara-caba" },
  { icon: BsDroplet, title: "Se mojó", text: "Traelo apagado cuanto antes.", href: "/reparaciones/recuperacion-celular-mojado-caba" },
  { icon: BsCpu, title: "No enciende", text: `Revisión de placa ${formatArsPrice(PLACA_REVISION_PRICE)}, se descuenta si se repara.`, href: "/reparaciones/reparacion-placa-caba" },
];

const STEPS = [
  { icon: BsChatDots, title: "Nos contás", text: "Modelo y falla, por WhatsApp o en el mostrador." },
  { icon: BsSearch, title: "Lo revisamos", text: "Diagnóstico el mismo día, antes de cotizar." },
  { icon: BsTools, title: "Aprobás y reparamos", text: "Precio y plazo confirmados antes de abrirlo." },
  { icon: BsShieldCheck, title: "Te lo llevás probado", text: "Con garantía escrita de 90 días." },
];

export default function IphoneHubPage() {
  const SITE_URL = getSiteUrl();

  return (
    <section className="w-full max-w-6xl px-6 py-14 pb-24 md:px-8">
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: `${SITE_URL}/` },
          { name: "Reparaciones", url: `${SITE_URL}/reparaciones` },
          { name: "iPhone", url: `${SITE_URL}${PATH}` },
        ]}
      />

      <header className="grid items-center gap-10 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <span className="tc-eyebrow">iPhone · precios publicados</span>
          <h1 className="tc-display mt-6 text-[#f5f5f7]">Elegí tu iPhone y mirá cuánto sale arreglarlo</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#a1a1a6]">
            Tocá tu modelo y vas directo al precio de pantalla y batería. Reparamos en
            Paraguay 2451 (Recoleta) y Amenábar 2032 (Belgrano). Precios vigentes a{" "}
            {IPHONE_PRICES_UPDATED}.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#modelos" className="tc-btn tc-btn-primary">
              Elegir modelo
            </a>
            <TrackedCtaLink
              href={`${BUSINESS_PROFILE.whatsapp}?text=${encodeURIComponent("Hola Team Celular, quiero reparar mi iPhone. Modelo y falla:")}`}
              ctaName="iphone_hub_whatsapp"
              ctaLocation="iphone_hub_hero"
              ctaVariant="whatsapp"
              external
              className="tc-btn tc-btn-ghost"
            >
              Consultar por WhatsApp
            </TrackedCtaLink>
          </div>
        </div>
        <Image
          src="/images/portada_iphone.webp"
          alt="Portada de la guía de reparación de iPhone de Team Celular"
          width={1086}
          height={1448}
          priority
          sizes="(min-width: 768px) 360px, 100vw"
          className="mx-auto max-h-[420px] w-auto rounded-[28px] object-cover"
        />
      </header>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TRUST.map(({ icon: Icon, title, text }) => (
          <li key={title} className="rounded-[28px] bg-[#1d1d1f] p-6">
            <Icon aria-hidden="true" className="h-7 w-7 text-[#6aa6ff]" />
            <p className="mt-4 font-semibold text-[#f5f5f7]">{title}</p>
            <p className="mt-1 text-sm text-[#a1a1a6]">{text}</p>
          </li>
        ))}
      </ul>

      <section id="modelos" className="mt-16 scroll-mt-24">
        <h2 className="tc-heading text-[#f5f5f7]">¿Cuál es el tuyo?</h2>
        <p className="mt-3 max-w-2xl text-[#a1a1a6]">
          Si dudás, fijate en Ajustes → General → Información. El nombre completo importa:
          un 13 y un 13 Pro no llevan la misma pantalla.
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pagedModels.map(({ model, notes }, index) => (
            <li key={model.slug}>
              <Link
                href={`${PATH}/${model.slug}`}
                className="group flex h-full flex-col rounded-[28px] bg-[#1d1d1f] p-6 transition-colors hover:bg-[#333336] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6aa6ff]"
              >
                <div className="flex h-[150px] items-end justify-center">
                  <PhoneSilhouette panel={notes.panel} tint={SCREEN_TINTS[index % SCREEN_TINTS.length]} />
                </div>
                <p className="mt-5 text-lg font-semibold text-[#f5f5f7]">{model.name}</p>
                <p className="mt-1 text-xs text-[#86868b]">
                  {inchesOf(notes.panel).toLocaleString("es-AR")}″ · {notes.panel.startsWith("LCD") ? "LCD" : "OLED"} · {notes.port}
                </p>
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <dt className="flex items-center gap-2 text-[#a1a1a6]">
                      <BsPhone aria-hidden="true" /> Pantalla
                    </dt>
                    <dd className="font-semibold text-[#f5f5f7]">{priceLabel(model.screen)}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="flex items-center gap-2 text-[#a1a1a6]">
                      <BsBatteryHalf aria-hidden="true" /> Batería
                    </dt>
                    <dd className="font-semibold text-[#f5f5f7]">{priceLabel(model.battery)}</dd>
                  </div>
                </dl>
                <p className="mt-auto pt-5 text-sm font-semibold text-[#6aa6ff]">Ver detalle →</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="tc-heading text-[#f5f5f7]">¿Qué le pasa?</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SYMPTOMS.map(({ icon: Icon, title, text, href }) => (
            <li key={title}>
              <Link
                href={href}
                className="flex h-full items-start gap-4 rounded-[28px] bg-[#1d1d1f] p-6 transition-colors hover:bg-[#333336]"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1766f2]/15">
                  <Icon aria-hidden="true" className="h-6 w-6 text-[#6aa6ff]" />
                </span>
                <span>
                  <span className="block font-semibold text-[#f5f5f7]">{title}</span>
                  <span className="mt-1 block text-sm text-[#a1a1a6]">{text}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="tc-heading text-[#f5f5f7]">Cómo es el arreglo</h2>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, title, text }, index) => (
            <li key={title} className="relative rounded-[28px] bg-[#1d1d1f] p-6">
              <span aria-hidden="true" className="absolute right-6 top-4 text-5xl font-semibold text-[#333336]">
                {index + 1}
              </span>
              <Icon aria-hidden="true" className="h-7 w-7 text-[#6aa6ff]" />
              <p className="mt-4 font-semibold text-[#f5f5f7]">{title}</p>
              <p className="mt-1 text-sm text-[#a1a1a6]">{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16">
        <h2 className="tc-heading text-[#f5f5f7]">¿Tu modelo no está arriba?</h2>
        <p className="mt-3 max-w-2xl text-[#a1a1a6]">
          También lo reparamos. Estos son los precios del resto de la línea.
        </p>
        <div className="mt-6 overflow-x-auto rounded-[28px] bg-[#1d1d1f]">
          <table className="w-full min-w-[420px] text-left text-sm">
            <thead className="text-[#86868b]">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium">Modelo</th>
                <th scope="col" className="px-6 py-4 font-medium">Pantalla</th>
                <th scope="col" className="px-6 py-4 font-medium">Batería</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#333336]">
              {otherModels.map((model) => (
                <tr key={model.slug}>
                  <th scope="row" className="px-6 py-3 font-medium text-[#f5f5f7]">{model.name}</th>
                  <td className="px-6 py-3 text-[#a1a1a6]">{priceLabel(model.screen)}</td>
                  <td className="px-6 py-3 text-[#a1a1a6]">{priceLabel(model.battery)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-[#86868b]">
          El número exacto se confirma después del diagnóstico.{" "}
          <Link href="/guias/reparacion-iphone-buenos-aires" className="font-semibold text-[#6aa6ff] hover:underline">
            Guía completa de reparación de iPhone →
          </Link>
        </p>
      </section>

      <section className="mt-16 rounded-[28px] bg-[#1d1d1f] p-8 text-center">
        <h2 className="text-2xl font-semibold text-[#f5f5f7]">¿Lo querés tener arreglado hoy?</h2>
        <p className="mx-auto mt-3 max-w-xl text-[#a1a1a6]">
          Mandanos el modelo y qué le pasa. Te confirmamos repuesto, precio y plazo antes de que vengas.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <TrackedCtaLink
            href="/presupuesto-reparacion#solicitar-presupuesto"
            ctaName="iphone_hub_budget"
            ctaLocation="iphone_hub_footer"
            ctaVariant="primary"
            className="tc-btn tc-btn-primary"
          >
            Pedir presupuesto
          </TrackedCtaLink>
          <Link href="/sucursales" className="tc-btn tc-btn-ghost">
            Cómo llegar
          </Link>
        </div>
      </section>
    </section>
  );
}
