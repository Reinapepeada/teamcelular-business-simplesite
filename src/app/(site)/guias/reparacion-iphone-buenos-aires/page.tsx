import Link from "next/link";
import type { Metadata } from "next";
import ArticleSchema from "@/components/seo/ArticleSchema";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import GoogleReviewsAPI from "@/components/cards/GoogleReviewsAPI";
import {
  FaApple,
  FaBatteryFull,
  FaBolt,
  FaCamera,
  FaCheckCircle,
  FaClock,
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
  title: "Reparacion de iPhone en Buenos Aires | Servicio Tecnico Premium CABA",
  description:
    "Reparacion de iPhone en Recoleta con repuestos certificados, preservacion de True Tone y Face ID, diagnostico en 24 horas y garantia escrita. Atendemos iPhone 8 a iPhone 16 Pro Max.",
  keywords: [
    "reparacion iphone buenos aires",
    "service iphone caba",
    "cambio pantalla iphone recoleta",
    "cambio bateria iphone original",
    "reparacion face id iphone",
    "reparacion placa iphone",
    "service tecnico apple argentina",
    "reparar iphone mojado caba",
    "repuestos iphone certificados",
    "diagnostico iphone 24 horas",
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
    title: "Reparacion de iPhone en Buenos Aires | Team Celular",
    description:
      "Servicio tecnico especializado en iPhone con garantia escrita, repuestos premium y laboratorio de microelectronica en CABA.",
    type: "article",
    url: PAGE_URL,
    locale: "es_AR",
    images: [
      {
        url: "https://teamcelular.com/images/guia_iphone.webp",
        width: 1200,
        height: 630,
        alt: "Laboratorio de reparacion de iPhone en Team Celular",
      },
    ],
    publishedTime: "2024-01-15T00:00:00Z",
    modifiedTime: "2026-03-12T00:00:00Z",
    section: "Guias Tecnicas",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reparacion de iPhone en CABA | Team Celular",
    description:
      "Diagnostico en 24 horas, repuestos certificados y garantia escrita para iPhone.",
    images: ["https://teamcelular.com/images/guia_iphone.webp"],
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
];

const quickSteps = [
  {
    step: "Ingreso y checklist tecnico",
    detail:
      "Validamos IMEI, estado estetico y todas las funciones clave del equipo antes de abrirlo: camaras, microfono, carga, parlantes, WiFi, Bluetooth, Face ID o Touch ID.",
    duration: "15 min",
    Icon: FaMobileAlt,
  },
  {
    step: "Diagnostico de laboratorio",
    detail:
      "Analizamos placa logica, lineas de carga y consumo con instrumental de laboratorio. Si hay dano por liquido o golpe, documentamos fotos macro para un informe transparente.",
    duration: "30-45 min",
    Icon: FaTools,
  },
  {
    step: "Reparacion y calibracion",
    detail:
      "Instalamos repuestos certificados y calibramos funciones delicadas de iPhone como True Tone, sensores de proximidad y rendimiento de bateria para sostener la experiencia original.",
    duration: "2-4 h",
    Icon: FaWrench,
  },
  {
    step: "Control de calidad + garantia",
    detail:
      "Hacemos pruebas funcionales, estabilidad termica y carga real. Entregamos informe final con recomendaciones y garantia escrita de 90 dias para la reparacion realizada.",
    duration: "20 min",
    Icon: FaCheckCircle,
  },
];

const frequentRepairs = [
  {
    title: "Cambio de pantalla OLED para iPhone",
    description:
      "Display con brillo, color y respuesta tactil consistentes. Preservamos funciones compatibles con True Tone cuando el modulo original lo permite.",
    eta: "2-4 h",
    warranty: "90 dias",
    Icon: FaMobileAlt,
  },
  {
    title: "Reemplazo de bateria certificada",
    description:
      "Bateria premium con medicion de consumo y test de autonomia real para evitar apagados repentinos o calentamiento anormal.",
    eta: "1-2 h",
    warranty: "90 dias",
    Icon: FaBatteryFull,
  },
  {
    title: "Puerto de carga y audio inferior",
    description:
      "Reparamos modulo de carga Lightning o USB-C, microfono y flex inferior. Ideal para iPhone que cargan intermitente o no detectan cable.",
    eta: "2-3 h",
    warranty: "90 dias",
    Icon: FaBolt,
  },
  {
    title: "Face ID, camara frontal y sensores",
    description:
      "Diagnostico por microelectronica para fallas de Face ID, camara selfie y sensor de proximidad en golpes o humedad.",
    eta: "3-6 h",
    warranty: "90 dias",
    Icon: FaShieldAlt,
  },
  {
    title: "Camaras traseras y estabilizacion",
    description:
      "Cambio o reparacion de modulo de camaras con ajuste de foco, estabilizacion y limpieza interna para fotos nitidas.",
    eta: "2-4 h",
    warranty: "90 dias",
    Icon: FaCamera,
  },
  {
    title: "Placa logica y recuperacion avanzada",
    description:
      "Trabajo de microelectronica para equipos que no encienden, reinician o no toman carga luego de un golpe electrico o liquido.",
    eta: "24-48 h",
    warranty: "90 dias",
    Icon: FaMicrochip,
  },
];

const trustBlocks = [
  {
    title: "Diagnostico claro antes de reparar",
    description:
      "Recibis un informe simple: que falla, que se reemplaza, cuanto tarda y cuanto cuesta. Sin letras chicas.",
    Icon: FaCheckCircle,
  },
  {
    title: "Laboratorio en Recoleta con trazabilidad",
    description:
      "Cada equipo se registra con orden tecnica y checklist. Sabes en que etapa esta tu iPhone en todo momento.",
    Icon: FaClock,
  },
  {
    title: "Piezas premium y procedimiento controlado",
    description:
      "Evitamos repuestos de baja duracion. Priorizamos estabilidad, autonomia y seguridad electrica en cada servicio.",
    Icon: FaShieldAlt,
  },
  {
    title: "Flujo express para urgencias reales",
    description:
      "Para pantalla, bateria y carga podemos resolver en el dia segun stock y cola de trabajo del laboratorio.",
    Icon: FaApple,
  },
];

const iphoneModels = [
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
    question: "Cuanto tarda la reparacion de pantalla de iPhone?",
    answer:
      "En la mayoria de los casos entre 2 y 4 horas. Si hay danos adicionales en marco, sensores o camaras, el tiempo puede extenderse porque priorizamos control de calidad y pruebas finales.",
  },
  {
    question: "Pueden mantener True Tone despues de cambiar pantalla?",
    answer:
      "Si, cuando el modulo original permite lectura de datos de calibracion. Si la pantalla llega totalmente destruida, te lo avisamos antes para que decidas con toda la informacion.",
  },
  {
    question: "Reparan iPhone con dano por agua o humedad?",
    answer:
      "Si. Hacemos apertura tecnica, limpieza y diagnostico de corrosion en laboratorio. La clave es no enchufarlo ni intentar cargarlo antes de traerlo.",
  },
  {
    question: "La garantia cubre mano de obra y repuesto?",
    answer:
      "Si. Entregamos garantia escrita de 90 dias para la reparacion realizada, incluyendo componente instalado y trabajo tecnico.",
  },
  {
    question: "Que pasa si no quiero reparar luego del diagnostico?",
    answer:
      "Te llevas el informe tecnico y el presupuesto detallado sin compromiso. El objetivo es que tomes una decision informada.",
  },
];

