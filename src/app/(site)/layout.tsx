import MainLayout from "@/components/layouts/MainLayout";

export default function SiteLayout({
    children,
}: {
    readonly children: React.ReactNode;
}) {
    return <MainLayout>{children}</MainLayout>;
}
