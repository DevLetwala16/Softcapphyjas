"use client";

import * as React from "react";
import { Container } from "@softcapphyjas/ui";

interface StatsData {
  experiments: number;
  modelsShipped: number;
  enterpriseClients: number;
  learners: number;
}

export function TrustStrip() {
  const [stats, setStats] = React.useState<StatsData>({
    experiments: 120,
    modelsShipped: 38,
    enterpriseClients: 60,
    learners: 15200,
  });

  React.useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.experiments) {
          setStats({
            experiments: data.experiments,
            modelsShipped: data.modelsShipped,
            enterpriseClients: data.enterpriseClients,
            learners: data.learners,
          });
        }
      })
      .catch(() => {
        // keep fallback benchmark stats
      });
  }, []);

  const partners = [
    { name: "Stanford Bio-X Partner", domain: "Computational Biology" },
    { name: "Max Planck Institute Affiliates", domain: "Theoretical Physics" },
    { name: "Global AgriTech Consortium", domain: "Precision Agriculture" },
    { name: "Apollo Health System", domain: "Clinical Decision AI" },
    { name: "Tata Steel Enterprise AI", domain: "Industrial Automation" },
    { name: "European Synchrotron ESFR", domain: "Quantum Materials" },
  ];

  return (
    <section
      id="trust-metrics"
      className="border-y border-[var(--border)] bg-[var(--bg-elev-1)]/50 py-12 transition-colors"
    >
      <Container size="ultra">
        {/* Metric Counters Grid */}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:gap-8 pb-10 border-b border-[var(--border)]">
          <div className="space-y-1">
            <div className="font-mono text-3xl sm:text-4xl font-extrabold text-[var(--accent)] tracking-tight">
              {stats.experiments}+
            </div>
            <div className="text-sm font-semibold text-[var(--text)]">Research Experiments</div>
            <p className="text-xs text-[var(--text-muted)]">
              Peer-reviewed or deployed in production
            </p>
          </div>

          <div className="space-y-1">
            <div className="font-mono text-3xl sm:text-4xl font-extrabold text-[var(--accent-2)] tracking-tight">
              {stats.modelsShipped}
            </div>
            <div className="text-sm font-semibold text-[var(--text)]">Foundational Models</div>
            <p className="text-xs text-[var(--text-muted)]">
              Proprietary architectures & domain weights
            </p>
          </div>

          <div className="space-y-1">
            <div className="font-mono text-3xl sm:text-4xl font-extrabold text-[var(--accent-3)] tracking-tight">
              {stats.enterpriseClients}+
            </div>
            <div className="text-sm font-semibold text-[var(--text)]">Enterprise Clients</div>
            <p className="text-xs text-[var(--text-muted)]">
              Fortune 500, healthcare & frontier startups
            </p>
          </div>

          <div className="space-y-1">
            <div className="font-mono text-3xl sm:text-4xl font-extrabold text-[#FBBF24] tracking-tight">
              {stats.learners.toLocaleString()}+
            </div>
            <div className="text-sm font-semibold text-[var(--text)]">Academy Learners</div>
            <p className="text-xs text-[var(--text-muted)]">
              Trained across 42 countries worldwide
            </p>
          </div>
        </div>

        {/* Institutional & Partner Marquee Strip */}
        <div className="pt-8">
          <div className="text-center mb-6">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-muted)]/70">
              Trusted by Researchers, Engineers & Industry Pioneers Worldwide
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg-elev-2)] px-4 py-2 transition-all hover:border-[var(--accent)]/40 hover:scale-[1.02]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                <span className="text-xs font-semibold text-[var(--text)]">{partner.name}</span>
                <span className="hidden sm:inline text-[11px] text-[var(--text-muted)]">
                  ({partner.domain})
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
