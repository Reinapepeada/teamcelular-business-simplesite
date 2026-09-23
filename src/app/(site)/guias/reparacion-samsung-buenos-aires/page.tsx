import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import ArticleSchema from "@/components/seo/ArticleSchema";
import AuthorByline from "@/components/seo/AuthorByline";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import GoogleReviewsAPI from "@/components/cards/GoogleReviewsAPI";
import GuideInterlinkSection from "@/components/seo/GuideInterlinkSection";
import { INSTALLMENTS_MESSAGE, WARRANTY_SCOPE_MESSAGE } from "@/lib/copyStandards";
import {
  FaBolt,
  FaCamera,
  FaCheckCircle,
  FaMobileAlt,
  FaMicrochip,
  FaShieldAlt,
  FaTools,
  FaWrench,
} from "react-icons/fa";
import { SiSamsung } from "react-icons/si";
import GuideByline from "@/components/seo/GuideByline";
import { BRAND_REPAIR_PRICES, buildPriceOffers, priceRangeOf } from "@/lib/repairPrices";

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";
const PAGE_PATH = "/guias/reparacion-samsung-buenos-aires";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: "Reparación de Samsung Galaxy en CABA | Team Celular",
  description:
    "Pantalla Samsung línea A desde $99.900 y línea S desde $299.900. Reparamos Galaxy en CABA con diagnóstico el mismo día y garantía escrita 90 días.",
  keywords: [
    "reparacion samsung buenos aires",
    "service samsung caba",
    "cambio pantalla samsung amoled",
    "reparacion galaxy s24",
    "reparar samsung z fold",
    "cambio bateria samsung recoleta",
    "reparacion placa samsung",
    "servicio tecnico galaxy a",
    "reparar puerto usb c samsung",
    "tecnico samsung buenos aires",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  authors: [{ name: "Team Celular" }],
  creator: "Team Celular",
  publisher: "Team Celular",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Reparación de Samsung Galaxy en Buenos Aires, CABA | Team Celular",
    description:
      "Team Celular, Paraguay 2451 Recoleta CABA. Pantalla AMOLED, batería y USB-C en el día, diagnóstico mismo día y garantía escrita 90 días. Galaxy S, A y Z.",
    type: "article",
    url: PAGE_URL,
    locale: "es_AR",
    images: [
      {
        url: "https://teamcelular.com/images/guia_samsung.webp",
        width: 1200,
        height: 630,
        alt: "Reparación de Samsung Galaxy en Team Celular",
      },
    ],
    publishedTime: "2026-03-12T00:00:00Z",
    modifiedTime: "2026-09-23T00:00:00Z",
    section: "Guías técnicas",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reparación de Samsung Galaxy en CABA | Team Celular",
    description:
      "Team Celular, Paraguay 2451 Recoleta. Pantalla AMOLED y batería en el día, garantía escrita 90 días. Galaxy S, A, Note y Z Fold.",
    images: ["https://teamcelular.com/images/guia_samsung.webp"],
  },
};

const brandLinks = [
  {
    href: "/guias/reparacion-iphone-buenos-aires",
    label: "iPhone",
    helper: "Apple con True Tone y Face ID",
    active: false,
  },
  {
    href: "/guias/reparacion-samsung-buenos-aires",
    label: "Samsung",
    helper: "Galaxy S, A, Z Fold y Z Flip",
    active: true,
  },
  {
    href: "/guias/reparacion-xiaomi-buenos-aires",
    label: "Xiaomi",
    helper: "Xiaomi, Redmi y POCO",
    active: false,
  },
  {
    href: "/guias/reparacion-motorola-buenos-aires",
    label: "Motorola",
    helper: "Moto G, Edge y Razr",
    active: false,
  },
];

