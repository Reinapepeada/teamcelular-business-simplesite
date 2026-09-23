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
  title: "Pin de Carga Suelto: Cómo Saber si Está Dañado",
  description:
    "Probá otro cable, mirá el puerto con linterna y fijate si carga solo en un ángulo. Si es el pin, lo cambiamos en el día con garantía de 90 días.",
  keywords: [
    "pin de carga suelto",
    "como saber si se daño el pin de carga",
    "celular no carga bien",
    "cambio pin de carga caba",
    "reparacion puerto usb celular",
  ],
  openGraphTitle: "Pin de Carga Suelto: Cómo Saber si Está Dañado | Team Celular",
  openGraphDescription:
    "Cómo distinguir si el problema es el cable, la batería o el pin de carga antes de gastar de más.",
  openGraphImagePath: "/images/guia_cambio_modulo.webp",
  openGraphImageAlt: "Diagnóstico de pin de carga en Team Celular",
  twitterTitle: "Pin de Carga Suelto: Cómo Saber si Está Dañado | Team Celular",
  twitterDescription:
    "Señales claras de pin de carga dañado y qué hacer en cada caso.",
  languages: {
    "es-AR": PAGE_PATH,
  },
});

const symptoms: GuideItem[] = [
  {
    title: "Carga solo si sostenés el cable",
    description:
      "Si el cable tiene que quedar en una posición exacta, suele haber desgaste en el conector o juego en el pin.",
  },
  {
    title: "Conector flojo o inestable",
    description:
      "El enchufe entra fácil pero se mueve para los costados. Indica un puerto deformado o pelusa compactada al fondo.",
  },
  {
    title: "No activa la carga rápida",
    description:
      "Si solo carga lento o se desconecta mientras usás el equipo, puede haber daño en las líneas de datos del flex de carga.",
  },
  {
    title: "Aviso de humedad o accesorio no compatible",
    description:
      "Si Samsung muestra \"humedad detectada\" o iPhone \"accesorio no compatible\" con el puerto seco, apunta al pin o al flex.",
  },
];

const diagnostics: GuideItem[] = [
  {
    title: "Inspección con microscopio",
    description:
      "Revisamos pines, pistas y soldaduras para separar suciedad de daño real.",
  },
  {
    title: "Prueba cruzada de cable y cargador",
    description:
      "Descartamos accesorios defectuosos antes de abrir el equipo o cambiar piezas.",
  },
  {
    title: "Test eléctrico de continuidad",
    description:
      "Medimos si el puerto transmite energía y datos de forma estable o si hay un corte interno.",
  },
  {
    title: "Control de consumo en placa",
    description:
      "Si el puerto está bien, medimos el consumo para ver si la falla ya llegó a la placa.",
  },
];

const planSteps: GuideItem[] = [
  {
    title: "Limpieza técnica",
    description:
      "Si el conector está sano y hay residuos, lo limpiamos con microscopio sin forzar ni doblar los pines. No conviene hacerlo en casa: es fácil dañar el conector.",
  },
  {
    title: "Cambio de pin o flex",
    description:
      "Cuando hay juego mecánico o cortes internos, cambiamos el pin o el flex de carga.",
  },
  {
    title: "Microsoldadura en placa",
    description:
      "Si el daño llegó a las pistas o al circuito de carga, se corrige en el laboratorio de microelectrónica.",
  },
  {
    title: "Pruebas finales",
    description:
      "Verificamos carga continua, carga rápida y uso real antes de entregar el equipo.",
  },
];

