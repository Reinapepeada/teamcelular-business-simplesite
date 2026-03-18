"use client";

import { ThemeProvider } from "next-themes";

export default function SiteThemeProvider({
    children,
}: {
    readonly children: React.ReactNode;
}) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
    );
}
