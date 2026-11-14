"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Cpu,
  Lock,
  RefreshCw,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Wrench,
} from "lucide-react";
import { Container, Button } from "@softcapphyjas/ui";

export function ServiceMatrix() {
  const [selectedService, setSelectedService] = React.useState("agentic-ai");

  const services = [
    {
      id: "agentic-ai",
      title: "Agentic AI Systems",
      icon: Bot,
      headline: "Autonomous multi-agent workflows with deterministic execution guarantees.",
      deliverables: [
        "Planner, Tool-User, and Reviewer Agent DAG graphs",
        "Deterministic human-in-the-loop approval gates",
        "Comprehensive eval suite & automated red-team reporting",
        "Production runtime runbooks & enterprise handover",
      ],
      timeline: "6 – 14 weeks",
      tech: ["LangGraph", "Llama 3.3", "DeepSeek", "Python", "Temporal", "PostgreSQL pgvector"],
      caseSnippet:
        "Automated 82% of clinical claims triage with 99.9% policy conformance for tier-1 insurer.",
    },
    {
      id: "custom-models",
      title: "Custom LLMs & Fine-Tuning",
      icon: Cpu,
      headline:
        "Proprietary domain weights trained on your enterprise corpus with strict IP isolation.",
      deliverables: [
        "Domain-adapted LoRA and full-rank parameter fine-tuning",
        "Synthetic data generation & automated curation pipeline",
        "Quantization (FP8, INT4) for sub-50ms inference latency",
        "Continuous evaluation harness against golden benchmarks",
      ],
      timeline: "8 – 16 weeks",
      tech: ["PyTorch", "vLLM", "DeepSpeed", "HuggingFace", "Triton", "NVIDIA H100"],
      caseSnippet:
        "Engineered specialized legal discovery LLM that slashed document review time from 3 days to 4 minutes.",
    },
    {
      id: "legacy-modernization",
      title: "Legacy → AI Modernization",
      icon: RefreshCw,
      headline:
        "Refactor legacy COBOL, Java, and monolithic codebases into modern microservices with zero downtime.",
      deliverables: [
        "AST-guided static analysis & semantic graph extraction",
        "Automated regression test generation with 95%+ coverage",
        "Phased strangler-fig migration roadmap",
        "Shadow traffic verification & performance benchmarking",
      ],
      timeline: "12 – 24 weeks",
      tech: ["Tree-sitter", "TypeScript", "Go", "Docker", "Kubernetes", "Next.js"],
      caseSnippet:
        "Migrated 2.4M lines of banking mainframe logic to modular TypeScript microservices with zero data discrepancy.",
    },
    {
      id: "ai-security",
      title: "AI Security & Guardrails",
      icon: Lock,
      headline: "Comprehensive red-teaming, prompt injection defense, and PII leakage prevention.",
      deliverables: [
        "Real-time token guardrail proxy (Llama Guard, NeMo)",
        "Adversarial jailbreak resistance certification",
        "PII/PHI anonymization & cryptographically auditable telemetry",
        "OWASP LLM Top 10 compliance audit report",
      ],
      timeline: "4 – 8 weeks",
      tech: ["Llama Guard 2", "Presidio", "Redis", "eBPF", "OpenTelemetry"],
      caseSnippet:
        "Prevented 100% of tested multi-turn indirect prompt injections across client's customer service bot.",
    },
    {
      id: "mlops",
      title: "MLOps & LLMOps Platform",
      icon: Layers,
      headline:
        "End-to-end continuous training, deployment, and real-time observability pipelines.",
      deliverables: [
        "Automated CI/CD for model checkpoints & regression tests",
        "Distributed model serving with auto-scaling GPU workers",
        "Real-time drift detection, latency alarms & token cost metering",
        "Air-gapped artifact registry and private weights storage",
      ],
      timeline: "6 – 12 weeks",
      tech: ["Kubernetes", "KServe", "Ray", "Prometheus", "Grafana", "MLflow"],
      caseSnippet:
        "Reduced model deployment cycle from 6 weeks to 18 minutes while cutting GPU cloud spend by 44%.",
    },
    {
      id: "sovereign-ai",
      title: "Sovereign On-Prem AI",
      icon: ShieldCheck,
      headline:
        "Fully air-gapped AI deployments compliant with national sovereignty & defense standards.",
      deliverables: [
        "Self-contained bare-metal or private cloud appliance",
        "Zero external API calls or outbound telemetry leaks",
        "Encrypted-at-rest model weights (AES-256) & TPM verification",
        "DPDP & GDPR data localization certification",
      ],
      timeline: "10 – 20 weeks",
      tech: ["Bare Metal", "OpenShift", "Local Embeddings", "MinIO", "Keycloak"],
      caseSnippet:
        "Deployed private intelligence system within classified defense research facility with strict air-gap compliance.",
    },
  ];

  const current = services.find((s) => s.id === selectedService) ?? services[0]!;

  return (
    <section className="py-20 bg-[var(--bg)] transition-colors relative">
      <Container size="ultra">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--accent)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              <span>Enterprise AI Services</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text)]">
              Engineering that <span className="text-[var(--accent)]">ships to production</span>
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
              We do not build toy demos. We engineer fault-tolerant, auditable, and sovereign
              intelligence systems backed by rigorous service level agreements.
            </p>
          </div>

          <Button variant="secondary" asChild>
            <Link href="/services">
              <span>View All 10 Services</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>

        {/* Interactive Matrix: Selector Tabs + Animated Detail Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Navigation Rail */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 gap-2">
            {services.map((s) => {
              const Icon = s.icon;
              const isSelected = selectedService === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedService(s.id)}
                  className={`flex items-center gap-3.5 p-4 rounded-xl text-left transition-all shrink-0 w-64 lg:w-full border ${
                    isSelected
                      ? "border-[var(--accent)] bg-[var(--bg-elev-1)] text-[var(--text)] shadow-[0_0_20px_rgba(34,211,238,0.15)]"
                      : "border-transparent bg-[var(--bg-elev-2)]/60 text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-elev-2)]"
                  }`}
                >
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg border ${
                      isSelected
                        ? "border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent)]"
                        : "border-[var(--border)] bg-[var(--bg-elev-1)] text-[var(--text-muted)]"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="truncate">
                    <div className="font-semibold text-xs sm:text-sm">{s.title}</div>
                    <div className="text-[11px] text-[var(--text-muted)] truncate">
                      {s.timeline}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Detail Panel */}
          <div className="lg:col-span-8 rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-8 sm:p-10 space-y-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent)] uppercase tracking-wider">
                <span>Selected Architecture</span>
                <span>·</span>
                <span>Production Blueprint</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text)]">
                {current.title}
              </h3>
              <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
                {current.headline}
              </p>
            </div>

            {/* Simulated Architecture Flow Diagram */}
            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-6 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] border-b border-[var(--border)] pb-3">
                <span>Architecture Flow Diagram</span>
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Audited & Validated
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-2">
                <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-elev-2)] p-3 text-center space-y-1">
                  <div className="text-[10px] font-mono text-[var(--accent)]">INPUT LAYER</div>
                  <div className="text-xs font-bold text-[var(--text)]">Telemetry & Data</div>
                  <div className="text-[10px] text-[var(--text-muted)]">Encrypted TLS 1.3</div>
                </div>

                <div className="rounded-lg border border-[var(--accent)]/40 bg-[var(--accent)]/10 p-3 text-center space-y-1 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                  <div className="text-[10px] font-mono text-[var(--accent)]">PROCESSING</div>
                  <div className="text-xs font-bold text-[var(--text)]">Core Model Engine</div>
                  <div className="text-[10px] text-[var(--text-muted)]">Sub-50ms Latency</div>
                </div>

                <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-elev-2)] p-3 text-center space-y-1">
                  <div className="text-[10px] font-mono text-emerald-400">OUTPUT VERIFIED</div>
                  <div className="text-xs font-bold text-[var(--text)]">Deterministic Result</div>
                  <div className="text-[10px] text-[var(--text-muted)]">Signed Audit Log</div>
                </div>
              </div>
            </div>

            {/* Deliverables Checklist */}
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-[var(--text)] font-semibold">
                Typical Deliverables
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {current.deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 text-xs text-[var(--text-muted)]"
                  >
                    <CheckCircle2 className="h-4 w-4 text-[var(--accent)] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Meta: Timeline, Tech, Case */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[var(--border)] text-xs">
              <div className="space-y-1">
                <div className="text-[11px] font-mono text-[var(--text-muted)] flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-[var(--accent)]" />
                  <span>Timeline</span>
                </div>
                <div className="font-semibold text-[var(--text)]">{current.timeline}</div>
              </div>

              <div className="space-y-1 sm:col-span-2">
                <div className="text-[11px] font-mono text-[var(--text-muted)] flex items-center gap-1.5">
                  <Wrench className="h-3.5 w-3.5 text-[var(--accent)]" />
                  <span>Tech Stack</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {current.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--bg-elev-2)] border border-[var(--border)] text-[var(--text)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Client Outcome Snippet */}
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-xs text-emerald-300">
              <span className="font-semibold text-emerald-200">Verified Client Outcome: </span>
              {current.caseSnippet}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <Button variant="primary" size="lg" asChild>
                <Link href={`/hire-us?service=${current.id}`}>
                  <span>Estimate This Project</span>
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>

              <Link
                href={`/services/${current.id}`}
                className="text-xs font-semibold text-[var(--accent)] hover:underline underline-offset-4"
              >
                Read deep-dive service specification →
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
