import React from "react";
import { BsWhatsapp } from "react-icons/bs";
import Image from "next/image";
import NextLink from "next/link";

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
    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur">
            <div className="mx-auto flex min-h-[76px] w-full max-w-[100rem] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3">
                    <NextLink href="/" className="flex items-center gap-3 text-inherit">
                        <Image
                            className="hidden h-10 w-auto sm:block"
                            src="/images/brand/imagotipo-light.png"
                            alt="Team Celular"
                            width={1725}
                            height={591}
                            sizes="(max-width: 640px) 140px, 170px"
                            priority
                        />
                        <Image
                            className="h-12 w-auto sm:hidden"
                            src="/images/ISOTIPO/SVG/ISOTIPO_light.svg"
                            alt="Team Celular"
                            width={256}
                            height={256}
                            sizes="40px"
                        />
                    </NextLink>
                    <div className="hidden xl:block">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                            Recoleta - CABA
                        </p>
                        <p className="text-sm text-slate-600">
                            Servicio tecnico y presupuesto por WhatsApp
                        </p>
                    </div>
                </div>

                <nav className="hidden items-center gap-5 lg:flex">
                    {MAIN_LINKS.map((item) => (
                        <NextLink
                            key={item.href}
                            href={item.href}
                            className="min-h-11 items-center py-2 text-sm font-medium text-slate-700 transition hover:text-slate-950"
                        >
                            {item.label}
                        </NextLink>
                    ))}
                    <details className="relative">
                        <summary className="flex min-h-11 cursor-pointer list-none items-center rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950 [&::-webkit-details-marker]:hidden">
                            Mas
                        </summary>
                        <div className="absolute right-0 top-[calc(100%+0.5rem)] z-20 w-60 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
                            <ul className="space-y-1">
                                {SECONDARY_LINKS.map((item) => (
                                    <li key={item.href}>
                                        <NextLink
                                            href={item.href}
                                            prefetch={false}
                                            className="flex min-h-11 items-center rounded-xl px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
                                        >
                                            {item.label}
                                        </NextLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </details>
                </nav>

                <div className="hidden items-center gap-2 sm:flex">
                    <NextLink
                        href="/presupuesto-reparacion#solicitar-presupuesto"
                        className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:bg-primary/90"
                    >
                        Presupuesto
                    </NextLink>
                    <NextLink
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
                    >
                        <BsWhatsapp className="text-lg" aria-hidden />
                        WhatsApp
                    </NextLink>
                </div>

                <details className="relative lg:hidden">
                    <summary className="flex min-h-11 min-w-11 cursor-pointer list-none items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 [&::-webkit-details-marker]:hidden">
                        Menu
                    </summary>
                    <div className="absolute right-0 top-[calc(100%+0.5rem)] z-20 w-[min(22rem,calc(100vw-2rem))] rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
                        <div className="space-y-2">
                            <div className="rounded-2xl bg-slate-50 p-4">
                                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                                    Recoleta - CABA
                                </p>
                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    Laboratorio tecnico, presupuesto sin cargo y respuesta comercial rapida.
                                </p>
                            </div>

                            <ul className="space-y-1">
                                {[...MAIN_LINKS, ...SECONDARY_LINKS].map((item) => {
                                    const active = isActivePath(null, item.href);
                                    return (
                                        <li key={item.href}>
                                            <NextLink
                                                href={item.href}
                                                prefetch={false}
                                                className={`flex min-h-11 items-center rounded-xl px-3 py-2 text-sm font-medium transition ${
                                                    active
                                                        ? "bg-slate-900 text-white"
                                                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                                                }`}
                                            >
                                                {item.label}
                                            </NextLink>
                                        </li>
                                    );
                                })}
                            </ul>

                            <div className="grid gap-2 pt-2">
                                <NextLink
                                    href="/presupuesto-reparacion#solicitar-presupuesto"
                                    className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:bg-primary/90"
                                >
                                    Pedir presupuesto
                                </NextLink>
                                <NextLink
                                    href={WHATSAPP_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
                                >
                                    <BsWhatsapp className="text-lg" aria-hidden />
                                    Abrir WhatsApp
                                </NextLink>
                            </div>
                        </div>
                    </div>
                </details>
            </div>
        </header>
    );
}
