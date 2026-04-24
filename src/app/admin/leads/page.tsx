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
import { formatArgentinaDateShort, formatArgentinaDateTime } from "@/lib/date";
import {
    addRepairLeadNote,
    getLeadInteractions,
    getLeadInteractionsMetrics,
    getRepairLeadById,
    getRepairLeads,
    getRepairLeadsMetrics,
    updateRepairLeadStatus,
    type LeadInteraction,
    type LeadInteractionsListResponse,
    type LeadInteractionsMetricsResponse,
    type RepairLead,
    type RepairLeadDetail,
    type RepairLeadsMetricsResponse,
    type RepairLeadStatus,
} from "@/services/leads";
import {
    Activity,
    AlertTriangle,
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
    duplicated: "Duplicado",
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

interface ParetoAction {
    id: string;
    title: string;
    leads: number;
    share: number;
    recommendation: string;
}

function toRate(part: number, total: number): number {
    if (total <= 0) {
        return 0;
    }

    return (part / total) * 100;
}

function formatDateTime(value: string): string {
    return formatArgentinaDateTime(value);
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

function formatLeadValue(value: string | null | undefined, fallback = "Sin dato"): string {
    if (typeof value !== "string") {
        return fallback;
    }

    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : fallback;
}

function DetailRow({
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
        case "duplicated":
            return "bg-slate-100 text-slate-700 hover:bg-slate-100";
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
                : formatArgentinaDateShort(entry.date);

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
    const [ctaLocationFilter, setCtaLocationFilter] = useState("all");
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
    const [interactionData, setInteractionData] = useState<LeadInteractionsListResponse>({
        items: [],
        total: 0,
        page: 1,
        size: 10,
        pages: 1,
    });
    const [interactionMetrics, setInteractionMetrics] = useState<LeadInteractionsMetricsResponse>({
        totalInteractions: 0,
        byEvent: [],
        byCtaName: [],
        byCtaVariant: [],
        byPage: [],
        byLocation: [],
        byDate: [],
    });

    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [updatingLeadId, setUpdatingLeadId] = useState<string | null>(null);
    const [selectedInteraction, setSelectedInteraction] = useState<LeadInteraction | null>(null);

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

            const [tableResponse, analyticsResponse, interactionResponse, interactionMetricsResponse] = await Promise.all([
                getRepairLeads({
                    ...baseQuery,
                    page: currentPage,
                    size: pageSize,
                }),
                getRepairLeadsMetrics(baseQuery),
                getLeadInteractions({
                    dateFrom: dateFrom || undefined,
                    dateTo: dateTo || undefined,
                    ctaLocation: ctaLocationFilter === "all" ? undefined : ctaLocationFilter,
                    page: 1,
                    size: 10,
                }),
                getLeadInteractionsMetrics({
                    dateFrom: dateFrom || undefined,
                    dateTo: dateTo || undefined,
                    ctaLocation: ctaLocationFilter === "all" ? undefined : ctaLocationFilter,
                }),
            ]);

            setTableData({
                items: tableResponse.items,
                total: tableResponse.total,
                page: tableResponse.page,
                pages: tableResponse.pages,
            });
            setMetrics(analyticsResponse);
            setInteractionData(interactionResponse);
            setInteractionMetrics(interactionMetricsResponse);
            setSelectedInteraction((current) => {
                if (current && interactionResponse.items.some((item) => item.interactionId === current.interactionId)) {
                    return current;
                }

                return interactionResponse.items[0] ?? null;
            });
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
        ctaLocationFilter,
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
            duplicated: 0,
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
    const interactionTrendData = useMemo(
        () => buildTrendDataFromMetrics(interactionMetrics.byDate, 14),
        [interactionMetrics.byDate]
    );
    const interactionTotal = interactionMetrics.totalInteractions || interactionData.total;

    const interactionVariantCounts = useMemo(() => {
        const seed: Record<string, number> = {
            whatsapp: 0,
            phone: 0,
            email: 0,
            other: 0,
        };

        for (const bucket of interactionMetrics.byCtaVariant) {
            const normalizedKey = bucket.key.toLowerCase();
            if (normalizedKey in seed) {
                seed[normalizedKey] += bucket.value;
            } else {
                seed.other += bucket.value;
            }
        }

        return seed;
    }, [interactionMetrics.byCtaVariant]);

    const topInteractionCtas = useMemo(
        () => interactionMetrics.byCtaName.slice(0, 5),
        [interactionMetrics.byCtaName]
    );

    const topInteractionLocations = useMemo(
        () => interactionMetrics.byLocation.slice(0, 5),
        [interactionMetrics.byLocation]
    );

    const interactionLocationOptions = useMemo(() => {
        return interactionMetrics.byLocation
            .map((bucket) => ({ value: bucket.key, label: humanizeToken(bucket.key), total: bucket.value }))
            .sort((a, b) => b.total - a.total);
    }, [interactionMetrics.byLocation]);

    const leadsTotal = metrics.totalLeads || tableData.total;
    const totalRealLeads = metrics.totalRealLeads || leadsTotal;
    const duplicatedLeads = Math.max(leadsTotal - totalRealLeads, 0);
    const convertedLeads = metrics.convertedLeads || statusCounts.converted;
    const firstContactedLeads = Math.max(totalRealLeads - statusCounts.new, 0);
    const qualifiedPipelineLeads =
        statusCounts.qualified + statusCounts.converted + statusCounts.discarded;
    const conversionRate =
        metrics.conversionRate > 0
            ? metrics.conversionRate
            : totalRealLeads > 0
              ? (convertedLeads / totalRealLeads) * 100
              : 0;

    const firstContactRate = toRate(firstContactedLeads, totalRealLeads);
    const qualificationRate = toRate(qualifiedPipelineLeads, firstContactedLeads);
    const closeRateFromQualified = toRate(convertedLeads, qualifiedPipelineLeads);

    const paretoActions = useMemo<ParetoAction[]>(() => {
        const bottlenecks = [
            {
                id: "new",
                title: "Leads sin primer contacto",
                leads: statusCounts.new,
                recommendation:
                    "Aplica SLA de primer contacto en menos de 10 minutos para WhatsApp y 30 minutos para llamada/email.",
            },
            {
                id: "contacted",
                title: "Contactados sin calificar",
                leads: statusCounts.contacted,
                recommendation:
                    "Estandariza guion de 3 preguntas (falla, urgencia, presupuesto objetivo) para acelerar calificacion.",
            },
            {
                id: "qualified",
                title: "Calificados sin cierre",
                leads: statusCounts.qualified,
                recommendation:
                    "Enviar 2 opciones de presupuesto (express y optimizada) con deadline de decision en 24h.",
            },
            {
                id: "discarded",
                title: "Descartes para recuperar",
                leads: statusCounts.discarded,
                recommendation:
                    "Recontactar descartados de los ultimos 7 dias con propuesta de recuperacion y nuevo horario.",
            },
        ];

        return bottlenecks
            .filter((item) => item.leads > 0)
            .map((item) => ({
                ...item,
                share: toRate(item.leads, totalRealLeads),
            }))
            .sort((a, b) => b.leads - a.leads)
            .slice(0, 3);
    }, [
        statusCounts.contacted,
        statusCounts.discarded,
        statusCounts.new,
        statusCounts.qualified,
        totalRealLeads,
    ]);

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
        setCtaLocationFilter("all");
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

            <div className="grid gap-4 xl:grid-cols-3">
                <Card className="xl:col-span-2">
                    <CardHeader>
                        <CardTitle>Embudo Operativo (Pareto)</CardTitle>
                        <CardDescription>
                            Detecta rapido donde se concentra la mayor perdida del proceso comercial.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-3">
                        <div className="rounded-lg border bg-muted/15 p-4">
                            <p className="text-xs uppercase tracking-wide text-muted-foreground">Primer contacto</p>
                            <p className="mt-1 text-2xl font-bold">{firstContactRate.toFixed(1)}%</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                {firstContactedLeads} de {totalRealLeads} leads reales ya recibieron gestion.
                            </p>
                        </div>

                        <div className="rounded-lg border bg-muted/15 p-4">
                            <p className="text-xs uppercase tracking-wide text-muted-foreground">Calificacion</p>
                            <p className="mt-1 text-2xl font-bold">{qualificationRate.toFixed(1)}%</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                {qualifiedPipelineLeads} llegaron a etapa calificada o cierre.
                            </p>
                        </div>

                        <div className="rounded-lg border bg-muted/15 p-4">
                            <p className="text-xs uppercase tracking-wide text-muted-foreground">Cierre desde calificados</p>
                            <p className="mt-1 text-2xl font-bold">{closeRateFromQualified.toFixed(1)}%</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                {convertedLeads} convertidos sobre base calificada.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-amber-500" />
                            Acciones 80/20 de hoy
                        </CardTitle>
                        <CardDescription>
                            Ataca primero el cuello mas grande para mover conversion con menor esfuerzo.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {paretoActions.length === 0 ? (
                            <p className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
                                Aun no hay suficientes datos para priorizar acciones Pareto.
                            </p>
                        ) : (
                            paretoActions.map((action, index) => (
                                <div key={action.id} className="rounded-lg border bg-muted/15 p-3">
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="text-sm font-semibold">
                                            {index + 1}. {action.title}
                                        </p>
                                        <Badge variant="outline">{action.leads}</Badge>
                                    </div>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {action.share.toFixed(1)}% del total real filtrado.
                                    </p>
                                    <p className="mt-2 text-sm text-muted-foreground">{action.recommendation}</p>
                                </div>
                            ))
                        )}

                        <p className="text-xs text-muted-foreground">
                            Tip: los fallbacks de formulario se registran en logs con <strong>fallbackReason</strong>.
                        </p>
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
                    <CardTitle>Interacciones registradas</CardTitle>
                    <CardDescription>
                        Clicks a WhatsApp, teléfono, email y envíos del wizard almacenados en base.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                        <div className="rounded-xl border bg-muted/15 p-4">
                            <p className="text-xs uppercase tracking-wide text-muted-foreground">Total interacciones</p>
                            <p className="mt-1 text-3xl font-bold">{interactionTotal}</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Usá el filtro de fechas de arriba para comparar periodos con más clicks.
                            </p>
                        </div>

                        <div className="rounded-xl border bg-emerald-50 p-4 dark:bg-emerald-950/20">
                            <p className="text-xs uppercase tracking-wide text-emerald-700/80 dark:text-emerald-300/80">WhatsApp</p>
                            <p className="mt-1 text-3xl font-bold text-emerald-700 dark:text-emerald-300">
                                {interactionVariantCounts.whatsapp || 0}
                            </p>
                            <p className="mt-1 text-xs text-emerald-700/75 dark:text-emerald-300/80">Clicks o salidas directas al chat.</p>
                        </div>

                        <div className="rounded-xl border bg-sky-50 p-4 dark:bg-sky-950/20">
                            <p className="text-xs uppercase tracking-wide text-sky-700/80 dark:text-sky-300/80">Llamada</p>
                            <p className="mt-1 text-3xl font-bold text-sky-700 dark:text-sky-300">
                                {interactionVariantCounts.phone || 0}
                            </p>
                            <p className="mt-1 text-xs text-sky-700/75 dark:text-sky-300/80">Intenciones de contacto por teléfono.</p>
                        </div>

                        <div className="rounded-xl border bg-violet-50 p-4 dark:bg-violet-950/20">
                            <p className="text-xs uppercase tracking-wide text-violet-700/80 dark:text-violet-300/80">Email</p>
                            <p className="mt-1 text-3xl font-bold text-violet-700 dark:text-violet-300">
                                {interactionVariantCounts.email || 0}
                            </p>
                            <p className="mt-1 text-xs text-violet-700/75 dark:text-violet-300/80">Mensajes y respuestas por correo.</p>
                        </div>

                        <div className="rounded-xl border bg-amber-50 p-4 dark:bg-amber-950/20">
                            <p className="text-xs uppercase tracking-wide text-amber-700/80 dark:text-amber-300/80">Otros</p>
                            <p className="mt-1 text-3xl font-bold text-amber-700 dark:text-amber-300">
                                {interactionVariantCounts.other || 0}
                            </p>
                            <p className="mt-1 text-xs text-amber-700/75 dark:text-amber-300/80">Primary, secondary, Instagram y variantes genéricas.</p>
                        </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_220px] md:items-end">
                        <div>
                            <h3 className="text-sm font-semibold">Filtrar por ubicación del click</h3>
                            <p className="text-sm text-muted-foreground">
                                Elegí desde qué CTA o bloque estás viendo los clicks para comparar qué ubicación convierte mejor.
                            </p>
                        </div>

                        <Select
                            value={ctaLocationFilter}
                            onValueChange={(value) => {
                                setCtaLocationFilter(value);
                                setCurrentPage(1);
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Ubicación del click" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todas las ubicaciones</SelectItem>
                                {interactionLocationOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-4 xl:grid-cols-3">
                        <div className="rounded-xl border p-4 xl:col-span-1">
                            <h3 className="font-semibold">Por variante</h3>
                            <div className="mt-3 space-y-3">
                                {interactionMetrics.byCtaVariant.length === 0 ? (
                                    <p className="text-sm text-muted-foreground">Sin datos para el rango filtrado.</p>
                                ) : (
                                    interactionMetrics.byCtaVariant.map((bucket) => {
                                        const maxValue = Math.max(...interactionMetrics.byCtaVariant.map((item) => item.value), 1);
                                        const width = (bucket.value / maxValue) * 100;

                                        return (
                                            <div key={bucket.key} className="space-y-1">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span>{humanizeToken(bucket.key)}</span>
                                                    <span className="font-medium">{bucket.value}</span>
                                                </div>
                                                <div className="h-2 rounded-full bg-muted">
                                                    <div
                                                        className="h-2 rounded-full bg-primary transition-all"
                                                        style={{ width: `${width}%` }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>

                        <div className="rounded-xl border p-4 xl:col-span-1">
                            <h3 className="font-semibold">CTAs con más clicks</h3>
                            <div className="mt-3 space-y-4">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Nombre del CTA</p>
                                    <div className="mt-2 space-y-2">
                                        {topInteractionCtas.length === 0 ? (
                                            <p className="text-sm text-muted-foreground">Sin CTAs registrados.</p>
                                        ) : (
                                            topInteractionCtas.map((bucket) => (
                                                <div key={bucket.key} className="flex items-center justify-between rounded-lg border bg-muted/20 px-3 py-2 text-sm">
                                                    <span>{humanizeToken(bucket.key)}</span>
                                                    <span className="font-semibold">{bucket.value}</span>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Ubicación del click</p>
                                    <div className="mt-2 space-y-2">
                                        {topInteractionLocations.length === 0 ? (
                                            <p className="text-sm text-muted-foreground">Sin ubicaciones registradas.</p>
                                        ) : (
                                            topInteractionLocations.map((bucket) => (
                                                <div key={bucket.key} className="rounded-lg border bg-muted/20 px-3 py-2 text-sm">
                                                    <div className="flex items-center justify-between gap-3">
                                                        <span className="truncate">{bucket.key}</span>
                                                        <span className="font-semibold">{bucket.value}</span>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border p-4 xl:col-span-1">
                            <h3 className="font-semibold">Últimos detalles</h3>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Click en una fila para inspeccionar el payload completo.
                            </p>
                            <div className="mt-3 grid gap-3">
                                <DetailRow label="Lead attempt" value={selectedInteraction?.leadAttemptId} mono />
                                <DetailRow label="CTA" value={selectedInteraction?.ctaName} />
                                <DetailRow label="Ubicación" value={selectedInteraction?.ctaLocation} />
                                <DetailRow label="Destino" value={selectedInteraction?.destination} mono />
                                <DetailRow label="Página" value={selectedInteraction?.pagePath} mono />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border p-4">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <h3 className="font-semibold">Clicks por día</h3>
                                <p className="text-sm text-muted-foreground">
                                    Usa el rango actual para detectar períodos con más intención de contacto.
                                </p>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Fuente: interacciones registradas en base.
                            </p>
                        </div>
                        <div className="mt-4">
                            <TrendChart points={interactionTrendData} />
                        </div>
                    </div>

                    <div className="overflow-x-auto rounded-xl border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Fecha</TableHead>
                                    <TableHead>CTA</TableHead>
                                    <TableHead>Ubicación</TableHead>
                                    <TableHead>Variante</TableHead>
                                    <TableHead>Página</TableHead>
                                    <TableHead>Attempt</TableHead>
                                    <TableHead className="text-right">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={7}>
                                            <div className="space-y-2 py-4">
                                                {[...Array(4)].map((_, index) => (
                                                    <Skeleton key={`interaction-skeleton-${index}`} className="h-10 w-full" />
                                                ))}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : interactionData.items.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7}>
                                            <div className="py-8 text-center text-sm text-muted-foreground">
                                                Aún no hay interacciones para este rango.
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    interactionData.items.map((interaction) => (
                                        <TableRow key={interaction.interactionId}>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {formatDateTime(interaction.createdAt)}
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <p className="font-medium">{interaction.ctaName}</p>
                                                    <p className="text-xs text-muted-foreground">{humanizeToken(interaction.eventName)}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <p className="max-w-44 truncate text-sm">{formatLeadValue(interaction.ctaLocation, "Sin ubicación")}</p>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{humanizeToken(interaction.ctaVariant)}</Badge>
                                            </TableCell>
                                            <TableCell className="max-w-56">
                                                <p className="truncate text-sm">{interaction.pagePath}</p>
                                            </TableCell>
                                            <TableCell>
                                                <p className="max-w-44 truncate text-sm text-muted-foreground">
                                                    {formatLeadValue(interaction.leadAttemptId, "Sin attempt")}
                                                </p>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => setSelectedInteraction(interaction)}
                                                >
                                                    Ver detalle
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {selectedInteraction ? (
                        <div className="grid gap-4 lg:grid-cols-2">
                            <div className="rounded-xl border p-4">
                                <h3 className="font-semibold">Detalle de interacción</h3>
                                <div className="mt-3 grid gap-3 md:grid-cols-2">
                                    <DetailRow label="Evento" value={selectedInteraction.eventName} />
                                    <DetailRow label="CTA" value={selectedInteraction.ctaName} />
                                    <DetailRow label="Ubicación" value={selectedInteraction.ctaLocation} />
                                    <DetailRow label="Variante" value={selectedInteraction.ctaVariant} />
                                    <DetailRow label="Página" value={selectedInteraction.pagePath} mono />
                                    <DetailRow label="Attempt" value={selectedInteraction.leadAttemptId} mono />
                                    <DetailRow label="Marca" value={selectedInteraction.brand} />
                                    <DetailRow label="Modelo" value={selectedInteraction.model} />
                                    <DetailRow label="Falla" value={selectedInteraction.repairType} />
                                    <DetailRow label="Canal" value={selectedInteraction.contactChannel} />
                                    <DetailRow label="Destino" value={selectedInteraction.destination} mono />
                                    <DetailRow label="Origen" value={selectedInteraction.referrer} mono />
                                </div>
                            </div>

                            <div className="rounded-xl border p-4">
                                <h3 className="font-semibold">Payload crudo</h3>
                                <pre className="mt-3 max-h-80 overflow-auto rounded-lg bg-slate-950 p-4 text-xs leading-5 text-slate-100">
                                    {selectedInteraction.payloadJson}
                                </pre>
                            </div>
                        </div>
                    ) : null}
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
                                            <TableHead>Contacto / Equipo</TableHead>
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
                                                        <p className="font-medium">
                                                            {formatLeadValue(lead.contact, "Sin contacto")}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {lead.brand} {lead.model}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {formatLeadValue(lead.wizardSource, "Origen web")}
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
                                        <p className="text-xs text-muted-foreground">Contacto</p>
                                        <p className="font-semibold">
                                            {formatLeadValue(selectedLeadDetail.lead.contact, "Sin contacto")}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {humanizeToken(selectedLeadDetail.lead.contactChannel)}
                                        </p>
                                    </div>
                                    <div className="rounded-lg border p-3">
                                        <p className="text-xs text-muted-foreground">Equipo y falla</p>
                                        <p className="font-semibold">
                                            {selectedLeadDetail.lead.brand} {selectedLeadDetail.lead.model}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {humanizeToken(selectedLeadDetail.lead.repairType)}
                                        </p>
                                    </div>
                                    <div className="rounded-lg border p-3">
                                        <p className="text-xs text-muted-foreground">Estado</p>
                                        <Badge className={getStatusClassName(selectedLeadDetail.lead.status)}>
                                            {STATUS_LABELS[selectedLeadDetail.lead.status]}
                                        </Badge>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            Creado: {formatDateTime(selectedLeadDetail.lead.createdAt)}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Actualizado: {formatDateTime(selectedLeadDetail.lead.updatedAt)}
                                        </p>
                                    </div>
                                    <div className="rounded-lg border p-3">
                                        <p className="text-xs text-muted-foreground">Trazabilidad</p>
                                        <p className="font-semibold">
                                            {formatLeadValue(selectedLeadDetail.lead.leadAttemptId, "Sin attempt id")}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {formatLeadValue(selectedLeadDetail.lead.wizardSource, "Origen web")}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid gap-4 xl:grid-cols-3">
                                    <div className="space-y-3 xl:col-span-2">
                                        <div className="rounded-2xl border p-4">
                                            <h3 className="font-semibold">Datos del lead</h3>
                                            <div className="mt-3 grid gap-3 md:grid-cols-2">
                                                <DetailRow label="Lead ID" value={selectedLeadDetail.lead.id} mono />
                                                <DetailRow
                                                    label="Attempt ID"
                                                    value={selectedLeadDetail.lead.leadAttemptId}
                                                    mono
                                                />
                                                <DetailRow label="Origen wizard" value={selectedLeadDetail.lead.wizardSource} />
                                                <DetailRow label="Origen operativo" value={selectedLeadDetail.lead.source} />
                                                <DetailRow label="Contacto" value={selectedLeadDetail.lead.contact} />
                                                <DetailRow
                                                    label="Canal"
                                                    value={humanizeToken(selectedLeadDetail.lead.contactChannel)}
                                                />
                                                <DetailRow label="Estado" value={STATUS_LABELS[selectedLeadDetail.lead.status]} />
                                                <DetailRow
                                                    label="Duplicado de"
                                                    value={selectedLeadDetail.lead.duplicateOf}
                                                    mono
                                                />
                                            </div>
                                        </div>

                                        <div className="rounded-2xl border p-4">
                                            <h3 className="font-semibold">Equipo y contexto</h3>
                                            <div className="mt-3 grid gap-3 md:grid-cols-2">
                                                <DetailRow label="Marca" value={selectedLeadDetail.lead.brand} />
                                                <DetailRow label="Modelo" value={selectedLeadDetail.lead.model} />
                                                <DetailRow
                                                    label="Tipo de reparación"
                                                    value={selectedLeadDetail.lead.repairType}
                                                />
                                                <DetailRow
                                                    label="Urgencia"
                                                    value={humanizeToken(selectedLeadDetail.lead.urgency)}
                                                />
                                                <DetailRow
                                                    label="Descripción"
                                                    value={selectedLeadDetail.lead.description}
                                                />
                                                <DetailRow
                                                    label="WhatsApp generado"
                                                    value={selectedLeadDetail.lead.whatsappUrl}
                                                    mono
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="rounded-2xl border p-4">
                                            <h3 className="font-semibold">UTM</h3>
                                            <div className="mt-3 space-y-3">
                                                <DetailRow label="Source" value={selectedLeadDetail.lead.utm?.source} />
                                                <DetailRow label="Medium" value={selectedLeadDetail.lead.utm?.medium} />
                                                <DetailRow label="Campaign" value={selectedLeadDetail.lead.utm?.campaign} />
                                                <DetailRow label="Content" value={selectedLeadDetail.lead.utm?.content} />
                                                <DetailRow label="Term" value={selectedLeadDetail.lead.utm?.term} />
                                            </div>
                                        </div>

                                        <div className="rounded-2xl border p-4">
                                            <h3 className="font-semibold">Metadata</h3>
                                            <div className="mt-3 space-y-3">
                                                <DetailRow label="IP" value={selectedLeadDetail.lead.metadata?.ip} mono />
                                                <DetailRow
                                                    label="User agent"
                                                    value={selectedLeadDetail.lead.metadata?.userAgent}
                                                />
                                                <DetailRow
                                                    label="Referrer"
                                                    value={selectedLeadDetail.lead.metadata?.referrer}
                                                    mono
                                                />
                                            </div>
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
