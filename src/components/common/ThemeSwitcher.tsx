"use client";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <Switch
            size="lg"
            color="primary"
            onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
            startContent={<SunIcon />}
            endContent={<MoonIcon />}
        />
    );
}
