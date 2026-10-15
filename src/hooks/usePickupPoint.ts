"use client";

import { useEffect, useState } from "react";
import { fetchPickupPointDetails } from "@/lib/storeApi";
import { loadPickupPoint, type PickupState } from "@/lib/pickupPoint";

export function usePickupPoint(active: boolean) {
    const [state, setState] = useState<PickupState>({ status: "loading" });
    const [attempt, setAttempt] = useState(0);
    useEffect(() => {
        if (!active) return;
        let alive = true;
        const frame = requestAnimationFrame(() => {
            setState({ status: "loading" });
            void loadPickupPoint(fetchPickupPointDetails).then(result => { if (alive) setState(result); });
        });
        return () => { alive = false; cancelAnimationFrame(frame); };
    }, [active, attempt]);
    return { state, retry: () => setAttempt(value => value + 1) };
}
