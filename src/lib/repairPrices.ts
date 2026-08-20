/**
 * Precios de referencia por marca y gama, en ARS.
 *
 * Fuente: lista de mostrador de Team Celular. Solo se cargan marcas con
 * precios confirmados: sin dato real no se emite tabla ni Offer, porque un
 * precio inventado en structured data es peor que no tenerlo.
 *
 * Actualizado: agosto de 2026.
 */
export const PRICES_UPDATED = "2026-08-20T00:00:00Z";

export type RepairPrice = { name: string; from: number; to: number };

export const BRAND_REPAIR_PRICES: Record<string, RepairPrice[]> = {
  samsung: [
    { name: "Cambio de pantalla Galaxy A / M", from: 99900, to: 399900 },
    { name: "Cambio de pantalla Galaxy S / Ultra", from: 299900, to: 1199900 },
    { name: "Cambio de bateria Galaxy A / M", from: 89900, to: 179900 },
    { name: "Cambio de bateria Galaxy S / Ultra", from: 119900, to: 219900 },
  ],
  xiaomi: [
    { name: "Cambio de pantalla Redmi / Note / Poco", from: 99900, to: 349900 },
    { name: "Cambio de pantalla OLED alta gama", from: 249900, to: 599900 },
    { name: "Cambio de bateria Redmi / Note / Poco", from: 89900, to: 179900 },
    { name: "Cambio de bateria alta gama", from: 119900, to: 229900 },
  ],
  motorola: [
    { name: "Cambio de pantalla Moto E / G", from: 99900, to: 199900 },
    { name: "Cambio de pantalla Edge", from: 299900, to: 599900 },
    { name: "Cambio de pantalla Razr", from: 999900, to: 1399900 },
    { name: "Cambio de bateria Moto E / G", from: 89900, to: 169900 },
    { name: "Cambio de bateria Edge / Razr", from: 119900, to: 229900 },
  ],
};

const ARS = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

export function formatArsPrice(value: number): string {
  return ARS.format(value);
}

export function priceRangeOf(prices: RepairPrice[]): { low: number; high: number } {
  const all = prices.flatMap((p) => [p.from, p.to]);
  return { low: Math.min(...all), high: Math.max(...all) };
}

/** AggregateOffer + catalogo. Rango porque el precio depende del modelo. */
export function buildPriceOffers(prices: RepairPrice[], brand: string) {
  const { low, high } = priceRangeOf(prices);

  return {
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "ARS",
      lowPrice: low,
      highPrice: high,
      offerCount: prices.length,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Reparaciones para ${brand}`,
      itemListElement: prices.map((price) => ({
        "@type": "Offer",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "ARS",
          minPrice: price.from,
          maxPrice: price.to,
        },
        itemOffered: { "@type": "Service", name: `${price.name} ${brand}` },
      })),
    },
  };
}
