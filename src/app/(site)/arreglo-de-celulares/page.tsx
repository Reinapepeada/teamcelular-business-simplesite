import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import TrackedCtaLink from "@/components/cro/TrackedCtaLink";
import { REVIEW_COST_MESSAGE, WARRANTY_SCOPE_MESSAGE } from "@/lib/copyStandards";
import { buildWebsiteMetadata, getSiteUrl } from "@/lib/seoMetadata";

const SITE_URL = getSiteUrl();
const PAGE_URL = `${SITE_URL}/arreglo-de-celulares`;

const services = [
  {
    title: "Pantalla / mÃ³dulo display",
    description:
      "Vidrio roto, sin imagen, lÃ­neas, manchas o touch que no responde. Reemplazo con repuestos premium y prueba completa.",
  },
  {
    title: "BaterÃ­a",
    description:
      "Se descarga rÃ¡pido, se apaga, se calienta o tarda en cargar. DiagnÃ³stico y cambio con garantÃ­a escrita.",
  },
  {
    title: "Pin / ficha de carga",
    description:
      "Falso contacto, no reconoce cargador o carga intermitente. Limpieza, reparaciÃ³n o reemplazo segÃºn el caso.",
  },
  {
    title: "CÃ¡mara, audio y sensores",
    description:
      "CÃ¡mara borrosa, micrÃ³fono bajo, parlante distorsionado o sensores con fallas. Reemplazo y calibraciÃ³n cuando corresponde.",
  },
  {
    title: "Placa (microelectrÃ³nica)",
    description:
      "No enciende, se reinicia, mojado, corto o fallas complejas. Laboratorio con microscopio y herramientas profesionales.",
  },
  {
    title: "Otros arreglos frecuentes",
    description:
      "BotÃ³n power/volumen, flex, tapa trasera, conectores, limpieza de humedad y diagnÃ³stico de fallas raras.",
  },
];

const brands = ["iPhone", "Samsung", "Motorola", "Xiaomi", "Huawei", "LG", "OnePlus", "Google Pixel"];

const zones = [
  { name: "Recoleta", href: "/zonas/recoleta" },
  { name: "Palermo", href: "/zonas/palermo" },
  { name: "Belgrano", href: "/zonas/belgrano" },
  { name: "Caballito", href: "/zonas/caballito" },
  { name: "Almagro", href: "/zonas/almagro" },
  { name: "Balvanera / Once", href: "/zonas/balvanera" },
  { name: "Microcentro", href: "/zonas/microcentro" },
];

const faqs = [
  {
    q: "Â¿Sirve esta pÃ¡gina si todavÃ­a no sÃ© la falla exacta?",
    a: "SÃ­. Esta landing estÃ¡ pensada para consultas generales. Con marca, modelo y sÃ­ntomas te orientamos rÃ¡pido sobre el siguiente paso.",
  },
  {
    q: "Â¿QuÃ© arreglos suelen resolverse en el dÃ­a?",
    a: "Pantalla, baterÃ­a y pin de carga suelen salir en el dÃ­a segÃºn stock y estado del equipo. Siempre confirmamos tiempo real antes de abrirlo.",
  },
  {
    q: "Â¿CuÃ¡ndo conviene ir a la pÃ¡gina de tÃ©cnico de celulares?",
    a: "Si tenÃ©s reinicios, equipo mojado, falla de placa o querÃ©s segunda opiniÃ³n tÃ©cnica, conviene revisar la landing de tÃ©cnico especialista para casos complejos.",
  },
  {
    q: "Â¿DÃ³nde estÃ¡n ubicados?",
    a: "Tenemos dos sucursales en CABA: Recoleta (Paraguay 2451) y Belgrano (Amenábar 2032). Atendemos de lunes a viernes de 10:30 a 18:00 hs.",
  },
  {
    q: "Â¿QuÃ© garantÃ­a tiene el arreglo?",
    a: "Entregamos garantÃ­a escrita de 90 dÃ­as sobre trabajo y repuesto instalado. El alcance exacto se detalla en el presupuesto antes de avanzar.",
  },
  {
    q: "Â¿CÃ³mo pido presupuesto rÃ¡pido?",
    a: "PodÃ©s ir directo al formulario o escribirnos por WhatsApp con la marca, el modelo y una descripciÃ³n (si podÃ©s, sumÃ¡ fotos).",
  },
];

