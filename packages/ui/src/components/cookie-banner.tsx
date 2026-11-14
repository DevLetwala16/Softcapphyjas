"use client";

import * as React from "react";
import { Cookie, X } from "lucide-react";
import { Button } from "./button";
import { cn } from "../utils";

export interface CookieBannerProps {
  onAccept?: () => void;
  onReject?: () => void;
  onCustomize?: () => void;
  className?: string;
}

export function CookieBanner({ onAccept, onReject, onCustomize, className }: CookieBannerProps) {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      // Show banner after brief delay
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
    onAccept?.();
  };

  const handleReject = () => {
    localStorage.setItem("cookie_consent", "rejected");
    setVisible(false);
    onReject?.();
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      className={cn(
        "fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 p-5 rounded-2xl",
        "bg-[var(--bg-elev-1)]/95 border border-[var(--border)] backdrop-blur-xl shadow-2xl text-[var(--text)]",
        "animate-in fade-in-0 slide-in-from-bottom-5 duration-300",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--bg-elev-2)] text-[var(--accent)] border border-[var(--border)]">
          <Cookie className="h-5 w-5" />
        </div>

        <div className="flex-1 text-left">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-display text-sm font-semibold text-[var(--text)]">
              Privacy & Cookie Controls
            </h4>
            <button
              type="button"
              onClick={handleReject}
              className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors p-1"
              aria-label="Close cookie banner"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
            We use essential cookies to maintain security and telemetry cookies to optimize platform
            performance. PostHog analytics executes only upon your explicit consent.
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <Button variant="primary" size="sm" onClick={handleAccept} className="h-8 px-3 text-xs">
              Accept All
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleReject}
              className="h-8 px-3 text-xs"
            >
              Reject
            </Button>
            {onCustomize && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onCustomize}
                className="h-8 px-2 text-xs text-[var(--text-muted)]"
              >
                Customise
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
