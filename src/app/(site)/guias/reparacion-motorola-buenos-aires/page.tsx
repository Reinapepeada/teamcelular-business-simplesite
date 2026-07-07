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
  title: "ReparaciÃ³n de Motorola en Buenos Aires, CABA | Team Celular",
  description:
    "ReparaciÃ³n de Motorola en Recoleta, CABA â€” Team Celular, Paraguay 2451. Pantalla, baterÃ­a y pin de carga en el dÃ­a. Moto G y Edge con garantÃ­a escrita 90 dÃ­as.",
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
    title: "ReparaciÃ³n de Motorola en Buenos Aires, CABA | Team Celular",
    description:
      "Team Celular, Paraguay 2451 Recoleta CABA. Pantalla, baterÃ­a y pin de carga de Motorola en el dÃ­a, garantÃ­a escrita 90 dÃ­as. Moto G, Edge y E.",
    type: "article",
    url: PAGE_URL,
    locale: "es_AR",
    images: [
      {
        url: "https://teamcelular.com/images/portada_moto.webp",
        width: 1200,
        height: 630,
        alt: "ReparaciÃ³n tÃ©cnica de Motorola en Team Celular, Recoleta CABA",
      },
    ],
    publishedTime: "2026-05-08T00:00:00Z",
    modifiedTime: "2026-06-09T00:00:00Z",
    section: "GuÃ­as TÃ©cnicas",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReparaciÃ³n de Motorola en CABA | Team Celular",
    description:
      "Team Celular, Paraguay 2451 Recoleta. Pantalla, baterÃ­a y carga de Motorola en el dÃ­a. GarantÃ­a escrita 90 dÃ­as.",
    images: ["https://teamcelular.com/images/portada_moto.webp"],
  },
};

const repairLinks: Record<string, string> = {
  "Cambio de pantalla Motorola": "/reparaciones/cambio-pantalla-caba",
  "Reemplazo de baterÃ­a Motorola": "/reparaciones/cambio-bateria-caba",
  "Pin de carga USB-C Motorola": "/reparaciones/cambio-pin-carga-caba",
  "Placa y recuperaciÃ³n avanzada": "/reparaciones/reparacion-placa-caba",
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
    step: "Ingreso y checklist tÃ©cnico",
    detail:
      "Validamos IMEI, estado estÃ©tico y funciones clave antes de abrir: pantalla, touch, cÃ¡maras, micrÃ³fono, parlantes, carga, WiFi y Bluetooth.",
    duration: "15 min",
    Icon: FaMobileAlt,
  },
  {
    step: "DiagnÃ³stico de laboratorio",
    detail:
      "Analizamos pin de carga, estado de baterÃ­a y consumo con instrumental. Si hay daÃ±o por lÃ­quido o golpe fuerte, documentamos con fotos antes de cotizar.",
    duration: "30-45 min",
    Icon: FaTools,
  },
  {
    step: "ReparaciÃ³n y calibraciÃ³n",
    detail:
      "Instalamos repuestos certificados y verificamos calibraciÃ³n tÃ¡ctil, autonomÃ­a de baterÃ­a y estabilidad de carga para sostener el uso diario.",
    duration: "1-4 h",
    Icon: FaWrench,
  },
  {
    step: "Control de calidad + garantÃ­a",
    detail: `Hacemos pruebas funcionales, test de carga completa y estabilidad tÃ©rmica. ${WARRANTY_SCOPE_MESSAGE}`,
    duration: "20 min",
    Icon: FaCheckCircle,
  },
];

