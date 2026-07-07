import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import ArticleSchema from "@/components/seo/ArticleSchema";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import GuideInterlinkSection from "@/components/seo/GuideInterlinkSection";
import { WARRANTY_SCOPE_MESSAGE } from "@/lib/copyStandards";
import {
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
import { SiSamsung } from "react-icons/si";

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";
const PAGE_PATH = "/guias/reparacion-samsung-buenos-aires";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: "Reparación de Samsung Galaxy en Buenos Aires, CABA | Team Celular",
  description:
    "Reparación de Samsung Galaxy en Recoleta, CABA — Team Celular, Paraguay 2451. Pantalla AMOLED, batería y USB-C en el día con garantía escrita 90 días.",
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
        alt: "Reparacion tecnica de Samsung Galaxy en Team Celular",
      },
    ],
    publishedTime: "2026-03-12T00:00:00Z",
    modifiedTime: "2026-06-08T00:00:00Z",
    section: "Guias Tecnicas",
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
];

const processSteps = [
  {
    title: "Ingreso tecnico y control inicial",
    description:
      "Verificamos numero de serie, estado del equipo y funcionamiento de pantalla, camaras, sensores, WiFi, Bluetooth y carga rapida antes de desarmar.",
    duration: "15 min",
    Icon: FaMobileAlt,
  },
  {
    title: "Diagnostico Galaxy por sintoma real",
    description:
      "Medimos consumo de energia, lineas de carga USB-C y estabilidad de placa logica para detectar fallas intermitentes que no aparecen en una revision superficial.",
    duration: "30-45 min",
    Icon: FaTools,
  },
  {
    title: "Reparacion con repuesto premium",
    description:
      "Instalamos modulo compatible de alta calidad segun modelo y uso: linea S, A o Z. Ajustamos armado para preservar tactil, brillo y respuesta de sensores.",
    duration: "2-4 h",
    Icon: FaWrench,
  },
  {
    title: "QA final + entrega con garantia",
    description:
      `Testeamos llamadas, camaras, datos moviles, carga rapida y rendimiento termico. Entregamos recomendaciones de cuidado post reparacion. ${WARRANTY_SCOPE_MESSAGE}`,
    duration: "20 min",
    Icon: FaCheckCircle,
  },
];

const repairServices = [
  {
    title: "Cambio de pantalla AMOLED Samsung",
    detail:
      "Para Galaxy S y Note priorizamos paneles con buen contraste, tasa de refresco estable y respuesta tactil precisa.",
    eta: "2-4 h",
    warranty: "Garantía 90 días",
    Icon: FaMobileAlt,
  },
  {
    title: "Bateria y autonomia degradada",
    detail:
      "Reemplazo de bateria para equipos que se apagan en frio, bajan de 30% a 0% o pierden carga en reposo.",
    eta: "1-2 h",
    warranty: "Garantía 90 días",
    Icon: FaBolt,
  },
  {
    title: "Puerto USB-C y carga rapida",
    detail:
      "Solucion para carga intermitente, cable flojo o equipo que no negocia carga rapida. Incluye limpieza tecnica y test final.",
    eta: "2-3 h",
    warranty: "Garantía 90 días",
    Icon: FaShieldAlt,
  },
  {
    title: "Camaras con foco inestable u OIS fallando",
    detail:
      "Reparamos modulos de camara en Galaxy S y A para recuperar nitidez, enfoque y estabilizacion segun cada equipo.",
    eta: "2-4 h",
    warranty: "Garantía 90 días",
    Icon: FaCamera,
  },
  {
    title: "Placa logica Samsung",
    detail:
      "Microelectronica para equipos que no encienden, quedan en logo o presentan reinicios constantes despues de golpes o humedad.",
    eta: "24-48 h",
    warranty: "Garantía 90 días",
    Icon: FaMicrochip,
  },
  {
    title: "Bisagra, flex y display en Z Fold / Z Flip",
    detail:
      "Evaluamos pliegue, bisagra, cableados flex y panel interno para definir si conviene reparacion parcial o reemplazo completo.",
    eta: "24-72 h",
    warranty: "Garantía 90 días",
    Icon: FaWrench,
  },
];

const repairLinks: Record<string, string> = {
  "Cambio de pantalla AMOLED Samsung": "/reparaciones/cambio-pantalla-caba",
  "Bateria y autonomia degradada": "/reparaciones/cambio-bateria-caba",
  "Puerto USB-C y carga rapida": "/reparaciones/cambio-pin-carga-caba",
  "Camaras con foco inestable u OIS fallando": "/reparaciones/cambio-camara-caba",
  "Placa logica Samsung": "/reparaciones/reparacion-placa-caba",
};

