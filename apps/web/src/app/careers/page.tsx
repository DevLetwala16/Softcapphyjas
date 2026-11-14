"use client";

import * as React from "react";
import Link from "next/link";
import { SiteNav, SiteFooter, Container, Badge } from "@softcapphyjas/ui";
import {
  Briefcase,
  MapPin,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Atom,
} from "lucide-react";

interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  domain: "medical" | "physics" | "agri" | "frontier";
  summary: string;
  requirements: string[];
}

const OPENINGS: JobOpening[] = [
  {
    id: "lead-neuro-symbolic",
    title: "Principal Research Fellow — Neuro-Symbolic Verification",
    department: "Frontier Labs",
    location: "Bengaluru, India (Hybrid)",
    type: "Full-Time",
    domain: "frontier",
    summary:
      "Lead our formal reasoning research group bridging neural embeddings with SMT solvers (Z3/CVC5) and interactive theorem provers (Lean 4) for safety-critical healthcare and mathematical discovery.",
    requirements: [
      "Ph.D. or equivalent industry research record in Formal Methods, Automated Reasoning, or AI Safety",
      "Demonstrated publications in NeurIPS, ICML, CAV, or POPL",
      "Proficiency in Lean 4, Coq, or Z3 with Python/C++ integration",
    ],
  },
  {
    id: "staff-quantum-ml",
    title: "Staff Quantum Algorithm Engineer",
    department: "Physics & Quantum Group",
    location: "Bengaluru, India (On-site)",
    type: "Full-Time",
    domain: "physics",
    summary:
      "Design hybrid quantum-classical algorithms, parameterized quantum circuits, and tensor network simulators for molecular Hamiltonian ground-state estimation on GPU clusters.",
    requirements: [
      "Master's or Ph.D. in Quantum Information, Theoretical Physics, or Computational Chemistry",
      "Hands-on experience with Qiskit, Pennylane, or Cirq running on CUDA-Q / cuQuantum",
      "Deep understanding of NISQ error mitigation and Hamiltonian variational eigensolvers (VQE)",
    ],
  },
  {
    id: "senior-sovereign-architect",
    title: "Chief Sovereign Infrastructure Architect",
    department: "Platform Engineering",
    location: "Bengaluru, India (Hybrid)",
    type: "Full-Time",
    domain: "frontier",
    summary:
      "Architect hardened, air-gapped on-premise foundation model appliances running vLLM, TensorRT-LLM, and encrypted vector indices for banking and defense clients.",
    requirements: [
      "7+ years architecting distributed Linux systems, Kubernetes, and NVIDIA DGX / H100 clusters",
      "Deep expertise in zero-trust networking, eBPF, TPM-backed disk encryption, and confidential computing",
      "Prior experience deploying air-gapped systems compliant with defense or financial security baselines",
    ],
  },
  {
    id: "computational-agronomist",
    title: "Lead Computational Biologist — Soil Metagenomics",
    department: "Agritech Intelligence",
    location: "Remote (India)",
    type: "Full-Time",
    domain: "agri",
    summary:
      "Lead the algorithmic pipeline fusing 16S rRNA metagenomic sequences with multispectral satellite rasters to predict bioavailable soil nitrogen and carbon sequestration capacity.",
    requirements: [
      "Ph.D. or Master's in Bioinformatics, Computational Agronomy, or Microbial Genomics",
      "Proven expertise in spatial statistics, PyTorch Geometric, and metagenomic assembly workflows",
      "Passionate about replacing synthetic fertilizers with biological precision farming",
    ],
  },
];

