import { aiFileResponse, createAiGraph } from "@/lib/aiVisibility";

export const dynamic = "force-static";
export function GET() {
  return aiFileResponse(JSON.stringify(createAiGraph(), null, 2), "application/ld+json");
}
