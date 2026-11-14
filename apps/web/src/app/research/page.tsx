"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  SiteNav,
  SiteFooter,
  Container,
  Button,
  Badge,
  CommandPalette,
  ConciergeChatbot,
} from "@softcapphyjas/ui";
import {
  Search,
  Download,
  Copy,
  Github,
  Check,
  ArrowRight,
  Sparkles,
  Cpu,
  Network,
} from "lucide-react";

type DomainKey = "all" | "medical" | "agri" | "physics" | "math" | "frontier";

interface Paper {
  id: string;
  slug: string;
  title: string;
  authors: string;
  domain: "medical" | "agri" | "physics" | "math" | "frontier";
  domainLabel: string;
  year: number;
  doi: string;
  pdfUrl: string;
  abstract: string;
  bibtex: string;
}

const PAPERS: Paper[] = [
  {
    id: "p1",
    slug: "neuro-symbolic-triage-icu",
    title: "Neuro-symbolic triage for ICU clinical pathways under high uncertainty",
    authors: "Dr. Ananya Rao, Dr. S. Iyer, Dr. M. Thorne",
    domain: "medical",
    domainLabel: "Medical",
    year: 2026,
    doi: "10.1038/s41746-026-00912",
    pdfUrl: "#",
    abstract:
      "A hybrid architecture pairing continuous physiological time-series diffusion embeddings with SMT constraint solvers to guarantee counterfactual safety in critical care units.",
    bibtex: `@article{rao2026neurosymbolic,\n  title={Neuro-symbolic triage for ICU clinical pathways under high uncertainty},\n  author={Rao, Ananya and Iyer, Siddharth and Thorne, Marcus},\n  journal={Nature Digital Medicine},\n  volume={9},\n  year={2026},\n  doi={10.1038/s41746-026-00912}\n}`,
  },
  {
    id: "p2",
    slug: "soil-microbiome-transformer-nitrogen",
    title: "Deep transformer models for soil microbiome nitrogen cycles across arid zones",
    authors: "M. Shah, Dr. E. Lindqvist, K. Patel",
    domain: "agri",
    domainLabel: "Agriculture",
    year: 2026,
    doi: "10.1016/j.agrformet.2026.10984",
    pdfUrl: "#",
    abstract:
      "Metagenomic sequence attention networks predicting enzymatic nitrification and crop uptake across 14,000 global soil core samples with 31% nitrogen lift.",
    bibtex: `@article{shah2026soilmicrobiome,\n  title={Deep transformer models for soil microbiome nitrogen cycles across arid zones},\n  author={Shah, Meera and Lindqvist, Elena and Patel, Karan},\n  journal={Agricultural and Forest Meteorology},\n  year={2026},\n  doi={10.1016/j.agrformet.2026.10984}\n}`,
  },
  {
    id: "p3",
    slug: "hybrid-variational-quantum-kernels",
    title: "Hybrid variational quantum kernels for strongly-correlated fermion systems",
    authors: "Dr. S. Iyer, Prof. D. Chen, V. Balakrishnan",
    domain: "physics",
    domainLabel: "Physics",
    year: 2025,
    doi: "10.1103/PhysRevX.15.021034",
    pdfUrl: "#",
    abstract:
      "Parameterized quantum circuits mapped to classical support vector machines that simulate 2D Hubbard lattices 10,000x faster than traditional density functional theory.",
    bibtex: `@article{iyer2025variational,\n  title={Hybrid variational quantum kernels for strongly-correlated fermion systems},\n  author={Iyer, Siddharth and Chen, David and Balakrishnan, Vikram},\n  journal={Physical Review X},\n  volume={15},\n  year={2025},\n  doi={10.1103/PhysRevX.15.021034}\n}`,
  },
  {
    id: "p4",
    slug: "monte-carlo-tree-search-lean4",
    title: "Monte Carlo tree search over Lean 4 proof graphs for automated lemma synthesis",
    authors: "P. Nair, Dr. Ananya Rao, T. Vance",
    domain: "math",
    domainLabel: "Mathematics",
    year: 2025,
    doi: "10.48550/arXiv.2510.14920",
    pdfUrl: "#",
    abstract:
      "Reinforcement learning policy networks coupled with symbolic tactic lookahead that automatically prove 420+ non-trivial algebraic geometry lemmas in Mathlib4.",
    bibtex: `@article{nair2025mctslean4,\n  title={Monte Carlo tree search over Lean 4 proof graphs for automated lemma synthesis},\n  author={Nair, Pranav and Rao, Ananya and Vance, Thomas},\n  journal={arXiv preprint arXiv:2510.14920},\n  year={2025}\n}`,
  },
  {
    id: "p5",
    slug: "continuous-manifold-invariants-diffusion",
    title: "Continuous manifold invariants in high-dimensional diffusion models",
    authors: "Dr. S. Iyer, P. Nair, Dr. M. Thorne",
    domain: "frontier",
    domainLabel: "Frontier",
    year: 2026,
    doi: "10.1145/3689240.3689288",
    pdfUrl: "#",
    abstract:
      "Formulating Lie group symmetries directly into latent score-matching dynamics, eliminating geometric artifacts in simulated topological fields.",
    bibtex: `@article{iyer2026manifoldinvariants,\n  title={Continuous manifold invariants in high-dimensional diffusion models},\n  author={Iyer, Siddharth and Nair, Pranav and Thorne, Marcus},\n  journal={ACM Transactions on Graphics},\n  year={2026}\n}`,
  },
];

