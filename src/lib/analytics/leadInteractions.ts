import type { BranchSlug } from "@/lib/branchPreference";
import { measure } from "./posthog";

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
  preferredBranch?: BranchSlug;
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
  // El parámetro de GA4 no amplía el contrato del endpoint de interacciones.
  const interaction = { ...payload };
  delete interaction.preferredBranch;
  const pagePath =
    payload.pagePath ||
    (typeof window !== "undefined"
      ? `${window.location.pathname}${window.location.search}`
      : "");

  const pageTitle = payload.pageTitle || (typeof document !== "undefined" ? document.title : undefined);
  const referrer = typeof document !== "undefined" && document.referrer ? document.referrer : undefined;

  return {
    ...interaction,
    pagePath,
    pageTitle,
    referrer,
  };
}

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: Record<string, unknown>) => void;
    /** Tag de Microsoft Clarity; se carga en el layout raiz. */
    clarity?: (command: string, ...args: unknown[]) => void;
  }
}

/** Comparte categorías de interacción con GA4 y PostHog, sin respuestas ni destinos. */
function sendMeasurement(payload: LeadInteractionPayload) {
  measure(payload.eventName, {
    cta_name: payload.ctaName,
    cta_location: payload.ctaLocation,
    cta_variant: payload.ctaVariant,
    form_name: payload.formName,
    form_version: payload.formVersion,
    preferred_branch: payload.preferredBranch,
    step_id: payload.stepId,
    form_location: payload.formLocation,
    step_index: payload.stepIndex,
    total_steps: payload.totalSteps,
    conversion_kind: ["branch_whatsapp_redirect", "lead_form_submit", "whatsapp_click"].includes(payload.eventName)
      || (payload.eventName === "cta_click" && payload.ctaVariant === "whatsapp") ? "whatsapp_handoff" : "interaction",
  });
}

export function recordLeadInteraction(payload: LeadInteractionPayload): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  sendMeasurement(payload);

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
