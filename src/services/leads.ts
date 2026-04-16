import { getToken } from "@/services/auth";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export type RepairLeadStatus =
    | "new"
    | "contacted"
    | "qualified"
    | "converted"
    | "discarded";

export interface RepairLead {
    id: string;
    fullName: string;
    phone: string;
    email: string;
    brand: string;
    model: string;
    repairType: string;
    urgency: string;
    contactChannel: string;
    status: RepairLeadStatus;
    source: string;
    createdAt: string;
    updatedAt: string;
}

export interface RepairLeadStatusChange {
    id: string;
    fromStatus: string;
    toStatus: string;
    changedAt: string;
    changedBy: string;
}

export interface RepairLeadNote {
    id: string;
    note: string;
    createdAt: string;
    createdBy: string;
}

export interface RepairLeadDetail {
    lead: RepairLead;
    statusHistory: RepairLeadStatusChange[];
    notes: RepairLeadNote[];
}

export interface RepairLeadsQuery {
    status?: RepairLeadStatus;
    urgency?: string;
    contactChannel?: string;
    repairType?: string;
    dateFrom?: string;
    dateTo?: string;
    page?: number;
    size?: number;
}

export interface RepairLeadsListResponse {
    items: RepairLead[];
    total: number;
    page: number;
    size: number;
    pages: number;
}

export interface RepairLeadsMetricBucket {
    key: string;
    value: number;
}

export interface RepairLeadsDateBucket {
    date: string;
    value: number;
}

export interface RepairLeadsMetricsResponse {
    totalLeads: number;
    totalRealLeads: number;
    convertedLeads: number;
    conversionRate: number;
    byStatus: RepairLeadsMetricBucket[];
    byContactChannel: RepairLeadsMetricBucket[];
    byDate: RepairLeadsDateBucket[];
}

class LeadsApiError extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.name = "LeadsApiError";
        this.status = status;
    }
}

const KNOWN_STATUSES: RepairLeadStatus[] = [
    "new",
    "contacted",
    "qualified",
    "converted",
    "discarded",
];

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function pickFirst(record: Record<string, unknown>, keys: string[]): unknown {
    for (const key of keys) {
        if (record[key] !== undefined && record[key] !== null) {
            return record[key];
        }
    }
    return undefined;
}

function asString(value: unknown, fallback = ""): string {
    if (typeof value === "string") {
        return value;
    }
    if (typeof value === "number") {
        return String(value);
    }
    return fallback;
}

function asNumber(value: unknown, fallback = 0): number {
    if (typeof value === "number" && Number.isFinite(value)) {
        return value;
    }

    if (typeof value === "string") {
        const parsed = Number(value);
        if (Number.isFinite(parsed)) {
            return parsed;
        }
    }

    return fallback;
}

function normalizeStatus(value: unknown): RepairLeadStatus {
    const normalized = asString(value, "new").toLowerCase();
    if (KNOWN_STATUSES.includes(normalized as RepairLeadStatus)) {
        return normalized as RepairLeadStatus;
    }
    return "new";
}

function unwrapData(raw: unknown): unknown {
    if (!isRecord(raw)) {
        return raw;
    }

    if (isRecord(raw.data) || Array.isArray(raw.data)) {
        return raw.data;
    }

    return raw;
}

