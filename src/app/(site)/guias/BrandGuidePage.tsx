import HighIntentGuidePage from "@/components/seo/HighIntentGuidePage";
import RepairPriceTable from "@/components/seo/RepairPriceTable";
import {
  type BrandGuideSlug,
  getBrandGuideConfig,
  SITE_URL,
} from "./brandGuideConfigs";

export default function BrandGuidePage({ slug }: { slug: BrandGuideSlug }) {
  const config = getBrandGuideConfig(slug);

  return (
    <>
      {config.serviceJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(config.serviceJsonLd) }}
        />
      ) : null}
    <HighIntentGuidePage
      siteUrl={SITE_URL}
      pagePath={config.pagePath}
      pageLabel={config.pageLabel}
      title={config.title}
      heroDescription={config.heroDescription}
      badge={config.badge}
      readingTime={config.readingTime}
      publishedTime={config.publishedTime}
      modifiedTime={config.modifiedTime}
      imagePath={config.imagePath}
      articleAbout={config.articleAbout}
      heroPoints={config.heroPoints}
      symptomsTitle={config.symptomsTitle}
      symptomsDescription={config.symptomsDescription}
      symptoms={config.symptoms}
      diagnosisTitle={config.diagnosisTitle}
      diagnosisDescription={config.diagnosisDescription}
      diagnostics={config.diagnostics}
      planTitle={config.planTitle}
      planDescription={config.planDescription}
      planSteps={config.planSteps}
      faq={config.faq}
      relatedLinks={config.relatedLinks}
      whatsappText={config.whatsappText}
      priceTable={
        config.repairPrices?.length ? (
          <RepairPriceTable
            brand={config.pageLabel}
            prices={config.repairPrices}
            updatedLabel="20 de agosto de 2026"
          />
        ) : null
      }
    />
    </>
  );
}
