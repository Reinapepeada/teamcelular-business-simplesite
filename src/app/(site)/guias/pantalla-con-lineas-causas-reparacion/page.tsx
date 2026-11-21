import type { Metadata } from "next";
import HighIntentGuidePage, {
  type GuideFaqItem,
  type GuideItem,
  type GuideRelatedLink,
} from "@/components/seo/HighIntentGuidePage";
import { buildWebsiteMetadata, getSiteUrl } from "@/lib/seoMetadata";
import RepairPriceInquiry from "@/components/repairs/RepairPriceInquiry";
import { PLACA_REVISION_PRICE, SCREEN_PRICE_FLOOR, formatArsPrice } from "@/lib/repairPrices";

const SITE_URL = getSiteUrl();
const PAGE_PATH = "/guias/pantalla-con-lineas-causas-reparacion";
// Rebotaba 72% sin precio ni consulta arriba; la guia de pin de carga, con la
// misma plantilla, precio y consulta en el hero, rebota 27% (PostHog, nov 2026).
const SCREEN_FROM = formatArsPrice(SCREEN_PRICE_FLOOR);
const PLACA_REVIEW = formatArsPrice(PLACA_REVISION_PRICE);

export const metadata: Metadata = buildWebsiteMetadata({
  path: PAGE_PATH,
  title: "Pantalla con Líneas en Celular: Causas y Reparación",
  description:
    "Líneas, parpadeo o manchas en la pantalla: cómo saber si es display, flex o placa. Diagnóstico sin turno en Recoleta y Belgrano, CABA.",
  keywords: [
    "pantalla con lineas celular",
    "display con rayas verticales",
    "reparacion pantalla caba",
    "cambio modulo celular",
    "service tecnico recoleta",
  ],
  openGraphTitle: "Pantalla con Líneas en Celular: Causas y Reparación | Team Celular",
  openGraphDescription:
    "Guia para diagnosticar lineas en pantalla y saber cuando conviene cambio de modulo o revision de placa.",
  openGraphImagePath: "/opengraph-image.png",
  openGraphImageAlt: "Pantalla con lineas en celular y diagnostico tecnico",
  twitterTitle: "Pantalla con Líneas: Causas y Reparación | Team Celular",
  twitterDescription:
    "Checklist tecnico para decidir entre reemplazo de display, flex o reparacion de placa.",
  languages: {
    "es-AR": PAGE_PATH,
  },
});

const symptoms: GuideItem[] = [
  {
    title: "Líneas verticales u horizontales",
    description:
      "Suelen aparecer después de golpes, presión o flex fatigado. Pueden ser fijas o intermitentes.",
  },
  {
    title: "Parpadeo de pantalla",
    description:
      "El brillo cambia solo o titila. Puede indicar daño del panel o un problema de alimentación en placa.",
  },
  {
    title: "Zonas sin imagen",
    description:
      "Parte del display queda negra o con color alterado, incluso cuando el touch sigue respondiendo.",
  },
  {
    title: "Touch errático junto a líneas",
    description:
      "Cuando fallan imagen y táctil a la vez, suele estar comprometido el módulo completo.",
  },
];

const diagnostics: GuideItem[] = [
  {
    title: "Prueba visual y táctil por zonas",
    description:
      "Mapeamos dónde falla la imagen y el táctil para definir si el problema está en el panel o en la conexión.",
  },
  {
    title: "Chequeo de flex y conectores",
    description:
      "Se revisa la integridad de los conectores, la presión de contacto y el estado del flex de display.",
  },
  {
    title: "Test con módulo de referencia",
    description:
      "Cuando aplica, se compara con un módulo de prueba para confirmar si la placa está estable.",
  },
  {
    title: "Revisión de la línea de video en placa",
    description:
      "Si la falla sigue con un módulo sano, se analiza el circuito de imagen en microelectrónica.",
  },
];

const planSteps: GuideItem[] = [
  {
    title: "Definir el origen del daño",
    description:
      "Primero se identifica si la falla viene del display, del flex o de la placa, para no sobrediagnosticar.",
  },
  {
    title: "Reemplazo de módulo cuando corresponde",
    description:
      "Si el panel está comprometido, se instala un módulo de calidad y se valida brillo, color y touch.",
  },
  {
    title: "Ajuste de conectores o flex",
    description:
      "En casos leves se corrige la conexión sin cambiar la pantalla completa.",
  },
  {
    title: "Escalar a placa solo si hace falta",
    description:
      "Si la falla no depende del display, se avanza con reparación de microelectrónica.",
  },
];

