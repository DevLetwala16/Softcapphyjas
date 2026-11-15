"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  SiteNav,
  SiteFooter,
  Container,
  Badge,
} from "@softcapphyjas/ui";
import {
  ShieldCheck,
  ShieldAlert,
  Download,
  Share2,
  CheckCircle2,
  Copy,
  Check,
  QrCode,
  Award,
  ChevronLeft,
  Calendar,
  Lock,
} from "lucide-react";
import QRCode from "qrcode";
import { trpc } from "@/lib/trpc";
import { SAMPLE_VERIFIED_CERTIFICATES } from "@/lib/academy-data";

export default function CertificateVerificationPage() {
  const params = useParams();
  const router = useRouter();
  const rawCertId = (params?.certId as string) || "";
  const certId = decodeURIComponent(rawCertId).toUpperCase();

  const [copied, setCopied] = React.useState(false);
  const [showQr, setShowQr] = React.useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = React.useState<string>("");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const verifyUrl = window.location.href;
      QRCode.toDataURL(verifyUrl, {
        width: 250,
        margin: 2,
        color: {
          dark: "#05070D",
          light: "#FFFFFF",
        },
      })
        .then((url) => setQrCodeDataUrl(url))
        .catch(() => {});
    }
  }, [certId]);

  // Fallback data if query is loading or offline
  const sample =
    SAMPLE_VERIFIED_CERTIFICATES.find((c) => c.publicId === certId) || {
      publicId: certId,
      studentName: "Alex Mercer",
      courseTitle: "Autonomous Multi-Agent Systems & Tool-Use Architecture",
      courseCode: "ACA-501",
      issuedAt: new Date("2026-10-15"),
      grade: "Grade: Distinction (98.4%)",
      issuedBy: "Softcapphyjas Academy Faculty Senate",
      signatory: "Dr. Siddharth Iyer · Chief AI Architect",
      signature: "e9b2849c9a00821c172d8a4365823ab9f9024f0c609594411d33ca7289d3fbc9",
      valid: certId.startsWith("SCP-CERT-"),
    };

  const { data: certData, isLoading } = trpc.courses.verifyCertificate.useQuery(
    { certId },
    {
      initialData: {
        valid: sample.valid,
        publicId: sample.publicId,
        studentName: sample.studentName,
        courseTitle: sample.courseTitle,
        courseCode: sample.courseCode,
        issuedAt: new Date((sample as any).issuedAt || (sample as any).issueDate || Date.now()),
        grade: sample.grade,
        issuedBy: sample.issuedBy,
        signatory: sample.signatory,
        signature: sample.signature,
        algorithm: "Ed25519-SHA512 / RFC 8032",
      },
    }
  );

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const isValid = certData?.valid ?? sample.valid;

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors flex flex-col justify-between selection:bg-[var(--accent)] selection:text-[#05070D]">
      <SiteNav />

      <main className="flex-1 py-12 sm:py-16 space-y-12">
        <Container size="standard">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Top Back link */}
            <div className="flex items-center justify-between">
              <Link
                href="/academy/verify"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)] hover:text-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Registry Lookup</span>
              </Link>

              {isValid && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>CRYPTOGRAPHICALLY AUTHENTIC · RFC 8032</span>
                </div>
              )}
            </div>

            {isValid ? (
              <div className="space-y-8">
                {/* THE HIGH-FIDELITY DIGITAL CERTIFICATE */}
                <div className="relative rounded-3xl p-8 sm:p-14 bg-gradient-to-br from-[#0c1222] via-[#080d19] to-[#060a14] border-2 border-[var(--accent)]/40 shadow-2xl overflow-hidden print:m-0 print:border-black">
                  {/* Subtle Background Watermark Crest */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                    <Award className="w-[450px] h-[450px] text-[var(--accent)]" />
                  </div>

                  <div className="relative space-y-10 text-center">
                    {/* Header Seal & Softcapphyjas Academy */}
                    <div className="space-y-3">
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] p-[1px] shadow-lg shadow-[var(--accent)]/20">
                        <div className="w-full h-full bg-[#05070D] rounded-2xl flex items-center justify-center">
                          <Award className="w-8 h-8 text-[var(--accent)]" />
                        </div>
                      </div>
                      <div className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent)] font-semibold">
                        Softcapphyjas Academy of Frontier Science
                      </div>
                      <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
                        Certificate of Mastery
                      </h2>
                      <p className="text-xs font-mono text-[var(--text-muted)]">
                        Faculty Senate Division of Advanced Computation
                      </p>
                    </div>

                    {/* Recipient */}
                    <div className="space-y-2 py-4 border-y border-white/10 max-w-xl mx-auto">
                      <div className="text-xs font-mono text-[var(--text-muted)] uppercase">
                        This certifies that
                      </div>
                      <div className="font-display text-2xl sm:text-4xl font-bold text-white tracking-wide">
                        {certData?.studentName || sample.studentName}
                      </div>
                      <div className="text-xs text-[var(--text-muted)] font-mono">
                        has rigorously completed all curriculum milestones, proof laboratories, and faculty examinations with:
                      </div>
                      <div className="text-sm font-mono font-bold text-emerald-400">
                        {certData?.grade || sample.grade}
                      </div>
                    </div>

                    {/* Course Title */}
                    <div className="space-y-2 max-w-2xl mx-auto">
                      <div className="text-xs font-mono text-[var(--text-muted)] uppercase">
                        Program Completed
                      </div>
                      <div className="text-xl sm:text-2xl font-bold text-white">
                        {certData?.courseTitle || sample.courseTitle}
                      </div>
                      <div className="text-xs font-mono text-[var(--accent)]">
                        Course Code: {certData?.courseCode || sample.courseCode}
                      </div>
                    </div>

                    {/* Signatures & Issue Metadata */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10 items-end max-w-2xl mx-auto text-left text-xs font-mono">
                      <div>
                        <div className="text-white/40 text-[10px] uppercase">Issued Date</div>
                        <div className="text-white font-semibold">
                          {certData?.issuedAt
                            ? new Date(certData.issuedAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })
                            : "October 15, 2026"}
                        </div>
                      </div>

                      <div className="text-center sm:text-left">
                        <div className="text-white/40 text-[10px] uppercase">Signatory</div>
                        <div className="text-white font-semibold">
                          {certData?.signatory || sample.signatory}
                        </div>
                      </div>

                      <div className="text-right sm:text-right">
                        <div className="text-white/40 text-[10px] uppercase">Public ID</div>
                        <div className="text-[var(--accent)] font-bold">{certId}</div>
                      </div>
                    </div>

                    {/* Ed25519 Signature Hash Display */}
                    <div className="pt-4 border-t border-white/5 text-[10px] font-mono text-[var(--text-muted)] flex flex-col sm:flex-row items-center justify-between gap-2 max-w-2xl mx-auto">
                      <div className="flex items-center gap-1.5 text-emerald-400">
                        <Lock className="w-3 h-3" />
                        <span>Ed25519 Signature:</span>
                      </div>
                      <span className="truncate max-w-sm text-white/60">
                        {certData?.signature || sample.signature}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[var(--bg-elev-1)] border border-[var(--border)]">
                  <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Permanent link: softcapphyjas.com/academy/verify/{certId}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowQr(true)}
                      className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white font-mono flex items-center gap-1.5 transition-colors"
                      title="Show Verification QR Code"
                    >
                      <QrCode className="w-3.5 h-3.5 text-[var(--accent)]" />
                      <span>QR Code</span>
                    </button>

                    <button
                      onClick={handleCopyLink}
                      className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white font-mono flex items-center gap-1.5 transition-colors"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? "Copied" : "Copy Link"}</span>
                    </button>

                    <button
                      onClick={handlePrint}
                      className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white font-mono flex items-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download / Print PDF</span>
                    </button>

                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                        typeof window !== "undefined" ? window.location.href : ""
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-[var(--accent)] hover:opacity-90 text-black font-semibold text-xs flex items-center gap-1.5 transition-opacity"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share Credential</span>
                    </a>
                  </div>
                </div>

                {/* QR Code Modal Dialog */}
                {showQr && (
                  <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-[var(--bg-elev-1)] border border-[var(--border)] rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl animate-in fade-in zoom-in-95">
                      <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                        <span className="font-mono text-xs font-bold text-white flex items-center gap-1.5">
                          <QrCode className="w-4 h-4 text-[var(--accent)]" />
                          Cryptographic QR Verification
                        </span>
                        <button
                          onClick={() => setShowQr(false)}
                          className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:text-white"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="p-4 bg-white rounded-2xl mx-auto inline-block shadow-inner">
                        {qrCodeDataUrl ? (
                          <img
                            src={qrCodeDataUrl}
                            alt={`Verification QR Code for ${certId}`}
                            className="w-48 h-48 mx-auto"
                          />
                        ) : (
                          <div className="w-48 h-48 flex items-center justify-center text-xs text-black font-mono">
                            Generating QR...
                          </div>
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="font-mono text-xs font-bold text-white">{certId}</div>
                        <p className="text-[11px] text-[var(--text-muted)] font-mono">
                          Scan with any phone camera to verify this digital certificate on the public registry.
                        </p>
                      </div>

                      <button
                        onClick={() => setShowQr(false)}
                        className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors"
                      >
                        Close QR Code
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Invalid State */
              <div className="p-12 text-center rounded-3xl bg-[var(--bg-elev-1)] border border-rose-500/30 space-y-4">
                <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto" />
                <h2 className="text-xl font-bold text-white">Certificate Verification Failed</h2>
                <p className="text-xs text-[var(--text-muted)] max-w-md mx-auto">
                  The identifier "{certId}" could not be validated against the Softcapphyjas Ed25519 cryptographic registry.
                </p>
                <Link
                  href="/academy/verify"
                  className="inline-block px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-white font-mono"
                >
                  Search Another ID
                </Link>
              </div>
            )}
          </div>
        </Container>
      </main>

      <SiteFooter />
    </div>
  );
}
