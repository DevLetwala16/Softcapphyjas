import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "../utils";

export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitives.Root>, SwitchProps>(
  ({ className, label, description, id, ...props }, ref) => {
    const generatedId = React.useId();
    const switchId = id || generatedId;

    return (
      <div className="flex items-center justify-between gap-3">
        {(label || description) && (
          <label htmlFor={switchId} className="flex flex-col text-sm cursor-pointer select-none">
            {label && <span className="font-medium text-[var(--text)]">{label}</span>}
            {description && (
              <span className="text-xs text-[var(--text-muted)] mt-0.5">{description}</span>
            )}
          </label>
        )}

        <SwitchPrimitives.Root
          ref={ref}
          id={switchId}
          className={cn(
            "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-[var(--border)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] disabled:cursor-not-allowed disabled:opacity-40",
            "bg-[var(--bg-elev-2)] data-[state=checked]:bg-[var(--accent)] data-[state=checked]:border-[var(--accent)]",
            className
          )}
          {...props}
        >
          <SwitchPrimitives.Thumb
            className={cn(
              "pointer-events-none block h-4 w-4 rounded-full bg-white shadow-md ring-0 transition-transform duration-200",
              "translate-x-1 data-[state=checked]:translate-x-6 data-[state=checked]:bg-[#05070D]"
            )}
          />
        </SwitchPrimitives.Root>
      </div>
    );
  }
);

Switch.displayName = SwitchPrimitives.Root.displayName;
