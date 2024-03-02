import React from "react";
import { Input } from "@nextui-org/react";

export default function CreadorPresupuestos() {
    return (
        <section className="w-full">
            <h1>Formulario de Presupuesto de Equipo</h1>

            <Input type="text" label="Nombre" />
            <Input type="email" label="Email" />
            <Input type="email" label="Email" placeholder="Enter your email" />
        </section>
    );
}
