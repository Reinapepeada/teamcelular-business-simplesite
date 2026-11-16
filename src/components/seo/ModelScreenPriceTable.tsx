import {
  MODEL_SCREEN_PRICES_PERIOD,
  formatPriceMonth,
  type ModelPriceService,
  type ModelScreenPrice,
} from "@/lib/modelScreenPrices";
import { formatArsPrice } from "@/lib/repairPrices";

interface ModelScreenPriceTableProps {
  id: string;
  brand: string;
  prices: ModelScreenPrice[];
  /** Reparación que cubre la tabla. Por defecto, cambio de pantalla. */
  service?: ModelPriceService;
}

const SERVICE_COPY: Record<ModelPriceService, { article: string; column: string; part: string }> = {
  pantalla: { article: "la pantalla", column: "Pantalla desde (ARS)", part: "del módulo" },
  batería: { article: "la batería", column: "Batería desde (ARS)", part: "de la batería" },
  "pin de carga": { article: "el pin de carga", column: "Pin de carga desde (ARS)", part: "del repuesto" },
};

/**
 * Tabla de una reparación por modelo. Cada fila es el último precio cobrado
 * en una orden cerrada, por eso se presenta como "desde" y con su mes.
 */
export default function ModelScreenPriceTable({ id, brand, prices, service = "pantalla" }: ModelScreenPriceTableProps) {
  if (prices.length === 0) return null;
  const copy = SERVICE_COPY[service];

  return (
    <section id={id} className="scroll-mt-24 rounded-[28px] bg-[#1d1d1f]">
      <div className="border-b border-slate-800 px-8 py-5">
        <h2 className="text-2xl font-semibold text-[#f5f5f7]">
          ¿Cuánto sale cambiar {copy.article} de cada {brand}?
        </h2>
        <p className="mt-1 text-[0.95rem] text-[#86868b]">
          Último precio cobrado en Team Celular por cambio de {service}, por modelo, en
          reparaciones terminadas entre {MODEL_SCREEN_PRICES_PERIOD}. Es un valor de
          referencia &quot;desde&quot;: la calidad {copy.part} y el stock pueden cambiarlo,
          y te confirmamos el número antes de reparar.
        </p>
      </div>
      <div className="overflow-x-auto px-6 py-2">
        <table className="w-full min-w-[26rem] border-collapse text-left text-sm">
          <caption className="sr-only">
            Precio de cambio de {service} de {brand} por modelo en CABA, {MODEL_SCREEN_PRICES_PERIOD}
          </caption>
          <thead>
            <tr className="border-b border-slate-800">
              <th scope="col" className="py-3 pr-4 font-semibold text-[#f5f5f7]">Modelo</th>
              <th scope="col" className="py-3 pr-4 font-semibold text-[#f5f5f7]">{copy.column}</th>
              <th scope="col" className="py-3 font-semibold text-[#f5f5f7]">Dato de</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {prices.map((row) => (
              <tr key={row.model}>
                <th scope="row" className="py-3 pr-4 font-semibold text-[#f5f5f7]">{row.model}</th>
                <td className="py-3 pr-4 font-semibold tabular-nums text-secondary">{formatArsPrice(row.from)}</td>
                <td className="py-3 text-[#86868b]">{formatPriceMonth(row.month)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="px-8 pb-6 pt-2 text-sm leading-6 text-[#86868b]">
        Si tu modelo no figura, pedinos el presupuesto por WhatsApp. Todas las
        reparaciones salen con garantía escrita de 90 días.
      </p>
    </section>
  );
}
