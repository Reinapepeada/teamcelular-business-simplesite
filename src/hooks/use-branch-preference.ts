"use client";

import { useSyncExternalStore } from "react";
import { readBranchPreference } from "@/lib/branchPreference";

const subscribe = (onChange: () => void) => {
    window.addEventListener("storage", onChange);
    return () => window.removeEventListener("storage", onChange);
};
const getSnapshot = () => readBranchPreference()?.slug ?? "";
const getServerSnapshot = () => "" as const;

export function useBranchPreference() {
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
