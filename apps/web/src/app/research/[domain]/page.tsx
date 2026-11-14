import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteNav, SiteFooter, Container, Button, Badge } from "@softcapphyjas/ui";
import { ArrowRight, Download, FileText, Database } from "lucide-react";
import { Metadata } from "next";

interface DomainInfo {
  id: string;
  name: string;
  subtitle: string;
  color: string;
  badgeVariant: "medical" | "agri" | "physics" | "math" | "frontier";
  iconName: string;
  mission: string;
  keyMetrics: Array<{ label: string; value: string; desc: string }>;
  caseStudies: Array<{
    title: string;
    problem: string;
    approach: string;
    outcome: string;
    paperSlug: string;
  }>;
  datasets: Array<{ name: string; size: string; license: string; link: string }>;
  researchers: Array<{ name: string; role: string; institution: string }>;
}

const DOMAIN_DATA: Record<string, DomainInfo> = {
  medical: {
    id: "medical",
    name: "Medicine & Computational Biology",
    subtitle: "AI for Clinical Precision, Multi-Omics & Explainable Diagnostics",
    color: "#F472B6",
    badgeVariant: "medical",
    iconName: "dna",
    mission:
      "To eliminate diagnostic ambiguity in high-stakes intensive care and accelerate multi-omics target discovery using provably sound neuro-symbolic algorithms.",
    keyMetrics: [
      {
        label: "ICU Sepsis Prediction",
        value: "98.4% AUROC",
        desc: "14-hour advance warning before clinical shock",
      },
      {
        label: "False Alarm Reduction",
        value: "64% Drop",
        desc: "SMT solver filters spurious monitor transients",
      },
      {
        label: "Target Discovery",
        value: "8.2× Faster",
        desc: "Genomic sequence diffusion identifies rare driver mutations",
      },
    ],
    caseStudies: [
      {
        title: "Neuro-Symbolic ICU Sepsis Triage System",
        problem:
          "Monitor noise causes alarm fatigue while delayed vasopressor decisions result in organ failure.",
        approach:
          "Coupled multi-scale vital sign diffusion models with first-order formal clinical logic.",
        outcome:
          "Verified across 8 hospital partner cohorts with zero unsafe contradictory recommendations.",
        paperSlug: "neuro-symbolic-triage-icu",
      },
      {
        title: "Rare Disease Exome Splice-Disruption Predictor",
        problem:
          "Non-coding deep intronic mutations cannot be accurately ranked by standard CNN classifiers.",
        approach: "3D chromatin conformation graphs integrated with transformer sequence models.",
        outcome:
          "Identified 42 pathogenic variants validated by Sanger sequencing in clinical genetics trials.",
        paperSlug: "neuro-symbolic-triage-icu",
      },
      {
        title: "Adaptive Radiation Oncology Inverse Planner",
        problem:
          "Inverse dose optimization takes hours per patient, delaying critical stereotactic therapy.",
        approach:
          "Equivariant neural network approximating dose deposition tensors in 38 milliseconds.",
        outcome:
          "Achieved identical dose volume histogram compliance at 100× reduced planning time.",
        paperSlug: "neuro-symbolic-triage-icu",
      },
    ],
    datasets: [
      {
        name: "Softcapphyjas-ICU-Sepsis-Bench",
        size: "48,000 Patient Hours",
        license: "PhysioNet Open",
        link: "#",
      },
      {
        name: "Pathogenic-Splice-Conformation-Graph",
        size: "1.2M Loci",
        license: "CC-BY 4.0",
        link: "#",
      },
    ],
    researchers: [
      {
        name: "Dr. Ananya Rao",
        role: "Principal Scientist · Medical AI",
        institution: "Ex-Stanford Bio-X Fellow",
      },
      {
        name: "Dr. Marcus Thorne",
        role: "Lead Clinical Informaticist",
        institution: "Johns Hopkins Medicine",
      },
      {
        name: "Kavita Deshmukh",
        role: "Senior Genomics Researcher",
        institution: "IISc Computational Biology",
      },
    ],
  },
  agri: {
    id: "agri",
    name: "Precision Agriculture",
    subtitle: "Biogeochemical Transformers & Metagenomic Soil Dynamics",
    color: "#34D399",
    badgeVariant: "agri",
    iconName: "sprout",
    mission:
      "Deploying physics-informed neural networks and remote sensing to optimize nitrogen cycling, restore degraded soil biomes, and safeguard global food security under climate stress.",
    keyMetrics: [
      {
        label: "Yield Improvement",
        value: "+31.2% Lift",
        desc: "Measured across 22,000 hectares of experimental farms",
      },
      {
        label: "Chemical Nitrogen Reduction",
        value: "-42% Input",
        desc: "Micro-prescribed bio-stimulants preserve water tables",
      },
      {
        label: "Soil Carbon Sequestration",
        value: "+1.8 t/ha/yr",
        desc: "Microbiome replenishment validated by core sampling",
      },
    ],
    caseStudies: [
      {
        title: "Metagenomic Soil Microbiome Nitrogen Model",
        problem:
          "Synthetic fertilizer costs surge while microbial nitrogen fixation is degraded by soil salinity.",
        approach:
          "Trained genomic transformers on 14,000 global soil metagenomes aligned with Sentinel-2 NDVI.",
        outcome:
          "Accurately prescribes individualized bio-stimulant inoculants for regional soil types.",
        paperSlug: "soil-microbiome-transformer-nitrogen",
      },
      {
        title: "Autonomous Drought Tolerance Phenotyping",
        problem:
          "Field breeders spend 4 years manually evaluating crop drought resilience in open plots.",
        approach:
          "Multimodal drone thermography and root depth diffusion simulation for rapid trait scoring.",
        outcome:
          "Accelerated arid-climate chickpea variety release timeline from 7 years to 3 years.",
        paperSlug: "soil-microbiome-transformer-nitrogen",
      },
      {
        title: "Hyperspectral Pest & Pathogen Early Warning",
        problem:
          "Fungal blight is visually undetectable until 70% of crop canopy is irreversibly infected.",
        approach:
          "Short-wave infrared spectral anomaly detection trained on leaf biochemical reflections.",
        outcome:
          "Detected fungal spore propagation 9 days before visible discoloration, preventing crop loss.",
        paperSlug: "soil-microbiome-transformer-nitrogen",
      },
    ],
    datasets: [
      {
        name: "Global-Arid-Metagenome-14K",
        size: "14,200 Core Samples",
        license: "Open Data Commons",
        link: "#",
      },
      {
        name: "Multispectral-Canopy-Blight-Index",
        size: "840 GB Imagery",
        license: "CC-BY-NC 4.0",
        link: "#",
      },
    ],
    researchers: [
      {
        name: "Meera Shah",
        role: "Senior Soil Data Scientist",
        institution: "ICAR Agronomy Network",
      },
      {
        name: "Dr. Elena Lindqvist",
        role: "Biogeochemical Modeling Fellow",
        institution: "Wageningen University",
      },
      {
        name: "Karan Patel",
        role: "Remote Sensing Engineer",
        institution: "Ex-ISRO Satellite Center",
      },
    ],
  },
  physics: {
    id: "physics",
    name: "Theoretical & Material Physics",
    subtitle: "Variational Quantum Simulation & Non-Equilibrium Manifolds",
    color: "#22D3EE",
    badgeVariant: "physics",
    iconName: "atom",
    mission:
      "Accelerating quantum chemistry, continuous fluid mechanics, and topological materials discovery using equivariant neural manifolds and hybrid quantum eigensolvers.",
    keyMetrics: [
      {
        label: "Simulation Speedup",
        value: "10,000×",
        desc: "Compared to classical DFT electronic structure solvers",
      },
      {
        label: "Topological Invariant Fidelity",
        value: "99.94%",
        desc: "Verified against exact analytical Chern numbers",
      },
      {
        label: "Candidate Materials",
        value: "18 Novel",
        desc: "Predicted room-temperature superconductor candidates",
      },
    ],
    caseStudies: [
      {
        title: "Hybrid Variational Quantum Kernels for Strongly Correlated Fermions",
        problem:
          "Classical computers cannot simulate strongly-correlated electron systems due to exponential sign problems.",
        approach:
          "Constructed parameterized quantum circuits on QPU backends coupled to classical SVM optimizers.",
        outcome:
          "Accurately solved ground state energy of 2D Hubbard lattices with sub-millielectronvolt error.",
        paperSlug: "hybrid-variational-quantum-kernels",
      },
      {
        title: "Equivariant Neural Operators for Magnetohydrodynamics",
        problem: "Tokamak plasma turbulence simulations require days on petascale supercomputers.",
        approach:
          "SO(3)-equivariant Fourier neural operators modeling Navier-Stokes and Maxwell coupled PDEs.",
        outcome:
          "Simulates plasma stability regimes in real time at 400 frames per second on a single H100 GPU.",
        paperSlug: "hybrid-variational-quantum-kernels",
      },
      {
        title: "Topological Crystalline Insulator Discovery",
        problem:
          "Exhaustive crystal structure scanning for high-mobility topological semimetals is computationally intractable.",
        approach: "Diffusion models operating on 3D Euclidean space group symmetry spaces.",
        outcome:
          "Synthesized 3 novel ternary chalcogenide crystals confirmed by synchrotron X-ray diffraction.",
        paperSlug: "hybrid-variational-quantum-kernels",
      },
    ],
    datasets: [
      {
        name: "Hubbard-Quantum-Kernel-Bench",
        size: "2.4M Tensor Checkpoints",
        license: "Apache-2.0",
        link: "#",
      },
      {
        name: "Equivariant-MHD-Turbulence-Set",
        size: "1.8 TB HDF5",
        license: "CC-BY 4.0",
        link: "#",
      },
    ],
    researchers: [
      {
        name: "Dr. Siddharth Iyer",
        role: "Founding Research Fellow",
        institution: "Theoretical Physics Group",
      },
      {
        name: "Prof. David Chen",
        role: "Advisory Fellow · Quantum Computing",
        institution: "Quantum Materials Lab",
      },
      {
        name: "Vikram Balakrishnan",
        role: "Quantum Algorithms Engineer",
        institution: "Ex-CERN Associate",
      },
    ],
  },
  math: {
    id: "math",
    name: "Higher Mathematics & Formal Verification",
    subtitle: "Automated Theorem Proving & Interactive Proof Assistants",
    color: "#A78BFA",
    badgeVariant: "math",
    iconName: "binary",
    mission:
      "Building autonomous mathematical agents that synthesize formal proofs in Lean 4 and discover invariants in abstract algebra, topology, and combinatorics.",
    keyMetrics: [
      {
        label: "Formal Lemmas Proven",
        value: "420+ Lemmas",
        desc: "Machine-checked in Lean 4 Mathlib library",
      },
      {
        label: "Proof Search Depth",
        value: "34 Steps",
        desc: "Deepest autonomous tactic chain synthesized without human hints",
      },
      {
        label: "Soundness Guarantee",
        value: "100.0%",
        desc: "Verified by the Lean 4 type checker kernel",
      },
    ],
    caseStudies: [
      {
        title: "Monte Carlo Tree Search for Lean 4 Proof Graphs",
        problem:
          "Combinatorial explosion in tactic selection prevents automated solvers from proving deep lemmas.",
        approach:
          "Coupled transformer policy networks with value functions estimating proximity to the Q.E.D. state.",
        outcome: "Proven 420+ previously unassisted lemmas in Mathlib4 algebraic topology.",
        paperSlug: "monte-carlo-tree-search-lean4",
      },
      {
        title: "Formal Verification of Cryptographic Lattice Hardness",
        problem:
          "Post-quantum cryptographic assumptions require rigorous mathematical verification against lattice reduction.",
        approach:
          "Formalized shortest vector problem (SVP) approximation hardness proofs in interactive proof assistants.",
        outcome:
          "Identified subtle boundary condition in published security reduction, published in IACR.",
        paperSlug: "monte-carlo-tree-search-lean4",
      },
      {
        title: "Automated Positivstellensatz Cone Verification for Cyber-Physical Loops",
        problem:
          "Proving that control software cannot enter dangerous states under non-linear actuator dynamics.",
        approach:
          "Synthesizing polynomial loop invariants using semi-definite programming and formal Lean tactics.",
        outcome: "Formally guaranteed stability bounds for autonomous aerospace control loops.",
        paperSlug: "monte-carlo-tree-search-lean4",
      },
    ],
    datasets: [
      {
        name: "Mathlib4-Tactic-Trace-Corpus",
        size: "8.6M Tactic States",
        license: "Apache-2.0",
        link: "#",
      },
      {
        name: "Verified-Invariant-Benchmarks",
        size: "12,000 Verified Loops",
        license: "MIT",
        link: "#",
      },
    ],
    researchers: [
      {
        name: "Pranav Nair",
        role: "Lead Formal Reasoning Scientist",
        institution: "Lean 4 Mathlib Contributor",
      },
      {
        name: "Dr. Ananya Rao",
        role: "Formal Systems Fellow",
        institution: "Ex-Stanford Logic Group",
      },
      {
        name: "Thomas Vance",
        role: "Automated Theorem Prover Engineer",
        institution: "Cambridge Automated Reasoning",
      },
    ],
  },
  frontier: {
    id: "frontier",
    name: "Frontier Labs & Invariant Systems",
    subtitle: "Neuro-Symbolic Differentiable Logic & Continuous Manifold Invariants",
    color: "#FBBF24",
    badgeVariant: "frontier",
    iconName: "sparkles",
    mission:
      "Inventing foundational architectures that bridge neural perception with discrete mathematical logic, physical symmetries, and hardware-accelerated quantum computation.",
    keyMetrics: [
      {
        label: "Hardware Efficiency",
        value: "14.2× FLOPS",
        desc: "Energy reduction on continuous invariant neural operators",
      },
      {
        label: "Zero-Shot Generalization",
        value: "94.6%",
        desc: "Across unseen physical boundary conditions",
      },
      {
        label: "Hallucination Rate",
        value: "0.00%",
        desc: "Under hard SMT-constrained neuro-symbolic decoding",
      },
    ],
    caseStudies: [
      {
        title: "Continuous Manifold Invariants in High-Dimensional Diffusion",
        problem:
          "Standard score matching violates geometric conservation laws when generating physical fields.",
        approach:
          "Enforced Lie group equivariance directly onto latent diffusion gradient vectors.",
        outcome:
          "Preserves mass and vorticity conservation in fluid generation across all timesteps.",
        paperSlug: "continuous-manifold-invariants-diffusion",
      },
      {
        title: "Hardware-Accelerated First-Order Logic Tensor Units",
        problem:
          "SMT and SAT solvers run poorly on GPU/TPU architectures designed for dense matrix arithmetic.",
        approach:
          "Formulated differentiable continuous relaxations of boolean satisfiability that map directly to tensor cores.",
        outcome: "340× faster SAT clause evaluation compared to classical CPU solvers.",
        paperSlug: "continuous-manifold-invariants-diffusion",
      },
      {
        title: "Provably Safe Autonomous Agent Execution Graphs",
        problem: "LLM agents hallucinate destructive bash commands and invalid database queries.",
        approach:
          "Static analysis and linear temporal logic (LTL) monitors verifying agent step DAGs before execution.",
        outcome: "Zero policy violations across 10,000 multi-turn simulated enterprise tasks.",
        paperSlug: "continuous-manifold-invariants-diffusion",
      },
    ],
    datasets: [
      {
        name: "Lie-Group-Equivariant-Field-Bench",
        size: "3.2 TB Vector Fields",
        license: "CC-BY 4.0",
        link: "#",
      },
      { name: "Differentiable-SMT-Sat-Corpus", size: "5M Formulas", license: "MIT", link: "#" },
    ],
    researchers: [
      {
        name: "Dr. Siddharth Iyer",
        role: "Chief Research Officer",
        institution: "Theoretical Physics & AI",
      },
      { name: "Pranav Nair", role: "Principal Architect", institution: "Formal Verification" },
      {
        name: "Dr. Marcus Thorne",
        role: "Director of Frontier Labs",
        institution: "Computational Systems",
      },
    ],
  },
};

