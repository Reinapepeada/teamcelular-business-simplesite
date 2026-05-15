import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import TrackedCtaLink from "@/components/cro/TrackedCtaLink";
import { buildWebsiteMetadata, getSiteUrl } from "@/lib/seoMetadata";
import {
  FaCheckCircle,
  FaFlask,
  FaMicrochip,
  FaRocket,
  FaShieldAlt,
  FaTools,
} from "react-icons/fa";

const SITE_URL = getSiteUrl();
const PAGE_URL = `${SITE_URL}/lab`;
const LAB_URL = "https://lab.teamcelular.com";

export const metadata: Metadata = buildWebsiteMetadata({
  path: "/lab",
  title: "TC Lab · Ensamble SMD/THT y Testing de Placas en Argentina | Team Celular",
  description:
    "TC Lab, división de Team Celular en Recoleta. Ensamble SMD/THT y testing de placas para prototipos y series cortas en Argentina. Startups y pymes.",
  keywords: [
    "ensamble SMD Argentina",
    "ensamble electronico prototipos Buenos Aires",
    "testing PCB Argentina",
    "manufactura electronica startup argentina",
    "ensamble THT CABA",
    "prototipo electronico argentina",
    "servicio ensamble placas argentina",
    "testing funcional PCB recoleta",
  ],
  robots: { index: true, follow: true },
  languages: { "es-AR": "/lab" },
  openGraphTitle: "TC Lab · Ensamble SMD/THT y Testing de Placas en Argentina",
  openGraphDescription:
    "TC Lab, división de Team Celular, Paraguay 2451 Recoleta. Ensamble SMD/THT y testing funcional de placas para startups y pymes en Argentina.",
  openGraphImageAlt: "TC Lab — Ensamble electrónico y testing de placas en Argentina",
  twitterTitle: "TC Lab · Ensamble SMD/THT y Testing de Placas | Team Celular",
  twitterDescription:
    "TC Lab, Recoleta CABA. Ensamble SMD/THT y testing funcional de PCB para prototipos y series cortas. Startups y empresas en Argentina.",
});

const services = [
  {
    Icon: FaMicrochip,
    title: "Ensamble SMD",
    description:
      "Colocación y soldadura de componentes de montaje superficial. Trabajamos resistencias, capacitores, ICs y módulos en series cortas con control visual post-soldadura.",
  },
  {
    Icon: FaTools,
    title: "Ensamble THT",
    description:
      "Soldadura de componentes through-hole: conectores, transformadores, headers y componentes de potencia. Mixto SMD+THT en la misma placa según diseño.",
  },
  {
    Icon: FaFlask,
    title: "Testing funcional",
    description:
      "Verificación eléctrica y funcional de placas terminadas. Medición de tensiones, corrientes, señales y validación de comunicaciones (I2C, SPI, UART, USB).",
  },
  {
    Icon: FaShieldAlt,
    title: "Diagnóstico de placa",
    description:
      "Análisis de fallas en PCBs que no funcionan. Medición con instrumental de laboratorio, identificación de componentes dañados y reporte técnico detallado.",
  },
];

const targets = [
  {
    label: "Startups de hardware",
    detail: "Pasás de esquemático a placa ensamblada sin tener que importar un lote mínimo de China.",
  },
  {
    label: "Equipos de I+D en empresas",
    detail: "Validación rápida de PCBs de desarrollo sin pasar por producción interna ni esperar semanas.",
  },
  {
    label: "Pymes con producto electrónico",
    detail: "Series cortas de 5 a 100 unidades para lanzar, probar mercado o abastecer demanda inicial.",
  },
  {
    label: "Docentes y laboratorios universitarios",
    detail: "Ensamble de placas de prácticas, prototipos académicos y kits educativos a escala real.",
  },
];

const faqs = [
  {
    q: "¿Cuántas unidades mínimas trabajan?",
    a: "Desde 1 unidad. No hay mínimo de serie. Para volúmenes mayores a 50 unidades, consultá por precio diferenciado.",
  },
  {
    q: "¿Necesito mandarles los componentes o los consiguen ustedes?",
    a: "Podés mandar los componentes ya kiteados con la placa, o consultarnos por provisión de componentes estándar. Para partes específicas o importadas, el cliente los provee.",
  },
  {
    q: "¿Trabajan con diseños propios o necesitan mis archivos Gerber?",
    a: "Trabajamos con placas ya fabricadas que te entregamos ensambladas. Necesitás los archivos de diseño (BOM y pick-and-place) para el ensamble automático, o podemos hacerlo manual para series muy cortas.",
  },
  {
    q: "¿Qué pasa si una placa falla el testing?",
    a: "Emitimos un informe técnico con la falla identificada. Si el error está en el ensamble (soldadura, componente invertido), lo corregimos sin costo. Si es de diseño, te lo comunicamos con el diagnóstico.",
  },
  {
    q: "¿Están en Buenos Aires o trabajan de forma remota?",
    a: "Laboratorio físico en Paraguay 2451, Recoleta, CABA. Recibimos envíos de todo el país y coordinamos por WhatsApp.",
  },
  {
    q: "¿Cuánto tarda un lote de prototipos?",
    a: "Depende de cantidad y complejidad. Un prototipo simple de 1 a 3 placas: 3 a 5 días hábiles. Lotes de 10 a 50 unidades: 1 a 2 semanas. Confirmamos plazo real al recibir el diseño.",
  },
];

