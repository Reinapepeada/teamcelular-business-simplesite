import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import ArticleSchema from "@/components/seo/ArticleSchema";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import GuideInterlinkSection from "@/components/seo/GuideInterlinkSection";
import { WARRANTY_SCOPE_MESSAGE } from "@/lib/copyStandards";
import GuideByline from "@/components/seo/GuideByline";
import VideoSchema from "@/components/seo/VideoSchema";
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
  title: "Servicio Técnico de Celulares para Empresas en CABA",
  description:
    "Celulares corporativos reparados en CABA con SLA, logística puerta a puerta y planes desde 5 equipos. Recoleta y Belgrano, garantía escrita 90 días.",
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
  alternates: {
    canonical: "https://teamcelular.com/guias/soporte-empresas-servicio-tecnico",
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
    title: "Servicio Técnico de Celulares para Empresas en CABA | Team Celular",
    description:
      "Team Celular, Paraguay 2451 Recoleta y Amenábar 2032 Belgrano, presta soporte técnico de celulares para empresas. SLA, logística puerta a puerta, desde 5 dispositivos. Garantía escrita 90 días.",
    type: "article",
    url: "https://teamcelular.com/guias/soporte-empresas-servicio-tecnico",
    locale: "es_AR",
    images: [
      {
        url: "https://teamcelular.com/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Servicio Técnico Corporativo - Team Celular",
      },
    ],
    publishedTime: "2024-03-10T00:00:00Z",
    modifiedTime: "2026-08-20T00:00:00Z",
    section: "Guías Técnicas",
  },
  twitter: {
    card: "summary_large_image",
    title: "Servicio Técnico de Celulares para Empresas en CABA | Team Celular",
    description: "Team Celular, Recoleta y Belgrano CABA. Soporte de celulares para empresas: SLA, logística puerta a puerta y garantía escrita 90 días.",
    images: ["https://teamcelular.com/opengraph-image.png"],
  },
};

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";
const PAGE_URL = `${SITE_URL}/guias/soporte-empresas-servicio-tecnico`;

