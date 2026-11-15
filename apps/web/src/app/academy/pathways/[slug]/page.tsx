"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  SiteNav,
  SiteFooter,
  Container,
  Button,
  Badge,
} from "@softcapphyjas/ui";
import {
  Compass,
  ArrowRight,
  CheckCircle2,
  Clock,
  BookOpen,
  Briefcase,
  TrendingUp,
  ShieldCheck,
  CreditCard,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import {
  ACADEMY_PATHWAYS,
  ACADEMY_COURSES,
  type PathwayData,
} from "@/lib/academy-data";

export default function PathwayDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const pathway =
    ACADEMY_PATHWAYS.find((p) => p.slug === slug) || ACADEMY_PATHWAYS[0]!;

  const coursesInPathway = ACADEMY_COURSES.filter((c) =>
    pathway.courses.includes(c.slug)
  );

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors flex flex-col justify-between selection:bg-[var(--accent)] selection:text-[#05070D]">
      <SiteNav />

      <main className="flex-1 py-12 sm:py-16 space-y-16">
        {/* Pathway Hero */}
        <section>
          <Container size="standard">
            <div className="space-y-6 max-w-4xl">
              {/* Breadcrumbs */}
              <nav className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
                <Link href="/academy" className="hover:text-white transition-colors">
                  Academy
                </Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <Link href="/academy#pathways" className="hover:text-white transition-colors">
                  Pathways
                </Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-[var(--accent)] truncate">{pathway.title}</span>
              </nav>

              <div className="flex flex-wrap items-center gap-2.5">
                <Badge variant={pathway.domain} size="sm">
                  {pathway.domain.toUpperCase()} CAREER TRACK
                </Badge>
                <span className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                  Save {pathway.savingsPercent}% Bundle
                </span>
              </div>

              <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {pathway.title}
              </h1>

              <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
                {pathway.description}
              </p>

              {/* Stats Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-y border-[var(--border)] py-6 text-left">
                <div>
                  <div className="text-xs text-[var(--text-muted)] font-mono flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[var(--accent)]" /> Duration
                  </div>
                  <div className="text-xl font-mono font-bold text-white mt-1">
                    {pathway.totalDurationWeeks} Weeks
                  </div>
                  <div className="text-[11px] text-[var(--text-muted)]">{pathway.totalHours} Total Lab Hours</div>
                </div>

                <div>
                  <div className="text-xs text-[var(--text-muted)] font-mono flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-purple-400" /> Curriculum
                  </div>
                  <div className="text-xl font-mono font-bold text-white mt-1">
                    {pathway.courses.length} Deep Courses
                  </div>
                  <div className="text-[11px] text-[var(--text-muted)]">Progressive Sequence</div>
                </div>

                <div>
                  <div className="text-xs text-[var(--text-muted)] font-mono flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Market Compensation
                  </div>
                  <div className="text-xl font-mono font-bold text-white mt-1">
                    {pathway.avgSalaryInr}
                  </div>
                  <div className="text-[11px] text-[var(--text-muted)]">Tier 1 AI Labs</div>
                </div>

                <div>
                  <div className="text-xs text-[var(--text-muted)] font-mono flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-amber-400" /> Zero-Cost EMI
                  </div>
                  <div className="text-xl font-mono font-bold text-white mt-1">
                    ₹{Math.round(pathway.bundlePricePaise / 1200).toLocaleString("en-IN")}/mo
                  </div>
                  <div className="text-[11px] text-[var(--text-muted)]">12-Month Tenures</div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Course Sequence */}
        <section>
          <Container size="standard">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left 8 cols: Sequence */}
              <div className="lg:col-span-8 space-y-8">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[var(--accent)]" />
                    Structured Learning Sequence
                  </h2>
                  <p className="text-xs text-[var(--text-muted)]">
                    Complete each course in order to master foundational concepts before advancing to capstones.
                  </p>
                </div>

                <div className="space-y-6">
                  {coursesInPathway.map((course, idx) => (
                    <div
                      key={course.id}
                      className="rounded-3xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-6 sm:p-7 space-y-4 relative overflow-hidden"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-7 h-7 rounded-full bg-[var(--accent)] text-black font-mono font-bold text-xs flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                            Step {idx + 1} · {course.code}
                          </span>
                        </div>
                        <Badge variant={course.domain} size="sm">
                          {course.level}
                        </Badge>
                      </div>

                      <div className="space-y-1">
                        <h3 className="text-xl font-bold text-white">{course.title}</h3>
                        <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                          {course.subtitle || course.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                        {course.outcomes.slice(0, 2).map((out, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-white/80">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{out}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between">
                        <div className="text-xs font-mono text-[var(--text-muted)]">
                          {course.durationWeeks} · Lead: {course.instructor.name}
                        </div>
                        <Link
                          href={`/academy/courses/${course.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--accent)] hover:underline"
                        >
                          <span>Inspect Full Syllabus</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Target Career Roles & Skills */}
                <div className="p-7 rounded-3xl bg-[var(--bg-elev-1)] border border-[var(--border)] space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-purple-400" />
                      Target Career Outcomes &amp; Core Competencies
                    </h3>
                    <p className="text-xs text-[var(--text-muted)]">
                      Profiles and roles actively recruiting graduates of this track:
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="text-xs font-mono text-[var(--text-muted)] uppercase">
                        Career Titles:
                      </div>
                      <ul className="space-y-1.5 text-xs text-white/90">
                        {pathway.careerRoles.map((role, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                            <span>{role}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs font-mono text-[var(--text-muted)] uppercase">
                        Core Competencies:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {pathway.keySkills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-white"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right 4 cols: Bundle Checkout Card */}
              <div className="lg:col-span-4 sticky top-24 space-y-6">
                <div className="rounded-3xl border border-[var(--border)] bg-gradient-to-b from-[var(--bg-elev-1)] to-[var(--bg-elev-2)] p-7 space-y-6 shadow-2xl">
                  <div className="space-y-2">
                    <div className="text-xs font-mono uppercase text-[var(--accent)]">
                      Pathway Bundle Pricing
                    </div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-mono font-bold text-white">
                        ₹{(pathway.bundlePricePaise / 100).toLocaleString("en-IN")}
                      </span>
                      <span className="text-sm font-mono text-[var(--text-muted)] line-through">
                        ₹{(pathway.originalPricePaise / 100).toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="text-xs font-mono text-emerald-400">
                      Includes all {pathway.courses.length} courses with lifetime updates
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono space-y-1">
                    <div className="text-[var(--text-muted)]">Zero-Cost EMI Plan:</div>
                    <div className="text-base font-bold text-white">
                      ₹{Math.round(pathway.bundlePricePaise / 1200).toLocaleString("en-IN")}/mo
                    </div>
                    <div className="text-[11px] text-[var(--text-muted)]">for 12 months with 0% interest</div>
                  </div>

                  <Link
                    href={`/academy/checkout?pathway=${pathway.slug}`}
                    className="w-full py-3.5 rounded-xl bg-[var(--accent)] hover:opacity-90 text-black font-semibold text-xs text-center block transition-opacity shadow-lg shadow-[var(--accent)]/20"
                  >
                    Enroll in Entire Pathway Track
                  </Link>

                  <div className="pt-4 border-t border-[var(--border)] space-y-2.5 text-xs text-[var(--text-muted)]">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>14-day 100% money-back guarantee</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[var(--accent)]" />
                      <span>Self-paced access + weekly live cohort calls</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
