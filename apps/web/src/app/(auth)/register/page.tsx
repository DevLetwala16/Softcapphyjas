"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Lock,
  Mail,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  Check,
  X,
  AlertCircle,
  GraduationCap,
  Building2,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"STUDENT" | "CLIENT">("STUDENT");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Password strength checks
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const passedCriteria = [hasMinLength, hasUppercase, hasNumber, hasSpecial].filter(Boolean).length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!agreeTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy to register.");
      return;
    }

    if (passedCriteria < 3) {
      setError("Please ensure your password meets the strength requirements.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to create account");
        setLoading(false);
        return;
      }

      // Automatically sign in upon registration
      const signinRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (signinRes?.error) {
        // Fallback to login page if immediate auto-signin has an edge condition
        router.push("/login?registered=true");
      } else {
        router.push(role === "CLIENT" ? "/client-dashboard" : "/student-dashboard");
        router.refresh();
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("Network error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-12 px-6 sm:px-10 bg-[var(--bg)] text-[var(--text)] selection:bg-[var(--accent)] selection:text-[#05070D]">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent)]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] p-[1px] shadow-[var(--glow)]">
              <div className="w-full h-full bg-[#05070D] rounded-xl flex items-center justify-center font-mono font-bold text-[var(--accent)] group-hover:scale-105 transition-transform">
                S
              </div>
            </div>
            <span className="font-mono font-bold text-lg tracking-wider text-white">
              SOFTCAPPHYJAS
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-white tracking-tight">Create your account</h1>
          <p className="text-xs text-[var(--text-muted)]">
            Join the frontier of AI research, learning, and enterprise collaboration
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 bg-[var(--bg-elev-1)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-xl"
        >
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/90">Full Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full h-11 pl-10 pr-4 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-sm text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all"
              />
            </div>
          </div>

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
                className="w-full h-11 pl-10 pr-4 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-sm text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all"
              />
            </div>
          </div>

          {/* Role Intent Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/90">
              I am joining primarily as a:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole("STUDENT")}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col gap-1 ${
                  role === "STUDENT"
                    ? "bg-[var(--accent)]/10 border-[var(--accent)] text-white shadow-[0_0_12px_rgba(34,211,238,0.15)]"
                    : "bg-[var(--bg)] border-[var(--border)] text-[var(--text-muted)] hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-1.5 font-medium text-xs text-white">
                  <GraduationCap className="w-4 h-4 text-[var(--accent)]" />
                  Student / Learner
                </div>
                <span className="text-[10px] text-[var(--text-muted)]">Academy & courses</span>
              </button>

              <button
                type="button"
                onClick={() => setRole("CLIENT")}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col gap-1 ${
                  role === "CLIENT"
                    ? "bg-[var(--accent-2)]/10 border-[var(--accent-2)] text-white shadow-[0_0_12px_rgba(139,92,246,0.15)]"
                    : "bg-[var(--bg)] border-[var(--border)] text-[var(--text-muted)] hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-1.5 font-medium text-xs text-white">
                  <Building2 className="w-4 h-4 text-[var(--accent-2)]" />
                  Enterprise Client
                </div>
                <span className="text-[10px] text-[var(--text-muted)]">Custom AI swarms</span>
              </button>
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/90">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full h-11 pl-10 pr-11 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-sm text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Password strength checklist */}
            {password.length > 0 && (
              <div className="pt-2 space-y-1.5">
                <div className="flex gap-1 h-1">
                  <div
                    className={`flex-1 rounded-full transition-colors ${
                      passedCriteria >= 1 ? "bg-red-500" : "bg-white/10"
                    } ${passedCriteria >= 2 ? "bg-amber-500" : ""} ${
                      passedCriteria >= 3 ? "bg-emerald-500" : ""
                    }`}
                  />
                  <div
                    className={`flex-1 rounded-full transition-colors ${
                      passedCriteria >= 2 ? "bg-amber-500" : "bg-white/10"
                    } ${passedCriteria >= 3 ? "bg-emerald-500" : ""}`}
                  />
                  <div
                    className={`flex-1 rounded-full transition-colors ${
                      passedCriteria >= 3 ? "bg-emerald-500" : "bg-white/10"
                    }`}
                  />
                  <div
                    className={`flex-1 rounded-full transition-colors ${
                      passedCriteria >= 4 ? "bg-cyan-400" : "bg-white/10"
                    }`}
                  />
                </div>
                <div className="grid grid-cols-2 gap-1 text-[11px] text-[var(--text-muted)]">
                  <span
                    className={`flex items-center gap-1 ${hasMinLength ? "text-emerald-400" : ""}`}
                  >
                    {hasMinLength ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />} 8+
                    characters
                  </span>
                  <span
                    className={`flex items-center gap-1 ${hasUppercase ? "text-emerald-400" : ""}`}
                  >
                    {hasUppercase ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}{" "}
                    Uppercase letter
                  </span>
                  <span
                    className={`flex items-center gap-1 ${hasNumber ? "text-emerald-400" : ""}`}
                  >
                    {hasNumber ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />} Number
                    (0-9)
                  </span>
                  <span
                    className={`flex items-center gap-1 ${hasSpecial ? "text-emerald-400" : ""}`}
                  >
                    {hasSpecial ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />} Special
                    character
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Terms checkbox */}
          <div className="flex items-start gap-2.5 pt-1">
            <input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-0.5 rounded border-[var(--border)] text-[var(--accent)] focus:ring-[var(--accent)]"
            />
            <label htmlFor="terms" className="text-xs text-[var(--text-muted)] leading-relaxed">
              I agree to the{" "}
              <Link href="/legal/terms" className="text-[var(--accent)] hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/legal/privacy" className="text-[var(--accent)] hover:underline">
                Privacy Policy
              </Link>
            </label>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl bg-[var(--accent)] text-[#05070D] font-medium text-sm flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-[var(--glow)] disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-[#05070D] border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Create Account
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center text-xs text-[var(--text-muted)]">
          Already have an account?{" "}
          <Link href="/login" className="text-[var(--accent)] font-medium hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
