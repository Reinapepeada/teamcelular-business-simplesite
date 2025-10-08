import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  FaApple,
  FaMobileAlt,
  FaBatteryFull,
  FaTools,
  FaCertificate,
  FaCheckCircle,
  FaClock,
  FaShieldAlt,
  FaCamera,
  FaMicrochip,
  FaWrench,
  FaChartLine,
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "Reparación de iPhone en Buenos Aires | Servicio Técnico Oficial Team Celular CABA",
  description:
    "Servicio especializado de reparación de iPhone en Recoleta, CABA: pantallas OLED originales, baterías certificadas, microelectrónica avanzada y garantía escrita. Diagnóstico en 24hs, repuestos originales y True Tone calibrado.",
  keywords: [
    "reparación iPhone Buenos Aires",
    "service iPhone CABA",
    "pantalla iPhone original",
    "batería iPhone certificada",
    "reparación placa iPhone",
    "True Tone iPhone",
    "Face ID reparación",
    "service Apple Recoleta",
  ],
  authors: [{ name: "Team Celular" }],
  openGraph: {
    title: "Reparación Profesional de iPhone | Team Celular Buenos Aires",
    description:
      "Servicio técnico especializado en iPhone con repuestos originales, garantía escrita y técnicos certificados en CABA.",
    type: "article",
    locale: "es_AR",
  },
};

const repairProcess = [
  {
    step: "1. Recepción y evaluación inicial",
    detail:
      "Revisamos el número de serie (IMEI), verificamos el estado de Find My iPhone, y realizamos un checklist completo de funciones: audio, cámaras, Face ID/Touch ID, sensores de proximidad, giroscopio y conectividad.",
    Icon: FaMobileAlt,
    duration: "15 min",
  },
  {
    step: "2. Diagnóstico técnico profesional",
    detail:
      "Utilizamos microscopio profesional, software de diagnóstico Apple y herramientas especializadas de microelectrónica para detectar fallas en placa lógica, conectores flex y circuitos integrados. Fotografiamos el estado inicial del equipo.",
    Icon: FaTools,
    duration: "30-45 min",
  },
  {
    step: "3. Reparación con repuestos certificados",
    detail:
      "Trabajamos exclusivamente con pantallas OLED originales o calidad AAA+, baterías certificadas con chips de autenticación y módulos oficiales. Preservamos True Tone, calibramos batería al 100% y mantenemos todas las funcionalidades originales.",
    Icon: FaWrench,
    duration: "1-3 horas",
  },
  {
    step: "4. Control de calidad y garantía",
    detail:
      "Ejecutamos test completo de diagnóstico, verificamos sellado IP68 (resistencia al agua), calibramos todos los sensores y entregamos informe técnico final con garantía escrita de 3 a 6 meses según el tipo de reparación.",
    Icon: FaCheckCircle,
    duration: "20 min",
  },
];

const commonRepairs = [
  {
    title: "Cambio de pantalla OLED",
    description:
      "Pantallas originales o calidad AAA+ con True Tone calibrado, 3D Touch funcional y Face ID preservado.",
    Icon: FaMobileAlt,
    timeframe: "2-4 horas",
    warranty: "6 meses",
  },
  {
    title: "Reemplazo de batería certificada",
    description:
      "Baterías originales con chip de autenticación, ciclo optimizado y certificación de salud al 100%.",
    Icon: FaBatteryFull,
    timeframe: "1-2 horas",
    warranty: "6 meses",
  },
  {
    title: "Reparación de módulo de carga",
    description:
      "Limpieza profunda, reemplazo de flex Lightning/USB-C y reparación de pistas en placa lógica.",
    Icon: FaTools,
    timeframe: "2-3 horas",
    warranty: "3 meses",
  },
  {
    title: "Recuperación de placa lógica",
    description:
      "Microelectrónica avanzada: reballing de chips U2, Tristar, Baseband, NAND y reparación de cortocircuitos.",
    Icon: FaMicrochip,
    timeframe: "24-48 horas",
    warranty: "3 meses",
  },
  {
    title: "Reparación de cámaras",
    description:
      "Reemplazo de cámara frontal, trasera o sistema multi-lens con calibración de focus y estabilización óptica.",
    Icon: FaCamera,
    timeframe: "2-3 horas",
    warranty: "3 meses",
  },
  {
    title: "Face ID / Touch ID",
    description:
      "Diagnóstico de módulos biométricos, reparación de sensores dot projector y flood illuminator.",
    Icon: FaShieldAlt,
    timeframe: "3-5 horas",
    warranty: "3 meses",
  },
];

