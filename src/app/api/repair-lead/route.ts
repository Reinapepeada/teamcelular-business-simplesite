import { createHash } from "crypto";
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

type LeadPersistenceResult = {
  whatsappUrl: string | null;
  fallbackReason?: string;
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

function getMissingRequiredFields(payload: LeadCreatePayload): string[] {
  const requiredFields: Array<keyof LeadCreatePayload> = [
    "brand",
    "model",
    "repairType",
    "urgency",
    "contactChannel",
    "contact",
  ];

  return requiredFields.filter((field) => !String(payload[field] || "").trim());
}

function buildFallbackWhatsappUrl(message: string): string {
  return `https://wa.me/${FALLBACK_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function buildIdempotencyKey(
  payload: LeadCreatePayload,
  leadAttemptId: string,
  clientIp?: string,
  userAgent?: string,
): string {
  if (leadAttemptId) {
    return createHash("sha256").update(`lead-attempt:${leadAttemptId}`).digest("hex");
  }

  const dedupeWindowBucket = Math.floor(Date.now() / (5 * 60 * 1000));
  const serialized = JSON.stringify({
    brand: payload.brand.toLowerCase(),
    model: payload.model.toLowerCase(),
    repairType: payload.repairType.toLowerCase(),
    urgency: payload.urgency,
    contactChannel: payload.contactChannel,
    contact: payload.contact.toLowerCase(),
    description: payload.description || null,
    wizardSource: payload.wizardSource || null,
    clientIp: clientIp || null,
    userAgent: userAgent || null,
    dedupeWindowBucket,
  });

  return createHash("sha256").update(serialized).digest("hex");
}

async function createLeadAndGetWhatsappUrl(
  payload: LeadCreatePayload,
  idempotencyKey: string,
): Promise<LeadPersistenceResult> {
  if (!API_BASE_URL) {
    console.error("repair-lead route: API base URL is not configured");
    return {
      whatsappUrl: null,
      fallbackReason: "api_base_url_missing",
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/v1/leads/repair`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorBody = await response.text().catch(() => "");
      console.error("repair-lead route: lead persistence failed", response.status, errorBody);
      return {
        whatsappUrl: null,
        fallbackReason: `api_status_${response.status}`,
      };
    }

    const body = (await response.json().catch(() => null)) as LeadCreateResponse | null;
    if (!body?.data?.whatsappUrl) {
      return {
        whatsappUrl: null,
        fallbackReason: "api_response_without_whatsapp_url",
      };
    }

    return {
      whatsappUrl: body.data.whatsappUrl,
    };
  } catch (error) {
    console.error("repair-lead route: lead persistence request failed", error);
    return {
      whatsappUrl: null,
      fallbackReason: "api_request_failed",
    };
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
  const leadAttemptId = getValue(formData, "leadAttemptId");
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

  const idempotencyKey = buildIdempotencyKey(payload, leadAttemptId, clientIp, userAgent);

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

  let fallbackReason = "missing_required_fields";
  const missingRequiredFields = getMissingRequiredFields(payload);

  if (hasRequiredFields(payload)) {
    const leadResult = await createLeadAndGetWhatsappUrl(payload, idempotencyKey);
    if (leadResult.whatsappUrl) {
      return NextResponse.redirect(leadResult.whatsappUrl, { status: 303 });
    }

    fallbackReason = leadResult.fallbackReason || "lead_persistence_failed";
  }

  console.warn("repair-lead route: fallback whatsapp redirect", {
    fallbackReason,
    missingRequiredFields,
    brand,
    model,
    repairType,
    urgency,
    contactChannel,
    wizardSource: wizardSource || "unknown",
    idempotencyKeyPrefix: idempotencyKey.slice(0, 12),
  });

  const fallbackResponse = NextResponse.redirect(buildFallbackWhatsappUrl(message), { status: 303 });
  fallbackResponse.headers.set("x-lead-fallback-reason", fallbackReason);

  return fallbackResponse;
}
