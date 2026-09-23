import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import ArticleSchema from "@/components/seo/ArticleSchema";
import AuthorByline from "@/components/seo/AuthorByline";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import GoogleReviewsAPI from "@/components/cards/GoogleReviewsAPI";
import GuideInterlinkSection from "@/components/seo/GuideInterlinkSection";
import { INSTALLMENTS_MESSAGE, WARRANTY_SCOPE_MESSAGE } from "@/lib/copyStandards";
import GuideByline from "@/components/seo/GuideByline";
import { formatArsPrice } from "@/lib/repairPrices";
import {
  IPHONE_MODELS,
  IPHONE_MODELS_WITH_PAGE,
} from "@/app/(site)/reparaciones/iphone/iphoneModels";

// Precio citable en el primer parrafo: sale de la misma fuente que la tabla.
const IPHONE_13 = IPHONE_MODELS.find((m) => m.slug === "13");
// Precio minimo publicado: sale de la misma tabla que la pagina, no se hardcodea.
const IPHONE_SCREEN_FROM = formatArsPrice(
  Math.min(...IPHONE_MODELS.map((m) => m.screen).filter((v): v is number => Boolean(v))),
);
import {
  FaApple,
  FaBatteryFull,
  FaBolt,
  FaCamera,
  FaCheckCircle,
  FaMicrochip,
  FaMobileAlt,
  FaShieldAlt,
  FaTools,
  FaWrench,
} from "react-icons/fa";

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";
const PAGE_PATH = "/guias/reparacion-iphone-buenos-aires";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: "Reparación y Servicio Técnico iPhone en CABA | Precios",
  description:
    `Servicio técnico de iPhone en Recoleta y Belgrano, CABA. Pantalla desde ${IPHONE_SCREEN_FROM}, lista en 2–4 h, con precio por modelo y garantía de 90 días.`,
  keywords: [
    "reparacion iphone buenos aires",
    "service iphone caba",
    "cambio pantalla iphone",
    "cambio pantalla iphone true tone",
    "cambio ficha de carga iphone",
    "cambio vidrio trasero iphone",
    "cambio bateria iphone original",
    "reparacion face id iphone",
    "reparacion placa iphone",
    "service tecnico apple argentina",
    "reparar iphone mojado caba",
    "repuestos iphone certificados",
    "diagnostico iphone en el dia",
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
    title: "Reparación de iPhone en Buenos Aires, CABA | Team Celular",
    description:
      "Team Celular, Paraguay 2451 Recoleta CABA. Pantalla y batería en 2–4 h, diagnóstico el mismo día y garantía escrita 90 días. iPhone 8 a 17 Pro Max.",
    type: "article",
    url: PAGE_URL,
    locale: "es_AR",
    images: [
      {
        url: "https://teamcelular.com/images/portada_iphone.webp",
        width: 1200,
        height: 630,
        alt: "Laboratorio de reparación de iPhone en Team Celular",
      },
    ],
    publishedTime: "2024-01-15T00:00:00Z",
    modifiedTime: "2026-09-23T00:00:00Z",
    section: "Guías técnicas",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reparación de iPhone en CABA | Team Celular",
    description:
      "Team Celular, Paraguay 2451 Recoleta. Pantalla y batería en 2–4 h, garantía escrita 90 días. iPhone 8 a 17 Pro Max.",
    images: ["https://teamcelular.com/images/portada_iphone.webp"],
  },
};

