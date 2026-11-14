import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils";

export const cardVariants = cva(
  "rounded-2xl transition-all duration-200 relative overflow-hidden text-left",
  {
    variants: {
      variant: {
        standard: "bg-[var(--bg-elev-1)] border border-[var(--border)] shadow-xs",
        elevated: "bg-[var(--bg-elev-2)] border border-[var(--border)] shadow-md",
        glass: "glass-card shadow-sm hover:border-[var(--accent)]/30",
        interactive:
          "bg-[var(--bg-elev-1)] border border-[var(--border)] hover:border-[var(--accent)]/50 hover:bg-[var(--bg-elev-2)] hover:shadow-[0_4px_24px_rgba(34,211,238,0.1)] cursor-pointer active:scale-[0.99]",
        ghost: "bg-transparent border border-transparent hover:bg-[var(--bg-elev-1)]/50",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "standard",
      padding: "md",
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, ...props }, ref) => (
    <div ref={ref} className={cn(cardVariants({ variant, padding, className }))} {...props} />
  )
);
Card.displayName = "Card";

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 pb-4", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-display text-lg md:text-xl font-semibold tracking-tight text-[var(--text)]",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-xs md:text-sm text-[var(--text-muted)] leading-relaxed", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("pt-0", className)} {...props} />
);
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center pt-4 border-t border-[var(--border)]/60 mt-4", className)}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

/* Dedicated Stat Card from Board 03 */
export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  subValue?: string;
  badge?: React.ReactNode;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
  icon?: React.ReactNode;
}

export const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ label, value, subValue, badge, trend, icon, className, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        variant="standard"
        padding="md"
        className={cn("flex flex-col justify-between group", className)}
        {...props}
      >
        <div className="flex items-center justify-between text-xs font-medium text-[var(--text-muted)] tracking-wider uppercase mb-2">
          <span>{label}</span>
          <div className="flex items-center gap-1.5">
            {badge}
            {icon && (
              <span className="text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors">
                {icon}
              </span>
            )}
          </div>
        </div>

        <div className="my-2">
          <div className="font-mono-data text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--text)]">
            {value}
          </div>
        </div>

        {(subValue || trend) && (
          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mt-1">
            {trend && (
              <span
                className={cn(
                  "font-mono-data font-semibold px-1.5 py-0.5 rounded text-[11px]",
                  trend.isPositive
                    ? "text-[var(--accent-3)] bg-[var(--accent-3)]/10"
                    : "text-[var(--danger)] bg-[var(--danger)]/10"
                )}
              >
                {trend.isPositive ? "+" : ""}
                {trend.value}
              </span>
            )}
            {subValue && <span>{subValue}</span>}
          </div>
        )}
      </Card>
    );
  }
);
StatCard.displayName = "StatCard";
