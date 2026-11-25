import Link from "next/link";
import { SiApple } from "react-icons/si";
import ServiceLandingPage, {
  buildServiceMetadata,
} from "../serviceLanding";
import { SERVICE_CONFIGS } from "../serviceConfigs";
import {
  IPHONE_MODELS,
  IPHONE_MODELS_WITH_PAGE,
  IPHONE_PRICES_UPDATED,
} from "../iphone/iphoneModels";
import { formatArsPrice } from "@/lib/repairPrices";

const config = SERVICE_CONFIGS["cambio-bateria-caba"];

export const metadata = buildServiceMetadata(config);

const WITH_PAGE = new Set<string>(IPHONE_MODELS_WITH_PAGE);
const PRICED = IPHONE_MODELS.filter((m): m is typeof m & { battery: number } => m.battery !== null);
// Agrupa por generación ("11", "12"...) en el orden de la lista.
const GENERATIONS = [...new Set(PRICED.map((m) => m.slug.split("-")[0]))].map((gen) => ({
  gen,
  models: PRICED.filter((m) => m.slug.split("-")[0] === gen),
}));
const cheapest = PRICED.reduce((a, b) => (b.battery < a.battery ? b : a));
const priciest = PRICED.reduce((a, b) => (b.battery > a.battery ? b : a));

export default function CambioBateriaCabaPage() {
  return (
    <ServiceLandingPage config={config}>
      <section className="tc-section" aria-labelledby="bateria-iphone-precios">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="tc-eyebrow flex items-center gap-2">
              <SiApple aria-hidden className="h-4 w-4" />
              Precios por modelo
            </p>
            <h2 id="bateria-iphone-precios" className="tc-heading mt-3">
              ¿Cuánto sale cambiar la batería de un iPhone?
            </h2>
            <p className="tc-body mt-5">
              Desde {formatArsPrice(cheapest.battery)} en un {cheapest.name} hasta {formatArsPrice(priciest.battery)} en un{" "}
              {priciest.name}. El cambio tarda 1 a 2 horas con stock e incluye 90 días de garantía escrita.
            </p>
            <p className="mt-4 text-[15px] leading-6 text-[#86868b]">
              Precios publicados de {IPHONE_PRICES_UPDATED}. Antes de cambiarla medimos la salud y el consumo: si el problema es una app o la placa, te lo decimos.
            </p>
          </div>
          <div className="rounded-[28px] bg-[#1d1d1f] px-5 sm:px-7">
            <ul className="divide-y divide-[#333336]">
              {GENERATIONS.map(({ gen, models }) => (
                <li key={gen} className="grid gap-3 py-5 sm:grid-cols-[7rem_1fr] sm:items-baseline">
                  <h3 className="text-[17px] font-semibold text-[#f5f5f7]">iPhone {gen}</h3>
                  <dl className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
                    {models.map((m) => {
                      const label = m.name.replace(/^iPhone \d+\s?/, "") || "Estándar";
                      return (
                        <div key={m.slug}>
                          <dt className="text-[13px] text-[#a1a1a6]">
                            {WITH_PAGE.has(m.slug) ? (
                              <Link href={`/reparaciones/iphone/${m.slug}`} className="tc-link" aria-label={`Precios de reparación del ${m.name}`}>
                                {label} ›
                              </Link>
                            ) : (
                              label
                            )}
                          </dt>
                          <dd className="text-[16px] font-semibold tabular-nums text-[#f5f5f7]">{formatArsPrice(m.battery)}</dd>
                        </div>
                      );
                    })}
                  </dl>
                </li>
              ))}
              <li className="grid gap-2 py-5 sm:grid-cols-[7rem_1fr] sm:items-baseline">
                <h3 className="text-[17px] font-semibold text-[#f5f5f7]">iPhone X, XS, XR y anteriores</h3>
                <p className="text-[15px] leading-6 text-[#a1a1a6]">
                  Consultanos por WhatsApp con el modelo y te confirmamos precio y stock.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </ServiceLandingPage>
  );
}
