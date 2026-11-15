import { auth, signOut } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { StudentPortalNav } from "@/components/student-portal-nav";
import {
  User,
  Mail,
  Shield,
  Key,
  Globe,
  Github,
  Linkedin,
  CheckCircle2,
} from "lucide-react";

export default async function StudentProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?next=/student-dashboard/profile");
  }

  const user = session.user;

  async function handleSignOut() {
    "use server";
    await signOut({ redirectTo: "/login" });
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] selection:bg-[var(--accent)] selection:text-[#05070D]">
      <StudentPortalNav user={user} signOutAction={handleSignOut} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[var(--border)] pb-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <User className="w-6 h-6 text-[var(--accent)]" />
              Scholar Profile &amp; Preferences
            </h1>
            <p className="text-xs text-[var(--text-muted)] font-mono">
              Academic credentials, public portfolio links, and account security
            </p>
          </div>
        </div>

        {/* Profile Card Form */}
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-6 sm:p-8 space-y-8 shadow-xl">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[var(--accent)]/20 border border-[var(--accent)]/40 flex items-center justify-center font-mono text-2xl font-bold text-[var(--accent)]">
              {user.name ? user.name[0]?.toUpperCase() : "S"}
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-white">{user.name || "Alex Mercer"}</h2>
              <p className="text-xs font-mono text-[var(--text-muted)]">{user.email}</p>
              <div className="flex items-center gap-2 pt-0.5">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                  STUDENT FELLOW
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-[var(--text-muted)]">
                  Cohort 2026
                </span>
              </div>
            </div>
          </div>

          <form className="space-y-6 pt-4 border-t border-[var(--border)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[var(--text-muted)]">Full Name</label>
                <input
                  type="text"
                  defaultValue={user.name || "Alex Mercer"}
                  className="w-full h-11 px-3.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-[var(--accent)]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[var(--text-muted)]">Email Address</label>
                <input
                  type="email"
                  disabled
                  defaultValue={user.email || "student@learner.org"}
                  className="w-full h-11 px-3.5 rounded-xl bg-black/20 border border-white/5 text-xs text-white/50 cursor-not-allowed font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[var(--text-muted)]">GitHub Username</label>
                <div className="relative flex items-center">
                  <Github className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5" />
                  <input
                    type="text"
                    defaultValue="alex-mercer-ai"
                    className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[var(--text-muted)]">LinkedIn Profile</label>
                <div className="relative flex items-center">
                  <Linkedin className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5" />
                  <input
                    type="text"
                    defaultValue="linkedin.com/in/alex-mercer"
                    className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[var(--text-muted)]">Research Bio / Interests</label>
              <textarea
                rows={3}
                defaultValue="Researching autonomous tool-use swarms, neuro-symbolic reasoning, and formal verification in safety-critical systems."
                className="w-full p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-[var(--accent)] leading-relaxed"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                className="px-6 py-2.5 rounded-xl bg-[var(--accent)] text-black font-semibold text-xs transition-opacity hover:opacity-90"
              >
                Save Profile Changes
              </button>
            </div>
          </form>

          {/* Security & Authentication shortcuts */}
          <div className="pt-6 border-t border-[var(--border)] space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-purple-400" />
              Security &amp; MFA
            </h3>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-white">Two-Factor Authentication (TOTP)</div>
                <div className="text-[11px] text-[var(--text-muted)]">
                  Secure your account and verified credentials with authenticator apps.
                </div>
              </div>
              <Link
                href="/admin/setup-mfa"
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-colors shrink-0"
              >
                Configure TOTP MFA
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
