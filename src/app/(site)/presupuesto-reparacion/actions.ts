"use server";

import { redirect } from "next/navigation";

const WHATSAPP_URL = "https://wa.me/5491151034595";

function getValue(formData: FormData, key: string) {
    return String(formData.get(key) || "").trim();
}

export async function submitRepairLead(formData: FormData) {
    const brand = getValue(formData, "brand");
    const model = getValue(formData, "model");
    const description = getValue(formData, "description");
    const contact = getValue(formData, "contact");
    const repairTypes = formData
        .getAll("repairType")
        .map((value) => String(value).trim())
        .filter(Boolean);

    const message = [
        "Hola! Quiero pedir un presupuesto de reparacion.",
        brand ? `Marca: ${brand}` : null,
        model ? `Modelo: ${model}` : null,
        repairTypes.length ? `Falla: ${repairTypes.join(", ")}` : null,
        description ? `Descripcion: ${description}` : null,
        contact ? `Contacto preferido: ${contact}` : null,
    ]
        .filter(Boolean)
        .join("\n");

    redirect(`${WHATSAPP_URL}?text=${encodeURIComponent(message)}`);
}
