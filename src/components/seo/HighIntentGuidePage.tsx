import type { ReactNode } from "react";
import Link from "next/link";
import { BsPlus, BsWhatsapp } from "react-icons/bs";
import ArticleSchema from "@/components/seo/ArticleSchema";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import GuideByline from "@/components/seo/GuideByline";
import TrackedCtaLink from "@/components/cro/TrackedCtaLink";
import RepairFaqList from "@/components/repairs/RepairFaqList";

export interface GuideItem { title: string; description: string }
export interface GuideFaqItem { question: string; answer: string }
export interface GuideRelatedLink { href: string; label: string }

interface HighIntentGuidePageProps {
  siteUrl: string;
  pagePath: string;
  pageLabel: string;
  title: string;
  heroDescription: string;
  heroSummary?: string;
  commercialNote?: string;
  badge: string;
  readingTime: string;
  publishedTime: string;
  modifiedTime: string;
  imagePath: string;
  articleAbout?: string[];
  heroPoints: string[];
  symptomsTitle: string;
  symptomsDescription: string;
  symptoms: GuideItem[];
  diagnosisTitle: string;
  diagnosisDescription: string;
  diagnostics: GuideItem[];
  planTitle: string;
  planDescription: string;
  planSteps: GuideItem[];
  faq: GuideFaqItem[];
  priceTable?: ReactNode;
  priceTablePosition?: "after-plan" | "after-hero";
  heroActions?: ReactNode;
  relatedLinks: GuideRelatedLink[];
  whatsappText: string;
}

function GuideSection({ title, description, items, steps = false }: {
  title: string; description: string; items: GuideItem[]; steps?: boolean;
}) {
  const List = steps ? "ol" : "ul";
  return (
    <section>
      <h2 className="tc-heading !text-[clamp(1.5rem,3.5vw,2.25rem)]">{title}</h2>
      <p className="mt-3 max-w-[65ch] text-[16px] leading-relaxed text-[#a1a1a6]">{description}</p>
      <List className="mt-5 divide-y divide-[#333336] border-y border-[#333336]">
        {items.map((item, index) => (
          <li key={item.title} id={steps ? `paso-${index + 1}` : undefined}>
            <details className="group py-4">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-5 rounded-lg [&::-webkit-details-marker]:hidden">
                <h3 className="text-[17px] font-semibold leading-snug text-[#f5f5f7]">{steps ? `${index + 1}. ` : ""}{item.title}</h3>
                <BsPlus aria-hidden className="h-5 w-5 shrink-0 text-[#a1a1a6] transition-transform group-open:rotate-45 motion-reduce:transition-none" />
              </summary>
              <p className="mt-3 max-w-[65ch] text-[16px] leading-relaxed text-[#a1a1a6]">{item.description}</p>
            </details>
          </li>
        ))}
      </List>
    </section>
  );
}

