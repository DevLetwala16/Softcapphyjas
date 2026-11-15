"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  Input,
} from "@softcapphyjas/ui";
import {
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Check,
  Search,
  Filter,
  ShieldCheck,
  Sparkles,
  Clock,
  BookOpen,
  Award,
  CreditCard,
  Star,
  Users,
  Compass,
} from "lucide-react";
import {
  ACADEMY_COURSES,
  ACADEMY_PATHWAYS,
  ACADEMY_PLANS,
  type CourseData,
} from "@/lib/academy-data";

export default function AcademyPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [debouncedQuery, setDebouncedQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("ALL");
  const [selectedLevel, setSelectedLevel] = React.useState("ALL");
  const [sortBy, setSortBy] = React.useState<"popular" | "price-asc" | "price-desc">("popular");
  const [certInput, setCertInput] = React.useState("");

  // Initialize state from URL params on mount (Board 09 URL state)
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const sp = new URLSearchParams(window.location.search);
      const cat = sp.get("category");
      const lvl = sp.get("level");
      const q = sp.get("search");
      if (cat) setSelectedCategory(cat.toUpperCase());
      if (lvl) setSelectedLevel(lvl.toUpperCase());
      if (q) {
        setSearchQuery(q);
        setDebouncedQuery(q);
      }
    }
  }, []);

  // Sync state back to URL query string
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams();
      if (selectedCategory !== "ALL") params.set("category", selectedCategory);
      if (selectedLevel !== "ALL") params.set("level", selectedLevel);
      if (debouncedQuery.trim()) params.set("search", debouncedQuery.trim());
      const queryStr = params.toString() ? `?${params.toString()}` : "";
      window.history.replaceState(null, "", window.location.pathname + queryStr);
    }
  }, [selectedCategory, selectedLevel, debouncedQuery]);

  // Debounce search query 300ms
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Filter and sort courses
  const filteredCourses = React.useMemo(() => {
    return ACADEMY_COURSES.filter((course) => {
      // Category filter
      if (selectedCategory !== "ALL" && course.category !== selectedCategory) {
        return false;
      }
      // Level filter
      if (selectedLevel !== "ALL" && course.level !== selectedLevel) {
        return false;
      }
      // Search filter
      if (debouncedQuery.trim()) {
        const q = debouncedQuery.toLowerCase();
        const matchesTitle = course.title.toLowerCase().includes(q);
        const matchesDesc = course.description.toLowerCase().includes(q);
        const matchesCode = course.code.toLowerCase().includes(q);
        const matchesInstructor = course.instructor.name.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesCode && !matchesInstructor) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.priceInPaise - b.priceInPaise;
      if (sortBy === "price-desc") return b.priceInPaise - a.priceInPaise;
      return b.studentCount - a.studentCount;
    });
  }, [selectedCategory, selectedLevel, debouncedQuery, sortBy]);

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certInput.trim()) return;
    router.push(`/academy/verify/${encodeURIComponent(certInput.trim().toUpperCase())}`);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors flex flex-col justify-between selection:bg-[var(--accent)] selection:text-[#05070D]">
      <SiteNav />

      {/* Structured JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Softcapphyjas Academy Courses",
            itemListElement: ACADEMY_COURSES.map((c, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Course",
                name: c.title,
                description: c.description,
                provider: {
                  "@type": "Organization",
                  name: "Softcapphyjas",
                  sameAs: "https://softcapphyjas.com",
                },
                offers: {
                  "@type": "Offer",
                  price: (c.priceInPaise / 100).toFixed(2),
                  priceCurrency: "INR",
                  availability: "https://schema.org/InStock",
                },
              },
            })),
          }),
        }}
      />

      <main className="flex-1 py-12 sm:py-16 space-y-24">
        {/* 1. HERO SECTION & QUICK SEARCH */}
        <section className="relative overflow-hidden pt-4 pb-8">
          <div className="absolute inset-0 bg-radial-gradient from-[var(--accent)]/10 via-transparent to-transparent pointer-events-none opacity-40 blur-3xl -z-10" />

          <Container size="standard">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-4 py-1.5 text-xs font-mono text-[var(--accent)]">
                <GraduationCap className="h-4 w-4" />
                <span>Softcapphyjas Academy · Research-Grade Cohorts 2026</span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[var(--text)] leading-[1.1]">
                Frontier AI Engineering. <br />
                <span className="bg-gradient-to-r from-[var(--accent)] via-purple-400 to-[var(--accent-2)] bg-clip-text text-transparent">
                  Taught by Active Researchers.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
                Move beyond commodity prompting. Master autonomous multi-agent orchestration,
                quantum algorithms, and neuro-symbolic formal verification through production code labs.
              </p>

              {/* Debounced Search Bar */}
              <div className="pt-4 max-w-xl mx-auto">
                <div className="relative flex items-center">
                  <Search className="absolute left-4 w-5 h-5 text-[var(--text-muted)]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search courses by topic, code (e.g. ACA-501), or faculty..."
                    className="w-full h-13 pl-12 pr-4 rounded-2xl bg-[var(--bg-elev-1)] border border-[var(--border)] text-sm text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all shadow-xl"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 px-2 py-1 text-xs text-[var(--text-muted)] hover:text-white"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Key Trust Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 text-left max-w-3xl mx-auto">
                <div className="p-4 rounded-xl bg-[var(--bg-elev-1)]/60 border border-[var(--border)]">
                  <div className="text-xl font-mono font-bold text-[var(--accent)]">100%</div>
                  <div className="text-xs text-[var(--text-muted)]">Code &amp; Proof Labs</div>
                </div>
                <div className="p-4 rounded-xl bg-[var(--bg-elev-1)]/60 border border-[var(--border)]">
                  <div className="text-xl font-mono font-bold text-purple-400">1:15</div>
                  <div className="text-xs text-[var(--text-muted)]">Faculty-to-Fellow Ratio</div>
                </div>
                <div className="p-4 rounded-xl bg-[var(--bg-elev-1)]/60 border border-[var(--border)]">
                  <div className="text-xl font-mono font-bold text-emerald-400">Ed25519</div>
                  <div className="text-xs text-[var(--text-muted)]">Signed Credentials</div>
                </div>
                <div className="p-4 rounded-xl bg-[var(--bg-elev-1)]/60 border border-[var(--border)]">
                  <div className="text-xl font-mono font-bold text-amber-400">0% EMI</div>
                  <div className="text-xs text-[var(--text-muted)]">Zero-Cost Options</div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* 2. CAREER PATHWAYS SECTION (Board 09) */}
        <section id="pathways" className="space-y-8">
          <Container size="standard">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-[var(--border)] pb-6">
              <div className="space-y-1">
                <div className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] flex items-center gap-1.5">
                  <Compass className="w-4 h-4" /> Career Tracks
                </div>
                <h2 className="font-display text-2xl sm:text-4xl font-bold text-[var(--text)]">
                  Structured Learning Pathways
                </h2>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-xl">
                  Sequenced curricula designed to take you from foundational mathematics to production leadership.
                </p>
              </div>
              <span className="text-xs font-mono text-[var(--text-muted)]">
                5 Complete Specializations Available
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {ACADEMY_PATHWAYS.map((pathway) => (
                <div
                  key={pathway.slug}
                  className="group rounded-3xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-6 sm:p-7 flex flex-col justify-between space-y-6 hover:border-[var(--accent)]/50 transition-all hover:shadow-xl hover:shadow-[var(--accent)]/5"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant={pathway.domain} size="sm">
                        {pathway.domain.toUpperCase()}
                      </Badge>
                      <span className="text-xs font-mono text-emerald-400 font-semibold">
                        Save {pathway.savingsPercent}% Bundle
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="text-xl font-bold text-white group-hover:text-[var(--accent)] transition-colors">
                        {pathway.title}
                      </h3>
                      <p className="text-xs font-mono text-[var(--text-muted)]">
                        {pathway.totalDurationWeeks} Weeks · {pathway.totalHours} Hours · {pathway.courses.length} Courses
                      </p>
                    </div>

                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      {pathway.description}
                    </p>

                    <div className="pt-2 border-t border-[var(--border)] space-y-2">
                      <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase">
                        Target Roles:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {pathway.careerRoles.slice(0, 2).map((role) => (
                          <span
                            key={role}
                            className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-white/5 border border-white/10 text-white/90"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-[var(--border)]">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-xs text-[var(--text-muted)] line-through mr-2">
                          ₹{(pathway.originalPricePaise / 100).toLocaleString("en-IN")}
                        </span>
                        <span className="text-xl font-mono font-bold text-white">
                          ₹{(pathway.bundlePricePaise / 100).toLocaleString("en-IN")}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-[var(--accent)]">
                        EMI from ₹{Math.round(pathway.bundlePricePaise / 1200).toLocaleString("en-IN")}/mo
                      </span>
                    </div>

                    <Link
                      href={`/academy/pathways/${pathway.slug}`}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 hover:bg-[var(--accent)] hover:text-black hover:border-transparent py-2.5 text-xs font-semibold text-white transition-all"
                    >
                      <span>Explore Pathway Track</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* 3. COURSE CATALOG WITH FILTERS & GRID (Board 09) */}
        <section id="catalog" className="space-y-8">
          <Container size="standard">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-[var(--border)] pb-6">
              <div className="space-y-1">
                <div className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" /> Comprehensive Catalog
                </div>
                <h2 className="font-display text-2xl sm:text-4xl font-bold text-[var(--text)]">
                  All Academy Programs
                </h2>
                <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                  Showing {filteredCourses.length} of {ACADEMY_COURSES.length} research-backed courses
                </p>
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-[var(--text-muted)] font-mono">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[var(--bg-elev-1)] border border-[var(--border)] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[var(--accent)]"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-[var(--text-muted)] mr-1">Domain:</span>
                {[
                  { id: "ALL", label: "All Topics" },
                  { id: "AGENTIC", label: "Agentic AI" },
                  { id: "ML", label: "ML & Math" },
                  { id: "LLMOPS", label: "LLMOps & DPO" },
                  { id: "SECURITY", label: "Formal AI Safety" },
                  { id: "SYSTEM_DESIGN", label: "Distributed Systems" },
                  { id: "PHYSICS", label: "Quantum ML" },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                      selectedCategory === cat.id
                        ? "bg-[var(--accent)] text-black font-semibold shadow-md shadow-[var(--accent)]/20"
                        : "bg-[var(--bg-elev-1)] border border-[var(--border)] text-[var(--text-muted)] hover:text-white"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-[var(--text-muted)] mr-1">Level:</span>
                {[
                  { id: "ALL", label: "All Levels" },
                  { id: "BEGINNER", label: "Foundational" },
                  { id: "INTERMEDIATE", label: "Intermediate" },
                  { id: "ADVANCED", label: "Advanced" },
                  { id: "RESEARCH_GRADE", label: "Research Grade" },
                ].map((lvl) => (
                  <button
                    key={lvl.id}
                    onClick={() => setSelectedLevel(lvl.id)}
                    className={`px-3 py-1 rounded-lg text-[11px] font-mono transition-all ${
                      selectedLevel === lvl.id
                        ? "bg-white/20 text-white font-bold border border-white/30"
                        : "bg-white/5 text-[var(--text-muted)] hover:text-white border border-transparent"
                    }`}
                  >
                    {lvl.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Courses Grid */}
            {filteredCourses.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-[var(--bg-elev-1)] border border-[var(--border)] space-y-3">
                <BookOpen className="w-10 h-10 text-[var(--text-muted)] mx-auto opacity-50" />
                <h3 className="text-base font-bold text-white">No courses match your filter criteria</h3>
                <p className="text-xs text-[var(--text-muted)]">
                  Try clearing your search query or switching topic categories.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("ALL");
                    setSelectedLevel("ALL");
                    setSearchQuery("");
                  }}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-white"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
                {filteredCourses.map((course) => (
                  <div
                    key={course.id}
                    className="rounded-3xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-7 flex flex-col justify-between space-y-6 hover:border-[var(--accent)]/50 transition-all hover:shadow-xl hover:shadow-[var(--accent)]/5 group"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge variant={course.domain} size="sm">
                          {course.code}
                        </Badge>
                        <span className="text-xs font-mono text-[var(--text-muted)]">
                          {course.level}
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <h3 className="text-xl font-bold text-white group-hover:text-[var(--accent)] transition-colors leading-snug">
                          {course.title}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-[var(--text-muted)] font-mono">
                          <span className="flex items-center gap-1 text-amber-400">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            {course.rating.toFixed(1)}
                          </span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {course.durationWeeks}
                          </span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5" />
                            {course.studentCount}+ scholars
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-[var(--text-muted)] line-clamp-3 leading-relaxed">
                        {course.description}
                      </p>

                      <div className="pt-2 text-xs font-mono text-[var(--text-muted)] border-t border-[var(--border)]">
                        Faculty: <span className="text-white font-medium">{course.instructor.name}</span>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-[var(--border)]">
                      <div className="space-y-1">
                        <div className="flex items-baseline justify-between">
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-mono font-bold text-white">
                              ₹{(course.priceInPaise / 100).toLocaleString("en-IN")}
                            </span>
                            {course.compareAtPaise && (
                              <span className="text-xs text-[var(--text-muted)] line-through">
                                ₹{(course.compareAtPaise / 100).toLocaleString("en-IN")}
                              </span>
                            )}
                          </div>
                          {course.compareAtPaise && (
                            <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                              {Math.round(
                                ((course.compareAtPaise - course.priceInPaise) /
                                  course.compareAtPaise) *
                                  100
                              )}
                              % OFF
                            </span>
                          )}
                        </div>

                        {course.emiEligible && (
                          <div className="text-[11px] font-mono text-[var(--accent)] flex items-center gap-1">
                            <CreditCard className="w-3 h-3" />
                            <span>
                              Zero-cost EMI from ₹
                              {Math.round(course.priceInPaise / 1200).toLocaleString("en-IN")}/mo
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href={`/academy/courses/${course.slug}`}
                          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 py-2.5 text-xs font-semibold text-white transition-colors"
                        >
                          <span>Syllabus</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          href={`/academy/courses/${course.slug}?action=enroll`}
                          className="inline-flex items-center justify-center rounded-xl bg-[var(--accent)] hover:opacity-90 py-2.5 text-xs font-semibold text-black transition-opacity shadow-md shadow-[var(--accent)]/20"
                        >
                          Enroll Now
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Container>
        </section>

        {/* 4. SUBSCRIPTION PLANS SECTION (Board 09) */}
        <section id="subscriptions" className="py-12 border-y border-[var(--border)] bg-[var(--bg-elev-1)]/30">
          <Container size="standard">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
              <div className="text-xs font-mono uppercase tracking-wider text-[var(--accent)]">
                All-Inclusive Access
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-[var(--text)]">
                Academy Fellow Memberships
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                Unlock our entire curriculum, private GPU sandboxes, and research office hours with a single membership.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {ACADEMY_PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative rounded-3xl p-8 flex flex-col justify-between space-y-6 transition-all ${
                    plan.popular
                      ? "bg-gradient-to-b from-[var(--bg-elev-2)] to-[var(--bg-elev-1)] border-2 border-[var(--accent)] shadow-2xl shadow-[var(--accent)]/10"
                      : "bg-[var(--bg-elev-1)] border border-[var(--border)] hover:border-white/20"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[var(--accent)] text-black font-mono text-[11px] font-bold tracking-wider uppercase shadow-lg">
                      Most Popular Fellow Track
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

                    <div className="pt-4 border-t border-[var(--border)] space-y-2.5">
                      {plan.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-white/90">
                          <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/academy/pricing?plan=${plan.code}`}
                    className={`w-full py-3 rounded-xl text-center text-xs font-semibold transition-all ${
                      plan.popular
                        ? "bg-[var(--accent)] text-black hover:opacity-90 shadow-lg shadow-[var(--accent)]/20"
                        : "bg-white/10 hover:bg-white/20 text-white"
                    }`}
                  >
                    Select {plan.name}
                  </Link>
                </div>
              ))}
            </div>

            <div className="text-center pt-8">
              <Link
                href="/academy/pricing"
                className="text-xs font-mono text-[var(--accent)] hover:underline inline-flex items-center gap-1.5"
              >
                <span>View full enterprise feature comparison matrix</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Container>
        </section>

        {/* 5. CERTIFICATE VERIFICATION QUICK BOX (Board 09) */}
        <section id="verify-box">
          <Container size="standard">
            <div className="rounded-3xl border border-[var(--border)] bg-gradient-to-r from-[var(--bg-elev-1)] via-[var(--bg-elev-2)] to-[var(--bg-elev-1)] p-8 sm:p-12">
              <div className="max-w-3xl mx-auto text-center space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-mono text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Ed25519 Cryptographic Verification Protocol</span>
                </div>

                <div className="space-y-2">
                  <h2 className="font-display text-2xl sm:text-4xl font-bold text-white">
                    Verify a Graduate Credential
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-xl mx-auto">
                    Every Softcapphyjas Academy certificate is digitally signed and permanently
                    verifiable. Enter a Certificate ID below to inspect authenticity.
                  </p>
                </div>

                <form onSubmit={handleVerifySubmit} className="max-w-md mx-auto flex gap-2">
                  <input
                    type="text"
                    value={certInput}
                    onChange={(e) => setCertInput(e.target.value)}
                    placeholder="e.g. SCP-CERT-2026-A91F2B"
                    className="flex-1 h-12 px-4 rounded-xl bg-black/40 border border-white/10 font-mono text-xs text-white placeholder-white/30 focus:outline-none focus:border-[var(--accent)]"
                  />
                  <button
                    type="submit"
                    className="px-6 h-12 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition-colors shrink-0 flex items-center gap-1.5"
                  >
                    <span>Verify</span>
                    <ShieldCheck className="w-4 h-4" />
                  </button>
                </form>

                <p className="text-[11px] font-mono text-[var(--text-muted)]">
                  Try demo certificate:{" "}
                  <button
                    type="button"
                    onClick={() => setCertInput("SCP-CERT-2026-A91F2B")}
                    className="text-[var(--accent)] underline hover:text-white"
                  >
                    SCP-CERT-2026-A91F2B
                  </button>
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* 6. FAQ ACCORDION (Board 09) */}
        <section id="faq">
          <Container size="standard">
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="text-center space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-[var(--accent)]">
                  Got Questions?
                </div>
                <h2 className="font-display text-2xl sm:text-4xl font-bold text-[var(--text)]">
                  Frequently Asked Questions
                </h2>
              </div>

              <Accordion type="single" collapsible className="w-full space-y-3">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What prerequisites are required for Softcapphyjas programs?</AccordionTrigger>
                  <AccordionContent>
                    Our programs are designed for professional software engineers, data scientists, and computational researchers. Fluency in Python 3.11+, linear algebra, multivariable calculus, and PyTorch fundamentals is assumed. For advanced courses like Quantum ML and Formal Verification, foundational domain tutorials are provided in week 0.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>Are the courses self-paced or cohort-based?</AccordionTrigger>
                  <AccordionContent>
                    Academy programs feature asynchronous adaptive video lectures and self-paced code labs, combined with weekly live faculty office hours and private Discord channels. All lectures are archived with downloadable notes and full code repositories.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>How does the Ed25519 digital certificate verification work?</AccordionTrigger>
                  <AccordionContent>
                    Upon completing all course modules and achieving at least 70% on all assessments, the LMS automatically issues a cryptographically signed digital certificate. The signature is computed using our master signing key (RFC 8032) and can be verified publicly at /academy/verify/[certId] or scanned via QR code.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>Is zero-cost EMI available for Indian participants?</AccordionTrigger>
                  <AccordionContent>
                    Yes. Through our Razorpay integration, 12-month zero-cost EMI is available on all major credit and debit cards for courses priced at or above ₹3,000. Indicative installment breakdowns can be previewed directly on each course page.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>What is your refund policy?</AccordionTrigger>
                  <AccordionContent>
                    We offer a 100% money-back guarantee within 14 days of enrollment or before completing 25% of the coursework, whichever comes first. Contact student support from your portal to initiate a refund.
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
