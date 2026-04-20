import { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";

export default function robots(): MetadataRoute.Robots {
  const sharedDisallow = ["/admin", "/api", "/private", "/cart", "/checkout"];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: sharedDisallow,
      },
      {
        userAgent: "Applebot",
        allow: "/",
        disallow: sharedDisallow,
        crawlDelay: 10,
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: sharedDisallow,
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: sharedDisallow,
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: sharedDisallow,
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: sharedDisallow,
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: sharedDisallow,
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: sharedDisallow,
      },
      {
        userAgent: "Claude-SearchBot",
        allow: "/",
        disallow: sharedDisallow,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
