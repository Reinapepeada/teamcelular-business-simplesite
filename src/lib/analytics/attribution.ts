import { channel, safeLabel } from "./measurement";

const FIRST_TOUCH_KEYWORD_MS = 30 * 24 * 60 * 60 * 1000;

export function sanitizeReelKeyword(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const keyword = value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 24);
  return keyword || null;
}

const isSocial = (medium: unknown) => typeof medium === "string" && medium.toLowerCase() === "social";

/** Last-touch social de la sesión; si no, first-touch social de hasta 30 días. */
export function reelKeywordOf(
  session: Record<string, unknown> | undefined,
  first: Record<string, unknown> | undefined,
  firstCreatedAt: number | undefined,
  now: number,
): string | null {
  if (session && isSocial(session.utm_medium)) {
    const keyword = sanitizeReelKeyword(session.utm_content);
    if (keyword) return keyword;
  }
  if (first && isSocial(first.utm_medium) && typeof firstCreatedAt === "number"
    && now - firstCreatedAt < FIRST_TOUCH_KEYWORD_MS) {
    return sanitizeReelKeyword(first.utm_content);
  }
  return null;
}


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
    const created = first === current ? now : stored.created;
    const keyword = reelKeywordOf(session, first, created, now);
    return { ...session, first_source: first.utm_source, first_medium: first.utm_medium,
      first_campaign: first.utm_campaign, first_content: first.utm_content, first_term: first.utm_term,
      first_landing_path: first.entry_path, ...(keyword ? { reel_keyword: keyword } : {}) };
  } catch {
    const keyword = reelKeywordOf(current, undefined, undefined, Date.now());
    return keyword ? { ...current, reel_keyword: keyword } : current;
  }
}
