import type { Metadata } from "next";
import Link from "next/link";
import { FaShieldAlt, FaStopwatch, FaTools } from "react-icons/fa";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import TrackedCtaLink from "@/components/cro/TrackedCtaLink";
import { REVIEW_COST_MESSAGE, WARRANTY_SCOPE_MESSAGE } from "@/lib/copyStandards";
import { buildWebsiteMetadata, getSiteUrl } from "@/lib/seoMetadata";

const SITE_URL = getSiteUrl();

const REPAIR_SERVICES = [
  {
    title: "Cambio de batería",
    description:
      "Se descarga al mediodía, se apaga con 20% o está hinchada. En la mayoría de los modelos sale en el día.",
    href: "/reparaciones/cambio-bateria-caba",
  },
  {
    title: "Cambio de pantalla",
    description:
      "Vidrio astillado, líneas, manchas o touch que no responde. Cambiamos el módulo completo, nunca solo el vidrio.",
    href: "/reparaciones/cambio-pantalla-caba",
  },
  {
    title: "Pin de carga",
    description:
      "Carga solo si movés el cable, carga lento o no reconoce el cargador. Primero vemos si es el pin o la placa.",
    href: "/reparaciones/cambio-pin-carga-caba",
  },
  {
    title: "Cámara frontal o trasera",
    description:
      "Fotos borrosas, no enfoca, vibra o queda en negro. Cambiamos el módulo o el vidrio del lente.",
    href: "/reparaciones/cambio-camara-caba",
  },
  {
    title: "Micrófono y parlante",
    description:
      "No te escuchan en las llamadas, el audio sale bajo o con ruido. Suele ser flex, módulo o suciedad en la rejilla.",
    href: "/reparaciones/reparacion-audio-celular-caba",
  },
  {
    title: "Celular mojado",
    description:
      "Se cayó al agua o le entró humedad. No lo cargues: traelo apagado y lo abrimos para frenar la corrosión.",
    href: "/reparaciones/recuperacion-celular-mojado-caba",
  },
  {
    title: "Placa y microelectrónica",
    description:
      "No prende, se reinicia solo o quedó en loop. Trabajo bajo microscopio, incluido reballing de chips.",
    href: "/reparaciones/reparacion-placa-caba",
  },
  {
    title: "Flex y botones",
    description:
      "Botón de encendido o volumen que no responde, flex de carga cortado. Diagnóstico y cambio del flex.",
    href: "/reparaciones/cambio-flex-caba",
  },
  {
    title: "Tapa trasera",
    description:
      "Tapa de vidrio rota o levantada. Si se levantó sola, revisamos la batería antes de cerrar.",
    href: "/reparaciones/cambio-tapa-caba",
  },
];

const ROUTE_SELECTOR = [
  {
    title: "No sé bien qué tiene",
    description:
      "Contanos qué hace el equipo (o qué dejó de hacer) y te decimos si hace falta revisarlo antes de pasarte un precio.",
    href: "/presupuesto-reparacion#solicitar-presupuesto",
    cta: "Contar qué le pasa",
  },
  {
    title: "No prende o se mojó",
    description:
      "Humedad, reinicios o equipos que no encienden van directo a laboratorio. También hacemos segunda opinión si ya te dijeron que no tiene arreglo.",
    href: "/reparaciones/reparacion-placa-caba",
    cta: "Ver reparación de placa",
  },
  {
    title: "Ya sé qué necesito",
    description:
      "Si tenés marca, modelo y falla, pedí el precio por formulario o WhatsApp y te respondemos en hasta 2 horas hábiles.",
    href: "/presupuesto-reparacion#solicitar-presupuesto",
    cta: "Pedir presupuesto",
  },
];

export const metadata: Metadata = buildWebsiteMetadata({
  path: "/reparaciones",
  title: "Reparaciones de Celular por Tipo de Falla en CABA",
  description:
    "Pantalla, batería, pin de carga, cámara, audio, mojado y placa. Qué incluye cada reparación, cuánto tarda y garantía escrita de 90 días en CABA.",
  robots: {
    index: true,
    follow: true,
  },
  languages: {
    "es-AR": "/reparaciones",
  },
  openGraphTitle: "Reparaciones por Tipo de Falla en CABA | Team Celular",
  openGraphDescription:
    "Buscá la falla de tu celular y mirá qué incluye la reparación, cuánto tarda y cómo pedir precio.",
  openGraphImageAlt: "Team Celular - Reparaciones en CABA",
  twitterTitle: "Reparaciones por Tipo de Falla en CABA | Team Celular",
  twitterDescription:
    "Pantalla, batería, carga, cámara, audio, mojado y placa. Garantía escrita de 90 días.",
});

