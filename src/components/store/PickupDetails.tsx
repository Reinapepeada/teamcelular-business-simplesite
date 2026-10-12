import type { PickupState } from "@/lib/pickupPoint";

export function PickupDetails({ state, retry, existingOrder = false }: { state: PickupState; retry: () => void; existingOrder?: boolean }) {
    const point = "point" in state ? state.point : null;
    return <div className="mt-2 text-xs leading-5" aria-live="polite" data-pickup-details>
        {point && <p>{[point.name, point.address, point.hours].filter(Boolean).join(" · ")}</p>}
        {state.status === "loading" && <p>Consultando dirección y horario de retiro…</p>}
        {state.status === "incomplete" && <p>El local todavía no informó {state.missing.join(" y ")}. {existingOrder ? "Confirmalo con la tienda antes de acercarte." : "Necesitamos confirmarlo antes de pagar un retiro."}</p>}
        {state.status === "unavailable" && <p>La tienda todavía no tiene un punto de retiro confirmado.</p>}
        {state.status === "error" && <p>No pudimos consultar la dirección y el horario de retiro. Puede ser una falla temporal.</p>}
        {state.status !== "loading" && state.status !== "ready" && <>
            <p>{existingOrder ? "Reintentá la consulta o escribinos con el número de pedido para confirmar el retiro." : "Podés reintentar, elegir envío si tus productos lo permiten o escribirnos para confirmar el retiro."}</p>
            <button type="button" onClick={retry} className="min-h-11 underline">Reintentar datos de retiro</button>
        </>}
    </div>;
}
