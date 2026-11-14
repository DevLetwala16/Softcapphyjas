import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import { cn } from "../utils";

export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn("grid gap-3", className)} {...props} ref={ref} />;
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

export interface RadioGroupItemProps extends React.ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Item
> {
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, label, description, id, ...props }, ref) => {
  const generatedId = React.useId();
  const itemId = id || generatedId;

  return (
    <div className="flex items-start gap-2.5">
      <RadioGroupPrimitive.Item
        ref={ref}
        id={itemId}
        className={cn(
          "aspect-square h-5 w-5 rounded-full border border-[var(--border)] bg-[var(--bg-elev-1)] text-[var(--accent)] transition-all duration-200 mt-0.5",
          "hover:border-[var(--accent)]/50 hover:bg-[var(--bg-elev-2)]",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
          "disabled:cursor-not-allowed disabled:opacity-40",
          "data-[state=checked]:border-[var(--accent)]",
          className
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
          <Circle className="h-2.5 w-2.5 fill-current text-current" />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>

      {(label || description) && (
        <label
          htmlFor={itemId}
          className="flex flex-col text-sm cursor-pointer select-none leading-tight"
        >
          {label && <span className="font-medium text-[var(--text)]">{label}</span>}
          {description && (
            <span className="text-xs text-[var(--text-muted)] mt-0.5 leading-normal">
              {description}
            </span>
          )}
        </label>
      )}
    </div>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;
