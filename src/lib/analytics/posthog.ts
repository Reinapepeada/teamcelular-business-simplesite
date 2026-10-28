import type { CaptureResult, PostHog } from "posthog-js";
import { BUDGET_FUNNEL_EVENTS, BUDGET_FUNNEL_FORM_NAME } from "./budgetFunnel";
import { isGa4ProductionHost } from "./ga4";

const EVENTS = new Set<string>(["$pageview", ...Object.values(BUDGET_FUNNEL_EVENTS)]);

declare global {
  interface Window {
    posthog?: PostHog;
  }
}
const PROPERTIES = new Set([
  "token", "distinct_id", "$device_id", "$session_id", "$window_id",
  "$lib", "$lib_version", "$is_identified", "$process_person_profile",
  "$browser", "$browser_version", "$os", "$os_version", "$device_type",
  "$screen_height", "$screen_width", "$viewport_height", "$viewport_width",
  "funnel_name", "form_name", "form_location", "form_version",
  "step_id", "step_index", "total_steps", "wizard_source",
]);

export function isPostHogPublicPage(hostname: string, pathname: string): boolean {
  return isGa4ProductionHost(hostname) && !/^\/(admin|checkout)(\/|$)/i.test(pathname);
}

// ponytail: una lista permitida evita reenviar respuestas, destinos de WhatsApp o parámetros de URL.
export function sanitizePostHogEvent(event: CaptureResult | null): CaptureResult | null {
  if (!event || !EVENTS.has(event.event)) return null;
  if (event.event !== "$pageview" && event.properties.form_name !== BUDGET_FUNNEL_FORM_NAME) return null;

  let url: URL;
  try {
    url = new URL(event.properties.$current_url);
  } catch {
    return null;
  }
  if (!isPostHogPublicPage(url.hostname, url.pathname)) return null;

  event.properties = Object.fromEntries(
    Object.entries(event.properties).filter(([key]) => PROPERTIES.has(key)),
  );
  event.properties.$current_url = `${url.origin}${url.pathname}`;
  event.properties.$pathname = url.pathname;
  return event;
}

export function capturePostHogEvent(eventName: string, properties: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || !isPostHogPublicPage(window.location.hostname, window.location.pathname)) return;
  if (!EVENTS.has(eventName) || properties.form_name !== BUDGET_FUNNEL_FORM_NAME) return;
  window.posthog?.capture(eventName, properties);
}
