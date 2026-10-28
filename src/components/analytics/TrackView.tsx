"use client";

import { useEffect, useRef } from "react";
import { measure } from "@/lib/analytics/posthog";

/** Una impresión por montaje y conjunto de datos; tolera efectos repetidos de React. */
export default function TrackView({ eventName, properties }: { eventName: string; properties: Record<string, unknown> }) {
  const serialized = JSON.stringify(properties);
  const previous = useRef("");
  useEffect(() => {
    const key = `${eventName}:${serialized}`;
    if (previous.current === key) return;
    previous.current = key;
    measure(eventName, JSON.parse(serialized));
  }, [eventName, serialized]);
  return null;
}
