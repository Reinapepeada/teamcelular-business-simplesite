import { StoreApiError, type PickupPoint } from "./storeApi";

export type PickupState =
    | { status: "loading" }
    | { status: "ready"; point: PickupPoint }
    | { status: "incomplete"; point: PickupPoint; missing: string[] }
    | { status: "unavailable" | "error" };

/** Sólo los datos completos del local permiten confirmar un retiro nuevo. */
export async function loadPickupPoint(fetchPoint: () => Promise<PickupPoint | null>): Promise<PickupState> {
    try {
        const point = await fetchPoint();
        if (!point) return { status: "unavailable" };
        const missing = [
            !point.address?.trim() && "la dirección",
            !point.hours?.trim() && "el horario",
        ].filter((value): value is string => Boolean(value));
        return missing.length ? { status: "incomplete", point, missing } : { status: "ready", point };
    } catch (error) {
        return { status: error instanceof StoreApiError && error.status === 404 && error.code === "PICKUP_UNAVAILABLE" ? "unavailable" : "error" };
    }
}
