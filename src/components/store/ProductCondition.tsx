import { etiquetaCondicion } from "@/lib/fixbeeCatalog";

export default function ProductCondition({ condition }: { condition?: string }) {
    const label = etiquetaCondicion(condition);
    if (!label) return null;

    return (
        <span className="inline-flex rounded-full border border-slate-300 px-3 py-1 text-xs font-medium capitalize text-slate-700 dark:border-slate-600 dark:text-slate-300">
            {label}
        </span>
    );
}