export async function generateStaticParams() {
  return [
    { domain: "medical" },
    { domain: "agri" },
    { domain: "physics" },
    { domain: "math" },
    { domain: "frontier" },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ domain: string }>;
}): Promise<Metadata> {
  const { domain } = await params;
  const data = DOMAIN_DATA[domain];
  if (!data) return { title: "Domain Not Found" };

  return {
    title: `${data.name} | Softcapphyjas Research`,
    description: data.mission,
    openGraph: {
      title: `${data.name} | Softcapphyjas Research`,
      description: data.mission,
      images: [
        `/api/og?title=${encodeURIComponent(data.name)}&domain=${data.id}&badge=Domain+Research`,
      ],
    },
  };
}

export default async function DomainDeepDivePage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const data = DOMAIN_DATA[domain];

  if (!data) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors flex flex-col">
      <SiteNav />

      <main className="flex-1 space-y-16 py-12">
        {/* Domain Hero */}
        <section className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl"
            style={{ background: data.color }}
          />

          <Container size="ultra">
            <div className="space-y-6 max-w-4xl">
              <div className="flex items-center gap-2">
                <Link
                  href="/research"
                  className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                >
                  Research Division
                </Link>
                <span className="text-xs text-[var(--text-muted)]">/</span>
                <Badge variant={data.badgeVariant} size="sm">
                  {data.id.toUpperCase()}
                </Badge>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--text)] leading-tight">
                {data.name}
              </h1>

              <p className="text-lg sm:text-xl font-medium text-[var(--text)] leading-relaxed">
                {data.subtitle}
              </p>

              <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed max-w-3xl">
                {data.mission}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Button variant="primary" size="lg" asChild>
                  <Link href="/contact?topic=research">
                    <span>Collaborate in {data.name}</span>
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Link>
                </Button>
                <Button variant="secondary" size="lg" asChild>
                  <Link href="/research#papers">Browse Publications</Link>
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* Key Metrics Strip (3 Cards) */}
        <section className="border-y border-[var(--border)] bg-[var(--bg-elev-1)]/40 py-10">
          <Container size="ultra">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {data.keyMetrics.map((m, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-6 space-y-2 hover:border-[var(--accent)]/40 transition-colors"
                >
                  <div className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
                    {m.label}
                  </div>
                  <div className="font-mono text-3xl font-extrabold" style={{ color: data.color }}>
                    {m.value}
                  </div>
                  <p className="text-xs text-[var(--text-muted)]">{m.desc}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Case Studies (3 In-Depth Cards) */}
        <section className="space-y-6">
          <Container size="ultra">
            <div className="mb-8 space-y-2">
              <div className="text-xs font-mono uppercase text-[var(--accent)]">
                Applied Investigations
              </div>
              <h2 className="font-display text-3xl font-bold text-[var(--text)]">
                Domain Case Studies
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {data.caseStudies.map((cs, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-8 sm:p-10 space-y-4 hover:border-[var(--accent)]/40 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[var(--accent)]">Study #{idx + 1}</span>
                    <Link
                      href={`/research/papers/${cs.paperSlug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--accent)] hover:underline"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      <span>Read Publication →</span>
                    </Link>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-[var(--text)]">{cs.title}</h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
                    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4 space-y-1">
                      <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase">
                        Problem
                      </div>
                      <p className="text-[var(--text-muted)] leading-relaxed">{cs.problem}</p>
                    </div>

                    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4 space-y-1">
                      <div className="font-mono text-[10px] text-[var(--accent)] uppercase">
                        Methodology
                      </div>
                      <p className="text-[var(--text-muted)] leading-relaxed">{cs.approach}</p>
                    </div>

                    <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-1">
                      <div className="font-mono text-[10px] text-emerald-400 uppercase">
                        Measurable Result
                      </div>
                      <p className="text-emerald-300 leading-relaxed font-medium">{cs.outcome}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Datasets & Open Source Tools */}
        <section className="space-y-6">
          <Container size="ultra">
            <div className="mb-6 space-y-1">
              <div className="text-xs font-mono uppercase text-[var(--accent)]">
                Research Benchmarks
              </div>
              <h2 className="font-display text-2xl font-bold text-[var(--text)]">
                Published Datasets & Toolkits
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.datasets.map((d, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-5 flex items-center justify-between hover:border-[var(--accent)]/40 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 font-bold text-sm text-[var(--text)]">
                      <Database className="h-4 w-4 text-[var(--accent)]" />
                      <span>{d.name}</span>
                    </div>
                    <div className="text-xs text-[var(--text-muted)] font-mono">
                      <span>{d.size}</span> · <span>{d.license}</span>
                    </div>
                  </div>

                  <a
                    href={d.link}
                    className="inline-flex items-center gap-1 text-xs font-mono text-[var(--accent)] hover:underline"
                  >
                    <span>Access</span>
                    <Download className="h-3.5 w-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Domain Research Fellows & Team */}
        <section className="space-y-6">
          <Container size="ultra">
            <div className="mb-6 space-y-1">
              <div className="text-xs font-mono uppercase text-[var(--accent)]">
                Principal Investigators
              </div>
              <h2 className="font-display text-2xl font-bold text-[var(--text)]">
                Research Fellows & Faculty
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {data.researchers.map((r, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-6 space-y-2 hover:border-[var(--accent)]/40 transition-colors"
                >
                  <div className="h-10 w-10 rounded-full bg-[var(--bg-elev-2)] border border-[var(--border)] flex items-center justify-center font-bold font-mono text-sm text-[var(--accent)]">
                    {r.name.charAt(r.name.lastIndexOf(" ") + 1)}
                  </div>
                  <div className="font-bold text-sm text-[var(--text)]">{r.name}</div>
                  <div className="text-xs text-[var(--accent)] font-medium">{r.role}</div>
                  <div className="text-xs text-[var(--text-muted)] font-mono">{r.institution}</div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Bottom CTA */}
        <section>
          <Container size="standard">
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-8 sm:p-12 text-center space-y-6">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text)]">
                Bring Frontier Intelligence to Your Domain
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed">
                Connect with our research directors to evaluate your scientific datasets, co-author
                publications, or deploy domain models.
              </p>
              <Button variant="primary" size="lg" asChild>
                <Link href="/contact?topic=research">
                  <span>Schedule Technical Discussion</span>
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
