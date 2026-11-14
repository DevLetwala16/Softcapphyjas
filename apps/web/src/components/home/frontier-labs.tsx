"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Cpu, Network, ShieldCheck, Zap } from "lucide-react";
import { Container, Button } from "@softcapphyjas/ui";

export function FrontierLabs() {
  const [activeQuantumQubit, setActiveQuantumQubit] = React.useState(0);
  const [activeSymbolicNode, setActiveSymbolicNode] = React.useState("proof");

  return (
    <section className="py-20 bg-[var(--bg-elev-1)]/40 border-t border-[var(--border)] transition-colors relative">
      <Container size="ultra">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FBBF24]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FBBF24]" />
            <span>Dedicated Special Research Facilities</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text)]">
            Frontier AI Labs
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
            Two specialized experimental centers exploring non-standard computation and
            mathematically verifiable intelligence.
          </p>
        </div>

        {/* 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Lab 1: Quantum-Classical Hybrid ML Lab */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-8 transition-all hover:border-[var(--accent)]/50 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/30">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-[var(--text)]">
                      Quantum-Classical Hybrid ML Lab
                    </h3>
                    <p className="text-xs font-mono text-[var(--text-muted)]">
                      Q-CHML Division · Lab 01
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/30">
                  Hardware-Integrated
                </span>
              </div>

              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Interfacing superconducting and trapped-ion quantum processors with classical GPU
                clusters via parameterized quantum circuits (PQC) and tensor networks.
              </p>

              {/* Interactive SVG Quantum Circuit Visualizer */}
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4 space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
                  <span>Interactive Ansatz State (Click Qubit)</span>
                  <span className="text-[var(--accent)]">State: |ψ⟩ = α|0⟩ + β|1⟩</span>
                </div>

                <div className="space-y-2 py-2">
                  {[0, 1, 2].map((q) => (
                    <div
                      key={q}
                      onClick={() => setActiveQuantumQubit(q)}
                      className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors border ${
                        activeQuantumQubit === q
                          ? "border-[var(--accent)] bg-[var(--accent)]/10"
                          : "border-transparent bg-[var(--bg-elev-2)] hover:border-[var(--border)]"
                      }`}
                    >
                      <span className="font-mono text-xs text-[var(--accent)] w-8">q[{q}]</span>
                      <div className="flex-1 flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800">
                          H
                        </span>
                        <span className="h-[1px] flex-1 bg-[var(--border)]" />
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-violet-950 text-violet-300 border border-violet-800">
                          Rz(θ_{q})
                        </span>
                        <span className="h-[1px] flex-1 bg-[var(--border)]" />
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800">
                          CNOT
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">
                        {activeQuantumQubit === q ? "Selected" : "Idle"}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] pt-1">
                  <span>Fidelity: 99.42%</span>
                  <span>Variational Depth: L=8</span>
                </div>
              </div>

              {/* Bulleted Capabilities */}
              <ul className="grid grid-cols-2 gap-2 text-xs text-[var(--text-muted)]">
                <li className="flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 text-[var(--accent)]" />
                  <span>VQE Energy Landscapes</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 text-[var(--accent)]" />
                  <span>MPS & PEPS Tensor Nets</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 text-[var(--accent)]" />
                  <span>Quantum Kernel Methods</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 text-[var(--accent)]" />
                  <span>Room-temp Superconductors</span>
                </li>
              </ul>
            </div>

            <Button variant="secondary" asChild className="w-full justify-between">
              <Link href="/research/labs/quantum-classical">
                <span>Explore Quantum Lab Architecture & Papers</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Lab 2: Neuro-Symbolic AI Lab */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-8 transition-all hover:border-[var(--accent-2)]/50 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-2)]/10 text-[var(--accent-2)] border border-[var(--accent-2)]/30">
                    <Network className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-[var(--text)]">
                      Neuro-Symbolic AI Lab
                    </h3>
                    <p className="text-xs font-mono text-[var(--text-muted)]">
                      Symbolic Core · Lab 02
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[var(--accent-2)]/10 text-[var(--accent-2)] border border-[var(--accent-2)]/30">
                  Provable Safety
                </span>
              </div>

              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Binding neural representations with first-order logic and proof systems for
                zero-hallucination diagnostic, surgical, and financial automation.
              </p>

              {/* Interactive Neuro-Symbolic Proof Flow */}
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4 space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
                  <span>Logic Inference Pipeline</span>
                  <span className="text-[var(--accent-2)]">Verification: SMT-Checked</span>
                </div>

                <div className="grid grid-cols-3 gap-2 py-2">
                  <button
                    type="button"
                    onClick={() => setActiveSymbolicNode("perception")}
                    className={`p-2.5 rounded-lg text-left transition-colors border ${
                      activeSymbolicNode === "perception"
                        ? "border-[var(--accent-2)] bg-[var(--accent-2)]/10"
                        : "border-[var(--border)] bg-[var(--bg-elev-2)]"
                    }`}
                  >
                    <div className="text-[10px] font-mono text-[var(--text-muted)]">Step 1</div>
                    <div className="text-xs font-semibold text-[var(--text)]">Perception</div>
                    <div className="text-[10px] text-[var(--accent)] truncate">
                      Vision Transformer
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveSymbolicNode("proof")}
                    className={`p-2.5 rounded-lg text-left transition-colors border ${
                      activeSymbolicNode === "proof"
                        ? "border-[var(--accent-2)] bg-[var(--accent-2)]/10"
                        : "border-[var(--border)] bg-[var(--bg-elev-2)]"
                    }`}
                  >
                    <div className="text-[10px] font-mono text-[var(--text-muted)]">Step 2</div>
                    <div className="text-xs font-semibold text-[var(--text)]">Knowledge Graph</div>
                    <div className="text-[10px] text-[var(--accent-2)] truncate">
                      Ontology Mapping
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveSymbolicNode("audit")}
                    className={`p-2.5 rounded-lg text-left transition-colors border ${
                      activeSymbolicNode === "audit"
                        ? "border-[var(--accent-2)] bg-[var(--accent-2)]/10"
                        : "border-[var(--border)] bg-[var(--bg-elev-2)]"
                    }`}
                  >
                    <div className="text-[10px] font-mono text-[var(--text-muted)]">Step 3</div>
                    <div className="text-xs font-semibold text-[var(--text)]">Z3 Solver</div>
                    <div className="text-[10px] text-emerald-400 truncate">100% Sound Proof</div>
                  </button>
                </div>

                <div className="rounded border border-[var(--border)] bg-[var(--bg-elev-2)] p-2 text-[11px] font-mono text-[var(--text-muted)]">
                  {activeSymbolicNode === "perception" &&
                    "Continuous embeddings extracted from CT scan or EHR time-series."}
                  {activeSymbolicNode === "proof" &&
                    "Triples mapped to SNOMED CT and clinical protocol graph."}
                  {activeSymbolicNode === "audit" &&
                    "SMT Solver guarantees no contraindicated medication is administered."}
                </div>
              </div>

              {/* Bulleted Capabilities */}
              <ul className="grid grid-cols-2 gap-2 text-xs text-[var(--text-muted)]">
                <li className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-[var(--accent-2)]" />
                  <span>Differentiable First-Order Logic</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-[var(--accent-2)]" />
                  <span>Z3 SMT Solver Integration</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-[var(--accent-2)]" />
                  <span>Hard Constraint Enforcement</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-[var(--accent-2)]" />
                  <span>Auditable Decision Chains</span>
                </li>
              </ul>
            </div>

            <Button variant="secondary" asChild className="w-full justify-between">
              <Link href="/research/labs/neuro-symbolic">
                <span>Explore Neuro-Symbolic Lab & Demos</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
