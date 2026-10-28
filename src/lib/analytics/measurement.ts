// Contrato compartido por PostHog y GA4. Nunca recibe el cuerpo de un formulario.
export const MEASUREMENT_EVENTS = new Set([
  "$pageview", "$web_vitals", "cta_click", "cta_view", "whatsapp_click", "phone_click", "email_click", "directions_click",
  "branch_selector_open", "branch_selector_close", "branch_preference_selected", "branch_whatsapp_redirect",
  "branch_location_request", "branch_location_success", "branch_location_denied", "branch_location_error",
  "budget_wizard_view", "budget_wizard_step_view", "budget_wizard_step_complete", "budget_wizard_step_back",
  "budget_wizard_abandon", "budget_validation_error", "lead_form_submit",
  "page_engagement", "faq_open", "navigation_click", "client_error",
  "view_item_list", "select_item", "view_item", "add_to_cart", "remove_from_cart", "view_cart",
  "begin_checkout", "checkout_step_view", "checkout_validation_error", "checkout_error",
  "add_shipping_info", "add_payment_info", "payment_result", "purchase",
  "catalog_error", "catalog_no_results",
]);

const LABELS = new Set([
  "cta_name", "cta_location", "cta_variant", "preferred_branch", "selection_method",
  "form_name", "form_location", "form_version", "funnel_name", "step_id", "step_label", "wizard_source",
  "error_code", "field_name", "payment_result", "shipping_tier", "payment_type", "item_list_id",
  "item_id", "item_name", "item_variant", "page_type", "conversion_kind", "measurement_source",
  "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "referrer_domain",
  "entry_path", "content_path", "acquisition_channel", "first_source", "first_medium", "first_campaign", "first_landing_path",
]);
const NUMBERS = new Set([
  "value", "price", "quantity", "item_count", "step_index", "total_steps", "duration_ms", "engaged_seconds",
  "percent_scrolled", "result_count", "invalid_field_count", "faq_index", "page_number", "filter_count", "shipping", "order_total",
  "$web_vitals_LCP_value", "$web_vitals_INP_value", "$web_vitals_CLS_value", "$web_vitals_FCP_value",
]);

export function safeLabel(value: unknown): string | undefined {
  return typeof value === "string" && value.length > 0 && value.length <= 120
    && /^[\p{L}\p{N}_.:/ -]+$/u.test(value) && !/\d{7,}|https?:\/\//i.test(value) ? value : undefined;
}

export function sanitizeMeasurementProperties(input: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(input)) {
    if (LABELS.has(key)) {
      const label = safeLabel(value);
      if (label !== undefined) result[key] = label;
    } else if (NUMBERS.has(key) && typeof value === "number" && Number.isFinite(value) && value >= 0) {
      result[key] = value;
    } else if (["has_search", "has_filters"].includes(key) && typeof value === "boolean") {
      result[key] = value;
    } else if (key === "currency" && typeof value === "string" && /^[A-Z]{3}$/.test(value)) {
      result[key] = value;
    } else if (key === "transaction_id" && typeof value === "string" && /^tc_[a-f0-9]{64}$/.test(value)) {
      result[key] = value;
    } else if (key === "items" && Array.isArray(value)) {
      result.items = value.slice(0, 100).flatMap(item => {
        if (!item || typeof item !== "object" || !safeLabel(item.item_id)) return [];
        return [sanitizeMeasurementProperties(Object.fromEntries(
          Object.entries(item).filter(([name]) => ["item_id", "item_name", "item_variant", "price", "quantity"].includes(name)),
        ))];
      });
    }
  }
  return result;
}

export function pageType(path: string): string {
  if (path === "/") return "home";
  if (path.startsWith("/checkout")) return "checkout";
  if (path === "/tienda" || path.startsWith("/tienda/categoria")) return "catalog";
  if (path.startsWith("/tienda/")) return "product";
  if (path.startsWith("/guias")) return "guide";
  if (path.startsWith("/reparaciones")) return "service";
  if (path.startsWith("/sucursales") || path.startsWith("/zonas")) return "location";
  if (path === "/presupuesto-reparacion") return "budget";
  return "other";
}

export function channel(source: string, medium: string): string {
  if (/^(cpc|ppc|paid|paid_social|display)$/.test(medium)) return "paid";
  if (/chatgpt|perplexity|claude|copilot|gemini/.test(source)) return "ai_referral";
  if (/google|bing|yahoo|duckduckgo/.test(source)) return "organic_search";
  if (/instagram|facebook|tiktok|linkedin|youtube/.test(source)) return "social";
  return source === "direct" ? "direct" : "referral";
}
