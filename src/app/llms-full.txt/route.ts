import { aiFactsText, aiFileResponse } from "@/lib/aiVisibility";

export const dynamic = "force-static";
export function GET() {
  return aiFileResponse(aiFactsText(), "text/plain");
}
