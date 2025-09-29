import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Soporte técnico para empresas y gremios",
  description:
    "Planes de mantenimiento, SLAs y beneficios de tercerizar el servicio técnico de dispositivos móviles con Team Celular.",
};

const benefits = [
  {
    title: "Diagnóstico express",
    detail:
      "Evaluación inicial en menos de 24 horas con presupuesto digital y trazabilidad para cada equipo.",
  },
  {
    title: "Logística puerta a puerta",
    detail:
      "Coordinamos retiros y entregas en CABA y GBA. Opcional: stock de equipos de reemplazo.",
  },
  {
    title: "Soporte multicanal",
    detail:
      "Mesa de ayuda vía WhatsApp, email y teléfono con seguimiento proactivo de incidencias.",
  },
];

const industries = [
  "Empresas de logística y delivery",
  "Fuerzas de seguridad y gremios",
  "Agencias comerciales y call centers",
  "Startups tecnológicas con equipos remotos",
];

export default function BusinessSupportGuide() {
  return (
    <article className="prose prose-neutral max-w-3xl py-16">
      <h1>Soporte técnico profesional para empresas y gremios</h1>
      <p>
        Las organizaciones necesitan disponibilidad permanente de sus dispositivos móviles. En Team
        Celular diseñamos acuerdos de servicio (SLA) y planes de mantenimiento preventivo para
        asegurar que tu operación no se detenga.
      </p>
      <h2>Beneficios concretos</h2>
      <ul>
        {benefits.map((benefit) => (
          <li key={benefit.title}>
            <strong>{benefit.title}:</strong> {benefit.detail}
          </li>
        ))}
      </ul>
      <h2>Industria y gremios a los que asistimos</h2>
      <p>Adaptamos planes según el tipo de operación y volumen de dispositivos.</p>
      <ul>
        {industries.map((industry) => (
          <li key={industry}>{industry}</li>
        ))}
      </ul>
      <h2>Reportes y compliance</h2>
      <p>
        Documentamos cada intervención con fotografías, número de serie y garantía escrita. También
        generamos reportes mensuales para auditorías internas, seguros o proveedores de telefonía.
      </p>
      <p>
        Podés combinar nuestros servicios de {" "}
        <Link href="/guias/microelectronica-reballing-caba" className="text-primary font-semibold">
          microelectrónica avanzada
        </Link>{" "}
        con soporte on-site y capacitaciones para tu equipo.
      </p>
      <div className="not-prose mt-6 flex flex-wrap gap-4">
        <Link
          href="/contacto"
          className="rounded-full bg-primary px-6 py-3 text-white font-semibold shadow hover:bg-primary/90"
        >
          Coordinar reunión ejecutiva
        </Link>
        <Link
          href="/presupuesto-reparacion"
          className="rounded-full border border-primary px-6 py-3 font-semibold text-primary hover:bg-primary/10"
        >
          Solicitar propuesta de SLA
        </Link>
      </div>
    </article>
  );
}