const faq: GuideFaqItem[] = [
  {
    question: "¿Cuánto cuesta arreglar una pantalla con líneas?",
    answer: `Si la causa es el display, el cambio de pantalla arranca en ${SCREEN_FROM}, según marca, modelo y repuesto. Si la falla viene de la placa, la revisión cuesta ${PLACA_REVIEW} y se descuenta si aceptás el arreglo. Te confirmamos el precio de tu equipo por WhatsApp antes de avanzar.`,
  },
  {
    question: "¿Siempre hay que cambiar la pantalla cuando aparecen líneas?",
    answer:
      "No siempre. En algunos equipos la causa es el flex o un conector. Por eso conviene un diagnóstico antes de comprar el módulo.",
  },
  {
    question: "¿Puede empeorar si sigo usando el celular así?",
    answer:
      "Sí. Golpes adicionales o presión sobre el panel pueden extender las líneas y terminar en una falla total de imagen.",
  },
  {
    question: "¿Las líneas pueden venir de la placa?",
    answer:
      "Sí, aunque es menos frecuente. Si el módulo está sano y la falla sigue, se revisa el circuito de video en placa.",
  },
  {
    question: "¿Cuánto tarda un cambio de pantalla con diagnóstico?",
    answer:
      "Depende del modelo y del stock, pero en muchos casos se resuelve en el día, con pruebas completas de control final.",
  },
];

const relatedLinks: GuideRelatedLink[] = [
  { href: "/guias/reparacion-pantalla-celular", label: "Guía completa de pantalla" },
  { href: "/reparaciones/cambio-pantalla-caba", label: "Servicio de cambio de pantalla" },
  { href: "/guias/pin-de-carga-suelto-solucion", label: "Pin de carga dañado: cómo saberlo" },
  { href: "/presupuesto-reparacion#solicitar-presupuesto", label: "Solicitar presupuesto" },
];

export default function ScreenLinesGuidePage() {
  return (
    <HighIntentGuidePage
      siteUrl={SITE_URL}
      pagePath={PAGE_PATH}
      pageLabel="Pantalla con líneas"
      title="Pantalla con líneas en el celular: causas, precio y reparación"
      heroDescription={`Si la causa es el display, el cambio de pantalla arranca en ${SCREEN_FROM} según el modelo; si viene de la placa, la revisión cuesta ${PLACA_REVIEW} y se descuenta si reparás. Team Celular, en Paraguay 2451 (Recoleta) y Amenábar 2032 (Belgrano), CABA, identifica la causa real: display, flex o placa. Garantía escrita de 90 días.`}
      badge="Decisión de reparación"
      readingTime="5 min"
      publishedTime="2026-04-16T00:00:00Z"
      modifiedTime="2026-11-21T00:00:00Z"
      imagePath="/opengraph-image.png"
      heroPoints={[
        "Diferencia la causa visual de la eléctrica.",
        "Evita reemplazar el módulo sin validar la placa.",
        "Prioriza la solución con mejor costo/beneficio.",
      ]}
      heroActions={<RepairPriceInquiry
        repair="revisar la pantalla con líneas de mi celular"
        symptoms={["Líneas verticales u horizontales", "Parpadeo", "Zonas negras o manchas", "Touch que falla", "Pantalla negra con sonido"]}
        ctaName="screen_lines_guide_price_whatsapp"
        ctaLocation="screen_lines_guide_hero"
      />}
      symptomsTitle="¿Cuáles son los síntomas frecuentes de pantalla con líneas?"
      symptomsDescription="Reconocer el patrón de la falla ayuda a definir mejor el tipo de reparación."
      symptoms={symptoms}
      diagnosisTitle="¿Cómo diagnosticamos líneas en pantalla?"
      diagnosisDescription="El objetivo es ubicar la causa exacta para no cambiar piezas innecesarias."
      diagnostics={diagnostics}
      planTitle="¿Cómo reparamos la pantalla con líneas?"
      planDescription="Se corrige primero el componente con mayor probabilidad de éxito y menor costo."
      planSteps={planSteps}
      faq={faq}
      relatedLinks={relatedLinks}
      whatsappText="Hola Team Celular, vi la guía de pantalla con líneas y quiero un diagnóstico para mi equipo"
    />
  );
}
