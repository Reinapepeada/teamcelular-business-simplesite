import { MetadataRoute } from "next";

export default function robot():MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/", // Allow all robots to crawl all pages
            },
        ],
        sitemap:`${process.env.NEXT_PUBLIC_URL}/sitemap.xml`,
         


    }
}
