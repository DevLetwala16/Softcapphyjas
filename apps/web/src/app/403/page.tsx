"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { ShieldX, Home, LogIn, LayoutDashboard } from "lucide-react";

export default function ForbiddenPage() {
  const { data: session } = useSession();
  const roles = session?.user?.roles || [];

  const getWorkspaceHref = () => {
    if (!session) return "/login";
    const isStaff = roles.some((r) =>
      [
        "SUPER_ADMIN",
        "ADMIN",
        "HR_MANAGER",
        "HR_EXECUTIVE",
        "RESEARCHER",
        "INSTRUCTOR",
        "CONTENT_EDITOR",
        "ENGINEER",
        "SALES_MANAGER",
        "FINANCE",
        "EMPLOYEE",
      ].includes(r)
    );
    if (isStaff) return "/admin";
    if (roles.includes("STUDENT")) return "/student-dashboard";
    if (roles.includes("CLIENT")) return "/client-dashboard";
    return "/";
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-12 px-6 sm:px-10 bg-[var(--bg)] text-[var(--text)] selection:bg-[var(--accent)] selection:text-[#05070D]">
      <div className="w-full max-w-md text-center space-y-6 bg-[var(--bg-elev-1)] border border-[var(--border)] rounded-2xl p-8 sm:p-10 shadow-2xl relative">
        <div className="w-16 h-16 rounded-3xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto shadow-[0_0_32px_rgba(244,63,94,0.15)]">
          <ShieldX className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs font-semibold text-rose-400 tracking-widest uppercase">
            HTTP 403 · Access Restricted
          </span>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            You don&apos;t have access
          </h1>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            Your authenticated session lacks the required role permissions for this resource, or
            staff MFA verification has not been completed.
          </p>
        </div>

        {session?.user && (
          <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-left space-y-1 font-mono">
            <div className="text-[var(--text-muted)]">
              Signed in: <span className="text-white">{session.user.email}</span>
            </div>
            <div className="text-[var(--text-muted)]">
              Assigned roles:{" "}
              <span className="text-[var(--accent)]">{roles.join(", ") || "None"}</span>
            </div>
          </div>
        )}

        <div className="space-y-3 pt-2">
          <Link
            href={getWorkspaceHref()}
            className="w-full h-11 rounded-xl bg-[var(--accent)] text-[#05070D] font-medium text-xs flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-[var(--glow)]"
          >
            <LayoutDashboard className="w-4 h-4" />
            Go to My Assigned Workspace
          </Link>

          <div className="flex gap-2">
            <Link
              href="/"
              className="flex-1 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition"
            >
              <Home className="w-3.5 h-3.5" />
              Home
            </Link>

            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="flex-1 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition"
            >
              <LogIn className="w-3.5 h-3.5" />
              Switch Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
