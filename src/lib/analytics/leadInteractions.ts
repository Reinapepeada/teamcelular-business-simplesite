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

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: Record<string, unknown>) => void;
  }
}

/**
 * Mirrors the interaction into GA4. Every lead path (CTA links, branch
 * WhatsApp buttons, budget form steps) funnels through recordLeadInteraction,
 * so this is the one place that has to know about gtag. Without it GA4 only
 * sees page views and there is nothing to mark as a key event.
 */
function sendToGa4(payload: LeadInteractionPayload) {
  if (typeof window.gtag !== "function") return;

  window.gtag("event", payload.eventName, {
    cta_name: payload.ctaName,
    cta_location: payload.ctaLocation,
    cta_variant: payload.ctaVariant,
    destination: payload.destination,
    form_name: payload.formName,
    step_id: payload.stepId,
    brand: payload.brand,
    model: payload.model,
    repair_type: payload.repairType,
    contact_channel: payload.contactChannel,
  });
}

export function recordLeadInteraction(payload: LeadInteractionPayload): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  sendToGa4(payload);

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
