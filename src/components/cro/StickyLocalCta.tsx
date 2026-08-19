import { BsWhatsapp } from "react-icons/bs";
import { FaRegCalendarCheck } from "react-icons/fa";
import TrackedCtaLink from "@/components/cro/TrackedCtaLink";

interface StickyLocalCtaProps {
  whatsappUrl: string;
  budgetHref?: string;
  primaryLabel?: string;
}

export default function StickyLocalCta({
  whatsappUrl,
  budgetHref = "/presupuesto-reparacion#solicitar-presupuesto",
  primaryLabel = "Pedir presupuesto",
}: StickyLocalCtaProps) {
  return (
    <>
      {/* ponytail: unica variante. El panel flotante de escritorio se elimino:
          dos botones al alcance del pulgar cubren el mismo objetivo sin tapar
          contenido, y hay una sola cosa que mantener. */}
      <div className="tc-sticky-cta fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-md dark:border-white/10 dark:bg-slate-950/95">
        <div className="mx-auto flex max-w-lg gap-2">
          <TrackedCtaLink
            href={whatsappUrl}
            ctaName="sticky_whatsapp_mobile"
            ctaLocation="sticky_local_cta_mobile"
            ctaVariant="whatsapp"
            external
            target="_blank"
            className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-emerald-700 text-sm font-semibold text-white [touch-action:manipulation] active:scale-[0.98]"
          >
            <BsWhatsapp className="text-base" />
            WhatsApp
          </TrackedCtaLink>
          <TrackedCtaLink
            href={budgetHref}
            ctaName="sticky_budget_mobile"
            ctaLocation="sticky_local_cta_mobile"
            ctaVariant="primary"
            className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-white [touch-action:manipulation] active:scale-[0.98]"
          >
            <FaRegCalendarCheck className="text-sm" />
            {primaryLabel}
          </TrackedCtaLink>
        </div>
      </div>
    </>
  );
}
