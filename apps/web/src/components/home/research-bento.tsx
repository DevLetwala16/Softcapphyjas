"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Dna, Sprout, Atom, Binary } from "lucide-react";
import { Container, Badge } from "@softcapphyjas/ui";

export function ResearchBento() {
  const domains = [
    {
      id: "medical",
      title: "Medical & Healthcare AI",
      tag: "Computational Biology",
      icon: Dna,
      color: "#F472B6",
      headline: "Multi-omics biomarker discovery & clinical decision support.",
      metric: "98.4% AUROC",
      metricLabel: "ICU Sepsis Early Triage",
      description:
        "Interpretable graph neural networks and diffusion generative models that discover rare genomic biomarkers and predict ICU patient deterioration 14 hours in advance.",
      href: "/research/medical",
      paperTitle: "Neuro-symbolic triage for ICU clinical pathways",
    },
    {
      id: "agri",
      title: "Precision Agritech",
      tag: "Biogeochemical ML",
      icon: Sprout,
      color: "#34D399",
      headline: "Soil microbiome transformers & real-time crop yield forecasting.",
      metric: "31% Yield Lift",
      metricLabel: "Nitrogen Efficiency Optimization",
      description:
        "Physics-informed neural networks simulating nutrient transport, satellite hyperspectral imagery, and subterranean bacterial metagenomics across arid soil ecosystems.",
      href: "/research/agri",
      paperTitle: "Deep transformer models for soil microbiome nitrogen cycles",
    },
    {
      id: "physics",
      title: "Theoretical & Material Physics",
      tag: "Quantum Simulation",
      icon: Atom,
      color: "#22D3EE",
      headline: "Variational quantum eigensolvers & continuous manifold mechanics.",
      metric: "10,000× Speedup",
      metricLabel: "Over Classical DFT Solvers",
      description:
        "Equivariant neural networks predicting electronic band structures, topological invariants, and room-temperature superconducting crystal candidates.",
      href: "/research/physics",
      paperTitle: "Hybrid variational quantum kernels for strongly-correlated electrons",
    },
    {
      id: "math",
      title: "Mathematics & Theorem Proving",
      tag: "Formal Verification",
      icon: Binary,
      color: "#A78BFA",
      headline: "Reinforcement learning for Lean 4 formal proof discovery.",
      metric: "420+ Lemmas",
      metricLabel: "Formally Verified in Mathlib4",
      description:
        "Tree-search guided by transformer policy networks that synthesize machine-checked formal proofs for non-trivial conjectures in algebraic topology and combinatorics.",
      href: "/research/math",
      paperTitle: "Monte Carlo tree search over Lean 4 proof graphs",
    },
  ];

  return (
    <section className="py-20 bg-[var(--bg)] transition-colors relative">
      <Container size="ultra">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--accent)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              <span>Scientific Research Division</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text)]">
              Four domains. <span className="text-[var(--accent)]">One method.</span>
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
              We apply continuous invariants, physical symmetry priors, and machine-verified logic
              to disciplines where black-box machine learning historically fails.
            </p>
          </div>

          <Link
            href="/research"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:text-white transition-colors"
          >
            <span>View All Papers & Open Source</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {domains.map((d) => {
            const Icon = d.icon;
            return (
              <div
                key={d.id}
                className="group relative rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-8 transition-all duration-300 hover:border-[var(--accent)]/50 hover:shadow-lg flex flex-col justify-between overflow-hidden"
              >
                {/* Accent ambient corner glow */}
                <div
                  className="pointer-events-none absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-10 group-hover:opacity-25 transition-opacity blur-2xl"
                  style={{ background: d.color }}
                />

                <div className="space-y-6">
                  {/* Top Bar: Icon + Tag */}
                  <div className="flex items-center justify-between">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg-elev-2)] transition-transform group-hover:scale-110"
                      style={{ color: d.color }}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <Badge variant={d.id as "medical" | "agri" | "physics" | "math"} size="sm">
                      {d.tag}
                    </Badge>
                  </div>

                  {/* Title & Headline */}
                  <div className="space-y-2">
                    <h3 className="font-display text-xl font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                      {d.title}
                    </h3>
                    <p className="text-sm font-medium text-[var(--text)] leading-snug">
                      {d.headline}
                    </p>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      {d.description}
                    </p>
                  </div>

                  {/* Highlight Metric Pill */}
                  <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-elev-2)]/80 p-3.5 flex items-center justify-between">
                    <span className="text-xs font-mono text-[var(--text-muted)]">
                      {d.metricLabel}
                    </span>
                    <span className="font-mono text-sm font-bold" style={{ color: d.color }}>
                      {d.metric}
                    </span>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="pt-6 mt-6 border-t border-[var(--border)] flex items-center justify-between text-xs">
                  <span className="text-[var(--text-muted)] truncate max-w-[240px]">
                    {d.paperTitle}
                  </span>
                  <Link
                    href={d.href}
                    className="inline-flex items-center gap-1.5 font-semibold text-[var(--accent)] hover:underline underline-offset-4"
                  >
                    <span>Read Study</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
