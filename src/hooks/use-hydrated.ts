"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

/** Mantiene el primer render igual al servidor antes de leer datos del navegador. */
export function useHydrated() {
    return useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
}
