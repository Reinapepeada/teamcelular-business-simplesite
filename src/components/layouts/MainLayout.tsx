"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import NavbarNUI from "@/components/navbars/NavbarNUI";
import FooterNUI from "@/components/footer/FooterNUI";
import StickyRepairCta from "@/components/cta/StickyRepairCta";

const BackgroundBeams = dynamic(
    () => import("@/components/animations/BackgroundMeteors"),
    { ssr: false },
);

export default function MainLayout({
    children,
}: {
    readonly children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [showDesktopEffects, setShowDesktopEffects] = useState(false);
    const isAdmin = pathname?.startsWith("/admin");

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 1024px)");
        const updateVisibility = () => setShowDesktopEffects(mediaQuery.matches);

        updateVisibility();
        mediaQuery.addEventListener("change", updateVisibility);

        return () => {
            mediaQuery.removeEventListener("change", updateVisibility);
        };
    }, []);

    if (isAdmin) {
        return <>{children}</>;
    }

    return (
        <>
            <NavbarNUI />
            <main className="flex min-h-screen justify-center">{children}</main>
            <FooterNUI />
            <StickyRepairCta />
            {showDesktopEffects ? <BackgroundBeams /> : null}
        </>
    );
}
