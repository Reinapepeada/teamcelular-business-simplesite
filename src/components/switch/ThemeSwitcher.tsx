"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";

function ThemeSwitcherButton({
    className,
}: {
    readonly className?: string;
}) {
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const isDark = resolvedTheme === "dark";

    return (
        <button
            type="button"
            aria-label={
                isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"
            }
            aria-pressed={isDark}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-white/20 dark:hover:bg-slate-800 ${className ?? ""}`}
        >
            {isDark ? (
                <>
                    <BsSunFill className="text-amber-400" aria-hidden />
                    <span>Claro</span>
                </>
            ) : (
                <>
                    <BsMoonStarsFill className="text-slate-700" aria-hidden />
                    <span>Oscuro</span>
                </>
            )}
        </button>
    );
}

export function ThemeSwitcherInline() {
    return <ThemeSwitcherButton />;
}

export default function ThemeSwitcher() {
    return <ThemeSwitcherButton className="hidden sm:inline-flex" />;
}
