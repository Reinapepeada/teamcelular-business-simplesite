import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

const ARTICLES = [
  {
    title: "Reparación de iPhone en Buenos Aires",
    description:
      "Proceso detallado para diagnosticar y reparar iPhone con repuestos originales y garantía escrita.",
    href: "/guias/reparacion-iphone-buenos-aires",
    category: "Reparaciones Apple",
    readingTime: "5 min",
  },
  {
    title: "Microelectrónica y reballing profesional",
    description:
      "Cómo gestionamos reparaciones avanzadas en placas y chips para recuperar equipos complejos.",
    href: "/guias/microelectronica-reballing-caba",
    category: "Laboratorio",
    readingTime: "6 min",
  },
  {
    title: "Soporte técnico para empresas y gremios",
    description:
      "Beneficios de tercerizar el mantenimiento de dispositivos móviles con SLAs claros.",
    href: "/guias/soporte-empresas-servicio-tecnico",
    category: "Empresas",
    readingTime: "4 min",
  },
  {
    title: "Mantenimiento preventivo de celulares",
    description:
      "Buenas prácticas para extender la vida útil de smartphones y tablets con asistencia profesional.",
    href: "/guias/mantenimiento-preventivo-celulares",
    category: "Tips de cuidado",
    readingTime: "4 min",
  },
];

export const metadata: Metadata = {
  title: "Guías de reparación y mantenimiento",
  description:
    "Aprende con Team Celular sobre reparación de iPhone, microelectrónica, soporte corporativo y mantenimiento preventivo.",
};

export default function GuidesPage() {
  return (
    <section className="relative w-11/12 max-w-6xl py-16">
      <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-primary/10 via-background to-secondary/10 blur-3xl dark:from-primary/5 dark:via-slate-950 dark:to-secondary/5" />
      <div className="rounded-3xl border border-white/10 bg-white/80 p-10 shadow-2xl backdrop-blur-xl dark:border-white/5 dark:bg-slate-900/70">
        <header className="space-y-6 text-center md:text-left">
          <div className="inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary/90 dark:border-primary/40 dark:bg-primary/15 dark:text-primary/70">
            <span className="h-2 w-2 rounded-full bg-primary" aria-hidden />
            Knowledge Hub
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-foreground md:text-5xl">
              Guías de laboratorio para líderes y entusiastas tech
            </h1>
            <p className="text-lg text-muted-foreground md:max-w-3xl">
              Impacta tus operaciones con procesos certificados de reparación, microelectrónica y
              mantenimiento preventivo. Explorá nuestras notas técnicas y conectá con especialistas en minutos.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:justify-start">
            <Link
              href="/presupuesto-reparacion"
              className="rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/40 transition hover:shadow-2xl"
            >
              Solicitar asesoría inmediata
            </Link>
            <Link
              href="/contacto"
              className="rounded-full border border-primary/30 px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10 dark:border-primary/40 dark:text-primary/80"
            >
              Conversar con un ingeniero
            </Link>
          </div>
        </header>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {ARTICLES.map((article) => (
            <article
              key={article.href}
              className="group relative overflow-hidden rounded-3xl border border-white/40 bg-white/80 p-8 shadow-xl ring-1 ring-primary/10 transition-all hover:-translate-y-1 hover:ring-2 hover:ring-secondary/60 dark:border-slate-700/50 dark:bg-slate-900/70 dark:ring-secondary/20"
            >
              <div className="absolute right-6 top-6 h-24 w-24 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 blur-2xl opacity-50 transition-opacity group-hover:opacity-80 dark:from-primary/20 dark:to-secondary/25" aria-hidden />
              <div className="relative space-y-4">
                <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-secondary/80 dark:text-secondary/60">
                  <span className="rounded-full bg-secondary/70 px-3 py-1 text-[11px] normal-case tracking-normal text-white dark:bg-secondary/80">
                    {article.category}
                  </span>
                  {article.readingTime}
                </div>
                <h2 className="text-2xl font-semibold text-foreground">
                  {article.title}
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {article.description}
                </p>
              </div>
              <div className="mt-8 flex items-center justify-between text-sm font-semibold">
                <Link
                  href={article.href}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2 text-white shadow-md transition group-hover:gap-3 dark:bg-primary"
                >
                  Leer guía detallada
                  <span aria-hidden>→</span>
                </Link>
                <Link
                  href="/guias"
                  className="hidden items-center gap-2 text-primary/80 transition-colors hover:text-secondary md:flex"
                >
                  Compartir
                  <span aria-hidden>↗</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
