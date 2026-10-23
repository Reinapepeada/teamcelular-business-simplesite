import Link from "next/link";
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
const PAGE_PATH = "/guias/reparacion-xiaomi-buenos-aires";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: "Servicio Técnico Xiaomi, Redmi y POCO en CABA | Precios",
  description:
    "Servicio técnico Xiaomi, Redmi y POCO en Recoleta y Belgrano. Pantalla desde $99.900 y batería desde $89.900, en 2-4 h. Garantía escrita 90 días.",
  keywords: [
    "reparacion xiaomi buenos aires",
    "service xiaomi caba",
    "reparar redmi note",
    "reparacion poco argentina",
    "cambio pantalla xiaomi",
    "cambio bateria xiaomi",
    "reparacion pin de carga xiaomi",
    "reparar placa xiaomi",
    "tecnico xiaomi recoleta",
    "servicio tecnico redmi y poco",
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
    title: "Reparación de Xiaomi, Redmi y POCO en Buenos Aires, CABA | Team Celular",
    description:
      "Team Celular, Paraguay 2451 Recoleta. Pantalla, batería y carga según modelo, stock y falla. Garantía escrita 90 días. Xiaomi, Redmi y POCO.",
    type: "article",
    url: PAGE_URL,
    locale: "es_AR",
    images: [
      {
        url: "https://teamcelular.com/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Servicio tecnico para Xiaomi Redmi y POCO en Team Celular",
      },
    ],
    publishedTime: "2026-03-12T00:00:00Z",
    modifiedTime: "2026-10-15T00:00:00Z",
    section: "Guias Tecnicas",
  },
  twitter: {
    card: "summary_large_image",
    title: "Servicio técnico Xiaomi, Redmi y POCO en CABA | Team Celular",
    description:
      "Team Celular, Paraguay 2451 Recoleta. Pantalla y batería según modelo y stock, garantía escrita 90 días. Xiaomi, Redmi y POCO.",
    images: ["https://teamcelular.com/opengraph-image.png"],
  },
};


const processSteps = [
  {
    title: "Recepcion con checklist funcional",
    description:
      "Revisamos estado general, touch, camaras, conectividad, carga y temperatura para detectar sintomas iniciales antes de abrir el equipo.",
    duration: "15 min",
    Icon: FaMobileAlt,
  },
  {
    title: "Diagnostico de consumo y placa",
    description:
      "Medimos consumo y alimentación para distinguir batería, módulo de carga o placa. Si requiere revisión de placa, el informe tarda hasta 72 horas hábiles; el arreglo lleva semanas y se presupuesta por separado.",
    duration: "según la falla",
    Icon: FaTools,
  },
  {
    title: "Reparacion segun familia Xiaomi",
    description:
      "Reparamos según el modelo y el presupuesto aprobado. Pantalla en 2-4 h y batería en 1-2 h con repuesto en stock; para otros trabajos confirmamos el plazo por escrito.",
    duration: "según el trabajo",
    Icon: FaWrench,
  },
  {
    title: "Pruebas reales y garantia escrita",
    description:
      `Verificamos carga rapida, consumo en reposo, red movil, camaras y audio para entregar un equipo utilizable y estable. ${WARRANTY_SCOPE_MESSAGE}`,
    duration: "20 min",
    Icon: FaCheckCircle,
  },
];

const repairServices = [
  {
    title: "Pantalla AMOLED o IPS para Xiaomi",
    detail:
      "Reemplazo de display con control de brillo, tactil y uniformidad de color en equipos Xiaomi 13/14, Redmi Note y POCO.",
    eta: "2-4 h",
    Icon: FaMobileAlt,
  },
  {
    title: "Bateria degradada y autonomia baja",
    detail:
      "Cambio de bateria para equipos con descarga acelerada, apagados inesperados o perdida de rendimiento en uso intenso.",
    eta: "1-2 h",
    Icon: FaBatteryFull,
  },
  {
    title: "Pin de carga USB-C y turbo charge",
    detail:
      "Solucion de carga intermitente, falso contacto y perdida de carga rapida en Xiaomi, Redmi y POCO.",
    eta: "2-3 h",
    Icon: FaBolt,
  },
  {
    title: "Camara trasera y camara selfie",
    detail:
      "Reparacion o cambio de modulo para recuperar enfoque, nitidez y estabilizacion en fotos y video.",
    eta: "2-4 h",
    Icon: FaCamera,
  },
  {
    title: "Placa logica, PMIC y bootloop",
    detail:
      "Se reinicia en el logo, no enciende o se quedó sin red después de una caída o de mojarse. Revisión de placa $45.000, con informe en hasta 72 horas hábiles. Se descuenta si se repara; el arreglo lleva semanas y se confirma precio y plazo por escrito.",
    eta: "informe hasta 72 h hábiles",
    Icon: FaMicrochip,
  },
  {
    title: "Speaker, microfono y audio inestable",
    detail:
      "Reparacion de audio bajo, distorsionado o sin microfono en llamadas con test final de grabacion y reproduccion.",
    eta: "2-3 h",
    Icon: FaShieldAlt,
  },
];

