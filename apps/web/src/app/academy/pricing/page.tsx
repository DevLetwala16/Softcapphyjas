"use client";

import * as React from "react";
import Link from "next/link";
import {
  SiteNav,
  SiteFooter,
  Container,
  Button,
  Badge,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@softcapphyjas/ui";
import {
  CheckCircle2,
  Check,
  X,
  CreditCard,
  ShieldCheck,
  Sparkles,
  Zap,
  Users,
  Award,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import { ACADEMY_PLANS } from "@/lib/academy-data";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = React.useState<"monthly" | "yearly">("yearly");

  const comparisonFeatures = [
    { name: "Access to Foundational Courses", monthly: true, yearly: true, enterprise: true },
    { name: "Access to Advanced & Frontier Courses", monthly: true, yearly: true, enterprise: true },
    { name: "Interactive GPU Code Sandboxes", monthly: "50 hrs/mo", yearly: "250 hrs/mo", enterprise: "Unlimited" },
    { name: "Cryptographic Ed25519 Certificates", monthly: false, yearly: true, enterprise: true },
    { name: "Faculty Office Hours (1-on-1)", monthly: false, yearly: "Monthly", enterprise: "Bi-weekly" },
    { name: "Pre-print Access to Frontier Labs", monthly: false, yearly: true, enterprise: true },
    { name: "Dedicated Private Team Channel", monthly: false, yearly: false, enterprise: true },
    { name: "Manager Analytics & Seat Management", monthly: false, yearly: false, enterprise: true },
    { name: "Custom Tailored Capstone Project", monthly: false, yearly: false, enterprise: true },
    { name: "GST Invoicing & Enterprise PO Support", monthly: false, yearly: true, enterprise: true },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors flex flex-col justify-between selection:bg-[var(--accent)] selection:text-[#05070D]">
      <SiteNav />

      <main className="flex-1 py-14 sm:py-20 space-y-20">
        {/* Header */}
        <section>
          <Container size="standard">
            <div className="text-center max-w-3xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-4 py-1.5 text-xs font-mono text-[var(--accent)]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Transparent Academic Membership</span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Invest in Deep-Tech Mastery. <br />
                <span className="text-[var(--accent)]">Single Membership. Complete Access.</span>
              </h1>

              <p className="text-base text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed">
                Choose the plan that fits your learning trajectory. Annual memberships include 25% savings and verifiable cryptographic credentials.
              </p>

              {/* Billing Toggle */}
              <div className="pt-4 flex items-center justify-center gap-3">
                <span
                  className={`text-xs font-mono transition-colors ${
                    billingCycle === "monthly" ? "text-white font-bold" : "text-[var(--text-muted)]"
                  }`}
                >
                  Monthly Billing
                </span>
                <button
                  type="button"
                  onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
                  className="w-14 h-7 rounded-full bg-[var(--bg-elev-2)] border border-[var(--border)] p-1 flex items-center transition-colors relative"
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-[var(--accent)] transition-transform ${
                      billingCycle === "yearly" ? "translate-x-7" : "translate-x-0"
                    }`}
                  />
                </button>
                <span
                  className={`text-xs font-mono flex items-center gap-1.5 transition-colors ${
                    billingCycle === "yearly" ? "text-white font-bold" : "text-[var(--text-muted)]"
                  }`}
                >
                  <span>Annual Billing</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                    Save 25%
                  </span>
                </span>
              </div>
            </div>
          </Container>
        </section>

        {/* Plan Cards */}
        <section>
          <Container size="standard">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {ACADEMY_PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative rounded-3xl p-8 flex flex-col justify-between space-y-6 transition-all ${
                    plan.popular
                      ? "bg-gradient-to-b from-[var(--bg-elev-2)] to-[var(--bg-elev-1)] border-2 border-[var(--accent)] shadow-2xl shadow-[var(--accent)]/10 scale-105"
                      : "bg-[var(--bg-elev-1)] border border-[var(--border)] hover:border-white/20"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[var(--accent)] text-black font-mono text-[11px] font-bold tracking-wider uppercase shadow-lg">
                      Recommended for Researchers
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                      <p className="text-xs text-[var(--text-muted)]">{plan.description}</p>
                    </div>

                    <div className="flex items-baseline gap-1 pt-2">
                      <span className="text-3xl font-mono font-bold text-white">
                        {plan.priceDisplay}
                      </span>
                      <span className="text-xs font-mono text-[var(--text-muted)]">
                        {plan.periodDisplay}
                      </span>
                    </div>

                    <div className="pt-4 border-t border-[var(--border)] space-y-3">
                      {plan.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-white/90">
                          <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/academy/checkout?plan=${plan.code}`}
                    className={`w-full py-3.5 rounded-xl text-center text-xs font-semibold transition-all ${
                      plan.popular
                        ? "bg-[var(--accent)] text-black hover:opacity-90 shadow-lg shadow-[var(--accent)]/20"
                        : "bg-white/10 hover:bg-white/20 text-white"
                    }`}
                  >
                    Subscribe with Razorpay
                  </Link>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Feature Comparison Table */}
        <section>
          <Container size="standard">
            <div className="space-y-6 max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-white text-center">
                Comprehensive Plan Comparison
              </h2>

              <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-elev-1)] overflow-hidden">
                <div className="grid grid-cols-4 p-4 border-b border-[var(--border)] bg-black/40 text-xs font-mono font-bold text-white">
                  <div>Feature</div>
                  <div className="text-center">Monthly Pro</div>
                  <div className="text-center text-[var(--accent)]">Annual Fellow</div>
                  <div className="text-center">Enterprise</div>
                </div>

                {comparisonFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-4 p-4 border-b border-[var(--border)] last:border-b-0 text-xs text-white/90 hover:bg-white/5 transition-colors items-center"
                  >
                    <div className="font-medium text-white/80">{feat.name}</div>
                    <div className="text-center font-mono">
                      {typeof feat.monthly === "boolean" ? (
                        feat.monthly ? (
                          <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-white/20 mx-auto" />
                        )
                      ) : (
                        <span>{feat.monthly}</span>
                      )}
                    </div>
                    <div className="text-center font-mono text-[var(--accent)] font-semibold">
                      {typeof feat.yearly === "boolean" ? (
                        feat.yearly ? (
                          <Check className="w-4 h-4 text-[var(--accent)] mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-white/20 mx-auto" />
                        )
                      ) : (
                        <span>{feat.yearly}</span>
                      )}
                    </div>
                    <div className="text-center font-mono">
                      {typeof feat.enterprise === "boolean" ? (
                        feat.enterprise ? (
                          <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-white/20 mx-auto" />
                        )
                      ) : (
                        <span>{feat.enterprise}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Pricing FAQ */}
        <section>
          <Container size="standard">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-2xl font-bold text-white text-center">Pricing &amp; Billing FAQ</h2>
              <Accordion type="single" collapsible className="space-y-3">
                <AccordionItem value="faq-1">
                  <AccordionTrigger>Can I cancel my subscription at any time?</AccordionTrigger>
                  <AccordionContent>
                    Yes. You can cancel your subscription with a single click from your Student Dashboard. You will retain full access until the end of your paid billing period, with zero cancellation fees.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-2">
                  <AccordionTrigger>Are certificates permanent even if my subscription ends?</AccordionTrigger>
                  <AccordionContent>
                    Yes. Any cryptographic Ed25519 digital certificates you earn while active remain permanently valid and publicly verifiable forever at /academy/verify/[certId].
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-3">
                  <AccordionTrigger>Do you offer university or student discounts?</AccordionTrigger>
                  <AccordionContent>
                    Yes. Verified students and academic researchers can use coupon code STUDENT50 at checkout for 50% fellowship tuition subsidies.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
