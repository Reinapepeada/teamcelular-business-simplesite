import { IPHONE_MODELS } from "@/app/(site)/reparaciones/iphone/iphoneModels";
import { BRAND_REPAIR_PRICES, type RepairPrice } from "@/lib/repairPrices";

/**
 * Traduce el texto libre que la persona escribe en el formulario a un precio
 * de referencia.
 *
 * Marca y modelo son campos abiertos a proposito: obligar a elegir de una lista
 * corta el embudo cuando el modelo no esta cargado. Por eso el lookup es
 * tolerante y devuelve null cuando no reconoce nada, en vez de arriesgar un
 * numero equivocado.
 */

export type QuoteKind = "screen" | "battery";

export type Quote =
  | { precision: "exact"; label: string; from: number; to: number }
  | { precision: "range"; label: string; from: number; to: number };

/** Solo pantalla y bateria tienen precio de lista; el resto se cotiza al diagnosticar. */
const REPAIR_TO_KIND: Record<string, QuoteKind> = {
  Pantalla: "screen",
  Bateria: "battery",
};

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/**
 * Match por nombre mas largo primero: "iphone 13" tambien esta contenido en
 * "iphone 13 pro max", y quedarse con el primero devolveria el precio del
 * modelo equivocado.
 */
function findIphone(haystack: string) {
  const text = normalize(haystack);
  if (!text) return undefined;

  return [...IPHONE_MODELS]
    .sort((a, b) => b.name.length - a.name.length)
    .find((model) => text.includes(normalize(model.name)));
}

const BRAND_ALIASES: Record<string, keyof typeof BRAND_REPAIR_PRICES> = {
  samsung: "samsung",
  galaxy: "samsung",
  xiaomi: "xiaomi",
  redmi: "xiaomi",
  poco: "xiaomi",
  motorola: "motorola",
  moto: "motorola",
  edge: "motorola",
  razr: "motorola",
};

function findBrand(haystack: string) {
  const text = normalize(haystack);
  return Object.keys(BRAND_ALIASES).find((alias) =>
    text.split(" ").includes(alias),
  );
}

function matchesKind(price: RepairPrice, kind: QuoteKind): boolean {
  const name = normalize(price.name);
  return kind === "screen" ? name.includes("pantalla") : name.includes("bateria");
}

/**
 * Devuelve el mejor precio disponible para lo tipeado, o null si no alcanza
 * para decir algo cierto.
 */
export function lookupQuote(
  brand: string,
  model: string,
  repairTypes: string[],
): Quote | null {
  const kind = repairTypes.map((type) => REPAIR_TO_KIND[type]).find(Boolean);
  if (!kind) return null;

  const haystack = `${brand} ${model}`;

  const iphone = findIphone(haystack);
  if (iphone) {
    const price = kind === "screen" ? iphone.screen : iphone.battery;
    if (price !== null) {
      const what = kind === "screen" ? "Cambio de pantalla" : "Cambio de batería";
      return { precision: "exact", label: `${what} ${iphone.name}`, from: price, to: price };
    }
  }

  const alias = findBrand(haystack);
  if (alias) {
    const brandKey = BRAND_ALIASES[alias];
    const rows = BRAND_REPAIR_PRICES[brandKey].filter((price) =>
      matchesKind(price, kind),
    );

    if (rows.length) {
      const what = kind === "screen" ? "Cambio de pantalla" : "Cambio de batería";
      const brandLabel = brandKey.charAt(0).toUpperCase() + brandKey.slice(1);
      return {
        precision: "range",
        label: `${what} ${brandLabel}`,
        from: Math.min(...rows.map((row) => row.from)),
        to: Math.max(...rows.map((row) => row.to)),
      };
    }
  }

  return null;
}

/** Sugerencias para el datalist: modelos con precio cargado. */
export function quotableModels(): string[] {
  return [
    ...IPHONE_MODELS.map((model) => model.name),
    "Samsung Galaxy A54",
    "Samsung Galaxy S23",
    "Samsung Galaxy S24 Ultra",
    "Xiaomi Redmi Note 13",
    "Xiaomi 14",
    "POCO X6",
    "Motorola Moto G54",
    "Motorola Edge 50",
    "Motorola Razr 40",
  ];
}
