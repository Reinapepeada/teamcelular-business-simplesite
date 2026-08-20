import { formatArsPrice, type RepairPrice } from "@/lib/repairPrices";

// Tabla y no prosa: es la estructura que mejor se extrae en motores de IA, y
// ningun competidor de CABA publica precios.
export default function RepairPriceTable({
  brand,
  prices,
  updatedLabel,
}: {
  brand: string;
  prices: RepairPrice[];
  updatedLabel: string;
}) {
  return (
    <section className="w-full">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white md:text-3xl">
        ¿Cuánto sale reparar un {brand} en CABA?
      </h2>
      <p className="mt-3 max-w-3xl text-[15px] leading-7 text-slate-600 dark:text-slate-300">
        Precios de mostrador de Team Celular, Paraguay 2451 Recoleta y Amenábar
        2032 Belgrano. El valor final depende del modelo y de la calidad del
        repuesto; te lo confirmamos antes de avanzar. Incluye garantía escrita
        de 90 días sobre trabajo y repuesto.
      </p>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
          <caption className="sr-only">
            Precios aproximados de reparación de {brand} en CABA, en rangos por
            gama, actualizados el {updatedLabel}
          </caption>
          <thead>
            <tr className="border-b border-slate-300 dark:border-slate-700">
              <th scope="col" className="py-3 pr-4 font-semibold text-slate-900 dark:text-white">
                Reparación
              </th>
              <th scope="col" className="py-3 pr-4 font-semibold text-slate-900 dark:text-white">
                Desde
              </th>
              <th scope="col" className="py-3 font-semibold text-slate-900 dark:text-white">
                Hasta
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {prices.map((price) => (
              <tr key={price.name}>
                <td className="py-3 pr-4 text-slate-700 dark:text-slate-300">
                  {price.name}
                </td>
                <td className="py-3 pr-4 font-semibold tabular-nums text-slate-900 dark:text-white">
                  {formatArsPrice(price.from)}
                </td>
                <td className="py-3 font-semibold tabular-nums text-slate-900 dark:text-white">
                  {formatArsPrice(price.to)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-[13px] text-slate-500 dark:text-slate-400">
        Precios aproximados: son rangos por gama, no valores cerrados. El número
        exacto sale del diagnóstico y te lo confirmamos antes de intervenir el
        equipo. Actualizados el {updatedLabel}. Pantalla y batería salen en 2 a
        4 horas.
      </p>
    </section>
  );
}
