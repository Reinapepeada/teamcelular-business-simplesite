import type { Metadata } from "next";
import HighIntentGuidePage, {
  type GuideFaqItem,
  type GuideItem,
  type GuideRelatedLink,
} from "@/components/seo/HighIntentGuidePage";
import { buildWebsiteMetadata, getSiteUrl } from "@/lib/seoMetadata";

const SITE_URL = getSiteUrl();
const PAGE_PATH = "/guias/pantalla-con-lineas-causas-reparacion";

export const metadata: Metadata = buildWebsiteMetadata({
  path: PAGE_PATH,
  title: "Pantalla con Líneas en Celular: Causas y Reparación",
  description:
    "Líneas, parpadeo o manchas en la pantalla: cómo saber si es display, flex o placa. Team Celular, Recoleta y Belgrano CABA. Plazo según modelo, stock y diagnóstico.",
  keywords: [
    "pantalla con lineas celular",
    "display con rayas verticales",
    "reparacion pantalla caba",
    "cambio modulo celular",
    "service tecnico recoleta",
  ],
  openGraphTitle: "Pantalla con Líneas en Celular: Causas y Reparación | Team Celular",
  openGraphDescription:
    "Guía para diagnosticar líneas en pantalla y saber cuando conviene cambio de módulo o revisión de placa.",
  openGraphImagePath: "/opengraph-image.png",
  openGraphImageAlt: "Pantalla con líneas en celular y diagnóstico técnico",
  twitterTitle: "Pantalla con Líneas: Causas y Reparación | Team Celular",
  twitterDescription:
    "Checklist técnico para decidir entre reemplazo de display, flex o reparación de placa.",
  languages: {
    "es-AR": PAGE_PATH,
  },
});

const symptoms: GuideItem[] = [
  {
    title: "Líneas verticales o horizontales",
    description:
      "Suelen aparecer después de golpes, presión o flex fatigado. Pueden ser fijas o intermitentes.",
  },
  {
    title: "Parpadeo de pantalla",
    description:
      "El brillo cambia solo o titila. Puede indicar daño de panel o problema de alimentacion en placa.",
  },
  {
    title: "Zonas sin imagen",
    description:
      "Parte del display queda negra o con color alterado, incluso cuando el touch sigue respondiendo.",
  },
  {
    title: "Touch erratico junto a líneas",
    description:
      "Cuando falla imagen y táctil en simultaneo, suele haber compromiso de módulo completo.",
  },
];

const diagnostics: GuideItem[] = [
  {
    title: "Prueba visual y táctil por zonas",
    description:
      "Mapeamos donde falla la imagen y el táctil para definir si el problema esta en panel o conexión.",
  },
  {
    title: "Chequeo de flex y conectores",
    description:
      "Se revisa integridad de conectores, presión de contacto y estado del flex de display.",
  },
  {
    title: "Test con módulo de referencia",
    description:
      "Cuando aplica, se compara con módulo de prueba para confirmar si la placa esta estable.",
  },
  {
    title: "Revisión de línea de video en placa",
    description:
      "Si persiste la falla con módulo sano, se analiza circuito de imagen en microelectrónica.",
  },
];

const planSteps: GuideItem[] = [
  {
    title: "Definir origen del daño",
    description:
      "Primero se identifica si la falla viene de display, flex o placa para no sobrediagnosticar.",
  },
  {
    title: "Reemplazo de módulo cuando corresponde",
    description:
      "Si el panel esta comprometido, se instala módulo de calidad y se valida brillo, color y touch.",
  },
  {
    title: "Ajuste de conectores o flex",
    description:
      "En casos leves se corrige conexión sin cambio completo de pantalla.",
  },
  {
    title: "Escalar a placa solo si hace falta",
    description:
      "Si la falla no depende del display, se avanza con reparación de microelectrónica.",
  },
];

const faq: GuideFaqItem[] = [
  {
    question: "¿Siempre hay que cambiar la pantalla cuando aparecen líneas?",
    answer:
      "No siempre. En algunos equipos la causa es flex o conector. Por eso conviene diagnóstico antes de comprar módulo.",
  },
  {
    question: "¿Puede empeorar si sigo usando el celular así?",
    answer:
      "Sí. Golpes adicionales o presión sobre el panel pueden expandir líneas y terminar en falla total de imagen.",
  },
  {
    question: "¿Las líneas pueden venir de la placa?",
    answer:
      "Si, aunque es menos frecuente. Si el módulo esta sano y sigue la falla, se revisa circuito de video en placa.",
  },
  {
    question: "¿Cuánto tarda un cambio de pantalla con diagnóstico?",
    answer:
      "Depende del modelo y stock, pero en muchos casos se resuelve en el dia con pruebas completas de control final.",
  },
];

const relatedLinks: GuideRelatedLink[] = [
  { href: "/guias/reparacion-pantalla-celular", label: "Guia completa de pantalla" },
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
      title="Pantalla con líneas en celular: causas y reparación"
      heroDescription="Team Celular, en Paraguay 2451 Recoleta y Amenábar 2032 Belgrano (CABA), diagnostica líneas en pantalla para identificar la causa real: display, flex o placa. Confirmamos el plazo según el modelo, el stock y el diagnóstico. Garantía escrita de 90 días."
      badge="Decisión de reparación"
      readingTime="5 min"
      publishedTime="2026-04-16T00:00:00Z"
      modifiedTime="2026-08-20T00:00:00Z"
      imagePath="/opengraph-image.png"
      heroPoints={[
        "Diferencia causa visual vs causa eléctrica.",
        "Evita reemplazar módulo sin validar placa.",
        "Prioriza una solución con costo/beneficio real.",
      ]}
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
      whatsappText="Hola Team Celular, vi la guía de pantalla con líneas y quiero diagnóstico para mi equipo"
    />
  );
}
