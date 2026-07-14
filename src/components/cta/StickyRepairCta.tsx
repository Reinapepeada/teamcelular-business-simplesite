"use client";

import { usePathname } from "next/navigation";
import { BsWhatsapp } from "react-icons/bs";
import { FaClipboardList } from "react-icons/fa";
import TrackedCtaLink from "@/components/cro/TrackedCtaLink";
import BranchWhatsAppButton from "@/components/cro/BranchSelector";

export default function StickyRepairCta() {
  const pathname = usePathname();
  const shouldHide =
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/tienda") ||
    pathname?.startsWith("/productos");

  if (shouldHide) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 lg:hidden">
      <div className="mx-auto flex max-w-6xl gap-3 border-t border-white/10 bg-white/90 px-4 py-3 backdrop-blur dark:bg-slate-950/80">
        <TrackedCtaLink
          href="/presupuesto-reparacion#solicitar-presupuesto"
          ctaName="sticky_budget"
          ctaLocation="sticky_repair_cta"
          ctaVariant="primary"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20"
        >
          <FaClipboardList className="text-lg" />
          Presupuesto
        </TrackedCtaLink>
        <BranchWhatsAppButton
          ctaName="sticky_whatsapp"
          ctaLocation="sticky_repair_cta"
          className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-primary/40 bg-white/70 px-4 py-3 text-sm font-semibold text-primary backdrop-blur transition hover:bg-white dark:bg-slate-950/40 dark:hover:bg-slate-950/60"
        >
          <BsWhatsapp className="text-lg" />
          WhatsApp
        </BranchWhatsAppButton>
      </div>
    </div>
  );
}
