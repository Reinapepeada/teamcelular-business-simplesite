import type { Metadata } from "next";
import { BsCheckCircleFill } from "react-icons/bs";
import TrackedCtaLink from "@/components/cro/TrackedCtaLink";
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
    "Celular con virus: cómo saberlo, 5 pasos para limpiarlo y cuándo es hardware. Limpieza sin perder fotos ni chats en Recoleta, CABA, desde $30.000.",
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
  openGraphImagePath: "/images/guia-celular-virus.webp",
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
      "Cuando no querés arriesgar fotos y chats haciendo el restablecimiento por tu cuenta, cuando el virus vuelve o cuando el equipo calienta, se reinicia o descarga la batería sin una app que lo explique. Team Celular, en Paraguay 2451 Recoleta (CABA), atiende de lunes a viernes de 10:30 a 18:00.",
  },
  {
    question: "¿Cuánto cuesta quitar un virus del celular?",
    answer:
      "En Team Celular (Recoleta, CABA) la limpieza mínima, que elimina la app responsable sin reinstalar el sistema, cuesta $30.000. El restablecimiento sin respaldo cuesta $45.000 y la limpieza completa conservando fotos, contactos y chats cuesta $60.000. Precios vigentes a septiembre de 2026.",
  },
  {
    question: "¿Se puede quitar un virus sin perder las fotos ni los chats?",
    answer:
      "Sí. Se respaldan fotos, contactos y chats, se restablece el equipo y se restauran solo esos datos, reinstalando las apps limpias desde la tienda oficial. Lo que se pierde es la configuración interna de algunas apps, que pueden pedir volver a iniciar sesión.",
  },
];

// Tres opciones con ancla de precio: la minima tiene un techo claro (no reinstala
// el sistema) y la de 45 mil pierde los datos por solo 15 mil menos, asi la
// completa queda como la opcion obvia. Precios en pesos: actualizar la fecha.
const WHATSAPP_URL = "https://wa.me/5491151034595?text=";

const plans: {
  id: string;
  name: string;
  price: string;
  data: string;
  includes: string[];
  fit: string;
  recommended?: boolean;
}[] = [
  {
    id: "minima",
    name: "Limpieza mínima",
    price: "$30.000",
    data: "No se borra nada",
    includes: [
      "Revisión de apps, permisos de administrador y accesibilidad",
      "Eliminación de la app que genera la publicidad o el perfil sospechoso",
    ],
    fit: "Publicidad invasiva que empezó hace pocos días. No reinstala el sistema: si el problema vuelve, lo pagado se descuenta de la limpieza completa.",
  },
  {
    id: "completa",
    name: "Limpieza completa sin perder datos",
    price: "$60.000",
    data: "Conserva fotos, contactos y chats",
    includes: [
      "Respaldo de fotos, contactos y chats de WhatsApp",
      "Restablecimiento de fábrica y actualización del sistema",
      "Restauración de tus datos y reinstalación limpia de apps desde la tienda oficial",
      "Cierre de sesiones abiertas y verificación en dos pasos en Google y WhatsApp",
    ],
    fit: "Virus que vuelve, apps que no se dejan borrar o sospecha de app espía. Las apps se reinstalan: algunas piden volver a iniciar sesión.",
    recommended: true,
  },
  {
    id: "restablecimiento",
    name: "Restablecimiento sin respaldo",
    price: "$45.000",
    data: "Se borra todo el contenido",
    includes: [
      "Restablecimiento de fábrica y actualización del sistema",
      "Reinstalación de apps desde la tienda oficial",
      "Cierre de sesiones abiertas y verificación en dos pasos",
    ],
    fit: "Equipo sin fotos ni chats que te importen, o que ya tenés respaldado por tu cuenta.",
  },
];

