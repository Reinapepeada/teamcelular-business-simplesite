/**
 * Resolvedor de módulos para `node --test`.
 *
 * `node --test` ejecuta TypeScript nativo, así que este repo puede tener tests
 * sin instalar ningún runner. Lo que Node NO hace es resolver dos cosas que el
 * código de Next da por sentadas:
 *
 *   - los imports sin extensión (`./cartLines`), porque en ESM la extensión es
 *     obligatoria;
 *   - el alias `@/`, que está en el tsconfig y lo entiende el bundler.
 *
 * Sin esto, la única forma de probar un módulo era que no importara a ningún
 * otro. Eso empuja a escribir módulos artificialmente sueltos, o a poner la
 * extensión `.ts` en el código de la app —donde `tsc` la rechaza (TS5097)—.
 *
 * Es tooling de desarrollo: no entra en el bundle ni cambia cómo compila Next.
 *
 *     node --import ./tools/node-test-resolver.mjs --test src/lib/x.test.ts
 */

import { existsSync } from "node:fs";
import { dirname, resolve as resolvePath } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { register } from "node:module";

const RAIZ = dirname(fileURLToPath(import.meta.url)).replace(/[\\/]tools$/, "");
const EXTENSIONES = [".ts", ".tsx", ".js", ".jsx", ".mjs"];

/** Le prueba extensiones a una ruta sin extensión, y también `/index`. */
const conExtension = (base) => {
    for (const ext of EXTENSIONES) {
        if (existsSync(base + ext)) return base + ext;
    }
    for (const ext of EXTENSIONES) {
        if (existsSync(`${base}/index${ext}`)) return `${base}/index${ext}`;
    }
    return null;
};

export async function resolve(especificador, contexto, siguiente) {
    // `@/loquesea` -> <raíz>/src/loquesea, igual que el tsconfig.
    if (especificador.startsWith("@/")) {
        const base = resolvePath(RAIZ, "src", especificador.slice(2));
        const archivo = existsSync(base) ? base : conExtension(base);
        if (archivo) return { url: pathToFileURL(archivo).href, shortCircuit: true };
    }

    // Relativo y sin extensión: `./cartLines` -> `./cartLines.ts`.
    if (especificador.startsWith(".") && !/\.[a-z]+$/i.test(especificador)) {
        const desde = contexto.parentURL ? dirname(fileURLToPath(contexto.parentURL)) : RAIZ;
        const archivo = conExtension(resolvePath(desde, especificador));
        if (archivo) return { url: pathToFileURL(archivo).href, shortCircuit: true };
    }

    return siguiente(especificador, contexto);
}

// Se registra a sí mismo cuando se lo pasa por `--import`.
register(import.meta.url, import.meta.url);
