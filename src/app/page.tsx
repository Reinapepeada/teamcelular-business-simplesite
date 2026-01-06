import React from "react";
import BannerHome from "../components/banners/BannerHome";
import BannerCards from "@/components/cards/BannerCards";
import KnowledgeGrid from "@/components/cards/KnowledgeGrid";
import GoogleReviewsAPI from "@/components/cards/GoogleReviewsAPI";
import Link from "next/link";
import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";

export const metadata: Metadata = {
  alternates: {
    canonical: SITE_URL,
  },
};

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

export default function Home() {
  return (
    <section className="flex w-full max-w-6xl flex-col items-center gap-16 px-6 py-14 transition md:px-8">
      <BannerHome />
      <BannerCards />

      <section className="w-full max-w-6xl space-y-14 text-center md:text-left">
        <article className="grid gap-10 rounded-2xl border border-white/15 bg-white/5 p-10 shadow-lg backdrop-blur-2xl transition-all duration-300 ease-in-out hover:shadow-2xl dark:border-white/10 dark:bg-slate-900/30 md:grid-cols-2 md:items-center">
          <div className="space-y-6 text-slate-800 dark:text-slate-200">
            <h2 className="text-3xl font-semibold text-primary md:text-4xl">
              ¿Por qué elegirnos?
            </h2>
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              Somos Team Celular, un taller familiar que se convirtió en referencia técnica en Buenos Aires. Trabajamos en Recoleta con repuestos originales y equipamiento profesional porque creemos que tu celular merece el mismo cuidado que le darías vos.
            </p>
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              Arreglamos desde celulares personales hasta equipos de empresas. Te damos presupuesto sin compromiso, explicamos todo en castellano claro y respaldamos cada trabajo con garantía por escrito.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/presupuesto-reparacion"
                className="rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
              >
                Pedir presupuesto
              </Link>
              <Link
                href="https://wa.me/5491151034595?text=Hola%20Team%20Celular,%20necesito%20una%20reparaci%C3%B3n"
                className="rounded-full border border-primary/40 px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:border-primary/60 dark:text-primary/80"
              >
                Escribinos por WhatsApp
              </Link>
            </div>
          </div>
          <div className="space-y-6 rounded-2xl border border-white/15 bg-white/5 p-8 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/30">
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Qué hacemos</h3>
            <ul className="space-y-4 text-left">
              {services.map((service) => (
                <li key={service.title} className="rounded-xl border border-white/20 bg-white/10 p-4 shadow-sm backdrop-blur-lg transition hover:-translate-y-1 hover:shadow-md dark:border-white/15 dark:bg-slate-900/40">
                  <h4 className="text-xl font-semibold text-secondary dark:text-secondary/80">
                    {service.title}
                  </h4>
                  <p className="mt-2 text-slate-600 dark:text-slate-300">{service.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </article>

        <article className="grid gap-8 md:grid-cols-3">
          {differentiators.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/15 bg-white/5 p-6 text-center shadow-lg backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/30"
            >
              <h4 className="text-xl font-semibold text-primary">
                {item.title}
              </h4>
              <p className="mt-3 text-slate-600 dark:text-slate-300">{item.description}</p>
            </div>
          ))}
        </article>

        <section className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-xl dark:border-white/5 dark:bg-slate-900/30 md:grid-cols-3">
          {microFaqs.map((item) => (
            <article key={item.title} className="space-y-2 rounded-xl border border-white/10 bg-white/10 p-4 text-left dark:border-white/5 dark:bg-slate-900/40">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">{item.title}</p>
              <h5 className="text-base font-semibold text-slate-900 dark:text-white">{item.question}</h5>
              <p className="text-sm text-slate-600 dark:text-slate-300">{item.answer}</p>
            </article>
          ))}
        </section>

        <GoogleReviewsAPI />

        <article className="rounded-2xl border border-white/15 bg-white/5 p-10 shadow-lg backdrop-blur-2xl transition-all duration-300 ease-in-out hover:shadow-2xl dark:border-white/10 dark:bg-slate-900/30">
          <h3 className="text-2xl font-bold text-slate-900 md:text-left dark:text-white">
            Dónde estamos y cómo contactarnos
          </h3>
          <div className="mt-6 grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <p className="text-lg text-slate-600 dark:text-slate-300">
                Nuestro taller está en Recoleta, a pocas cuadras de la facultad de Derecho. Si estás en Palermo, Belgrano, Caballito o el centro, llegás fácil. También coordinamos retiros en CABA.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                La dirección exacta es Paraguay 2451, Recoleta. Atendemos de lunes a viernes de 10:30 a 18hs. Mejor avisá antes de venir para estar seguros que tengamos lugar.
              </p>
            </div>
            <div className="space-y-4">
              <p className="font-semibold">
                Vías de contacto
              </p>
              <ul className="space-y-2 text-left text-muted-foreground">
                <li>
                  Tel: <Link href="tel:+541151034595" className="font-semibold text-primary transition hover:text-secondary">+54 11 5103-4595</Link>
                </li>
                <li>
                  Email: <Link href="mailto:teamcelular.arg@gmail.com" className="font-semibold text-primary transition hover:text-secondary">teamcelular.arg@gmail.com</Link>
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
          <h3 className="text-2xl font-bold text-slate-900 md:text-left dark:text-white">
            Preguntas frecuentes sobre reparación de celulares
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/5 p-6 text-left shadow-lg backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/30"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute inset-x-6 top-0 h-1 rounded-full bg-gradient-to-r from-primary to-secondary" />
                </div>
                <h4 className="text-lg font-semibold text-secondary dark:text-secondary/90">
                  {faq.question}
                </h4>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </article>

  <KnowledgeGrid />

        <article className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/5 p-10 text-center shadow-lg backdrop-blur-2xl transition-all duration-300 ease-in-out hover:shadow-2xl md:text-left dark:border-white/10 dark:bg-slate-900/30">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-white/60 to-secondary/5 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900" />
          <h3 className="text-2xl font-bold text-primary">
            ¿Listo para recuperar tu teléfono?
          </h3>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Dejanos un mensaje detallando la falla, elegí el canal que prefieras y reservá tu turno en minutos. Somos el servicio técnico de referencia en reparación de celulares de Buenos Aires.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 md:justify-start">
            <Link
              href="/contacto"
              className="rounded-full bg-secondary px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-secondary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
            >
              Ver formas de contacto
            </Link>
            <Link
              href="/sobrenosotros"
              className="rounded-full border border-secondary px-6 py-3 font-semibold text-secondary transition hover:bg-secondary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
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
