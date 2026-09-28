/**
 * Negociación HTML/Markdown para agentes (acceptmarkdown.com), el 404 para
 * agentes y los archivos que leen (llms.txt, redirects de páginas de confianza).
 *
 * Corre con `npm test`.
 */

import { test, describe, afterEach } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";

import { preferredType, withVaryAccept, htmlToMarkdown, notFoundMarkdown } from "./agentMarkdown.ts";
import { proxy } from "../proxy.ts";
import { GET } from "../app/api/markdown/[[...slug]]/route.ts";

const require = createRequire(import.meta.url);
const { NextRequest } = require("next/server");

const CHROME = "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8";

describe("preferredType (vectores de acceptmarkdown.com)", () => {
    const casos: [string | null, string | null][] = [
        [null, "text/html"],
        ["", "text/html"],
        ["*/*", "text/html"],
        [CHROME, "text/html"],
        ["text/markdown", "text/markdown"],
        ["text/markdown, text/html;q=0.8", "text/markdown"],
        ["text/markdown, text/html, */*", "text/markdown"],
        ["text/html, text/markdown", "text/html"],
        ["text/html;q=0.5, text/markdown;q=0.9", "text/markdown"],
        ["text/markdown;q=0, text/html", "text/html"],
        ["text/markdown;q=0", null],
        ["text/html;q=0, */*;q=1", "text/markdown"],
        ["text/*", "text/html"],
        ["application/pdf", null],
        ["TEXT/MARKDOWN", "text/markdown"],
    ];
    for (const [accept, esperado] of casos) {
        test(`${JSON.stringify(accept)} → ${esperado}`, () => {
            assert.equal(preferredType(accept), esperado);
        });
    }
});

describe("withVaryAccept", () => {
    test("agrega Accept a lo que puso Next sin pisarlo", () => {
        assert.equal(withVaryAccept("rsc, next-router-state-tree"), "rsc, next-router-state-tree, Accept");
    });
    test("sin Vary previo queda solo Accept", () => {
        assert.equal(withVaryAccept(null), "Accept");
    });
    test("no duplica", () => {
        assert.equal(withVaryAccept("Accept, Accept-Encoding"), "Accept, Accept-Encoding");
    });
});

