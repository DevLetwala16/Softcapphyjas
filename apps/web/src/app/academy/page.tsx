"use client";

import * as React from "react";
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
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Check,
} from "lucide-react";

const COURSES = [
  {
    id: "autonomous-agents-arch",
    title: "Autonomous Multi-Agent Systems & Tool-Use Architecture",
    code: "ACA-501",
    level: "Advanced",
    duration: "8 Weeks",
    hoursPerWeek: "6-8 hrs/week",
    pricePaise: 2499900,
    priceDisplay: "₹24,999",
    emiDisplay: "₹2,083/mo (12 mo zero-cost EMI)",
    domain: "frontier" as const,
    instructor: "Dr. Siddharth Iyer · Chief Architect",
    badgeVariant: "frontier" as const,
    overview:
      "Master production-grade cognitive agent loops, Monte Carlo tree search over tool call graphs, persistent memory vector fabrics, and self-healing execution sandboxes.",
    outcomes: [
      "Build multi-agent swarms with dynamic delegation & supervisor consensus",
      "Deploy deterministic safety guards and sandboxed code execution kernels",
      "Integrate persistent RAG with hybrid semantic and graph knowledge bases",
    ],
  },
  {
    id: "quantum-ml-variational",
    title: "Quantum Machine Learning & Variational Algorithms",
    code: "ACA-602",
    level: "Research Grade",
    duration: "10 Weeks",
    hoursPerWeek: "8-10 hrs/week",
    pricePaise: 2999900,
    priceDisplay: "₹29,999",
    emiDisplay: "₹2,500/mo (12 mo zero-cost EMI)",
    domain: "physics" as const,
    instructor: "Dr. Elena Rostova · Research Fellow",
    badgeVariant: "physics" as const,
    overview:
      "Bridge quantum computing theory with production PyTorch pipelines. Formulate parameterized quantum circuits (PQCs), variational quantum eigensolvers (VQE), and simulate molecular Hamiltonians on CUDA-Q.",
    outcomes: [
      "Program quantum circuits with Qiskit and PennyLane",
      "Execute hybrid quantum-classical neural networks on GPU simulators",
      "Implement quantum kernel estimation for high-dimensional drug discovery datasets",
    ],
  },
  {
    id: "neuro-symbolic-verification",
    title: "Neuro-Symbolic AI & Automated Formal Verification",
    code: "ACA-703",
    level: "Mastery",
    duration: "12 Weeks",
    hoursPerWeek: "8-10 hrs/week",
    pricePaise: 3499900,
    priceDisplay: "₹34,999",
    emiDisplay: "₹2,916/mo (12 mo zero-cost EMI)",
    domain: "medical" as const,
    instructor: "Pranav Nair · Head of Formal Reasoning",
    badgeVariant: "medical" as const,
    overview:
      "Eliminate hallucinations in safety-critical medical and financial domains. Connect deep neural networks with SMT constraint solvers (Z3) and interactive theorem provers (Lean 4).",
    outcomes: [
      "Formulate invariant specifications and safety contracts for neural outputs",
      "Embed Z3 and CVC5 constraint solvers directly into PyTorch loss loops",
      "Synthesize machine-checked mathematical proofs in Lean 4",
    ],
  },
];

const FAQS = [
  {
    q: "What prerequisites are required for Softcapphyjas Academy programs?",
    a: "Our courses are designed for professional software engineers, data scientists, and computational researchers. Fluency in Python, linear algebra, multivariable calculus, and basic PyTorch fundamentals is assumed.",
  },
  {
    q: "Are the courses self-paced or cohort-based?",
    a: "Academy programs run in live cohorts with weekly live lectures, real-time code labs, and private Discord channels. All sessions are recorded and archived in the LMS player with adaptive playback and downloadable notes.",
  },
  {
    q: "How are the completion certificates verified?",
    a: "Every graduate receives a cryptographically signed Ed25519 digital certificate permanently verifiable at /academy/verify/[certId] and shareable directly to LinkedIn and credential databases.",
  },
  {
    q: "Is zero-cost EMI available for Indian participants?",
    a: "Yes. Through our Razorpay integration, zero-cost EMI options are available on all major credit and debit cards across 3, 6, 9, and 12-month tenures.",
  },
];

