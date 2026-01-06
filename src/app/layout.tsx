
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./providers";
import MainLayout from "@/components/layouts/MainLayout";
const inter = Inter({ subsets: ["latin"], display: "swap" });
import Plugins from "@/components/vercel/Plugins";
import StructuredData from "@/components/seo/StructuredData";

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";

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
        template: "%s | Team Celular",
    },
    description:
        "Servicio técnico especializado en reparación de celulares en Recoleta, CABA. Repuestos originales, microelectrónica avanzada, soporte empresarial y garantía escrita. Presupuestos sin cargo en el día.",
    keywords: [
        "reparación celulares Buenos Aires",
        "servicio técnico celulares CABA",
        "reparación iPhone Argentina",
        "cambio pantalla celular Recoleta",
        "microelectrónica celulares",
        "reballing BGA Buenos Aires",
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
            "Reparación profesional de celulares con repuestos originales y garantía escrita. Presupuestos sin cargo.",
        images: {
            url: `${SITE_URL}/images/teamcelular.webp`,
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
                url: `${SITE_URL}/images/teamcelular.webp`,
                width: 1200,
                height: 630,
                alt: "Team Celular - Laboratorio de Reparación de Celulares en Buenos Aires",
                type: "image/webp",
            },
        ],
    },
    verification: {
        google: process.env.GOOGLE_SITE_VERIFICATION || "",
    },
    other: {
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
        <html lang="es" suppressHydrationWarning>
            
            <body className={`${inter.className} `}>
                <StructuredData />
                <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem={true}
                disableTransitionOnChange
                >
                    <MainLayout>{children}</MainLayout>
                    <Plugins />
                </ThemeProvider>
            </body>
        </html>
    );
}
