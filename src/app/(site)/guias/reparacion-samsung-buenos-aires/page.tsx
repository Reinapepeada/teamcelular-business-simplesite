import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import ArticleSchema from "@/components/seo/ArticleSchema";
import AuthorByline from "@/components/seo/AuthorByline";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import TrackedCtaLink from "@/components/cro/TrackedCtaLink";
import GoogleReviewsAPI from "@/components/cards/GoogleReviewsAPI";
import GuideInterlinkSection from "@/components/seo/GuideInterlinkSection";
import { INSTALLMENTS_MESSAGE, WARRANTY_SCOPE_MESSAGE } from "@/lib/copyStandards";
import {
  FaBolt,
  FaCamera,
  FaCheckCircle,
  FaMobileAlt,
  FaMicrochip,
  FaShieldAlt,
  FaTools,
  FaWrench,
} from "react-icons/fa";
import { SiSamsung } from "react-icons/si";
import GuideByline from "@/components/seo/GuideByline";
import { BRAND_REPAIR_PRICES, CHARGING_PORT_PRICE, PRICES_UPDATED_LABEL, buildPriceOffers, formatArsPrice, priceRangeOf } from "@/lib/repairPrices";

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";
const PAGE_PATH = "/guias/reparacion-samsung-buenos-aires";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const SCREEN_A = BRAND_REPAIR_PRICES.samsung[0];
const SCREEN_S = BRAND_REPAIR_PRICES.samsung[1];
const BATTERY_A = BRAND_REPAIR_PRICES.samsung[2];
const BATTERY_S = BRAND_REPAIR_PRICES.samsung[3];
const formatRange = (price: { from: number; to: number }) =>
  `${formatArsPrice(price.from)} a ${formatArsPrice(price.to)}`;

export const metadata: Metadata = {
  title: "Reparación Samsung en CABA | Precios de Pantalla",
  description:
    `¿Cuánto sale cambiar la pantalla de un Samsung? Galaxy A/M desde ${formatArsPrice(SCREEN_A.from)} y S/Ultra desde ${formatArsPrice(SCREEN_S.from)}. Recoleta y Belgrano, CABA.`,
  keywords: [
    "reparacion samsung buenos aires",
    "service samsung caba",
    "cambio pantalla samsung amoled",
    "reparacion galaxy s24",
    "reparar samsung z fold",
    "cambio bateria samsung recoleta",
    "reparacion placa samsung",
    "servicio tecnico galaxy a",
    "reparar puerto usb c samsung",
    "tecnico samsung buenos aires",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  authors: [{ name: "Team Celular" }],
  creator: "Team Celular",
  publisher: "Team Celular",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Reparación de Samsung Galaxy en Buenos Aires, CABA | Team Celular",
    description:
      "Team Celular, Paraguay 2451 Recoleta CABA. Pantalla AMOLED, batería y USB-C en el día, diagnóstico mismo día y garantía escrita 90 días. Galaxy S, A y Z.",
    type: "article",
    url: PAGE_URL,
    locale: "es_AR",
    images: [
      {
        url: "https://teamcelular.com/images/guia_samsung.webp",
        width: 1200,
        height: 630,
        alt: "Reparación de Samsung Galaxy en Team Celular",
      },
    ],
    publishedTime: "2026-03-12T00:00:00Z",
    modifiedTime: "2026-09-23T00:00:00Z",
    section: "Guías técnicas",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reparación de Samsung Galaxy en CABA | Team Celular",
    description:
      "Team Celular, Paraguay 2451 Recoleta. Pantalla AMOLED y batería en el día, garantía escrita 90 días. Galaxy S, A, Note y Z Fold.",
    images: ["https://teamcelular.com/images/guia_samsung.webp"],
  },
};

