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
    <section className="w-full md:w-3/4 space-y-6">
      <header className="text-center space-y-2">
        <p className="text-primary text-sm font-semibold uppercase tracking-wide">
          Recursos para dueños de dispositivos
        </p>
        <h2 className="text-3xl font-bold">Consejos expertos sobre reparación de celulares</h2>
        <p className="text-default-500 max-w-3xl mx-auto">
          Aprende cómo cuidamos tus equipos, qué soluciones ofrecemos y por qué elegir Team Celular
          para reparaciones complejas en CABA.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        {ARTICLES.map((article) => (
          <article
            key={article.href}
            className="rounded-2xl border border-default-200 bg-background/40 p-6 shadow-sm transition hover:shadow-lg">
            <div className="flex flex-col h-full space-y-4">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.15em] text-secondary font-semibold">
                  {article.readingTime}
                </p>
                <h3 className="text-xl font-semibold text-foreground">
                  {article.title}
                </h3>
              </div>
              <p className="text-default-500 text-sm leading-relaxed">
                {article.summary}
              </p>
              <div className="mt-auto">
                <Link
                  href={article.href}
                  className="text-primary font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all">
                  Leer guía completa<span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