export default function CareersPage() {
  const [selectedDept, setSelectedDept] = React.useState<string>("all");

  const filteredJobs =
    selectedDept === "all"
      ? OPENINGS
      : OPENINGS.filter((job) => job.department.toLowerCase().includes(selectedDept.toLowerCase()));

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors flex flex-col justify-between">
      <SiteNav />

      <main className="flex-1 py-16 sm:py-20 space-y-20">
        {/* Hero Section */}
        <section>
          <Container size="standard">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-4 py-1.5 text-xs font-mono text-[var(--accent)]">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Careers &amp; Fellowships</span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--text)] leading-tight">
                Invent the Frontier. <br />
                <span className="text-[var(--accent)]">Deploy the Unprecedented.</span>
              </h1>

              <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
                At Softcapphyjas, we do not build derivative wrappers. We pursue foundational
                breakthroughs at the intersection of computational biology, quantum chemistry,
                symbolic mathematics, and sovereign intelligence systems.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <a
                  href="#openings"
                  className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 text-xs font-semibold text-black shadow-lg shadow-[var(--accent)]/20 hover:opacity-90 transition-opacity"
                >
                  <span>Explore Open Fellowships</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg-elev-1)] px-6 py-3 text-xs font-semibold text-[var(--text)] hover:border-[var(--accent)]/50 transition-colors"
                >
                  Our Dual-Engine Thesis
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Culture & Principles */}
        <section className="py-12 border-y border-[var(--border)] bg-[var(--bg-elev-1)]/40">
          <Container size="standard">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center">
                  <Atom className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-[var(--text)]">
                  First-Principles Rigor
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  We don't accept heuristic approximations where exact formal verification is
                  possible. Every claim is mathematically modeled, code-verified, and peer-reviewed.
                </p>
              </div>

              <div className="space-y-3">
                <div className="h-10 w-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                  <Cpu className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-[var(--text)]">
                  Compute Without Bottlenecks
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Our research teams work with dedicated NVIDIA H100 GPU clusters, state-of-the-art
                  optical breadboards, and high-throughput NGS genetic sequencers.
                </p>
              </div>

              <div className="space-y-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-[var(--text)]">
                  High Agency &amp; Royalties
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Inventors share directly in the commercial value of foundational patents and
                  enterprise licensing royalties created by their laboratories.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Open Positions List */}
        <section id="openings" className="space-y-8">
          <Container size="standard">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-mono uppercase text-[var(--accent)]">
                  Current Openings
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text)]">
                  Open Research Fellowships &amp; Roles
                </h2>
              </div>

              {/* Department Filter Pills */}
              <div className="flex flex-wrap gap-2 text-xs">
                {["all", "Frontier Labs", "Physics", "Platform", "Agritech"].map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDept(dept)}
                    className={`rounded-full px-3.5 py-1 font-mono transition-colors ${
                      selectedDept === dept
                        ? "bg-[var(--accent)] text-black font-semibold"
                        : "border border-[var(--border)] bg-[var(--bg-elev-1)] text-[var(--text-muted)] hover:text-[var(--text)]"
                    }`}
                  >
                    {dept === "all" ? "All Departments" : dept}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6 pt-6">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="rounded-3xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-6 sm:p-8 space-y-6 hover:border-[var(--accent)]/50 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant={job.domain} size="sm">
                          {job.department}
                        </Badge>
                        <span className="text-xs font-mono text-[var(--text-muted)]">
                          {job.type}
                        </span>
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text)]">
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-4 text-xs font-mono text-[var(--text-muted)]">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-3.5 w-3.5" />
                          Equity &amp; Patent Royalties Included
                        </span>
                      </div>
                    </div>

                    <a
                      href={`mailto:careers@softcapphyjas.com?subject=Application:%20${encodeURIComponent(
                        job.title
                      )}`}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[var(--accent)] px-5 py-2.5 text-xs font-semibold text-black hover:opacity-90 transition-opacity shrink-0"
                    >
                      <span>Apply for Fellowship</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>

                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">{job.summary}</p>

                  <div className="pt-4 border-t border-[var(--border)] space-y-2">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text)] font-semibold">
                      Ideal Candidate Profile
                    </div>
                    <ul className="space-y-1 text-xs text-[var(--text-muted)]">
                      {job.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-[var(--accent)] shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* General Applications */}
            <div className="mt-12 rounded-3xl border border-[var(--border)] bg-[var(--bg-elev-2)] p-8 text-center space-y-4">
              <h3 className="font-display text-xl font-bold text-[var(--text)]">
                Don't See Your Specific Specialty?
              </h3>
              <p className="text-xs text-[var(--text-muted)] max-w-lg mx-auto leading-relaxed">
                We are always seeking exceptional researchers in automated theorem proving, quantum
                information, synthetic biology, and high-performance ML inference. Send your CV and
                notable preprints directly to our research council.
              </p>
              <div>
                <a
                  href="mailto:fellowships@softcapphyjas.com?subject=General%20Fellowship%20Inquiry"
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg-elev-1)] px-5 py-2.5 text-xs font-semibold text-[var(--text)] hover:border-[var(--accent)] transition-colors"
                >
                  <span>fellowships@softcapphyjas.com</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[var(--accent)]" />
                </a>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
