import React from "react";
import { Input,Select,SelectItem } from "@nextui-org/react";
import {failures} from "../../data/failures";

export default function RepairForm() {
    return (
        <section className="flex flex-col w-10/12 md:w-3/4  gap-4">
            <div className="flex flex-row justify-center items-center gap-4">
                <Input type="text" label="Marca" />
                <Input type="text" label="Modelo" />
                <Select 
                    label="Tipo de reparación"
                    placeholder="Seleccione una opción"
                >
                  
                </Select>

            </div>

            <div className="flex flex-row justify-center items-center gap-4">
                <Input type="email" label="Email" />
            </div>
            
        </section>
    );
}