const frequentRepairs = [
  {
    title: "Cambio de pantalla Motorola",
    description:
      "MÃ³dulo LCD o AMOLED con prueba de brillo, touch y sensores antes de entregar. Trabajamos Moto G series, Edge y variantes con pantalla curva.",
    eta: "2-4 h",
    warranty: "GarantÃ­a 90 dÃ­as",
    Icon: FaMobileAlt,
  },
  {
    title: "Reemplazo de baterÃ­a Motorola",
    description:
      "BaterÃ­a de calidad con test de autonomÃ­a real. Ideal para Moto G que dura menos de medio dÃ­a o se apaga en forma repentina.",
    eta: "1-2 h",
    warranty: "GarantÃ­a 90 dÃ­as",
    Icon: FaBatteryFull,
  },
  {
    title: "Pin de carga USB-C Motorola",
    description:
      "Reparamos pin, flex de carga y micrÃ³fonos inferiores. Frecuente en Moto G14, G24, G54 y Edge por uso intensivo con carga rÃ¡pida.",
    eta: "1-3 h",
    warranty: "GarantÃ­a 90 dÃ­as",
    Icon: FaBolt,
  },
  {
    title: "CÃ¡maras Motorola",
    description:
      "Cambio o reparaciÃ³n de mÃ³dulo trasero y frontal con ajuste de foco. Cubrimos Edge 40/50 y Moto G84/G85 con cÃ¡mara de alta resoluciÃ³n.",
    eta: "2-3 h",
    warranty: "GarantÃ­a 90 dÃ­as",
    Icon: FaCamera,
  },
  {
    title: "Botones, flex y audio",
    description:
      "Reparamos botÃ³n de encendido, volumen, flex de huellas dactilares, micrÃ³fono y parlante en toda la lÃ­nea Moto G y Edge.",
    eta: "1-3 h",
    warranty: "GarantÃ­a 90 dÃ­as",
    Icon: FaShieldAlt,
  },
  {
    title: "Placa y recuperaciÃ³n avanzada",
    description:
      "DiagnÃ³stico y reparaciÃ³n de placa para Motorola que no enciende, reinicia o no toma carga luego de un golpe o daÃ±o por lÃ­quidos.",
    eta: "24-48 h",
    warranty: "GarantÃ­a 90 dÃ­as",
    Icon: FaMicrochip,
  },
];

