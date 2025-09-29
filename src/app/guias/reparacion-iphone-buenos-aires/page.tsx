import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reparación de iPhone en Buenos Aires",
  description:
    "Paso a paso del servicio de reparación de iPhone en Team Celular: diagnóstico, repuestos originales y garantía escrita en CABA.",
  keywords: [
    "reparacion iphone buenos aires",
    "cambio pantalla iphone caba",
    "servicio tecnico apple argentina",
  ],
};

const steps = [
  {
    title: "Recepción y evaluación inicial",
    detail:
      "Revisamos el número de serie, estado físico y realizamos un checklist completo de funciones (audio, cámaras, Face ID, sensores).",
  },
  {
    title: "Diagnóstico con instrumental Apple",
    detail:
      "Usamos microscopio y herramientas de microelectrónica para detectar fallas en placa, conectores flex y circuitos integrados.",
  },
  {
    title: "Reparación con repuestos originales",
    detail:
      "Trabajamos con pantallas OLED, baterías certificadas y módulos oficiales. Conservamos True Tone y calibramos batería al 100%.",
  },
  {
    title: "Calibración y control de calidad",
    detail:
      "Ejecutamos test de diagnóstico, verificamos sellado IP y entregamos informe final con garantía escrita.",
  },
];

export default function IphoneRepairGuide() {
  return (
    <article className="prose prose-neutral max-w-3xl py-16">
      <h1>Reparación de iPhone con garantía en Buenos Aires</h1>
      <p>
        En Team Celular reparamos iPhone con estándares de Apple, repuestos originales y
        laboratorio certificado en Recoleta. Atendemos urgencias el mismo día y brindamos soporte a
        empresas con flotas de dispositivos iOS.
      </p>
      <h2>Flujo de trabajo especializado</h2>
      <p>
        Nuestro procedimiento garantiza trazabilidad completa, desde el ingreso hasta la entrega del
        equipo. Cada etapa queda registrada en nuestro sistema para asegurar tiempos y repuestos.
      </p>
      <ol>
        {steps.map((step) => (
          <li key={step.title}>
            <strong>{step.title}:</strong> {step.detail}
          </li>
        ))}
      </ol>
      <h2>Fallas que resolvemos a diario</h2>
      <ul>
        <li>Cambio de pantalla OLED con calibración True Tone.</li>
        <li>Reemplazo de batería con ciclo optimizado y garantía oficial.</li>
        <li>Reparación de módulo de carga, micrófonos y parlantes.</li>
        <li>Recuperación de placa lógica y chips U2, Tristar, Baseband.</li>
      </ul>
      <p>
        También brindamos asesoría para asegurar tus dispositivos, gestionar AppleCare, realizar
        migraciones a nuevos modelos y preparar equipos para venta o entrega corporativa.
      </p>
      <h2>Cómo solicitar tu reparación</h2>
      <p>
        Si tu iPhone necesita ayuda urgente, combinamos logística y soporte omnicanal. Podés
        acercarte al laboratorio, agendar un retiro o pedir diagnóstico remoto.
      </p>
      <div className="not-prose mt-6 flex flex-wrap gap-4">
        <Link
          href="/presupuesto-reparacion"
          className="rounded-full bg-primary px-6 py-3 text-white font-semibold shadow hover:bg-primary/90"
        >
          Pedir presupuesto de iPhone
        </Link>
        <Link
          href="https://wa.me/5491151034595?text=Necesito%20reparar%20mi%20iPhone"
          className="rounded-full border border-primary px-6 py-3 font-semibold text-primary hover:bg-primary/10"
        >
          Chatear por WhatsApp
        </Link>
      </div>
      <p className="mt-6">
        ¿Buscás otras soluciones? Visitá nuestra página de {" "}
        <Link href="/presupuesto-reparacion" className="text-primary font-semibold">
          reparaciones de celulares
        </Link>{" "}
        para conocer tiempos y coberturas.
      </p>
    </article>
  );
}
