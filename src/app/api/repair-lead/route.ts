import { NextResponse } from "next/server";

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
  contact: string;
  wizardSource?: string;
  metadata?: {
    ip?: string;
    userAgent?: string;
    referrer?: string;
  };
};

type LeadCreateResponse = {
  data?: {
    whatsappUrl?: string;
  };
};

function getValue(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function hasRequiredFields(payload: LeadCreatePayload): boolean {
  return Boolean(
    payload.brand &&
      payload.model &&
      payload.repairType &&
      payload.urgency &&
      payload.contactChannel &&
      payload.contact,
  );
}

function buildFallbackWhatsappUrl(message: string): string {
  return `https://wa.me/${FALLBACK_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

async function createLeadAndGetWhatsappUrl(payload: LeadCreatePayload): Promise<string | null> {
  if (!API_BASE_URL) {
    console.error("repair-lead route: API base URL is not configured");
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
      console.error("repair-lead route: lead persistence failed", response.status, errorBody);
      return null;
    }

    const body = (await response.json().catch(() => null)) as LeadCreateResponse | null;
    return body?.data?.whatsappUrl || null;
  } catch (error) {
    console.error("repair-lead route: lead persistence request failed", error);
    return null;
  }
}

export async function POST(request: Request) {
  const formData = await request.formData();
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

  const clientIpHeader = request.headers.get("x-forwarded-for") || "";
  const clientIp = clientIpHeader.split(",")[0]?.trim() || undefined;
  const userAgent = request.headers.get("user-agent") || undefined;
  const referrer = request.headers.get("referer") || undefined;

  const payload: LeadCreatePayload = {
    brand,
    model,
    repairType,
    urgency,
    description: description || undefined,
    contactChannel,
    contact,
    wizardSource: wizardSource || undefined,
    metadata: {
      ip: clientIp,
      userAgent,
      referrer,
    },
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
      return NextResponse.redirect(whatsappUrl, { status: 303 });
    }
  }

  return NextResponse.redirect(buildFallbackWhatsappUrl(message), { status: 303 });
}
