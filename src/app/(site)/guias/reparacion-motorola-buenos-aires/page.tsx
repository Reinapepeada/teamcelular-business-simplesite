import Link from "next/link";
import Image from "next/image";
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

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";
const PAGE_PATH = "/guias/reparacion-motorola-buenos-aires";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: "Reparación de Motorola en Buenos Aires, CABA | Team Celular",
  description:
    "Reparación de Motorola en Recoleta, CABA — Team Celular, Paraguay 2451. Pantalla, batería y pin de carga en el día. Moto G y Edge con garantía escrita 90 días.",
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
    title: "Reparación de Motorola en Buenos Aires, CABA | Team Celular",
    description:
      "Team Celular, Paraguay 2451 Recoleta CABA. Pantalla, batería y pin de carga de Motorola en el día, garantía escrita 90 días. Moto G, Edge y E.",
    type: "article",
    url: PAGE_URL,
    locale: "es_AR",
    images: [
      {
        url: "https://teamcelular.com/images/portada_moto.webp",
        width: 1200,
        height: 630,
        alt: "Reparación técnica de Motorola en Team Celular, Recoleta CABA",
      },
    ],
    publishedTime: "2026-05-08T00:00:00Z",
    modifiedTime: "2026-05-08T00:00:00Z",
    section: "Guías Técnicas",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reparación de Motorola en CABA | Team Celular",
    description:
      "Team Celular, Paraguay 2451 Recoleta. Pantalla, batería y carga de Motorola en el día. Garantía escrita 90 días.",
    images: ["https://teamcelular.com/images/portada_moto.webp"],
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
    href: "/guias/reparacion-motorola-buenos-aires",
    label: "Motorola",
    helper: "Moto G, Edge y E",
    active: true,
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
    step: "Ingreso y checklist técnico",
    detail:
      "Validamos IMEI, estado estético y funciones clave antes de abrir: pantalla, touch, cámaras, micrófono, parlantes, carga, WiFi y Bluetooth.",
    duration: "15 min",
    Icon: FaMobileAlt,
  },
  {
    step: "Diagnóstico de laboratorio",
    detail:
      "Analizamos pin de carga, estado de batería y consumo con instrumental. Si hay daño por líquido o golpe fuerte, documentamos con fotos antes de cotizar.",
    duration: "30-45 min",
    Icon: FaTools,
  },
  {
    step: "Reparación y calibración",
    detail:
      "Instalamos repuestos certificados y verificamos calibración táctil, autonomía de batería y estabilidad de carga para sostener el uso diario.",
    duration: "1-4 h",
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
    warranty: "Garantía 90 días",
    Icon: FaMobileAlt,
  },
  {
    title: "Reemplazo de batería Motorola",
    description:
      "Batería de calidad con test de autonomía real. Ideal para Moto G que dura menos de medio día o se apaga en forma repentina.",
    eta: "1-2 h",
    warranty: "Garantía 90 días",
    Icon: FaBatteryFull,
  },
  {
    title: "Pin de carga USB-C Motorola",
    description:
      "Reparamos pin, flex de carga y micrófonos inferiores. Frecuente en Moto G14, G24, G54 y Edge por uso intensivo con carga rápida.",
    eta: "1-3 h",
    warranty: "Garantía 90 días",
    Icon: FaBolt,
  },
  {
    title: "Cámaras Motorola",
    description:
      "Cambio o reparación de módulo trasero y frontal con ajuste de foco. Cubrimos Edge 40/50 y Moto G84/G85 con cámara de alta resolución.",
    eta: "2-3 h",
    warranty: "Garantía 90 días",
    Icon: FaCamera,
  },
  {
    title: "Botones, flex y audio",
    description:
      "Reparamos botón de encendido, volumen, flex de huellas dactilares, micrófono y parlante en toda la línea Moto G y Edge.",
    eta: "1-3 h",
    warranty: "Garantía 90 días",
    Icon: FaShieldAlt,
  },
  {
    title: "Placa y recuperación avanzada",
    description:
      "Diagnóstico y reparación de placa para Motorola que no enciende, reinicia o no toma carga luego de un golpe o daño por líquidos.",
    eta: "24-48 h",
    warranty: "Garantía 90 días",
    Icon: FaMicrochip,
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
    title: "Laboratorio en Recoleta con trazabilidad",
    description:
      "Cada equipo se registra con orden técnica y checklist. Sabés en qué etapa está tu Motorola en todo momento.",
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
      "Sí. Los modelos Edge 30, 40 y 50 tienen pantalla curva que requiere herramientas específicas para el despegue. Diagnosticamos antes de cotizar para confirmar viabilidad según el nivel de daño.",
  },
  {
    question: "¿El Moto G14/G24 tiene problemas frecuentes de pin de carga?",
    answer:
      "Sí, el puerto USB-C del Moto G14 y G24 presenta desgaste por uso intensivo con carga rápida. Revisamos pin y flex antes de confirmar si el problema es mecánico o eléctrico.",
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
      "El diagnóstico tiene costo fijo que se informa antes de abrir el equipo. Si avanzás con la reparación, ese valor se descuenta del trabajo final.",
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
];