const whyChooseUs = [
  {
    title: "Repuestos originales garantizados",
    description:
      "Trabajamos con proveedores certificados Apple y realizamos pruebas de autenticidad en todos los componentes.",
    Icon: FaCertificate,
  },
  {
    title: "True Tone y funciones preservadas",
    description:
      "Utilizamos programadores especializados para transferir datos de calibración y mantener todas las funcionalidades originales.",
    Icon: FaApple,
  },
  {
    title: "Diagnóstico en menos de 24 horas",
    description:
      "Evaluación técnica rápida con presupuesto digital detallado y fotografías del estado del equipo.",
    Icon: FaClock,
  },
  {
    title: "Garantía escrita de 3-6 meses",
    description:
      "Todas nuestras reparaciones incluyen garantía por escrito con cobertura total de mano de obra y repuestos.",
    Icon: FaShieldAlt,
  },
];

const faqIphone = [
  {
    question: "¿Mantienen el True Tone después del cambio de pantalla?",
    answer:
      "Sí, utilizamos programadores especializados (JC V1S, Qianli iCopy) para transferir los datos de calibración del módulo original a la pantalla nueva. Esto permite preservar True Tone, ajuste automático de brillo y temperatura de color. Sin embargo, esto solo es posible si el módulo original está funcional. Si la pantalla original está completamente destruida, True Tone podría perderse de forma permanente (limitación de Apple).",
  },
  {
    question: "¿Qué diferencia hay entre pantalla original y calidad AAA+?",
    answer:
      "Pantallas originales son fabricadas por los mismos proveedores de Apple (LG, Samsung, BOE) y conservan 100% de las funcionalidades. Las pantallas AAA+ son aftermarket de alta calidad (Incell/OLED) con especificaciones similares pero sin certificación oficial. Recomendamos originales para iPhone 12 en adelante y AAA+ como alternativa económica para modelos anteriores. Ambas incluyen garantía.",
  },
  {
    question: "¿Puedo recuperar mi iPhone si se mojó?",
    answer:
      "Sí, tenemos alta tasa de éxito en recuperación de equipos con daño por líquidos. El proceso incluye: desmontaje urgente, limpieza de placa con ultrasonido, secado en horno de baja temperatura, inspección bajo microscopio, reemplazo de componentes oxidados y test funcional completo. Es crítico NO intentar encenderlo y traerlo lo antes posible para minimizar corrosión.",
  },
  {
    question: "¿Trabajan con iPhones bloqueados por iCloud (Find My)?",
    answer:
      "Solo reparamos iPhones con Find My desactivado o con credenciales del propietario original. Por políticas de Apple y prevención de robo, NO desbloqueamos dispositivos con Activation Lock activo. Si olvidaste tu contraseña de iCloud, podés recuperarla en iforgot.apple.com antes de traer el equipo. Reparamos solo con autorización del propietario legítimo.",
  },
  {
    question: "¿Cuánto tiempo tarda una reparación urgente?",
    answer:
      "Para reparaciones express (pantalla, batería, puerto de carga) ofrecemos servicio en 2-4 horas si contamos con el repuesto en stock y no hay cola de trabajo. Reparaciones de placa lógica requieren 24-48 horas por la complejidad del diagnóstico bajo microscopio. Para empresas con SLA, garantizamos tiempos específicos según contrato.",
  },
];

const iphoneModels = [
  "iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15 Plus", "iPhone 15",
  "iPhone 14 Pro Max", "iPhone 14 Pro", "iPhone 14 Plus", "iPhone 14",
  "iPhone 13 Pro Max", "iPhone 13 Pro", "iPhone 13 Mini", "iPhone 13",
  "iPhone 12 Pro Max", "iPhone 12 Pro", "iPhone 12 Mini", "iPhone 12",
  "iPhone 11 Pro Max", "iPhone 11 Pro", "iPhone 11",
  "iPhone XS Max", "iPhone XS", "iPhone XR", "iPhone X",
  "iPhone 8 Plus", "iPhone 8", "iPhone 7 Plus", "iPhone 7",
  "iPhone SE (2022)", "iPhone SE (2020)", "iPhone SE (2016)"
];

