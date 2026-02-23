import React from "react";
import BannerHome from "../components/banners/BannerHome";
import BannerCards from "@/components/cards/BannerCards";
import KnowledgeGrid from "@/components/cards/KnowledgeGrid";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";

export const metadata: Metadata = {
  title: "Reparacion de celulares en Buenos Aires | Team Celular",
  description:
    "Servicio tecnico especializado en reparacion de celulares y laptops en Recoleta, CABA. Diagnostico en el dia, garantia escrita y atencion por WhatsApp.",
  keywords: [
    "reparacion de celulares Buenos Aires",
    "servicio tecnico celulares CABA",
    "reparacion de laptops Buenos Aires",
    "gestion de reparaciones celulares y laptops",
    "servicio tecnico para empresas",
    "control y diagnostico de equipos",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: SITE_URL,
    siteName: "Team Celular",
    title: "Reparacion de celulares en Buenos Aires | Team Celular",
    description:
      "Diagnostico en el dia, repuestos de calidad y garantia escrita para celulares y laptops.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Team Celular - Servicio tecnico en Buenos Aires",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reparacion de celulares en Buenos Aires | Team Celular",
    description:
      "Servicio tecnico con garantia escrita y respuesta comercial en menos de 2 horas habiles.",
    images: [`${SITE_URL}/opengraph-image.png`],
  },
};

const GoogleReviewsAPI = dynamic(
  () => import("@/components/cards/GoogleReviewsAPI"),
  {
    loading: () => (
      <article className="rounded-2xl border border-slate-200/70 bg-white/70 p-8 text-center shadow-md dark:border-white/10 dark:bg-slate-900/50">
        <p className="text-base text-slate-600 dark:text-slate-300">
          Cargando reseñas de Google...
        </p>
      </article>
    ),
  },
);

const services = [
  {
    title: "Reparación el mismo día",
    description:
      "Pantalla rota, batería que no dura, puerto de carga que no funciona. La mayoría de reparaciones las resolvemos en el día.",
  },
  {
    title: "Problemas complicados de placa",
    description:
      "Celular mojado, que no enciende o con fallas raras. Tenemos microscopio y equipos especiales para reparaciones que otros talleres no pueden hacer.",
  },
  {
    title: "Para empresas y organizaciones",
    description:
      "¿Tenés varios equipos? Armamos un plan a medida con descuentos, prioridad en la entrega y facturación A.",
  },
];

const differentiators = [
  {
    title: "Garantía de verdad",
    description:
      "No es letra chica ni promesas. Te damos un papel firmado con 3 meses de garantía en todas las reparaciones.",
  },
  {
    title: "Presupuesto el mismo día",
    description:
      "Traé tu equipo a la mañana y antes de la tarde te decimos cuánto sale y cuánto tarda. Sin sorpresas.",
  },
  {
    title: "Como vos prefieras",
    description:
      "WhatsApp, llamada, mail o venís directo. Estamos en Recoleta y respondemos rápido por donde sea.",
  },
];

const faqs = [
  {
    question: "¿Arreglan todo tipo de celulares?",
    answer:
      "Sí. iPhone, Samsung, Motorola, Xiaomi y casi todas las marcas. Si tu modelo es muy raro, escribinos y te confirmamos en el momento si conseguimos el repuesto.",
  },
  {
    question: "¿Vienen a domicilio?",
    answer:
      "Por ahora no hacemos reparaciones a domicilio, pero podemos coordinar retiro y entrega dentro de CABA según disponibilidad.",
  },
  {
    question: "¿Cuánto tarda un presupuesto?",
    answer:
      "Si venís al taller, te lo damos en el momento. Si nos escribís por WhatsApp con fotos del problema, te respondemos el mismo día con un precio estimado.",
  },
];

const microFaqs = [
  {
    title: "Tiempos de respuesta",
    question: "¿Cuánto tardan en contestar un presupuesto online?",
    answer: "Respondemos formulario y WhatsApp en menos de 2 horas hábiles. Si el caso requiere diagnóstico físico, te agendamos el mismo día.",
  },
  {
    title: "Garantía real",
    question: "¿Qué cubre la garantía escrita?",
    answer: "Incluye mano de obra y repuesto por 90 días; si falla lo reparamos sin costo o te devolvemos el dinero del repuesto.",
  },
  {
    title: "Repuestos disponibles",
    question: "¿Tienen stock para iPhone y Android?",
    answer: "Tenemos pantallas, baterías y puertos de carga de las marcas más usadas; si falta algo lo importamos en 48 h.",
  },
];

