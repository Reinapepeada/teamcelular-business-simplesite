"use client";

import React, { useMemo } from "react";
import {
    Navbar,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    NavbarContent,
    NavbarItem,
    Button,
} from "@nextui-org/react";
import ThemeSwitcher from "../switch/ThemeSwitcher";
import { BsWhatsapp } from "react-icons/bs";
import Image from "next/image";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import ResumeCartNav from "../cart/resume_cart_nav";

const MAIN_LINKS = [
    { href: "/arreglo-de-celulares", label: "Arreglo" },
    { href: "/reparaciones", label: "Reparaciones" },
    { href: "/tienda", label: "Tienda" },
    { href: "/guias", label: "Guias" },
    { href: "/sucursales", label: "Sucursales" },
];

const SECONDARY_LINKS = [
    { href: "/zonas", label: "Zonas" },
    { href: "/contacto", label: "Contacto" },
    { href: "/sobrenosotros", label: "Sobre nosotros" },
];

const WHATSAPP_URL =
    "https://wa.me/5491151034595?text=Hola%21%20Quiero%20pedir%20un%20presupuesto%20de%20reparaci%C3%B3n.";

function isActivePath(pathname, href) {
    if (!pathname) return false;
    if (href === "/") return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
}

export default function NavbarNUI() {
    const pathname = usePathname();

    const isStoreRoute = useMemo(() => {
        if (!pathname) return false;
        return pathname.startsWith("/tienda") || pathname.startsWith("/productos");
    }, [pathname]);

    return (
        <Navbar
            maxWidth="2xl"
            classNames={{
                base: "z-50 border-b border-slate-200/70 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/60",
                wrapper: "min-h-[72px] px-3 sm:min-h-[78px] sm:px-4",
                menu: "z-[60] bg-white/95 pt-4 backdrop-blur-xl dark:bg-slate-950/95",
            }}>
            <NavbarContent justify="start">
                <NavbarItem className="nav:hidden">
                    <NavbarMenuToggle
                        className="h-10 w-10 text-slate-700 dark:text-slate-200"
                        aria-label="Abrir menu de navegacion"
                    />
                </NavbarItem>
                <NavbarItem className="flex items-center">
                    <NextLink href="/" className="flex items-center gap-3 text-inherit">
                        <Image
                            className="hidden h-10 w-auto sm:block dark:sm:hidden"
                            src="/images/brand/imagotipo-light.png"
                            alt="Team Celular"
                            width={1725}
                            height={591}
                            sizes="(max-width: 640px) 140px, 170px"
                        />
                        <Image
                            className="hidden h-10 w-auto sm:hidden dark:sm:block"
                            src="/images/brand/imagotipo-dark.png"
                            alt="Team Celular"
                            width={1725}
                            height={591}
                            sizes="(max-width: 640px) 140px, 170px"
                        />
                        <Image
                            className="h-14 w-auto sm:hidden dark:hidden"
                            src="/images/ISOTIPO/SVG/ISOTIPO_light.svg"
                            alt="Team Celular"
                            width={256}
                            height={256}
                            sizes="40px"
                        />
                        <Image
                            className="hidden h-14 w-auto sm:hidden dark:block dark:sm:hidden"
                            src="/images/ISOTIPO/SVG/ISOTIPO_black.svg"
                            alt="Team Celular"
                            width={256}
                            height={256}
                            sizes="40px"
                        />
                    </NextLink>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent className="hidden nav:flex gap-5" justify="center">
                {MAIN_LINKS.map((item) => {
                    const active = isActivePath(pathname, item.href);
                    return (
                        <NavbarItem key={item.href}>
                            <NextLink
                                href={item.href}
                                className={`text-sm transition-colors ${active
                                    ? "font-semibold text-slate-900 dark:text-white"
                                    : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                                    }`}>
                                {item.label}
                            </NextLink>
                        </NavbarItem>
                    );
                })}
                <NavbarItem className="relative">
                    <details className="group relative">
                        <summary className="list-none cursor-pointer rounded-full px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/70 dark:hover:text-white [&::-webkit-details-marker]:hidden">
                            Mas
                        </summary>
                        <div className="absolute right-0 top-[calc(100%+0.45rem)] z-[80] w-56 rounded-xl border border-slate-200/80 bg-white/95 p-2 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/95">
                            {SECONDARY_LINKS.map((item) => (
                                <NextLink
                                    key={item.href}
                                    href={item.href}
                                    className="block rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-slate-800/70 dark:hover:text-white">
                                    {item.label}
                                </NextLink>
                            ))}
                            <div className="mt-1 flex items-center justify-between rounded-lg px-3 py-2">
                                <span className="text-sm text-slate-600 dark:text-slate-300">Tema</span>
                                <ThemeSwitcher />
                            </div>
                        </div>
                    </details>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end" className="gap-2">
                <NavbarItem>
                    <Button
                        as={NextLink}
                        color="primary"
                        href="/presupuesto-reparacion#solicitar-presupuesto"
                        variant="shadow"
                        size="md"
                        radius="full"
                        className="h-9 bg-primary px-4 font-semibold text-white shadow-lg shadow-primary/20 transition hover:bg-primary/90 sm:h-10 sm:px-5">
                        Presupuesto
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button
                        as={NextLink}
                        color="success"
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="flat"
                        size="md"
                        radius="full"
                        aria-label="WhatsApp"
                        className="h-9 min-w-10 border border-emerald-500/30 bg-emerald-500/10 px-3 text-emerald-700 dark:text-emerald-300 sm:h-10">
                        <span className="hidden nav:inline">WhatsApp</span>
                        <BsWhatsapp className="text-lg nav:hidden" />
                    </Button>
                </NavbarItem>
                {isStoreRoute ? (
                    <NavbarItem>
                        <ResumeCartNav />
                    </NavbarItem>
                ) : null}
            </NavbarContent>

            <NavbarMenu className="pt-4">
                <NavbarMenuItem className="px-1 pb-2 pt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Navegacion
                </NavbarMenuItem>
                {MAIN_LINKS.map((item) => (
                    <NavbarMenuItem key={item.href}>
                        <NextLink
                            href={item.href}
                            className={`block w-full rounded-lg px-2 py-2 text-base transition-colors ${isActivePath(pathname, item.href)
                                ? "font-semibold text-slate-900 dark:text-white"
                                : "text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                                }`}>
                            {item.label}
                        </NextLink>
                    </NavbarMenuItem>
                ))}

                <NavbarMenuItem className="mt-3 px-1 pb-2 pt-4 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Mas
                </NavbarMenuItem>
                {SECONDARY_LINKS.map((item) => (
                    <NavbarMenuItem key={item.href}>
                        <NextLink
                            href={item.href}
                            className={`block w-full rounded-lg px-2 py-2 text-base transition-colors ${isActivePath(pathname, item.href)
                                ? "font-semibold text-slate-900 dark:text-white"
                                : "text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                                }`}>
                            {item.label}
                        </NextLink>
                    </NavbarMenuItem>
                ))}

                <NavbarMenuItem className="mt-4">
                    <div className="flex items-center justify-between rounded-xl border border-slate-200/70 bg-white/70 px-3 py-2 dark:border-white/10 dark:bg-slate-900/60">
                        <span className="text-sm text-slate-700 dark:text-slate-300">Tema</span>
                        <ThemeSwitcher />
                    </div>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    );
}
