"use client";

import { usePathname } from "next/navigation";
import NavbarNUI from "@/components/navbars/NavbarNUI";
import FooterNUI from "@/components/footer/FooterNUI";
import BackgroundBeams from "@/components/animations/BackgroundMeteors";
import StickyRepairCta from "@/components/cta/StickyRepairCta";

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
            <main className="flex justify-center min-h-screen pb-24 md:pb-0">{children}</main>
            <FooterNUI />
            <BackgroundBeams />
            <StickyRepairCta />
        </>
    );
}
