/**
 * Negociación de contenido para agentes (acceptmarkdown.com).
 *
 * La misma URL sirve HTML al navegador y Markdown a quien lo pida con
 * `Accept: text/markdown`. Acá vive la lógica pura —elegir el tipo, convertir
 * el HTML ya renderizado y armar el 404— para poder probarla con `npm test`.
 * El cableado está en `src/proxy.ts` y `src/app/api/markdown/[[...slug]]`.
 */

export const SITE_URL = "https://teamcelular.com";

const PRODUCES = ["text/html", "text/markdown"] as const;
export type Representation = (typeof PRODUCES)[number];

type AcceptEntry = { type: string; q: number; specificity: number };

function parseAccept(header: string): AcceptEntry[] {
    return header
        .split(",")
        .map((raw) => {
            const [type = "", ...params] = raw.split(";").map((s) => s.trim());
            let q = 1;
            for (const param of params) {
                const [name, value] = param.split("=").map((s) => s.trim());
                if (name?.toLowerCase() === "q") {
                    const parsed = Number(value);
                    if (!Number.isNaN(parsed)) q = Math.max(0, Math.min(1, parsed));
                }
            }
            const t = type.toLowerCase();
            const specificity = t === "*/*" ? 0 : t.endsWith("/*") ? 1 : 2;
            return { type: t, q, specificity };
        })
        .filter((e) => e.type.includes("/"));
}

function matches(entry: AcceptEntry, candidate: string): boolean {
    if (entry.type === "*/*") return true;
    if (entry.type.endsWith("/*")) return candidate.startsWith(entry.type.slice(0, -1));
    return entry.type === candidate;
}

/**
 * Qué representación servir según RFC 9110 §12.5.1: gana el q más alto, el
 * rango más específico pisa al comodín y el empate lo decide el orden del
 * cliente. Sin header, vacío o `*\/*` → HTML. `null` = nada aceptable (406).
 */
export function preferredType(header: string | null): Representation | null {
    if (!header || !header.trim()) return "text/html";
    const entries = parseAccept(header);
    if (entries.length === 0) return "text/html";

    let best: Representation | null = null;
    let bestQ = -1;
    let bestPosition = Infinity;

    for (const candidate of PRODUCES) {
        let matched: AcceptEntry | null = null;
        let matchedPosition = Infinity;
        entries.forEach((e, idx) => {
            if (!matches(e, candidate)) return;
            if (matched === null || e.specificity > matched.specificity) {
                matched = e;
                matchedPosition = idx;
            }
        });
        if (matched === null) continue;
        const q = (matched as AcceptEntry).q;
        if (q <= 0) continue;
        if (q > bestQ || (q === bestQ && matchedPosition < bestPosition)) {
            best = candidate;
            bestQ = q;
            bestPosition = matchedPosition;
        }
    }
    return best;
}

/** Agrega `Accept` al Vary sin pisar lo que ya puso Next. */
export function withVaryAccept(existing: string | null): string {
    if (!existing) return "Accept";
    const tokens = existing.split(",").map((s) => s.trim().toLowerCase());
    return tokens.includes("accept") || tokens.includes("*") ? existing : `${existing}, Accept`;
}

const ENTITIES: Record<string, string> = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"',
    apos: "'",
    nbsp: " ",
};

function decodeEntities(text: string): string {
    return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (whole, code: string) => {
        if (code[0] === "#") {
            const n = code[1].toLowerCase() === "x" ? parseInt(code.slice(2), 16) : Number(code.slice(1));
            return Number.isFinite(n) ? String.fromCodePoint(n) : whole;
        }
        return ENTITIES[code.toLowerCase()] ?? whole;
    });
}

const stripTags = (html: string) => html.replace(/<[^>]*>/g, "");
// Los bloques dentro de un link o título (tarjetas) se separan con espacio, no se pegan.
const inline = (html: string) =>
    decodeEntities(stripTags(html.replace(/<\/?(div|p|h[1-6]|li|br)\b[^>]*>/gi, " ")))
        .replace(/\s+/g, " ")
        .trim();

