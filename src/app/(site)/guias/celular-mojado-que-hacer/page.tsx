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
  title: "Celular Mojado: Que Hacer en las Primeras 2 Horas | Team Celular",
  description:
    "Se mojo tu celular? Guia de accion inmediata para reducir riesgo de corto, corrosion y perdida de datos. Aprende que hacer y que evitar en las primeras horas.",
  keywords: [
    "celular mojado que hacer",
    "telefono mojado solucion",
    "reparacion celular mojado caba",
    "celular con agua no enciende",
    "servicio tecnico recoleta",
  ],
  openGraphTitle: "Celular Mojado: Que Hacer en las Primeras 2 Horas | Team Celular",
  openGraphDescription:
    "Pasos urgentes para minimizar daño por liquidos y decidir cuando necesitas laboratorio de microelectronica.",
  openGraphImagePath: "/images/guia_microelectronica.webp",
  openGraphImageAlt: "Reparacion de celular mojado en laboratorio",
  twitterTitle: "Celular Mojado: Que Hacer en las Primeras 2 Horas",
  twitterDescription:
    "Evita errores comunes y actua rapido para aumentar chances de recuperacion del equipo.",
  languages: {
    "es-AR": PAGE_PATH,
  },
});

const symptoms: GuideItem[] = [
  {
    title: "Pantalla con manchas o parpadeo",
    description:
      "El liquido en display o conectores puede generar lineas, brillo irregular o touch inestable.",
  },
  {
    title: "No enciende o reinicia solo",
    description:
      "Puede haber corto temporal o daño en circuito de energia por humedad interna.",
  },
  {
    title: "Audio distorsionado",
    description:
      "Parlante y microfono suelen degradarse rapido si no se secan y limpian correctamente.",
  },
  {
    title: "Carga erratica tras mojarse",
    description:
      "El puerto de carga puede quedar con residuos y corrosion, afectando energia y datos.",
  },
];

const diagnostics: GuideItem[] = [
  {
    title: "Evaluacion de ingreso de liquido",
    description:
      "Analizamos por donde entro el liquido y que modulos tienen mayor riesgo de corrosion.",
  },
  {
    title: "Limpieza quimica especializada",
    description:
      "Aplicamos limpieza tecnica para remover residuos conductivos y detener corrosion activa.",
  },
  {
    title: "Secado controlado de componentes",
    description:
      "No usamos metodos caseros. Se realiza secado en condiciones seguras para placa y conectores.",
  },
  {
    title: "Prueba de encendido y consumo",
    description:
      "Validamos estabilidad electrica para decidir si alcanza mantenimiento o requiere micro soldadura.",
  },
];

const planSteps: GuideItem[] = [
  {
    title: "Apagar el equipo de inmediato",
    description:
      "No intentes cargarlo ni forzarlo a encender. Cortar energia reduce riesgo de corto.",
  },
  {
    title: "Retirar funda, SIM y accesorios",
    description:
      "Permite ventilacion inicial y evita que el liquido quede atrapado por mas tiempo.",
  },
  {
    title: "Evitar remedios caseros",
    description:
      "No uses arroz, secador caliente ni alcohol comun. Pueden agravar el daño interno.",
  },
  {
    title: "Llevarlo a diagnostico tecnico",
    description:
      "Cuanto antes ingrese al laboratorio, mayor probabilidad de recuperar funciones y datos.",
  },
];

const faq: GuideFaqItem[] = [
  {
    question: "Sirve poner el celular mojado en arroz?",
    answer:
      "No es confiable. El arroz no elimina corrosion en placa y puede dejar residuos en puertos o rejillas.",
  },
  {
    question: "Si vuelve a prender, igual conviene revisarlo?",
    answer:
      "Si. Muchos equipos funcionan unas horas y fallan despues por corrosion progresiva en conectores o pistas.",
  },
  {
    question: "El agua dulce y salada afectan igual?",
    answer:
      "No. El agua salada acelera corrosion y suele ser mas agresiva para circuitos y soldaduras.",
  },
  {
    question: "En cuanto tiempo hay que actuar?",
    answer:
      "Lo ideal es dentro de las primeras 2 horas. Ese margen mejora mucho la posibilidad de recuperacion.",
  },
];

const relatedLinks: GuideRelatedLink[] = [
  { href: "/reparaciones/reparacion-placa-caba", label: "Servicio de reparacion de placa" },
  { href: "/guias/microelectronica-reballing-caba", label: "Guia de microelectronica" },
  { href: "/guias/pin-de-carga-suelto-solucion", label: "Pin de carga suelto" },
  { href: "/presupuesto-reparacion#solicitar-presupuesto", label: "Pedir diagnostico urgente" },
];

export default function WetPhoneGuidePage() {
  return (
    <HighIntentGuidePage
      siteUrl={SITE_URL}
      pagePath={PAGE_PATH}
      pageLabel="Celular mojado"
      title="Celular mojado: que hacer en las primeras 2 horas"
      heroDescription="Actuar rapido y evitar errores comunes puede marcar la diferencia entre una recuperacion simple y una falla compleja de placa."
      badge="Emergencia tecnica"
      readingTime="5 min"
      publishedTime="2026-04-16T00:00:00Z"
      modifiedTime="2026-04-16T00:00:00Z"
      imagePath="/images/guia_microelectronica.webp"
      heroPoints={[
        "Pasos concretos para minimizar corto y corrosion.",
        "Errores frecuentes que debes evitar desde el minuto uno.",
        "Criterios para decidir si requiere laboratorio avanzado.",
      ]}
      symptomsTitle="Senales de dano por liquidos"
      symptomsDescription="No todos los sintomas aparecen al instante. Estas pistas ayudan a anticipar complicaciones."
      symptoms={symptoms}
      diagnosisTitle="Que se evalua en laboratorio"
      diagnosisDescription="Un diagnostico temprano permite frenar corrosion y recuperar funciones antes de que escale."
      diagnostics={diagnostics}
      planTitle="Protocolo recomendado de accion"
      planDescription="Este orden reduce riesgos y mejora probabilidades de recuperacion del equipo."
      planSteps={planSteps}
      faq={faq}
      relatedLinks={relatedLinks}
      whatsappText="Hola Team Celular, vi la guia de celular mojado y necesito ayuda urgente con mi equipo"
    />
  );
}
