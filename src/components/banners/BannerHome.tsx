import React from "react";
import ReparacionCelular from "@/components/animations/ReparacionCelulares";
import { Oswald } from "next/font/google";
import { Button } from "@nextui-org/react";
import Link from "next/link";
const oswald = Oswald({ subsets: ["latin"], weight: "400" });

export default function BannerHome() {
    return (
        <div className="relative flex w-full max-w-6xl flex-col gap-10 overflow-hidden rounded-2xl border border-white/10 bg-black/5 p-10 shadow-lg backdrop-blur-[2px] transition-all duration-300 ease-in-out hover:shadow-2xl md:flex-row md:items-center md:justify-between dark:border-white/5 dark:bg-slate-900/10">
            {/* Capas de efecto para el "liquid glass" con opacidad muy baja */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.05),transparent_60%),radial-gradient(circle_at_bottom_right,rgba(99,68,245,0.02),transparent_70%)] opacity-50 mix-blend-screen" />
            <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(circle_at_center,transparent_60%,black_100%)]">
                <div className="pointer-events-none absolute inset-px rounded-2xl border border-white/15 opacity-10" />
            </div>
            <div className="pointer-events-none absolute -left-40 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/3 blur-2xl" />
            <div className="pointer-events-none absolute right-[-20%] top-[-30%] h-80 w-80 rounded-full bg-secondary/3 blur-2xl" />

            <div className="relative z-10 flex w-full flex-col gap-10 md:flex-row md:items-center md:justify-between">
                <div className={`${oswald.className} space-y-6 text-center md:w-1/2 md:text-left`}>
                    <h1 className="text-4xl font-semibold text-slate-900 md:text-5xl dark:text-white">
                        Arreglamos tu celular el mismo día
                    </h1>
                    <div className="flex flex-col gap-2">
                        <p className="text-lg text-slate-700 md:max-w-xl dark:text-slate-200">
                            Repuestos originales, diagnóstico y garantía real. 
                        </p>
                        <p className="text-md text-slate-700 md:max-w-xl dark:text-slate-200">
                            Porque sabemos que sin tu celular, tu día no es el mismo.
                        </p>
                    </div>
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
                            Más de
                            <span className="font-semibold text-primary"> 10 años </span>
                            reparando lo que
                            <span className="font-semibold text-secondary"> otros no pueden</span>.
                        </p>
                        <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
                            Desde pantallas rotas hasta problemas de placa. Si tiene solución, la encontramos.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
