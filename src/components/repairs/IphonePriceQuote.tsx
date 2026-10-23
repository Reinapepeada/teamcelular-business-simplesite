"use client";

import { useState } from "react";
import { IPHONE_MODELS } from "@/app/(site)/reparaciones/iphone/iphoneModels";
import BranchWhatsAppButton from "@/components/cro/BranchSelector";
import { formatArsPrice } from "@/lib/repairPrices";

export default function IphonePriceQuote() {
  const [modelSlug, setModelSlug] = useState("");
  const model = IPHONE_MODELS.find((item) => item.slug === modelSlug);

  return (
    <div className="space-y-5 px-6 py-6 md:px-8">
      <div className="max-w-md">
        <label htmlFor="iphone-price-model" className="mb-2 block text-base font-semibold text-white">
          Elegí tu modelo de iPhone
        </label>
        <select
          id="iphone-price-model"
          value={modelSlug}
          onChange={(event) => setModelSlug(event.target.value)}
          className="min-h-12 w-full rounded-xl border border-white/25 bg-black px-4 py-3 text-base text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <option value="">Seleccionar modelo</option>
          {IPHONE_MODELS.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
        </select>
        <p className="mt-2 text-sm leading-6 text-[#a1a1a6]">
          Si no sabés cuál es: Ajustes → General → Información → Nombre del modelo.
        </p>
      </div>
      {model && (
        <div className="space-y-5" aria-live="polite">
          <dl className="grid max-w-2xl gap-4 sm:grid-cols-2">
            {([["Cambio de pantalla", model.screen], ["Cambio de batería", model.battery]] as const).map(([label, price]) => (
              <div key={label} className="rounded-2xl bg-black/25 p-5">
                <dt className="text-sm text-[#c7c7cc]">{label} · {model.name}</dt>
                <dd className="mt-2 text-2xl font-semibold text-white tabular-nums">
                  {typeof price === "number" ? formatArsPrice(price) : "Consultar"}
                </dd>
              </div>
            ))}
          </dl>
          <BranchWhatsAppButton
            ctaName={`iphone_model_price_${model.slug}`}
            ctaLocation="iphone_guide_prices"
            className="tc-btn tc-btn-primary"
            message={`Hola Team Celular, quiero confirmar precio y stock para mi ${model.name}.\n¿Qué calidad de repuesto ofrecen y cuál es el precio final con colocación, pruebas y garantía?\nFalla: `}
          >
            Consultar precio y stock de mi {model.name}
          </BranchWhatsAppButton>
        </div>
      )}
    </div>
  );
}
