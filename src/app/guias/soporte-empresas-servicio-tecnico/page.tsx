import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { 
  FaShieldAlt, 
  FaTruck, 
  FaHeadset, 
  FaTools, 
  FaChartLine, 
  FaClock, 
  FaCheckCircle,
  FaFileContract,
  FaBuilding,
  FaIndustry,
  FaStore,
  FaLaptopCode,
  FaTruckMoving,
  FaUserShield
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "Servicio Técnico Celulares Empresas | Soporte Corporativo Buenos Aires",
  description:
    "⚡ Soporte técnico corporativo: SLA garantizado ✓ logística incluida ✓ planes preventivos ✓ Atendemos empresas, gremios y organizaciones en CABA y GBA. +10 años de experiencia.",
  keywords: [
    "servicio técnico empresas Buenos Aires",
    "reparación celulares corporativos",
    "SLA dispositivos móviles",
    "soporte técnico gremios CABA",
    "mantenimiento preventivo empresas",
    "service desk móviles",
    "reparación celulares empresas",
    "soporte corporativo smartphones",
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
    title: "Servicio Técnico Corporativo Celulares | Buenos Aires",
    description:
      "Soporte técnico especializado para empresas con SLA garantizado, logística puerta a puerta y planes preventivos.",
    type: "article",
    locale: "es_AR",
    url: "https://teamcelular.com/guias/soporte-empresas-servicio-tecnico",
    siteName: "Team Celular",
  },
  twitter: {
    card: "summary_large_image",
    title: "Servicio Técnico Corporativo Celulares",
    description: "Soporte empresarial con SLA garantizado y logística incluida.",
  },
  alternates: {
    canonical: "https://teamcelular.com/guias/soporte-empresas-servicio-tecnico",
  },
};

const benefits = [
  {
    title: "Diagnóstico técnico en menos de 24 horas",
    detail:
      "Evaluación profesional con presupuesto digital detallado, trazabilidad completa de cada equipo mediante sistema de tickets y fotografía del estado inicial. Identificamos fallas de hardware, software y daño por líquidos con equipamiento de diagnóstico especializado.",
    Icon: FaClock,
  },
  {
    title: "Logística corporativa puerta a puerta",
    detail:
      "Coordinamos retiros y entregas programadas en CABA, GBA Norte y GBA Sur adicional en planes corporativos. Disponibilidad de equipos de reemplazo (loaner) para garantizar continuidad operativa durante reparaciones complejas.",
    Icon: FaTruck,
  },
  {
    title: "Mesa de ayuda técnica multicanal",
    detail:
      "Soporte vía WhatsApp Business, email corporativo y línea telefónica directa con seguimiento proactivo de incidencias. Reportes de estado en tiempo real y notificaciones automáticas por cada etapa del proceso de reparación.",
    Icon: FaHeadset,
  },
  {
    title: "Planes de mantenimiento preventivo",
    detail:
      "Inspecciones programadas, limpieza de conectores, cambio de batería preventivo y actualización de software para extender la vida útil de tu flota de dispositivos. Reducción de hasta 40% en costos de reparación mediante mantenimiento planificado.",
    Icon: FaTools,
  },
];

const industries = [
  {
    sector: "Logística y delivery",
    description:
      "Empresas de reparto, couriers y flotas comerciales que dependen de dispositivos móviles para coordinación en tiempo real.",
    Icon: FaTruckMoving,
  },
  {
    sector: "Fuerzas de seguridad y gremios",
    description:
      "Organizaciones sindicales, cuerpos de seguridad privada y delegaciones que requieren disponibilidad continua de comunicaciones.",
    Icon: FaUserShield,
  },
  {
    sector: "Call centers y contact centers",
    description:
      "Operaciones de atención al cliente con equipos móviles para agentes remotos o sistemas de telefonía empresarial.",
    Icon: FaHeadset,
  },
  {
    sector: "Startups y equipos remotos",
    description:
      "Empresas tecnológicas con work-from-home que proveen dispositivos corporativos a colaboradores distribuidos geográficamente.",
    Icon: FaLaptopCode,
  },
  {
    sector: "Retail y comercio",
    description:
      "Cadenas de locales comerciales, vendedores de campo y personal de piso que utiliza dispositivos móviles para cobros y gestión de inventario.",
    Icon: FaStore,
  },
];

const slaFeatures = [
  {
    title: "Tiempo de respuesta garantizado",
    description:
      "SLA configurable según criticidad: 4 horas para incidencias críticas, 24 horas para reparaciones estándar, 72 horas para microelectrónica avanzada.",
    Icon: FaClock,
  },
  {
    title: "Garantía extendida corporativa",
    description:
      "3 meses de garantía por escrito en todas las reparaciones, con opción de extensión a 6 o 12 meses en planes anuales.",
    Icon: FaShieldAlt,
  },
  {
    title: "Repuestos originales certificados",
    description:
      "Stock permanente de pantallas, baterías y componentes originales o de calidad AAA para las marcas más utilizadas en entornos corporativos.",
    Icon: FaCheckCircle,
  },
];