const trustBlocks = [
  {
    title: "DiagnÃ³stico claro antes de reparar",
    description:
      "RecibÃ­s un informe: quÃ© falla, quÃ© se reemplaza, cuÃ¡nto tarda y cuÃ¡nto cuesta. Sin costos sorpresa al retirar.",
    Icon: FaCheckCircle,
  },
  {
    title: "Dos talleres en CABA con trazabilidad",
    description:
      "Cada equipo se registra con orden tÃ©cnica y checklist en Recoleta (Paraguay 2451) y Belgrano (Amenábar 2032). SabÃ©s en quÃ© etapa estÃ¡ tu Motorola en todo momento.",
    Icon: FaClock,
  },
  {
    title: "Repuestos de calidad, no de descarte",
    description:
      "Evitamos mÃ³dulos de baja duraciÃ³n. Priorizamos estabilidad tÃ¡ctil, autonomÃ­a real y seguridad elÃ©ctrica en cada servicio.",
    Icon: FaShieldAlt,
  },
  {
    title: "Respuesta en el dÃ­a para casos frecuentes",
    description:
      "Pantalla, baterÃ­a y pin de carga de Motorola podemos resolverlos el mismo dÃ­a segÃºn stock. Confirmamos plazo antes de abrir el equipo.",
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
    question: "Â¿CuÃ¡nto tarda el cambio de pantalla de un Motorola Moto G?",
    answer:
      "Entre 2 y 4 horas en la mayorÃ­a de modelos de la lÃ­nea G. Si el marco o el sensor de huellas estÃ¡ integrado al mÃ³dulo, puede tomar algo mÃ¡s. Confirmamos tiempo exacto al ingreso.",
  },
  {
    question: "Â¿Trabajan Motorola Edge con pantalla curva?",
    answer:
      "SÃ­. Los modelos Edge 30, 40 y 50 tienen pantalla curva que requiere herramientas especÃ­ficas para el despegue. Diagnosticamos antes de cotizar para confirmar viabilidad segÃºn el nivel de daÃ±o.",
  },
  {
    question: "Â¿El Moto G14/G24 tiene problemas frecuentes de pin de carga?",
    answer:
      "SÃ­, el puerto USB-C del Moto G14 y G24 presenta desgaste por uso intensivo con carga rÃ¡pida. Revisamos pin y flex antes de confirmar si el problema es mecÃ¡nico o elÃ©ctrico.",
  },
  {
    question: "Â¿La garantÃ­a cubre trabajo y repuesto?",
    answer: `SÃ­. ${WARRANTY_SCOPE_MESSAGE}`,
  },
  {
    question: "Â¿Reparan Motorola con daÃ±o por agua?",
    answer:
      "SÃ­. Hacemos apertura tÃ©cnica, limpieza y diagnÃ³stico de corrosiÃ³n en laboratorio. No enchufes ni cargues el equipo antes de traerlo â€” eso puede agravar el daÃ±o en placa.",
  },
  {
    question: "Â¿CuÃ¡nto cuesta el diagnÃ³stico si no avanzo con la reparaciÃ³n?",
    answer:
      "El diagnÃ³stico tiene costo fijo que se informa antes de abrir el equipo. Si avanzÃ¡s con la reparaciÃ³n, ese valor se descuenta del trabajo final.",
  },
  {
    question: "Â¿Atienden todos los modelos de Motorola?",
    answer:
      "Atendemos toda la lÃ­nea Moto G (G14 a G85), Edge (30, 40, 50), Moto E y ThinkPhone. Para modelos muy antiguos confirmamos disponibilidad de repuesto antes de ingresar el equipo.",
  },
  {
    question: "Â¿El cambio de baterÃ­a requiere apagar funciones del sistema?",
    answer:
      "No en la lÃ­nea Moto G. El reemplazo de baterÃ­a no afecta funciones de software. DespuÃ©s del cambio hacemos test de autonomÃ­a y ciclo de carga para confirmar rendimiento.",
  },
];

