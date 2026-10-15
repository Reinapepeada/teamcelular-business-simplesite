import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";

export default function robots(): MetadataRoute.Robots {
  // Admin y checkout sirven noindex: el rastreador debe poder leerlo.
  const sharedDisallow = ["/api", "/private", "/cart"];

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
      },
      {
        userAgent: "Applebot-Extended",
        allow: "/",
        disallow: sharedDisallow,
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
      {
        userAgent: "anthropic-ai",
        allow: "/",
        disallow: sharedDisallow,
      },
      {
        userAgent: "Bytespider",
        allow: "/",
        disallow: sharedDisallow,
      },
      {
        userAgent: "CCBot",
        allow: "/",
        disallow: sharedDisallow,
      },
      {
        userAgent: "FacebookBot",
        allow: "/",
        disallow: sharedDisallow,
      },
      {
        userAgent: "Amazonbot",
        allow: "/",
        disallow: sharedDisallow,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