const xiaomiSymptomRows = [
  {
    symptom: "Pantalla con líneas, manchas o táctil que falla",
    urgency: "Alta si aparecen zonas negras o el táctil deja de responder",
    typicalTime: "2-4 h si hay módulo compatible en stock",
    nextStep: "Enviar modelo exacto y foto para confirmar AMOLED o IPS",
  },
  {
    symptom: "Batería dura poco, se apaga o calienta",
    urgency: "Alta si se hincha, levanta la tapa o descarga de golpe",
    typicalTime: "1-2 h según Xiaomi, Redmi o POCO",
    nextStep: "Apagarlo si está hinchado y pedir diagnóstico de consumo",
  },
  {
    symptom: "No carga rápido o el USB-C hace falso contacto",
    urgency: "Alta si dejó de encender o solo carga en una posición",
    typicalTime: "2-3 h para módulo; más si la falla está en placa",
    nextStep: "No forzar el conector y traer también cargador y cable",
  },
  {
    symptom: "Queda en el logo, reinicia o no enciende",
    urgency: "Alta: puede ser software, memoria, batería o PMIC",
    typicalTime: "Hasta 72 h hábiles para la revisión de placa",
    nextStep: "Evitar reinicios repetidos y solicitar diagnóstico técnico",
  },
  {
    symptom: "Se mojó o empezó a fallar después de humedad",
    urgency: "Crítica: no cargar, encender ni aplicar calor",
    typicalTime: "Si requiere placa: informe hasta 72 h hábiles; arreglo por presupuesto",
    nextStep: "Traerlo apagado al laboratorio lo antes posible",
  },
];

const repairLinks: Record<string, string> = {
  "Pantalla AMOLED o IPS para Xiaomi": "/reparaciones/cambio-pantalla-caba",
  "Bateria degradada y autonomia baja": "/reparaciones/cambio-bateria-caba",
  "Pin de carga USB-C y turbo charge": "/reparaciones/cambio-pin-carga-caba",
  "Camara trasera y camara selfie": "/reparaciones/cambio-camara-caba",
  "Placa logica, PMIC y bootloop": "/reparaciones/reparacion-placa-caba",
};


const xiaomiModels = [
  "Xiaomi 15 Ultra",
  "Xiaomi 15 Pro",
  "Xiaomi 15",
  "Xiaomi 14 Ultra",
  "Xiaomi 14",
  "Xiaomi 13T Pro",
  "Xiaomi 13",
  "Xiaomi 12 Pro",
  "Redmi Note 13 Pro+",
  "Redmi Note 13 Pro",
  "Redmi Note 13",
  "Redmi Note 12 Pro",
  "Redmi 13C",
  "Redmi 12",
  "POCO F6 Pro",
  "POCO F6",
  "POCO X6 Pro",
  "POCO X6",
  "POCO M6 Pro",
  "POCO C65",
];