const faq: GuideFaqItem[] = [
  {
    question: "¿Cómo saber si se dañó el pin de carga del celular?",
    answer:
      "Hay cuatro señales claras: carga solo si sostenés el cable en una posición, el enchufe tiene juego hacia los costados, dejó de cargar rápido, o la computadora no reconoce el equipo por cable. Si además aparece un aviso de humedad o de accesorio no compatible con el puerto seco, también apunta al pin o al flex.",
  },
  {
    question: "¿Es el pin de carga, el cable o la batería?",
    answer:
      "Si con otro cable y otro cargador carga normal, era el accesorio. Si carga pero el porcentaje baja muy rápido, suele ser la batería. Si el cable se desconecta o solo carga en cierto ángulo, es el pin.",
  },
  {
    question: "¿Conviene limpiar o cambiar el pin de carga?",
    answer:
      "Si hay suciedad compactada y el conector está sano, la limpieza técnica suele resolverlo. Si hay juego mecánico, cortes o un pin doblado, conviene cambiarlo.",
  },
  {
    question: "¿Puedo limpiar el pin de carga en casa?",
    answer:
      "No lo recomendamos. Con agujas, clips o cepillos es fácil doblar o romper los pines del conector, y una limpieza que se resolvía en minutos termina en un cambio de pin. Traelo y lo limpiamos con microscopio, sin forzar el puerto.",
  },
  {
    question: "¿Usar el celular así puede empeorar la falla?",
    answer:
      "Sí. Forzar el cable en mala posición puede dañar pistas internas y pasar de una reparación simple a una intervención de placa.",
  },
  {
    question: "¿Cuánto sale cambiar el pin de carga?",
    answer:
      "Entre $35.000 y $150.000, según el dispositivo. El diagnóstico cuesta entre $15.000 y $25.000 y te confirmamos el número exacto antes de abrir el equipo.",
  },
  {
    question: "¿Cuánto tarda el diagnóstico?",
    answer:
      "El diagnóstico sale el mismo día hábil. Con eso decidís si conviene reparar antes de que toquemos el equipo.",
  },
];

const relatedLinks: GuideRelatedLink[] = [
  { href: "/reparaciones/cambio-pin-carga-caba", label: "Precio del cambio de pin de carga" },
  { href: "/guias/celular-mojado-que-hacer", label: "Celular mojado: primeros pasos" },
  { href: "/guias/cambio-bateria-celular", label: "Guía de batería" },
  { href: "/presupuesto-reparacion#solicitar-presupuesto", label: "Pedir presupuesto" },
];

export default function ChargingPortGuidePage() {
  return (
    <HighIntentGuidePage
      siteUrl={SITE_URL}
      pagePath={PAGE_PATH}
      pageLabel="Pin de carga suelto"
      title="Pin de carga suelto: cómo saber si está dañado"
      heroDescription="Para saber si se dañó el pin de carga, probá con otro cable y otro cargador. Si el problema sigue, mirá el puerto con una linterna: si el cable queda flojo, carga solo en cierto ángulo o hay pelusa compactada al fondo, el problema está en el pin. Team Celular, en Paraguay 2451 Recoleta, lo confirma con microscopio el mismo día."
      badge="Falla frecuente"
      readingTime="5 min"
      publishedTime="2026-04-16T00:00:00Z"
      modifiedTime="2026-09-22T00:00:00Z"
      imagePath="/images/guia_cambio_modulo.webp"
      heroPoints={[
        "Cuatro señales para reconocer un pin dañado.",
        "Cómo descartar el cable y la batería.",
        "Por qué no conviene limpiarlo en casa.",
      ]}
      symptomsTitle="¿Cuáles son las señales de un pin de carga dañado?"
      symptomsDescription="Suelen aparecer antes de que el equipo deje de cargar por completo."
      symptoms={symptoms}
      diagnosisTitle="¿Cómo lo diagnosticamos en el laboratorio?"
      diagnosisDescription="Separar el origen real evita cambiar piezas que no hacían falta."
      diagnostics={diagnostics}
      planTitle="¿Qué reparación corresponde en cada caso?"
      planDescription="Siempre vamos de lo simple a lo complejo, según el daño."
      planSteps={planSteps}
      faq={faq}
      relatedLinks={relatedLinks}
      whatsappText="Hola Team Celular, vi la guía de pin de carga y quiero un diagnóstico para mi equipo"
    />
  );
}