const brandLinks = [
  {
    href: "/guias/reparacion-iphone-buenos-aires",
    label: "iPhone",
    helper: "Apple con True Tone y Face ID",
    active: true,
  },
  {
    href: "/guias/reparacion-samsung-buenos-aires",
    label: "Samsung",
    helper: "Galaxy S, A, Z Fold y Z Flip",
    active: false,
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

const quickSteps = [
  {
    step: "Lo probamos con vos adelante",
    detail:
      "Antes de abrirlo anotamos el IMEI, las marcas que ya tiene y probamos cámaras, micrófono, carga, parlantes, WiFi, Bluetooth y Face ID o Touch ID. Así queda claro qué andaba y qué no.",
    duration: "15 min",
    Icon: FaMobileAlt,
  },
  {
    step: "Buscamos la falla de origen",
    detail:
      "Medimos consumo, líneas de carga y placa con instrumental de laboratorio. Si hay líquido o golpe adentro, le sacamos fotos con el microscopio y te las mandamos.",
    duration: "30-45 min",
    Icon: FaTools,
  },
  {
    step: "Cambio de la pieza",
    detail:
      "Pasamos el chip IC de tu pantalla original a la nueva para que no pierdas Face ID ni True Tone. Es el paso que muchos talleres se saltean.",
    duration: "2-4 h",
    Icon: FaWrench,
  },
  {
    step: "Prueba final y garantía",
    detail:
      `Lo cargamos, lo calentamos un rato y probamos todo de nuevo antes de devolvértelo. ${WARRANTY_SCOPE_MESSAGE}`,
    duration: "20 min",
    Icon: FaCheckCircle,
  },
];

const frequentRepairs = [
  {
    title: "Cambio de pantalla OLED para iPhone",
    description:
      "Módulo completo, nunca solo el vidrio. Transferimos el IC de la pantalla original para conservar True Tone y evitar el aviso de pieza desconocida.",
    eta: "2-4 h",
    Icon: FaMobileAlt,
  },
  {
    title: "Cambio de batería",
    description:
      "Para iPhone que se apagan con 20%, calientan o marcan salud por debajo del 80%. Medimos el consumo antes, por si el problema no es la batería.",
    eta: "1-2 h",
    Icon: FaBatteryFull,
  },
  {
    title: "Puerto de carga y audio inferior",
    description:
      "Carga solo si movés el cable, no lo detecta o no te escuchan en las llamadas. Cambiamos el flex inferior Lightning o USB-C.",
    eta: "2-3 h",
    Icon: FaBolt,
  },
  {
    title: "Face ID, cámara frontal y sensores",
    description:
      "Face ID que dejó de andar después de un golpe o de mojarse, cámara selfie en negro o pantalla que no se apaga en las llamadas.",
    eta: "3-6 h",
    Icon: FaShieldAlt,
  },
  {
    title: "Cámaras traseras y estabilización",
    description:
      "Fotos borrosas, la cámara vibra o hace ruido, o se partió el vidrio del lente. Te decimos si alcanza con el lente o hay que cambiar el módulo.",
    eta: "2-4 h",
    Icon: FaCamera,
  },
  {
    title: "Placa lógica",
    description:
      "No prende, se reinicia en la manzanita o no toma carga después de un cargador trucho o de mojarse. Va a laboratorio con microscopio.",
    eta: "24-48 h",
    Icon: FaMicrochip,
  },
];

const iphoneSymptomRows = [
  {
    symptom: "Pantalla con líneas, manchas o touch que falla",
    urgency: "Alta si el touch no responde o aparecen zonas negras",
    typicalTime: "2-4 h si hay módulo en stock",
    nextStep: "Mandanos el modelo exacto y una foto del daño",
  },
  {
    symptom: "La batería dura poco, se apaga o calienta",
    urgency: "Media-alta si baja de golpe o se hincha",
    typicalTime: "1-2 h según modelo",
    nextStep: "Fijate la salud en Ajustes > Batería y pasanos el número",
  },
  {
    symptom: "No carga, carga lento o hace falso contacto",
    urgency: "Alta si no enciende o solo carga en una posición",
    typicalTime: "2-3 h si es el flex de carga; más si es placa",
    nextStep: "Probá con otro cable y no lo limpies con aguja",
  },
  {
    symptom: "Se mojó, no prende o se reinicia",
    urgency: "Urgente: no lo cargues ni le des calor",
    typicalTime: "24-48 h para limpieza y diagnóstico de placa",
    nextStep: "Traelo apagado lo antes posible (el arroz no sirve)",
  },
  {
    symptom: "Falla Face ID, la cámara o los sensores",
    urgency: "Media; alta si no podés desbloquearlo",
    typicalTime: "3-6 h si no hace falta trabajar la placa",
    nextStep: "Traelo para ver si es flex, módulo o placa",
  },
];

const repairLinks: Record<string, string> = {
  "Cambio de pantalla OLED para iPhone": "/reparaciones/cambio-pantalla-caba",
  "Cambio de batería": "/reparaciones/cambio-bateria-caba",
  "Puerto de carga y audio inferior": "/reparaciones/cambio-pin-carga-caba",
  "Cámaras traseras y estabilización": "/reparaciones/cambio-camara-caba",
  "Placa lógica": "/reparaciones/reparacion-placa-caba",
};


const iphoneModels = [
  "iPhone 17 Pro Max",
  "iPhone 17 Pro",
  "iPhone 17 Plus",
  "iPhone 17",
  "iPhone Air",
  "iPhone 16 Pro Max",
  "iPhone 16 Pro",
  "iPhone 16 Plus",
  "iPhone 16",
  "iPhone 15 Pro Max",
  "iPhone 15 Pro",
  "iPhone 15 Plus",
  "iPhone 15",
  "iPhone 14 Pro Max",
  "iPhone 14 Pro",
  "iPhone 14 Plus",
  "iPhone 14",
  "iPhone 13 Pro Max",
  "iPhone 13 Pro",
  "iPhone 13",
  "iPhone 12 Pro Max",
  "iPhone 12 Pro",
  "iPhone 12",
  "iPhone 11 Pro Max",
  "iPhone 11",
  "iPhone XR",
  "iPhone X",
  "iPhone 8 Plus",
  "iPhone 8",
  "iPhone SE 2022",
  "iPhone SE 2020",
];

const faq = [
  {
    question: "¿Cuánto tarda la reparación de pantalla de iPhone?",
    answer:
      "Entre 2 y 4 horas si el módulo está en stock. Si el marco está doblado o hay otro daño, tarda más y te avisamos antes.",
  },
  {
    question: "¿Pueden mantener True Tone después de cambiar pantalla?",
    answer:
      "Sí: pasamos el chip IC de tu pantalla original a la nueva y True Tone sigue andando. Si la original llega tan destruida que no se puede leer el chip, te lo decimos antes de cambiarla.",
  },
  {
    question: "¿Reparan iPhone con daño por agua o humedad?",
    answer:
      "Sí. Lo abrimos, limpiamos la placa y medimos la corrosión en laboratorio. Lo importante es no enchufarlo ni meterlo en arroz: traelo apagado.",
  },
  {
    question: "¿La garantía cubre mano de obra y repuesto?",
    answer: `Sí. ${WARRANTY_SCOPE_MESSAGE}`,
  },
  {
    question: "¿Qué pasa si no quiero reparar luego del diagnóstico?",
    answer:
      "Pagás solo la revisión y te llevás el equipo con el presupuesto por escrito. Si querés, lo comparás con otro taller.",
  },
  {
    question: "¿El cambio de pantalla del iPhone 14 o 15 afecta al Face ID?",
    answer:
      "En iPhone 14 y 15 el Face ID está en el módulo frontal separado, por lo que un cambio de display correcto no lo afecta. Verificamos su funcionamiento antes y después de cada reemplazo.",
  },
  {
    question: "¿El iPhone 12 tiene problemas frecuentes de placa?",
    answer:
      "El iPhone 12 puede presentar fallas de placa relacionadas con el chip de batería (PMIC) o con el chip de carga inalámbrica luego de humedad. Diagnosticamos con instrumental antes de cotizar reparación.",
  },
  {
    question: "¿Cuánto tarda un cambio de batería de iPhone?",
    answer:
      "Entre 1 y 2 horas en la mayoría de los modelos. En iPhone 14 y 15, que llevan la batería más pegada, puede llegar a 2,5 horas.",
  },
  {
    question: "¿Team Celular es servicio oficial de Apple?",
    answer:
      "No. Somos un laboratorio independiente, y por eso podemos reparar placa y hacer reballing, cosas que el servicio oficial resuelve cambiando el equipo. En cada presupuesto aclaramos si el repuesto es original o compatible, y qué funciones pueden verse afectadas, como True Tone o el aviso de pieza desconocida.",
  },
  {
    question: "¿Trabajan iPhone X, XR, XS y generaciones anteriores?",
    answer:
      "Sí. Trabajamos desde iPhone 8 en adelante, incluidos X, XR, XS y XS Max. Para modelos más viejos, preguntanos si hay repuesto antes de venir.",
  },
  {
    question: "¿Cuánto cuesta el diagnóstico si no hago la reparación?",
    answer:
      "El diagnóstico tiene costo y se informa antes de abrir el equipo. Si avanzás con la reparación, ese costo se descuenta del trabajo final. Siempre confirmamos monto exacto al ingreso.",
  },
];

export default function IphoneRepairGuidePage() {
  return (
    <div className="flex w-full justify-center px-4 py-16">
      <ArticleSchema
        title="Reparación de iPhone en Buenos Aires | Team Celular"
        description="Precios por modelo, tiempos y fallas comunes de iPhone, con transferencia de IC en pantallas y garantía escrita de 90 días en CABA."
        publishedTime="2024-01-15T00:00:00Z"
        modifiedTime="2026-09-23T00:00:00Z"
        about={[
          "reparacion de iPhone en Buenos Aires",
          "service tecnico Apple en CABA",
          "cambio de pantalla iPhone",
          "cambio de bateria iPhone",
          "microelectronica para iPhone",
        ]}
        image="https://teamcelular.com/images/portada_iphone.webp"
        url={PAGE_URL}
      />

      <article className="w-full max-w-6xl space-y-14">
        <BreadcrumbJsonLd
          items={[
            { name: "Inicio", url: `${SITE_URL}/` },
            { name: "Guías", url: `${SITE_URL}/guias` },
            { name: "Reparación de iPhone", url: PAGE_URL },
          ]}
        />

        <nav className="flex items-center gap-2 text-sm text-slate-600 dark:text-[#86868b]">
          <Link href="/" className="transition hover:text-primary">
            Inicio
          </Link>
          <span>/</span>
          <Link href="/guias" className="transition hover:text-primary">
            Guías
          </Link>
          <span>/</span>
          <span className="font-semibold text-slate-900 dark:text-[#f5f5f7]">
            Reparación iPhone
          </span>
        </nav>

        <header className="bg-[#1d1d1f] space-y-8 rounded-[28px] p-8 md:p-14">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/70 bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              <FaApple />
              Especialistas por marca
            </span>
            <span className="rounded-full border border-emerald-700/80 bg-emerald-700 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white">
              Recoleta - CABA
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-[-0.01em] text-slate-900 dark:text-[#f5f5f7] md:text-5xl">
              Reparación de iPhone en Buenos Aires
            </h1>
            <p className="max-w-4xl text-lg leading-relaxed text-slate-700 dark:text-[#a1a1a6]">
              Team Celular, en Paraguay 2451 Recoleta CABA, repara iPhone con
              diagnóstico el mismo día, pantalla y batería en 2–4 h, y garantía
              escrita de 90 días sobre trabajo y repuesto. iPhone 8 a 17 Pro Max.
              {IPHONE_13?.screen && IPHONE_13.battery ? (
                <>
                  {" "}Por ejemplo, en un iPhone 13 el cambio de pantalla cuesta{" "}
                  {formatArsPrice(IPHONE_13.screen)} y el de batería{" "}
                  {formatArsPrice(IPHONE_13.battery)}.
                </>
              ) : null}
            </p>
            <div className="mt-4">
              <GuideByline modifiedTime="2026-09-23T00:00:00Z" tone="light" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="bg-[#1d1d1f] rounded-[28px] p-5">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-[#86868b]">
                Diagnóstico
              </p>
              <p className="mt-2 text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-[1.1] text-primary">Mismo día</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-[#a1a1a6]">
                Informe claro con pasos y presupuesto
              </p>
            </div>
            <div className="bg-[#1d1d1f] rounded-[28px] p-5">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-[#86868b]">
                Garantía
              </p>
              <p className="mt-2 text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-[1.1] text-secondary">90 días</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-[#a1a1a6]">
                Garantía escrita sobre trabajo y repuesto
              </p>
            </div>
            <div className="bg-[#1d1d1f] rounded-[28px] p-5">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-[#86868b]">
                Rapidez
              </p>
              <p className="mt-2 text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-[1.1] text-primary">2-4 h</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-[#a1a1a6]">
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
              className="tc-btn tc-btn-primary"
            >
              Quiero presupuesto para mi iPhone
            </Link>
            <Link
              href="https://wa.me/5491151034595?text=Hola%20Team%20Celular%2C%20quiero%20cotizar%20una%20reparacion%20de%20iPhone"
              className="tc-btn tc-btn-ghost"
            >
              Hablar por WhatsApp
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600 dark:text-[#a1a1a6]">
            <span className="rounded-full border border-primary/80 bg-primary px-3 py-1 text-white">
              Reseñas reales de Google
            </span>
            <span className="rounded-full border border-secondary/25 bg-secondary/10 px-3 py-1 text-secondary">
              4,9 sobre 362 reseñas
            </span>
            <span className="rounded-full border border-emerald-700/70 bg-emerald-700 px-3 py-1 text-white">
              Más de 15 años reparando
            </span>
          </div>
        </header>

        <AuthorByline updatedLabel="agosto de 2026" className="mt-6" />

        <section className="grid gap-5 lg:grid-cols-[0.9fr_1.4fr]">
          <div className="rounded-3xl border border-primary/20 bg-primary/10 p-7 dark:border-primary/30 dark:bg-primary/15">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Respuesta directa
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-[#f5f5f7]">
              ¿Dónde reparar un iPhone en Buenos Aires?
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-700 dark:text-slate-200">
              Para reparar un iPhone en Buenos Aires, Team Celular atiende en Paraguay 2451,
              Recoleta, y Amenábar 2032, Belgrano, de lunes a viernes de 10:30 a 18:00, sin
              turno previo. Cubrimos desde iPhone 8 hasta 17 Pro Max: cambio de pantalla,
              batería, puerto de carga, cámaras y fallas de placa. El cambio de pantalla
              va de ARS 129.900 en iPhone 11 a ARS 299.900 en iPhone 14 Pro Max, y la
              batería de ARS 99.900 a ARS 229.900 según modelo. El diagnóstico se hace
              el mismo día y el presupuesto se entrega antes de intervenir el equipo;
              pantalla y batería suelen resolverse en 2 a 4 horas según stock.
              Todo el trabajo sale con garantía escrita de 90 días sobre la mano de obra y
              el repuesto instalado. A diferencia del canal oficial, que reemplaza módulos
              o placas completas, acá se repara a nivel componente: reballing BGA,
              soldadura SMD bajo microscopio y recuperación de equipos mojados, incluidos
              los que otro servicio declaró sin reparación. Team Celular trabaja hace más
              de 15 años y tiene 4,9 estrellas sobre 362 reseñas de Google.
            </p>
          </div>

          <div className="bg-[#1d1d1f] overflow-hidden rounded-[28px]">
            <div className="border-b border-white/10 p-6">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-[#f5f5f7]">
                ¿Qué hacer según la falla del iPhone?
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-[#a1a1a6]">
                Usá esta tabla para ver si conviene escribirnos por WhatsApp, traer el equipo
                al laboratorio o evitar acciones que puedan empeorar la falla.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-700">
                <thead className="bg-black text-white">
                  <tr>
                    <th scope="col" className="px-5 py-4 font-semibold">Sintoma</th>
                    <th scope="col" className="px-5 py-4 font-semibold">Urgencia</th>
                    <th scope="col" className="px-5 py-4 font-semibold">Tiempo tipico</th>
                    <th scope="col" className="px-5 py-4 font-semibold">Siguiente paso</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {iphoneSymptomRows.map((row) => (
                    <tr key={row.symptom} className="bg-white/70 dark:bg-slate-900/40">
                      <td className="px-5 py-4 font-semibold text-slate-900 dark:text-[#f5f5f7]">{row.symptom}</td>
                      <td className="px-5 py-4 text-slate-700 dark:text-[#a1a1a6]">{row.urgency}</td>
                      <td className="px-5 py-4 text-slate-700 dark:text-[#a1a1a6]">{row.typicalTime}</td>
                      <td className="px-5 py-4 text-slate-700 dark:text-[#a1a1a6]">{row.nextStep}</td>
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
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-[1.1] text-slate-900 dark:text-[#f5f5f7]">
              ¿Cómo es el proceso de reparación de iPhone en Team Celular?
            </h2>
            <p className="mt-2 text-lg text-slate-600 dark:text-[#a1a1a6]">
              Cuatro etapas con tiempos reales, desde el ingreso hasta la entrega con garantía
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {quickSteps.map((step) => {
              const Icon = step.Icon;
              return (
                <article
                  key={step.step}
                  className="bg-[#1d1d1f] rounded-[28px] p-6 transition"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-2xl text-white">
                      <Icon />
                    </div>
                    <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                      {step.duration}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-[#f5f5f7]">
                    {step.step}
                  </h3>
                  <p className="mt-3 leading-relaxed text-slate-700 dark:text-[#a1a1a6]">
                    {step.detail}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="space-y-7">
          <div className="text-center">
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-[1.1] text-slate-900 dark:text-[#f5f5f7]">
              ¿Cuáles son las reparaciones de iPhone más comunes en Buenos Aires?
            </h2>
            <p className="mt-2 text-lg text-slate-600 dark:text-[#a1a1a6]">
              Pantalla, batería, carga y placa: los seis trabajos que más se piden en el laboratorio
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {frequentRepairs.map((repair) => {
              const Icon = repair.Icon;
              return (
                <article
                  key={repair.title}
                  className="bg-[#1d1d1f] rounded-[28px] p-6 transition"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-xl text-primary">
                    <Icon />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-[#f5f5f7]">
                    {repair.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-[#a1a1a6]">
                    {repair.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs font-semibold">
                    <span className="rounded-full bg-primary px-3 py-1 text-white">
                      {repair.eta}
                    </span>
                  </div>
                  {repairLinks[repair.title] && (
                    <Link
                      href={repairLinks[repair.title]}
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

        <section id="costos-reparacion-iphone" className="bg-[#1d1d1f] rounded-[28px]">
          <div className="border-b border-slate-100 px-8 py-5 dark:border-slate-800">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-[#f5f5f7]">
              ¿Cuánto cuesta reparar un iPhone en Buenos Aires?
            </h2>
            <p className="mt-1 text-[0.95rem] text-slate-600 dark:text-[#86868b]">
              Precios actualizados a agosto de 2026. El valor exacto depende del modelo y del estado del equipo; te lo confirmamos tras el diagnóstico, antes de intervenir. {INSTALLMENTS_MESSAGE}
            </p>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {[
              { servicio: "Diagnóstico técnico", modelos: "Todos los modelos", tiempo: "30–45 min", precio: "ARS 15.000–25.000" },
              { servicio: "Cambio de pantalla", modelos: "iPhone 11, 11 Pro, 12 Mini, 13 Mini", tiempo: "2–4 h", precio: "ARS 129.900–199.900" },
              { servicio: "Cambio de pantalla", modelos: "iPhone 12, 12 Pro, 12 Pro Max, 13", tiempo: "2–4 h", precio: "ARS 209.900–249.900" },
              { servicio: "Cambio de pantalla", modelos: "iPhone 13 Pro, 14, 14 Pro, 14 Pro Max", tiempo: "2–4 h", precio: "ARS 249.900–299.900" },
              { servicio: "Cambio de pantalla", modelos: "iPhone 15, 16, 17 y variantes Pro", tiempo: "2–4 h", precio: "ARS 319.900–649.900" },
              { servicio: "Cambio de batería", modelos: "iPhone 11 a 14", tiempo: "1–2 h", precio: "ARS 99.900–229.900" },
              { servicio: "Cambio de batería", modelos: "iPhone 15 y 16", tiempo: "1–2 h", precio: "ARS 189.900–269.900" },
              { servicio: "Placa lógica / microelectrónica", modelos: "Todos", tiempo: "24–48 h", precio: "Consultar" },
            ].map((row) => (
              <div key={`${row.servicio}-${row.modelos}`} className="grid grid-cols-2 gap-x-4 gap-y-1 px-6 py-4 text-sm md:grid-cols-4">
                <span className="font-semibold text-slate-900 dark:text-[#f5f5f7]">{row.servicio}</span>
                <span className="text-slate-500 dark:text-[#86868b]">{row.modelos}</span>
                <span className="text-slate-500 dark:text-[#86868b]">{row.tiempo}</span>
                <span className="font-semibold text-primary">{row.precio}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-100 px-6 py-6 dark:border-slate-800 md:px-8">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-[#f5f5f7]">
              Precio de pantalla y batería por modelo de iPhone
            </h3>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[22rem] text-left text-sm">
                <caption className="sr-only">
                  Precios de cambio de pantalla y batería de iPhone en Team Celular, CABA, agosto de 2026
                </caption>
                <thead>
                  <tr className="text-xs uppercase tracking-wide text-slate-500 dark:text-[#86868b]">
                    <th scope="col" className="py-2 pr-4 font-semibold">Modelo</th>
                    <th scope="col" className="py-2 pr-4 font-semibold">Pantalla</th>
                    <th scope="col" className="py-2 font-semibold">Batería</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {IPHONE_MODELS.map((model) => (
                    <tr key={model.slug}>
                      <th scope="row" className="py-2.5 pr-4 font-semibold text-slate-900 dark:text-[#f5f5f7]">
                        {(IPHONE_MODELS_WITH_PAGE as readonly string[]).includes(model.slug) ? (
                          <Link href={`/reparaciones/iphone/${model.slug}`} className="hover:text-primary hover:underline">
                            {model.name}
                          </Link>
                        ) : (
                          model.name
                        )}
                      </th>
                      <td className="py-2.5 pr-4 tabular-nums text-slate-700 dark:text-[#a1a1a6]">
                        {model.screen ? formatArsPrice(model.screen) : "Consultar"}
                      </td>
                      <td className="py-2.5 tabular-nums text-slate-700 dark:text-[#a1a1a6]">
                        {model.battery ? formatArsPrice(model.battery) : "Consultar"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="space-y-4 px-8 py-6">
            <p className="text-sm leading-6 text-slate-600 dark:text-[#86868b]">
              Team Celular, en Paraguay 2451 Recoleta CABA, informa el costo de diagnóstico antes de abrir el equipo. Si avanzás con la reparación, ese monto se descuenta del trabajo final. La garantía escrita de 90 días aplica sobre trabajo y repuesto instalado.
            </p>
            <Link
              href="/presupuesto-reparacion#solicitar-presupuesto"
              className="inline-flex min-h-11 items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90"
            >
              Pedir presupuesto exacto para mi iPhone
            </Link>
          </div>
        </section>



        <section className="bg-[#1d1d1f] space-y-5 rounded-[28px] p-8 md:p-10">
          <h2 className="text-center text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-[1.1] text-slate-900 dark:text-[#f5f5f7]">
            Modelos de iPhone que trabajamos
          </h2>
          <p className="text-center text-slate-600 dark:text-[#a1a1a6]">
            Desde iPhone 8 hasta la línea 17. Si el tuyo no está, preguntanos igual.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {iphoneModels.map((model) => (
              <span
                key={model}
                  className="inline-flex min-h-11 items-center rounded-full border border-primary/40 bg-primary/15 px-4 py-2 text-[13px] font-semibold text-slate-800 dark:border-primary/40 dark:bg-primary/20 dark:text-[#f5f5f7]"
              >
                {model}
              </span>
            ))}
          </div>
        </section>

        <section className="space-y-7">
          <div className="text-center">
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-[1.1] text-slate-900 dark:text-[#f5f5f7]">
              Preguntas frecuentes sobre reparación de iPhone
            </h2>
            <p className="mt-2 text-lg text-slate-600 dark:text-[#a1a1a6]">
              Lo que más nos preguntan en el mostrador
            </p>
          </div>
          <div className="space-y-4">
            {faq.map((item) => (
              <details
                key={item.question}
                className="bg-[#1d1d1f] rounded-[28px] p-6 transition"
              >
                <summary className="flex min-h-11 items-center cursor-pointer text-lg font-semibold text-slate-900 dark:text-[#f5f5f7]">
                  {item.question}
                </summary>
                <p className="mt-4 leading-relaxed text-slate-700 dark:text-[#a1a1a6]">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>



        <GuideInterlinkSection currentGuide="/guias/reparacion-iphone-buenos-aires" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Reparación de iPhone en Buenos Aires",
              description:
                "Reparación de iPhone en CABA: pantalla con transferencia de IC, batería, carga y placa, con garantía escrita de 90 días.",
              provider: { "@id": "https://teamcelular.com#localbusiness" },
              areaServed: {
                "@type": "City",
                name: "Buenos Aires",
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Servicios de reparación de iPhone",
                itemListElement: frequentRepairs.map((repair) => ({
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: repair.title,
                    description: repair.description,
                  },
                })),
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
