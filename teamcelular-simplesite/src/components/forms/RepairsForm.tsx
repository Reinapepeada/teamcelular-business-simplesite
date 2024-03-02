import React from "react";
import { Input } from "@nextui-org/react";

export default function RepairForm() {
    return (
        <section className="flex flex-col w-10/12 md:w-3/4  gap-4">
            <div className="flex flex-row justify-center items-center gap-4">
                <Input type="text" label="Nombre" />
                <Input type="text" label="Apellido" />
                <Input placeholder="nombre" type="text" label="Nombre" />
            </div>

            <div className="flex flex-row justify-center items-center gap-4">
                <Input type="email" label="Email" />
            </div>
            
        </section>
    );
}
