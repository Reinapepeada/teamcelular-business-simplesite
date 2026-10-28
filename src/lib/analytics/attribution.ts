import { channel, safeLabel } from "./measurement";

export function acquisition(url: string, referrer: string): Record<string, string> {
  const current = new URL(url);
  let domain = "";
  try { domain = new URL(referrer).hostname; } catch { /* Entrada directa. */ }
  if (domain === current.hostname || ["teamcelular.com", "www.teamcelular.com"].includes(domain)) domain = "";
  // Mercado Pago es una vuelta del checkout, no un nuevo canal de adquisición.
  if (/(^|\.)(mercadopago\.(com|com\.ar)|mercadolibre\.com)$/.test(domain)) domain = "";
  const campaign = Object.fromEntries(["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]
    .flatMap(key => { const value = safeLabel(current.searchParams.get(key)); return value ? [[key, value]] : []; }));
  const source = campaign.utm_source || domain || "direct";
  const medium = campaign.utm_medium || (domain ? "referral" : "none");
  return { ...campaign, utm_source: source, utm_medium: medium,
    referrer_domain: domain || "direct", entry_path: current.pathname,
    acquisition_channel: channel(source.toLowerCase(), medium.toLowerCase()) };
}

export function browserAttribution(): Record<string, unknown> {
  if (typeof window === "undefined" || typeof window.location?.href !== "string") return {};
  const current = acquisition(window.location.href, typeof document === "undefined" ? "" : document.referrer);
  try {
    const now = Date.now();
    const raw = window.localStorage.getItem("tc.analytics.attribution.v1");
    const stored = raw ? JSON.parse(raw) : null;
    const fresh = stored && typeof stored.updated === "number" && now - stored.updated < 30 * 60 * 1000;
    const session = fresh ? stored.session : current;
    const first = stored?.first && now - stored.created < 90 * 24 * 60 * 60 * 1000 ? stored.first : current;
    window.localStorage.setItem("tc.analytics.attribution.v1", JSON.stringify({
      first, session, created: first === current ? now : stored.created, updated: now,
    }));
    return { ...session, first_source: first.utm_source, first_medium: first.utm_medium,
      first_campaign: first.utm_campaign, first_landing_path: first.entry_path };
  } catch {
    return current;
  }
}
