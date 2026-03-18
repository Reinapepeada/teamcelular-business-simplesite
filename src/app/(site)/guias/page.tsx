import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import {
  FaApple,
  FaArrowRight,
  FaBatteryFull,
  FaBookOpen,
  FaBuilding,
  FaChartLine,
  FaClock,
  FaMicrochip,
  FaMobileAlt,
  FaTools,
} from "react-icons/fa";
import { SiSamsung, SiXiaomi } from "react-icons/si";

const ARTICLES = [
  {
    title: "Reparacion de iPhone en Buenos Aires",
    description:
      "Service tecnico premium para iPhone con diagnostico claro, repuestos certificados y garantia escrita.",
    href: "/guias/reparacion-iphone-buenos-aires",
    category: "Landing por marca",
    readingTime: "6 min",
    Icon: FaApple,
    datePublished: "2024-01-15",
    keywords: ["reparacion iPhone", "service Apple", "CABA", "true tone"],
  },
  {
    title: "Reparacion de Samsung Galaxy en Buenos Aires",
    description:
      "Guia completa para Galaxy S, A y Z Fold: pantalla AMOLED, bateria, puerto USB-C y placa logica.",
    href: "/guias/reparacion-samsung-buenos-aires",
    category: "Landing por marca",
    readingTime: "6 min",
    Icon: SiSamsung,
    datePublished: "2026-03-12",
    keywords: ["reparacion Samsung", "Galaxy S", "Galaxy A", "service Samsung"],
  },
  {
    title: "Reparacion de Xiaomi, Redmi y POCO",
    description:
      "Diagnostico para equipos Xiaomi con foco en pantalla, bateria, carga rapida y microelectronica.",
    href: "/guias/reparacion-xiaomi-buenos-aires",
    category: "Landing por marca",
    readingTime: "6 min",
    Icon: SiXiaomi,
    datePublished: "2026-03-12",
    keywords: ["reparacion Xiaomi", "reparacion Redmi", "service POCO", "carga rapida"],
  },
  {
    title: "Microelectronica y reballing profesional",
    description:
      "Como abordamos reparaciones avanzadas de placa y chips para recuperar equipos complejos.",
    href: "/guias/microelectronica-reballing-caba",
    category: "Laboratorio",
    readingTime: "6 min",
    Icon: FaMicrochip,
    datePublished: "2024-02-20",
    keywords: ["microelectronica", "reballing", "BGA", "placa logica"],
  },
  {
    title: "Soporte tecnico para empresas y gremios",
    description:
      "Beneficios de tercerizar mantenimiento de dispositivos moviles con SLAs y trazabilidad.",
    href: "/guias/soporte-empresas-servicio-tecnico",
    category: "Empresas",
    readingTime: "4 min",
    Icon: FaBuilding,
    datePublished: "2024-03-10",
    keywords: ["soporte tecnico empresas", "SLA", "servicio corporativo"],
  },
  {
    title: "Mantenimiento preventivo de celulares",
    description:
      "Buenas practicas para extender vida util de smartphones y reducir fallas recurrentes.",
    href: "/guias/mantenimiento-preventivo-celulares",
    category: "Cuidado",
    readingTime: "4 min",
    Icon: FaTools,
    datePublished: "2024-04-05",
    keywords: ["mantenimiento celular", "preventivo", "vida util"],
  },
  {
    title: "Cambio de bateria de celular",
    description:
      "Guia sobre deterioro de bateria, criterios de reemplazo y ventajas de piezas certificadas.",
    href: "/guias/cambio-bateria-celular",
    category: "Reparaciones",
    readingTime: "5 min",
    Icon: FaBatteryFull,
    datePublished: "2024-11-30",
    keywords: ["cambio bateria", "bateria certificada", "autonomia celular"],
  },
  {
    title: "Reparacion de pantalla de celular",
    description:
      "Todo sobre cambio de pantalla, tipos de panel, calidad de repuestos y control post reparacion.",
    href: "/guias/reparacion-pantalla-celular",
    category: "Reparaciones",
    readingTime: "6 min",
    Icon: FaMobileAlt,
    datePublished: "2024-11-30",
    keywords: ["cambio pantalla", "display OLED", "pantalla celular"],
  },
];

