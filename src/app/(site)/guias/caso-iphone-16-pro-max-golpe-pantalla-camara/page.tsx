import Link from "next/link";
import ArticleSchema from "@/components/seo/ArticleSchema";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import GuideByline from "@/components/seo/GuideByline";
import TrackedCtaLink from "@/components/cro/TrackedCtaLink";
import { REPAIR_CASE } from "@/lib/repairCase";
import { buildWebsiteMetadata, getSiteUrl } from "@/lib/seoMetadata";

const SITE_URL = getSiteUrl();
const PAGE_URL = `${SITE_URL}${REPAIR_CASE.path}`;

export const metadata = buildWebsiteMetadata({
  path: REPAIR_CASE.path,
  title: "Caso real: iPhone 16 Pro Max golpeado | Team Celular",
  description: REPAIR_CASE.description,
});

export default function IphoneRepairCasePage() {
  return (
    <article className="mx-auto w-full max-w-[1000px] space-y-10 bg-black px-4 py-8 text-[#f5f5f7] sm:px-6 sm:py-12">
      <ArticleSchema title={REPAIR_CASE.title} description={REPAIR_CASE.description} publishedTime={REPAIR_CASE.publishedTime} modifiedTime={REPAIR_CASE.publishedTime} image={`${SITE_URL}/opengraph-image.png`} url={PAGE_URL} about={["Reparación de iPhone 16 Pro Max", "Pantalla en corto", "IC de imagen", "Cámara frontal"]} />
      <BreadcrumbJsonLd items={[{ name: "Inicio", url: `${SITE_URL}/` }, { name: "Guías", url: `${SITE_URL}/guias` }, { name: "Caso de iPhone 16 Pro Max", url: PAGE_URL }]} />
      <nav aria-label="Ruta de navegación" className="flex flex-wrap items-center gap-2 text-sm text-[#a1a1a6]">
        <Link href="/guias" className="tc-link inline-flex min-h-11 items-center">Guías</Link>
        <span aria-hidden>/</span><span aria-current="page">Caso de iPhone 16 Pro Max</span>
      </nav>
      <header>
        <p className="tc-eyebrow mb-4">Caso real del laboratorio · CABA</p>
        <h1 className="text-balance text-[clamp(1.75rem,4.5vw,3.5rem)] font-semibold leading-[1.12] tracking-[-0.025em]">{REPAIR_CASE.title}</h1>
        <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-[#c7c7cc]">{REPAIR_CASE.summary}</p>
        <div className="mt-5"><GuideByline modifiedTime={REPAIR_CASE.publishedTime} /></div>
        <p className="mt-2 text-sm leading-6 text-[#a1a1a6]">Fecha de documentación del caso. Relato técnico aportado por Team Celular, sin datos del cliente.</p>
      </header>
      <section className="max-w-[70ch] space-y-4">
        <h2 className="tc-heading !text-2xl">¿Qué daños dejó el golpe?</h2>
        <p className="leading-relaxed text-[#c7c7cc]">La pantalla del iPhone 16 Pro Max quedó en cortocircuito después del golpe. En este equipo, el daño también alcanzó el IC de imagen: el circuito integrado relacionado con la imagen de la pantalla.</p>
        <p className="leading-relaxed text-[#c7c7cc]">La cámara frontal tenía otra falla que se pudo detectar cuando el teléfono volvió a encender. Recuperar la imagen permitió continuar la revisión del equipo.</p>
      </section>
      <section className="space-y-4">
        <h2 className="tc-heading !text-2xl">¿Qué se reparó y qué repuestos se instalaron?</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[440px] text-left text-[15px] leading-6">
            <caption className="pb-4 text-left text-[#a1a1a6]">Intervenciones realizadas en este iPhone 16 Pro Max</caption>
            <thead className="border-y border-[#424245]"><tr><th scope="col" className="px-3 py-4">Componente</th><th scope="col" className="px-3 py-4">Trabajo realizado</th></tr></thead>
            <tbody className="divide-y divide-[#333336] text-[#c7c7cc]">
              <tr><th scope="row" className="px-3 py-4 font-medium">IC de imagen</th><td className="px-3 py-4">Reparación del daño en el circuito de imagen.</td></tr>
              <tr><th scope="row" className="px-3 py-4 font-medium">Pantalla</th><td className="px-3 py-4">Reemplazo del módulo dañado por una pantalla Soft OLED.</td></tr>
              <tr><th scope="row" className="px-3 py-4 font-medium">Cámara frontal</th><td className="px-3 py-4">Reemplazo por una cámara frontal original.</td></tr>
            </tbody>
          </table>
        </div>
        <p className="max-w-[70ch] text-sm leading-6 text-[#a1a1a6]">La pantalla instalada fue Soft OLED. La condición de repuesto original corresponde a la cámara frontal.</p>
      </section>
      <section className="max-w-[70ch] space-y-4">
        <h2 className="tc-heading !text-2xl">¿Cómo quedó el teléfono?</h2>
        <p className="leading-relaxed text-[#c7c7cc]">{REPAIR_CASE.outcome}</p>
        <p className="leading-relaxed text-[#a1a1a6]">Este resultado corresponde al equipo de este caso. Otro iPhone con un golpe parecido puede tener daños distintos; el alcance de la reparación se define después de revisarlo.</p>
      </section>
      <section className="border-t border-[#333336] pt-6">
        <h2 className="tc-heading !text-2xl">¿Tu iPhone quedó sin imagen después de un golpe?</h2>
        <p className="mt-4 max-w-[65ch] leading-relaxed text-[#a1a1a6]">Contanos el modelo y qué ocurrió. Team Celular recibe equipos en Paraguay 2451, Recoleta, y Amenábar 2032, Belgrano. El presupuesto se confirma antes de reparar.</p>
        <TrackedCtaLink href="/presupuesto-reparacion#solicitar-presupuesto" ctaName="case_iphone16promax_budget" ctaLocation="repair_case_end" ctaVariant="primary" className="tc-btn tc-btn-primary mt-6">Consultar mi equipo</TrackedCtaLink>
        <ul className="mt-6 space-y-2">
          <li><Link href="/guias/reparacion-iphone-buenos-aires" className="tc-link inline-block py-2">Reparación de iPhone en Buenos Aires →</Link></li>
          <li><Link href="/reparaciones/reparacion-placa-caba" className="tc-link inline-block py-2">Diagnóstico y reparación de placa →</Link></li>
          <li><Link href="/reparaciones/cambio-pantalla-caba" className="tc-link inline-block py-2">Cambio de pantalla →</Link></li>
        </ul>
      </section>
    </article>
  );
}
