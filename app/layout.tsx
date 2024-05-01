import React from "react";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import "@/styles/globals.css";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import NextAuthProvider from "@/context/next-auth";
import { ThemeProvider } from "@/context/ThemeProvider";
import { QueryProvider } from "@/context/query";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

/**
 * The root layout component that wraps the entire application.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be rendered within the layout.
 * @returns {JSX.Element} The RootLayout component.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <NextAuthProvider>
            <QueryProvider>
              {children}
              <Analytics />
              <Toaster
                toastOptions={{
                  duration: 3000,
                  unstyled: true,
                  classNames: {
                    title: "text-sm font-bold",
                    description: "text-xs",
                    toast: cn(defaultToast, "bg-[#2B2D31]"),
                    success: cn(
                      defaultToast,
                      "bg-success text-success-foreground",
                    ),
                    error: cn(defaultToast, "bg-error text-error-foreground"),
                    warning: cn(
                      defaultToast,
                      "bg-warning text-warning-foreground",
                    ),
                    info: cn(defaultToast, "bg-info text-info-foreground"),
                    actionButton: cn(defaultToastButton, "bg-white text-black"),
                    cancelButton: cn(
                      defaultToastButton,
                      "bg-black/50 text-white",
                    ),
                    closeButton: cn(
                      defaultToastButton,
                      "bg-white/80 text-black",
                    ),
                  },
                }}
              />
            </QueryProvider>
          </NextAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
const defaultToast = "rounded-lg flex items-center p-4 gap-4 w-full";
const defaultToastButton = "text-xs font-semibold p-1 rounded-sm min-w-fit";
