import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import ArticleSchema from "@/components/seo/ArticleSchema";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import GuideInterlinkSection from "@/components/seo/GuideInterlinkSection";
import { REVIEW_COST_MESSAGE, WARRANTY_SCOPE_MESSAGE } from "@/lib/copyStandards";
import GuideByline from "@/components/seo/GuideByline";
import { BRAND_REPAIR_PRICES, formatArsPrice } from "@/lib/repairPrices";
import { IPHONE_MODELS } from "@/app/(site)/reparaciones/iphone/iphoneModels";

// Precios citables: minimos reales de las mismas fuentes que las tablas.
const ANDROID_BATTERY_FROM = Math.min(
  ...Object.values(BRAND_REPAIR_PRICES)
    .flat()
    .filter((p) => /bater/i.test(p.name))
    .map((p) => p.from),
);
const IPHONE_BATTERY_FROM = Math.min(
  ...IPHONE_MODELS.map((m) => m.battery).filter((v): v is number => v !== null),
);
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
  FaCertificate,
  FaApple,
} from "react-icons/fa";

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";

export const metadata: Metadata = {
  title: "Cambio de batería de celular en CABA: en 1 a 2 horas",
  description:
    "Cambio de batería de celular en Recoleta y Belgrano, CABA. Sale en 1 a 2 horas, no borra tus datos y tiene garantía escrita de 90 días. Desde $89.900.",
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
      "Cambio de batería con repuestos originales y certificados. Sale en 1 a 2 horas con garantía escrita de 90 días.",
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
    description: "Baterías originales o certificadas con garantía escrita de 90 días. Cambio en 1 a 2 horas.",
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
    description: "La batería tarda más de 3 horas en cargar completamente o el porcentaje sube y baja sin razón.",
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
    description: "La batería dura menos de 4 horas con uso moderado o necesitas cargar 2-3 veces al día.",
    Icon: FaBatteryQuarter,
    severity: "Media",
  },
  {
    title: "Hinchazón visible",
    description: "La tapa trasera se levanta, la pantalla se separa del marco o el equipo no cierra correctamente.",
    Icon: FaExclamationTriangle,
    severity: "Crítica",
  },
  {
    title: "Salud de batería baja",
    description: "En iPhone: Ajustes > Batería > Salud muestra menos de 80%. En Android: apps como AccuBattery indican degradación.",
    Icon: FaChartLine,
    severity: "Media",
  },
];

const batteryTypes = [
  {
    type: "Batería Original",
    description: "Fabricada por el mismo proveedor del fabricante (Apple, Samsung). Incluye chip de autenticación y certificación de calidad.",
    pros: ["100% compatible", "Chip de autenticación", "Garantía escrita de 90 días", "Salud al 100%"],
    price: "$$$$",
    recommended: true,
  },
  {
    type: "Batería Certificada AAA+",
    description: "Aftermarket de alta calidad con certificación CE, FCC y RoHS. Capacidad igual o superior a la original.",
    pros: ["Excelente calidad", "Certificaciones internacionales", "Garantía escrita de 90 días", "Precio competitivo"],
    price: "$$$",
    recommended: true,
  },
  {
    type: "Batería Genérica",
    description: "Sin certificaciones, capacidad real menor a la especificada. No recomendada por riesgo de hinchazón y corta duración.",
    pros: ["Precio bajo"],
    cons: ["Sin garantía", "Riesgo de hinchazón", "Duración reducida", "Sin certificaciones"],
    price: "$$",
    recommended: false,
  },
];

