import type { Metadata } from "next";
import HighIntentGuidePage, {
  type GuideFaqItem,
  type GuideItem,
  type GuideRelatedLink,
} from "@/components/seo/HighIntentGuidePage";
import { buildWebsiteMetadata, getSiteUrl } from "@/lib/seoMetadata";

const SITE_URL = getSiteUrl();
const PAGE_PATH = "/guias/celular-con-virus-que-hacer";

export const metadata: Metadata = buildWebsiteMetadata({
  path: PAGE_PATH,
  title: "Celular con Virus: Cómo Saberlo y Qué Hacer",
  description:
    "Celular con virus: publicidad que aparece sola, batería que dura la mitad o apps que no instalaste. 5 pasos para limpiarlo y cuándo es hardware. CABA.",
  keywords: [
    "celular con virus",
    "como saber si mi celular tiene virus",
    "como eliminar virus del celular",
    "celular con publicidad invasiva",
    "celular hackeado que hacer",
    "iphone con virus",
    "android con virus",
    "servicio tecnico celulares recoleta",
  ],
  openGraphTitle: "Celular con virus: cómo saberlo y qué hacer | Team Celular",
  openGraphDescription:
    "Qué síntomas son malware, cuáles son batería o placa, y los pasos para limpiar el equipo sin perder datos.",
  openGraphImagePath: "/images/guia_mantenimiento.webp",
  openGraphImageAlt: "Diagnóstico de celular con síntomas de virus en Team Celular",
  twitterTitle: "Celular con virus: qué hacer | Team Celular",
  twitterDescription:
    "Síntomas reales de malware, pasos para limpiarlo y cuándo el problema es hardware.",
  languages: {
    "es-AR": PAGE_PATH,
  },
});

// Sintomas: mezcla deliberada de malware real y falsos positivos de hardware.
// La mitad de los "virus" que entran al laboratorio son bateria o placa.
const symptoms: GuideItem[] = [
  {
    title: "Publicidad a pantalla completa fuera de las apps",
    description:
      "Anuncios que aparecen en el escritorio, al desbloquear o sobre otras aplicaciones. Es el síntoma más claro de adware en Android: casi siempre viene de una app instalada hace poco.",
  },
  {
    title: "Apps o íconos que no instalaste",
    description:
      "Un launcher nuevo, un \"limpiador\" o una app sin nombre que no aparece en el cajón. En Android conviene mirar Ajustes > Aplicaciones ordenado por fecha de instalación.",
  },
  {
    title: "Notificaciones de \"tu celular tiene virus\"",
    description:
      "En iPhone, lo habitual no es un virus sino un calendario de spam al que se suscribió desde una web, o un perfil de configuración instalado. Ninguno de los dos se borra con un antivirus.",
  },
  {
    title: "Consumo de datos o batería que se disparó",
    description:
      "Puede ser una app en segundo plano, pero también una batería degradada o un consumo anormal en placa. Si el equipo además calienta apagado o en reposo, es más probable hardware que malware.",
  },
  {
    title: "Mensajes enviados desde tu WhatsApp o cuentas que no reconocés",
    description:
      "Suele ser robo de cuenta (código de verificación compartido o sesión abierta en WhatsApp Web), no infección del teléfono. Se resuelve cerrando sesiones y activando la verificación en dos pasos.",
  },
];

const diagnostics: GuideItem[] = [
  {
    title: "Modo seguro en Android",
    description:
      "Mantené apretado Apagar y después la opción Apagar hasta que aparezca Modo seguro. En ese modo solo corren apps de sistema: si la publicidad desaparece, la causa es una app que instalaste vos.",
  },
  {
    title: "Apps con permisos de administrador o accesibilidad",
    description:
      "Ajustes > Seguridad > Apps de administración del dispositivo, y Ajustes > Accesibilidad. Una app que se da esos permisos puede leer la pantalla e impedir que la desinstales. Quitale el permiso primero y después borrala.",
  },
  {
    title: "Perfiles y calendarios en iPhone",
    description:
      "Ajustes > General > VPN y gestión de dispositivos: si hay un perfil que no reconocés y el equipo no es de una empresa, eliminalo. Para las alertas falsas: Ajustes > Calendario > Cuentas > Calendarios suscritos.",
  },
  {
    title: "Consumo por app y temperatura",
    description:
      "En Ajustes > Batería se ve qué app gasta. Si ninguna explica el consumo, el equipo calienta cargando o se apaga con porcentaje, el diagnóstico se mueve a batería o placa, donde un antivirus no ayuda.",
  },
];

const planSteps: GuideItem[] = [
  {
    title: "Desconectá y cambiá contraseñas desde otro dispositivo",
    description:
      "Activá modo avión y, desde una computadora, cambiá la contraseña de Google o Apple ID, del mail y del home banking. Hacerlo desde el celular comprometido no sirve si hay algo leyendo la pantalla.",
  },
  {
    title: "Borrá la app sospechosa en modo seguro",
    description:
      "Ordená las apps por fecha de instalación y eliminá las que coinciden con el inicio de los síntomas. Revisá que Google Play Protect esté activado y ejecutá un análisis.",
  },
  {
    title: "Actualizá el sistema",
    description:
      "Instalá la última versión de Android o iOS disponible para tu modelo. Muchas vulnerabilidades que usa el malware ya están cerradas en actualizaciones que el equipo tiene pendientes.",
  },
  {
    title: "Si sigue: copia de seguridad y restablecimiento de fábrica",
    description:
      "Respaldá fotos y contactos (no las apps), restablecé el equipo y reinstalá las aplicaciones a mano desde la tienda oficial. Un restablecimiento elimina el malware común; restaurar una copia completa de apps puede traerlo de vuelta.",
  },
  {
    title: "Si después del restablecimiento sigue igual, es hardware",
    description:
      "Batería que se descarga, calentamiento o reinicios que sobreviven a un equipo recién restablecido no son virus. Ahí corresponde un diagnóstico técnico de batería, pin de carga o placa.",
  },
];

