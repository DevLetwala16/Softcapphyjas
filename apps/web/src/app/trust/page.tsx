import * as React from "react";
import Link from "next/link";
import { SiteNav, SiteFooter, Container, Button } from "@softcapphyjas/ui";
import { ShieldCheck, Lock, Server, FileText, ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trust, Security & Compliance | Softcapphyjas",
  description:
    "Our security architecture, encryption standards, data residency guarantees, and compliance certifications.",
};

export default function TrustPage() {
  const subprocessors = [
    {
      name: "Neon Inc.",
      purpose: "Primary PostgreSQL Serverless Database",
      location: "AWS us-east-1 / eu-central-1",
      dpa: "Signed DPA",
    },
    {
      name: "Cloudflare Inc.",
      purpose: "DNS, DDoS Shield & CDN Caching",
      location: "Global Edge Network",
      dpa: "Signed DPA",
    },
    {
      name: "Upstash Inc.",
      purpose: "Redis Cache & Distributed Rate Limiting",
      location: "Global Edge",
      dpa: "Signed DPA",
    },
    {
      name: "Razorpay Software Pvt Ltd",
      purpose: "PCI-DSS Level 1 Payment Gateway",
      location: "India (Data Localized)",
      dpa: "Signed DPA",
    },
    {
      name: "Mux Inc.",
      purpose: "Academy Adaptive HLS Video Streaming",
      location: "Global CDN",
      dpa: "Signed DPA",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors flex flex-col">
      <SiteNav />

      <main className="flex-1 space-y-16 py-12">
        <Container size="ultra">
          {/* Header */}
          <div className="space-y-4 max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Trust & Security Architecture</span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--text)]">
              Security, Privacy & Compliance
            </h1>
            <p className="text-base sm:text-xl text-[var(--text-muted)] leading-relaxed">
              We treat security and data ownership as foundational invariants. Your proprietary data
              is never used to train public models, and our infrastructure is built to withstand
              defense-grade audits.
            </p>
          </div>

          {/* Security Posture 4-Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-7 space-y-3">
              <Lock className="h-6 w-6 text-[var(--accent)]" />
              <h3 className="font-display text-base font-bold text-[var(--text)]">
                Zero Data Retention
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Queries to our enterprise APIs and Synapse demo endpoints are processed ephemerally
                in RAM and purged immediately upon response streaming.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-7 space-y-3">
              <Server className="h-6 w-6 text-[var(--accent-2)]" />
              <h3 className="font-display text-base font-bold text-[var(--text)]">
                Encryption by Default
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                All data in transit is enforced via TLS 1.3 with HSTS preloading. Data at rest is
                encrypted with AES-256 using envelope encryption and per-tenant keys.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-7 space-y-3">
              <ShieldCheck className="h-6 w-6 text-emerald-400" />
              <h3 className="font-display text-base font-bold text-[var(--text)]">
                Role-Based Access (RBAC)
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Granular permission gates enforced at three independent layers: Edge middleware, API
                procedure guards, and database row-level filters.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-7 space-y-3">
              <FileText className="h-6 w-6 text-[#FBBF24]" />
              <h3 className="font-display text-base font-bold text-[var(--text)]">
                Cryptographic Audit Logs
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Every administrative mutation, data export, and permission modification generates an
                immutable audit record with actor ID, IP address, and cryptographic signature.
              </p>
            </div>
          </div>

          {/* Compliance Status */}
          <section className="space-y-6 pt-8">
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase text-[var(--accent)]">
                Regulatory Alignment
              </div>
              <h2 className="font-display text-3xl font-bold text-[var(--text)]">
                Compliance Certifications & Standards
              </h2>
              <p className="text-xs text-[var(--text-muted)]">
                We state our compliance posture truthfully and transparently without misleading
                claims.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[var(--text)]">DPDP Act (India)</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800">
                    Compliant
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Full compliance with the Digital Personal Data Protection Act 2023, including
                  explicit consent management, right to erasure, and localized Indian cloud storage.
                </p>
              </div>

              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[var(--text)]">
                    GDPR (European Union)
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30">
                    Aligned
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Standard Contractual Clauses (SCCs), data portability endpoints, automated cookie
                  consent barriers, and zero unauthorized third-party tracking.
                </p>
              </div>

              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[var(--text)]">SOC 2 Type II</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--bg-elev-2)] text-[var(--text-muted)] border border-[var(--border)]">
                    Audit In Progress
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Continuous security telemetry and access review procedures currently undergoing
                  formal external observation period with independent AICPA accredited auditor.
                </p>
              </div>
            </div>
          </section>

          {/* Sub-processors Table */}
          <section id="subprocessors" className="space-y-6 pt-8">
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase text-[var(--accent)]">
                Third-Party Infrastructure
              </div>
              <h2 className="font-display text-3xl font-bold text-[var(--text)]">
                Approved Sub-Processors
              </h2>
              <p className="text-xs text-[var(--text-muted)]">
                All external cloud infrastructure vendors maintain signed Data Processing Addenda
                (DPAs) with strict security covenants.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-1)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-[var(--border)] bg-[var(--bg-elev-2)]/60 text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
                    <tr>
                      <th className="px-6 py-3.5">Vendor</th>
                      <th className="px-6 py-3.5">Service & Role</th>
                      <th className="px-6 py-3.5">Data Location</th>
                      <th className="px-6 py-3.5 text-right">Legal Covenants</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {subprocessors.map((item, i) => (
                      <tr key={i} className="hover:bg-[var(--bg-elev-2)]/40 transition-colors">
                        <td className="px-6 py-4 font-bold text-[var(--text)]">{item.name}</td>
                        <td className="px-6 py-4 text-[var(--text-muted)]">{item.purpose}</td>
                        <td className="px-6 py-4 font-mono text-[var(--text-muted)]">
                          {item.location}
                        </td>
                        <td className="px-6 py-4 text-right font-mono text-emerald-400">
                          {item.dpa}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Security Documentation Downloads */}
          <section className="pt-8">
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-8 sm:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="font-display text-2xl font-bold text-[var(--text)]">
                  Security Whitepaper & Compliance Artifacts
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Enterprise security officers and compliance directors may request our complete
                  third-party penetration test summary, disaster recovery runbooks, and standardized
                  DPA.
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <Button variant="primary" size="sm" asChild>
                    <Link href="/contact?topic=enterprise">
                      <span>Request Enterprise Security Packet</span>
                      <ArrowRight className="h-4 w-4 ml-1.5" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 space-y-3">
                <div className="text-xs font-mono uppercase text-emerald-400 font-semibold">
                  Live System Status
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  All production clusters and inference endpoints maintain 99.98% uptime with
                  real-time status monitoring.
                </p>
                <div className="pt-2">
                  <Link
                    href="/trust/status"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--accent)] hover:underline"
                  >
                    <span>View Public Live System Status Dashboard →</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </Container>
      </main>

      <SiteFooter />
    </div>
  );
}
