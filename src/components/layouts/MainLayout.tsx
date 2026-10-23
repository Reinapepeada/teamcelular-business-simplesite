import type { Metadata } from "next";
import NavbarNUI from "@/components/navbars/NavbarNUI";
import FooterNUI from "@/components/footer/FooterNUI";
import StickyLocalCta from "@/components/cro/StickyLocalCta";

export const metadata: Metadata = {
    title: {
        default: "Team Celular | Reparación de celulares en Recoleta",
        template: "%s | Team Celular",
    },
    description:
        "Tienda y servicio técnico de celulares en Recoleta, CABA. Reparación, repuestos, asesoramiento y contacto rápido por WhatsApp.",
    alternates: {
        canonical: "https://teamcelular.com",
    },
    openGraph: {
        title: "Team Celular | Reparación de celulares en Recoleta",
        description:
            "Tienda y servicio técnico de celulares en Recoleta, CABA. Reparación, repuestos y asesoramiento.",
        type: "website",
        locale: "es_AR",
        url: "https://teamcelular.com",
        images: [
            {
                url: "https://teamcelular.com/opengraph-image.png",
                width: 1200,
                height: 630,
                alt: "Team Celular",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Team Celular | Reparación de celulares en Recoleta",
        description:
            "Tienda y servicio técnico de celulares en Recoleta, CABA.",
        images: ["https://teamcelular.com/opengraph-image.png"],
    },
};

export default function MainLayout({
    children,
}: {
    readonly children: React.ReactNode;
}) {
    return (
        <>
            <a href="#contenido-principal" className="sr-only z-[100] rounded-lg bg-white p-4 font-semibold text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Saltar al contenido</a>
            <NavbarNUI />
            <main id="contenido-principal" tabIndex={-1} className="flex min-h-screen flex-col items-center">
                {children}
            </main>
            <FooterNUI />
            <StickyLocalCta whatsappUrl="https://wa.me/5491151034595?text=Hola%21%20Quiero%20pedir%20un%20presupuesto%20de%20reparacion%20en%20CABA." primaryLabel="Presupuesto" />
        </>
    );
}
