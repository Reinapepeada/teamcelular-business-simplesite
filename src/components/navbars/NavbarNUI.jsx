"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { BsChevronDown, BsList, BsWhatsapp, BsX } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import ThemeSwitcher, {
    ThemeSwitcherInline,
} from "@/components/switch/ThemeSwitcher";

const MAIN_LINKS = [
    { href: "/arreglo-de-celulares", label: "Arreglo" },
    { href: "/reparaciones", label: "Reparaciones" },
    { href: "/tienda", label: "Tienda" },
    { href: "/guias", label: "Guías" },
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
    const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const desktopMenuRef = useRef(null);

    useEffect(() => {
        setDesktopMenuOpen(false);
        setMobileMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                desktopMenuRef.current &&
                !desktopMenuRef.current.contains(event.target)
            ) {
                setDesktopMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur dark:border-white/10 dark:bg-slate-950/92">
            <div className="mx-auto flex min-h-[76px] w-full max-w-[100rem] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3">
                    <Link href="/" className="flex items-center gap-3 text-inherit">
                        <Image
                            className="hidden h-10 w-auto dark:hidden sm:block"
                            src="/images/brand/imagotipo-dark.png"
                            alt="Team Celular"
                            width={1725}
                            height={591}
                            sizes="(max-width: 640px) 140px, 170px"
                            priority
                        />
                        <Image
                            className="hidden h-10 w-auto sm:dark:block"
                            src="/images/brand/imagotipo-light.png"
                            alt="Team Celular"
                            width={1725}
                            height={591}
                            sizes="(max-width: 640px) 140px, 170px"
                            priority
                        />
                        <Image
                            className="h-12 w-auto dark:hidden sm:hidden"
                            src="/images/ISOTIPO/SVG/ISOTIPO_black.svg"
                            alt="Team Celular"
                            width={256}
                            height={256}
                            sizes="40px"
                        />
                        <Image
                            className="hidden h-12 w-auto dark:block sm:hidden"
                            src="/images/ISOTIPO/SVG/ISOTIPO_light.svg"
                            alt="Team Celular"
                            width={256}
                            height={256}
                            sizes="40px"
                        />
                    </Link>

                    <div className="hidden xl:block">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                            Recoleta - CABA
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                            Servicio técnico y presupuesto por WhatsApp
                        </p>
                    </div>
                </div>

                <nav className="hidden items-center gap-5 lg:flex">
                    {MAIN_LINKS.map((item) => {
                        const active = isActivePath(pathname, item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex min-h-11 items-center py-2 text-sm font-medium transition ${
                                    active
                                        ? "text-primary"
                                        : "text-slate-700 hover:text-slate-950 dark:text-slate-200 dark:hover:text-white"
                                }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}

                    <div ref={desktopMenuRef} className="relative">
                        <button
                            type="button"
                            onClick={() => setDesktopMenuOpen((current) => !current)}
                            className={`flex min-h-11 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                                desktopMenuOpen
                                    ? "bg-slate-100 text-slate-950 dark:bg-slate-800 dark:text-white"
                                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white"
                            }`}
                            aria-expanded={desktopMenuOpen}
                            aria-haspopup="menu"
                        >
                            Más
                            <BsChevronDown
                                className={`text-xs transition ${desktopMenuOpen ? "rotate-180" : ""}`}
                                aria-hidden
                            />
                        </button>

                        {desktopMenuOpen ? (
                            <div className="absolute right-0 top-[calc(100%+0.5rem)] z-20 w-60 rounded-[1.4rem] border border-slate-200 bg-white p-3 shadow-xl dark:border-white/10 dark:bg-slate-900">
                                <ul className="space-y-1">
                                    {SECONDARY_LINKS.map((item) => {
                                        const active = isActivePath(pathname, item.href);

                                        return (
                                            <li key={item.href}>
                                                <Link
                                                    href={item.href}
                                                    prefetch={false}
                                                    className={`flex min-h-11 items-center rounded-xl px-3 py-2 text-sm transition ${
                                                        active
                                                            ? "bg-slate-100 font-medium text-primary dark:bg-slate-800"
                                                            : "text-slate-700 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white"
                                                    }`}
                                                >
                                                    {item.label}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ) : null}
                    </div>
                </nav>

                <div className="hidden items-center gap-2 sm:flex">
                    <ThemeSwitcher />
                    <Link
                        href="/presupuesto-reparacion#solicitar-presupuesto"
                        className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:bg-primary/90"
                    >
                        Presupuesto
                    </Link>
                    <Link
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-400/25 dark:bg-emerald-500/10 dark:text-emerald-300 dark:hover:bg-emerald-500/15"
                    >
                        <BsWhatsapp className="text-lg" aria-hidden />
                        WhatsApp
                    </Link>
                </div>

                <button
                    type="button"
                    onClick={() => setMobileMenuOpen((current) => !current)}
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 lg:hidden dark:border-white/15 dark:bg-slate-900 dark:text-white dark:hover:border-white/25 dark:hover:bg-slate-800"
                    aria-expanded={mobileMenuOpen}
                    aria-controls="mobile-site-menu"
                >
                    {mobileMenuOpen ? <BsX aria-hidden /> : <BsList aria-hidden />}
                </button>
            </div>

            {mobileMenuOpen ? (
                <div
                    id="mobile-site-menu"
                    className="border-t border-slate-200/80 bg-white px-4 py-4 lg:hidden dark:border-white/10 dark:bg-slate-950"
                >
                    <div className="mx-auto w-full max-w-[100rem] space-y-3">
                        <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/80">
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                                Recoleta - CABA
                            </p>
                            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                                Laboratorio técnico, presupuesto sin cargo y respuesta comercial rápida.
                            </p>
                        </div>

                        <div className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 dark:border-white/10">
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                                Tema
                            </span>
                            <ThemeSwitcherInline />
                        </div>

                        <ul className="space-y-1">
                            {[...MAIN_LINKS, ...SECONDARY_LINKS].map((item) => {
                                const active = isActivePath(pathname, item.href);

                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            prefetch={false}
                                            className={`flex min-h-11 items-center rounded-xl px-3 py-2 text-sm font-medium transition ${
                                                active
                                                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950"
                                                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white"
                                            }`}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>

                        <div className="grid gap-2 pt-2">
                            <Link
                                href="/presupuesto-reparacion#solicitar-presupuesto"
                                className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:bg-primary/90"
                            >
                                Pedir presupuesto
                            </Link>
                            <Link
                                href={WHATSAPP_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-400/25 dark:bg-emerald-500/10 dark:text-emerald-300 dark:hover:bg-emerald-500/15"
                            >
                                <BsWhatsapp className="text-lg" aria-hidden />
                                Abrir WhatsApp
                            </Link>
                        </div>
                    </div>
                </div>
            ) : null}
        </header>
    );
}
