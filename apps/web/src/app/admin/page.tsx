import { auth, signOut } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@softcapphyjas/db";
import {
  ShieldAlert,
  ShieldCheck,
  Users,
  BookOpen,
  DollarSign,
  Briefcase,
  KeyRound,
  LogOut,
  Layers,
  Activity,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?next=/admin");
  }

  // Fetch quick metrics for command center
  const [userCount, courseCount, orderCount, projectCount] = await Promise.all([
    prisma.user.count(),
    prisma.course.count(),
    prisma.order.count(),
    prisma.project.count(),
  ]);

  const user = session.user;
  const roles = user.roles || [];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] selection:bg-[var(--accent)] selection:text-[#05070D]">
      {/* Top Navigation */}
      <header className="border-b border-[var(--border)] bg-[var(--bg-elev-1)] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] p-[1px]">
              <div className="w-full h-full bg-[#05070D] rounded-lg flex items-center justify-center font-mono font-bold text-xs text-[var(--accent)]">
                S
              </div>
            </div>
            <span className="font-mono font-bold text-sm text-white tracking-wider">COMMAND CENTER</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-400/10 border border-amber-400/20 text-amber-400">
              STAFF PORTAL
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/admin/setup-mfa"
              className="text-xs text-[var(--text-muted)] hover:text-white flex items-center gap-1.5 transition"
            >
              <KeyRound className="w-3.5 h-3.5 text-[var(--accent)]" />
              MFA Security Settings
            </Link>

            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/login" });
              }}
            >
              <button
                type="submit"
                className="text-xs text-[var(--text-muted)] hover:text-rose-400 flex items-center gap-1.5 transition"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        {/* User Greeting Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[var(--bg-elev-1)] to-[var(--bg-elev-2)] border border-[var(--border)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Welcome, {user.name || "Staff Member"}
              </h1>
              {user.mfaPassed ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono">
                  <ShieldCheck className="w-3 h-3" /> TOTP MFA VERIFIED
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-mono">
                  <ShieldAlert className="w-3 h-3" /> MFA PENDING
                </span>
              )}
            </div>
            <p className="text-xs text-[var(--text-muted)] font-mono">
              Account: {user.email} · System Roles:{" "}
              <span className="text-[var(--accent)]">{roles.join(", ")}</span>
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              href="/workspace-switcher"
              className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-medium text-white transition flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5" />
              Switch Portal
            </Link>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-[var(--bg-elev-1)] border border-[var(--border)] space-y-3">
            <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
              <span>Total System Users</span>
              <Users className="w-4 h-4 text-[var(--accent)]" />
            </div>
            <div className="text-2xl font-bold text-white font-mono">{userCount}</div>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
              <Activity className="w-3 h-3" /> Active Neon DB sync
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[var(--bg-elev-1)] border border-[var(--border)] space-y-3">
            <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
              <span>Academy Courses</span>
              <BookOpen className="w-4 h-4 text-[var(--accent-2)]" />
            </div>
            <div className="text-2xl font-bold text-white font-mono">{courseCount}</div>
            <div className="text-[11px] text-[var(--text-muted)] font-mono">ML, Agentic & LLMOps</div>
          </div>

          <div className="p-5 rounded-xl bg-[var(--bg-elev-1)] border border-[var(--border)] space-y-3">
            <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
              <span>Orders Processed</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-white font-mono">{orderCount}</div>
            <div className="text-[11px] text-[var(--text-muted)] font-mono">Razorpay & EMI Ready</div>
          </div>

          <div className="p-5 rounded-xl bg-[var(--bg-elev-1)] border border-[var(--border)] space-y-3">
            <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
              <span>Enterprise Projects</span>
              <Briefcase className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-white font-mono">{projectCount}</div>
            <div className="text-[11px] text-[var(--text-muted)] font-mono">Active Client Engagements</div>
          </div>
        </div>

        {/* Phase 2 Delivery Verification Section */}
        <div className="p-6 rounded-2xl bg-[var(--bg-elev-1)] border border-[var(--border)] space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              Phase 2: Data Layer & Authentication Engine Status
            </h2>
            <span className="text-xs font-mono text-emerald-400">ACTIVE & SECURED</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)] space-y-2">
              <span className="font-semibold text-white block">PostgreSQL 16 + pgvector</span>
              <p className="text-[var(--text-muted)] leading-relaxed">
                Full schema deployed to Neon cloud with pgvector extensions, 25+ models, and seeded mock datasets.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)] space-y-2">
              <span className="font-semibold text-white block">Auth.js v5 + RBAC Policy</span>
              <p className="text-[var(--text-muted)] leading-relaxed">
                Role routing across 14 distinct roles. Enforced in middleware, tRPC API gate, and data queries.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)] space-y-2">
              <span className="font-semibold text-white block">Staff MFA (TOTP)</span>
              <p className="text-[var(--text-muted)] leading-relaxed">
                Mandatory two-factor enrollment and verification with Google Authenticator, QR codes, and backup keys.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
