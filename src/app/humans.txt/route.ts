import { aiFileResponse } from "@/lib/aiVisibility";
import { BUSINESS_PROFILE, TECHNICAL_AUTHOR, absoluteUrl } from "@/lib/businessProfile";

export const dynamic = "force-static";
export function GET() {
  return aiFileResponse([
    `Equipo: ${BUSINESS_PROFILE.name}`,
    `Referente técnico: ${TECHNICAL_AUTHOR.name}`,
    `Función: ${TECHNICAL_AUTHOR.jobTitle}`,
    `Perfil: ${TECHNICAL_AUTHOR.url}`,
    `Contacto público: ${BUSINESS_PROFILE.email}`,
    "Ubicación: CABA, Buenos Aires, Argentina",
    `Equipo y trayectoria: ${absoluteUrl("/sobrenosotros")}`,
    `Laboratorio: ${absoluteUrl("/lab")}`, "",
  ].join("\n"), "text/plain");
}