const processSteps = [
  {
    title: "Lo probamos antes de abrirlo",
    description:
      "Anotamos el número de serie y probamos pantalla, cámaras, sensores, WiFi, Bluetooth y carga rápida con vos adelante. Así queda claro qué andaba y qué no.",
    duration: "15 min",
    Icon: FaMobileAlt,
  },
  {
    title: "Buscamos la falla de origen",
    description:
      "Medimos consumo, líneas de carga del USB-C y estabilidad de la placa. Un Galaxy que se apaga no siempre necesita batería: a veces es el pin o un corto en placa.",
    duration: "30-45 min",
    Icon: FaTools,
  },
  {
    title: "Cambio de la pieza",
    description:
      "Antes de instalar te decimos si el repuesto es Service Pack (original de Samsung) u OLED compatible, y qué cambia entre uno y otro en tu modelo.",
    duration: "2-4 h",
    Icon: FaWrench,
  },
  {
    title: "Prueba final y garantía",
    description:
      `Probamos llamadas, cámaras, datos, carga rápida y temperatura antes de devolvértelo. ${WARRANTY_SCOPE_MESSAGE}`,
    duration: "20 min",
    Icon: FaCheckCircle,
  },
];

const repairServices = [
  {
    title: "Cambio de pantalla AMOLED Samsung",
    detail:
      "Líneas verdes, manchas negras o touch que no responde. Cambiamos el módulo completo y te avisamos si el repuesto mantiene los 120 Hz.",
    eta: "2-4 h",
    Icon: FaMobileAlt,
  },
  {
    title: "Batería que no dura",
    detail:
      "Se apaga con el frío, pasa de 30% a 0% de golpe o pierde carga sin usarlo. Si la tapa se levantó, apagalo: la batería está hinchada.",
    eta: "1-2 h",
    Icon: FaBolt,
  },
  {
    title: "Puerto USB-C y carga rápida",
    detail:
      "Carga solo en una posición, el cable queda flojo o dejó de aparecer la carga rápida. No lo limpies con una aguja: se doblan los pines.",
    eta: "2-3 h",
    Icon: FaShieldAlt,
  },
  {
    title: "Cámara que no enfoca o vibra",
    detail:
      "Fotos borrosas, zumbido al abrir la cámara o lente trasero partido. En Galaxy S suele ser el estabilizador (OIS) del módulo.",
    eta: "2-4 h",
    Icon: FaCamera,
  },
  {
    title: "Placa de Samsung",
    detail:
      "Queda en el logo, se reinicia solo o no prende después de un golpe o de mojarse. Va a laboratorio con microscopio.",
    eta: "24-48 h",
    Icon: FaMicrochip,
  },
  {
    title: "Bisagra, flex y display en Z Fold / Z Flip",
    detail:
      "Revisamos pliegue, bisagra, flex y pantalla interna para ver si conviene cambiar una pieza o el conjunto. Te pasamos las dos opciones.",
    eta: "24-72 h",
    Icon: FaWrench,
  },
];

const samsungSymptomRows = [
  {
    symptom: "Pantalla con líneas, manchas o táctil que falla",
    urgency: "Alta si aparecen zonas negras o el táctil deja de responder",
    typicalTime: "2-4 h si hay módulo compatible en stock",
    nextStep: "Enviar modelo exacto y una foto para confirmar disponibilidad",
  },
  {
    symptom: "Batería dura poco, se apaga o se hincha",
    urgency: "Alta si levanta la tapa, calienta o baja de golpe",
    typicalTime: "1-2 h según modelo Galaxy",
    nextStep: "Apagarlo si está hinchado y pedir diagnóstico de consumo",
  },
  {
    symptom: "No carga, carga lento o el USB-C hace falso contacto",
    urgency: "Alta si solo carga en una posición o dejó de encender",
    typicalTime: "2-3 h para módulo de carga; más si la falla está en placa",
    nextStep: "No forzar el conector y consultar con el modelo exacto",
  },
  {
    symptom: "Queda en el logo, reinicia o se mojó",
    urgency: "Crítica si tuvo contacto con líquido: no cargar ni aplicar calor",
    typicalTime: "24-48 h para limpieza y diagnóstico de placa",
    nextStep: "Traerlo apagado al laboratorio lo antes posible",
  },
  {
    symptom: "Z Fold o Z Flip no abre, no da imagen o falla en el pliegue",
    urgency: "Alta para evitar que el flex o la pantalla interna se dañen más",
    typicalTime: "24-72 h según bisagra, flex y repuesto",
    nextStep: "No forzar la bisagra y solicitar evaluación específica",
  },
];

