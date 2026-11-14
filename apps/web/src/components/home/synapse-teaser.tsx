"use client";

import * as React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, CheckCircle2, Bot, Shield, BookOpen } from "lucide-react";
import { Container, Button } from "@softcapphyjas/ui";

type DomainLens = "medical" | "agri" | "physics" | "math";

interface DemoQuery {
  prompt: string;
  response: string;
  citations: string[];
  confidence: string;
  latency: string;
}

const DEMOS: Record<DomainLens, DemoQuery> = {
  medical: {
    prompt: "Analyze multi-parametric MRI and calculate ischemic core volume vs penumbra...",
    response:
      "Ischemic core identified in left MCA territory (ADC < 620 × 10⁻⁶ mm²/s). Estimated core volume: 18.4 mL. Total hypoperfused tissue (Tmax > 6s): 74.2 mL. Mismatch ratio is 4.03, satisfying DEFUSE-3 criteria for mechanical thrombectomy with 99.1% safety bounds.",
    citations: ["DEFUSE-3 Trial (NEJM)", "Softcapphyjas Neuro-Diffusion v2.4", "ASNR Guidelines"],
    confidence: "99.4%",
    latency: "38ms",
  },
  agri: {
    prompt: "Diagnose soil nitrogen fixation deficit from hyperspectral satellite indices...",
    response:
      "NDVI/REIP index divergence indicates acute nitrogen-fixing Rhizobium inhibition in Plot 4B (pH 5.2, high salinity). Recommending micro-dosed calcareous amendment (220 kg/ha) combined with bio-stimulant foliar spray to recover nodule symbiosis before flowering.",
    citations: [
      "ICAR Metagenomic Soil Atlas 2026",
      "Hyperspectral Bio-Transformer v3",
      "Agronomy J. 118",
    ],
    confidence: "97.8%",
    latency: "42ms",
  },
  physics: {
    prompt: "Formulate variational ansatz for 2D kagome lattice spin-liquid ground state...",
    response:
      "Constructing fermionic projective symmetry group (PSG) ansatz with Z₂ topological order on kagome lattice. Optimizing variational Monte Carlo parameters yields ground state energy E₀ = -0.4386(2) J per site, establishing gapless Dirac spin liquid without chiral symmetry breaking.",
    citations: [
      "Phys. Rev. X 14, 021034",
      "Quantum-Classical Hybrid ML Lab Paper #12",
      "Lean 4 Mathlib",
    ],
    confidence: "98.9%",
    latency: "51ms",
  },
  math: {
    prompt: "Search for inductive invariant in non-linear polynomial dynamical loop...",
    response:
      "Synthesized polynomial loop invariant I(x, y) = 3x² + 5y² - 2xy ≤ 40 using Positivstellensatz cone decomposition. Formally verified in Lean 4 theorem prover: theorem dynamic_safe : ∀ n, invariant (step^[n] s₀). Proof certificate attached with zero counter-examples.",
    citations: [
      "Formal Lean 4 Certificate #8812",
      "Mathlib4 Topology Library",
      "Annals of Math 2025",
    ],
    confidence: "100.0%",
    latency: "32ms",
  },
};