export default function ReparacionesPage() {
  const whatsappUrl =
    "https://wa.me/5491151034595?text=Hola%21%20Quiero%20pedir%20un%20presupuesto%20de%20reparaci%C3%B3n.";

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
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Reparaciones por tipo de falla en CABA
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-100/90">
            Team Celular tiene dos talleres en CABA: <strong>Recoleta (Paraguay 2451)</strong> y <strong>Belgrano (Amenábar 2032)</strong>. iPhone,
            Samsung, Motorola, Xiaomi y más marcas con diagnóstico técnico y garantía
            escrita de 90 días sobre trabajo y repuesto.
          </p>
          <p className="mt-3 text-sm text-slate-200/90">
            Si buscás el servicio general, entrá por{" "}
            <Link href="/" className="font-semibold underline underline-offset-4">
              reparación de celulares en CABA
            </Link>
            . Si necesitás segunda opinión o placa compleja, te conviene{" "}
            <Link href="/reparaciones/reparacion-placa-caba" className="font-semibold underline underline-offset-4">
              reparación de placa
            </Link>
            .
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/presupuesto-reparacion#solicitar-presupuesto"
              className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Pedir presupuesto
            </Link>
            <TrackedCtaLink
              href={whatsappUrl}
              ctaName="reparaciones_hero_whatsapp"
              ctaLocation="reparaciones_hero"
              ctaVariant="whatsapp"
              external
              target="_blank"
              className="rounded-full border border-white/35 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              WhatsApp directo
            </TrackedCtaLink>
            <Link
              href="/sucursales"
              className="rounded-full border border-white/35 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Ver sucursales
            </Link>
          </div>
        </div>
      </header>

      <section className="mt-10 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white dark:divide-slate-700/60 dark:border-slate-700/60 dark:bg-slate-900">
        <div className="flex items-start gap-3 p-5">
          <FaTools className="mt-1 shrink-0 text-primary" />
          <p className="text-slate-700 dark:text-slate-300">
            <strong className="text-slate-900 dark:text-white">Primero confirmamos la falla.</strong>{" "}
            Un celular que no carga puede ser el pin, el flex o la placa; no te
            cobramos un repuesto que no hacía falta.
          </p>
        </div>
        <div className="flex items-start gap-3 p-5">
          <FaStopwatch className="mt-1 shrink-0 text-primary" />
          <p className="text-slate-700 dark:text-slate-300">
            <strong className="text-slate-900 dark:text-white">¿Cuánto sale revisarlo?</strong>{" "}
            {REVIEW_COST_MESSAGE}
          </p>
        </div>
        <div className="flex items-start gap-3 p-5">
          <FaShieldAlt className="mt-1 shrink-0 text-primary" />
          <p className="text-slate-700 dark:text-slate-300">
            <strong className="text-slate-900 dark:text-white">Garantía por escrito.</strong>{" "}
            {WARRANTY_SCOPE_MESSAGE}
          </p>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-white/15 bg-white/5 p-8 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          ¿No encontrás tu falla en la lista?
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Pasa seguido: el celular hace algo raro y no sabés a qué servicio
          corresponde. Empezá por acá.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {ROUTE_SELECTOR.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-white/10 bg-white/10 p-5 dark:border-white/5 dark:bg-slate-900/40"
            >
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {item.description}
              </p>
              <Link
                href={item.href}
                className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-primary underline-offset-4 hover:underline"
              >
                {item.cta}
              </Link>
            </article>
          ))}
        </div>
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
          ¿Lo querés tener arreglado hoy?
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Mandanos marca, modelo y qué le pasa. Pantalla y batería suelen salir
          en 2 a 4 horas si el repuesto está en stock.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link
            href="/presupuesto-reparacion#solicitar-presupuesto"
            className="rounded-full bg-secondary px-8 py-4 font-semibold text-white shadow-lg transition hover:bg-secondary/90"
          >
            Ir al formulario
          </Link>
          <TrackedCtaLink
            href={whatsappUrl}
            ctaName="reparaciones_bottom_whatsapp"
            ctaLocation="reparaciones_bottom"
            ctaVariant="whatsapp"
            external
            target="_blank"
            className="rounded-full border border-secondary px-8 py-4 font-semibold text-secondary transition hover:bg-secondary/10"
          >
            WhatsApp directo
          </TrackedCtaLink>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": `${SITE_URL}/reparaciones#collection`,
            name: "Reparaciones de celulares en CABA",
            url: `${SITE_URL}/reparaciones`,
            about: "Reparación de celulares en Ciudad Autónoma de Buenos Aires",
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