export default function AcademyPage() {
  const [email, setEmail] = React.useState("");
  const [selectedCourse, setSelectedCourse] = React.useState(COURSES[0]?.id || "");
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Academy Candidate",
          email,
          topic: "academy-waitlist",
          message: `Candidate enrolled in waitlist for course: ${selectedCourse}`,
        }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors flex flex-col justify-between">
      <SiteNav />

      <main className="flex-1 py-16 sm:py-20 space-y-20">
        {/* Hero Section */}
        <section>
          <Container size="standard">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-4 py-1.5 text-xs font-mono text-[var(--accent)]">
                <GraduationCap className="h-3.5 w-3.5" />
                <span>Softcapphyjas Academy · Cohort Q1 2027</span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--text)] leading-tight">
                Deep-Tech AI Engineering. <br />
                <span className="text-[var(--accent)]">Taught by the Inventors.</span>
              </h1>

              <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
                Move beyond commodity prompting. Master foundational multi-agent architectures,
                quantum machine learning, and neuro-symbolic formal verification through rigorous
                cohort-based programs led by active researchers.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <a
                  href="#courses"
                  className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 text-xs font-semibold text-black shadow-lg shadow-[var(--accent)]/20 hover:opacity-90 transition-opacity"
                >
                  <span>Browse Flagship Curriculum</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#waitlist"
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg-elev-1)] px-6 py-3 text-xs font-semibold text-[var(--text)] hover:border-[var(--accent)]/50 transition-colors"
                >
                  Apply for Early Admission
                </a>
              </div>
            </div>
          </Container>
        </section>

        {/* Value Highlights */}
        <section className="py-12 border-y border-[var(--border)] bg-[var(--bg-elev-1)]/40">
          <Container size="standard">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <div className="font-mono text-2xl font-bold text-[var(--accent)]">100%</div>
                <div className="font-display text-sm font-bold text-[var(--text)]">
                  Code &amp; Proof Labs
                </div>
                <p className="text-xs text-[var(--text-muted)]">
                  Every lecture is paired with hands-on PyTorch, Lean 4, or CUDA-Q lab environments.
                </p>
              </div>

              <div className="space-y-2">
                <div className="font-mono text-2xl font-bold text-purple-400">1:15</div>
                <div className="font-display text-sm font-bold text-[var(--text)]">
                  Faculty-to-Fellow Ratio
                </div>
                <p className="text-xs text-[var(--text-muted)]">
                  Small, highly selective cohorts with dedicated technical mentorship.
                </p>
              </div>

              <div className="space-y-2">
                <div className="font-mono text-2xl font-bold text-emerald-400">Ed25519</div>
                <div className="font-display text-sm font-bold text-[var(--text)]">
                  Cryptographic Verification
                </div>
                <p className="text-xs text-[var(--text-muted)]">
                  Digitally signed credentials verifiable on-chain and across global hiring
                  networks.
                </p>
              </div>

              <div className="space-y-2">
                <div className="font-mono text-2xl font-bold text-amber-400">Zero-Cost</div>
                <div className="font-display text-sm font-bold text-[var(--text)]">
                  12-Month EMI Options
                </div>
                <p className="text-xs text-[var(--text-muted)]">
                  Affordable monthly installment plans backed by Razorpay payments engine.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Flagship Courses */}
        <section id="courses" className="space-y-10">
          <Container size="standard">
            <div className="space-y-1">
              <div className="text-xs font-mono uppercase text-[var(--accent)]">
                Active Cohort Catalog
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-[var(--text)]">
                Flagship Research Programs
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
              {COURSES.map((course) => (
                <div
                  key={course.id}
                  className="rounded-3xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-7 flex flex-col justify-between space-y-6 hover:border-[var(--accent)]/50 transition-colors"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant={course.badgeVariant} size="sm">
                        {course.code}
                      </Badge>
                      <span className="text-xs font-mono text-[var(--text-muted)]">
                        {course.duration}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-[var(--text)] leading-snug">
                      {course.title}
                    </h3>

                    <div className="text-xs text-[var(--accent)] font-mono">
                      {course.instructor}
                    </div>

                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      {course.overview}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-[var(--border)]">
                      <div className="text-[11px] font-mono text-[var(--text)] uppercase font-semibold">
                        Core Competencies:
                      </div>
                      <ul className="space-y-1 text-xs text-[var(--text-muted)]">
                        {course.outcomes.map((outcome, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <CheckCircle2 className="h-3.5 w-3.5 text-[var(--accent)] shrink-0 mt-0.5" />
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[var(--border)] space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span className="font-display text-2xl font-bold text-[var(--text)]">
                        {course.priceDisplay}
                      </span>
                      <span className="text-[11px] font-mono text-[var(--text-muted)]">
                        {course.hoursPerWeek}
                      </span>
                    </div>
                    <div className="text-[10px] font-mono text-emerald-400">
                      {course.emiDisplay}
                    </div>

                    <a
                      href="#waitlist"
                      onClick={() => setSelectedCourse(course.id)}
                      className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-[var(--accent)] py-2.5 text-xs font-semibold text-black hover:opacity-90 transition-opacity"
                    >
                      <span>Join Early Admission Cohort</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Early Admission Waitlist Form */}
        <section id="waitlist">
          <Container size="standard">
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-8 sm:p-12 max-w-2xl mx-auto space-y-6">
              <div className="text-center space-y-2">
                <Badge variant="cyan" size="sm">
                  Limited Enrollment
                </Badge>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text)]">
                  Reserve Your Seat for Q1 2027
                </h3>
                <p className="text-xs text-[var(--text-muted)]">
                  Cohorts are strictly limited to 30 fellows per track to guarantee direct code
                  reviews and research supervision.
                </p>
              </div>

              {submitted ? (
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center space-y-2">
                  <div className="h-10 w-10 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <Check className="h-5 w-5" />
                  </div>
                  <div className="font-bold text-sm text-[var(--text)]">Application Registered</div>
                  <p className="text-xs text-[var(--text-muted)]">
                    Our admissions committee has sent course syllabus details and prerequisite
                    materials to {email}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleWaitlist} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-[var(--text)] font-semibold">
                      Select Program Track
                    </label>
                    <select
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                      className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-2.5 text-xs text-[var(--text)] focus:border-[var(--accent)] focus:outline-none"
                    >
                      {COURSES.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.title} ({c.priceDisplay})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-[var(--text)] font-semibold">
                      Candidate Work / Academic Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="researcher@university.edu or dev@company.com"
                      className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-2.5 text-xs text-[var(--text)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none"
                    />
                  </div>

                  <Button
                    variant="primary"
                    size="md"
                    type="submit"
                    disabled={submitting}
                    className="w-full justify-center"
                  >
                    {submitting
                      ? "Submitting Application..."
                      : "Request Syllabus & Early Admission"}
                  </Button>
                </form>
              )}
            </div>
          </Container>
        </section>

        {/* FAQs */}
        <section className="space-y-6">
          <Container size="standard">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="font-display text-2xl font-bold text-center text-[var(--text)]">
                Frequently Asked Questions
              </h2>

              <Accordion type="single" collapsible className="w-full">
                {FAQS.map((faq, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`}>
                    <AccordionTrigger>{faq.q}</AccordionTrigger>
                    <AccordionContent>{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
