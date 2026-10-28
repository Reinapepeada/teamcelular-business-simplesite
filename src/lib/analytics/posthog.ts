import type { CaptureResult, PostHog } from "posthog-js";
import { isGa4ProductionHost } from "./ga4";
import { MEASUREMENT_EVENTS, pageType, sanitizeMeasurementProperties } from "./measurement";
import { browserAttribution } from "./attribution";
import { sanitizePostHogException } from "./posthogErrors";

declare global {
  interface Window {
    posthog?: PostHog;
    tcMeasure?: typeof measure;
  }
}
const PROPERTIES = new Set([
  "token", "distinct_id", "$device_id", "$session_id", "$window_id",
  "$lib", "$lib_version", "$is_identified", "$process_person_profile",
  "$browser", "$browser_version", "$os", "$os_version", "$device_type",
  "$screen_height", "$screen_width", "$viewport_height", "$viewport_width",
]);

export function isPostHogPublicPage(hostname: string, pathname: string): boolean {
  return isGa4ProductionHost(hostname) && !/^\/(admin|api)(\/|$)/i.test(pathname);
}

export function isPostHogErrorPage(hostname: string, pathname: string): boolean {
  return isPostHogPublicPage(hostname, pathname) && !/^\/checkout(\/|$)/i.test(pathname);
}

// ponytail: una lista permitida evita reenviar respuestas, destinos de WhatsApp o parámetros de URL.
export function sanitizePostHogEvent(event: CaptureResult | null): CaptureResult | null {
  if (!event || (!MEASUREMENT_EVENTS.has(event.event) && event.event !== "$exception")) return null;

  let url: URL;
  try {
    url = new URL(event.properties.$current_url);
  } catch {
    return null;
  }
  if (!isPostHogPublicPage(url.hostname, url.pathname)) return null;
  if (url.pathname.startsWith("/checkout") && !["purchase", "payment_result", "checkout_error"].includes(event.event)) return null;
  if (event.event === "page_engagement" && typeof event.properties.content_path === "string"
    && /^\/(?!\/)[^?#]*$/.test(event.properties.content_path)) {
    url = new URL(event.properties.content_path, url.origin);
  }

  const exception = event.event === "$exception" ? sanitizePostHogException(event.properties) : null;
  if (event.event === "$exception" && (!exception || !isPostHogErrorPage(url.hostname, url.pathname))) return null;

  const metadata = Object.fromEntries(
    Object.entries(event.properties).filter(([key]) => PROPERTIES.has(key)),
  );
  event.properties = exception ? { ...metadata, ...exception } : { ...metadata, ...sanitizeMeasurementProperties({
    ...browserAttribution(), ...event.properties,
  }), measurement_version: 2, page_type: pageType(url.pathname) };
  event.properties.$current_url = `${url.origin}${url.pathname}`;
  event.properties.$pathname = url.pathname;
  return event;
}

export function capturePostHogEvent(eventName: string, properties: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || !window.location || !isPostHogPublicPage(window.location.hostname, window.location.pathname)) return;
  if (!MEASUREMENT_EVENTS.has(eventName)) return;
  try { window.posthog?.capture(eventName, sanitizeMeasurementProperties(properties)); } catch { /* Medir no interrumpe la compra. */ }
}

export function measure(eventName: string, properties: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || !window.location || !isPostHogPublicPage(window.location.hostname, window.location.pathname)
    || !MEASUREMENT_EVENTS.has(eventName) || window.navigator?.doNotTrack === "1") return;
  if (window.location.pathname?.startsWith("/checkout") && !["purchase", "payment_result", "checkout_error"].includes(eventName)) return;
  const safe = { ...sanitizeMeasurementProperties({ ...browserAttribution(), ...properties }),
    measurement_version: 2, page_type: pageType(eventName === "page_engagement" && typeof properties.content_path === "string"
      ? properties.content_path : window.location.pathname || "/") };
  capturePostHogEvent(eventName, safe);
  try { window.gtag?.("event", eventName, { ...safe,
    page_location: `${window.location.origin || "https://teamcelular.com"}${window.location.pathname || "/"}`,
  }); } catch { /* Cada destino es independiente. */ }
}

export function capturePostHogException(error: Error) {
  if (typeof window === "undefined" || !isPostHogErrorPage(window.location.hostname, window.location.pathname)) return;
  try { window.posthog?.captureException(error); } catch { /* Conservar la pantalla de recuperación. */ }
}
