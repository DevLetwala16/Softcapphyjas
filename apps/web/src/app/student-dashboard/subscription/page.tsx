import { auth, signOut } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { StudentPortalNav } from "@/components/student-portal-nav";
import {
  Sparkles,
  CreditCard,
  CheckCircle2,
  Calendar,
  Cpu,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

export default async function StudentSubscriptionPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?next=/student-dashboard/subscription");
  }

  const user = session.user;

  async function handleSignOut() {
    "use server";
    await signOut({ redirectTo: "/login" });
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] selection:bg-[var(--accent)] selection:text-[#05070D]">
      <StudentPortalNav user={user} signOutAction={handleSignOut} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[var(--border)] pb-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-[var(--accent)]" />
              Academic Membership &amp; Compute Quota
            </h1>
            <p className="text-xs text-[var(--text-muted)] font-mono">
              Manage your subscription tier, billing period, and allocated GPU clusters
            </p>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>Active Fellow Status</span>
          </div>
        </div>

        {/* Current Active Plan Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[var(--bg-elev-1)] to-[var(--bg-elev-2)] p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/30 font-mono text-xs font-bold uppercase tracking-wider">
                Annual Fellow Tier
              </span>
              <span className="text-xs font-mono text-emerald-400 font-semibold">
                Auto-Renew Enabled
              </span>
            </div>

            <div className="space-y-1.5">
              <h2 className="text-2xl font-bold text-white">Annual All-Access Fellow</h2>
              <p className="text-xs text-[var(--text-muted)]">
                Unlimited access to all foundational and frontier curricula, 1-on-1 research office hours, and private laboratory GPU clusters.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-y border-[var(--border)] py-4 text-xs font-mono">
              <div>
                <span className="text-[var(--text-muted)] block text-[11px]">Tuition Rate</span>
                <span className="text-base font-bold text-white">₹17,999 / year</span>
              </div>
              <div>
                <span className="text-[var(--text-muted)] block text-[11px]">Next Renewal</span>
                <span className="text-base font-bold text-white">October 15, 2027</span>
              </div>
              <div>
                <span className="text-[var(--text-muted)] block text-[11px]">Payment Method</span>
                <span className="text-base font-bold text-white">HDFC Card •••• 4022</span>
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="text-xs font-mono text-[var(--text-muted)] uppercase">
                Active Privileges Included:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/90">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>All 6 courses + upcoming releases</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>250 monthly GPU compute credits</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Permanent Ed25519 digital certificates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Monthly 1-on-1 research office hours</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={() => alert("Subscription cancellation dialog: Retain access through Oct 15, 2027.")}
                className="text-xs font-mono text-rose-400 hover:underline"
              >
                Cancel subscription at period end
              </button>

              <Link
                href="/academy/pricing"
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-colors"
              >
                Upgrade to Enterprise Cohort
              </Link>
            </div>
          </div>

          {/* GPU Compute Quota Card */}
          <div className="lg:col-span-4 rounded-3xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-6 space-y-6 shadow-xl">
            <div className="flex items-center gap-2 text-purple-400">
              <Cpu className="w-5 h-5" />
              <h3 className="text-base font-bold text-white">GPU Compute Credits</h3>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline justify-between font-mono text-xs">
                <span className="text-[var(--text-muted)]">Remaining Credits:</span>
                <span className="text-lg font-bold text-white">185 / 250</span>
              </div>
              <div className="w-full bg-black/40 h-2.5 rounded-full overflow-hidden border border-white/5">
                <div
                  className="bg-gradient-to-r from-purple-500 to-[var(--accent)] h-full rounded-full"
                  style={{ width: "74%" }}
                />
              </div>
              <p className="text-[11px] font-mono text-[var(--text-muted)]">
                Allocated across NVIDIA A100 &amp; H100 GPU pods. Renews on the 1st of each month.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
              <div className="font-bold text-white">Need more compute?</div>
              <p className="text-[11px] text-[var(--text-muted)]">
                Purchase top-up packs of 100 GPU credits for ₹1,499.
              </p>
              <button
                onClick={() => alert("Opening GPU credits top-up modal...")}
                className="w-full py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-black font-semibold text-xs transition-colors"
              >
                Add 100 GPU Credits
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
