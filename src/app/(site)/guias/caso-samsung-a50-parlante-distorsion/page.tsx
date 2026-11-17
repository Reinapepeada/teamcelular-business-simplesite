import Image from "next/image";
import Link from "next/link";
import ArticleSchema from "@/components/seo/ArticleSchema";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import GuideByline from "@/components/seo/GuideByline";
import TrackedCtaLink from "@/components/cro/TrackedCtaLink";
import { GALAXY_A50_SPEAKER_CASE as CASE } from "@/lib/repairCases";
import { buildWebsiteMetadata, getSiteUrl } from "@/lib/seoMetadata";

const SITE_URL = getSiteUrl();
const PAGE_URL = `${SITE_URL}${CASE.path}`;
const PHOTO = "/images/casos/galaxy-a50-marco-parlante.webp";

export const metadata = buildWebsiteMetadata({
  path: CASE.path,
  title: "Caso real: parlante con distorsión en Galaxy A50 | Team Celular",
  description: CASE.description,
});

export default function GalaxyA50SpeakerCasePage() {
  return (
    <article className="mx-auto w-full max-w-[1000px] space-y-10 bg-black px-4 py-8 text-[#f5f5f7] sm:px-6 sm:py-12">
      <ArticleSchema title={CASE.title} description={CASE.description} publishedTime={CASE.publishedTime} modifiedTime={CASE.publishedTime} image={`${SITE_URL}${PHOTO}`} url={PAGE_URL} about={["Reparación de Samsung Galaxy A50", "Parlante con distorsión", "Fijación del parlante al marco"]} />
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
        <p className="mt-2 text-sm leading-6 text-[#a1a1a6]">Fecha de documentación del caso. Foto tomada en el taller, sin datos del cliente.</p>
      </header>

      <div className="grid items-start gap-8 md:grid-cols-[0.8fr_1.2fr]">
        <Image
          src={PHOTO}
          alt="Marco intermedio de un Samsung Galaxy A50 levantado, con el parlante montado en el marco"
          width={1200}
          height={2132}
          sizes="(min-width: 768px) 380px, 100vw"
          className="w-full rounded-[28px]"
        />
        <div className="space-y-10">
          <section className="space-y-4">
            <h2 className="tc-heading !text-2xl">¿Qué le pasaba?</h2>
            <p className="leading-relaxed text-[#c7c7cc]">El parlante del Galaxy A50 sonaba con distorsión. Es un síntoma que suele atribuirse a un parlante roto, y lo primero que se piensa es en cambiarlo.</p>
          </section>
          <section className="space-y-4">
            <h2 className="tc-heading !text-2xl">¿Dónde estaba la falla?</h2>
            <p className="leading-relaxed text-[#c7c7cc]">En este modelo el parlante va montado en el marco intermedio, la pieza que se ve levantada en la foto. El parlante no estaba bien fijado a ese marco.</p>
          </section>
          <section className="space-y-4">
            <h2 className="tc-heading !text-2xl">¿Cómo se resolvió?</h2>
            <p className="leading-relaxed text-[#c7c7cc]">{CASE.outcome}</p>
            <p className="leading-relaxed text-[#a1a1a6]">Este resultado corresponde al equipo de este caso. Otro teléfono con el mismo síntoma puede tener el parlante dañado o sucio; eso se define al revisarlo.</p>
          </section>
        </div>
      </div>

      <section className="border-t border-[#333336] pt-6">
        <h2 className="tc-heading !text-2xl">¿Tu celular suena distorsionado?</h2>
        <p className="mt-4 max-w-[65ch] leading-relaxed text-[#a1a1a6]">Contanos el modelo y cuándo se nota: en llamadas, con música o con el altavoz. Team Celular recibe equipos en Paraguay 2451, Recoleta, y Amenábar 2032, Belgrano. El presupuesto se confirma antes de reparar.</p>
        <TrackedCtaLink href="/presupuesto-reparacion#solicitar-presupuesto" ctaName="case_a50_speaker_budget" ctaLocation="repair_case_end" ctaVariant="primary" className="tc-btn tc-btn-primary mt-6">Consultar mi equipo</TrackedCtaLink>
        <ul className="mt-6 space-y-2">
          <li><Link href="/reparaciones/reparacion-audio-celular-caba" className="tc-link inline-block py-2">Reparación de audio de celular →</Link></li>
          <li><Link href="/guias/reparacion-samsung-buenos-aires" className="tc-link inline-block py-2">Reparación de Samsung en Buenos Aires →</Link></li>
        </ul>
      </section>
    </article>
  );
}
