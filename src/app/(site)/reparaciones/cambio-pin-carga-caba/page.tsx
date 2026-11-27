import { SiSamsung } from "react-icons/si";
import ServiceLandingPage, {
  buildServiceMetadata,
} from "../serviceLanding";
import { SERVICE_CONFIGS } from "../serviceConfigs";
import {
  CHARGING_PORT_CLEANING_PRICE,
  SAMSUNG_CHARGING_PORT_PRICES,
  formatArsPrice,
} from "@/lib/repairPrices";

const config = SERVICE_CONFIGS["cambio-pin-carga-caba"];

export const metadata = buildServiceMetadata(config);

const range = (p: { from: number; to: number }) => `${formatArsPrice(p.from)} a ${formatArsPrice(p.to)}`;
const between = (p: { from: number; to: number }) => `${formatArsPrice(p.from)} y ${formatArsPrice(p.to)}`;

export default function CambioPinCargaCabaPage() {
  return (
    <ServiceLandingPage config={config}>
      <section className="tc-section" aria-labelledby="pin-samsung-precios">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="tc-eyebrow flex items-center gap-3">
              <SiSamsung aria-hidden viewBox="0 9 24 6" className="h-4 w-16" />
              Precios por línea
            </p>
            <h2 id="pin-samsung-precios" className="tc-heading mt-3">
              ¿Cuánto sale cambiar el pin de carga de un Samsung?
            </h2>
            <p className="tc-body mt-5">
              En un Galaxy A de entrada sale entre {between(SAMSUNG_CHARGING_PORT_PRICES[0])}, y en un Galaxy S o Note entre{" "}
              {between(SAMSUNG_CHARGING_PORT_PRICES[3])}. Si alcanza con una limpieza técnica, cuesta entre{" "}
              {between(CHARGING_PORT_CLEANING_PRICE)} y no se cambia nada.
            </p>
            <p className="mt-4 text-[15px] leading-6 text-[#86868b]">
              Rangos de los cambios de pin que hicimos en Samsung durante el último año en Recoleta. El precio exacto te lo confirmamos con el modelo y la revisión.
            </p>
          </div>
          <div className="overflow-x-auto rounded-[28px] bg-[#1d1d1f] px-5 sm:px-7">
            <table className="w-full text-left text-[15px] leading-6">
              <caption className="sr-only">Precio del cambio de pin de carga en Samsung según la línea del equipo</caption>
              <thead>
                <tr className="border-b border-[#424245] text-[#f5f5f7]">
                  <th scope="col" className="py-5 pr-4">Línea</th>
                  <th scope="col" className="hidden py-5 pr-4 sm:table-cell">Modelos que más reparamos</th>
                  <th scope="col" className="py-5 text-right">Cambio de pin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#333336] text-[#a1a1a6]">
                {SAMSUNG_CHARGING_PORT_PRICES.map((row) => (
                  <tr key={row.name}>
                    <th scope="row" className="py-5 pr-4 font-medium text-[#f5f5f7]">
                      {row.name}
                      <span className="mt-1 block text-[13px] font-normal text-[#a1a1a6] sm:hidden">{row.models}</span>
                    </th>
                    <td className="hidden py-5 pr-4 sm:table-cell">{row.models}</td>
                    <td className="whitespace-nowrap py-5 text-right font-semibold tabular-nums text-[#f5f5f7]">{range(row)}</td>
                  </tr>
                ))}
                <tr>
                  <th scope="row" className="py-5 pr-4 font-medium text-[#f5f5f7]">
                    Limpieza técnica
                    <span className="mt-1 block text-[13px] font-normal text-[#a1a1a6] sm:hidden">Si el pin no está dañado</span>
                  </th>
                  <td className="hidden py-5 pr-4 sm:table-cell">Cualquier modelo, si el pin no está dañado</td>
                  <td className="whitespace-nowrap py-5 text-right font-semibold tabular-nums text-[#f5f5f7]">{range(CHARGING_PORT_CLEANING_PRICE)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </ServiceLandingPage>
  );
}