const repairLinks: Record<string, string> = {
  "Cambio de pantalla AMOLED Samsung": "/reparaciones/cambio-pantalla-caba",
  "Batería que no dura": "/reparaciones/cambio-bateria-caba",
  "Puerto USB-C y carga rápida": "/reparaciones/cambio-pin-carga-caba",
  "Cámara que no enfoca o vibra": "/reparaciones/cambio-camara-caba",
  "Placa de Samsung": "/reparaciones/reparacion-placa-caba",
};


const samsungModels = [
  "Galaxy S25 Ultra",
  "Galaxy S25 Edge",
  "Galaxy S25+",
  "Galaxy S25",
  "Galaxy S24 Ultra",
  "Galaxy S24+",
  "Galaxy S24",
  "Galaxy S23 Ultra",
  "Galaxy S23+",
  "Galaxy S23",
  "Galaxy S22 Ultra",
  "Galaxy S22",
  "Galaxy S21 FE",
  "Galaxy A56",
  "Galaxy A55",
  "Galaxy A54",
  "Galaxy A36",
  "Galaxy A35",
  "Galaxy A34",
  "Galaxy A26",
  "Galaxy A24",
  "Galaxy A16",
  "Galaxy A15",
  "Galaxy Z Fold6",
  "Galaxy Z Fold5",
  "Galaxy Z Flip6",
  "Galaxy Z Flip5",
  "Galaxy Note 20 Ultra",
];

const faq = [
  {
    question: "¿Cuánto tarda un cambio de pantalla Samsung?",
    answer:
      "Si el módulo está en stock, entre 2 y 4 horas en las líneas S y A. Si hay que pedirlo, te avisamos el plazo antes de que lo dejes.",
  },
  {
    question: "¿Se mantiene la tasa de refresco de 120 Hz?",
    answer:
      "Depende del repuesto: hay pantallas compatibles que no llegan a 120 Hz. Te lo decimos antes de instalar para que elijas.",
  },
  {
    question: "¿Reparan Samsung mojados?",
    answer:
      "Sí. Lo abrimos, limpiamos la placa y medimos la corrosión. Lo más importante: no lo cargues ni lo metas en arroz, traelo apagado cuanto antes.",
  },
  {
    question: "¿Arreglan Z Fold y Z Flip?",
    answer:
      "Sí. Son los más delicados: revisamos bisagra, flex y pantalla interna, y el trabajo lleva de 24 a 72 horas según el repuesto.",
  },
  {
    question: "¿La reparación tiene garantía?",
    answer: `Sí. ${WARRANTY_SCOPE_MESSAGE}`,
  },
  {
    question: "¿Qué diferencia hay entre pantalla Service Pack, OLED compatible y alternativa económica?",
    answer:
      "La pantalla Service Pack prioriza las especificaciones originales del equipo. Una OLED compatible puede ofrecer una buena relación entre costo y resultado, mientras que una alternativa económica puede cambiar brillo, color, consumo o respuesta táctil. Antes de instalar te informamos qué opción hay para tu modelo y qué funciones conserva.",
  },
  {
    question: "¿Reparan Samsung Galaxy A16, A15, A35, A54 y A55?",
    answer:
      "Sí. Trabajamos las líneas Galaxy A y confirmamos stock de pantalla, batería o módulo de carga según el código exacto del equipo antes de desarmar.",
  },
  {
    question: "¿Reparan Samsung Galaxy S23, S24 y S25 Ultra?",
    answer:
      "Sí. En la línea Galaxy S revisamos pantalla AMOLED, cámaras, carga, batería y placa. En modelos Ultra verificamos además respuesta táctil, tasa de refresco y funciones asociadas al repuesto elegido.",
  },
  {
    question: "¿Es un servicio oficial de Samsung?",
    answer:
      "No somos un centro oficial Samsung. Somos un laboratorio técnico independiente en CABA y explicamos por escrito el diagnóstico, el repuesto ofrecido, el tiempo estimado y la garantía antes de avanzar.",
  },
  {
    question: "¿Cuánto cuesta el diagnóstico si no hago la reparación?",
    answer:
      "El diagnóstico tiene costo y se informa antes de abrir el equipo. Si aprobás la reparación, ese monto se descuenta del trabajo final. Confirmamos el valor exacto al recibir el Samsung.",
  },
];

