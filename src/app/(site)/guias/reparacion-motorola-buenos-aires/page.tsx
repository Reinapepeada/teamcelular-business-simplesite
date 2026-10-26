import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import ArticleSchema from "@/components/seo/ArticleSchema";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import GoogleReviewsAPI from "@/components/cards/GoogleReviewsAPI";
import GuideInterlinkSection from "@/components/seo/GuideInterlinkSection";
import { WARRANTY_SCOPE_MESSAGE } from "@/lib/copyStandards";
import {
  FaBatteryFull,
  FaBolt,
  FaCamera,
  FaCheckCircle,
  FaClock,
  FaMobileAlt,
  FaMicrochip,
  FaShieldAlt,
  FaTools,
  FaWrench,
} from "react-icons/fa";
import GuideByline from "@/components/seo/GuideByline";
import { BRAND_REPAIR_PRICES, buildPriceOffers, priceRangeOf } from "@/lib/repairPrices";

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";
const PAGE_PATH = "/guias/reparacion-motorola-buenos-aires";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: "Servicio Técnico Motorola en CABA | Precios",
  description:
    "Servicio técnico Motorola en CABA, sin ser service oficial: Moto G y Edge en Recoleta y Belgrano. Pantalla desde $99.900, en 2-4 h con stock. Garantía 90 días.",
  keywords: [
    "reparacion motorola buenos aires",
    "service motorola caba",
    "cambio pantalla motorola",
    "reparacion moto g caba",
    "cambio bateria motorola recoleta",
    "reparacion motorola edge",
    "tecnico motorola buenos aires",
    "arreglo motorola g84",
    "cambio pin carga motorola",
    "servicio tecnico motorola caba",
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
    title: "Service Motorola en CABA: Recoleta y Belgrano | Team Celular",
    description:
      "Team Celular, Paraguay 2451 Recoleta CABA. Pantalla, batería y pin de carga de Motorola según modelo, stock y falla. Garantía escrita 90 días. Moto G, Edge y E.",
    type: "article",
    url: PAGE_URL,
    locale: "es_AR",
    images: [
      {
        url: "https://teamcelular.com/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Reparación técnica de Motorola en Team Celular, Recoleta CABA",
      },
    ],
    publishedTime: "2026-05-08T00:00:00Z",
    modifiedTime: "2026-10-15T00:00:00Z",
    section: "Guías Técnicas",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reparación de Motorola en CABA | Team Celular",
    description:
      "Team Celular, Paraguay 2451 Recoleta. Pantalla, batería y carga de Motorola según modelo, stock y falla. Garantía escrita 90 días.",
    images: ["https://teamcelular.com/opengraph-image.png"],
  },
};

const repairLinks: Record<string, string> = {
  "Cambio de pantalla Motorola": "/reparaciones/cambio-pantalla-caba",
  "Reemplazo de batería Motorola": "/reparaciones/cambio-bateria-caba",
  "Pin de carga USB-C Motorola": "/reparaciones/cambio-pin-carga-caba",
  "Placa y recuperación avanzada": "/reparaciones/reparacion-placa-caba",
};


const quickSteps = [
  {
    step: "Ingreso y checklist técnico",
    detail:
      "Validamos IMEI, estado estético y funciones clave antes de abrir: pantalla, touch, cámaras, micrófono, parlantes, carga, WiFi y Bluetooth.",
    duration: "15 min",
    Icon: FaMobileAlt,
  },
  {
    step: "Diagnóstico de laboratorio",
    detail:
      "Revisamos pin de carga, batería y consumo antes de cotizar. Si hace falta revisión de placa, el informe tarda hasta 72 horas hábiles. El arreglo de placa lleva semanas y se confirma precio y plazo por escrito.",
    duration: "según la falla",
    Icon: FaTools,
  },
  {
    step: "Reparación y calibración",
    detail:
      "Instalamos el repuesto aprobado y probamos táctil, batería y carga. Pantalla en 2-4 h y batería en 1-2 h con stock; para otras fallas confirmamos el plazo antes de empezar.",
    duration: "según el trabajo",
    Icon: FaWrench,
  },
  {
    step: "Control de calidad + garantía",
    detail: `Hacemos pruebas funcionales, test de carga completa y estabilidad térmica. ${WARRANTY_SCOPE_MESSAGE}`,
    duration: "20 min",
    Icon: FaCheckCircle,
  },
];