export default function IphoneRepairGuidePage() {
  return (
    <div className="flex w-full justify-center px-4 py-16">
      <ArticleSchema
        title="Reparacion de iPhone en Buenos Aires | Servicio Tecnico Premium Team Celular"
        description="Guia completa para reparar iPhone en CABA con diagnostico profesional, repuestos certificados y garantia escrita."
        publishedTime="2024-01-15T00:00:00Z"
        modifiedTime="2026-03-12T00:00:00Z"
        authorName="Team Celular"
        image="https://teamcelular.com/images/guia_iphone.webp"
        url={PAGE_URL}
      />

      <article className="w-full max-w-6xl space-y-14">
        <BreadcrumbJsonLd
          items={[
            { name: "Inicio", url: `${SITE_URL}/` },
            { name: "Guias", url: `${SITE_URL}/guias` },
            { name: "Reparacion de iPhone", url: PAGE_URL },
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
            Reparacion iPhone
          </span>
        </nav>

        <header className="space-y-8 rounded-3xl border border-white/20 bg-white/5 p-8 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30 md:p-14">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <FaApple />
              Especialistas por marca
            </span>
            <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-500">
              Recoleta - CABA
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white md:text-5xl">
              Reparacion de iPhone en Buenos Aires con enfoque premium
            </h1>
            <p className="max-w-4xl text-lg leading-relaxed text-slate-700 dark:text-slate-300">
              Reparamos iPhone con proceso tecnico trazable, piezas certificadas y
              garantia escrita. Si tu prioridad es recuperar rendimiento real y
              evitar reparaciones repetidas, este servicio esta pensado para vos.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-lg dark:border-white/15 dark:bg-slate-900/40">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Diagnostico
              </p>
              <p className="mt-2 text-3xl font-black text-primary">24 h</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Informe claro con pasos y presupuesto
              </p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-lg dark:border-white/15 dark:bg-slate-900/40">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Garantia
              </p>
              <p className="mt-2 text-3xl font-black text-secondary">90 dias</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Mano de obra y repuesto cubiertos
              </p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-lg dark:border-white/15 dark:bg-slate-900/40">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Tiempo express
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
                <span className="ml-2 text-xs opacity-80">{item.helper}</span>
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/presupuesto-reparacion"
              className="rounded-full bg-primary px-8 py-4 text-base font-bold text-white shadow-lg transition hover:bg-primary/90"
            >
              Quiero presupuesto para mi iPhone
            </Link>
            <Link
              href="https://wa.me/5491151034595?text=Hola%20Team%20Celular%2C%20quiero%20cotizar%20una%20reparacion%20de%20iPhone"
              className="rounded-full border-2 border-primary px-8 py-4 text-base font-bold text-primary transition hover:bg-primary/10"
            >
              Hablar por WhatsApp
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600 dark:text-slate-300">
            <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-primary">
              Resenas reales de Google
            </span>
            <span className="rounded-full border border-secondary/25 bg-secondary/10 px-3 py-1 text-secondary">
              Sin testimonios inventados
            </span>
            <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-emerald-600 dark:text-emerald-400">
              Actualizacion via API
            </span>
          </div>
        </header>

        <section className="space-y-6 rounded-3xl border border-white/15 bg-white/5 p-8 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/30 md:p-10">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Prueba social real antes de cotizar
            </h2>
            <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">
              Mostramos opiniones verificables de Google para que evalues la confianza del servicio con evidencia publica.
            </p>
          </div>
          {/* @ts-expect-error Async Server Component */}
          <GoogleReviewsAPI />
        </section>

        <section className="space-y-7">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Como trabajamos tu iPhone de punta a punta
            </h2>
            <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">
              Metodo orientado a resultado tecnico y experiencia post reparacion
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {quickSteps.map((step) => {
              const Icon = step.Icon;
              return (
                <article
                  key={step.step}
                  className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/30"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-2xl text-white">
                      <Icon />
                    </div>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {step.duration}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {step.step}
                  </h3>
                  <p className="mt-3 leading-relaxed text-slate-700 dark:text-slate-300">
                    {step.detail}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="space-y-7">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Reparaciones de iPhone mas solicitadas en CABA
            </h2>
            <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">
              Servicios pensados para resolver rapido sin perder calidad
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {frequentRepairs.map((repair) => {
              const Icon = repair.Icon;
              return (
                <article
                  key={repair.title}
                  className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/30"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-xl text-primary">
                    <Icon />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {repair.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                    {repair.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs font-semibold">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">
                      {repair.eta}
                    </span>
                    <span className="rounded-full bg-secondary/10 px-3 py-1 text-secondary">
                      {repair.warranty}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/15 bg-white/5 p-8 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/30 md:p-10">
          <h2 className="text-center text-3xl font-bold text-slate-900 dark:text-white">
            Por que esta landing de iPhone convierte mejor
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {trustBlocks.map((block) => {
              const Icon = block.Icon;
              return (
                <article
                  key={block.title}
                  className="flex gap-4 rounded-2xl border border-white/20 bg-white/10 p-5 dark:border-white/15 dark:bg-slate-900/40"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary">
                    <Icon />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      {block.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                      {block.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="space-y-5 rounded-3xl border border-white/15 bg-white/5 p-8 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/30 md:p-10">
          <h2 className="text-center text-3xl font-bold text-slate-900 dark:text-white">
            Modelos de iPhone que trabajamos
          </h2>
          <p className="text-center text-slate-600 dark:text-slate-300">
            Cobertura para lineas actuales y generaciones anteriores con repuestos compatibles de calidad.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {iphoneModels.map((model) => (
              <span
                key={model}
                className="rounded-full border border-primary/25 bg-primary/5 px-3 py-2 text-xs font-semibold text-primary dark:border-primary/35 dark:bg-primary/10"
              >
                {model}
              </span>
            ))}
          </div>
        </section>

        <section className="space-y-7">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Preguntas frecuentes sobre reparacion de iPhone
            </h2>
            <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">
              Respuestas concretas para decidir rapido y con informacion util
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
            Servicio por marca: iPhone, Samsung y Xiaomi
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-700 dark:text-slate-300">
            Si comparas opciones, revisa tambien nuestras landings de Samsung y Xiaomi. Cada una tiene procesos, fallas tipicas y criterios de repuesto adaptados a esa marca.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/guias/reparacion-samsung-buenos-aires"
              className="rounded-full border border-slate-300/80 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary/40 hover:text-primary dark:border-slate-600/70 dark:bg-slate-900/70 dark:text-slate-200"
            >
              Ver landing Samsung
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
              Pedir diagnostico ahora
            </Link>
          </div>
        </section>

        <section className="space-y-5 rounded-3xl border border-white/15 bg-white/5 p-8 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/30">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Lecturas relacionadas para seguir evaluando
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Link
              href="/guias/reparacion-samsung-buenos-aires"
              className="rounded-2xl border border-white/20 bg-white/10 p-5 transition hover:border-primary dark:border-white/15 dark:bg-slate-900/40"
            >
              <h3 className="font-bold text-primary">
                Reparacion de Samsung en Buenos Aires
              </h3>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                Fallas comunes de Galaxy S, A y Z Fold con tiempos reales.
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
                Diagnostico de carga rapida, pantalla y placa en equipos Xiaomi.
              </p>
            </Link>
            <Link
              href="/guias/microelectronica-reballing-caba"
              className="rounded-2xl border border-white/20 bg-white/10 p-5 transition hover:border-primary dark:border-white/15 dark:bg-slate-900/40"
            >
              <h3 className="font-bold text-primary">
                Microelectronica y reballing en CABA
              </h3>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                Casos complejos para equipos que no encienden o reinician.
              </p>
            </Link>
          </div>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Reparacion de iPhone en Buenos Aires",
              description:
                "Servicio tecnico especializado en iPhone con diagnostico profesional, repuestos certificados y garantia escrita en CABA.",
              provider: { "@id": "https://teamcelular.com#localbusiness" },
              areaServed: {
                "@type": "City",
                name: "Buenos Aires",
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Servicios de reparacion iPhone",
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
