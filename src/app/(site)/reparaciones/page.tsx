import type { Metadata } from "next";
import Link from "next/link";
import { FaShieldAlt, FaStopwatch, FaTools } from "react-icons/fa";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import StickyLocalCta from "@/components/cro/StickyLocalCta";
import { buildWebsiteMetadata, getSiteUrl } from "@/lib/seoMetadata";

const SITE_URL = getSiteUrl();

const REPAIR_SERVICES = [
  {
    title: "Cambio de bateria",
    description:
      "Baterias originales o certificadas. Diagnostico y presupuesto rapido. Atencion en CABA.",
    href: "/reparaciones/cambio-bateria-caba",
  },
  {
    title: "Cambio de pantalla / modulo display",
    description:
      "Cambio de modulo completo (display + touch) con repuestos premium. CABA.",
    href: "/reparaciones/cambio-pantalla-caba",
  },
  {
    title: "Cambio de pin / ficha de carga",
    description:
      "Problemas de carga, falso contacto o no reconoce cargador. Atencion en CABA.",
    href: "/reparaciones/cambio-pin-carga-caba",
  },
  {
    title: "Cambio de camara (frontal / trasera)",
    description:
      "Camara borrosa, sin enfoque o en negro. Diagnostico y reemplazo en CABA.",
    href: "/reparaciones/cambio-camara-caba",
  },
  {
    title: "Reparacion de audio (microfono / parlante)",
    description:
      "No te escuchan en llamadas, audio bajo o distorsionado. Reparacion en CABA.",
    href: "/reparaciones/reparacion-audio-celular-caba",
  },
  {
    title: "Recuperacion de celular mojado",
    description:
      "Dano por liquidos, corrosion y fallas intermitentes. Servicio urgente con laboratorio.",
    href: "/reparaciones/recuperacion-celular-mojado-caba",
  },
  {
    title: "Reparacion de placa (microelectronica)",
    description:
      "Fallas complejas: no enciende, se reinicia, mojado o corto. Diagnostico de laboratorio.",
    href: "/reparaciones/reparacion-placa-caba",
  },
  {
    title: "Cambio de flex (carga / boton encendido)",
    description:
      "Flex de carga, boton power, volumen u otros flex. Diagnostico y reemplazo en CABA.",
    href: "/reparaciones/cambio-flex-caba",
  },
  {
    title: "Cambio de tapa trasera",
    description:
      "Tapa rota, levantada o marcada. Reemplazo con terminacion prolija en CABA.",
    href: "/reparaciones/cambio-tapa-caba",
  },
];

export const metadata: Metadata = buildWebsiteMetadata({
  path: "/reparaciones",
  title: "Reparaciones de Celulares en CABA | Presupuesto Rapido | Team Celular",
  description:
    "Reparaciones de celulares en CABA. Cambio de bateria, pantalla, pin de carga, camara, audio, recuperacion de mojado, flex, tapa trasera y reparacion de placa.",
  robots: {
    index: true,
    follow: true,
  },
  languages: {
    "es-AR": "/reparaciones",
  },
  openGraphTitle: "Reparaciones de Celulares en CABA | Team Celular",
  openGraphDescription:
    "Atencion en CABA. Presupuesto rapido para bateria, pantalla, pin de carga, camara, audio, equipos mojados, flex, tapa trasera y placa.",
  openGraphImageAlt: "Team Celular - Reparaciones en CABA",
  twitterTitle: "Reparaciones de Celulares en CABA | Team Celular",
  twitterDescription:
    "Atencion en CABA. Presupuesto rapido por WhatsApp o formulario.",
});

export default function ReparacionesPage() {
  const whatsappUrl =
    "https://wa.me/5491151034595?text=Hola%21%20Quiero%20pedir%20un%20presupuesto%20de%20reparacion%20en%20CABA.";

  return (
    <section className="w-full max-w-6xl px-6 py-14 pb-28 md:px-8 md:pb-20">
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: `${SITE_URL}/` },
          { name: "Reparaciones", url: `${SITE_URL}/reparaciones` },
        ]}
      />

      <header className="relative overflow-hidden rounded-3xl border border-white/15 bg-slate-900 p-8 text-white shadow-2xl md:p-12">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_14%_14%,rgba(14,165,233,0.32),transparent_40%),radial-gradient(circle_at_86%_86%,rgba(99,102,241,0.25),transparent_38%)]"
        />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="inline-flex rounded-full border border-white/35 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/90">
            Servicios de alto intento local
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Reparaciones de celulares en CABA
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-100/90">
            Taller en Recoleta con atencion para toda CABA. Trabajamos iPhone,
            Samsung, Motorola, Xiaomi y mas, con diagnostico tecnico y garantia
            por escrito.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/presupuesto-reparacion#solicitar-presupuesto"
              className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Pedir presupuesto
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/35 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              WhatsApp directo
            </a>
            <Link
              href="/sucursales/caba/recoleta"
              className="rounded-full border border-white/35 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Ver sucursal
            </Link>
          </div>
        </div>
      </header>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-white/15 bg-white/5 p-5 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/30">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
            <FaTools className="text-primary" />
            Diagnostico real
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Confirmamos la falla antes de presupuestar para evitar cambios innecesarios.
          </p>
        </article>
        <article className="rounded-2xl border border-white/15 bg-white/5 p-5 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/30">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
            <FaStopwatch className="text-primary" />
            Tiempos claros
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Te informamos plazos estimados segun modelo, stock y complejidad tecnica.
          </p>
        </article>
        <article className="rounded-2xl border border-white/15 bg-white/5 p-5 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/30">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
            <FaShieldAlt className="text-primary" />
            Garantia por escrito
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Cada reparacion incluye condiciones de cobertura explicadas de forma simple.
          </p>
        </article>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        {REPAIR_SERVICES.map((service) => (
          <Link
            key={service.href}
            href={service.href}
            className="group rounded-2xl border border-white/15 bg-white/5 p-8 shadow-lg backdrop-blur-2xl transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/30"
          >
            <h2 className="text-2xl font-semibold text-slate-900 transition group-hover:text-primary dark:text-white">
              {service.title}
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">{service.description}</p>
            <p className="mt-6 text-sm font-semibold text-primary">Ver servicio →</p>
          </Link>
        ))}
      </section>

      <section className="mt-10 rounded-2xl border border-white/15 bg-white/5 p-8 text-center shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Queres resolverlo hoy?
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Contanos marca, modelo y falla. Te respondemos rapido con opciones y
          tiempos estimados.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link
            href="/presupuesto-reparacion#solicitar-presupuesto"
            className="rounded-full bg-secondary px-8 py-4 font-semibold text-white shadow-lg transition hover:bg-secondary/90"
          >
            Ir al formulario
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-secondary px-8 py-4 font-semibold text-secondary transition hover:bg-secondary/10"
          >
            WhatsApp directo
          </a>
        </div>
      </section>

      <StickyLocalCta
        whatsappUrl={whatsappUrl}
        budgetHref="/presupuesto-reparacion#solicitar-presupuesto"
        phoneHref="tel:+541151034595"
        primaryLabel="Cotizar"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": `${SITE_URL}/reparaciones#collection`,
            name: "Reparaciones de celulares en CABA",
            url: `${SITE_URL}/reparaciones`,
            about: "Reparacion de celulares en Ciudad Autonoma de Buenos Aires",
            hasPart: REPAIR_SERVICES.map((s) => ({
              "@type": "WebPage",
              name: s.title,
              url: `${SITE_URL}${s.href}`,
            })),
          }),
        }}
      />
    </section>
  );
}