const frequentRepairs = [
  {
    title: "Cambio de pantalla Motorola",
    description:
      "Módulo LCD o AMOLED con prueba de brillo, touch y sensores antes de entregar. Trabajamos Moto G series, Edge y variantes con pantalla curva.",
    eta: "2-4 h",
    Icon: FaMobileAlt,
  },
  {
    title: "Reemplazo de batería Motorola",
    description:
      "Batería de calidad con test de autonomía real. Ideal para Moto G que dura menos de medio día o se apaga en forma repentina.",
    eta: "1-2 h",
    Icon: FaBatteryFull,
  },
  {
    title: "Pin de carga USB-C Motorola",
    description:
      "Revisamos cable, cargador y puerto antes de confirmar si hace falta reparar el pin o el flex de carga. También comprobamos el micrófono inferior cuando comparte el conjunto.",
    eta: "1-3 h",
    Icon: FaBolt,
  },
  {
    title: "Cámaras Motorola",
    description:
      "Cambio o reparación de módulo trasero y frontal con ajuste de foco. Cubrimos Edge 40/50 y Moto G84/G85 con cámara de alta resolución.",
    eta: "2-3 h",
    Icon: FaCamera,
  },
  {
    title: "Botones, flex y audio",
    description:
      "Reparamos botón de encendido, volumen, flex de huellas dactilares, micrófono y parlante en toda la línea Moto G y Edge.",
    eta: "1-3 h",
    Icon: FaShieldAlt,
  },
  {
    title: "Placa y recuperación avanzada",
    description:
      "Motorola que no enciende, se reinicia o no toma carga después de un golpe o de mojarse. Revisión de placa $45.000, con informe en hasta 72 horas hábiles. Se descuenta si se repara; el arreglo lleva semanas y se confirma precio y plazo por escrito.",
    eta: "informe hasta 72 h hábiles",
    Icon: FaMicrochip,
  },
];

const motorolaSymptomRows = [
  {
    symptom: "Pantalla con líneas, manchas o táctil que falla",
    urgency: "Alta si aparecen zonas negras o el táctil deja de responder",
    typicalTime: "2-4 h si hay módulo compatible en stock",
    nextStep: "Enviar modelo exacto y foto para confirmar LCD o AMOLED",
  },
  {
    symptom: "Batería dura poco, se apaga o se hincha",
    urgency: "Alta si levanta la tapa, calienta o descarga de golpe",
    typicalTime: "1-2 h según modelo Moto G, Edge o E",
    nextStep: "Apagarlo si está hinchado y pedir diagnóstico de consumo",
  },
  {
    symptom: "No carga o el USB-C hace falso contacto",
    urgency: "Alta si solo carga en una posición o dejó de encender",
    typicalTime: "1-3 h para pin o flex; más si la falla está en placa",
    nextStep: "No forzar el conector y consultar con el modelo exacto",
  },
  {
    symptom: "Queda en el logo, reinicia o no enciende",
    urgency: "Alta: puede ser batería, software o placa",
    typicalTime: "Hasta 72 h hábiles para la revisión de placa",
    nextStep: "Evitar reinicios repetidos y solicitar diagnóstico técnico",
  },
  {
    symptom: "Se mojó o falla después de humedad",
    urgency: "Crítica: no cargar, encender ni aplicar calor",
    typicalTime: "Si requiere placa: informe hasta 72 h hábiles; arreglo por presupuesto",
    nextStep: "Traerlo apagado al laboratorio lo antes posible",
  },
];

