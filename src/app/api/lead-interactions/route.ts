import { NextResponse } from "next/server";

const API_BASE_URL =
  (process.env.NEXT_PUBLIC_API_URL?.trim() || process.env.API_URL?.trim() || "").replace(/\/+$/, "");

type LeadInteractionPayload = {
  eventName?: string;
  ctaName?: string;
  ctaLocation?: string;
  ctaVariant?: string;
  destination?: string;
  pagePath?: string;
  pageTitle?: string;
  leadId?: string;
  leadAttemptId?: string;
  formName?: string;
  formLocation?: string;
  formVersion?: string;
  stepIndex?: number;
  stepId?: string;
  stepLabel?: string;
  totalSteps?: number;
  brand?: string;
  model?: string;
  repairType?: string;
  urgency?: string;
  contactChannel?: string;
  contact?: string;
  description?: string;
  referrer?: string;
};

function hasRequiredFields(payload: LeadInteractionPayload): boolean {
  return Boolean(payload.eventName && payload.ctaName && payload.ctaLocation && payload.ctaVariant && payload.pagePath);
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as LeadInteractionPayload | null;

  if (!body || !hasRequiredFields(body)) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  if (!API_BASE_URL) {
    console.warn("lead-interactions route: API base URL is not configured");
    return new NextResponse(null, { status: 204 });
  }

  const clientIpHeader = request.headers.get("x-forwarded-for") || "";
  const clientIp = clientIpHeader.split(",")[0]?.trim() || undefined;
  const userAgent = request.headers.get("user-agent") || undefined;
  const referrer = request.headers.get("referer") || body.referrer || undefined;

  const payload = {
    ...body,
    metadata: {
      ip: clientIp,
      userAgent,
      referrer,
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}/v1/leads/interactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorBody = await response.text().catch(() => "");
      console.warn("lead-interactions route: persistence failed", response.status, errorBody);
      return new NextResponse(null, { status: 204 });
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.warn("lead-interactions route: persistence request failed", error);
    return new NextResponse(null, { status: 204 });
  }
}
