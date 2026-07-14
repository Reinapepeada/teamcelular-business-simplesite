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
    title: "Reparación de Samsung Galaxy en Buenos Aires",
    summary:
      "Diagnóstico por falla, tiempos y opciones de pantalla, batería, carga y placa para las líneas Galaxy S, A, Note, Z Fold y Z Flip.",
    href: "/guias/reparacion-samsung-buenos-aires",
    readingTime: "6 min de lectura",
  },
  {
    title: "Reparación de Xiaomi, Redmi y POCO",
    summary:
      "Fallas frecuentes, tiempos y opciones de pantalla, batería, carga rápida y placa para equipos Xiaomi, Redmi Note y POCO.",
    href: "/guias/reparacion-xiaomi-buenos-aires",
    readingTime: "6 min de lectura",
  },
  {
    title: "Reparación de Motorola en Buenos Aires",
    summary:
      "Diagnóstico, tiempos y opciones de pantalla, batería, carga y placa para las líneas Moto G, Edge, E y ThinkPhone.",
    href: "/guias/reparacion-motorola-buenos-aires",
    readingTime: "6 min de lectura",
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
    <section className="grid w-full gap-8 border-y border-slate-300 py-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-12 dark:border-slate-700">
      <header>
        <h2 className="text-balance text-3xl font-extrabold tracking-[-0.025em] text-slate-950 md:text-4xl dark:text-white">
          Guías escritas desde el laboratorio
        </h2>
        <p className="mt-4 max-w-md text-pretty leading-7 text-slate-600 dark:text-slate-300">
          Qué revisar, cuándo dejar de usar el equipo y qué datos conviene tener antes de pedir un presupuesto.
        </p>
        <Link
          href="/guias"
          prefetch={false}
          className="mt-6 inline-flex min-h-11 items-center gap-2 font-bold text-[#2d2e83] hover:underline dark:text-[#aebaff]"
        >
          Ver todas las guías <span aria-hidden>→</span>
        </Link>
      </header>
      <div className="divide-y divide-slate-300 border-y border-slate-300 dark:divide-slate-700 dark:border-slate-700">
        {ARTICLES.map((article) => (
          <article
            key={article.href}
            className="group grid gap-3 py-5 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6"
          >
            <div>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-lg font-bold leading-snug text-slate-950 dark:text-white">{article.title}</h3>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{article.readingTime}</span>
              </div>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">{article.summary}</p>
            </div>
            <Link
              href={article.href}
              prefetch={false}
              aria-label={`Leer ${article.title}`}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#2d2e83] text-white transition group-hover:translate-x-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2d2e83]"
            >
              <span aria-hidden>→</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

