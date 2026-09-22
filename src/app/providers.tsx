// app/providers.tsx
"use client";

import {ThemeProvider as NextThemesProvider} from "next-themes";

// ponytail: NextUIProvider vive en tienda/layout.tsx, el unico lugar que usa
// NextUI. Envolver todo el sitio sumaba hidratacion (react-aria) a cada pagina.
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