function normalizeLead(raw: unknown): RepairLead {
    const record = isRecord(raw) ? raw : {};
    const device = isRecord(record.device) ? record.device : {};

    const idCandidate = pickFirst(record, ["id", "lead_id", "leadId"]);
    const nowIso = new Date().toISOString();

    return {
        id: asString(idCandidate, `lead-${Date.now()}`),
        fullName: asString(pickFirst(record, ["full_name", "fullName", "name"]), "-"),
        phone: asString(pickFirst(record, ["phone", "phone_number", "phoneNumber"]), "-"),
        email: asString(pickFirst(record, ["email", "mail"]), ""),
        brand: asString(
            pickFirst(record, ["brand", "device_brand", "deviceBrand"]) ??
                pickFirst(device, ["brand", "device_brand", "deviceBrand"]),
            "-"
        ),
        model: asString(
            pickFirst(record, ["model", "device_model", "deviceModel"]) ??
                pickFirst(device, ["model", "device_model", "deviceModel"]),
            "-"
        ),
        repairType: asString(pickFirst(record, ["repair_type", "repairType", "issue"]), "-"),
        urgency: asString(pickFirst(record, ["urgency", "priority"]), "sin_urgencia"),
        contactChannel: asString(
            pickFirst(record, ["contact_channel", "contactChannel", "channel"]),
            "whatsapp"
        ),
        status: normalizeStatus(pickFirst(record, ["status", "lead_status", "leadStatus"])),
        source: asString(pickFirst(record, ["source", "wizard_source", "wizardSource"]), "web"),
        createdAt: asString(pickFirst(record, ["created_at", "createdAt", "timestamp"]), nowIso),
        updatedAt: asString(
            pickFirst(record, ["updated_at", "updatedAt", "last_update", "lastUpdate"]),
            nowIso
        ),
    };
}

function normalizeStatusHistory(raw: unknown): RepairLeadStatusChange[] {
    if (!Array.isArray(raw)) {
        return [];
    }

    return raw.map((item, index) => {
        const record = isRecord(item) ? item : {};
        const nowIso = new Date().toISOString();

        return {
            id: asString(pickFirst(record, ["id", "history_id", "historyId"]), `history-${index}`),
            fromStatus: asString(
                pickFirst(record, ["from_status", "fromStatus", "previous_status", "previousStatus"]),
                "-"
            ),
            toStatus: asString(pickFirst(record, ["to_status", "toStatus", "status"]), "-"),
            changedAt: asString(
                pickFirst(record, ["changed_at", "changedAt", "created_at", "createdAt"]),
                nowIso
            ),
            changedBy: asString(
                pickFirst(record, ["changed_by", "changedBy", "admin", "username"]),
                "Sistema"
            ),
        };
    });
}

function normalizeNotes(raw: unknown): RepairLeadNote[] {
    if (!Array.isArray(raw)) {
        return [];
    }

    return raw.map((item, index) => {
        const record = isRecord(item) ? item : {};
        const nowIso = new Date().toISOString();

        return {
            id: asString(pickFirst(record, ["id", "note_id", "noteId"]), `note-${index}`),
            note: asString(pickFirst(record, ["note", "content", "message"]), ""),
            createdAt: asString(pickFirst(record, ["created_at", "createdAt"]), nowIso),
            createdBy: asString(
                pickFirst(record, ["created_by", "createdBy", "admin", "username"]),
                "Sistema"
            ),
        };
    });
}

function normalizeListResponse(
    raw: unknown,
    fallbackPage: number,
    fallbackSize: number
): RepairLeadsListResponse {
    const unwrapped = unwrapData(raw);
    const container = isRecord(unwrapped) ? unwrapped : {};

    const listCandidate = Array.isArray(unwrapped)
        ? unwrapped
        : pickFirst(container, ["items", "leads", "results", "rows", "data"]);

    const items = Array.isArray(listCandidate)
        ? listCandidate.map((lead) => normalizeLead(lead))
        : [];

    const total = asNumber(pickFirst(container, ["total", "count", "total_count", "totalCount"]), items.length);
    const page = asNumber(pickFirst(container, ["page", "current_page", "currentPage"]), fallbackPage);
    const size = asNumber(pickFirst(container, ["size", "page_size", "pageSize", "limit"]), fallbackSize);
    const pagesFallback = size > 0 ? Math.max(1, Math.ceil(total / size)) : 1;
    const pages = asNumber(pickFirst(container, ["pages", "total_pages", "totalPages"]), pagesFallback);

    return {
        items,
        total,
        page,
        size,
        pages,
    };
}

