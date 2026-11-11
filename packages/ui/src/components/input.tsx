import * as React from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "../utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  wrapperClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      id,
      disabled,
      required,
      wrapperClassName,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

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
            htmlFor={inputId}
            className="text-xs font-medium tracking-wide text-[var(--text-muted)] select-none flex items-center justify-between"
          >
            <span>
              {label}
              {required && <span className="text-[var(--danger)] ml-1" aria-hidden="true">*</span>}
            </span>
          </label>
        )}

        <div className="relative flex items-center w-full">
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-[var(--text-muted)]">
              {leftIcon}
            </div>
          )}

          <input
            id={inputId}
            type={type}
            ref={ref}
            disabled={disabled}
            required={required}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy}
            className={cn(
              "h-12 w-full rounded-xl px-4 text-sm font-normal text-[var(--text)] bg-[var(--bg-elev-1)] border border-[var(--border)] transition-all duration-200 outline-none placeholder:text-[var(--text-muted)]/60",
              "hover:border-[var(--border-subtle)] hover:bg-[var(--bg-elev-2)]",
              "focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/30 focus:bg-[var(--bg-elev-1)]",
              leftIcon && "pl-11",
              rightIcon || error ? "pr-11" : "pr-4",
              error && "border-[var(--danger)] focus:border-[var(--danger)] focus:ring-[var(--danger)]/30 text-[var(--text)]",
              disabled && "opacity-40 cursor-not-allowed bg-[var(--bg-elev-1)] hover:bg-[var(--bg-elev-1)] hover:border-[var(--border)]",
              className
            )}
            {...props}
          />

          {rightIcon && !error && (
            <div className="absolute right-3.5 flex items-center text-[var(--text-muted)]">
              {rightIcon}
            </div>
          )}

          {error && (
            <div className="absolute right-3.5 flex items-center pointer-events-none text-[var(--danger)]">
              <AlertCircle className="h-4 w-4" />
            </div>
          )}
        </div>

        {error && (
          <p id={errorId} className="text-xs text-[var(--danger)] font-medium flex items-center gap-1.5 mt-0.5" role="alert">
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

Input.displayName = "Input";
