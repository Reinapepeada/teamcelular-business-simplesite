import type { Metadata } from "next";
import HighIntentGuidePage, {
  type GuideFaqItem,
  type GuideItem,
  type GuideRelatedLink,
} from "@/components/seo/HighIntentGuidePage";
import { buildWebsiteMetadata, getSiteUrl } from "@/lib/seoMetadata";

const SITE_URL = getSiteUrl();
const PAGE_PATH = "/guias/celular-mojado-que-hacer";

export const metadata: Metadata = buildWebsiteMetadata({
  path: PAGE_PATH,
  title: "Celular Mojado: Qué Hacer (y Qué No) en las Primeras 2 Horas",
  description:
    "Apagalo, no lo cargues y no lo metas en arroz. Qué hacer tras mojar el celular, cuándo llevarlo a revisar y cómo se evalúa el daño por líquidos.",
  keywords: [
    "celular mojado que hacer",
    "telefono mojado solucion",
    "reparacion celular mojado caba",
    "celular con agua no enciende",
    "servicio tecnico recoleta",
  ],
  openGraphTitle: "Celular Mojado: Qué Hacer en las Primeras 2 Horas | Team Celular",
  openGraphDescription:
    "Pasos urgentes para minimizar daño por líquidos y decidir cuándo necesitás laboratorio de microelectrónica.",
  openGraphImagePath: "/opengraph-image.png",
  openGraphImageAlt: "Reparación de celular mojado en laboratorio",
  twitterTitle: "Celular Mojado: Qué Hacer en las Primeras 2 Horas",
  twitterDescription:
    "Evita errores comunes y actua rápido para aumentar chances de recuperación del equipo.",
  languages: {
    "es-AR": PAGE_PATH,
  },
});

const symptoms: GuideItem[] = [
  {
    title: "Pantalla con manchas o parpadeo",
    description:
      "El líquido en display o conectores puede generar líneas, brillo irregular o touch inestable.",
  },
  {
    title: "No enciende o reinicia solo",
    description:
      "Puede haber corto temporal o daño en circuito de energía por humedad interna.",
  },
  {
    title: "Audio distorsionado",
    description:
      "Parlante y microfono suelen degradarse rápido si no se secan y limpian correctamente.",
  },
  {
    title: "Carga erratica tras mojarse",
    description:
      "El puerto de carga puede quedar con residuos y corrosión, afectando energía y datos.",
  },
];

const diagnostics: GuideItem[] = [
  {
    title: "Evaluación de ingreso de líquido",
    description:
      "Analizamos por donde entro el líquido y que módulos tienen mayor riesgo de corrosión.",
  },
  {
    title: "Limpieza quimica especializada",
    description:
      "Aplicamos limpieza técnica para remover residuos conductivos y detener corrosión activa.",
  },
  {
    title: "Secado controlado de componentes",
    description:
      "No usamos métodos caseros. Se realiza secado en condiciones seguras para placa y conectores.",
  },
  {
    title: "Prueba de encendido y consumo",
    description:
      "Validamos estabilidad eléctrica para decidir si alcanza mantenimiento o requiere micro soldadura.",
  },
];

const planSteps: GuideItem[] = [
  {
    title: "Apagar el equipo de inmediato",
    description:
      "No intentes cargarlo ni forzarlo a encender. Cortar energía reduce riesgo de corto.",
  },
  {
    title: "Retirar funda y accesorios",
    description:
      "Retirá la funda y desconectá los accesorios. En iPhone, esperá a que esté seco antes de abrir la bandeja SIM. En otros modelos, seguí las instrucciones del fabricante; si no sabés cuál corresponde, no fuerces la bandeja.",
  },
  {
    title: "Evitar remedios caseros",
    description:
      "No uses arroz, secador caliente ni alcohol común. Pueden agravar el daño interno.",
  },
  {
    title: "Llevarlo a diagnóstico técnico",
    description:
      "Cuanto antes ingrese al laboratorio, mayor probabilidad de recuperar funciones y datos.",
  },
];

const faq: GuideFaqItem[] = [
  {
    question: "¿Sirve poner el celular mojado en arroz?",
    answer:
      "No es confiable. El arroz no elimina corrosión en placa y puede dejar residuos en puertos o rejillas.",
  },
  {
    question: "Si vuelve a prender, ¿igual conviene revisarlo?",
    answer:
      "Sí. Muchos equipos funcionan unas horas y fallan después por corrosión progresiva en conectores o pistas.",
  },
  {
    question: "¿El agua dulce y la salada afectan igual?",
    answer:
      "No. El agua salada acelera corrosión y suele ser mas agresiva para circuitos y soldaduras.",
  },
  {
    question: "¿En cuánto tiempo hay que actuar?",
    answer:
      "Consultá cuanto antes para coordinar la revisión. No hay un plazo que garantice la recuperación: depende del líquido, del daño y del estado del equipo.",
  },
];

const relatedLinks: GuideRelatedLink[] = [
  { href: "/reparaciones/recuperacion-celular-mojado-caba", label: "Diagnóstico y reparación de celular mojado en CABA" },
  { href: "/reparaciones/reparacion-placa-caba", label: "Servicio de reparacion de placa" },
  { href: "/guias/pin-de-carga-suelto-solucion", label: "Pin de carga con sulfato" },
  { href: "/guias/pin-de-carga-suelto-solucion", label: "Pin de carga dañado: cómo saberlo" },
  { href: "/presupuesto-reparacion#solicitar-presupuesto", label: "Pedir diagnostico urgente" },
];

export default function WetPhoneGuidePage() {
  return (
    <HighIntentGuidePage
      siteUrl={SITE_URL}
      pagePath={PAGE_PATH}
      pageLabel="Celular mojado"
      title="Celular mojado: que hacer en las primeras 2 horas"
      heroDescription="Si se te mojó el celular: apagalo, no lo cargues y no lo metas en arroz ni le pases secador. La corrosión puede avanzar aunque el equipo prenda. Team Celular, en Paraguay 2451 Recoleta y Amenábar 2032 Belgrano (CABA), evalúa el daño bajo microscopio. Confirmamos el plazo según el estado del equipo; si requiere revisión de placa, el informe lleva hasta 72 horas hábiles."
      badge="Emergencia técnica"
      readingTime="5 min"
      publishedTime="2026-04-16T00:00:00Z"
      modifiedTime="2026-10-15T00:00:00-03:00"
      imagePath="/opengraph-image.png"
      heroPoints={[
        "Pasos concretos para minimizar corto y corrosión.",
        "Errores frecuentes que debes evitar desde el minuto uno.",
        "Criterios para decidir si requiere laboratorio avanzado.",
      ]}
      symptomsTitle="¿Cuáles son las señales de daño por líquidos?"
      symptomsDescription="No todos los síntomas aparecen al instante. Estas pistas ayudan a anticipar complicaciones."
      symptoms={symptoms}
      diagnosisTitle="¿Qué evaluamos en laboratorio?"
      diagnosisDescription="Un diagnóstico temprano permite frenar corrosión y recuperar funciones antes de que escale."
      diagnostics={diagnostics}
      planTitle="¿Qué hacer si el celular se mojó?"
      planDescription="Este orden reduce riesgos y mejora probabilidades de recuperación del equipo."
      planSteps={planSteps}
      faq={faq}
      relatedLinks={relatedLinks}
      whatsappText="Hola Team Celular, vi la guía de celular mojado y necesito ayuda urgente con mi equipo"
    />
  );
}
