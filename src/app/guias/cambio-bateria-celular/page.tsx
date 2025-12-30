import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import ArticleSchema from "@/components/seo/ArticleSchema";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
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
  title: "Cambio de Batería Celular Buenos Aires | Service Certificado CABA",
  description:
    "Cambio de batería celular con baterías originales y certificadas, garantía de 6 meses y service en 1-2 hs. iPhone, Samsung, Motorola. Diagnóstico gratis en Recoleta, CABA.",
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
      "Cambio de batería con repuestos originales y certificados. Garantía 6 meses. Service express en 1-2 horas.",
    type: "article",
    locale: "es_AR",
    url: "https://teamcelular.com/guias/cambio-bateria-celular",
    siteName: "Team Celular",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cambio de Batería Celular Buenos Aires",
    description: "Baterías originales con garantía 6 meses. Service express 1-2hs.",
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
    pros: ["100% compatible", "Chip de autenticación", "Garantía 6-12 meses", "Salud al 100%"],
    price: "$$$$",
    recommended: true,
  },
  {
    type: "Batería Certificada AAA+",
    description: "Aftermarket de alta calidad con certificación CE, FCC y RoHS. Capacidad igual o superior a la original.",
    pros: ["Excelente calidad", "Certificaciones internacionales", "Garantía 6 meses", "Precio competitivo"],
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
    detail: "Calibramos la batería al 100%, ejecutamos test de carga/descarga, verificamos temperatura y entregamos con informe de salud.",
    duration: "30 min",
    Icon: FaCheckCircle,
  },
];

const faqBattery = [
  {
    question: "¿Cuánto dura una batería nueva de celular?",
    answer: "Una batería original o certificada AAA+ dura entre 2-3 años con uso normal (300-500 ciclos de carga completos). La duración depende de los hábitos de carga: evitar descargas completas, no dejar cargando toda la noche y mantener el equipo entre 20-80% extiende significativamente la vida útil. En Team Celular ofrecemos garantía de 6 meses en todas las baterías instaladas.",
  },
  {
    question: "¿Pierdo datos al cambiar la batería?",
    answer: "No, el cambio de batería NO borra datos, fotos, contactos ni aplicaciones. Es un procedimiento puramente físico que no afecta la memoria interna del dispositivo. Sin embargo, siempre recomendamos hacer un backup preventivo en iCloud/Google Drive antes de cualquier reparación como medida de seguridad estándar.",
  },
  {
    question: "¿Qué diferencia hay entre batería original y certificada?",
    answer: "Las baterías originales son fabricadas por los mismos proveedores del fabricante (ej: ATL, Desay para Apple) e incluyen chip de autenticación. Las certificadas AAA+ son aftermarket de alta calidad con certificaciones CE, FCC y RoHS, capacidad igual o superior, pero sin chip oficial. Ambas tienen garantía de 6 meses. La diferencia de precio es del 30-40%. Para iPhone 12 en adelante recomendamos original para preservar funciones de salud de batería.",
  },
  {
    question: "¿Cuánto tiempo tarda el cambio de batería?",
    answer: "El servicio express toma 1-2 horas si contamos con el repuesto en stock. Incluye: diagnóstico inicial, desmontaje, instalación, calibración y test completo. Para modelos menos comunes que requieren pedido de batería, el tiempo es de 24-48 horas. Ofrecemos servicio de espera en nuestro local de Recoleta con WiFi y café.",
  },
  {
    question: "¿La batería nueva viene con garantía?",
    answer: "Sí, todas nuestras baterías (originales y certificadas) incluyen garantía escrita de 6 meses que cubre: defectos de fabricación, hinchazón, pérdida prematura de capacidad y fallas de carga. La garantía NO cubre: daños por golpes, líquidos, uso de cargadores no certificados o modificaciones posteriores por terceros. Entregamos certificado de garantía con número de serie de la batería instalada.",
  },
];

