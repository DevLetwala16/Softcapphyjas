"use client";

import React, { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Shield,
  Lock,
  Mail,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  Cpu,
  Atom,
  Dna,
  Binary,
} from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("next") || searchParams.get("callbackUrl") || "";

  const [activeTab, setActiveTab] = useState<"credentials" | "magic">("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [magicSent, setMagicSent] = useState(false);
  const [requiresTurnstile, setRequiresTurnstile] = useState(false);
  const [turnstilePassed, setTurnstilePassed] = useState(false);
  const [lockoutSec, setLockoutSec] = useState(0);

  // Quick fill helper for dev/reviewer testing
  const setQuickUser = (userEmail: string) => {
    setEmail(userEmail);
    setPassword("Password123!");
    setError(null);
  };

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (requiresTurnstile && !turnstilePassed) {
      setError("Please complete the Cloudflare Turnstile human verification challenge below.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        // Record failure and check if Turnstile or Lockout is required
        const guardRes = await fetch("/api/auth/login-guard", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "record_failure", email }),
        });
        const guardData = await guardRes.json();

        if (guardData.isBlocked) {
          setError(`Rate limit exceeded: 5 attempts/min. Locked for ${guardData.retryAfterSec}s.`);
          setLockoutSec(guardData.retryAfterSec);
        } else if (guardData.requiresTurnstile) {
          setRequiresTurnstile(true);
          setError("3 failed attempts detected. Complete the Turnstile challenge to proceed.");
        } else {
          setError("Invalid email or password. Please verify your credentials.");
        }
        setLoading(false);
        return;
      }

      // Record success
      await fetch("/api/auth/login-guard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "record_success", email }),
      });

      // Check session to determine destination
      const sessionRes = await fetch("/api/auth/session");
      const session = await sessionRes.json();
      const roles: string[] = session?.user?.roles || [];
      const mfaEnabled = session?.user?.mfaEnabled || false;
      const mfaPassed = session?.user?.mfaPassed || false;

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

      if (callbackUrl && !callbackUrl.includes("/login")) {
        router.push(callbackUrl);
      } else if (isStaff) {
        if (mfaEnabled && !mfaPassed) {
          router.push("/mfa");
        } else {
          router.push("/admin");
        }
      } else if (roles.includes("STUDENT")) {
        router.push("/student-dashboard");
      } else if (roles.includes("CLIENT")) {
        router.push("/client-dashboard");
      } else {
        router.push("/");
      }

      router.refresh();
    } catch (err) {
      console.error("Sign-in error:", err);
      setError("An unexpected network error occurred. Please try again.");
      setLoading(false);
    }
  };

  const handleOAuthSignIn = (provider: "google" | "github") => {
    setLoading(true);
    signIn(provider, { callbackUrl: callbackUrl || "/" });
  };

  const handleMagicLinkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to send magic link");
      } else {
        setMagicSent(true);
      }
    } catch {
      setError("Failed to dispatch magic link. Please check your network connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[var(--bg)] text-[var(--text)] selection:bg-[var(--accent)] selection:text-[#05070D]">
      {/* ── Left Animated Brand Panel (Board 18) ── */}
      <div className="relative flex-1 hidden lg:flex flex-col justify-between p-12 xl:p-16 border-r border-[var(--border)] overflow-hidden bg-gradient-to-br from-[#05070D] via-[#0A0E1A] to-[#0F1526]">
        {/* Glow ambient effects */}
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[var(--accent)] opacity-15 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[var(--accent-2)] opacity-20 blur-[140px] pointer-events-none" />

        {/* Top Header */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] p-[1px] shadow-[var(--glow)]">
              <div className="w-full h-full bg-[#05070D] rounded-xl flex items-center justify-center font-mono font-bold text-lg text-[var(--accent)] group-hover:scale-105 transition-transform">
                S
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-mono font-bold text-lg tracking-wider text-white">SOFTCAPPHYJAS</span>
              <span className="text-xs text-[var(--text-muted)] tracking-wider">FRONTIER AI & ENTERPRISE</span>
            </div>
          </Link>
        </div>

        {/* Center Brand Teaser */}
        <div className="relative z-10 max-w-lg my-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[var(--accent)]">
            <Sparkles className="w-3.5 h-3.5" />
            Unified SSO Gateway
          </div>

          <h1 className="text-4xl xl:text-5xl font-bold tracking-tight text-white leading-tight">
            Intelligence, engineered for the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] via-[#8B5CF6] to-[#34D399]">
              frontier.
            </span>
          </h1>

          <p className="text-[var(--text-muted)] text-base leading-relaxed">
            Access your unified workspace across frontier scientific domains, student learning tracks, and enterprise cognitive swarms.
          </p>

          {/* Domain Chips */}
          <div className="flex flex-wrap gap-2 pt-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F472B6]/10 border border-[#F472B6]/20 text-xs font-medium text-[#F472B6]">
              <Dna className="w-3.5 h-3.5" /> Medicine & Multi-Omics
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#34D399]/10 border border-[#34D399]/20 text-xs font-medium text-[#34D399]">
              <Cpu className="w-3.5 h-3.5" /> Precision Agri
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#22D3EE]/10 border border-[#22D3EE]/20 text-xs font-medium text-[#22D3EE]">
              <Atom className="w-3.5 h-3.5" /> Quantum Physics
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#A78BFA]/10 border border-[#A78BFA]/20 text-xs font-medium text-[#A78BFA]">
              <Binary className="w-3.5 h-3.5" /> Higher Mathematics
            </div>
          </div>
        </div>

        {/* Bottom Security Strip */}
        <div className="relative z-10 pt-8 border-t border-white/5 flex items-center justify-between text-xs text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[var(--accent)]" />
            <span>Argon2id · TOTP Staff MFA · Zero-Knowledge Role Isolation</span>
          </div>
          <span className="font-mono">v1.0 (Phase 2)</span>
        </div>
      </div>

      {/* ── Right Authentication Panel ── */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 sm:px-10 lg:px-16 xl:px-24">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Brand Link */}
          <div className="lg:hidden flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] p-[1px]">
              <div className="w-full h-full bg-[#05070D] rounded-xl flex items-center justify-center font-mono font-bold text-[var(--accent)]">
                S
              </div>
            </div>
            <span className="font-mono font-bold text-base text-white">SOFTCAPPHYJAS</span>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Sign In</h2>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              Choose your authentication method to access your workspace
            </p>
          </div>

          {/* Auth Method Tabs */}
          <div className="flex border-b border-[var(--border)]">
            <button
              type="button"
              onClick={() => {
                setActiveTab("credentials");
                setError(null);
              }}
              className={`pb-3 text-sm font-medium transition-colors relative flex-1 text-center ${
                activeTab === "credentials"
                  ? "text-white font-semibold"
                  : "text-[var(--text-muted)] hover:text-white"
              }`}
            >
              Email & Password
              {activeTab === "credentials" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]" />
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("magic");
                setError(null);
              }}
              className={`pb-3 text-sm font-medium transition-colors relative flex-1 text-center ${
                activeTab === "magic"
                  ? "text-white font-semibold"
                  : "text-[var(--text-muted)] hover:text-white"
              }`}
            >
              Magic Link
              {activeTab === "magic" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]" />
              )}
            </button>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {activeTab === "credentials" ? (
            <form onSubmit={handleCredentialsSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-white/90">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="w-full h-12 pl-10 pr-4 bg-[var(--bg-elev-1)] border border-[var(--border)] rounded-xl text-sm text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-white/90">Password</label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-[var(--accent)] hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full h-12 pl-10 pr-11 bg-[var(--bg-elev-1)] border border-[var(--border)] rounded-xl text-sm text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Cloudflare Turnstile Challenge after 3 failures (Board 18) */}
              {requiresTurnstile && (
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-[var(--accent)]/30 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-white flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-[var(--accent)]" />
                      Cloudflare Turnstile Verification
                    </span>
                    <span className="text-[10px] font-mono text-[var(--accent)]">REQUIRED</span>
                  </div>
                  <label className="flex items-center gap-2.5 p-2 rounded-lg bg-[var(--bg)] border border-[var(--border)] cursor-pointer hover:border-white/20 transition">
                    <input
                      type="checkbox"
                      checked={turnstilePassed}
                      onChange={(e) => setTurnstilePassed(e.target.checked)}
                      className="rounded border-[var(--border)] text-[var(--accent)] focus:ring-[var(--accent)]"
                    />
                    <span className="text-xs text-white/90">Verify human operator</span>
                  </label>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || lockoutSec > 0 || (requiresTurnstile && !turnstilePassed)}
                className="w-full h-12 rounded-xl bg-[var(--accent)] text-[#05070D] font-medium text-sm flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-[var(--glow)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-[#05070D] border-t-transparent rounded-full animate-spin" />
                ) : lockoutSec > 0 ? (
                  `Locked: Retry in ${lockoutSec}s`
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Magic Link Form */
            <div className="space-y-5">
              {magicSent ? (
                <div className="p-6 rounded-2xl bg-[var(--bg-elev-1)] border border-[var(--border)] text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-semibold text-white">Magic Link Dispatched</h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    If an account is associated with <span className="text-white font-mono">{email}</span>, a secure authentication link has been sent. Check your inbox and spam folder.
                  </p>
                  <button
                    type="button"
                    onClick={() => setMagicSent(false)}
                    className="text-xs text-[var(--accent)] hover:underline pt-2 inline-block"
                  >
                    Send to a different email
                  </button>
                </div>
              ) : (
                <form onSubmit={handleMagicLinkSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/90">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@domain.com"
                        className="w-full h-12 pl-10 pr-4 bg-[var(--bg-elev-1)] border border-[var(--border)] rounded-xl text-sm text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-[#05070D] font-medium text-sm flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-[var(--glow)] disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-[#05070D] border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Send Magic Link
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Social OAuth Providers */}
          <div className="space-y-4 pt-2">
            <div className="relative flex items-center justify-center">
              <div className="border-t border-[var(--border)] w-full" />
              <span className="bg-[var(--bg)] px-3 text-xs text-[var(--text-muted)] uppercase tracking-wider">
                Or continue with
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleOAuthSignIn("google")}
                className="h-11 px-4 rounded-xl bg-[var(--bg-elev-1)] border border-[var(--border)] hover:border-white/20 text-xs font-medium text-white flex items-center justify-center gap-2.5 transition-all hover:bg-white/5"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                Google
              </button>

              <button
                type="button"
                onClick={() => handleOAuthSignIn("github")}
                className="h-11 px-4 rounded-xl bg-[var(--bg-elev-1)] border border-[var(--border)] hover:border-white/20 text-xs font-medium text-white flex items-center justify-center gap-2.5 transition-all hover:bg-white/5"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </button>
            </div>
          </div>

          {/* Quick Demo Personas Accordion for Testing */}
          <div className="pt-4 border-t border-[var(--border)]">
            <details className="group rounded-xl bg-white/[0.02] border border-white/5 p-3 text-xs text-[var(--text-muted)]">
              <summary className="cursor-pointer font-medium text-white/80 flex items-center justify-between select-none">
                <span className="flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-[var(--accent)]" />
                  Quick Seed Test Personas
                </span>
                <span className="text-[10px] text-[var(--accent)] group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <div className="mt-3 space-y-2 pt-2 border-t border-white/5">
                <p className="text-[11px] text-[var(--text-muted)]">
                  Click to prefill demo accounts (password: <code className="text-white">Password123!</code>):
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setQuickUser("admin@softcapphyjas.com")}
                    className="p-2 rounded bg-white/5 hover:bg-white/10 text-left transition text-[11px]"
                  >
                    <span className="font-semibold text-white block">Super Admin</span>
                    <span className="text-[10px] text-[var(--text-muted)]">admin@softcapphyjas.com</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuickUser("instructor@softcapphyjas.com")}
                    className="p-2 rounded bg-white/5 hover:bg-white/10 text-left transition text-[11px]"
                  >
                    <span className="font-semibold text-white block">Lead Instructor</span>
                    <span className="text-[10px] text-[var(--text-muted)]">instructor@softcapphyjas.com</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuickUser("student@learner.org")}
                    className="p-2 rounded bg-white/5 hover:bg-white/10 text-left transition text-[11px]"
                  >
                    <span className="font-semibold text-white block">Student / Learner</span>
                    <span className="text-[10px] text-[var(--text-muted)]">student@learner.org</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuickUser("client@acmecorp.com")}
                    className="p-2 rounded bg-white/5 hover:bg-white/10 text-left transition text-[11px]"
                  >
                    <span className="font-semibold text-white block">Enterprise Client</span>
                    <span className="text-[10px] text-[var(--text-muted)]">client@acmecorp.com</span>
                  </button>
                </div>
              </div>
            </details>
          </div>

          {/* Registration Link */}
          <div className="text-center text-xs text-[var(--text-muted)]">
            Don&apos;t have an account yet?{" "}
            <Link href="/register" className="text-[var(--accent)] font-medium hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#05070D]" />}>
      <LoginForm />
    </Suspense>
  );
}
