import React from "react";
import RepairsForm from "@/components/forms/RepairsForm"; // Fix the casing of the import statement
import { Oswald } from "next/font/google";
const oswald = Oswald({ subsets: ["latin"], weight: "500" });

export default function CreadorPresupuestos() {
  return (
    <section className="flex flex-col justify-center items-center">
      <h1 className={`${oswald.className} text-5xl text-center p-2 m-2 light:text-black my-28 `}>Formulario de Presupuesto de Equipo</h1>

      <RepairsForm></RepairsForm>
    </section>
  );
}