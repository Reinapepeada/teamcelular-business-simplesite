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

const articleVisuals: Record<string, { cover: string; tone: string }> = {
  "/guias/reparacion-iphone-buenos-aires": {
    cover: "/images/celuPorDentro.webp",
    tone: "from-sky-500/55 via-sky-500/15 to-transparent",
  },
  "/guias/reparacion-samsung-buenos-aires": {
    cover:
      "/images/handsome-young-man-smiling-while-repairing-old-smartphone-male-technician-using-screwdriver-fix-brok.webp",
    tone: "from-blue-600/55 via-blue-500/15 to-transparent",
  },
  "/guias/reparacion-xiaomi-buenos-aires": {
    cover: "/images/dispositivoshdpro.webp",
    tone: "from-emerald-600/55 via-emerald-500/15 to-transparent",
  },
  "/guias/microelectronica-reballing-caba": {
    cover: "/images/teamcelular.webp",
    tone: "from-violet-500/55 via-violet-500/15 to-transparent",
  },
  "/guias/soporte-empresas-servicio-tecnico": {
    cover: "/images/empresaFamiliar.webp",
    tone: "from-emerald-500/55 via-emerald-500/15 to-transparent",
  },
  "/guias/mantenimiento-preventivo-celulares": {
    cover: "/images/equipoCall.webp",
    tone: "from-cyan-500/55 via-cyan-500/15 to-transparent",
  },
  "/guias/cambio-bateria-celular": {
    cover: "/images/cargadores.webp",
    tone: "from-green-500/60 via-green-500/15 to-transparent",
  },
  "/guias/reparacion-pantalla-celular": {
    cover: "/videos/pexels-mart-production-7709089.jpg",
    tone: "from-indigo-600/55 via-indigo-500/15 to-transparent",
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
        url: "https://teamcelular.com/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Guias tecnicas Team Celular",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Guias de Reparacion de Celulares | Team Celular",
    description:
      "Contenido tecnico para usuarios y empresas: iPhone, Samsung, Xiaomi y microelectronica.",
    images: ["https://teamcelular.com/opengraph-image.png"],
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
          <span className="font-semibold text-slate-900 dark:text-white">
            Guias
          </span>
        </nav>

        <header className="space-y-6 rounded-2xl border border-white/15 bg-white/5 p-10 text-center backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30 md:p-16">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-secondary to-primary shadow-2xl">
            <FaBookOpen className="text-5xl text-white" />
          </div>
          <div className="inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary/90 dark:border-primary/40 dark:bg-primary/15 dark:text-primary/70">
            <span
              className="h-2 w-2 animate-pulse rounded-full bg-primary"
              aria-hidden
            />
            Hub de contenido tecnico y comercial
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
            Guias Tecnicas de Reparacion de Celulares
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-600 dark:text-slate-300">
            Guias practicas de reparacion por marca, fallas frecuentes y
            criterios tecnicos para tomar decisiones con informacion real antes
            de cotizar.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg dark:border-white/15 dark:bg-slate-900/40">
              <div className="mb-3 flex items-center justify-center">
                <FaChartLine className="text-3xl text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary">10+</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Anos de experiencia
              </div>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg dark:border-white/15 dark:bg-slate-900/40">
              <div className="mb-3 flex items-center justify-center">
                <FaTools className="text-3xl text-secondary" />
              </div>
              <div className="text-3xl font-bold text-secondary">
                {ARTICLES.length}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Guias disponibles
              </div>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg dark:border-white/15 dark:bg-slate-900/40">
              <div className="mb-3 flex items-center justify-center">
                <FaClock className="text-3xl text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary">24 h</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Respuesta de diagnostico
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/presupuesto-reparacion"
              className="rounded-full bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-primary/90 hover:shadow-xl"
            >
              Solicitar asesoria inmediata
            </Link>
            <Link
              href="/contacto"
              className="rounded-full border-2 border-primary px-8 py-4 text-lg font-semibold text-primary transition hover:bg-primary/10"
            >
              Hablar con un tecnico
            </Link>
          </div>
        </header>

        <section className="space-y-8">
          <div className="text-center">
            <h2 className="mb-3 text-3xl font-bold text-slate-900 dark:text-white">
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
                tone: "from-primary/60 via-primary/20 to-transparent",
              };
              const updatedDate = new Intl.DateTimeFormat("es-AR", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }).format(new Date(article.datePublished));

              return (
                <article
                  key={article.href}
                  className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-2 hover:shadow-2xl dark:border-white/10 dark:bg-slate-900/30"
                >
                  <div
                    aria-hidden
                    className="absolute right-6 top-6 h-32 w-32 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl opacity-0 transition-opacity group-hover:opacity-100"
                  />

                  <div className="relative -mx-6 -mt-6 mb-6 h-44 overflow-hidden border-b border-white/15">
                    <Image
                      src={visual.cover}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${visual.tone}`} />
                    <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/45 to-transparent" />
                    <div className="absolute bottom-3 left-4 inline-flex items-center gap-2 rounded-full bg-black/45 px-3 py-1 text-xs font-semibold text-white">
                      <FaClock className="text-[11px]" />
                      {article.readingTime}
                    </div>
                  </div>

                  <div className="relative space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-3xl text-white shadow-lg">
                        <Icon />
                      </div>
                      <time
                        dateTime={article.datePublished}
                        className="rounded-full border border-slate-300/80 bg-white/70 px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-600/70 dark:bg-slate-900/70 dark:text-slate-300"
                      >
                        {updatedDate}
                      </time>
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
                    Leer guia completa
                    <FaArrowRight />
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-white/15 bg-gradient-to-br from-primary/10 via-white/5 to-secondary/10 p-10 text-center backdrop-blur-2xl dark:border-white/10 dark:from-slate-900/40 dark:via-slate-900/30 dark:to-slate-900/40 md:p-16">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">
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
