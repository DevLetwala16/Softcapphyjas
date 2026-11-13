"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ShieldAlert, ArrowRight, Key, AlertCircle, CheckCircle2 } from "lucide-react";

function MfaVerificationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("next") || "/admin";
  const { data: session, update } = useSession();

  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [useBackup, setUseBackup] = useState(false);
  const [backupCode, setBackupCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleDigitChange = (index: number, val: string) => {
    // Handle paste of whole 6-digit code
    if (val.length > 1) {
      const clean = val.replace(/\D/g, "").slice(0, 6);
      if (clean.length === 6) {
        const newDigits = clean.split("");
        setDigits(newDigits);
        submitCode(clean);
        return;
      }
    }

    const singleDigit = val.slice(-1).replace(/\D/g, "");
    const newDigits = [...digits];
    newDigits[index] = singleDigit;
    setDigits(newDigits);

    // Auto-advance to next input
    if (singleDigit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit if all 6 digits are entered
    if (singleDigit && index === 5 && newDigits.every((d) => d !== "")) {
      submitCode(newDigits.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const submitCode = async (token: string) => {
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/mfa/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Verification failed");
        setLoading(false);
        return;
      }

      setSuccess(true);
      // Update client session token with mfaPassed = true
      await update({ mfaPassed: true });

      setTimeout(() => {
        router.push(callbackUrl);
        router.refresh();
      }, 500);
    } catch (err) {
      console.error("MFA verification error:", err);
      setError("An unexpected network error occurred.");
      setLoading(false);
    }
  };

  const handleBackupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!backupCode.trim()) {
      setError("Please enter a recovery code");
      return;
    }
    submitCode(backupCode.trim());
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-12 px-6 sm:px-10 bg-[var(--bg)] text-[var(--text)] selection:bg-[var(--accent)] selection:text-[#05070D]">
      <div className="w-full max-w-md space-y-8 bg-[var(--bg-elev-1)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-2xl relative">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-[var(--accent)] shadow-[0_0_24px_var(--accent)]" />

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center mx-auto shadow-[var(--glow)]">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="inline-block px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-[var(--accent)] uppercase tracking-wider">
            Staff Security Gate
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Two-Factor Authentication</h1>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            Staff access requires mandatory time-based one-time password (TOTP) verification.
          </p>
        </div>

        {/* User context */}
        {session?.user?.email && (
          <div className="p-2.5 rounded-lg bg-white/5 text-center text-xs text-[var(--text-muted)] font-mono">
            Signed in as <span className="text-white">{session.user.email}</span>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Success Alert */}
        {success && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>MFA verified successfully. Redirecting to workspace...</span>
          </div>
        )}

        {!useBackup ? (
          /* Segmented 6-digit TOTP Input */
          <div className="space-y-6">
            <div className="flex justify-center gap-2 sm:gap-3">
              {digits.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    inputRefs.current[idx] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleDigitChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  disabled={loading || success}
                  className="w-11 h-14 sm:w-12 sm:h-14 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-center text-xl font-mono font-bold text-white focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all disabled:opacity-50"
                />
              ))}
            </div>

            <button
              type="button"
              disabled={loading || success || digits.some((d) => d === "")}
              onClick={() => submitCode(digits.join(""))}
              className="w-full h-11 rounded-xl bg-[var(--accent)] text-[#05070D] font-medium text-sm flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-[var(--glow)] disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-[#05070D] border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Verify TOTP Code
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setUseBackup(true)}
                className="text-xs text-[var(--accent)] hover:underline inline-flex items-center gap-1.5"
              >
                <Key className="w-3.5 h-3.5" />
                Use recovery backup code instead
              </button>
            </div>
          </div>
        ) : (
          /* Backup Code Input */
          <form onSubmit={handleBackupSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-white/90">8-Character Recovery Code</label>
              <input
                type="text"
                value={backupCode}
                onChange={(e) => setBackupCode(e.target.value)}
                placeholder="xxxx-xxxx"
                className="w-full h-11 px-4 bg-[var(--bg)] border border-[var(--border)] rounded-xl font-mono text-sm text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
              />
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className="w-full h-11 rounded-xl bg-[var(--accent)] text-[#05070D] font-medium text-sm flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-[var(--glow)] disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-[#05070D] border-t-transparent rounded-full animate-spin" />
              ) : (
                "Verify Recovery Code"
              )}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setUseBackup(false)}
                className="text-xs text-[var(--text-muted)] hover:text-white underline"
              >
                Back to 6-digit authenticator code
              </button>
            </div>
          </form>
        )}

        <div className="text-center pt-4 border-t border-white/5">
          <Link href="/login" className="text-xs text-[var(--text-muted)] hover:text-white">
            ← Switch account or sign in again
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function MfaPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#05070D]" />}>
      <MfaVerificationContent />
    </Suspense>
  );
}
