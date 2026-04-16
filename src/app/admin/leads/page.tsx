"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import {
    addRepairLeadNote,
    getRepairLeadById,
    getRepairLeads,
    getRepairLeadsMetrics,
    updateRepairLeadStatus,
    type RepairLead,
    type RepairLeadDetail,
    type RepairLeadsMetricsResponse,
    type RepairLeadStatus,
} from "@/services/leads";
import {
    Activity,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Loader2,
    MessageSquareText,
    RefreshCw,
    Search,
    TrendingUp,
    UserRound,
} from "lucide-react";

type LeadStatusFilter = RepairLeadStatus | "all";

const STATUS_OPTIONS: Array<{ value: RepairLeadStatus; label: string }> = [
    { value: "new", label: "Nuevo" },
    { value: "contacted", label: "Contactado" },
    { value: "qualified", label: "Calificado" },
    { value: "converted", label: "Convertido" },
    { value: "discarded", label: "Descartado" },
];

const STATUS_LABELS: Record<RepairLeadStatus, string> = {
    new: "Nuevo",
    contacted: "Contactado",
    qualified: "Calificado",
    converted: "Convertido",
    discarded: "Descartado",
};

const URGENCY_OPTIONS = [
    { value: "all", label: "Todas las urgencias" },
    { value: "hoy", label: "Hoy" },
    { value: "esta_semana", label: "Esta semana" },
    { value: "sin_urgencia", label: "Sin urgencia" },
];

const CHANNEL_OPTIONS = [
    { value: "all", label: "Todos los canales" },
    { value: "whatsapp", label: "WhatsApp" },
    { value: "llamada", label: "Llamada" },
    { value: "email", label: "Email" },
];

const PAGE_SIZE_OPTIONS = [10, 20, 50];

interface TrendPoint {
    key: string;
    label: string;
    count: number;
}

function formatDateTime(value: string): string {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return "-";
    }

    return date.toLocaleString("es-AR", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
    });
}

