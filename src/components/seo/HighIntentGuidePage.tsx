import React from "react";
import Link from "next/link";
import Image from "next/image";
import ArticleSchema from "@/components/seo/ArticleSchema";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import GuideByline from "@/components/seo/GuideByline";
import TrackedCtaLink from "@/components/cro/TrackedCtaLink";
import {
  FaCheckCircle,
  FaClipboardList,
  FaQuestionCircle,
  FaTools,
  FaWhatsapp,
} from "react-icons/fa";

export interface GuideItem {
  title: string;
  description: string;
}

export interface GuideFaqItem {
  question: string;
  answer: string;
}

export interface GuideRelatedLink {
  href: string;
  label: string;
}

interface HighIntentGuidePageProps {
  siteUrl: string;
  pagePath: string;
  pageLabel: string;
  title: string;
  heroDescription: string;
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
  priceTable?: React.ReactNode;
  relatedLinks: GuideRelatedLink[];
  whatsappText: string;
}

function toAbsoluteUrl(pathOrUrl: string, siteUrl: string) {
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }

  return `${siteUrl}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

export default function HighIntentGuidePage({
  siteUrl,
  pagePath,
  pageLabel,
  title,
  heroDescription,
  badge,
  readingTime,
  publishedTime,
  modifiedTime,
  imagePath,
  articleAbout,
  heroPoints,
  symptomsTitle,
  symptomsDescription,
  symptoms,
  diagnosisTitle,
  diagnosisDescription,
  diagnostics,
  planTitle,
  planDescription,
  planSteps,
  faq,
  priceTable,
  relatedLinks,
  whatsappText,
}: HighIntentGuidePageProps) {
  const pageUrl = `${siteUrl}${pagePath}`;
  const imageUrl = toAbsoluteUrl(imagePath, siteUrl);
  const guideKey = pagePath.replace("/guias/", "").replaceAll("-", "_");
  return (
    <div className="flex w-full justify-center bg-[#f7f8fc] px-4 py-8 dark:bg-black sm:px-6 lg:px-8">
      <div className="w-full max-w-[100rem] space-y-10 md:space-y-16">
        <ArticleSchema
          title={title}
          description={heroDescription}
          publishedTime={publishedTime}
          modifiedTime={modifiedTime}
          image={imageUrl}
          url={pageUrl}
          about={articleAbout}
        />
        {/* Schema.org — FAQPage. Vive aca y no en cada guia: las 6 paginas que
            usan este componente tienen FAQ visible y ninguna lo emitia. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "@id": `${pageUrl}#faq`,
              mainEntity: faq.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer },
              })),
            }),
          }}
        />
        <BreadcrumbJsonLd
          items={[
            { name: "Inicio", url: `${siteUrl}/` },
            { name: "Guías", url: `${siteUrl}/guias` },
            { name: pageLabel, url: pageUrl },
          ]}
        />

        <nav className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-600 md:text-sm dark:text-[#86868b]">
          <Link href="/" className="transition hover:text-primary">
            Inicio
          </Link>
          <span>/</span>
          <Link href="/guias" className="transition hover:text-primary">
            Guías
          </Link>
          <span>/</span>
          <span className="font-semibold text-slate-900 dark:text-[#f5f5f7]">
            {pageLabel}
          </span>
        </nav>

        <header className="overflow-hidden bg-black p-5 text-white sm:p-10 lg:p-12">
          <div className="grid items-center gap-6 md:gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="liquid-glass relative rounded-xl px-3 py-1.5 text-[11px] font-semibold text-white md:px-4 md:py-2 md:text-xs">
                  {badge}
                </span>
                <span className="rounded-xl border border-white/25 px-3 py-1.5 text-[11px] font-semibold text-white/75 md:px-4 md:py-2 md:text-xs">
                  Lectura {readingTime}
                </span>
              </div>

              <h1 className="mt-5 max-w-4xl text-balance text-[28px] font-semibold leading-tight tracking-[-0.03em] text-white sm:text-4xl md:mt-7 md:text-5xl lg:text-6xl">
                {title}
              </h1>

              <p className="mt-4 max-w-3xl text-pretty text-[15px] leading-7 text-[#a1a1a6] md:mt-5 md:text-lg md:leading-8">
                {heroDescription}
              </p>

              <div className="mt-4">
                <GuideByline modifiedTime={modifiedTime} />
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <TrackedCtaLink
                  href="/presupuesto-reparacion#solicitar-presupuesto"
                  ctaName={`guide_high_intent_budget_${guideKey}`}
                  ctaLocation="guide_high_intent_hero"
                  ctaVariant="primary"
                  className="tc-btn tc-btn-primary w-full sm:w-auto"
                >
                  Pedir diagnóstico y presupuesto
                </TrackedCtaLink>
                <TrackedCtaLink
                  href={`https://wa.me/5491151034595?text=${encodeURIComponent(whatsappText)}`}
                  ctaName={`guide_high_intent_whatsapp_${guideKey}`}
                  ctaLocation="guide_high_intent_hero"
                  ctaVariant="whatsapp"
                  external
                  target="_blank"
                  className="tc-btn tc-btn-ghost w-full sm:w-auto"
                >
                  <FaWhatsapp aria-hidden />
                  Hablar por WhatsApp
                </TrackedCtaLink>
              </div>
            </div>

            <aside className="relative overflow-hidden bg-black">
              <Image
                src={imagePath}
                alt={`${pageLabel} en laboratorio Team Celular`}
                width={1200}
                height={900}
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="h-auto w-full object-cover"
                priority
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent"
              />
              <div className="liquid-glass absolute bottom-4 left-4 rounded-xl px-3 py-2 text-xs font-semibold text-white">
                Recoleta y Belgrano · CABA
              </div>
            </aside>
          </div>

          <ul className="mt-6 grid border-t border-white/15 pt-5 md:mt-8 md:pt-6 md:grid-cols-3 md:divide-x md:divide-white/15">
            {heroPoints.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 px-4 py-3 text-sm text-[#a1a1a6] first:pl-0 last:pr-0"
              >
                <FaCheckCircle className="mt-0.5 text-[#8ba7ff]" aria-hidden />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </header>

        <section className="space-y-5">
          <div>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-[1.1] text-slate-900 dark:text-[#f5f5f7]">
              {symptomsTitle}
            </h2>
            <p className="mt-2 text-slate-600 dark:text-[#a1a1a6]">
              {symptomsDescription}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {symptoms.map((item) => (
              <article
                key={item.title}
                className="bg-[#1d1d1f] rounded-[28px] p-5"
              >
                <h3 className="text-lg font-semibold text-slate-900 dark:text-[#f5f5f7]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-[#a1a1a6]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <div className="flex items-start gap-3">
            <FaTools className="mt-1 text-2xl text-primary" aria-hidden />
            <div>
              <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-[1.1] text-slate-900 dark:text-[#f5f5f7]">
                {diagnosisTitle}
              </h2>
              <p className="mt-2 text-slate-600 dark:text-[#a1a1a6]">
                {diagnosisDescription}
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {diagnostics.map((item) => (
              <article
                key={item.title}
                className="bg-[#1d1d1f] rounded-[28px] p-5"
              >
                <h3 className="text-lg font-semibold text-slate-900 dark:text-[#f5f5f7]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-[#a1a1a6]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#1d1d1f] space-y-5 rounded-[28px] p-8 dark:bg-black/45">
          <div className="flex items-start gap-3">
            <FaClipboardList className="mt-1 text-2xl text-secondary" aria-hidden />
            <div>
              <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-[1.1] text-slate-900 dark:text-[#f5f5f7]">
                {planTitle}
              </h2>
              <p className="mt-2 text-slate-600 dark:text-[#a1a1a6]">
                {planDescription}
              </p>
            </div>
          </div>

          <ol className="grid gap-4 md:grid-cols-2">
            {planSteps.map((item, index) => (
              <li
                key={item.title}
                id={`paso-${index + 1}`}
                className="bg-[#1d1d1f] rounded-[28px] p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-[#86868b]">
                  Paso {index + 1}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-[#f5f5f7]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-[#a1a1a6]">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {priceTable}

        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <FaQuestionCircle className="text-2xl text-primary" aria-hidden />
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-[1.1] text-slate-900 dark:text-[#f5f5f7]">
              Preguntas frecuentes
            </h2>
          </div>

          <div className="space-y-3">
            {faq.map((item) => (
              <details
                key={item.question}
                className="bg-[#1d1d1f] group rounded-[28px] p-5"
              >
                <summary className="flex min-h-11 items-center cursor-pointer list-none text-base font-semibold text-slate-900 transition group-open:text-primary dark:text-[#f5f5f7]">
                  {item.question}
                </summary>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-[#a1a1a6]">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="bg-[#1d1d1f] rounded-[28px] p-8">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-[#f5f5f7]">
            Guías relacionadas para seguir evaluando
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {relatedLinks.map((link, index) => (
              <TrackedCtaLink
                key={link.href}
                href={link.href}
                ctaName={`guide_high_intent_related_${guideKey}_${index + 1}`}
                ctaLocation="guide_high_intent_related"
                ctaVariant="secondary"
                className="inline-flex min-h-11 items-center rounded-full bg-[#1d1d1f] px-4 text-sm text-[#cccccc] transition hover:bg-[#333336] hover:text-white"
              >
                {link.label}
              </TrackedCtaLink>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
