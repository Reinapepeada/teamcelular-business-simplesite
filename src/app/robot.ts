import { MetadataRoute } from "next";

export default function robot():MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/productos", "/contacto", "/presupuesto-reparacion"],
            },
        ],
        sitemap:`${process.env.NEXT_PUBLIC_URL}/sitemap.xml`,
         


    }
}
