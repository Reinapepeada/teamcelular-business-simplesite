import React from "react";
import Image from "next/image";
import { BsWhatsapp } from "react-icons/bs";
import TrackedCtaLink from "@/components/cro/TrackedCtaLink";

const trustSignals = [
    { value: "10+ años", label: "reparando celulares" },
    { value: "2h", label: "en responderte" },
    { value: "90 días", label: "de garantía real" },
];

export default function BannerHome() {
    return (
        <section className="relative w-full max-w-[100rem] overflow-hidden rounded-2xl border border-white/10 bg-black/5 px-6 py-8 shadow-lg backdrop-blur-[2px] transition-all duration-300 ease-in-out hover:shadow-2xl dark:border-white/5 dark:bg-slate-900/10 md:px-10 md:py-12">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.05),transparent_60%),radial-gradient(circle_at_bottom_right,rgba(99,68,245,0.02),transparent_70%)] opacity-50 mix-blend-screen" />
            <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(circle_at_center,transparent_60%,black_100%)]">
                <div className="pointer-events-none absolute inset-px rounded-2xl border border-white/15 opacity-10" />
            </div>
            <div className="pointer-events-none absolute -left-40 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/3 blur-2xl" />
            <div className="pointer-events-none absolute right-[-20%] top-[-30%] h-80 w-80 rounded-full bg-secondary/3 blur-2xl" />

            <div className="relative z-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                <div className="order-2 space-y-5 md:space-y-6 lg:order-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/90">
                        Servicio técnico en Recoleta
                    </p>

                    <h1 className="max-w-xl text-4xl font-extrabold leading-[1.03] tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl lg:text-[3.2rem]">
                        Arreglamos tu celular el mismo día
                    </h1>

                    <div className="max-w-xl space-y-2">
                        <p className="text-base leading-7 text-slate-700 dark:text-slate-300 sm:text-[1.03rem]">
                            Diagnóstico en el día, repuestos de calidad y garantía escrita.
                        </p>
                        <p className="text-base leading-7 text-slate-700 dark:text-slate-300 sm:text-[1.03rem]">
                            Contanos la falla y te orientamos por WhatsApp para que sepas el siguiente paso sin perder tiempo.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <TrackedCtaLink
                            href="/presupuesto-reparacion#solicitar-presupuesto"
                            ctaName="home_hero_budget"
                            ctaLocation="home_hero"
                            ctaVariant="primary"
                            className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
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
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-500/35 bg-emerald-50 px-7 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:border-emerald-400/35 dark:bg-emerald-500/15 dark:text-emerald-200 dark:hover:bg-emerald-500/25"
                        >
                            <BsWhatsapp className="text-lg" aria-hidden />
                            WhatsApp directo
                        </TrackedCtaLink>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                        {trustSignals.map((item) => (
                            <div
                                key={item.value}
                                className="rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-left shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/60"
                            >
                                <p className="text-xl font-bold leading-none text-slate-900 dark:text-slate-100">
                                    {item.value}
                                </p>
                                <p className="text-[11px] uppercase tracking-[0.11em] text-slate-500 dark:text-slate-400">
                                    {item.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="order-1 lg:order-2">
                    <div className="relative mx-auto w-full max-w-[34rem] xl:max-w-[38rem] 2xl:max-w-[42rem]">
                        <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-secondary/20 blur-3xl dark:bg-secondary/25" />

                        <div className="relative overflow-hidden rounded-[2.3rem] border border-slate-200/80 bg-white shadow-[0_25px_70px_-40px_rgba(15,23,42,0.55)] dark:border-white/10 dark:bg-slate-950">
                            <Image
                                src="/images/handsome-young-man-smiling-while-repairing-old-smartphone-male-technician-using-screwdriver-fix-brok.webp"
                                alt="Técnico reparando un smartphone en el laboratorio"
                                width={1200}
                                height={1400}
                                quality={82}
                                sizes="(max-width: 1024px) 100vw, 46vw"
                                className="h-[15rem] w-full object-cover sm:h-[22rem] md:h-[26rem] lg:h-[30rem]"
                                priority
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />
                        </div>

                        <div className="absolute bottom-4 left-5 rounded-2xl border border-white/70 bg-white/90 px-4 py-3 shadow-xl backdrop-blur-sm dark:border-white/15 dark:bg-slate-900/90">
                            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                                Respuesta comercial
                            </p>
                            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                <span className="text-primary">&lt; 2 horas</span> en horario laboral
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