const faq = [
  {
    question: "Cuanto tarda reparar un Xiaomi con pantalla rota?",
    answer:
      "En casos standard tarda entre 2 y 4 horas. Si el golpe afecto marco o sensores, puede extenderse para garantizar un armado correcto.",
  },
  {
    question: "Reparan celulares Redmi y POCO tambien?",
    answer:
      "Si. Trabajamos Xiaomi, Redmi y POCO, con procedimiento tecnico ajustado a cada modelo y tipo de falla.",
  },
  {
    question: "Mi Xiaomi no carga rapido, lo pueden resolver?",
    answer:
      "Si. Revisamos cable, modulo USB-C, bateria y lineas de carga en placa para detectar la causa real de la perdida de turbo charge.",
  },
  {
    question: "Atienden equipos Xiaomi que reinician en logo?",
    answer:
      "Si. Realizamos diagnostico de software y hardware para casos de bootloop, fallas de memoria o problemas de energia en placa.",
  },
  {
    question: "Que incluye la garantia?",
    answer: WARRANTY_SCOPE_MESSAGE,
  },
  {
    question: "Reparan Redmi Note 12, Note 13 y Note 14?",
    answer:
      "Sí. Trabajamos la línea Redmi Note y confirmamos el código exacto del equipo antes de cotizar pantalla, batería o módulo USB-C, porque un mismo nombre comercial puede tener variantes de hardware.",
  },
  {
    question: "Reparan POCO X6, F6 y otros modelos POCO?",
    answer:
      "Sí. Diagnosticamos POCO X, F, M y C según disponibilidad de repuesto. Revisamos especialmente carga, temperatura, batería, pantalla y placa en equipos de uso intensivo.",
  },
  {
    question: "Que diferencia hay entre pantalla AMOLED, IPS original y compatible?",
    answer:
      "El tipo correcto depende del modelo. Una pantalla distinta puede cambiar brillo, color, consumo, tasa de refresco o respuesta táctil. Antes de instalar te informamos qué opción hay, su calidad y qué funciones conserva.",
  },
  {
    question: "Es un servicio oficial Xiaomi?",
    answer:
      "No somos un centro oficial Xiaomi. Somos un laboratorio técnico independiente en CABA y detallamos por escrito diagnóstico, repuesto, tiempo estimado y garantía antes de avanzar.",
  },
  {
    question: "Cuanto cuesta el diagnostico si no hago la reparacion?",
    answer:
      "La revisión técnica va de $15.000 a $25.000, según la falla; la revisión de placa cuesta $45.000 y su informe se entrega en hasta 72 horas hábiles. Informamos el costo antes de abrir el equipo y se descuenta si aceptás la reparación. Si requiere arreglo de placa, lleva semanas y confirmamos precio y plazo por escrito.",
  },
];

