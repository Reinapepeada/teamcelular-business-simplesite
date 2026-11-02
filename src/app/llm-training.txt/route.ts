import { aiFactsText, aiFileResponse } from "@/lib/aiVisibility";

export const dynamic = "force-static";
export function GET() {
  return aiFileResponse("Referencia pública para consulta y atribución. Publicar este archivo no implica que un modelo lo use para entrenarse.\n\n" + aiFactsText(), "text/plain");
}
