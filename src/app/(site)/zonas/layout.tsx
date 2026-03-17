import type { ReactNode } from "react";
import Link from "next/link";
import { BsWhatsapp } from "react-icons/bs";
import { FaMapMarkedAlt } from "react-icons/fa";

const quickZones = [
  { href: "/zonas/recoleta", label: "Recoleta" },
  { href: "/zonas/palermo", label: "Palermo" },
  { href: "/zonas/belgrano", label: "Belgrano" },
  { href: "/zonas/caballito", label: "Caballito" },
  { href: "/zonas/almagro", label: "Almagro" },
  { href: "/zonas/microcentro", label: "Microcentro" },
];

export default function ZonasLayout({
  children,
}: {
  readonly children: ReactNode;
}) {
  return (
    <div className="relative isolate w-full overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 bg-slate-50 dark:bg-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_12%,rgba(14,165,233,0.18),transparent_35%),radial-gradient(circle_at_84%_18%,rgba(99,102,241,0.16),transparent_36%)] dark:bg-[radial-gradient(circle_at_14%_10%,rgba(14,165,233,0.14),transparent_34%),radial-gradient(circle_at_84%_16%,rgba(16,185,129,0.14),transparent_36%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-30 [background-image:linear-gradient(rgba(148,163,184,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.1)_1px,transparent_1px)] [background-size:38px_38px] dark:opacity-14"
      />

      <section className="relative z-10 border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800/70 dark:bg-slate-950/45">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              <FaMapMarkedAlt className="text-[10px]" />
              Cobertura CABA
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Elegi tu zona y te orientamos con la mejor opcion de reparacion.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {quickZones.map((zone) => (
              <Link
                key={zone.href}
                href={zone.href}
                className="inline-flex min-h-10 items-center rounded-full border border-slate-300/80 bg-white/80 px-4 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary dark:border-slate-600/70 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-primary/50 dark:hover:text-primary"
              >
                {zone.label}
              </Link>
            ))}
            <Link
              href="https://wa.me/5491151034595?text=Hola%20Team%20Celular,%20quiero%20presupuesto%20para%20mi%20zona"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center gap-2 rounded-full bg-emerald-500 px-4 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-600"
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
