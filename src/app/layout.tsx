
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider} from "./providers";
import NavbarNUI from "../components/navbars/NavbarNUI";
import FooterNUI from "@/components/footer/FooterNUI";
const inter = Inter({ subsets: ["latin"] });
import BackgroundBeams from "../components/animations/BackgroundMeteors";
import Plugins from "@/components/vercel/Plugins";
// importo la fuente de google

export const metadata: Metadata = {
    metadataBase: new URL('https://teamcelular.com'),
    title: {
        default: "Team Celular",
        template: "%s | Team Celular"
    },
    description:
        "Hacemos reparaciones en el dia, con garantia y al mejor precio. Reparamos celulares, tablets, notebooks y computadoras. Tambien puedes encontrar los mejores accesorios y repuestos.",

    twitter: {
        card: "summary_large_image",
    },
    keywords: [
        "reparacion de celulares",
        "arreglo de celulares",
    ],
    openGraph: {
        locale: "es_AR",
        countryName: "Argentina",
        url: "https://teamcelular.com",
        authors: ["Team Celular"],
        emails:["teamcelular.arg@gmail.com"]
        
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
                </ThemeProvider>
            </body>
        </html>
    );
}
