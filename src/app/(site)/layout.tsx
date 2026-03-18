import MainLayout from "@/components/layouts/MainLayout";
import SiteThemeProvider from "@/components/providers/SiteThemeProvider";

export default function SiteLayout({
    children,
}: {
    readonly children: React.ReactNode;
}) {
    return (
        <SiteThemeProvider>
            <MainLayout>{children}</MainLayout>
        </SiteThemeProvider>
    );
}
