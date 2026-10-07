import type React from "react";

/**
 * Un campo con su error enganchado: el lector de pantalla anuncia el error al
 * entrar al campo, no solo quien lo ve en rojo.
 */
export function Campo({
    id,
    label,
    error,
    children,
}: {
    id: string;
    label: string;
    error?: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <label className="text-sm font-medium" htmlFor={id}>{label}</label>
            {children}
            {error && (
                <p id={`${id}-error`} className="mt-1 text-xs text-red-600 dark:text-red-400">
                    {error}
                </p>
            )}
        </div>
    );
}

// 16 px en el celular: con menos, Safari hace zoom al tocar el campo y el
// comprador pierde de vista el formulario.
export const propsDeCampo = (id: string, error?: string) => ({
    id,
    className:
        "w-full rounded-lg border border-slate-300 px-3 py-2 text-base sm:text-sm dark:border-slate-600 dark:bg-slate-900",
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
});
