import type { Metadata } from "next";
import { ThemeProvider } from "../components/theme-provider";
import { AuthProvider } from "../components/auth-provider";
import { Toaster } from "@softcapphyjas/ui";
import "./globals.css";

export const metadata: Metadata = {
  title: "Softcapphyjas — Frontier AI Research & Enterprise Intelligence",
  description:
    "Softcapphyjas operates at the frontier of AI research across biology, agriculture, physics, and higher mathematics, paired with enterprise AI engineering and the Softcapphyjas Synapse platform.",
  icons: {
    icon: "/brand/S6.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className="bg-[var(--bg)] text-[var(--text)] antialiased min-h-screen selection:bg-[var(--accent)] selection:text-[#05070D]">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
