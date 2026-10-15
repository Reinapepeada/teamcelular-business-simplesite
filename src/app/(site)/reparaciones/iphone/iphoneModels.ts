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
export const IPHONE_CONTENT_REVIEWED = "15 de octubre de 2026";

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
 * Datos del equipo original y orientación por falla. La ficha de Apple describe
 * el hardware de fábrica, no la calidad ni la disponibilidad del repuesto.
 */
export interface IphoneModelNotes {
  summary: string;
  specsUrl: string;
  /** Tecnología del panel: define el repuesto y el precio del módulo. */
  panel: string;
  /** Puerto de carga: define el repuesto del pin. */
  port: string;
  /** 2-4 particularidades reales del modelo en el taller. */
  notes: string[];
}

export const IPHONE_MODEL_NOTES: Record<string, IphoneModelNotes> = {
  "11": {
    summary: "El iPhone 11 usa una pantalla LCD de 6,1 pulgadas, a diferencia de los modelos OLED de esta lista. Si el vidrio está roto, la imagen tiene manchas o el táctil falla, necesitás cotizar el módulo específico del 11, no el del 11 Pro.",
    specsUrl: "https://support.apple.com/es-la/111865",
    panel: 'LCD IPS de 6,1"',
    port: "Lightning",
    notes: [
      "Vidrio, imagen y táctil: cambiamos el módulo completo. Contanos si todavía muestra imagen y si responde al toque; son dos datos distintos para revisar el daño antes de abrirlo.",
      "Batería y carga: este modelo tiene conector Lightning y admite carga inalámbrica Qi. Si carga de forma inalámbrica pero no por cable, contanos esa diferencia para revisar el recorrido de carga; no alcanza para decidir que hay que cambiar la batería.",
      "Cámara trasera: tiene dos cámaras de 12 MP, con gran angular y ultra gran angular. Si una imagen sale bien y la otra no, indicá en cuál ocurre. El vidrio exterior del lente y el módulo de cámara se presupuestan por separado.",
    ],
  },
  "12": {
    summary: "El iPhone 12 lleva pantalla OLED de 6,1 pulgadas, frente Ceramic Shield y carga MagSafe. Que tenga el mismo tamaño de pantalla que el iPhone 11 no significa que use el mismo repuesto. Para cotizar, distinguimos daño de pantalla, batería y carga por Lightning.",
    specsUrl: "https://support.apple.com/es-la/111876",
    panel: 'OLED Super Retina XDR de 6,1" con Ceramic Shield',
    port: "Lightning",
    notes: [
      "Pantalla OLED y Ceramic Shield: el vidrio frontal forma parte del conjunto que revisamos. Antes de instalar, aclaramos la tecnología del módulo disponible y las diferencias de brillo, color y True Tone respecto de la pantalla original.",
      "Carga por cable o MagSafe: el iPhone 12 admite ambos sistemas. Decinos si falla uno solo, los dos o si carga pero se descarga rápido; cada síntoma requiere una revisión distinta del puerto, la batería o la placa.",
      "Sin servicio: este equipo admite 5G, pero una pérdida de señal no confirma por sí sola una falla de módem. Revisamos la línea, la configuración y el equipo antes de presupuestar una intervención en placa.",
    ],
  },
  "13": {
    summary: "El iPhone 13 combina pantalla OLED de 6,1 pulgadas y dos cámaras traseras. Es distinto del 13 mini y del 13 Pro: el nombre completo importa al pedir pantalla, batería o cámara. Si ya fue reparado, contanos qué pieza se cambió y qué dejó de funcionar.",
    specsUrl: "https://support.apple.com/es-la/111872",
    panel: 'OLED Super Retina XDR de 6,1"',
    port: "Lightning",
    notes: [
      "Pantalla y Face ID: probamos el reconocimiento facial antes y después del trabajo. El estado de los sensores, la versión de iOS y el repuesto influyen en el resultado; no prometemos conservar funciones mediante una transferencia de chip en todos los casos.",
      "Aviso de pieza: si aparece después de una reparación anterior, mandanos el mensaje exacto del historial de piezas. El aviso, la ausencia de True Tone y una falla de Face ID son situaciones distintas y se revisan por separado.",
      "Cámara y batería: la cámara principal tiene estabilización por desplazamiento del sensor. Si la imagen tiembla o no enfoca, indicá si ocurre en foto, video o ambos. Si el problema es autonomía, pasanos la salud de batería y si se apaga o solamente dura menos.",
    ],
  },
  "13-mini": {
    summary: "El iPhone 13 mini usa una pantalla OLED de 5,4 pulgadas. Sus repuestos se cotizan por separado de los del iPhone 13 de 6,1 pulgadas, aunque compartan generación.",
    specsUrl: "https://support.apple.com/es-la/111873",
    panel: 'OLED Super Retina XDR de 5,4"',
    port: "Lightning",
    notes: [
      "Pantalla compacta: confirmá que en Ajustes figure iPhone 13 mini antes de pedir el módulo. No corresponde usar el precio ni la pieza del iPhone 13 común.",
      "Autonomía: mirá la salud de batería y contanos si se apaga con carga o si llega a cero más rápido. Medimos el consumo antes de decidir si necesita batería o revisión de otra falla.",
      "Face ID y True Tone se prueban por separado. Aclaramos qué funciones conserva el repuesto disponible y si requiere calibración, según el estado del equipo y la versión de iOS.",
    ],
  },
  "13-pro": {
    summary: "El iPhone 13 Pro tiene pantalla OLED de 6,1 pulgadas con ProMotion hasta 120 Hz, tres cámaras traseras y LiDAR. El módulo de pantalla se cotiza como Pro, no como iPhone 13 común.",
    specsUrl: "https://support.apple.com/es-la/111871",
    panel: 'OLED Super Retina XDR de 6,1" con ProMotion a 120 Hz',
    port: "Lightning",
    notes: [
      "ProMotion: antes del cambio de pantalla aclaramos si el módulo disponible soporta la frecuencia variable del equipo original y qué diferencia hay en el presupuesto.",
      "Face ID y True Tone: comprobamos cómo funcionan al recibirlo. El repuesto y la calibración disponible condicionan el resultado; no damos una garantía universal de conservación por transferir un chip.",
      "Cámaras: contanos si falla el gran angular, el ultra gran angular o el teleobjetivo. Un lente exterior roto no obliga por sí solo a reemplazar las tres cámaras.",
    ],
  },
  "14": {
    summary: "El iPhone 14 tiene pantalla OLED de 6,1 pulgadas y dos cámaras traseras. Para pedir un repuesto hay que distinguirlo del 14 Plus y de los modelos Pro.",
    specsUrl: "https://support.apple.com/es-la/111850",
    panel: 'OLED Super Retina XDR de 6,1"',
    port: "Lightning",
    notes: [
      "Pantalla: usa OLED Super Retina XDR; no es el módulo con Dynamic Island de los modelos Pro. Confirmamos repuesto y funciones antes de presupuestar.",
      "Tapa o batería: si la parte trasera está rota o levantada, contanos si hubo un golpe o si se abrió sola. Primero se revisa el equipo antes de cambiar o volver a pegar la tapa.",
      "Face ID y True Tone: se prueban al ingreso y a la entrega. El alcance de la calibración depende del repuesto y del estado del equipo; no se promete resolver cualquier falla transfiriendo el chip de pantalla.",
    ],
  },
  "14-pro": {
    summary: "El iPhone 14 Pro usa una pantalla OLED de 6,1 pulgadas con Dynamic Island, ProMotion y pantalla siempre activa. Su cámara principal es de 48 MP. Antes de cotizar, necesitamos saber si falla la imagen, el táctil, Face ID o una cámara concreta.",
    specsUrl: "https://support.apple.com/es-la/111849",
    panel: 'OLED de 6,1" con Dynamic Island y ProMotion a 120 Hz',
    port: "Lightning",
    notes: [
      "Dynamic Island y Face ID: el recorte de pantalla no es lo mismo que el sistema de reconocimiento facial. Si la imagen funciona pero Face ID no, contanos ese síntoma para revisar los sensores antes de ofrecer un módulo nuevo.",
      "ProMotion y pantalla siempre activa: forman parte del equipo original. Preguntá qué funciones conserva la pantalla ofrecida; el precio publicado no describe por sí solo todas las prestaciones del repuesto.",
      "Cámara principal de 48 MP: tiene estabilización óptica por desplazamiento del sensor de segunda generación. Si tiembla, hace ruido o no enfoca, revisamos la cámara y su conexión antes de cotizar. No se puede confirmar la pieza averiada solo por el síntoma.",
    ],
  },
  "14-pro-max": {
    summary: "El iPhone 14 Pro Max lleva pantalla OLED de 6,7 pulgadas con Dynamic Island y ProMotion. Es más grande que el 14 Pro de 6,1 pulgadas: aunque compartan funciones, no usan el mismo módulo de pantalla ni el mismo precio de reparación.",
    specsUrl: "https://support.apple.com/es-la/111846",
    panel: 'OLED de 6,7" con Dynamic Island y ProMotion a 120 Hz',
    port: "Lightning",
    notes: [
      "Pantalla de 6,7 pulgadas: si aparecen líneas, manchas o zonas sin táctil, contanos si empezó después de un golpe. Verificamos el panel y las conexiones antes de instalar; aclaramos soporte de ProMotion, brillo y pantalla siempre activa del repuesto.",
      "Batería y autonomía: indicá la salud de batería y si calienta, se apaga o pierde carga estando en reposo. El tamaño del Pro Max no permite descartar desgaste de batería ni confirmar una falla de placa sin medirlo.",
      "Cámara principal de 48 MP y teleobjetivo: señalá en qué aumento aparece la falla y si pasa también al grabar. El diagnóstico de cámara se cotiza por separado de pantalla y batería.",
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
