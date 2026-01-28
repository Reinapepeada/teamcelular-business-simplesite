import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  FaBatteryFull,
  FaSync,
  FaSprayCan,
  FaCloud,
  FaTools,
  FaCalendarAlt,
  FaShieldAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTemperatureLow,
  FaClock,
  FaChartLine,
} from "react-icons/fa";
import ArticleSchema from "@/components/seo/ArticleSchema";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Mantenimiento Preventivo Celulares | Guía Completa 2024 CABA",
  description:
    "Guía profesional de mantenimiento preventivo: batería, limpieza, software y servicios preventivos en Buenos Aires. Extendé la vida útil de tu smartphone hasta 3 años más.",
  keywords: [
    "mantenimiento preventivo celulares",
    "cuidado smartphone Buenos Aires",
    "salud batería celular",
    "limpieza interna celular",
    "actualización software móvil",
    "servicio preventivo CABA",
    "extender vida útil smartphone",
    "checklist mantenimiento celular",
  ],
  alternates: {
    canonical: "https://teamcelular.com/guias/mantenimiento-preventivo-celulares",
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
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Mantenimiento Preventivo Celulares | Guía Completa 2024",
    description:
      "Guía profesional de mantenimiento preventivo para smartphones. Servicios preventivos en CABA con garantía.",
    type: "article",
    url: "https://teamcelular.com/guias/mantenimiento-preventivo-celulares",
    locale: "es_AR",
    images: [
      {
        url: "https://teamcelular.com/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Mantenimiento Preventivo de Celulares - Team Celular",
      },
    ],
    publishedTime: "2024-04-05T00:00:00Z",
    modifiedTime: "2025-12-11T00:00:00Z",
    section: "Guías Técnicas",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mantenimiento Preventivo | Team Celular",
    description: "Aprende a cuidar tu smartphone con rutinas profesionales",
    images: ["https://teamcelular.com/opengraph-image.png"],
  },
};

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";
const PAGE_URL = `${SITE_URL}/guias/mantenimiento-preventivo-celulares`;

const maintenanceTips = [
  {
    title: "Controlar la salud de la batería",
    detail:
      "Revisá los ciclos de carga cada 3 meses y evitá descensos por debajo del 20%. Si la salud de la batería cae bajo 80%, es momento de programar un reemplazo preventivo para evitar apagones inesperados y pérdida de datos.",
    Icon: FaBatteryFull,
    frequency: "Cada 3 meses",
  },
  {
    title: "Actualizar software y parches de seguridad",
    detail:
      "Instalá las últimas versiones de iOS o Android para prevenir vulnerabilidades de seguridad, mejorar el rendimiento y acceder a nuevas funcionalidades. Las actualizaciones corrigen bugs que pueden afectar la estabilidad del sistema.",
    Icon: FaSync,
    frequency: "Mensual",
  },
  {
    title: "Limpieza profesional interna y externa",
    detail:
      "Realizamos limpieza interna con aire ionizado, ultrasonido para componentes delicados y reemplazo de sellos para conservar la resistencia al agua (IP68). Evitamos oxidación en conectores y placas.",
    Icon: FaSprayCan,
    frequency: "Cada 6-12 meses",
  },
  {
    title: "Backup automático y protección de datos",
    detail:
      "Configuramos copias de seguridad automáticas en iCloud, Google Drive o soluciones enterprise. Habilitamos autenticación multifactor (2FA) y encriptación para minimizar pérdidas ante robos o fallas.",
    Icon: FaCloud,
    frequency: "Automático diario",
  },
];

const warningSignals = [
  {
    signal: "Batería que se descarga rápidamente",
    action: "Verificar salud de la batería y apps con alto consumo de energía",
    Icon: FaBatteryFull,
  },
  {
    signal: "Sobrecalentamiento durante uso normal",
    action: "Revisar procesos en segundo plano y estado de la batería",
    Icon: FaTemperatureLow,
  },
  {
    signal: "Rendimiento lento o apps que se cierran",
    action: "Liberar almacenamiento, actualizar software o formatear dispositivo",
    Icon: FaChartLine,
  },
  {
    signal: "Problemas de carga o conexión inestable",
    action: "Limpiar puerto de carga, verificar cable y adaptador originales",
    Icon: FaExclamationTriangle,
  },
];

