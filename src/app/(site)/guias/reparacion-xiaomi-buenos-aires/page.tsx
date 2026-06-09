import Link from "next/link";
import type { Metadata } from "next";
import ArticleSchema from "@/components/seo/ArticleSchema";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
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
import { SiXiaomi } from "react-icons/si";

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";
const PAGE_PATH = "/guias/reparacion-xiaomi-buenos-aires";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: "Reparación de Xiaomi, Redmi y POCO en Buenos Aires, CABA | Team Celular",
  description:
    "Reparación de Xiaomi, Redmi y POCO en Recoleta, CABA — Team Celular, Paraguay 2451. Pantalla, batería y USB-C en el día con garantía escrita 90 días.",
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
      "Team Celular, Paraguay 2451 Recoleta. Pantalla, batería y turbo charge en el día, garantía escrita 90 días. Xiaomi, Redmi y POCO.",
    type: "article",
    url: PAGE_URL,
    locale: "es_AR",
    images: [
      {
        url: "https://teamcelular.com/images/guia_xiaomi.webp",
        width: 1200,
        height: 630,
        alt: "Servicio tecnico para Xiaomi Redmi y POCO en Team Celular",
      },
    ],
    publishedTime: "2026-03-12T00:00:00Z",
    modifiedTime: "2026-06-08T00:00:00Z",
    section: "Guias Tecnicas",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reparación de Xiaomi, Redmi y POCO en CABA | Team Celular",
    description:
      "Team Celular, Paraguay 2451 Recoleta. Pantalla AMOLED y batería en el día, garantía escrita 90 días. Xiaomi, Redmi y POCO.",
    images: ["https://teamcelular.com/images/guia_xiaomi.webp"],
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
    active: false,
  },
  {
    href: "/guias/reparacion-xiaomi-buenos-aires",
    label: "Xiaomi",
    helper: "Xiaomi, Redmi y POCO",
    active: true,
  },
];

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
      "Medimos lineas de potencia, circuito de carga y estabilidad en reposo. Esto permite diferenciar falla de bateria, modulo de carga o PMIC.",
    duration: "30-45 min",
    Icon: FaTools,
  },
  {
    title: "Reparacion segun familia Xiaomi",
    description:
      "Aplicamos procedimiento segun modelo Xiaomi, Redmi o POCO para mantener rendimiento, autonomia y estabilidad de uso diario.",
    duration: "2-4 h",
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
    warranty: "Garantía 90 días",
    Icon: FaMobileAlt,
  },
  {
    title: "Bateria degradada y autonomia baja",
    detail:
      "Cambio de bateria para equipos con descarga acelerada, apagados inesperados o perdida de rendimiento en uso intenso.",
    eta: "1-2 h",
    warranty: "Garantía 90 días",
    Icon: FaBatteryFull,
  },
  {
    title: "Pin de carga USB-C y turbo charge",
    detail:
      "Solucion de carga intermitente, falso contacto y perdida de carga rapida en Xiaomi, Redmi y POCO.",
    eta: "2-3 h",
    warranty: "Garantía 90 días",
    Icon: FaBolt,
  },
  {
    title: "Camara trasera y camara selfie",
    detail:
      "Reparacion o cambio de modulo para recuperar enfoque, nitidez y estabilizacion en fotos y video.",
    eta: "2-4 h",
    warranty: "Garantía 90 días",
    Icon: FaCamera,
  },
  {
    title: "Placa logica, PMIC y bootloop",
    detail:
      "Microelectronica para equipos que reinician en logo, no encienden o quedan sin red luego de caidas o humedad.",
    eta: "24-48 h",
    warranty: "Garantía 90 días",
    Icon: FaMicrochip,
  },
  {
    title: "Speaker, microfono y audio inestable",
    detail:
      "Reparacion de audio bajo, distorsionado o sin microfono en llamadas con test final de grabacion y reproduccion.",
    eta: "2-3 h",
    warranty: "Garantía 90 días",
    Icon: FaShieldAlt,
  },
];

