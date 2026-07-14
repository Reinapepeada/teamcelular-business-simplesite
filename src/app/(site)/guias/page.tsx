import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import TrackedCtaLink from "@/components/cro/TrackedCtaLink";
import { buildWebsiteMetadata, getSiteUrl } from "@/lib/seoMetadata";
import { formatArgentinaDate } from "@/lib/date";
import { BRAND_GUIDE_LIST } from "./brandGuideConfigs";
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

const SITE_URL = getSiteUrl();
const PAGE_URL = `${SITE_URL}/guias`;

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
    title: "Reparación de Motorola en Buenos Aires",
    description:
      "Guía para Moto G, Edge y E: pantalla, batería, pin de carga y placa con diagnóstico el mismo día y garantía escrita 90 días.",
    href: "/guias/reparacion-motorola-buenos-aires",
    category: "Landing por marca",
    readingTime: "6 min",
    Icon: FaMobileAlt,
    datePublished: "2026-05-08",
    keywords: ["reparacion Motorola", "Moto G Buenos Aires", "service Motorola CABA"],
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
  {
    title: "Pin de carga suelto: causas y solucion",
    description:
      "Aprende a diferenciar falso contacto, desgaste de conector o falla de placa para reparar con criterio.",
    href: "/guias/pin-de-carga-suelto-solucion",
    category: "Fallas frecuentes",
    readingTime: "5 min",
    Icon: FaTools,
    datePublished: "2026-04-16",
    keywords: ["pin de carga suelto", "celular no carga", "puerto USB"],
  },
  {
    title: "Celular mojado: que hacer en las primeras 2 horas",
    description:
      "Protocolo urgente para reducir dano por liquidos y mejorar chances de recuperacion tecnica.",
    href: "/guias/celular-mojado-que-hacer",
    category: "Emergencia",
    readingTime: "5 min",
    Icon: FaBookOpen,
    datePublished: "2026-04-16",
    keywords: ["celular mojado", "que hacer", "reparacion por agua"],
  },
  {
    title: "Face ID o Touch ID no funciona",
    description:
      "Checklist tecnico para identificar si la falla biometrica viene de sensor, flex o placa.",
    href: "/guias/face-id-touch-id-no-funciona",
    category: "Diagnostico avanzado",
    readingTime: "6 min",
    Icon: FaApple,
    datePublished: "2026-04-16",
    keywords: ["face id no funciona", "touch id", "reparacion iPhone"],
  },
  {
    title: "Pantalla con lineas: causas y reparacion",
    description:
      "Como decidir entre cambio de display, ajuste de flex o revision de placa sin gastar de mas.",
    href: "/guias/pantalla-con-lineas-causas-reparacion",
    category: "Fallas frecuentes",
    readingTime: "5 min",
    Icon: FaMobileAlt,
    datePublished: "2026-04-16",
    keywords: ["pantalla con lineas", "display con rayas", "reparacion pantalla"],
  },
  ...BRAND_GUIDE_LIST.map((item) => ({
    title: `Reparacion de ${item.brand} en Buenos Aires`,
    description:
      `Guia practica para ${item.brand}: fallas frecuentes, diagnostico tecnico y siguiente paso recomendado en CABA.`,
    href: item.path,
    category: "Landing por marca",
    readingTime: "5 min",
    Icon: FaMobileAlt,
    datePublished: "2026-04-20",
    keywords: [
      `reparacion ${item.brand.toLowerCase()}`,
      `service ${item.brand.toLowerCase()} caba`,
      "tecnico celulares caba",
    ],
  })),
];

