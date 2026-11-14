import * as React from "react";
import { SiteNav, SiteFooter, Container } from "@softcapphyjas/ui";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Softcapphyjas",
  description:
    "Master terms of service governing Softcapphyjas platforms, Academy curriculums, and enterprise services.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors flex flex-col">
      <SiteNav />

      <main className="flex-1 py-14 space-y-10">
        <Container size="standard">
          <div className="space-y-4 pb-8 border-b border-[var(--border)]">
            <span className="text-xs font-mono uppercase text-[var(--accent)] tracking-wider">
              Legal Agreement
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text)]">
              Terms of Service
            </h1>
            <p className="text-xs font-mono text-[var(--text-muted)]">
              Last Updated: November 14, 2026 · Softcapphyjas Inc.
            </p>
          </div>

          <div className="prose prose-invert max-w-none text-xs sm:text-sm text-[var(--text)] leading-relaxed space-y-8 font-sans">
            <section className="space-y-3">
              <h2 className="font-display text-xl font-bold text-[var(--text)]">
                1. Acceptance of Terms
              </h2>
              <p className="text-[var(--text-muted)] leading-relaxed">
                By accessing or using the Softcapphyjas website, platform APIs, Academy courses,
                Synapse AI reasoning endpoints, or entering into an enterprise statement of work
                (SOW), you agree to be bound by these Master Terms of Service. If you are entering
                into these terms on behalf of a legal entity, you represent and warrant that you
                possess the full legal authority to bind that entity.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-xl font-bold text-[var(--text)]">
                2. Intellectual Property & Code Ownership
              </h2>
              <p className="text-[var(--text-muted)] leading-relaxed">
                <strong className="text-[var(--text)]">Client Deliverables: </strong> For all
                bespoke enterprise consulting and code modernization engagements, upon full
                settlement of contracted milestone invoices, the Client owns 100% of all custom
                source code, fine-tuned model adapter weights, and specific training dataset
                artifacts created under the statement of work.
              </p>
              <p className="text-[var(--text-muted)] leading-relaxed">
                <strong className="text-[var(--text)]">Softcapphyjas Platform Core: </strong>{" "}
                Softcapphyjas retains all right, title, and interest in and to our pre-existing
                foundational models, the Synapse reasoning kernel, open-source repositories
                (governed by their respective Apache-2.0 or MIT licenses), and general mathematical
                frameworks.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-xl font-bold text-[var(--text)]">
                3. Academy Courses & Certificate Verification
              </h2>
              <p className="text-[var(--text-muted)] leading-relaxed">
                Academy course enrollments grant a personal, non-transferable license to access
                video lectures, interactive coding labs, and quiz modules. Cryptographically signed
                Ed25519 certificates are issued solely upon achieving the required passing grade
                (typically ≥70%) on course quizzes. Sharing credentials or attempting to circumvent
                verification checks results in immediate revocation of enrollment without refund.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-xl font-bold text-[var(--text)]">
                4. Disclaimers for Medical & Scientific AI
              </h2>
              <p className="text-[var(--text-muted)] leading-relaxed">
                Softcapphyjas Synapse, the Medical AI research models, and related diagnostic
                prototypes are developed for research, educational, and clinical decision support
                purposes only. They do not constitute autonomous medical advice or direct diagnostic
                determinations. Healthcare practitioners must exercise independent medical judgment
                before administering any treatment.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-xl font-bold text-[var(--text)]">
                5. Governing Law & Dispute Resolution
              </h2>
              <p className="text-[var(--text-muted)] leading-relaxed">
                These Terms shall be governed by and construed in accordance with the substantive
                laws of India, without regard to its conflict of law provisions. Any dispute,
                controversy, or claim arising out of or relating to these terms shall be submitted
                to the exclusive jurisdiction of the competent courts in Bengaluru, Karnataka,
                India.
              </p>
            </section>
          </div>
        </Container>
      </main>

      <SiteFooter />
    </div>
  );
}
