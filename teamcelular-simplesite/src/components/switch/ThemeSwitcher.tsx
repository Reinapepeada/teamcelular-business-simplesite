'use client'
// app/components/ThemeSwitcher.tsx

import { Switch } from "@nextui-org/react";
import { MoonIcon } from "../icons/MoonIcon";
import { SunIcon } from "../icons/SunIcon";
import { useTheme } from "next-themes";
import React ,{ useEffect, useState } from "react";

export default function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    return (
        <Switch
            defaultSelected
            size="sm"
            color="success"
            startContent={<SunIcon />}
            endContent={<MoonIcon />}
            onChange={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme}
        </Switch>
    );
}
