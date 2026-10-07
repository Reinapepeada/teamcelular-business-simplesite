// Catálogos, formato y armado de la tendencia del panel de leads.
import { formatArgentinaDateShort, formatArgentinaDateTime } from "@/lib/date";
import type {
    LeadInteractionsListResponse,
    LeadInteractionsMetricsResponse,
    RepairLead,
    RepairLeadsMetricsResponse,
    RepairLeadStatus,
} from "@/services/leads";

export type LeadStatusFilter = RepairLeadStatus | "all";

export const STATUS_OPTIONS: Array<{ value: RepairLeadStatus; label: string }> = [
    { value: "new", label: "Nuevo" },
    { value: "contacted", label: "Contactado" },
    { value: "qualified", label: "Calificado" },
    { value: "converted", label: "Convertido" },
    { value: "discarded", label: "Descartado" },
];

export const STATUS_LABELS: Record<RepairLeadStatus, string> = {
    new: "Nuevo",
    contacted: "Contactado",
    qualified: "Calificado",
    converted: "Convertido",
    discarded: "Descartado",
    duplicated: "Duplicado",
};

export const URGENCY_OPTIONS = [
    { value: "all", label: "Todas las urgencias" },
    { value: "hoy", label: "Hoy" },
    { value: "esta_semana", label: "Esta semana" },
    { value: "sin_urgencia", label: "Sin urgencia" },
];

export const CHANNEL_OPTIONS = [
    { value: "all", label: "Todos los canales" },
    { value: "whatsapp", label: "WhatsApp" },
    { value: "llamada", label: "Llamada" },
    { value: "email", label: "Email" },
];

export const PAGE_SIZE_OPTIONS = [10, 20, 50];

export const EMPTY_TABLE_DATA: { items: RepairLead[]; total: number; page: number; pages: number } = {
    items: [],
    total: 0,
    page: 1,
    pages: 1,
};

export const EMPTY_LEADS_METRICS: RepairLeadsMetricsResponse = {
    totalLeads: 0,
    totalRealLeads: 0,
    convertedLeads: 0,
    conversionRate: 0,
    byStatus: [],
    byContactChannel: [],
    byDate: [],
};

export const EMPTY_INTERACTION_DATA: LeadInteractionsListResponse = {
    items: [],
    total: 0,
    page: 1,
    size: 10,
    pages: 1,
};

export const EMPTY_INTERACTION_METRICS: LeadInteractionsMetricsResponse = {
    totalInteractions: 0,
    byEvent: [],
    byCtaName: [],
    byCtaVariant: [],
    byPage: [],
    byLocation: [],
    byDate: [],
};

export interface TrendPoint {
    key: string;
    label: string;
    count: number;
}

export type DatePreset = "this-month" | "last-month" | "30-days" | "90-days";

export interface ParetoAction {
    id: string;
    title: string;
    leads: number;
    share: number;
    recommendation: string;
}

export function toRate(part: number, total: number): number {
    if (total <= 0) {
        return 0;
    }

    return (part / total) * 100;
}

export function formatDateTime(value: string): string {
    return formatArgentinaDateTime(value);
}

export function humanizeToken(value: string): string {
    if (!value) {
        return "Sin dato";
    }

    const normalized = value.replaceAll("_", " ").trim();
    if (!normalized) {
        return "Sin dato";
    }

    return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

export function formatLeadValue(value: string | null | undefined, fallback = "Sin dato"): string {
    if (typeof value !== "string") {
        return fallback;
    }

    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : fallback;
}

export function getRequestErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof Error && error.message.trim().length > 0) {
        return error.message;
    }

    if (typeof error === "string" && error.trim().length > 0) {
        return error;
    }

    return fallback;
}

export function getStatusClassName(status: RepairLeadStatus): string {
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

export function getUrgencyClassName(urgency: string): string {
    const normalized = urgency.toLowerCase();

    if (normalized.includes("hoy") || normalized.includes("urgente")) {
        return "bg-rose-100 text-rose-700 hover:bg-rose-100";
    }

    if (normalized.includes("semana")) {
        return "bg-amber-100 text-amber-700 hover:bg-amber-100";
    }

    return "bg-slate-100 text-slate-700 hover:bg-slate-100";
}

export function buildTrendDataFromMetrics(
    byDate: RepairLeadsMetricsResponse["byDate"],
    dateFrom?: string,
    dateTo?: string
): TrendPoint[] {
    const counts = new Map(byDate.map((entry) => [entry.date.slice(0, 10), entry.value]));
    const sortedDates = [...counts.keys()].sort();
    const firstDate = dateFrom || sortedDates[0];
    const lastDate = dateTo || sortedDates[sortedDates.length - 1];

    if (!firstDate || !lastDate) return [];

    const cursor = new Date(`${firstDate}T12:00:00`);
    const end = new Date(`${lastDate}T12:00:00`);
    if (Number.isNaN(cursor.getTime()) || Number.isNaN(end.getTime()) || cursor > end) return [];

    const points: TrendPoint[] = [];
    while (cursor <= end) {
        const key = [
            cursor.getFullYear(),
            String(cursor.getMonth() + 1).padStart(2, "0"),
            String(cursor.getDate()).padStart(2, "0"),
        ].join("-");

        points.push({
            key,
            label: formatArgentinaDateShort(key),
            count: counts.get(key) ?? 0,
        });
        cursor.setDate(cursor.getDate() + 1);
    }

    return points;
}
