// app/providers.tsx
"use client";

import {NextUIProvider} from '@nextui-org/react'
import {ThemeProvider as NextThemesProvider} from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextUIProvider>
      <NextThemesProvider {...props}>
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  )
}