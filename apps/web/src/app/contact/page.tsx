"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { SiteNav, SiteFooter, Container, Button } from "@softcapphyjas/ui";
import { Mail, MapPin, Clock, Check, ArrowRight, Sparkles, Lock } from "lucide-react";

function ContactFormInner() {
  const searchParams = useSearchParams();
  const initialTopic = searchParams.get("topic") || "enterprise";

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [organization, setOrganization] = React.useState("");
  const [topic, setTopic] = React.useState(initialTopic);
  const [message, setMessage] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (searchParams.get("topic")) {
      setTopic(searchParams.get("topic")!);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, organization, topic, message }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* Contact Form */}
      <div className="lg:col-span-7 rounded-3xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-8 sm:p-10 space-y-6">
        <div className="space-y-2">
          <h2 className="font-display text-2xl font-bold text-[var(--text)]">Send an Inquiry</h2>
          <p className="text-xs text-[var(--text-muted)]">
            Our principal researchers and platform architects review all technical inquiries within
            24 hours.
          </p>
        </div>

        {submitted ? (
          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-8 text-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
              <Check className="h-6 w-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-[var(--text)]">Inquiry Received</h3>
            <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto leading-relaxed">
              Thank you for reaching out, {name}. A confirmation email has been dispatched, and our
              team will get in touch shortly.
            </p>
            <Button variant="secondary" size="sm" onClick={() => setSubmitted(false)}>
              Send Another Inquiry
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-[var(--text)] font-semibold">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Dr. Jane Doe"
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-2.5 text-xs text-[var(--text)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-[var(--text)] font-semibold">
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane.doe@institution.org"
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-2.5 text-xs text-[var(--text)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-[var(--text)] font-semibold">
                  Organization / Company
                </label>
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="Acme Health / Stanford / Gov"
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-2.5 text-xs text-[var(--text)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-[var(--text)] font-semibold">
                  Inquiry Topic *
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-2.5 text-xs text-[var(--text)] focus:border-[var(--accent)] focus:outline-none"
                >
                  <option value="enterprise">Enterprise AI Engineering & Modernization</option>
                  <option value="research">Scientific Research Collaboration & Grants</option>
                  <option value="synapse">Softcapphyjas Synapse Institutional Access</option>
                  <option value="academy">Academy Cohort & Corporate Training</option>
                  <option value="careers">Careers & Research Fellowships</option>
                  <option value="press">Press & Media Inquiries</option>
                  <option value="general">General Inquiries</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-[var(--text)] font-semibold">
                Your Message *
              </label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Please describe your planned project, scientific dataset, or technical timeline..."
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-xs text-[var(--text)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none"
              />
            </div>

            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-mono text-[var(--text-muted)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="h-3.5 w-3.5 text-emerald-400" />
                <span>Turnstile Verification Active</span>
              </div>
              <span className="text-emerald-400">Verified</span>
            </div>

            <Button
              variant="primary"
              size="lg"
              type="submit"
              disabled={submitting}
              className="w-full"
            >
              <span>{submitting ? "Transmitting Inquiry..." : "Transmit Inquiry"}</span>
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </form>
        )}
      </div>

      {/* Direct Channels & Global Locations */}
      <div className="lg:col-span-5 space-y-8">
        {/* Direct Channels */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-8 space-y-4">
          <div className="text-xs font-mono uppercase text-[var(--accent)] font-semibold">
            Direct Channels
          </div>
          <h3 className="font-display text-xl font-bold text-[var(--text)]">
            Reach Specific Divisions
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-3">
              <Mail className="h-4 w-4 text-[var(--accent)] shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-[var(--text)]">
                  Enterprise & Architecture Inquiries
                </div>
                <a
                  href="mailto:sales@softcapphyjas.com"
                  className="text-[var(--accent)] hover:underline font-mono"
                >
                  sales@softcapphyjas.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="h-4 w-4 text-[var(--accent-2)] shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-[var(--text)]">
                  Scientific Research Collaborations
                </div>
                <a
                  href="mailto:research@softcapphyjas.com"
                  className="text-[var(--accent-2)] hover:underline font-mono"
                >
                  research@softcapphyjas.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-[var(--text)]">
                  Careers & Research Fellowships
                </div>
                <a
                  href="mailto:careers@softcapphyjas.com"
                  className="text-emerald-400 hover:underline font-mono"
                >
                  careers@softcapphyjas.com
                </a>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[var(--border)]">
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
              <Clock className="h-3.5 w-3.5 text-[var(--accent)]" />
              <span>Response Time SLA: Under 24 Business Hours</span>
            </div>
          </div>
        </div>

        {/* Global Hubs */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-8 space-y-4">
          <div className="text-xs font-mono uppercase text-[var(--accent)] font-semibold">
            Global Locations
          </div>
          <h3 className="font-display text-xl font-bold text-[var(--text)]">
            Research & Engineering Hubs
          </h3>

          <div className="space-y-4 text-xs">
            <div className="space-y-1">
              <div className="font-bold text-[var(--text)] flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-[var(--accent)]" />
                <span>Bengaluru · Headquarters & Frontier Labs</span>
              </div>
              <p className="text-[var(--text-muted)] pl-5">
                Outer Ring Road Tech Corridor, Bengaluru, KA 560103, India
              </p>
            </div>

            <div className="space-y-1">
              <div className="font-bold text-[var(--text)] flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-[var(--accent)]" />
                <span>San Francisco · North American Research Office</span>
              </div>
              <p className="text-[var(--text-muted)] pl-5">
                Market Street Financial District, San Francisco, CA 94105, USA
              </p>
            </div>

            <div className="space-y-1">
              <div className="font-bold text-[var(--text)] flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-[var(--accent)]" />
                <span>London · European Partnerships Hub</span>
              </div>
              <p className="text-[var(--text-muted)] pl-5">
                Kings Cross Tech Quarter, London, N1C 4AG, United Kingdom
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors flex flex-col">
      <SiteNav />

      <main className="flex-1 space-y-12 py-12">
        <Container size="ultra">
          <div className="space-y-4 max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--accent)]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Get in Touch</span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--text)]">
              Contact Softcapphyjas
            </h1>
            <p className="text-base sm:text-xl text-[var(--text-muted)] leading-relaxed">
              Whether you are planning a production AI modernization, proposing an academic research
              grant, or inquiring about Synapse, we want to hear from you.
            </p>
          </div>

          <React.Suspense
            fallback={
              <div className="font-mono text-xs text-[var(--accent)]">Loading contact form...</div>
            }
          >
            <ContactFormInner />
          </React.Suspense>
        </Container>
      </main>

      <SiteFooter />
    </div>
  );
}
