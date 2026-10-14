import Link from "next/link";
import { BsWhatsapp } from "react-icons/bs";
import { ArrowUpRight, Check, MapPin, ShieldCheck } from "lucide-react";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import TrackedCtaLink from "@/components/cro/TrackedCtaLink";
import VirusCleaningPlans from "@/components/repairs/VirusCleaningPlans";
import { BRANCHES, BUSINESS_PROFILE } from "@/lib/businessProfile";
import { buildWebsiteMetadata, getSiteUrl } from "@/lib/seoMetadata";
import { formatArsPrice } from "@/lib/repairPrices";
import { VIRUS_CLEANING_PLANS } from "@/lib/virusCleaning";

const PAGE_PATH = "/reparaciones/eliminar-virus-celular-caba";
const SITE_URL = getSiteUrl();
const SIMPLE_PRICE = formatArsPrice(VIRUS_CLEANING_PLANS[0].price);
const BACKUP_PRICE = formatArsPrice(VIRUS_CLEANING_PLANS[1].price);
const WHATSAPP_URL = `${BUSINESS_PROFILE.whatsapp}?text=${encodeURIComponent(
  "Hola Team Celular, quiero quitar la publicidad o los virus de mi celular conservando mis datos. Marca y modelo:"
)}`;

export const metadata = buildWebsiteMetadata({
  path: PAGE_PATH,
  title: `Quitar Virus del Celular en CABA desde ${SIMPLE_PRICE}`,
  description: `¿Tu celular se llena de publicidad? Limpieza conservando datos ${SIMPLE_PRICE} o reinstalación con backup ${BACKUP_PRICE}. Recoleta y Belgrano. Consultanos.`,
  keywords: ["quitar virus celular CABA", "eliminar virus celular", "sacar publicidad del celular", "limpieza celular sin perder datos", "servicio técnico virus Recoleta", "eliminar virus Android Belgrano"],
  robots: { index: true, follow: true },
  languages: { "es-AR": PAGE_PATH },
});

const symptoms = [
  { title: "Se abre publicidad aunque no estés navegando", text: "Desbloqueás el celular y un anuncio tapa la pantalla. Puede venir de una app con permisos para mostrarse sobre otras; revisamos cuál es y la quitamos." },
  { title: "Te aparecen avisos de que tenés un virus", text: "Una alerta de una página no es un diagnóstico. Muchas veces son notificaciones que aceptaste sin querer: se revisan los permisos del navegador antes de pensar en borrar el equipo." },
  { title: "Hay apps que no reconocés o no podés borrar", text: "Un juego, limpiador o aplicación que apareció cuando empezó el problema. Revisamos también accesibilidad y permisos de administrador que pueden impedir desinstalarla." },
];

const steps = [
  { title: "Nos mostrás qué está pasando", text: "Traé el celular o contanos por WhatsApp cuándo aparece el anuncio y desde cuándo. Marca, modelo y una captura del aviso ayudan; evitá incluir información personal." },
  { title: "Revisamos la causa y te pasamos el precio", text: "Miramos apps, permisos, navegador y sistema. Te explicamos si alcanza con la limpieza simple o hace falta reinstalar con backup. Decidís antes de que avancemos." },
  { title: "Limpiamos o reinstalamos con respaldo", text: "En la limpieza simple conservamos tus datos sin restablecer. Si hay que reinstalar, primero verificamos el backup y te avisamos qué se puede recuperar y qué requiere volver a iniciar sesión." },
  { title: "Probamos el celular con vos", text: "Revisamos que la publicidad que reportaste ya no aparezca y que puedas usar tus aplicaciones. Te mostramos qué permiso o app causaba el problema y cómo evitar volver a instalarla." },
];