const maintenancePlan = [
  {
    title: "Plan Mensual - Cuidado Básico",
    description: "Actualizaciones de software, backup automático y monitoreo remoto de salud del dispositivo.",
    price: "Desde $5.000/mes",
    Icon: FaCalendarAlt,
  },
  {
    title: "Plan Semestral - Mantenimiento Completo",
    description: "Incluye limpieza profesional, revisión de batería, diagnóstico de sensores y reporte técnico detallado.",
    price: "Desde $18.000 c/3 meses",
    Icon: FaTools,
  },
  {
    title: "Plan Corporativo - Flotas de Dispositivos",
    description: "Servicio personalizado para empresas: visitas programadas, equipos de reemplazo (loaner) y reportería ejecutiva.",
    price: "Cotización personalizada",
    Icon: FaShieldAlt,
  },
];

const faqMaintenance = [
  {
    question: "¿Cada cuánto tiempo debo hacer mantenimiento preventivo?",
    answer:
      "Recomendamos una revisión completa cada 6 meses para usuarios particulares. Para empresas con flotas de dispositivos, sugerimos inspecciones trimestrales con reportes de estado por equipo. Si notás caída de rendimiento, problemas de carga o sobrecalentamiento, agendá una revisión antes del período establecido.",
  },
  {
    question: "¿Qué incluye el servicio de limpieza profesional?",
    answer:
      "Nuestro servicio incluye: apertura del dispositivo en ambiente controlado ESD, limpieza de placa lógica con ultrasonido, remoción de polvo y residuos con aire ionizado, limpieza de conectores (Lightning/USB-C) con IPA 99%, reemplazo de adhesivos y sellos para mantener resistencia IP68, y verificación de todos los componentes bajo microscopio.",
  },
  {
    question: "¿El mantenimiento preventivo anula la garantía del fabricante?",
    answer:
      "En Team Celular seguimos protocolos certificados que NO anulan la garantía del fabricante. Documentamos cada intervención con fotografías de alta resolución y entregamos informe técnico detallado. Si tu equipo está en garantía oficial (Apple, Samsung, Motorola), te asesoramos sobre qué servicios podés realizar sin afectar la cobertura.",
  },
  {
    question: "¿Ofrecen planes de mantenimiento para empresas?",
    answer:
      "Sí, diseñamos planes corporativos personalizados según el tamaño de tu flota y la criticidad operativa. Incluimos: visitas programadas mensuales/trimestrales, equipos de reemplazo durante mantenimientos, reportes ejecutivos con métricas de salud por dispositivo, capacitación de usuarios finales y soporte técnico prioritario vía WhatsApp Business y email.",
  },
  {
    question: "¿Puedo hacer mantenimiento preventivo en casa?",
    answer:
      "Algunas tareas básicas sí: limpieza externa con paño de microfibra, actualización de software, configuración de backups automáticos y monitoreo de salud de batería desde ajustes del sistema. Sin embargo, para limpieza interna, reemplazo de componentes o diagnóstico avanzado, recomendamos trabajar con técnicos certificados para evitar daños permanentes o pérdida de resistencia al agua.",
  },
];