describe("htmlToMarkdown", () => {
    const html = `<html><head><title>Reparación | Team Celular</title>
        <meta name="description" content="Descripción"></head>
        <body><header><nav><a href="/menu">Menu</a></nav></header>
        <main class="x"><h1 class="t">Reparación <span>en CABA</span></h1>
        <script>window.x=1</script><style>.a{}</style>
        <p>Garantía &quot;escrita&quot; de <strong>90 días</strong>. Ver <a href="/reparaciones">precios</a>.</p>
        <h2>FAQ</h2><ul><li>Pantalla</li><li><a href="https://wa.me/5491151034595">WhatsApp</a></li></ul>
        <img src="/x.png" alt="foto"><button>Abrir</button>
        <table><tr><th>Modelo</th><th>Precio</th></tr><tr><td>iPhone 13</td><td>$249.900</td></tr></table>
        </main><footer>pie</footer></body></html>`;
    const md = htmlToMarkdown(html, "https://teamcelular.com/reparaciones");

    test("conserva jerarquía de títulos", () => {
        assert.match(md, /^# Reparación en CABA$/m);
        assert.match(md, /^## FAQ$/m);
    });
    test("links absolutos, negritas y listas", () => {
        assert.match(md, /\[precios\]\(https:\/\/teamcelular\.com\/reparaciones\)/);
        assert.match(md, /\*\*90 días\*\*/);
        assert.match(md, /^- Pantalla$/m);
        assert.match(md, /^- \[WhatsApp\]\(https:\/\/wa\.me\/5491151034595\)$/m);
    });
    test("tarjeta-link: los bloques internos quedan separados", () => {
        const out = htmlToMarkdown(
            '<main><a href="/p"><h3>Pantalla</h3><p>Vidrio roto</p><span>Ver</span></a></main>',
            "https://teamcelular.com/",
        );
        assert.match(out, /\[Pantalla Vidrio roto Ver\]\(https:\/\/teamcelular\.com\/p\)/);
    });
    test("tablas como filas con barras", () => {
        assert.match(md, /^\| Modelo \| Precio \|\n\| iPhone 13 \| \$249\.900 \|$/m);
    });
    test("descarta nav, scripts, estilos, imágenes, botones y footer", () => {
        for (const ruido of ["Menu", "window.x", ".a{}", "foto", "Abrir", "pie", "<"]) {
            assert.ok(!md.includes(ruido), `sobra: ${ruido}`);
        }
    });
    test("decodifica entidades, pega la puntuación y cita la fuente", () => {
        assert.match(md, /^Garantía "escrita" de \*\*90 días\*\*\. Ver \[precios\]/m);
        assert.ok(!md.includes("Descripción"), "con H1 no repite la description");
        assert.match(md, /Fuente: https:\/\/teamcelular\.com\/reparaciones\n$/);
    });
    test("sin <main> ni h1 usa el body, el <title> y la description", () => {
        const out = htmlToMarkdown(
            '<title>Hola</title><meta name="description" content="Pantalla &amp; bater&#xED;a"><body><nav>x</nav><p>Texto</p></body>',
            "https://teamcelular.com/a",
        );
        assert.match(out, /^# Hola\n\n> Pantalla & batería\n\nTexto/);
    });
});

test("notFoundMarkdown apunta a sitemap, llms.txt y páginas clave", () => {
    const md = notFoundMarkdown("/no-existe");
    assert.match(md, /^# 404/);
    assert.match(md, /`\/no-existe`/);
    for (const url of ["/sitemap.xml", "/llms.txt", "/reparaciones", "/contacto"]) {
        assert.ok(md.includes(`https://teamcelular.com${url}`), url);
    }
});

describe("proxy", () => {
    const req = (path: string, headers: Record<string, string> = {}, method = "GET") =>
        new NextRequest(`https://teamcelular.com${path}`, { headers, method });

    test("Accept: text/markdown reescribe a /api/markdown con Vary: Accept", () => {
        const res = proxy(req("/reparaciones?x=1", { accept: "text/markdown" }));
        assert.equal(res.headers.get("x-middleware-rewrite"), "https://teamcelular.com/api/markdown/reparaciones?x=1");
        assert.equal(res.headers.get("vary"), "Accept");
    });
    test("la home reescribe a /api/markdown", () => {
        const res = proxy(req("/", { accept: "text/markdown" }));
        assert.equal(res.headers.get("x-middleware-rewrite"), "https://teamcelular.com/api/markdown");
    });
    test("navegador: sigue a la página HTML con Vary: Accept y Link a su .md", () => {
        const res = proxy(req("/", { accept: CHROME }));
        assert.equal(res.headers.get("x-middleware-next"), "1");
        assert.equal(res.headers.get("vary"), "Accept");
        assert.equal(res.headers.get("link"), '</index.md>; rel="alternate"; type="text/markdown"');
        assert.equal(
            proxy(req("/contacto", { accept: CHROME })).headers.get("link"),
            '</contacto.md>; rel="alternate"; type="text/markdown"',
        );
    });
    test("/pagina.md e /index.md sirven Markdown sin importar el Accept", () => {
        assert.equal(
            proxy(req("/contacto.md", { accept: CHROME })).headers.get("x-middleware-rewrite"),
            "https://teamcelular.com/api/markdown/contacto",
        );
        assert.equal(
            proxy(req("/index.md")).headers.get("x-middleware-rewrite"),
            "https://teamcelular.com/api/markdown",
        );
    });
    test("tipo no soportado → 406 con las representaciones disponibles", async () => {
        const res = proxy(req("/", { accept: "application/pdf" }));
        assert.equal(res.status, 406);
        assert.equal(res.headers.get("vary"), "Accept");
        assert.match(await res.text(), /text\/html[\s\S]*text\/markdown/);
    });
    test("RSC y Server Actions no se negocian", () => {
        assert.equal(proxy(req("/", { accept: "text/x-component", rsc: "1" })).status, 200);
        assert.equal(proxy(req("/", { accept: "text/x-component" }, "POST")).status, 200);
        assert.equal(proxy(req("/", { accept: "text/x-component" })).status, 200);    });
});

describe("GET /api/markdown", () => {
    const realFetch = globalThis.fetch;
    afterEach(() => {
        globalThis.fetch = realFetch;
    });
    const call = (slug: string[] | undefined, url = "https://teamcelular.com/api/markdown") =>
        GET(new Request(url), { params: Promise.resolve({ slug }) });

    test("convierte la página HTML pedida con Accept: text/html", async () => {
        let pedido: { url: string; accept: string | null } | null = null;
        globalThis.fetch = (async (url: URL, init: RequestInit) => {
            pedido = { url: String(url), accept: new Headers(init.headers).get("accept") };
            return new Response("<main><h1>Contacto</h1><p>Hola</p></main>", { status: 200 });
        }) as typeof fetch;
        const res = await call(["contacto"], "https://teamcelular.com/api/markdown/contacto");
        assert.deepEqual(pedido, { url: "https://teamcelular.com/contacto", accept: "text/html" });
        assert.equal(res.status, 200);
        assert.equal(res.headers.get("content-type"), "text/markdown; charset=utf-8");
        assert.equal(res.headers.get("vary"), "Accept");
        assert.match(await res.text(), /^# Contacto\n\nHola/);
    });
    test("página inexistente → 404 real con cuerpo Markdown", async () => {
        globalThis.fetch = (async () => new Response("<html>404</html>", { status: 404 })) as unknown as typeof fetch;
        const res = await call(["no-existe"]);
        assert.equal(res.status, 404);
        assert.equal(res.headers.get("content-type"), "text/markdown; charset=utf-8");
        assert.match(await res.text(), /llms\.txt/);
    });
    test("rutas /api no se autoconsultan", async () => {
        globalThis.fetch = (() => assert.fail("no debe pedir nada")) as typeof fetch;
        assert.equal((await call(["api", "markdown"])).status, 404);
    });
});

test("llms.txt dice cuándo usarnos y cómo llamarnos", () => {
    const llms = readFileSync(new URL("../../public/llms.txt", import.meta.url), "utf8");
    assert.match(llms, /^# Team Celular\n\n> /);
    assert.match(llms, /^## When to use Team Celular$/m);
    assert.match(llms, /wa\.me\/5491151034595/);
    assert.match(llms, /Accept: text\/markdown/);
});

test("/about, /contact y /privacy redirigen a las páginas reales", async () => {
    const config = require("../../next.config.js");
    const redirects: { source: string; destination: string; permanent: boolean }[] = await config.redirects();
    for (const [source, destination] of [
        ["/about", "/sobrenosotros"],
        ["/contact", "/contacto"],
        ["/privacy", "/privacidad"],
    ]) {
        assert.ok(
            redirects.some((r) => r.source === source && r.destination === destination && r.permanent),
            source,
        );
    }
});
