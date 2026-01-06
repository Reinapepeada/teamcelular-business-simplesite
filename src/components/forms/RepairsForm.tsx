"use client";
import React, { useState } from "react";
import {
    Input,
    Textarea,
    Button,
    Checkbox,
    CheckboxGroup,
} from "@nextui-org/react";
import { BsWhatsapp } from "react-icons/bs";
import Link from "next/link";

export default function RepairForm() {
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [repairType, setRepairType] = useState<string[]>([]);
    const [description, setDescription] = useState("");

    const whatsappMessage = [
        "Hola! Quiero un presupuesto de reparación.",
        brand ? `Marca: ${brand}` : null,
        model ? `Modelo: ${model}` : null,
        repairType.length ? `Falla: ${repairType.join(", ")}` : null,
        description ? `Descripción: ${description}` : null,
    ]
        .filter(Boolean)
        .join("\n");

    const whatsappUrl = `https://wa.me/5491151034595?text=${encodeURIComponent(
        whatsappMessage
    )}`;

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
                            <Checkbox value="Pantalla">Pantalla</Checkbox>
                            <Checkbox value="Batería">Batería</Checkbox>
                            <Checkbox value="Carga">Carga</Checkbox>
                            <Checkbox value="Placa">Placa</Checkbox>
                            <Checkbox value="Botón">Botón</Checkbox>
                        </div>
                        <div className="flex md:flex-row flex-col gap-3">
                            <Checkbox value="Cámara">Cámara</Checkbox>
                            <Checkbox value="Parlante">Parlante</Checkbox>
                            <Checkbox value="Micrófono">Micrófono</Checkbox>
                            <Checkbox value="Software">Software</Checkbox>
                            <Checkbox value="Otro">Otro</Checkbox>
                        </div>
                    </div>
                </CheckboxGroup>
                <p className="text-default-500 text-small">
                    fallas: {repairType.join(", ")}
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
                as={Link}
                color="success"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                >
                        Enviar a WhatsApp <BsWhatsapp />
                </Button>
            </div>
        </section>
    );
}
