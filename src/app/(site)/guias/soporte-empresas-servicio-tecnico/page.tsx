import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import ArticleSchema from "@/components/seo/ArticleSchema";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import GuideInterlinkSection from "@/components/seo/GuideInterlinkSection";
import { WARRANTY_SCOPE_MESSAGE } from "@/lib/copyStandards";
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
  title: "Servicio TÃ©cnico de Celulares para Empresas en CABA | Team Celular",
  description:
    "Soporte tÃ©cnico de celulares para empresas en CABA â€” Team Celular. SLA, logÃ­stica puerta a puerta y planes desde 5 dispositivos. GarantÃ­a escrita 90 dÃ­as. Recoleta y Belgrano.",
  keywords: [
    "servicio tÃ©cnico empresas Buenos Aires",
    "reparaciÃ³n celulares corporativos",
    "SLA dispositivos mÃ³viles",
    "soporte tÃ©cnico gremios CABA",
    "mantenimiento preventivo empresas",
    "service desk mÃ³viles",
    "reparaciÃ³n celulares empresas",
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
    title: "Servicio TÃ©cnico de Celulares para Empresas en CABA | Team Celular",
    description:
      "Team Celular, Paraguay 2451 Recoleta y Amenábar 2032 Belgrano, presta soporte tÃ©cnico de celulares para empresas. SLA, logÃ­stica puerta a puerta, desde 5 dispositivos. GarantÃ­a escrita 90 dÃ­as.",
    type: "article",
    url: "https://teamcelular.com/guias/soporte-empresas-servicio-tecnico",
    locale: "es_AR",
    images: [
      {
        url: "https://teamcelular.com/images/guia_corporativo.webp",
        width: 1200,
        height: 630,
        alt: "Servicio TÃ©cnico Corporativo - Team Celular",
      },
    ],
    publishedTime: "2024-03-10T00:00:00Z",
    modifiedTime: "2026-06-09T00:00:00Z",
    section: "GuÃ­as TÃ©cnicas",
  },
  twitter: {
    card: "summary_large_image",
    title: "Servicio TÃ©cnico de Celulares para Empresas en CABA | Team Celular",
    description: "Team Celular, Recoleta y Belgrano CABA. Soporte de celulares para empresas: SLA, logÃ­stica puerta a puerta y garantÃ­a escrita 90 dÃ­as.",
    images: ["https://teamcelular.com/images/guia_corporativo.webp"],
  },
};

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";
const PAGE_URL = `${SITE_URL}/guias/soporte-empresas-servicio-tecnico`;

const benefits = [
  {
    title: "DiagnÃ³stico tÃ©cnico en menos de 24 horas",
    detail:
      "EvaluaciÃ³n profesional con presupuesto digital detallado, trazabilidad completa de cada equipo mediante sistema de tickets y fotografÃ­a del estado inicial. Identificamos fallas de hardware, software y daÃ±o por lÃ­quidos con equipamiento de diagnÃ³stico especializado.",
    Icon: FaClock,
  },
  {
    title: "LogÃ­stica corporativa puerta a puerta",
    detail:
      "Coordinamos retiros y entregas programadas dentro de CABA. Disponibilidad de equipos de reemplazo (loaner) para garantizar continuidad operativa durante reparaciones complejas.",
    Icon: FaTruck,
  },
  {
    title: "Mesa de ayuda tÃ©cnica multicanal",
    detail:
      "Soporte vÃ­a WhatsApp Business, email corporativo y lÃ­nea telefÃ³nica directa con seguimiento proactivo de incidencias. Reportes de estado en tiempo real y notificaciones automÃ¡ticas por cada etapa del proceso de reparaciÃ³n.",
    Icon: FaHeadset,
  },
  {
    title: "Planes de mantenimiento preventivo",
    detail:
      "Inspecciones programadas, limpieza de conectores, cambio de baterÃ­a preventivo y actualizaciÃ³n de software para extender la vida Ãºtil de tu flota de dispositivos. ReducciÃ³n de hasta 40% en costos de reparaciÃ³n mediante mantenimiento planificado.",
    Icon: FaTools,
  },
];