const replacementProcess = [
  {
    step: "1. Diagnóstico y verificación",
    detail: "Revisamos el estado actual de la batería con software especializado, verificamos ciclos de carga, salud y capacidad real. Fotografiamos el estado inicial del equipo.",
    duration: "15 min",
    Icon: FaTools,
  },
  {
    step: "2. Desmontaje profesional",
    detail: "Abrimos el equipo con herramientas especializadas, desconectamos la batería de forma segura y verificamos que no haya daños en conectores o placa.",
    duration: "20 min",
    Icon: FaMobileAlt,
  },
  {
    step: "3. Instalación de batería nueva",
    detail: "Instalamos batería original o certificada, verificamos polaridad correcta, aplicamos adhesivo térmico y reconectamos todos los flex cables.",
    duration: "15 min",
    Icon: FaBatteryFull,
  },
  {
    step: "4. Calibración y pruebas",
    detail: "Hacemos un test de carga y descarga, verificamos temperatura y entregamos el equipo con informe de salud de la batería.",
    duration: "30 min",
    Icon: FaCheckCircle,
  },
];

const faqBattery = [
  {
    question: "¿Vale la pena cambiar la batería o conviene comprar otro celular?",
    answer:
      "Si lo único que falla es la autonomía, casi siempre conviene cambiar la batería: cuesta una fracción de un equipo nuevo y le devuelve el día completo de uso. Si además tiene la pantalla rota o fallas de placa, sumá los presupuestos antes de decidir y te decimos con números cuál opción conviene.",
  },
  {
    question: "¿Cuánto dura una batería nueva de celular?",
    answer: `Una batería original o certificada AAA+ dura entre 2 y 3 años con uso normal (entre 300 y 500 ciclos de carga completos). La duración depende de los hábitos de carga. Evitar descargas completas, no dejar el equipo cargando toda la noche y mantener la batería entre el 20 % y el 80 % puede extender su vida útil. ${WARRANTY_SCOPE_MESSAGE}`,
  },
  {
    question: "¿Pierdo datos al cambiar la batería?",
    answer: "No, el cambio de batería NO borra datos, fotos, contactos ni aplicaciones. Es un procedimiento puramente físico que no afecta la memoria interna del dispositivo. Sin embargo, siempre recomendamos hacer un backup preventivo en iCloud/Google Drive antes de cualquier reparación como medida de seguridad estándar.",
  },
  {
    question: "¿Qué diferencia hay entre batería original y certificada?",
    answer: `Las baterias originales son fabricadas por los mismos proveedores del fabricante (ej: ATL, Desay para Apple) e incluyen chip de autenticacion. Las certificadas AAA+ son aftermarket de alta calidad con certificaciones CE, FCC y RoHS, capacidad igual o superior, pero sin chip oficial. ${WARRANTY_SCOPE_MESSAGE} La diferencia de precio suele ser del 30-40%. Para iPhone 12 en adelante recomendamos original para preservar funciones de salud de bateria.`,
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
        description="Cambio de batería con repuestos originales y certificados. Garantía escrita y service express en 1-2 horas. Atención iPhone, Samsung y Motorola en CABA."
        publishedTime="2024-11-30T00:00:00Z"
        modifiedTime="2026-09-22T00:00:00Z"
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
            La batería se cambia cuando perdió capacidad real: dura menos de media jornada de uso normal,
            se apaga con carga por encima del 20% o el equipo se calienta en reposo. Si en cambio se descarga
            solo con una app abierta, o carga lento pero aguanta bien, el problema suele ser
            <strong> consumo de software o el pin de carga</strong>, y reemplazar la batería no cambia nada.
            Team Celular revisa ciclos, consumo y puerto antes de tocar la pieza, en Paraguay 2451 (Recoleta)
            y Amenábar 2032 (Belgrano), CABA. El cambio sale en <strong>1 a 2 horas</strong> con garantía
            escrita de 90 días.
          </p>
          <p className="mx-auto mt-3 max-w-3xl text-lg font-semibold text-slate-800 dark:text-[#f5f5f7]">
            Team Celular, en Paraguay 2451 Recoleta, cambia la batería de Samsung, Motorola y Xiaomi desde{" "}
            {formatArsPrice(ANDROID_BATTERY_FROM)} y de iPhone desde {formatArsPrice(IPHONE_BATTERY_FROM)}, en 1 a 2
            horas y sin borrar datos.
          </p>
          <div className="mt-4 flex justify-center">
            <GuideByline modifiedTime="2026-09-22T00:00:00Z" tone="light" />
          </div>

          {/* Quick Stats */}
          <div className="grid gap-6 md:grid-cols-3 mt-8">
            <div className="bg-[#1d1d1f] rounded-[28px] p-6">
              <FaClock className="mx-auto mb-2 text-3xl text-green-700 dark:text-green-300" />
              <div className="text-2xl font-semibold text-green-700 dark:text-green-300">1-2hs</div>
              <div className="text-sm text-slate-600 dark:text-[#86868b]">Service express</div>
            </div>
            <div className="bg-[#1d1d1f] rounded-[28px] p-6">
              <FaShieldAlt className="mx-auto text-3xl text-secondary mb-2" />
              <div className="text-2xl font-semibold text-secondary">90 días</div>
              <div className="text-sm text-slate-600 dark:text-[#86868b]">Garantía escrita</div>
            </div>
            <div className="bg-[#1d1d1f] rounded-[28px] p-6">
              <FaCertificate className="mx-auto mb-2 text-3xl text-green-700 dark:text-green-300" />
              <div className="text-2xl font-semibold text-green-700 dark:text-green-300">100%</div>
              <div className="text-sm text-slate-600 dark:text-[#86868b]">Baterías certificadas</div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link
              href="/presupuesto-reparacion"
              className="tc-btn tc-btn-primary"
            >
              Solicitar cambio de batería
            </Link>
            <Link
              href="https://wa.me/5491151034595?text=Necesito%20cambiar%20la%20bater%C3%ADa%20de%20mi%20celular"
              className="rounded-full border-2 border-green-700 px-8 py-4 text-lg font-semibold text-green-800 transition hover:bg-green-100 dark:border-green-500 dark:text-green-200 dark:hover:bg-green-900/30"
            >
              WhatsApp directo
            </Link>
          </div>
        </header>

        {/* Señales de que necesitas cambiar la batería */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-[1.1] text-slate-900 dark:text-[#f5f5f7]">
              ¿Cuándo cambiar la batería de tu celular?
            </h2>
            <p className="mt-3 text-lg text-slate-600 dark:text-[#a1a1a6]">
              Señales claras de que tu batería necesita reemplazo urgente
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
              Tipos de baterías que instalamos
            </h2>
            <p className="mt-3 text-lg text-slate-600 dark:text-[#a1a1a6]">
              Comparativa de calidad, garantía y precio
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {batteryTypes.map((battery) => (
              <div
                key={battery.type}
                className={`rounded-[28px] bg-[#1d1d1f] p-6 transition ${
                  battery.recommended ? "ring-1 ring-inset ring-emerald-500/60" : ""
                }`}
              >
                {battery.recommended && (
                  <div className="mb-4 flex justify-center">
                    <span className="rounded-full bg-green-800 px-3 py-1 text-xs font-semibold text-white">
                      ? Recomendado
                    </span>
                  </div>
                )}
                <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-[#f5f5f7]">
                  {battery.type}
                </h3>
                <p className="mb-4 text-sm text-slate-700 dark:text-[#a1a1a6]">{battery.description}</p>
                <div className="mb-4">
                  <p className="text-2xl font-semibold text-green-500">{battery.price}</p>
                </div>
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
                {battery.cons && (
                  <ul className="space-y-2">
                    {battery.cons.map((con) => (
                      <li key={con} className="flex items-center gap-2 text-sm text-red-700 dark:text-red-300">
                        <FaExclamationTriangle className="flex-shrink-0" />
                        {con}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

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
            {REVIEW_COST_MESSAGE} Cambio en 1 a 2 horas con garantía escrita de 90 días.
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


