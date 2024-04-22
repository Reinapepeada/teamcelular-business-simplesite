import React from "react";
import RepairsForm from "@/components/forms/RepairsForm"; // Fix the casing of the import statement
import { Oswald } from "next/font/google";
const oswald = Oswald({ subsets: ["latin"], weight: "500" });
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Presupuesto al instante | Reparacion de celulares",
  description: "Reparamos tu equipo en el dia. ¡Rápido y fácil!",
};
export default function CreadorPresupuestos() {
  return (
    <section className="flex flex-col justify-center items-center">
      <h1 className={`${oswald.className} text-5xl text-center p-2 m-2 light:text-black my-28 `}>Formulario para presupuesto de equipo</h1>
      <RepairsForm></RepairsForm>
    </section>
  );
}
