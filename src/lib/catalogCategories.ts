import { slugify } from "./productSlug";

const CATEGORY_CONTENT: Record<string, { title: string; description: string }> = {
  adaptador: {
    title: "Adaptadores y hubs",
    description: "Revisá qué puertos tiene tu equipo y qué necesitás conectar: una pantalla, una red o un accesorio USB. Confirmá la compatibilidad de video y datos antes de elegir un adaptador.",
  },
  auricular: {
    title: "Auriculares con cable",
    description: "Elegí el conector que admite tu celular y revisá si necesitás micrófono para llamadas. Un auricular USB-C no funciona necesariamente en todos los equipos con ese puerto.",
  },
  "auricular-bt": {
    title: "Auriculares Bluetooth",
    description: "Compará el formato de uso y las funciones de llamadas de cada modelo. Los auriculares que se colocan dentro del oído y los de clip abierto tienen un ajuste distinto.",
  },
  cable: {
    title: "Cables para celulares",
    description: "Comprobá el conector de ambos extremos, el largo y la potencia admitida. Un cable para cargar no siempre transmite video; revisá la ficha según el uso que necesitás.",
  },
  cargador: {
    title: "Cargadores para celulares",
    description: "La potencia y el protocolo de carga deben ser compatibles con tu celular. Revisá también si el modelo incluye cable y si es para enchufe, auto o carga inalámbrica.",
  },
  "cargador-portatil": {
    title: "Cargadores portátiles",
    description: "Para cargar fuera de casa, compará capacidad, peso y puertos de salida. Revisá la potencia que admite cada modelo y qué cable necesitás para conectarlo al celular.",
  },
  "power-bank": {
    title: "Power banks",
    description: "Consultá la capacidad y las entradas y salidas de cada batería externa. Los mAh publicados no equivalen directamente a una cantidad fija de cargas: también influyen tu equipo y las pérdidas de conversión.",
  },
};

export function getCategoryContent(name: string) {
  const slug = slugify(name);
  return Object.hasOwn(CATEGORY_CONTENT, slug) ? CATEGORY_CONTENT[slug] : {
    title: name.trim(),
    description: "Consultá las características de cada producto y confirmá la compatibilidad con tu equipo antes de comprar.",
  };
}
