import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import ArticleSchema from "@/components/seo/ArticleSchema";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import GuideInterlinkSection from "@/components/seo/GuideInterlinkSection";
import { REVIEW_COST_MESSAGE, WARRANTY_SCOPE_MESSAGE } from "@/lib/copyStandards";
import GuideByline from "@/components/seo/GuideByline";
import RepairPriceTable from "@/components/seo/RepairPriceTable";
import BranchWhatsAppButton from "@/components/cro/BranchSelector";
import { BRAND_REPAIR_PRICES, PLACA_REVISION_PRICE, PRICES_UPDATED_LABEL, formatArsPrice, type RepairPrice } from "@/lib/repairPrices";
import { IPHONE_MODELS, IPHONE_MODELS_WITH_PAGE, priceLabel } from "@/app/(site)/reparaciones/iphone/iphoneModels";

// Precios citables: minimos reales de las mismas fuentes que las tablas.
const ANDROID_BATTERY_FROM = Math.min(
  ...Object.values(BRAND_REPAIR_PRICES)
    .flat()
    .filter((p) => /bater/i.test(p.name))
    .map((p) => p.from),
);
// Una entrada por página de modelo: así las búsquedas de batería por modelo
// tienen un enlace a esa URL y no solo a los productos de la tienda.
const IPHONE_BATTERY_PAGES = IPHONE_MODELS.filter((m) =>
  (IPHONE_MODELS_WITH_PAGE as readonly string[]).includes(m.slug),
);
const IPHONE_BATTERY_FROM = Math.min(
  ...IPHONE_MODELS.map((m) => m.battery).filter((v): v is number => v !== null),
);
const batteryPriceRows: RepairPrice[] = [
  {
    name: "Cambio de batería iPhone",
    from: IPHONE_BATTERY_FROM,
    to: Math.max(...IPHONE_MODELS.map((model) => model.battery).filter((value): value is number => value !== null)),
    href: "/reparaciones/cambio-bateria-caba",
  },
  ...Object.entries(BRAND_REPAIR_PRICES).map(([brand, prices]) => {
    const batteries = prices.filter((price) => /bater/i.test(price.name));
    return {
      name: `Cambio de batería ${brand.charAt(0).toUpperCase()}${brand.slice(1)}`,
      from: Math.min(...batteries.map((price) => price.from)),
      to: Math.max(...batteries.map((price) => price.to)),
      href: "/reparaciones/cambio-bateria-caba",
    };
  }),
];
import {
  FaBatteryFull,
  FaBatteryHalf,
  FaBatteryQuarter,
  FaTools,
  FaCheckCircle,
  FaShieldAlt,
  FaClock,
  FaExclamationTriangle,
  FaMobileAlt,
  FaChartLine,
} from "react-icons/fa";

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";

