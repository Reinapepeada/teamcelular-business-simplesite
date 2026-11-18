/**
 * Precios por modelo de pantalla, batería y pin de carga para Samsung,
 * Motorola y Xiaomi.
 *
 * Fuente: último precio cobrado por modelo en órdenes finalizadas de Fixbee,
 * exportación del 15/11/2026. Regla acordada con el negocio:
 *  - solo órdenes del 1/8/2026 en adelante;
 *  - se excluyen los registros observados (total histórico de orden, trabajo
 *    combinado, alcance a revisar o precio en $0), las tablets y los modelos
 *    cuyo nombre en la orden es ambiguo;
 *  - si un modelo figura dos veces, queda el valor más bajo.
 *
 * Es un valor "desde": cada dato sale de una sola orden y no registra la
 * calidad del repuesto. No se publica como Offer en datos estructurados.
 */
export interface ModelScreenPrice {
  model: string;
  /** Último precio cobrado en ARS. */
  from: number;
  /** Mes del dato, AAAA-MM. */
  month: string;
}

export type ModelPriceService = "pantalla" | "batería" | "pin de carga";

export const MODEL_SCREEN_PRICES_PERIOD = "agosto a noviembre de 2026";

export const SAMSUNG_SCREEN_PRICES: ModelScreenPrice[] = [
  { model: "Galaxy A02", from: 87900, month: "2026-09" },
  { model: "Galaxy A03", from: 95000, month: "2026-10" },
  { model: "Galaxy A04", from: 69000, month: "2026-09" },
  { model: "Galaxy A06", from: 80000, month: "2026-10" },
  { model: "Galaxy A13", from: 75000, month: "2026-11" },
  { model: "Galaxy A14", from: 89000, month: "2026-08" },
  { model: "Galaxy A15", from: 204600, month: "2026-10" },
  { model: "Galaxy A16", from: 232000, month: "2026-10" },
  { model: "Galaxy A21s", from: 79500, month: "2026-10" },
  { model: "Galaxy A22 4G", from: 130000, month: "2026-10" },
  { model: "Galaxy A22 5G", from: 85000, month: "2026-11" },
  { model: "Galaxy A23", from: 125900, month: "2026-10" },
  { model: "Galaxy A24", from: 250000, month: "2026-11" },
  { model: "Galaxy A25", from: 214500, month: "2026-09" },
  { model: "Galaxy A31", from: 85000, month: "2026-08" },
  { model: "Galaxy A32", from: 159000, month: "2026-08" },
  { model: "Galaxy A34", from: 179000, month: "2026-11" },
  { model: "Galaxy A51", from: 129000, month: "2026-10" },
  { model: "Galaxy A52", from: 290000, month: "2026-10" },
  { model: "Galaxy A53 5G", from: 275000, month: "2026-10" },
  // Sin orden reciente: el negocio fijó el 15/11/2026 el último valor cobrado
  // ($250.000) más 10 %.
  { model: "Galaxy A54", from: 275000, month: "2026-11" },
  { model: "Galaxy A56", from: 370600, month: "2026-09" },
  { model: "Galaxy A70", from: 150000, month: "2026-08" },
  { model: "Galaxy M12", from: 85000, month: "2026-09" },
  { model: "Galaxy M23", from: 75000, month: "2026-09" },
  { model: "Galaxy S20 FE", from: 214500, month: "2026-09" },
  { model: "Galaxy S22 Ultra", from: 517500, month: "2026-09" },
  { model: "Galaxy S24 FE", from: 315000, month: "2026-09" },
];

// Baterías: el negocio fijó el 18/11/2026 un piso de $69.900 (BATTERY_PRICE_FLOOR).
// Se quitaron las órdenes cobradas por debajo (Galaxy A21s $39.000, Mi A2
// $65.000, Moto G56 5G y G100 $69.000): hoy no se repiten a ese precio.
export const SAMSUNG_BATTERY_PRICES: ModelScreenPrice[] = [
  { model: "Galaxy A24", from: 70000, month: "2026-08" },
  { model: "Galaxy A25", from: 92000, month: "2026-10" },
  { model: "Galaxy A53 5G", from: 85000, month: "2026-10" },
  { model: "Galaxy A54", from: 95000, month: "2026-11" },
  { model: "Galaxy Note 20", from: 126000, month: "2026-09" },
  { model: "Galaxy S20", from: 79000, month: "2026-11" },
  { model: "Galaxy S20 FE", from: 165000, month: "2026-09" },
  { model: "Galaxy S23", from: 150000, month: "2026-08" },
  { model: "Galaxy S23 FE", from: 120000, month: "2026-09" },
  { model: "Galaxy S23 Ultra", from: 149000, month: "2026-08" },
  { model: "Galaxy S24", from: 165000, month: "2026-08" },
];