const faqs = [
  { q: "¿Cuánto cuesta quitar un virus del celular?", a: `En Team Celular la limpieza simple conservando los datos cuesta ${SIMPLE_PRICE}. La reinstalación con backup cuesta ${BACKUP_PRICE}. Primero revisamos la causa y te explicamos qué opción corresponde. Son precios en pesos argentinos, confirmados el 14 de octubre de 2026.` },
  { q: "¿Puedo sacar la publicidad sin formatear?", a: "Muchas veces sí. Si viene de una app instalada o de notificaciones de una página, puede alcanzar con quitar la app o el permiso. La limpieza simple no restablece el equipo. Si el problema continúa, evaluamos el sistema antes de proponerte una reinstalación." },
  { q: "¿Voy a perder mis fotos o los chats de WhatsApp?", a: "La limpieza simple conserva fotos, contactos y chats. Para reinstalar hacemos primero un backup y comprobamos qué datos se pueden guardar. WhatsApp depende del acceso a tu cuenta, la copia y el espacio disponible. No borramos el equipo sin explicarte el resultado de esa revisión y recibir tu autorización." },
  { q: "¿Cuánto tarda la limpieza?", a: "El plazo depende de la causa y de si hace falta reinstalar. Un backup grande o una cuenta a la que no podés entrar puede demorar más que quitar una app. Te confirmamos el tiempo al revisar el celular; por WhatsApp podés consultar antes de venir." },
  { q: "¿Trabajan con Samsung, Motorola, Xiaomi y iPhone?", a: "Sí, revisamos celulares Android de esas marcas y también iPhone. En Android buscamos apps y permisos que generan publicidad. En iPhone revisamos avisos del navegador y calendarios no deseados. No todas las alertas significan una infección, y la solución cambia según el sistema." },
  { q: "¿La limpieza recupera un WhatsApp hackeado?", a: "Quitar una app no recupera automáticamente una cuenta. Si hay mensajes que no enviaste o sesiones desconocidas, también hay que revisar los accesos de WhatsApp y el proceso de recuperación de la cuenta. Contanos ese síntoma al consultar para evaluar el caso; no compartas códigos de verificación." },
  { q: "¿Qué tengo que llevar?", a: "El celular y acceso a tu cuenta de Google o Apple si hace falta reinstalar. Para un backup también necesitamos comprobar el acceso a tus datos y a WhatsApp. Ingresá tus contraseñas vos en el local; no las mandes por WhatsApp. Si no podés entrar a una cuenta, avisalo antes de borrar nada." },
];

