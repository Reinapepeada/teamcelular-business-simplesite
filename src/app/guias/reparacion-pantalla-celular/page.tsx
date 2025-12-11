import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import {
  FaMobileAlt,
  FaTools,
  FaCheckCircle,
  FaShieldAlt,
  FaClock,
  FaExclamationTriangle,
  FaEye,
  FaFingerprint,
  FaCertificate,
  FaApple,
  FaAndroid,
  FaChartLine,
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "Cambio de Pantalla Celular Buenos Aires | Display Original CABA",
  description:
    "⚡ Cambio de pantalla celular: displays OLED originales ✓ True Tone preservado ✓ garantía 6 meses ✓ Service 2-4hs. iPhone, Samsung, Motorola. Recoleta, CABA.",
  keywords: [
    "cambio pantalla celular Buenos Aires",
    "pantalla iPhone original",
    "display Samsung OLED",
    "reparación pantalla CABA",
    "cambio modulo display",
    "pantalla celular garantía",
    "True Tone iPhone",
    "cambio pantalla express",
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
    title: "Cambio de Pantalla Celular Buenos Aires | Display Original",
    description:
      "Cambio de pantalla con displays OLED originales. True Tone preservado. Garantía 6 meses. Service express 2-4hs.",
    type: "article",
    locale: "es_AR",
    url: "https://teamcelular.com/guias/reparacion-pantalla-celular",
    siteName: "Team Celular",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cambio de Pantalla Celular Buenos Aires",
    description: "Displays OLED originales con True Tone. Garantía 6 meses. Service 2-4hs.",
  },
  alternates: {
    canonical: "https://teamcelular.com/guias/reparacion-pantalla-celular",
  },
};

const damageTypes = [
  {
    title: "Pantalla rota o quebrada",
    description: "Vidrio frontal con grietas, astillas o completamente destrozado. El touch puede funcionar o no.",
    Icon: FaExclamationTriangle,
    severity: "Media-Alta",
    urgency: "Reparar pronto para evitar cortes",
  },
  {
    title: "Touch no responde",
    description: "La pantalla se ve bien pero no responde al tacto, responde parcialmente o tiene zonas muertas.",
    Icon: FaFingerprint,
    severity: "Alta",
    urgency: "Reparación urgente",
  },
  {
    title: "Manchas o líneas en display",
    description: "Manchas negras, líneas verticales/horizontales, pixeles muertos o colores distorsionados.",
    Icon: FaEye,
    severity: "Media",
    urgency: "Puede empeorar con el tiempo",
  },
  {
    title: "Pantalla negra (no enciende)",
    description: "El celular funciona (suena, vibra) pero la pantalla permanece negra o muy tenue.",
    Icon: FaMobileAlt,
    severity: "Crítica",
    urgency: "Reparación inmediata",
  },
  {
    title: "Pantalla despegada o levantada",
    description: "El display se separa del marco, puede ser por golpe, batería hinchada o adhesivo deteriorado.",
    Icon: FaExclamationTriangle,
    severity: "Alta",
    urgency: "Riesgo de daño mayor",
  },
  {
    title: "Brillo bajo o parpadeo",
    description: "Brillo muy bajo incluso al máximo, parpadeo constante o backlight intermitente.",
    Icon: FaEye,
    severity: "Media",
    urgency: "Puede ser pantalla o placa",
  },
];

const screenTypes = [
  {
    type: "Pantalla Original (OEM)",
    description: "Fabricada por los mismos proveedores del fabricante. Para iPhone: LG, Samsung, BOE. Para Samsung: Samsung Display.",
    pros: [
      "100% compatible con el equipo",
      "True Tone / Always On Display preservado",
      "Colores y brillo idénticos al original",
      "Garantía 6-12 meses",
      "Certificación de autenticidad"
    ],
    cons: ["Precio más alto"],
    price: "$$$$",
    recommended: "iPhone 12+, Samsung S20+",
  },
  {
    type: "Pantalla OLED AAA+ (Incell)",
    description: "Aftermarket de alta calidad con tecnología OLED/Incell. Especificaciones similares a la original.",
    pros: [
      "Excelente calidad de imagen",
      "Touch sensible y preciso",
      "Certificaciones CE, FCC, RoHS",
      "Garantía 6 meses",
      "Precio competitivo"
    ],
    cons: [
      "True Tone puede perderse",
      "Brillo ligeramente menor"
    ],
    price: "$$$",
    recommended: "iPhone 7-11, Samsung A/M series",
  },
  {
    type: "Pantalla LCD (TFT)",
    description: "Tecnología LCD para modelos que originalmente traen LCD. Calidad AAA+.",
    pros: [
      "Compatible con modelos LCD",
      "Buena relación calidad-precio",
      "Garantía 3-6 meses",
      "Colores aceptables"
    ],
    cons: [
      "Menor contraste que OLED",
      "Ángulos de visión limitados"
    ],
    price: "$$",
    recommended: "iPhone 8, XR, 11, Samsung A10-A30",
  },
];