const brandLinks = [
  {
    href: "/guias/reparacion-iphone-buenos-aires",
    label: "iPhone",
    helper: "Apple con True Tone y Face ID",
    active: false,
  },
  {
    href: "/guias/reparacion-samsung-buenos-aires",
    label: "Samsung",
    helper: "Galaxy S, A, Z Fold y Z Flip",
    active: true,
  },
  {
    href: "/guias/reparacion-xiaomi-buenos-aires",
    label: "Xiaomi",
    helper: "Xiaomi, Redmi y POCO",
    active: false,
  },
  {
    href: "/guias/reparacion-motorola-buenos-aires",
    label: "Motorola",
    helper: "Moto G, Edge y Razr",
    active: false,
  },
];

const processSteps = [
  {
    title: "Lo probamos antes de abrirlo",
    description:
      "Anotamos el número de serie y probamos pantalla, cámaras, sensores, WiFi, Bluetooth y carga rápida con vos adelante. Así queda claro qué andaba y qué no.",
    duration: "15 min",
    Icon: FaMobileAlt,
  },
  {
    title: "Buscamos la falla de origen",
    description:
      "Medimos consumo, líneas de carga del USB-C y estabilidad de la placa. Un Galaxy que se apaga no siempre necesita batería: a veces es el pin o un corto en placa.",
    duration: "30-45 min",
    Icon: FaTools,
  },
  {
    title: "Cambio de la pieza",
    description:
      "Antes de instalar te decimos si el repuesto es Service Pack (original de Samsung) u OLED compatible, y qué cambia entre uno y otro en tu modelo.",
    duration: "2-4 h",
    Icon: FaWrench,
  },
  {
    title: "Prueba final y garantía",
    description:
      `Probamos llamadas, cámaras, datos, carga rápida y temperatura antes de devolvértelo. ${WARRANTY_SCOPE_MESSAGE}`,
    duration: "20 min",
    Icon: FaCheckCircle,
  },
];

const repairServices = [
  {
    title: "Cambio de pantalla AMOLED Samsung",
    detail:
      "Líneas verdes, manchas negras o touch que no responde. Cambiamos el módulo completo y te avisamos si el repuesto mantiene los 120 Hz.",
    eta: "2-4 h",
    Icon: FaMobileAlt,
  },
  {
    title: "Batería que no dura",
    detail:
      "Se apaga con el frío, pasa de 30% a 0% de golpe o pierde carga sin usarlo. Si la tapa se levantó, apagalo: la batería está hinchada.",
    eta: "1-2 h",
    Icon: FaBolt,
  },
  {
    title: "Puerto USB-C y carga rápida",
    detail:
      "Carga solo en una posición, el cable queda flojo o dejó de aparecer la carga rápida. No lo limpies con una aguja: se doblan los pines.",
    eta: "2-3 h",
    Icon: FaShieldAlt,
  },
  {
    title: "Cámara que no enfoca o vibra",
    detail:
      "Fotos borrosas, zumbido al abrir la cámara o lente trasero partido. En Galaxy S suele ser el estabilizador (OIS) del módulo.",
    eta: "2-4 h",
    Icon: FaCamera,
  },
  {
    title: "Placa de Samsung",
    detail:
      "Queda en el logo, se reinicia solo o no prende después de un golpe o de mojarse. Revisión de placa $45.000, que se descuenta si se repara.",
    eta: "revisión 72 h",
    Icon: FaMicrochip,
  },
  {
    title: "Bisagra, flex y display en Z Fold / Z Flip",
    detail:
      "Revisamos pliegue, bisagra, flex y pantalla interna para ver si conviene cambiar una pieza o el conjunto. Te pasamos las dos opciones.",
    eta: "24-72 h",
    Icon: FaWrench,
  },
];

