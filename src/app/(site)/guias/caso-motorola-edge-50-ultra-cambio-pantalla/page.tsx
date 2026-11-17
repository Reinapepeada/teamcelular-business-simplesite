import Image from "next/image";
import Link from "next/link";
import ArticleSchema from "@/components/seo/ArticleSchema";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import GuideByline from "@/components/seo/GuideByline";
import VideoSchema from "@/components/seo/VideoSchema";
import TrackedCtaLink from "@/components/cro/TrackedCtaLink";
import { EDGE_50_ULTRA_CASE as CASE } from "@/lib/repairCases";
import { buildWebsiteMetadata, getSiteUrl } from "@/lib/seoMetadata";

const SITE_URL = getSiteUrl();
const PAGE_URL = `${SITE_URL}${CASE.path}`;
const IMG = "/images/casos";
const VIDEO = "/videos/edge-50-ultra-prueba-tactil.mp4";
const POSTER = `${IMG}/edge-50-ultra-prueba-tactil-poster.webp`;

export const metadata = buildWebsiteMetadata({
  path: CASE.path,
  title: "Caso real: pantalla de Motorola Edge 50 Ultra | Team Celular",
  description: CASE.description,
  openGraphImagePath: `${IMG}/edge-50-ultra-prueba-hardware.webp`,
  openGraphImageDimensions: { width: 1200, height: 1200 },
  openGraphImageAlt: "Motorola Edge 50 Ultra con la pantalla nueva junto a la pantalla rota",
});

const steps = [
  {
    image: "edge-50-ultra-tapa-retirada",
    alt: "Motorola Edge 50 Ultra con la tapa trasera retirada sobre la mesa de trabajo",
    title: "Se abre por atrás",
    text: "Primero se retira la tapa trasera. Debajo quedan a la vista las tres cámaras y la bobina de carga inalámbrica.",
  },
  {
    image: "edge-50-ultra-interior",
    alt: "Interior del Motorola Edge 50 Ultra: placa, cámaras y batería Motorola",
    title: "Placa y batería al descubierto",
    text: "Sin las tapas internas se ven la placa, los módulos de cámara y la batería original de Motorola.",
  },
  {
    image: "edge-50-ultra-placa-y-modulo-nuevo",
    alt: "Placa del Edge 50 Ultra fuera del equipo y el módulo de pantalla nuevo al lado",
    title: "Sale la placa, entra el módulo nuevo",
    text: "La placa se retira del marco para liberar la pantalla dañada. Al lado, el módulo de pantalla nuevo listo para montar.",
  },
  {
    image: "edge-50-ultra-enciende",
    alt: "Motorola Edge 50 Ultra encendiendo con la pantalla nueva, sujeta con bandas elásticas",
    title: "Primera prueba: enciende",
    text: "Con la pantalla nueva conectada y sujeta con bandas elásticas, el equipo arranca y muestra la animación de inicio.",
  },
  {
    image: "edge-50-ultra-prueba-color",
    alt: "Prueba de pantalla en rojo en el Edge 50 Ultra, junto a la pantalla rota retirada",
    title: "Rojo, verde y azul",
    text: "La prueba de pantalla recorre los tres colores a pantalla completa. Sirve para ver manchas, líneas o píxeles apagados. A la izquierda, la pantalla rota que se retiró.",
  },
  {
    image: "edge-50-ultra-prueba-hardware",
    alt: "Prueba de hardware del Motorola con pantalla, luz de fondo y pantalla táctil en verde",
    title: "Prueba de hardware completa",
    text: "La prueba del propio teléfono marcó en verde pantalla, luz de fondo y pantalla táctil.",
  },
];

