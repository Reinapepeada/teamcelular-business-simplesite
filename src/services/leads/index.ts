import { getToken } from "@/services/auth";

const DEFAULT_API_URL = "https://fastapi-teamcelular-dev.up.railway.app";
const apiUrl = (process.env.NEXT_PUBLIC_API_URL?.trim() || DEFAULT_API_URL).replace(/\/+$/, "");

import {
    asString,
    buildInteractionQueryParams,
    buildLeadsQueryParams,
    isRecord,
    normalizeDetailResponse,
    normalizeInteractionListResponse,
    normalizeInteractionMetricsResponse,
    normalizeListResponse,
    normalizeMetricsResponse,
    normalizeNotes,
    pickFirst,
    unwrapData,
} from "./normalize";
import type {
    LeadInteractionsListResponse,
    LeadInteractionsMetricsResponse,
    LeadInteractionsQuery,
    RepairLead,
    RepairLeadDetail,
    RepairLeadNote,
    RepairLeadStatus,
    RepairLeadsListResponse,
    RepairLeadsMetricsResponse,
    RepairLeadsQuery,
} from "./types";

export type * from "./types";

class LeadsApiError extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.name = "LeadsApiError";
        this.status = status;
    }
}

async function authenticatedLeadsRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
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

export async function getLeadInteractions(
    query: LeadInteractionsQuery = {}
): Promise<LeadInteractionsListResponse> {
    const params = buildInteractionQueryParams(query, true);
    const page = query.page ?? 1;
    const size = query.size ?? 10;

    const response = await authenticatedLeadsRequest<unknown>(
        `/v1/leads/interactions?${params.toString()}`,
        { method: "GET" }
    );

    return normalizeInteractionListResponse(response, page, size);
}

export async function getLeadInteractionsMetrics(
    query: LeadInteractionsQuery = {}
): Promise<LeadInteractionsMetricsResponse> {
    const params = buildInteractionQueryParams(query, false);
    const queryString = params.toString();
    const endpoint = queryString
        ? `/v1/leads/interactions/metrics?${queryString}`
        : "/v1/leads/interactions/metrics";

    const response = await authenticatedLeadsRequest<unknown>(endpoint, {
        method: "GET",
    });

    return normalizeInteractionMetricsResponse(response);
}