const trustReasons = [
  {
    title: "Especializacion real en Samsung Galaxy",
    description:
      "No tratamos todos los equipos igual. Ajustamos repuesto y procedimiento segun familia S, A o Z.",
    Icon: FaCheckCircle,
  },
  {
    title: "Diagnostico util para decidir",
    description:
      "Recibis opciones con costo, tiempo y riesgo tecnico, para elegir la alternativa mas rentable para tu equipo.",
    Icon: FaTools,
  },
  {
    title: "Garantia escrita segun servicio",
    description: WARRANTY_SCOPE_MESSAGE,
    Icon: FaShieldAlt,
  },
  {
    title: "Flujo express para fallas comunes",
    description:
      "Pantalla, bateria y carga suelen resolverse el mismo dia si hay stock disponible.",
    Icon: FaClock,
  },
];

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
  "Galaxy A55",
  "Galaxy A54",
  "Galaxy A35",
  "Galaxy A34",
  "Galaxy A24",
  "Galaxy A15",
  "Galaxy Z Fold6",
  "Galaxy Z Fold5",
  "Galaxy Z Flip6",
  "Galaxy Z Flip5",
  "Galaxy Note 20 Ultra",
];

const faq = [
  {
    question: "Cuanto tarda un cambio de pantalla Samsung?",
    answer:
      "Depende del modelo y stock de modulo. En lineas S y A suele resolverse en el dia, entre 2 y 4 horas para casos standard.",
  },
  {
    question: "Se mantiene la tasa de refresco de 120 Hz?",
    answer:
      "Si el repuesto elegido y el modelo lo permiten, la tasa alta se mantiene. Te informamos antes de instalar para que no haya sorpresas.",
  },
  {
    question: "Reparan Samsung mojados o con humedad?",
    answer:
      "Si. Hacemos apertura tecnica, limpieza y medicion de corrosion. Es clave no cargar el equipo mojado y traerlo cuanto antes.",
  },
  {
    question: "Atienden linea Z Fold y Z Flip?",
    answer:
      "Si, con diagnostico especifico de bisagra, flex y pantalla interna. Son equipos mas delicados y requieren evaluacion detallada.",
  },
  {
    question: "Incluyen garantia luego de la reparacion?",
    answer: `Si. ${WARRANTY_SCOPE_MESSAGE}`,
  },
];

