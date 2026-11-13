"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ArrowRight,
} from "lucide-react";

export default function SetupMfaPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [verificationCode, setVerificationCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [copiedSecret, setCopiedSecret] = useState(false);
  const [copiedCodes, setCopiedCodes] = useState(false);

  useEffect(() => {
    async function fetchSetup() {
      try {
        const res = await fetch("/api/auth/mfa/setup", { method: "POST" });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Failed to initiate MFA setup");
          setLoading(false);
          return;
        }
        setQrDataUrl(data.qrDataUrl);
        setSecret(data.secret);
        setBackupCodes(data.backupCodes || []);
        setLoading(false);
      } catch (err) {
        console.error("Setup MFA error:", err);
        setError("Network error while configuring MFA");
        setLoading(false);
      }
    }
    fetchSetup();
  }, []);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationCode || verificationCode.length < 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    setError(null);
    setVerifying(true);

    try {
      const res = await fetch("/api/auth/mfa/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: verificationCode, isEnrolling: true }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Invalid code. Please check your authenticator app.");
        setVerifying(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/admin");
        router.refresh();
      }, 1200);
    } catch (err) {
      console.error("MFA verify error:", err);
      setError("Verification failed due to a network error.");
      setVerifying(false);
    }
  };

  const copySecret = () => {
    if (secret) {
      navigator.clipboard.writeText(secret);
      setCopiedSecret(true);
      setTimeout(() => setCopiedSecret(false), 2000);
    }
  };

  const copyCodes = () => {
    if (backupCodes.length > 0) {
      navigator.clipboard.writeText(backupCodes.join("\n"));
      setCopiedCodes(true);
      setTimeout(() => setCopiedCodes(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-[var(--text-muted)] font-mono">Generating TOTP cryptographic key...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6 sm:px-10 bg-[var(--bg)] text-[var(--text)] selection:bg-[var(--accent)] selection:text-[#05070D]">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Link href="/admin" className="text-xs text-[var(--text-muted)] hover:text-white flex items-center gap-1.5">
            ← Back to Command Center
          </Link>
          <span className="text-xs font-mono text-[var(--accent)]">STAFF SECURITY ENROLLMENT</span>
        </div>

        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <ShieldCheck className="w-8 h-8 text-[var(--accent)]" />
            Set Up Two-Factor Authentication
          </h1>
          <p className="text-sm text-[var(--text-muted)]">
            Protect your staff account using time-based one-time passwords (TOTP) compliant with RFC 6238.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Success Alert */}
        {success && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>Two-factor authentication successfully enabled! Redirecting to Command Center...</span>
          </div>
        )}

        {/* Step 1: Scan QR Code */}
        <div className="bg-[var(--bg-elev-1)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2.5 text-sm font-semibold text-white">
            <span className="w-6 h-6 rounded-full bg-[var(--accent)] text-[#05070D] flex items-center justify-center text-xs font-bold">
              1
            </span>
            Scan with your Authenticator App
          </div>

          <p className="text-xs text-[var(--text-muted)]">
            Open Google Authenticator, 1Password, Authy, or Apple Keychain and scan the QR code below:
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
            {qrDataUrl && (
              <div className="p-3 bg-white rounded-2xl shadow-lg shrink-0">
                <Image
                  src={qrDataUrl}
                  alt="MFA QR Code"
                  width={180}
                  height={180}
                  className="rounded-lg"
                  unoptimized
                />
              </div>
            )}

            <div className="space-y-3 w-full">
              <span className="text-xs text-[var(--text-muted)] block">Or enter this secret key manually:</span>
              <div className="flex items-center gap-2 p-3 bg-[var(--bg)] border border-[var(--border)] rounded-xl font-mono text-sm text-[var(--accent)] break-all select-all">
                <KeyRound className="w-4 h-4 shrink-0 text-[var(--text-muted)]" />
                <span className="flex-1">{secret}</span>
                <button
                  type="button"
                  onClick={copySecret}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-[var(--text-muted)] hover:text-white transition-colors"
                  title="Copy secret"
                >
                  {copiedSecret ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Emergency Recovery Codes */}
        <div className="bg-[var(--bg-elev-1)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-sm font-semibold text-white">
              <span className="w-6 h-6 rounded-full bg-[var(--accent)] text-[#05070D] flex items-center justify-center text-xs font-bold">
                2
              </span>
              Save Backup Recovery Codes
            </div>
            <button
              type="button"
              onClick={copyCodes}
              className="text-xs text-[var(--accent)] hover:underline flex items-center gap-1.5"
            >
              {copiedCodes ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedCodes ? "Copied" : "Copy all codes"}
            </button>
          </div>

          <p className="text-xs text-[var(--text-muted)]">
            Store these emergency codes in a secure password manager. Each code can be used once if you lose device access:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-xs">
            {backupCodes.map((code, idx) => (
              <div key={idx} className="p-2.5 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-center text-white/90">
                {code}
              </div>
            ))}
          </div>
        </div>

        {/* Step 3: Verify and Activate */}
        <form onSubmit={handleVerify} className="bg-[var(--bg-elev-1)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-2.5 text-sm font-semibold text-white">
            <span className="w-6 h-6 rounded-full bg-[var(--accent)] text-[#05070D] flex items-center justify-center text-xs font-bold">
              3
            </span>
            Verify Code to Activate
          </div>

          <p className="text-xs text-[var(--text-muted)]">
            Enter the 6-digit code currently shown in your authenticator app to confirm setup:
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="123456"
              className="h-12 px-4 bg-[var(--bg)] border border-[var(--border)] rounded-xl font-mono text-lg tracking-widest text-white text-center sm:text-left focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] sm:w-48"
            />

            <button
              type="submit"
              disabled={verifying || verificationCode.length < 6 || success}
              className="h-12 px-6 rounded-xl bg-[var(--accent)] text-[#05070D] font-medium text-sm flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-[var(--glow)] disabled:opacity-50"
            >
              {verifying ? (
                <div className="w-5 h-5 border-2 border-[#05070D] border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Verify & Activate MFA
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
