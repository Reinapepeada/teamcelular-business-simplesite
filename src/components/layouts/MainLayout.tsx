"use client";

import { usePathname } from "next/navigation";
import NavbarNUI from "@/components/navbars/NavbarNUI";
import FooterNUI from "@/components/footer/FooterNUI";
import BackgroundBeams from "@/components/animations/BackgroundMeteors";
import StructuredData from "@/components/seo/StructuredData";

export default function MainLayout({
    children,
}: {
    readonly children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");

    if (isAdmin) {
        return <>{children}</>;
    }

    return (
        <>
            <NavbarNUI />
            <main className="flex justify-center min-h-screen">{children}</main>
            <FooterNUI />
            <BackgroundBeams />
            <StructuredData />
        </>
    );
}