const primaryCtaClass =
  "rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary";

const neutralCtaClass =
  "rounded-full border border-slate-300 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary dark:border-white/20 dark:bg-slate-900/60 dark:text-slate-100 dark:hover:bg-slate-900";

const brandOutlineCtaClass =
  "rounded-full border border-primary/45 bg-white/85 px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:border-primary/70 dark:bg-primary/20 dark:text-white dark:hover:bg-primary/30";

export default function Home() {
  return (
    <section className="flex w-full max-w-[100rem] flex-col items-center gap-16 px-6 py-14 transition md:px-8 2xl:px-10">
      <BannerHome />
      <BannerCards />

      <section className="w-full max-w-[100rem] space-y-12 text-center md:text-left lg:space-y-14">
        <article className="grid gap-10 rounded-2xl border border-slate-200/70 bg-white/70 p-8 shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl dark:border-white/10 dark:bg-slate-900/55 md:grid-cols-2 md:items-center lg:p-10">
          <div className="space-y-6 text-slate-800 dark:text-slate-200">
            <h2 className="text-3xl font-semibold tracking-tight text-primary md:text-[2.35rem]">
              ¿Por qué elegirnos?
            </h2>
            <p className="text-[1.03rem] leading-7 text-slate-700 dark:text-slate-300">
              Somos Team Celular, un taller familiar que se convirtió en referencia técnica en Buenos Aires. Trabajamos en Recoleta con repuestos originales y equipamiento profesional porque creemos que tu celular merece el mismo cuidado que le darías vos.
            </p>
            <p className="text-[1.03rem] leading-7 text-slate-700 dark:text-slate-300">
              Arreglamos desde celulares personales hasta equipos de empresas. Te damos presupuesto sin compromiso, explicamos todo en castellano claro y respaldamos cada trabajo con garantía por escrito.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/presupuesto-reparacion"
                className={primaryCtaClass}
              >
                Pedir presupuesto
              </Link>
              <Link
                href="/tecnico-de-celulares"
                className="rounded-full border border-secondary/60 bg-white/85 px-6 py-3 text-sm font-semibold text-slate-800 transition hover:bg-secondary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary dark:border-secondary/70 dark:bg-secondary/20 dark:text-white dark:hover:bg-secondary/30"
              >
                Técnico de celulares
              </Link>
              <Link
                href="https://wa.me/5491151034595?text=Hola%20Team%20Celular,%20necesito%20una%20reparaci%C3%B3n"
                className={brandOutlineCtaClass}
              >
                Escribinos por WhatsApp
              </Link>
            </div>
          </div>
          <div className="space-y-5 rounded-2xl border border-slate-200/80 bg-white/80 p-8 shadow-md dark:border-white/10 dark:bg-slate-900/45">
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Qué hacemos</h3>
            <ul className="space-y-4 text-left">
              {services.map((service) => (
                <li key={service.title} className="rounded-xl border border-slate-200/80 bg-white/90 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-slate-900/55">
                  <h4 className="text-lg font-semibold text-secondary dark:text-slate-100 md:text-xl">
                    {service.title}
                  </h4>
                  <p className="mt-2 text-slate-700 dark:text-slate-300">{service.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </article>

        <article className="grid gap-6 md:grid-cols-3">
          {differentiators.map((item, index) => (
            <div
              key={item.title}
              className="relative overflow-hidden rounded-2xl border border-slate-200/75 bg-white/75 p-6 text-center shadow-md transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-slate-900/50"
            >
              <div className={`pointer-events-none absolute inset-x-0 top-0 h-1 ${index % 2 === 0 ? "bg-gradient-to-r from-primary/70 to-secondary/50" : "bg-gradient-to-r from-secondary/70 to-primary/50"}`} />
              <h4 className="text-[1.15rem] font-semibold leading-snug text-primary dark:text-slate-100">
                {item.title}
              </h4>
              <p className="mt-3 text-slate-700 dark:text-slate-300">{item.description}</p>
            </div>
          ))}
        </article>

        <section className="grid gap-4 rounded-2xl border border-slate-200/70 bg-white/55 p-6 shadow-md dark:border-white/10 dark:bg-slate-900/35 md:grid-cols-3">
          {microFaqs.map((item) => (
            <article key={item.title} className="space-y-2.5 rounded-xl border border-slate-200/80 bg-white/85 p-4 text-left shadow-sm dark:border-white/10 dark:bg-slate-900/50">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary dark:text-sky-300">{item.title}</p>
              <h4 className="text-[1.03rem] font-semibold leading-snug text-slate-900 dark:text-white">{item.question}</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">{item.answer}</p>
            </article>
          ))}
        </section>

        <GoogleReviewsAPI />

        <article className="rounded-2xl border border-slate-200/70 bg-white/70 p-8 shadow-md transition-all duration-300 ease-in-out hover:shadow-xl dark:border-white/10 dark:bg-slate-900/50 lg:p-10">
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 md:text-left md:text-[2rem] dark:text-white">
            Dónde estamos y cómo contactarnos
          </h3>
          <div className="mt-6 grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <p className="text-[1.03rem] leading-7 text-slate-700 dark:text-slate-300">
                Nuestro taller está en Recoleta, a pocas cuadras de la facultad de Derecho. Si estás en Palermo, Belgrano, Caballito o el centro, llegás fácil. También coordinamos retiros en CABA.
              </p>
              <p className="text-[1.03rem] leading-7 text-slate-700 dark:text-slate-300">
                La dirección exacta es Paraguay 2451, Recoleta. Atendemos de lunes a viernes de 10:30 a 18hs. Mejor avisá antes de venir para estar seguros que tengamos lugar.
              </p>
            </div>
            <div className="space-y-4">
              <p className="font-semibold">
                Vías de contacto
              </p>
              <ul className="space-y-2 text-left text-muted-foreground">
                <li>
                  Tel: <Link href="tel:+541151034595" className="font-semibold text-primary transition hover:text-secondary dark:text-sky-300 dark:hover:text-sky-200">+54 11 5103-4595</Link>
                </li>
                <li>
                  Email: <Link href="mailto:teamcelular.arg@gmail.com" className="font-semibold text-primary transition hover:text-secondary dark:text-sky-300 dark:hover:text-sky-200">teamcelular.arg@gmail.com</Link>
                </li>
                <li>
                  Laboratorio: Paraguay 2451, Recoleta, CABA.
                </li>
                <li>
                  Horario: Lunes a Viernes de 10:30 a 18:00 hs.
                </li>
              </ul>
            </div>
          </div>
        </article>

        <article className="space-y-6">
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 md:text-left md:text-[2rem] dark:text-white">
            Preguntas frecuentes sobre reparación de celulares
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/75 bg-white/80 p-5 text-left shadow-md transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-slate-900/50 lg:p-6"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute inset-x-6 top-0 h-1 rounded-full bg-gradient-to-r from-primary to-secondary" />
                </div>
                <h4 className="text-[1.05rem] font-semibold leading-snug text-secondary dark:text-white">
                  {faq.question}
                </h4>
                <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </article>

  <KnowledgeGrid />

        <article className="relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/75 p-8 text-center shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl md:text-left dark:border-white/10 dark:bg-slate-900/55 lg:p-10">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-primary/8 via-white/70 to-secondary/8 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900" />
          <h3 className="text-2xl font-bold tracking-tight text-primary md:text-[2rem]">
            ¿Listo para recuperar tu teléfono?
          </h3>
          <p className="mt-4 text-[1.03rem] leading-7 text-slate-700 dark:text-slate-300">
            Dejanos un mensaje detallando la falla, elegí el canal que prefieras y reservá tu turno en minutos. Somos el servicio técnico de referencia en reparación de celulares de Buenos Aires.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 md:justify-start">
            <Link
              href="/contacto"
              className={primaryCtaClass}
            >
              Ver formas de contacto
            </Link>
            <Link
              href="/sobrenosotros"
              className={neutralCtaClass}
            >
              Conocé el taller
            </Link>
          </div>
        </article>
      </section>

      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "@id": `${SITE_URL}/#faq`,
            "mainEntity": faqs.map((faq) => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer,
              },
            })),
          }),
        }}
      />
    </section>
  );
}
