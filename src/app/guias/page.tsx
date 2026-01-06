import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { 
  FaApple, 
  FaMicrochip, 
  FaBuilding, 
  FaTools,
  FaArrowRight,
  FaBookOpen,
  FaClock,
  FaChartLine,
  FaBatteryFull,
  FaMobileAlt
} from "react-icons/fa";

const ARTICLES = [
  {
    title: "Reparación de iPhone en Buenos Aires",
    description:
      "Proceso detallado para diagnosticar y reparar iPhone con repuestos originales y garantía escrita.",
    href: "/guias/reparacion-iphone-buenos-aires",
    category: "Reparaciones Apple",
    readingTime: "5 min",
    Icon: FaApple,
    datePublished: "2024-01-15",
    keywords: ["reparación iPhone", "Apple", "CABA", "repuestos originales"],
  },
  {
    title: "Microelectrónica y reballing profesional",
    description:
      "Cómo gestionamos reparaciones avanzadas en placas y chips para recuperar equipos complejos.",
    href: "/guias/microelectronica-reballing-caba",
    category: "Laboratorio",
    readingTime: "6 min",
    Icon: FaMicrochip,
    datePublished: "2024-02-20",
    keywords: ["microelectrónica", "reballing", "BGA", "soldadura"],
  },
  {
    title: "Soporte técnico para empresas y gremios",
    description:
      "Beneficios de tercerizar el mantenimiento de dispositivos móviles con SLAs claros.",
    href: "/guias/soporte-empresas-servicio-tecnico",
    category: "Empresas",
    readingTime: "4 min",
    Icon: FaBuilding,
    datePublished: "2024-03-10",
    keywords: ["servicio técnico empresas", "SLA", "soporte corporativo"],
  },
  {
    title: "Mantenimiento preventivo de celulares",
    description:
      "Buenas prácticas para extender la vida útil de smartphones y tablets con asistencia profesional.",
    href: "/guias/mantenimiento-preventivo-celulares",
    category: "Tips de cuidado",
    readingTime: "4 min",
    Icon: FaTools,
    datePublished: "2024-04-05",
    keywords: ["mantenimiento", "preventivo", "cuidado celular", "batería"],
  },
  {
    title: "Cambio de batería de celular",
    description:
      "Guía completa sobre reemplazo de batería: tipos, señales de deterioro, proceso profesional y garantía.",
    href: "/guias/cambio-bateria-celular",
    category: "Reparaciones",
    readingTime: "5 min",
    Icon: FaBatteryFull,
    datePublished: "2024-11-30",
    keywords: ["cambio batería", "batería original", "batería certificada", "garantía"],
  },
  {
    title: "Reparación de pantalla de celular",
    description:
      "Todo sobre cambio de pantalla: displays OLED originales, True Tone, Face ID y tipos de daños.",
    href: "/guias/reparacion-pantalla-celular",
    category: "Reparaciones",
    readingTime: "6 min",
    Icon: FaMobileAlt,
    datePublished: "2024-11-30",
    keywords: ["cambio pantalla", "display OLED", "True Tone", "pantalla original"],
  },
];