export default function MotorolaRepairGuidePage() {
  return (
    <div className="flex w-full justify-center px-4 py-16">
      <ArticleSchema
        title="Reparación de Motorola en Buenos Aires | Servicio Técnico Team Celular"
        description="Guía completa para reparar Motorola en CABA con diagnóstico profesional, repuestos de calidad y garantía escrita 90 días."
        publishedTime="2026-05-08T00:00:00Z"
        modifiedTime="2026-05-08T00:00:00Z"
        authorName="Team Celular"
        image="https://teamcelular.com/images/portada_moto.webp"
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
            Reparación Motorola
          </span>
        </nav>

        <header className="space-y-8 rounded-3xl border border-white/20 bg-white/5 p-8 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30 md:p-14">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/70 bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Especialistas por marca
            </span>
            <span className="rounded-full border border-emerald-700/80 bg-emerald-700 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white">
              Recoleta · CABA
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white md:text-5xl">
              Reparación de Motorola en Buenos Aires
            </h1>
            <p className="max-w-4xl text-lg leading-relaxed text-slate-700 dark:text-slate-300">
              Team Celular, en Paraguay 2451 Recoleta CABA, repara Motorola con
              diagnóstico el mismo día, pantalla y batería en 2–4 h, y garantía
              escrita de 90 días sobre trabajo y repuesto. Moto G, Edge y E.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-lg dark:border-white/15 dark:bg-slate-900/40">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Diagnóstico
              </p>
              <p className="mt-2 text-3xl font-black text-primary">Mismo día</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Informe claro con pasos y presupuesto
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
                Tiempo express
              </p>
              <p className="mt-2 text-3xl font-black text-primary">1-4 h</p>
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
              Quiero presupuesto para mi Motorola
            </Link>
            <Link
              href={`https://wa.me/5491151034595?text=${encodeURIComponent(
                "Hola Team Celular, quiero cotizar una reparación de Motorola. Modelo y falla:"
              )}`}
              className="rounded-full border-2 border-primary px-8 py-4 text-base font-bold text-primary transition hover:bg-primary/10"
            >
              Hablar por WhatsApp
            </Link>
          </div>
        </header>

        <section className="space-y-7">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Cómo trabajamos tu Motorola de punta a punta
            </h2>
            <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">
              Método técnico para confirmar la falla real antes de tocar el equipo
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
                    <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
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
              Reparaciones de Motorola más solicitadas en CABA
            </h2>
            <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">
              Servicios para Moto G, Edge y E con diagnóstico previo y garantía escrita
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
                    <span className="rounded-full bg-primary px-3 py-1 text-white">
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

        <section className="rounded-2xl border border-slate-200/80 bg-white dark:border-slate-700/60 dark:bg-slate-900">
          <div className="border-b border-slate-100 px-8 py-5 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Por qué elegir Team Celular para tu Motorola
            </h2>
            <p className="mt-1 text-[0.95rem] text-slate-600 dark:text-slate-400">
              Cuatro puntos concretos que marcan la diferencia en cada trabajo.
            </p>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {trustBlocks.map((block) => {
              const Icon = block.Icon;
              return (
                <div key={block.title} className="flex gap-4 px-8 py-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-lg text-primary">
                    <Icon aria-hidden />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                      {block.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {block.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="grid gap-6 rounded-3xl border border-white/15 bg-white/5 p-6 shadow-xl backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30 md:grid-cols-[1.15fr_0.85fr] md:items-center md:p-8">
          <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-slate-900/40">
            <Image
              src="/images/guia_motorola.webp"
              alt="Laboratorio de reparación Motorola Team Celular Recoleta CABA"
              width={1200}
              height={900}
              sizes="(max-width: 768px) 100vw, 60vw"
              className="h-auto w-full object-cover"
            />
          </div>
          <article className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Diagnóstico real, sin respuestas genéricas
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              Evaluamos síntomas, pruebas y contexto del equipo para darte una recomendación
              concreta. Si no conviene reparar el Motorola, te lo decimos claro antes de avanzar
              — con informe técnico sin costo extra.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`https://wa.me/5491151034595?text=${encodeURIComponent(
                  "Hola Team Celular, quiero cotizar una reparación de Motorola. Modelo y falla:"
                )}`}
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
            Modelos de Motorola que trabajamos
          </h2>
          <p className="text-center text-slate-600 dark:text-slate-300">
            Cubrimos líneas actuales y generaciones anteriores con repuestos de calidad.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {motorolaModels.map((model) => (
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
              Preguntas frecuentes sobre reparación de Motorola
            </h2>
            <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">
              Respuestas por modelo y falla para decidir rápido y con información real
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
            Servicio por marca: Motorola, Samsung, iPhone y Xiaomi
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-700 dark:text-slate-300">
            Cada guía tiene procesos, fallas típicas y criterios de repuesto adaptados a esa marca. Si tenés otro modelo, revisá la guía que corresponde.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/guias/reparacion-samsung-buenos-aires"
              className="rounded-full border border-slate-300/80 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary/40 hover:text-primary dark:border-slate-600/70 dark:bg-slate-900/70 dark:text-slate-200"
            >
              Ver guía Samsung
            </Link>
            <Link
              href="/guias/reparacion-iphone-buenos-aires"
              className="rounded-full border border-slate-300/80 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary/40 hover:text-primary dark:border-slate-600/70 dark:bg-slate-900/70 dark:text-slate-200"
            >
              Ver guía iPhone
            </Link>
            <Link
              href="/guias/reparacion-xiaomi-buenos-aires"
              className="rounded-full border border-slate-300/80 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary/40 hover:text-primary dark:border-slate-600/70 dark:bg-slate-900/70 dark:text-slate-200"
            >
              Ver guía Xiaomi
            </Link>
            <Link
              href="/presupuesto-reparacion"
              className="rounded-full bg-secondary px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-secondary/90"
            >
              Pedir diagnóstico ahora
            </Link>
          </div>
        </section>

        <section className="space-y-5 rounded-3xl border border-white/15 bg-white/5 p-8 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/30">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Lecturas relacionadas para seguir evaluando
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Link
              href="/reparaciones/cambio-pantalla-caba"
              className="rounded-2xl border border-white/20 bg-white/10 p-5 transition hover:border-primary dark:border-white/15 dark:bg-slate-900/40"
            >
              <h3 className="font-bold text-primary">
                Cambio de pantalla en CABA
              </h3>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                Proceso y tiempos para módulo LCD y AMOLED con prueba funcional.
              </p>
            </Link>
            <Link
              href="/reparaciones/cambio-bateria-caba"
              className="rounded-2xl border border-white/20 bg-white/10 p-5 transition hover:border-primary dark:border-white/15 dark:bg-slate-900/40"
            >
              <h3 className="font-bold text-primary">
                Cambio de batería en CABA
              </h3>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                Diagnóstico de desgaste y reemplazo con test de autonomía real.
              </p>
            </Link>
            <Link
              href="/reparaciones/cambio-pin-carga-caba"
              className="rounded-2xl border border-white/20 bg-white/10 p-5 transition hover:border-primary dark:border-white/15 dark:bg-slate-900/40"
            >
              <h3 className="font-bold text-primary">
                Pin de carga USB-C en CABA
              </h3>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                Reparación de carga intermitente y falso contacto en Moto G.
              </p>
            </Link>
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