function normalizeMetricBucketList(
    raw: unknown,
    keyCandidates: string[]
): RepairLeadsMetricBucket[] {
    if (Array.isArray(raw)) {
        return raw
            .map((item, index) => {
                const record = isRecord(item) ? item : {};
                const key = asString(
                    pickFirst(record, [...keyCandidates, "key", "label", "name"]),
                    `bucket-${index}`
                );
                const value = asNumber(
                    pickFirst(record, ["count", "value", "total"]),
                    0
                );

                return { key, value };
            })
            .filter((bucket) => bucket.key.length > 0);
    }

    if (isRecord(raw)) {
        return Object.entries(raw).map(([key, value]) => ({
            key,
            value: asNumber(value, 0),
        }));
    }

    return [];
}

function normalizeDateMetricList(raw: unknown): RepairLeadsDateBucket[] {
    return normalizeMetricBucketList(raw, ["date", "day"])
        .map((bucket) => ({
            date: bucket.key,
            value: bucket.value,
        }))
        .sort((a, b) => {
            const timeA = new Date(a.date).getTime();
            const timeB = new Date(b.date).getTime();

            if (Number.isNaN(timeA) || Number.isNaN(timeB)) {
                return a.date.localeCompare(b.date);
            }

            return timeA - timeB;
        });
}

function normalizeMetricsResponse(raw: unknown): RepairLeadsMetricsResponse {
    const unwrapped = unwrapData(raw);
    const container = isRecord(unwrapped) ? unwrapped : {};

    const byStatus = normalizeMetricBucketList(
        pickFirst(container, ["byStatus", "by_status", "status", "status_breakdown"]),
        ["status", "state"]
    );

    const byContactChannel = normalizeMetricBucketList(
        pickFirst(container, ["byContactChannel", "by_contact_channel", "channels", "channel_breakdown"]),
        ["contact_channel", "contactChannel", "channel"]
    );

    const byDate = normalizeDateMetricList(
        pickFirst(container, ["byDate", "by_date", "dates", "date_breakdown"])
    );

    const totalLeads = asNumber(
        pickFirst(container, ["totalLeads", "total_leads", "total"]),
        0
    );

    const totalRealLeads = asNumber(
        pickFirst(container, ["totalRealLeads", "total_real_leads", "total_real"]),
        totalLeads
    );

    const convertedFallback =
        byStatus.find((bucket) => bucket.key.toLowerCase() === "converted")?.value ?? 0;

    const convertedLeads = asNumber(
        pickFirst(container, ["convertedLeads", "converted_leads"]),
        convertedFallback
    );

    const rawRate = asNumber(
        pickFirst(container, ["conversionRate", "conversion_rate"]),
        -1
    );

    let conversionRate =
        rawRate >= 0
            ? rawRate
            : totalRealLeads > 0
              ? (convertedLeads / totalRealLeads) * 100
              : 0;

    if (conversionRate > 0 && conversionRate <= 1) {
        conversionRate *= 100;
    }

    return {
        totalLeads,
        totalRealLeads,
        convertedLeads,
        conversionRate,
        byStatus,
        byContactChannel,
        byDate,
    };
}

function buildLeadsQueryParams(
    query: RepairLeadsQuery,
    includePagination: boolean
): URLSearchParams {
    const params = new URLSearchParams();

    if (query.status) params.set("status", query.status);
    if (query.urgency) params.set("urgency", query.urgency);

    if (query.contactChannel) {
        params.set("contactChannel", query.contactChannel);
        params.set("contact_channel", query.contactChannel);
    }

    if (query.repairType) {
        params.set("repairType", query.repairType);
        params.set("repair_type", query.repairType);
    }

    if (query.dateFrom) {
        params.set("dateFrom", query.dateFrom);
        params.set("date_from", query.dateFrom);
    }

    if (query.dateTo) {
        params.set("dateTo", query.dateTo);
        params.set("date_to", query.dateTo);
    }

    if (includePagination) {
        const page = query.page ?? 1;
        const size = query.size ?? 20;
        params.set("page", String(page));
        params.set("size", String(size));
    }

    return params;
}