export default function EdgeScreenCasePage() {
  return (
    <article className="mx-auto w-full max-w-[1000px] space-y-12 bg-black px-4 py-8 text-[#f5f5f7] sm:px-6 sm:py-12">
      <ArticleSchema title={CASE.title} description={CASE.description} publishedTime={CASE.publishedTime} modifiedTime={CASE.publishedTime} image={`${SITE_URL}${IMG}/edge-50-ultra-prueba-hardware.webp`} url={PAGE_URL} about={["Cambio de pantalla Motorola Edge 50 Ultra", "Pantalla original", "Prueba de pantalla táctil"]} />
      <VideoSchema name="Prueba de pantalla táctil en un Motorola Edge 50 Ultra" description="Prueba táctil cuadro por cuadro sobre la pantalla nueva de un Motorola Edge 50 Ultra en el laboratorio de Team Celular." contentPath={VIDEO} thumbnailPath={POSTER} uploadDate={CASE.publishedTime} duration="PT12S" />
      <BreadcrumbJsonLd items={[{ name: "Inicio", url: `${SITE_URL}/` }, { name: "Guías", url: `${SITE_URL}/guias` }, { name: CASE.label, url: PAGE_URL }]} />
      <nav aria-label="Ruta de navegación" className="flex flex-wrap items-center gap-2 text-sm text-[#a1a1a6]">
        <Link href="/guias" className="tc-link inline-flex min-h-11 items-center">Guías</Link>
        <span aria-hidden>/</span><span aria-current="page">{CASE.label}</span>
      </nav>

      <header>
        <p className="tc-eyebrow mb-4">Caso real del laboratorio · CABA</p>
        <h1 className="text-balance text-[clamp(1.75rem,4.5vw,3.5rem)] font-semibold leading-[1.12] tracking-[-0.025em]">{CASE.title}</h1>
        <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-[#c7c7cc]">{CASE.summary}</p>
        <div className="mt-5"><GuideByline modifiedTime={CASE.publishedTime} /></div>
        <p className="mt-2 text-sm leading-6 text-[#a1a1a6]">Fecha de documentación del caso. Fotos y video tomados en el taller, sin datos del cliente.</p>
      </header>

      <section aria-labelledby="pasos-title">
        <h2 id="pasos-title" className="tc-heading !text-2xl">¿Cómo se cambia la pantalla de un Edge 50 Ultra?</h2>
        <ol className="mt-8 space-y-10">
          {steps.map((step, index) => (
            <li key={step.image} className="grid items-center gap-6 md:grid-cols-2">
              <Image
                src={`${IMG}/${step.image}.webp`}
                alt={step.alt}
                width={1200}
                height={1200}
                sizes="(min-width: 768px) 470px, 100vw"
                className={`w-full rounded-[28px] ${index % 2 ? "md:order-2" : ""}`}
              />
              <div>
                <p aria-hidden className="text-5xl font-semibold tabular-nums text-[#424245]">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-[#c7c7cc]">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="tactil-title" className="grid items-center gap-8 rounded-[28px] bg-[#1d1d1f] p-6 md:grid-cols-[auto_1fr] md:p-10">
        <video
          controls
          muted
          playsInline
          preload="none"
          poster={POSTER}
          width={540}
          height={960}
          className="mx-auto w-full max-w-[260px] rounded-[20px]"
          aria-label="Video de la prueba táctil sobre la pantalla nueva"
        >
          <source src={VIDEO} type="video/mp4" />
        </video>
        <div>
          <h2 id="tactil-title" className="tc-heading !text-2xl">¿Cómo se prueba el táctil?</h2>
          <p className="mt-4 leading-relaxed text-[#c7c7cc]">
            La prueba divide la pantalla en una grilla. Cada cuadro se pinta cuando el dedo pasa
            por encima: si queda un cuadro sin pintar, esa zona no responde. En el video se
            completa toda la grilla sobre la pantalla nueva.
          </p>
        </div>
      </section>

      <section className="max-w-[70ch] space-y-4">
        <h2 className="tc-heading !text-2xl">¿Cómo quedó el teléfono?</h2>
        <p className="leading-relaxed text-[#c7c7cc]">{CASE.outcome}</p>
        <p className="leading-relaxed text-[#a1a1a6]">Este resultado corresponde al equipo de este caso. El repuesto disponible y el precio se confirman para cada equipo antes de reparar.</p>
      </section>

      <section className="border-t border-[#333336] pt-6">
        <h2 className="tc-heading !text-2xl">¿Se te rompió la pantalla de un Motorola Edge?</h2>
        <p className="mt-4 max-w-[65ch] leading-relaxed text-[#a1a1a6]">Contanos el modelo y cómo quedó. Team Celular recibe equipos en Paraguay 2451, Recoleta, y Amenábar 2032, Belgrano. El presupuesto se confirma antes de reparar.</p>
        <TrackedCtaLink href="/presupuesto-reparacion#solicitar-presupuesto" ctaName="case_edge50ultra_budget" ctaLocation="repair_case_end" ctaVariant="primary" className="tc-btn tc-btn-primary mt-6">Consultar mi equipo</TrackedCtaLink>
        <ul className="mt-6 space-y-2">
          <li><Link href="/guias/reparacion-motorola-buenos-aires" className="tc-link inline-block py-2">Reparación de Motorola en Buenos Aires →</Link></li>
          <li><Link href="/reparaciones/cambio-pantalla-caba" className="tc-link inline-block py-2">Cambio de pantalla →</Link></li>
          <li><Link href="/guias/reparacion-pantalla-celular" className="tc-link inline-block py-2">Precios de cambio de pantalla por marca →</Link></li>
        </ul>
      </section>
    </article>
  );
}
