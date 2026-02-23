import React from 'react'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function Plugins() {
  const isVercelRuntime = Boolean(
    process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.VERCEL,
  );

  if (!isVercelRuntime) return null;

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