function normalizeDetailResponse(raw: unknown): RepairLeadDetail {
    const unwrapped = unwrapData(raw);
    const container = isRecord(unwrapped) ? unwrapped : {};

    const leadCandidate =
        pickFirst(container, ["lead", "item", "repair_lead", "repairLead"]) ?? container;

    const lead = normalizeLead(leadCandidate);

    const statusHistory = normalizeStatusHistory(
        pickFirst(container, ["status_history", "statusHistory", "history"]) ??
            (isRecord(leadCandidate)
                ? pickFirst(leadCandidate, ["status_history", "statusHistory", "history"])
                : undefined)
    );

    const notes = normalizeNotes(
        pickFirst(container, ["notes", "lead_notes", "leadNotes"]) ??
            (isRecord(leadCandidate)
                ? pickFirst(leadCandidate, ["notes", "lead_notes", "leadNotes"])
                : undefined)
    );

    return {
        lead,
        statusHistory,
        notes,
    };
}

async function authenticatedLeadsRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    if (!apiUrl) {
        throw new LeadsApiError(500, "NEXT_PUBLIC_API_URL no está configurada");
    }

    const token = getToken();

    if (!token) {
        throw new LeadsApiError(401, "No hay sesión activa");
    }

    const headers = new Headers(options.headers);
    headers.set("Authorization", `Bearer ${token}`);
    headers.set("Content-Type", "application/json");

    const response = await fetch(`${apiUrl}${endpoint}`, {
        ...options,
        headers,
        cache: "no-store",
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
        const message = isRecord(payload)
            ? asString(pickFirst(payload, ["detail", "message", "error"]), "Error al consultar leads")
            : "Error al consultar leads";

        throw new LeadsApiError(response.status, message);
    }

    return payload as T;
}

export async function getRepairLeads(query: RepairLeadsQuery = {}): Promise<RepairLeadsListResponse> {
    const params = buildLeadsQueryParams(query, true);
    const page = query.page ?? 1;
    const size = query.size ?? 20;

    const response = await authenticatedLeadsRequest<unknown>(
        `/v1/leads/repair?${params.toString()}`,
        { method: "GET" }
    );

    return normalizeListResponse(response, page, size);
}

export async function getRepairLeadsMetrics(
    query: RepairLeadsQuery = {}
): Promise<RepairLeadsMetricsResponse> {
    const params = buildLeadsQueryParams(query, false);
    const queryString = params.toString();
    const endpoint = queryString
        ? `/v1/leads/repair/metrics?${queryString}`
        : "/v1/leads/repair/metrics";

    const response = await authenticatedLeadsRequest<unknown>(endpoint, {
        method: "GET",
    });

    return normalizeMetricsResponse(response);
}

export async function getRepairLeadById(leadId: string): Promise<RepairLeadDetail> {
    const response = await authenticatedLeadsRequest<unknown>(
        `/v1/leads/repair/${leadId}`,
        { method: "GET" }
    );

    return normalizeDetailResponse(response);
}

export async function updateRepairLeadStatus(
    leadId: string,
    status: RepairLeadStatus
): Promise<RepairLead> {
    const response = await authenticatedLeadsRequest<unknown>(
        `/v1/leads/repair/${leadId}/status`,
        {
            method: "PATCH",
            body: JSON.stringify({ status }),
        }
    );

    const detail = normalizeDetailResponse(response);
    return {
        ...detail.lead,
        id: detail.lead.id || leadId,
        status,
    };
}

export async function addRepairLeadNote(leadId: string, note: string): Promise<RepairLeadNote> {
    const response = await authenticatedLeadsRequest<unknown>(
        `/v1/leads/repair/${leadId}/notes`,
        {
            method: "POST",
            body: JSON.stringify({ note }),
        }
    );

    const unwrapped = unwrapData(response);
    const container = isRecord(unwrapped) ? unwrapped : {};
    const noteCandidate = pickFirst(container, ["note", "item", "data"]) ?? container;
    const [normalized] = normalizeNotes([noteCandidate]);

    return (
        normalized ?? {
            id: `note-${Date.now()}`,
            note,
            createdAt: new Date().toISOString(),
            createdBy: "Sistema",
        }
    );
}
