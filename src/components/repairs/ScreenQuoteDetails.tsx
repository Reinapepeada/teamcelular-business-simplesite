import { BsClipboardCheck, BsDisplay, BsPlus, BsShieldCheck } from "react-icons/bs";

export default function ScreenQuoteDetails({ light = false }: { light?: boolean }) {
  return (
    <details className={`group mt-6 border-t pt-4 ${light ? "border-[#d2d2d7] text-[#1d1d1f]" : "border-[#424245] text-[#f5f5f7]"}`}>
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-lg text-[17px] font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1a6dff] [&::-webkit-details-marker]:hidden">
        Qué comparar al cambiar la pantalla
        <BsPlus aria-hidden className="h-6 w-6 shrink-0 transition-transform group-open:rotate-45 motion-reduce:transition-none" />
      </summary>
      <ul className={`mt-4 space-y-4 text-[15px] leading-6 ${light ? "text-[#424245]" : "text-[#a1a1a6]"}`}>
        <li className="flex gap-3"><BsDisplay aria-hidden className="mt-1 shrink-0" /><span><strong className="font-semibold">Módulo completo.</strong> Cambiamos vidrio, táctil y display juntos. Te explicamos las calidades disponibles para tu modelo.</span></li>
        <li className="flex gap-3"><BsShieldCheck aria-hidden className="mt-1 shrink-0" /><span><strong className="font-semibold">Funciones y garantía.</strong> Probamos los sensores antes y después. Lo que se puede conservar depende del modelo, el repuesto y el daño previo.</span></li>
        <li className="flex gap-3"><BsClipboardCheck aria-hidden className="mt-1 shrink-0" /><span><strong className="font-semibold">Presupuesto previo.</strong> Confirmamos precio, repuesto y plazo antes de reparar. Si aparece otro daño, te consultamos.</span></li>
      </ul>
    </details>
  );
}
