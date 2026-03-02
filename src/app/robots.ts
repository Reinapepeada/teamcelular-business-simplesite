import { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";

export default function Robots(): MetadataRoute.Robots {
  const sharedDisallow = [
    "/admin/",
    "/api/",
    "/private/",
    "/cart/",
    "/checkout/",
    "/tienda?*",
    "/tienda/categoria/*?*",
    "/*?*utm_*",
    "/*?*gclid=*",
    "/*?*fbclid=*",
    "/*.json$",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: sharedDisallow,
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: sharedDisallow,
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/images/", "/videos/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: sharedDisallow,
      },
      {
        userAgent: "GPTBot",
        allow: "/",
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
      },
      {
        userAgent: "CCBot",
        allow: "/",
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
      {
        userAgent: "Applebot",
        allow: "/",
        crawlDelay: 10,
      },
      {
        userAgent: "FacebookBot",
        allow: "/",
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
      },
      {
        userAgent: "Amazonbot",
        allow: "/",
      },
    ],
    sitemap: [`${SITE_URL}/sitemap.xml`],
    host: SITE_URL,
  };
}
