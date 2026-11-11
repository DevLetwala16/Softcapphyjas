import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "../utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] disabled:pointer-events-none disabled:opacity-40 select-none relative overflow-hidden active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--accent)] text-[#05070D] font-semibold hover:brightness-110 shadow-[0_0_24px_rgba(34,211,238,0.3)] hover:shadow-[0_0_32px_rgba(34,211,238,0.45)] border border-transparent",
        violet:
          "bg-[var(--accent-2)] text-white font-semibold hover:brightness-110 shadow-[0_0_24px_rgba(139,92,246,0.3)] hover:shadow-[0_0_32px_rgba(139,92,246,0.45)] border border-transparent",
        secondary:
          "bg-[var(--bg-elev-1)] text-[var(--text)] border border-[var(--border)] hover:bg-[var(--bg-elev-2)] hover:border-[var(--accent)]/40 hover:text-white shadow-xs",
        ghost:
          "bg-transparent text-[var(--text)] hover:bg-[var(--bg-elev-1)] hover:text-white border border-transparent",
        danger:
          "bg-[var(--danger)] text-white font-semibold hover:brightness-110 shadow-[0_0_20px_rgba(244,63,94,0.3)] hover:shadow-[0_0_30px_rgba(244,63,94,0.45)] border border-transparent",
        outline:
          "bg-transparent text-[var(--text)] border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/5",
        glass:
          "glass-card text-[var(--text)] hover:border-[var(--accent)]/50 hover:shadow-[0_0_25px_rgba(34,211,238,0.2)] hover:text-white",
      },
      size: {
        sm: "h-9 px-3 text-xs rounded-lg gap-1.5",
        md: "h-11 px-5 text-sm rounded-lg gap-2 min-h-[44px]", // 44px min touch target
        lg: "h-12 px-6 text-base rounded-xl gap-2.5 min-h-[48px]",
        icon: "h-11 w-11 p-0 rounded-lg min-h-[44px] min-w-[44px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-current" />
            <span>{loadingText || children}</span>
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
          </span>
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";
