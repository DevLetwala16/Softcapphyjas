"use client";

import * as React from "react";
import Link from "next/link";
import {
  SiteNav,
  SiteFooter,
  Container,
  Button,
  Badge,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  CommandPalette,
  ConciergeChatbot,
} from "@softcapphyjas/ui";
import {
  ArrowRight,
  Bot,
  Cpu,
  RefreshCw,
  Lock,
  Layers,
  Zap,
  Atom,
  Server,
  Database,
  ShieldCheck,
  CheckCircle2,
  Wrench,
  Sparkles,
  Shield,
  FileCheck,
} from "lucide-react";

interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  tag: string;
  icon: React.ComponentType<{ className?: string }>;
  headline: string;
  whatWeDo: string;
  architectureNotes: string;
  deliverables: string[];
  timeline: string;
  tech: string[];
  caseSnippet: string;
}

const ALL_SERVICES: ServiceItem[] = [
  {
    id: "agentic-ai",
    slug: "agentic-ai",
    name: "Agentic AI Systems",
    tag: "Autonomous Orchestration",
    icon: Bot,
    headline: "Autonomous multi-agent workflows with deterministic execution guarantees.",
    whatWeDo:
      "We design self-correcting agent DAGs that orchestrate multi-step reasoning, external tool-calling, and database mutations. Every agent workflow is bound by deterministic verification gates and human-in-the-loop approval thresholds.",
    architectureNotes:
      "Planner Agent → Tool Calling DAG → SMT Policy Gate → Verified Execution & Cryptographic Audit",
    deliverables: [
      "Planner, Tool-User, and Reviewer Agent DAG graphs",
      "Deterministic human-in-the-loop approval thresholds",
      "Comprehensive evaluation harness & red-team vulnerability report",
      "Production deployment runbooks & operations handover",
    ],
    timeline: "6 – 14 weeks",
    tech: ["LangGraph", "Llama 3.3", "DeepSeek-R1", "Temporal", "PostgreSQL pgvector", "Python"],
    caseSnippet:
      "Automated 82% of clinical claims triage with 99.9% policy conformance for tier-1 health insurer.",
  },
  {
    id: "custom-models",
    slug: "custom-models",
    name: "Custom Models & LLM Engineering",
    tag: "Fine-Tuning & Distillation",
    icon: Cpu,
    headline:
      "Proprietary domain weights trained on your enterprise corpus with strict IP isolation.",
    whatWeDo:
      "We fine-tune open and proprietary foundation models using parameter-efficient fine-tuning (LoRA, QLoRA) and full-parameter distillation. Your proprietary training data never leaves your private virtual private cloud.",
    architectureNotes:
      "Raw Enterprise Corpus → Synthetic Augmentation → LoRA Adapter Distillation → vLLM FP8 Serving",
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
    slug: "legacy-modernization",
    name: "Legacy → AI Modernization",
    tag: "Code Synthesis & Strangler Fig",
    icon: RefreshCw,
    headline:
      "Refactor legacy COBOL, Java, and monolithic codebases into modern microservices with zero downtime.",
    whatWeDo:
      "Using AST-guided semantic code intelligence, we extract business logic rules from 20-year-old monolithic mainframes and generate modern, typed, unit-tested TypeScript and Go microservices with guaranteed behavioral parity.",
    architectureNotes:
      "Legacy Monolith AST → Graph Logic Extractor → Verified TypeScript Code Gen → Shadow Traffic Verification",
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
    slug: "ai-security",
    name: "Enterprise AI Security & Guardrails",
    tag: "Red-Teaming & Defenses",
    icon: Lock,
    headline: "Comprehensive red-teaming, prompt injection defense, and PII leakage prevention.",
    whatWeDo:
      "We secure generative AI endpoints against prompt injection, data extraction, jailbreaks, and indirect supply-chain poisoned retrieval. We certify systems against the OWASP LLM Top 10 vulnerabilities.",
    architectureNotes:
      "User Ingress → Prompt Guard 2 Token Scanner → PII Masking Filter → LLM Engine → Output Policy Verification",
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
    slug: "mlops",
    name: "MLOps & LLMOps Platform",
    tag: "Production Infrastructure",
    icon: Layers,
    headline: "End-to-end continuous training, deployment, and real-time observability pipelines.",
    whatWeDo:
      "We build robust platform engineering layers for model deployment, auto-scaling GPU inference clusters, canary testing, automated dataset retraining, and drift monitoring.",
    architectureNotes:
      "Model Weights Registry → KServe GPU Pod Autoscaler → Prometheus Drift Telemetry → Canary Router",
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
    id: "automation",
    slug: "automation",
    name: "Enterprise Workflow Automation",
    tag: "High-Throughput ETL",
    icon: Zap,
    headline:
      "End-to-end intelligent document processing, invoice OCR, and supply chain automation.",
    whatWeDo:
      "Replace manual data entry and multi-system copy-pasting with multimodal vision-language models that extract, validate, and write back structured financial and logistical transactions into ERPs.",
    architectureNotes:
      "Inbound Document Stream → Vision Parser → Schema Validator → ERP API Integration",
    deliverables: [
      "Document ingestion pipeline handling PDF, scan, and unstructured text",
      "Human-in-the-loop review interface for edge cases",
      "Direct integration with SAP, Salesforce, and custom SQL databases",
      "SLA guarantee of <200ms document processing latency",
    ],
    timeline: "6 – 10 weeks",
    tech: ["PaddleOCR", "Gemini 2.5", "Temporal", "PostgreSQL", "FastAPI"],
    caseSnippet:
      "Processed 450,000 cross-border shipping bills with 99.4% field accuracy, saving 12,000 human labor hours/month.",
  },
  {
    id: "quantum-hybrid",
    slug: "quantum-hybrid",
    name: "Quantum-Classical Hybrid Algorithms",
    tag: "Frontier Optimization",
    icon: Atom,
    headline:
      "Combinatorial optimization, materials discovery, and financial risk modeling via hybrid QPU-GPU.",
    whatWeDo:
      "We design quantum-assisted heuristics that formulate NP-hard combinatorial optimization, vehicle routing, and portfolio risk parity as quadratic unconstrained binary optimization (QUBO) problems.",
    architectureNotes:
      "Combinatorial Problem → QUBO Formulation → Variational Quantum State Preparation → Classical Optimizer",
    deliverables: [
      "QUBO problem compilation and classical baseline benchmarking",
      "Variational quantum eigensolver (VQE) algorithm implementation",
      "Cloud QPU backend integration (IBM Quantum, Rigetti, IonQ)",
      "Proof-of-quantum-advantage feasibility whitepaper",
    ],
    timeline: "10 – 16 weeks",
    tech: ["Qiskit", "Pennylane", "TensorFlow Quantum", "Cirq", "Python"],
    caseSnippet:
      "Solved high-density maritime vessel routing with 22% reduced fuel consumption in logistics pilot.",
  },
  {
    id: "edge-ai",
    slug: "edge-ai",
    name: "Edge AI & Embedded Intelligence",
    tag: "Sub-Watt Compute",
    icon: Server,
    headline:
      "Sub-watt computer vision, sensor fusion, and predictive maintenance on embedded hardware.",
    whatWeDo:
      "We compress deep neural networks via INT8 quantization, weight pruning, and knowledge distillation to run locally on NVIDIA Jetson, Raspberry Pi, and ARM microcontrollers without cloud connectivity.",
    architectureNotes:
      "Camera & Sensor Input → INT8 TensorRT Engine → On-Device Inference → Local GPIO Trigger",
    deliverables: [
      "Hardware-optimized model weights (TensorRT, ONNX Runtime)",
      "Zero-latency anomaly detection running completely offline",
      "Over-the-air (OTA) secure model checkpoint update pipeline",
      "Thermal and battery endurance test certification",
    ],
    timeline: "8 – 14 weeks",
    tech: ["NVIDIA Jetson", "TensorRT", "ONNX", "C++", "Rust", "Embedded Linux"],
    caseSnippet:
      "Deployed real-time defect inspection at 120 frames per second on automated factory manufacturing line.",
  },
  {
    id: "synthetic-data",
    slug: "synthetic-data",
    name: "High-Fidelity Synthetic Data",
    tag: "Privacy & Simulation",
    icon: Database,
    headline:
      "Generate millions of privacy-safe, statistically identical data rows for rare scenario modeling.",
    whatWeDo:
      "We train generative diffusion and tabular copula models on sensitive medical and financial data to synthesize synthetic datasets that preserve all cross-feature correlations without leaking individual records.",
    architectureNotes:
      "Sensitive Training Data → Differential Privacy Filter → Diffusion Generator → Synthetic Data Output",
    deliverables: [
      "Custom generative tabular, image, or text synthesizer",
      "Differential privacy guarantee certification (ε < 1.0)",
      "Statistical fidelity and Jensen-Shannon divergence audit",
      "Regulatory compliance clearance for third-party sharing",
    ],
    timeline: "6 – 10 weeks",
    tech: ["CTGAN", "Diffusion Models", "PyTorch", "Pandas", "Scikit-learn"],
    caseSnippet:
      "Generated 10M synthetic health records enabling open research collaborations with zero HIPAA risk.",
  },
  {
    id: "sovereign-ai",
    slug: "sovereign-ai",
    name: "Sovereign AI & Private Air-Gaps",
    tag: "National & Enterprise Defense",
    icon: ShieldCheck,
    headline:
      "Fully air-gapped AI deployments compliant with national sovereignty and defense standards.",
    whatWeDo:
      "We deliver self-contained, turnkey private intelligence appliances that operate inside restricted on-premises data centers without internet access or external API calls.",
    architectureNotes:
      "Air-Gapped Data Center → Local Model Server → Private Vector Index → Encrypted User Interface",
    deliverables: [
      "Self-contained bare-metal or private OpenShift appliance",
      "Zero outbound network telemetry or third-party dependencies",
      "Encrypted model weights at rest (AES-256) and memory protection",
      "Data localization compliance report (DPDP Act, GDPR)",
    ],
    timeline: "10 – 20 weeks",
    tech: ["Bare Metal", "OpenShift", "Local Embeddings", "MinIO", "Keycloak"],
    caseSnippet:
      "Deployed sovereign intelligence engine within classified research facility with 100% air-gap compliance.",
  },
];