function VirusCleaningPlans() {
  return (
    <section id="precios" className="w-full">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white md:text-3xl">
        ¿Cuánto cuesta sacar un virus del celular en CABA?
      </h2>
      <p className="mt-3 max-w-3xl text-[15px] leading-7 text-slate-600 dark:text-slate-300">
        Team Celular, en Paraguay 2451 Recoleta, elimina virus de celulares
        Android y iPhone desde $30.000. La limpieza completa sin perder fotos,
        contactos ni chats cuesta $60.000. Antes de intervenir, verificamos que
        la falla no sea de batería o placa.
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-[0.9fr_1.2fr_0.9fr] lg:items-center">
        {plans.map((plan) => (
          <article
            key={plan.id}
            className={
              plan.recommended
                ? "order-first rounded-2xl bg-[#20216b] p-6 text-white shadow-xl lg:order-none lg:p-8"
                : "rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
            }
          >
            {plan.recommended && (
              <p className="mb-3 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wide">
                Recomendada
              </p>
            )}
            <h3
              className={`text-lg font-bold ${plan.recommended ? "" : "text-slate-900 dark:text-white"}`}
            >
              {plan.name}
            </h3>
            <p
              className={`mt-2 text-3xl font-extrabold tracking-tight ${plan.recommended ? "lg:text-4xl" : "text-slate-900 dark:text-white"}`}
            >
              {plan.price}
            </p>
            <p
              className={`mt-1 text-sm font-semibold ${plan.recommended ? "text-emerald-300" : "text-slate-500 dark:text-slate-400"}`}
            >
              {plan.data}
            </p>

            <ul
              className={`mt-4 divide-y text-sm leading-6 ${plan.recommended ? "divide-white/15" : "divide-slate-100 text-slate-600 dark:divide-slate-800 dark:text-slate-300"}`}
            >
              {plan.includes.map((item) => (
                <li key={item} className="flex gap-2 py-2">
                  <BsCheckCircleFill
                    className={`mt-1 h-4 w-4 shrink-0 ${plan.recommended ? "text-emerald-300" : "text-primary"}`}
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>

            <p
              className={`mt-4 text-[13px] leading-6 ${plan.recommended ? "text-white/75" : "text-slate-500 dark:text-slate-400"}`}
            >
              {plan.fit}
            </p>

            <TrackedCtaLink
              href={`${WHATSAPP_URL}${encodeURIComponent(`Hola Team Celular, quiero la ${plan.name.toLowerCase()} (${plan.price}) para mi celular. Marca y modelo:`)}`}
              ctaName={`guide_virus_plan_${plan.id}`}
              ctaLocation="guide_virus_pricing"
              ctaVariant="whatsapp"
              external
              target="_blank"
              className={
                plan.recommended
                  ? "mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-bold text-[#20216b] transition hover:bg-slate-100"
                  : "mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-primary/40 hover:text-primary dark:border-slate-600 dark:text-slate-200"
              }
            >
              {plan.recommended ? "Reservar limpieza completa" : "Consultar por WhatsApp"}
            </TrackedCtaLink>
          </article>
        ))}
      </div>

      <p className="mt-4 text-[13px] leading-6 text-slate-500 dark:text-slate-400">
        Precios vigentes al 14 de septiembre de 2026. Si el diagnóstico muestra
        que el problema es batería, pin de carga o placa, te pasamos el
        presupuesto de esa reparación antes de hacer nada. Lunes a viernes de
        10:30 a 18:00.
      </p>
    </section>
  );
}

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
      heroDescription="Un celular con virus muestra publicidad fuera de las apps, tiene aplicaciones que no instalaste o apps que no se dejan borrar; eso se limpia en modo seguro o con un restablecimiento de fábrica. Si preferís no arriesgar tus datos, Team Celular, en Paraguay 2451 Recoleta (CABA), elimina virus desde $30.000 y hace la limpieza completa conservando fotos, contactos y chats por $60.000."
      badge="Software o hardware"
      readingTime="6 min"
      publishedTime="2026-09-14T00:00:00Z"
      modifiedTime="2026-09-14T00:00:00Z"
      imagePath="/images/guia-celular-virus.webp"
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
      priceTable={<VirusCleaningPlans />}
      faq={faq}
      relatedLinks={relatedLinks}
      whatsappText="Hola Team Celular, creo que mi celular tiene virus y quiero sacarlo sin perder mis datos. Marca y modelo:"
    />
  );
}