function humanizeToken(value: string): string {
    if (!value) {
        return "Sin dato";
    }

    const normalized = value.replaceAll("_", " ").trim();
    if (!normalized) {
        return "Sin dato";
    }

    return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

function getStatusClassName(status: RepairLeadStatus): string {
    switch (status) {
        case "new":
            return "bg-blue-100 text-blue-700 hover:bg-blue-100";
        case "contacted":
            return "bg-amber-100 text-amber-700 hover:bg-amber-100";
        case "qualified":
            return "bg-violet-100 text-violet-700 hover:bg-violet-100";
        case "converted":
            return "bg-emerald-100 text-emerald-700 hover:bg-emerald-100";
        case "discarded":
            return "bg-rose-100 text-rose-700 hover:bg-rose-100";
        default:
            return "";
    }
}

function getUrgencyClassName(urgency: string): string {
    const normalized = urgency.toLowerCase();

    if (normalized.includes("hoy") || normalized.includes("urgente")) {
        return "bg-rose-100 text-rose-700 hover:bg-rose-100";
    }

    if (normalized.includes("semana")) {
        return "bg-amber-100 text-amber-700 hover:bg-amber-100";
    }

    return "bg-slate-100 text-slate-700 hover:bg-slate-100";
}

function buildTrendDataFromMetrics(
    byDate: RepairLeadsMetricsResponse["byDate"],
    days: number
): TrendPoint[] {
    return [...byDate]
        .sort((a, b) => {
            const timeA = new Date(a.date).getTime();
            const timeB = new Date(b.date).getTime();

            if (Number.isNaN(timeA) || Number.isNaN(timeB)) {
                return a.date.localeCompare(b.date);
            }

            return timeA - timeB;
        })
        .slice(-days)
        .map((entry, index) => {
            const date = new Date(entry.date);
            const label = Number.isNaN(date.getTime())
                ? humanizeToken(entry.date)
                : date.toLocaleDateString("es-AR", {
                      day: "2-digit",
                      month: "short",
                  });

            return {
                key: `${entry.date}-${index}`,
                label,
                count: entry.value,
            };
        });
}

function TrendChart({ points }: { points: TrendPoint[] }) {
    if (points.length === 0) {
        return (
            <div className="rounded-lg border border-dashed py-10 text-center text-sm text-muted-foreground">
                Sin datos de tendencia para el rango filtrado.
            </div>
        );
    }

    const width = 640;
    const height = 180;
    const padding = 18;
    const maxCount = Math.max(...points.map((point) => point.count), 1);

    const step = points.length > 1 ? (width - padding * 2) / (points.length - 1) : 0;

    const polyline = points
        .map((point, index) => {
            const x = padding + step * index;
            const y =
                height -
                padding -
                (point.count / maxCount) * (height - padding * 2);
            return `${x},${y}`;
        })
        .join(" ");

    const gradientId = "leads-trend-gradient";

    return (
        <div className="space-y-4">
            <div className="h-48 w-full rounded-lg border bg-muted/20 p-2">
                <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full" role="img" aria-label="Tendencia de leads últimos 14 días">
                    <defs>
                        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.28" />
                            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    <rect x="0" y="0" width={width} height={height} fill="transparent" />

                    <path
                        d={`M ${polyline} L ${width - padding},${height - padding} L ${padding},${height - padding} Z`}
                        fill={`url(#${gradientId})`}
                    />

                    <polyline
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="3"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        points={polyline}
                    />

                    {points.map((point, index) => {
                        const x = padding + step * index;
                        const y =
                            height -
                            padding -
                            (point.count / maxCount) * (height - padding * 2);

                        return (
                            <circle
                                key={point.key}
                                cx={x}
                                cy={y}
                                r="3"
                                fill="hsl(var(--primary))"
                            />
                        );
                    })}
                </svg>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{points[0]?.label ?? "-"}</span>
                <span>{points[Math.floor(points.length / 2)]?.label ?? "-"}</span>
                <span>{points[points.length - 1]?.label ?? "-"}</span>
            </div>
        </div>
    );
}

export default function AdminLeadsPage() {
    const [statusFilter, setStatusFilter] = useState<LeadStatusFilter>("all");
    const [urgencyFilter, setUrgencyFilter] = useState("all");
    const [channelFilter, setChannelFilter] = useState("all");
    const [repairTypeFilter, setRepairTypeFilter] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [pageSize, setPageSize] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);

    const [tableData, setTableData] = useState<{
        items: RepairLead[];
        total: number;
        page: number;
        pages: number;
    }>({
        items: [],
        total: 0,
        page: 1,
        pages: 1,
    });

    const [metrics, setMetrics] = useState<RepairLeadsMetricsResponse>({
        totalLeads: 0,
        totalRealLeads: 0,
        convertedLeads: 0,
        conversionRate: 0,
        byStatus: [],
        byContactChannel: [],
        byDate: [],
    });

    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [updatingLeadId, setUpdatingLeadId] = useState<string | null>(null);

    const [selectedLeadDetail, setSelectedLeadDetail] = useState<RepairLeadDetail | null>(null);
    const [isLoadingDetail, setIsLoadingDetail] = useState(false);
    const [noteDraft, setNoteDraft] = useState("");
    const [isSubmittingNote, setIsSubmittingNote] = useState(false);

    const fetchLeads = useCallback(async (showRefresh = false) => {
        if (showRefresh) {
            setIsRefreshing(true);
        } else {
            setIsLoading(true);
        }

        try {
            const baseQuery = {
                status: statusFilter === "all" ? undefined : statusFilter,
                urgency: urgencyFilter === "all" ? undefined : urgencyFilter,
                contactChannel: channelFilter === "all" ? undefined : channelFilter,
                repairType: repairTypeFilter.trim() || undefined,
                dateFrom: dateFrom || undefined,
                dateTo: dateTo || undefined,
            };

            const [tableResponse, analyticsResponse] = await Promise.all([
                getRepairLeads({
                    ...baseQuery,
                    page: currentPage,
                    size: pageSize,
                }),
                getRepairLeadsMetrics(baseQuery),
            ]);

            setTableData({
                items: tableResponse.items,
                total: tableResponse.total,
                page: tableResponse.page,
                pages: tableResponse.pages,
            });
            setMetrics(analyticsResponse);
        } catch (error) {
            console.error("Error cargando leads:", error);
            toast({
                variant: "destructive",
                title: "Error al cargar leads",
                description: "No se pudieron obtener los datos de leads. Intentá nuevamente.",
            });
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
        }
    }, [
        channelFilter,
        currentPage,
        dateFrom,
        dateTo,
        pageSize,
        repairTypeFilter,
        statusFilter,
        urgencyFilter,
    ]);

    const loadLeadDetail = useCallback(async (leadId: string) => {
        setIsLoadingDetail(true);
        try {
            const detail = await getRepairLeadById(leadId);
            setSelectedLeadDetail(detail);
        } catch (error) {
            console.error("Error cargando detalle del lead:", error);
            toast({
                variant: "destructive",
                title: "No se pudo abrir el detalle",
                description: "Intentá nuevamente en unos segundos.",
            });
        } finally {
            setIsLoadingDetail(false);
        }
    }, []);

    useEffect(() => {
        void fetchLeads();
    }, [fetchLeads]);

    const statusCounts = useMemo(() => {
        const seed: Record<RepairLeadStatus, number> = {
            new: 0,
            contacted: 0,
            qualified: 0,
            converted: 0,
            discarded: 0,
        };

        for (const bucket of metrics.byStatus) {
            const key = bucket.key.toLowerCase() as RepairLeadStatus;
            if (key in seed) {
                seed[key] += bucket.value;
            }
        }

        return seed;
    }, [metrics.byStatus]);

    const channelCounts = useMemo(() => {
        return metrics.byContactChannel
            .map((bucket) => ({ label: bucket.key, value: bucket.value }))
            .sort((a, b) => b.value - a.value);
    }, [metrics.byContactChannel]);

    const trendData = useMemo(() => buildTrendDataFromMetrics(metrics.byDate, 14), [metrics.byDate]);

    const leadsTotal = metrics.totalLeads || tableData.total;
    const totalRealLeads = metrics.totalRealLeads || leadsTotal;
    const duplicatedLeads = Math.max(leadsTotal - totalRealLeads, 0);
    const convertedLeads = metrics.convertedLeads || statusCounts.converted;
    const conversionRate =
        metrics.conversionRate > 0
            ? metrics.conversionRate
            : totalRealLeads > 0
              ? (convertedLeads / totalRealLeads) * 100
              : 0;

    const handleStatusUpdate = async (
        lead: RepairLead,
        nextValue: string
    ) => {
        if (!STATUS_OPTIONS.some((status) => status.value === nextValue)) {
            return;
        }

        const nextStatus = nextValue as RepairLeadStatus;

        if (nextStatus === lead.status) {
            return;
        }

        setUpdatingLeadId(lead.id);

        try {
            await updateRepairLeadStatus(lead.id, nextStatus);
            toast({
                title: "Estado actualizado",
                description: `El lead quedó en estado ${STATUS_LABELS[nextStatus]}.`,
            });

            await fetchLeads(true);

            if (selectedLeadDetail?.lead.id === lead.id) {
                await loadLeadDetail(lead.id);
            }
        } catch (error) {
            console.error("Error actualizando estado:", error);
            toast({
                variant: "destructive",
                title: "No se pudo actualizar el estado",
                description: "Verificá tu conexión e intentá nuevamente.",
            });
        } finally {
            setUpdatingLeadId(null);
        }
    };

    const handleAddNote = async () => {
        if (!selectedLeadDetail || !noteDraft.trim()) {
            return;
        }

        setIsSubmittingNote(true);

        try {
            await addRepairLeadNote(selectedLeadDetail.lead.id, noteDraft.trim());
            setNoteDraft("");
            toast({
                title: "Nota agregada",
                description: "La nota se guardó correctamente.",
            });

            await loadLeadDetail(selectedLeadDetail.lead.id);
        } catch (error) {
            console.error("Error agregando nota:", error);
            toast({
                variant: "destructive",
                title: "No se pudo guardar la nota",
                description: "Intentá nuevamente.",
            });
        } finally {
            setIsSubmittingNote(false);
        }
    };

    const resetFilters = () => {
        setStatusFilter("all");
        setUrgencyFilter("all");
        setChannelFilter("all");
        setRepairTypeFilter("");
        setDateFrom("");
        setDateTo("");
        setCurrentPage(1);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Leads de Reparación</h1>
                    <p className="text-muted-foreground">
                        Seguimiento operativo y comercial de contactos entrantes.
                    </p>
                </div>

                <Button
                    variant="outline"
                    onClick={() => fetchLeads(true)}
                    disabled={isRefreshing}
                >
                    <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                    Actualizar
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Filtros</CardTitle>
                    <CardDescription>
                        Segmentá por estado, urgencia, canal, tipo de falla o rango de fecha.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-7">
                        <Select
                            value={statusFilter}
                            onValueChange={(value) => {
                                setStatusFilter(value as LeadStatusFilter);
                                setCurrentPage(1);
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Estado" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos los estados</SelectItem>
                                {STATUS_OPTIONS.map((status) => (
                                    <SelectItem key={status.value} value={status.value}>
                                        {status.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select
                            value={urgencyFilter}
                            onValueChange={(value) => {
                                setUrgencyFilter(value);
                                setCurrentPage(1);
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Urgencia" />
                            </SelectTrigger>
                            <SelectContent>
                                {URGENCY_OPTIONS.map((urgency) => (
                                    <SelectItem key={urgency.value} value={urgency.value}>
                                        {urgency.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select
                            value={channelFilter}
                            onValueChange={(value) => {
                                setChannelFilter(value);
                                setCurrentPage(1);
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Canal" />
                            </SelectTrigger>
                            <SelectContent>
                                {CHANNEL_OPTIONS.map((channel) => (
                                    <SelectItem key={channel.value} value={channel.value}>
                                        {channel.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <div className="relative md:col-span-2 xl:col-span-2">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                value={repairTypeFilter}
                                onChange={(event) => {
                                    setRepairTypeFilter(event.target.value);
                                    setCurrentPage(1);
                                }}
                                className="pl-9"
                                placeholder="Tipo de reparación"
                            />
                        </div>

                        <Input
                            type="date"
                            value={dateFrom}
                            onChange={(event) => {
                                setDateFrom(event.target.value);
                                setCurrentPage(1);
                            }}
                        />

                        <Input
                            type="date"
                            value={dateTo}
                            onChange={(event) => {
                                setDateTo(event.target.value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>

                    <div className="flex flex-col items-start justify-between gap-3 border-t pt-4 md:flex-row md:items-center">
                        <p className="text-sm text-muted-foreground">
                            Resultados totales según filtros: <span className="font-semibold text-foreground">{tableData.total}</span>
                        </p>
                        <Button variant="ghost" onClick={resetFilters}>
                            Limpiar filtros
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Leads Totales</p>
                                    <p className="mt-1 text-3xl font-bold">{leadsTotal}</p>
                                </div>
                                <div className="rounded-full bg-primary/10 p-3 text-primary">
                                    <UserRound className="h-5 w-5" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Leads Reales</p>
                                    <p className="mt-1 text-3xl font-bold">{totalRealLeads}</p>
                                </div>
                                <div className="rounded-full bg-amber-100 p-3 text-amber-700">
                                    <Activity className="h-5 w-5" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Convertidos</p>
                                    <p className="mt-1 text-3xl font-bold">{convertedLeads}</p>
                                </div>
                                <div className="rounded-full bg-emerald-100 p-3 text-emerald-700">
                                    <CheckCircle2 className="h-5 w-5" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Tasa de Conversión</p>
                                    <p className="mt-1 text-3xl font-bold">{conversionRate.toFixed(1)}%</p>
                                </div>
                                <div className="rounded-full bg-emerald-100 p-3 text-emerald-700">
                                    <TrendingUp className="h-5 w-5" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            <p className="text-xs text-muted-foreground">
                KPIs y gráficos calculados con universo completo filtrado. Leads reales excluyen duplicados ({duplicatedLeads}).
            </p>

            <div className="grid gap-4 xl:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Distribución por Estado</CardTitle>
                        <CardDescription>Foto actual de avance comercial.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {STATUS_OPTIONS.map((status) => {
                            const value = statusCounts[status.value];
                            const maxValue = Math.max(...Object.values(statusCounts), 1);
                            const width = (value / maxValue) * 100;

                            return (
                                <div key={status.value} className="space-y-1">
                                    <div className="flex items-center justify-between text-sm">
                                        <span>{status.label}</span>
                                        <span className="font-medium">{value}</span>
                                    </div>
                                    <div className="h-2 rounded-full bg-muted">
                                        <div
                                            className="h-2 rounded-full bg-primary transition-all"
                                            style={{ width: `${width}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Calidad de Dataset</CardTitle>
                        <CardDescription>Diferencia entre leads totales y reales (sin duplicados).</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                                <span>Leads reales</span>
                                <span className="font-medium">{totalRealLeads}</span>
                            </div>
                            <div className="h-2 rounded-full bg-muted">
                                <div
                                    className="h-2 rounded-full bg-emerald-500 transition-all"
                                    style={{ width: `${leadsTotal > 0 ? (totalRealLeads / leadsTotal) * 100 : 0}%` }}
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                                <span>Duplicados</span>
                                <span className="font-medium">{duplicatedLeads}</span>
                            </div>
                            <div className="h-2 rounded-full bg-muted">
                                <div
                                    className="h-2 rounded-full bg-rose-500 transition-all"
                                    style={{ width: `${leadsTotal > 0 ? (duplicatedLeads / leadsTotal) * 100 : 0}%` }}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Canal de Contacto</CardTitle>
                        <CardDescription>Origen de contacto preferido.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {channelCounts.length === 0 ? (
                            <p className="text-sm text-muted-foreground">Sin datos de canales para el filtro actual.</p>
                        ) : (
                            channelCounts.map((item) => (
                                <div
                                    key={item.label}
                                    className="flex items-center justify-between rounded-lg border bg-muted/20 px-3 py-2 text-sm"
                                >
                                    <span>{humanizeToken(item.label)}</span>
                                    <span className="font-semibold">{item.value}</span>
                                </div>
                            ))
                        )}
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Tendencia de Leads (14 días)</CardTitle>
                    <CardDescription>Evolución diaria de entradas según filtros aplicados.</CardDescription>
                </CardHeader>
                <CardContent>
                    <TrendChart points={trendData} />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Lista Operativa</CardTitle>
                    <CardDescription>
                        Mostrando {tableData.items.length} de {tableData.total} lead(s).
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {isLoading ? (
                        <div className="space-y-3">
                            {[...Array(6)].map((_, index) => (
                                <Skeleton key={`lead-skeleton-${index}`} className="h-12 w-full" />
                            ))}
                        </div>
                    ) : tableData.items.length === 0 ? (
                        <div className="rounded-lg border border-dashed py-10 text-center">
                            <p className="text-lg font-medium">No hay leads con estos filtros</p>
                            <p className="text-sm text-muted-foreground">
                                Probá ampliar el rango de fechas o quitar filtros.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Fecha</TableHead>
                                            <TableHead>Cliente / Equipo</TableHead>
                                            <TableHead>Falla</TableHead>
                                            <TableHead>Urgencia</TableHead>
                                            <TableHead>Canal</TableHead>
                                            <TableHead>Estado</TableHead>
                                            <TableHead className="text-right">Acciones</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {tableData.items.map((lead) => (
                                            <TableRow key={lead.id}>
                                                <TableCell className="text-sm text-muted-foreground">
                                                    {formatDateTime(lead.createdAt)}
                                                </TableCell>
                                                <TableCell>
                                                    <div>
                                                        <p className="font-medium">{lead.fullName}</p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {lead.brand} {lead.model} • {lead.phone}
                                                        </p>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="max-w-48">
                                                    <p className="line-clamp-2 text-sm">{humanizeToken(lead.repairType)}</p>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge className={getUrgencyClassName(lead.urgency)}>
                                                        {humanizeToken(lead.urgency)}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">{humanizeToken(lead.contactChannel)}</Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="space-y-2">
                                                        <Badge className={getStatusClassName(lead.status)}>
                                                            {STATUS_LABELS[lead.status]}
                                                        </Badge>
                                                        <Select
                                                            value={lead.status}
                                                            onValueChange={(nextValue) =>
                                                                void handleStatusUpdate(lead, nextValue)
                                                            }
                                                            disabled={updatingLeadId === lead.id}
                                                        >
                                                            <SelectTrigger className="h-8 w-40">
                                                                <SelectValue placeholder="Actualizar estado" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {STATUS_OPTIONS.map((status) => (
                                                                    <SelectItem key={status.value} value={status.value}>
                                                                        {status.label}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => void loadLeadDetail(lead.id)}
                                                    >
                                                        <MessageSquareText className="mr-2 h-4 w-4" />
                                                        Gestionar
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            <div className="flex flex-col gap-3 border-t pt-4 md:flex-row md:items-center md:justify-between">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span>Mostrar</span>
                                    <Select
                                        value={String(pageSize)}
                                        onValueChange={(value) => {
                                            setPageSize(Number(value));
                                            setCurrentPage(1);
                                        }}
                                    >
                                        <SelectTrigger className="h-8 w-20">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {PAGE_SIZE_OPTIONS.map((size) => (
                                                <SelectItem key={size} value={String(size)}>
                                                    {size}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <span>por página</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                                        disabled={currentPage <= 1}
                                    >
                                        <ChevronLeft className="mr-1 h-4 w-4" />
                                        Anterior
                                    </Button>
                                    <span className="text-sm text-muted-foreground">
                                        Página {tableData.page} de {tableData.pages}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            setCurrentPage((prev) =>
                                                Math.min(tableData.pages, prev + 1)
                                            )
                                        }
                                        disabled={currentPage >= tableData.pages}
                                    >
                                        Siguiente
                                        <ChevronRight className="ml-1 h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>

            {(isLoadingDetail || selectedLeadDetail) && (
                <Card>
                    <CardHeader className="flex flex-row items-start justify-between">
                        <div>
                            <CardTitle>Detalle del Lead</CardTitle>
                            <CardDescription>
                                Notas internas e historial de cambios de estado.
                            </CardDescription>
                        </div>
                        {isLoadingDetail && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />}
                    </CardHeader>
                    <CardContent>
                        {isLoadingDetail ? (
                            <div className="space-y-3">
                                <Skeleton className="h-12 w-full" />
                                <Skeleton className="h-20 w-full" />
                                <Skeleton className="h-24 w-full" />
                            </div>
                        ) : selectedLeadDetail ? (
                            <div className="space-y-6">
                                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                                    <div className="rounded-lg border p-3">
                                        <p className="text-xs text-muted-foreground">Cliente</p>
                                        <p className="font-semibold">{selectedLeadDetail.lead.fullName}</p>
                                        <p className="text-sm text-muted-foreground">{selectedLeadDetail.lead.phone}</p>
                                    </div>
                                    <div className="rounded-lg border p-3">
                                        <p className="text-xs text-muted-foreground">Equipo</p>
                                        <p className="font-semibold">{selectedLeadDetail.lead.brand} {selectedLeadDetail.lead.model}</p>
                                        <p className="text-sm text-muted-foreground">{humanizeToken(selectedLeadDetail.lead.repairType)}</p>
                                    </div>
                                    <div className="rounded-lg border p-3">
                                        <p className="text-xs text-muted-foreground">Estado</p>
                                        <Badge className={getStatusClassName(selectedLeadDetail.lead.status)}>
                                            {STATUS_LABELS[selectedLeadDetail.lead.status]}
                                        </Badge>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            Actualizado: {formatDateTime(selectedLeadDetail.lead.updatedAt)}
                                        </p>
                                    </div>
                                    <div className="rounded-lg border p-3">
                                        <p className="text-xs text-muted-foreground">Canal / Urgencia</p>
                                        <div className="mt-1 flex flex-wrap gap-2">
                                            <Badge variant="outline">{humanizeToken(selectedLeadDetail.lead.contactChannel)}</Badge>
                                            <Badge className={getUrgencyClassName(selectedLeadDetail.lead.urgency)}>
                                                {humanizeToken(selectedLeadDetail.lead.urgency)}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid gap-6 lg:grid-cols-2">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-primary" />
                                            <h3 className="font-semibold">Historial de Estado</h3>
                                        </div>

                                        {selectedLeadDetail.statusHistory.length === 0 ? (
                                            <p className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
                                                Aún no hay cambios de estado registrados.
                                            </p>
                                        ) : (
                                            <div className="space-y-2">
                                                {selectedLeadDetail.statusHistory.map((history) => (
                                                    <div
                                                        key={history.id}
                                                        className="rounded-lg border bg-muted/20 p-3 text-sm"
                                                    >
                                                        <p className="font-medium">
                                                            {humanizeToken(history.fromStatus)} → {humanizeToken(history.toStatus)}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {formatDateTime(history.changedAt)} · {history.changedBy}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <MessageSquareText className="h-4 w-4 text-primary" />
                                            <h3 className="font-semibold">Notas Internas</h3>
                                        </div>

                                        {selectedLeadDetail.notes.length === 0 ? (
                                            <p className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
                                                Todavía no hay notas para este lead.
                                            </p>
                                        ) : (
                                            <div className="max-h-56 space-y-2 overflow-auto pr-1">
                                                {selectedLeadDetail.notes.map((note) => (
                                                    <div key={note.id} className="rounded-lg border bg-muted/20 p-3 text-sm">
                                                        <p>{note.note}</p>
                                                        <p className="mt-1 text-xs text-muted-foreground">
                                                            {formatDateTime(note.createdAt)} · {note.createdBy}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <div className="space-y-2 border-t pt-3">
                                            <Textarea
                                                value={noteDraft}
                                                onChange={(event) => setNoteDraft(event.target.value)}
                                                placeholder="Agregar contexto de la conversación, precio enviado o próximo paso..."
                                            />
                                            <Button
                                                onClick={() => void handleAddNote()}
                                                disabled={isSubmittingNote || noteDraft.trim().length === 0}
                                            >
                                                {isSubmittingNote ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Guardando nota...
                                                    </>
                                                ) : (
                                                    "Guardar nota"
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
