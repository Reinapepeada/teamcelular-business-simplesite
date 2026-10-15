
import "./globals.css";
import type { Metadata, Viewport } from "next";
import Plugins from "@/components/vercel/Plugins";
import StructuredData from "@/components/seo/StructuredData";
import { ThemeProvider } from "@/app/providers";
import { getSiteUrl } from "@/lib/seoMetadata";
import Script from "next/script";
import { GA4_INIT_SCRIPT } from "@/lib/analytics/ga4";

const SITE_URL = getSiteUrl();

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
        { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
    ],
};

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: "Team Celular | Servicio Técnico de Celulares en Buenos Aires",
        template: "%s",
    },
    description:
        "Servicio técnico especializado en celulares en Recoleta, CABA. Repuestos originales, microelectrónica avanzada y garantía escrita. Revisión técnica entre ARS 15.000 y ARS 25.000.",
    keywords: [
        "reparación celulares Buenos Aires",
        "servicio técnico celulares CABA",
        "reparación iPhone Argentina",
        "cambio pantalla celular Recoleta",
        "microelectrónica celulares",
        "reparación Samsung CABA",
        "service celulares Palermo",
        "garantía reparación celular",
        "presupuesto reparación celular",
    ],
    authors: [{ name: "Team Celular", url: SITE_URL }],
    creator: "Team Celular",
    publisher: "Team Celular",
    formatDetection: {
        email: true,
        address: true,
        telephone: true,
    },
    category: "Technology",
    classification: "Electronics Repair Service",
    referrer: "origin-when-cross-origin",
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    icons: {
        icon: [
            { url: "/favicon.ico", sizes: "any" },
            { url: "/icon.ico", sizes: "any" },
        ],
        apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
    manifest: "/manifest.json",
    twitter: {
        card: "summary_large_image",
        site: "@teamcelular",
        creator: "@teamcelular",
        title: "Team Celular | Servicio Técnico de Celulares en Buenos Aires",
        description:
            "Reparación profesional de celulares con repuestos originales y garantía escrita. Revisión técnica entre ARS 15.000 y ARS 25.000.",
        images: {
            url: `${SITE_URL}/opengraph-image.png`,
            alt: "Team Celular - Servicio Técnico de Celulares en Buenos Aires",
        },
    },
    openGraph: {
        type: "website",
        locale: "es_AR",
        countryName: "Argentina",
        url: SITE_URL,
        siteName: "Team Celular",
        title: "Team Celular | Servicio Técnico Profesional de Celulares",
        description:
            "Laboratorio especializado en reparación de smartphones, tablets y notebooks con microelectrónica avanzada, repuestos originales y garantía escrita en Buenos Aires.",
        images: [
            {
                url: `${SITE_URL}/opengraph-image.png`,
                width: 1200,
                height: 630,
                alt: "Team Celular - Laboratorio de Reparación de Celulares en Buenos Aires",
                type: "image/png",
            },
        ],
    },
    verification: {
        google: process.env.GOOGLE_SITE_VERIFICATION || "",
    },
    other: {
        "msvalidate.01": "BB500831F8107860C73938B904721ED7",
        "geo.region": "AR-C",
        "geo.placename": "Buenos Aires, Argentina",
        "geo.position": "-34.597528;-58.403048",
        "ICBM": "-34.597528, -58.403048",
    },
};

export default function RootLayout({
    children,
}: {
    readonly children: React.ReactNode;
}) {
    return (
        <html lang="es" className="dark" style={{ colorScheme: "dark" }} suppressHydrationWarning>
            <head>
                <link rel="preload" href="/fonts/inter/inter-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
                <Script id="ga4" strategy="afterInteractive">
                    {GA4_INIT_SCRIPT}
                </Script>
                {/* ponytail: filtro por hostname y no NODE_ENV, `next start` local también es production. */}
                <Script id="microsoft-clarity" strategy="lazyOnload">
                    {`if (/(^|\\.)teamcelular\\.com$/.test(location.hostname)) (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "y1c74jznnm");`}
                </Script>
            </head>
            <body className="font-inter bg-black text-[#f5f5f7] antialiased">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    forcedTheme="dark"
                    enableSystem={false}
                    storageKey="teamcelular-theme"
                    disableTransitionOnChange
                >
                    <StructuredData />
                    {children}
                    <Plugins />
                </ThemeProvider>
            </body>
        </html>
    );
}
