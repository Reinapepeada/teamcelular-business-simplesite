import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";
const PAGE_URL = `${SITE_URL}/arreglo-de-celulares`;

const services = [
  {
    title: "Pantalla / módulo display",
    description:
      "Vidrio roto, sin imagen, líneas, manchas o touch que no responde. Reemplazo con repuestos premium y prueba completa.",
  },
  {
    title: "Batería",
    description:
      "Se descarga rápido, se apaga, se calienta o tarda en cargar. Diagnóstico y cambio con garantía escrita.",
  },
  {
    title: "Pin / ficha de carga",
    description:
      "Falso contacto, no reconoce cargador o carga intermitente. Limpieza, reparación o reemplazo según el caso.",
  },
  {
    title: "Cámara, audio y sensores",
    description:
      "Cámara borrosa, micrófono bajo, parlante distorsionado o sensores con fallas. Reemplazo y calibración cuando corresponde.",
  },
  {
    title: "Placa (microelectrónica)",
    description:
      "No enciende, se reinicia, mojado, corto o fallas complejas. Laboratorio con microscopio y herramientas profesionales.",
  },
  {
    title: "Otros arreglos frecuentes",
    description:
      "Botón power/volumen, flex, tapa trasera, conectores, limpieza de humedad y diagnóstico de fallas raras.",
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
    q: "¿Hacen arreglo de celulares en el día?",
    a: "En muchos casos sí (pantalla, batería o pin de carga). Si el equipo requiere diagnóstico de placa o repuesto especial, te informamos tiempos estimados antes de avanzar.",
  },
  {
    q: "¿Dónde están ubicados?",
    a: "Estamos en Paraguay 2451, Recoleta (CABA). Atendemos de lunes a viernes de 10:30 a 18:00 hs. Podés ver el mapa y cómo llegar en la página de contacto.",
  },
  {
    q: "¿Qué garantía tiene el arreglo?",
    a: "Entregamos garantía por escrito. El plazo depende del tipo de reparación y del repuesto utilizado; te lo detallamos en el presupuesto.",
  },
  {
    q: "¿Trabajan iPhone y Samsung?",
    a: "Sí. También trabajamos Motorola, Xiaomi y otras marcas. Si tu modelo es poco común, te confirmamos disponibilidad de repuesto al momento de cotizar.",
  },
  {
    q: "¿Cuánto cuesta un arreglo de celular?",
    a: "Depende de la marca, el modelo y la falla. Podés pedir un presupuesto por WhatsApp o por el formulario y te respondemos con opciones y tiempos estimados.",
  },
  {
    q: "¿Cómo pido presupuesto rápido?",
    a: "Podés ir directo al formulario o escribirnos por WhatsApp con la marca, el modelo y una descripción (si podés, sumá fotos).",
  },
];

export const metadata: Metadata = {
  title: "Arreglo de Celulares en Recoleta (CABA) | iPhone y Samsung | Team Celular",
  description:
    "Arreglo de celulares en Recoleta, CABA. Pantalla, batería, pin de carga, cámaras, audio y reparaciones de placa (microelectrónica) con garantía escrita. Presupuesto rápido por WhatsApp o formulario.",
  keywords: [
    "arreglo de celulares recoleta",
    "reparación de celulares recoleta",
    "arreglo celular caba",
    "cambio pantalla celular recoleta",
    "cambio batería celular recoleta",
    "servicio técnico celulares recoleta",
    "microelectrónica celulares caba",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Arreglo de Celulares en Recoleta (CABA) | Team Celular",
    description:
      "Arreglo y reparación de celulares en Recoleta, CABA con garantía por escrito. Pantalla, batería, carga y placa.",
    url: PAGE_URL,
    type: "website",
    locale: "es_AR",
    images: [
      {
        url: `${SITE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Team Celular - Arreglo de celulares en Recoleta (CABA)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arreglo de Celulares en Recoleta (CABA) | Team Celular",
    description:
      "Arreglo de celulares con garantía escrita. Presupuesto rápido por WhatsApp o formulario.",
    images: [`${SITE_URL}/opengraph-image.png`],
  },
};

export default function ArregloDeCelularesPage() {
  const whatsappUrl = `https://wa.me/5491151034595?text=${encodeURIComponent(
    "Hola! Quiero un presupuesto para arreglo de celular en Recoleta (CABA). Marca y modelo:"
  )}`;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${PAGE_URL}#service`,
    name: "Arreglo de celulares en Recoleta (CABA)",
    serviceType: "Reparación de celulares",
    description:
      "Arreglo y reparación de celulares en Recoleta (CABA). Pantalla, batería, pin de carga, cámaras, audio y reparaciones de placa con garantía escrita.",
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
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
          Arreglo de celulares en Recoleta, CABA (con garantía)
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          Taller en <strong>Recoleta</strong>, con atención para toda{" "}
          <strong>CABA</strong>. Reparaciones frecuentes (pantalla, batería y
          carga) y soluciones avanzadas de <strong>microelectrónica</strong> para
          fallas complejas de placa.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/presupuesto-reparacion#solicitar-presupuesto"
            className="rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:shadow-xl"
          >
            Pedir presupuesto
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-primary/40 px-8 py-4 text-base font-semibold text-primary transition hover:bg-primary/10 dark:border-primary/60 dark:text-primary/80"
          >
            WhatsApp directo
          </a>
          <Link
            href="/contacto"
            className="rounded-full border border-secondary/50 px-8 py-4 text-base font-semibold text-secondary transition hover:bg-secondary/10"
          >
            Ver ubicación
          </Link>
        </div>
      </header>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Presupuesto rápido",
            desc: "Te respondemos con opciones y tiempos estimados. Si hace falta diagnóstico de taller, te lo explicamos antes.",
          },
          {
            title: "Garantía por escrito",
            desc: "Respaldamos cada reparación. El plazo depende del trabajo y el repuesto, y queda detallado en el presupuesto.",
          },
          {
            title: "Recoleta / CABA",
            desc: "Estamos en Paraguay 2451. Si estás en Palermo, Belgrano, Caballito o el centro, llegás fácil.",
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

      <section className="mt-10 rounded-2xl border border-white/15 bg-white/5 p-8 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Qué arreglos hacemos
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Cubrimos la intención completa de “arreglo celulares”: desde fallas
          comunes hasta casos complejos. Si no estás seguro, pedí diagnóstico.
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
          Trabajamos con las marcas más comunes de Argentina. Si tu modelo es
          poco común, escribinos y te confirmamos repuesto/disponibilidad.
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
          Ubicación y horarios
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Paraguay 2451, Recoleta (CABA). Lunes a viernes de 10:30 a 18:00 hs.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            href="/contacto"
            className="rounded-full bg-secondary px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-secondary/90"
          >
            Ver mapa y cómo llegar
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
          Estamos en Recoleta y recibimos consultas y equipos de toda CABA. Si
          estás en alguno de estos barrios, mirá la página de tu zona:
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
              <h3 className="font-semibold text-primary">{faq.q}</h3>
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
