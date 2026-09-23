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
    <div className="relative isolate w-full bg-black">
      <section className="relative z-10 border-b border-[#333336] bg-black">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-3 md:flex-row md:items-center md:justify-between md:gap-4 md:py-4">
          <div className="space-y-1 min-w-0">
            <Link
              href="/guias"
              className="inline-flex min-h-11 max-w-full items-center gap-2 text-[21px] font-semibold text-[#f5f5f7]"
            >
              <FaBookOpen className="shrink-0 text-base text-[#86868b]" aria-hidden />
              <span className="truncate">Guías</span>
            </Link>
            <p className="hidden text-[12px] text-[#86868b] md:block">
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
                  className={`relative inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-3.5 text-[13px] transition md:px-4 ${
                    isActive
                      ? "cursor-default bg-[#f5f5f7] text-black"
                      : "bg-[#1d1d1f] text-[#cccccc] hover:bg-[#333336] hover:text-white"
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
              className="tc-link inline-flex min-h-11 shrink-0 items-center gap-2 px-2 text-[13px]"
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