const faqBusiness = [
  {
    question: "¿Cuál es el volumen mínimo de dispositivos para planes corporativos?",
    answer:
      "Trabajamos con organizaciones desde 5 dispositivos en adelante. Para flotas menores a 10 equipos, recomendamos nuestro servicio de reparación estándar con descuento por volumen. Los planes corporativos completos con SLA y logística incluida están diseñados para organizaciones con 10 o más dispositivos.",
  },
  {
    question: "¿Ofrecen servicio on-site o solo en taller?",
    answer:
      "Nuestro servicio principal es en taller especializado en Recoleta, donde contamos con equipamiento profesional (microscopio, estación de reballing, cámara de diagnóstico). Para diagnósticos iniciales o mantenimientos preventivos programados, podemos coordinar visitas on-site en CABA sin cargo adicional en planes anuales.",
  },
  {
    question: "¿Qué marcas y modelos están incluidos en el soporte corporativo?",
    answer:
      "Reparamos todas las marcas comerciales: iPhone, Samsung Galaxy, Motorola, Xiaomi, OnePlus, Huawei, LG y otras. También trabajamos con dispositivos menos comunes si nos notificás con anticipación para asegurar disponibilidad de repuestos. Consultanos por modelos específicos o equipos ruggedizados para industria.",
  },
  {
    question: "¿Cómo facturan los servicios corporativos?",
    answer:
      "Emitimos factura A o B según tu requerimiento. Podés optar por facturación mensual consolidada de todos los servicios o facturación individual por reparación. Aceptamos transferencia bancaria, cheques y pagos con tarjeta corporativa. Planes anuales con opción de pago trimestral o semestral.",
  },
  {
    question: "¿Qué sucede con los datos sensibles durante la reparación?",
    answer:
      "Firmamos acuerdos de confidencialidad (NDA) sin cargo adicional. Recomendamos realizar backup y borrado remoto antes del envío. Si la reparación no requiere acceso al sistema operativo (pantalla, batería, carcasa), el dispositivo permanece bloqueado todo el tiempo. Para reparaciones de placa base, solicitamos desbloqueo temporal con credenciales provisorias.",
  },
];

