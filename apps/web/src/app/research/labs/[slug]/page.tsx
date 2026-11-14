import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteNav, SiteFooter, Container, Button } from "@softcapphyjas/ui";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";

interface LabRecord {
  slug: string;
  name: string;
  code: string;
  badgeText: string;
  color: string;
  tagline: string;
  overview: string;
  infrastructure: Array<{ name: string; specs: string }>;
  directions: Array<{ title: string; desc: string }>;
  roadmap: Array<{
    quarter: string;
    milestone: string;
    status: "COMPLETED" | "IN_PROGRESS" | "PLANNED";
  }>;
  papers: Array<{ title: string; slug: string; venue: string }>;
}

const LABS_DATA: Record<string, LabRecord> = {
  "quantum-classical": {
    slug: "quantum-classical",
    name: "Quantum-Classical Hybrid ML Lab",
    code: "Q-CHML · Facility 01",
    badgeText: "Hardware-Integrated Computing",
    color: "#22D3EE",
    tagline:
      "Bridging superconducting quantum processors with continuous tensor network architectures.",
    overview:
      "The Quantum-Classical Hybrid Machine Learning Lab interfaces state-of-the-art superconducting and trapped-ion quantum processors with high-performance GPU clusters. We invent parameterized quantum circuits (PQCs), variational eigensolvers (VQE), and matrix product states (MPS) to simulate strongly-correlated electron physics and novel room-temperature superconducting materials.",
    infrastructure: [
      {
        name: "Superconducting QPU Access",
        specs: "127-qubit cloud backends with native CNOT and CZ gates",
      },
      { name: "Simulation Cluster", specs: "8× NVIDIA H100 80GB SXM5 GPU nodes with NVLink 4.0" },
      {
        name: "Tensor Network Compiler",
        specs: "Proprietary JAX/C++ contraction optimizer with GPU acceleration",
      },
      {
        name: "Cryogenic Interface",
        specs: "Sub-20mK microwave calibration telemetry and error suppression",
      },
    ],
    directions: [
      {
        title: "Variational Quantum Eigensolvers for Lattice Models",
        desc: "Constructing fermionic ansatzes to bypass classical sign problems in 2D Hubbard and Heisenberg spin models.",
      },
      {
        title: "Quantum Kernel Methods & Feature Spaces",
        desc: "Embedding classical high-dimensional bioinformatics vectors into non-classical Hilbert state representations.",
      },
      {
        title: "Error Mitigation & Zero-Noise Extrapolation",
        desc: "Algorithmic noise suppression that scales NISQ device utility without full fault-tolerant code overhead.",
      },
    ],
    roadmap: [
      {
        quarter: "Q1 2026",
        milestone: "16-qubit VQE Hubbard lattice ground-state benchmark completed",
        status: "COMPLETED",
      },
      {
        quarter: "Q2 2026",
        milestone: "Release open-source Matrix Product State simulator (q-tensor-kit)",
        status: "IN_PROGRESS",
      },
      {
        quarter: "Q3 2026",
        milestone: "Cryogenic hybrid FPGA-QPU co-processor prototype testing",
        status: "PLANNED",
      },
      {
        quarter: "Q4 2026",
        milestone: "Room-temperature superconducting candidate synthesis with partner lab",
        status: "PLANNED",
      },
    ],
    papers: [
      {
        title: "Hybrid variational quantum kernels for strongly-correlated fermion systems",
        slug: "hybrid-variational-quantum-kernels",
        venue: "Physical Review X (2025)",
      },
    ],
  },
  "neuro-symbolic": {
    slug: "neuro-symbolic",
    name: "Neuro-Symbolic AI Lab",
    code: "NS-AIL · Facility 02",
    badgeText: "Provably Safe Reasoning",
    color: "#8B5CF6",
    tagline: "Binding high-capacity neural perception with first-order logic and SMT verification.",
    overview:
      "The Neuro-Symbolic AI Lab addresses the critical vulnerability of black-box deep learning: ungrounded hallucinations under distributional shift. We design differentiable logic relaxations, knowledge graph theorem embeddings, and hardware-accelerated SAT/SMT verification layers to make artificial intelligence 100% mathematically auditable in critical hospital, aerospace, and banking operations.",
    infrastructure: [
      {
        name: "Formal Verification Engine",
        specs: "Clustered Z3, CVC5, and Lean 4 automated theorem proving nodes",
      },
      {
        name: "Knowledge Graph Store",
        specs: "Distributed RDF/SPARQL knowledge base with 2.4B medical and regulatory triples",
      },
      {
        name: "Logic Accelerator",
        specs: "Custom continuous relaxation SAT solver running on GPU tensor cores",
      },
      {
        name: "Safety Gate Gateway",
        specs: "Sub-5ms policy enforcement proxy screening 100% of LLM agent tool calls",
      },
    ],
    directions: [
      {
        title: "Differentiable First-Order Logic",
        desc: "Formulating smooth continuous bounds for boolean and first-order predicates to allow end-to-end backpropagation.",
      },
      {
        title: "Medical & Financial SMT Verification Gates",
        desc: "Hard constraint enforcement that mathematically guarantees zero contraindicated drug or trading recommendations.",
      },
      {
        title: "Automated Formal Theorem Synthesis",
        desc: "Guiding Lean 4 interactive proof assistants with neural value functions to synthesize verified math proofs.",
      },
    ],
    roadmap: [
      {
        quarter: "Q1 2026",
        milestone: "Clinical trial triage verified across 8 hospital partner cohorts",
        status: "COMPLETED",
      },
      {
        quarter: "Q2 2026",
        milestone: "Release neurosym v2.0 with native PyTorch autograd integration",
        status: "IN_PROGRESS",
      },
      {
        quarter: "Q3 2026",
        milestone: "Autonomous aerospace flight control loop verification certificate",
        status: "PLANNED",
      },
      {
        quarter: "Q4 2026",
        milestone: "Full formal verification of Synapse conversational core policies",
        status: "PLANNED",
      },
    ],
    papers: [
      {
        title: "Neuro-symbolic triage for ICU clinical pathways under high uncertainty",
        slug: "neuro-symbolic-triage-icu",
        venue: "Nature Digital Medicine (2026)",
      },
      {
        title: "Monte Carlo tree search over Lean 4 proof graphs for automated lemma synthesis",
        slug: "monte-carlo-tree-search-lean4",
        venue: "arXiv preprint (2025)",
      },
    ],
  },
};

