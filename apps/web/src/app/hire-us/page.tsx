"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SiteNav, SiteFooter, Container, Button, Badge } from "@softcapphyjas/ui";
import {
  ShieldCheck,
  Check,
  ArrowRight,
  Lock,
  Building,
  Calendar,
  FileCheck,
} from "lucide-react";

const SERVICES_LIST = [
  { slug: "agentic-ai", name: "Autonomous Agentic AI Systems" },
  { slug: "custom-models", name: "Custom Foundation Models" },
  { slug: "legacy-modernization", name: "Legacy System Modernization" },
  { slug: "cyber-defense", name: "AI-Augmented Cyber Defense" },
  { slug: "mlops-platform", name: "Enterprise MLOps & LLMOps" },
  { slug: "edge-ai", name: "Edge AI & Embedded Intelligence" },
  { slug: "quantum-simulation", name: "Quantum-Classical Co-Simulation" },
  { slug: "enterprise-data", name: "Secure Knowledge & Data Pipelines" },
  { slug: "ai-governance", name: "AI Governance & Compliance Auditing" },
  { slug: "strategic-advisory", name: "Strategic Frontier AI Advisory" },
];

function HireUsInner() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get("service") || "agentic-ai";

  const [selectedService, setSelectedService] = React.useState(initialService);
  const [model, setModel] = React.useState("poc");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [organization, setOrganization] = React.useState("");
  const [budget, setBudget] = React.useState("50k-150k");
  const [ndaRequired, setNdaRequired] = React.useState(true);
  const [details, setDetails] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    const s = searchParams.get("service");
    if (s && SERVICES_LIST.some((x) => x.slug === s)) {
      setSelectedService(s);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          organization,
          topic: `enterprise-service-${selectedService}`,
          message: `Service: ${selectedService}\nModel: ${model}\nBudget: ${budget}\nNDA Required: ${ndaRequired}\nDetails: ${details}`,
        }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* Left Form Column */}
      <div className="lg:col-span-7 rounded-3xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-8 sm:p-10 space-y-6">
        <div className="space-y-2">
          <Badge variant="cyan" size="sm">
            Enterprise Engagement Intake
          </Badge>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text)]">
            Commission Enterprise Engineering
          </h2>
          <p className="text-xs text-[var(--text-muted)]">
            Partner with Softcapphyjas systems architects and research fellows to build, fine-tune,
            and deploy mission-critical intelligence.
          </p>
        </div>

        {submitted ? (
          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-8 text-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
              <Check className="h-6 w-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-[var(--text)]">
              Proposal Request Received
            </h3>
            <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto leading-relaxed">
              Thank you, {name}. A mutual Non-Disclosure Agreement (NDA) and technical scoping call
              invitation have been dispatched to {email}.
            </p>
            <div className="pt-2">
              <Button variant="secondary" size="sm" onClick={() => setSubmitted(false)}>
                Submit Additional Project
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Service Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-[var(--text)] font-semibold">
                Target Architecture Service *
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-2.5 text-xs text-[var(--text)] focus:border-[var(--accent)] focus:outline-none"
              >
                {SERVICES_LIST.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Engagement Model */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-[var(--text)] font-semibold">
                Engagement Model *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                {[
                  { id: "poc", label: "Discovery PoC", sub: "2–4 Weeks" },
                  { id: "pilot", label: "Production Pilot", sub: "8–12 Weeks" },
                  { id: "retainer", label: "Enterprise Retainer", sub: "6–12 Months" },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setModel(m.id)}
                    className={`rounded-xl border p-3 text-left transition-colors ${
                      model === m.id
                        ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--text)]"
                        : "border-[var(--border)] bg-[var(--bg)] text-[var(--text-muted)] hover:border-[var(--accent)]/40"
                    }`}
                  >
                    <div className="font-semibold text-xs text-[var(--text)]">{m.label}</div>
                    <div className="text-[10px] text-[var(--text-muted)] font-mono">{m.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-[var(--text)] font-semibold">
                  Principal Contact *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Dr. Siddharth Rao"
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-2.5 text-xs text-[var(--text)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-[var(--text)] font-semibold">
                  Corporate / Gov Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="s.rao@enterprise.com"
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-2.5 text-xs text-[var(--text)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-[var(--text)] font-semibold">
                  Organization / Entity *
                </label>
                <input
                  type="text"
                  required
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="Global BioPharma / National Bank"
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-2.5 text-xs text-[var(--text)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-[var(--text)] font-semibold">
                  Target Budget Scope
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-2.5 text-xs text-[var(--text)] focus:border-[var(--accent)] focus:outline-none"
                >
                  <option value="under-50k">Under ₹40,00,000 ($50k)</option>
                  <option value="50k-150k">₹40,00,000 – ₹1,20,00,000 ($50k–$150k)</option>
                  <option value="150k-500k">₹1,20,00,000 – ₹4,00,00,000 ($150k–$500k)</option>
                  <option value="above-500k">Custom Enterprise Scope (&gt;$500k)</option>
                </select>
              </div>
            </div>

            {/* NDA Checkbox */}
            <div className="flex items-center gap-3 p-3 rounded-xl border border-[var(--border)] bg-[var(--bg)]">
              <input
                type="checkbox"
                id="nda-checkbox"
                checked={ndaRequired}
                onChange={(e) => setNdaRequired(e.target.checked)}
                className="h-4 w-4 rounded border-[var(--border)] text-[var(--accent)] focus:ring-[var(--accent)]"
              />
              <label htmlFor="nda-checkbox" className="text-xs text-[var(--text)] cursor-pointer">
                <span className="font-semibold">Execute Mutual NDA prior to technical scoping</span>
                <span className="block text-[10px] text-[var(--text-muted)]">
                  Standard bilateral confidentiality agreement covering proprietary architectures.
                </span>
              </label>
            </div>

            {/* Project Details */}
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-[var(--text)] font-semibold">
                Technical Context & Deliverable Goals
              </label>
              <textarea
                rows={3}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Describe your existing infrastructure, data residency constraints, latency requirements, or model benchmarks..."
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-2.5 text-xs text-[var(--text)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none"
              />
            </div>

            <Button
              variant="primary"
              size="md"
              type="submit"
              disabled={submitting}
              className="w-full justify-center"
            >
              {submitting ? "Submitting Scoping Brief..." : "Request Technical Discovery Scoping"}
            </Button>
          </form>
        )}
      </div>

      {/* Right Column: Assurances & Models */}
      <div className="lg:col-span-5 space-y-6">
        {/* Security & Confidentiality Box */}
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400">
            <Lock className="h-5 w-5" />
            <span className="font-mono text-xs uppercase font-bold tracking-wider">
              Zero IP Retention Guarantee
            </span>
          </div>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            All models, weights, fine-tuned adapters, and datasets generated during enterprise
            engagements remain 100% your exclusive intellectual property. We sign rigorous bilateral
            NDAs before reviewing any proprietary repositories.
          </p>
          <div className="pt-2 border-t border-[var(--border)] space-y-2">
            <div className="flex items-center gap-2 text-xs text-[var(--text)]">
              <ShieldCheck className="h-4 w-4 text-[var(--accent)]" />
              <span>SOC 2 Type II &amp; ISO 27001 Certified Engineering</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[var(--text)]">
              <FileCheck className="h-4 w-4 text-[var(--accent)]" />
              <span>Full Air-Gapped &amp; On-Premise VPC Deployability</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[var(--text)]">
              <Building className="h-4 w-4 text-[var(--accent)]" />
              <span>Dedicated Principal Researcher &amp; Systems Lead</span>
            </div>
          </div>
        </div>

        {/* Rapid Delivery Cadence */}
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-[var(--accent)]">
            <Calendar className="h-5 w-5" />
            <span className="font-mono text-xs uppercase font-bold tracking-wider">
              Engagement Lifecycle
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex gap-3">
              <span className="font-mono text-[var(--accent)] font-bold">01</span>
              <div>
                <div className="font-bold text-[var(--text)]">T+48h Architecture Review</div>
                <div className="text-[11px] text-[var(--text-muted)]">
                  Bilateral NDA signed and preliminary technical review conducted.
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="font-mono text-[var(--accent)] font-bold">02</span>
              <div>
                <div className="font-bold text-[var(--text)]">T+14d Discovery PoC</div>
                <div className="text-[11px] text-[var(--text-muted)]">
                  Working baseline model deployed in an isolated evaluation environment.
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="font-mono text-[var(--accent)] font-bold">03</span>
              <div>
                <div className="font-bold text-[var(--text)]">Production Pilot</div>
                <div className="text-[11px] text-[var(--text-muted)]">
                  Production pipeline integration, stress testing, and air-gapped deployment.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Direct Channel */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-2)] p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-[var(--text)]">Direct Executive Inquiries</div>
            <div className="text-[11px] font-mono text-[var(--text-muted)]">
              enterprise@softcapphyjas.com
            </div>
          </div>
          <Link
            href="/contact"
            className="text-xs font-mono text-[var(--accent)] hover:underline inline-flex items-center gap-1"
          >
            <span>General Contact</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function HireUsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors flex flex-col justify-between">
      <SiteNav />

      <main className="flex-1 py-12 sm:py-16">
        <Container size="standard">
          <React.Suspense
            fallback={
              <div className="py-24 text-center text-xs font-mono text-[var(--text-muted)]">
                Loading engagement portal...
              </div>
            }
          >
            <HireUsInner />
          </React.Suspense>
        </Container>
      </main>

      <SiteFooter />
    </div>
  );
}