export default function IphoneRepairGuide() {
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
            Reparación iPhone
          </span>
        </nav>

        {/* Hero Section */}
        <header className="space-y-6 rounded-2xl border border-white/15 bg-white/5 p-10 text-center backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30 md:p-16">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-secondary to-primary shadow-2xl">
            <FaApple className="text-5xl text-white" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
            Reparación Profesional de iPhone en Buenos Aires
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-600 dark:text-slate-300">
            Servicio técnico especializado en <strong className="text-primary">iPhone</strong> con repuestos
            originales, garantía escrita y laboratorio certificado en Recoleta. Más de 10 años atendiendo
            usuarios particulares y empresas en CABA y GBA.
          </p>
          
          {/* Quick Stats */}
          <div className="grid gap-6 md:grid-cols-3 mt-8">
            <div className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg dark:border-white/15 dark:bg-slate-900/40">
              <FaClock className="mx-auto text-3xl text-primary mb-2" />
              <div className="text-2xl font-bold text-primary">24hs</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Diagnóstico garantizado</div>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg dark:border-white/15 dark:bg-slate-900/40">
              <FaShieldAlt className="mx-auto text-3xl text-secondary mb-2" />
              <div className="text-2xl font-bold text-secondary">6 meses</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Garantía escrita</div>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg dark:border-white/15 dark:bg-slate-900/40">
              <FaCheckCircle className="mx-auto text-3xl text-primary mb-2" />
              <div className="text-2xl font-bold text-primary">100%</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Repuestos certificados</div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link
              href="/presupuesto-reparacion"
              className="rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:shadow-xl"
            >
              Solicitar presupuesto
            </Link>
            <Link
              href="https://wa.me/5491151034595?text=Necesito%20reparar%20mi%20iPhone"
              className="rounded-full border-2 border-primary px-8 py-4 text-lg font-semibold text-primary transition hover:bg-primary/10"
            >
              WhatsApp directo
            </Link>
          </div>
        </header>

        {/* Introducción con video */}
        <section className="overflow-hidden rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/30">
          <div className="grid gap-0 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
              >
                <source src="/videos/3866849-hd_1280_720_50fps.mp4" type="video/mp4" />
                Tu navegador no soporta el elemento de video.
              </video>
            </div>
            <div className="order-1 space-y-6 p-10 md:order-2">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                Expertos en reparación de iPhone
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                <p>
                  En <strong className="text-primary">Team Celular</strong> reparamos iPhone con estándares
                  profesionales Apple, utilizando repuestos originales certificados y laboratorio equipado con
                  tecnología de última generación en Recoleta, CABA.
                </p>
                <p>
                  Atendemos desde <strong className="text-secondary">iPhone 6S hasta iPhone 15 Pro Max</strong>,
                  con especialización en reparaciones complejas de placa lógica, microelectrónica avanzada y
                  recuperación de datos. Brindamos soporte a empresas con flotas de dispositivos iOS con SLA
                  garantizado.
                </p>
                <ul className="ml-6 space-y-2 list-disc">
                  <li>Diagnóstico profesional en menos de 24 horas</li>
                  <li>Repuestos originales con garantía de autenticidad</li>
                  <li>True Tone y Face ID preservados</li>
                  <li>Garantía escrita de 3 a 6 meses</li>
                  <li>Servicio express en 2-4 horas</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Proceso de reparación */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Nuestro proceso de reparación certificado
            </h2>
            <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
              Trazabilidad completa desde el ingreso hasta la entrega del equipo
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {repairProcess.map((process) => {
              const Icon = process.Icon;
              return (
                <div
                  key={process.step}
                  className="group rounded-2xl border border-white/15 bg-white/5 p-8 backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/30"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-3xl text-white shadow-lg">
                      <Icon />
                    </div>
                    <span className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
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

        {/* Reparaciones comunes */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Reparaciones más solicitadas
            </h2>
            <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
              Fallas que resolvemos todos los días con garantía escrita
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {commonRepairs.map((repair) => {
              const Icon = repair.Icon;
              return (
                <div
                  key={repair.title}
                  className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/30"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-2xl text-primary">
                    <Icon />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                    {repair.title}
                  </h3>
                  <p className="mb-4 text-slate-700 dark:text-slate-300">{repair.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary font-semibold">⏱️ {repair.timeframe}</span>
                    <span className="text-secondary font-semibold">✓ {repair.warranty}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Por qué elegirnos */}
        <section className="space-y-8 rounded-2xl border border-white/15 bg-white/5 p-10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/30">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center">
            ¿Por qué elegir Team Celular para tu iPhone?
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {whyChooseUs.map((reason) => {
              const Icon = reason.Icon;
              return (
                <div
                  key={reason.title}
                  className="flex gap-4 rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg dark:border-white/15 dark:bg-slate-900/40"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/20 text-2xl text-primary">
                    <Icon />
                  </div>
                  <div>
                    <h3 className="mb-2 font-bold text-slate-900 dark:text-white">{reason.title}</h3>
                    <p className="text-sm text-slate-700 dark:text-slate-300">{reason.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Modelos compatibles */}
        <section className="space-y-6 rounded-2xl border border-white/15 bg-white/5 p-10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/30">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center">
            Modelos de iPhone que reparamos
          </h2>
          <p className="text-center text-lg text-slate-600 dark:text-slate-300">
            Desde iPhone 6S hasta la última generación iPhone 15
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {iphoneModels.map((model) => (
              <span
                key={model}
                className="rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary dark:border-primary/30 dark:bg-primary/10"
              >
                {model}
              </span>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Preguntas frecuentes sobre reparación de iPhone
            </h2>
            <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
              Respondemos las dudas más comunes de nuestros clientes
            </p>
          </div>
          <div className="space-y-4">
            {faqIphone.map((faq, index) => (
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
        <section className="rounded-2xl border border-white/15 bg-gradient-to-br from-primary/10 via-white/5 to-secondary/10 p-10 text-center backdrop-blur-2xl dark:border-white/10 dark:from-slate-900/40 dark:via-slate-900/30 dark:to-slate-900/40 md:p-16">
          <h2 className="mb-6 text-3xl font-bold text-slate-900 dark:text-white">
            ¿Tu iPhone necesita reparación?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-700 dark:text-slate-300">
            Obtené un diagnóstico profesional en menos de 24 horas con presupuesto digital detallado.
            Atención en Recoleta, CABA con logística puerta a puerta disponible.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/presupuesto-reparacion"
              className="rounded-full bg-secondary px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-secondary/90"
            >
              Solicitar presupuesto ahora
            </Link>
            <Link
              href="/contacto"
              className="rounded-full border-2 border-secondary px-8 py-4 text-lg font-semibold text-secondary transition hover:bg-secondary/10"
            >
              Agendar visita al laboratorio
            </Link>
          </div>
        </section>

        {/* Related Articles */}
        <section className="space-y-6 rounded-2xl border border-white/15 bg-white/5 p-10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/30">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Artículos relacionados
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Link
              href="/guias/microelectronica-reballing-caba"
              className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg transition hover:border-primary dark:border-white/15 dark:bg-slate-900/40"
            >
              <h3 className="mb-2 font-bold text-primary">Microelectrónica y Reballing</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Reparaciones avanzadas de placa lógica y chips BGA
              </p>
            </Link>
            <Link
              href="/guias/mantenimiento-preventivo-celulares"
              className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg transition hover:border-primary dark:border-white/15 dark:bg-slate-900/40"
            >
              <h3 className="mb-2 font-bold text-primary">Mantenimiento Preventivo</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Cuidados para extender la vida útil de tu iPhone
              </p>
            </Link>
            <Link
              href="/guias/soporte-empresas-servicio-tecnico"
              className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg transition hover:border-primary dark:border-white/15 dark:bg-slate-900/40"
            >
              <h3 className="mb-2 font-bold text-primary">Soporte Corporativo</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Planes empresariales para flotas de iPhone
              </p>
            </Link>
          </div>
        </section>

        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "Reparación de iPhone",
              "description": "Servicio técnico especializado en reparación de iPhone con repuestos originales y garantía escrita en Buenos Aires.",
              "provider": {
                "@type": "LocalBusiness",
                "name": "Team Celular",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Paraguay 2451",
                  "addressLocality": "Recoleta",
                  "addressRegion": "CABA",
                  "addressCountry": "AR",
                },
                "telephone": "+541151034595",
              },
              "areaServed": {
                "@type": "City",
                "name": "Buenos Aires",
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Servicios de reparación iPhone",
                "itemListElement": commonRepairs.map((repair) => ({
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": repair.title,
                    "description": repair.description,
                  },
                })),
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
              "mainEntity": faqIphone.map((faq) => ({
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
