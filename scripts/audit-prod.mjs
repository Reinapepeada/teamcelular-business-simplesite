import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

/**
 * `npm audit --audit-level=high --omit=dev` sin salida para advisories que no
 * tienen version corregida y que no se pueden sacar del arbol sin una migracion.
 * Cada excepcion vence: pasada la fecha, CI vuelve a fallar y obliga a revisarla.
 */
export const ALLOWLIST = {
  // braces: sin release corregido. Entra por @nextui-org/theme -> tailwindcss@3
  // (chokidar/micromatch) y solo corre al compilar el CSS, no con input de usuarios.
  // Se va cuando la tienda deje NextUI.
  "GHSA-vfj7-8cjw-p6xm": "2027-01-06",
};

const BLOCKING = new Set(["high", "critical"]);

/** Advisories high/critical del reporte JSON de npm audit que no estan exceptuados. */
export function blockingAdvisories(report, allowlist = ALLOWLIST, today = new Date()) {
  const found = new Map();
  for (const vuln of Object.values(report.vulnerabilities ?? {})) {
    for (const via of vuln.via) {
      // Las entradas string son paquetes intermedios; el advisory real viene como objeto.
      if (typeof via === "string" || !BLOCKING.has(via.severity)) continue;
      const id = via.url?.split("/").pop() ?? String(via.source);
      const until = allowlist[id];
      if (until && today <= new Date(`${until}T23:59:59Z`)) continue;
      found.set(id, `${id} ${via.severity} ${via.name}: ${via.title}${until ? ` (excepcion vencida ${until})` : ""}`);
    }
  }
  return [...found.values()];
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  let raw;
  try {
    raw = execFileSync("npm", ["audit", "--json", "--omit=dev"], { encoding: "utf8", shell: process.platform === "win32" });
  } catch (error) {
    // npm audit sale con 1 cuando encuentra algo; el JSON igual esta en stdout.
    raw = error.stdout;
  }
  const blocking = blockingAdvisories(JSON.parse(raw));
  if (blocking.length) {
    console.error(`Vulnerabilidades high/critical en produccion:\n${blocking.join("\n")}`);
    process.exit(1);
  }
  console.log("npm audit: sin vulnerabilidades high/critical fuera de la lista de excepciones.");
}
