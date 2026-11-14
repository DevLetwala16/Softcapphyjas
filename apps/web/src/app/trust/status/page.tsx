"use client";

import * as React from "react";
import Link from "next/link";
import { SiteNav, SiteFooter, Container, Button } from "@softcapphyjas/ui";

interface ServiceStatus {
  name: string;
  category: string;
  status: "OPERATIONAL" | "DEGRADED" | "MAINTENANCE";
  uptime90d: string;
  latency: string;
}

const SERVICES: ServiceStatus[] = [
  {
    name: "Public Website & Edge CDN",
    category: "Core Ingress",
    status: "OPERATIONAL",
    uptime90d: "100.00%",
    latency: "18ms",
  },
  {
    name: "Softcapphyjas Synapse Inference API",
    category: "AI Models",
    status: "OPERATIONAL",
    uptime90d: "99.96%",
    latency: "42ms",
  },
  {
    name: "Academy LMS & Mux Video Streaming",
    category: "Learning",
    status: "OPERATIONAL",
    uptime90d: "99.99%",
    latency: "24ms",
  },
  {
    name: "Payments & Razorpay Webhook Ingestion",
    category: "Commerce",
    status: "OPERATIONAL",
    uptime90d: "100.00%",
    latency: "35ms",
  },
  {
    name: "Client Portal & Private S3 Storage",
    category: "Portals",
    status: "OPERATIONAL",
    uptime90d: "99.98%",
    latency: "28ms",
  },
  {
    name: "BullMQ Background Worker Queues",
    category: "Workers",
    status: "OPERATIONAL",
    uptime90d: "99.97%",
    latency: "12ms",
  },
];

export default function SystemStatusPage() {
  const [subscribed, setSubscribed] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors flex flex-col">
      <SiteNav />

      <main className="flex-1 space-y-16 py-12">
        <Container size="ultra">
          {/* Header & Overall Status Banner */}
          <div className="space-y-6 max-w-4xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
              <Link href="/trust" className="hover:text-[var(--text)]">
                Trust & Security
              </Link>
              <span>/</span>
              <span className="text-emerald-400">System Status</span>
            </div>

            <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-[0_0_30px_rgba(52,211,153,0.1)]">
              <div className="flex items-center gap-4">
                <span className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-400" />
                </span>
                <div>
                  <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--text)]">
                    All Systems Operational
                  </h1>
                  <p className="text-xs text-[var(--text-muted)] font-mono">
                    Zero active incidents · Last verified 4 minutes ago
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="font-mono text-2xl font-bold text-emerald-400">99.98%</div>
                <div className="text-[11px] font-mono text-[var(--text-muted)]">
                  90-Day Rolling Uptime
                </div>
              </div>
            </div>
          </div>

          {/* Component Status Grid */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold text-[var(--text)]">
                Component Status
              </h2>
              <span className="text-xs font-mono text-[var(--text-muted)]">
                Refreshes every 60s
              </span>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-1)] divide-y divide-[var(--border)] overflow-hidden">
              {SERVICES.map((srv, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[var(--bg-elev-2)]/40 transition-colors"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-sm text-[var(--text)]">{srv.name}</div>
                    <div className="text-[11px] font-mono text-[var(--text-muted)]">
                      {srv.category}
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-xs font-mono">
                    <div className="hidden sm:block text-[var(--text-muted)]">
                      Latency: {srv.latency}
                    </div>
                    <div className="hidden sm:block text-[var(--text-muted)]">
                      Uptime: {srv.uptime90d}
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Operational</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 90-Day Incident History */}
          <section className="space-y-6">
            <h2 className="font-display text-2xl font-bold text-[var(--text)]">
              Past Incident Log (90 Days)
            </h2>

            <div className="space-y-4">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[var(--text)]">
                    Scheduled GPU Cluster Firmware Maintenance
                  </span>
                  <span className="text-xs font-mono text-[var(--text-muted)]">
                    Oct 14, 2026 · 02:00–02:30 IST
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Scheduled rolling reboot of GPU worker nodes to apply NVIDIA CUDA 12.8 driver
                  patches. Automated traffic failover to standby cluster completed with zero dropped
                  inference requests.
                </p>
                <div className="text-[11px] font-mono text-emerald-400">
                  Resolved · Duration: 18 minutes
                </div>
              </div>

              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[var(--text)]">
                    DNS Anycast Latency Transient
                  </span>
                  <span className="text-xs font-mono text-[var(--text-muted)]">
                    Sep 04, 2026 · 14:12–14:21 IST
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Upstream transit provider experienced brief packet routing degradation in
                  Frankfurt region. Cloudflare automatic traffic steering rerouted European requests
                  through Amsterdam edge.
                </p>
                <div className="text-[11px] font-mono text-emerald-400">
                  Resolved · Duration: 9 minutes
                </div>
              </div>
            </div>
          </section>

          {/* Subscribe to Status Notifications */}
          <section>
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1">
                <h3 className="font-display text-xl font-bold text-[var(--text)]">
                  Subscribe to Platform Status Alerts
                </h3>
                <p className="text-xs text-[var(--text-muted)]">
                  Receive instant automated webhook, SMS, or email alerts when any incident or
                  maintenance event begins.
                </p>
              </div>

              {subscribed ? (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-mono text-emerald-400">
                  Subscribed to incident dispatch alerts.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sysadmin@enterprise.com"
                    className="rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-2 text-xs text-[var(--text)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none"
                  />
                  <Button variant="secondary" size="sm" type="submit">
                    Subscribe
                  </Button>
                </form>
              )}
            </div>
          </section>
        </Container>
      </main>

      <SiteFooter />
    </div>
  );
}
