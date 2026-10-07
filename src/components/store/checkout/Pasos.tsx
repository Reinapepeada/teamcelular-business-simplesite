/** Dónde está el comprador: datos → revisión → pago. */
export function Pasos({ actual }: { actual: 1 | 2 | 3 }) {
    const pasos = ["Datos y entrega", "Revisión", "Pago"];
    return (
        <ol className="mt-3 flex items-center gap-2 text-xs" aria-label="Pasos de la compra">
            {pasos.map((paso, index) => {
                const numero = index + 1;
                const estado = numero < actual ? "hecho" : numero === actual ? "actual" : "pendiente";
                return (
                    <li key={paso} className="flex items-center gap-2" aria-current={estado === "actual" ? "step" : undefined}>
                        <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold ${
                            estado === "pendiente" ? "border border-slate-300 text-slate-500 dark:border-slate-700 dark:text-slate-400" : "bg-primary text-white"
                        }`}>
                            {estado === "hecho" ? "✓" : numero}
                        </span>
                        <span className={estado === "actual" ? "font-semibold" : "text-slate-500 dark:text-slate-400"}>{paso}</span>
                        {numero < pasos.length && <span aria-hidden="true" className="h-px w-4 bg-slate-300 dark:bg-slate-700" />}
                    </li>
                );
            })}
        </ol>
    );
}
