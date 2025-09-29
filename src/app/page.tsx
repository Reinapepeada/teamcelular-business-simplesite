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
    <section className="space-y-16 w-10/12 flex flex-col justify-center items-center py-12">
      <BannerHome />
      <BannerCards />

      <section className="w-full max-w-6xl space-y-12 text-center md:text-left">
        <article className="grid gap-10 rounded-3xl border border-white/20 bg-white/90 p-10 shadow-xl backdrop-blur-lg transition dark:border-white/10 dark:bg-slate-950/70 md:grid-cols-2 md:items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary md:text-4xl">
              Reparación de celulares en Capital Federal
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Somos Team Celular, laboratorio especializado en reparación de celulares en el día, localizado en Recoleta. Nuestro equipo de técnicos certificados trabaja con instrumental de microelectrónica, repuestos 100% originales y protocolos de calidad que garantizan resultados duraderos.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Atendemos dispositivos personales y flotas empresariales, brindamos diagnósticos transparentes y documentación para garantías, seguros o empresas de telefonía. ¡Tu comunicación es nuestra prioridad!
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/presupuesto-reparacion"
                className="rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/40 transition hover:shadow-primary/60"
              >
                Solicitar presupuesto online
              </Link>
              <Link
                href="https://wa.me/5491151034595?text=Hola%20Team%20Celular,%20necesito%20una%20reparaci%C3%B3n"
                className="rounded-full border border-primary/40 px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10 dark:border-primary/60 dark:text-primary/80"
              >
                Chatear con un especialista
              </Link>
            </div>
          </div>
          <div className="space-y-6 rounded-2xl border border-secondary/20 bg-gradient-to-br from-secondary/10 via-background to-primary/10 p-8 shadow-inner dark:border-secondary/30 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
            <h3 className="text-2xl font-semibold text-foreground">Servicios destacados</h3>
            <ul className="space-y-4 text-left">
              {services.map((service) => (
                <li key={service.title} className="rounded-xl border border-white/40 bg-white/70 p-4 shadow-sm transition dark:border-white/10 dark:bg-slate-900/70">
                  <h4 className="text-xl font-semibold text-secondary dark:text-secondary/80">
                    {service.title}
                  </h4>
                  <p className="mt-2 text-muted-foreground">{service.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </article>

        <article className="grid gap-8 md:grid-cols-3">
          {differentiators.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-primary/20 bg-white/70 p-6 text-center shadow-sm"
            >
              <h4 className="text-xl font-semibold text-primary">
                {item.title}
              </h4>
              <p className="mt-3 text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </article>

        <article className="rounded-3xl bg-gradient-to-r from-primary/15 to-secondary/15 p-10">
          <h3 className="text-2xl font-bold text-center md:text-left">
            Cobertura y contacto inmediato
          </h3>
          <div className="mt-6 grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground">
                Cubrimos Capital Federal y zonas clave de Gran Buenos Aires como Palermo, Colegiales, Caballito, Belgrano, Microcentro y Núñez. Coordinamos envíos puerta a puerta y visitas técnicas para empresas.
              </p>
              <p className="text-lg text-muted-foreground">
                Latitud: -34.5975 | Longitud: -58.4030 — Visitá nuestro laboratorio en Paraguay 2451, Recoleta, o agendá un retiro programado para tus dispositivos.
              </p>
            </div>
            <div className="space-y-4">
              <p className="font-semibold">
                Vías de contacto
              </p>
              <ul className="space-y-2 text-left text-muted-foreground">
                <li>
                  Tel: <Link href="tel:+541151034595" className="font-semibold text-primary">+54 11 5103-4595</Link>
                </li>
                <li>
                  Email: <Link href="mailto:teamcelular.arg@gmail.com" className="font-semibold text-primary">teamcelular.arg@gmail.com</Link>
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
          <h3 className="text-2xl font-bold text-center md:text-left">
            Preguntas frecuentes sobre reparación de celulares
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-secondary/20 bg-white/80 p-6 shadow-sm"
              >
                <h4 className="text-lg font-semibold text-secondary">
                  {faq.question}
                </h4>
                <p className="mt-3 text-sm text-muted-foreground">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </article>

  <KnowledgeGrid />

        <article className="rounded-3xl border border-primary/30 bg-white/80 p-10 text-center md:text-left">
          <h3 className="text-2xl font-bold text-primary">
            ¿Listo para recuperar tu teléfono?
          </h3>
          <p className="mt-4 text-lg text-muted-foreground">
            Dejanos un mensaje detallando la falla, elegí el canal que prefieras y reservá tu turno en minutos. Somos el servicio técnico de referencia en reparación de celulares de Buenos Aires.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 md:justify-start">
            <Link
              href="/contacto"
              className="rounded-full bg-secondary px-6 py-3 text-white font-semibold shadow hover:bg-secondary/90"
            >
              Visitar página de contacto
            </Link>
            <Link
              href="/sobrenosotros"
              className="rounded-full border border-secondary px-6 py-3 font-semibold text-secondary hover:bg-secondary/10"
            >
              Conocer nuestro laboratorio
            </Link>
          </div>
        </article>
      </section>
    </section>
  );
}
