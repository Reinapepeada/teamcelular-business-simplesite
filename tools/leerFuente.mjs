/**
 * Lee el fuente de un componente junto con sus partes, para los tests que
 * vigilan el código. Cuando un bloque se mueve a un archivo hermano, las
 * expectativas siguen cubriéndolo.
 *
 *     leerConPartes("src/components/store/CheckoutDialog.tsx", "src/components/store/checkout")
 */
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = dirname(dirname(fileURLToPath(import.meta.url)));

export const leerConPartes = (archivo, carpeta) => {
    const partes = readdirSync(join(RAIZ, carpeta))
        .filter((nombre) => /\.tsx?$/.test(nombre))
        .sort()
        .map((nombre) => readFileSync(join(RAIZ, carpeta, nombre), "utf8"));
    return [readFileSync(join(RAIZ, archivo), "utf8"), ...partes].join("\n");
};
