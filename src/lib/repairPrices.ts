/**
 * Precios de referencia por marca y gama, en ARS.
 *
 * Fuente: lista de mostrador de Team Celular. Solo se cargan marcas con
 * precios confirmados: sin dato real no se emite tabla ni Offer, porque un
 * precio inventado en structured data es peor que no tenerlo.
 *
 * Actualizado: agosto de 2026.
 */
import { IPHONE_MODELS } from "@/app/(site)/reparaciones/iphone/iphoneModels";

export const PRICES_UPDATED = "2026-08-20T00:00:00Z";

/** `href`: la fila enlaza a la pagina que profundiza esa reparacion. */
export type RepairPrice = { name: string; from: number; to: number; href?: string };

/** Cambio de pin de carga, todas las marcas: el precio depende del dispositivo. */
export const CHARGING_PORT_PRICE = { from: 35000, to: 150000 };

/**
 * Revision de placa (celular o notebook): se cobra al dejar el equipo, no se
 * devuelve y se descuenta si se repara. Los arreglos de placa de celular los
 * hace un laboratorio externo; las placas de notebook, el taller.
 */
export const PLACA_REVISION_PRICE = 45000;

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

function rangeOf(values: (number | null)[]) {
  const known = values.filter((v): v is number => v !== null);
  return { from: Math.min(...known), to: Math.max(...known) };
}

/**
 * Las reparaciones mas pedidas, para paginas locales (zonas y sucursales).
 * Sale de las mismas fuentes que las guias: no hay un segundo precio que
 * mantener.
 */
// Se muestra en zonas y sucursales, las paginas con mas fuerza local: cada fila
// le pasa ese peso a la guia de su marca con un anchor descriptivo.
export const POPULAR_REPAIR_PRICES: RepairPrice[] = [
  {
    name: "Cambio de pantalla iPhone 11 a 17",
    ...rangeOf(IPHONE_MODELS.map((m) => m.screen)),
    href: "/guias/reparacion-iphone-buenos-aires#costos-reparacion-iphone",
  },
  {
    name: "Cambio de batería iPhone 11 a 17",
    ...rangeOf(IPHONE_MODELS.map((m) => m.battery)),
    href: "/guias/reparacion-iphone-buenos-aires#costos-reparacion-iphone",
  },
  { ...BRAND_REPAIR_PRICES.samsung[0], name: "Cambio de pantalla Samsung Galaxy A / M", href: "/guias/reparacion-samsung-buenos-aires" },
  { ...BRAND_REPAIR_PRICES.motorola[0], name: "Cambio de pantalla Motorola Moto E / G", href: "/guias/reparacion-motorola-buenos-aires" },
  { ...BRAND_REPAIR_PRICES.xiaomi[0], name: "Cambio de pantalla Xiaomi Redmi / Note / Poco", href: "/guias/reparacion-xiaomi-buenos-aires" },
  { name: "Cambio de pin de carga (todas las marcas)", ...CHARGING_PORT_PRICE, href: "/reparaciones/cambio-pin-carga-caba" },
];

export const PRICES_UPDATED_LABEL = new Date(PRICES_UPDATED).toLocaleDateString("es-AR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});
