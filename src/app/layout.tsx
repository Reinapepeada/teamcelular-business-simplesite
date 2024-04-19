import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import NavbarNUI from "../components/navbars/NavbarNUI";
import FooterNUI from "@/components/footer/FooterNUI";
const inter = Inter({ subsets: ["latin"] });
import BackgroundBeams from "../components/animations/BackgroundMeteors";
import Plugins from "@/components/vercel/Plugins";
// importo la fuente de google

export const metadata: Metadata = {
    title: {
        default: "Team Celular",
        template: "%s | Team Celular"
    },
    description:
        "Hacemos reparaciones en el dia, con garantia y al mejor precio. Reparamos celulares, tablets, notebooks y computadoras. Tambien puedes encontrar los mejores accesorios y repuestos.",

    twitter: {
        site: "@teamcelular",
        card: "summary_large_image",
    },
    };

export default function RootLayout({
    children,
}: {
    readonly children: React.ReactNode;
}) {
    return (
        <html lang="es">
            
            <body className={`${inter.className} `}>
                <Providers>
                    <NavbarNUI></NavbarNUI>
                    <BackgroundBeams />
                    <main className="flex justify-center">{children}</main>
                    <Plugins />
                    <FooterNUI></FooterNUI>
                </Providers>
            </body>
        </html>
    );
}
