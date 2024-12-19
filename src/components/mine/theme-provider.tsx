"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class" // Ensures Tailwind uses the "class" for dark mode
      defaultTheme="light" // Default theme used during SSR
      enableSystem // Enable system theme detection
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