const samsungSymptomRows = [
  {
    symptom: "Pantalla con líneas, manchas o táctil que falla",
    urgency: "Alta si aparecen zonas negras o el táctil deja de responder",
    typicalTime: "2-4 h si hay módulo compatible en stock",
    nextStep: "Enviar modelo exacto y una foto para confirmar disponibilidad",
  },
  {
    symptom: "Batería dura poco, se apaga o se hincha",
    urgency: "Alta si levanta la tapa, calienta o baja de golpe",
    typicalTime: "1-2 h según modelo Galaxy",
    nextStep: "Apagarlo si está hinchado y pedir diagnóstico de consumo",
  },
  {
    symptom: "No carga, carga lento o el USB-C hace falso contacto",
    urgency: "Alta si solo carga en una posición o dejó de encender",
    typicalTime: "2-3 h para módulo de carga; más si la falla está en placa",
    nextStep: "No forzar el conector y consultar con el modelo exacto",
  },
  {
    symptom: "Queda en el logo, reinicia o se mojó",
    urgency: "Crítica si tuvo contacto con líquido: no cargar ni aplicar calor",
    typicalTime: "24-48 h para limpieza y diagnóstico de placa",
    nextStep: "Traerlo apagado al laboratorio lo antes posible",
  },
  {
    symptom: "Z Fold o Z Flip no abre, no da imagen o falla en el pliegue",
    urgency: "Alta para evitar que el flex o la pantalla interna se dañen más",
    typicalTime: "24-72 h según bisagra, flex y repuesto",
    nextStep: "No forzar la bisagra y solicitar evaluación específica",
  },
];

const repairLinks: Record<string, string> = {
  "Cambio de pantalla AMOLED Samsung": "/reparaciones/cambio-pantalla-caba",
  "Batería que no dura": "/reparaciones/cambio-bateria-caba",
  "Puerto USB-C y carga rápida": "/reparaciones/cambio-pin-carga-caba",
  "Cámara que no enfoca o vibra": "/reparaciones/cambio-camara-caba",
  "Placa de Samsung": "/reparaciones/reparacion-placa-caba",
};


const samsungModels = [
  "Galaxy S25 Ultra",
  "Galaxy S25 Edge",
  "Galaxy S25+",
  "Galaxy S25",
  "Galaxy S24 Ultra",
  "Galaxy S24+",
  "Galaxy S24",
  "Galaxy S23 Ultra",
  "Galaxy S23+",
  "Galaxy S23",
  "Galaxy S22 Ultra",
  "Galaxy S22",
  "Galaxy S21 FE",
  "Galaxy A56",
  "Galaxy A55",
  "Galaxy A54",
  "Galaxy A36",
  "Galaxy A35",
  "Galaxy A34",
  "Galaxy A26",
  "Galaxy A24",
  "Galaxy A16",
  "Galaxy A15",
  "Galaxy Z Fold6",
  "Galaxy Z Fold5",
  "Galaxy Z Flip6",
  "Galaxy Z Flip5",
  "Galaxy Note 20 Ultra",
];

