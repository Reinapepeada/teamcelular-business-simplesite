import type { Metadata } from "next";
import HighIntentGuidePage, {
  type GuideFaqItem,
  type GuideItem,
  type GuideRelatedLink,
} from "@/components/seo/HighIntentGuidePage";
import { buildWebsiteMetadata, getSiteUrl } from "@/lib/seoMetadata";

const SITE_URL = getSiteUrl();
const PAGE_PATH = "/guias/face-id-touch-id-no-funciona";

export const metadata: Metadata = buildWebsiteMetadata({
  path: PAGE_PATH,
  title: "Face ID o Touch ID no Funciona: Causas y Solución",
  description:
    "Face ID o Touch ID que dejó de andar: cuándo es flex, cuándo módulo y cuándo placa. Team Celular, Recoleta y Belgrano CABA, confirma el plazo según la revisión.",
  keywords: [
    "face id no funciona",
    "touch id no funciona",
    "reparacion iphone face id",
    "sensor biométrico celular",
    "microelectronica iphone caba",
  ],
  openGraphTitle: "Face ID o Touch ID no Funciona: Causas y Solución | Team Celular",
  openGraphDescription:
    "Guía para diagnosticar fallas biometricas en iPhone y decidir reparación segura con criterio técnico.",
  openGraphImagePath: "/opengraph-image.png",
  openGraphImageAlt: "Diagnóstico de Face ID y Touch ID",
  twitterTitle: "Face ID o Touch ID no Funciona | Team Celular",
  twitterDescription:
    "Checklist de diagnóstico para fallas biometricas antes de invertir en reparación.",
  languages: {
    "es-AR": PAGE_PATH,
  },
});

const symptoms: GuideItem[] = [
  {
    title: "Face ID no disponible",
    description:
      "El sistema muestra error permanente y no permite configurar reconocimiento facial.",
  },
  {
    title: "Touch ID no reconoce huella",
    description:
      "Detecta el boton pero no valida huella o demora demasiado en autenticar.",
  },
  {
    title: "Falla tras golpe o cambio de pantalla",
    description:
      "Intervenciones previas o impacto pueden afectar sensores, flex o calibración.",
  },
  {
    title: "Cámara frontal con comportamiento raro",
    description:
      "Si cámara frontal falla junto con Face ID, suele haber problema compartido en módulo superior.",
  },
];

const diagnostics: GuideItem[] = [
  {
    title: "Verificacion de historial del equipo",
    description:
      "Identificamos si hubo apertura previa, repuestos no compatibles o golpes recientes.",
  },
  {
    title: "Prueba de módulos asociados",
    description:
      "Revisamos cámara frontal, sensor de proximidad y flex vinculados al sistema biométrico.",
  },
  {
    title: "Control de conectores y soldaduras",
    description:
      "Validamos continuidad fisica y eléctrica para descartar cortes o sulfatacion.",
  },
  {
    title: "Diagnóstico de placa lógica",
    description:
      "Cuando el módulo esta sano, analizamos circuito para confirmar si requiere microelectrónica.",
  },
];

const planSteps: GuideItem[] = [
  {
    title: "Descartar problema de software",
    description:
      "Primero se revisa configuración, actualización y estado del sistema para evitar cambios innecesarios.",
  },
  {
    title: "Reparar o reemplazar flex/modulo",
    description:
      "Si hay daño fisico en componentes asociados, se corrige con piezas compatibles de calidad.",
  },
  {
    title: "Intervención de microelectrónica",
    description:
      "En fallas de placa se realiza reparación de precisión con equipamiento especializado.",
  },
  {
    title: "Pruebas funcionales finales",
    description:
      "Se valida desbloqueo biométrico, cámara frontal y estabilidad general antes de entrega.",
  },
];

const faq: GuideFaqItem[] = [
  {
    question: "¿Cambiar pantalla puede afectar Face ID o Touch ID?",
    answer:
      "Si se instala un módulo de baja calidad o se manipulan mal conectores, puede impactar sensores biometricos.",
  },
  {
    question: "¿Siempre se puede recuperar Face ID?",
    answer:
      "Depende del tipo de daño. Hay casos recuperables y otros donde el daño es irreversible en componentes clave.",
  },
  {
    question: "¿Touch ID falla también por humedad?",
    answer:
      "Sí. La humedad puede sulfatar conectores y afectar lectura del sensor o comunicacion con placa.",
  },
  {
    question: "¿Cuánto tarda un diagnóstico biométrico?",
    answer:
      "El plazo depende de la falla y de las pruebas necesarias. Si hay que revisar la placa, la evaluación puede llevar más tiempo. Te confirmamos el alcance y el plazo antes de avanzar.",
  },
];

const relatedLinks: GuideRelatedLink[] = [
  { href: "/guias/reparacion-iphone-buenos-aires", label: "Reparacion de iPhone" },
  { href: "/reparaciones/reparacion-placa-caba", label: "Revision de placa" },
  { href: "/reparaciones/reparacion-placa-caba", label: "Servicio de placa" },
  { href: "/presupuesto-reparacion#solicitar-presupuesto", label: "Solicitar diagnostico" },
];

export default function FaceIdTouchIdGuidePage() {
  return (
    <HighIntentGuidePage
      siteUrl={SITE_URL}
      pagePath={PAGE_PATH}
      pageLabel="Face ID / Touch ID"
      title="Face ID o Touch ID no funciona: causas y solución"
      heroDescription="Team Celular, en Paraguay 2451 Recoleta y Amenábar 2032 Belgrano (CABA), evalúa fallas de Face ID y Touch ID. Pueden venir de software, flex, sensores o placa. Confirmamos el alcance y el plazo después de revisar el equipo."
      badge="Diagnóstico avanzado"
      readingTime="6 min"
      publishedTime="2026-04-16T00:00:00Z"
      modifiedTime="2026-08-20T00:00:00Z"
      imagePath="/opengraph-image.png"
      heroPoints={[
        "Detecta la causa mas probable según síntomas.",
        "Evita cambios de módulo sin diagnóstico previo.",
        "Define cuando conviene pasar a microelectrónica.",
      ]}
      symptomsTitle="¿Cuáles son los síntomas habituales en sensores biométricos?"
      symptomsDescription="Estos escenarios son los que más vemos en equipos que llegan a laboratorio."
      symptoms={symptoms}
      diagnosisTitle="¿Cómo diagnosticamos Face ID y Touch ID en taller?"
      diagnosisDescription="El objetivo es confirmar el origen real y evitar intervenciones que no solucionan el problema."
      diagnostics={diagnostics}
      planTitle="¿Cuál es la ruta de solución recomendada?"
      planDescription="Se prioriza el camino menos invasivo y se escala solo si hace falta."
      planSteps={planSteps}
      faq={faq}
      relatedLinks={relatedLinks}
      whatsappText="Hola Team Celular, vi la guía de Face ID/Touch ID y quiero evaluar mi iPhone"
    />
  );
}