export default function HighIntentGuidePage({
  siteUrl, pagePath, pageLabel, title, heroDescription, heroSummary, commercialNote,
  readingTime, publishedTime, modifiedTime, imagePath, articleAbout, heroPoints,
  symptomsTitle, symptomsDescription, symptoms, diagnosisTitle, diagnosisDescription,
  diagnostics, planTitle, planDescription, planSteps, faq, priceTable,
  priceTablePosition = "after-plan", heroActions, relatedLinks, whatsappText,
}: HighIntentGuidePageProps) {
  const pageUrl = `${siteUrl}${pagePath}`;
  const imageUrl = imagePath.startsWith("http") ? imagePath : `${siteUrl}${imagePath}`;
  const uniqueRelatedLinks = relatedLinks.filter((link, index, links) => links.findIndex(candidate => candidate.href === link.href) === index);
  const guideKey = pagePath.replace("/guias/", "").replaceAll("-", "_");
  return (
    <article className="mx-auto w-full max-w-[1100px] space-y-10 bg-black px-4 py-8 text-[#f5f5f7] sm:px-6 sm:py-12">
      <ArticleSchema title={title} description={heroDescription} publishedTime={publishedTime} modifiedTime={modifiedTime} image={imageUrl} url={pageUrl} about={articleAbout} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage", "@id": `${pageUrl}#faq`,
        mainEntity: faq.map(item => ({ "@type": "Question", name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer } })),
      }) }} />
      <BreadcrumbJsonLd items={[{ name: "Inicio", url: `${siteUrl}/` }, { name: "Guías", url: `${siteUrl}/guias` }, { name: pageLabel, url: pageUrl }]} />
      <nav aria-label="Ruta de navegación" className="flex flex-wrap items-center gap-2 text-sm text-[#a1a1a6]">
        <Link href="/" className="tc-link inline-flex min-h-11 items-center">Inicio</Link>
        <span aria-hidden>/</span>
        <Link href="/guias" className="tc-link inline-flex min-h-11 items-center">Guías</Link>
        <span aria-hidden>/</span><span aria-current="page">{pageLabel}</span>
      </nav>
      <header className="max-w-[850px]">
        <h1 className="text-balance text-[clamp(1.75rem,4.5vw,3.5rem)] font-semibold leading-[1.12] tracking-[-0.025em]">{title}</h1>
        <p className="mt-5 max-w-[65ch] text-[17px] leading-relaxed text-[#a1a1a6]">{heroSummary ?? heroDescription}</p>
        {heroActions ?? <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <TrackedCtaLink href="/presupuesto-reparacion#solicitar-presupuesto" ctaName={`guide_high_intent_budget_${guideKey}`} ctaLocation="guide_high_intent_hero" ctaVariant="primary" className="tc-btn tc-btn-primary">
            Pedir diagnóstico y presupuesto
          </TrackedCtaLink>
          <TrackedCtaLink href={`https://wa.me/5491151034595?text=${encodeURIComponent(whatsappText)}`} ctaName={`guide_high_intent_whatsapp_${guideKey}`} ctaLocation="guide_high_intent_hero" ctaVariant="whatsapp" external target="_blank" className="tc-link inline-flex min-h-11 items-center justify-center gap-2 px-2 sm:justify-start">
            <BsWhatsapp aria-hidden /> Hablar por WhatsApp
          </TrackedCtaLink>
        </div>}
        {commercialNote && <p className="mt-5 max-w-[65ch] text-sm leading-6 text-[#c7c7cc]">{commercialNote}</p>}
        <ul className="mt-5 space-y-2 border-t border-[#333336] pt-5 text-sm leading-6 text-[#a1a1a6]">
          {heroPoints.map(point => <li key={point}>{point}</li>)}
        </ul>
        {heroSummary && <details className="mt-4 group">
          <summary className="tc-link inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg">Alcance del servicio <BsPlus aria-hidden className="group-open:rotate-45" /></summary>
          <p className="mt-2 max-w-[65ch] text-[16px] leading-relaxed text-[#a1a1a6]">{heroDescription}</p>
        </details>}
        <div className="mt-5"><GuideByline modifiedTime={modifiedTime} /><p className="mt-1 text-xs text-[#a1a1a6]">Lectura {readingTime}</p></div>
      </header>
      {priceTablePosition === "after-hero" && priceTable}
      <GuideSection title={symptomsTitle} description={symptomsDescription} items={symptoms} />
      <GuideSection title={diagnosisTitle} description={diagnosisDescription} items={diagnostics} />
      <GuideSection title={planTitle} description={planDescription} items={planSteps} steps />
      {priceTablePosition === "after-plan" && priceTable}
      <section><h2 className="tc-heading !text-[clamp(1.5rem,3.5vw,2.25rem)]">Preguntas frecuentes</h2><div className="mt-5"><RepairFaqList items={faq} /></div></section>
      <section className="border-t border-[#333336] pt-6">
        <h2 className="text-xl font-semibold">Guías relacionadas para seguir evaluando</h2>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          {uniqueRelatedLinks.map((link, index) => <li key={link.href}><TrackedCtaLink href={link.href} ctaName={`guide_high_intent_related_${guideKey}_${index}`} ctaLocation="guide_high_intent_related" ctaVariant="secondary" className="tc-link inline-flex min-h-11 items-center">{link.label}</TrackedCtaLink></li>)}
        </ul>
      </section>
    </article>
  );
}
