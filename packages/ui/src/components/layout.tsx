import * as React from "react";
import { cn } from "../utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "standard" | "wide" | "ultra" | "prose" | "full";
  noPadding?: boolean;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "standard", noPadding = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full mx-auto",
          !noPadding && "px-4 sm:px-6 md:px-8 lg:px-12",
          size === "standard" && "max-w-[1200px]",
          size === "wide" && "max-w-[1440px]",
          size === "ultra" && "max-w-[1760px]",
          size === "prose" && "max-w-[68ch]",
          size === "full" && "max-w-none",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Container.displayName = "Container";

export interface GridAutoProps extends React.HTMLAttributes<HTMLDivElement> {
  minWidth?: "sm" | "md" | "lg";
  gap?: "sm" | "md" | "lg";
}

export const GridAuto = React.forwardRef<HTMLDivElement, GridAutoProps>(
  ({ className, minWidth = "md", gap = "md", children, ...props }, ref) => {
    const minWidthClasses = {
      sm: "grid-cols-[repeat(auto-fit,minmax(min(100%,14rem),1fr))]",
      md: "grid-cols-[repeat(auto-fit,minmax(min(100%,18rem),1fr))]",
      lg: "grid-cols-[repeat(auto-fit,minmax(min(100%,22rem),1fr))]",
    };

    const gapClasses = {
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
    };

    return (
      <div
        ref={ref}
        className={cn("grid w-full", minWidthClasses[minWidth], gapClasses[gap], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
GridAuto.displayName = "GridAuto";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: "sm" | "md" | "lg" | "xl" | "none";
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, spacing = "lg", children, ...props }, ref) => {
    const spacingClasses = {
      none: "py-0",
      sm: "py-8 md:py-12",
      md: "py-12 md:py-16",
      lg: "py-16 md:py-24",
      xl: "py-24 md:py-32",
    };

    return (
      <section
        ref={ref}
        className={cn("w-full relative", spacingClasses[spacing], className)}
        {...props}
      >
        {children}
      </section>
    );
  }
);
Section.displayName = "Section";
