import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import TrackedCtaLink from "@/components/cro/TrackedCtaLink";
import { buildWebsiteMetadata, getSiteUrl } from "@/lib/seoMetadata";
import { BRAND_GUIDE_LIST } from "./brandGuideConfigs";
import { FPC_GUIDE } from "@/lib/fpcGuide";
import { REPAIR_CASE } from "@/lib/repairCase";
import { EDGE_50_ULTRA_CASE, GALAXY_A50_SPEAKER_CASE } from "@/lib/repairCases";
import {
  FaApple,
  FaArrowRight,
  FaBatteryFull,
  FaBookOpen,
  FaBuilding,
  FaMobileAlt,
  FaTools,
} from "react-icons/fa";
import { SiSamsung, SiXiaomi } from "react-icons/si";

const SITE_URL = getSiteUrl();
const PAGE_URL = `${SITE_URL}/guias`;

const ARTICLES = [
  {
    title: FPC_GUIDE.title,
    description: FPC_GUIDE.description,
    href: FPC_GUIDE.path,
    category: "Reparaciones",
    readingTime: "8 min",
    Icon: FaTools,
    datePublished: FPC_GUIDE.publishedTime,
    keywords: ["flex de interconexión", "conector FPC", "placa de carga"],
  },
  {
    title: REPAIR_CASE.title,
    description: REPAIR_CASE.description,
    href: REPAIR_CASE.path,
    category: "Caso real",
    readingTime: "3 min",
    Icon: FaApple,
    datePublished: "2026-11-02",
    keywords: ["iPhone 16 Pro Max", "pantalla en corto", "IC de imagen", "cámara frontal"],
  },
  {
    title: EDGE_50_ULTRA_CASE.title,
    description: EDGE_50_ULTRA_CASE.description,
    href: EDGE_50_ULTRA_CASE.path,
    category: "Caso real",
    readingTime: "3 min",
    Icon: FaMobileAlt,
    datePublished: "2026-11-16",
    keywords: ["Motorola Edge 50 Ultra", "cambio de pantalla", "pantalla original", "prueba táctil"],
  },
  {
    title: GALAXY_A50_SPEAKER_CASE.title,
    description: GALAXY_A50_SPEAKER_CASE.description,
    href: GALAXY_A50_SPEAKER_CASE.path,
    category: "Caso real",
    readingTime: "2 min",
    Icon: FaTools,
    datePublished: "2026-11-16",
    keywords: ["Samsung Galaxy A50", "parlante con distorsión", "marco intermedio"],
  },
  {
    title: "Reparación de iPhone en Buenos Aires",
    description:
      "Pantalla, batería, carga y placa: opciones de reparación y presupuesto para tu modelo de iPhone.",
    href: "/guias/reparacion-iphone-buenos-aires",
    category: "Landing por marca",
    readingTime: "6 min",
    Icon: FaApple,
    datePublished: "2024-01-15",
    keywords: ["reparacion iPhone", "service Apple", "CABA", "true tone"],
  },
  {
    title: "Reparación de Samsung Galaxy en Buenos Aires",
    description:
      "Guía completa para Galaxy S, A y Z Fold: pantalla AMOLED, batería, puerto USB-C y placa lógica.",
    href: "/guias/reparacion-samsung-buenos-aires",
    category: "Landing por marca",
    readingTime: "6 min",
    Icon: SiSamsung,
    datePublished: "2026-03-12",
    keywords: ["reparacion Samsung", "Galaxy S", "Galaxy A", "service Samsung"],
  },
  {
    title: "Reparación de pantalla: original, OLED o InCell",
    description:
      "Compará tecnologías, procedencia y condición del repuesto antes de pedir el precio instalado para tu modelo.",
    href: "/guias/reparacion-pantalla-celular",
    category: "Reparaciones",
    readingTime: "6 min",
    Icon: FaMobileAlt,
    datePublished: "2024-11-30",
    keywords: ["cambio pantalla", "display OLED", "pantalla celular"],
  },
  {
    title: "¿Conviene reparar el celular o comprar otro?",
    description: "Cómo comparar diagnóstico, costo total, estado del equipo y recuperación de datos antes de gastar.",
    href: "/guias/reparar-celular-o-comprar-otro",
    category: "Comparativas técnicas",
    readingTime: "8 min",
    Icon: FaMobileAlt,
    datePublished: "2026-10-15",
    keywords: ["reparar o comprar celular", "cambio de pantalla", "cambio de batería"],
  },
  {
    title: "Service oficial o taller independiente en CABA",
    description: "Compará cobertura, repuestos, revisión y presupuesto antes de elegir dónde reparar tu equipo.",
    href: "/guias/presupuesto-service-oficial-segunda-opinion",
    category: "Comparativas técnicas",
    readingTime: "8 min",
    Icon: FaTools,
    datePublished: "2026-08-12",
    keywords: ["service oficial vs independiente", "segunda opinión", "reparación iPhone"],
  },
  {
    title: "Reparación de Xiaomi, Redmi y POCO",
    description:
      "Diagnóstico para equipos Xiaomi con foco en pantalla, batería, carga rápida y microelectrónica.",
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
    title: "Soporte técnico para empresas y gremios",
    description:
      "Beneficios de tercerizar mantenimiento de dispositivos móviles con SLAs y trazabilidad.",
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
      "Buenas prácticas para extender vida útil de smartphones y reducir fallas recurrentes.",
    href: "/guias/mantenimiento-preventivo-celulares",
    category: "Cuidado",
    readingTime: "4 min",
    Icon: FaTools,
    datePublished: "2024-04-05",
    keywords: ["mantenimiento celular", "preventivo", "vida util"],
  },
  {
    title: "Cambio de batería de celular",
    description:
      "Guía sobre deterioro de batería, criterios de reemplazo y ventajas de piezas certificadas.",
    href: "/guias/cambio-bateria-celular",
    category: "Reparaciones",
    readingTime: "5 min",
    Icon: FaBatteryFull,
    datePublished: "2024-11-30",
    keywords: ["cambio bateria", "bateria certificada", "autonomia celular"],
  },
  {
    title: "Pin de carga dañado: cómo saberlo y solución",
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
      "Protocolo urgente para reducir el daño por líquidos y mejorar las chances de recuperación técnica.",
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
      "Checklist técnico para identificar si la falla biométrica viene de sensor, flex o placa.",
    href: "/guias/face-id-touch-id-no-funciona",
    category: "Diagnóstico avanzado",
    readingTime: "6 min",
    Icon: FaApple,
    datePublished: "2026-04-16",
    keywords: ["face id no funciona", "touch id", "reparacion iPhone"],
  },
  {
    title: "Pantalla con líneas: causas y reparación",
    description:
      "Como decidir entre cambio de display, ajuste de flex o revisión de placa sin gastar de mas.",
    href: "/guias/pantalla-con-lineas-causas-reparacion",
    category: "Fallas frecuentes",
    readingTime: "5 min",
    Icon: FaMobileAlt,
    datePublished: "2026-04-16",
    keywords: ["pantalla con lineas", "display con rayas", "reparacion pantalla"],
  },
  {
    title: "Celular con virus: cómo saberlo y qué hacer",
    description:
      "Que síntomas son malware, cuales son batería o placa, y los pasos para limpiar el equipo sin perder datos.",
    href: "/guias/celular-con-virus-que-hacer",
    category: "Fallas frecuentes",
    readingTime: "6 min",
    Icon: FaMobileAlt,
    datePublished: "2026-09-14",
    keywords: ["celular con virus", "publicidad invasiva", "celular hackeado"],
  },
  ...BRAND_GUIDE_LIST.map((item) => ({
    title: `Reparación de ${item.brand} en Buenos Aires`,
    description:
      `Guía práctica para ${item.brand}: fallas frecuentes, diagnóstico técnico y siguiente paso recomendado en CABA.`,
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

export const metadata: Metadata = {
  ...buildWebsiteMetadata({
    path: "/guias",
    title: "Guías de Reparación de Celulares en CABA | Team Celular",
    description:
      "Guías de Team Celular con precios por modelo y fallas de pantalla, batería, carga y placa. iPhone, Samsung, Motorola y Xiaomi, escritas en el taller.",
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
      "Aprende y decide mejor antes de reparar: guías técnicas reales por marca, falla y nivel de complejidad.",
    openGraphImagePath: "/opengraph-image.png",
    openGraphImageAlt: "Team Celular: guías de reparación de celulares",
    twitterTitle: "Guías de Reparación de Celulares en CABA | Team Celular",
    twitterDescription:
      "Guías claras para iPhone, Samsung y Xiaomi: fallas comunes, criterios técnicos y siguiente paso recomendado.",
  }),
  authors: [{ name: "Team Celular" }],
  creator: "Team Celular",
  publisher: "Team Celular",
};

type Article = (typeof ARTICLES)[number];

const byHref = new Map<string, Article>(ARTICLES.map((article) => [article.href, article]));
const pick = (hrefs: string[]) => hrefs.flatMap((href) => byHref.get(href) ?? []);

// Marcas con guía propia y demanda medida; el resto usa la plantilla de marca.
const MAIN_BRAND_HREFS = [
  "/guias/reparacion-iphone-buenos-aires",
  "/guias/reparacion-samsung-buenos-aires",
  "/guias/reparacion-motorola-buenos-aires",
  "/guias/reparacion-xiaomi-buenos-aires",
];

const CASE_IMAGES: Record<string, string> = {
  [EDGE_50_ULTRA_CASE.path]: "/images/casos/edge-50-ultra-prueba-hardware.webp",
  [GALAXY_A50_SPEAKER_CASE.path]: "/images/casos/galaxy-a50-marco-parlante.webp",
};

// Orden dentro de cada sección: primero lo que más se busca (Search Console, nov 2026).
// Los id "por-marca" y "por-falla" ya existían como anclas: se conservan.
const SECTIONS = [
  {
    id: "por-falla",
    title: "¿Qué le pasa al celular?",
    intro: "Empezá por el síntoma: qué podés revisar vos y cuándo conviene traerlo.",
    articles: pick([
      "/guias/pin-de-carga-suelto-solucion",
      "/guias/pantalla-con-lineas-causas-reparacion",
      "/guias/celular-mojado-que-hacer",
      "/guias/face-id-touch-id-no-funciona",
      "/guias/celular-con-virus-que-hacer",
    ]),
  },
  {
    id: "precios",
    title: "Precios y reparaciones",
    intro: "Cuánto sale, qué repuestos hay y cuánto tarda cada trabajo.",
    articles: pick([
      "/guias/reparacion-pantalla-celular",
      "/guias/cambio-bateria-celular",
      FPC_GUIDE.path,
      "/guias/mantenimiento-preventivo-celulares",
    ]),
  },
  {
    id: "para-decidir",
    title: "Para decidir",
    intro: "Antes de gastar: comparar opciones con los números a la vista.",
    articles: pick([
      "/guias/reparar-celular-o-comprar-otro",
      "/guias/presupuesto-service-oficial-segunda-opinion",
      "/guias/soporte-empresas-servicio-tecnico",
    ]),
  },
];

const CASES = ARTICLES.filter((article) => article.category === "Caso real");
const MAIN_BRANDS = pick(MAIN_BRAND_HREFS);
const OTHER_BRANDS = ARTICLES.filter(
  (article) => article.category === "Landing por marca" && !MAIN_BRAND_HREFS.includes(article.href),
);
// Una guía nueva que nadie ubicó en una sección aparece acá en vez de quedar sin enlace.
const placed = new Set([...SECTIONS.flatMap((section) => section.articles), ...CASES, ...MAIN_BRANDS, ...OTHER_BRANDS].map((article) => article.href));
const UNPLACED = ARTICLES.filter((article) => !placed.has(article.href));

function ArticleList({ articles }: { articles: Article[] }) {
  return (
    <ul className="mt-5 grid gap-x-10 md:grid-cols-2">
      {articles.map((article) => {
        const Icon = article.Icon;
        return (
          <li key={article.href} className="border-t border-[#333336] py-3">
            <div className="flex items-start gap-4">
              <Icon aria-hidden className="mt-2 h-6 w-6 shrink-0 text-[#c7c7cc]" />
              <div className="min-w-0">
                <h3 className="text-[17px] font-semibold leading-snug"><Link href={article.href} className="inline-flex min-h-11 items-center rounded-lg hover:underline underline-offset-4">{article.title}<FaArrowRight aria-hidden className="ml-3 h-4 w-4 shrink-0 text-[#6aa6ff]" /></Link></h3>
                <p className="pb-1 text-sm leading-6 text-[#a1a1a6]">{article.description}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

const H2 = "tc-heading !text-[clamp(1.5rem,3vw,2.25rem)]";

export default function GuidesPage() {
  const [fallas, precios, decidir] = SECTIONS;
  const anchors = [
    [fallas.id, "Por falla"], [precios.id, "Precios"], ["por-marca", "Por marca"], ["casos", "Casos reales"], [decidir.id, "Para decidir"],
  ];
  return (
    <div className="mx-auto w-full max-w-[1100px] space-y-10 bg-black px-4 py-8 text-[#f5f5f7] sm:px-6 sm:py-12">
      <BreadcrumbJsonLd items={[{ name: "Inicio", url: `${SITE_URL}/` }, { name: "Guías", url: PAGE_URL }]} />
      <nav aria-label="Ruta de navegación" className="flex items-center gap-2 text-sm text-[#a1a1a6]">
        <Link href="/" className="tc-link inline-flex min-h-11 items-center">Inicio</Link><span aria-hidden>/</span><span aria-current="page">Guías</span>
      </nav>
      <header>
        <h1 className="max-w-[850px] text-balance text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.025em]">Entendé la falla antes de decidir la reparación.</h1>
        <p className="mt-4 max-w-[65ch] text-[17px] leading-relaxed text-[#a1a1a6]">Qué podés revisar, cuándo dejar de usar el equipo y qué datos conviene tener antes de pedir un presupuesto.</p>
        <nav aria-label="Buscar una guía" className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
          {anchors.map(([id, label]) => <a key={id} href={`#${id}`} className="tc-link inline-flex min-h-11 items-center">{label}</a>)}
          <TrackedCtaLink href="/presupuesto-reparacion#solicitar-presupuesto" ctaName="guides_hero_budget" ctaLocation="guides_hero" ctaVariant="primary" className="tc-link inline-flex min-h-11 items-center">Consultar una falla</TrackedCtaLink>
        </nav>
      </header>

      <div id="guias-destacadas" className="space-y-14 scroll-mt-28">
        {[fallas, precios].map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-28">
            <h2 className={H2}>{section.title}</h2>
            <p className="mt-2 text-[#a1a1a6]">{section.intro}</p>
            <ArticleList articles={section.articles} />
          </section>
        ))}

        <section id="por-marca" className="scroll-mt-28">
          <h2 className={H2}>Por marca</h2>
          <p className="mt-2 text-[#a1a1a6]">Fallas típicas, precios y repuestos de cada marca.</p>
          <ArticleList articles={MAIN_BRANDS} />
          <h3 className="mt-8 text-[17px] font-semibold">Otras marcas</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {OTHER_BRANDS.map((article) => (
              <li key={article.href}>
                <Link href={article.href} className="inline-flex min-h-11 items-center rounded-full bg-[#1d1d1f] px-4 text-sm text-[#f5f5f7] transition-colors hover:bg-[#333336]">
                  {article.title.replace(" en Buenos Aires", "")}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section id="casos" className="scroll-mt-28">
          <h2 className={H2}>Casos reales del taller</h2>
          <p className="mt-2 text-[#a1a1a6]">Equipos que pasaron por el banco: qué tenían y cómo se resolvió.</p>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {CASES.map((article) => {
              const Icon = article.Icon;
              const image = CASE_IMAGES[article.href];
              return (
                <li key={article.href}>
                  <Link href={article.href} className="group flex h-full flex-col overflow-hidden rounded-[28px] bg-[#1d1d1f] transition-colors hover:bg-[#262628]">
                    {image ? (
                      <Image src={image} alt="" width={600} height={450} sizes="(min-width: 768px) 340px, 100vw" className="aspect-[4/3] w-full object-cover" />
                    ) : (
                      <span className="flex aspect-[4/3] w-full items-center justify-center bg-gradient-to-br from-[#1766f2]/30 to-[#2D2E83]/30"><Icon aria-hidden className="h-14 w-14 text-[#6aa6ff]" /></span>
                    )}
                    <span className="flex flex-1 flex-col p-6">
                      <span className="text-[17px] font-semibold leading-snug">{article.title}</span>
                      <span className="mt-2 text-sm leading-6 text-[#a1a1a6]">{article.description}</span>
                      <span className="mt-auto pt-4 text-sm font-semibold text-[#6aa6ff]">Leer el caso →</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section id={decidir.id} className="scroll-mt-28">
          <h2 className={H2}>{decidir.title}</h2>
          <p className="mt-2 text-[#a1a1a6]">{decidir.intro}</p>
          <ArticleList articles={decidir.articles} />
        </section>

        {UNPLACED.length > 0 && (
          <section id="mas-guias" className="scroll-mt-28">
            <h2 className={H2}>Más guías</h2>
            <ArticleList articles={UNPLACED} />
          </section>
        )}
      </div>
      <nav id="servicios-de-reparacion" aria-label="Servicios de reparación y presupuesto" className="flex scroll-mt-28 flex-wrap items-center gap-x-6 gap-y-2 border-y border-[#333336] py-4 text-sm">
        <span className="font-semibold">¿Ya sabés qué necesitás?</span>
        <Link href="/reparaciones/cambio-pantalla-caba" className="tc-link inline-flex min-h-11 items-center">Cambio de pantalla</Link>
        <Link href="/reparaciones/cambio-bateria-caba" className="tc-link inline-flex min-h-11 items-center">Cambio de batería</Link>
        <Link href="/reparaciones/cambio-pin-carga-caba" className="tc-link inline-flex min-h-11 items-center">Pin de carga</Link>
      </nav>
      <section className="border-t border-[#333336] py-6">
        <h2 className="text-2xl font-semibold">¿Necesitás que lo revisemos?</h2>
        <p className="mt-3 max-w-[65ch] text-[17px] leading-relaxed text-[#a1a1a6]">Contanos marca, modelo y qué le pasa. Te orientamos para consultar en Recoleta o Belgrano.</p>
        <div className="mt-5 flex flex-wrap items-center gap-5"><Link href="/contacto" className="tc-btn tc-btn-primary">Consultar al taller</Link><Link href="https://wa.me/5491151034595?text=Hola%20Team%20Celular,%20quiero%20asesoria%20tecnica%20para%20reparar%20mi%20celular" className="tc-link inline-flex min-h-11 items-center">WhatsApp directo</Link></div>
      </section>
      <aside aria-labelledby="otras-lecturas" className="border-t border-[#333336] pt-5 text-sm">
        <h2 id="otras-lecturas" className="font-semibold">Otras lecturas</h2>
        <Link href="/guias/team-celular-vs-gofix-view-phone" className="tc-link mt-2 inline-flex min-h-11 items-center underline underline-offset-4">Comparación de talleres: Team Celular, GoFix y View Phone</Link>
      </aside>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "CollectionPage", name: "Guias tecnicas de reparacion de celulares",
        description: "Centro de guías técnicas de Team Celular — Paraguay 2451 Recoleta y Amenábar 2032 Belgrano, CABA. Reparación por marca, microelectrónica y soporte corporativo.",
        image: `${SITE_URL}/opengraph-image.png`, provider: { "@id": `${SITE_URL}#organization` },
        hasPart: ARTICLES.map(article => ({ "@type": "Article", headline: article.title, description: article.description, url: `${SITE_URL}${article.href}`, datePublished: article.datePublished, author: { "@type": "Organization", name: "Team Celular" }, keywords: article.keywords.join(", ") })),
      }) }} />
    </div>
  );
}