const faq: GuideFaqItem[] = [
  {
    question: "¿Cómo sé si mi celular tiene virus?",
    answer:
      "Los síntomas más confiables son publicidad que aparece fuera de las aplicaciones, apps que no instalaste y apps que se niegan a desinstalarse. Batería que dura poco o equipo lento, por sí solos, casi nunca son virus: suelen ser batería degradada, almacenamiento lleno o una falla de hardware.",
  },
  {
    question: "¿Un iPhone puede tener virus?",
    answer:
      "Es poco frecuente en un iPhone actualizado y sin jailbreak. Lo que se ve seguido son alertas falsas de un calendario de spam suscrito desde una web, o perfiles de configuración instalados sin querer. Los dos se eliminan desde Ajustes sin necesidad de antivirus.",
  },
  {
    question: "¿Sirve instalar un antivirus?",
    answer:
      "En Android, Google Play Protect ya viene incluido y alcanza para la mayoría de los casos. Muchas apps \"limpiadoras\" o \"antivirus\" de marcas desconocidas son justamente las que muestran publicidad invasiva. En iPhone, las apps de antivirus no pueden analizar otras aplicaciones.",
  },
  {
    question: "¿El restablecimiento de fábrica elimina el virus?",
    answer:
      "Elimina el malware común en Android y iPhone. Para que no vuelva, reinstalá las apps a mano desde Google Play o App Store en lugar de restaurar una copia de seguridad completa de aplicaciones. Fotos, contactos y chats se pueden respaldar sin riesgo.",
  },
  {
    question: "¿Pueden espiarme el celular con una app?",
    answer:
      "Sí: las apps espía (stalkerware) necesitan acceso físico al equipo para instalarse y suelen pedir permisos de accesibilidad o administrador. Si sospechás que alguien de tu entorno instaló una, cambiá contraseñas desde otro dispositivo antes de borrarla y considerá guardar evidencia primero.",
  },
  {
    question: "¿Cuándo conviene llevarlo a un servicio técnico?",
    answer:
      "Cuando los síntomas siguen después de un restablecimiento de fábrica, o cuando el equipo calienta, se reinicia o descarga la batería sin una app que lo explique. En esos casos la causa suele ser batería, pin de carga o placa. Team Celular, en Paraguay 2451 Recoleta (CABA), hace ese diagnóstico el mismo día, de lunes a viernes de 10:30 a 18:00.",
  },
];

const relatedLinks: GuideRelatedLink[] = [
  { href: "/reparaciones/cambio-bateria-caba", label: "Cambio de batería en CABA" },
  { href: "/reparaciones/reparacion-placa-caba", label: "Reparación de placa en CABA" },
  { href: "/guias/mantenimiento-preventivo-celulares", label: "Mantenimiento preventivo" },
  { href: "/presupuesto-reparacion#solicitar-presupuesto", label: "Pedir presupuesto" },
];

export default function PhoneVirusGuidePage() {
  return (
    <HighIntentGuidePage
      siteUrl={SITE_URL}
      pagePath={PAGE_PATH}
      pageLabel="Celular con virus"
      title="Celular con virus: cómo saberlo y qué hacer"
      heroDescription="Un celular con virus muestra publicidad fuera de las apps, tiene aplicaciones que no instalaste o apps que no se dejan borrar; eso se limpia en modo seguro o con un restablecimiento de fábrica. Si la batería se descarga, calienta o se reinicia incluso con el equipo recién restablecido, no es virus: es hardware. Team Celular, en Paraguay 2451 Recoleta (CABA), diagnostica ese tipo de falla el mismo día."
      badge="Software o hardware"
      readingTime="6 min"
      publishedTime="2026-09-14T00:00:00Z"
      modifiedTime="2026-09-14T00:00:00Z"
      imagePath="/images/guia_mantenimiento.webp"
      articleAbout={["Malware en celulares", "Seguridad móvil", "Diagnóstico de celulares"]}
      heroPoints={[
        "Publicidad fuera de las apps: casi siempre una app instalada.",
        "Lento o sin batería, solo eso: rara vez es virus.",
        "Cambiá contraseñas desde otro dispositivo, no desde el celular.",
        "Si sobrevive al restablecimiento de fábrica, es hardware.",
      ]}
      symptomsTitle="¿Cómo saber si mi celular tiene virus?"
      symptomsDescription="Algunos síntomas son malware casi seguro; otros se confunden con fallas de batería o placa."
      symptoms={symptoms}
      diagnosisTitle="¿Dónde buscar la app que causa el problema?"
      diagnosisDescription="Cuatro lugares del sistema que conviene revisar antes de borrar todo."
      diagnostics={diagnostics}
      planTitle="¿Cómo eliminar un virus del celular paso a paso?"
      planDescription="En orden: del paso menos invasivo al restablecimiento completo."
      planSteps={planSteps}
      faq={faq}
      relatedLinks={relatedLinks}
      whatsappText="Hola Team Celular, mi celular tiene síntomas raros (batería, calentamiento o reinicios) y quiero un diagnóstico. Marca y modelo:"
    />
  );
}