export default function XiaomiRepairGuidePage() {
  return (
    <div className="flex w-full justify-center px-4 py-8 sm:py-12">
      <ArticleSchema
        title="Reparacion de Xiaomi en Buenos Aires | Servicio Tecnico Team Celular"
        description="Reparación de Xiaomi, Redmi y POCO con informe de revisión de placa en hasta 72 horas hábiles, arreglo por presupuesto y garantía escrita."
        publishedTime="2026-03-12T00:00:00Z"
        modifiedTime="2026-10-15T00:00:00Z"
        about={[
          "reparacion de Xiaomi en Buenos Aires",
          "service tecnico Xiaomi en CABA",
          "reparacion de Redmi Note",
          "reparacion de celulares POCO",
          "cambio de pantalla, bateria y USB-C Xiaomi",
        ]}
        image="https://teamcelular.com/opengraph-image.png"
        url={PAGE_URL}
      />

      <article className="w-full max-w-6xl space-y-14">
        <BreadcrumbJsonLd
          items={[
            { name: "Inicio", url: `${SITE_URL}/` },
            { name: "Guias", url: `${SITE_URL}/guias` },
            { name: "Reparacion de Xiaomi", url: PAGE_URL },
          ]}
        />

        <nav className="flex items-center gap-2 text-sm text-slate-600 dark:text-[#86868b]">
          <Link href="/" className="transition hover:text-primary dark:hover:text-secondary">
            Inicio
          </Link>
          <span>/</span>
          <Link href="/guias" className="transition hover:text-primary dark:hover:text-secondary">
            Guias
          </Link>
          <span>/</span>
          <span className="font-semibold text-slate-900 dark:text-[#f5f5f7]">
            Reparacion Xiaomi
          </span>
        </nav>

        <header className="bg-[#1d1d1f] space-y-6 rounded-[28px] p-6 sm:p-8 md:p-10">
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-[-0.01em] text-slate-900 dark:text-[#f5f5f7] md:text-5xl">
              Reparación de Xiaomi, Redmi y POCO en Buenos Aires
            </h1>
            <p className="max-w-[65ch] text-lg leading-relaxed text-slate-700 dark:text-[#a1a1a6]">
              Team Celular, con sucursales en Recoleta (Paraguay 2451) y Belgrano (Amenábar 2032) CABA, repara Xiaomi,
              Redmi y POCO con presupuesto antes de reparar. Pantalla en 2–4 h y batería en
              1–2 h con stock, con garantía escrita de 90 días sobre trabajo y repuesto.
              Xiaomi 13/14/15, Redmi Note y POCO.
            </p>
          </div>


          <div className="flex flex-wrap gap-4">
            <Link
              href="/presupuesto-reparacion"
              className="tc-btn tc-btn-primary"
            >
              Cotizar reparacion Xiaomi
            </Link>
            <Link
              href="https://wa.me/5491151034595?text=Hola%20Team%20Celular%2C%20quiero%20cotizar%20una%20reparacion%20de%20Xiaomi"
              className="tc-btn tc-btn-ghost"
            >
              WhatsApp tecnico directo
            </Link>
          </div>
          <p className="text-sm leading-6 text-[#a1a1a6]">Revisión de placa: informe en hasta 72 horas hábiles. El arreglo lleva semanas; confirmamos precio y plazo por escrito.</p>

            <div className="mt-4">
              <GuideByline modifiedTime="2026-10-15T00:00:00Z" tone="light" />
            </div>
        </header>

        <section id="costos-reparacion-xiaomi" className="scroll-mt-24 bg-[#1d1d1f] rounded-[28px]">
          <div className="border-b border-slate-100 px-8 py-5 dark:border-slate-800">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-[#f5f5f7]">
              ¿Cuánto cuesta reparar un Xiaomi, Redmi o POCO en Buenos Aires?
            </h2>
            <p className="mt-1 text-[0.95rem] text-slate-600 dark:text-[#86868b]">
              Rangos orientativos para 2026. El precio exacto depende del modelo y el repuesto disponible.
            </p>
          </div>
          <p className="px-6 pt-4 text-sm text-slate-300 sm:hidden">Deslizá la tabla para ver modelos, plazos y precios.</p>
          <div className="overflow-x-auto px-6 py-2" role="region" aria-label="Precios de reparación de Xiaomi" tabIndex={0}>
            <table className="w-full min-w-[38rem] border-collapse text-left text-sm">
              <caption className="sr-only">
                Precios de reparación de Xiaomi, Redmi y POCO en CABA, actualizados en agosto de 2026
              </caption>
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th scope="col" className="py-3 pr-4 font-semibold text-slate-900 dark:text-[#f5f5f7]">Servicio</th>
                  <th scope="col" className="py-3 pr-4 font-semibold text-slate-900 dark:text-[#f5f5f7]">Modelos</th>
                  <th scope="col" className="py-3 pr-4 font-semibold text-slate-900 dark:text-[#f5f5f7]">Tiempo</th>
                  <th scope="col" className="py-3 font-semibold text-slate-900 dark:text-[#f5f5f7]">Precio ARS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {[
                  { servicio: "Revisión técnica (sin placa)", modelos: "Según la falla", tiempo: "a confirmar al ingreso", precio: "15.000 – 25.000" },
                  { servicio: "Cambio de pantalla OLED", modelos: "Xiaomi 13, 14, 15 y POCO alta gama", tiempo: "2–4 h", precio: "249.900 – 599.900" },
                  { servicio: "Cambio de pantalla", modelos: "Redmi, Redmi Note, POCO", tiempo: "2–4 h", precio: "99.900 – 349.900" },
                  { servicio: "Cambio de batería", modelos: "Alta gama", tiempo: "1–2 h", precio: "119.900 – 229.900" },
                  { servicio: "Cambio de batería", modelos: "Redmi, Redmi Note, POCO", tiempo: "1–2 h", precio: "89.900 – 179.900" },
                  { servicio: "Pin USB-C / turbo charge", modelos: "Todos", tiempo: "2–3 h", precio: "35.000 – 150.000" },
                  { servicio: "Revisión de placa (bootloop, PMIC)", modelos: "Todos", tiempo: "informe hasta 72 h hábiles", precio: "45.000" },
                ].map((row) => (
                  <tr key={`${row.servicio}-${row.modelos}`}>
                    <td className="py-3 pr-4 font-semibold text-slate-900 dark:text-[#f5f5f7]">{row.servicio}</td>
                    <td className="py-3 pr-4 text-slate-500 dark:text-[#86868b]">{row.modelos}</td>
                    <td className="py-3 pr-4 text-slate-500 dark:text-[#86868b]">{row.tiempo}</td>
                    <td className="py-3 font-semibold tabular-nums text-primary dark:text-secondary">{row.precio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="space-y-4 px-8 py-6">
            <p className="text-sm leading-6 text-slate-600 dark:text-[#86868b]">
              Team Celular, con sucursales en Recoleta (Paraguay 2451) y Belgrano (Amenábar 2032) CABA, informa el costo de diagnóstico antes de abrir el equipo. Si avanzás con la reparación, ese monto se descuenta del trabajo final.
            </p>
            <Link
              href="/presupuesto-reparacion#solicitar-presupuesto"
              className="inline-flex min-h-11 items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90"
            >
              Pedir presupuesto exacto para mi Xiaomi
            </Link>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[0.9fr_1.4fr]">
          <div className="rounded-3xl border border-primary/20 bg-primary/10 p-7 dark:border-primary/30 dark:bg-primary/15">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary dark:text-secondary">
              Respuesta directa
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-[#f5f5f7]">
              Dónde reparar un Xiaomi, Redmi o POCO en Buenos Aires
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-700 dark:text-slate-200">
              Para reparar un Xiaomi, Redmi o POCO en Buenos Aires, Team Celular atiende
              en Paraguay 2451, Recoleta, y Amenábar 2032, Belgrano. Con repuesto en stock, resolvemos pantalla, batería o carga USB-C en 1-4 h según el trabajo.
              Si requiere revisión de placa, el informe tarda hasta 72 horas hábiles; el arreglo lleva semanas y se confirma precio y plazo por escrito. La reparación tiene garantía escrita sobre trabajo y repuesto instalado.
            </p>
          </div>

          <div className="bg-[#1d1d1f] overflow-hidden rounded-[28px]">
            <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-700">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-[#f5f5f7]">
                Qué hacer según la falla del Xiaomi
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-[#a1a1a6]">
                Una referencia rápida para proteger el equipo antes del diagnóstico.
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
                  {xiaomiSymptomRows.map((row) => (
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

        <details className="rounded-[28px] border border-white/15 bg-[#1d1d1f] p-6 sm:p-8">
          <summary className="cursor-pointer text-xl font-semibold text-white"><h2 className="inline">¿Cómo es el proceso de reparación de Xiaomi en Team Celular?</h2></summary>
          <div className="space-y-7 mt-6">
          <div className="text-center">

            <p className="mt-2 text-lg text-slate-600 dark:text-[#a1a1a6]">
              Cuatro etapas para resolver la causa raíz y no repetir fallas
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {processSteps.map((step) => {
              const Icon = step.Icon;
              return (
                <article
                  key={step.title}
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
                    {step.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-slate-700 dark:text-[#a1a1a6]">
                    {step.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
        </details>

        <section className="space-y-7">
          <div className="text-center">
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-[1.1] text-slate-900 dark:text-[#f5f5f7]">
              ¿Cuáles son las reparaciones de Xiaomi más comunes en Buenos Aires?
            </h2>
            <p className="mt-2 text-lg text-slate-600 dark:text-[#a1a1a6]">
              Xiaomi, Redmi y POCO: seis fallas frecuentes que resolvemos cada semana
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {repairServices.map((service) => {
              const Icon = service.Icon;
              return (
                <article
                  key={service.title}
                  className="bg-[#1d1d1f] rounded-[28px] p-6 transition"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-xl text-primary dark:text-secondary">
                    <Icon />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-[#f5f5f7]">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-[#a1a1a6]">
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
                      className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary dark:text-secondary transition hover:underline"
                    >
                      Ver precio y detalles →
                    </Link>
                  )}
                </article>
              );
            })}
          </div>
        </section>




        <details className="rounded-[28px] border border-white/15 bg-[#1d1d1f] p-6 sm:p-8">
          <summary className="cursor-pointer text-xl font-semibold text-white"><h2 className="inline">¿Qué modelos Xiaomi, Redmi y POCO reparan en Team Celular?</h2></summary>
          <div className="bg-[#1d1d1f] space-y-5 rounded-[28px] p-8 md:p-10 mt-6">

          <p className="text-center text-slate-600 dark:text-[#a1a1a6]">
            Cobertura para gamas premium, media y entrada con foco en reparaciones rentables.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {xiaomiModels.map((model) => (
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
              Preguntas frecuentes sobre reparacion Xiaomi
            </h2>
            <p className="mt-2 text-lg text-slate-600 dark:text-[#a1a1a6]">
              Dudas comunes de clientes Xiaomi antes de confirmar el servicio
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



        <GuideInterlinkSection currentGuide="/guias/reparacion-xiaomi-buenos-aires" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Reparacion de Xiaomi en Buenos Aires",
              description:
                "Servicio tecnico para Xiaomi, Redmi y POCO en CABA con repuestos premium y garantia escrita.",
              provider: { "@id": "https://teamcelular.com#localbusiness" },
              // Rango y catalogo salen de repairPrices: un unico lugar donde el precio
              // visible y el structured data no pueden divergir.
              priceRange: `ARS ${priceRangeOf(BRAND_REPAIR_PRICES.xiaomi).low.toLocaleString("es-AR")}-${priceRangeOf(BRAND_REPAIR_PRICES.xiaomi).high.toLocaleString("es-AR")}`,
              ...buildPriceOffers(BRAND_REPAIR_PRICES.xiaomi, "Xiaomi"),
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
