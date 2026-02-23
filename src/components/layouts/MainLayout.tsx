"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import NavbarNUI from "@/components/navbars/NavbarNUI";
import FooterNUI from "@/components/footer/FooterNUI";

const BackgroundBeams = dynamic(
    () => import("@/components/animations/BackgroundMeteors"),
    { ssr: false },
);
const StickyRepairCta = dynamic(
    () => import("@/components/cta/StickyRepairCta"),
    { ssr: false },
);

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
            <main className="flex justify-center min-h-screen pb-24 lg:pb-0">{children}</main>
            <FooterNUI />
            <BackgroundBeams />
            <StickyRepairCta />
        </>
    );
}
