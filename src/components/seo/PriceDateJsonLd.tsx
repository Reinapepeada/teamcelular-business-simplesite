import { businessId } from "@/lib/businessProfile";
import { PRICES_UPDATED } from "@/lib/repairPrices";

/**
 * Fecha de la lista de precios como dateModified. Solo para páginas que ya
 * muestran esa fecha en el texto: el dato estructurado repite lo visible.
 */
export default function PriceDateJsonLd({ url, name }: { url: string; name: string }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${url}#webpage`,
          url,
          name,
          isPartOf: { "@id": businessId("website") },
          dateModified: PRICES_UPDATED,
        }),
      }}
    />
  );
}
