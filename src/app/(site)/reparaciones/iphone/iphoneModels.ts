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

/**
 * Particularidades de reparación por modelo. Sin esto las 8 páginas por modelo
 * son la misma plantilla con otro nombre y otro precio: ~96% de tokens
 * compartidos, que es exactamente el patrón que Google colapsa en una sola URL.
 *
 * Solo datos de hardware verificables que cambian el trabajo o el presupuesto.
 * Si un modelo no tiene nada propio que decir, no merece página propia.
 */
export interface IphoneModelNotes {
  /** Tecnología del panel: define el repuesto y el precio del módulo. */
  panel: string;
  /** Puerto de carga: define el repuesto del pin. */
  port: string;
  /** 2-4 particularidades reales del modelo en el taller. */
  notes: string[];
}

export const IPHONE_MODEL_NOTES: Record<string, IphoneModelNotes> = {
  "11": {
    panel: 'LCD IPS de 6,1"',
    port: "Lightning",
    notes: [
      "Es el único de esta lista con panel LCD y no OLED, por eso el módulo es el más barato del catálogo. También significa que un golpe fuerte suele romper el vidrio y el LCD juntos: no hay cambio de vidrio suelto que valga la pena.",
      "Por antigüedad, la mayoría de los iPhone 11 que entran al taller llegan con la batería por debajo del 80% de capacidad. Antes de cotizar medimos el consumo real, porque un equipo que se apaga al 30% puede ser batería o puede ser placa.",
      "La tapa trasera es de vidrio y se rompe seguido. Se cambia, pero es un trabajo aparte del de pantalla y se presupuesta por separado.",
    ],
  },
  "12": {
    panel: 'OLED Super Retina XDR de 6,1" con Ceramic Shield',
    port: "Lightning",
    notes: [
      "Estrena Ceramic Shield y MagSafe: el módulo trae los imanes y los sensores asociados, así que el repuesto es más caro que el de un iPhone 11 aunque el tamaño de pantalla sea el mismo.",
      "Es el modelo de la serie donde más vemos fallas de señal y de módem. Cuando entra un iPhone 12 con 'Sin servicio' intermitente, primero descartamos antena y placa: cambiar la pantalla no lo arregla y no queremos cobrarte un trabajo que no resuelve nada.",
      "El flex de Face ID corre por debajo del módulo y es sensible al desarme. Se transfiere con el equipo apoyado, nunca colgando de los cables.",
    ],
  },
  "13": {
    panel: 'OLED Super Retina XDR de 6,1"',
    port: "Lightning",
    notes: [
      "Apple emparejó el Face ID con la pantalla en esta generación: si se cambia el módulo sin transferir el chip original por microsoldadura, el Face ID deja de funcionar. Nosotros hacemos esa transferencia, así que salís con Face ID andando. Es la pregunta número uno que recibimos sobre este modelo.",
      "Por el mismo emparejamiento, un cambio de pantalla mal hecho en otro lado suele llegarnos con Face ID muerto y el mensaje de pantalla no genuina. En muchos casos se recupera, pero conviene revisarlo antes de que el equipo acumule intentos.",
      "La batería es de las que mejor aguantan de la serie: si tu iPhone 13 dura poco, vale medir consumo antes de asumir que es la batería.",
    ],
  },
  "13-mini": {
    panel: 'OLED Super Retina XDR de 5,4"',
    port: "Lightning",
    notes: [
      "Es el iPhone con la batería más chica de todo el catálogo que reparamos. Eso hace que la degradación se note mucho antes que en un modelo grande: a los dos años, la diferencia de autonomía es evidente aunque la salud de batería todavía marque un número aceptable.",
      "Comparte con el iPhone 13 el emparejamiento de Face ID con la pantalla, así que el cambio de módulo también lleva transferencia del chip por microsoldadura.",
      "Al ser un equipo compacto, todo adentro está más apretado: el desarme lleva más cuidado y por eso el tiempo de pantalla se va al borde alto de las 2 a 4 horas.",
    ],
  },
  "13-pro": {
    panel: 'OLED Super Retina XDR de 6,1" con ProMotion a 120 Hz',
    port: "Lightning",
    notes: [
      "Tiene ProMotion, la pantalla de frecuencia variable hasta 120 Hz. Un módulo que no la soporta se ve fluido al principio pero pierde el refresco alto, y esa es la queja típica de quien cambió la pantalla barato en otro lado.",
      "También lleva el emparejamiento de Face ID con el módulo, con la misma transferencia por microsoldadura que el iPhone 13.",
      "El bloque de tres cámaras con LiDAR es más pesado y más caro de reemplazar. Si el golpe fue en la parte trasera, conviene diagnosticar antes de cotizar: a veces el vidrio del lente se cambia solo y no hace falta el módulo entero.",
    ],
  },
  "14": {
    panel: 'OLED Super Retina XDR de 6,1"',
    port: "Lightning",
    notes: [
      "Es el modelo donde Apple rediseñó el interior: la tapa trasera se saca desde atrás en lugar de tener que abrir todo el equipo desde la pantalla. En la práctica, cambiar el vidrio trasero de un iPhone 14 sale bastante menos que en un iPhone 13, que es la misma reparación con mucho más trabajo.",
      "Ese mismo rediseño hace que el acceso a batería sea más directo, así que la reparación cae en el borde bajo de la ventana de 1 a 2 horas.",
      "La pantalla sigue emparejada con Face ID, así que el cambio de módulo lleva transferencia del chip original.",
    ],
  },
  "14-pro": {
    panel: 'OLED de 6,1" con Dynamic Island y ProMotion a 120 Hz',
    port: "Lightning",
    notes: [
      "Estrena la Dynamic Island: el recorte deja de ser un notch fijo y pasa a integrar sensores de Face ID y cámara frontal en una zona activa. El módulo es específico de este modelo y no es intercambiable con el del iPhone 14 común.",
      "Lleva ProMotion hasta 120 Hz, así que un módulo genérico sin soporte de frecuencia variable se nota al usarlo.",
      "La cámara principal de 48 MP con estabilización es el módulo más caro de la generación. Cuando llega con la imagen temblorosa o con ruido al grabar, casi siempre es el estabilizador y no el sensor.",
    ],
  },
  "14-pro-max": {
    panel: 'OLED de 6,7" con Dynamic Island y ProMotion a 120 Hz',
    port: "Lightning",
    notes: [
      "Es la pantalla más cara que reparamos de la serie 14: 6,7 pulgadas, OLED, ProMotion y Dynamic Island en el mismo módulo. Por eso conviene diagnosticar bien antes de reemplazar: si el táctil responde y solo hay líneas, a veces el problema está en el conector y no en el panel.",
      "Tiene la batería más grande de la generación. Un iPhone 14 Pro Max que dura menos que un 14 común casi nunca es un tema de capacidad: suele haber una app o un componente drenando, y eso se mide antes de cotizar.",
      "Comparte con el 14 Pro el módulo de cámara de 48 MP y su estabilizador, la reparación de cámara más frecuente de este modelo.",
    ],
  },
};

export function getIphoneModel(slug: string): IphoneModelPrice | undefined {
  return IPHONE_MODELS.find((model) => model.slug === slug);
}

export function getIphoneModelNotes(slug: string): IphoneModelNotes | undefined {
  return IPHONE_MODEL_NOTES[slug];
}

/** Formatea un precio en pesos argentinos, ej. "$249.900". */
export function formatArs(value: number): string {
  return `$${value.toLocaleString("es-AR")}`;
}

export function priceLabel(value: number | null): string {
  return value === null ? "A consultar" : formatArs(value);
}
