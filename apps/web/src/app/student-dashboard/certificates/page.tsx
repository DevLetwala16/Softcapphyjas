import { auth, signOut } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { StudentPortalNav } from "@/components/student-portal-nav";
import {
  Award,
  ShieldCheck,
  Download,
  Share2,
  Calendar,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { SAMPLE_VERIFIED_CERTIFICATES } from "@/lib/academy-data";

export default async function StudentCertificatesPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?next=/student-dashboard/certificates");
  }

  const user = session.user;

  async function handleSignOut() {
    "use server";
    await signOut({ redirectTo: "/login" });
  }

  const certificates = [
    {
      id: "cert_01",
      publicId: "SCP-CERT-2026-B8820E",
      courseTitle: "Machine Learning Foundations & Mathematical Rigor",
      courseCode: "ACA-101",
      issuedAt: "November 01, 2026",
      grade: "Grade: High Honors (92.5%)",
      signatory: "Prof. Elena Vance · Lead Curriculum Fellow",
      signature: "39201a88b8849f82901c0029384819a893021849182938019284910293849182",
    },
    {
      id: "cert_02",
      publicId: "SCP-CERT-2026-A91F2B",
      courseTitle: "Autonomous Multi-Agent Systems & Tool-Use Architecture",
      courseCode: "ACA-501",
      issuedAt: "October 15, 2026",
      grade: "Grade: Distinction (98.4%)",
      signatory: "Dr. Siddharth Iyer · Chief AI Architect",
      signature: "e9b2849c9a00821c172d8a4365823ab9f9024f0c609594411d33ca7289d3fbc9",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] selection:bg-[var(--accent)] selection:text-[#05070D]">
      <StudentPortalNav user={user} signOutAction={handleSignOut} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[var(--border)] pb-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Award className="w-6 h-6 text-amber-400" />
              My Cryptographic Certificates
            </h1>
            <p className="text-xs text-[var(--text-muted)] font-mono">
              Verifiable Ed25519 digital credentials issued by Softcapphyjas Academy
            </p>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>2 Credentials Authenticated</span>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[var(--bg-elev-1)] to-[var(--bg-elev-2)] p-6 sm:p-7 space-y-6 shadow-xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/10 text-white font-bold">
                  {cert.courseCode}
                </span>
                <span className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Authentic · RFC 8032
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white">{cert.courseTitle}</h3>
                <div className="text-xs font-mono text-emerald-400 font-medium">{cert.grade}</div>
                <div className="text-xs text-[var(--text-muted)] font-mono">
                  Issued: {cert.issuedAt} · {cert.signatory}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1 text-[11px] font-mono">
                <div className="text-[var(--text-muted)] flex items-center justify-between">
                  <span>Public ID:</span>
                  <span className="text-[var(--accent)] font-bold">{cert.publicId}</span>
                </div>
                <div className="text-[var(--text-muted)] truncate">
                  Signature: <span className="text-white/60">{cert.signature.substring(0, 32)}...</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between">
                <Link
                  href={`/academy/verify/${cert.publicId}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--accent)] hover:underline"
                >
                  <span>Public Verification View</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href={`/academy/verify/${cert.publicId}`}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
