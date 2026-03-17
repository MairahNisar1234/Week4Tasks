"use client";
import HydrationHandler from "./components/hydrationHandler";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <HydrationHandler />
        <ThemeProvider attribute="class">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}