const replacementProcess = [
  {
    step: "1. Diagnóstico completo",
    detail: "Verificamos que el problema sea realmente la pantalla y no la placa lógica. Probamos touch, Face ID/Touch ID, sensores de proximidad y cámaras. Fotografiamos el estado inicial.",
    duration: "15-20 min",
    Icon: FaTools,
  },
  {
    step: "2. Desmontaje profesional",
    detail: "Abrimos el equipo con herramientas especializadas, desconectamos batería por seguridad, removemos pantalla dañada y verificamos estado de conectores flex.",
    duration: "20-30 min",
    Icon: FaMobileAlt,
  },
  {
    step: "3. Transferencia de componentes",
    detail: "Transferimos módulos originales: cámara frontal, sensor de proximidad, altavoz auricular, placa Home/Face ID. Esto preserva funciones biométricas.",
    duration: "15-25 min",
    Icon: FaFingerprint,
  },
  {
    step: "4. Instalación y calibración",
    detail: "Instalamos pantalla nueva, conectamos todos los flex, aplicamos adhesivo resistente al agua. Calibramos True Tone con programador especializado (iPhone).",
    duration: "20-30 min",
    Icon: FaCheckCircle,
  },
  {
    step: "5. Test de calidad",
    detail: "Probamos touch en todas las zonas, Face ID/Touch ID, sensores, brillo, colores, sellado y entregamos con garantía escrita.",
    duration: "15 min",
    Icon: FaShieldAlt,
  },
];

const faqScreen = [
  {
    question: "¿Se pierde Face ID o Touch ID al cambiar la pantalla?",
    answer: "NO, si el cambio se hace correctamente. Face ID y Touch ID están vinculados a módulos específicos que se transfieren de la pantalla original a la nueva. En Team Celular transferimos TODOS los componentes originales: módulo Face ID completo (dot projector, flood illuminator, cámara infrarroja), botón Home con Touch ID, cámara frontal y sensores. La única excepción es si el módulo biométrico original está físicamente dañado, en ese caso Face ID/Touch ID no funcionará con ninguna pantalla.",
  },
  {
    question: "¿Qué es True Tone y se puede mantener?",
    answer: "True Tone es una tecnología de Apple que ajusta automáticamente la temperatura de color de la pantalla según la luz ambiente. Cada pantalla original tiene datos de calibración únicos. Para preservar True Tone, usamos programadores especializados (JC V1S, Qianli iCopy) que transfieren estos datos del módulo original a la pantalla nueva. Esto solo es posible si: 1) La pantalla original está funcional (aunque rota), 2) Usamos pantalla original o AAA+ compatible, 3) El módulo de calibración no está dañado. En iPhone 13+ Apple ha restringido aún más esta función.",
  },
  {
    question: "¿Cuánto tiempo tarda el cambio de pantalla?",
    answer: "El servicio express toma 2-4 horas si tenemos el repuesto en stock. El proceso incluye: diagnóstico inicial (15 min), desmontaje (20 min), transferencia de componentes (20 min), instalación (25 min), calibración True Tone si aplica (15 min) y test completo (15 min). Para modelos menos comunes que requieren pedido de pantalla, el tiempo es de 24-48 horas. Ofrecemos servicio de espera en nuestro local de Recoleta con WiFi.",
  },
  {
    question: "¿La pantalla nueva viene con garantía?",
    answer: "Sí, todas nuestras pantallas incluyen garantía escrita de 6 meses (originales) o 3-6 meses (AAA+) que cubre: defectos de fabricación, touch defectuoso, manchas o líneas que aparezcan, despegado de pantalla y problemas de backlight. La garantía NO cubre: nuevos golpes, caídas, líquidos, presión excesiva, modificaciones por terceros o uso de protectores incompatibles. Entregamos certificado de garantía con número de serie de la pantalla instalada y fotografías del estado post-reparación.",
  },
  {
    question: "¿Puedo usar el celular normalmente después del cambio?",
    answer: "Sí, pero recomendamos esperar 2-3 horas antes de uso intensivo para que el adhesivo cure completamente. Durante las primeras 24 horas: evitar presión excesiva en los bordes, no sumergir en agua (aunque tenga IP68), no aplicar protector de pantalla inmediatamente. Después de 24 horas el equipo está 100% funcional. Si instalamos pantalla original en iPhone, todas las funciones quedan idénticas a fábrica: True Tone, brillo automático, Night Shift, etc. Recomendamos usar funda y protector de pantalla de calidad.",
  },
];

