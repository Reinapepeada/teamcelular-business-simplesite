"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { BsWhatsapp } from "react-icons/bs";
import {
  FaApple,
  FaBatteryHalf,
  FaBookOpen,
  FaBuilding,
  FaMicrochip,
  FaMobileAlt,
} from "react-icons/fa";
import { SiSamsung, SiXiaomi } from "react-icons/si";

const quickGuideLinks = [
  {
    href: "/guias/reparacion-iphone-buenos-aires",
    label: "iPhone",
    Icon: FaApple,
  },
  {
    href: "/guias/reparacion-samsung-buenos-aires",
    label: "Samsung",
    Icon: SiSamsung,
  },
  {
    href: "/guias/reparacion-xiaomi-buenos-aires",
    label: "Xiaomi",
    Icon: SiXiaomi,
  },
  {
    href: "/guias/reparacion-pantalla-celular",
    label: "Pantallas",
    Icon: FaMobileAlt,
  },
  {
    href: "/guias/cambio-bateria-celular",
    label: "Baterias",
    Icon: FaBatteryHalf,
  },
  {
    href: "/guias/microelectronica-reballing-caba",
    label: "Microelectronica",
    Icon: FaMicrochip,
  },
  {
    href: "/guias/soporte-empresas-servicio-tecnico",
    label: "Empresas",
    Icon: FaBuilding,
  },
  {
    href: "/guias/pin-de-carga-suelto-solucion",
    label: "Pin de carga",
    Icon: FaMobileAlt,
  },
  {
    href: "/guias/celular-mojado-que-hacer",
    label: "Celular mojado",
    Icon: FaBookOpen,
  },
];

export default function GuidesLayout({
  children,
}: {
  readonly children: ReactNode;
}) {
  const pathname = usePathname();
  const activeChipRef = useRef<HTMLAnchorElement | null>(null);

  // ponytail: la tira de chips scrollea en mobile; sin esto el chip activo
  // puede quedar fuera de vista y el usuario no ve donde esta parado.
  useEffect(() => {
    activeChipRef.current?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [pathname]);

  return (
    <div className="relative isolate w-full overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 bg-slate-50 dark:bg-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_10%,rgba(14,165,233,0.16),transparent_33%),radial-gradient(circle_at_86%_15%,rgba(16,185,129,0.14),transparent_35%)] dark:bg-[radial-gradient(circle_at_12%_10%,rgba(14,165,233,0.14),transparent_30%),radial-gradient(circle_at_88%_14%,rgba(99,102,241,0.16),transparent_34%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-35 [background-image:linear-gradient(rgba(148,163,184,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.1)_1px,transparent_1px)] [background-size:38px_38px] dark:opacity-15"
      />

      <section className="relative z-10 border-b border-slate-200/80 bg-white/75 backdrop-blur-md dark:border-slate-800/70 dark:bg-slate-950/45">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-3 md:flex-row md:items-center md:justify-between md:gap-4 md:py-4">
          <div className="space-y-1 min-w-0">
            <Link
              href="/guias"
              className="inline-flex min-h-11 max-w-full items-center gap-2 rounded-full border border-primary/70 bg-primary px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white shadow-sm transition hover:bg-primary/90 sm:text-[11px] sm:tracking-[0.18em]"
            >
              <FaBookOpen className="shrink-0 text-[10px]" />
              <span className="truncate">Guias Team Celular</span>
            </Link>
            <p className="hidden text-xs text-slate-700 md:block md:text-sm dark:text-slate-300">
              Guias por marca y por falla con procesos reales, tiempos y garantia.
            </p>
          </div>

          <div className="-mx-4 flex items-center gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0">
            {quickGuideLinks.map((item) => {
              const Icon = item.Icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  ref={isActive ? activeChipRef : undefined}
                  aria-current={isActive ? "page" : undefined}
                  className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-3.5 text-[13px] font-medium transition md:px-4 md:text-sm ${
                    isActive
                      ? "cursor-default border-primary bg-primary text-white shadow-sm"
                      : "border-slate-300/80 bg-white/80 text-slate-700 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary dark:border-slate-600/70 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-primary/50 dark:hover:text-primary"
                  }`}
                >
                  <Icon className="text-[13px]" />
                  {item.label}
                  {isActive ? <span className="sr-only"> (estas aca)</span> : null}
                </Link>
              );
            })}
            <Link
              href="https://wa.me/5491151034595?text=Hola%20Team%20Celular%2C%20quiero%20ayuda%20con%20una%20reparacion"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-emerald-700 px-3.5 text-[13px] md:px-4 md:text-sm font-semibold text-white shadow-lg shadow-emerald-900/30 transition hover:bg-emerald-800"
            >
              <BsWhatsapp className="text-base" />
              Hablar por WhatsApp
            </Link>
          </div>
        </div>
      </section>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
