import Link from "next/link";
import ArticleSchema from "@/components/seo/ArticleSchema";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
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
  relatedLinks,
  whatsappText,
}: HighIntentGuidePageProps) {
  const pageUrl = `${siteUrl}${pagePath}`;
  const imageUrl = toAbsoluteUrl(imagePath, siteUrl);
  const guideKey = pagePath.replace("/guias/", "").replaceAll("-", "_");
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${pageUrl}#howto`,
    name: planTitle,
    description: planDescription,
    image: imageUrl,
    step: planSteps.map((item, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: item.title,
      text: item.description,
      url: `${pageUrl}#paso-${index + 1}`,
    })),
  };

  return (
    <div className="flex w-full justify-center px-4 py-16">
      <div className="w-full max-w-6xl space-y-12">
        <ArticleSchema
          title={title}
          description={heroDescription}
          publishedTime={publishedTime}
          modifiedTime={modifiedTime}
          authorName="Team Celular"
          image={imageUrl}
          url={pageUrl}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
        />

        <BreadcrumbJsonLd
          items={[
            { name: "Inicio", url: `${siteUrl}/` },
            { name: "Guias", url: `${siteUrl}/guias` },
            { name: pageLabel, url: pageUrl },
          ]}
        />

        <nav className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <Link href="/" className="transition hover:text-primary">
            Inicio
          </Link>
          <span>/</span>
          <Link href="/guias" className="transition hover:text-primary">
            Guias
          </Link>
          <span>/</span>
          <span className="font-semibold text-slate-900 dark:text-slate-100">
            {pageLabel}
          </span>
        </nav>

        <header className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-xl dark:border-white/10 dark:bg-slate-900/85 md:p-12">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-primary/30 bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white">
              {badge}
            </span>
            <span className="rounded-full border border-slate-300/80 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-700 dark:border-white/10 dark:bg-slate-950/60 dark:text-slate-300">
              Lectura {readingTime}
            </span>
          </div>

          <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100 md:text-5xl">
            {title}
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700 dark:text-slate-300">
            {heroDescription}
          </p>

          <ul className="mt-6 grid gap-3 md:grid-cols-3">
            {heroPoints.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/90 px-4 py-3 text-sm text-slate-700 dark:border-white/10 dark:bg-slate-950/50 dark:text-slate-300"
              >
                <FaCheckCircle className="mt-0.5 text-primary" aria-hidden />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <TrackedCtaLink
              href="/presupuesto-reparacion#solicitar-presupuesto"
              ctaName={`guide_high_intent_budget_${guideKey}`}
              ctaLocation="guide_high_intent_hero"
              ctaVariant="primary"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
            >
              Pedir diagnostico y presupuesto
            </TrackedCtaLink>
            <TrackedCtaLink
              href={`https://wa.me/5491151034595?text=${encodeURIComponent(whatsappText)}`}
              ctaName={`guide_high_intent_whatsapp_${guideKey}`}
              ctaLocation="guide_high_intent_hero"
              ctaVariant="whatsapp"
              external
              target="_blank"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              <FaWhatsapp aria-hidden />
              Hablar por WhatsApp
            </TrackedCtaLink>
          </div>
        </header>

        <section className="space-y-5">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              {symptomsTitle}
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              {symptomsDescription}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {symptoms.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900/80"
              >
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
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
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                {diagnosisTitle}
              </h2>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                {diagnosisDescription}
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {diagnostics.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900/80"
              >
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-5 rounded-3xl border border-slate-200/80 bg-slate-50/90 p-8 dark:border-white/10 dark:bg-slate-950/45">
          <div className="flex items-start gap-3">
            <FaClipboardList className="mt-1 text-2xl text-secondary" aria-hidden />
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                {planTitle}
              </h2>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                {planDescription}
              </p>
            </div>
          </div>

          <ol className="grid gap-4 md:grid-cols-2">
            {planSteps.map((item, index) => (
              <li
                key={item.title}
                id={`paso-${index + 1}`}
                className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900/85"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  Paso {index + 1}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <FaQuestionCircle className="text-2xl text-primary" aria-hidden />
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              Preguntas frecuentes
            </h2>
          </div>

          <div className="space-y-3">
            {faq.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-white/10 dark:bg-slate-900/85"
              >
                <summary className="cursor-pointer list-none text-base font-semibold text-slate-900 transition group-open:text-primary dark:text-slate-100">
                  {item.question}
                </summary>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-slate-900/85">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Guias relacionadas para seguir evaluando
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {relatedLinks.map((link, index) => (
              <TrackedCtaLink
                key={link.href}
                href={link.href}
                ctaName={`guide_high_intent_related_${guideKey}_${index + 1}`}
                ctaLocation="guide_high_intent_related"
                ctaVariant="secondary"
                className="inline-flex min-h-10 items-center rounded-full border border-slate-300/80 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-primary/40 hover:text-primary dark:border-slate-600/70 dark:bg-slate-900 dark:text-slate-200"
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
