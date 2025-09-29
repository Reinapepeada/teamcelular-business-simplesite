import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Microelectrónica y reballing en CABA",
  description:
    "Conoce cómo llevamos adelante reparaciones de microelectrónica, reballing y recuperación de placas en nuestro laboratorio de Buenos Aires.",
  keywords: [
    "microelectronica caba",
    "reballing placas celulares",
    "reparacion placa base smartphone",
  ],
};

const useCases = [
  "Equipos mojados con cortocircuitos en placa.",
  "Daños por sobrecarga eléctrica o pines sueltos.",
  "Reballing de chips BGA: Baseband, NAND, PMIC, WiFi.",
  "Bypass y reconstrucción de pistas en placas multilayer.",
];

const equipment = [
  "Estaciones de soldado y calor controlado con perfilado por zonas.",
  "Microscopios trinoculares y cámaras de inspección HD.",
  "Preheaters y mesas antiestáticas certificadas.",
  "Software de diagnóstico y medidores de señal para RF.",
];

export default function MicroelectronicsGuide() {
  return (
    <article className="prose prose-neutral max-w-3xl py-16">
      <h1>Laboratorio de microelectrónica y reballing en CABA</h1>
      <p>
        Cuando una reparación requiere intervenir directamente una placa o chip BGA, nuestro equipo de
        microelectrónica entra en acción. Somos referentes en Buenos Aires para recuperar placas
        complejas y dispositivos considerados sin solución.
      </p>
      <h2>Casos en los que recomendamos microelectrónica</h2>
      <ul>
        {useCases.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <h2>Instrumental y protocolos certificados</h2>
      <p>
        Trabajamos bajo normas de laboratorio ESD y utilizamos perfiles térmicos personalizados para cada modelo. Nuestros técnicos llevan registros fotográficos y mediciones en cada etapa para validar la reparación.
      </p>
      <ul>
        {equipment.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <h2>Documentación y garantía</h2>
      <p>
        Al finalizar el trabajo entregamos un informe con el detalle de componentes reemplazados, temperaturas aplicadas y pruebas de carga. Las reparaciones incluyen garantía escrita y recomendaciones de uso.
      </p>
      <p>
        Si sos colega técnico o empresa, podemos ofrecer capacitaciones y acuerdos de soporte continuos. Escribinos para diagramar un plan a medida.
      </p>
      <div className="not-prose mt-6 flex flex-wrap gap-4">
        <Link
          href="/presupuesto-reparacion"
          className="rounded-full bg-secondary px-6 py-3 text-white font-semibold shadow hover:bg-secondary/90"
        >
          Solicitar microelectrónica
        </Link>
        <Link
          href="/contacto"
          className="rounded-full border border-secondary px-6 py-3 font-semibold text-secondary hover:bg-secondary/10"
        >
          Coordinar diagnóstico
        </Link>
      </div>
      <p className="mt-6">
        Conocé también nuestro {" "}
        <Link href="/guias/soporte-empresas-servicio-tecnico" className="text-primary font-semibold">
          servicio para empresas y gremios
        </Link>{" "}
        si necesitás convenios de mantenimiento.
      </p>
    </article>
  );
}
