"use client";

import * as React from "react";
import Link from "next/link";
import { APP_CONFIG } from "@softcapphyjas/config";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  StatCard,
  Badge,
  Container,
  Section,
  SiteNav,
  CookieBanner,
  ConciergeChatbot,
  CommandPalette,
} from "@softcapphyjas/ui";
import { ArrowRight } from "lucide-react";

type DomainId = "medical" | "agri" | "physics" | "math" | "frontier";

export default function HomePage() {
  const [commandOpen, setCommandOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-200">
      {/* Global Navigation with Mega-Menu (Board 04) */}
      <SiteNav onOpenCommandPalette={() => setCommandOpen(true)} />

      {/* Hero Section */}
      <Section spacing="lg" className="relative overflow-hidden">
        {/* Glow backdrop accents */}
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-25 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, #22D3EE, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, #8B5CF6, transparent 70%)" }}
        />

        <Container size="standard">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono-data uppercase tracking-wider text-[var(--accent)] bg-[var(--accent)]/10 border border-[var(--accent)]/30">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
              Phase 1 Complete · Design System Active
            </div>

            <h1 className="text-display tracking-tight text-[var(--text)]">
              {APP_CONFIG.name}
            </h1>

            <p className="text-body text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
              {APP_CONFIG.tagline}. Operating at the frontier of AI research across biology, agriculture, physics, and higher mathematics, paired with enterprise AI engineering and the Softcapphyjas Synapse platform.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Button variant="primary" size="lg" asChild>
                <Link href="/design-system">
                  <span>Open Design System Showcase</span>
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/research">Explore Research</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Metrics Strip */}
      <Section spacing="sm" className="border-y border-[var(--border)] bg-[var(--bg-elev-1)]/40">
        <Container size="ultra">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard
              label="Scientific Domains"
              value="5"
              subValue="Bio, Agri, Physics, Math, Frontier"
            />
            <StatCard
              label="Design Tokens"
              value="42+"
              subValue="Fluid type, glass, elevations"
            />
            <StatCard
              label="Responsive Range"
              value="375 → 2560px"
              subValue="Container queries + fluid grids"
            />
            <StatCard
              label="Accessibility"
              value="WCAG 2.2 AA"
              subValue="Keyboard-first & focus rings"
            />
          </div>
        </Container>
      </Section>

      {/* Domain Cards Section */}
      <Section spacing="lg">
        <Container size="ultra">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-h2 mb-2 text-[var(--text)]">
              Frontier Research Taxonomies
            </h2>
            <p className="text-sm text-[var(--text-muted)]">
              Colour-coded domains mapped directly to mathematical and natural law investigations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {APP_CONFIG.domains.map((domain) => (
              <Card
                key={domain.id}
                variant="standard"
                className="hover:border-[var(--accent)]/40 transition-colors"
              >
                <CardHeader>
                  <Badge variant={domain.id as DomainId} size="sm">
                    {domain.id.toUpperCase()}
                  </Badge>
                  <CardTitle className="text-base mt-2">{domain.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    Continuous invariants, deep learning models, and reproducible benchmarks.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Global Command Palette */}
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

      {/* Concierge Chatbot Widget */}
      <ConciergeChatbot />

      {/* Cookie Consent Banner */}
      <CookieBanner />
    </div>
  );
}
