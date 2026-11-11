import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils";

export const badgeVariants = cva(
  "inline-flex items-center gap-1.5 font-medium transition-colors select-none",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--bg-elev-2)] text-[var(--text)] border border-[var(--border)]",
        secondary:
          "bg-[var(--border)]/30 text-[var(--text-muted)] border border-transparent",
        outline:
          "border border-[var(--border)] text-[var(--text)] bg-transparent",
        cyan:
          "bg-[#22D3EE]/10 text-[#22D3EE] border border-[#22D3EE]/30",
        violet:
          "bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/30",
        success:
          "bg-[#34D399]/10 text-[#34D399] border border-[#34D399]/30",
        warn:
          "bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/30",
        danger:
          "bg-[#F43F5E]/10 text-[#F43F5E] border border-[#F43F5E]/30",
        /* Domain badges (Board 03) */
        medical:
          "bg-[#F472B6]/12 text-[#F472B6] border border-[#F472B6]/30 font-semibold",
        agri:
          "bg-[#34D399]/12 text-[#34D399] border border-[#34D399]/30 font-semibold",
        physics:
          "bg-[#22D3EE]/12 text-[#22D3EE] border border-[#22D3EE]/30 font-semibold",
        math:
          "bg-[#A78BFA]/12 text-[#A78BFA] border border-[#A78BFA]/30 font-semibold",
        frontier:
          "bg-[#FBBF24]/12 text-[#FBBF24] border border-[#FBBF24]/30 font-semibold",
      },
      size: {
        sm: "text-[11px] px-2 py-0.5 rounded-md",
        md: "text-xs px-2.5 py-1 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  hasDot?: boolean;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, hasDot, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size, className }))}
        {...props}
      >
        {hasDot && (
          <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80 shrink-0" />
        )}
        <span>{children}</span>
      </span>
    );
  }
);

Badge.displayName = "Badge";
export const Chip = Badge;
