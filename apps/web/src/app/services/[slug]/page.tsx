import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  SiteNav,
  SiteFooter,
  Container,
  Button,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@softcapphyjas/ui";
import { ArrowRight, CheckCircle2, Wrench } from "lucide-react";
import { Metadata } from "next";

interface ServiceDetail {
  slug: string;
  name: string;
  category: string;
  headline: string;
  problem: string;
  solution: string;
  outcome: string;
  architectureDescription: string;
  deliverables: string[];
  timelineWeeks: string;
  techStack: string[];
  faqs: Array<{ q: string; a: string }>;
}

const SERVICE_CATALOG: Record<string, ServiceDetail> = {
  "agentic-ai": {
    slug: "agentic-ai",
    name: "Agentic AI Systems & Multi-Agent Workflows",
    category: "Autonomous Systems",
    headline: "Deterministic multi-agent execution engines for high-stakes enterprise processes.",
    problem:
      "Standard LLMs act as ungrounded text predictors that hallucinate actions and cannot reliably execute complex multi-step database mutations or API calls without human intervention.",
    solution:
      "We architect directed acyclic graph (DAG) agent systems with explicit roles: Planner, Tool Executor, and Reviewer. Every step is constrained by formal SMT solvers and policy checks before committing side effects.",
    outcome:
      "Automated 82% of clinical claims triage with 99.9% policy conformance and sub-second execution speed.",
    architectureDescription:
      "Task Ingress → Semantic Router → Planner DAG → Parallel Tool Call Execution → SMT Gate → Verified DB Mutation",
    deliverables: [
      "Planner, Tool-User, and Reviewer Agent DAG graphs",
      "Deterministic human-in-the-loop approval thresholds",
      "Comprehensive evaluation harness & red-team vulnerability report",
      "Production deployment runbooks & operations handover",
    ],
    timelineWeeks: "6 – 14 weeks",
    techStack: [
      "LangGraph",
      "Llama 3.3",
      "DeepSeek-R1",
      "Temporal",
      "PostgreSQL pgvector",
      "Python",
    ],
    faqs: [
      {
        q: "How do you prevent agent infinite loops?",
        a: "We enforce strict cycle detection, step limits, and cost budgets at the platform runtime layer.",
      },
      {
        q: "Can agents call our internal private APIs?",
        a: "Yes, via secure mutual-TLS authenticated tool proxies running inside your private VPC.",
      },
    ],
  },
  "custom-models": {
    slug: "custom-models",
    name: "Custom Models & LLM Engineering",
    category: "Model Adaptation",
    headline:
      "Proprietary domain foundation models fine-tuned with complete intellectual property protection.",
    problem:
      "Off-the-shelf closed LLMs suffer from high recurring API costs, unpredictable latency spikes, and strict data leakage concerns for enterprise trade secrets.",
    solution:
      "We fine-tune open foundation models (Llama, Mistral, DeepSeek) using parameter-efficient LoRA and full-rank distillation on your proprietary internal documentation and codebase.",
    outcome:
      "Reduced inference compute costs by 68% while exceeding GPT-4 accuracy on specialized domain legal and financial tasks.",
    architectureDescription:
      "Enterprise Corpus → Data Cleaning & Synthetic Generation → LoRA Fine-Tuning → FP8 vLLM Serving",
    deliverables: [
      "Domain-adapted LoRA and full-rank parameter fine-tuning",
      "Synthetic data generation & automated curation pipeline",
      "Quantization (FP8, INT4) for sub-50ms inference latency",
      "Continuous evaluation harness against golden benchmarks",
    ],
    timelineWeeks: "8 – 16 weeks",
    techStack: ["PyTorch", "vLLM", "DeepSpeed", "HuggingFace", "Triton", "NVIDIA H100"],
    faqs: [
      {
        q: "Does our data leave our cloud?",
        a: "No. All fine-tuning runs inside your designated AWS, GCP, Azure, or bare-metal environment.",
      },
      {
        q: "Who owns the fine-tuned weights?",
        a: "You own 100% of all checkpoint weights and custom training code.",
      },
    ],
  },
  "legacy-modernization": {
    slug: "legacy-modernization",
    name: "Legacy → AI Modernization",
    category: "Architecture Migration",
    headline:
      "Automated semantic extraction and refactoring of legacy codebases into modern cloud services.",
    problem:
      "Core banking, insurance, and manufacturing mainframes run on millions of lines of undocumented COBOL, Java, or C++, making feature iteration slow and high-risk.",
    solution:
      "We use AST-guided code intelligence to parse legacy monoliths into semantic dependency graphs, automatically synthesizing modern TypeScript or Go microservices with comprehensive unit tests.",
    outcome:
      "Migrated 2.4M lines of banking mainframe logic with 95%+ automated test coverage and zero production discrepancies.",
    architectureDescription:
      "Legacy Source Code → Tree-sitter AST Parser → Business Logic Graph → TypeScript Code Gen → Differential Testing",
    deliverables: [
      "AST-guided static analysis & semantic graph extraction",
      "Automated regression test generation with 95%+ coverage",
      "Phased strangler-fig migration roadmap",
      "Shadow traffic verification & performance benchmarking",
    ],
    timelineWeeks: "12 – 24 weeks",
    techStack: ["Tree-sitter", "TypeScript", "Go", "Docker", "Kubernetes", "Next.js"],
    faqs: [
      {
        q: "How do you ensure zero behavioral bugs?",
        a: "We run shadow traffic replay where legacy and modern systems execute in parallel, comparing outputs byte-for-byte.",
      },
      {
        q: "Can this handle batch mainframe jobs?",
        a: "Yes, converting batch scripts into modern distributed event-driven streams (Kafka/Temporal).",
      },
    ],
  },
  "ai-security": {
    slug: "ai-security",
    name: "Enterprise AI Security & Guardrails",
    category: "Cybersecurity & Safety",
    headline: "Real-time prompt injection defense, data leakage prevention, and model red-teaming.",
    problem:
      "Production LLMs deployed in customer-facing roles are susceptible to indirect prompt injection, sensitive data exfiltration, and adversarial jailbreaks.",
    solution:
      "We implement multi-layered security gates including token-level prompt guardrails, PII scrubbing, differential privacy filters, and automated continuous red-team scanning.",
    outcome:
      "Certified zero successful jailbreaks across 25,000 automated adversarial tests on client customer portal.",
    architectureDescription:
      "Ingress Traffic → Llama Guard 2 Inspection → PII Masking → LLM Execution → Output Safety Verification",
    deliverables: [
      "Real-time token guardrail proxy (Llama Guard, NeMo)",
      "Adversarial jailbreak resistance certification",
      "PII/PHI anonymization & cryptographically auditable telemetry",
      "OWASP LLM Top 10 compliance audit report",
    ],
    timelineWeeks: "4 – 8 weeks",
    techStack: ["Llama Guard 2", "Presidio", "Redis", "eBPF", "OpenTelemetry"],
    faqs: [
      {
        q: "What latency overhead does the guardrail add?",
        a: "Under 15 milliseconds by running a lightweight quantized classifier locally alongside your proxy.",
      },
      {
        q: "Does it comply with HIPAA and GDPR?",
        a: "Yes, automated PII/PHI redaction ensures no patient or personal data reaches external models.",
      },
    ],
  },
  mlops: {
    slug: "mlops",
    name: "MLOps & LLMOps Platform Engineering",
    category: "Infrastructure",
    headline:
      "Resilient GPU autoscaling, continuous model deployment, and real-time observability.",
    problem:
      "Data science teams struggle to transition prototype models to production, facing high GPU idle costs and lack of automated rollback and drift detection.",
    solution:
      "We deploy turnkey Kubernetes-native MLOps architectures with vLLM/KServe autoscaling, automated canary testing, and continuous drift monitoring.",
    outcome:
      "Cut model deployment cycles from 6 weeks to 18 minutes while reducing GPU compute spend by 44%.",
    architectureDescription:
      "Git Checkpoint → CI Test Suite → Model Registry → KServe GPU Pod Autoscaler → Prometheus Monitoring",
    deliverables: [
      "Automated CI/CD for model checkpoints & regression tests",
      "Distributed model serving with auto-scaling GPU workers",
      "Real-time drift detection, latency alarms & token cost metering",
      "Air-gapped artifact registry and private weights storage",
    ],
    timelineWeeks: "6 – 12 weeks",
    techStack: ["Kubernetes", "KServe", "Ray", "Prometheus", "Grafana", "MLflow"],
    faqs: [
      {
        q: "Can this run across hybrid cloud and on-prem?",
        a: "Yes, our Kubernetes operators deploy seamlessly across bare-metal, AWS, and GCP.",
      },
      {
        q: "How do you optimize GPU utilization?",
        a: "Through dynamic batching, paged attention, and automatic scale-to-zero during off-peak hours.",
      },
    ],
  },
  automation: {
    slug: "automation",
    name: "Enterprise Workflow Automation",
    category: "Process Intelligence",
    headline:
      "High-throughput multimodal document parsing and automated enterprise transaction execution.",
    problem:
      "Enterprises waste thousands of human labor hours manually extracting data from unstructured PDFs, invoices, and shipping bills into ERPs.",
    solution:
      "We build specialized vision-language extraction pipelines that parse complex tabular documents, validate schemas against ERP rules, and write back structured records.",
    outcome:
      "Processed 450,000 invoices with 99.4% accuracy, saving $1.2M annually in operational overhead.",
    architectureDescription:
      "Document Ingress → Multimodal OCR Parser → Cross-Validation Engine → ERP Connector",
    deliverables: [
      "Document ingestion pipeline handling PDF, scan, and unstructured text",
      "Human-in-the-loop review interface for edge cases",
      "Direct integration with SAP, Salesforce, and custom SQL databases",
      "SLA guarantee of <200ms document processing latency",
    ],
    timelineWeeks: "6 – 10 weeks",
    techStack: ["PaddleOCR", "Gemini 2.5", "Temporal", "PostgreSQL", "FastAPI"],
    faqs: [
      {
        q: "What happens when confidence is low?",
        a: "The document is automatically flagged and routed to a web review queue for single-click human sign-off.",
      },
      {
        q: "Can it handle handwritten forms?",
        a: "Yes, our vision models achieve 96%+ accuracy on handwritten cursive and medical prescriptions.",
      },
    ],
  },
  "quantum-hybrid": {
    slug: "quantum-hybrid",
    name: "Quantum-Classical Hybrid Algorithms",
    category: "Frontier Computing",
    headline: "Optimization, materials modeling, and risk simulation via hybrid QPU-GPU systems.",
    problem:
      "Combinatorial optimization problems in logistics and materials science face exponential classical runtime walls.",
    solution:
      "We formulate domain optimization problems as QUBO models, utilizing variational quantum eigensolvers and tensor networks to discover superior candidate solutions.",
    outcome:
      "Solved high-density maritime vessel routing with 22% reduced fuel consumption in global pilot.",
    architectureDescription:
      "Problem Matrix → QUBO Formulation → Quantum Circuit Execution → Classical Optimization Loop",
    deliverables: [
      "QUBO problem compilation and classical baseline benchmarking",
      "Variational quantum eigensolver (VQE) algorithm implementation",
      "Cloud QPU backend integration (IBM Quantum, Rigetti, IonQ)",
      "Proof-of-quantum-advantage feasibility whitepaper",
    ],
    timelineWeeks: "10 – 16 weeks",
    techStack: ["Qiskit", "Pennylane", "TensorFlow Quantum", "Cirq", "Python"],
    faqs: [
      {
        q: "Do we need our own quantum computer?",
        a: "No, we access leading quantum processors via secure cloud backends and classical GPU tensor emulators.",
      },
      {
        q: "Is quantum advantage achievable today?",
        a: "We provide truthful benchmarks: hybrid algorithms currently offer polynomial speedups on specific tensor and lattice topologies.",
      },
    ],
  },
  "edge-ai": {
    slug: "edge-ai",
    name: "Edge AI & Embedded Intelligence",
    category: "Embedded Computing",
    headline: "Sub-watt computer vision, sensor fusion, and real-time offline inference.",
    problem:
      "Cloud-dependent computer vision suffers from latency spikes, high cellular bandwidth bills, and complete failure during network drops.",
    solution:
      "We compress and quantize neural networks to execute directly on low-power ARM, Jetson, and microcontrollers with sub-10ms response times.",
    outcome:
      "Deployed real-time defect inspection running at 120 FPS on an automated assembly line with zero cloud connectivity.",
    architectureDescription:
      "Sensors/Camera → INT8 TensorRT Quantized Engine → Micro-Controller → Actuator Control",
    deliverables: [
      "Hardware-optimized model weights (TensorRT, ONNX Runtime)",
      "Zero-latency anomaly detection running completely offline",
      "Over-the-air (OTA) secure model checkpoint update pipeline",
      "Thermal and battery endurance test certification",
    ],
    timelineWeeks: "8 – 14 weeks",
    techStack: ["NVIDIA Jetson", "TensorRT", "ONNX", "C++", "Rust", "Embedded Linux"],
    faqs: [
      {
        q: "How small can the models be compressed?",
        a: "We routinely compress 1GB models down to 45MB with under 1.5% accuracy loss.",
      },
      {
        q: "How are models updated in the field?",
        a: "Via cryptographically signed, differential over-the-air (OTA) micro-updates.",
      },
    ],
  },
  "synthetic-data": {
    slug: "synthetic-data",
    name: "High-Fidelity Synthetic Data Generation",
    category: "Data Privacy & Augmentation",
    headline: "Statistically identical, privacy-safe synthetic datasets for rare event training.",
    problem:
      "Data scarcity in rare disease diagnostics and strict privacy regulations prevent enterprises from sharing or training models on customer data.",
    solution:
      "We build generative diffusion models and copula synthesizers that generate billions of realistic synthetic rows with provable differential privacy guarantees.",
    outcome:
      "Synthesized 10M synthetic health records enabling open research collaborations with zero HIPAA violation risk.",
    architectureDescription:
      "Proprietary Dataset → Differential Privacy Engine → Diffusion Synthesizer → Verified Synthetic Data",
    deliverables: [
      "Custom generative tabular, image, or text synthesizer",
      "Differential privacy guarantee certification (ε < 1.0)",
      "Statistical fidelity and Jensen-Shannon divergence audit",
      "Regulatory compliance clearance for third-party sharing",
    ],
    timelineWeeks: "6 – 10 weeks",
    techStack: ["CTGAN", "Diffusion Models", "PyTorch", "Pandas", "Scikit-learn"],
    faqs: [
      {
        q: "Can individual identities be re-engineered from the synthetic data?",
        a: "No, our mathematical differential privacy proofs guarantee non-reidentifiability.",
      },
      {
        q: "Does the synthetic data maintain complex correlations?",
        a: "Yes, our diffusion copula models preserve non-linear multi-variable interactions with 98%+ fidelity.",
      },
    ],
  },
  "sovereign-ai": {
    slug: "sovereign-ai",
    name: "Sovereign AI & Private Air-Gaps",
    category: "Defense & Critical Infrastructure",
    headline:
      "Complete air-gapped on-premises intelligence appliances with zero external telemetry.",
    problem:
      "National defense, banking, and critical infrastructure cannot permit data or model queries to leave secure geographical or physical perimeter boundaries.",
    solution:
      "We deploy turnkey bare-metal intelligence clusters running quantized models, local vector stores, and private web interfaces without external internet connections.",
    outcome:
      "Deployed private intelligence system within classified facility with 100% air-gap compliance and zero outbound packets.",
    architectureDescription:
      "Physical Air-Gap → Bare Metal GPU Server → Private Embeddings → Local Web UI",
    deliverables: [
      "Self-contained bare-metal or private OpenShift appliance",
      "Zero outbound network telemetry or third-party dependencies",
      "Encrypted model weights at rest (AES-256) and memory protection",
      "Data localization compliance report (DPDP Act, GDPR)",
    ],
    timelineWeeks: "10 – 20 weeks",
    techStack: ["Bare Metal", "OpenShift", "Local Embeddings", "MinIO", "Keycloak"],
    faqs: [
      {
        q: "Can we inspect the complete source code?",
        a: "Yes, full source code and SBOM (Software Bill of Materials) are provided for third-party security audits.",
      },
      {
        q: "How are security patches delivered without internet?",
        a: "Via signed physical media with cryptographic integrity verification.",
      },
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(SERVICE_CATALOG).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICE_CATALOG[slug];
  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.name} | Softcapphyjas Enterprise AI`,
    description: service.headline,
    openGraph: {
      title: service.name,
      description: service.headline,
      images: [
        `/api/og?title=${encodeURIComponent(service.name)}&domain=services&badge=Enterprise+Service`,
      ],
    },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICE_CATALOG[slug];

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors flex flex-col">
      <SiteNav />

      <main className="flex-1 space-y-16 py-12">
        <Container size="ultra">
          {/* Header */}
          <div className="space-y-6 max-w-4xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
              <Link href="/services" className="hover:text-[var(--text)]">
                Services
              </Link>
              <span>/</span>
              <span className="text-[var(--accent)]">{service.category}</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/30">
              <span>{service.category}</span>
              <span>·</span>
              <span>{service.timelineWeeks}</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--text)]">
              {service.name}
            </h1>

            <p className="text-lg sm:text-xl font-medium text-[var(--accent)] leading-relaxed">
              {service.headline}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button variant="primary" size="lg" asChild>
                <Link href={`/hire-us?service=${service.slug}`}>
                  <span>Estimate This Project</span>
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/services">View All 10 Services</Link>
              </Button>
            </div>
          </div>
        </Container>

        {/* Problem, Solution, Outcome Grid */}
        <section className="border-y border-[var(--border)] bg-[var(--bg-elev-1)]/40 py-12">
          <Container size="ultra">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-6 space-y-3">
                <div className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
                  01. The Challenge
                </div>
                <h3 className="font-display text-lg font-bold text-[var(--text)]">
                  Production Problem
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {service.problem}
                </p>
              </div>

              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-6 space-y-3">
                <div className="font-mono text-xs uppercase tracking-wider text-[var(--accent)]">
                  02. The Architecture
                </div>
                <h3 className="font-display text-lg font-bold text-[var(--text)]">
                  Engineered Solution
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {service.solution}
                </p>
              </div>

              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6 space-y-3">
                <div className="font-mono text-xs uppercase tracking-wider text-emerald-400">
                  03. The Result
                </div>
                <h3 className="font-display text-lg font-bold text-emerald-300">
                  Verified Outcome
                </h3>
                <p className="text-xs text-emerald-200/90 leading-relaxed font-medium">
                  {service.outcome}
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Architecture & Deliverables */}
        <section className="space-y-6">
          <Container size="ultra">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Architecture Blueprint */}
              <div className="lg:col-span-7 rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-8 space-y-4">
                <div className="text-xs font-mono uppercase text-[var(--accent)]">
                  Blueprint Flow
                </div>
                <h2 className="font-display text-2xl font-bold text-[var(--text)]">
                  System Architecture
                </h2>
                <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5 text-xs font-mono text-[var(--accent)]">
                  {service.architectureDescription}
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Every stage is instrumented with continuous telemetry, SLA monitoring, and
                  cryptographic proof verification before data commits to storage.
                </p>
              </div>

              {/* Deliverables Checklist */}
              <div className="lg:col-span-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-8 space-y-4">
                <div className="text-xs font-mono uppercase text-[var(--accent)]">
                  Contractual Scope
                </div>
                <h2 className="font-display text-2xl font-bold text-[var(--text)]">Deliverables</h2>
                <div className="space-y-3 pt-2">
                  {service.deliverables.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-[var(--text)]">
                      <CheckCircle2 className="h-4 w-4 text-[var(--accent)] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Tech Stack */}
        <section className="space-y-6">
          <Container size="ultra">
            <div className="mb-4 space-y-1">
              <div className="text-xs font-mono uppercase text-[var(--accent)]">
                Tooling & Infrastructure
              </div>
              <h2 className="font-display text-2xl font-bold text-[var(--text)]">
                Technology Stack
              </h2>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {service.techStack.map((tech) => (
                <div
                  key={tech}
                  className="px-4 py-2 rounded-xl bg-[var(--bg-elev-1)] border border-[var(--border)] text-xs font-mono text-[var(--text)] flex items-center gap-2"
                >
                  <Wrench className="h-3.5 w-3.5 text-[var(--accent)]" />
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* FAQs */}
        <section className="space-y-6">
          <Container size="standard">
            <div className="text-center mb-8 space-y-1">
              <div className="text-xs font-mono uppercase text-[var(--accent)]">
                Frequently Asked Questions
              </div>
              <h2 className="font-display text-2xl font-bold text-[var(--text)]">
                Questions About {service.name}
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {service.faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="rounded-xl border border-[var(--border)] bg-[var(--bg-elev-1)] px-5 py-2"
                >
                  <AccordionTrigger className="text-sm font-semibold text-[var(--text)] hover:text-[var(--accent)]">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-[var(--text-muted)] leading-relaxed pt-2">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Container>
        </section>

        {/* Bottom CTA with prefill link */}
        <section>
          <Container size="standard">
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-8 sm:p-12 text-center space-y-6">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text)]">
                Ready to Start Your {service.name} Engagement?
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed">
                Receive an immediate algorithmic low–high budget and timeline estimate in our
                Project Builder.
              </p>
              <Button variant="primary" size="lg" asChild>
                <Link href={`/hire-us?service=${service.slug}`}>
                  <span>Configure {service.name} in Project Builder</span>
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Link>
              </Button>
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
