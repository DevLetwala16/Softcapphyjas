"use client";

import * as React from "react";
import Script from "next/script";
import {
  SiteNav,
  SiteFooter,
  CommandPalette,
  ConciergeChatbot,
  CookieBanner,
} from "@softcapphyjas/ui";
import { Hero } from "@/components/hero/hero";
import { TrustStrip } from "@/components/home/trust-strip";
import { ResearchBento } from "@/components/home/research-bento";
import { FrontierLabs } from "@/components/home/frontier-labs";
import { ServiceMatrix } from "@/components/home/service-matrix";
import { SynapseTeaser } from "@/components/home/synapse-teaser";
import { AcademyPromo } from "@/components/home/academy-promo";
import { LatestContent } from "@/components/home/latest-content";
import { HomeCta } from "@/components/home/home-cta";

export default function HomePage() {
  const [commandOpen, setCommandOpen] = React.useState(false);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://softcapphyjas.com/#organization",
        name: "Softcapphyjas",
        url: "https://softcapphyjas.com",
        logo: "https://softcapphyjas.com/brand/logo-mark.svg",
        description:
          "Frontier AI Research & Enterprise Intelligence in medicine, agriculture, physics, and higher mathematics.",
        sameAs: [
          "https://github.com/softcapphyjas",
          "https://twitter.com/softcapphyjas",
          "https://linkedin.com/company/softcapphyjas",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://softcapphyjas.com/#website",
        url: "https://softcapphyjas.com",
        name: "Softcapphyjas",
        publisher: { "@id": "https://softcapphyjas.com/#organization" },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-200 flex flex-col selection:bg-[var(--accent)]/30 selection:text-[var(--accent)]">
      {/* Structured Data (JSON-LD) */}
      <Script
        id="org-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Global Navigation Header (Board 04) */}
      <SiteNav onOpenCommandPalette={() => setCommandOpen(true)} />

      {/* Main Content Sections (Board 06 §1-§9) */}
      <main className="flex-1">
        {/* 1. Hero with 2D NeuralCanvas */}
        <Hero />

        {/* 2. Trust Strip with Live Metric Counters & Partner Badges */}
        <TrustStrip />

        {/* 3. Research Highlights Bento Grid */}
        <ResearchBento />

        {/* 4. Frontier Labs Split (Quantum-Classical | Neuro-Symbolic) */}
        <FrontierLabs />

        {/* 5. Enterprise Service Matrix with Animated Blueprints */}
        <ServiceMatrix />

        {/* 6. Flagship AI (Synapse) Teaser with Interactive Scripted Mini-Chat */}
        <SynapseTeaser />

        {/* 7. Academy Promo Carousel with EMI Hints */}
        <AcademyPromo />

        {/* 8. Latest Content (Paper, Blog, News) */}
        <LatestContent />

        {/* 9. Bottom CTA Band + Newsletter */}
        <HomeCta />
      </main>

      {/* 10. Global Site Footer (Board 06 §10) */}
      <SiteFooter />

      {/* Command Palette (⌘K) */}
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

      {/* Global Concierge RAG Chatbot Widget */}
      <ConciergeChatbot />

      {/* Cookie Consent Banner */}
      <CookieBanner />

      {/* Mobile Sticky Bottom CTA (Board 06 Spec §1) */}
      <div className="fixed bottom-0 inset-x-0 p-3 bg-[var(--bg)]/95 backdrop-blur-md border-t border-[var(--border)] z-40 sm:hidden flex items-center justify-between gap-3 shadow-2xl">
        <div className="text-xs">
          <div className="font-bold text-[var(--text)]">Deploy Frontier AI</div>
          <div className="text-[10px] text-[var(--text-muted)]">Enterprise & Research</div>
        </div>
        <a
          href="/contact"
          className="inline-flex items-center justify-center rounded-xl bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-black shadow-lg shadow-[var(--accent)]/20 hover:opacity-90 active:scale-95 transition-all"
        >
          Talk to us
        </a>
      </div>
    </div>
  );
}