export const metadata: Metadata = buildWebsiteMetadata({
  path: "/arreglo-de-celulares",
  title: "Arreglo de Celulares en Recoleta | Fallas Frecuentes | Team Celular",
  description:
    "Arreglo de celulares en Recoleta, Paraguay 2451 CABA â€” Team Celular. Pantalla, baterÃ­a y carga en el dÃ­a, garantÃ­a escrita 90 dÃ­as. ConsultÃ¡ sin turno.",
  keywords: [
    "arreglo de celulares recoleta",
    "arreglo de celular rapido caba",
    "reparaciÃ³n de celulares recoleta",
    "arreglo celular caba",
    "cambio pantalla celular recoleta",
    "cambio baterÃ­a celular recoleta",
    "servicio tÃ©cnico celulares recoleta",
    "microelectrÃ³nica celulares caba",
  ],
  robots: {
    index: true,
    follow: true,
  },
  languages: {
    "es-AR": "/arreglo-de-celulares",
  },
  openGraphTitle: "Arreglo de Celulares en Recoleta (CABA) | Team Celular",
  openGraphDescription:
    "Team Celular, Paraguay 2451 Recoleta CABA. Arreglo de celulares para fallas frecuentes: pantalla, baterÃ­a y carga con garantÃ­a escrita 90 dÃ­as.",
  openGraphImageAlt: "Team Celular - Arreglo de celulares en Recoleta (CABA)",
  twitterTitle: "Arreglo de Celulares en Recoleta (CABA) | Team Celular",
  twitterDescription:
    "Team Celular, Paraguay 2451 Recoleta. Arreglo de celulares con garantÃ­a escrita 90 dÃ­as. WhatsApp o formulario.",
});