type TabType = "what-we-do" | "architecture" | "deliverables" | "timeline" | "tech" | "case";

export default function ServicesPage() {
  const [commandOpen, setCommandOpen] = React.useState(false);
  const [selectedServiceId, setSelectedServiceId] = React.useState("agentic-ai");
  const [activeTab, setActiveTab] = React.useState<TabType>("what-we-do");

  const current = ALL_SERVICES.find((s) => s.id === selectedServiceId) ?? ALL_SERVICES[0]!;

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors flex flex-col">
      <SiteNav onOpenCommandPalette={() => setCommandOpen(true)} />

      <main className="flex-1 space-y-16 py-12">
        {/* 1. Page Hero */}
        <section>
          <Container size="ultra">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--accent)]">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Production AI Engineering</span>
              </div>
              <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--text)]">
                Enterprise AI Solutions
              </h1>
              <p className="text-base sm:text-xl text-[var(--text-muted)] leading-relaxed">
                We engineer fault-tolerant, auditable, and sovereign intelligence systems designed
                to survive real-world enterprise production constraints.
              </p>
            </div>
          </Container>
        </section>

        {/* 2. Interactive Service Selector (Left Rail + 6-Tab Animated Right Panel) */}
        <section>
          <Container size="ultra">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Rail: 10 Services (Horizontal Scroll on Mobile, Vertical on Desktop) */}
              <div className="lg:col-span-4 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 gap-2">
                {ALL_SERVICES.map((s) => {
                  const Icon = s.icon;
                  const isSelected = selectedServiceId === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedServiceId(s.id)}
                      className={`flex items-center gap-3.5 p-3.5 rounded-xl text-left transition-all shrink-0 w-64 lg:w-full border ${
                        isSelected
                          ? "border-[var(--accent)] bg-[var(--bg-elev-1)] text-[var(--text)] shadow-[0_0_20px_rgba(34,211,238,0.15)]"
                          : "border-transparent bg-[var(--bg-elev-2)]/60 text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-elev-2)]"
                      }`}
                    >
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-lg border shrink-0 ${
                          isSelected
                            ? "border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent)]"
                            : "border-[var(--border)] bg-[var(--bg-elev-1)] text-[var(--text-muted)]"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="truncate">
                        <div className="font-semibold text-xs sm:text-sm truncate">{s.name}</div>
                        <div className="text-[10px] font-mono text-[var(--accent)] truncate">
                          {s.tag}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Panel: 6 Tabs */}
              <div className="lg:col-span-8 rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-6 sm:p-10 space-y-8">
                {/* Header */}
                <div className="space-y-2 border-b border-[var(--border)] pb-6">
                  <div className="flex items-center justify-between">
                    <Badge variant="cyan" size="sm">
                      {current.tag}
                    </Badge>
                    <span className="font-mono text-xs text-[var(--text-muted)]">
                      {current.timeline}
                    </span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text)]">
                    {current.name}
                  </h2>
                  <p className="text-sm text-[var(--text-muted)]">{current.headline}</p>
                </div>

                {/* 6 Tabs Controls */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-[var(--border)] text-xs font-mono">
                  {(
                    [
                      { id: "what-we-do", label: "What We Do" },
                      { id: "architecture", label: "Architecture" },
                      { id: "deliverables", label: "Deliverables" },
                      { id: "timeline", label: "Timeline" },
                      { id: "tech", label: "Tech Stack" },
                      { id: "case", label: "Case Study" },
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                        activeTab === tab.id
                          ? "bg-[var(--accent)]/15 text-[var(--accent)] font-semibold border border-[var(--accent)]/30"
                          : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-elev-2)]"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab 1: What We Do */}
                {activeTab === "what-we-do" && (
                  <div className="space-y-4">
                    <h3 className="font-display text-lg font-bold text-[var(--text)]">
                      Engineering Scope & Strategy
                    </h3>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                      {current.whatWeDo}
                    </p>
                    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4 text-xs font-mono text-[var(--accent)]">
                      Production Guarantee: SLA-backed response times, zero data leakage, and full
                      source code handover.
                    </div>
                  </div>
                )}

                {/* Tab 2: Architecture Diagram */}
                {activeTab === "architecture" && (
                  <div className="space-y-4">
                    <h3 className="font-display text-lg font-bold text-[var(--text)]">
                      Logical Architecture Flow
                    </h3>
                    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-6 space-y-4">
                      <div className="font-mono text-xs text-[var(--accent)]">
                        {current.architectureNotes}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-2">
                        <div className="p-3 rounded-lg bg-[var(--bg-elev-2)] border border-[var(--border)] text-center text-[11px] font-mono">
                          Client Ingress (TLS 1.3)
                        </div>
                        <div className="p-3 rounded-lg bg-[var(--bg-elev-2)] border border-[var(--border)] text-center text-[11px] font-mono">
                          Guardrail Filter
                        </div>
                        <div className="p-3 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/40 text-[var(--accent)] text-center text-[11px] font-mono font-bold">
                          Core Reasoning
                        </div>
                        <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800 text-emerald-300 text-center text-[11px] font-mono">
                          Verified Output
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 3: Deliverables */}
                {activeTab === "deliverables" && (
                  <div className="space-y-4">
                    <h3 className="font-display text-lg font-bold text-[var(--text)]">
                      Explicit Project Deliverables
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {current.deliverables.map((d, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-3 text-xs text-[var(--text-muted)]"
                        >
                          <CheckCircle2 className="h-4 w-4 text-[var(--accent)] shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 4: Timeline */}
                {activeTab === "timeline" && (
                  <div className="space-y-4">
                    <h3 className="font-display text-lg font-bold text-[var(--text)]">
                      Sprint Phasing & Milestones
                    </h3>
                    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5 space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-[var(--text)] font-semibold">Total Duration</span>
                        <span className="text-[var(--accent)]">{current.timeline}</span>
                      </div>
                      <div className="space-y-2 text-xs text-[var(--text-muted)]">
                        <div className="flex justify-between py-1 border-b border-[var(--border)]">
                          <span>Weeks 1–2: Discovery, Security Audit & Golden Benchmark</span>
                          <span className="font-mono text-[var(--accent)]">Phase 1</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-[var(--border)]">
                          <span>Weeks 3–8: Core Model Fine-Tuning & Integration DAG</span>
                          <span className="font-mono text-[var(--accent)]">Phase 2</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span>Final Weeks: Red-Teaming, Canary Rollout & Knowledge Handover</span>
                          <span className="font-mono text-emerald-400">Phase 3</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 5: Tech Stack */}
                {activeTab === "tech" && (
                  <div className="space-y-4">
                    <h3 className="font-display text-lg font-bold text-[var(--text)]">
                      Approved Enterprise Tooling
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {current.tech.map((t) => (
                        <div
                          key={t}
                          className="px-3.5 py-2 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-xs font-mono text-[var(--text)] flex items-center gap-2"
                        >
                          <Wrench className="h-3.5 w-3.5 text-[var(--accent)]" />
                          <span>{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 6: Case Study */}
                {activeTab === "case" && (
                  <div className="space-y-4">
                    <h3 className="font-display text-lg font-bold text-[var(--text)]">
                      Quantifiable Client Case
                    </h3>
                    <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6 space-y-2">
                      <div className="font-mono text-xs uppercase text-emerald-400 font-bold">
                        Verified Production Outcome
                      </div>
                      <p className="text-sm text-emerald-200 leading-relaxed font-medium">
                        {current.caseSnippet}
                      </p>
                    </div>
                  </div>
                )}

                {/* Action Bar */}
                <div className="pt-6 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-4">
                  <Button variant="primary" size="lg" asChild>
                    <Link href={`/hire-us?service=${current.slug}`}>
                      <span>Estimate This Project</span>
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>

                  <Link
                    href={`/services/${current.slug}`}
                    className="text-xs font-mono text-[var(--accent)] hover:underline"
                  >
                    View dedicated service specification →
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* 3. Engagement Models (Project / Retainer / Embedded Team) */}
        <section className="border-t border-[var(--border)] bg-[var(--bg-elev-1)]/30 py-16">
          <Container size="ultra">
            <div className="mb-10 space-y-2">
              <div className="text-xs font-mono uppercase text-[var(--accent)]">
                Flexible Commercial Models
              </div>
              <h2 className="font-display text-3xl font-bold text-[var(--text)]">
                Engagement Structures
              </h2>
              <p className="text-sm text-[var(--text-muted)]">
                Choose the optimal working model for your internal engineering roadmap.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-8 space-y-4">
                <div className="font-mono text-xs text-[var(--accent)] font-semibold">Model 01</div>
                <h3 className="font-display text-xl font-bold text-[var(--text)]">
                  Fixed-Scope Project
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Best for defined features, legacy modernizations, or standalone LLM pipelines.
                  Fixed price, milestone deliverables, guaranteed completion dates.
                </p>
                <div className="text-xs font-mono text-[var(--text)] pt-2 border-t border-[var(--border)]">
                  Milestone-based invoicing · 6 to 20 weeks
                </div>
              </div>

              <div className="rounded-2xl border border-[var(--accent)]/40 bg-[var(--bg-elev-1)] p-8 space-y-4 shadow-[0_0_25px_rgba(34,211,238,0.1)]">
                <div className="font-mono text-xs text-[var(--accent)] font-semibold">
                  Model 02 · Recommended
                </div>
                <h3 className="font-display text-xl font-bold text-[var(--text)]">
                  Dedicated Monthly Capacity
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Continuous engineering and fine-tuning capacity. Monthly retainer with dedicated
                  researchers, GPU allocations, and weekly release sprints.
                </p>
                <div className="text-xs font-mono text-[var(--accent)] pt-2 border-t border-[var(--border)]">
                  Predictable monthly budget · Cancel with 30-day notice
                </div>
              </div>

              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-8 space-y-4">
                <div className="font-mono text-xs text-[var(--accent)] font-semibold">Model 03</div>
                <h3 className="font-display text-xl font-bold text-[var(--text)]">
                  Embedded AI Squad
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  A high-velocity squad of Softcapphyjas research scientists and platform architects
                  embedded directly into your engineering standups and Slack channels.
                </p>
                <div className="text-xs font-mono text-[var(--text)] pt-2 border-t border-[var(--border)]">
                  Full team integration · Quarterly commitments
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* 4. Security & Compliance Strip */}
        <section className="py-8 bg-[var(--bg-elev-1)]/80 border-y border-[var(--border)]">
          <Container size="ultra">
            <div className="flex flex-wrap items-center justify-around gap-6 text-xs font-mono text-[var(--text-muted)]">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-[var(--accent)]" />
                <span>DPDP & GDPR Data Localization Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-[var(--accent)]" />
                <span>Private VPC & Air-Gapped Deployments</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCheck className="h-4 w-4 text-[var(--accent)]" />
                <span>Cryptographically Signed Audit Telemetry</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[var(--accent)]" />
                <span>Zero Training On Client Data</span>
              </div>
            </div>
          </Container>
        </section>

        {/* 5. FAQ Accordion */}
        <section className="space-y-6">
          <Container size="standard">
            <div className="text-center mb-10 space-y-2">
              <div className="text-xs font-mono uppercase text-[var(--accent)]">
                Frequently Asked Questions
              </div>
              <h2 className="font-display text-3xl font-bold text-[var(--text)]">
                Enterprise AI FAQs
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              <AccordionItem
                value="faq-1"
                className="rounded-xl border border-[var(--border)] bg-[var(--bg-elev-1)] px-5 py-2"
              >
                <AccordionTrigger className="text-sm font-semibold text-[var(--text)] hover:text-[var(--accent)]">
                  How are project costs and timelines estimated?
                </AccordionTrigger>
                <AccordionContent className="text-xs text-[var(--text-muted)] leading-relaxed pt-2">
                  We use an objective algorithmic rules engine based on selected services, security
                  requirements, and model distillation complexity. You can test your parameters live
                  in our Project Builder at /hire-us to receive an instantaneous estimate range.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="faq-2"
                className="rounded-xl border border-[var(--border)] bg-[var(--bg-elev-1)] px-5 py-2"
              >
                <AccordionTrigger className="text-sm font-semibold text-[var(--text)] hover:text-[var(--accent)]">
                  Do you work with legacy on-premises databases and mainframes?
                </AccordionTrigger>
                <AccordionContent className="text-xs text-[var(--text-muted)] leading-relaxed pt-2">
                  Yes. Over 40% of our enterprise engagements involve interfacing modern vector
                  embeddings and LLM reasoning with legacy relational databases (Oracle, DB2,
                  PostgreSQL) and COBOL/Java mainframes with zero downtime.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="faq-3"
                className="rounded-xl border border-[var(--border)] bg-[var(--bg-elev-1)] px-5 py-2"
              >
                <AccordionTrigger className="text-sm font-semibold text-[var(--text)] hover:text-[var(--accent)]">
                  Can all models run fully air-gapped without internet access?
                </AccordionTrigger>
                <AccordionContent className="text-xs text-[var(--text-muted)] leading-relaxed pt-2">
                  Yes. Our Sovereign AI offering delivers fully offline appliances running quantized
                  open weights (e.g. Llama 3.3, DeepSeek) inside your private firewall with zero
                  telemetry leakage.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="faq-4"
                className="rounded-xl border border-[var(--border)] bg-[var(--bg-elev-1)] px-5 py-2"
              >
                <AccordionTrigger className="text-sm font-semibold text-[var(--text)] hover:text-[var(--accent)]">
                  Who owns the intellectual property and fine-tuned weights?
                </AccordionTrigger>
                <AccordionContent className="text-xs text-[var(--text-muted)] leading-relaxed pt-2">
                  You own 100% of all intellectual property, custom training datasets, synthesized
                  code, and fine-tuned adapter weights created during your engagement. Softcapphyjas
                  retains zero claim over your proprietary artifacts.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Container>
        </section>

        {/* 6. Bottom CTA */}
        <section>
          <Container size="standard">
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-8 sm:p-12 text-center space-y-6">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text)]">
                Ready to Architect Your Enterprise AI Solution?
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed">
                Use our multi-step Project Builder to select your services, configure your timeline,
                and receive a live estimate.
              </p>
              <Button variant="primary" size="lg" asChild>
                <Link href="/hire-us">
                  <span>Open Project Builder & Live Estimator</span>
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Link>
              </Button>
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />

      <CommandPalette
        open={commandOpen}
        onOpenChange={setCommandOpen}
        onToggleTheme={() => {
          const isLight = document.documentElement.classList.contains("light");
          if (isLight) {
            document.documentElement.classList.remove("light");
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
            document.documentElement.classList.add("light");
          }
        }}
      />
      <ConciergeChatbot />
    </div>
  );
}
