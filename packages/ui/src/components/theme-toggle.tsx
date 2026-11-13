"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "./button";
import { cn } from "../utils";

export interface ThemeToggleProps {
  theme?: "dark" | "light" | "system";
  onThemeChange?: (newTheme: "dark" | "light") => void;
  className?: string;
}

export function ThemeToggle({
  theme,
  onThemeChange,
  className,
}: ThemeToggleProps) {
  const [mounted, setMounted] = React.useState(false);
  const [currentTheme, setCurrentTheme] = React.useState<"dark" | "light">("dark");

  React.useEffect(() => {
    setMounted(true);
    if (theme === "light" || theme === "dark") {
      setCurrentTheme(theme);
    } else {
      const root = document.documentElement;
      const isLight = root.classList.contains("light");
      setCurrentTheme(isLight ? "light" : "dark");
    }
  }, [theme]);

  const handleToggle = () => {
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    setCurrentTheme(nextTheme);

    const root = document.documentElement;
    if (nextTheme === "light") {
      root.classList.remove("dark");
      root.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      root.classList.remove("light");
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }

    onThemeChange?.(nextTheme);
  };

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn("h-10 w-10 rounded-xl border border-[var(--border)]", className)}
        aria-label="Toggle theme"
      >
        <Sun className="h-4 w-4 opacity-50" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className={cn(
        "h-10 w-10 rounded-xl border border-[var(--border)] bg-[var(--bg-elev-1)] hover:bg-[var(--bg-elev-2)] hover:border-[var(--accent)]/40 transition-colors text-[var(--text)]",
        className
      )}
      aria-label={`Switch to ${currentTheme === "dark" ? "light" : "dark"} theme`}
      title={`Switch to ${currentTheme === "dark" ? "light" : "dark"} theme`}
    >
      {currentTheme === "dark" ? (
        <Sun className="h-4 w-4 text-[var(--warn)] transition-transform duration-300 hover:rotate-45" />
      ) : (
        <Moon className="h-4 w-4 text-[var(--accent)] transition-transform duration-300 hover:-rotate-12" />
      )}
    </Button>
  );
}
