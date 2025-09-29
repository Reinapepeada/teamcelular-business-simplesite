import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mantenimiento preventivo de celulares",
  description:
    "Buenas prácticas y checklist profesional para extender la vida útil de smartphones con el equipo de Team Celular en CABA.",
};

const tips = [
  {
    title: "Controlar la salud de la batería",
    detail:
      "Revisá ciclos de carga cada seis meses y evita descensos por debajo del 20%. Si la salud cae bajo 80%, programá un reemplazo preventivo.",
  },
  {
    title: "Actualizar software y parches",
    detail:
      "Instalá las últimas versiones de iOS o Android para prevenir vulnerabilidades y optimizar el rendimiento del equipo.",
  },
  {
    title: "Limpieza profesional",
    detail:
      "Realizamos limpieza interna con aire ionizado y reemplazo de sellos para conservar resistencia al agua y evitar oxidación.",
  },
  {
    title: "Backup y protección de datos",
    detail:
      "Automatizamos copias de seguridad en la nube y configuramos autenticación multifactor para minimizar pérdidas ante robos o fallas.",
  },
];

export default function PreventiveMaintenanceGuide() {
  return (
    <article className="prose prose-neutral max-w-3xl py-16">
      <h1>Mantenimiento preventivo para tu smartphone</h1>
      <p>
        El mantenimiento preventivo evita reparaciones costosas y asegura que tu smartphone rinda al máximo. En Team Celular desarrollamos rutinas personalizadas para usuarios particulares y empresas con flotas de dispositivos.
      </p>
      <h2>Checklist recomendado</h2>
      <ul>
        {tips.map((tip) => (
          <li key={tip.title}>
            <strong>{tip.title}:</strong> {tip.detail}
          </li>
        ))}
      </ul>
      <h2>¿Cada cuánto hacerlo?</h2>
      <p>
        Sugerimos una revisión completa cada seis meses o antes si notás caída de rendimiento, problemas de carga o sobrecalentamiento. Para empresas, ofrecemos visitas programadas y reportes detallados por dispositivo.
      </p>
      <p>
        El mantenimiento incluye actualización de firmware, diagnóstico de sensores, limpieza sin riesgo y recomendaciones de uso según el perfil del usuario.
      </p>
      <div className="not-prose mt-6 flex flex-wrap gap-4">
        <Link
          href="/contacto"
          className="rounded-full bg-secondary px-6 py-3 text-white font-semibold shadow hover:bg-secondary/90"
        >
          Agendar mantenimiento preventivo
        </Link>
        <Link
          href="/guias/reparacion-iphone-buenos-aires"
          className="rounded-full border border-secondary px-6 py-3 font-semibold text-secondary hover:bg-secondary/10"
        >
          Ver casos de reparación
        </Link>
      </div>
      <p className="mt-6">
        ¿Tu equipo ya presenta fallas? Visitá nuestro {" "}
        <Link href="/presupuesto-reparacion" className="text-primary font-semibold">
          formulario de presupuesto
        </Link>{" "}
        para obtener un diagnóstico inmediato.
      </p>
    </article>
  );
}
