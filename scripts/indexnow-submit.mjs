/**
 * Envia las URLs del sitemap a IndexNow (Bing, Yandex, Naver, Seznam).
 *
 * La key ya estaba publicada en public/<key>.txt desde hace tiempo, pero nada
 * la usaba: sin este ping, los buscadores que soportan el protocolo siguen
 * descubriendo los cambios por rastreo, que es justo lo que IndexNow evita.
 *
 * Google no participa de IndexNow y no se ve afectado.
 *
 * Uso:
 *   node scripts/indexnow-submit.mjs              # todas las URLs del sitemap
 *   node scripts/indexnow-submit.mjs /guias/x /y  # solo esas rutas
 *   node scripts/indexnow-submit.mjs --dry-run    # muestra sin enviar
 */

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const SITE_URL = (process.env.NEXT_PUBLIC_BASE_URL || "https://teamcelular.com").replace(/\/+$/, "");
const HOST = new URL(SITE_URL).host;
const ENDPOINT = "https://api.indexnow.org/indexnow";

/** IndexNow rechaza lotes de mas de 10.000 URLs. */
const MAX_URLS = 10000;

/**
 * La key es el nombre del archivo en public/, no su contenido: asi no hay dos
 * fuentes que se puedan desincronizar. El contenido debe ser igual al nombre.
 */
function findKey() {
  const files = readdirSync("public").filter((name) => /^[a-f0-9]{8,128}\.txt$/i.test(name));

  for (const file of files) {
    const key = file.replace(/\.txt$/i, "");
    const body = readFileSync(join("public", file), "utf8").trim();
    if (body === key) return key;
    console.warn(`aviso: ${file} no coincide con su contenido, se ignora`);
  }

  return null;
}

async function readSitemapUrls() {
  const response = await fetch(`${SITE_URL}/sitemap.xml`);
  if (!response.ok) throw new Error(`sitemap.xml devolvio ${response.status}`);

  const xml = await response.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
}

function toAbsolute(pathOrUrl) {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${SITE_URL}/${pathOrUrl.replace(/^\/+/, "")}`;
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const explicit = args.filter((arg) => !arg.startsWith("--"));

  const key = findKey();
  if (!key) {
    console.error("No hay archivo de key valido en public/. Se esperaba <key>.txt con la key adentro.");
    process.exit(1);
  }

  const urlList = explicit.length > 0 ? explicit.map(toAbsolute) : await readSitemapUrls();

  if (urlList.length === 0) {
    console.error("No hay URLs para enviar.");
    process.exit(1);
  }

  if (urlList.length > MAX_URLS) {
    console.error(`IndexNow acepta hasta ${MAX_URLS} URLs por lote y se juntaron ${urlList.length}.`);
    process.exit(1);
  }

  // Una URL de otro host invalida el lote entero, no solo esa entrada.
  const foreign = urlList.filter((url) => new URL(url).host !== HOST);
  if (foreign.length > 0) {
    console.error(`URLs de otro host en el lote: ${foreign.slice(0, 3).join(", ")}`);
    process.exit(1);
  }

  if (dryRun) {
    console.log(`[dry-run] ${urlList.length} URLs para ${HOST}:`);
    urlList.forEach((url) => console.log(`  ${url}`));
    return;
  }

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key,
      keyLocation: `${SITE_URL}/${key}.txt`,
      urlList,
    }),
  });

  // 200 = aceptado, 202 = aceptado pero la key sigue en validacion.
  if (response.status !== 200 && response.status !== 202) {
    const detail = await response.text();
    console.error(`IndexNow respondio ${response.status}: ${detail.slice(0, 300)}`);
    process.exit(1);
  }

  console.log(`IndexNow acepto ${urlList.length} URLs (HTTP ${response.status}).`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
