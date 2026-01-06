"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsWhatsapp } from "react-icons/bs";
import { FaClipboardList } from "react-icons/fa";

const WHATSAPP_URL =
  "https://wa.me/5491151034595?text=Hola%21%20Quiero%20pedir%20un%20presupuesto%20de%20reparaci%C3%B3n.";

export default function StickyRepairCta() {
  const pathname = usePathname();
  const shouldHide =
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/tienda") ||
    pathname?.startsWith("/productos");

  if (shouldHide) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 md:hidden">
      <div className="mx-auto flex max-w-6xl gap-3 border-t border-white/10 bg-white/90 px-4 py-3 backdrop-blur dark:bg-slate-950/80">
        <Link
          href="/presupuesto-reparacion#solicitar-presupuesto"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20"
        >
          <FaClipboardList className="text-lg" />
          Presupuesto
        </Link>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-primary/40 bg-white/70 px-4 py-3 text-sm font-semibold text-primary backdrop-blur transition hover:bg-white dark:bg-slate-950/40 dark:hover:bg-slate-950/60"
        >
          <BsWhatsapp className="text-lg" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}

