/**
 * Precios de referencia por marca y gama, en ARS.
 *
 * Fuente: lista de mostrador de Team Celular. Solo se cargan marcas con
 * precios confirmados: sin dato real no se emite tabla ni Offer, porque un
 * precio inventado en structured data es peor que no tenerlo.
 *
 * Lista de agosto de 2026, verificada como vigente el 15/11/2026. Galaxy A / M ajustado en noviembre de 2026 a
 * lo cobrado en órdenes cerradas de Fixbee (piso: Galaxy A04 a $69.000).
 */
import { IPHONE_MODELS, lowestScreenPrice } from "@/app/(site)/reparaciones/iphone/iphoneModels";
import { SAMSUNG_CHARGING_PORT_PRICES as SAMSUNG_PIN_CHARGED_BY_MODEL } from "@/lib/modelScreenPrices";

// Fecha de la última verificación de la lista: los valores de agosto siguen
// vigentes, confirmados por el negocio el 15/11/2026.
export const PRICES_UPDATED = "2026-11-15T00:00:00Z";

/** `href`: la fila enlaza a la pagina que profundiza esa reparacion. */
export type RepairPrice = { name: string; from: number; to: number; href?: string };

/** Cambio de pin de carga, todas las marcas: el precio depende del dispositivo. */
export const CHARGING_PORT_PRICE = { from: 35000, to: 150000 };

/**
 * Cambio de pin de carga en Samsung por línea: rango intercuartil de órdenes
 * cerradas en Fixbee (nov 2025 a nov 2026, 45 cambios). El piso no baja de
 * CHARGING_PORT_PRICE.from para no contradecir el rango general. El techo sube
 * hasta cubrir el último precio cobrado de cada modelo de la línea
 * (modelScreenPrices.ts): la página de servicio y la tabla por modelo de la
 * guía de Samsung no pueden decir cosas distintas.
 */
export const SAMSUNG_CHARGING_PORT_PRICES: (RepairPrice & { models: string })[] = [
  { name: "Galaxy A de entrada", models: "A03, A04, A05, A06, A10s", from: 35000, to: 55000 },
  { name: "Galaxy A11 a A26", models: "A13, A14, A15, A21s, A24, A25", from: 45000, to: 65000 },
  { name: "Galaxy A32 a A73", models: "A34, A35, A52, A54, A55, A70", from: 55000, to: 80000 },
  { name: "Galaxy S y Note", models: "S21, S22, S23, S24, Note 10", from: 85000, to: 110000 },
].map((line) => {
  const models = line.models.split(", ");
  const charged = SAMSUNG_PIN_CHARGED_BY_MODEL
    .filter((row) => models.some((model) => row.model.replace("Galaxy ", "").startsWith(model)))
    .map((row) => row.from);
  return { ...line, to: Math.max(line.to, ...charged) };
});

/** Limpieza técnica del pin con microscopio, cuando no hace falta cambiarlo. */
export const CHARGING_PORT_CLEANING_PRICE = { from: 25000, to: 45000 };

/**
 * Revision de placa (celular o notebook): se cobra aunque no se repare y se
 * descuenta si se repara. El copy no dice quien hace el arreglo (taller u otro
 * laboratorio, segun el caso): solo precio y plazo por escrito antes de empezar.
 */
export const PLACA_REVISION_PRICE = 45000;

/** Cambio de batería más barato que se ofrece, cualquier marca (negocio, 18/11/2026). */
export const BATTERY_PRICE_FLOOR = 69900;

// El piso de cada rango es el menor precio cobrado en órdenes cerradas de
// Fixbee entre agosto y noviembre de 2026 (ver modelScreenPrices.ts).
export const BRAND_REPAIR_PRICES: Record<string, RepairPrice[]> = {
  samsung: [
    { name: "Cambio de pantalla Galaxy A / M", from: 69000, to: 399900 },
    { name: "Cambio de pantalla Galaxy S / Ultra", from: 214500, to: 1199900 },
    { name: "Cambio de bateria Galaxy A / M", from: BATTERY_PRICE_FLOOR, to: 179900 },
    { name: "Cambio de bateria Galaxy S / Ultra", from: 79000, to: 219900 },
  ],
  xiaomi: [
    { name: "Cambio de pantalla Redmi / Note / Poco", from: 75000, to: 349900 },
    { name: "Cambio de pantalla OLED alta gama", from: 249900, to: 599900 },
    { name: "Cambio de bateria Redmi / Note / Poco", from: BATTERY_PRICE_FLOOR, to: 179900 },
    { name: "Cambio de bateria alta gama", from: 119900, to: 229900 },
  ],
  motorola: [
    { name: "Cambio de pantalla Moto E / G", from: 69900, to: 199900 },
    { name: "Cambio de pantalla Edge", from: 165500, to: 599900 },
    { name: "Cambio de pantalla Razr", from: 800000, to: 1399900 },
    { name: "Cambio de bateria Moto E / G", from: BATTERY_PRICE_FLOOR, to: 169900 },
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
    ...rangeOf(IPHONE_MODELS.flatMap((m) => [lowestScreenPrice(m), m.screen])),
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