export default function MotorolaRepairGuidePage() {
  return (
    <div className="flex w-full justify-center px-4 py-16">
      <ArticleSchema
        title="ReparaciÃ³n de Motorola en Buenos Aires | Servicio TÃ©cnico Team Celular"
        description="GuÃ­a completa para reparar Motorola en CABA con diagnÃ³stico profesional, repuestos de calidad y garantÃ­a escrita 90 dÃ­as."
        publishedTime="2026-05-08T00:00:00Z"
        modifiedTime="2026-06-09T00:00:00Z"
        authorName="Team Celular"
        image="https://teamcelular.com/images/portada_moto.webp"
        url={PAGE_URL}
      />

      <article className="w-full max-w-6xl space-y-14">
        <BreadcrumbJsonLd
          items={[
            { name: "Inicio", url: `${SITE_URL}/` },
            { name: "GuÃ­as", url: `${SITE_URL}/guias` },
            { name: "ReparaciÃ³n de Motorola", url: PAGE_URL },
          ]}
        />

        <nav className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <Link href="/" className="transition hover:text-primary">
            Inicio
          </Link>
          <span>/</span>
          <Link href="/guias" className="transition hover:text-primary">
            GuÃ­as
          </Link>
          <span>/</span>
          <span className="font-semibold text-slate-900 dark:text-white">
            ReparaciÃ³n Motorola
          </span>
        </nav>

        <header className="space-y-8 rounded-3xl border border-white/20 bg-white/5 p-8 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30 md:p-14">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/70 bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Especialistas por marca
            </span>
            <span className="rounded-full border border-emerald-700/80 bg-emerald-700 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white">
              Recoleta y Belgrano Â· CABA
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white md:text-5xl">
              ReparaciÃ³n de Motorola en Buenos Aires
            </h1>
            <p className="max-w-4xl text-lg leading-relaxed text-slate-700 dark:text-slate-300">
              Team Celular repara Motorola en dos sucursales en CABA: <strong>Paraguay 2451, Recoleta</strong> y <strong>Amenábar 2032, Belgrano</strong>. DiagnÃ³stico el mismo dÃ­a, pantalla y baterÃ­a en 2â€“4 h, y garantÃ­a
              escrita de 90 dÃ­as sobre trabajo y repuesto. Moto G, Edge y E.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-lg dark:border-white/15 dark:bg-slate-900/40">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                DiagnÃ³stico
              </p>
              <p className="mt-2 text-3xl font-black text-primary">Mismo dÃ­a</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Informe claro con pasos y presupuesto
              </p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-lg dark:border-white/15 dark:bg-slate-900/40">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                GarantÃ­a
              </p>
              <p className="mt-2 text-3xl font-black text-secondary">90 dÃ­as</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                GarantÃ­a escrita sobre trabajo y repuesto
              </p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-lg dark:border-white/15 dark:bg-slate-900/40">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Tiempo express
              </p>
              <p className="mt-2 text-3xl font-black text-primary">1-4 h</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Pantalla, baterÃ­a y carga en el dÃ­a
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
                "Hola Team Celular, quiero cotizar una reparaciÃ³n de Motorola. Modelo y falla:"
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
              Â¿CÃ³mo trabajamos tu Motorola de punta a punta?
            </h2>
            <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">
              MÃ©todo tÃ©cnico para confirmar la falla real antes de tocar el equipo
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
              Â¿CuÃ¡les son las reparaciones de Motorola mÃ¡s frecuentes en CABA?
            </h2>
            <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">
              Servicios para Moto G, Edge y E con diagnÃ³stico previo y garantÃ­a escrita
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
                  {repairLinks[repair.title] && (
                    <Link
                      href={repairLinks[repair.title]}
                      className="mt-3 inline-flex text-xs font-semibold text-primary hover:underline"
                    >
                      Ver precio y detalles â†’
                    </Link>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200/80 bg-white dark:border-slate-700/60 dark:bg-slate-900">
          <div className="border-b border-slate-100 px-8 py-5 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Â¿Por quÃ© elegir Team Celular para tu Motorola?
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

        <section id="costos-reparacion-motorola" className="rounded-2xl border border-white/15 bg-white/5 p-8 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Â¿CuÃ¡nto cuesta reparar un Motorola en CABA?
          </h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
            Precios orientativos en ARS â€” el valor exacto depende del modelo y el estado del equipo. Team Celular informa el costo de diagnÃ³stico antes de abrir el equipo; si avanzÃ¡s con la reparaciÃ³n, ese monto se descuenta del trabajo final.
          </p>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/20 dark:border-white/10">
                  <th className="pb-2 text-left font-semibold text-slate-900 dark:text-white">Servicio</th>
                  <th className="pb-2 text-right font-semibold text-slate-900 dark:text-white">Precio estimado ARS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 dark:divide-white/5">
                {[
                  ["DiagnÃ³stico tÃ©cnico", "15.000 â€“ 25.000"],
                  ["Pantalla Moto G (LCD)", "50.000 â€“ 100.000"],
                  ["Pantalla Edge (AMOLED)", "90.000 â€“ 200.000"],
                  ["BaterÃ­a", "35.000 â€“ 65.000"],
                  ["Pin de carga USB-C", "35.000 â€“ 60.000"],
                  ["ReparaciÃ³n de placa", "Consultar"],
                ].map(([service, price]) => (
                  <tr key={service}>
                    <td className="py-2.5 text-slate-700 dark:text-slate-300">{service}</td>
                    <td className="py-2.5 text-right font-semibold text-slate-900 dark:text-white">{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
            âš ï¸ Precios orientativos sujetos a actualizaciÃ³n. ConsultÃ¡ por WhatsApp o presupuesto online para valores exactos segÃºn modelo.
          </p>
        </section>

        <section className="grid gap-6 rounded-3xl border border-white/15 bg-white/5 p-6 shadow-xl backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30 md:grid-cols-[1.15fr_0.85fr] md:items-center md:p-8">
          <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-slate-900/40">
            <Image
              src="/images/guia_motorola.webp"
              alt="Laboratorio de reparaciÃ³n Motorola Team Celular Recoleta CABA"
              width={1200}
              height={900}
              sizes="(max-width: 768px) 100vw, 60vw"
              className="h-auto w-full object-cover"
            />
          </div>
          <article className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              DiagnÃ³stico real, sin respuestas genÃ©ricas
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              Evaluamos sÃ­ntomas, pruebas y contexto del equipo para darte una recomendaciÃ³n
              concreta. Si no conviene reparar el Motorola, te lo decimos claro antes de avanzar
              â€” con informe tÃ©cnico sin costo extra.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`https://wa.me/5491151034595?text=${encodeURIComponent(
                  "Hola Team Celular, quiero cotizar una reparaciÃ³n de Motorola. Modelo y falla:"
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
            Â¿QuÃ© modelos de Motorola reparamos?
          </h2>
          <p className="text-center text-slate-600 dark:text-slate-300">
            Cubrimos lÃ­neas actuales y generaciones anteriores con repuestos de calidad.
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
              Preguntas frecuentes sobre reparaciÃ³n de Motorola
            </h2>
            <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">
              Respuestas por modelo y falla para decidir rÃ¡pido y con informaciÃ³n real
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
            Cada guÃ­a tiene procesos, fallas tÃ­picas y criterios de repuesto adaptados a esa marca. Si tenÃ©s otro modelo, revisÃ¡ la guÃ­a que corresponde.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/guias/reparacion-samsung-buenos-aires"
              className="rounded-full border border-slate-300/80 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary/40 hover:text-primary dark:border-slate-600/70 dark:bg-slate-900/70 dark:text-slate-200"
            >
              Ver guÃ­a Samsung
            </Link>
            <Link
              href="/guias/reparacion-iphone-buenos-aires"
              className="rounded-full border border-slate-300/80 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary/40 hover:text-primary dark:border-slate-600/70 dark:bg-slate-900/70 dark:text-slate-200"
            >
              Ver guÃ­a iPhone
            </Link>
            <Link
              href="/guias/reparacion-xiaomi-buenos-aires"
              className="rounded-full border border-slate-300/80 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary/40 hover:text-primary dark:border-slate-600/70 dark:bg-slate-900/70 dark:text-slate-200"
            >
              Ver guÃ­a Xiaomi
            </Link>
            <Link
              href="/presupuesto-reparacion"
              className="rounded-full bg-secondary px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-secondary/90"
            >
              Pedir diagnÃ³stico ahora
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
                Proceso y tiempos para mÃ³dulo LCD y AMOLED con prueba funcional.
              </p>
            </Link>
            <Link
              href="/reparaciones/cambio-bateria-caba"
              className="rounded-2xl border border-white/20 bg-white/10 p-5 transition hover:border-primary dark:border-white/15 dark:bg-slate-900/40"
            >
              <h3 className="font-bold text-primary">
                Cambio de baterÃ­a en CABA
              </h3>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                DiagnÃ³stico de desgaste y reemplazo con test de autonomÃ­a real.
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
                ReparaciÃ³n de carga intermitente y falso contacto en Moto G.
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
              name: "ReparaciÃ³n de Motorola en Buenos Aires",
              description:
                "Servicio tÃ©cnico especializado en Motorola con diagnÃ³stico profesional, repuestos de calidad y garantÃ­a escrita 90 dÃ­as en CABA.",
              provider: { "@id": "https://teamcelular.com#localbusiness" },
              areaServed: {
                "@type": "City",
                name: "Buenos Aires",
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Servicios de reparaciÃ³n Motorola",
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
