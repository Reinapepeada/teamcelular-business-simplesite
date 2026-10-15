import type { ReactNode } from "react";
import Link from "next/link";
import ArticleSchema from "@/components/seo/ArticleSchema";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import GuideByline from "@/components/seo/GuideByline";
import BranchWhatsAppButton from "@/components/cro/BranchSelector";
import TrackedCtaLink from "@/components/cro/TrackedCtaLink";
import { getSiteUrl } from "@/lib/seoMetadata";

export const COMPARISON_DATE = "2026-10-15T00:00:00Z";

export const COMPARISON_LINKS = [
  { href: "/guias/presupuesto-service-oficial-segunda-opinion", label: "Service oficial o independiente" },
  { href: "/guias/reparacion-pantalla-celular#comparar-pantallas", label: "Pantalla original, OLED o InCell" },
  { href: "/guias/reparar-celular-o-comprar-otro", label: "Reparar o comprar otro celular" },
  { href: "/guias/team-celular-vs-gofix-view-phone", label: "Team Celular, GoFix y View Phone" },
];

export function ComparisonTable({ caption, columns, rows }: {
  caption: string;
  columns: string[];
  rows: { label: string; values: ReactNode[] }[];
}) {
  return (
    <>
    <p className="text-sm text-slate-600 dark:text-slate-400 sm:hidden">Deslizá la tabla hacia los lados para comparar todas las opciones.</p>
    <div role="region" aria-label={caption} tabIndex={0} className="my-6 max-w-full overflow-x-auto rounded-2xl border border-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 dark:border-white/20">
      <table className="w-full min-w-[42rem] border-collapse text-left text-sm leading-6">
        <caption className="px-5 py-4 text-left font-semibold text-slate-900 dark:text-white">{caption}</caption>
        <thead className="bg-slate-100 dark:bg-white/10">
          <tr>{columns.map((column) => <th key={column} scope="col" className="p-4 align-top font-semibold">{column}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-white/15">
          {rows.map((row) => (
            <tr key={row.label}>
              <th scope="row" className="p-4 align-top font-semibold">{row.label}</th>
              {row.values.map((value, index) => <td key={index} className="min-w-44 p-4 align-top">{value}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}

export function ComparisonCta({ guideKey, location }: { guideKey: string; location: string }) {
  return (
    <div className="not-prose my-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <TrackedCtaLink href="/presupuesto-reparacion#solicitar-presupuesto" ctaName={`comparison_budget_${guideKey}`} ctaLocation={location} ctaVariant="primary" className="tc-btn tc-btn-primary">
        Pedir presupuesto para mi equipo
      </TrackedCtaLink>
      <BranchWhatsAppButton ctaName={`comparison_whatsapp_${guideKey}`} ctaLocation={location} message={`Hola Team Celular, leí la comparativa ${guideKey.replaceAll("_", " ")}. Quiero consultar opciones para mi equipo. Marca y modelo: __. Falla: __.`} className="tc-btn tc-btn-ghost">
        Consultar por WhatsApp
      </BranchWhatsAppButton>
    </div>
  );
}

export default function ComparisonGuidePage({ path, title, description, faq, children, publishedTime = COMPARISON_DATE }: {
  path: string;
  title: string;
  description: string;
  faq: { question: string; answer: string }[];
  children: ReactNode;
  publishedTime?: string;
}) {
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}${path}`;
  const guideKey = path.split("/").at(-1)!.replaceAll("-", "_");
  return (
    <div className="w-full bg-white px-4 py-10 text-slate-700 dark:bg-black dark:text-[#c7c7cc] sm:px-6">
      <ArticleSchema title={title} description={description} publishedTime={publishedTime} modifiedTime={COMPARISON_DATE} image={`${siteUrl}/images/reparacion_placa.webp`} url={url} about={[title, "Reparación de celulares en CABA"]} />
      <BreadcrumbJsonLd items={[{ name: "Inicio", url: siteUrl }, { name: "Guías", url: `${siteUrl}/guias` }, { name: title, url }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "@id": `${url}#faq`, mainEntity: faq.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) }).replace(/</g, "\\u003c") }} />
      <article className="mx-auto max-w-5xl space-y-10">
        <nav aria-label="Ruta de navegación" className="text-sm"><Link href="/">Inicio</Link> / <Link href="/guias">Guías</Link></nav>
        <header className="space-y-5 border-b border-slate-200 pb-10 dark:border-white/20">
          <p className="text-sm font-semibold text-blue-700 dark:text-[#6aa6ff]">Decisiones de reparación · Recoleta y Belgrano, CABA</p>
          <h1 className="max-w-4xl text-balance text-3xl font-semibold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-5xl">{title}</h1>
          <p className="max-w-3xl text-lg leading-8">{description}</p>
          <GuideByline modifiedTime={COMPARISON_DATE} tone="light" />
          <p className="text-sm leading-6">Publicamos esta guía desde Team Celular, un taller independiente. Nuestra participación comercial está identificada en las comparaciones.</p>
          <ComparisonCta guideKey={guideKey} location="comparison_hero" />
        </header>
        <div className="space-y-10 text-base leading-8 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-slate-950 dark:[&_h2]:text-white [&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_p]:my-4 [&_a:not(.tc-btn)]:text-blue-700 [&_a:not(.tc-btn)]:underline [&_a:not(.tc-btn)]:underline-offset-4 dark:[&_a:not(.tc-btn)]:text-[#6aa6ff] [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:space-y-3 [&_ol]:pl-6">
          {children}
        </div>
        <section id="faq" className="space-y-3">
          <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">Preguntas frecuentes</h2>
          {faq.map(({ question, answer }) => <details key={question} className="border-b border-slate-200 py-4 dark:border-white/20"><summary className="min-h-11 cursor-pointer font-semibold text-slate-950 dark:text-white">{question}</summary><p className="mt-3 leading-7">{answer}</p></details>)}
        </section>
        <aside className="border-y border-slate-200 py-8 dark:border-white/20">
          <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Otras comparativas para decidir</h2>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">{COMPARISON_LINKS.filter((item) => !item.href.startsWith(path)).map((item) => <li key={item.href}><Link className="inline-flex min-h-11 items-center text-blue-700 underline dark:text-[#6aa6ff]" href={item.href}>{item.label}</Link></li>)}</ul>
        </aside>
        <footer>
          <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">Contanos qué equipo tenés y qué le pasa</h2>
          <p className="mt-4 leading-7">Te atendemos en Paraguay 2451, Recoleta, y Amenábar 2032, Belgrano. Lunes a viernes de 10:30 a 18:00. Confirmamos costo de revisión, repuesto y plazo antes de avanzar.</p>
          <ComparisonCta guideKey={guideKey} location="comparison_footer" />
        </footer>
      </article>
    </div>
  );
}
