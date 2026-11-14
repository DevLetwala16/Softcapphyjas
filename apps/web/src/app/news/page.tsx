import * as React from "react";
import Link from "next/link";
import { SiteNav, SiteFooter, Container, Button } from "@softcapphyjas/ui";
import { Newspaper, Download, ArrowRight, Mail } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsroom & Press Releases | Softcapphyjas",
  description:
    "Official company announcements, partnership declarations, and breakthrough publication notices.",
};

export default function NewsPage() {
  const releases = [
    {
      id: "news-1",
      date: "November 10, 2026",
      category: "Platform Release",
      title: "Softcapphyjas Synapse Beta Opens for University & Hospital Partners",
      excerpt:
        "Softcapphyjas announces the rollout of the Synapse multimodal foundation model and reasoning workspace to an initial cohort of 24 institutional research partners across North America, Europe, and India.",
      link: "/news/synapse-beta-announcement",
    },
    {
      id: "news-2",
      date: "October 18, 2026",
      category: "Research Breakthrough",
      title: "Nature Digital Medicine Publishes Softcapphyjas ICU Neuro-Symbolic Triage Study",
      excerpt:
        "Peer-reviewed study demonstrates 0.984 AUROC and 14-hour advance septic shock warning with zero contradictory clinical contraindications across 48,000 patient-hours.",
      link: "/research/papers/neuro-symbolic-triage-icu",
    },
    {
      id: "news-3",
      date: "September 24, 2026",
      category: "Enterprise Partnership",
      title:
        "Softcapphyjas Deploys Sovereign Air-Gapped Intelligence Appliance for Tier-1 Financial Institution",
      excerpt:
        "Completed full on-premises deployment of 70B parameter quantized reasoning cluster with 100% air-gap compliance and zero outbound network telemetry.",
      link: "/services/sovereign-ai",
    },
    {
      id: "news-4",
      date: "August 12, 2026",
      category: "Open Source",
      title: "Open Source Release of neurosym v2.0 PyTorch SMT Constraint Engine",
      excerpt:
        "Releasing our high-performance differentiable logic framework under permissive Apache-2.0 licensing, enabling developers to bind Z3 formal verification gates into PyTorch models.",
      link: "https://github.com",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors flex flex-col">
      <SiteNav />

      <main className="flex-1 space-y-16 py-12">
        <Container size="ultra">
          {/* Header */}
          <div className="space-y-4 max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--accent)]">
              <Newspaper className="h-3.5 w-3.5" />
              <span>Press Room & Announcements</span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--text)]">
              News & Dispatches
            </h1>
            <p className="text-base sm:text-xl text-[var(--text-muted)] leading-relaxed">
              Official press releases, scientific journal announcements, and company milestones from
              Softcapphyjas.
            </p>
          </div>

          {/* Releases List */}
          <div className="space-y-6">
            {releases.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-8 sm:p-10 space-y-3 hover:border-[var(--accent)]/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-6"
              >
                <div className="space-y-2 max-w-3xl">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/30">
                      {item.category}
                    </span>
                    <span className="text-xs font-mono text-[var(--text-muted)]">{item.date}</span>
                  </div>

                  <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--text)] hover:text-[var(--accent)] transition-colors">
                    <Link href={item.link}>{item.title}</Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>

                <div className="shrink-0">
                  <Button variant="secondary" size="sm" asChild>
                    <Link href={item.link}>
                      <span>Read Release</span>
                      <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Media Kit Section */}
          <div
            id="media-kit"
            className="mt-16 rounded-3xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-8 sm:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          >
            <div className="space-y-4">
              <h3 className="font-display text-2xl font-bold text-[var(--text)]">
                Official Media Kit & Brand Assets
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Download verified high-resolution SVG and PNG logos, leadership headshots, brand
                guidelines, and executive biographies for publication use.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <Button variant="primary" size="sm" asChild>
                  <a href="/brand/logo-mark.svg" download>
                    <Download className="h-4 w-4 mr-1.5" />
                    <span>Download SVG Logo Pack</span>
                  </a>
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 space-y-3">
              <div className="text-xs font-mono uppercase text-[var(--accent)] font-semibold">
                Media Inquiries
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Journalists and editors seeking background information or interview availability
                with our research directors:
              </p>
              <div className="flex items-center gap-2 pt-1 font-mono text-xs text-[var(--accent)]">
                <Mail className="h-4 w-4" />
                <a href="mailto:press@softcapphyjas.com" className="hover:underline">
                  press@softcapphyjas.com
                </a>
              </div>
            </div>
          </div>
        </Container>
      </main>

      <SiteFooter />
    </div>
  );
}
