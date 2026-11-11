import * as React from "react";
import {
  AlertCircle,
  Inbox,
  Lock,
  Timer,
  WifiOff,
  RotateCcw,
  KeyRound,
  ShieldAlert,
} from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import { cn } from "../utils";

/* 1. Empty State (Board 39) */
export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  className,
}: EmptyStateProps) {
  return (
    <Card
      variant="standard"
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 sm:p-12 border-dashed border-[var(--border)]",
        className
      )}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--bg-elev-2)] text-[var(--text-muted)] border border-[var(--border)] mb-4">
        {icon || <Inbox className="h-8 w-8 text-[var(--accent)]" />}
      </div>
      <h3 className="font-display text-lg sm:text-xl font-semibold text-[var(--text)] mb-2">
        {title}
      </h3>
      <p className="text-sm text-[var(--text-muted)] max-w-md leading-relaxed mb-6">
        {description}
      </p>
      {(action || secondaryAction) && (
        <div className="flex flex-wrap items-center justify-center gap-3">
          {action && (
            <Button variant="primary" onClick={action.onClick}>
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button variant="secondary" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </Card>
  );
}

/* 2. Error State with Retry & Error ID (Board 39) */
export interface ErrorStateProps {
  title?: string;
  message?: string;
  errorId?: string;
  onRetry?: () => void;
  isRetrying?: boolean;
  className?: string;
}

export function ErrorState({
  title = "Couldn't load data",
  message = "A network issue or server error occurred. Please try again.",
  errorId = "ERR-8F2A",
  onRetry,
  isRetrying = false,
  className,
}: ErrorStateProps) {
  return (
    <Card
      variant="standard"
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 sm:p-12 border-[#F43F5E]/30 bg-[#F43F5E]/5",
        className
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F43F5E]/15 text-[#F43F5E] mb-4">
        <AlertCircle className="h-7 w-7" />
      </div>
      <h3 className="font-display text-lg font-semibold text-[var(--text)] mb-1.5">
        {title}
      </h3>
      <p className="text-sm text-[var(--text-muted)] max-w-md leading-relaxed mb-3">
        {message}
      </p>
      {errorId && (
        <div className="text-xs font-mono-data text-[var(--text-muted)] bg-[var(--bg-elev-1)] px-2.5 py-1 rounded-md border border-[var(--border)] mb-5">
          Error Reference: <span className="text-[#F43F5E] font-bold">{errorId}</span>
        </div>
      )}
      {onRetry && (
        <Button
          variant="secondary"
          size="sm"
          onClick={onRetry}
          isLoading={isRetrying}
          leftIcon={<RotateCcw className="h-3.5 w-3.5" />}
        >
          Retry Request
        </Button>
      )}
    </Card>
  );
}

/* 3. Permission Denied State (Board 39) */
export interface PermissionDeniedStateProps {
  roleRequired?: string;
  resourceName?: string;
  onRequestAccess?: () => void;
  className?: string;
}

export function PermissionDeniedState({
  roleRequired = "FINANCE",
  resourceName = "Finance Command Center",
  onRequestAccess,
  className,
}: PermissionDeniedStateProps) {
  return (
    <Card
      variant="standard"
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 sm:p-12 border-[var(--border)]",
        className
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--warn)]/15 text-[var(--warn)] mb-4">
        <Lock className="h-7 w-7" />
      </div>
      <h3 className="font-display text-lg font-semibold text-[var(--text)] mb-1.5">
        You don't have access to {resourceName}
      </h3>
      <p className="text-sm text-[var(--text-muted)] max-w-md leading-relaxed mb-3">
        This portal section requires the elevated <span className="font-mono-data font-semibold text-[var(--text)]">{roleRequired}</span> role. Direct URLs render this security boundary and never expose protected data.
      </p>
      {onRequestAccess && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRequestAccess}
          leftIcon={<KeyRound className="h-3.5 w-3.5 text-[var(--accent)]" />}
          className="mt-2"
        >
          Request Role Access
        </Button>
      )}
    </Card>
  );
}