const faq = [
  {
    question: "¿Cuánto sale cambiar la pantalla de un celular Samsung?",
    answer: `En Team Celular, el cambio de pantalla Galaxy A / M va de ${formatRange(SCREEN_A)} y Galaxy S / Ultra de ${formatRange(SCREEN_S)}. Son rangos en pesos argentinos por familia, no un precio único para todos los modelos. El valor exacto depende del modelo, la calidad del módulo y el stock; lo confirmamos antes de reparar.`,
  },
  {
    question: "¿Cuánto cuesta la pantalla de un Samsung A16, A35, A54 o A55?",
    answer: `Esos modelos pertenecen a la línea Galaxy A, cuyo cambio de pantalla va de ${formatRange(SCREEN_A)}. Cada modelo usa un módulo distinto. Mandanos el modelo exacto para confirmar las opciones, el precio y la disponibilidad; el rango no significa que todos cuesten lo mismo.`,
  },
  {
    question: "¿Por qué cambia tanto el precio de una pantalla Samsung?",
    answer: "Cambia por el modelo y por el módulo que se instala. Un Service Pack, una OLED compatible y una alternativa económica pueden conservar distintas prestaciones de brillo, color, huella o tasa de refresco. Te explicamos las opciones disponibles para tu equipo antes de elegir y de instalar.",
  },
  {
    question: "¿Cuánto tarda un cambio de pantalla Samsung?",
    answer:
      "Si el módulo está en stock, entre 2 y 4 horas en las líneas S y A. Si hay que pedirlo, te avisamos el plazo antes de que lo dejes.",
  },
  {
    question: "¿Se mantiene la tasa de refresco de 120 Hz?",
    answer:
      "Depende del repuesto: hay pantallas compatibles que no llegan a 120 Hz. Te lo decimos antes de instalar para que elijas.",
  },
  {
    question: "¿Reparan Samsung mojados?",
    answer:
      "Sí. Lo abrimos, limpiamos la placa y medimos la corrosión. Lo más importante: no lo cargues ni lo metas en arroz, traelo apagado cuanto antes.",
  },
  {
    question: "¿Arreglan Z Fold y Z Flip?",
    answer:
      "Sí. Son los más delicados: revisamos bisagra, flex y pantalla interna, y el trabajo lleva de 24 a 72 horas según el repuesto.",
  },
  {
    question: "¿La reparación tiene garantía?",
    answer: `Sí. ${WARRANTY_SCOPE_MESSAGE}`,
  },
  {
    question: "¿Qué diferencia hay entre pantalla Service Pack, OLED compatible y alternativa económica?",
    answer:
      "La pantalla Service Pack prioriza las especificaciones originales del equipo. Una OLED compatible puede ofrecer una buena relación entre costo y resultado, mientras que una alternativa económica puede cambiar brillo, color, consumo o respuesta táctil. Antes de instalar te informamos qué opción hay para tu modelo y qué funciones conserva.",
  },
  {
    question: "¿Reparan Samsung Galaxy A16, A15, A35, A54 y A55?",
    answer:
      "Sí. Trabajamos las líneas Galaxy A y confirmamos stock de pantalla, batería o módulo de carga según el código exacto del equipo antes de desarmar.",
  },
  {
    question: "¿Reparan Samsung Galaxy S23, S24 y S25 Ultra?",
    answer:
      "Sí. En la línea Galaxy S revisamos pantalla AMOLED, cámaras, carga, batería y placa. En modelos Ultra verificamos además respuesta táctil, tasa de refresco y funciones asociadas al repuesto elegido.",
  },
  {
    question: "¿Es un servicio oficial de Samsung?",
    answer:
      "No somos un centro oficial Samsung. Somos un laboratorio técnico independiente en CABA y explicamos por escrito el diagnóstico, el repuesto ofrecido, el tiempo estimado y la garantía antes de avanzar.",
  },
  {
    question: "¿Cuánto cuesta el diagnóstico si no hago la reparación?",
    answer:
      "El diagnóstico tiene costo y se informa antes de abrir el equipo. Si aprobás la reparación, ese monto se descuenta del trabajo final. Confirmamos el valor exacto al recibir el Samsung.",
  },
];

