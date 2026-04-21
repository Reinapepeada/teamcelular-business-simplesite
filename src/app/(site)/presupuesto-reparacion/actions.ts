"use server";

import { redirect } from "next/navigation";

const API_BASE_URL =
    (process.env.NEXT_PUBLIC_API_URL?.trim() || process.env.API_URL?.trim() || "").replace(/\/+$/, "");
const FALLBACK_WHATSAPP_NUMBER =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D+/g, "") || "5491151034595";

type LeadCreatePayload = {
    brand: string;
    model: string;
    repairType: string;
    urgency: string;
    description?: string;
    contactChannel: string;
    contact?: string;
    wizardSource?: string;
};

type LeadCreateResponse = {
    data?: {
        whatsappUrl?: string;
    };
};

function getValue(formData: FormData, key: string) {
    return String(formData.get(key) || "").trim();
}

function buildFallbackWhatsappUrl(message: string): string {
    return `https://wa.me/${FALLBACK_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function hasRequiredFields(payload: LeadCreatePayload): boolean {
    return Boolean(
        payload.brand &&
            payload.model &&
            payload.repairType &&
            payload.urgency &&
            payload.contactChannel,
    );
}

async function createLeadAndGetWhatsappUrl(payload: LeadCreatePayload): Promise<string | null> {
    if (!API_BASE_URL) {
        console.error("submitRepairLead action: API base URL is not configured");
        return null;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/v1/leads/repair`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
            cache: "no-store",
        });

        if (!response.ok) {
            const errorBody = await response.text().catch(() => "");
            console.error("submitRepairLead action: lead persistence failed", response.status, errorBody);
            return null;
        }

        const body = (await response.json().catch(() => null)) as LeadCreateResponse | null;
        return body?.data?.whatsappUrl || null;
    } catch (error) {
        console.error("submitRepairLead action: lead persistence request failed", error);
        return null;
    }
}

export async function submitRepairLead(formData: FormData) {
    const brand = getValue(formData, "brand");
    const model = getValue(formData, "model");
    const urgency = getValue(formData, "urgency");
    const description = getValue(formData, "description");
    const contactChannel = getValue(formData, "contactChannel");
    const contact = getValue(formData, "contact");
    const wizardSource = getValue(formData, "wizardSource");
    const repairTypes = formData
        .getAll("repairType")
        .map((value) => String(value).trim())
        .filter(Boolean);
    const repairType = repairTypes.join(", ");

    const payload: LeadCreatePayload = {
        brand,
        model,
        repairType,
        urgency,
        description: description || undefined,
        contactChannel,
        contact: contact || undefined,
        wizardSource: wizardSource || undefined,
    };

    const message = [
        "Hola! Quiero pedir un presupuesto de reparacion.",
        brand ? `Marca: ${brand}` : null,
        model ? `Modelo: ${model}` : null,
        repairTypes.length ? `Falla: ${repairTypes.join(", ")}` : null,
        urgency ? `Urgencia: ${urgency}` : null,
        description ? `Descripcion: ${description}` : null,
        contactChannel ? `Canal preferido: ${contactChannel}` : null,
        contact ? `Contacto preferido: ${contact}` : null,
    ]
        .filter(Boolean)
        .join("\n");

    if (hasRequiredFields(payload)) {
        const whatsappUrl = await createLeadAndGetWhatsappUrl(payload);
        if (whatsappUrl) {
            redirect(whatsappUrl);
        }
    }

    redirect(buildFallbackWhatsappUrl(message));
}