export default function BusinessSupportGuide() {
  return (
    <div className="flex w-full justify-center px-4 py-16">
      <article className="w-full max-w-6xl space-y-16">
        {/* Hero Section */}
        <header className="space-y-6 rounded-2xl border border-white/15 bg-white/5 p-10 text-center backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30 md:p-16">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-secondary to-primary shadow-2xl">
            <FaBuilding className="text-5xl text-white" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
            Servicio Técnico Corporativo de Celulares
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-600 dark:text-slate-300">
            Soporte técnico especializado para empresas y organizaciones con{" "}
            <strong className="text-primary">SLA garantizado</strong>, logística incluida y planes
            de mantenimiento preventivo. Más de 10 años resolviendo las necesidades tecnológicas de
            empresas en Buenos Aires.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contacto"
              className="rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:shadow-xl"
            >
              Solicitar reunión ejecutiva
            </Link>
            <Link
              href="/presupuesto-reparacion"
              className="rounded-full border-2 border-primary px-8 py-4 text-lg font-semibold text-primary transition hover:bg-primary/10"
            >
              Pedir propuesta de SLA
            </Link>
          </div>
        </header>

        {/* Introducción */}
        <section className="grid gap-8 overflow-hidden rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/30 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full rounded-xl object-cover shadow-lg"
            >
              <source src="/videos/microscopio.mp4" type="video/mp4" />
              Tu navegador no soporta el elemento de video.
            </video>
          </div>
          <div className="order-1 space-y-6 p-10 md:order-2">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              ¿Por qué las empresas eligen Team Celular?
            </h2>
            <div className="space-y-4 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
            <p>
              En entornos corporativos, la disponibilidad de dispositivos móviles es crítica para la
              continuidad operativa. Un celular fuera de servicio significa un colaborador sin
              herramientas de trabajo, pérdida de productividad y costos ocultos difíciles de
              cuantificar.
            </p>
            <p>
              <strong className="text-primary">Team Celular</strong> desarrolló un servicio técnico
              especializado para organizaciones que necesitan tiempos de respuesta predecibles,
              reportería profesional y soporte técnico que entiende la urgencia del mundo
              corporativo. No somos un service genérico: somos un laboratorio técnico con capacidad
              de reparación avanzada y vocación de servicio empresarial.
            </p>
            <p>
              Trabajamos bajo{" "}
              <strong className="text-secondary">
                acuerdos de nivel de servicio (SLA) personalizados
              </strong>
              , coordinamos logística puerta a puerta y entregamos reportes detallados para áreas de
              IT, compras o compliance. Si tu empresa depende de celulares para operar, tenemos la
              solución técnica que necesitás.
            </p>
            </div>
          </div>
        </section>

        {/* Beneficios */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Beneficios del servicio corporativo
            </h2>
            <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
              Diseñamos cada plan según las necesidades operativas de tu organización
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {benefits.map((benefit) => {
              const Icon = benefit.Icon;
              return (
                <div
                  key={benefit.title}
                  className="group rounded-2xl border border-white/15 bg-white/5 p-8 backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/30"
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-3xl text-white shadow-lg">
                    <Icon />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-secondary dark:text-secondary/90">
                    {benefit.title}
                  </h3>
                  <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                    {benefit.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* SLA Features */}
        <section className="space-y-8 rounded-2xl border border-white/15 bg-white/5 p-10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/30">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Características de nuestros SLA
            </h2>
            <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
              Acuerdos de servicio transparentes y medibles
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {slaFeatures.map((feature) => {
              const Icon = feature.Icon;
              return (
                <div
                  key={feature.title}
                  className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg dark:border-white/15 dark:bg-slate-900/40"
                >
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-2xl text-primary">
                    <Icon />
                  </div>
                  <h3 className="mb-3 text-lg font-bold text-primary">{feature.title}</h3>
                  <p className="text-slate-700 dark:text-slate-300">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Industrias */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Industrias y sectores que asistimos
            </h2>
            <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
              Adaptamos planes según el tipo de operación y volumen de dispositivos
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => {
              const Icon = industry.Icon;
              return (
                <div
                  key={industry.sector}
                  className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-slate-900/30"
                >
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-secondary/10 text-2xl text-secondary">
                    <Icon />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-primary">{industry.sector}</h3>
                  <p className="text-slate-700 dark:text-slate-300">{industry.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Reportes y Compliance */}
        <section className="overflow-hidden rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/30">
          <div className="grid gap-0 md:grid-cols-5">
            <div className="order-2 md:order-1 md:col-span-2">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
              >
                <source src="/videos/5028622-hd_1280_720_25fps.mp4" type="video/mp4" />
                Tu navegador no soporta el elemento de video.
              </video>
            </div>
            <div className="order-1 space-y-6 p-10 md:order-2 md:col-span-3">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-3xl text-white shadow-lg">
                  <FaChartLine />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                  Reportería profesional y compliance
                </h2>
              </div>
              <div className="space-y-4 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
            <p>
              Documentamos cada intervención técnica con{" "}
              <strong>fotografías de alta resolución</strong>, registro de número de serie (IMEI),
              descripción detallada de la falla y componentes reemplazados. Toda reparación incluye
              garantía escrita con firma y sello del técnico responsable.
            </p>
            <p>
              Generamos <strong className="text-primary">reportes mensuales consolidados</strong>{" "}
              para:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>
                <strong>Auditorías internas:</strong> Control de costos, tiempos de respuesta y
                KPIs de disponibilidad de equipos
              </li>
              <li>
                <strong>Compañías de seguros:</strong> Documentación probatoria para reclamos por
                daños accidentales o robo
              </li>
              <li>
                <strong>Proveedores de telefonía:</strong> Trazabilidad de reparaciones para
                equipos en garantía o planes corporativos
              </li>
              <li>
                <strong>Áreas de IT y compras:</strong> Histórico de intervenciones, costo total de
                propiedad (TCO) y planificación de renovación de flota
              </li>
            </ul>
            <p>
              Podés combinar nuestros servicios de{" "}
              <Link
              href="/guias/microelectronica-reballing-caba"
              className="font-semibold text-primary underline decoration-primary/30 hover:decoration-primary"
            >
              microelectrónica avanzada y reballing
            </Link>{" "}
            con soporte on-site, capacitaciones técnicas para tu equipo de IT y consultorías para
            optimización de procesos de mantenimiento.
          </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Empresas */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Preguntas frecuentes de empresas
            </h2>
            <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
              Respondemos las consultas más comunes de organizaciones
            </p>
          </div>
          <div className="space-y-4">
            {faqBusiness.map((faq, index) => (
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
            ¿Listo para profesionalizar el soporte técnico de tu empresa?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-700 dark:text-slate-300">
            Coordinamos una reunión ejecutiva sin cargo para analizar tus necesidades, diseñar un
            plan a medida y entregarte una propuesta comercial detallada con SLA, costos y tiempos
            de implementación.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contacto"
              className="rounded-full bg-secondary px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-secondary/90"
            >
              Agendar reunión ejecutiva
            </Link>
            <Link
              href="https://wa.me/5491151034595?text=Hola%20Team%20Celular,%20necesito%20información%20sobre%20planes%20corporativos"
              className="rounded-full border-2 border-secondary px-8 py-4 text-lg font-semibold text-secondary transition hover:bg-secondary/10"
            >
              Consultar por WhatsApp
            </Link>
          </div>
        </section>

        {/* Schema.org structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "Servicio Técnico Corporativo de Celulares",
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
                "email": "teamcelular.arg@gmail.com",
              },
              "serviceType": "Reparación y mantenimiento de dispositivos móviles corporativos",
              "areaServed": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": "-34.5937",
                  "longitude": "-58.3917",
                },
                "geoRadius": "50000",
              },
              "description":
                "Servicio técnico especializado para empresas con SLA garantizado, logística puerta a puerta, planes preventivos y soporte para flotas de dispositivos móviles en CABA y GBA.",
              "offers": {
                "@type": "Offer",
                "availability": "https://schema.org/InStock",
                "priceCurrency": "ARS",
              },
            }),
          }}
        />
      </article>
    </div>
  );
}
