import { NextResponse, type NextRequest, type NextFetchEvent } from "next/server";
import { preferredType, withVaryAccept } from "@/lib/agentMarkdown";
import { collectFardoBot } from "@/lib/fardoCrawler";
import { AI_FILES } from "@/lib/aiVisibility";

/**
 * Negociación HTML/Markdown por `Accept` (acceptmarkdown.com): misma URL,
 * `Vary: Accept` en ambas ramas y 406 si el cliente no acepta ninguna.
 */
export function proxy(req: NextRequest, event?: NextFetchEvent) {
    collectFardoBot(req, event);
    // Navegación RSC, prefetch y Server Actions traen su propio Accept: no negociar.
    if (
        (req.method !== "GET" && req.method !== "HEAD") ||
        req.headers.has("rsc") ||
        req.headers.has("next-action") ||
        req.headers.get("accept")?.includes("text/x-component")
    ) {
        return NextResponse.next();
    }

    const { pathname, search } = req.nextUrl;
    // Archivos reales del kit: no negociar HTML/Markdown ni reescribir agents.md.
    if (AI_FILES.some(([path]) => path === pathname)) return NextResponse.next();
    const toMarkdown = (page: string) =>
        NextResponse.rewrite(new URL(`/api/markdown${page === "/" ? "" : page}${search}`, req.url));

    // `/pagina.md` (y `/index.md` para la home): Markdown siempre, para agentes que no mandan Accept.
    if (pathname.endsWith(".md")) {
        return toMarkdown(pathname === "/index.md" ? "/" : pathname.slice(0, -3));
    }

    const chosen = preferredType(req.headers.get("accept"));

    if (chosen === null) {
        return new NextResponse(
            "Not Acceptable\n\nEste recurso está disponible en:\n- text/html\n- text/markdown\n",
            {
                status: 406,
                headers: {
                    "Content-Type": "text/plain; charset=utf-8",
                    Vary: "Accept",
                    "Cache-Control": "no-store",
                },
            },
        );
    }

    const res = chosen === "text/markdown" ? toMarkdown(pathname) : NextResponse.next();
    res.headers.set("Vary", withVaryAccept(res.headers.get("Vary")));
    if (chosen === "text/html") {
        const md = pathname === "/" ? "/index.md" : `${pathname}.md`;
        res.headers.set("Link", `<${md}${search}>; rel="alternate"; type="text/markdown"`);
    }
    return res;
}

export const config = {
    // Páginas y archivos del kit; fuera API, internos, proxy /store, admin y assets.
    matcher: [
        "/((?!api/|_next/|_vercel/|store/|admin(?:/|$)|.*\\.(?!md$)\\w+$).*)",
        "/llms.txt", "/llms-full.txt", "/ai-feed.jsonld", "/knowledge-graph.json",
        "/sitemap-ai.xml", "/sitemap.xml", "/robots.txt", "/ai.txt",
        "/llm-training.txt", "/humans.txt", "/manifest.json",
    ],
};