const trustBlocks = [
  {
    title: "Diagnóstico claro antes de reparar",
    description:
      "Recibís un informe: qué falla, qué se reemplaza, cuánto tarda y cuánto cuesta. Sin costos sorpresa al retirar.",
    Icon: FaCheckCircle,
  },
  {
    title: "Dos talleres en CABA con trazabilidad",
    description:
      "Cada equipo se registra con orden técnica y checklist en Recoleta (Paraguay 2451) y Belgrano (Amenábar 2032). Sabés en qué etapa está tu Motorola en todo momento.",
    Icon: FaClock,
  },
  {
    title: "Repuestos de calidad, no de descarte",
    description:
      "Evitamos módulos de baja duración. Priorizamos estabilidad táctil, autonomía real y seguridad eléctrica en cada servicio.",
    Icon: FaShieldAlt,
  },
  {
    title: "Respuesta en el día para casos frecuentes",
    description:
      "Pantalla, batería y pin de carga de Motorola podemos resolverlos el mismo día según stock. Confirmamos plazo antes de abrir el equipo.",
    Icon: FaTools,
  },
];

const motorolaModels = [
  "Moto G85",
  "Moto G84",
  "Moto G54",
  "Moto G34",
  "Moto G24",
  "Moto G14",
  "Motorola Edge 50 Pro",
  "Motorola Edge 50",
  "Motorola Edge 40 Pro",
  "Motorola Edge 40",
  "Motorola Edge 30",
  "Moto G82",
  "Moto G72",
  "Moto G52",
  "Moto G32",
  "Moto E13",
  "Moto E22",
  "Motorola ThinkPhone",
  "Moto G200",
  "Moto G60",
  "Moto G30",
];

const faq = [
  {
    question: "¿Cuánto tarda el cambio de pantalla de un Motorola Moto G?",
    answer:
      "Entre 2 y 4 horas en la mayoría de modelos de la línea G. Si el marco o el sensor de huellas está integrado al módulo, puede tomar algo más. Confirmamos tiempo exacto al ingreso.",
  },
  {
    question: "¿Trabajan Motorola Edge con pantalla curva?",
    answer:
      "Sí. Confirmamos el modelo y la variante de Edge antes de cotizar: el módulo y el procedimiento cambian según la pantalla. En equipos con pantalla curva, evaluamos también el marco y el daño antes de confirmar la reparación.",
  },
  {
    question: "¿El Moto G14/G24 tiene problemas frecuentes de pin de carga?",
    answer:
      "Que un Moto G14 o G24 no cargue no confirma una falla del pin ni que la carga rápida la haya causado. Revisamos el cable, el cargador y la conexión USB-C; después comprobamos el pin y el flex según el síntoma.",
  },
  {
    question: "¿La garantía cubre trabajo y repuesto?",
    answer: `Sí. ${WARRANTY_SCOPE_MESSAGE}`,
  },
  {
    question: "¿Reparan Motorola con daño por agua?",
    answer:
      "Sí. Hacemos apertura técnica, limpieza y diagnóstico de corrosión en laboratorio. No enchufes ni cargues el equipo antes de traerlo — eso puede agravar el daño en placa.",
  },
  {
    question: "¿Cuánto cuesta el diagnóstico si no avanzo con la reparación?",
    answer:
      "La revisión técnica va de $15.000 a $25.000, según la falla; la revisión de placa cuesta $45.000 y su informe se entrega en hasta 72 horas hábiles. Informamos el costo antes de abrir el equipo y se descuenta si aceptás la reparación. Si requiere arreglo de placa, lleva semanas y confirmamos precio y plazo por escrito.",
  },
  {
    question: "¿Atienden todos los modelos de Motorola?",
    answer:
      "Atendemos toda la línea Moto G (G14 a G85), Edge (30, 40, 50), Moto E y ThinkPhone. Para modelos muy antiguos confirmamos disponibilidad de repuesto antes de ingresar el equipo.",
  },
  {
    question: "¿El cambio de batería requiere apagar funciones del sistema?",
    answer:
      "No en la línea Moto G. El reemplazo de batería no afecta funciones de software. Después del cambio hacemos test de autonomía y ciclo de carga para confirmar rendimiento.",
  },
  {
    question: "¿Qué diferencia hay entre pantalla original, AMOLED compatible y LCD?",
    answer:
      "La opción correcta depende del modelo. En equipos Edge o Moto G con AMOLED, cambiar de tecnología puede afectar brillo, color, consumo o respuesta táctil. Antes de instalar informamos qué repuesto hay disponible y qué resultado podés esperar.",
  },
  {
    question: "¿Es un servicio oficial Motorola?",
    answer:
      "No somos un centro oficial Motorola. Somos un laboratorio técnico independiente en CABA y detallamos por escrito diagnóstico, repuesto, tiempo estimado y garantía antes de avanzar.",
  },
];

