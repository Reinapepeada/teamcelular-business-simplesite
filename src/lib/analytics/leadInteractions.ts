export type LeadInteractionCtaVariant =
  | "primary"
  | "secondary"
  | "whatsapp"
  | "phone"
  | "email"
  | "instagram"
  | "other";

export interface LeadInteractionPayload {
  eventName: string;
  ctaName: string;
  ctaLocation: string;
  ctaVariant: LeadInteractionCtaVariant;
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
}

const LEAD_INTERACTIONS_ENDPOINT = "/api/lead-interactions";

function buildPayload(payload: LeadInteractionPayload) {
  const pagePath =
    payload.pagePath ||
    (typeof window !== "undefined"
      ? `${window.location.pathname}${window.location.search}`
      : "");

  const pageTitle = payload.pageTitle || (typeof document !== "undefined" ? document.title : undefined);
  const referrer = typeof document !== "undefined" && document.referrer ? document.referrer : undefined;

  return {
    ...payload,
    pagePath,
    pageTitle,
    referrer,
  };
}

export function recordLeadInteraction(payload: LeadInteractionPayload): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const body = JSON.stringify(buildPayload(payload));

  try {
    if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
      return navigator.sendBeacon(
        LEAD_INTERACTIONS_ENDPOINT,
        new Blob([body], { type: "application/json" })
      );
    }
  } catch {
    // Fall back to a keepalive fetch below.
  }

  void fetch(LEAD_INTERACTIONS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
    keepalive: true,
    cache: "no-store",
  }).catch(() => undefined);

  return true;
}
