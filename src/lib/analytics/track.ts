import { track as vercelTrack } from "@vercel/analytics";

type Props = Record<string, string | number | boolean | null>;

/**
 * Despacha el mismo evento a Vercel Analytics y a GA4.
 *
 * El embudo del presupuesto (budget_wizard_view, _step_view, _step_complete,
 * _step_back, _abandon) se enviaba solo a Vercel, asi que el dato de en que
 * paso abandona la gente no era consultable desde GA4, que es donde se cruzan
 * las sesiones con su origen de busqueda.
 *
 * Reemplaza a `track` de @vercel/analytics: misma firma, dos destinos.
 */
export function track(eventName: string, props?: Props) {
  vercelTrack(eventName, props ?? {});

  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, props ?? {});
  }
}