function absolute(href: string, base: string): string | null {
    const h = decodeEntities(href).trim();
    if (!h || h.startsWith("#") || /^javascript:/i.test(h)) return null;
    try {
        return new URL(h, base).toString();
    } catch {
        return null;
    }
}

/**
 * HTML renderizado → Markdown legible. Toma `<main>` (o el `<body>` sin
 * header/nav/footer) y conserva lo que le sirve a un agente: títulos,
 * párrafos, listas, links, negritas y tablas.
 * ponytail: conversor por regex sobre HTML propio y bien formado; si aparecen
 * páginas con marcado raro, pasar a un parser real (turndown).
 */
export function htmlToMarkdown(html: string, pageUrl: string): string {
    const title = inline(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "");
    const description = decodeEntities(
        html.match(/<meta[^>]+name="description"[^>]+content="([^"]*)"/i)?.[1] ?? "",
    ).trim();

    let body =
        html.match(/<main[^>]*>([\s\S]*)<\/main>/i)?.[1] ??
        (html.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? html).replace(
            /<(header|nav|footer)\b[\s\S]*?<\/\1>/gi,
            "",
        );

    body = body
        .replace(/<!--[\s\S]*?-->/g, "")
        .replace(/<(script|style|noscript|svg|template|iframe|button|form|select)\b[\s\S]*?<\/\1>/gi, "")
        .replace(/<img\b[^>]*>/gi, "")
        .replace(/<a\b[^>]*?href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href: string, inner: string) => {
            const text = inline(inner);
            const url = absolute(href, pageUrl);
            if (!text) return "";
            return url ? ` [${text}](${url}) ` : ` ${text} `;
        })
        .replace(/<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_, _t, inner: string) => {
            const t = inline(inner);
            return t ? ` **${t}** ` : "";
        })
        .replace(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi, (_, level: string, inner: string) => {
            const t = inline(inner).replace(/\*\*/g, "");
            return t ? `\n\n${"#".repeat(Number(level))} ${t}\n\n` : "";
        })
        .replace(/<li\b[^>]*>/gi, "\n- ")
        .replace(/<\/t[hd]>/gi, " | ")
        .replace(/<tr\b[^>]*>/gi, "\n| ")
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<\/tr>/gi, "")
        .replace(/<\/?(p|div|section|article|aside|ul|ol|table|thead|tbody|details|summary|dl|dt|dd|blockquote|figure|figcaption|address|header|footer|nav)\b[^>]*>/gi, "\n\n");

    const text = decodeEntities(stripTags(body))
        .split("\n")
        .map((line) => line.replace(/\s+/g, " ").replace(/ ([.,;:!?)])/g, "$1").trim())
        .join("\n")
        .replace(/\n- \n/g, "\n")
        .replace(/\n{3,}/g, "\n\n")
        .trim();

    // Sin H1 propio, el <title> y la meta description hacen de encabezado.
    const head = /^# /m.test(text)
        ? []
        : [`# ${title || pageUrl}`, description ? `> ${description}` : ""].filter(Boolean);

    return `${[...head, text].join("\n\n")}\n\nFuente: ${pageUrl}\n`;
}

/** Cuerpo del 404 para agentes: dónde seguir buscando. */
export function notFoundMarkdown(pathname: string): string {
    return `# 404 — Página no encontrada

No existe ninguna página en \`${pathname}\` en teamcelular.com.

## Dónde seguir

- [Inicio](${SITE_URL}/): reparación de celulares en CABA, precios y sucursales.
- [llms.txt](${SITE_URL}/llms.txt): índice para agentes con las páginas canónicas y cuándo recomendarnos.
- [Sitemap XML](${SITE_URL}/sitemap.xml): todas las URLs indexables.
- [Reparaciones](${SITE_URL}/reparaciones): servicios y precios de referencia.
- [Sucursales](${SITE_URL}/sucursales): direcciones y horarios en Recoleta y Belgrano.
- [Contacto](${SITE_URL}/contacto): WhatsApp +54 11 5103-4595 y email.

Cualquier página se puede pedir en Markdown con el header \`Accept: text/markdown\` o agregando \`.md\` a la URL.
`;
}
