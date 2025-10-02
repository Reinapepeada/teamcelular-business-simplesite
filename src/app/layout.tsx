
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider} from "./providers";
import NavbarNUI from "../components/navbars/NavbarNUI";
import FooterNUI from "@/components/footer/FooterNUI";
const inter = Inter({ subsets: ["latin"] });
import BackgroundBeams from "../components/animations/BackgroundMeteors";
import Plugins from "@/components/vercel/Plugins";
import StructuredData from "@/components/seo/StructuredData";
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
                    <NavbarNUI></NavbarNUI>
                    <main className="flex justify-center">{children}</main>
                    <FooterNUI></FooterNUI>
                    <Plugins />
                    <BackgroundBeams />
                    <StructuredData />
                </ThemeProvider>
            </body>
        </html>
    );
}