export function SynapseTeaser() {
  const [lens, setLens] = React.useState<DomainLens>("medical");
  const [isTyping, setIsTyping] = React.useState(false);
  const [displayedText, setDisplayedText] = React.useState(DEMOS.medical.response);

  const activeDemo = DEMOS[lens];

  const handleSelectLens = (newLens: DomainLens) => {
    setLens(newLens);
    setIsTyping(true);
    setDisplayedText("");

    const fullText = DEMOS[newLens].response;
    let idx = 0;
    const interval = setInterval(() => {
      idx += 4;
      if (idx >= fullText.length) {
        setDisplayedText(fullText);
        setIsTyping(false);
        clearInterval(interval);
      } else {
        setDisplayedText(fullText.slice(0, idx));
      }
    }, 15);
  };

  return (
    <section className="py-20 bg-[var(--bg-elev-1)]/60 border-t border-[var(--border)] transition-colors relative overflow-hidden">
      {/* Violet ambient glow backdrop */}
      <div
        className="pointer-events-none absolute -top-40 right-1/4 w-[600px] h-[600px] rounded-full opacity-15 blur-3xl"
        style={{ background: "radial-gradient(circle, #8B5CF6, #22D3EE, transparent 70%)" }}
      />

      <Container size="ultra">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text & CTA */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-2)]/40 bg-[var(--accent-2)]/10 px-3.5 py-1 text-xs font-mono uppercase tracking-wider text-[var(--accent-2)]">
              <Sparkles className="h-3.5 w-3.5 text-[var(--accent-2)]" />
              <span>Introducing Flagship AI</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--text)]">
              Softcapphyjas <span className="text-[var(--accent-2)]">Synapse</span>
            </h2>

            <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
              The first multi-modal artificial intelligence natively architected to reason across
              continuous biology, precision agronomy, mathematical proofs, and enterprise systems.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-[var(--text)]">
                <CheckCircle2 className="h-4 w-4 text-[var(--accent-2)]" />
                <span>Domain lenses with mathematical verification & SMT solvers</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[var(--text)]">
                <CheckCircle2 className="h-4 w-4 text-[var(--accent-2)]" />
                <span>
                  Zero fabricated citations — all outputs ground in peer-reviewed literature
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[var(--text)]">
                <CheckCircle2 className="h-4 w-4 text-[var(--accent-2)]" />
                <span>
                  Available as API, local workstation app, or air-gapped sovereign cluster
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button
                variant="primary"
                size="lg"
                asChild
                className="bg-[var(--accent-2)] hover:bg-[var(--accent-2)]/90 text-white shadow-[0_0_25px_rgba(139,92,246,0.35)]"
              >
                <Link href="/flagship-ai">
                  <span>Explore Synapse Capabilities</span>
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>

              <Button variant="secondary" size="lg" asChild>
                <Link href="/flagship-ai#beta">Join Private Beta</Link>
              </Button>
            </div>
          </div>

          {/* Right Interactive Device Mockup & Scripted Mini-Chat */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-[var(--accent-2)]/30 bg-[var(--bg)] p-5 sm:p-7 shadow-2xl relative overflow-hidden backdrop-blur-xl">
              {/* Header bar */}
              <div className="flex flex-wrap items-center justify-between pb-4 border-b border-[var(--border)] gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-3 w-3 rounded-full bg-[var(--accent-2)] animate-pulse" />
                  <span className="font-mono text-xs font-semibold text-[var(--text)] uppercase tracking-wider">
                    Synapse Live Reasoning Sandbox
                  </span>
                </div>

                {/* Domain Lens Pills */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--bg-elev-2)] border border-[var(--border)]">
                  {(["medical", "agri", "physics", "math"] as DomainLens[]).map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => handleSelectLens(d)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                        lens === d
                          ? "bg-[var(--accent-2)] text-white shadow-sm"
                          : "text-[var(--text-muted)] hover:text-[var(--text)]"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Viewport */}
              <div className="py-6 space-y-4 min-h-[260px]">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-tr-none bg-[var(--bg-elev-2)] border border-[var(--border)] px-4 py-3 text-xs text-[var(--text)] space-y-1">
                    <div className="font-mono text-[10px] text-[var(--accent-2)] uppercase">
                      User Query · {lens} Lens
                    </div>
                    <div>{activeDemo.prompt}</div>
                  </div>
                </div>

                {/* Synapse Response */}
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-2)]/20 border border-[var(--accent-2)]/40 text-[var(--accent-2)]">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-3 rounded-2xl rounded-tl-none bg-[var(--bg-elev-1)] border border-[var(--accent-2)]/20 p-4 text-xs text-[var(--text)]">
                    <div className="flex items-center justify-between font-mono text-[10px] text-[var(--text-muted)] border-b border-[var(--border)] pb-2">
                      <span className="text-[var(--accent-2)] font-semibold flex items-center gap-1">
                        <Sparkles className="h-3 w-3" /> Synapse Multi-modal Engine
                      </span>
                      <div className="flex items-center gap-2">
                        <span>Latency: {activeDemo.latency}</span>
                        <span>·</span>
                        <span className="text-emerald-400">Certainty: {activeDemo.confidence}</span>
                      </div>
                    </div>

                    <p className="leading-relaxed">
                      {displayedText}
                      {isTyping && (
                        <span className="inline-block w-1.5 h-3.5 bg-[var(--accent-2)] ml-1 animate-pulse" />
                      )}
                    </p>

                    {/* Citations list */}
                    <div className="pt-2 border-t border-[var(--border)] space-y-1">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1">
                        <BookOpen className="h-3 w-3 text-[var(--accent)]" />
                        <span>Verified Citations & Mathematical Proofs</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {activeDemo.citations.map((c, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--bg)] border border-[var(--border)] text-[var(--accent)]"
                          >
                            [{i + 1}] {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Simulation Bar */}
              <div className="flex items-center justify-between pt-3 border-t border-[var(--border)] text-[11px] font-mono text-[var(--text-muted)]">
                <span className="flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Prompt Guard 2 & Zero Data Retention Active</span>
                </span>
                <Link href="/flagship-ai" className="text-[var(--accent-2)] hover:underline">
                  Launch full interactive workspace →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
