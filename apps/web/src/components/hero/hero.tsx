"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@softcapphyjas/ui";

const NeuralCanvas = dynamic(() => import("./neural-canvas").then((m) => m.NeuralCanvas), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[var(--bg)]" />,
});

export function Hero() {
  const scrollToContent = () => {
    const el = document.getElementById("trust-metrics");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative isolate min-h-[92dvh] sm:min-h-[95dvh] flex flex-col justify-between overflow-hidden">
      {/* 2D Neural Canvas Graph Background */}
      <div className="absolute inset-0 -z-10">
        <NeuralCanvas />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_35%,rgba(34,211,238,0.12),transparent_75%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_40%_at_80%_60%,rgba(139,92,246,0.10),transparent_75%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[var(--bg)]" />
      </div>

      {/* Main Hero Content */}
      <div className="mx-auto flex flex-1 max-w-[1760px] w-full flex-col justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="max-w-4xl space-y-6">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-[var(--accent)] backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
            </span>
            <span>Frontier AI Research Lab · Enterprise Intelligence</span>
          </div>

          {/* Hero H1 */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[var(--text)] leading-[1.08]">
            Intelligence, taken where it has{" "}
            <span className="bg-gradient-to-r from-[var(--accent)] via-[#80E9FF] to-[var(--accent-2)] bg-clip-text text-transparent">
              never been.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl text-base sm:text-xl text-[var(--text-muted)] leading-relaxed font-sans">
            We bring rigorous artificial intelligence to medicine, agriculture, theoretical physics,
            and higher mathematics — and engineer sovereign AI infrastructure for global enterprise
            leaders.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Button variant="primary" size="lg" asChild className="shadow-[var(--glow)]">
              <Link href="/research" className="inline-flex items-center gap-2">
                <span>Explore Research</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <Button variant="secondary" size="lg" asChild className="backdrop-blur-md">
              <Link href="/hire-us">Talk to Us</Link>
            </Button>

            <Link
              href="/flagship-ai"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-[var(--accent-2)] hover:text-white transition-colors px-3 py-2 rounded-lg border border-[var(--accent-2)]/30 bg-[var(--accent-2)]/10"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Meet Synapse Flagship AI →</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Cue */}
      <div className="w-full flex justify-center pb-6">
        <button
          type="button"
          onClick={scrollToContent}
          className="group flex flex-col items-center gap-1.5 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text)] transition-colors focus:outline-none"
          aria-label="Scroll to discover research and platform features"
        >
          <span className="tracking-wider uppercase text-[10px] text-[var(--text-muted)]/80">
            Scroll to explore
          </span>
          <ChevronDown className="h-4 w-4 animate-bounce text-[var(--accent)]" />
        </button>
      </div>
    </section>
  );
}
