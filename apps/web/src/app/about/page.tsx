import * as React from "react";
import Link from "next/link";
import { SiteNav, SiteFooter, Container, Button } from "@softcapphyjas/ui";
import { Sparkles, ArrowRight, Download, Cpu, Atom } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Softcapphyjas | Frontier AI Research & Enterprise Intelligence",
  description:
    "We bridge mathematical rigor, physical laws, and enterprise AI engineering to take intelligence where it has never been before.",
};

export default function AboutPage() {
  const values = [
    {
      title: "Mathematical Rigor Over Hype",
      desc: "We ground artificial intelligence in first-order logic, differential geometry, and formal verification. When lives or enterprise assets depend on a model, statistical hallucination is unacceptable.",
    },
    {
      title: "Dual-Engine Thesis",
      desc: "Fundamental scientific discovery and production software engineering are not separate endeavors. Our research fellows publish breakthroughs in Nature and Phys Rev while our engineers ship fault-tolerant distributed systems to Fortune 500s.",
    },
    {
      title: "Sovereignty & Privacy by Design",
      desc: "Organizations and nations have the right to absolute ownership of their models and training weights. We engineer completely air-gapped systems that operate with zero external telemetry.",
    },
  ];

  const leadership = [
    {
      name: "Dr. Siddharth Iyer",
      role: "Chief Research Officer & Co-Founder",
      bio: "Theoretical physicist and machine learning researcher specializing in variational quantum algorithms, continuous manifolds, and tensor network simulations.",
      affiliation: "Ex-Stanford Fellow · Physical Review X Author",
    },
    {
      name: "Dr. Ananya Rao",
      role: "Director of Biomedical Systems",
      bio: "Physician-scientist and computational biologist leading neuro-symbolic clinical decision systems and metagenomic diagnostic pipelines.",
      affiliation: "Nature Digital Medicine · Ex-Hopkins Medicine",
    },
    {
      name: "Pranav Nair",
      role: "Head of Formal Reasoning",
      bio: "Mathematician and automated theorem proving architect with extensive contributions to Lean 4 Mathlib and verified cyber-physical systems.",
      affiliation: "Lean 4 Mathlib Contributor · ACM SIGACT",
    },
    {
      name: "Marcus Thorne",
      role: "Chief Platform Architect",
      bio: "Distributed systems engineer leading low-latency GPU cluster orchestration, vLLM serving infrastructure, and air-gapped sovereign appliances.",
      affiliation: "Ex-Google Infrastructure · Kubernetes Contributor",
    },
  ];

  const milestones = [
    {
      year: "2024",
      title: "Laboratory Inception",
      desc: "Founded with the mission to build AI architectures capable of reasoning over continuous physical and biological laws.",
    },
    {
      year: "2025",
      title: "Lean 4 Proof Breakthrough & First QPU Benchmarks",
      desc: "Synthesized 420+ automated lemmas in Mathlib4 and demonstrated 10,000× speedup in 2D Hubbard simulation using hybrid variational kernels.",
    },
    {
      year: "2026",
      title: "Softcapphyjas Synapse & Enterprise Expansion",
      desc: "Launched Synapse flagship multimodal reasoning engine and expanded enterprise production modernizations across healthcare, agriculture, and finance.",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors flex flex-col">
      <SiteNav />

      <main className="flex-1 space-y-20 py-12">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <Container size="ultra">
            <div className="space-y-6 max-w-4xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--accent)]">
                <Sparkles className="h-3.5 w-3.5" />
                <span>About Softcapphyjas</span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--text)] leading-tight">
                Intelligence, taken where it has{" "}
                <span className="text-[var(--accent)]">never been before.</span>
              </h1>

              <p className="text-lg sm:text-xl text-[var(--text-muted)] leading-relaxed">
                Softcapphyjas was founded on a simple conviction: artificial intelligence will only
                transform the world when it moves beyond black-box text correlation and masters the
                physical laws, continuous invariants, and mathematical proofs governing nature and
                enterprise.
              </p>
            </div>
          </Container>
        </section>

        {/* The Dual-Engine Thesis */}
        <section className="border-y border-[var(--border)] bg-[var(--bg-elev-1)]/40 py-16">
          <Container size="ultra">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="text-xs font-mono uppercase text-[var(--accent)]">
                  Founding Thesis
                </div>
                <h2 className="font-display text-3xl font-bold text-[var(--text)]">
                  The Dual-Engine Model
                </h2>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  Traditional industry either builds speculative research disconnected from
                  deployment, or rushes fragile demos that fail under enterprise security and
                  regulatory audits.
                </p>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  Softcapphyjas operates a tightly coupled dual engine: fundamental research in our
                  Frontier Labs feeds continuous model breakthroughs directly into our enterprise
                  engineering delivery teams.
                </p>
                <div className="pt-2">
                  <Button variant="secondary" asChild>
                    <Link href="/research">
                      <span>Explore Scientific Research</span>
                      <ArrowRight className="h-4 w-4 ml-1.5" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-6 space-y-2">
                  <Atom className="h-6 w-6 text-[var(--accent)]" />
                  <h3 className="font-bold text-sm text-[var(--text)]">
                    Engine 1: Frontier Science
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    Continuous manifold invariants, quantum hybrid algorithms, and machine-verified
                    Lean 4 mathematics.
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-6 space-y-2">
                  <Cpu className="h-6 w-6 text-[var(--accent-2)]" />
                  <h3 className="font-bold text-sm text-[var(--text)]">
                    Engine 2: Production Systems
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    Sovereign air-gapped clusters, legacy mainframe modernization, and deterministic
                    agent orchestrations.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Core Values */}
        <section className="space-y-6">
          <Container size="ultra">
            <div className="mb-10 space-y-2">
              <div className="text-xs font-mono uppercase text-[var(--accent)]">
                Operating Principles
              </div>
              <h2 className="font-display text-3xl font-bold text-[var(--text)]">
                Our Core Values
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map((v, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-8 space-y-3"
                >
                  <div className="font-mono text-xs text-[var(--accent)] font-semibold">
                    Principle 0{i + 1}
                  </div>
                  <h3 className="font-display text-lg font-bold text-[var(--text)]">{v.title}</h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Leadership & Research Fellows */}
        <section className="space-y-6">
          <Container size="ultra">
            <div className="mb-10 space-y-2">
              <div className="text-xs font-mono uppercase text-[var(--accent)]">
                Leadership & Scientific Fellows
              </div>
              <h2 className="font-display text-3xl font-bold text-[var(--text)]">
                Research Fellows & Platform Directors
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {leadership.map((leader, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-6 space-y-3 hover:border-[var(--accent)]/50 transition-colors"
                >
                  <div className="h-12 w-12 rounded-xl bg-[var(--bg-elev-2)] border border-[var(--border)] flex items-center justify-center font-mono font-bold text-base text-[var(--accent)]">
                    {leader.name.charAt(leader.name.lastIndexOf(" ") + 1)}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[var(--text)]">{leader.name}</h3>
                    <div className="text-xs text-[var(--accent)] font-medium">{leader.role}</div>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">{leader.bio}</p>
                  <div className="text-[10px] font-mono text-[var(--text-muted)]/80 pt-2 border-t border-[var(--border)]">
                    {leader.affiliation}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Milestone Timeline */}
        <section className="space-y-6">
          <Container size="ultra">
            <div className="mb-10 space-y-2">
              <div className="text-xs font-mono uppercase text-[var(--accent)]">
                Company Trajectory
              </div>
              <h2 className="font-display text-3xl font-bold text-[var(--text)]">
                Milestones of Discovery
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {milestones.map((m, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-8 space-y-3"
                >
                  <div className="font-mono text-xl font-extrabold text-[var(--accent)]">
                    {m.year}
                  </div>
                  <h3 className="font-display text-lg font-bold text-[var(--text)]">{m.title}</h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Press Kit Download */}
        <section>
          <Container size="standard">
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-8 sm:p-12 text-center space-y-6">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text)]">
                Press & Media Kit
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed">
                Download verified high-resolution brand vectors, executive photography, and
                foundational whitepapers.
              </p>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/news#media-kit">
                  <Download className="h-4 w-4 mr-2" />
                  <span>Download Media Assets & Press Kit</span>
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
