import Link from "next/link";
import type { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import TrackedCtaLink from "@/components/cro/TrackedCtaLink";
import { buildWebsiteMetadata, getSiteUrl } from "@/lib/seoMetadata";
import { BRAND_GUIDE_LIST } from "./brandGuideConfigs";
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
      "Guia completa para Galaxy S, A y Z Fold: pantalla AMOLED, bateria, puerto USB-C y placa logica.",
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
  {
    title: "Celular con virus: cómo saberlo y qué hacer",
    description:
      "Que sintomas son malware, cuales son bateria o placa, y los pasos para limpiar el equipo sin perder datos.",
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
      "Aprende y decide mejor antes de reparar: guias tecnicas reales por marca, falla y nivel de complejidad.",
    openGraphImagePath: "/opengraph-image.png",
    openGraphImageAlt: "Team Celular: guías de reparación de celulares",
    twitterTitle: "Guías de Reparación de Celulares en CABA | Team Celular",
    twitterDescription:
      "Guias claras para iPhone, Samsung y Xiaomi: fallas comunes, criterios tecnicos y siguiente paso recomendado.",
  }),
  authors: [{ name: "Team Celular" }],
  creator: "Team Celular",
  publisher: "Team Celular",
};

export default function GuidesPage() {
  const groups = [
    { id: "por-marca", title: "Por marca", articles: ARTICLES.filter(item => item.category === "Landing por marca") },
    { id: "por-falla", title: "Por falla y tipo de servicio", articles: ARTICLES.filter(item => item.category !== "Landing por marca") },
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
          <a href="#por-marca" className="tc-link inline-flex min-h-11 items-center">Por marca</a>
          <a href="#por-falla" className="tc-link inline-flex min-h-11 items-center">Por falla</a>
          <TrackedCtaLink href="/presupuesto-reparacion#solicitar-presupuesto" ctaName="guides_hero_budget" ctaLocation="guides_hero" ctaVariant="primary" className="tc-link inline-flex min-h-11 items-center">Consultar una falla</TrackedCtaLink>
        </nav>
      </header>

      <div id="guias-destacadas" className="space-y-10 scroll-mt-28">
        {groups.map(group => <section key={group.id} id={group.id} className="scroll-mt-28">
          <h2 className="tc-heading !text-[clamp(1.5rem,3vw,2.25rem)]">{group.title}</h2>
          <ul className="mt-5 grid gap-x-10 md:grid-cols-2">
            {group.articles.map(article => {
              const Icon = article.Icon;
              return <li key={article.href} className="border-t border-[#333336] py-2">
                <div className="flex items-start gap-4">
                  <Icon aria-hidden className="mt-2 h-6 w-6 shrink-0 text-[#c7c7cc]" />
                  <div className="min-w-0">
                    <h3 className="text-[17px] font-semibold leading-snug"><Link href={article.href} className="inline-flex min-h-11 items-center rounded-lg hover:underline underline-offset-4">{article.title}<FaArrowRight aria-hidden className="ml-3 h-4 w-4 shrink-0 text-[#6aa6ff]" /></Link></h3>
                  </div>
                </div>
              </li>;
            })}
          </ul>
        </section>)}
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
        image: `${SITE_URL}/opengraph-image.png`, provider: { "@id": `${SITE_URL}#localbusiness` },
        hasPart: ARTICLES.map(article => ({ "@type": "Article", headline: article.title, description: article.description, url: `${SITE_URL}${article.href}`, datePublished: article.datePublished, author: { "@type": "Organization", name: "Team Celular" }, keywords: article.keywords.join(", ") })),
      }) }} />
    </div>
  );
}
