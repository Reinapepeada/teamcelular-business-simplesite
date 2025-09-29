import React from "react";
import Link from "next/link";

interface KnowledgeItem {
  title: string;
  summary: string;
  href: string;
  readingTime: string;
}

const ARTICLES: KnowledgeItem[] = [
  {
    title: "Reparación de iPhone en Buenos Aires",
    summary:
      "Descubre nuestro flujo de diagnóstico avanzado para iPhone, tiempos de entrega y costos orientativos para pantalla, batería y placa lógica.",
    href: "/guias/reparacion-iphone-buenos-aires",
    readingTime: "5 min de lectura",
  },
  {
    title: "Microelectrónica y reballing profesional",
    summary:
      "Cuándo conviene optar por microelectrónica, qué herramientas usamos y cómo cuidamos los chips BGA en reparaciones críticas.",
    href: "/guias/microelectronica-reballing-caba",
    readingTime: "6 min de lectura",
  },
  {
    title: "Soporte técnico para empresas y gremios",
    summary:
      "Planes de mantenimiento, SLAs y beneficios de tercerizar el servicio técnico de dispositivos móviles para organizaciones.",
    href: "/guias/soporte-empresas-servicio-tecnico",
    readingTime: "4 min de lectura",
  },
  {
    title: "Mantenimiento preventivo de celulares",
    summary:
      "Buenas prácticas para extender la vida útil de tus dispositivos y reconocer fallas antes de que se vuelvan críticas.",
    href: "/guias/mantenimiento-preventivo-celulares",
    readingTime: "4 min de lectura",
  },
];

export default function KnowledgeGrid() {
  return (
    <section className="relative w-full md:w-11/12 max-w-6xl space-y-10 overflow-hidden rounded-3xl border border-primary/10 bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-10 shadow-xl dark:from-primary/5 dark:via-background dark:to-secondary/5">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,#ffffff33,transparent_60%)] dark:bg-[radial-gradient(circle_at_top,#22d3ee20,transparent_60%)]" />
      <header className="text-center space-y-3 md:text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary/90 dark:text-secondary/70">
          Insights del laboratorio
        </p>
        <h2 className="text-3xl font-bold text-foreground md:text-4xl">
          Consejos expertos para prolongar la vida de tus dispositivos
        </h2>
        <p className="mx-auto max-w-3xl text-base text-muted-foreground md:mx-0">
          Historias reales, protocolos y buenas prácticas de nuestro laboratorio en CABA. Cada guía enlaza a recursos operativos y opciones de contacto directo.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        {ARTICLES.map((article) => (
          <article
            key={article.href}
            className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/40 bg-white/80 p-7 shadow-lg ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-2xl dark:border-slate-700/50 dark:bg-slate-900/60 dark:ring-white/5">
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <div className="absolute inset-x-8 top-0 h-1 rounded-full bg-gradient-to-r from-primary to-secondary" />
            </div>
            <div className="space-y-5">
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-secondary/90 dark:text-secondary/70">
                <span className="h-2 w-2 rounded-full bg-secondary/80" aria-hidden />
                {article.readingTime}
              </p>
              <h3 className="text-2xl font-semibold text-foreground">
                {article.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {article.summary}
              </p>
            </div>
            <div className="mt-8 flex items-center justify-between text-sm font-semibold">
              <Link
                href={article.href}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-3 text-white shadow transition-all group-hover:gap-3">
                Leer guía completa
                <span aria-hidden className="text-lg">
                  →
                </span>
              </Link>
              <Link
                href="/presupuesto-reparacion"
                className="hidden text-primary transition-colors hover:text-secondary md:flex md:items-center md:gap-2">
                Reservar diagnóstico
                <span aria-hidden>↗</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
