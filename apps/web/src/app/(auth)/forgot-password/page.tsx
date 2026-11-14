"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowRight, CheckCircle2, KeyRound } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    // Simulate dispatch with generic message to prevent account enumeration (Board 18)
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-12 px-6 sm:px-10 bg-[var(--bg)] text-[var(--text)] selection:bg-[var(--accent)] selection:text-[#05070D]">
      <div className="w-full max-w-md space-y-8 bg-[var(--bg-elev-1)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-2xl relative">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center mx-auto shadow-[var(--glow)]">
            <KeyRound className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Reset your password</h1>
          <p className="text-xs text-[var(--text-muted)]">
            Enter your account email to receive a single-use password reset link.
          </p>
        </div>

        {submitted ? (
          <div className="space-y-4 text-center">
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span className="text-left">
                If an account exists for <strong className="text-white font-mono">{email}</strong>,
                a password reset link has been dispatched with a 30-minute validity window.
              </span>
            </div>

            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              For security, reset tokens are single-use. If you don&apos;t see the email, verify
              your spam folder.
            </p>

            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-xs text-[var(--accent)] font-medium hover:underline pt-2"
            >
              ← Back to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl bg-[var(--accent)] text-[#05070D] font-medium text-sm flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-[var(--glow)] disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-[#05070D] border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Send Reset Link
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="text-center pt-2">
              <Link href="/login" className="text-xs text-[var(--text-muted)] hover:text-white">
                ← Back to Sign In
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
