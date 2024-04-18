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
    title: "Team Celular",
    description:
        "Team Celular es una empresa de reparación de celulares en la Ciudad Autonoma de Buenos Aires, Argentina.",
};

export default function RootLayout({
    children,
}: {
    readonly children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <link rel="icon" href="/images/teamcelular.png" sizes="any" />
            <body
                className={`${inter.className} `}>
                <Plugins />
                <Providers>
                    <NavbarNUI></NavbarNUI>
                    <BackgroundBeams />
                    <main className="flex justify-center">{children}</main>
                    <FooterNUI></FooterNUI>
                </Providers>
            </body>
        </html>
    );
}