const repairLinks: Record<string, string> = {
  "Pantalla AMOLED o IPS para Xiaomi": "/reparaciones/cambio-pantalla-caba",
  "Bateria degradada y autonomia baja": "/reparaciones/cambio-bateria-caba",
  "Pin de carga USB-C y turbo charge": "/reparaciones/cambio-pin-carga-caba",
  "Camara trasera y camara selfie": "/reparaciones/cambio-camara-caba",
  "Placa logica, PMIC y bootloop": "/reparaciones/reparacion-placa-caba",
};

const trustReasons = [
  {
    title: "Servicio tecnico dedicado a Xiaomi",
    description:
      "Conocemos diferencias de hardware entre Xiaomi, Redmi y POCO para evitar diagnosticos genericos.",
    Icon: FaTools,
  },
  {
    title: "Informacion concreta para decidir",
    description:
      "Te explicamos si conviene reparar, que costo tiene y que resultado esperar en cada opcion.",
    Icon: FaCheckCircle,
  },
  {
    title: "Garantia escrita segun servicio",
    description: WARRANTY_SCOPE_MESSAGE,
    Icon: FaShieldAlt,
  },
  {
    title: "Velocidad para equipos de trabajo",
    description:
      "Sabemos que muchos Xiaomi son herramientas laborales, por eso priorizamos tiempos cortos con control de calidad.",
    Icon: FaClock,
  },
];

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
];

