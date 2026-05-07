import React from "react";
import Image from "next/image";
import { BsWhatsapp, BsCheckCircleFill } from "react-icons/bs";
import TrackedCtaLink from "@/components/cro/TrackedCtaLink";

const stats = [
    { value: "10+", label: "años reparando" },
    { value: "< 2h", label: "respuesta WA" },
    { value: "90 días", label: "garantía escrita" },
];

const serviceHints = [
    "Cambio de pantalla",
    "Cambio de batería",
    "Reparación de placa",
    "Recuperación por agua",
];

export default function BannerHome() {
    return (
        <section className="relative w-full max-w-[100rem] overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xl dark:border-slate-700/60 dark:bg-slate-900">
            {/* Brand accent top bar */}
            <div className="absolute inset-x-0 top-0 z-10 h-0.5 bg-gradient-to-r from-primary/80 via-secondary/60 to-primary/30" />

            <div className="relative z-10 grid lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
                {/* Left: content */}
                <div className="order-2 flex flex-col justify-center space-y-6 px-6 py-10 md:px-10 md:py-14 lg:order-1">
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" aria-hidden />
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                            Servicio técnico en Recoleta · Abierto Lun–Vie
                        </p>
                    </div>

                    <h1 className="max-w-xl text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl lg:text-[3.1rem]">
                        Arreglamos tu celular el mismo día
                    </h1>

                    <div className="max-w-xl space-y-2.5">
                        <p className="text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-[1.03rem]">
                            Diagnóstico en el día, repuestos de calidad y garantía escrita.
                        </p>
                        <p className="text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-[1.03rem]">
                            Contanos la falla y te orientamos por WhatsApp para que sepas el siguiente paso sin perder tiempo.
                        </p>
                    </div>

                    {/* Service hint tags */}
                    <div className="flex flex-wrap gap-2">
                        {serviceHints.map((s) => (
                            <span
                                key={s}
                                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300"
                            >
                                <BsCheckCircleFill className="text-emerald-500" aria-hidden />
                                {s}
                            </span>
                        ))}
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <TrackedCtaLink
                            href="/presupuesto-reparacion#solicitar-presupuesto"
                            ctaName="home_hero_budget"
                            ctaLocation="home_hero"
                            ctaVariant="primary"
                            className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                        >
                            Solicitar presupuesto
                        </TrackedCtaLink>
                        <TrackedCtaLink
                            href="https://wa.me/5491151034595?text=Hola%20Team%20Celular,%20necesito%20una%20reparacion"
                            ctaName="home_hero_whatsapp"
                            ctaLocation="home_hero"
                            ctaVariant="whatsapp"
                            external
                            target="_blank"
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-50 px-7 py-3.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:border-emerald-400/35 dark:bg-emerald-500/15 dark:text-emerald-200 dark:hover:bg-emerald-500/25"
                        >
                            <BsWhatsapp className="text-lg" aria-hidden />
                            WhatsApp directo
                        </TrackedCtaLink>
                    </div>

                    {/* Stat row */}
                    <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-slate-200/80 pt-5 dark:border-slate-700/60">
                        {stats.map((item) => (
                            <div key={item.value} className="text-left">
                                <p className="text-2xl font-extrabold leading-none text-primary">
                                    {item.value}
                                </p>
                                <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                                    {item.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: image */}
                <div className="order-1 lg:order-2">
                    <div className="relative h-[15rem] sm:h-[22rem] lg:h-full lg:min-h-[28rem]">
                        <Image
                            src="/images/handsome-young-man-smiling-while-repairing-old-smartphone-male-technician-using-screwdriver-fix-brok.webp"
                            alt="Técnico reparando un smartphone en el laboratorio de Team Celular, Recoleta"
                            fill
                            quality={82}
                            sizes="(max-width: 1024px) 100vw, 46vw"
                            className="object-cover"
                            priority
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-transparent lg:bg-gradient-to-l lg:from-slate-950/10 lg:via-transparent" />

                        {/* Floating badge */}
                        <div className="absolute bottom-4 left-4 rounded-xl border border-white/80 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-sm dark:border-white/15 dark:bg-slate-900/95">
                            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                                Respuesta comercial
                            </p>
                            <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                                <span className="text-primary">{"< 2 horas"}</span>{" "}
                                <span className="font-normal text-slate-500 dark:text-slate-400">· Lun–Vie</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
