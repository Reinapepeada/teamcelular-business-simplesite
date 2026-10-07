import { formatLeadValue } from "../lib";

export function DetailRow({
    label,
    value,
    mono = false,
}: {
    label: string;
    value: string | null | undefined;
    mono?: boolean;
}) {
    return (
        <div className="rounded-lg border bg-muted/15 px-3 py-2">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                {label}
            </p>
            <p className={`mt-1 text-sm ${mono ? "break-all font-mono" : ""}`}>
                {formatLeadValue(value)}
            </p>
        </div>
    );
}