export default function SamsungRepairGuidePage() {
  return (
    <div className="flex w-full justify-center px-4 py-16">
      <ArticleSchema
        title="Reparación de Samsung en CABA: precios y opciones"
        description="Precios, tiempos y fallas comunes de Samsung Galaxy, con diagnóstico el mismo día y garantía escrita de 90 días en CABA."
        publishedTime="2026-03-12T00:00:00Z"
        modifiedTime="2026-10-14T00:00:00Z"
        about={[
          "reparacion de Samsung en Buenos Aires",
          "service tecnico Samsung Galaxy en CABA",
          "cambio de pantalla AMOLED Samsung",
          "cambio de bateria Samsung Galaxy",
          "reparacion de Galaxy S, A, Z Fold y Z Flip",
        ]}
        image="https://teamcelular.com/images/guia_samsung.webp"
        url={PAGE_URL}
      />

      <article className="w-full max-w-6xl space-y-14">
        <BreadcrumbJsonLd
          items={[
            { name: "Inicio", url: `${SITE_URL}/` },
            { name: "Guías", url: `${SITE_URL}/guias` },
            { name: "Reparación de Samsung", url: PAGE_URL },
          ]}
        />

        <nav className="flex items-center gap-2 text-sm text-slate-600 dark:text-[#86868b]">
          <Link href="/" className="transition hover:text-primary">
            Inicio
          </Link>
          <span>/</span>
          <Link href="/guias" className="transition hover:text-primary">
            Guías
          </Link>
          <span>/</span>
          <span className="font-semibold text-slate-900 dark:text-[#f5f5f7]">
            Reparación Samsung
          </span>
        </nav>

        <header className="bg-[#1d1d1f] space-y-8 rounded-[28px] p-8 md:p-14">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/70 bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              <SiSamsung />
              Especialistas por marca
            </span>
            <span className="rounded-full border border-emerald-700/80 bg-emerald-700 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white">
              Recoleta y Belgrano · CABA
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-[-0.01em] text-slate-900 dark:text-[#f5f5f7] md:text-5xl">
              Reparación de Samsung en CABA: precios y opciones
            </h1>
            <p className="max-w-4xl text-lg leading-relaxed text-slate-700 dark:text-[#a1a1a6]">
              El cambio de pantalla Samsung Galaxy A / M cuesta desde {formatArsPrice(SCREEN_A.from)}{" "}
              y Galaxy S / Ultra desde {formatArsPrice(SCREEN_S.from)}. El modelo y el módulo
              elegido definen el valor exacto. Confirmamos precio y stock antes de trabajar,
              en Recoleta (Paraguay 2451) y Belgrano (Amenábar 2032).
            </p>
            <div className="mt-4">
              <GuideByline modifiedTime="2026-10-14T00:00:00Z" tone="light" />
            </div>
          </div>

          <section aria-labelledby="samsung-screen-prices" className="space-y-4">
            <h2 id="samsung-screen-prices" className="text-2xl font-semibold text-white">
              ¿Cuánto sale cambiar la pantalla de un celular Samsung?
            </h2>
            <dl className="grid gap-4 sm:grid-cols-2">
              {[SCREEN_A, SCREEN_S].map((price) => (
                <div key={price.name} className="rounded-2xl bg-black/25 p-5">
                  <dt className="text-sm text-[#c7c7cc]">{price.name}</dt>
                  <dd className="mt-2 text-xl font-semibold leading-snug text-white tabular-nums">
                    {formatRange(price)}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="text-sm leading-6 text-[#a1a1a6]">
              Precios en pesos argentinos. El modelo y la calidad del módulo definen el valor exacto.
              Pantalla en 2 a 4 horas si hay stock, con garantía escrita de 90 días.
            </p>
          </section>

          <div className="flex flex-wrap gap-3">
            {brandLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full border px-5 py-3 text-sm font-semibold transition ${
                  item.active
                    ? "border-primary bg-primary text-white shadow-lg shadow-primary/25"
                    : "border-slate-300/80 bg-white/80 text-slate-700 hover:border-primary/40 hover:text-primary dark:border-slate-600/70 dark:bg-slate-900/70 dark:text-slate-200"
                }`}
              >
                {item.label}
                <span className="ml-2 text-xs font-medium">{item.helper}</span>
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/presupuesto-reparacion"
              className="tc-btn tc-btn-primary"
            >
              Cotizar reparación Samsung
            </Link>
            <TrackedCtaLink
              href="https://wa.me/5491151034595?text=Hola%20Team%20Celular%2C%20quiero%20saber%20el%20precio%20del%20cambio%20de%20pantalla%20de%20mi%20Samsung.%20Modelo%3A"
              ctaName="samsung_screen_price_whatsapp"
              ctaLocation="samsung_guide_hero"
              ctaVariant="whatsapp"
              external
              className="tc-btn tc-btn-ghost"
            >
              Consultar precio de mi Samsung
            </TrackedCtaLink>
            <a href="#costos-reparacion-samsung" className="tc-link inline-flex min-h-11 items-center text-sm">
              Ver todos los precios
            </a>
          </div>
        </header>

        <section id="costos-reparacion-samsung" className="scroll-mt-24 bg-[#1d1d1f] rounded-[28px]">
          <div className="border-b border-slate-100 px-8 py-5 dark:border-slate-800">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-[#f5f5f7]">
              ¿Cuánto cuesta reparar un Samsung Galaxy en Buenos Aires?
            </h2>
            <p className="mt-1 text-[0.95rem] text-slate-600 dark:text-[#86868b]">
              Precios publicados el {PRICES_UPDATED_LABEL}. El rango depende del modelo dentro de cada línea y del repuesto disponible: te confirmamos el número exacto tras el diagnóstico, antes de intervenir el equipo. {INSTALLMENTS_MESSAGE}
            </p>
          </div>
          <div className="overflow-x-auto px-6 py-2">
            <table className="w-full min-w-[38rem] border-collapse text-left text-sm">
              <caption className="sr-only">
                Precios de reparación de Samsung Galaxy en CABA, actualizados en agosto de 2026
              </caption>
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th scope="col" className="py-3 pr-4 font-semibold text-slate-900 dark:text-[#f5f5f7]">Servicio</th>
                  <th scope="col" className="py-3 pr-4 font-semibold text-slate-900 dark:text-[#f5f5f7]">Modelos</th>
                  <th scope="col" className="py-3 pr-4 font-semibold text-slate-900 dark:text-[#f5f5f7]">Tiempo</th>
                  <th scope="col" className="py-3 font-semibold text-slate-900 dark:text-[#f5f5f7]">Precio ARS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {[
                  { servicio: "Diagnóstico técnico", modelos: "Todos los modelos", tiempo: "30–45 min", precio: "$15.000 a $25.000" },
                  { servicio: "Cambio de pantalla", modelos: "Galaxy S / Ultra (S22 a S25)", tiempo: "2–4 h", precio: formatRange(SCREEN_S) },
                  { servicio: "Cambio de pantalla", modelos: "Galaxy A / M (A16, A26, A35, A36, A54, A55, A56)", tiempo: "2–4 h", precio: formatRange(SCREEN_A) },
                  { servicio: "Cambio de batería", modelos: "Galaxy S / Ultra", tiempo: "1–2 h", precio: formatRange(BATTERY_S) },
                  { servicio: "Cambio de batería", modelos: "Galaxy A / M", tiempo: "1–2 h", precio: formatRange(BATTERY_A) },
                  { servicio: "Cambio de pin de carga", modelos: "Línea S y A", tiempo: "2–3 h", precio: formatRange(CHARGING_PORT_PRICE) },
                  { servicio: "Bisagra / flex", modelos: "Z Fold, Z Flip", tiempo: "24–72 h", precio: "Consultar" },
                ].map((row) => (
                  <tr key={`${row.servicio}-${row.modelos}`}>
                    <td className="py-3 pr-4 font-semibold text-slate-900 dark:text-[#f5f5f7]">{row.servicio}</td>
                    <td className="py-3 pr-4 text-slate-500 dark:text-[#86868b]">{row.modelos}</td>
                    <td className="py-3 pr-4 text-slate-500 dark:text-[#86868b]">{row.tiempo}</td>
                    <td className="py-3 font-semibold tabular-nums text-primary">{row.precio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="space-y-4 px-8 py-6">
            <p className="text-sm leading-6 text-slate-600 dark:text-[#86868b]">
              Team Celular, con sucursales en Recoleta (Paraguay 2451) y Belgrano (Amenábar 2032) CABA, informa el costo de diagnóstico antes de abrir el equipo. Si avanzás con la reparación, ese monto se descuenta del trabajo final.
            </p>
            <TrackedCtaLink
              ctaName="samsung_price_table_budget"
              ctaLocation="samsung_guide_prices"
              ctaVariant="primary"
              href="/presupuesto-reparacion#solicitar-presupuesto"
              className="inline-flex min-h-11 items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90"
            >
              Pedir presupuesto exacto para mi Samsung
            </TrackedCtaLink>
          </div>
        </section>

        <AuthorByline updatedLabel="14 de octubre de 2026" className="mt-6" />

        <section className="grid gap-5 lg:grid-cols-[0.9fr_1.4fr]">
          <div className="rounded-3xl border border-primary/20 bg-primary/10 p-7 dark:border-primary/30 dark:bg-primary/15">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Respuesta directa
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-[#f5f5f7]">
              Cómo pedir el precio exacto de tu Samsung
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-700 dark:text-slate-200">
              Para cotizar tu Samsung, necesitamos el modelo exacto y la falla.
              En la línea A / M, la pantalla va de {formatRange(SCREEN_A)} y la batería
              de {formatRange(BATTERY_A)}. En S / Ultra, la pantalla va de {formatRange(SCREEN_S)}{" "}
              y la batería de {formatRange(BATTERY_S)}. Son rangos por familia: confirmamos
              qué módulo está disponible y qué funciones conserva antes de instalarlo.
              Podés comparar las opciones del{' '}
              <Link href="/reparaciones/cambio-pantalla-caba" className="tc-link underline underline-offset-4">
                servicio de cambio de pantalla
              </Link>{' '}
              o consultar el precio de tu modelo por WhatsApp.
            </p>
          </div>

          <div className="bg-[#1d1d1f] overflow-hidden rounded-[28px]">
            <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-700">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-[#f5f5f7]">
                Qué hacer según la falla del Samsung
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-[#a1a1a6]">
                Una referencia rápida para no agravar el daño antes del diagnóstico.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-[760px] w-full text-left text-sm">
                <thead className="bg-slate-100/80 text-slate-700 dark:bg-slate-800/80 dark:text-slate-200">
                  <tr>
                    <th scope="col" className="px-5 py-4 font-semibold">Síntoma</th>
                    <th scope="col" className="px-5 py-4 font-semibold">Urgencia</th>
                    <th scope="col" className="px-5 py-4 font-semibold">Tiempo típico</th>
                    <th scope="col" className="px-5 py-4 font-semibold">Siguiente paso</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {samsungSymptomRows.map((row) => (
                    <tr key={row.symptom} className="bg-white/70 dark:bg-slate-900/40">
                      <td className="px-5 py-4 font-semibold text-slate-900 dark:text-[#f5f5f7]">{row.symptom}</td>
                      <td className="px-5 py-4 text-slate-700 dark:text-[#a1a1a6]">{row.urgency}</td>
                      <td className="px-5 py-4 text-slate-700 dark:text-[#a1a1a6]">{row.typicalTime}</td>
                      <td className="px-5 py-4 text-slate-700 dark:text-[#a1a1a6]">{row.nextStep}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <GoogleReviewsAPI />

        <section className="space-y-7">
          <div className="text-center">
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-[1.1] text-slate-900 dark:text-[#f5f5f7]">
              ¿Cómo es el proceso de reparación de Samsung en Team Celular?
            </h2>
            <p className="mt-2 text-lg text-slate-600 dark:text-[#a1a1a6]">
              Así trabajamos cada Galaxy que entra al taller
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {processSteps.map((step) => {
              const Icon = step.Icon;
              return (
                <article
                  key={step.title}
                  className="bg-[#1d1d1f] rounded-[28px] p-6 transition"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-2xl text-white">
                      <Icon />
                    </div>
                    <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                      {step.duration}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-[#f5f5f7]">
                    {step.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-slate-700 dark:text-[#a1a1a6]">
                    {step.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="space-y-7">
          <div className="text-center">
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-[1.1] text-slate-900 dark:text-[#f5f5f7]">
              ¿Cuáles son las reparaciones de Samsung más comunes en Buenos Aires?
            </h2>
            <p className="mt-2 text-lg text-slate-600 dark:text-[#a1a1a6]">
              Galaxy S, A, Note y Z Fold: los seis trabajos que más se piden cada semana
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {repairServices.map((service) => {
              const Icon = service.Icon;
              return (
                <article
                  key={service.title}
                  className="bg-[#1d1d1f] rounded-[28px] p-6 transition"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-xl text-primary">
                    <Icon />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-[#f5f5f7]">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-[#a1a1a6]">
                    {service.detail}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs font-semibold">
                    <span className="rounded-full bg-primary px-3 py-1 text-white">
                      {service.eta}
                    </span>
                  </div>
                  {repairLinks[service.title] && (
                    <Link
                      href={repairLinks[service.title]}
                      className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary transition hover:underline"
                    >
                      Ver precio y detalles →
                    </Link>
                  )}
                </article>
              );
            })}
          </div>
        </section>


        <section className="bg-[#1d1d1f] space-y-5 rounded-[28px] p-8 md:p-10">
          <h2 className="text-center text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-[1.1] text-slate-900 dark:text-[#f5f5f7]">
            ¿Qué modelos Samsung reparan en Team Celular?
          </h2>
          <p className="text-center text-slate-600 dark:text-[#a1a1a6]">
            Cobertura para familias Galaxy S, A, Note y plegables Z.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {samsungModels.map((model) => (
              <span
                key={model}
                className="inline-flex min-h-11 items-center rounded-full border border-primary/40 bg-primary/15 px-4 py-2 text-[13px] font-semibold text-slate-800 dark:border-primary/40 dark:bg-primary/20 dark:text-[#f5f5f7]"
              >
                {model}
              </span>
            ))}
          </div>
        </section>

        <section className="space-y-7">
          <div className="text-center">
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-[1.1] text-slate-900 dark:text-[#f5f5f7]">
              Preguntas frecuentes sobre reparación de Samsung
            </h2>
            <p className="mt-2 text-lg text-slate-600 dark:text-[#a1a1a6]">
              Lo que más nos preguntan antes de dejar el equipo
            </p>
          </div>
          <div className="space-y-4">
            {faq.map((item) => (
              <details
                key={item.question}
                className="bg-[#1d1d1f] rounded-[28px] p-6 transition"
              >
                <summary className="flex min-h-11 items-center cursor-pointer text-lg font-semibold text-slate-900 dark:text-[#f5f5f7]">
                  {item.question}
                </summary>
                <p className="mt-4 leading-relaxed text-slate-700 dark:text-[#a1a1a6]">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>



        <GuideInterlinkSection currentGuide="/guias/reparacion-samsung-buenos-aires" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Reparación de Samsung en Buenos Aires",
              description:
                "Reparación de Samsung Galaxy en CABA: pantalla, batería, carga y placa, con garantía escrita de 90 días.",
              provider: { "@id": "https://teamcelular.com#localbusiness" },
              // Rango y catalogo salen de repairPrices: un unico lugar donde el precio
              // visible y el structured data no pueden divergir.
              priceRange: `ARS ${priceRangeOf(BRAND_REPAIR_PRICES.samsung).low.toLocaleString("es-AR")}-${priceRangeOf(BRAND_REPAIR_PRICES.samsung).high.toLocaleString("es-AR")}`,
              ...buildPriceOffers(BRAND_REPAIR_PRICES.samsung, "Samsung Galaxy"),
              areaServed: {
                "@type": "City",
                name: "Buenos Aires",
              },
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faq.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.answer,
                },
              })),
            }),
          }}
        />
      </article>
    </div>
  );
}
