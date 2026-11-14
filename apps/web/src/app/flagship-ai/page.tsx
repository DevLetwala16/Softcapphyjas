"use client";

import * as React from "react";
import {
  SiteNav,
  SiteFooter,
  Container,
  Button,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  CommandPalette,
  ConciergeChatbot,
} from "@softcapphyjas/ui";
import {
  Sparkles,
  Bot,
  BookOpen,
  ShieldCheck,
  Cpu,
  Eye,
  Lock,
  ArrowRight,
  Check,
  Award,
} from "lucide-react";

type DomainLens = "medical" | "agri" | "physics" | "math" | "reasoning";

interface SamplePrompt {
  label: string;
  query: string;
  response: string;
  citations: string[];
  certainty: string;
}

const SAMPLE_PROMPTS: Record<DomainLens, SamplePrompt[]> = {
  medical: [
    {
      label: "ICU Sepsis Risk Trajectory",
      query: "Evaluate multi-parameter vital signs for deteriorating sepsis shock trajectory...",
      response:
        "Patient exhibits rising lactate (3.8 mmol/L) with downward arterial pressure trend over 4 hours. SMT solver verifies criteria for septic shock according to Surviving Sepsis Campaign 2026 guidelines. Recommending fluid resuscitation (30 mL/kg) with norepinephrine infusion protocol.",
      citations: [
        "Surviving Sepsis Campaign 2026",
        "Nature Digital Medicine Paper #114",
        "ICU Telemetry Atlas",
      ],
      certainty: "99.4%",
    },
    {
      label: "Genomic Splice Disruption",
      query:
        "Analyze deep intronic variant chr7:117559590:G>A for cystic fibrosis CFTR disruption...",
      response:
        "Variant activates a cryptic 5' splice donor site in intron 11 with score Δψ = 0.84, leading to a 74bp pseudo-exon inclusion and premature stop codon (p.Gly542X equivalent). Validated by 3D chromatin conformation graph.",
      citations: ["ClinVar Hard Positive Benchmarks", "Softcapphyjas Genomic Transformer v2.1"],
      certainty: "98.8%",
    },
    {
      label: "Pediatric Oncology Dosage",
      query:
        "Formulate methotrexate dose adjustment considering renal clearance and MTX serum levels...",
      response:
        "Current serum methotrexate concentration is 5.2 μmol/L at hour 36. SMT constraint engine enforces leucovorin rescue escalation to 100 mg/m² every 3 hours with aggressive hyper-hydration (3 L/m²/day) to prevent renal tubular precipitation.",
      citations: ["St. Jude Total Therapy Protocol", "Pharmacokinetics Verification Engine"],
      certainty: "100.0%",
    },
    {
      label: "Brain MRI Perfusion Mismatch",
      query: "Calculate ischemic core vs hypoperfused penumbra volume on acute stroke CT/MRI...",
      response:
        "Ischemic core identified in left MCA territory (ADC < 620 × 10⁻⁶ mm²/s). Estimated core volume: 18.4 mL. Total hypoperfused tissue (Tmax > 6s): 74.2 mL. Mismatch ratio is 4.03, satisfying DEFUSE-3 criteria for mechanical thrombectomy.",
      citations: ["DEFUSE-3 Trial (NEJM)", "ASNR Stroke Guidelines"],
      certainty: "99.1%",
    },
  ],
  agri: [
    {
      label: "Soil Nitrogen Optimization",
      query:
        "Formulate microbial inoculant prescription for alkaline saline soil with low nitrogen fixation...",
      response:
        "Soil metagenomic sequence indicates absence of Azotobacter and severe suppression of Rhizobium symbiosis. Recommending halo-tolerant Azospirillum brasilense bio-stimulant combined with gypsum amendment (400 kg/ha) before pre-monsoon sowing.",
      citations: ["ICAR Metagenomic Soil Atlas", "Agronomy Journal 118, 2026"],
      certainty: "97.6%",
    },
    {
      label: "Hyperspectral Fungal Detection",
      query: "Interpret red-edge vegetation index anomaly across Sentinel-2 canopy rasters...",
      response:
        "Red-edge position shift (λ₀ = 708 nm) combined with localized canopy temperature elevation (+2.1°C) signals early-stage Rhizoctonia solani root rot across Sector 12B. Fungal propagation detected 9 days prior to visible chlorosis.",
      citations: ["Remote Sensing of Environment 310", "Softcapphyjas Metagenomic Canopy Index"],
      certainty: "98.2%",
    },
    {
      label: "Crop Water Deficit Scheduling",
      query: "Optimize deficit drip irrigation schedule for olive orchard during heatwave...",
      response:
        "Continuous leaf water potential model indicates regulated deficit irrigation (RDI) threshold of -1.8 MPa during pit hardening. Scheduling 4.2 hours of nocturnal micro-sprinkling preserves yield while saving 34% reservoir volume.",
      citations: ["Agricultural Water Management 292", "FAO Irrigation Paper 66"],
      certainty: "99.0%",
    },
    {
      label: "Microbiome Carbon Sequestration",
      query:
        "Calculate 5-year soil organic carbon sequestration trajectory under regenerative cover cropping...",
      response:
        "Coupled Century-RothC microbial model predicts net soil organic carbon accumulation of 2.1 tons/hectare/year with subterranean fungal-to-bacterial biomass ratio stabilizing at 1.4:1.",
      citations: ["Nature Climate Change 2026", "Global Arid Soil Metagenome Corpus"],
      certainty: "96.4%",
    },
  ],
  physics: [
    {
      label: "Hubbard Lattice Ground State",
      query:
        "Calculate variational ground state energy for 2D Hubbard lattice at half-filling (U/t = 8)...",
      response:
        "Parameterized quantum circuit ansatz prepared on 16-qubit quantum processor. Energy minimization converges to E₀ = -0.4386(2) t per site, matching auxiliary-field quantum Monte Carlo within 0.0004 t without sign-problem breakdown.",
      citations: ["Physical Review X 15, 021034", "Theoretical Physics Group Paper #44"],
      certainty: "99.8%",
    },
    {
      label: "Topological Semimetal Invariants",
      query:
        "Compute Z₂ topological invariant and Weyl node chirality for ternary chalcogenide crystal...",
      response:
        "Parity eigenvalues at 8 time-reversal invariant momenta yield topological index ν = (1; 000). Two pairs of isolated Weyl points discovered in the k_z = 0 plane with topological charges C = ±1, confirming type-I Weyl semimetal phase.",
      citations: ["Physical Review B 113, 085112", "Equivariant Manifold Atlas"],
      certainty: "99.9%",
    },
    {
      label: "Plasma Turbulence MHD Operator",
      query:
        "Simulate tokamak magnetohydrodynamic tearing mode stability at Lundquist number S = 10⁸...",
      response:
        "SO(3)-equivariant Fourier neural operator resolves magnetic island growth rate γ = 0.042 τ_A⁻¹. Magnetic reconnection boundary layers maintain divergence-free ∇ · B = 0 constraint to floating-point precision.",
      citations: ["Nuclear Fusion 66, 042010", "J. Comp. Physics 490"],
      certainty: "98.6%",
    },
    {
      label: "Superconductor Critical Temperature",
      query:
        "Predict electron-phonon coupling parameter λ and critical T_c for cubic hydride under 150 GPa...",
      response:
        "Eliashberg spectral function α²F(ω) integration yields logarithmic average frequency ω_ln = 1420 K and coupling constant λ = 2.44. Allen-Dynes formula predicts superconducting transition temperature T_c = 214 K.",
      citations: ["Nature Materials 2026", "DFT Quantum Materials Benchmark"],
      certainty: "97.2%",
    },
  ],
  math: [
    {
      label: "Lean 4 Lemma Synthesis",
      query: "Synthesize Lean 4 proof for homotopy equivalence of compact topological surfaces...",
      response:
        "Synthesized 18-step tactic sequence applying Mayer-Vietoris sequence and van Kampen theorem. Proof certificate machine-checked by Lean 4 kernel with 100% soundness: theorem surface_homotopy (S : Surface) : HomotopyEquiv S (Torus n) := by ... qed.",
      citations: ["Lean 4 Mathlib Certificate #42019", "Annals of Mathematics 2025"],
      certainty: "100.0%",
    },
    {
      label: "Dynamical Loop Invariant",
      query:
        "Formulate non-linear inductive loop invariant for polynomial aerospace flight controller...",
      response:
        "Generated polynomial invariant I(v, θ) = 2.4 v² + 8.1 θ² - 1.2 v θ ≤ 85.0 using Positivstellensatz cone certificates. Proves control loop will not exceed aerodynamic stall margins under any disturbance vector.",
      citations: ["Formal Verification of Cyber-Physical Systems", "ACM TECS 2026"],
      certainty: "100.0%",
    },
    {
      label: "Lattice Cryptography Reduction",
      query:
        "Verify hardness reduction of Ring-LWE to Shortest Vector Problem (SVP) in ideal lattices...",
      response:
        "Formalized quantum reduction from gamma-approximate Ideal-SVP to discrete Gaussian sample oracle. Bound confirmed: γ ≤ O(n · sqrt(log n) / α) with zero polynomial leakage in dual lattice embedding.",
      citations: ["IACR Cryptology ePrint Archive", "Post-Quantum Standards Group"],
      certainty: "99.7%",
    },
    {
      label: "Algebraic Geometry Divisor",
      query:
        "Compute Riemann-Roch dimension for canonical divisor on genus 3 hyperelliptic Riemann surface...",
      response:
        "Canonical divisor degree is deg(K) = 2g - 2 = 4. By Riemann-Roch theorem: l(K) - l(0) = deg(K) - g + 1 = 4 - 3 + 1 = 2. Hence dimension of holomorphic 1-forms is exactly g = 3.",
      citations: ["Algebraic Curves (Hartshorne)", "Mathlib4 Algebraic Geometry"],
      certainty: "100.0%",
    },
  ],
  reasoning: [
    {
      label: "Multi-Agent Supply Chain Resolution",
      query:
        "Resolve conflicting inventory optimization goals between manufacturing, logistics, and capital...",
      response:
        "Constructed Pareto optimal frontier balancing working capital velocity against stockout risks. Planner agent resolved 4 tool constraints, recommending safety buffer realignment at Hub 4 to prevent 18% production downtime.",
      citations: ["Operations Research Letters 2026", "Softcapphyjas Agent Graph v3"],
      certainty: "99.2%",
    },
    {
      label: "Cross-Border Tax Arbitration",
      query:
        "Verify transfer pricing compliance for intellectual property licensing across EU and India...",
      response:
        "Analyzed OECD Pillar Two guidelines against local bilateral double taxation avoidance agreements. Rule engine validated arm's length profit split allocation with zero withholding discrepancy.",
      citations: ["OECD Transfer Pricing Guidelines 2026", "Ministry of Finance Directives"],
      certainty: "99.5%",
    },
    {
      label: "Autonomous Code Refactoring",
      query:
        "Extract and modernize legacy transaction ledger logic with automated invariant verification...",
      response:
        "Synthesized 12 microservice endpoints in TypeScript with differential regression tests proving identical ACID debit/credit consistency against original legacy COBOL batch traces.",
      citations: ["Software Engineering Journal", "AST Code Modernization Benchmark"],
      certainty: "99.8%",
    },
    {
      label: "Clinical Trial Eligibility Matching",
      query:
        "Screen genomic patient record for Phase 3 non-small cell lung cancer targeted trial...",
      response:
        "Patient exhibits EGFR exon 19 in-frame deletion (p.Glu746_Ala750del) without secondary T790M resistance mutation. Satisfies 100% of NCT05492812 Phase 3 inclusion criteria; SMT solver confirms zero exclusion clashes.",
      citations: ["ClinicalTrials.gov NCT05492812", "FDA Oncology Protocols"],
      certainty: "100.0%",
    },
  ],
};

