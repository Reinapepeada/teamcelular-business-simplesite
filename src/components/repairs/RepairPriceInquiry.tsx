"use client";

import { useId, useState } from "react";
import BranchWhatsAppButton from "@/components/cro/BranchSelector";

export default function RepairPriceInquiry({
  repair,
  symptoms,
  ctaName,
  ctaLocation,
}: {
  repair: string;
  symptoms: string[];
  ctaName: string;
  ctaLocation: string;
}) {
  const id = useId();
  const [model, setModel] = useState("");
  const [symptom, setSymptom] = useState("");
  const message = `Hola Team Celular, quiero confirmar el precio y el stock para ${repair}.\nMarca y modelo: ${model.trim() || "a confirmar"}.\nFalla: ${symptom || "a confirmar"}.`;

  return (
    <div className="mt-6 space-y-4 rounded-2xl bg-black/25 p-5 text-left">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-model`} className="mb-2 block text-sm font-semibold text-white">Marca y modelo</label>
          <input
            id={`${id}-model`}
            type="text"
            value={model}
            maxLength={80}
            onChange={(event) => setModel(event.target.value)}
            placeholder="Ej. Samsung A54 o iPhone 13"
            className="min-h-12 w-full rounded-xl border border-white/25 bg-black px-3 py-3 text-base text-white placeholder:text-[#86868b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          />
        </div>
        <div>
          <label htmlFor={`${id}-symptom`} className="mb-2 block text-sm font-semibold text-white">¿Qué le pasa?</label>
          <select
            id={`${id}-symptom`}
            value={symptom}
            onChange={(event) => setSymptom(event.target.value)}
            className="min-h-12 w-full rounded-xl border border-white/25 bg-black px-3 py-3 text-base text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <option value="">Elegir falla</option>
            {symptoms.map((item) => <option key={item} value={item}>{item}</option>)}
            <option value="Otra falla">Otra falla</option>
          </select>
        </div>
      </div>
      <p className="text-sm leading-6 text-[#a1a1a6]">Podés completar el modelo y la falla ahora o contárnoslos por WhatsApp.</p>
      <BranchWhatsAppButton
        ctaName={ctaName}
        ctaLocation={ctaLocation}
        message={message}
        className="tc-btn tc-btn-primary w-full sm:w-auto"
      >
        Consultar precio por WhatsApp
      </BranchWhatsAppButton>
      <p className="text-sm leading-6 text-[#a1a1a6]">Elegís Recoleta o Belgrano antes de abrir el chat.</p>
    </div>
  );
}
