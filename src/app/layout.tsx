
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
        default: "Team Celular",
        template: "%s | Team Celular"
    },
    description:
        "Servicio técnico de reparación de celulares en CABA con repuestos originales, microelectrónica y soporte empresarial. Presupuestos en el día y garantía real.",

    twitter: {
        card: "summary_large_image",
    },
    openGraph: {
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
