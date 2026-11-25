import { browserAttribution, sanitizeReelKeyword } from "./attribution";

export { reelKeywordOf, sanitizeReelKeyword } from "./attribution";

// Palabra clave del reel (utm_content) que trajo la visita: llega a WhatsApp y a los eventos medidos.
const WHATSAPP_HOSTS = new Set(["wa.me", "www.wa.me", "api.whatsapp.com"]);
const DEFAULT_TEXT = "Hola Team Celular!";

export function reelKeyword(): string | null {
  // Sin seguimiento pedido por el navegador no se agrega la palabra ni se lee el origen.
  if (typeof window === "undefined" || window.navigator?.doNotTrack === "1") return null;
  const value = browserAttribution().reel_keyword;
  return typeof value === "string" ? value : null;
}

export function isWhatsappUrl(href: string): boolean {
  try {
    return WHATSAPP_HOSTS.has(new URL(href).hostname.toLowerCase());
  } catch {
    return false;
  }
}

/** Agrega "(Vengo por PALABRA)" al texto prellenado de un enlace de WhatsApp, sin duplicarlo. */
export function withReelKeyword(href: string, keyword: string | null | undefined): string {
  const safe = sanitizeReelKeyword(keyword);
  if (!safe || !isWhatsappUrl(href)) return href;
  const url = new URL(href);
  const text = url.searchParams.get("text")?.trim() ?? "";
  if (new RegExp(`vengo por ${safe}(?![A-Z0-9])`, "i").test(text)) return href;
  const next = text ? `${text} (Vengo por ${safe})` : `${DEFAULT_TEXT} Vengo por ${safe}`;
  url.searchParams.delete("text");
  // encodeURIComponent y no searchParams: WhatsApp no siempre decodifica "+" como espacio.
  const query = url.search ? `${url.search}&` : "?";
  return `${url.origin}${url.pathname}${query}text=${encodeURIComponent(next)}${url.hash}`;
}

interface ClickTarget { closest?: (selector: string) => { href: string } | null }

/** Reescribe en captura el href de cualquier enlace a WhatsApp antes de que el navegador navegue. */
export function installReelWhatsappRewrite(
  doc: Pick<Document, "addEventListener">,
  keyword: () => string | null = reelKeyword,
) {
  const rewrite = (event: Event) => {
    const target = event.target as ClickTarget | null;
    const anchor = target?.closest?.("a[href]");
    if (!anchor || !isWhatsappUrl(anchor.href)) return;
    try {
      const next = withReelKeyword(anchor.href, keyword());
      if (next !== anchor.href) anchor.href = next;
    } catch { /* La atribución nunca bloquea el contacto. */ }
  };
  doc.addEventListener("click", rewrite, true);
  doc.addEventListener("auxclick", rewrite, true);
}
