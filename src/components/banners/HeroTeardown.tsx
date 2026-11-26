"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type TeardownModule = {
    mount: (canvas: HTMLCanvasElement, options?: { accent?: string; onReady?: () => void }) => () => void;
};
type DeviceHints = Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
    deviceMemory?: number;
};

// Módulo estático en /public: queda fuera del bundle y solo se descarga si el equipo puede con el 3D.
const MODULE_URL = "/hero/teardown.js";

function canAnimate() {
    const hints = navigator as DeviceHints;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    if (hints.connection?.saveData || /(^|-)[23]g$/.test(hints.connection?.effectiveType ?? "")) return false;
    if ((hints.deviceMemory ?? 8) < 4 || (navigator.hardwareConcurrency ?? 4) < 4) return false;
    // Solo escritorio: en móvil la imagen fija cuida datos, batería y Core Web Vitals.
    return matchMedia("(min-width: 1024px) and (hover: hover)").matches;
}

/**
 * Despiece del hero. La imagen fija es el LCP y lo único que ven los móviles, los equipos lentos,
 * quienes ahorran datos o piden menos movimiento. En escritorio, el 3D se monta encima
 * cuando el navegador queda libre, arrancando en la misma pose que la imagen.
 */
export default function HeroTeardown() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [live, setLive] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !canAnimate()) return;
        let cancelled = false;
        let dispose: (() => void) | undefined;
        const start = () => {
            (import(/* webpackIgnore: true */ MODULE_URL) as Promise<TeardownModule>)
                .then((mod) => {
                    if (cancelled) return;
                    dispose = mod.mount(canvas, { onReady: () => setLive(true) });
                })
                .catch(() => undefined); // sin WebGL o sin CDN queda la imagen fija
        };
        // Espera a que la página termine de cargar y quede ociosa: no compite con el LCP ni con la hidratación.
        const idle = typeof requestIdleCallback === "function";
        let id = 0;
        const schedule = () => {
            id = idle ? requestIdleCallback(start, { timeout: 4000 }) : window.setTimeout(start, 2500);
        };
        if (document.readyState === "complete") schedule();
        else window.addEventListener("load", schedule, { once: true });
        return () => {
            cancelled = true;
            window.removeEventListener("load", schedule);
            if (idle) cancelIdleCallback(id);
            else window.clearTimeout(id);
            dispose?.();
        };
    }, []);

    return (
        <div className="relative aspect-[6/5] overflow-hidden rounded-[28px] bg-black">
            <Image
                src="/images/landings/despiece-smartphone-v3.webp"
                alt="Ilustración de un smartphone desarmado en capas: vidrio, pantalla, marco, batería, placa lógica, cámaras, bobina de carga y tapa trasera"
                fill
                loading="eager"
                fetchPriority="high"
                quality={82}
                sizes="(max-width: 1023px) 100vw, 550px"
                className="object-contain"
            />
            <canvas
                ref={canvasRef}
                aria-hidden
                className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${live ? "opacity-100" : "pointer-events-none opacity-0"}`}
            />
        </div>
    );
}