/* 4. Rate Limited (429) State (Board 39) */
export interface RateLimitedStateProps {
  retryAfterSeconds?: number;
  onRetry?: () => void;
  className?: string;
}

export function RateLimitedState({
  retryAfterSeconds = 42,
  onRetry,
  className,
}: RateLimitedStateProps) {
  const [secondsLeft, setSecondsLeft] = React.useState(retryAfterSeconds);

  React.useEffect(() => {
    if (secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsLeft]);

  return (
    <Card
      variant="standard"
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 sm:p-12 border-[var(--warn)]/30 bg-[var(--warn)]/5",
        className
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--warn)]/15 text-[var(--warn)] mb-4 animate-pulse">
        <Timer className="h-7 w-7" />
      </div>
      <h3 className="font-display text-lg font-semibold text-[var(--text)] mb-1.5">
        Too many requests (HTTP 429)
      </h3>
      <p className="text-sm text-[var(--text-muted)] max-w-md leading-relaxed mb-4">
        Our API rate-limit guardrails are protecting throughput. Please wait for the cooldown timer.
      </p>
      <div className="flex items-center gap-2 font-mono-data text-sm font-semibold text-[var(--warn)] bg-[var(--bg-elev-1)] px-4 py-2 rounded-xl border border-[var(--border)] mb-4">
        <span>Retry available in:</span>
        <span className="text-base text-[var(--text)]">{secondsLeft}s</span>
      </div>
      {onRetry && (
        <Button
          variant="primary"
          size="sm"
          disabled={secondsLeft > 0}
          onClick={onRetry}
        >
          {secondsLeft > 0 ? "Cooling down..." : "Try Again Now"}
        </Button>
      )}
    </Card>
  );
}

/* 5. Offline Banner Component (Board 39) */
export function OfflineBanner({
  isOnline = false,
  queuedCount = 0,
}: {
  isOnline?: boolean;
  queuedCount?: number;
}) {
  if (isOnline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="sticky top-0 z-50 flex items-center justify-between px-4 py-2.5 bg-[#F59E0B] text-[#05070D] font-medium text-xs sm:text-sm shadow-md"
    >
      <div className="flex items-center gap-2">
        <WifiOff className="h-4 w-4 shrink-0" />
        <span>
          Offline Mode — changes will automatically synchronize when connection resumes.
        </span>
      </div>
      {queuedCount > 0 && (
        <span className="font-mono-data font-semibold bg-black/15 px-2 py-0.5 rounded text-xs">
          ⏳ {queuedCount} queued
        </span>
      )}
    </div>
  );
}

/* 6. Form Error Summary (Board 39) */
export interface FormErrorSummaryProps {
  errors: { fieldId: string; message: string }[];
  className?: string;
}

export function FormErrorSummary({ errors, className }: FormErrorSummaryProps) {
  if (errors.length === 0) return null;

  const handleFocus = (fieldId: string) => {
    const el = document.getElementById(fieldId);
    if (el) {
      el.focus();
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div
      role="alert"
      aria-labelledby="error-summary-heading"
      className={cn(
        "p-4 rounded-xl border border-[#F43F5E]/40 bg-[#F43F5E]/10 text-left mb-6 text-sm",
        className
      )}
    >
      <div className="flex items-center gap-2 text-[#F43F5E] font-semibold mb-2">
        <ShieldAlert className="h-4 w-4 shrink-0" />
        <h4 id="error-summary-heading">
          There {errors.length === 1 ? "is 1 problem" : `are ${errors.length} problems`} with your submission
        </h4>
      </div>
      <ul className="list-disc list-inside space-y-1 text-xs text-[var(--text-muted)]">
        {errors.map((err, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => handleFocus(err.fieldId)}
              className="text-[#F43F5E] hover:underline font-medium cursor-pointer text-left"
            >
              {err.message}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
