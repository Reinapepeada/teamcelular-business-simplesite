import { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";

export default function Robots():MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/", // Allow all robots to crawl all pages
            },
        ],
        sitemap:`${SITE_URL}/sitemap.xml`,
         


    }
}
