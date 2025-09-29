import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

const ARTICLES = [
  {
    title: "Reparación de iPhone en Buenos Aires",
    description:
      "Proceso detallado para diagnosticar y reparar iPhone con repuestos originales y garantía escrita.",
    href: "/guias/reparacion-iphone-buenos-aires",
  },
  {
    title: "Microelectrónica y reballing profesional",
    description:
      "Cómo gestionamos reparaciones avanzadas en placas y chips para recuperar equipos complejos.",
    href: "/guias/microelectronica-reballing-caba",
  },
  {
    title: "Soporte técnico para empresas y gremios",
    description:
      "Beneficios de tercerizar el mantenimiento de dispositivos móviles con SLAs claros.",
    href: "/guias/soporte-empresas-servicio-tecnico",
  },
  {
    title: "Mantenimiento preventivo de celulares",
    description:
      "Buenas prácticas para extender la vida útil de smartphones y tablets con asistencia profesional.",
    href: "/guias/mantenimiento-preventivo-celulares",
  },
];

export const metadata: Metadata = {
  title: "Guías de reparación y mantenimiento",
  description:
    "Aprende con Team Celular sobre reparación de iPhone, microelectrónica, soporte corporativo y mantenimiento preventivo.",
  keywords: [
    "guias reparación celulares",
    "microelectrónica CABA",
    "soporte técnico empresas",
    "mantenimiento preventivo smartphones",
  ],
};

export default function GuidesPage() {
  return (
    <section className="w-10/12 max-w-6xl py-16 space-y-10">
      <header className="space-y-3 text-center md:text-left">
        <p className="text-sm uppercase tracking-wide text-primary font-semibold">
          Conocimiento experto
        </p>
        <h1 className="text-4xl font-bold text-foreground">
          Guías para cuidar y reparar tus dispositivos
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Reunimos artículos técnicos y consejos prácticos para dueños de smartphones, empresas
          y técnicos curiosos que desean entender cómo trabajamos en nuestro laboratorio de CABA.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        {ARTICLES.map((article) => (
          <article
            key={article.href}
            className="rounded-2xl border border-default-200 bg-white/70 p-7 shadow-sm transition hover:shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-foreground">
              {article.title}
            </h2>
            <p className="mt-3 text-muted-foreground">{article.description}</p>
            <div className="mt-6">
              <Link
                href={article.href}
                className="text-primary font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all"
              >
                Leer guía<span aria-hidden>→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
