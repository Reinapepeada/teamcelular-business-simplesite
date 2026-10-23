import HighIntentGuidePage from "@/components/seo/HighIntentGuidePage";
import RepairPriceTable from "@/components/seo/RepairPriceTable";
import { BUSINESS_PROFILE } from "@/lib/businessProfile";
import { PLACA_REVISION_PRICE, formatArsPrice } from "@/lib/repairPrices";
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
      heroSummary={`Revisamos pantalla, batería, carga y fallas de placa de ${config.brand} en Recoleta y Belgrano. Contanos el modelo y qué le pasa para confirmar si podemos repararlo y qué repuesto necesita.`}
      commercialNote={`Revisión técnica sin placa: ${BUSINESS_PROFILE.reviewCostRange}. Revisión de placa: ${formatArsPrice(PLACA_REVISION_PRICE)}, con informe en hasta 72 horas hábiles. Se cobra aunque no se repare y se descuenta si aceptás el arreglo. La reparación de placa lleva semanas; precio y plazo se confirman por escrito.`}
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
      priceTablePosition="after-hero"
    />
    </>
  );
}
