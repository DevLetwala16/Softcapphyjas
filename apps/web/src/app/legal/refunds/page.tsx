import * as React from "react";
import { SiteNav, SiteFooter, Container } from "@softcapphyjas/ui";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy | Softcapphyjas",
  description:
    "Official cancellation and refund policy required for Razorpay payment gateway compliance.",
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors flex flex-col">
      <SiteNav />

      <main className="flex-1 py-14 space-y-10">
        <Container size="standard">
          <div className="space-y-4 pb-8 border-b border-[var(--border)]">
            <span className="text-xs font-mono uppercase text-[var(--accent)] tracking-wider">
              Consumer Rights & Payment Compliance
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text)]">
              Cancellation & Refund Policy
            </h1>
            <p className="text-xs font-mono text-[var(--text-muted)]">
              Mandatory Compliance Policy under the Consumer Protection (E-Commerce) Rules 2020 &
              Razorpay Merchant Standards.
            </p>
          </div>

          <div className="prose prose-invert max-w-none text-xs sm:text-sm text-[var(--text)] leading-relaxed space-y-8 font-sans">
            <section className="space-y-3">
              <h2 className="font-display text-xl font-bold text-[var(--text)]">
                1. Academy Self-Paced Courses (14-Day Guarantee)
              </h2>
              <p className="text-[var(--text-muted)] leading-relaxed">
                We take immense pride in the academic rigor of our curriculums. If you purchase an
                individual self-paced course from Softcapphyjas Academy and determine that the
                material does not suit your learning requirements, you are eligible for a{" "}
                <strong className="text-[var(--text)]">
                  100% full refund within 14 calendar days
                </strong>{" "}
                of your original transaction date, provided:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-[var(--text-muted)]">
                <li>
                  You have consumed less than 20% of the total video duration across the course
                  modules; and
                </li>
                <li>
                  No final assessment quizzes have been submitted and no course completion
                  certificate has been issued or verified.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-xl font-bold text-[var(--text)]">
                2. Monthly & Annual Subscriptions
              </h2>
              <p className="text-[var(--text-muted)] leading-relaxed">
                You may cancel your Academy monthly or annual subscription at any time directly
                through your Student Dashboard (/student-dashboard/subscription). Cancellation
                prevents automated renewal at the conclusion of your current billing cycle.
                Subscription fees already billed for the active cycle are non-refundable, and access
                remains active until the end of the paid period.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-xl font-bold text-[var(--text)]">
                3. Installment (EMI) Plans & Dunning
              </h2>
              <p className="text-[var(--text-muted)] leading-relaxed">
                For learners enrolled under Softcapphyjas In-House Installments or bank-facilitated
                Card/Cardless EMI:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-[var(--text-muted)]">
                <li>
                  <strong className="text-[var(--text)]">During 14-day window: </strong> If eligible
                  for a refund, the initial down payment is credited back, and all scheduled
                  upcoming installment obligations are canceled.
                </li>
                <li>
                  <strong className="text-[var(--text)]">After 14-day window: </strong> The learner
                  remains legally responsible for fulfilling all scheduled monthly installments. If
                  an installment becomes overdue by more than 14 days, platform access is suspended
                  until account settlement.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-xl font-bold text-[var(--text)]">
                4. Enterprise AI Engagements & Booking Deposits
              </h2>
              <p className="text-[var(--text-muted)] leading-relaxed">
                Booking deposits paid via the Project Builder (/hire-us) secure dedicated researcher
                and GPU cluster allocation for your architecture discovery sprint. A full deposit
                refund is granted if cancellation is requested within 5 business days of payment and
                prior to the initial formal architecture review meeting. After the discovery
                kickoff, deposits are applied toward incurred engineering hours and are
                non-refundable.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-xl font-bold text-[var(--text)]">
                5. Refund Processing Timeline & Method
              </h2>
              <p className="text-[var(--text-muted)] leading-relaxed">
                Approved refunds are processed through Razorpay directly to the original payment
                method (Credit/Debit Card, UPI, Netbanking, or Bank Account). Refunds typically
                reflect in the customer&apos;s bank statement within{" "}
                <strong className="text-[var(--accent)]">5 to 7 business days</strong> depending on
                your issuing bank&apos;s settlement cycle.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-xl font-bold text-[var(--text)]">
                6. How to Request a Refund
              </h2>
              <p className="text-[var(--text-muted)] leading-relaxed">
                To request a refund, submit a request via your Student Dashboard under &quot;Orders
                & Invoices&quot; or email our finance team directly with your Order Number:
              </p>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-4 font-mono text-xs text-[var(--accent)] space-y-1">
                <div>Finance & Refunds Desk</div>
                <div>Softcapphyjas Inc.</div>
                <div>Email: refunds@softcapphyjas.com (or billing@softcapphyjas.com)</div>
                <div>Acknowledgment Window: Under 24 Business Hours</div>
              </div>
            </section>
          </div>
        </Container>
      </main>

      <SiteFooter />
    </div>
  );
}