export const metadata: Metadata = {
  title: "Cambio de batería de celular en CABA: en 1 a 2 horas",
  description:
    "Cambio de batería de celular en Recoleta y Belgrano, CABA, desde $89.900. En 1 a 2 horas con repuesto en stock. Precio y plazo confirmados antes de reparar.",
  keywords: [
    "cambio batería celular Buenos Aires",
    "batería iPhone original",
    "batería Samsung certificada",
    "reemplazo batería celular CABA",
    "batería celular garantía",
    "service batería Recoleta",
    "batería original celular",
    "cambio batería express",
  ],
  authors: [{ name: "Team Celular" }],
  creator: "Team Celular",
  publisher: "Team Celular",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Cambio de Batería Celular Buenos Aires | Service Certificado",
    description:
      "Cambio de batería según modelo y repuesto disponible. En 1 a 2 horas con stock y garantía escrita de 90 días sobre trabajo y repuesto.",
    type: "article",
    locale: "es_AR",
    url: "https://teamcelular.com/guias/cambio-bateria-celular",
    siteName: "Team Celular",
    images: [
      {
        url: "https://teamcelular.com/images/guia_cambio_bateria.webp",
        width: 1200,
        height: 630,
        alt: "Cambio de bateria de celular en Team Celular",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cambio de Batería Celular Buenos Aires",
    description: "Cambio de batería con repuesto y plazo confirmados antes de empezar. En 1 a 2 horas con stock. Garantía escrita de 90 días.",
    images: ["https://teamcelular.com/images/guia_cambio_bateria.webp"],
  },
  alternates: {
    canonical: "https://teamcelular.com/guias/cambio-bateria-celular",
  },
};

const batterySignals = [
  {
    title: "Apagones inesperados",
    description: "El celular se apaga con 20-30% de batería restante, especialmente en climas fríos o con apps exigentes.",
    Icon: FaExclamationTriangle,
    severity: "Alta",
  },
  {
    title: "Carga lenta o errática",
    description: "La carga tarda más de lo habitual o el porcentaje salta. Antes de atribuirlo a la batería, revisamos cable, cargador, puerto y consumo.",
    Icon: FaBatteryHalf,
    severity: "Media",
  },
  {
    title: "Sobrecalentamiento",
    description: "El equipo se calienta excesivamente durante la carga o uso normal, especialmente en la zona de la batería.",
    Icon: FaExclamationTriangle,
    severity: "Alta",
  },
  {
    title: "Duración reducida",
    description: "La autonomía bajó respecto de antes con un uso similar. Revisamos batería y consumo de aplicaciones para distinguir las causas.",
    Icon: FaBatteryQuarter,
    severity: "Media",
  },
  {
    title: "Hinchazón visible",
    description: "La tapa se levanta o la pantalla se separa del marco. Dejá de usarlo y cargarlo; no presiones la batería y traelo a revisar.",
    Icon: FaExclamationTriangle,
    severity: "Crítica",
  },
  {
    title: "Salud de batería baja",
    description: "Revisá el estado de batería y las recomendaciones del sistema cuando estén disponibles. Las estimaciones de apps Android no reemplazan una revisión técnica.",
    Icon: FaChartLine,
    severity: "Media",
  },
];

const batteryTypes = [
  {
    type: "Origen y documentación",
    description: "Antes de elegir, verificá qué pieza se ofrece para tu equipo. La procedencia informada debe respaldar cualquier afirmación de originalidad o certificación.",
    pros: ["Repuesto identificado en el presupuesto", "Garantía escrita de 90 días"],
  },
  {
    type: "Compatibilidad y capacidad",
    description: "La batería debe corresponder al modelo exacto. Confirmamos las características del repuesto disponible; una etiqueta comercial como AAA+ no demuestra por sí sola capacidad ni procedencia.",
    pros: ["Compatibilidad confirmada antes de instalar", "Precio y condiciones por escrito"],
  },
  {
    type: "Información de salud en iPhone",
    description: "La información de salud y los mensajes del historial de piezas dependen del modelo, del repuesto y de su verificación o vinculación. Te explicamos qué esperar antes de reparar.",
    pros: ["Funciones y límites informados", "Pruebas de carga y funcionamiento"],
  },
];

const replacementProcess = [
  {
    step: "1. Diagnóstico y verificación",
    detail: "Revisamos consumo, carga y la información de salud o ciclos que muestre el modelo. Si la falla requiere placa, se informa el costo y el plazo de esa revisión antes de continuar.",
    duration: "según modelo y falla",
    Icon: FaTools,
  },
  {
    step: "2. Desmontaje profesional",
    detail: "Abrimos el equipo con herramientas especializadas, desconectamos la batería de forma segura y verificamos que no haya daños en conectores o placa.",
    duration: "según modelo",
    Icon: FaMobileAlt,
  },
  {
    step: "3. Instalación de batería nueva",
    detail: "Instalamos el repuesto presupuestado y aprobado, con la fijación correspondiente al modelo, y revisamos sus conexiones.",
    duration: "según modelo y falla",
    Icon: FaBatteryFull,
  },
  {
    step: "4. Calibración y pruebas",
    detail: "Probamos carga, temperatura y funcionamiento. Te informamos qué datos de salud y mensajes de pieza muestra ese equipo tras el cambio.",
    duration: "según modelo",
    Icon: FaCheckCircle,
  },
];

const faqBattery = [
  {
    question: "¿Vale la pena cambiar la batería o conviene comprar otro celular?",
    answer:
      "Si la falla está en la batería y el resto del equipo funciona bien, compará el presupuesto con el costo de reemplazar el celular. Si además hay pantalla rota o falla de placa, conviene considerar el total. La autonomía después del cambio depende del modelo, del repuesto y del uso.",
  },
  {
    question: "¿Cuánto dura una batería nueva de celular?",
    answer: `La vida útil depende del modelo, del repuesto, del uso y de la temperatura; no corresponde prometer la misma cantidad de años o ciclos para todos. Como referencia de diseño de Apple en condiciones ideales, iPhone 14 y anteriores están diseñados para conservar el 80 % de capacidad tras 500 ciclos completos, e iPhone 15 y posteriores tras 1000. Esas cifras no garantizan la duración de cualquier batería de reemplazo. ${WARRANTY_SCOPE_MESSAGE}`,
  },
  {
    question: "¿Pierdo datos al cambiar la batería?",
    answer: "El cambio de batería no requiere borrar fotos, contactos ni aplicaciones. Recomendamos respaldar los datos antes de cualquier reparación. Si el diagnóstico indica otro procedimiento que pueda afectarlos, te lo consultamos antes de avanzar.",
  },
  {
    question: "¿Qué diferencia hay entre una batería original y una compatible?",
    answer: `Una pieza original debe tener un origen verificable; que un proveedor también fabrique para una marca no basta para identificarla como original. Una compatible es una alternativa fabricada para un modelo concreto: confirmamos procedencia, compatibilidad y condiciones antes de instalarla. ${WARRANTY_SCOPE_MESSAGE} En iPhone, los mensajes de pieza y la información de salud dependen del modelo, del repuesto y de su verificación o vinculación; te explicamos qué se puede conservar en tu caso.`,
  },
  {
    question: "¿Cuánto tiempo tarda el cambio de batería?",
    answer: "1 a 2 horas si reservás con una seña y el repuesto está en stock. Si no, unas 4 horas, siempre que lo traigas antes de las 13. El trabajo incluye diagnóstico, desmontaje, instalación y test completo.",
  },
  {
    question: "¿La batería nueva viene con garantía?",
    answer: `Si. ${WARRANTY_SCOPE_MESSAGE} La cobertura exacta se detalla en la orden de trabajo y en el certificado de garantia de la bateria instalada.`,
  },
];

export default function BatteryReplacementGuide() {
  return (
    <div className="flex w-full justify-center px-4 py-16">
      <ArticleSchema
        title="Cambio de batería celular en Buenos Aires | Service Certificado Team Celular"
        description="Cambio de batería en CABA con repuesto y precio confirmados antes de reparar. Plazo de 1 a 2 horas con stock y garantía escrita de 90 días."
        publishedTime="2024-11-30T00:00:00Z"
        modifiedTime="2026-10-15T00:00:00Z"
        image="https://teamcelular.com/images/guia_cambio_bateria.webp"
        url="https://teamcelular.com/guias/cambio-bateria-celular"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: `${SITE_URL}/` },
          { name: "Guías", url: `${SITE_URL}/guias` },
          { name: "Cambio de batería", url: `${SITE_URL}/guias/cambio-bateria-celular` },
        ]}
      />
      <article className="w-full max-w-6xl space-y-16">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-slate-600 dark:text-[#86868b]">
          <Link href="/" className="hover:text-primary transition">
            Inicio
          </Link>
          <span>/</span>
          <Link href="/guias" className="hover:text-primary transition">
            Guías
          </Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-[#f5f5f7] font-semibold">
            Cambio de Batería
          </span>
        </nav>

        {/* Hero Section */}
        <header className="bg-[#1d1d1f] space-y-6 rounded-[28px] p-10 text-center md:p-16">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-[20px] bg-[#333336] text-[#6aa6ff]">
            <FaBatteryFull className="text-5xl text-white" />
          </div>
          <h1 className="text-4xl font-semibold tracking-[-0.01em] text-slate-900 dark:text-[#f5f5f7] md:text-5xl">
            Cambio de batería de celular: cuándo conviene y cuánto sale en CABA
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-600 dark:text-[#a1a1a6]">
            Si el celular perdió autonomía, se apaga con carga o se calienta, revisamos la batería,
            el consumo de aplicaciones y el puerto antes de decidir qué cambiar. Te atendemos en
            Paraguay 2451 (Recoleta) y Amenábar 2032 (Belgrano), CABA. Con repuesto en stock,
            el cambio de batería lleva <strong>1 a 2 horas</strong>; confirmamos el plazo para tu modelo
            antes de empezar. La reparación tiene garantía escrita de 90 días sobre trabajo y repuesto.
          </p>
          <p className="mx-auto mt-3 max-w-3xl text-lg font-semibold text-slate-800 dark:text-[#f5f5f7]">
            Team Celular, en Paraguay 2451 Recoleta, cambia la batería de Samsung, Motorola y Xiaomi desde{" "}
            {formatArsPrice(ANDROID_BATTERY_FROM)} y de iPhone desde {formatArsPrice(IPHONE_BATTERY_FROM)}, en 1 a 2
            horas con repuesto en stock. El cambio no requiere borrar datos; recomendamos respaldo previo.
          </p>
          <p className="mx-auto mt-3 max-w-3xl text-sm text-slate-600 dark:text-[#86868b]">
            Batería de iPhone por modelo:{" "}
            {IPHONE_BATTERY_PAGES.map((model, i) => (
              <React.Fragment key={model.slug}>
                {i > 0 && " · "}
                <Link href={`/reparaciones/iphone/${model.slug}`} className="underline underline-offset-4 hover:text-primary">
                  {model.name} {priceLabel(model.battery)}
                </Link>
              </React.Fragment>
            ))}
          </p>
          <div className="mt-4 flex justify-center">
            <GuideByline modifiedTime="2026-10-15T00:00:00Z" tone="light" />
          </div>

          {/* Quick Stats */}
          <div className="grid gap-6 md:grid-cols-3 mt-8">
            <div className="bg-[#1d1d1f] rounded-[28px] p-6">
              <FaClock className="mx-auto mb-2 text-3xl text-green-700 dark:text-green-300" />
              <div className="text-2xl font-semibold text-green-700 dark:text-green-300">1-2hs</div>
              <div className="text-sm text-slate-600 dark:text-[#86868b]">Con repuesto en stock</div>
            </div>
            <div className="bg-[#1d1d1f] rounded-[28px] p-6">
              <FaShieldAlt className="mx-auto text-3xl text-secondary mb-2" />
              <div className="text-2xl font-semibold text-secondary">90 días</div>
              <div className="text-sm text-slate-600 dark:text-[#86868b]">Garantía escrita</div>
            </div>
            <div className="bg-[#1d1d1f] rounded-[28px] p-6">
              <FaCheckCircle className="mx-auto mb-2 text-3xl text-green-700 dark:text-green-300" />
              <div className="text-2xl font-semibold text-green-700 dark:text-green-300">Según modelo</div>
              <div className="text-sm text-slate-600 dark:text-[#86868b]">Repuesto informado antes de reparar</div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link
              href="/presupuesto-reparacion"
              className="tc-btn tc-btn-primary"
            >
              Solicitar cambio de batería
            </Link>
            <BranchWhatsAppButton
              ctaName="guide_battery_hero_whatsapp"
              ctaLocation="guide_battery_hero"
              message="Necesito cambiar la batería de mi celular"
              className="rounded-full border-2 border-green-700 px-8 py-4 text-lg font-semibold text-green-800 transition hover:bg-green-100 dark:border-green-500 dark:text-green-200 dark:hover:bg-green-900/30"
            >
              WhatsApp directo
            </BranchWhatsAppButton>
          </div>
        </header>

        <RepairPriceTable
          brand="baterías de celular"
          prices={batteryPriceRows}
          updatedLabel={PRICES_UPDATED_LABEL}
          title="¿Cuánto cuesta cambiar la batería del celular en CABA?"
          timingText="Cambio de batería en 1 a 2 horas con repuesto en stock. Confirmamos el plazo según modelo y diagnóstico."
        />
        <p className="text-sm text-slate-600 dark:text-[#a1a1a6]">
          <Link href="/reparaciones/cambio-bateria-caba" className="underline underline-offset-4">Ver el servicio de cambio de batería y pedir presupuesto</Link>.
        </p>

        {/* Señales de que necesitas cambiar la batería */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-[1.1] text-slate-900 dark:text-[#f5f5f7]">
              ¿Cuándo cambiar la batería de tu celular?
            </h2>
            <p className="mt-3 text-lg text-slate-600 dark:text-[#a1a1a6]">
              Señales para pedir una revisión antes de decidir qué pieza cambiar
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {batterySignals.map((signal) => {
              const Icon = signal.Icon;
              const severityStyles =
                signal.severity === "Crítica"
                  ? { text: "text-red-700 dark:text-red-300", bg: "bg-red-100 dark:bg-red-900/40" }
                  : signal.severity === "Alta"
                  ? { text: "text-orange-700 dark:text-orange-300", bg: "bg-orange-100 dark:bg-orange-900/40" }
                  : { text: "text-yellow-700 dark:text-yellow-300", bg: "bg-yellow-100 dark:bg-yellow-900/40" };
              
              return (
                <div
                  key={signal.title}
                  className="bg-[#1d1d1f] rounded-[28px] p-6 transition"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full text-2xl ${severityStyles.bg} ${severityStyles.text}`}>
                      <Icon />
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${severityStyles.text}`}>
                      {signal.severity}
                    </span>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-[#f5f5f7]">
                    {signal.title}
                  </h3>
                  <p className="text-slate-700 dark:text-[#a1a1a6]">{signal.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Tipos de baterías */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-[1.1] text-slate-900 dark:text-[#f5f5f7]">
              Qué revisar antes de elegir una batería
            </h2>
            <p className="mt-3 text-lg text-slate-600 dark:text-[#a1a1a6]">
              Procedencia, compatibilidad y condiciones informadas antes de reparar
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {batteryTypes.map((battery) => (
              <div
                key={battery.type}
                className="rounded-[28px] bg-[#1d1d1f] p-6"
              >
                <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-[#f5f5f7]">
                  {battery.type}
                </h3>
                <p className="mb-4 text-sm text-slate-700 dark:text-[#a1a1a6]">{battery.description}</p>
                {battery.pros && (
                  <ul className="space-y-2 mb-4">
                    {battery.pros.map((pro) => (
                      <li key={pro} className="flex items-center gap-2 text-sm text-slate-700 dark:text-[#a1a1a6]">
                        <FaCheckCircle className="text-green-500 flex-shrink-0" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        <p className="text-sm leading-6 text-slate-600 dark:text-[#a1a1a6]">
          Fuentes: <a href="https://support.apple.com/es-es/103269" className="underline underline-offset-4">Apple: baterías originales e información de piezas</a> y{" "}
          <a href="https://support.apple.com/es-es/106348" className="underline underline-offset-4">Apple: salud, rendimiento y ciclos según modelo</a>.
        </p>

        {/* Proceso de reemplazo */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-[1.1] text-slate-900 dark:text-[#f5f5f7]">
              Proceso de cambio de batería
            </h2>
            <p className="mt-3 text-lg text-slate-600 dark:text-[#a1a1a6]">
              Procedimiento profesional paso a paso
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {replacementProcess.map((process) => {
              const Icon = process.Icon;
              return (
                <div
                  key={process.step}
                  className="bg-[#1d1d1f] rounded-[28px] p-8 transition"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-[#333336] text-[#6aa6ff]">
                      <Icon />
                    </div>
                    <span className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800 dark:bg-green-900/40 dark:text-green-200">
                      <FaClock />
                      {process.duration}
                    </span>
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-secondary dark:text-secondary/90">
                    {process.step}
                  </h3>
                  <p className="leading-relaxed text-slate-700 dark:text-[#a1a1a6]">
                    {process.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-[1.1] text-slate-900 dark:text-[#f5f5f7]">
              Preguntas frecuentes sobre cambio de batería
            </h2>
            <p className="mt-3 text-lg text-slate-600 dark:text-[#a1a1a6]">
              Respondemos las dudas más comunes
            </p>
          </div>
          <div className="space-y-4">
            {faqBattery.map((faq, index) => (
              <details
                key={index}
                className="bg-[#1d1d1f] group rounded-[28px] p-6 transition"
              >
                <summary className="flex min-h-11 items-center cursor-pointer text-lg font-semibold text-secondary group-hover:text-primary dark:text-secondary/90">
                  {faq.question}
                </summary>
                <p className="mt-4 leading-relaxed text-slate-700 dark:text-[#a1a1a6]">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA Final */}
        <section className="bg-[#1d1d1f] rounded-[28px] p-10 text-center md:p-16">
          <h2 className="mb-6 text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-[1.1] text-slate-900 dark:text-[#f5f5f7]">
            ¿Tu celular necesita batería nueva?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-700 dark:text-[#a1a1a6]">
            {REVIEW_COST_MESSAGE} Si requiere revisión de placa, cuesta {formatArsPrice(PLACA_REVISION_PRICE)}, con informe en hasta 72 horas hábiles; el arreglo lleva semanas y se confirma precio y plazo por escrito. Para el cambio de batería confirmamos modelo, repuesto, stock y plazo antes de empezar. {WARRANTY_SCOPE_MESSAGE}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/presupuesto-reparacion"
              className="tc-btn tc-btn-primary"
            >
              Solicitar presupuesto
            </Link>
            <Link
              href="/contacto"
              className="rounded-full border-2 border-green-600 px-8 py-4 text-lg font-semibold text-green-600 transition hover:bg-green-600/10"
            >
              Visitar laboratorio
            </Link>
          </div>
        </section>

        <GuideInterlinkSection currentGuide="/guias/cambio-bateria-celular" />

        {/* Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqBattery.map((faq) => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer,
                },
              })),
            }),
          }}
        />
      </article>
    </div>
  );
}


