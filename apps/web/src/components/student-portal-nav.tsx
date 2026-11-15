"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GraduationCap,
  BookOpen,
  Award,
  CreditCard,
  Receipt,
  User,
  LogOut,
  Layers,
  Sparkles,
} from "lucide-react";

interface StudentPortalNavProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  signOutAction: () => Promise<void>;
}

export function StudentPortalNav({ user, signOutAction }: StudentPortalNavProps) {
  const pathname = usePathname();

  const navItems = [
    { label: "My Learning", href: "/student-dashboard", icon: BookOpen },
    { label: "Certificates", href: "/student-dashboard/certificates", icon: Award },
    { label: "Orders & Invoices", href: "/student-dashboard/orders", icon: Receipt },
    { label: "EMI Schedule", href: "/student-dashboard/emi", icon: CreditCard },
    { label: "Subscription", href: "/student-dashboard/subscription", icon: Sparkles },
    { label: "Profile", href: "/student-dashboard/profile", icon: User },
  ];

  return (
    <header className="border-b border-[var(--border)] bg-[var(--bg-elev-1)] sticky top-0 z-40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between">
          {/* Logo & Portal Badge */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] p-[1px]">
                <div className="w-full h-full bg-[#05070D] rounded-lg flex items-center justify-center font-mono font-bold text-xs text-[var(--accent)]">
                  S
                </div>
              </div>
              <span className="font-mono font-bold text-sm text-white tracking-wider hidden sm:inline">
                SOFTCAPPHYJAS
              </span>
            </Link>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)]">
              STUDENT LMS
            </span>
          </div>

          {/* User Controls */}
          <div className="flex items-center gap-4">
            <Link
              href="/academy"
              className="text-xs font-mono text-[var(--accent)] hover:underline hidden sm:inline flex items-center gap-1"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Browse Catalog</span>
            </Link>

            <Link
              href="/workspace-switcher"
              className="text-xs text-[var(--text-muted)] hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Portals</span>
            </Link>

            <div className="h-4 w-[1px] bg-white/10" />

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[var(--accent)]/20 border border-[var(--accent)]/40 flex items-center justify-center font-mono text-xs text-[var(--accent)] font-bold">
                {user.name ? user.name[0]?.toUpperCase() : "S"}
              </div>
              <span className="text-xs font-mono text-white/90 hidden md:inline truncate max-w-[120px]">
                {user.name || "Scholar"}
              </span>
            </div>

            <form action={signOutAction}>
              <button
                type="submit"
                className="text-xs text-[var(--text-muted)] hover:text-rose-400 flex items-center gap-1 transition-colors"
                title="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Navigation Tabs (Board 19 & 34) */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar border-t border-[var(--border)] pt-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/student-dashboard"
                ? pathname === "/student-dashboard"
                : pathname?.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 text-xs font-mono border-b-2 transition-all whitespace-nowrap ${
                  isActive
                    ? "border-[var(--accent)] text-[var(--accent)] font-bold bg-[var(--accent)]/5"
                    : "border-transparent text-[var(--text-muted)] hover:text-white hover:border-white/20"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