export const metadata: Metadata = {
  title: "Guías Técnicas de Reparación de Celulares | Centro de Conocimiento Team Celular",
  description:
    "6 guías profesionales: reparación iPhone, cambio de batería, pantalla, microelectrónica, reballing BGA, soporte corporativo y mantenimiento preventivo. Expertos con +10 años en CABA.",
  keywords: [
    "guías reparación celulares",
    "cambio batería celular",
    "cambio pantalla celular",
    "reparación iPhone Buenos Aires",
    "microelectrónica móviles",
    "mantenimiento preventivo smartphones",
    "soporte técnico empresas",
    "reballing BGA",
  ],
  alternates: {
    canonical: "https://teamcelular.com/guias",
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
    title: "Centro de Conocimiento | 6 Guías Técnicas Team Celular",
    description:
      "Aprende de expertos: reparación iPhone, cambio de batería y pantalla, microelectrónica avanzada y soporte corporativo en Buenos Aires.",
    type: "website",
    url: "https://teamcelular.com/guias",
    locale: "es_AR",
    images: [
      {
        url: "https://teamcelular.com/images/teamcelular.webp",
        width: 1200,
        height: 630,
        alt: "Team Celular - Guías Técnicas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Guías Técnicas de Reparación | Team Celular",
    description: "Aprende de expertos en reparación de celulares en Buenos Aires",
    images: ["https://teamcelular.com/images/teamcelular.webp"],
  },
};

export default function GuidesPage() {
  return (
    <div className="flex w-full justify-center px-4 py-16">
      <div className="w-full max-w-6xl space-y-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <Link href="/" className="hover:text-primary transition">
            Inicio
          </Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white font-semibold">Guías</span>
        </nav>

        {/* Hero Section */}
        <header className="space-y-6 rounded-2xl border border-white/15 bg-white/5 p-10 text-center backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30 md:p-16">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-secondary to-primary shadow-2xl">
            <FaBookOpen className="text-5xl text-white" />
          </div>
          <div className="inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary/90 dark:border-primary/40 dark:bg-primary/15 dark:text-primary/70">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" aria-hidden />
            Centro de Conocimiento
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
            Guías Técnicas de Reparación de Celulares
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-600 dark:text-slate-300">
            Aprende con <strong className="text-primary">Team Celular</strong>: procesos certificados de reparación,
            microelectrónica avanzada y mantenimiento preventivo. Conocimiento profesional basado en más de 10 años
            de experiencia en Buenos Aires.
          </p>
          
          {/* Stats */}
          <div className="grid gap-6 md:grid-cols-3 mt-8">
            <div className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg dark:border-white/15 dark:bg-slate-900/40">
              <div className="flex items-center justify-center mb-3">
                <FaChartLine className="text-3xl text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary">10+</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Años de experiencia</div>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg dark:border-white/15 dark:bg-slate-900/40">
              <div className="flex items-center justify-center mb-3">
                <FaTools className="text-3xl text-secondary" />
              </div>
              <div className="text-3xl font-bold text-secondary">{ARTICLES.length}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Guías disponibles</div>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg dark:border-white/15 dark:bg-slate-900/40">
              <div className="flex items-center justify-center mb-3">
                <FaClock className="text-3xl text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary">24h</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Tiempo de respuesta</div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link
              href="/presupuesto-reparacion"
              className="rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:shadow-xl"
            >
              Solicitar asesoría inmediata
            </Link>
            <Link
              href="/contacto"
              className="rounded-full border-2 border-primary px-8 py-4 text-lg font-semibold text-primary transition hover:bg-primary/10"
            >
              Conversar con un ingeniero
            </Link>
          </div>
        </header>

        {/* Articles Grid */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
              Explora nuestras guías especializadas
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Contenido técnico profesional para usuarios avanzados y empresas
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2">
            {ARTICLES.map((article) => {
              const Icon = article.Icon;
              return (
                <article
                  key={article.href}
                  className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/5 p-8 backdrop-blur-xl transition hover:-translate-y-2 hover:shadow-2xl dark:border-white/10 dark:bg-slate-900/30"
                >
                  <div className="absolute right-6 top-6 h-32 w-32 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                  
                  <div className="relative space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-3xl text-white shadow-lg">
                        <Icon />
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <FaClock className="text-primary" />
                        {article.readingTime}
                      </div>
                    </div>
                    
                    <span className="inline-block rounded-full bg-secondary/20 px-3 py-1 text-xs font-semibold text-secondary">
                      {article.category}
                    </span>
                    
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                      {article.title}
                    </h3>
                    
                    <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                      {article.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 pt-2">
                      {article.keywords.slice(0, 3).map((keyword) => (
                        <span
                          key={keyword}
                          className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs text-primary dark:border-primary/30 dark:bg-primary/10"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <Link
                    href={article.href}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition group-hover:gap-3 group-hover:bg-primary dark:bg-primary dark:group-hover:bg-secondary"
                  >
                    Leer guía completa
                    <FaArrowRight />
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="rounded-2xl border border-white/15 bg-gradient-to-br from-primary/10 via-white/5 to-secondary/10 p-10 text-center backdrop-blur-2xl dark:border-white/10 dark:from-slate-900/40 dark:via-slate-900/30 dark:to-slate-900/40 md:p-16">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">
            ¿Necesitás ayuda técnica especializada?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-700 dark:text-slate-300">
            Nuestro equipo está disponible para consultas, diagnósticos y reparaciones profesionales en CABA y GBA.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contacto"
              className="rounded-full bg-secondary px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-secondary/90"
            >
              Contactar expertos
            </Link>
            <Link
              href="https://wa.me/5491151034595?text=Hola%20Team%20Celular,%20necesito%20asesoría%20técnica"
              className="rounded-full border-2 border-secondary px-8 py-4 text-lg font-semibold text-secondary transition hover:bg-secondary/10"
            >
              WhatsApp directo
            </Link>
          </div>
        </section>

        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "Guías Técnicas de Reparación de Celulares",
              "description": "Centro de conocimiento con guías profesionales sobre reparación de iPhone, microelectrónica, reballing BGA y soporte corporativo.",
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
              "hasPart": ARTICLES.map((article) => ({
                "@type": "Article",
                "headline": article.title,
                "description": article.description,
                "url": `https://teamcelular.com${article.href}`,
                "datePublished": article.datePublished,
                "author": {
                  "@type": "Organization",
                  "name": "Team Celular",
                },
                "keywords": article.keywords.join(", "),
              })),
            }),
          }}
        />
      </div>
    </div>
  );
}
