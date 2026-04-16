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
  title: "Pantalla con Lineas en Celular: Causas y Reparacion | Team Celular",
  description:
    "Tu pantalla muestra lineas verticales, parpadeo o manchas? Aprende a diferenciar dano de display, flex o placa para decidir la reparacion correcta.",
  keywords: [
    "pantalla con lineas celular",
    "display con rayas verticales",
    "reparacion pantalla caba",
    "cambio modulo celular",
    "service tecnico recoleta",
  ],
  openGraphTitle: "Pantalla con Lineas en Celular: Causas y Reparacion | Team Celular",
  openGraphDescription:
    "Guia para diagnosticar lineas en pantalla y saber cuando conviene cambio de modulo o revision de placa.",
  openGraphImagePath: "/images/guia_cambio_modulo.webp",
  openGraphImageAlt: "Pantalla con lineas en celular y diagnostico tecnico",
  twitterTitle: "Pantalla con Lineas: Causas y Reparacion | Team Celular",
  twitterDescription:
    "Checklist tecnico para decidir entre reemplazo de display, flex o reparacion de placa.",
  languages: {
    "es-AR": PAGE_PATH,
  },
});

const symptoms: GuideItem[] = [
  {
    title: "Lineas verticales o horizontales",
    description:
      "Suelen aparecer despues de golpes, presion o flex fatigado. Pueden ser fijas o intermitentes.",
  },
  {
    title: "Parpadeo de pantalla",
    description:
      "El brillo cambia solo o titila. Puede indicar dano de panel o problema de alimentacion en placa.",
  },
  {
    title: "Zonas sin imagen",
    description:
      "Parte del display queda negra o con color alterado, incluso cuando el touch sigue respondiendo.",
  },
  {
    title: "Touch erratico junto a lineas",
    description:
      "Cuando falla imagen y tactil en simultaneo, suele haber compromiso de modulo completo.",
  },
];

const diagnostics: GuideItem[] = [
  {
    title: "Prueba visual y tactil por zonas",
    description:
      "Mapeamos donde falla la imagen y el tactil para definir si el problema esta en panel o conexion.",
  },
  {
    title: "Chequeo de flex y conectores",
    description:
      "Se revisa integridad de conectores, presion de contacto y estado del flex de display.",
  },
  {
    title: "Test con modulo de referencia",
    description:
      "Cuando aplica, se compara con modulo de prueba para confirmar si la placa esta estable.",
  },
  {
    title: "Revision de linea de video en placa",
    description:
      "Si persiste la falla con modulo sano, se analiza circuito de imagen en microelectronica.",
  },
];

const planSteps: GuideItem[] = [
  {
    title: "Definir origen del dano",
    description:
      "Primero se identifica si la falla viene de display, flex o placa para no sobrediagnosticar.",
  },
  {
    title: "Reemplazo de modulo cuando corresponde",
    description:
      "Si el panel esta comprometido, se instala modulo de calidad y se valida brillo, color y touch.",
  },
  {
    title: "Ajuste de conectores o flex",
    description:
      "En casos leves se corrige conexion sin cambio completo de pantalla.",
  },
  {
    title: "Escalar a placa solo si hace falta",
    description:
      "Si la falla no depende del display, se avanza con reparacion de microelectronica.",
  },
];

const faq: GuideFaqItem[] = [
  {
    question: "Siempre hay que cambiar la pantalla cuando aparecen lineas?",
    answer:
      "No siempre. En algunos equipos la causa es flex o conector. Por eso conviene diagnostico antes de comprar modulo.",
  },
  {
    question: "Puede empeorar si sigo usando el celular asi?",
    answer:
      "Si. Golpes adicionales o presion sobre el panel pueden expandir lineas y terminar en falla total de imagen.",
  },
  {
    question: "Las lineas pueden venir de la placa?",
    answer:
      "Si, aunque es menos frecuente. Si el modulo esta sano y sigue la falla, se revisa circuito de video en placa.",
  },
  {
    question: "Cuanto tarda un cambio de pantalla con diagnostico?",
    answer:
      "Depende del modelo y stock, pero en muchos casos se resuelve en el dia con pruebas completas de control final.",
  },
];

const relatedLinks: GuideRelatedLink[] = [
  { href: "/guias/reparacion-pantalla-celular", label: "Guia completa de pantalla" },
  { href: "/reparaciones/cambio-pantalla-caba", label: "Servicio de cambio de pantalla" },
  { href: "/guias/pin-de-carga-suelto-solucion", label: "Pin de carga suelto" },
  { href: "/presupuesto-reparacion#solicitar-presupuesto", label: "Solicitar presupuesto" },
];

export default function ScreenLinesGuidePage() {
  return (
    <HighIntentGuidePage
      siteUrl={SITE_URL}
      pagePath={PAGE_PATH}
      pageLabel="Pantalla con lineas"
      title="Pantalla con lineas en celular: causas y reparacion"
      heroDescription="Las lineas en pantalla no siempre significan el mismo problema. Esta guia te ayuda a diferenciar display dañado, flex defectuoso o falla de placa."
      badge="Decision de reparacion"
      readingTime="5 min"
      publishedTime="2026-04-16T00:00:00Z"
      modifiedTime="2026-04-16T00:00:00Z"
      imagePath="/images/guia_cambio_modulo.webp"
      heroPoints={[
        "Diferencia causa visual vs causa electrica.",
        "Evita reemplazar modulo sin validar placa.",
        "Prioriza una solucion con costo/beneficio real.",
      ]}
      symptomsTitle="Sintomas frecuentes de pantalla con lineas"
      symptomsDescription="Reconocer el patron de la falla ayuda a definir mejor el tipo de reparacion."
      symptoms={symptoms}
      diagnosisTitle="Diagnostico recomendado"
      diagnosisDescription="El objetivo es ubicar la causa exacta para no cambiar piezas innecesarias."
      diagnostics={diagnostics}
      planTitle="Plan de solucion por prioridad"
      planDescription="Se corrige primero el componente con mayor probabilidad de exito y menor costo."
      planSteps={planSteps}
      faq={faq}
      relatedLinks={relatedLinks}
      whatsappText="Hola Team Celular, vi la guia de pantalla con lineas y quiero diagnostico para mi equipo"
    />
  );
}
