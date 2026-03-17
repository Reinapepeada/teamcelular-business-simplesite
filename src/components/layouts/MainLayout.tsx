import NavbarNUI from "@/components/navbars/NavbarNUI";
import FooterNUI from "@/components/footer/FooterNUI";

export default function MainLayout({
    children,
}: {
    readonly children: React.ReactNode;
}) {
    return (
        <>
            <NavbarNUI />
            <main className="flex min-h-screen flex-col items-center">
                {children}
            </main>
            <FooterNUI />
        </>
    );
}
