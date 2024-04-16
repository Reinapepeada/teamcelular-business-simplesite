"use client";
import React, { useState } from "react";
import {
    Input,
    Select,
    SelectItem,
    Textarea,
    Button,
    Checkbox,
    CheckboxGroup,
} from "@nextui-org/react";
import { BsWhatsapp } from "react-icons/bs";

export default function RepairForm() {
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [repairType, setRepairType] = useState([""]);
    const [description, setDescription] = useState("");

    const whatsappMessage = `Hola! Buen Dia! Tengo un equipo el cual necesito que me presupuesten.%0AMarca: ${brand}%0AModelo: ${model}%0ATipo de reparación: ${repairType}%0ADescripción de la falla: ${description}`;

    return (
        <section className="flex flex-col w-10/12 md:w-3/4  gap-4">
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                <Input
                    type="text"
                    label="Marca"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                />
                <Input
                    type="text"
                    label="Modelo"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                />
            </div>
            <div className="flex flex-col gap-3">
                <CheckboxGroup
                    label="Seleccione la falla del equipo"
                    color="warning"
                    value={repairType}
                    onValueChange={setRepairType}>
                    <div className="flex flex-col w-3/4 gap-4">
                        <div className="flex md:flex-row flex-col gap-3">
                            <Checkbox value=" Pantalla">Pantalla</Checkbox>
                            <Checkbox value=" Bateria">Bateria</Checkbox>
                            <Checkbox value=" Carga">Carga</Checkbox>
                            <Checkbox value=" Placa">Placa</Checkbox>
                            <Checkbox value=" Boton">Boton</Checkbox>
                        </div>
                        <div className="flex md:flex-row flex-col gap-3">
                            <Checkbox value=" Camara"> Camara</Checkbox>
                            <Checkbox value=" Parlante"> Parlante</Checkbox>
                            <Checkbox value=" Microfono"> Microfono</Checkbox>
                            <Checkbox value=" Software"> Software</Checkbox>
                            <Checkbox value=" Otro"> Otro</Checkbox>
                        </div>
                    </div>
                </CheckboxGroup>
                <p className="text-default-500 text-small">
                    fallas: {repairType.filter(type => type.trim() !== "").join(", ")}
                </p>
            </div>

            <div className="flex flex-row  justify-center items-center gap-4">
                <Textarea
                    label="Descripción de la falla"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div className="flex flex-row justify-center items-center gap-4">
                <Button 
                as={"a"}
                color="success"
                href={`https://wa.me/5491151034595?text=${whatsappMessage}`}
                size="lg"
                >
                        Enviar a WhatsApp <BsWhatsapp />
                </Button>
            </div>
        </section>
    );
}
