import * as React from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "../utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  wrapperClassName?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      id,
      disabled,
      required,
      wrapperClassName,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const textareaId = id || generatedId;
    const errorId = `${textareaId}-error`;
    const helperId = `${textareaId}-helper`;

    const describedBy = [
      error ? errorId : null,
      helperText && !error ? helperId : null,
    ]
      .filter(Boolean)
      .join(" ") || undefined;

    return (
      <div className={cn("w-full flex flex-col gap-1.5 text-left", wrapperClassName)}>
        {label && (
          <label
            htmlFor={textareaId}
            className="text-xs font-medium tracking-wide text-[var(--text-muted)] select-none flex items-center justify-between"
          >
            <span>
              {label}
              {required && <span className="text-[var(--danger)] ml-1" aria-hidden="true">*</span>}
            </span>
          </label>
        )}

        <div className="relative w-full">
          <textarea
            id={textareaId}
            ref={ref}
            disabled={disabled}
            required={required}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy}
            className={cn(
              "min-h-[120px] w-full rounded-xl p-4 text-sm font-normal text-[var(--text)] bg-[var(--bg-elev-1)] border border-[var(--border)] transition-all duration-200 outline-none placeholder:text-[var(--text-muted)]/60 leading-relaxed resize-y",
              "hover:border-[var(--border-subtle)] hover:bg-[var(--bg-elev-2)]",
              "focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/30 focus:bg-[var(--bg-elev-1)]",
              error && "border-[var(--danger)] focus:border-[var(--danger)] focus:ring-[var(--danger)]/30",
              disabled && "opacity-40 cursor-not-allowed bg-[var(--bg-elev-1)]",
              className
            )}
            {...props}
          />
        </div>

        {error && (
          <p id={errorId} className="text-xs text-[var(--danger)] font-medium flex items-center gap-1.5 mt-0.5" role="alert">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            <span>{error}</span>
          </p>
        )}

        {!error && helperText && (
          <p id={helperId} className="text-xs text-[var(--text-muted)] mt-0.5">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
