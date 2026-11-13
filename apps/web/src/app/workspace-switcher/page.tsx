"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { GraduationCap, Building2, Shield, ArrowRight, UserCheck } from "lucide-react";

export default function WorkspaceSwitcherPage() {
  const { data: session } = useSession();
  const roles = session?.user?.roles || [];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-12 px-6 sm:px-10 bg-[var(--bg)] text-[var(--text)] selection:bg-[var(--accent)] selection:text-[#05070D]">
      <div className="w-full max-w-xl space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[var(--accent)]">
            <UserCheck className="w-3.5 h-3.5" />
            Multi-Role Account Detected
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Choose your Workspace</h1>
          <p className="text-xs text-[var(--text-muted)] font-mono">
            {roles.length > 0 ? `Active roles: ${roles.join(", ")} · ` : ""}Select interface to access
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Student Dashboard Card */}
          <Link
            href="/student-dashboard"
            className="group p-6 rounded-2xl bg-[var(--bg-elev-1)] border border-[var(--border)] hover:border-[var(--accent)] transition-all flex flex-col justify-between space-y-4 hover:shadow-[var(--glow)]"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-white text-base">Student Portal</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Courses, lesson progress, interactive quizzes, and certificates.
              </p>
            </div>
            <div className="text-xs font-medium text-[var(--accent)] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Launch Portal <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Client Dashboard Card */}
          <Link
            href="/client-dashboard"
            className="group p-6 rounded-2xl bg-[var(--bg-elev-1)] border border-[var(--border)] hover:border-[var(--accent-2)] transition-all flex flex-col justify-between space-y-4 hover:shadow-[var(--glow-violet)]"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-2)]/10 text-[var(--accent-2)] flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-white text-base">Client Portal</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Enterprise deliverables, milestone trackers, billing, and meetings.
              </p>
            </div>
            <div className="text-xs font-medium text-[var(--accent-2)] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Launch Portal <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Admin / Staff Command Center */}
          <Link
            href="/admin"
            className="group p-6 rounded-2xl bg-[var(--bg-elev-1)] border border-[var(--border)] hover:border-amber-400/50 transition-all flex flex-col justify-between space-y-4 hover:shadow-[0_0_24px_rgba(251,191,36,0.15)]"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-white text-base">Staff Admin</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Command center, LMS builder, CRM pipelines, HR, and audit logs.
              </p>
            </div>
            <div className="text-xs font-medium text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Launch Portal <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
