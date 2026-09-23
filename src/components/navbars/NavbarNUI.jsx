"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { BsChevronDown, BsList, BsWhatsapp, BsX } from "react-icons/bs";
import { track } from "@vercel/analytics";
import Image from "next/image";
import Link from "next/link";
import BranchWhatsAppButton from "@/components/cro/BranchSelector";

const MAIN_LINKS = [
    { href: "/reparaciones", label: "Reparaciones" },
    { href: "/tienda", label: "Tienda" },
    { href: "/guias", label: "Guías" },
    { href: "/sucursales", label: "Sucursales" },
];

const SECONDARY_LINKS = [
    { href: "/contacto", label: "Contacto" },
    { href: "/sobrenosotros", label: "Sobre nosotros" },
];

const BUDGET_URL = "/presupuesto-reparacion#solicitar-presupuesto";

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

    function trackNavbarCta(ctaName, ctaLocation, ctaVariant, destination) {
        track("cta_click", {
            cta_name: ctaName,
            cta_location: ctaLocation,
            cta_variant: ctaVariant,
            destination,
        });
    }

    return (
        <header className="sticky top-0 z-50 w-full bg-black/80 text-[#f5f5f7] backdrop-blur-xl backdrop-saturate-150">
            <div className="mx-auto flex min-h-[52px] w-full max-w-[1200px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3">
                    <Link href="/" className="flex items-center gap-3 text-inherit">
                        <div className="hidden sm:block">
                            <Image
                                className="h-7 w-auto dark:hidden"
                                src="/images/brand/imagotipo-light.png"
                                alt="Team Celular"
                                width={1725}
                                height={591}
                                sizes="(max-width: 640px) 140px, 170px"
                                priority
                            />
                            <Image
                                className="hidden h-7 w-auto dark:block"
                                src="/images/brand/imagotipo-dark.png"
                                alt="Team Celular"
                                width={1725}
                                height={591}
                                sizes="(max-width: 640px) 140px, 170px"
                                priority
                            />
                        </div>
                        <div className="sm:hidden">
                            <Image
                                className="h-8 w-auto dark:hidden"
                                src="/images/ISOTIPO/SVG/ISOTIPO_light.svg"
                                alt="Team Celular"
                                width={256}
                                height={256}
                                sizes="40px"
                            />
                            <Image
                                className="hidden h-8 w-auto dark:block"
                                src="/images/ISOTIPO/SVG/ISOTIPO_black.svg"
                                alt="Team Celular"
                                width={256}
                                height={256}
                                sizes="40px"
                            />
                        </div>
                    </Link>

                </div>

                <nav className="hidden items-center gap-7 lg:flex">
                    {MAIN_LINKS.map((item) => {
                        const active = isActivePath(pathname, item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex min-h-11 items-center py-2 text-[12px] transition ${
                                    active ? "text-white" : "text-[#cccccc]/80 hover:text-white"
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
                            className={`flex min-h-11 items-center gap-1.5 py-2 text-[12px] transition ${
                                desktopMenuOpen ? "text-white" : "text-[#cccccc]/80 hover:text-white"
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
                            <div className="absolute right-0 top-[calc(100%+0.5rem)] z-20 w-60 rounded-[18px] bg-[#1d1d1f] p-2">
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
                                                            ? "bg-slate-100 font-medium text-primary dark:bg-slate-800/70 dark:text-sky-300"
                                                            : "text-slate-700 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-200 dark:hover:bg-slate-800/70 dark:hover:text-white"
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
                    <Link
                        href={BUDGET_URL}
                        onClick={() =>
                            trackNavbarCta(
                                "navbar_budget",
                                "navbar_desktop",
                                "primary",
                                BUDGET_URL,
                            )
                        }
                        className="tc-btn tc-btn-primary !min-h-8 !px-4 !py-1 !text-[12px]"
                    >
                        Presupuesto
                    </Link>
                    <BranchWhatsAppButton
                        ctaName="navbar_whatsapp"
                        ctaLocation="navbar_desktop"
                        className="inline-flex min-h-8 items-center justify-center gap-1.5 rounded-full px-3 text-[12px] text-[#cccccc]/80 transition hover:text-white"
                    >
                        <BsWhatsapp className="text-sm" aria-hidden />
                        WhatsApp
                    </BranchWhatsAppButton>
                </div>

                <button
                    type="button"
                    onClick={() => setMobileMenuOpen((current) => !current)}
                    className="inline-flex min-h-11 min-w-11 items-center justify-center text-xl text-[#f5f5f7] lg:hidden"
                    aria-expanded={mobileMenuOpen}
                    aria-controls="mobile-site-menu"
                    aria-label={mobileMenuOpen ? "Cerrar menu" : "Abrir menu"}
                >
                    {mobileMenuOpen ? <BsX aria-hidden /> : <BsList aria-hidden />}
                </button>
            </div>

            {mobileMenuOpen ? (
                <div
                    id="mobile-site-menu"
                    className="h-[calc(100dvh-52px)] overflow-y-auto bg-black px-6 py-6 lg:hidden"
                >
                    <div className="mx-auto w-full max-w-[100rem] space-y-3">
                        <ul className="space-y-1">
                            {[...MAIN_LINKS, ...SECONDARY_LINKS].map((item) => {
                                const active = isActivePath(pathname, item.href);

                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            prefetch={false}
                                            className={`flex min-h-12 items-center text-[28px] font-semibold transition ${
                                                active ? "text-white" : "text-[#d2d2d7] hover:text-white"
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
                                href={BUDGET_URL}
                                onClick={() =>
                                    trackNavbarCta(
                                        "navbar_budget",
                                        "navbar_mobile_drawer",
                                        "primary",
                                        BUDGET_URL,
                                    )
                                }
                                className="tc-btn tc-btn-primary"
                            >
                                Pedir presupuesto
                            </Link>
                            <BranchWhatsAppButton
                                ctaName="navbar_whatsapp"
                                ctaLocation="navbar_mobile_drawer"
                                className="tc-btn tc-btn-ghost"
                            >
                                <BsWhatsapp className="text-lg" aria-hidden />
                                Abrir WhatsApp
                            </BranchWhatsAppButton>
                        </div>
                    </div>
                </div>
            ) : null}
        </header>
    );
}
