/**
 * Precios públicos de reparación de iPhone. Fuente única: alimenta la tabla de
 * la guía y las páginas por modelo, para que no vuelvan a divergir.
 *
 * Solo precio de venta. Los costos de repuesto son datos internos y no se
 * publican ni se guardan acá.
 *
 * Actualizado: agosto de 2026.
 */

export const IPHONE_PRICES_UPDATED = "agosto de 2026";

export interface IphoneModelPrice {
  /** Slug de URL, ej. "14-pro-max" */
  slug: string;
  /** Nombre comercial, ej. "iPhone 14 Pro Max" */
  name: string;
  /** Precio de cambio de pantalla en ARS. null = a consultar. */
  screen: number | null;
  /** Precio de cambio de batería en ARS. null = a consultar. */
  battery: number | null;
}

export const IPHONE_MODELS: IphoneModelPrice[] = [
  { slug: "11", name: "iPhone 11", screen: 129900, battery: 99900 },
  { slug: "11-pro", name: "iPhone 11 Pro", screen: 139900, battery: 114900 },
  { slug: "11-pro-max", name: "iPhone 11 Pro Max", screen: 199900, battery: 129900 },
  { slug: "12-mini", name: "iPhone 12 Mini", screen: 149900, battery: 99900 },
  { slug: "12", name: "iPhone 12", screen: 209900, battery: 144900 },
  { slug: "12-pro", name: "iPhone 12 Pro", screen: 209900, battery: 144900 },
  { slug: "12-pro-max", name: "iPhone 12 Pro Max", screen: 219900, battery: 149900 },
  { slug: "13-mini", name: "iPhone 13 Mini", screen: 149900, battery: 99900 },
  { slug: "13", name: "iPhone 13", screen: 249900, battery: 159900 },
  { slug: "13-pro", name: "iPhone 13 Pro", screen: 269900, battery: 179900 },
  { slug: "13-pro-max", name: "iPhone 13 Pro Max", screen: 279900, battery: 189900 },
  { slug: "14", name: "iPhone 14", screen: 249900, battery: 169900 },
  { slug: "14-plus", name: "iPhone 14 Plus", screen: 259900, battery: 199900 },
  { slug: "14-pro", name: "iPhone 14 Pro", screen: 279900, battery: 209900 },
  { slug: "14-pro-max", name: "iPhone 14 Pro Max", screen: 299900, battery: 229900 },
  { slug: "15", name: "iPhone 15", screen: 319900, battery: 189900 },
  { slug: "15-plus", name: "iPhone 15 Plus", screen: 349900, battery: 219900 },
  { slug: "15-pro", name: "iPhone 15 Pro", screen: 389900, battery: 229900 },
  { slug: "15-pro-max", name: "iPhone 15 Pro Max", screen: 389900, battery: 229900 },
  { slug: "16", name: "iPhone 16", screen: 409900, battery: 194900 },
  { slug: "16-plus", name: "iPhone 16 Plus", screen: 419900, battery: 249900 },
  { slug: "16-pro", name: "iPhone 16 Pro", screen: 449900, battery: 209900 },
  { slug: "16-pro-max", name: "iPhone 16 Pro Max", screen: 589900, battery: 269900 },
  { slug: "17", name: "iPhone 17", screen: 504900, battery: null },
  { slug: "17-pro", name: "iPhone 17 Pro", screen: 579900, battery: null },
  { slug: "17-pro-max", name: "iPhone 17 Pro Max", screen: 649900, battery: null },
];

/**
 * Modelos con página propia. Se limita a los que tienen demanda medida en
 * Search Console: una página por modelo solo se justifica si alguien la busca.
 *
 * Umbral actual: 5+ impresiones en 28 días. Los 12 modelos restantes quedan
 * cubiertos por la guía general hasta que muestren demanda propia; publicar
 * los 26 seria repetir el problema de contenido delgado de /tienda.
 *
 * Impresiones al 2026-08-09: 14 Pro Max 24, 13 17, 11 16, 12 14, 14 9,
 * 13 Mini 7, 13 Pro 7, 14 Pro 5.
 */
export const IPHONE_MODELS_WITH_PAGE = [
  "11",
  "12",
  "13",
  "13-mini",
  "13-pro",
  "14",
  "14-pro",
  "14-pro-max",
] as const;

export function getIphoneModel(slug: string): IphoneModelPrice | undefined {
  return IPHONE_MODELS.find((model) => model.slug === slug);
}

/** Formatea un precio en pesos argentinos, ej. "$249.900". */
export function formatArs(value: number): string {
  return `$${value.toLocaleString("es-AR")}`;
}

export function priceLabel(value: number | null): string {
  return value === null ? "A consultar" : formatArs(value);
}