export default function BatteryReplacementGuide() {
  return (
    <div className="flex w-full justify-center px-4 py-16">
      <ArticleSchema
        title="Cambio de batería celular en Buenos Aires | Service Certificado Team Celular"
        description="Cambio de batería con repuestos originales y certificados. Garantía escrita y service express en 1-2 horas. Atención iPhone, Samsung y Motorola en CABA."
        publishedTime="2024-11-30T00:00:00Z"
        modifiedTime="2025-12-11T00:00:00Z"
        authorName="Team Celular"
        image="https://teamcelular.com/images/teamcelular.webp"
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
        <nav className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <Link href="/" className="hover:text-primary transition">
            Inicio
          </Link>
          <span>/</span>
          <Link href="/guias" className="hover:text-primary transition">
            Guías
          </Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white font-semibold">
            Cambio de Batería
          </span>
        </nav>

        {/* Hero Section */}
        <header className="space-y-6 rounded-2xl border border-white/15 bg-white/5 p-10 text-center backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30 md:p-16">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 via-green-600 to-green-700 shadow-2xl">
            <FaBatteryFull className="text-5xl text-white" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
            Cambio de Batería de Celular en Buenos Aires
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-600 dark:text-slate-300">
            Reemplazo de batería con <strong className="text-primary">repuestos originales y certificados</strong>, 
            garantía escrita de <strong>6 meses</strong> y servicio express en <strong>1-2 horas</strong>. 
            Atendemos iPhone, Samsung, Motorola y todas las marcas en Recoleta, CABA.
          </p>

          {/* Quick Stats */}
          <div className="grid gap-6 md:grid-cols-3 mt-8">
            <div className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg dark:border-white/15 dark:bg-slate-900/40">
              <FaClock className="mx-auto text-3xl text-green-500 mb-2" />
              <div className="text-2xl font-bold text-green-500">1-2hs</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Service express</div>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg dark:border-white/15 dark:bg-slate-900/40">
              <FaShieldAlt className="mx-auto text-3xl text-secondary mb-2" />
              <div className="text-2xl font-bold text-secondary">6 meses</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Garantía escrita</div>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg dark:border-white/15 dark:bg-slate-900/40">
              <FaCertificate className="mx-auto text-3xl text-green-500 mb-2" />
              <div className="text-2xl font-bold text-green-500">100%</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Baterías certificadas</div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link
              href="/presupuesto-reparacion"
              className="rounded-full bg-gradient-to-r from-green-500 to-green-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:shadow-xl"
            >
              Solicitar cambio de batería
            </Link>
            <Link
              href="https://wa.me/5491151024595?text=Necesito%20cambiar%20la%20batería%20de%20mi%20celular"
              className="rounded-full border-2 border-green-500 px-8 py-4 text-lg font-semibold text-green-500 transition hover:bg-green-500/10"
            >
              WhatsApp directo
            </Link>
          </div>
        </header>

        {/* Señales de que necesitas cambiar la batería */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              ¿Cuándo cambiar la batería de tu celular?
            </h2>
            <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
              Señales claras de que tu batería necesita reemplazo urgente
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {batterySignals.map((signal) => {
              const Icon = signal.Icon;
              const severityColor = 
                signal.severity === "Crítica" ? "text-red-500" :
                signal.severity === "Alta" ? "text-orange-500" :
                "text-yellow-500";
              
              return (
                <div
                  key={signal.title}
                  className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/30"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-${severityColor}/10 text-2xl ${severityColor}`}>
                      <Icon />
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${severityColor}`}>
                      {signal.severity}
                    </span>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                    {signal.title}
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300">{signal.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Tipos de baterías */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Tipos de baterías que instalamos
            </h2>
            <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
              Comparativa de calidad, garantía y precio
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {batteryTypes.map((battery) => (
              <div
                key={battery.type}
                className={`rounded-2xl border p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl ${
                  battery.recommended
                    ? "border-green-500/50 bg-green-500/5 dark:bg-green-500/10"
                    : "border-white/15 bg-white/5 dark:border-white/10 dark:bg-slate-900/30"
                }`}
              >
                {battery.recommended && (
                  <div className="mb-4 flex justify-center">
                    <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white">
                      ✓ Recomendado
                    </span>
                  </div>
                )}
                <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                  {battery.type}
                </h3>
                <p className="mb-4 text-sm text-slate-700 dark:text-slate-300">{battery.description}</p>
                <div className="mb-4">
                  <p className="text-2xl font-bold text-green-500">{battery.price}</p>
                </div>
                {battery.pros && (
                  <ul className="space-y-2 mb-4">
                    {battery.pros.map((pro) => (
                      <li key={pro} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                        <FaCheckCircle className="text-green-500 flex-shrink-0" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                )}
                {battery.cons && (
                  <ul className="space-y-2">
                    {battery.cons.map((con) => (
                      <li key={con} className="flex items-center gap-2 text-sm text-red-500">
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
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Proceso de cambio de batería
            </h2>
            <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
              Procedimiento profesional paso a paso
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {replacementProcess.map((process) => {
              const Icon = process.Icon;
              return (
                <div
                  key={process.step}
                  className="rounded-2xl border border-white/15 bg-white/5 p-8 backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/30"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-600 text-3xl text-white shadow-lg">
                      <Icon />
                    </div>
                    <span className="flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1 text-sm font-semibold text-green-500">
                      <FaClock />
                      {process.duration}
                    </span>
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-secondary dark:text-secondary/90">
                    {process.step}
                  </h3>
                  <p className="leading-relaxed text-slate-700 dark:text-slate-300">
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
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Preguntas frecuentes sobre cambio de batería
            </h2>
            <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
              Respondemos las dudas más comunes
            </p>
          </div>
          <div className="space-y-4">
            {faqBattery.map((faq, index) => (
              <details
                key={index}
                className="group rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl transition hover:shadow-lg dark:border-white/10 dark:bg-slate-900/30"
              >
                <summary className="cursor-pointer text-lg font-bold text-secondary group-hover:text-primary dark:text-secondary/90">
                  {faq.question}
                </summary>
                <p className="mt-4 leading-relaxed text-slate-700 dark:text-slate-300">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA Final */}
        <section className="rounded-2xl border border-white/15 bg-gradient-to-br from-green-500/10 via-white/5 to-green-600/10 p-10 text-center backdrop-blur-2xl dark:border-white/10 dark:from-slate-900/40 dark:via-slate-900/30 dark:to-slate-900/40 md:p-16">
          <h2 className="mb-6 text-3xl font-bold text-slate-900 dark:text-white">
            ¿Tu celular necesita batería nueva?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-700 dark:text-slate-300">
            Diagnóstico gratuito en menos de 15 minutos. Service express en 1-2 horas con garantía escrita.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/presupuesto-reparacion"
              className="rounded-full bg-green-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-green-700"
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