export default function SamsungRepairGuidePage() {
  return (
    <div className="flex w-full justify-center px-4 py-16">
      <ArticleSchema
        title="Reparación de Samsung Galaxy en Buenos Aires | Team Celular"
        description="Precios, tiempos y fallas comunes de Samsung Galaxy, con diagnóstico el mismo día y garantía escrita de 90 días en CABA."
        publishedTime="2026-03-12T00:00:00Z"
        modifiedTime="2026-09-23T00:00:00Z"
        about={[
          "reparacion de Samsung en Buenos Aires",
          "service tecnico Samsung Galaxy en CABA",
          "cambio de pantalla AMOLED Samsung",
          "cambio de bateria Samsung Galaxy",
          "reparacion de Galaxy S, A, Z Fold y Z Flip",
        ]}
        image="https://teamcelular.com/images/guia_samsung.webp"
        url={PAGE_URL}
      />

      <article className="w-full max-w-6xl space-y-14">
        <BreadcrumbJsonLd
          items={[
            { name: "Inicio", url: `${SITE_URL}/` },
            { name: "Guías", url: `${SITE_URL}/guias` },
            { name: "Reparación de Samsung", url: PAGE_URL },
          ]}
        />

        <nav className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <Link href="/" className="transition hover:text-primary">
            Inicio
          </Link>
          <span>/</span>
          <Link href="/guias" className="transition hover:text-primary">
            Guías
          </Link>
          <span>/</span>
          <span className="font-semibold text-slate-900 dark:text-white">
            Reparación Samsung
          </span>
        </nav>

        <header className="space-y-8 rounded-3xl border border-white/20 bg-white/5 p-8 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30 md:p-14">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/70 bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              <SiSamsung />
              Especialistas por marca
            </span>
            <span className="rounded-full border border-emerald-700/80 bg-emerald-700 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white">
              Recoleta y Belgrano · CABA
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white md:text-5xl">
              Reparación de Samsung Galaxy en Buenos Aires
            </h1>
            <p className="max-w-4xl text-lg leading-relaxed text-slate-700 dark:text-slate-300">
              Team Celular, en Paraguay 2451 Recoleta CABA, repara Samsung
              Galaxy con diagnóstico el mismo día, pantalla AMOLED y batería en
              2–4 h, y garantía escrita de 90 días sobre trabajo y repuesto.
              Galaxy S, A, Note, Z Fold y Z Flip.
            </p>
            <div className="mt-4">
              <GuideByline modifiedTime="2026-09-23T00:00:00Z" tone="light" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-lg dark:border-white/15 dark:bg-slate-900/40">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Diagnóstico
              </p>
              <p className="mt-2 text-3xl font-black text-primary">24 h</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Te decimos qué tiene y cuánto sale
              </p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-lg dark:border-white/15 dark:bg-slate-900/40">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Garantía
              </p>
              <p className="mt-2 text-3xl font-black text-secondary">90 días</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Garantía escrita sobre trabajo y repuesto
              </p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-lg dark:border-white/15 dark:bg-slate-900/40">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Servicio express
              </p>
              <p className="mt-2 text-3xl font-black text-primary">2-4 h</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Pantalla, batería y carga en el día
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {brandLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full border px-5 py-3 text-sm font-semibold transition ${
                  item.active
                    ? "border-primary bg-primary text-white shadow-lg shadow-primary/25"
                    : "border-slate-300/80 bg-white/80 text-slate-700 hover:border-primary/40 hover:text-primary dark:border-slate-600/70 dark:bg-slate-900/70 dark:text-slate-200"
                }`}
              >
                {item.label}
                <span className="ml-2 text-xs font-medium">{item.helper}</span>
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/presupuesto-reparacion"
              className="rounded-full bg-primary px-8 py-4 text-base font-bold text-white shadow-lg transition hover:bg-primary/90"
            >
              Cotizar reparación Samsung
            </Link>
            <Link
              href="https://wa.me/5491151034595?text=Hola%20Team%20Celular%2C%20quiero%20cotizar%20una%20reparacion%20de%20Samsung"
              className="rounded-full border-2 border-primary px-8 py-4 text-base font-bold text-primary transition hover:bg-primary/10"
            >
              Hablar con un técnico
            </Link>
          </div>
        </header>

        <AuthorByline updatedLabel="agosto de 2026" className="mt-6" />

        <section className="grid gap-5 lg:grid-cols-[0.9fr_1.4fr]">
          <div className="rounded-3xl border border-primary/20 bg-primary/10 p-7 dark:border-primary/30 dark:bg-primary/15">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
              Respuesta directa
            </p>
            <h2 className="mt-3 text-2xl font-black text-slate-900 dark:text-white">
              Dónde reparar un Samsung Galaxy en Buenos Aires
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-700 dark:text-slate-200">
              Para reparar un Samsung Galaxy en Buenos Aires, Team Celular atiende en
              Paraguay 2451, Recoleta, y Amenábar 2032, Belgrano, de lunes a viernes
              de 10:30 a 18:00. El cambio de pantalla cuesta entre ARS 99.900 y 399.900
              en la línea A (A16, A26, A35, A36, A54, A55, A56) y entre ARS 299.900 y
              1.199.900 en la línea S (S22 a S25). La batería va de ARS 89.900 a 179.900
              en línea A y de ARS 119.900 a 219.900 en línea S, y el cambio de pin de
              carga entre ARS 35.000 y 150.000. Pantalla, batería y carga se resuelven
              en 2 a 4 horas según modelo y stock; el diagnóstico se hace el mismo día
              y todo sale con garantía escrita de 90 días sobre el trabajo y el repuesto
              instalado. Los equipos que no se resuelven por reemplazo pasan al
              laboratorio de microelectrónica, con reballing BGA y reparación de placa.
              Precios actualizados a agosto de 2026.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 dark:border-slate-700/60 dark:bg-slate-900/60">
            <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-700">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                Qué hacer según la falla del Samsung
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Una referencia rápida para no agravar el daño antes del diagnóstico.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-[760px] w-full text-left text-sm">
                <thead className="bg-slate-100/80 text-slate-700 dark:bg-slate-800/80 dark:text-slate-200">
                  <tr>
                    <th scope="col" className="px-5 py-4 font-semibold">Síntoma</th>
                    <th scope="col" className="px-5 py-4 font-semibold">Urgencia</th>
                    <th scope="col" className="px-5 py-4 font-semibold">Tiempo típico</th>
                    <th scope="col" className="px-5 py-4 font-semibold">Siguiente paso</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {samsungSymptomRows.map((row) => (
                    <tr key={row.symptom} className="bg-white/70 dark:bg-slate-900/40">
                      <td className="px-5 py-4 font-semibold text-slate-900 dark:text-white">{row.symptom}</td>
                      <td className="px-5 py-4 text-slate-700 dark:text-slate-300">{row.urgency}</td>
                      <td className="px-5 py-4 text-slate-700 dark:text-slate-300">{row.typicalTime}</td>
                      <td className="px-5 py-4 text-slate-700 dark:text-slate-300">{row.nextStep}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <GoogleReviewsAPI />

        <section className="space-y-7">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              ¿Cómo es el proceso de reparación de Samsung en Team Celular?
            </h2>
            <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">
              Así trabajamos cada Galaxy que entra al taller
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {processSteps.map((step) => {
              const Icon = step.Icon;
              return (
                <article
                  key={step.title}
                  className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/30"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-2xl text-white">
                      <Icon />
                    </div>
                    <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                      {step.duration}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-slate-700 dark:text-slate-300">
                    {step.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="space-y-7">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              ¿Cuáles son las reparaciones de Samsung más comunes en Buenos Aires?
            </h2>
            <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">
              Galaxy S, A, Note y Z Fold: los seis trabajos que más se piden cada semana
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {repairServices.map((service) => {
              const Icon = service.Icon;
              return (
                <article
                  key={service.title}
                  className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/30"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-xl text-primary">
                    <Icon />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                    {service.detail}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs font-semibold">
                    <span className="rounded-full bg-primary px-3 py-1 text-white">
                      {service.eta}
                    </span>
                  </div>
                  {repairLinks[service.title] && (
                    <Link
                      href={repairLinks[service.title]}
                      className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary transition hover:underline"
                    >
                      Ver precio y detalles →
                    </Link>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        <section id="costos-reparacion-samsung" className="rounded-2xl border border-slate-200/80 bg-white dark:border-slate-700/60 dark:bg-slate-900">
          <div className="border-b border-slate-100 px-8 py-5 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              ¿Cuánto cuesta reparar un Samsung Galaxy en Buenos Aires?
            </h2>
            <p className="mt-1 text-[0.95rem] text-slate-600 dark:text-slate-400">
              Precios actualizados a agosto de 2026. El rango depende del modelo dentro de cada línea y del repuesto disponible: te confirmamos el número exacto tras el diagnóstico, antes de intervenir el equipo. {INSTALLMENTS_MESSAGE}
            </p>
          </div>
          <div className="overflow-x-auto px-6 py-2">
            <table className="w-full min-w-[38rem] border-collapse text-left text-sm">
              <caption className="sr-only">
                Precios de reparación de Samsung Galaxy en CABA, actualizados en agosto de 2026
              </caption>
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th scope="col" className="py-3 pr-4 font-semibold text-slate-900 dark:text-slate-100">Servicio</th>
                  <th scope="col" className="py-3 pr-4 font-semibold text-slate-900 dark:text-slate-100">Modelos</th>
                  <th scope="col" className="py-3 pr-4 font-semibold text-slate-900 dark:text-slate-100">Tiempo</th>
                  <th scope="col" className="py-3 font-semibold text-slate-900 dark:text-slate-100">Precio ARS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {[
                  { servicio: "Diagnóstico técnico", modelos: "Todos los modelos", tiempo: "30–45 min", precio: "15.000 – 25.000" },
                  { servicio: "Cambio de pantalla", modelos: "Galaxy S / Ultra (S22 a S25)", tiempo: "2–4 h", precio: "299.900 – 1.199.900" },
                  { servicio: "Cambio de pantalla", modelos: "Galaxy A / M (A16, A26, A35, A36, A54, A55, A56)", tiempo: "2–4 h", precio: "99.900 – 399.900" },
                  { servicio: "Cambio de batería", modelos: "Galaxy S / Ultra", tiempo: "1–2 h", precio: "119.900 – 219.900" },
                  { servicio: "Cambio de batería", modelos: "Galaxy A / M", tiempo: "1–2 h", precio: "89.900 – 179.900" },
                  { servicio: "Cambio de pin de carga", modelos: "Línea S y A", tiempo: "2–3 h", precio: "35.000 – 150.000" },
                  { servicio: "Bisagra / flex", modelos: "Z Fold, Z Flip", tiempo: "24–72 h", precio: "Consultar" },
                ].map((row) => (
                  <tr key={`${row.servicio}-${row.modelos}`}>
                    <td className="py-3 pr-4 font-semibold text-slate-900 dark:text-slate-100">{row.servicio}</td>
                    <td className="py-3 pr-4 text-slate-500 dark:text-slate-400">{row.modelos}</td>
                    <td className="py-3 pr-4 text-slate-500 dark:text-slate-400">{row.tiempo}</td>
                    <td className="py-3 font-semibold tabular-nums text-primary">{row.precio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="space-y-4 px-8 py-6">
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
              Team Celular, con sucursales en Recoleta (Paraguay 2451) y Belgrano (Amenábar 2032) CABA, informa el costo de diagnóstico antes de abrir el equipo. Si avanzás con la reparación, ese monto se descuenta del trabajo final.
            </p>
            <Link
              href="/presupuesto-reparacion#solicitar-presupuesto"
              className="inline-flex min-h-11 items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90"
            >
              Pedir presupuesto exacto para mi Samsung
            </Link>
          </div>
        </section>



        <section className="space-y-5 rounded-3xl border border-white/15 bg-white/5 p-8 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/30 md:p-10">
          <h2 className="text-center text-3xl font-bold text-slate-900 dark:text-white">
            ¿Qué modelos Samsung reparan en Team Celular?
          </h2>
          <p className="text-center text-slate-600 dark:text-slate-300">
            Cobertura para familias Galaxy S, A, Note y plegables Z.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {samsungModels.map((model) => (
              <span
                key={model}
                className="inline-flex min-h-11 items-center rounded-full border border-primary/40 bg-primary/15 px-4 py-2 text-[13px] font-semibold text-slate-800 dark:border-primary/40 dark:bg-primary/20 dark:text-slate-100"
              >
                {model}
              </span>
            ))}
          </div>
        </section>

        <section className="space-y-7">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Preguntas frecuentes sobre reparación de Samsung
            </h2>
            <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">
              Lo que más nos preguntan antes de dejar el equipo
            </p>
          </div>
          <div className="space-y-4">
            {faq.map((item) => (
              <details
                key={item.question}
                className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl transition hover:shadow-lg dark:border-white/10 dark:bg-slate-900/30"
              >
                <summary className="flex min-h-11 items-center cursor-pointer text-lg font-bold text-slate-900 dark:text-white">
                  {item.question}
                </summary>
                <p className="mt-4 leading-relaxed text-slate-700 dark:text-slate-300">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>



        <GuideInterlinkSection currentGuide="/guias/reparacion-samsung-buenos-aires" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Reparación de Samsung en Buenos Aires",
              description:
                "Reparación de Samsung Galaxy en CABA: pantalla, batería, carga y placa, con garantía escrita de 90 días.",
              provider: { "@id": "https://teamcelular.com#localbusiness" },
              // Rango y catalogo salen de repairPrices: un unico lugar donde el precio
              // visible y el structured data no pueden divergir.
              priceRange: `ARS ${priceRangeOf(BRAND_REPAIR_PRICES.samsung).low.toLocaleString("es-AR")}-${priceRangeOf(BRAND_REPAIR_PRICES.samsung).high.toLocaleString("es-AR")}`,
              ...buildPriceOffers(BRAND_REPAIR_PRICES.samsung, "Samsung Galaxy"),
              areaServed: {
                "@type": "City",
                name: "Buenos Aires",
              },
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faq.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.answer,
                },
              })),
            }),
          }}
        />
      </article>
    </div>
  );
}
