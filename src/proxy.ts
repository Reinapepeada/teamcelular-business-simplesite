import { NextResponse, type NextRequest } from "next/server";
import { preferredType, withVaryAccept } from "@/lib/agentMarkdown";

/**
 * Negociación HTML/Markdown por `Accept` (acceptmarkdown.com): misma URL,
 * `Vary: Accept` en ambas ramas y 406 si el cliente no acepta ninguna.
 */
export function proxy(req: NextRequest) {
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
        res.headers.set("Link", `<${md}>; rel="alternate"; type="text/markdown"`);
    }
    return res;
}

export const config = {
    // Solo páginas (y sus `.md`): fuera API, internos de Next, proxy /store, admin y demás archivos.
    matcher: ["/((?!api/|_next/|_vercel/|store/|admin(?:/|$)|.*\\.(?!md$)\\w+$).*)"],
};
