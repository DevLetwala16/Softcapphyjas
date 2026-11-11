"use client";

import * as React from "react";
import { Home, GraduationCap, Award, ReceiptText, User } from "lucide-react";
import { cn } from "../utils";

export interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  badge?: string | number;
}

export interface BottomTabBarProps {
  activeTab?: string;
  onTabSelect?: (id: string) => void;
  items?: TabItem[];
  className?: string;
}

export function BottomTabBar({
  activeTab = "home",
  onTabSelect,
  items,
  className,
}: BottomTabBarProps) {
  const defaultItems: TabItem[] = [
    { id: "home", label: "Home", icon: <Home className="h-5 w-5" /> },
    { id: "learn", label: "Learn", icon: <GraduationCap className="h-5 w-5" /> },
    { id: "certs", label: "Certs", icon: <Award className="h-5 w-5" /> },
    { id: "orders", label: "Orders", icon: <ReceiptText className="h-5 w-5" /> },
    { id: "me", label: "Me", icon: <User className="h-5 w-5" /> },
  ];

  const tabs = items || defaultItems;

  return (
    <nav
      aria-label="Mobile bottom navigation"
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 md:hidden border-t border-[var(--border)]",
        "bg-[var(--bg-elev-1)]/95 backdrop-blur-xl px-2 py-1.5 safe-area-pb shadow-lg",
        className
      )}
    >
      <div className="flex items-center justify-around h-14">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabSelect?.(tab.id)}
              className={cn(
                "relative flex flex-col items-center justify-center flex-1 h-full py-1 text-xs transition-colors rounded-xl",
                isActive
                  ? "text-[var(--accent)] font-semibold"
                  : "text-[var(--text-muted)] hover:text-[var(--text)]"
              )}
            >
              <div className="relative">
                {tab.icon}
                {tab.badge && (
                  <span className="absolute -top-1 -right-2 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-[var(--danger)] px-1 text-[10px] font-bold text-white font-mono-data">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="mt-1 text-[11px] tracking-tight">{tab.label}</span>
              {isActive && (
                <span className="absolute bottom-0 h-0.5 w-6 rounded-full bg-[var(--accent)]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
