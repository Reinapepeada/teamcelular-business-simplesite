import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    type TooltipContentProps,
} from "recharts";

import type { TrendPoint } from "../lib";

function TrendTooltip({ active, payload }: Partial<TooltipContentProps>) {
    if (!active || !payload?.length) return null;

    const point = payload[0].payload as TrendPoint;
    return (
        <div className="rounded-lg bg-foreground px-3 py-2 text-background shadow-md">
            <p className="text-xs opacity-75">{point.label}</p>
            <p className="text-sm font-semibold">
                {point.count} {point.count === 1 ? "registro" : "registros"}
            </p>
        </div>
    );
}

export function TrendChart({ points }: { points: TrendPoint[] }) {
    if (points.length === 0) {
        return (
            <div className="rounded-lg border border-dashed py-10 text-center text-sm text-muted-foreground">
                Sin datos de tendencia para el rango filtrado.
            </div>
        );
    }

    const tickEvery = Math.max(1, Math.ceil(points.length / 7));

    return (
        <div className="h-64 w-full" role="img" aria-label="Tendencia diaria para el período seleccionado">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={points}
                    accessibilityLayer
                    margin={{ top: 12, right: 8, bottom: 0, left: -16 }}
                >
                    <CartesianGrid vertical={false} stroke="hsl(var(--border))" strokeDasharray="4 5" />
                    <XAxis
                        dataKey="label"
                        axisLine={false}
                        tickLine={false}
                        interval={tickEvery - 1}
                        minTickGap={24}
                        tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                    />
                    <YAxis
                        allowDecimals={false}
                        axisLine={false}
                        tickLine={false}
                        width={36}
                        tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                    />
                    <Tooltip
                        content={<TrendTooltip />}
                        cursor={{ stroke: "hsl(var(--primary))", strokeOpacity: 0.3 }}
                    />
                    <Area
                        type="monotone"
                        dataKey="count"
                        name="Registros"
                        stroke="hsl(var(--primary))"
                        strokeWidth={3}
                        fill="hsl(var(--primary))"
                        fillOpacity={0.14}
                        activeDot={{ r: 5, strokeWidth: 0 }}
                        dot={points.length <= 31 ? { r: 2.5, strokeWidth: 0 } : false}
                        isAnimationActive={false}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