const benefits = [
  {
    title: "Diagnóstico y presupuesto por escrito",
    detail:
      "Revisamos la falla y entregamos un presupuesto antes de reparar. Si requiere revisión de placa, el informe tarda hasta 72 horas hábiles; la reparación lleva semanas y se confirma precio y plazo por escrito.",
    Icon: FaClock,
  },
  {
    title: "Logística corporativa puerta a puerta",
    detail:
      "Coordinamos retiros y entregas programadas dentro de CABA. Consultá cobertura, costo y disponibilidad de equipos de reemplazo antes de contratar el plan.",
    Icon: FaTruck,
  },
  {
    title: "Mesa de ayuda técnica multicanal",
    detail:
      "Contacto por WhatsApp, email y teléfono. Acordamos con tu organización quién recibe el presupuesto y cómo se informa el avance de cada equipo.",
    Icon: FaHeadset,
  },
  {
    title: "Planes de mantenimiento preventivo",
    detail:
      "Inspecciones programadas y revisión de conectores, batería y software según el estado de cada equipo. Definimos las tareas y su costo en la propuesta; el ahorro depende de las fallas y del uso de la flota.",
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
    title: "Plazos acordados por escrito",
    description:
      "El SLA define prioridades y tiempos según el servicio contratado. La revisión de placa puede llevar hasta 72 horas hábiles; no equivale al plazo de reparación. Confirmamos los compromisos antes de aceptar el trabajo.",
    Icon: FaClock,
  },
  {
    title: "Garantia escrita corporativa",
    description:
      `${WARRANTY_SCOPE_MESSAGE} En planes anuales, definimos cobertura y alcance en el SLA firmado.`,
    Icon: FaShieldAlt,
  },
  {
    title: "Repuestos y stock confirmados",
    description:
      "Confirmamos disponibilidad, tipo de repuesto y precio para cada modelo antes de reparar. La propuesta identifica la pieza ofrecida y la garantía aplicable.",
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
      "Nuestro servicio se realiza en los talleres de Recoleta (Paraguay 2451) y Belgrano (Amenábar 2032), donde contamos con equipamiento profesional: microscopio, estación de soldadura y cámara de diagnóstico. Para diagnósticos iniciales o mantenimientos preventivos programados coordinamos visitas on-site en CABA sin cargo adicional en planes anuales.",
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
    <div className="flex w-full justify-center px-4 py-8 sm:py-12">
      <VideoSchema
        name="Diagnóstico de placa bajo microscopio en Team Celular"
        description="Inspección de una placa de celular bajo microscopio en el laboratorio de Team Celular, Paraguay 2451 Recoleta CABA, para ubicar el componente dañado antes de intervenir."
        contentPath="/videos/microscopio.mp4"
        thumbnailPath="/images/poster-microscopio.jpg"
        uploadDate="2026-08-20"
        duration="PT22S"
      />
      <ArticleSchema
        title="Servicio Técnico de Celulares para Empresas y Organizaciones | Team Celular"
        description="Soporte técnico corporativo especializado en reparación de dispositivos móviles con SLA acordado por escrito, logística incluida y planes preventivos en CABA."
        publishedTime="2024-03-10T00:00:00Z"
        modifiedTime="2026-08-20T00:00:00Z"
        image="https://teamcelular.com/opengraph-image.png"
        url={PAGE_URL}
      />
      <article className="w-full max-w-6xl space-y-16">
        <BreadcrumbJsonLd
          items={[
            { name: "Inicio", url: `${SITE_URL}/` },
            { name: "Guías", url: `${SITE_URL}/guias` },
            { name: "Soporte empresas", url: PAGE_URL },
          ]}
        />
        {/* Hero Section */}
        <header className="space-y-6 rounded-2xl border border-white/15 bg-white/5 p-6 sm:p-8 dark:border-white/10 dark:bg-slate-900/30 md:p-10">
          <h1 className="text-[clamp(1.75rem,4.5vw,3rem)] font-semibold tracking-tight text-slate-900 dark:text-white">
            Servicio Técnico de Celulares para Empresas en CABA
          </h1>
          <p className="max-w-[65ch] text-lg leading-relaxed text-slate-300">
            Revisamos y reparamos celulares de empresas con flotas desde 5 dispositivos en Recoleta y Belgrano.
            Definimos diagnóstico, repuestos, logística y plazos en la propuesta, con garantía escrita de 90 días sobre trabajo y repuesto.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contacto"
              className="rounded-full bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-primary/90 hover:shadow-xl"
            >
              Solicitar reunión ejecutiva
            </Link>
            <Link
              href="/presupuesto-reparacion"
              className="rounded-full border-2 border-primary px-8 py-4 text-lg font-semibold text-primary dark:text-secondary transition hover:bg-primary/10"
            >
              Pedir propuesta de SLA
            </Link>
          </div>

          <div className="mt-4 flex justify-center">
            <GuideByline modifiedTime="2026-08-20T00:00:00Z" tone="light" />
          </div>
        </header>

        {/* Introducción */}
        <section className="grid gap-8 overflow-hidden rounded-2xl border border-white/15 bg-white/5 dark:border-white/10 dark:bg-slate-900/30 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <video
              controls
              preload="none"
              poster="/images/poster-microscopio.jpg"
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
              Un celular fuera de servicio significa un colaborador sin herramientas, producción
              detenida y costos que no aparecen en ningún presupuesto hasta que el problema ya ocurrió.
              En flotas de 5 o más equipos, cada hora sin respuesta técnica multiplica ese impacto.
            </p>
            <p>
              <strong className="text-primary dark:text-secondary">Team Celular</strong>, con talleres en Recoleta (Paraguay 2451)
              y Belgrano (Amenábar 2032), entrega diagnóstico y presupuesto por escrito, y trabaja con
              SLA firmado para que los tiempos de reparación sean predecibles, no una promesa verbal.
              Llevamos más de 15 años reparando dispositivos móviles con microscopio, instrumental de
              laboratorio y garantía escrita.
            </p>
            <p>
              Coordinamos retiro y entrega en CABA, emitimos factura A o B, firmamos NDA sin cargo
              adicional y generamos reportes mensuales para IT, compras o compliance. Si tu empresa
              depende de celulares para operar, trabajamos bajo acuerdo con{" "}
              <strong className="text-secondary">SLA configurable por criticidad de incidencia</strong>.
            </p>
            </div>
          </div>
        </section>

        {/* Beneficios */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              ¿Qué incluye el servicio técnico corporativo?
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
                  className="group rounded-2xl border border-white/15 bg-white/5 p-8 transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/30"
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
        <section className="space-y-8 rounded-2xl border border-white/15 bg-white/5 p-10 dark:border-white/10 dark:bg-slate-900/30">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              ¿Qué garantiza el SLA de Team Celular?
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
                  className="rounded-xl border border-white/20 bg-white/10 p-6 dark:border-white/15 dark:bg-slate-900/40"
                >
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-2xl text-primary dark:text-secondary">
                    <Icon />
                  </div>
                  <h3 className="mb-3 text-lg font-bold text-primary dark:text-secondary">{feature.title}</h3>
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
              ¿A qué sectores atendemos?
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
                  className="rounded-2xl border border-white/15 bg-white/5 p-6 transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-slate-900/30"
                >
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-secondary/10 text-2xl text-secondary">
                    <Icon />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-primary dark:text-secondary">{industry.sector}</h3>
                  <p className="text-slate-700 dark:text-slate-300">{industry.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Reportes y Compliance */}
        <section className="overflow-hidden rounded-2xl border border-white/15 bg-white/5 dark:border-white/10 dark:bg-slate-900/30">
          <div className="grid gap-0">
            <div className="space-y-6 p-6 sm:p-10">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-3xl text-white shadow-lg">
                  <FaChartLine />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                  ¿Qué documentación entregamos por cada reparación?
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
              Generamos <strong className="text-primary dark:text-secondary">reportes mensuales consolidados</strong>{" "}
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
                <strong>?reas de IT y compras:</strong> Histórico de intervenciones, costo total de
                propiedad (TCO) y planificación de renovación de flota
              </li>
            </ul>
            <p>
              Podés combinar nuestros servicios de{" "}
              <Link
              href="/reparaciones/reparacion-placa-caba"
              className="font-semibold text-primary dark:text-secondary underline decoration-primary/30 hover:decoration-primary"
            >
              revisión de placa
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
                className="group rounded-2xl border border-white/15 bg-white/5 p-6 transition hover:shadow-lg dark:border-white/10 dark:bg-slate-900/30"
              >
                <summary className="flex min-h-11 items-center cursor-pointer text-lg font-bold text-secondary group-hover:text-primary dark:hover:text-secondary dark:text-secondary/90">
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
        <section className="rounded-2xl border border-white/15 bg-gradient-to-br from-primary/10 via-white/5 to-secondary/10 p-10 text-center dark:border-white/10 dark:from-slate-900/40 dark:via-slate-900/30 dark:to-slate-900/40 md:p-16">
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

        <GuideInterlinkSection currentGuide="/guias/soporte-empresas-servicio-tecnico" />

        {/* Schema.org structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "Servicio Técnico de Celulares para Empresas en CABA",
              "serviceType": "Reparación y mantenimiento de dispositivos móviles corporativos",
              "areaServed": {
                "@type": "AdministrativeArea",
                "name": "Ciudad Autónoma de Buenos Aires (CABA)"
              },
              "description":
                "Team Celular, en Paraguay 2451 Recoleta y Amenábar 2032 Belgrano (CABA), presta soporte técnico de celulares para empresas desde 5 dispositivos: SLA acordado por escrito, logística puerta a puerta, planes preventivos y diagnóstico y presupuesto por escrito.",
              "provider": {
                "@id": "https://teamcelular.com#localbusiness",
                "location": [
                  {
                    "@type": "Place",
                    "name": "Team Celular Recoleta",
                    "address": {
                      "@type": "PostalAddress",
                      "streetAddress": "Paraguay 2451",
                      "addressLocality": "Recoleta",
                      "addressRegion": "CABA",
                      "addressCountry": "AR"
                    }
                  },
                  {
                    "@type": "Place",
                    "name": "Team Celular Belgrano",
                    "address": {
                      "@type": "PostalAddress",
                      "streetAddress": "Amenábar 2032",
                      "addressLocality": "Belgrano",
                      "addressRegion": "CABA",
                      "addressCountry": "AR"
                    }
                  }
                ]
              },
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
