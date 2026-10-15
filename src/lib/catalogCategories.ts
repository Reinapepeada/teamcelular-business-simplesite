import { slugify } from "./productSlug";

const CATEGORY_CONTENT: Record<string, { title: string; description: string; buyingAdvice: string; relatedSlugs: string[] }> = {
  adaptador: {
    buyingAdvice: "Para conectar una pantalla por HDMI, revisá si el USB-C de tu equipo admite salida de video. Si también necesitás cargarlo, comprobá la entrada de alimentación del hub y el cargador que requiere.",
    relatedSlugs: ["cable"],
    title: "Adaptadores y hubs",
    description: "Revisá qué puertos tiene tu equipo y qué necesitás conectar: una pantalla, una red o un accesorio USB. Confirmá la compatibilidad de video y datos antes de elegir un adaptador.",
  },
  auricular: {
    buyingAdvice: "Comprobá que el conector coincida con el de tu celular. Si lo usás para llamadas, revisá el micrófono y los controles en la ficha; el mismo tipo de puerto no garantiza todas las funciones.",
    relatedSlugs: ["auricular-bt"],
    title: "Auriculares con cable",
    description: "Elegí el conector que admite tu celular y revisá si necesitás micrófono para llamadas. Un auricular USB-C no funciona necesariamente en todos los equipos con ese puerto.",
  },
  "auricular-bt": {
    buyingAdvice: "Compará el ajuste: un modelo de clip abierto deja el canal auditivo libre. Revisá por separado la autonomía por carga y la del estuche. La reducción de ruido del micrófono en llamadas no equivale a cancelación activa para escuchar música.",
    relatedSlugs: ["auricular"],
    title: "Auriculares Bluetooth",
    description: "Compará el formato de uso y las funciones de llamadas de cada modelo. Los auriculares que se colocan dentro del oído y los de clip abierto tienen un ajuste distinto.",
  },
  cable: {
    buyingAdvice: "Elegí los conectores de ambos extremos según tu equipo y cargador. Para cargar, revisá la potencia admitida; para una pantalla, la compatibilidad de video. Comprobá también el largo y qué accesorios incluye la caja.",
    relatedSlugs: ["cargador", "adaptador"],
    title: "Cables para celulares",
    description: "Comprobá el conector de ambos extremos, el largo y la potencia admitida. Un cable para cargar no siempre transmite video; revisá la ficha según el uso que necesitás.",
  },
  cargador: {
    buyingAdvice: "Revisá la potencia y el protocolo que admite tu equipo, además del cable incluido. Si tiene varios puertos, consultá cómo reparte la potencia al usarlos juntos. Para el auto o carga inalámbrica, elegí un modelo destinado a ese uso.",
    relatedSlugs: ["cable", "power-bank"],
    title: "Cargadores para celulares",
    description: "La potencia y el protocolo de carga deben ser compatibles con tu celular. Revisá también si el modelo incluye cable y si es para enchufe, auto o carga inalámbrica.",
  },
  "cargador-portatil": {
    buyingAdvice: "Además de los mAh, revisá las salidas, la potencia y el peso. Confirmá si necesitás un cable aparte y cómo se recarga la batería externa. Compará las especificaciones del modelo, sin asumir una cantidad fija de cargas.",
    relatedSlugs: ["power-bank", "cable"],
    title: "Cargadores portátiles",
    description: "Para cargar fuera de casa, compará capacidad, peso y puertos de salida. Revisá la potencia que admite cada modelo y qué cable necesitás para conectarlo al celular.",
  },
  "power-bank": {
    buyingAdvice: "Revisá los conectores y la potencia de entrada y salida, no solo la capacidad. Compará el tamaño según dónde la vas a llevar y confirmá si incluye cable. Para cargarla en casa, necesitás un cargador compatible.",
    relatedSlugs: ["cargador-portatil", "cargador"],
    title: "Power banks",
    description: "Consultá la capacidad y las entradas y salidas de cada batería externa. Los mAh publicados no equivalen directamente a una cantidad fija de cargas: también influyen tu equipo y las pérdidas de conversión.",
  },
};

export function getCategoryContent(name: string) {
  const slug = slugify(name);
  return Object.hasOwn(CATEGORY_CONTENT, slug) ? CATEGORY_CONTENT[slug] : {
    title: name.trim(),
    buyingAdvice: "Revisá el modelo, la condición, la garantía y las opciones de entrega que figuran en cada ficha. Consultanos si necesitás confirmar la compatibilidad antes de pagar.",
    relatedSlugs: [],
    description: "Consultá las características de cada producto y confirmá la compatibilidad con tu equipo antes de comprar.",
  };
}