const industries = [
  {
    sector: "LogÃ­stica y delivery",
    description:
      "Empresas de reparto, couriers y flotas comerciales que dependen de dispositivos mÃ³viles para coordinaciÃ³n en tiempo real.",
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
      "Operaciones de atenciÃ³n al cliente con equipos mÃ³viles para agentes remotos o sistemas de telefonÃ­a empresarial.",
    Icon: FaHeadset,
  },
  {
    sector: "Startups y equipos remotos",
    description:
      "Empresas tecnolÃ³gicas con work-from-home que proveen dispositivos corporativos a colaboradores distribuidos geogrÃ¡ficamente.",
    Icon: FaLaptopCode,
  },
  {
    sector: "Retail y comercio",
    description:
      "Cadenas de locales comerciales, vendedores de campo y personal de piso que utiliza dispositivos mÃ³viles para cobros y gestiÃ³n de inventario.",
    Icon: FaStore,
  },
];

const slaFeatures = [
  {
    title: "Tiempo de respuesta garantizado",
    description:
      "SLA configurable segÃºn criticidad: 4 horas para incidencias crÃ­ticas, 24 horas para reparaciones estÃ¡ndar, 72 horas para microelectrÃ³nica avanzada.",
    Icon: FaClock,
  },
  {
    title: "Garantia escrita corporativa",
    description:
      `${WARRANTY_SCOPE_MESSAGE} En planes anuales, definimos cobertura y alcance en el SLA firmado.`,
    Icon: FaShieldAlt,
  },
  {
    title: "Repuestos originales certificados",
    description:
      "Stock permanente de pantallas, baterÃ­as y componentes originales o de calidad AAA para las marcas mÃ¡s utilizadas en entornos corporativos.",
    Icon: FaCheckCircle,
  },
];

const faqBusiness = [
  {
    question: "Â¿CuÃ¡l es el volumen mÃ­nimo de dispositivos para planes corporativos?",
    answer:
      "Trabajamos con organizaciones desde 5 dispositivos en adelante. Para flotas menores a 10 equipos, recomendamos nuestro servicio de reparaciÃ³n estÃ¡ndar con descuento por volumen. Los planes corporativos completos con SLA y logÃ­stica incluida estÃ¡n diseÃ±ados para organizaciones con 10 o mÃ¡s dispositivos.",
  },
  {
    question: "Â¿Ofrecen servicio on-site o solo en taller?",
    answer:
      "Nuestro servicio se realiza en los talleres de Recoleta (Paraguay 2451) y Belgrano (Amenábar 2032), donde contamos con equipamiento profesional: microscopio, estaciÃ³n de reballing y cÃ¡mara de diagnÃ³stico. Para diagnÃ³sticos iniciales o mantenimientos preventivos programados coordinamos visitas on-site en CABA sin cargo adicional en planes anuales.",
  },
  {
    question: "Â¿QuÃ© marcas y modelos estÃ¡n incluidos en el soporte corporativo?",
    answer:
      "Reparamos todas las marcas comerciales: iPhone, Samsung Galaxy, Motorola, Xiaomi, OnePlus, Huawei, LG y otras. TambiÃ©n trabajamos con dispositivos menos comunes si nos notificÃ¡s con anticipaciÃ³n para asegurar disponibilidad de repuestos. Consultanos por modelos especÃ­ficos o equipos ruggedizados para industria.",
  },
  {
    question: "Â¿CÃ³mo facturan los servicios corporativos?",
    answer:
      "Emitimos factura A o B segÃºn tu requerimiento. PodÃ©s optar por facturaciÃ³n mensual consolidada de todos los servicios o facturaciÃ³n individual por reparaciÃ³n. Aceptamos transferencia bancaria, cheques y pagos con tarjeta corporativa. Planes anuales con opciÃ³n de pago trimestral o semestral.",
  },
  {
    question: "Â¿QuÃ© sucede con los datos sensibles durante la reparaciÃ³n?",
    answer:
      "Firmamos acuerdos de confidencialidad (NDA) sin cargo adicional. Recomendamos realizar backup y borrado remoto antes del envÃ­o. Si la reparaciÃ³n no requiere acceso al sistema operativo (pantalla, baterÃ­a, carcasa), el dispositivo permanece bloqueado todo el tiempo. Para reparaciones de placa base, solicitamos desbloqueo temporal con credenciales provisorias.",
  },
];

