"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon } from "../icons/MoonIcon";
import { SunIcon } from "../icons/SunIcon";

export default function ThemeSwitcher() {
    return <ThemeSwitcherBase className="hidden sm:inline-flex" />;
}

export function ThemeSwitcherInline() {
    return <ThemeSwitcherBase className="inline-flex" />;
}

function ThemeSwitcherBase({ className }: { className: string }) {
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className={`${className} h-11 w-[74px] rounded-full border border-slate-200 bg-white/90 dark:border-white/15 dark:bg-slate-900/80`} />
        );
    }

    const isDark = resolvedTheme === "dark";

    return (
        <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={`Cambiar a tema ${isDark ? "claro" : "oscuro"}`}
            aria-pressed={isDark}
            className={`${className} h-11 w-[74px] items-center rounded-full border border-slate-200 bg-white/90 p-1 shadow-sm transition hover:border-slate-300 hover:bg-white dark:border-white/15 dark:bg-slate-900/80 dark:hover:border-white/25 dark:hover:bg-slate-900`}
        >
            <span
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm transition ${
                    isDark
                        ? "translate-x-[30px] bg-slate-950 text-amber-300"
                        : "translate-x-0 bg-amber-50 text-amber-500"
                }`}
            >
                {isDark ? <MoonIcon /> : <SunIcon />}
            </span>
        </button>
    );
}