export default function XiaomiRepairGuidePage() {
  return (
    <div className="flex w-full justify-center px-4 py-16">
      <ArticleSchema
        title="Reparacion de Xiaomi en Buenos Aires | Servicio Tecnico Team Celular"
        description="Guia completa de reparacion Xiaomi, Redmi y POCO con diagnostico en 24 horas, repuestos premium y garantia escrita."
        publishedTime="2026-03-12T00:00:00Z"
        modifiedTime="2026-05-08T00:00:00Z"
        authorName="Team Celular"
        image="https://teamcelular.com/images/guia_xiaomi.webp"
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

        <nav className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <Link href="/" className="transition hover:text-primary">
            Inicio
          </Link>
          <span>/</span>
          <Link href="/guias" className="transition hover:text-primary">
            Guias
          </Link>
          <span>/</span>
          <span className="font-semibold text-slate-900 dark:text-white">
            Reparacion Xiaomi
          </span>
        </nav>

        <header className="space-y-8 rounded-3xl border border-white/20 bg-white/5 p-8 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30 md:p-14">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/70 bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              <SiXiaomi />
              Especialistas por marca
            </span>
            <span className="rounded-full border border-emerald-700/80 bg-emerald-700 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white">
              Recoleta y Belgrano · CABA
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white md:text-5xl">
              Reparación de Xiaomi, Redmi y POCO en Buenos Aires
            </h1>
            <p className="max-w-4xl text-lg leading-relaxed text-slate-700 dark:text-slate-300">
              Team Celular, con sucursales en Recoleta (Paraguay 2451) y Belgrano (Amenábar 2030) CABA, repara Xiaomi,
              Redmi y POCO con diagnóstico el mismo día, pantalla y batería en
              2–4 h, y garantía escrita de 90 días sobre trabajo y repuesto.
              Xiaomi 13/14/15, Redmi Note y POCO.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-lg dark:border-white/15 dark:bg-slate-900/40">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Diagnostico
              </p>
              <p className="mt-2 text-3xl font-black text-primary">24 h</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Causa real y plan tecnico claro
              </p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-lg dark:border-white/15 dark:bg-slate-900/40">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Garantia
              </p>
              <p className="mt-2 text-3xl font-black text-secondary">90 días</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Garantía escrita sobre trabajo y repuesto
              </p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-lg dark:border-white/15 dark:bg-slate-900/40">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Tiempo express
              </p>
              <p className="mt-2 text-3xl font-black text-primary">2-4 h</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Pantalla, bateria y carga rapida
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
              Cotizar reparacion Xiaomi
            </Link>
            <Link
              href="https://wa.me/5491151034595?text=Hola%20Team%20Celular%2C%20quiero%20cotizar%20una%20reparacion%20de%20Xiaomi"
              className="rounded-full border-2 border-primary px-8 py-4 text-base font-bold text-primary transition hover:bg-primary/10"
            >
              WhatsApp tecnico directo
            </Link>
          </div>
        </header>

        <section className="space-y-7">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              ¿Cómo es el proceso de reparación de Xiaomi en Team Celular?
            </h2>
            <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">
              Cuatro etapas para resolver la causa raíz y no repetir fallas
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
              ¿Cuáles son las reparaciones de Xiaomi más comunes en Buenos Aires?
            </h2>
            <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">
              Xiaomi, Redmi y POCO: seis fallas frecuentes que resolvemos cada semana
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
                    <span className="rounded-full bg-secondary/10 px-3 py-1 text-secondary">
                      {service.warranty}
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

        <section id="costos-reparacion-xiaomi" className="rounded-2xl border border-slate-200/80 bg-white dark:border-slate-700/60 dark:bg-slate-900">
          <div className="border-b border-slate-100 px-8 py-5 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              ¿Cuánto cuesta reparar un Xiaomi, Redmi o POCO en Buenos Aires?
            </h2>
            <p className="mt-1 text-[0.95rem] text-slate-600 dark:text-slate-400">
              Rangos orientativos para 2026. El precio exacto depende del modelo y el repuesto disponible.
            </p>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {[
              { servicio: "Diagnóstico técnico", modelos: "Todos los modelos", tiempo: "30–45 min", precio: "ARS 15.000–25.000" },
              { servicio: "Pantalla AMOLED", modelos: "Xiaomi 13, 14, 15", tiempo: "2–4 h", precio: "ARS 80.000–180.000" },
              { servicio: "Pantalla IPS", modelos: "Redmi Note, POCO", tiempo: "2–4 h", precio: "ARS 45.000–100.000" },
              { servicio: "Cambio de batería", modelos: "Xiaomi, Redmi, POCO", tiempo: "1–2 h", precio: "ARS 35.000–70.000" },
              { servicio: "Pin USB-C / turbo charge", modelos: "Todos", tiempo: "2–3 h", precio: "ARS 35.000–60.000" },
              { servicio: "Placa / bootloop / PMIC", modelos: "Todos", tiempo: "24–48 h", precio: "Consultar" },
            ].map((row) => (
              <div key={`${row.servicio}-${row.modelos}`} className="grid grid-cols-2 gap-x-4 gap-y-1 px-6 py-4 text-sm md:grid-cols-4">
                <span className="font-semibold text-slate-900 dark:text-slate-100">{row.servicio}</span>
                <span className="text-slate-500 dark:text-slate-400">{row.modelos}</span>
                <span className="text-slate-500 dark:text-slate-400">{row.tiempo}</span>
                <span className="font-semibold text-primary">{row.precio}</span>
              </div>
            ))}
          </div>
          <div className="space-y-4 px-8 py-6">
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
              Team Celular, con sucursales en Recoleta (Paraguay 2451) y Belgrano (Amenábar 2030) CABA, informa el costo de diagnóstico antes de abrir el equipo. Si avanzás con la reparación, ese monto se descuenta del trabajo final.
            </p>
            <Link
              href="/presupuesto-reparacion#solicitar-presupuesto"
              className="inline-flex min-h-10 items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90"
            >
              Pedir presupuesto exacto para mi Xiaomi
            </Link>
          </div>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/15 bg-white/5 p-8 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/30 md:p-10">
          <h2 className="text-center text-3xl font-bold text-slate-900 dark:text-white">
            Diagnóstico, repuestos y garantía: qué esperás al traer tu Xiaomi
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {trustReasons.map((reason) => {
              const Icon = reason.Icon;
              return (
                <article
                  key={reason.title}
                  className="flex gap-4 rounded-2xl border border-white/20 bg-white/10 p-5 dark:border-white/15 dark:bg-slate-900/40"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary">
                    <Icon />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      {reason.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                      {reason.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="space-y-5 rounded-3xl border border-white/15 bg-white/5 p-8 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/30 md:p-10">
          <h2 className="text-center text-3xl font-bold text-slate-900 dark:text-white">
            ¿Qué modelos Xiaomi, Redmi y POCO reparan en Team Celular?
          </h2>
          <p className="text-center text-slate-600 dark:text-slate-300">
            Cobertura para gamas premium, media y entrada con foco en reparaciones rentables.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {xiaomiModels.map((model) => (
              <span
                key={model}
                className="rounded-full border border-primary/40 bg-primary/15 px-3 py-2 text-xs font-semibold text-slate-800 dark:border-primary/40 dark:bg-primary/20 dark:text-slate-100"
              >
                {model}
              </span>
            ))}
          </div>
        </section>

        <section className="space-y-7">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Preguntas frecuentes sobre reparacion Xiaomi
            </h2>
            <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">
              Dudas comunes de clientes Xiaomi antes de confirmar el servicio
            </p>
          </div>
          <div className="space-y-4">
            {faq.map((item) => (
              <details
                key={item.question}
                className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl transition hover:shadow-lg dark:border-white/10 dark:bg-slate-900/30"
              >
                <summary className="cursor-pointer text-lg font-bold text-slate-900 dark:text-white">
                  {item.question}
                </summary>
                <p className="mt-4 leading-relaxed text-slate-700 dark:text-slate-300">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/15 bg-gradient-to-br from-primary/10 via-white/5 to-secondary/10 p-8 text-center backdrop-blur-2xl dark:border-white/10 dark:from-slate-900/45 dark:via-slate-900/30 dark:to-slate-900/45 md:p-12">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            Compara servicios por marca antes de decidir
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-700 dark:text-slate-300">
            Si estas comparando marcas, usa nuestras tres landings: iPhone, Samsung y Xiaomi.
            Cada una esta escrita para consultas reales y problemas tecnicos concretos.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/guias/reparacion-iphone-buenos-aires"
              className="rounded-full border border-slate-300/80 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary/40 hover:text-primary dark:border-slate-600/70 dark:bg-slate-900/70 dark:text-slate-200"
            >
              Ver landing iPhone
            </Link>
            <Link
              href="/guias/reparacion-samsung-buenos-aires"
              className="rounded-full border border-slate-300/80 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary/40 hover:text-primary dark:border-slate-600/70 dark:bg-slate-900/70 dark:text-slate-200"
            >
              Ver landing Samsung
            </Link>
            <Link
              href="/presupuesto-reparacion"
              className="rounded-full bg-secondary px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-secondary/90"
            >
              Pedir presupuesto Xiaomi
            </Link>
          </div>
        </section>

        <section className="space-y-5 rounded-3xl border border-white/15 bg-white/5 p-8 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/30">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Guias relacionadas
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Link
              href="/guias/reparacion-iphone-buenos-aires"
              className="rounded-2xl border border-white/20 bg-white/10 p-5 transition hover:border-primary dark:border-white/15 dark:bg-slate-900/40"
            >
              <h3 className="font-bold text-primary">
                Reparacion de iPhone en Buenos Aires
              </h3>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                Enfoque premium para Apple con garantia escrita y proceso trazable.
              </p>
            </Link>
            <Link
              href="/guias/reparacion-samsung-buenos-aires"
              className="rounded-2xl border border-white/20 bg-white/10 p-5 transition hover:border-primary dark:border-white/15 dark:bg-slate-900/40"
            >
              <h3 className="font-bold text-primary">
                Reparacion de Samsung Galaxy
              </h3>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                Fallas de pantalla AMOLED, carga y placa en equipos Galaxy.
              </p>
            </Link>
            <Link
              href="/guias/cambio-bateria-celular"
              className="rounded-2xl border border-white/20 bg-white/10 p-5 transition hover:border-primary dark:border-white/15 dark:bg-slate-900/40"
            >
              <h3 className="font-bold text-primary">
                Guia de cambio de bateria
              </h3>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                Senales de bateria degradada y criterios para reemplazo seguro.
              </p>
            </Link>
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
              areaServed: {
                "@type": "City",
                name: "Buenos Aires",
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Servicios de reparacion Xiaomi",
                itemListElement: repairServices.map((service) => ({
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: service.title,
                    description: service.detail,
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
