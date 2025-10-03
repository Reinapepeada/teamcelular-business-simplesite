import React from "react";
import ReparacionCelular from "@/components/animations/ReparacionCelulares";
import { Oswald } from "next/font/google";
import { Button } from "@nextui-org/react";
import Link from "next/link";
const oswald = Oswald({ subsets: ["latin"], weight: "400" });

export default function BannerHome() {
    return (
        <div
            className="relative flex w-full max-w-6xl flex-col gap-10 overflow-hidden rounded-[32px] border border-white/15 bg-white/3 p-10 shadow-[0_55px_140px_-90px_rgba(15,23,42,0.45)] backdrop-blur-2xl transition md:flex-row md:items-center md:justify-between dark:border-white/10 dark:bg-slate-900/30 dark:shadow-[0_95px_200px_-110px_rgba(8,12,24,0.8)]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(99,68,245,0.1),transparent_60%)] mix-blend-screen opacity-30 dark:bg-[radial-gradient(circle_at_top_left,rgba(148,163,184,0.08),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(99,68,245,0.14),transparent_60%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12)_0%,transparent_65%)] mix-blend-overlay opacity-40 dark:bg-[radial-gradient(circle_at_center,rgba(148,163,184,0.08)_0%,transparent_65%)]" />
            <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(circle_at_center,transparent_45%,black_90%)]">
                <div className="pointer-events-none absolute inset-px rounded-[30px] border border-white/40 opacity-20 mix-blend-soft-light dark:border-white/15" />
            </div>
            <div className="pointer-events-none absolute -left-40 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/8 blur-[100px] dark:bg-primary/10" />
            <div className="pointer-events-none absolute right-[-20%] top-[-30%] h-80 w-80 rounded-full bg-secondary/8 blur-[120px] dark:bg-secondary/12" />
            <div className="pointer-events-none absolute bottom-[-30%] left-1/2 h-56 w-[34rem] -translate-x-1/2 rounded-full bg-white/10 blur-[140px] dark:bg-white/8" />
            <div className="relative z-10 flex w-full flex-col gap-10 md:flex-row md:items-center md:justify-between">
                <div className={`${oswald.className} space-y-6 text-center md:w-1/2 md:text-left`}>
                    <h1 className="text-4xl font-semibold text-slate-900 md:text-5xl dark:text-white">
                        Servicio Técnico Profesional
                    </h1>
                    <p className="text-lg text-slate-700 md:max-w-xl dark:text-slate-200">
                        Diagnóstico experto, repuestos certificados y logística corporativa para que tu comunicación nunca se detenga.
                    </p>
                    <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-start">
                        <Button
                            className="w-full rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-5 text-base font-semibold text-white shadow-lg transition hover:shadow-xl sm:w-auto"
                            radius="full"
                            variant="shadow"
                            as={Link}
                            href="/presupuesto-reparacion">
                            Solicitar presupuesto
                        </Button>
                        <Button
                            as={Link}
                            href="/tienda"
                            variant="bordered"
                            radius="full"
                            className="w-full border-white/20 bg-white/15 px-8 py-5 text-base font-semibold text-slate-800 backdrop-blur md:w-auto dark:border-white/15 dark:bg-white/5 dark:text-white">
                            Ver productos
                        </Button>
                    </div>
                </div>
                <div className="flex w-full flex-col items-center gap-6 md:w-1/2 md:flex-row md:gap-10">
                    <div className="relative flex w-3/4 max-w-sm justify-center overflow-visible md:w-72">
                        <div className="pointer-events-none absolute inset-0 rounded-full bg-white/12 blur-[110px] dark:bg-white/6" />
                        <div className="relative z-10 w-full">
                            <ReparacionCelular />
                        </div>
                    </div>
                    <div className="max-w-sm text-center md:text-left">
                        <p className={`${oswald.className} text-3xl font-light text-slate-800 dark:text-white`}>
                            Tu
                            <span className="font-semibold text-primary"> comunicación </span>
                            es nuestra
                            <span className="font-semibold text-secondary"> prioridad</span>.
                        </p>
                        <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
                            Resolvemos reparaciones críticas con estándares de laboratorio y seguimiento personalizado en cada caso.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
