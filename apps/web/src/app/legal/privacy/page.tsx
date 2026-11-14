import * as React from "react";
import { SiteNav, SiteFooter, Container } from "@softcapphyjas/ui";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Softcapphyjas",
  description: "Comprehensive privacy policy adhering to DPDP Act 2023, GDPR, and California CCPA.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors flex flex-col">
      <SiteNav />

      <main className="flex-1 py-14 space-y-10">
        <Container size="standard">
          <div className="space-y-4 pb-8 border-b border-[var(--border)]">
            <span className="text-xs font-mono uppercase text-[var(--accent)] tracking-wider">
              Legal Covenants & Data Rights
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text)]">
              Privacy Policy
            </h1>
            <p className="text-xs font-mono text-[var(--text-muted)]">
              Effective Date: November 14, 2026 · Compliant with DPDP Act 2023 (India) & GDPR (EU)
            </p>
          </div>

          <div className="prose prose-invert max-w-none text-xs sm:text-sm text-[var(--text)] leading-relaxed space-y-8 font-sans">
            <section className="space-y-3">
              <h2 className="font-display text-xl font-bold text-[var(--text)]">
                1. Introduction & Overview
              </h2>
              <p className="text-[var(--text-muted)] leading-relaxed">
                Softcapphyjas Inc. and its operating entities (&quot;Softcapphyjas,&quot;
                &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) are dedicated to safeguarding
                your personal data, intellectual property, and research telemetry. This Privacy
                Policy details the categories of information we collect, the lawful grounds under
                which we process it, and your statutory rights under the Digital Personal Data
                Protection Act 2023 (India), the General Data Protection Regulation (EU 2016/679),
                and relevant international privacy legislation.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-xl font-bold text-[var(--text)]">
                2. Categories of Information We Collect
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-[var(--text-muted)]">
                <li>
                  <strong className="text-[var(--text)]">Account Identity Data: </strong> Full name,
                  professional email address, encrypted authentication hashes, multi-factor
                  authentication (TOTP) metadata, and OAuth 2.0 provider tokens (Google, GitHub).
                </li>
                <li>
                  <strong className="text-[var(--text)]">Billing & Transaction Telemetry: </strong>{" "}
                  Legal entity name, GSTIN (Goods and Services Tax Identification Number), billing
                  address, and transaction identifiers. We do not store raw credit card numbers or
                  UPI MPINs; payments are tokenized directly through our PCI-DSS Level 1 certified
                  gateway partner (Razorpay).
                </li>
                <li>
                  <strong className="text-[var(--text)]">Educational & LMS Telemetry: </strong>{" "}
                  Course progress percentages, lesson timestamps, quiz submission answers, and
                  Ed25519 cryptographically signed certificate verification records.
                </li>
                <li>
                  <strong className="text-[var(--text)]">Ephemeral AI Model Queries: </strong>{" "}
                  Inquiries submitted to the Synapse live preview sandbox or chatbot are evaluated
                  in memory and discarded upon stream completion. We maintain a strict{" "}
                  <strong className="text-[var(--accent)]">Zero Data Retention</strong> policy for
                  enterprise AI client data.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-xl font-bold text-[var(--text)]">
                3. Lawful Basis & Purpose of Processing
              </h2>
              <p className="text-[var(--text-muted)] leading-relaxed">
                We process your personal data solely under recognized lawful grounds, including: (a)
                Performance of a contract (provision of Academy courses, enterprise service
                deliverables, client dashboard access); (b) Compliance with legal obligations
                (statutory GST tax compliance and audit record maintenance); and (c) Explicit freely
                given consent (newsletter opt-in, optional marketing communications).
              </p>
            </section>

            <section id="cookies" className="space-y-3">
              <h2 className="font-display text-xl font-bold text-[var(--text)]">
                4. Cookies & Tracking Technologies
              </h2>
              <p className="text-[var(--text-muted)] leading-relaxed">
                We use strictly necessary session cookies required for authentication state, theme
                preferences, and security token validation (CSRF). Analytic scripts (such as
                PostHog) are blocked by default and loaded only after explicit user opt-in via our
                Cookie Consent Banner. You may revoke cookie consent at any time through the footer
                settings.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-xl font-bold text-[var(--text)]">
                5. Data Retention & Erasure
              </h2>
              <p className="text-[var(--text-muted)] leading-relaxed">
                User accounts and session identifiers are stored until an account deletion request
                is executed. In accordance with legal obligations, invoice and financial records are
                retained for the statutory 7-year period as mandated by the Indian Income Tax Act
                1961. Soft-deleted accounts have all identifying personal telemetry anonymized
                within 30 days.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-xl font-bold text-[var(--text)]">
                6. Data Protection Officer & Grievance Redressal
              </h2>
              <p className="text-[var(--text-muted)] leading-relaxed">
                To exercise your rights to access, correction, data portability, or erasure, contact
                our designated Data Protection Officer:
              </p>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-4 font-mono text-xs text-[var(--accent)] space-y-1">
                <div>Data Protection & Compliance Office</div>
                <div>Softcapphyjas Inc.</div>
                <div>Email: privacy@softcapphyjas.com</div>
                <div>Grievance Response Window: Within 7 Business Days</div>
              </div>
            </section>
          </div>
        </Container>
      </main>

      <SiteFooter />
    </div>
  );
}