export default function SamsungRepairGuidePage() {
  return (
    <div className="flex w-full justify-center px-4 py-16">
      <ArticleSchema
        title="Reparacion de Samsung en Buenos Aires | Servicio Tecnico Team Celular"
        description="Guia detallada de reparacion Samsung Galaxy con diagnostico profesional, repuestos premium y garantia escrita."
        publishedTime="2026-03-12T00:00:00Z"
        modifiedTime="2026-05-08T00:00:00Z"
        authorName="Team Celular"
        image="https://teamcelular.com/images/guia_samsung.webp"
        url={PAGE_URL}
      />

      <article className="w-full max-w-6xl space-y-14">
        <BreadcrumbJsonLd
          items={[
            { name: "Inicio", url: `${SITE_URL}/` },
            { name: "Guias", url: `${SITE_URL}/guias` },
            { name: "Reparacion de Samsung", url: PAGE_URL },
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
            Reparacion Samsung
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
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-lg dark:border-white/15 dark:bg-slate-900/40">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Diagnostico
              </p>
              <p className="mt-2 text-3xl font-black text-primary">24 h</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Informe tecnico con opciones concretas
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
                Servicio express
              </p>
              <p className="mt-2 text-3xl font-black text-primary">2-4 h</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Pantalla, bateria y carga en el dia
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
              Cotizar reparacion Samsung
            </Link>
            <Link
              href="https://wa.me/5491151034595?text=Hola%20Team%20Celular%2C%20quiero%20cotizar%20una%20reparacion%20de%20Samsung"
              className="rounded-full border-2 border-primary px-8 py-4 text-base font-bold text-primary transition hover:bg-primary/10"
            >
              WhatsApp tecnico directo
            </Link>
          </div>
        </header>

        <section className="space-y-7">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              ¿Cómo es el proceso de reparación de Samsung en Team Celular?
            </h2>
            <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">
              Cuatro etapas para detectar la falla de origen, no solo el síntoma visible
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

        <section id="costos-reparacion-samsung" className="rounded-2xl border border-slate-200/80 bg-white dark:border-slate-700/60 dark:bg-slate-900">
          <div className="border-b border-slate-100 px-8 py-5 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              ¿Cuánto cuesta reparar un Samsung Galaxy en Buenos Aires?
            </h2>
            <p className="mt-1 text-[0.95rem] text-slate-600 dark:text-slate-400">
              Rangos orientativos para 2026. El precio exacto depende del modelo, la familia (S, A o Z) y el repuesto disponible.
            </p>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {[
              { servicio: "Diagnóstico técnico", modelos: "Todos los modelos", tiempo: "30–45 min", precio: "ARS 15.000–25.000" },
              { servicio: "Pantalla AMOLED", modelos: "Galaxy S22, S23, S24, S25", tiempo: "2–4 h", precio: "ARS 120.000–280.000" },
              { servicio: "Pantalla", modelos: "Galaxy A35, A54, A55", tiempo: "2–4 h", precio: "ARS 60.000–140.000" },
              { servicio: "Cambio de batería", modelos: "Galaxy S y A", tiempo: "1–2 h", precio: "ARS 40.000–80.000" },
              { servicio: "Puerto USB-C", modelos: "Todos", tiempo: "2–3 h", precio: "ARS 35.000–65.000" },
              { servicio: "Bisagra / flex Z Fold y Z Flip", modelos: "Z Fold, Z Flip", tiempo: "24–72 h", precio: "Consultar" },
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
              Team Celular, con sucursales en Recoleta (Paraguay 2451) y Belgrano (Amenábar 2032) CABA, informa el costo de diagnóstico antes de abrir el equipo. Si avanzás con la reparación, ese monto se descuenta del trabajo final.
            </p>
            <Link
              href="/presupuesto-reparacion#solicitar-presupuesto"
              className="inline-flex min-h-10 items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90"
            >
              Pedir presupuesto exacto para mi Samsung
            </Link>
          </div>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/15 bg-white/5 p-8 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/30 md:p-10">
          <h2 className="text-center text-3xl font-bold text-slate-900 dark:text-white">
            Diagnóstico, repuestos y garantía: qué esperás al traer tu Samsung
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

        <section className="grid gap-6 rounded-3xl border border-white/15 bg-white/5 p-6 shadow-xl backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30 md:grid-cols-[1.15fr_0.85fr] md:items-center md:p-8">
          <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-slate-900/40">
            <Image
              src="/images/samsung_portada.webp"
              alt="Laboratorio de reparación Samsung Galaxy en Team Celular, Recoleta CABA"
              width={1200}
              height={900}
              sizes="(max-width: 768px) 100vw, 60vw"
              className="h-auto w-full object-cover"
            />
          </div>
          <article className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Diagnóstico real antes de tocar el equipo
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              Evaluamos síntomas, consumo eléctrico y estado de placa antes de confirmar presupuesto.
              Si el Galaxy no conviene reparar, te lo decimos con datos claros — sin cobrar de más
              por un diagnóstico que ya tiene respuesta.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="https://wa.me/5491151034595?text=Hola%20Team%20Celular%2C%20quiero%20cotizar%20una%20reparacion%20de%20Samsung"
                className="inline-flex min-h-11 items-center rounded-full bg-emerald-700 px-5 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                Consultar por WhatsApp
              </Link>
              <Link
                href="/presupuesto-reparacion#solicitar-presupuesto"
                className="inline-flex min-h-11 items-center rounded-full border border-slate-300 px-5 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary dark:border-slate-600 dark:text-slate-200"
              >
                Ver presupuesto
              </Link>
            </div>
          </article>
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
              Preguntas frecuentes de reparacion Samsung
            </h2>
            <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">
              Informacion concreta para evitar dudas antes de avanzar
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
            Si tambien evaluas iPhone o Xiaomi, entra a las otras landings para comparar
            sintomas tipicos, tiempos de reparacion y criterios de repuestos.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/guias/reparacion-iphone-buenos-aires"
              className="rounded-full border border-slate-300/80 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary/40 hover:text-primary dark:border-slate-600/70 dark:bg-slate-900/70 dark:text-slate-200"
            >
              Ver landing iPhone
            </Link>
            <Link
              href="/guias/reparacion-xiaomi-buenos-aires"
              className="rounded-full border border-slate-300/80 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary/40 hover:text-primary dark:border-slate-600/70 dark:bg-slate-900/70 dark:text-slate-200"
            >
              Ver landing Xiaomi
            </Link>
            <Link
              href="/presupuesto-reparacion"
              className="rounded-full bg-secondary px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-secondary/90"
            >
              Pedir presupuesto Samsung
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
                Flujo premium para Apple con foco en True Tone y Face ID.
              </p>
            </Link>
            <Link
              href="/guias/reparacion-xiaomi-buenos-aires"
              className="rounded-2xl border border-white/20 bg-white/10 p-5 transition hover:border-primary dark:border-white/15 dark:bg-slate-900/40"
            >
              <h3 className="font-bold text-primary">
                Reparacion de Xiaomi, Redmi y POCO
              </h3>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                Diagnostico para carga rapida, bateria y placa en Xiaomi.
              </p>
            </Link>
            <Link
              href="/guias/reparacion-pantalla-celular"
              className="rounded-2xl border border-white/20 bg-white/10 p-5 transition hover:border-primary dark:border-white/15 dark:bg-slate-900/40"
            >
              <h3 className="font-bold text-primary">
                Guia de reparacion de pantallas
              </h3>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                Como elegir repuestos y que validar antes de cerrar una reparacion.
              </p>
            </Link>
          </div>
        </section>

        <GuideInterlinkSection currentGuide="/guias/reparacion-samsung-buenos-aires" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Reparacion de Samsung en Buenos Aires",
              description:
                "Servicio tecnico Samsung Galaxy en CABA con diagnostico profesional, repuestos premium y garantia escrita.",
              provider: { "@id": "https://teamcelular.com#localbusiness" },
              areaServed: {
                "@type": "City",
                name: "Buenos Aires",
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Servicios de reparacion Samsung",
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