export default function ScreenReplacementGuide() {
  return (
    <div className="flex w-full justify-center px-4 py-16">
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
            Cambio de Pantalla
          </span>
        </nav>

        {/* Hero Section */}
        <header className="space-y-6 rounded-2xl border border-white/15 bg-white/5 p-10 text-center backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30 md:p-16">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 shadow-2xl">
            <FaMobileAlt className="text-5xl text-white" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
            Cambio de Pantalla de Celular en Buenos Aires
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-600 dark:text-slate-300">
            Reemplazo de pantalla con <strong className="text-primary">displays OLED originales</strong>, 
            <strong> True Tone preservado</strong>, garantía escrita de <strong>6 meses</strong> y servicio 
            express en <strong>2-4 horas</strong>. Reparamos iPhone, Samsung, Motorola y todas las marcas en Recoleta, CABA.
          </p>

          {/* Quick Stats */}
          <div className="grid gap-6 md:grid-cols-3 mt-8">
            <div className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg dark:border-white/15 dark:bg-slate-900/40">
              <FaClock className="mx-auto text-3xl text-blue-500 mb-2" />
              <div className="text-2xl font-bold text-blue-500">2-4hs</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Service express</div>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg dark:border-white/15 dark:bg-slate-900/40">
              <FaShieldAlt className="mx-auto text-3xl text-secondary mb-2" />
              <div className="text-2xl font-bold text-secondary">6 meses</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Garantía escrita</div>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg dark:border-white/15 dark:bg-slate-900/40">
              <FaCertificate className="mx-auto text-3xl text-blue-500 mb-2" />
              <div className="text-2xl font-bold text-blue-500">OLED</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Displays originales</div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link
              href="/presupuesto-reparacion"
              className="rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:shadow-xl"
            >
              Solicitar cambio de pantalla
            </Link>
            <Link
              href="https://wa.me/5491151024595?text=Necesito%20cambiar%20la%20pantalla%20de%20mi%20celular"
              className="rounded-full border-2 border-blue-500 px-8 py-4 text-lg font-semibold text-blue-500 transition hover:bg-blue-500/10"
            >
              WhatsApp directo
            </Link>
          </div>
        </header>

        {/* Tipos de daños */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Tipos de daños en pantallas de celular
            </h2>
            <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
              Identificá el problema de tu pantalla
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {damageTypes.map((damage) => {
              const Icon = damage.Icon;
              return (
                <div
                  key={damage.title}
                  className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/30"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 text-2xl text-blue-500">
                      <Icon />
                    </div>
                    <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-500">
                      {damage.severity}
                    </span>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                    {damage.title}
                  </h3>
                  <p className="mb-3 text-slate-700 dark:text-slate-300">{damage.description}</p>
                  <p className="text-sm font-semibold text-secondary">{damage.urgency}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Tipos de pantallas */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Tipos de pantallas que instalamos
            </h2>
            <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
              Comparativa de calidad, tecnología y precio
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {screenTypes.map((screen) => (
              <div
                key={screen.type}
                className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/30"
              >
                <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                  {screen.type}
                </h3>
                <p className="mb-4 text-sm text-slate-700 dark:text-slate-300">{screen.description}</p>
                <div className="mb-4">
                  <p className="text-2xl font-bold text-blue-500">{screen.price}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    Recomendado: {screen.recommended}
                  </p>
                </div>
                <div className="space-y-2 mb-4">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Ventajas:</p>
                  {screen.pros.map((pro) => (
                    <div key={pro} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <FaCheckCircle className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{pro}</span>
                    </div>
                  ))}
                </div>
                {screen.cons && (
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Desventajas:</p>
                    {screen.cons.map((con) => (
                      <div key={con} className="flex items-start gap-2 text-sm text-orange-500">
                        <FaExclamationTriangle className="flex-shrink-0 mt-0.5" />
                        <span>{con}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Proceso de reemplazo */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Proceso de cambio de pantalla
            </h2>
            <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
              Procedimiento profesional certificado
            </p>
          </div>
          <div className="space-y-6">
            {replacementProcess.map((process) => {
              const Icon = process.Icon;
              return (
                <div
                  key={process.step}
                  className="rounded-2xl border border-white/15 bg-white/5 p-8 backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/30"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-3xl text-white shadow-lg">
                        <Icon />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold text-secondary dark:text-secondary/90">
                          {process.step}
                        </h3>
                        <span className="flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-sm font-semibold text-blue-500">
                          <FaClock />
                          {process.duration}
                        </span>
                      </div>
                      <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                        {process.detail}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Preguntas frecuentes sobre cambio de pantalla
            </h2>
            <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
              Respondemos las dudas más comunes
            </p>
          </div>
          <div className="space-y-4">
            {faqScreen.map((faq, index) => (
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
        <section className="rounded-2xl border border-white/15 bg-gradient-to-br from-blue-500/10 via-white/5 to-blue-600/10 p-10 text-center backdrop-blur-2xl dark:border-white/10 dark:from-slate-900/40 dark:via-slate-900/30 dark:to-slate-900/40 md:p-16">
          <h2 className="mb-6 text-3xl font-bold text-slate-900 dark:text-white">
            ¿Tu pantalla está rota o no funciona?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-700 dark:text-slate-300">
            Diagnóstico gratuito en 15 minutos. Service express en 2-4 horas con garantía escrita.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/presupuesto-reparacion"
              className="rounded-full bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-blue-700"
            >
              Solicitar presupuesto
            </Link>
            <Link
              href="/contacto"
              className="rounded-full border-2 border-blue-600 px-8 py-4 text-lg font-semibold text-blue-600 transition hover:bg-blue-600/10"
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
              "mainEntity": faqScreen.map((faq) => ({
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