export const SAMSUNG_CHARGING_PORT_PRICES: ModelScreenPrice[] = [
  { model: "Galaxy A03", from: 59000, month: "2026-11" },
  { model: "Galaxy A05", from: 79000, month: "2026-08" },
  { model: "Galaxy A12", from: 49000, month: "2026-10" },
  { model: "Galaxy A13", from: 59000, month: "2026-10" },
  { model: "Galaxy A14", from: 49000, month: "2026-09" },
  { model: "Galaxy A21s", from: 49000, month: "2026-08" },
  { model: "Galaxy A24", from: 69000, month: "2026-09" },
  { model: "Galaxy A25", from: 49000, month: "2026-08" },
  { model: "Galaxy A35", from: 69000, month: "2026-09" },
  { model: "Galaxy A54", from: 69000, month: "2026-09" },
  { model: "Galaxy A55", from: 85000, month: "2026-11" },
  { model: "Galaxy A70", from: 75000, month: "2026-11" },
  { model: "Galaxy S23 Ultra", from: 90000, month: "2026-09" },
  { model: "Galaxy S24", from: 95000, month: "2026-09" },
];

export const MOTOROLA_SCREEN_PRICES: ModelScreenPrice[] = [
  { model: "Moto G04", from: 76900, month: "2026-08" },
  { model: "Moto G05", from: 85000, month: "2026-08" },
  { model: "Moto G9 Plus", from: 75000, month: "2026-09" },
  { model: "Moto G22", from: 69900, month: "2026-09" },
  { model: "Moto G23", from: 90000, month: "2026-10" },
  { model: "Moto G24", from: 85000, month: "2026-11" },
  { model: "Moto G24 Power", from: 85000, month: "2026-10" },
  { model: "Moto G32", from: 84900, month: "2026-09" },
  { model: "Moto G56", from: 160000, month: "2026-08" },
  { model: "Moto G56 5G", from: 155000, month: "2026-09" },
  { model: "Moto G60s", from: 75000, month: "2026-09" },
  { model: "Edge 20 Pro", from: 195000, month: "2026-10" },
  { model: "Edge 30", from: 165500, month: "2026-10" },
  { model: "Edge 40", from: 351900, month: "2026-09" },
  { model: "Edge 50 Fusion", from: 254000, month: "2026-10" },
  { model: "Edge 50 Ultra", from: 399000, month: "2026-11" },
  { model: "Edge 60", from: 390000, month: "2026-09" },
  { model: "Razr 40 Ultra", from: 800000, month: "2026-09" },
];

export const MOTOROLA_BATTERY_PRICES: ModelScreenPrice[] = [
  { model: "Moto G42", from: 147000, month: "2026-10" },
  { model: "Moto G54 5G", from: 75000, month: "2026-10" },
  { model: "Edge 30 Pro", from: 120000, month: "2026-08" },
];

export const XIAOMI_SCREEN_PRICES: ModelScreenPrice[] = [
  { model: "Redmi 15C", from: 75000, month: "2026-10" },
  { model: "Redmi Note 9", from: 85000, month: "2026-10" },
  { model: "Redmi Note 10S", from: 124500, month: "2026-10" },
  { model: "Redmi Note 11", from: 161100, month: "2026-08" },
  { model: "Redmi Note 13 4G", from: 95000, month: "2026-10" },
  { model: "Redmi Note 13", from: 189000, month: "2026-10" },
];

export const XIAOMI_BATTERY_PRICES: ModelScreenPrice[] = [
  { model: "Mi 9T", from: 102000, month: "2026-09" },
  { model: "Mi 11", from: 153000, month: "2026-08" },
  { model: "Redmi Note 13", from: 105000, month: "2026-11" },
  { model: "Redmi Note 13 4G", from: 109000, month: "2026-11" },
  { model: "Redmi Note 14 Pro", from: 155000, month: "2026-08" },
  { model: "POCO C75", from: 75000, month: "2026-10" },
  { model: "POCO M6 Pro", from: 155000, month: "2026-10" },
];

export const ALL_MODEL_PRICE_TABLES: ModelScreenPrice[][] = [
  SAMSUNG_SCREEN_PRICES,
  SAMSUNG_BATTERY_PRICES,
  SAMSUNG_CHARGING_PORT_PRICES,
  MOTOROLA_SCREEN_PRICES,
  MOTOROLA_BATTERY_PRICES,
  XIAOMI_SCREEN_PRICES,
  XIAOMI_BATTERY_PRICES,
];

const MONTHS = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

/** "2026-10" → "octubre de 2026" */
export function formatPriceMonth(month: string): string {
  const [year, monthNumber] = month.split("-");
  return `${MONTHS[Number(monthNumber) - 1]} de ${year}`;
}