export default function PreventiveMaintenanceGuide() {
  return (
    <div className="flex w-full justify-center px-4 py-16">
      <ArticleSchema
        title="Mantenimiento Preventivo de Celulares | Team Celular"
        description="Guía completa de mantenimiento preventivo para smartphones: checklist profesional, cuidado de batería, actualización de software y limpieza especializada."
        publishedTime="2024-04-05T00:00:00Z"
        modifiedTime="2025-12-11T00:00:00Z"
        authorName="Team Celular"
        image="https://teamcelular.com/opengraph-image.png"
        url={PAGE_URL}
      />
      <article className="w-full max-w-6xl space-y-16">
        <BreadcrumbJsonLd
          items={[
            { name: "Inicio", url: `${SITE_URL}/` },
            { name: "Guías", url: `${SITE_URL}/guias` },
            { name: "Mantenimiento preventivo", url: PAGE_URL },
          ]}
        />
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
            Mantenimiento Preventivo
          </span>
        </nav>

        {/* Hero Section */}
        <header className="space-y-6 rounded-2xl border border-white/15 bg-white/5 p-10 text-center backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30 md:p-16">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-secondary to-primary shadow-2xl">
            <FaTools className="text-5xl text-white" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
            Mantenimiento Preventivo de Celulares
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-600 dark:text-slate-300">
            Guía profesional para <strong className="text-primary">extender la vida útil</strong> de tu smartphone y
            evitar reparaciones costosas. Rutinas personalizadas para usuarios particulares y empresas en CABA.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contacto"
              className="rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:shadow-xl"
            >
              Agendar servicio preventivo
            </Link>
            <Link
              href="/presupuesto-reparacion"
              className="rounded-full border-2 border-primary px-8 py-4 text-lg font-semibold text-primary transition hover:bg-primary/10"
            >
              Solicitar diagnóstico
            </Link>
          </div>
        </header>

        {/* Introducción */}
        <section className="space-y-6 rounded-2xl border border-white/15 bg-white/5 p-10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/30">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            ¿Por qué es importante el mantenimiento preventivo?
          </h2>
          <div className="space-y-4 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
            <p>
              El mantenimiento preventivo es la estrategia más efectiva para{" "}
              <strong className="text-primary">evitar reparaciones costosas</strong> y asegurar que tu smartphone
              rinda al máximo durante toda su vida útil. En <strong>Team Celular</strong> desarrollamos rutinas
              personalizadas basadas en más de 10 años de experiencia atendiendo usuarios particulares y empresas con
              flotas de dispositivos.
            </p>
            <p>
              Un celular bien mantenido puede durar entre <strong className="text-secondary">4 y 6 años</strong>, mientras
              que uno sin cuidados adecuados suele presentar fallas graves en 18-24 meses. Los principales beneficios del
              mantenimiento preventivo incluyen:
            </p>
            <ul className="ml-6 space-y-2">
              <li className="flex items-start gap-3">
                <FaCheckCircle className="mt-1 text-primary flex-shrink-0" />
                <span>
                  <strong>Reducción de costos:</strong> Detectar problemas antes de que se vuelvan críticos puede ahorrarte
                  hasta 70% en reparaciones
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FaCheckCircle className="mt-1 text-primary flex-shrink-0" />
                <span>
                  <strong>Mayor rendimiento:</strong> Dispositivos optimizados funcionan 30-40% más rápido y consumen menos batería
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FaCheckCircle className="mt-1 text-primary flex-shrink-0" />
                <span>
                  <strong>Protección de datos:</strong> Backups automáticos y actualizaciones de seguridad minimizan riesgos de pérdida
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FaCheckCircle className="mt-1 text-primary flex-shrink-0" />
                <span>
                  <strong>Mayor valor de reventa:</strong> Equipos en buen estado conservan hasta 50% más de su valor original
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Checklist de Mantenimiento */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Checklist profesional de mantenimiento
            </h2>
            <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
              Tareas esenciales para mantener tu dispositivo en óptimas condiciones
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {maintenanceTips.map((tip) => {
              const Icon = tip.Icon;
              return (
                <div
                  key={tip.title}
                  className="group rounded-2xl border border-white/15 bg-white/5 p-8 backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/30"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-3xl text-white shadow-lg">
                      <Icon />
                    </div>
                    <span className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                      <FaClock />
                      {tip.frequency}
                    </span>
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-secondary dark:text-secondary/90">
                    {tip.title}
                  </h3>
                  <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                    {tip.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Señales de advertencia */}
        <section className="space-y-8 rounded-2xl border border-white/15 bg-white/5 p-10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/30">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 text-3xl text-white shadow-lg">
              <FaExclamationTriangle />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Señales de advertencia que no debés ignorar
            </h2>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Si notás alguno de estos síntomas, es momento de agendar una revisión técnica profesional
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {warningSignals.map((item) => {
              const Icon = item.Icon;
              return (
                <div
                  key={item.signal}
                  className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-6 backdrop-blur-lg dark:border-yellow-500/30 dark:bg-yellow-500/10"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <Icon className="text-2xl text-yellow-600 dark:text-yellow-500" />
                    <h3 className="font-bold text-slate-900 dark:text-white">{item.signal}</h3>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    <strong className="text-primary">Acción recomendada:</strong> {item.action}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Planes de mantenimiento */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Planes de mantenimiento preventivo
            </h2>
            <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
              Elegí el plan que mejor se adapte a tus necesidades
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {maintenancePlan.map((plan) => {
              const Icon = plan.Icon;
              return (
                <div
                  key={plan.title}
                  className="rounded-2xl border border-white/15 bg-white/5 p-8 backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/30"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-2xl text-primary">
                    <Icon />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                    {plan.title}
                  </h3>
                  <p className="mb-4 text-slate-700 dark:text-slate-300">{plan.description}</p>
                  <p className="text-2xl font-bold text-primary">{plan.price}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Video Section */}
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
                Nuestro proceso de mantenimiento
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                <p>
                  En <strong className="text-primary">Team Celular</strong> utilizamos equipamiento profesional y
                  protocolos certificados para asegurar que tu dispositivo reciba el mejor cuidado posible.
                </p>
                <ul className="ml-6 space-y-2 list-disc">
                  <li>Diagnóstico completo con software especializado</li>
                  <li>Limpieza con ultrasonido y aire ionizado</li>
                  <li>Verificación bajo microscopio 20x-45x</li>
                  <li>Reporte fotográfico de cada etapa</li>
                  <li>Garantía escrita de 3 meses</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Preguntas frecuentes sobre mantenimiento
            </h2>
            <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
              Respondemos las dudas más comunes de nuestros clientes
            </p>
          </div>
          <div className="space-y-4">
            {faqMaintenance.map((faq, index) => (
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
            Protegé tu inversión con mantenimiento profesional
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-700 dark:text-slate-300">
            Agendá tu servicio de mantenimiento preventivo y extendé la vida útil de tu smartphone.
            Atención en CABA con más de 10 años de experiencia.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contacto"
              className="rounded-full bg-secondary px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-secondary/90"
            >
              Agendar servicio ahora
            </Link>
            <Link
              href="https://wa.me/5491151034595?text=Hola%20Team%20Celular,%20necesito%20información%20sobre%20mantenimiento%20preventivo"
              className="rounded-full border-2 border-secondary px-8 py-4 text-lg font-semibold text-secondary transition hover:bg-secondary/10"
            >
              Consultar por WhatsApp
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
              href="/guias/reparacion-iphone-buenos-aires"
              className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg transition hover:border-primary dark:border-white/15 dark:bg-slate-900/40"
            >
              <h3 className="mb-2 font-bold text-primary">Reparación de iPhone</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Proceso completo de reparación con repuestos originales
              </p>
            </Link>
            <Link
              href="/guias/microelectronica-reballing-caba"
              className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg transition hover:border-primary dark:border-white/15 dark:bg-slate-900/40"
            >
              <h3 className="mb-2 font-bold text-primary">Microelectrónica y Reballing</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Reparaciones avanzadas de placas y chips BGA
              </p>
            </Link>
            <Link
              href="/guias/soporte-empresas-servicio-tecnico"
              className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg transition hover:border-primary dark:border-white/15 dark:bg-slate-900/40"
            >
              <h3 className="mb-2 font-bold text-primary">Soporte Corporativo</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Planes de mantenimiento para empresas con SLA
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
              "@type": "HowTo",
              "name": "Mantenimiento Preventivo de Celulares",
              "description": "Guía completa de mantenimiento preventivo para smartphones con checklist profesional y consejos de expertos.",
              "image": "https://teamcelular.com/opengraph-image.png",
              "totalTime": "PT6M",
              "supply": ["Smartphone", "Paño de microfibra", "Software de diagnóstico"],
              "tool": ["Aire comprimido", "IPA 99%", "Microscopio (para servicio profesional)"],
              "step": maintenanceTips.map((tip, index) => ({
                "@type": "HowToStep",
                "position": index + 1,
                "name": tip.title,
                "text": tip.detail,
              })),
              "author": {
                "@type": "Organization",
                "name": "Team Celular",
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
              "mainEntity": faqMaintenance.map((faq) => ({
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
