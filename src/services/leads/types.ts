// Contratos de leads de reparación e interacciones del sitio.

export type RepairLeadStatus =
    | "new"
    | "contacted"
    | "qualified"
    | "converted"
    | "discarded"
    | "duplicated";

export interface RepairLead {
    id: string;
    fullName: string;
    phone: string;
    email: string;
    brand: string;
    model: string;
    repairType: string;
    urgency: string;
    description: string;
    contactChannel: string;
    contact: string;
    preferredBranch: string;
    branchSelectionMethod: string;
    leadAttemptId: string;
    wizardSource: string;
    duplicateOf: string;
    whatsappUrl: string;
    utm: RepairLeadUtm | null;
    metadata: RepairLeadMetadata | null;
    status: RepairLeadStatus;
    source: string;
    createdAt: string;
    updatedAt: string;
}

export interface RepairLeadUtm {
    source: string;
    medium: string;
    campaign: string;
    content: string;
    term: string;
}

export interface RepairLeadMetadata {
    ip: string;
    userAgent: string;
    referrer: string;
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

export interface LeadInteraction {
    interactionId: number;
    eventName: string;
    ctaName: string;
    ctaLocation: string;
    ctaVariant: string;
    destination: string;
    pagePath: string;
    pageTitle: string;
    leadId: string;
    leadAttemptId: string;
    formName: string;
    formLocation: string;
    formVersion: string;
    stepIndex: number;
    stepId: string;
    stepLabel: string;
    totalSteps: number;
    brand: string;
    model: string;
    repairType: string;
    urgency: string;
    contactChannel: string;
    contact: string;
    description: string;
    payloadJson: string;
    ip: string;
    userAgent: string;
    referrer: string;
    createdAt: string;
}

export interface LeadInteractionsQuery {
    eventName?: string;
    ctaVariant?: string;
    ctaLocation?: string;
    pagePath?: string;
    leadAttemptId?: string;
    dateFrom?: string;
    dateTo?: string;
    page?: number;
    size?: number;
}

export interface LeadInteractionsListResponse {
    items: LeadInteraction[];
    total: number;
    page: number;
    size: number;
    pages: number;
}

export interface LeadInteractionMetricBucket {
    key: string;
    value: number;
}

export interface LeadInteractionDateBucket {
    date: string;
    value: number;
}

export interface LeadInteractionsMetricsResponse {
    totalInteractions: number;
    byEvent: LeadInteractionMetricBucket[];
    byCtaName: LeadInteractionMetricBucket[];
    byCtaVariant: LeadInteractionMetricBucket[];
    byPage: LeadInteractionMetricBucket[];
    byLocation: LeadInteractionMetricBucket[];
    byDate: LeadInteractionDateBucket[];
}