export default function EliminarVirusCelularPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}${PAGE_PATH}#service`,
    name: "Limpieza de virus y publicidad del celular en CABA",
    serviceType: "Limpieza de software y reinstalación con backup de celulares",
    description: `Limpieza simple conservando datos por ${SIMPLE_PRICE} y reinstalación con backup por ${BACKUP_PRICE}. Revisión de aplicaciones, permisos y publicidad invasiva.`,
    url: `${SITE_URL}${PAGE_PATH}`,
    provider: { "@id": `${SITE_URL}#localbusiness` },
    areaServed: { "@type": "City", name: "Ciudad Autónoma de Buenos Aires" },
    offers: VIRUS_CLEANING_PLANS.map((plan) => ({
      "@type": "Offer", name: plan.name, price: plan.price, priceCurrency: "ARS", url: `${SITE_URL}${PAGE_PATH}#precios`,
    })),
  };

  return (
    <div className="w-full bg-black pb-20 text-[#f5f5f7]">
      <BreadcrumbJsonLd items={[
        { name: "Inicio", url: `${SITE_URL}/` },
        { name: "Reparaciones", url: `${SITE_URL}/reparaciones` },
        { name: "Quitar virus del celular", url: `${SITE_URL}${PAGE_PATH}` },
      ]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <nav aria-label="Ruta de navegación" className="flex flex-wrap gap-2 pt-8 text-xs text-[#a1a1a6]">
          <Link href="/reparaciones" className="min-h-11 py-3 hover:text-white">Reparaciones</Link>
          <span aria-hidden className="py-3">/</span><span className="py-3">Virus y publicidad</span>
        </nav>

        <header className="grid items-center gap-8 pb-10 pt-6 lg:grid-cols-[1.3fr_0.7fr] lg:gap-12 lg:pb-16 lg:pt-12">
          <div>
            <p className="tc-eyebrow">Servicio técnico · Recoleta y Belgrano</p>
            <h1 className="mt-4 text-balance text-[34px] font-semibold leading-[1.08] tracking-[-0.04em] sm:text-5xl lg:text-[64px]">Quitar virus y publicidad del celular en CABA</h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-7 text-[#a1a1a6]">¿Los anuncios no te dejan usar el teléfono? En Team Celular revisamos qué los provoca y limpiamos el equipo. <strong className="font-medium text-white">La limpieza simple conserva tus datos y cuesta {SIMPLE_PRICE}.</strong> Si hace falta reinstalar, hacemos un backup primero.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
              <TrackedCtaLink href={WHATSAPP_URL} ctaName="virus_hero_whatsapp" ctaLocation="virus_service_hero" ctaVariant="whatsapp" external className="tc-btn tc-btn-primary gap-2">
                <BsWhatsapp aria-hidden /> Consultar por mi celular
              </TrackedCtaLink>
              <a href="#sucursales" className="inline-flex min-h-11 items-center justify-center gap-2 text-base text-[#6aa6ff] hover:underline"><MapPin size={18} aria-hidden /> Ver dónde llevarlo</a>
            </div>
            <p className="mt-4 text-sm leading-6 text-[#a1a1a6]">{BUSINESS_PROFILE.hours.text}. Precio y plazo antes de trabajar.</p>
          </div>

          <aside className="rounded-[28px] bg-[#f5f5f7] p-6 text-[#1d1d1f] sm:p-8" aria-label="Opciones de limpieza">
            <ShieldCheck size={32} className="text-[#20216b]" strokeWidth={1.5} aria-hidden />
            <h2 className="mt-5 text-2xl font-semibold tracking-tight">Antes de borrar todo, revisemos la causa.</h2>
            <dl className="mt-5 divide-y divide-[#d2d2d7]">
              {VIRUS_CLEANING_PLANS.map((plan) => <div key={plan.id} className="py-4"><dt className="text-sm text-[#424245]">{plan.name}</dt><dd className="mt-1 text-3xl font-semibold tabular-nums">{formatArsPrice(plan.price)}</dd></div>)}
            </dl>
            <a href="#precios" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#20216b] hover:underline">Ver qué incluye cada opción <ArrowUpRight size={16} aria-hidden /></a>
          </aside>
        </header>

        <nav aria-label="En esta página" className="mb-10 flex flex-wrap gap-x-6 border-y border-white/15 py-2 text-sm text-[#a1a1a6]">
          {[ ["#precios", "Precios"], ["#sintomas", "Qué te está pasando"], ["#datos", "Tus fotos y chats"], ["#sucursales", "Cómo llegar"] ].map(([href, label]) => <a key={href} href={href} className="inline-flex min-h-11 items-center hover:text-white">{label}</a>)}
        </nav>

        <VirusCleaningPlans />

        <section id="sintomas" className="scroll-mt-24 py-10 md:py-16">
          <p className="tc-eyebrow">Lo que vemos en el teléfono</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">¿Te pasa alguna de estas cosas?</h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#a1a1a6]">“Tiene un virus” es una forma habitual de describir el problema. Para resolverlo, importa dónde aparece la publicidad y qué cambió antes de que empezara.</p>
          <div className="mt-7 divide-y divide-white/15">
            {symptoms.map((item, i) => <article key={item.title} className="grid gap-3 py-6 md:grid-cols-[40px_1fr_1.2fr] md:gap-6"><span className="text-sm tabular-nums text-[#6aa6ff]" aria-hidden>0{i + 1}</span><h3 className="text-xl font-medium leading-7">{item.title}</h3><p className="text-base leading-7 text-[#a1a1a6]">{item.text}</p></article>)}
          </div>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-[#a1a1a6]">Si solamente está lento, calienta o la batería dura poco, puede haber otra causa. Revisamos software, almacenamiento y, cuando corresponde, <Link href="/reparaciones/cambio-bateria-caba" className="text-[#6aa6ff] underline underline-offset-4">el estado de la batería</Link>. Tampoco confundimos la publicidad normal dentro de una app gratuita con una infección.</p>
        </section>

        <section className="border-t border-white/15 py-10 md:py-16">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Cómo hacemos la limpieza</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => <article key={step.title}><p className="mb-4 text-sm font-semibold text-[#6aa6ff]">0{i + 1}</p><h3 className="text-xl font-medium leading-7">{step.title}</h3><p className="mt-3 text-sm leading-7 text-[#a1a1a6]">{step.text}</p></article>)}
          </div>
        </section>

        <section id="datos" className="scroll-mt-24 rounded-[28px] bg-[#171719] p-6 sm:p-10">
          <div className="grid gap-6 md:grid-cols-2 md:gap-12">
            <div><p className="tc-eyebrow">Fotos, contactos y WhatsApp</p><h2 className="mt-3 text-3xl font-semibold tracking-tight">Tus datos se revisan antes de reinstalar.</h2><p className="mt-4 text-base leading-7 text-[#a1a1a6]">La diferencia entre las dos opciones es el trabajo que necesita el equipo. Si alcanza con quitar una app, no restablecemos el celular. Si hay que reinstalar, hacemos un backup y revisamos su contenido antes de borrar.</p></div>
            <ul className="space-y-4 text-sm leading-7 text-[#c7c7cc]">
              {[
                "Te avisamos si una foto, chat o dato de una app no se puede respaldar. La copia depende del acceso a las cuentas y del espacio disponible.",
                "Para configurar el equipo después, necesitás tu cuenta de Google o Apple. Ingresás vos tus contraseñas; no las envíes por WhatsApp.",
                "La limpieza no desbloquea cuentas ni garantiza recuperar una cuenta robada. Si sospechás accesos ajenos, también hay que revisar las sesiones.",
              ].map((text) => <li key={text} className="flex gap-3"><Check size={18} className="mt-1 shrink-0 text-[#6aa6ff]" aria-hidden />{text}</li>)}
            </ul>
          </div>
        </section>

        <section id="sucursales" className="scroll-mt-24 py-10 md:py-16">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Dónde llevar el celular en CABA</h2>
          <p className="mt-4 text-base leading-7 text-[#a1a1a6]">Podés acercarte sin turno. {BUSINESS_PROFILE.hours.text}. Si necesitás saber el plazo antes de salir, consultanos por WhatsApp con tu modelo.</p>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {BRANCHES.map((branch) => <article key={branch.shortName} className="rounded-[24px] border border-white/20 p-6"><MapPin size={22} className="text-[#6aa6ff]" aria-hidden /><h3 className="mt-4 text-2xl font-semibold">{branch.shortName}</h3><p className="mt-2 text-lg text-[#c7c7cc]">{branch.street}, CABA</p><div className="mt-4 flex flex-wrap gap-x-6 gap-y-2"><TrackedCtaLink href={branch.mapUrl} external target="_blank" ctaName={`virus_map_${branch.shortName.toLowerCase()}`} ctaLocation="virus_service_branches" ctaVariant="other" className="inline-flex min-h-11 items-center gap-2 font-medium text-[#6aa6ff] hover:underline">Cómo llegar <ArrowUpRight size={16} aria-hidden /></TrackedCtaLink><Link href={branch.url} className="inline-flex min-h-11 items-center text-sm text-[#a1a1a6] hover:text-white">Ver sucursal</Link></div></article>)}
          </div>
        </section>

        <section className="border-t border-white/15 py-10 md:py-14">
          <h2 className="text-3xl font-semibold tracking-tight">Antes de traerlo</h2>
          <div className="mt-6 divide-y divide-white/15">{faqs.map((faq) => <details key={faq.q} className="group py-1"><summary className="min-h-14 cursor-pointer py-4 text-base font-medium marker:text-[#6aa6ff] sm:text-lg">{faq.q}</summary><p className="max-w-4xl pb-5 text-sm leading-7 text-[#a1a1a6]">{faq.a}</p></details>)}</div>
        </section>

        <section className="rounded-[28px] bg-[#f5f5f7] p-6 text-[#1d1d1f] sm:p-10">
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight">Contanos qué aparece en tu pantalla.</h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#424245]">No hace falta que sepas si es un virus. Mandanos la marca, el modelo y qué te está pasando para orientar la revisión.</p>
          <TrackedCtaLink href={WHATSAPP_URL} ctaName="virus_final_whatsapp" ctaLocation="virus_service_final" ctaVariant="whatsapp" external className="tc-btn tc-btn-primary mt-6 gap-2"><BsWhatsapp aria-hidden /> Hablar con Team Celular</TrackedCtaLink>
        </section>

        <aside className="pt-8 text-sm leading-7 text-[#a1a1a6]">
          <p>Si preferís empezar por tu cuenta, leé nuestra <Link href="/guias/celular-con-virus-que-hacer" className="text-[#6aa6ff] underline underline-offset-4">guía para reconocer y quitar publicidad del celular</Link>.</p>
          <p className="mt-2">Referencia técnica: <a href="https://support.google.com/chrome/answer/2765944?hl=es-419&co=GENIE.Platform%3DAndroid" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">ayuda de Google sobre apps y notificaciones no deseadas</a> y <a href="https://support.apple.com/es-lamr/102444" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">ayuda de Apple para eliminar calendarios no deseados</a>.</p>
        </aside>
      </div>
    </div>
  );
}