export default function ArregloDeCelularesPage() {
  const whatsappUrl = `https://wa.me/5491151034595?text=${encodeURIComponent(
    "Hola! Quiero un presupuesto para arreglo de celular en Recoleta (CABA). Marca y modelo:"
  )}`;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${PAGE_URL}#service`,
    name: "Arreglo de celulares en Recoleta (CABA)",
    serviceType: "ReparaciÃ³n de celulares",
    description:
      "Arreglo y reparaciÃ³n de celulares en Recoleta (CABA). Pantalla, baterÃ­a, pin de carga, cÃ¡maras, audio y reparaciones de placa con garantÃ­a escrita.",
    areaServed: [
      { "@type": "City", name: "Recoleta" },
      { "@type": "City", name: "CABA" },
      { "@type": "City", name: "Buenos Aires" },
    ],
    provider: { "@id": `${SITE_URL}#localbusiness` },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/presupuesto-reparacion`,
      priceCurrency: "ARS",
      availability: "https://schema.org/InStock",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <section className="w-full max-w-6xl px-6 py-14 md:px-8">
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: `${SITE_URL}/` },
          { name: "Arreglo de celulares", url: PAGE_URL },
        ]}
      />

      <header className="rounded-2xl border border-white/15 bg-white/5 p-10 text-center shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30 md:p-12">
        <span className="inline-flex rounded-full bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
          Servicio general por falla cotidiana
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
          Arreglo de celulares en CABA para resolver fallas cotidianas
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          Team Celular tiene dos sucursales en CABA: <strong>Recoleta (Paraguay 2451)</strong> y <strong>Belgrano (Amenábar 2032)</strong>. DiagnÃ³stico el mismo dÃ­a, presupuesto claro antes de
          arrancar y garantÃ­a escrita de <strong>90 dÃ­as</strong> sobre trabajo
          y repuesto. Pantalla, baterÃ­a y pin de carga suelen salir en el dÃ­a.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <TrackedCtaLink
            href="/presupuesto-reparacion#solicitar-presupuesto"
            ctaName="arreglo_hero_budget"
            ctaLocation="arreglo_hero"
            ctaVariant="primary"
            className="rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-primary/90 hover:shadow-xl"
          >
            Pedir presupuesto
          </TrackedCtaLink>
          <TrackedCtaLink
            href={whatsappUrl}
            ctaName="arreglo_hero_whatsapp"
            ctaLocation="arreglo_hero"
            ctaVariant="whatsapp"
            external
            target="_blank"
            className="rounded-full border border-emerald-700 bg-emerald-700 px-8 py-4 text-base font-semibold text-white transition hover:bg-emerald-800"
          >
            WhatsApp directo
          </TrackedCtaLink>
        </div>
        <p className="mt-5 text-sm text-slate-600 dark:text-slate-300">
          Si ya sabes la falla exacta y queres ver el catalogo por servicio,
          entra en{" "}
          <Link href="/reparaciones" className="font-semibold text-primary underline-offset-4 hover:underline">
            Reparaciones en CABA
          </Link>
          . Si necesitÃ¡s un enfoque mÃ¡s tÃ©cnico para fallas complejas de placa,
          revisÃ¡{" "}
          <Link href="/tecnico-de-celulares" className="font-semibold text-primary underline-offset-4 hover:underline">
            TÃ©cnico de celulares en Recoleta
          </Link>
          .
        </p>
      </header>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Presupuesto rÃ¡pido",
            desc: "Te respondemos con opciones y tiempos estimados. Si hace falta diagnÃ³stico de taller, te lo explicamos antes.",
          },
          {
            title: "GarantÃ­a por escrito",
            desc: WARRANTY_SCOPE_MESSAGE,
          },
          {
            title: "Recoleta y Belgrano",
            desc: "Dos sucursales en CABA: Paraguay 2451 Recoleta y Amenábar 2032 Belgrano. Lunâ€“Vie 10:30â€“18:00.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-white/15 bg-white/5 p-6 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/30"
          >
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              {item.title}
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              {item.desc}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-8 rounded-2xl border border-white/15 bg-white/5 p-6 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          Â¿Tu caso parece mÃ¡s complejo?
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Si el equipo no enciende, se reinicia solo o tuvo humedad, te conviene
          pasar a la landing de tÃ©cnico especialista para una evaluaciÃ³n mÃ¡s profunda.
        </p>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          {REVIEW_COST_MESSAGE}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <TrackedCtaLink
            href="/reparaciones"
            ctaName="arreglo_route_reparaciones"
            ctaLocation="arreglo_complex_case"
            ctaVariant="secondary"
            className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary dark:border-slate-600 dark:text-slate-200"
          >
            Ver servicios por falla
          </TrackedCtaLink>
          <TrackedCtaLink
            href="/tecnico-de-celulares"
            ctaName="arreglo_complex_case_tecnico"
            ctaLocation="arreglo_complex_case"
            ctaVariant="secondary"
            className="rounded-full border border-primary/40 px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/10"
          >
            Ver tÃ©cnico especialista
          </TrackedCtaLink>
          <TrackedCtaLink
            href="/reparaciones/reparacion-placa-caba"
            ctaName="arreglo_complex_case_board"
            ctaLocation="arreglo_complex_case"
            ctaVariant="secondary"
            className="rounded-full border border-primary/40 px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/10"
          >
            ReparaciÃ³n de placa en CABA
          </TrackedCtaLink>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-white/15 bg-white/5 p-8 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          QuÃ© arreglos hacemos
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Cubrimos la intenciÃ³n completa de â€œarreglo celularesâ€: desde fallas
          comunes hasta casos complejos. Si no estÃ¡s seguro, pedÃ­ diagnÃ³stico.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-xl border border-white/10 bg-white/10 p-6 text-sm leading-relaxed text-slate-700 dark:border-white/5 dark:bg-slate-900/40 dark:text-slate-300"
            >
              <h3 className="text-lg font-semibold text-primary">
                {service.title}
              </h3>
              <p className="mt-2">{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-white/15 bg-white/5 p-8 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Marcas que trabajamos
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Trabajamos con las marcas mÃ¡s comunes de Argentina. Si tu modelo es
          poco comÃºn, escribinos y te confirmamos repuesto/disponibilidad.
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {brands.map((brand) => (
            <li
              key={brand}
              className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-slate-700 dark:border-white/10 dark:bg-slate-900/40 dark:text-slate-200"
            >
              {brand}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 rounded-2xl border border-white/15 bg-white/5 p-8 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          UbicaciÃ³n y horarios
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Recoleta: Paraguay 2451, CABA â€” Belgrano: Amenábar 2032, CABA. Lunes a viernes 10:30â€“18:00.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            href="/contacto"
            className="rounded-full bg-secondary px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-secondary/90"
          >
            Ver mapa y cÃ³mo llegar
          </Link>
          <a
            href="tel:+541151034595"
            className="rounded-full border border-secondary/50 px-6 py-3 font-semibold text-secondary transition hover:bg-secondary/10"
          >
            Llamar
          </a>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-white/15 bg-white/5 p-8 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Zonas que atendemos en CABA
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Dos sucursales en CABA: Recoleta (Paraguay 2451) y Belgrano (Amenábar 2032). Si
          estÃ¡s en alguno de estos barrios, mirÃ¡ la pÃ¡gina de tu zona:
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {zones.map((zone) => (
            <Link
              key={zone.href}
              href={zone.href}
              className="rounded-xl border border-white/10 bg-white/10 px-5 py-4 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/5 dark:bg-slate-900/40 dark:text-slate-200"
            >
              {zone.name}
            </Link>
          ))}
        </div>
        <div className="mt-6">
          <Link
            href="/zonas"
            className="inline-flex rounded-full border border-secondary/50 px-6 py-3 font-semibold text-secondary transition hover:bg-secondary/10"
          >
            Ver todas las zonas
          </Link>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-white/15 bg-white/5 p-8 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Preguntas frecuentes
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {faqs.map((faq) => (
            <article
              key={faq.q}
              className="rounded-xl border border-white/10 bg-white/10 p-5 text-sm leading-relaxed text-slate-700 dark:border-white/5 dark:bg-slate-900/40 dark:text-slate-300"
            >
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">{faq.q}</h3>
              <p className="mt-2">{faq.a}</p>
            </article>
          ))}
        </div>
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
