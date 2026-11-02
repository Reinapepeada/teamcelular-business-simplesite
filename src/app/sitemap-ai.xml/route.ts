import { AI_PAGES, aiFileResponse } from "@/lib/aiVisibility";
import { absoluteUrl } from "@/lib/businessProfile";

export const dynamic = "force-static";
export function GET() {
  // URLs canónicas estables, sin lastmod inventado ni consultas al catálogo.
  const urls = AI_PAGES.map(([path]) => `  <url><loc>${absoluteUrl(path)}</loc></url>`);
  return aiFileResponse([
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls, "</urlset>", "",
  ].join("\n"), "application/xml");
}
