"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  SiteNav,
  SiteFooter,
  Container,
} from "@softcapphyjas/ui";
import {
  ShieldCheck,
  Search,
  Award,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { SAMPLE_VERIFIED_CERTIFICATES } from "@/lib/academy-data";

export default function VerifyIndexPage() {
  const router = useRouter();
  const [certId, setCertId] = React.useState("");

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certId.trim()) return;
    router.push(`/academy/verify/${encodeURIComponent(certId.trim().toUpperCase())}`);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors flex flex-col justify-between selection:bg-[var(--accent)] selection:text-[#05070D]">
      <SiteNav />

      <main className="flex-1 py-16 sm:py-24">
        <Container size="standard">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-mono text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Public Verification Registry</span>
            </div>

            <div className="space-y-3">
              <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Verify Softcapphyjas Credential
              </h1>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                All certificates issued by Softcapphyjas Academy are sealed using an Ed25519 master private key. Enter the unique public credential ID below to inspect provenance and validity.
              </p>
            </div>

            <form onSubmit={handleVerify} className="flex gap-2 max-w-md mx-auto">
              <input
                type="text"
                value={certId}
                onChange={(e) => setCertId(e.target.value)}
                placeholder="Enter Certificate ID (e.g. SCP-CERT-2026-A91F2B)"
                className="flex-1 h-12 px-4 rounded-xl bg-[var(--bg-elev-1)] border border-[var(--border)] font-mono text-xs text-white placeholder-white/30 focus:outline-none focus:border-[var(--accent)] shadow-xl"
              />
              <button
                type="submit"
                className="px-6 h-12 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition-colors shrink-0 flex items-center gap-1.5"
              >
                <span>Verify</span>
                <ShieldCheck className="w-4 h-4" />
              </button>
            </form>

            <div className="pt-6 space-y-3 border-t border-[var(--border)] text-left">
              <div className="text-xs font-mono text-[var(--text-muted)] uppercase">
                Sample Verified Records:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SAMPLE_VERIFIED_CERTIFICATES.slice(0, 2).map((sample) => (
                  <Link
                    key={sample.publicId}
                    href={`/academy/verify/${sample.publicId}`}
                    className="p-3.5 rounded-xl bg-[var(--bg-elev-1)] border border-[var(--border)] hover:border-emerald-500/50 transition-colors block text-xs space-y-1"
                  >
                    <div className="font-mono text-emerald-400 font-bold flex items-center justify-between">
                      <span>{sample.publicId}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-white font-medium truncate">{sample.studentName}</div>
                    <div className="text-[11px] text-[var(--text-muted)] truncate">{sample.courseTitle}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </main>

      <SiteFooter />
    </div>
  );
}
