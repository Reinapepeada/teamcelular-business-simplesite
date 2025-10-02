import React from "react";
import ReparacionCelular from "@/components/animations/ReparacionCelulares";
import { Oswald } from "next/font/google";
import { Button } from "@nextui-org/react";
import Link from "next/link";
const oswald = Oswald({ subsets: ["latin"], weight: "400" });

export default function BannerHome() {
    return (
        <div
            className="flex w-full max-w-6xl flex-col gap-10 rounded-3xl border border-slate-200/50 bg-white/80 p-10 shadow-2xl transition md:flex-row md:items-center md:justify-between dark:border-slate-800/60 dark:bg-slate-950/75 dark:shadow-[0_35px_60px_-25px_rgba(15,23,42,0.8)]">
            <div className={`${oswald.className} space-y-6 text-center md:text-left`}>
                <h1 className="text-4xl font-semibold text-slate-900 md:text-5xl dark:text-white">
                    Servicio Técnico Profesional
                </h1>
                <p className="text-lg text-slate-600 md:max-w-xl dark:text-slate-300">
                    Diagnóstico experto, repuestos certificados y logística corporativa para que tu comunicación nunca se detenga.
                </p>
                <Button
                    className="w-full rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-5 text-base font-semibold text-white shadow-lg transition hover:shadow-xl sm:w-60"
                    radius="full"
                    variant="shadow"
                    as={Link}
                    href="/presupuesto-reparacion">
                    Solicitar presupuesto
                </Button>
            </div>
            <div className="flex flex-col items-center gap-6 md:flex-row md:gap-10">
                <div className="flex w-11/12 justify-center md:w-80">
                    <ReparacionCelular />
                </div>
                <div className="max-w-sm text-center md:text-left">
                    <p className={`${oswald.className} text-3xl font-light text-slate-800 dark:text-slate-100`}>
                        Tu
                        <span className="font-semibold text-primary"> comunicación </span>
                        es nuestra
                        <span className="font-semibold text-secondary"> prioridad</span>.
                    </p>
                    <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                        Resolvemos reparaciones críticas con estándares de laboratorio y seguimiento personalizado en cada caso.
                    </p>
                </div>
            </div>
        </div>
    );
}
