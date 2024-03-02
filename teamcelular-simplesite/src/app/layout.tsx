import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import NavbarNUI from "../components/navbars/NavbarNUI";
import FooterNUI from "@/components/footer/FooterNUI";
const inter = Inter({ subsets: ["latin"] });
// importo la fuente de google

export const metadata: Metadata = {
    title: "Team Celular | Home",
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
                <Providers>
                    <NavbarNUI></NavbarNUI>
                    <main className="flex justify-center">{children}</main>
                    <FooterNUI></FooterNUI>
                </Providers>
            </body>
        </html>
    );
}
