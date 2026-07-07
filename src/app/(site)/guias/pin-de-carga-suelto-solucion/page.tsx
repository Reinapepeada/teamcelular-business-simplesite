import type { Metadata } from "next";
import HighIntentGuidePage, {
  type GuideFaqItem,
  type GuideItem,
  type GuideRelatedLink,
} from "@/components/seo/HighIntentGuidePage";
import { buildWebsiteMetadata, getSiteUrl } from "@/lib/seoMetadata";

const SITE_URL = getSiteUrl();
const PAGE_PATH = "/guias/pin-de-carga-suelto-solucion";

export const metadata: Metadata = buildWebsiteMetadata({
  path: PAGE_PATH,
  title: "Pin de Carga Suelto: Causas y Solucion en CABA | Team Celular",
  description:
    "Â¿Tu celular carga intermitente? Team Celular, Recoleta y Belgrano (CABA), diagnostica pin de carga, flex y placa el mismo dÃ­a. ReparaciÃ³n express con garantÃ­a escrita 90 dÃ­as.",
  keywords: [
    "pin de carga suelto",
    "celular no carga bien",
    "cambio pin de carga caba",
    "reparacion puerto usb celular",
    "service tecnico celulares recoleta",
  ],
  openGraphTitle: "Pin de Carga Suelto: Causas y Solucion en CABA | Team Celular",
  openGraphDescription:
    "Guia practica para diferenciar suciedad, desgaste de conector o falla de placa antes de gastar de mas.",
  openGraphImagePath: "/images/guia_cambio_modulo.webp",
  openGraphImageAlt: "Diagnostico de pin de carga en Team Celular",
  twitterTitle: "Pin de Carga Suelto: Causas y Solucion | Team Celular",
  twitterDescription:
    "Checklist rapido para decidir si necesitas limpieza tecnica, cambio de pin o microelectronica.",
  languages: {
    "es-AR": PAGE_PATH,
  },
});

const symptoms: GuideItem[] = [
  {
    title: "Carga solo si sostienes el cable",
    description:
      "Si el cable debe quedar en una posicion exacta, suele haber desgaste mecanico en el conector o juego en el pin.",
  },
  {
    title: "Conector flojo o inestable",
    description:
      "El enchufe entra facil pero se mueve mucho. Esto suele indicar deformacion del puerto o residuos compactados.",
  },
  {
    title: "No activa carga rapida",
    description:
      "Cuando solo carga lento o desconecta al usar el equipo, puede haber daÃ±o en lineas de datos del flex de carga.",
  },
  {
    title: "Calienta al conectar",
    description:
      "El sobrecalentamiento durante la carga puede marcar falso contacto o fuga en circuito de entrada.",
  },
];

const diagnostics: GuideItem[] = [
  {
    title: "Inspeccion microscopica",
    description:
      "Revisamos estado fisico de pines, pistas y soldaduras para separar suciedad de daÃ±o real.",
  },
  {
    title: "Prueba cruzada de cable y cargador",
    description:
      "Descartamos accesorios defectuosos antes de abrir el equipo o cambiar piezas.",
  },
  {
    title: "Test electrico de continuidad",
    description:
      "Validamos si el puerto transmite energia y datos de forma estable o si hay corte interno.",
  },
  {
    title: "Control de consumo en placa",
    description:
      "Si el puerto esta bien, medimos consumo para identificar si la falla ya avanzo a la placa.",
  },
];

const planSteps: GuideItem[] = [
  {
    title: "Limpieza tecnica segura",
    description:
      "Si el daÃ±o es superficial, limpiamos residuos sin daÃ±ar pines ni forzar el conector.",
  },
  {
    title: "Reemplazo de pin o flex",
    description:
      "Cuando hay juego mecanico o cortes internos, cambiamos el modulo afectado con repuesto compatible.",
  },
  {
    title: "Micro soldadura en placa",
    description:
      "Si el daÃ±o llego a pistas o circuito de carga, se corrige en laboratorio de microelectronica.",
  },
  {
    title: "Pruebas finales de estabilidad",
    description:
      "Verificamos carga continua, carga rapida y funcionamiento en uso real antes de entregar.",
  },
];

const faq: GuideFaqItem[] = [
  {
    question: "Conviene limpiar o cambiar el pin de carga?",
    answer:
      "Si hay suciedad compactada y el conector esta sano, la limpieza tecnica suele resolver. Si hay juego mecanico, cortes o pin doblado, conviene reemplazo.",
  },
  {
    question: "Usar el celular asi puede empeorar la falla?",
    answer:
      "Si. Forzar el cable en mala posicion puede daÃ±ar pistas internas y pasar de una reparacion simple a una intervencion de placa.",
  },
  {
    question: "El problema puede ser bateria y no el pin?",
    answer:
      "Puede pasar. Por eso primero se valida entrada de carga, estado de bateria y consumo para no cambiar piezas innecesarias.",
  },
  {
    question: "Cuanto tarda este tipo de diagnostico?",
    answer:
      "El diagnostico inicial suele quedar dentro del mismo dia habil. Con eso puedes decidir si conviene reparar o pasar a otra alternativa.",
  },
];

const relatedLinks: GuideRelatedLink[] = [
  { href: "/reparaciones/cambio-pin-carga-caba", label: "Servicio de pin de carga" },
  { href: "/guias/celular-mojado-que-hacer", label: "Celular mojado: primeros pasos" },
  { href: "/guias/cambio-bateria-celular", label: "Guia de bateria" },
  { href: "/presupuesto-reparacion#solicitar-presupuesto", label: "Pedir presupuesto" },
];

export default function ChargingPortGuidePage() {
  return (
    <HighIntentGuidePage
      siteUrl={SITE_URL}
      pagePath={PAGE_PATH}
      pageLabel="Pin de carga suelto"
      title="Pin de carga suelto: causas, diagnostico y solucion"
      heroDescription="Team Celular, en Paraguay 2451 Recoleta y Amenábar 2032 Belgrano (CABA), diagnostica pin de carga suelto con inspecciÃ³n microscÃ³pica el mismo dÃ­a. Si es suciedad, desgaste de conector o falla de placa, lo confirmamos antes de cambiar piezas."
      badge="Falla frecuente"
      readingTime="5 min"
      publishedTime="2026-04-16T00:00:00Z"
      modifiedTime="2026-06-09T00:00:00Z"
      imagePath="/images/guia_cambio_modulo.webp"
      heroPoints={[
        "Checklist rapido para detectar la causa principal.",
        "Evita forzar el conector y agravar el daÃ±o.",
        "Define si conviene limpieza, cambio o microelectronica.",
      ]}
      symptomsTitle="Â¿CuÃ¡les son las seÃ±ales de pin de carga comprometido?"
      symptomsDescription="Estas pistas suelen aparecer antes de que el equipo deje de cargar por completo."
      symptoms={symptoms}
      diagnosisTitle="Â¿CÃ³mo diagnosticamos la falla de carga?"
      diagnosisDescription="Separar el origen real evita gastos innecesarios y acelera la soluciÃ³n correcta."
      diagnostics={diagnostics}
      planTitle="Â¿CuÃ¡l es el plan de reparaciÃ³n recomendado?"
      planDescription="El flujo cambia segÃºn nivel de daÃ±o, pero siempre avanzamos de lo simple a lo complejo."
      planSteps={planSteps}
      faq={faq}
      relatedLinks={relatedLinks}
      whatsappText="Hola Team Celular, vi la guia de pin de carga suelto y quiero diagnostico para mi equipo"
    />
  );
}
