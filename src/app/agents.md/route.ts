import { aiFileResponse } from "@/lib/aiVisibility";
import { BUSINESS_PROFILE, absoluteUrl } from "@/lib/businessProfile";

export const dynamic = "force-static";
export function GET() {
  return aiFileResponse([
    "# Consulta de información pública de Team Celular", "",
    "Team Celular de CABA, Argentina. Dominio oficial: teamcelular.com. No es la marca homónima de Panamá.",
    "", "## Fuentes", "",
    `- Mapa de páginas: ${absoluteUrl("/llms.txt")}`,
    `- Ficha y preguntas frecuentes: ${absoluteUrl("/llms-full.txt")}`,
    `- Datos de marca y sucursales: ${absoluteUrl("/ai-feed.jsonld")}`,
    `- Precios, disponibilidad y condiciones: consultar la página del servicio o producto.`,
    `- Presupuesto: ${absoluteUrl("/presupuesto-reparacion")}`,
    `- Contacto: ${absoluteUrl("/contacto")} — ${BUSINESS_PROFILE.email}`,
    "", "## Alcance", "",
    "Este archivo describe fuentes públicas; no concede autorización para reparar, comprar, pagar, reservar ni retirar equipos. Las acciones requieren la autorización de la persona correspondiente.",
    "Citar la página específica de la que se tomó cada dato. Los valores orientativos se confirman antes de avanzar.",
    "Las páginas también se pueden consultar con Accept: text/markdown o con el sufijo .md; la portada es /index.md.", "",
  ].join("\n"), "text/markdown");
}