const stats = [
  { value: "10+", label: "años en microelectrónica" },
  { value: "SMD/THT", label: "ensamble mixto en una placa" },
  { value: "1+", label: "unidad mínima de serie" },
  { value: "CABA", label: "laboratorio físico, Recoleta" },
];

export default function LabPage() {
  const whatsappUrl = `https://wa.me/5491151034595?text=${encodeURIComponent(
    "Hola TC Lab, quiero consultar un proyecto de ensamble o testing. Descripción:"
  )}`;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${PAGE_URL}#service`,
    name: "Ensamble SMD/THT y testing de placas electrónicas en Argentina",
    serviceType: "Ensamble electrónico y testing de PCB",
    url: LAB_URL,
    areaServed: [
      { "@type": "Country", name: "Argentina" },
      { "@type": "City", name: "Buenos Aires" },
    ],
    provider: { "@id": `${SITE_URL}#localbusiness` },
    offers: {
      "@type": "Offer",
      priceCurrency: "ARS",
      availability: "https://schema.org/InStock",
      url: `${LAB_URL}/presupuesto`,
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section className="w-full max-w-6xl px-6 py-14 md:px-8">
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: `${SITE_URL}/` },
          { name: "TC Lab", url: PAGE_URL },
        ]}
      />

      {/* HERO */}
      <header className="rounded-3xl border border-white/15 bg-white/5 p-10 shadow-xl backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30 md:p-14">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/70 bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
            <FaFlask />
            División electrónica
          </span>
          <span className="rounded-full border border-emerald-700/80 bg-emerald-700 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white">
            Recoleta · CABA · Argentina
          </span>
        </div>

        <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900 dark:text-white md:text-5xl">
          Ensamble SMD/THT y testing de placas para proyectos en Argentina
        </h1>
        <p className="mt-5 max-w-4xl text-lg leading-relaxed text-slate-700 dark:text-slate-300">
          TC Lab, división de Team Celular en Paraguay 2451 Recoleta CABA, ensambla
          placas electrónicas SMD y THT y realiza testing funcional para prototipos
          y series cortas. Trabajamos con startups, pymes y equipos de I+D en Argentina
          — sin mínimos de producción industrial ni esperas de importación.
        </p>

        {/* stat row */}
        <div className="mt-8 flex flex-wrap gap-8 border-y border-white/15 py-6 dark:border-white/10">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-black text-primary">{s.value}</p>
              <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={LAB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-primary px-8 py-4 text-base font-bold text-white shadow-lg transition hover:bg-primary/90 hover:shadow-xl"
          >
            Ir a TC Lab →
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-emerald-700 bg-emerald-700 px-8 py-4 text-base font-bold text-white transition hover:bg-emerald-800"
          >
            WhatsApp directo
          </a>
        </div>
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
          TC Lab es una división de{" "}
          <Link href="/" className="font-semibold text-primary hover:underline">
            Team Celular
          </Link>
          . El laboratorio de electrónica de consumo y el de prototipos industriales
          comparten instalaciones, instrumental y criterio técnico.
        </p>
      </header>

      {/* VISUAL + COPY */}
      <section className="mt-10 grid gap-6 rounded-3xl border border-white/15 bg-white/5 p-6 shadow-xl backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30 md:grid-cols-[1.15fr_0.85fr] md:items-center md:p-8">
        <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-slate-900/40">
          <Image
            src="/images/micro_diagnos_fino.webp"
            alt="Ensamble y testing de PCB en laboratorio TC Lab, Recoleta CABA"
            width={1200}
            height={900}
            sizes="(max-width: 768px) 100vw, 60vw"
            className="h-auto w-full object-cover"
          />
        </div>
        <article className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Laboratorio real en Buenos Aires, no un intermediario
          </h2>
          <p className="text-slate-600 dark:text-slate-300">
            Ensamblamos con instrumental propio: estación de soldadura de aire caliente,
            microscopio de inspección y equipo de medición. Cada placa tiene inspección
            visual post-soldadura y reporte de testing antes de salir del laboratorio.
          </p>
          <p className="text-slate-600 dark:text-slate-300">
            No tercerizamos a China ni coordinamos producción remota. El trabajo lo hacemos
            acá, en Recoleta, con respuesta en días — no en semanas.
          </p>
          <a
            href={LAB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-white transition hover:bg-primary/90"
          >
            Ver TC Lab completo →
          </a>
        </article>
      </section>

      {/* SERVICIOS */}
      <section className="mt-10 rounded-3xl border border-white/15 bg-white/5 p-8 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Qué hacemos en TC Lab
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Ensamble y testing. Sin diseño de PCB por ahora — trabajamos con placas
          ya fabricadas que vos nos traés o enviás.
        </p>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {services.map((s) => {
            const Icon = s.Icon;
            return (
              <article
                key={s.title}
                className="flex gap-4 rounded-2xl border border-white/15 bg-white/70 p-5 dark:border-white/10 dark:bg-slate-900/45"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-lg text-primary">
                  <Icon aria-hidden />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {s.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* PARA QUIÉN */}
      <section className="mt-10 rounded-3xl border border-white/15 bg-white/5 p-8 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Para quién es TC Lab
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Cualquier equipo que necesite pasar de diseño a hardware físico sin
          un proveedor industrial detrás.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {targets.map((t) => (
            <div
              key={t.label}
              className="rounded-xl border border-white/10 bg-white/70 p-5 dark:border-white/5 dark:bg-slate-900/40"
            >
              <div className="flex items-center gap-2">
                <FaCheckCircle className="shrink-0 text-primary" />
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                  {t.label}
                </h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {t.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* VISUAL 2 */}
      <section className="mt-10 grid gap-6 rounded-3xl border border-white/15 bg-white/5 p-6 shadow-xl backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30 md:grid-cols-[0.85fr_1.15fr] md:items-center md:p-8">
        <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-slate-900/40 md:order-2">
          <Image
            src="/images/reparacion_placa.webp"
            alt="Diagnóstico y testing de placas electrónicas en TC Lab"
            width={1200}
            height={900}
            sizes="(max-width: 768px) 100vw, 55vw"
            className="h-auto w-full object-cover"
          />
        </div>
        <article className="space-y-4 md:order-1">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            ¿Tu placa no funciona y no sabés por qué?
          </h2>
          <p className="text-slate-600 dark:text-slate-300">
            Diagnosticamos PCBs que no pasan testing, tienen fallas intermitentes
            o llegaron mal del fabricante. Medimos tensiones, señales y corrientes
            con instrumental de laboratorio y emitimos informe técnico con la causa
            raíz identificada.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center rounded-full bg-emerald-700 px-5 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              Consultar por WhatsApp
            </a>
            <a
              href={LAB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center rounded-full border border-primary/40 px-5 text-sm font-semibold text-primary transition hover:bg-primary/10"
            >
              Ver TC Lab →
            </a>
          </div>
        </article>
      </section>

      {/* FAQ */}
      <section className="mt-10 rounded-3xl border border-white/15 bg-white/5 p-8 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Preguntas frecuentes
        </h2>
        <div className="mt-6 space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-xl border border-white/15 bg-white/70 p-4 dark:border-white/10 dark:bg-slate-900/45"
            >
              <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900 dark:text-white">
                {f.q}
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* RELACIÓN CON TEAM CELULAR */}
      <section className="mt-10 rounded-3xl border border-white/15 bg-white/5 p-8 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Por qué confiar en TC Lab
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          TC Lab nació de 10 años haciendo microelectrónica de precisión en el
          laboratorio de Team Celular: reballing BGA, reparación de placa lógica,
          recuperación de equipos con daño por líquidos y diagnóstico avanzado.
          El mismo instrumental, el mismo criterio técnico, aplicado a proyectos
          de producto electrónico en Argentina.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/guias/microelectronica-reballing-caba"
            className="rounded-full border border-white/15 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-primary/40 hover:text-primary dark:border-white/10 dark:bg-slate-900/45 dark:text-slate-200"
          >
            Guía: microelectrónica y reballing
          </Link>
          <Link
            href="/reparaciones/reparacion-placa-caba"
            className="rounded-full border border-white/15 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-primary/40 hover:text-primary dark:border-white/10 dark:bg-slate-900/45 dark:text-slate-200"
          >
            Servicio: reparación de placa CABA
          </Link>
          <Link
            href="/sobrenosotros"
            className="rounded-full border border-white/15 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-primary/40 hover:text-primary dark:border-white/10 dark:bg-slate-900/45 dark:text-slate-200"
          >
            Sobre Team Celular
          </Link>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="mt-10 rounded-3xl border border-white/15 bg-gradient-to-br from-primary/10 via-white/5 to-secondary/10 p-10 text-center backdrop-blur-2xl dark:border-white/10 dark:from-slate-900/45 dark:via-slate-900/30 dark:to-slate-900/45 md:p-14">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white">
          <FaRocket />
          TC Lab · lab.teamcelular.com
        </span>
        <h2 className="mt-5 text-3xl font-black text-slate-900 dark:text-white">
          Tenés un proyecto electrónico en Argentina. Hablemos.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-700 dark:text-slate-300">
          Contanos qué necesitás ensamblar o testear — cantidad, tipo de placa,
          componentes. Te respondemos con plazo y presupuesto concreto.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href={LAB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-primary px-8 py-4 text-base font-bold text-white shadow-lg transition hover:bg-primary/90"
          >
            Ir a TC Lab →
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-emerald-700 bg-emerald-700 px-8 py-4 text-base font-bold text-white transition hover:bg-emerald-800"
          >
            WhatsApp directo
          </a>
        </div>
        <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">
          Laboratorio físico en Paraguay 2451, Recoleta, CABA · Envíos de todo el país
        </p>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </section>
  );
}
