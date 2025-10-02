import React from "react";
import BannerHome from "../components/banners/BannerHome";
import BannerCards from "@/components/cards/BannerCards";
import KnowledgeGrid from "@/components/cards/KnowledgeGrid";
import Link from "next/link";

const services = [
  {
    title: "Reparación integral de celulares",
    description:
      "Cambio de pantallas, baterías originales, módulos de carga, cámaras y sellado IP para mantener tu smartphone como nuevo.",
  },
  {
    title: "Laboratorio de microelectrónica",
    description:
      "Reballing de placas, reparación de circuitos integrados, recuperación de datos y soluciones en microsoldadura de alta precisión.",
  },
  {
    title: "Soporte corporativo y a gremios",
    description:
      "Planes de mantenimiento para empresas, servicio técnico on-site y logística express para flotas de dispositivos móviles.",
  },
];

const differentiators = [
  {
    title: "Garantía escrita",
    description:
      "Todas las reparaciones cuentan con respaldo por escrito en mano de obra y repuestos certificados.",
  },
  {
    title: "Diagnóstico en el día",
    description:
      "Recibimos tu equipo, lo evaluamos con instrumental profesional y enviamos presupuesto transparente en horas.",
  },
  {
    title: "Atención omnicanal",
    description:
      "Coordiná tu reparación vía WhatsApp, formulario web o acercándote al laboratorio en Recoleta, CABA.",
  },
];

const faqs = [
  {
    question: "¿Qué marcas de celulares reparan?",
    answer:
      "Trabajamos con Apple, Samsung, Motorola, Xiaomi, Huawei y más. Si tu modelo es especial, consultanos y validamos stock de repuestos al instante.",
  },
  {
    question: "¿Realizan servicio técnico a domicilio?",
    answer:
      "Podemos retirar y entregar equipos en CABA y GBA de manera programada. También contamos con soporte remoto para software y configuraciones.",
  },
  {
    question: "¿Cómo solicito un presupuesto urgente?",
    answer:
      "Completá el formulario de presupuesto o escribinos por WhatsApp las fallas del equipo. Te respondemos con una estimación y opciones de repuesto.",
  },
];

export default function Home() {
  return (
    <section className="flex w-full max-w-7xl flex-col items-center gap-16 px-6 py-14 transition md:px-8">
      <BannerHome />
      <BannerCards />

      <section className="w-full max-w-6xl space-y-14 text-center md:text-left">
        <article className="grid gap-10 rounded-3xl border border-slate-200/40 bg-white/90 p-10 shadow-2xl backdrop-blur-xl transition dark:border-slate-800/60 dark:bg-slate-950/80 dark:shadow-[0_35px_60px_-25px_rgba(15,23,42,0.8)] md:grid-cols-2 md:items-center">
          <div className="space-y-6 text-slate-800 dark:text-slate-200">
            <h2 className="text-3xl font-semibold text-primary md:text-4xl">
              Reparación de celulares en Capital Federal
            </h2>
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              Somos Team Celular, laboratorio especializado en reparación de celulares en el día, localizado en Recoleta. Nuestro equipo de técnicos certificados trabaja con instrumental de microelectrónica, repuestos 100% originales y protocolos de calidad que garantizan resultados duraderos.
            </p>
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              Atendemos dispositivos personales y flotas empresariales, brindamos diagnósticos transparentes y documentación para garantías, seguros o empresas de telefonía. ¡Tu comunicación es nuestra prioridad!
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/presupuesto-reparacion"
                className="rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
              >
                Solicitar presupuesto online
              </Link>
              <Link
                href="https://wa.me/5491151034595?text=Hola%20Team%20Celular,%20necesito%20una%20reparaci%C3%B3n"
                className="rounded-full border border-primary/40 px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:border-primary/60 dark:text-primary/80"
              >
                Chatear con un especialista
              </Link>
            </div>
          </div>
          <div className="space-y-6 rounded-2xl border border-slate-200/40 bg-slate-50/80 p-8 shadow-inner dark:border-slate-800/60 dark:bg-slate-950/60">
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Servicios destacados</h3>
            <ul className="space-y-4 text-left">
              {services.map((service) => (
                <li key={service.title} className="rounded-xl border border-slate-200/40 bg-white/80 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800/60 dark:bg-slate-900/70">
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
              className="rounded-2xl border border-slate-200/40 bg-white/80 p-6 text-center shadow-lg transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800/60 dark:bg-slate-950/70"
            >
              <h4 className="text-xl font-semibold text-primary">
                {item.title}
              </h4>
              <p className="mt-3 text-slate-600 dark:text-slate-300">{item.description}</p>
            </div>
          ))}
        </article>

        <article className="rounded-3xl border border-slate-200/40 bg-gradient-to-r from-primary/10 via-white/90 to-secondary/10 p-10 shadow-2xl dark:border-slate-800/60 dark:from-primary/10 dark:via-slate-950/80 dark:to-secondary/10">
          <h3 className="text-2xl font-bold text-slate-900 md:text-left dark:text-white">
            Cobertura y contacto inmediato
          </h3>
          <div className="mt-6 grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <p className="text-lg text-slate-600 dark:text-slate-300">
                Cubrimos Capital Federal y zonas clave de Gran Buenos Aires como Palermo, Colegiales, Caballito, Belgrano, Microcentro y Núñez. Coordinamos envíos puerta a puerta y visitas técnicas para empresas.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                Latitud: -34.5975 | Longitud: -58.4030 — Visitá nuestro laboratorio en Paraguay 2451, Recoleta, o agendá un retiro programado para tus dispositivos.
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
                className="group relative overflow-hidden rounded-2xl border border-slate-200/50 bg-white p-6 text-left shadow-lg transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800/60 dark:bg-slate-900"
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

        <article className="relative overflow-hidden rounded-3xl border border-slate-200/50 bg-white p-10 text-center shadow-[0_40px_80px_-40px_rgba(15,23,42,0.35)] transition md:text-left dark:border-slate-800/60 dark:bg-slate-900">
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
              Visitar página de contacto
            </Link>
            <Link
              href="/sobrenosotros"
              className="rounded-full border border-secondary px-6 py-3 font-semibold text-secondary transition hover:bg-secondary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
            >
              Conocer nuestro laboratorio
            </Link>
          </div>
        </article>
      </section>
    </section>
  );
}