const articleVisuals: Record<string, { cover: string }> = {
  "/guias/reparacion-iphone-buenos-aires": {
    cover: "/images/guia_iphone.webp",
  },
  "/guias/reparacion-samsung-buenos-aires": {
    cover: "/images/guia_samsung.webp",
  },
  "/guias/reparacion-xiaomi-buenos-aires": {
    cover: "/images/guia_xiaomi.webp",
  },
  "/guias/microelectronica-reballing-caba": {
    cover: "/images/guia_microelectronica.webp",
  },
  "/guias/soporte-empresas-servicio-tecnico": {
    cover: "/images/guia_corporativo.webp",
  },
  "/guias/mantenimiento-preventivo-celulares": {
    cover: "/images/guia_mantenimiento.webp",
  },
  "/guias/cambio-bateria-celular": {
    cover: "/images/guia_cambio_bateria.webp",
  },
  "/guias/reparacion-pantalla-celular": {
    cover: "/images/guia_cambio_modulo.webp",
  },
};

export const metadata: Metadata = {
  title: "Guias Tecnicas de Reparacion de Celulares | Team Celular",
  description:
    "8 guias tecnicas con enfoque comercial y real: iPhone, Samsung, Xiaomi, bateria, pantalla, microelectronica y soporte para empresas en CABA.",
  keywords: [
    "guias reparacion celulares",
    "reparacion iPhone buenos aires",
    "reparacion Samsung galaxy",
    "reparacion Xiaomi redmi poco",
    "cambio bateria celular",
    "cambio pantalla celular",
    "microelectronica moviles",
    "soporte tecnico empresas",
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
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Centro de Guias Tecnicas | Team Celular",
    description:
      "Aprende y cotiza reparaciones reales para iPhone, Samsung y Xiaomi con enfoque tecnico y comercial en CABA.",
    type: "website",
    url: "https://teamcelular.com/guias",
    locale: "es_AR",
    images: [
      {
        url: "https://teamcelular.com/images/banner_guias.webp",
        width: 1200,
        height: 630,
        alt: "Centro de guias tecnicas Team Celular",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Guias de Reparacion de Celulares | Team Celular",
    description:
      "Contenido tecnico para usuarios y empresas: iPhone, Samsung, Xiaomi y microelectronica.",
    images: ["https://teamcelular.com/images/banner_guias.webp"],
  },
};

export default function GuidesPage() {
  return (
    <div className="flex w-full justify-center px-4 py-16">
      <div className="w-full max-w-6xl space-y-12">
        <BreadcrumbJsonLd
          items={[
            { name: "Inicio", url: "https://teamcelular.com/" },
            { name: "Guias", url: "https://teamcelular.com/guias" },
          ]}
        />

        <nav className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <Link href="/" className="transition hover:text-primary">
            Inicio
          </Link>
          <span>/</span>
          <span className="font-semibold text-slate-900 dark:text-slate-100">
            Guias
          </span>
        </nav>

        <header className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 shadow-xl dark:border-white/10 dark:bg-slate-900/90">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.08),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.08),transparent_30%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.1),transparent_30%)]"
          />
          <div className="relative space-y-8 p-8 text-left md:p-12">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    <FaBookOpen className="text-sm" />
                    Guias Team Celular
                  </span>
                  <span className="rounded-full border border-slate-300/80 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-700 dark:border-white/15 dark:bg-slate-950/70 dark:text-slate-200">
                    Recoleta - CABA
                  </span>
                </div>
                <div className="w-fit rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 dark:border-white/10 dark:bg-slate-950/60 dark:text-slate-300">
                  Contenido tecnico con criterio comercial real
                </div>
              </div>

              <div className="w-full max-w-[260px] rounded-3xl border border-slate-200/80 bg-white p-5 shadow-lg dark:border-white/10 dark:bg-slate-950/70">
                <Image
                  src="/images/brand/imagotipo-light.png"
                  alt="Team Celular"
                  width={280}
                  height={88}
                  priority
                  sizes="280px"
                  className="h-auto w-full dark:hidden"
                />
                <Image
                  src="/images/brand/imagotipo-dark.png"
                  alt="Team Celular"
                  width={280}
                  height={88}
                  priority
                  sizes="280px"
                  className="hidden h-auto w-full dark:block"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100 md:text-5xl">
                Guias tecnicas hechas desde el laboratorio.
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                Reunimos procesos, fallas frecuentes y criterios de repuesto
                para iPhone, Samsung, Xiaomi, microelectronica y soporte para
                empresas con una mirada clara de taller real.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-5 dark:border-white/10 dark:bg-slate-950/55">
                <div className="mb-3 flex items-center gap-3">
                  <FaChartLine className="text-2xl text-primary" />
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    Trayectoria
                  </span>
                </div>
                <div className="text-3xl font-black text-slate-900 dark:text-slate-100">
                  10+
                </div>
                <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Anos reparando equipos reales
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-5 dark:border-white/10 dark:bg-slate-950/55">
                <div className="mb-3 flex items-center gap-3">
                  <FaTools className="text-2xl text-secondary" />
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    Cobertura
                  </span>
                </div>
                <div className="text-3xl font-black text-slate-900 dark:text-slate-100">
                  {ARTICLES.length}
                </div>
                <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Guias activas por marca y falla
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-5 dark:border-white/10 dark:bg-slate-950/55">
                <div className="mb-3 flex items-center gap-3">
                  <FaClock className="text-2xl text-primary" />
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    Respuesta
                  </span>
                </div>
                <div className="text-3xl font-black text-slate-900 dark:text-slate-100">
                  24 h
                </div>
                <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Diagnostico y criterio tecnico
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/presupuesto-reparacion"
                className="rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-primary/90 hover:shadow-xl"
              >
                Solicitar asesoria inmediata
              </Link>
              <Link
                href="/contacto"
                className="rounded-full border-2 border-primary px-8 py-4 text-base font-semibold text-primary transition hover:bg-primary/10"
              >
                Hablar con un tecnico
              </Link>
            </div>
          </div>
        </header>

        <section className="space-y-8">
          <div className="text-center">
            <h2 className="mb-3 text-3xl font-bold text-slate-900 dark:text-slate-100">
              Explora nuestras guias especializadas
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Contenido tecnico y util para usuarios y empresas.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {ARTICLES.map((article) => {
              const Icon = article.Icon;
              const visual = articleVisuals[article.href] ?? {
                cover: "/images/fondofooter.webp",
              };
              const updatedDate = new Intl.DateTimeFormat("es-AR", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }).format(new Date(article.datePublished));

              return (
                <article
                  key={article.href}
                  className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white/85 p-4 shadow-lg transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/85 md:p-5"
                >
                  <div className="relative mb-5 h-48 overflow-hidden rounded-xl border border-slate-200/80 bg-slate-100 dark:border-white/10 dark:bg-slate-950/40">
                    <Image
                      src={visual.cover}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.02]"
                    />
                    <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-white/92 px-3 py-1 text-xs font-semibold text-slate-900 shadow-sm dark:bg-slate-950/85 dark:text-slate-100">
                      <FaClock className="text-[11px]" />
                      {article.readingTime}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-2xl text-white dark:bg-white dark:text-slate-900">
                        <Icon />
                      </div>
                      <time
                        dateTime={article.datePublished}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 dark:border-white/10 dark:bg-slate-950/60 dark:text-slate-300"
                      >
                        {updatedDate}
                      </time>
                    </div>

                    <span className="inline-block rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary dark:border-primary/20 dark:bg-primary/10">
                      {article.category}
                    </span>

                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
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
                    Leer guia completa
                    <FaArrowRight />
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-white/15 bg-gradient-to-br from-primary/10 via-white/5 to-secondary/10 p-10 text-center backdrop-blur-2xl dark:border-white/10 dark:from-slate-900/40 dark:via-slate-900/30 dark:to-slate-900/40 md:p-16">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-slate-100">
            Necesitas un diagnostico profesional?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-700 dark:text-slate-300">
            Nuestro equipo responde consultas y cotizaciones para iPhone,
            Samsung y Xiaomi con enfoque tecnico y comercial.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contacto"
              className="rounded-full bg-secondary px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-secondary/90"
            >
              Contactar expertos
            </Link>
            <Link
              href="https://wa.me/5491151034595?text=Hola%20Team%20Celular,%20quiero%20asesoria%20tecnica%20para%20reparar%20mi%20celular"
              className="rounded-full border-2 border-secondary px-8 py-4 text-lg font-semibold text-secondary transition hover:bg-secondary/10"
            >
              WhatsApp directo
            </Link>
          </div>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: "Guias tecnicas de reparacion de celulares",
              description:
                "Centro de contenido de Team Celular con guias de reparacion por marca, microelectronica y soporte corporativo.",
              image: "https://teamcelular.com/images/banner_guias.webp",
              provider: { "@id": "https://teamcelular.com#localbusiness" },
              hasPart: ARTICLES.map((article) => ({
                "@type": "Article",
                headline: article.title,
                description: article.description,
                url: `https://teamcelular.com${article.href}`,
                datePublished: article.datePublished,
                author: {
                  "@type": "Organization",
                  name: "Team Celular",
                },
                keywords: article.keywords.join(", "),
              })),
            }),
          }}
        />
      </div>
    </div>
  );
}

