
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider} from "./providers";
import MainLayout from "@/components/layouts/MainLayout";
const inter = Inter({ subsets: ["latin"] });
import Plugins from "@/components/vercel/Plugins";
// importo la fuente de google

export const metadata: Metadata = {
    metadataBase: new URL("https://teamcelular.com/"),
    title: {
        default: "Team Celular - Reparación de Celulares en Buenos Aires",
        template: "%s | Team Celular"
    },
    description:
        "Servicio técnico de reparación de celulares en CABA con repuestos originales, microelectrónica y soporte empresarial. Presupuestos en el día y garantía real.",
    keywords: [
        "reparación de celulares",
        "servicio técnico celulares",
        "reparación iPhone",
        "reparación Samsung",
        "microelectrónica",
        "reballing",
        "cambio de pantalla",
        "batería celular",
        "repuestos originales",
        "Buenos Aires",
        "CABA",
        "servicio técnico empresarial"
    ],
    authors: [{ name: "Team Celular" }],
    creator: "Team Celular",
    publisher: "Team Celular",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    twitter: {
        card: "summary_large_image",
        title: "Team Celular - Reparación de Celulares en Buenos Aires",
        description: "Servicio técnico especializado en reparación de smartphones con microelectrónica y garantía real.",
    },
    openGraph: {
        type: "website",
        locale: "es_AR",
        countryName: "Argentina",
        url: "https://teamcelular.com",
        siteName: "Team Celular",
        title: "Servicio técnico profesional de celulares en Buenos Aires",
        description:
            "Laboratorio especializado en reparación de smartphones, tablets y notebooks con microelectrónica y garantía." 
    },
    alternates: 
        {
            canonical: "https://teamcelular.com",
        },
    verification: {
        google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
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