const articleVisuals: Record<string, { cover: string }> = {
  "/guias/reparacion-iphone-buenos-aires": {
    cover: "/images/portada_iphone.webp",
  },
  "/guias/reparacion-samsung-buenos-aires": {
    cover: "/images/guia_samsung.webp",
  },
  "/guias/reparacion-xiaomi-buenos-aires": {
    cover: "/images/guia_xiaomi.webp",
  },
  "/guias/reparacion-motorola-buenos-aires": {
    cover: "/images/portada_moto.webp",
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
  "/guias/pin-de-carga-suelto-solucion": {
    cover: "/images/guia_cambio_modulo.webp",
  },
  "/guias/celular-mojado-que-hacer": {
    cover: "/images/guia_microelectronica.webp",
  },
  "/guias/face-id-touch-id-no-funciona": {
    cover: "/images/guia_iphone.webp",
  },
  "/guias/pantalla-con-lineas-causas-reparacion": {
    cover: "/images/guia_cambio_modulo.webp",
  },
  ...Object.fromEntries(
    BRAND_GUIDE_LIST.map((item) => [
      item.path,
      {
        cover: item.imagePath,
      },
    ])
  ),
};

const articleLinkTargets: Record<
  string,
  {
    serviceHref: string;
    serviceLabel: string;
    siblingHref: string;
    siblingLabel: string;
  }
> = {
  "/guias/reparacion-iphone-buenos-aires": {
    serviceHref: "/reparaciones/cambio-pantalla-caba",
    serviceLabel: "Servicio: cambio de pantalla",
    siblingHref: "/guias/cambio-bateria-celular",
    siblingLabel: "Guia hermana: bateria",
  },
  "/guias/reparacion-samsung-buenos-aires": {
    serviceHref: "/reparaciones/cambio-pin-carga-caba",
    serviceLabel: "Servicio: pin de carga",
    siblingHref: "/guias/reparacion-pantalla-celular",
    siblingLabel: "Guia hermana: pantallas",
  },
  "/guias/reparacion-xiaomi-buenos-aires": {
    serviceHref: "/reparaciones/cambio-bateria-caba",
    serviceLabel: "Servicio: cambio de bateria",
    siblingHref: "/guias/reparacion-pantalla-celular",
    siblingLabel: "Guia hermana: pantallas",
  },
  "/guias/reparacion-motorola-buenos-aires": {
    serviceHref: "/reparaciones/cambio-pantalla-caba",
    serviceLabel: "Servicio: cambio de pantalla",
    siblingHref: "/reparaciones/cambio-bateria-caba",
    siblingLabel: "Servicio: cambio de batería",
  },
  "/guias/microelectronica-reballing-caba": {
    serviceHref: "/reparaciones/reparacion-placa-caba",
    serviceLabel: "Servicio: reparacion de placa",
    siblingHref: "/guias/soporte-empresas-servicio-tecnico",
    siblingLabel: "Guia hermana: soporte empresas",
  },
  "/guias/soporte-empresas-servicio-tecnico": {
    serviceHref: "/reparaciones",
    serviceLabel: "Servicios: plan tecnico integral",
    siblingHref: "/guias/mantenimiento-preventivo-celulares",
    siblingLabel: "Guia hermana: mantenimiento",
  },
  "/guias/mantenimiento-preventivo-celulares": {
    serviceHref: "/reparaciones",
    serviceLabel: "Servicios: mantenimiento y reparacion",
    siblingHref: "/guias/soporte-empresas-servicio-tecnico",
    siblingLabel: "Guia hermana: soporte empresas",
  },
  "/guias/cambio-bateria-celular": {
    serviceHref: "/reparaciones/cambio-bateria-caba",
    serviceLabel: "Servicio: cambio de bateria",
    siblingHref: "/guias/reparacion-pantalla-celular",
    siblingLabel: "Guia hermana: pantallas",
  },
  "/guias/reparacion-pantalla-celular": {
    serviceHref: "/reparaciones/cambio-pantalla-caba",
    serviceLabel: "Servicio: cambio de pantalla",
    siblingHref: "/guias/cambio-bateria-celular",
    siblingLabel: "Guia hermana: bateria",
  },
  "/guias/pin-de-carga-suelto-solucion": {
    serviceHref: "/reparaciones/cambio-pin-carga-caba",
    serviceLabel: "Servicio: pin de carga",
    siblingHref: "/guias/celular-mojado-que-hacer",
    siblingLabel: "Guia hermana: celular mojado",
  },
  "/guias/celular-mojado-que-hacer": {
    serviceHref: "/reparaciones/reparacion-placa-caba",
    serviceLabel: "Servicio: reparacion de placa",
    siblingHref: "/guias/microelectronica-reballing-caba",
    siblingLabel: "Guia hermana: microelectronica",
  },
  "/guias/face-id-touch-id-no-funciona": {
    serviceHref: "/reparaciones/reparacion-placa-caba",
    serviceLabel: "Servicio: placa y sensores",
    siblingHref: "/guias/reparacion-iphone-buenos-aires",
    siblingLabel: "Guia hermana: reparacion iPhone",
  },
  "/guias/pantalla-con-lineas-causas-reparacion": {
    serviceHref: "/reparaciones/cambio-pantalla-caba",
    serviceLabel: "Servicio: cambio de pantalla",
    siblingHref: "/guias/reparacion-pantalla-celular",
    siblingLabel: "Guia hermana: guia de pantalla",
  },
};

export const metadata: Metadata = {
  ...buildWebsiteMetadata({
    path: "/guias",
    title: "Guías de Reparación de Celulares en CABA | Team Celular",
    description:
      "Guias practicas de Team Celular para entender fallas de pantalla, bateria, carga y placa antes de pedir una reparacion en CABA.",
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
    languages: {
      "es-AR": "/guias",
    },
    openGraphTitle: "Guías de Reparación de Celulares en CABA | Team Celular",
    openGraphDescription:
      "Aprende y decide mejor antes de reparar: guias tecnicas reales por marca, falla y nivel de complejidad.",
    openGraphImagePath: "/images/guia_microelectronica.webp",
    openGraphImageAlt: "Diagnóstico de celulares en el laboratorio de Team Celular",
    twitterTitle: "Guías de Reparación de Celulares en CABA | Team Celular",
    twitterDescription:
      "Guias claras para iPhone, Samsung y Xiaomi: fallas comunes, criterios tecnicos y siguiente paso recomendado.",
  }),
  authors: [{ name: "Team Celular" }],
  creator: "Team Celular",
  publisher: "Team Celular",
};

export default function GuidesPage() {
  return (
    <div className="flex w-full justify-center bg-[#f7f8fc] px-4 py-8 text-slate-950 dark:bg-slate-950 dark:text-white sm:px-6 lg:px-8">
      <div className="w-full max-w-[100rem] space-y-16">
        <BreadcrumbJsonLd
          items={[
            { name: "Inicio", url: `${SITE_URL}/` },
            { name: "Guias", url: PAGE_URL },
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

        <header className="grid overflow-hidden bg-[#171820] text-white lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
            <div className="flex items-center gap-3 text-sm text-white/70">
              <FaBookOpen aria-hidden />
              <span>Guías del laboratorio · Recoleta y Belgrano</span>
            </div>
            <h1 className="mt-8 max-w-3xl text-balance text-[clamp(2.75rem,6vw,5rem)] font-extrabold leading-[0.98] tracking-[-0.035em]">
              Entendé la falla antes de decidir la reparación.
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-slate-300">
              Explicamos síntomas, diagnóstico y opciones de reparación con el mismo criterio que usamos en el laboratorio. Sin alarmismo y sin cambiar piezas por descarte.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#guias-destacadas" className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-[#20216b] transition hover:bg-slate-100">
                Elegir una guía <FaArrowRight aria-hidden />
              </Link>
              <TrackedCtaLink href="/presupuesto-reparacion#solicitar-presupuesto" ctaName="guides_hero_budget" ctaLocation="guides_hero" ctaVariant="secondary" className="inline-flex min-h-12 items-center rounded-lg border border-white/35 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10">
                Consultar una falla
              </TrackedCtaLink>
            </div>
          </div>
          <div className="relative min-h-[24rem] lg:min-h-[38rem]">
            <Image src="/images/guia_microelectronica.webp" alt="Diagnóstico de un celular en el laboratorio de Team Celular" fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#171820]/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#171820]/30 lg:via-transparent" />
            <div className="liquid-glass absolute bottom-5 left-5 right-5 rounded-2xl px-5 py-4 sm:bottom-7 sm:left-7 sm:right-7">
              <p className="font-bold">Contenido revisado por el equipo técnico</p>
              <p className="mt-1 text-sm text-white/75">Marca, falla y siguiente paso en una lectura clara.</p>
            </div>
          </div>
        </header>

        <section id="guias-destacadas" className="space-y-8 scroll-mt-28">
          <div className="max-w-3xl">
            <h2 className="text-balance text-3xl font-extrabold tracking-[-0.025em] md:text-4xl">
              Buscá por marca o por síntoma
            </h2>
            <p className="mt-4 text-pretty text-lg leading-8 text-slate-600 dark:text-slate-300">
              Cada guía separa lo que podés comprobar en casa de lo que requiere diagnóstico técnico.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {ARTICLES.map((article, index) => {
              const Icon = article.Icon;
              const visual = articleVisuals[article.href] ?? {
                cover: "/images/fondofooter.webp",
              };
              const links = articleLinkTargets[article.href] ?? {
                serviceHref: "/reparaciones",
                serviceLabel: "Servicio: reparaciones en CABA",
                siblingHref: "/presupuesto-reparacion#solicitar-presupuesto",
                siblingLabel: "Paso siguiente: pedir presupuesto",
              };
              const updatedDate = formatArgentinaDate(article.datePublished);

              return (
                <article
                  key={article.href}
                  className={`group col-span-12 overflow-hidden bg-white transition hover:-translate-y-1 dark:bg-slate-900 ${index % 5 === 3 ? "md:col-span-7" : index % 5 === 4 ? "md:col-span-5" : "md:col-span-6"}`}
                >
                  <div className="relative h-56 overflow-hidden sm:h-64">
                    <Image
                      src={visual.cover}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.02]"
                    />
                    <div className="liquid-glass absolute left-3 top-3 inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-white">
                      <FaClock className="text-[11px]" />
                      {article.readingTime}
                    </div>
                  </div>

                  <div className="p-6 sm:p-7">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 text-sm font-bold text-[#2d2e83] dark:text-[#aebaff]">
                        <Icon aria-hidden />
                        <span>{article.category}</span>
                      </div>
                      <time
                        dateTime={article.datePublished}
                        className="text-xs font-medium text-slate-500 dark:text-slate-400"
                      >
                        {updatedDate}
                      </time>
                    </div>

                    <h3 className="mt-5 text-2xl font-extrabold tracking-[-0.02em] text-slate-950 dark:text-white">
                      {article.title}
                    </h3>

                    <p className="mt-3 max-w-2xl leading-7 text-slate-600 dark:text-slate-300">
                      {article.description}
                    </p>

                    <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-slate-200 pt-5 dark:border-slate-700">
                    <Link
                      href={article.href}
                      className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#2d2e83] px-5 py-2 text-sm font-bold text-white transition group-hover:gap-3 group-hover:bg-[#20216b]"
                    >
                      Leer guía
                      <FaArrowRight />
                    </Link>
                      <Link href={links.serviceHref} className="inline-flex min-h-11 items-center text-sm font-bold text-slate-600 hover:text-[#2d2e83] dark:text-slate-300 dark:hover:text-white">{links.serviceLabel}</Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="grid gap-4 rounded-2xl border border-slate-200/80 bg-white/85 p-6 shadow-md dark:border-white/10 dark:bg-slate-900/85 md:grid-cols-3 md:p-8">
          <article className="space-y-3 rounded-xl border border-slate-200/80 bg-slate-50/90 p-4 dark:border-white/10 dark:bg-slate-950/45">
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-700 dark:text-slate-200">
              Si ya sabes la falla
            </h2>
            <div className="flex flex-wrap gap-2">
              <Link href="/reparaciones/cambio-pantalla-caba" className="rounded-full border border-primary/25 bg-white px-3 py-2 text-xs font-semibold text-slate-800 transition hover:bg-primary/10 dark:bg-slate-900/70 dark:text-slate-100">
                Cambio de pantalla
              </Link>
              <Link href="/reparaciones/cambio-bateria-caba" className="rounded-full border border-primary/25 bg-white px-3 py-2 text-xs font-semibold text-slate-800 transition hover:bg-primary/10 dark:bg-slate-900/70 dark:text-slate-100">
                Cambio de bateria
              </Link>
              <Link href="/reparaciones/cambio-pin-carga-caba" className="rounded-full border border-primary/25 bg-white px-3 py-2 text-xs font-semibold text-slate-800 transition hover:bg-primary/10 dark:bg-slate-900/70 dark:text-slate-100">
                Pin de carga
              </Link>
            </div>
          </article>

          <article className="space-y-3 rounded-xl border border-slate-200/80 bg-slate-50/90 p-4 dark:border-white/10 dark:bg-slate-950/45">
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-700 dark:text-slate-200">
              Si aun estas evaluando
            </h2>
            <div className="flex flex-wrap gap-2">
              <TrackedCtaLink
                href="/presupuesto-reparacion#solicitar-presupuesto"
                ctaName="guides_cluster_budget"
                ctaLocation="guides_cluster_links"
                ctaVariant="primary"
                className="rounded-full bg-primary px-3 py-2 text-xs font-semibold text-white transition hover:bg-primary/90"
              >
                Diagnostico y presupuesto
              </TrackedCtaLink>
              <TrackedCtaLink
                href="https://wa.me/5491151034595?text=Hola%20Team%20Celular,%20quiero%20asesoria%20tecnica%20desde%20las%20guias"
                ctaName="guides_cluster_whatsapp"
                ctaLocation="guides_cluster_links"
                ctaVariant="whatsapp"
                external
                target="_blank"
                className="rounded-full border border-emerald-700 px-3 py-2 text-xs font-semibold text-white bg-emerald-700 transition hover:bg-emerald-800"
              >
                WhatsApp tecnico
              </TrackedCtaLink>
            </div>
          </article>

          <article className="space-y-3 rounded-xl border border-slate-200/80 bg-slate-50/90 p-4 dark:border-white/10 dark:bg-slate-950/45">
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-700 dark:text-slate-200">
              Si buscas comparar marcas
            </h2>
            <div className="flex flex-wrap gap-2">
              <Link href="/guias/reparacion-iphone-buenos-aires" className="rounded-full border border-slate-300/80 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-primary/35 hover:text-primary dark:border-slate-600/70 dark:bg-slate-900/70 dark:text-slate-200">
                iPhone
              </Link>
              <Link href="/guias/reparacion-samsung-buenos-aires" className="rounded-full border border-slate-300/80 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-primary/35 hover:text-primary dark:border-slate-600/70 dark:bg-slate-900/70 dark:text-slate-200">
                Samsung
              </Link>
              <Link href="/guias/reparacion-motorola-buenos-aires" className="rounded-full border border-slate-300/80 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-primary/35 hover:text-primary dark:border-slate-600/70 dark:bg-slate-900/70 dark:text-slate-200">
                Motorola
              </Link>
              <Link href="/guias/reparacion-xiaomi-buenos-aires" className="rounded-full border border-slate-300/80 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-primary/35 hover:text-primary dark:border-slate-600/70 dark:bg-slate-900/70 dark:text-slate-200">
                Xiaomi
              </Link>
            </div>
          </article>
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
                "Centro de guías técnicas de Team Celular — Paraguay 2451 Recoleta y Amenábar 2032 Belgrano, CABA. Reparación por marca, microelectrónica y soporte corporativo.",
               image: `${SITE_URL}/images/guia_microelectronica.webp`,
              provider: { "@id": `${SITE_URL}#localbusiness` },
              hasPart: ARTICLES.map((article) => ({
                "@type": "Article",
                headline: article.title,
                description: article.description,
                url: `${SITE_URL}${article.href}`,
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

