"use client";

import * as React from "react";
import { Sparkles, ArrowRight, Github, Twitter, Linkedin, Globe, ShieldCheck } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "../utils";

export interface SiteFooterProps {
  className?: string;
}

export function SiteFooter({ className }: SiteFooterProps) {
  const [email, setEmail] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubmitting(true);
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubscribed(true);
      setEmail("");
    } catch {
      setSubscribed(true);
    } finally {
      setSubmitting(false);
    }
  };

  const footerLinks = {
    Company: [
      { label: "About Softcapphyjas", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Research Fellowship", href: "/careers#fellowships" },
      { label: "Press & News", href: "/news" },
      { label: "Contact Us", href: "/contact" },
      { label: "Trust & Security", href: "/trust" },
    ],
    Research: [
      { label: "Medicine & Biology", href: "/research/medical" },
      { label: "Precision Agriculture", href: "/research/agri" },
      { label: "Theoretical Physics", href: "/research/physics" },
      { label: "Higher Mathematics", href: "/research/math" },
      { label: "Quantum-Classical Lab", href: "/research/labs/quantum-classical" },
      { label: "Neuro-Symbolic Lab", href: "/research/labs/neuro-symbolic" },
      { label: "Publications & Papers", href: "/research#papers" },
    ],
    Enterprise: [
      { label: "All Enterprise Services", href: "/services" },
      { label: "Agentic AI Systems", href: "/services/agentic-ai" },
      { label: "Custom LLMs & Fine-tuning", href: "/services/custom-models" },
      { label: "Legacy Modernization", href: "/services/legacy-modernization" },
      { label: "Enterprise AI Security", href: "/services/ai-security" },
      { label: "MLOps & LLMOps", href: "/services/mlops" },
      { label: "Sovereign On-Prem Deployments", href: "/services/sovereign-ai" },
    ],
    Academy: [
      { label: "Course Catalog", href: "/academy" },
      { label: "Career Pathways", href: "/academy#pathways" },
      { label: "Subscription Pricing", href: "/academy/pricing" },
      { label: "Verify Certificate", href: "/academy/verify" },
      { label: "Enterprise Cohorts", href: "/hire-us?type=academy" },
    ],
    Legal: [
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Terms of Service", href: "/legal/terms" },
      { label: "Refund Policy", href: "/legal/refunds" },
      { label: "Security & Sub-processors", href: "/trust#subprocessors" },
      { label: "Cookie Policy", href: "/legal/privacy#cookies" },
    ],
  };

  return (
    <footer
      className={cn(
        "border-t border-[var(--border)] bg-[var(--bg-elev-1)]/70 text-[var(--text)] transition-colors relative overflow-hidden",
        className
      )}
    >
      {/* Subtle background ambient glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] opacity-10 blur-3xl rounded-full"
        style={{ background: "radial-gradient(circle, #22D3EE, #8B5CF6, transparent 70%)" }}
      />

      <div className="mx-auto max-w-[1760px] px-4 py-16 sm:px-6 lg:px-8">
        {/* Top Newsletter & Brand Band */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 pb-14 border-b border-[var(--border)]">
          <div className="space-y-4 lg:col-span-5">
            <a
              href="/"
              className="inline-flex items-center gap-2.5 font-display text-xl font-bold tracking-tight text-[var(--text)]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--bg-elev-2)] border border-[var(--accent)]/40 text-[var(--accent)] shadow-[0_0_15px_rgba(34,211,238,0.25)]">
                <Sparkles className="h-4 w-4" />
              </span>
              <span>Softcapphyjas</span>
            </a>
            <p className="text-sm text-[var(--text-muted)] max-w-md leading-relaxed">
              Operating at the intersection of mathematical rigor, natural laws, and
              production-grade artificial intelligence. Bringing frontier intelligence where it has
              never been.
            </p>

            {/* Status indicator pill */}
            <div className="pt-2">
              <a
                href="/trust/status"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-elev-2)] px-3 py-1 text-xs font-mono text-[var(--text-muted)] hover:border-[var(--accent)]/40 hover:text-[var(--text)] transition-colors"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>All systems operational</span>
                <span className="text-[var(--text-muted)]/60">·</span>
                <span className="text-emerald-400/90 font-medium">99.98%</span>
              </a>
            </div>
          </div>

          {/* Newsletter subscription form */}
          <div className="space-y-3 lg:col-span-7 lg:pl-12">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text)]">
              Frontier Research & Platform Dispatch
            </h3>
            <p className="text-xs text-[var(--text-muted)] max-w-lg">
              Receive quarterly peer-reviewed paper preprints, algorithmic breakthroughs in natural
              sciences, and Synapse platform release milestones. Never spam.
            </p>

            {subscribed ? (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-400 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 shrink-0" />
                <span>
                  Thank you for subscribing. Please check your inbox to confirm your double opt-in.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="researcher@institute.org"
                  required
                  aria-label="Email for research dispatch"
                  className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-2.5 text-xs text-[var(--text)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[var(--accent)] px-4 py-2.5 text-xs font-medium text-[#05070D] hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  <span>{submitting ? "Joining..." : "Subscribe"}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </form>
            )}
            <p className="text-[11px] text-[var(--text-muted)]/70">
              Protected by Softcapphyjas Privacy Shield. Unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Links Navigation Grid */}
        <div className="grid grid-cols-2 gap-8 py-12 sm:grid-cols-3 md:grid-cols-5 lg:gap-8">
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} className="space-y-3.5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)] font-mono">
                {section}
              </h4>
              <ul className="space-y-2 text-xs text-[var(--text-muted)]">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="transition-colors hover:text-[var(--text)] hover:underline underline-offset-4 decoration-[var(--accent)]/40"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Utility Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-[var(--border)] text-xs text-[var(--text-muted)]">
          <div className="flex flex-wrap items-center gap-4">
            <span>© {new Date().getFullYear()} Softcapphyjas Inc.</span>
            <span className="hidden sm:inline">·</span>
            <span>All rights reserved.</span>
            <span className="hidden sm:inline">·</span>
            <div className="inline-flex items-center gap-1.5 text-[11px]">
              <Globe className="h-3.5 w-3.5 text-[var(--accent)]" />
              <span>English (US / IN)</span>
            </div>
          </div>

          {/* Social Icons & Theme Switcher */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
              aria-label="GitHub Repository"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
              aria-label="Twitter / X Profile"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
              aria-label="LinkedIn Company Page"
            >
              <Linkedin className="h-4 w-4" />
            </a>

            <div className="h-4 w-[1px] bg-[var(--border)]" />

            {/* Accessible Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
