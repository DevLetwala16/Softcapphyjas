"use client";

import * as React from "react";
import {
  Sparkles,
  Search,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  FileText,
  Atom,
  Binary,
} from "lucide-react";
import { Button } from "./button";
import { Badge } from "./badge";
import { ThemeToggle } from "./theme-toggle";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./accordion";
import { cn } from "../utils";

export interface SiteNavProps {
  onOpenCommandPalette?: () => void;
  className?: string;
}

export function SiteNav({ onOpenCommandPalette, className }: SiteNavProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [activeMenu, setActiveMenu] = React.useState<"research" | "services" | null>(null);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (menu: "research" | "services") => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(menu);
    }, 120); // 120ms hover intent delay per Board 04
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 180);
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-[var(--border)] bg-[var(--bg)]/85 backdrop-blur-md transition-colors",
        className
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1760px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <a
            href="/"
            className="flex items-center gap-2.5 font-display text-lg font-bold tracking-tight text-[var(--text)] hover:opacity-90 transition-opacity"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--bg-elev-1)] border border-[var(--accent)]/40 text-[var(--accent)] shadow-[0_0_18px_rgba(34,211,238,0.25)]">
              <Sparkles className="h-4 w-4" />
            </span>
            <span>Softcapphyjas</span>
          </a>

          {/* Desktop Links with Mega-Menu (Board 04) */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-[var(--text-muted)]">
            {/* Research Menu Item */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("research")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                aria-expanded={activeMenu === "research"}
                onClick={() => setActiveMenu(activeMenu === "research" ? null : "research")}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors hover:text-[var(--text)] hover:bg-[var(--bg-elev-1)]",
                  activeMenu === "research" && "text-[var(--accent)] bg-[var(--bg-elev-1)]"
                )}
              >
                <span>Research</span>
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-200",
                    activeMenu === "research" && "rotate-180"
                  )}
                />
              </button>

              {/* Research Mega-Menu Panel */}
              {activeMenu === "research" && (
                <div
                  className="absolute left-0 top-full pt-2 w-[720px] animate-in fade-in-0 zoom-in-95 duration-200"
                  onMouseEnter={() => {
                    if (timeoutRef.current) clearTimeout(timeoutRef.current);
                  }}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-1)]/98 backdrop-blur-xl p-6 shadow-2xl grid grid-cols-4 gap-6 text-left">
                    <div>
                      <div className="flex items-center gap-2 mb-2 font-semibold text-xs text-[#F472B6]">
                        <span className="h-2 w-2 rounded-full bg-[#F472B6]" />
                        <span>Medicine & Bio</span>
                      </div>
                      <p className="text-[11px] text-[var(--text-muted)] leading-relaxed mb-3">
                        Genomics, protein dynamics, oncology AI pipelines.
                      </p>
                      <a
                        href="/research/medical"
                        className="text-xs text-[var(--text)] hover:text-[#F472B6] font-medium flex items-center gap-1"
                      >
                        Explore domain →
                      </a>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2 font-semibold text-xs text-[#34D399]">
                        <span className="h-2 w-2 rounded-full bg-[#34D399]" />
                        <span>Agriculture</span>
                      </div>
                      <p className="text-[11px] text-[var(--text-muted)] leading-relaxed mb-3">
                        Crop pathology, hyperspectral satellite models.
                      </p>
                      <a
                        href="/research/agriculture"
                        className="text-xs text-[var(--text)] hover:text-[#34D399] font-medium flex items-center gap-1"
                      >
                        Explore domain →
                      </a>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2 font-semibold text-xs text-[#22D3EE]">
                        <span className="h-2 w-2 rounded-full bg-[#22D3EE]" />
                        <span>Physics</span>
                      </div>
                      <p className="text-[11px] text-[var(--text-muted)] leading-relaxed mb-3">
                        Hamiltonian neural networks, plasma simulations.
                      </p>
                      <a
                        href="/research/physics"
                        className="text-xs text-[var(--text)] hover:text-[#22D3EE] font-medium flex items-center gap-1"
                      >
                        Explore domain →
                      </a>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2 font-semibold text-xs text-[#A78BFA]">
                        <span className="h-2 w-2 rounded-full bg-[#A78BFA]" />
                        <span>Mathematics</span>
                      </div>
                      <p className="text-[11px] text-[var(--text-muted)] leading-relaxed mb-3">
                        Automated theorem proving, geometric deep learning.
                      </p>
                      <a
                        href="/research/mathematics"
                        className="text-xs text-[var(--text)] hover:text-[#A78BFA] font-medium flex items-center gap-1"
                      >
                        Explore domain →
                      </a>
                    </div>

                    <div className="col-span-4 pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--text-muted)]">
                      <div className="flex items-center gap-4">
                        <a href="/research/papers" className="hover:text-[var(--text)] flex items-center gap-1">
                          <FileText className="h-3.5 w-3.5 text-[var(--accent)]" />
                          Featured Papers
                        </a>
                        <a href="/research/labs" className="hover:text-[var(--text)] flex items-center gap-1">
                          <Atom className="h-3.5 w-3.5 text-[#FBBF24]" />
                          Frontier Labs
                        </a>
                        <a href="/research/open-source" className="hover:text-[var(--text)] flex items-center gap-1">
                          <Binary className="h-3.5 w-3.5 text-[#34D399]" />
                          Open Source
                        </a>
                      </div>

                      <a href="/research" className="text-[var(--accent)] font-semibold flex items-center gap-1 hover:underline">
                        <span>All Research Archives</span>
                        <ArrowRight className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Services Menu Item */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("services")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                aria-expanded={activeMenu === "services"}
                onClick={() => setActiveMenu(activeMenu === "services" ? null : "services")}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors hover:text-[var(--text)] hover:bg-[var(--bg-elev-1)]",
                  activeMenu === "services" && "text-[var(--accent)] bg-[var(--bg-elev-1)]"
                )}
              >
                <span>Services</span>
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-200",
                    activeMenu === "services" && "rotate-180"
                  )}
                />
              </button>

              {/* Services Mega-Menu Panel */}
              {activeMenu === "services" && (
                <div
                  className="absolute left-0 top-full pt-2 w-[600px] animate-in fade-in-0 zoom-in-95 duration-200"
                  onMouseEnter={() => {
                    if (timeoutRef.current) clearTimeout(timeoutRef.current);
                  }}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-1)]/98 backdrop-blur-xl p-6 shadow-2xl grid grid-cols-2 gap-4 text-left">
                    <a
                      href="/services/agentic-ai"
                      className="p-3 rounded-xl hover:bg-[var(--bg-elev-2)] transition-colors group"
                    >
                      <div className="font-semibold text-xs text-[var(--text)] group-hover:text-[var(--accent)] flex items-center justify-between">
                        <span>Agentic AI Systems</span>
                        <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-[11px] text-[var(--text-muted)] mt-1">
                        Multi-agent coordination with cryptographic guardrails.
                      </p>
                    </a>

                    <a
                      href="/services/mlops"
                      className="p-3 rounded-xl hover:bg-[var(--bg-elev-2)] transition-colors group"
                    >
                      <div className="font-semibold text-xs text-[var(--text)] group-hover:text-[var(--accent)] flex items-center justify-between">
                        <span>Enterprise MLOps</span>
                        <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-[11px] text-[var(--text-muted)] mt-1">
                        High-throughput model serving with Redis & pgvector.
                      </p>
                    </a>

                    <a
                      href="/services/ai-security"
                      className="p-3 rounded-xl hover:bg-[var(--bg-elev-2)] transition-colors group"
                    >
                      <div className="font-semibold text-xs text-[var(--text)] group-hover:text-[var(--accent)] flex items-center justify-between">
                        <span>AI Security & Red Teaming</span>
                        <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-[11px] text-[var(--text-muted)] mt-1">
                        Adversarial defense, injection protection, compliance.
                      </p>
                    </a>

                    <a
                      href="/services/sovereign-ai"
                      className="p-3 rounded-xl hover:bg-[var(--bg-elev-2)] transition-colors group"
                    >
                      <div className="font-semibold text-xs text-[var(--text)] group-hover:text-[var(--accent)] flex items-center justify-between">
                        <span>Sovereign Private Deployments</span>
                        <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-[11px] text-[var(--text-muted)] mt-1">
                        Air-gapped on-premise Kubernetes clusters.
                      </p>
                    </a>

                    <div className="col-span-2 pt-3 border-t border-[var(--border)] flex justify-between items-center text-xs">
                      <span className="text-[var(--text-muted)]">12 specialized enterprise capabilities</span>
                      <a href="/services" className="text-[var(--accent)] font-semibold hover:underline">
                        View Interactive Matrix →
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <a
              href="/academy"
              className="px-3 py-2 rounded-lg transition-colors hover:text-[var(--text)] hover:bg-[var(--bg-elev-1)]"
            >
              Academy
            </a>
            <a
              href="/flagship-ai"
              className="px-3 py-2 rounded-lg transition-colors hover:text-[var(--text)] hover:bg-[var(--bg-elev-1)]"
            >
              Synapse
            </a>
            <a
              href="/careers"
              className="px-3 py-2 rounded-lg transition-colors hover:text-[var(--text)] hover:bg-[var(--bg-elev-1)]"
            >
              Careers
            </a>
            <a
              href="/design-system"
              className="px-3 py-2 rounded-lg transition-colors text-[var(--accent)] font-medium"
            >
              Design System
            </a>
          </nav>
        </div>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3">
          {/* ⌘K Search Trigger */}
          <Button
            variant="secondary"
            size="sm"
            onClick={onOpenCommandPalette}
            className="hidden sm:inline-flex items-center gap-2 border-[var(--border)] text-[var(--text-muted)] text-xs h-9 px-3"
            aria-label="Open Command Palette (Cmd+K)"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Search...</span>
            <kbd className="font-mono-data text-[10px] bg-[var(--bg-elev-2)] px-1.5 py-0.5 rounded border border-[var(--border)]">
              ⌘K
            </kbd>
          </Button>

          <ThemeToggle />

          <a
            href="/login"
            className="hidden sm:inline-flex text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text)] px-3 py-2"
          >
            Login
          </a>

          <Button variant="primary" size="sm" asChild>
            <a href="/hire-us">Hire us</a>
          </Button>

          {/* Mobile Drawer Trigger (☰) */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex lg:hidden h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg-elev-1)] text-[var(--text)]"
            aria-label="Open mobile navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu (Board 04) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-[var(--bg-elev-1)] border-l border-[var(--border)] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[var(--border)]">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent)]/15 text-[var(--accent)]">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <span className="font-display font-bold text-base text-[var(--text)]">Softcapphyjas</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg p-1.5 text-[var(--text-muted)] hover:text-[var(--text)]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Accordion navigation (Board 04) */}
              <div className="mt-4">
                <Accordion type="single" collapsible>
                  <AccordionItem value="research">
                    <AccordionTrigger className="text-sm py-3 font-semibold">
                      Research Domains
                    </AccordionTrigger>
                    <AccordionContent className="space-y-2 pl-3">
                      <a href="/research/medical" className="block text-xs py-1 text-[#F472B6]">
                        • Medicine & Computational Biology
                      </a>
                      <a href="/research/agriculture" className="block text-xs py-1 text-[#34D399]">
                        • Precision Agriculture
                      </a>
                      <a href="/research/physics" className="block text-xs py-1 text-[#22D3EE]">
                        • Theoretical Physics
                      </a>
                      <a href="/research/mathematics" className="block text-xs py-1 text-[#A78BFA]">
                        • Higher Mathematics
                      </a>
                      <a href="/research" className="block text-xs py-1 text-[var(--accent)] font-semibold">
                        View All Research →
                      </a>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="services">
                    <AccordionTrigger className="text-sm py-3 font-semibold">
                      Enterprise Services
                    </AccordionTrigger>
                    <AccordionContent className="space-y-2 pl-3">
                      <a href="/services/agentic-ai" className="block text-xs py-1 text-[var(--text)]">
                        • Agentic AI Systems
                      </a>
                      <a href="/services/mlops" className="block text-xs py-1 text-[var(--text)]">
                        • Enterprise MLOps
                      </a>
                      <a href="/services/ai-security" className="block text-xs py-1 text-[var(--text)]">
                        • AI Security & Red Teaming
                      </a>
                      <a href="/services" className="block text-xs py-1 text-[var(--accent)] font-semibold">
                        View All Services →
                      </a>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="space-y-3 pt-4 border-t border-[var(--border)]">
                  <a href="/academy" className="block text-sm font-semibold text-[var(--text)] py-1.5">
                    Softcapphyjas Academy
                  </a>
                  <a href="/flagship-ai" className="block text-sm font-semibold text-[var(--text)] py-1.5">
                    Synapse AI Platform
                  </a>
                  <a href="/careers" className="block text-sm font-semibold text-[var(--text)] py-1.5">
                    Careers & Job Board
                  </a>
                  <a href="/design-system" className="block text-sm font-semibold text-[var(--accent)] py-1.5">
                    Design System Showcase
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Drawer Actions */}
            <div className="pt-6 border-t border-[var(--border)] space-y-4">
              <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                <span>Theme & Language</span>
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <span className="font-mono-data text-xs bg-[var(--bg-elev-2)] px-2 py-1 rounded border border-[var(--border)]">
                    EN / ₹
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="secondary" asChild className="w-full">
                  <a href="/login">Login</a>
                </Button>
                <Button variant="primary" asChild className="w-full">
                  <a href="/hire-us">Hire us</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
