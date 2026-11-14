"use client";

import * as React from "react";
import Link from "next/link";
import { Container, Button } from "@softcapphyjas/ui";
import { AlertTriangle, RefreshCw, Home, LifeBuoy } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [errorId, setErrorId] = React.useState("ERR-INIT");

  React.useEffect(() => {
    // Generate or format an error ID for telemetry without leaking raw stack trace
    const hash = error.digest
      ? error.digest.substring(0, 8).toUpperCase()
      : Math.random().toString(36).substring(2, 8).toUpperCase();
    setErrorId(`ERR-${hash}`);
  }, [error]);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors flex flex-col justify-center items-center py-20">
      <Container size="standard">
        <div className="text-center space-y-6 max-w-lg mx-auto rounded-3xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-8 sm:p-12 shadow-2xl">
          <div className="h-14 w-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 mx-auto flex items-center justify-center">
            <AlertTriangle className="h-7 w-7" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-rose-950 text-rose-300 border border-rose-800">
              <span>System Exception</span>
              <span>·</span>
              <span>{errorId}</span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--text)]">
              Something went wrong
            </h1>

            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              An unexpected runtime discrepancy was encountered while evaluating this state. Our
              operations monitoring team has been notified.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button variant="primary" onClick={() => reset()}>
              <RefreshCw className="h-4 w-4 mr-1.5" />
              <span>Try Again</span>
            </Button>

            <Button variant="secondary" asChild>
              <Link href="/">
                <Home className="h-4 w-4 mr-1.5" />
                <span>Go to Home</span>
              </Link>
            </Button>

            <Button variant="ghost" asChild>
              <Link href={`/contact?topic=general&ref=${errorId}`}>
                <LifeBuoy className="h-4 w-4 mr-1.5" />
                <span>Report Discrepancy</span>
              </Link>
            </Button>
          </div>

          <p className="text-[11px] font-mono text-[var(--text-muted)] pt-4 border-t border-[var(--border)]">
            Reference Incident Token: <span className="text-[var(--text)]">{errorId}</span>
          </p>
        </div>
      </Container>
    </div>
  );
}
