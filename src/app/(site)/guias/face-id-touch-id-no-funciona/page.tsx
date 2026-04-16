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
  title: "Face ID o Touch ID no Funciona: Causas y Solucion | Team Celular",
  description:
    "Face ID o Touch ID dejo de funcionar? Entiende causas frecuentes, que pruebas hacer y cuando conviene reparacion de flex, modulo o placa.",
  keywords: [
    "face id no funciona",
    "touch id no funciona",
    "reparacion iphone face id",
    "sensor biometrico celular",
    "microelectronica iphone caba",
  ],
  openGraphTitle: "Face ID o Touch ID no Funciona: Causas y Solucion | Team Celular",
  openGraphDescription:
    "Guia para diagnosticar fallas biometricas en iPhone y decidir reparacion segura con criterio tecnico.",
  openGraphImagePath: "/images/guia_iphone.webp",
  openGraphImageAlt: "Diagnostico de Face ID y Touch ID",
  twitterTitle: "Face ID o Touch ID no Funciona | Team Celular",
  twitterDescription:
    "Checklist de diagnostico para fallas biometricas antes de invertir en reparacion.",
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
      "Intervenciones previas o impacto pueden afectar sensores, flex o calibracion.",
  },
  {
    title: "Camara frontal con comportamiento raro",
    description:
      "Si camara frontal falla junto con Face ID, suele haber problema compartido en modulo superior.",
  },
];

const diagnostics: GuideItem[] = [
  {
    title: "Verificacion de historial del equipo",
    description:
      "Identificamos si hubo apertura previa, repuestos no compatibles o golpes recientes.",
  },
  {
    title: "Prueba de modulos asociados",
    description:
      "Revisamos camara frontal, sensor de proximidad y flex vinculados al sistema biometrico.",
  },
  {
    title: "Control de conectores y soldaduras",
    description:
      "Validamos continuidad fisica y electrica para descartar cortes o sulfatacion.",
  },
  {
    title: "Diagnostico de placa logica",
    description:
      "Cuando el modulo esta sano, analizamos circuito para confirmar si requiere microelectronica.",
  },
];

const planSteps: GuideItem[] = [
  {
    title: "Descartar problema de software",
    description:
      "Primero se revisa configuracion, actualizacion y estado del sistema para evitar cambios innecesarios.",
  },
  {
    title: "Reparar o reemplazar flex/modulo",
    description:
      "Si hay daño fisico en componentes asociados, se corrige con piezas compatibles de calidad.",
  },
  {
    title: "Intervencion de microelectronica",
    description:
      "En fallas de placa se realiza reparacion de precision con equipamiento especializado.",
  },
  {
    title: "Pruebas funcionales finales",
    description:
      "Se valida desbloqueo biometrico, camara frontal y estabilidad general antes de entrega.",
  },
];

const faq: GuideFaqItem[] = [
  {
    question: "Cambiar pantalla puede afectar Face ID o Touch ID?",
    answer:
      "Si se instala un modulo de baja calidad o se manipulan mal conectores, puede impactar sensores biometricos.",
  },
  {
    question: "Siempre se puede recuperar Face ID?",
    answer:
      "Depende del tipo de daño. Hay casos recuperables y otros donde el daño es irreversible en componentes clave.",
  },
  {
    question: "Touch ID falla tambien por humedad?",
    answer:
      "Si. La humedad puede sulfatar conectores y afectar lectura del sensor o comunicacion con placa.",
  },
  {
    question: "Cuanto tarda un diagnostico biometrico?",
    answer:
      "Normalmente el diagnostico inicial se entrega en el mismo dia habil, y luego se define alcance real de reparacion.",
  },
];

const relatedLinks: GuideRelatedLink[] = [
  { href: "/guias/reparacion-iphone-buenos-aires", label: "Reparacion de iPhone" },
  { href: "/guias/microelectronica-reballing-caba", label: "Microelectronica y placa" },
  { href: "/reparaciones/reparacion-placa-caba", label: "Servicio de placa" },
  { href: "/presupuesto-reparacion#solicitar-presupuesto", label: "Solicitar diagnostico" },
];

export default function FaceIdTouchIdGuidePage() {
  return (
    <HighIntentGuidePage
      siteUrl={SITE_URL}
      pagePath={PAGE_PATH}
      pageLabel="Face ID / Touch ID"
      title="Face ID o Touch ID no funciona: causas y solucion"
      heroDescription="Las fallas biometricas pueden venir de software, flex, sensores o placa. Esta guia te ayuda a priorizar pruebas y decidir el siguiente paso tecnico."
      badge="Diagnostico avanzado"
      readingTime="6 min"
      publishedTime="2026-04-16T00:00:00Z"
      modifiedTime="2026-04-16T00:00:00Z"
      imagePath="/images/guia_iphone.webp"
      heroPoints={[
        "Detecta la causa mas probable segun sintomas.",
        "Evita cambios de modulo sin diagnostico previo.",
        "Define cuando conviene pasar a microelectronica.",
      ]}
      symptomsTitle="Sintomas habituales en sensores biometricos"
      symptomsDescription="Estos escenarios son los que mas vemos en equipos que llegan a laboratorio."
      symptoms={symptoms}
      diagnosisTitle="Como se diagnostica en taller"
      diagnosisDescription="El objetivo es confirmar origen real y evitar intervenciones que no solucionan el problema."
      diagnostics={diagnostics}
      planTitle="Ruta de solucion por niveles"
      planDescription="Se prioriza el camino menos invasivo y se escala solo si hace falta."
      planSteps={planSteps}
      faq={faq}
      relatedLinks={relatedLinks}
      whatsappText="Hola Team Celular, vi la guia de Face ID/Touch ID y quiero evaluar mi iPhone"
    />
  );
}