export async function generateStaticParams() {
  return [{ slug: "quantum-classical" }, { slug: "neuro-symbolic" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lab = LABS_DATA[slug];
  if (!lab) return { title: "Lab Not Found" };

  return {
    title: `${lab.name} | Softcapphyjas Research`,
    description: lab.overview,
    openGraph: {
      title: lab.name,
      description: lab.overview,
      images: [`/api/og?title=${encodeURIComponent(lab.name)}&domain=labs&badge=Frontier+Lab`],
    },
  };
}

export default async function LabDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lab = LABS_DATA[slug];

  if (!lab) {
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
              <Link href="/research" className="hover:text-[var(--text)]">
                Research
              </Link>
              <span>/</span>
              <Link href="/research#labs" className="hover:text-[var(--text)]">
                Frontier Labs
              </Link>
              <span>/</span>
              <span className="text-[var(--accent)]">{lab.code}</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-[var(--bg-elev-2)] border border-[var(--border)] text-[var(--text-muted)]">
              <span className="w-2 h-2 rounded-full" style={{ background: lab.color }} />
              <span>{lab.badgeText}</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--text)]">
              {lab.name}
            </h1>

            <p className="text-lg sm:text-xl font-medium text-[var(--accent)] leading-relaxed">
              {lab.tagline}
            </p>

            <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
              {lab.overview}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button variant="primary" size="lg" asChild>
                <Link href="/contact?topic=research">
                  <span>Collaborate With This Lab</span>
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/research#papers">View Publications</Link>
              </Button>
            </div>
          </div>
        </Container>

        {/* Infrastructure & Computing Rig */}
        <section className="border-y border-[var(--border)] bg-[var(--bg-elev-1)]/40 py-12">
          <Container size="ultra">
            <div className="mb-6 space-y-1">
              <div className="text-xs font-mono uppercase text-[var(--accent)]">Lab Facilities</div>
              <h2 className="font-display text-2xl font-bold text-[var(--text)]">
                Computing & Experimental Rig
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {lab.infrastructure.map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-5 space-y-2"
                >
                  <div className="font-mono text-xs text-[var(--accent)] font-semibold">
                    Tier 0{i + 1}
                  </div>
                  <div className="font-bold text-sm text-[var(--text)]">{item.name}</div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">{item.specs}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Core Research Directions */}
        <section className="space-y-6">
          <Container size="ultra">
            <div className="mb-6 space-y-1">
              <div className="text-xs font-mono uppercase text-[var(--accent)]">
                Active Programs
              </div>
              <h2 className="font-display text-2xl font-bold text-[var(--text)]">
                Core Research Directions
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {lab.directions.map((d, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-7 space-y-3 hover:border-[var(--accent)]/50 transition-colors"
                >
                  <div className="h-9 w-9 rounded-xl bg-[var(--bg-elev-2)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] font-mono text-xs font-bold">
                    0{i + 1}
                  </div>
                  <h3 className="font-display text-lg font-bold text-[var(--text)]">{d.title}</h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">{d.desc}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Lab Roadmap (Q1 - Q4) */}
        <section className="space-y-6">
          <Container size="ultra">
            <div className="mb-6 space-y-1">
              <div className="text-xs font-mono uppercase text-[var(--accent)]">Execution Plan</div>
              <h2 className="font-display text-2xl font-bold text-[var(--text)]">
                2026 Facility Roadmap
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {lab.roadmap.map((m, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-5 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[var(--accent)]">
                      {m.quarter}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider ${
                        m.status === "COMPLETED"
                          ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                          : m.status === "IN_PROGRESS"
                            ? "bg-cyan-950 text-cyan-300 border border-cyan-800 animate-pulse"
                            : "bg-[var(--bg-elev-2)] text-[var(--text-muted)] border border-[var(--border)]"
                      }`}
                    >
                      {m.status.replace("_", " ")}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text)] leading-relaxed font-medium">
                    {m.milestone}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Publications from this Lab */}
        <section className="space-y-6">
          <Container size="ultra">
            <div className="mb-6 space-y-1">
              <div className="text-xs font-mono uppercase text-[var(--accent)]">
                Peer-Reviewed Output
              </div>
              <h2 className="font-display text-2xl font-bold text-[var(--text)]">
                Publications from this Lab
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {lab.papers.map((p, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-6 space-y-3 hover:border-[var(--accent)]/50 transition-colors flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-[var(--text-muted)]">
                      {p.venue}
                    </span>
                    <h4 className="font-display text-base font-bold text-[var(--text)] leading-snug">
                      {p.title}
                    </h4>
                  </div>
                  <Link
                    href={`/research/papers/${p.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--accent)] hover:underline"
                  >
                    <span>Read Paper & Download PDF</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