export default function BusinessSupportGuide() {
  return (
    <div className="flex w-full justify-center px-4 py-16">
      <ArticleSchema
        title="Servicio TÃ©cnico de Celulares para Empresas y Organizaciones | Team Celular"
        description="Soporte tÃ©cnico corporativo especializado en reparaciÃ³n de dispositivos mÃ³viles con SLA garantizado, logÃ­stica incluida y planes preventivos en CABA."
        publishedTime="2024-03-10T00:00:00Z"
        modifiedTime="2025-12-11T00:00:00Z"
        authorName="Team Celular"
        image="https://teamcelular.com/images/guia_corporativo.webp"
        url={PAGE_URL}
      />
      <article className="w-full max-w-6xl space-y-16">
        <BreadcrumbJsonLd
          items={[
            { name: "Inicio", url: `${SITE_URL}/` },
            { name: "GuÃ­as", url: `${SITE_URL}/guias` },
            { name: "Soporte empresas", url: PAGE_URL },
          ]}
        />
        {/* Hero Section */}
        <header className="space-y-6 rounded-2xl border border-white/15 bg-white/5 p-10 text-center backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30 md:p-16">
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/70 bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Soporte corporativo
            </span>
            <span className="rounded-full border border-emerald-700/80 bg-emerald-700 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white">
              Recoleta y Belgrano Â· CABA
            </span>
          </div>
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-secondary to-primary shadow-2xl">
            <FaBuilding className="text-5xl text-white" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
            Servicio TÃ©cnico de Celulares para Empresas en CABA
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-600 dark:text-slate-300">
            Team Celular, en <strong>Paraguay 2451 Recoleta</strong> y <strong>Amenábar 2032 Belgrano</strong> (CABA), presta soporte tÃ©cnico de celulares para empresas con flota desde 5 dispositivos. DiagnÃ³stico en menos de 24 horas, SLA configurable (4 h crÃ­tico Â· 24 h estÃ¡ndar), logÃ­stica puerta a puerta en CABA y garantÃ­a escrita de <strong>90 dÃ­as</strong> sobre trabajo y repuesto. 10 aÃ±os de experiencia en reparaciÃ³n avanzada.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contacto"
              className="rounded-full bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-primary/90 hover:shadow-xl"
            >
              Solicitar reuniÃ³n ejecutiva
            </Link>
            <Link
              href="/presupuesto-reparacion"
              className="rounded-full border-2 border-primary px-8 py-4 text-lg font-semibold text-primary transition hover:bg-primary/10"
            >
              Pedir propuesta de SLA
            </Link>
          </div>
        </header>

        {/* IntroducciÃ³n */}
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
              Â¿Por quÃ© las empresas eligen Team Celular?
            </h2>
            <div className="space-y-4 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
            <p>
              Un celular fuera de servicio significa un colaborador sin herramientas, producciÃ³n
              detenida y costos que no aparecen en ningÃºn presupuesto hasta que el problema ya ocurriÃ³.
              En flotas de 5 o mÃ¡s equipos, cada hora sin respuesta tÃ©cnica multiplica ese impacto.
            </p>
            <p>
              <strong className="text-primary">Team Celular</strong>, con talleres en Recoleta (Paraguay 2451)
              y Belgrano (Amenábar 2032), resuelve el diagnÃ³stico en menos de 24 horas y trabaja con
              SLA firmado para que los tiempos de reparaciÃ³n sean predecibles, no una promesa verbal.
              Llevamos 10 aÃ±os reparando dispositivos mÃ³viles con microscopio, instrumental de
              laboratorio y garantÃ­a escrita.
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
              Â¿QuÃ© incluye el servicio tÃ©cnico corporativo?
            </h2>
            <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
              DiseÃ±amos cada plan segÃºn las necesidades operativas de tu organizaciÃ³n
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
              Â¿QuÃ© garantiza el SLA de Team Celular?
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
              Â¿A quÃ© sectores atendemos?
            </h2>
            <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
              Adaptamos planes segÃºn el tipo de operaciÃ³n y volumen de dispositivos
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
                  Â¿QuÃ© documentaciÃ³n entregamos por cada reparaciÃ³n?
                </h2>
              </div>
              <div className="space-y-4 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
            <p>
              Documentamos cada intervenciÃ³n tÃ©cnica con{" "}
              <strong>fotografÃ­as de alta resoluciÃ³n</strong>, registro de nÃºmero de serie (IMEI),
              descripciÃ³n detallada de la falla y componentes reemplazados. Toda reparaciÃ³n incluye
              garantÃ­a escrita con firma y sello del tÃ©cnico responsable.
            </p>
            <p>
              Generamos <strong className="text-primary">reportes mensuales consolidados</strong>{" "}
              para:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>
                <strong>AuditorÃ­as internas:</strong> Control de costos, tiempos de respuesta y
                KPIs de disponibilidad de equipos
              </li>
              <li>
                <strong>CompaÃ±Ã­as de seguros:</strong> DocumentaciÃ³n probatoria para reclamos por
                daÃ±os accidentales o robo
              </li>
              <li>
                <strong>Proveedores de telefonÃ­a:</strong> Trazabilidad de reparaciones para
                equipos en garantÃ­a o planes corporativos
              </li>
              <li>
                <strong>Ãreas de IT y compras:</strong> HistÃ³rico de intervenciones, costo total de
                propiedad (TCO) y planificaciÃ³n de renovaciÃ³n de flota
              </li>
            </ul>
            <p>
              PodÃ©s combinar nuestros servicios de{" "}
              <Link
              href="/guias/microelectronica-reballing-caba"
              className="font-semibold text-primary underline decoration-primary/30 hover:decoration-primary"
            >
              microelectrÃ³nica avanzada y reballing
            </Link>{" "}
            con soporte on-site, capacitaciones tÃ©cnicas para tu equipo de IT y consultorÃ­as para
            optimizaciÃ³n de procesos de mantenimiento.
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
              Respondemos las consultas mÃ¡s comunes de organizaciones
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
            Â¿Listo para profesionalizar el soporte tÃ©cnico de tu empresa?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-700 dark:text-slate-300">
            Coordinamos una reuniÃ³n ejecutiva sin cargo para analizar tus necesidades, diseÃ±ar un
            plan a medida y entregarte una propuesta comercial detallada con SLA, costos y tiempos
            de implementaciÃ³n.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contacto"
              className="rounded-full bg-secondary px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-secondary/90"
            >
              Agendar reuniÃ³n ejecutiva
            </Link>
            <Link
              href="https://wa.me/5491151034595?text=Hola%20Team%20Celular,%20necesito%20informaciÃ³n%20sobre%20planes%20corporativos"
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
              "name": "Servicio TÃ©cnico de Celulares para Empresas en CABA",
              "serviceType": "ReparaciÃ³n y mantenimiento de dispositivos mÃ³viles corporativos",
              "areaServed": {
                "@type": "AdministrativeArea",
                "name": "Ciudad AutÃ³noma de Buenos Aires (CABA)"
              },
              "description":
                "Team Celular, en Paraguay 2451 Recoleta y Amenábar 2032 Belgrano (CABA), presta soporte tÃ©cnico de celulares para empresas desde 5 dispositivos: SLA garantizado, logÃ­stica puerta a puerta, planes preventivos y diagnÃ³stico en menos de 24 horas.",
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
