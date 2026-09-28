import { htmlToMarkdown, notFoundMarkdown, SITE_URL } from "@/lib/agentMarkdown";

/**
 * Representación Markdown de cualquier página. No se llama directo: `src/proxy.ts`
 * reescribe acá cuando el cliente prefiere `Accept: text/markdown`. Pide la
 * misma página en HTML (ya prerenderizada/cacheada) y la convierte.
 */
export async function GET(
    req: Request,
    { params }: { params: Promise<{ slug?: string[] }> },
) {
    const { slug = [] } = await params;
    const pathname = `/${slug.map(encodeURIComponent).join("/")}`;
    const headers = {
        "Content-Type": "text/markdown; charset=utf-8",
        Vary: "Accept",
    };

    // Nunca convertir rutas de API (evita que se llame a sí mismo en bucle).
    if (slug[0] === "api") {
        return new Response(notFoundMarkdown(pathname), {
            status: 404,
            headers: { ...headers, "Cache-Control": "public, s-maxage=300" },
        });
    }

    const { search } = new URL(req.url);
    const page = await fetch(new URL(pathname + search, req.url), {
        headers: { accept: "text/html" },
    });

    if (page.status === 404 || page.status === 410) {
        return new Response(notFoundMarkdown(pathname), {
            status: page.status,
            headers: { ...headers, "Cache-Control": "public, s-maxage=300" },
        });
    }
    if (!page.ok) {
        return new Response(`# Error ${page.status}\n\nNo pudimos generar esta página. Probá de nuevo en unos minutos.\n`, {
            status: 502,
            headers: { ...headers, "Cache-Control": "no-store" },
        });
    }

    const markdown = htmlToMarkdown(await page.text(), `${SITE_URL}${pathname}`);
    return new Response(markdown, {
        headers: { ...headers, "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
    });
}