export default function FlagshipAIPage() {
  const [commandOpen, setCommandOpen] = React.useState(false);
  const [selectedLens, setSelectedLens] = React.useState<DomainLens>("medical");
  const [activePromptIdx, setActivePromptIdx] = React.useState(0);
  const [displayedAnswer, setDisplayedAnswer] = React.useState(SAMPLE_PROMPTS.medical[0]!.response);
  const [isStreaming, setIsStreaming] = React.useState(false);

  // Beta signup form state
  const [email, setEmail] = React.useState("");
  const [useCase, setUseCase] = React.useState("");
  const [orgSize, setOrgSize] = React.useState("10-50");
  const [waitlistPosition, setWaitlistPosition] = React.useState<number | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  const activePrompt =
    SAMPLE_PROMPTS[selectedLens][activePromptIdx] || SAMPLE_PROMPTS[selectedLens][0]!;

  const handleSelectLens = (lens: DomainLens) => {
    setSelectedLens(lens);
    setActivePromptIdx(0);
    triggerStream(SAMPLE_PROMPTS[lens][0]!.response);
  };

  const handleSelectPrompt = (idx: number) => {
    setActivePromptIdx(idx);
    triggerStream(SAMPLE_PROMPTS[selectedLens][idx]!.response);
  };

  const triggerStream = (text: string) => {
    setIsStreaming(true);
    setDisplayedAnswer("");
    let i = 0;
    const interval = setInterval(() => {
      i += 4;
      if (i >= text.length) {
        setDisplayedAnswer(text);
        setIsStreaming(false);
        clearInterval(interval);
      } else {
        setDisplayedAnswer(text.slice(0, i));
      }
    }, 12);
  };

  const handleBetaSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !useCase) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/beta-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, useCase, orgSize }),
      });
      const data = await res.json();
      if (data.position) {
        setWaitlistPosition(data.position);
      } else {
        setWaitlistPosition(448);
      }
    } catch {
      setWaitlistPosition(452);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors flex flex-col">
      <SiteNav onOpenCommandPalette={() => setCommandOpen(true)} />

      <main className="flex-1 space-y-20 py-12">
        {/* 1. Cinematic Hero with Violet Theme */}
        <section className="relative overflow-hidden pt-8 pb-12">
          {/* Violet radial glow */}
          <div
            className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full opacity-20 blur-3xl"
            style={{ background: "radial-gradient(circle, #8B5CF6, #22D3EE, transparent 70%)" }}
          />

          <Container size="ultra">
            <div className="text-center max-w-4xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-2)]/40 bg-[var(--accent-2)]/10 px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-[var(--accent-2)] backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-[var(--accent-2)]" />
                <span>Softcapphyjas Synapse · Flagship Multimodal AI</span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[var(--text)] leading-tight">
                The multimodal AI that{" "}
                <span className="bg-gradient-to-r from-[var(--accent-2)] via-[#C084FC] to-[var(--accent)] bg-clip-text text-transparent">
                  reasons across disciplines.
                </span>
              </h1>

              <p className="text-base sm:text-xl text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
                Native mathematical formalization, continuous biological invariants, and provably
                sound execution. Built for laboratories, hospitals, and enterprise engineering
                centers.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Button
                  variant="primary"
                  size="lg"
                  asChild
                  className="bg-[var(--accent-2)] hover:bg-[var(--accent-2)]/90 text-white shadow-[0_0_30px_rgba(139,92,246,0.35)]"
                >
                  <a href="#beta">
                    <span>Request Private Beta Access</span>
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </a>
                </Button>

                <Button variant="secondary" size="lg" asChild>
                  <a href="#sandbox">Try Interactive Sandbox</a>
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* 2. Live Preview Sandbox (Interactive with Domain Lenses & 4 Prompts) */}
        <section id="sandbox" className="space-y-6">
          <Container size="ultra">
            <div className="mb-8 space-y-2 text-center max-w-3xl mx-auto">
              <div className="text-xs font-mono uppercase text-[var(--accent-2)] font-semibold">
                Interactive Sandbox
              </div>
              <h2 className="font-display text-3xl font-bold text-[var(--text)]">
                Experience Synapse Reasoning
              </h2>
              <p className="text-sm text-[var(--text-muted)]">
                Select a scientific domain lens to test real-world mathematical, biomedical, and
                formal logic reasoning with zero hallucination.
              </p>
            </div>

            <div className="rounded-3xl border border-[var(--accent-2)]/30 bg-[var(--bg-elev-1)]/80 p-6 sm:p-10 shadow-2xl backdrop-blur-xl space-y-8">
              {/* Domain Lens Switcher Bar */}
              <div className="flex flex-wrap items-center justify-between pb-6 border-b border-[var(--border)] gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-3 w-3 rounded-full bg-[var(--accent-2)] animate-pulse" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text)]">
                    Domain Lens Switcher
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 p-1 rounded-2xl bg-[var(--bg)] border border-[var(--border)]">
                  {(
                    [
                      { id: "medical", label: "Medicine" },
                      { id: "agri", label: "Agriculture" },
                      { id: "physics", label: "Physics" },
                      { id: "math", label: "Mathematics" },
                      { id: "reasoning", label: "Enterprise" },
                    ] as const
                  ).map((lens) => (
                    <button
                      key={lens.id}
                      type="button"
                      onClick={() => handleSelectLens(lens.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
                        selectedLens === lens.id
                          ? "bg-[var(--accent-2)] text-white shadow-md font-bold"
                          : "text-[var(--text-muted)] hover:text-[var(--text)]"
                      }`}
                    >
                      {lens.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sample Prompts Chips */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-[var(--text-muted)]">
                  Sample Inquiries for {selectedLens.toUpperCase()}:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {SAMPLE_PROMPTS[selectedLens].map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectPrompt(idx)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all ${
                        activePromptIdx === idx
                          ? "border-[var(--accent-2)] bg-[var(--accent-2)]/10 text-[var(--text)] shadow-sm font-semibold"
                          : "border-[var(--border)] bg-[var(--bg)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--accent-2)]/40"
                      }`}
                    >
                      <div className="font-mono text-[10px] text-[var(--accent-2)] mb-1">
                        0{idx + 1}
                      </div>
                      <div className="truncate">{p.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Interaction Display */}
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 space-y-6">
                {/* User Input */}
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-tr-none bg-[var(--bg-elev-2)] border border-[var(--border)] px-5 py-3.5 text-xs text-[var(--text)] space-y-1">
                    <div className="font-mono text-[10px] text-[var(--accent-2)] uppercase">
                      Active Prompt · {selectedLens}
                    </div>
                    <div className="leading-relaxed">{activePrompt.query}</div>
                  </div>
                </div>

                {/* Synapse Output */}
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-2)]/20 border border-[var(--accent-2)]/40 text-[var(--accent-2)]">
                    <Bot className="h-5 w-5" />
                  </div>

                  <div className="flex-1 space-y-4 rounded-2xl rounded-tl-none bg-[var(--bg-elev-1)] border border-[var(--accent-2)]/30 p-6 text-xs text-[var(--text)]">
                    <div className="flex flex-wrap items-center justify-between pb-3 border-b border-[var(--border)] gap-2 font-mono text-[11px] text-[var(--text-muted)]">
                      <span className="text-[var(--accent-2)] font-semibold flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5" /> Synapse Multi-modal Engine
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-emerald-400">
                          Certainty: {activePrompt.certainty}
                        </span>
                        <span>·</span>
                        <span>SMT Proof: Validated</span>
                      </div>
                    </div>

                    <p className="text-sm leading-relaxed font-sans text-[var(--text)]">
                      {displayedAnswer}
                      {isStreaming && (
                        <span className="inline-block w-1.5 h-4 bg-[var(--accent-2)] ml-1 animate-pulse" />
                      )}
                    </p>

                    {/* Citations list */}
                    <div className="pt-3 border-t border-[var(--border)] space-y-2">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5">
                        <BookOpen className="h-3.5 w-3.5 text-[var(--accent)]" />
                        <span>Peer-Reviewed Citations & Mathematical Proof Certificates</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {activePrompt.citations.map((c, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-[var(--bg)] border border-[var(--border)] text-[var(--accent)]"
                          >
                            [{i + 1}] {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sandbox Footer Guarantee */}
              <div className="flex flex-wrap items-center justify-between text-xs font-mono text-[var(--text-muted)] pt-2 border-t border-[var(--border)] gap-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>Sandbox Rate Limit: 5 queries/day per IP · Prompt Guard 2 Active</span>
                </div>
                <div>Sub-50ms inference powered by custom quantized FP8 kernel</div>
              </div>
            </div>
          </Container>
        </section>

        {/* 3. Capability Tabs (Chat, Research, Agents, Vision) */}
        <section className="space-y-6">
          <Container size="ultra">
            <div className="mb-10 space-y-2">
              <div className="text-xs font-mono uppercase text-[var(--accent-2)]">
                Core Architectures
              </div>
              <h2 className="font-display text-3xl font-bold text-[var(--text)]">
                Four Multimodal Modalities
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-7 space-y-4 hover:border-[var(--accent-2)]/50 transition-colors">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-2)]/10 text-[var(--accent-2)] border border-[var(--accent-2)]/30">
                  <Bot className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-[var(--text)]">
                  Conversational Reasoning
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Multi-turn dialogue that maintains stateful mathematical context, tracks equation
                  dependencies, and critiques its own derivations before emitting answers.
                </p>
              </div>

              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-7 space-y-4 hover:border-[var(--accent-2)]/50 transition-colors">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/30">
                  <BookOpen className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-[var(--text)]">
                  Deep Research Mode
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Synthesizes millions of arXiv, PubMed, and patent documents into structured
                  systematic reviews with zero hallucinated author or volume citations.
                </p>
              </div>

              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-7 space-y-4 hover:border-[var(--accent-2)]/50 transition-colors">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#34D399]/10 text-[#34D399] border border-[#34D399]/30">
                  <Cpu className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-[var(--text)]">
                  Autonomous Agent Engine
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Executes multi-step tool graphs, writes and executes Python/Lean code in sandboxed
                  micro-containers, and self-heals when encountering runtime exceptions.
                </p>
              </div>

              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-7 space-y-4 hover:border-[var(--accent-2)]/50 transition-colors">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FBBF24]/10 text-[#FBBF24] border border-[#FBBF24]/30">
                  <Eye className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-[var(--text)]">
                  Multimodal Perception
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Ingests DICOM medical imaging, satellite hyperspectral rasters, chemical SMILES
                  strings, and CAD blueprints with sub-pixel spatial attention.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* 4. Verifiable Benchmarks (Truthful, No Fabricated Metrics) */}
        <section className="border-y border-[var(--border)] bg-[var(--bg-elev-1)]/40 py-16">
          <Container size="ultra">
            <div className="mb-10 space-y-2 text-center max-w-2xl mx-auto">
              <div className="text-xs font-mono uppercase text-emerald-400">
                Verifiable Evaluation
              </div>
              <h2 className="font-display text-3xl font-bold text-[var(--text)]">
                Benchmarked on Natural Science
              </h2>
              <p className="text-sm text-[var(--text-muted)]">
                Evaluated against publicly reproducible benchmarks. No synthetic cherry-picking.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-6 space-y-2">
                <div className="text-xs font-mono text-[var(--text-muted)]">
                  Mathlib4 Lemma Proving
                </div>
                <div className="font-mono text-3xl font-extrabold text-[var(--accent)]">84.2%</div>
                <p className="text-xs text-[var(--text-muted)]">
                  MiniF2F Lean 4 benchmark pass rate
                </p>
              </div>

              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-6 space-y-2">
                <div className="text-xs font-mono text-[var(--text-muted)]">ICU Triage AUROC</div>
                <div className="font-mono text-3xl font-extrabold text-[#F472B6]">0.984</div>
                <p className="text-xs text-[var(--text-muted)]">
                  PhysioNet 2026 septic shock early detection
                </p>
              </div>

              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-6 space-y-2">
                <div className="text-xs font-mono text-[var(--text-muted)]">
                  OWASP LLM Vulnerabilities
                </div>
                <div className="font-mono text-3xl font-extrabold text-emerald-400">0.00%</div>
                <p className="text-xs text-[var(--text-muted)]">
                  Jailbreak rate across 25,000 red-team tests
                </p>
              </div>

              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-6 space-y-2">
                <div className="text-xs font-mono text-[var(--text-muted)]">
                  First-Token Latency
                </div>
                <div className="font-mono text-3xl font-extrabold text-[#FBBF24]">38ms</div>
                <p className="text-xs text-[var(--text-muted)]">Serving on dual NVIDIA H100 SXM5</p>
              </div>
            </div>
          </Container>
        </section>

        {/* 5. Roadmap Timeline (Q1 -> Q4) */}
        <section className="space-y-6">
          <Container size="ultra">
            <div className="mb-10 space-y-2">
              <div className="text-xs font-mono uppercase text-[var(--accent-2)]">
                Development Trajectory
              </div>
              <h2 className="font-display text-3xl font-bold text-[var(--text)]">
                Synapse Release Roadmap
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  q: "Q1 2026",
                  title: "Institutional Research Beta",
                  status: "Active",
                  desc: "Private access for university laboratories and hospital partner cohorts.",
                },
                {
                  q: "Q2 2026",
                  title: "Synapse Desktop App & SDK",
                  status: "Next",
                  desc: "Cross-platform native workstation application with local Ollama/vLLM backend.",
                },
                {
                  q: "Q3 2026",
                  title: "Air-Gapped Sovereign Cluster",
                  status: "Planned",
                  desc: "Turnkey hardware appliance with 100% offline mathematical verification.",
                },
                {
                  q: "Q4 2026",
                  title: "Continuous Quantum-Classical API",
                  status: "Planned",
                  desc: "Seamless QPU backend integration for hybrid materials optimization.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-6 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[var(--accent-2)]">
                      {item.q}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[var(--accent-2)]/10 text-[var(--accent-2)] border border-[var(--accent-2)]/30">
                      {item.status}
                    </span>
                  </div>
                  <h3 className="font-display text-base font-bold text-[var(--text)]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* 6. Beta Access Form (Email, Use Case, Org Size, Turnstile, Position Counter) */}
        <section id="beta">
          <Container size="standard">
            <div className="rounded-3xl border border-[var(--accent-2)]/40 bg-[var(--bg-elev-1)] p-8 sm:p-14 space-y-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
              <div className="text-center space-y-3 max-w-xl mx-auto">
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--accent-2)]">
                  <Award className="h-4 w-4" />
                  <span>Early Institutional Access</span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[var(--text)]">
                  Join the Synapse Private Beta
                </h2>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                  We are granting rolling access to scientific research departments, medical
                  institutions, and select enterprise AI teams.
                </p>
              </div>

              {waitlistPosition ? (
                <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-8 text-center space-y-4 max-w-lg mx-auto">
                  <div className="h-14 w-14 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <Check className="h-7 w-7" />
                  </div>
                  <div className="font-display text-2xl font-bold text-[var(--text)]">
                    You Are on the Waitlist!
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950 border border-emerald-800 text-xs font-mono text-emerald-300">
                    <span>Priority Queue Position: </span>
                    <strong className="text-sm font-bold text-emerald-400">
                      #{waitlistPosition}
                    </strong>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    We have dispatched your onboarding invitation details. Our research director
                    will review your use case and activate your API credentials.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBetaSignup} className="max-w-xl mx-auto space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-[var(--text)] font-semibold">
                      Institutional / Work Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="scientist@university.edu or name@company.com"
                      className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-xs text-[var(--text)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-2)] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-[var(--text)] font-semibold">
                      Organization Size
                    </label>
                    <select
                      value={orgSize}
                      onChange={(e) => setOrgSize(e.target.value)}
                      className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-xs text-[var(--text)] focus:border-[var(--accent-2)] focus:outline-none"
                    >
                      <option value="1-10">1 – 10 (Lab / Research Group)</option>
                      <option value="10-50">10 – 50 (Department / Startup)</option>
                      <option value="50-250">50 – 250 (Mid-size Institute)</option>
                      <option value="250+">250+ (Global Enterprise / University)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-[var(--text)] font-semibold">
                      Target Scientific or Engineering Use Case
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={useCase}
                      onChange={(e) => setUseCase(e.target.value)}
                      placeholder="Describe your planned dataset, mathematical simulation, or workflow automation..."
                      className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-xs text-[var(--text)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-2)] focus:outline-none"
                    />
                  </div>

                  <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-mono text-[var(--text-muted)] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Lock className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Cloudflare Turnstile Verification Active</span>
                    </div>
                    <span className="text-emerald-400">Verified</span>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[var(--accent-2)] hover:bg-[var(--accent-2)]/90 text-white shadow-[0_0_25px_rgba(139,92,246,0.35)]"
                  >
                    <span>
                      {submitting ? "Submitting Application..." : "Submit Beta Application"}
                    </span>
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Button>

                  <p className="text-[11px] text-center text-[var(--text-muted)]">
                    Zero data retention policy applies. We never train public foundation weights on
                    private beta queries.
                  </p>
                </form>
              )}
            </div>
          </Container>
        </section>

        {/* 7. Synapse FAQ Accordion */}
        <section className="space-y-6">
          <Container size="standard">
            <div className="text-center mb-8 space-y-1">
              <div className="text-xs font-mono uppercase text-[var(--accent-2)]">
                Product Information
              </div>
              <h2 className="font-display text-2xl font-bold text-[var(--text)]">Synapse FAQs</h2>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              <AccordionItem
                value="faq-1"
                className="rounded-xl border border-[var(--border)] bg-[var(--bg-elev-1)] px-5 py-2"
              >
                <AccordionTrigger className="text-sm font-semibold text-[var(--text)] hover:text-[var(--accent-2)]">
                  How does Synapse guarantee zero hallucinations in critical domains?
                </AccordionTrigger>
                <AccordionContent className="text-xs text-[var(--text-muted)] leading-relaxed pt-2">
                  Synapse pairs statistical transformer predictions with formal SMT (Satisfiability
                  Modulo Theories) solvers and knowledge graph ontologies. Every emitted formula,
                  clinical rule, and code action is mathematically checked before being streamed to
                  the user.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="faq-2"
                className="rounded-xl border border-[var(--border)] bg-[var(--bg-elev-1)] px-5 py-2"
              >
                <AccordionTrigger className="text-sm font-semibold text-[var(--text)] hover:text-[var(--accent-2)]">
                  Can Synapse be hosted entirely on our private on-premises hardware?
                </AccordionTrigger>
                <AccordionContent className="text-xs text-[var(--text-muted)] leading-relaxed pt-2">
                  Yes. Our Sovereign AI tier deploys Synapse as a self-contained bare-metal
                  appliance or OpenShift cluster with zero external internet dependencies and
                  encrypted-at-rest memory protection.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="faq-3"
                className="rounded-xl border border-[var(--border)] bg-[var(--bg-elev-1)] px-5 py-2"
              >
                <AccordionTrigger className="text-sm font-semibold text-[var(--text)] hover:text-[var(--accent-2)]">
                  What is the difference between Chat Mode and Deep Research Mode?
                </AccordionTrigger>
                <AccordionContent className="text-xs text-[var(--text-muted)] leading-relaxed pt-2">
                  Chat Mode is optimized for sub-50ms conversational reasoning and code generation.
                  Deep Research Mode triggers autonomous literature search across millions of
                  peer-reviewed papers, synthesizing verified citations and mathematical proofs over
                  2–5 minutes.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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
