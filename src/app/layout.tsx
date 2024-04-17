import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import NavbarNUI from "../components/navbars/NavbarNUI";
import FooterNUI from "@/components/footer/FooterNUI";
const inter = Inter({ subsets: ["latin"] });
import BackgroundBeams from "../components/animations/BackgroundMeteors";
import Head from "next/head";
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
        <html lang="es">
            <Head>
                <title>Reparaciones de Celulares y Computadoras en Buenos Aires | Team Celular</title>
                <meta name="description" content="Team Celular ofrece servicios de reparación de alta calidad para celulares y computadoras en Buenos Aires. Nuestros técnicos expertos están listos para ayudarte."></meta>
                <meta name="keywords" content="Reparación de Celulares Buenos Aires, Reparación de Computadoras Buenos Aires, Servicio Técnico Buenos Aires, Team Celular"></meta>
                <meta name="robots" content="index, follow"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <meta name="HandheldFriendly" content="True"></meta>
                <meta name="MobileOptimized" content="320"></meta>
                <meta httpEquiv="cleartype" content="on"></meta>
                <meta property="og:title" content="Reparaciones de Celulares y Computadoras en Buenos Aires | Team Celular"></meta>
                <meta property="og:description" content="Team Celular ofrece servicios de reparación de alta calidad para celulares y computadoras en Buenos Aires. Nuestros técnicos expertos están listos para ayudarte."></meta>
                <meta property="og:image" content="/images/teamcelular.png"></meta>
                <meta property="og:url" content="https://teamcelular.com/"></meta>
                <meta name="author" content="Team Celular"></meta>
                <meta name="geo.region" content="AR-C"></meta>
                <meta name="geo.placename" content="Buenos Aires"></meta>
                <meta name="geo.position" content="-34.597532;-58.402662"></meta>
                <meta name="ICBM" content="-34.597532, -58.402662"></meta>
            </Head>
            <link rel="icon" href="/images/teamcelular.png" sizes="any" />
            <body
                className={`${inter.className} `}>
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
