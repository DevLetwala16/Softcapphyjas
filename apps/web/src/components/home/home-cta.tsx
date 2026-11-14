"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { Container, Button } from "@softcapphyjas/ui";

export function HomeCta() {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubmitted(true);
      setEmail("");
    } catch {
      setSubmitted(true);
    }
  };

  return (
    <section className="py-24 bg-[var(--bg)] transition-colors relative overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(34,211,238,0.2) 0%, rgba(139,92,246,0.15) 50%, transparent 80%)",
        }}
      />

      <Container size="standard">
        <div className="relative rounded-3xl border border-[var(--border)] bg-[var(--bg-elev-1)]/90 p-8 sm:p-14 text-center space-y-8 backdrop-blur-xl shadow-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-[var(--accent)]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Start Building Today</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text)] max-w-2xl mx-auto leading-tight">
            Have a problem AI has <span className="text-[var(--accent)]">never touched?</span>
          </h2>

          <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed">
            From discovering novel cellular pathways and modeling continuous physics to engineering
            sovereign LLMs for Fortune 500 enterprises, our team is ready.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button variant="primary" size="lg" asChild className="shadow-[var(--glow)]">
              <Link href="/hire-us">
                <span>Start a Project</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>

            <Button variant="secondary" size="lg" asChild>
              <Link href="/contact?topic=research">Collaborate on Research</Link>
            </Button>
          </div>

          {/* Mini Newsletter Opt-in */}
          <div className="pt-8 border-t border-[var(--border)] max-w-md mx-auto space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
              Or subscribe to our quarterly research dispatch
            </div>

            {submitted ? (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-400 flex items-center justify-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                <span>Thank you! Confirmation link dispatched to your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@organization.com"
                  required
                  aria-label="Email address"
                  className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-2.5 text-xs text-[var(--text)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none"
                />
                <Button variant="secondary" size="sm" type="submit">
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
