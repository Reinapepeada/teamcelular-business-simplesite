"use client";

import { NextUIProvider } from "@nextui-org/react";

export default function NextUIScope({ children }: { children: React.ReactNode }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