export default function MotorolaRepairGuidePage() {
  return (
    <div className="flex w-full justify-center px-4 py-8 sm:py-12">
      <ArticleSchema
        title="Reparación de Motorola en Buenos Aires | Servicio Técnico Team Celular"
        description="Guía completa para reparar Motorola en CABA con diagnóstico profesional, repuestos de calidad y garantía escrita 90 días."
        publishedTime="2026-05-08T00:00:00Z"
        modifiedTime="2026-10-15T00:00:00Z"
        about={[
          "reparacion de Motorola en Buenos Aires",
          "service tecnico Motorola en CABA",
          "reparacion de Moto G",
          "reparacion de Motorola Edge",
          "cambio de pantalla, bateria y USB-C Motorola",
        ]}
        image="https://teamcelular.com/opengraph-image.png"
        url={PAGE_URL}
      />

      <article className="w-full max-w-6xl space-y-14">
        <BreadcrumbJsonLd
          items={[
            { name: "Inicio", url: `${SITE_URL}/` },
            { name: "Guías", url: `${SITE_URL}/guias` },
            { name: "Reparación de Motorola", url: PAGE_URL },
          ]}
        />

        <nav className="flex items-center gap-2 text-sm text-slate-600 dark:text-[#86868b]">
          <Link href="/" className="transition hover:text-primary dark:hover:text-secondary">
            Inicio
          </Link>
          <span>/</span>
          <Link href="/guias" className="transition hover:text-primary dark:hover:text-secondary">
            Guías
          </Link>
          <span>/</span>
          <span className="font-semibold text-slate-900 dark:text-[#f5f5f7]">
            Reparación Motorola
          </span>
        </nav>

        <header className="bg-[#1d1d1f] space-y-6 rounded-[28px] p-6 sm:p-8 md:p-10">
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-[-0.01em] text-slate-900 dark:text-[#f5f5f7] md:text-5xl">
              Reparación de Motorola en Buenos Aires
            </h1>
            <p className="max-w-[65ch] text-lg leading-relaxed text-slate-700 dark:text-[#a1a1a6]">
              Team Celular repara Motorola en dos sucursales en CABA: <strong>Paraguay 2451, Recoleta</strong> y <strong>Amenábar 2032, Belgrano</strong>. Presupuesto antes de reparar. Pantalla en 2–4 h y batería en 1–2 h con stock, con garantía
              escrita de 90 días sobre trabajo y repuesto. Moto G, Edge y E.
            </p>
          </div>


          <div className="flex flex-wrap gap-4">
            <Link
              href="/presupuesto-reparacion"
              className="tc-btn tc-btn-primary"
            >
              Quiero presupuesto para mi Motorola
            </Link>
            <Link
              href={`https://wa.me/5491151034595?text=${encodeURIComponent(
                "Hola Team Celular, quiero cotizar una reparación de Motorola. Modelo y falla:"
              )}`}
              className="tc-btn tc-btn-ghost"
            >
              Hablar por WhatsApp
            </Link>
          </div>
          <p className="text-sm leading-6 text-[#a1a1a6]">Revisión de placa: informe en hasta 72 horas hábiles. El arreglo lleva semanas; confirmamos precio y plazo por escrito.</p>

            <div className="mt-4">
              <GuideByline modifiedTime="2026-10-15T00:00:00Z" tone="light" />
            </div>
        </header>

        <section id="costos-reparacion-motorola" className="scroll-mt-24 bg-[#1d1d1f] rounded-[28px] p-8">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-[#f5f5f7]">
            ¿Cuánto cuesta reparar un Motorola en CABA?
          </h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-[#a1a1a6]">
            Precios orientativos en ARS — el valor exacto depende del modelo y el estado del equipo. Team Celular informa el costo de diagnóstico antes de abrir el equipo; si avanzás con la reparación, ese monto se descuenta del trabajo final.
          </p>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/20 dark:border-white/10">
                  <th className="pb-2 text-left font-semibold text-slate-900 dark:text-[#f5f5f7]">Servicio</th>
                  <th className="pb-2 text-right font-semibold text-slate-900 dark:text-[#f5f5f7]">Precio estimado ARS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 dark:divide-white/5">
                {[
                  ["Revisión técnica (sin placa)", "15.000 – 25.000"],
                  ["Revisión de placa (informe hasta 72 h hábiles)", "45.000"],
                  ["Pantalla Moto E / G", "99.900 – 199.900"],
                  ["Pantalla Edge (pOLED)", "299.900 – 599.900"],
                  ["Pantalla Razr (plegable)", "999.900 – 1.399.900"],
                  ["Batería Moto E / G", "89.900 – 169.900"],
                  ["Batería Edge / Razr", "119.900 – 229.900"],
                  ["Pin de carga USB-C", "35.000 – 150.000"],
                  ["Reparación de placa", "Consultar"],
                ].map(([service, price]) => (
                  <tr key={service}>
                    <td className="py-2.5 text-slate-700 dark:text-[#a1a1a6]">{service}</td>
                    <td className="py-2.5 text-right font-semibold text-slate-900 dark:text-[#f5f5f7]">{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-slate-500 dark:text-[#86868b]">
            Precios orientativos sujetos a actualización. Consultá por WhatsApp o presupuesto online para valores exactos según modelo.
          </p>
        </section>

        <section className="grid gap-5 lg:grid-cols-[0.9fr_1.4fr]">
          <div className="rounded-3xl border border-primary/20 bg-primary/10 p-7 dark:border-primary/30 dark:bg-primary/15">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary dark:text-secondary">
              Respuesta directa
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-[#f5f5f7]">
              Dónde reparar un Motorola en Buenos Aires
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-700 dark:text-slate-200">
              Para reparar un Motorola en Buenos Aires, Team Celular atiende en Paraguay
              2451, Recoleta, y Amenábar 2032, Belgrano. Con repuesto en stock, resolvemos pantalla, batería o carga USB-C en 1-4 h según el trabajo.
              Si requiere revisión de placa, el informe tarda hasta 72 horas hábiles; el arreglo lleva semanas y se confirma precio y plazo por escrito.
              La reparación tiene garantía escrita sobre trabajo y repuesto instalado.
            </p>
          </div>

          <div className="bg-[#1d1d1f] overflow-hidden rounded-[28px]">
            <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-700">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-[#f5f5f7]">
                Qué hacer según la falla del Motorola
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-[#a1a1a6]">
                Una referencia rápida para proteger el equipo antes del diagnóstico.
              </p>
            </div>
            <dl className="divide-y divide-slate-200 dark:divide-slate-700">
              {motorolaSymptomRows.map((row) => (
                <div key={row.symptom} className="px-6 py-5">
                  <dt className="font-semibold text-slate-900 dark:text-[#f5f5f7]">{row.symptom}</dt>
                  <dd className="mt-2 space-y-2 text-sm leading-6 text-slate-700 dark:text-[#a1a1a6]">
                    <p className="text-slate-900 dark:text-[#f5f5f7]">{row.nextStep}</p>
                    <p><span className="font-semibold">Urgencia: </span>{row.urgency}</p>
                    <p><span className="font-semibold">Tiempo típico: </span>{row.typicalTime}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <GoogleReviewsAPI />

        <details className="rounded-[28px] border border-white/15 bg-[#1d1d1f] p-6 sm:p-8">
          <summary className="cursor-pointer text-xl font-semibold text-white"><h2 className="inline">¿Cómo trabajamos tu Motorola de punta a punta?</h2></summary>
          <div className="mt-6">
          <div className="text-center">

            <p className="mt-2 text-lg text-slate-600 dark:text-[#a1a1a6]">
              Método técnico para confirmar la falla real antes de tocar el equipo
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
        </div>
        </details>

        <details className="rounded-[28px] border border-white/15 bg-[#1d1d1f] p-6 sm:p-8">
          <summary className="cursor-pointer text-xl font-semibold text-white"><h2 className="inline">¿Cuáles son las reparaciones de Motorola más frecuentes en CABA?</h2></summary>
          <div className="mt-6">
          <div className="text-center">

            <p className="mt-2 text-lg text-slate-600 dark:text-[#a1a1a6]">
              Servicios para Moto G, Edge y E con diagnóstico previo y garantía escrita
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
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-xl text-primary dark:text-secondary">
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
                      className="mt-3 inline-flex text-xs font-semibold text-primary dark:text-secondary hover:underline"
                    >
                      Ver precio y detalles →
                    </Link>
                  )}
                </article>
              );
            })}
          </div>
        </div>
        </details>

        <details className="rounded-[28px] border border-white/15 bg-[#1d1d1f] p-6 sm:p-8">
          <summary className="cursor-pointer text-xl font-semibold text-white"><h2 className="inline">¿Por qué elegir Team Celular para tu Motorola?</h2></summary>
          <div className="mt-6">
          <div className="border-b border-slate-100 px-8 py-5 dark:border-slate-800">

            <p className="mt-1 text-[0.95rem] text-slate-600 dark:text-[#86868b]">
              Cuatro puntos concretos que marcan la diferencia en cada trabajo.
            </p>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {trustBlocks.map((block) => {
              const Icon = block.Icon;
              return (
                <div key={block.title} className="flex gap-4 px-8 py-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-lg text-primary dark:text-secondary">
                    <Icon aria-hidden />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-[#f5f5f7]">
                      {block.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-[#86868b]">
                      {block.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        </details>




        <details className="rounded-[28px] border border-white/15 bg-[#1d1d1f] p-6 sm:p-8">
          <summary className="cursor-pointer text-xl font-semibold text-white"><h2 className="inline">¿Qué modelos de Motorola reparamos?</h2></summary>
          <div className="bg-[#1d1d1f] space-y-5 rounded-[28px] p-8 md:p-10 mt-6">

          <p className="text-center text-slate-600 dark:text-[#a1a1a6]">
            Cubrimos líneas actuales y generaciones anteriores con repuestos de calidad.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {motorolaModels.map((model) => (
              <span
                key={model}
                className="inline-flex min-h-11 items-center rounded-full border border-primary/40 bg-primary/15 px-4 py-2 text-[13px] font-semibold text-slate-800 dark:border-primary/40 dark:bg-primary/20 dark:text-[#f5f5f7]"
              >
                {model}
              </span>
            ))}
          </div>
        </div>
        </details>

        <section className="space-y-7">
          <div className="text-center">
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-[1.1] text-slate-900 dark:text-[#f5f5f7]">
              Preguntas frecuentes sobre reparación de Motorola
            </h2>
            <p className="mt-2 text-lg text-slate-600 dark:text-[#a1a1a6]">
              Respuestas por modelo y falla para decidir rápido y con información real
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



        <GuideInterlinkSection currentGuide="/guias/reparacion-motorola-buenos-aires" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Reparación de Motorola en Buenos Aires",
              description:
                "Servicio técnico especializado en Motorola con diagnóstico profesional, repuestos de calidad y garantía escrita 90 días en CABA.",
              provider: { "@id": "https://teamcelular.com#localbusiness" },
              // Rango y catalogo salen de repairPrices: un unico lugar donde el precio
              // visible y el structured data no pueden divergir.
              priceRange: `ARS ${priceRangeOf(BRAND_REPAIR_PRICES.motorola).low.toLocaleString("es-AR")}-${priceRangeOf(BRAND_REPAIR_PRICES.motorola).high.toLocaleString("es-AR")}`,
              ...buildPriceOffers(BRAND_REPAIR_PRICES.motorola, "Motorola"),
              areaServed: {
                "@type": "City",
                name: "Buenos Aires",
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Servicios de reparación Motorola",
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
