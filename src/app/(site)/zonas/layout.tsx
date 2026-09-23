import type { ReactNode } from "react";
import Link from "next/link";
import { BsWhatsapp } from "react-icons/bs";
import { FaMapMarkedAlt } from "react-icons/fa";

const quickZones = [
  { href: "/zonas/palermo", label: "Palermo" },
  { href: "/zonas/balvanera", label: "Balvanera / Once" },
];

export default function ZonasLayout({
  children,
}: {
  readonly children: ReactNode;
}) {
  return (
    <div className="relative isolate w-full bg-black">
      <section className="relative z-10 border-b border-[#333336] bg-black">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p className="inline-flex items-center gap-2 text-[21px] font-semibold text-[#f5f5f7]">
              <FaMapMarkedAlt className="text-base text-[#86868b]" aria-hidden />
              Cobertura CABA
            </p>
            <p className="text-[12px] text-[#86868b]">
              Elegí tu barrio y te decimos qué sucursal te queda más cerca.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {quickZones.map((zone) => (
              <Link
                key={zone.href}
                href={zone.href}
                className="inline-flex min-h-11 items-center rounded-full bg-[#1d1d1f] px-4 text-[13px] text-[#cccccc] transition hover:bg-[#333336] hover:text-white"
              >
                {zone.label}
              </Link>
            ))}
            <Link
              href="https://wa.me/5491151034595?text=Hola%20Team%20Celular,%20quiero%20presupuesto%20para%20mi%20zona"
              target="_blank"
              rel="noopener noreferrer"
              className="tc-link inline-flex min-h-11 items-center gap-2 px-2 text-[13px]"
            >
              <BsWhatsapp className="text-base" />
              WhatsApp
            </Link>
          </div>
        </div>
      </section>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
