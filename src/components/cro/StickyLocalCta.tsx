import Link from "next/link";
import { BsTelephone, BsWhatsapp } from "react-icons/bs";
import { FaRegCalendarCheck } from "react-icons/fa";

interface StickyLocalCtaProps {
  whatsappUrl: string;
  budgetHref?: string;
  phoneHref?: string;
  primaryLabel?: string;
}

export default function StickyLocalCta({
  whatsappUrl,
  budgetHref = "/presupuesto-reparacion#solicitar-presupuesto",
  phoneHref = "tel:+541151034595",
  primaryLabel = "Pedir presupuesto",
}: StickyLocalCtaProps) {
  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 hidden w-[290px] rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-2xl backdrop-blur-md dark:border-white/10 dark:bg-slate-950/90 md:block">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">
          Necesitas respuesta rapida?
        </p>
        <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
          Te asesoramos por WhatsApp, llamada o presupuesto online.
        </p>
        <div className="mt-3 flex flex-col gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-emerald-500 px-4 text-sm font-semibold text-white transition hover:bg-emerald-600"
          >
            <BsWhatsapp className="text-base" />
            Hablar por WhatsApp
          </a>
          <div className="flex gap-2">
            <a
              href={phoneHref}
              className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <BsTelephone className="text-sm" />
              Llamar
            </a>
            <Link
              href={budgetHref}
              className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-white transition hover:bg-primary/90"
            >
              <FaRegCalendarCheck className="text-sm" />
              Presupuesto
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