const OSS_REPOS = [
  {
    name: "softcapphyjas/neurosym",
    stars: "1.2k",
    license: "Apache-2.0",
    install: "pip install neurosym",
    description:
      "Differentiable first-order logic engine with Z3 SMT constraint binding for PyTorch.",
  },
  {
    name: "softcapphyjas/agri-bench",
    stars: "640",
    license: "MIT",
    install: "pip install agri-bench",
    description:
      "Benchmark dataset & transformer weights for soil microbiome nitrogen cycle modeling.",
  },
  {
    name: "softcapphyjas/proof-search",
    stars: "310",
    license: "MIT",
    install: "pnpm add @softcapphyjas/proof-search",
    description:
      "Tree search heuristics and Lean 4 tactic synthesis client for formal theorem proving.",
  },
  {
    name: "softcapphyjas/quantum-tensor-kit",
    stars: "890",
    license: "Apache-2.0",
    install: "pip install q-tensor-kit",
    description:
      "High-performance Matrix Product State (MPS) and PEPS tensor simulator for hybrid VQE.",
  },
];

function ResearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const domainParam = (searchParams.get("domain") as DomainKey) || "all";
  const [selectedDomain, setSelectedDomain] = React.useState<DomainKey>(domainParam);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedYear, setSelectedYear] = React.useState<string>("all");
  const [copiedBibtexId, setCopiedBibtexId] = React.useState<string | null>(null);
  const [copiedRepoName, setCopiedRepoName] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (domainParam !== selectedDomain) {
      setSelectedDomain(domainParam);
    }
  }, [domainParam]);

  const handleDomainFilter = (d: DomainKey) => {
    setSelectedDomain(d);
    const params = new URLSearchParams(searchParams.toString());
    if (d === "all") {
      params.delete("domain");
    } else {
      params.set("domain", d);
    }
    router.replace(`/research?${params.toString()}`, { scroll: false });
  };

  const filteredPapers = PAPERS.filter((p) => {
    const matchesDomain = selectedDomain === "all" || p.domain === selectedDomain;
    const matchesSearch =
      searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.abstract.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesYear = selectedYear === "all" || p.year.toString() === selectedYear;
    return matchesDomain && matchesSearch && matchesYear;
  });

  const copyBibtex = (paper: Paper) => {
    navigator.clipboard.writeText(paper.bibtex);
    setCopiedBibtexId(paper.id);
    setTimeout(() => setCopiedBibtexId(null), 2500);
  };

  const copyInstall = (repo: (typeof OSS_REPOS)[0]) => {
    navigator.clipboard.writeText(repo.install);
    setCopiedRepoName(repo.name);
    setTimeout(() => setCopiedRepoName(null), 2500);
  };

  return (
    <div className="space-y-16 py-10">
      {/* 1. Hero & Domain Filter Chips */}
      <section className="space-y-8">
        <Container size="ultra">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--accent)]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Scientific Exploration & Open Discovery</span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--text)]">
              AI Research Division
            </h1>
            <p className="text-base sm:text-xl text-[var(--text-muted)] leading-relaxed">
              Where AI has rarely or never been applied. Developing continuous invariants, physical
              symmetry priors, and formal mathematical proofs.
            </p>
          </div>

          {/* Domain Filter Chips (URL State Sync) */}
          <div className="flex flex-wrap items-center gap-2 pt-6">
            {(
              [
                { id: "all", label: "All Research", color: "cyan" },
                { id: "medical", label: "Medicine & Biology", color: "medical" },
                { id: "agri", label: "Precision Agriculture", color: "agri" },
                { id: "physics", label: "Theoretical Physics", color: "physics" },
                { id: "math", label: "Higher Mathematics", color: "math" },
                { id: "frontier", label: "Frontier Labs", color: "frontier" },
              ] as const
            ).map((chip) => (
              <button
                key={chip.id}
                type="button"
                onClick={() => handleDomainFilter(chip.id)}
                className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all border ${
                  selectedDomain === chip.id
                    ? "border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--accent)] shadow-[0_0_15px_rgba(34,211,238,0.2)] font-semibold"
                    : "border-[var(--border)] bg-[var(--bg-elev-1)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--accent)]/40"
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* 2. Sticky Sub-Nav with Scroll-Spy Anchors */}
      <nav className="sticky top-16 z-30 border-y border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-md transition-colors">
        <Container size="ultra">
          <div className="flex items-center gap-6 overflow-x-auto py-3 text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
            <a
              href="#case-studies"
              className="hover:text-[var(--accent)] whitespace-nowrap transition-colors"
            >
              Case Studies
            </a>
            <a
              href="#papers"
              className="hover:text-[var(--accent)] whitespace-nowrap transition-colors"
            >
              Papers & Publications
            </a>
            <a
              href="#open-source"
              className="hover:text-[var(--accent)] whitespace-nowrap transition-colors"
            >
              Open Source
            </a>
            <a
              href="#labs"
              className="hover:text-[var(--accent)] whitespace-nowrap transition-colors"
            >
              Frontier Labs
            </a>
            <a
              href="#collaborate"
              className="hover:text-[var(--accent)] whitespace-nowrap transition-colors"
            >
              Collaborate
            </a>
          </div>
        </Container>
      </nav>

      {/* 3. Case Studies (Alternating Layout) */}
      <section id="case-studies" className="space-y-12">
        <Container size="ultra">
          <div className="mb-10 space-y-2">
            <div className="text-xs font-mono uppercase text-[var(--accent)]">
              Breakthrough Inquiries
            </div>
            <h2 className="font-display text-3xl font-bold text-[var(--text)]">
              Domain Case Studies
            </h2>
            <p className="text-sm text-[var(--text-muted)]">
              Concrete investigations from initial natural law formulation to measurable clinical
              and scientific lift.
            </p>
          </div>

          <div className="space-y-8">
            {/* Case Study 1: Medical */}
            {(selectedDomain === "all" || selectedDomain === "medical") && (
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="medical" size="sm">
                      Medicine & Healthcare
                    </Badge>
                    <span className="text-xs font-mono text-[var(--text-muted)]">
                      ICU Triage Case
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[var(--text)]">
                    Neuro-Symbolic ICU Sepsis Early Detection System
                  </h3>
                  <div className="space-y-2 text-xs text-[var(--text-muted)] leading-relaxed">
                    <p>
                      <strong className="text-[var(--text)]">Problem: </strong>
                      Standard deep learning ICU triage models yield high false-positive alarms and
                      lack counterfactual explainability when recommending urgent vasopressors.
                    </p>
                    <p>
                      <strong className="text-[var(--text)]">Approach: </strong>
                      Continuous multi-scale diffusion model coupled with a Z3 SMT constraint solver
                      that verifies clinical contraindications against real-time blood lactate and
                      arterial pressure.
                    </p>
                    <p>
                      <strong className="text-emerald-400 font-semibold">Result: </strong>
                      98.4% AUROC with 14-hour lead time, reducing false alarm fatigue by 64% across
                      8 hospital partner cohorts.
                    </p>
                  </div>
                  <div className="pt-2 flex items-center gap-4">
                    <Button variant="primary" size="sm" asChild>
                      <Link href="/research/papers/neuro-symbolic-triage-icu">
                        <span>Read Full Paper</span>
                        <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                      </Link>
                    </Button>
                    <Link
                      href="/research/medical"
                      className="text-xs font-mono text-[var(--accent)] hover:underline"
                    >
                      Explore Medical Domain Hub →
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] border-b border-[var(--border)] pb-2">
                    <span>Survival ROC Curve</span>
                    <span className="text-emerald-400">AUROC 0.984</span>
                  </div>
                  <div className="h-32 flex items-end gap-2 pt-4">
                    {[35, 52, 68, 80, 89, 94, 98].map((v, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className="w-full rounded-t bg-gradient-to-t from-[var(--accent)]/30 to-[#F472B6]"
                          style={{ height: `${v}%` }}
                        />
                        <span className="text-[9px] font-mono text-[var(--text-muted)]">
                          {i * 2}h
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="text-[10px] font-mono text-center text-[var(--text-muted)]">
                    Lead time before clinical onset (hours)
                  </div>
                </div>
              </div>
            )}

            {/* Case Study 2: Agri */}
            {(selectedDomain === "all" || selectedDomain === "agri") && (
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="agri" size="sm">
                      Precision Agriculture
                    </Badge>
                    <span className="text-xs font-mono text-[var(--text-muted)]">
                      Metagenomic Soil Case
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[var(--text)]">
                    Transformer-Driven Metagenomic Nitrogen Optimization
                  </h3>
                  <div className="space-y-2 text-xs text-[var(--text-muted)] leading-relaxed">
                    <p>
                      <strong className="text-[var(--text)]">Problem: </strong>
                      Chemical fertilizer runoff destroys local water tables while
                      over-fertilization degrades soil microbiome biodiversity across arid
                      agricultural belts.
                    </p>
                    <p>
                      <strong className="text-[var(--text)]">Approach: </strong>
                      Pre-trained genomic transformer conditioned on multispectral Sentinel-2
                      imagery and local bacterial DNA sequencing to micro-prescribe organic
                      bio-stimulants.
                    </p>
                    <p className="text-emerald-400 font-semibold">
                      <strong className="text-emerald-400">Result: </strong>
                      31% yield lift while cutting chemical nitrogen application by 42% across
                      22,000 hectares of experimental test farms.
                    </p>
                  </div>
                  <div className="pt-2 flex items-center gap-4">
                    <Button variant="primary" size="sm" asChild>
                      <Link href="/research/papers/soil-microbiome-transformer-nitrogen">
                        <span>Read Full Paper</span>
                        <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                      </Link>
                    </Button>
                    <Link
                      href="/research/agri"
                      className="text-xs font-mono text-[var(--accent)] hover:underline"
                    >
                      Explore Agriculture Hub →
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] border-b border-[var(--border)] pb-2">
                    <span>Nitrogen Efficiency Lift</span>
                    <span className="text-emerald-400">+31.2%</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="rounded-lg bg-[var(--bg-elev-2)] p-3 text-center">
                      <div className="text-[10px] font-mono text-[var(--text-muted)]">CONTROL</div>
                      <div className="text-xl font-bold text-[var(--text)]">3.8 t/ha</div>
                      <div className="text-[10px] text-[var(--text-muted)]">Standard Chemical</div>
                    </div>
                    <div className="rounded-lg bg-emerald-950/40 border border-emerald-800 p-3 text-center">
                      <div className="text-[10px] font-mono text-emerald-400">TRANSFORMER</div>
                      <div className="text-xl font-bold text-emerald-300">5.0 t/ha</div>
                      <div className="text-[10px] text-emerald-400">Microbial Precision</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* 4. Publications Table (Search + Filter + BibTeX) */}
      <section id="papers" className="space-y-6">
        <Container size="ultra">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div className="space-y-1">
              <div className="text-xs font-mono uppercase text-[var(--accent)]">
                Peer-Reviewed Literature
              </div>
              <h2 className="font-display text-3xl font-bold text-[var(--text)]">
                Publications & Preprints
              </h2>
            </div>

            {/* Search & Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-[var(--text-muted)]" />
                <input
                  type="text"
                  placeholder="Search papers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-elev-1)] pl-9 pr-3 py-2 text-xs text-[var(--text)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none"
                />
              </div>

              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="rounded-xl border border-[var(--border)] bg-[var(--bg-elev-1)] px-3 py-2 text-xs text-[var(--text)] focus:border-[var(--accent)] focus:outline-none"
              >
                <option value="all">All Years</option>
                <option value="2026">2026</option>
                <option value="2025">2025</option>
              </select>
            </div>
          </div>

          {/* Table Container */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-1)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-[var(--border)] bg-[var(--bg-elev-2)]/60 text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
                  <tr>
                    <th className="px-6 py-3.5">Title & Abstract</th>
                    <th className="px-6 py-3.5">Authors</th>
                    <th className="px-4 py-3.5">Domain</th>
                    <th className="px-4 py-3.5">Year</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {filteredPapers.map((paper) => (
                    <tr key={paper.id} className="hover:bg-[var(--bg-elev-2)]/40 transition-colors">
                      <td className="px-6 py-4 max-w-md">
                        <Link
                          href={`/research/papers/${paper.slug}`}
                          className="font-bold text-sm text-[var(--text)] hover:text-[var(--accent)] transition-colors leading-snug"
                        >
                          {paper.title}
                        </Link>
                        <p className="text-[11px] text-[var(--text-muted)] line-clamp-2 mt-1">
                          {paper.abstract}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-[var(--text-muted)] whitespace-nowrap">
                        {paper.authors}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <Badge variant={paper.domain} size="sm">
                          {paper.domainLabel}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 font-mono text-[var(--text-muted)]">{paper.year}</td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => copyBibtex(paper)}
                            className="inline-flex items-center gap-1 rounded-lg border border-[var(--border)] bg-[var(--bg-elev-2)] px-2.5 py-1 text-[11px] font-mono text-[var(--text)] hover:border-[var(--accent)]/50 transition-colors"
                            title="Copy BibTeX Citation"
                          >
                            {copiedBibtexId === paper.id ? (
                              <>
                                <Check className="h-3 w-3 text-emerald-400" />
                                <span className="text-emerald-400">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3 text-[var(--text-muted)]" />
                                <span>BibTeX</span>
                              </>
                            )}
                          </button>

                          <Link
                            href={`/research/papers/${paper.slug}`}
                            className="inline-flex items-center gap-1 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/30 px-2.5 py-1 text-[11px] font-mono hover:bg-[var(--accent)]/20 transition-colors"
                          >
                            <Download className="h-3 w-3" />
                            <span>PDF</span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredPapers.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-12 text-center text-xs text-[var(--text-muted)] font-mono"
                      >
                        No research publications match the selected filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. Open-Source Grid */}
      <section id="open-source" className="space-y-6">
        <Container size="ultra">
          <div className="mb-8 space-y-2">
            <div className="text-xs font-mono uppercase text-[var(--accent)]">
              Public Code & Tooling
            </div>
            <h2 className="font-display text-3xl font-bold text-[var(--text)]">
              Open-Source Repositories
            </h2>
            <p className="text-sm text-[var(--text-muted)]">
              We release foundational model architectures, SMT solver bindings, and research
              datasets under permissive open licenses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OSS_REPOS.map((repo) => (
              <div
                key={repo.name}
                className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-6 space-y-4 hover:border-[var(--accent)]/50 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-mono text-sm font-bold text-[var(--text)]">
                      <Github className="h-4 w-4 text-[var(--accent)]" />
                      <span>{repo.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
                      <span className="text-amber-400">★ {repo.stars}</span>
                      <span>·</span>
                      <span>{repo.license}</span>
                    </div>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    {repo.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between gap-3">
                  <code className="text-[11px] font-mono text-[var(--accent)] bg-[var(--bg)] px-2.5 py-1.5 rounded-lg border border-[var(--border)] flex-1 truncate">
                    {repo.install}
                  </code>
                  <button
                    type="button"
                    onClick={() => copyInstall(repo)}
                    className="shrink-0 p-2 rounded-lg border border-[var(--border)] bg-[var(--bg-elev-2)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                    title="Copy install command"
                  >
                    {copiedRepoName === repo.name ? (
                      <Check className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. Frontier Labs Links */}
      <section id="labs" className="space-y-6">
        <Container size="ultra">
          <div className="mb-8 space-y-2">
            <div className="text-xs font-mono uppercase text-[#FBBF24]">Special Facilities</div>
            <h2 className="font-display text-3xl font-bold text-[var(--text)]">
              Frontier Research Labs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-8 space-y-4 hover:border-[var(--accent)]/50 transition-colors">
              <div className="flex items-center gap-3">
                <Cpu className="h-6 w-6 text-[var(--accent)]" />
                <h3 className="font-display text-xl font-bold text-[var(--text)]">
                  Quantum-Classical Hybrid ML Lab
                </h3>
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Interfacing physical superconducting QPUs with high-throughput GPU clusters for
                materials science, molecular docking, and variational tensor simulations.
              </p>
              <Button variant="secondary" size="sm" asChild>
                <Link href="/research/labs/quantum-classical">
                  <span>Visit Lab Facilities & Roadmap</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                </Link>
              </Button>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-8 space-y-4 hover:border-[var(--accent-2)]/50 transition-colors">
              <div className="flex items-center gap-3">
                <Network className="h-6 w-6 text-[var(--accent-2)]" />
                <h3 className="font-display text-xl font-bold text-[var(--text)]">
                  Neuro-Symbolic AI Lab
                </h3>
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Combining high-capacity neural network perception with first-order formal logic
                theorem provers for safety-critical hospital and financial systems.
              </p>
              <Button variant="secondary" size="sm" asChild>
                <Link href="/research/labs/neuro-symbolic">
                  <span>Visit Lab Facilities & Demos</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* 7. Collaborate CTA */}
      <section id="collaborate">
        <Container size="standard">
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-8 sm:p-12 text-center space-y-6">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text)]">
              Collaborate With Our Research Fellows
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed">
              We sponsor academic fellowships, provide compute grants to university laboratories,
              and co-publish with leading international research institutions.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button variant="primary" size="lg" asChild>
                <Link href="/contact?topic=research">
                  <span>Apply for Research Collaboration</span>
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default function ResearchPage() {
  const [commandOpen, setCommandOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors flex flex-col">
      <SiteNav onOpenCommandPalette={() => setCommandOpen(true)} />
      <main className="flex-1">
        <React.Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center font-mono text-xs text-[var(--accent)]">
              Loading Research Hub...
            </div>
          }
        >
          <ResearchContent />
        </React.Suspense>
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
