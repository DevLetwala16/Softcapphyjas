"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
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
  Dialog,
} from "@softcapphyjas/ui";
import {
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Check,
  Star,
  Clock,
  PlayCircle,
  FileText,
  HelpCircle,
  ShieldCheck,
  CreditCard,
  UserCheck,
  Award,
  Layers,
  Sparkles,
  ChevronRight,
  Download,
  AlertCircle,
  Lock,
} from "lucide-react";
import { ACADEMY_COURSES, type CourseData } from "@/lib/academy-data";
import { calculateEmiPlans } from "@softcapphyjas/payments";

export default function CourseDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const slug = params?.slug as string;

  // Find course
  const course = ACADEMY_COURSES.find((c) => c.slug === slug || c.id === slug) || ACADEMY_COURSES[0]!;

  const [couponInput, setCouponInput] = React.useState("");
  const [appliedCoupon, setAppliedCoupon] = React.useState<{
    code: string;
    percentOff: number;
    discountPaise: number;
  } | null>(null);
  const [couponError, setCouponError] = React.useState("");
  const [showEmiModal, setShowEmiModal] = React.useState(false);
  const [isPlayingPreview, setIsPlayingPreview] = React.useState(false);

  // Calculate prices
  const basePricePaise = course.priceInPaise;
  const discountPaise = appliedCoupon ? Math.round((basePricePaise * appliedCoupon.percentOff) / 100) : 0;
  const finalPricePaise = basePricePaise - discountPaise;
  const emiPlans = React.useMemo(() => calculateEmiPlans(finalPricePaise), [finalPricePaise]);

  // Handle coupon validation
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    const code = couponInput.trim().toUpperCase();
    if (code === "LAUNCH2026") {
      setAppliedCoupon({
        code: "LAUNCH2026",
        percentOff: 20,
        discountPaise: Math.round(basePricePaise * 0.2),
      });
    } else if (code === "STUDENT50") {
      setAppliedCoupon({
        code: "STUDENT50",
        percentOff: 50,
        discountPaise: Math.round(basePricePaise * 0.5),
      });
    } else {
      setCouponError("Invalid or expired promotional code.");
    }
  };

  const relatedCourses = React.useMemo(() => {
    return ACADEMY_COURSES.filter((c) => c.slug !== course.slug).slice(0, 2);
  }, [course]);

  const [addedToCart, setAddedToCart] = React.useState(false);
  const isEnrolledParam = searchParams?.get("enrolled") === "true";

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors flex flex-col justify-between selection:bg-[var(--accent)] selection:text-[#05070D]">
      <SiteNav />

      {/* JSON-LD Course Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: course.title,
            description: course.description,
            provider: {
              "@type": "Organization",
              name: "Softcapphyjas",
              sameAs: "https://softcapphyjas.com",
            },
            offers: {
              "@type": "Offer",
              price: (course.priceInPaise / 100).toFixed(2),
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: course.rating.toString(),
              reviewCount: course.reviewCount.toString(),
            },
          }),
        }}
      />

      <main className="flex-1 py-10 sm:py-14 space-y-16">
        {/* Breadcrumb & Hero */}
        <section>
          <Container size="standard">
            <div className="space-y-6">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
                <Link href="/academy" className="hover:text-white transition-colors">
                  Academy
                </Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <Link
                  href={`/academy#catalog`}
                  className="hover:text-white transition-colors"
                >
                  {course.category}
                </Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-[var(--accent)] truncate max-w-xs">{course.code}</span>
              </nav>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Left 8 cols: Main Info */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <Badge variant={course.domain} size="sm">
                      {course.code}
                    </Badge>
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-white/10 text-white/90">
                      {course.level}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Ed25519 Certificate
                    </span>
                  </div>

                  <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                    {course.title}
                  </h1>

                  <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
                    {course.subtitle || course.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-mono text-[var(--text-muted)] border-y border-[var(--border)] py-3">
                    <div className="flex items-center gap-1 text-amber-400 font-bold">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span>{course.rating.toFixed(2)}</span>
                      <span className="text-[var(--text-muted)] font-normal">
                        ({course.reviewCount} reviews)
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[var(--accent)]" />
                      <span>{course.durationWeeks} · {course.hoursPerWeek}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-purple-400" />
                      <span>{course.studentCount}+ Scholars Enrolled</span>
                    </div>
                  </div>

                  {/* Instructor Bio Pill */}
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--bg-elev-1)] border border-[var(--border)]">
                    <img
                      src={course.instructor.avatar}
                      alt={course.instructor.name}
                      className="w-12 h-12 rounded-full object-cover border border-[var(--border)]"
                    />
                    <div className="space-y-0.5">
                      <div className="text-xs text-[var(--text-muted)] font-mono">Lead Faculty</div>
                      <div className="text-sm font-bold text-white">{course.instructor.name}</div>
                      <div className="text-xs text-[var(--text-muted)]">{course.instructor.title}</div>
                    </div>
                  </div>

                  {/* Video Preview Player */}
                  <div className="space-y-3 pt-4">
                    <div className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] flex items-center gap-1.5">
                      <PlayCircle className="w-4 h-4" /> Lesson 1 Free Interactive Preview
                    </div>
                    <div className="relative aspect-video rounded-3xl overflow-hidden bg-black/80 border border-[var(--border)] shadow-2xl flex items-center justify-center group">
                      {!isPlayingPreview ? (
                        <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-4 bg-gradient-to-t from-black via-black/60 to-transparent">
                          <button
                            onClick={() => setIsPlayingPreview(true)}
                            className="w-16 h-16 rounded-full bg-[var(--accent)] flex items-center justify-center text-black hover:scale-105 transition-transform shadow-xl shadow-[var(--accent)]/30"
                          >
                            <PlayCircle className="w-8 h-8 fill-black" />
                          </button>
                          <div className="space-y-1">
                            <h4 className="text-base font-bold text-white">
                              Preview: {course.modules[0]?.lessons[0]?.title}
                            </h4>
                            <p className="text-xs font-mono text-[var(--text-muted)]">
                              35 minutes · Full HD · Adaptive Streaming
                            </p>
                          </div>
                        </div>
                      ) : (
                        <video
                          src={course.previewVideoUrl}
                          controls
                          autoPlay
                          className="w-full h-full object-contain"
                        />
                      )}

                      {/* Subtle anti-piracy preview watermark */}
                      <div className="absolute top-3 right-4 text-[10px] font-mono text-white/30 pointer-events-none uppercase">
                        Softcapphyjas Preview Sandbox · Watermark Protected
                      </div>
                    </div>
                  </div>

                  {/* Learning Outcomes */}
                  <div className="space-y-4 pt-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[var(--accent)]" />
                      What You Will Master &amp; Build
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {course.outcomes.map((outcome, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[var(--bg-elev-1)]/60 border border-[var(--border)] text-xs text-white/90 leading-relaxed"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Prerequisites */}
                  <div className="space-y-3 pt-4">
                    <h2 className="text-lg font-bold text-white">Prerequisites &amp; Requirements</h2>
                    <ul className="space-y-2">
                      {course.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                          <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Comprehensive Syllabus Accordion (Board 10) */}
                  <div className="space-y-4 pt-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Layers className="w-5 h-5 text-[var(--accent)]" />
                        Curriculum Syllabus ({course.modules.length} Modules)
                      </h2>
                      <span className="text-xs font-mono text-[var(--text-muted)]">
                        {course.durationMinutes / 60} Total Hours
                      </span>
                    </div>

                    <Accordion type="single" collapsible defaultValue="mod-1" className="space-y-3">
                      {course.modules.map((mod, mIdx) => (
                        <AccordionItem
                          key={mod.id}
                          value={mod.id}
                          className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-1)] overflow-hidden"
                        >
                          <AccordionTrigger className="px-5 py-4 hover:no-underline">
                            <div className="flex items-center justify-between w-full pr-4 text-left">
                              <span className="font-mono text-xs sm:text-sm font-bold text-white">
                                {mod.title}
                              </span>
                              <span className="text-[11px] font-mono text-[var(--text-muted)]">
                                {mod.lessons.length} Lessons
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-5 pb-4 pt-1 border-t border-[var(--border)] space-y-2">
                            {mod.lessons.map((lesson) => (
                              <div
                                key={lesson.id}
                                className="flex items-center justify-between p-3 rounded-xl bg-black/20 hover:bg-white/5 transition-colors text-xs"
                              >
                                <div className="flex items-center gap-3">
                                  {lesson.type === "VIDEO" && (
                                    <PlayCircle className="w-4 h-4 text-[var(--accent)]" />
                                  )}
                                  {lesson.type === "ARTICLE" && (
                                    <FileText className="w-4 h-4 text-purple-400" />
                                  )}
                                  {lesson.type === "QUIZ" && (
                                    <HelpCircle className="w-4 h-4 text-emerald-400" />
                                  )}
                                  {lesson.type === "PDF" && (
                                    <Download className="w-4 h-4 text-amber-400" />
                                  )}
                                  <span className="text-white/90 font-medium">{lesson.title}</span>
                                </div>

                                <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--text-muted)]">
                                  {lesson.isPreview ? (
                                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                                      Free Preview
                                    </span>
                                  ) : (
                                    <Lock className="w-3.5 h-3.5 text-white/40" />
                                  )}
                                  <span>{Math.round(lesson.durationSec / 60)} min</span>
                                </div>
                              </div>
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>

                  {/* Student Reviews */}
                  <div className="space-y-4 pt-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                      Verified Scholar Reviews ({course.reviewCount})
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                      {course.reviews.map((rev) => (
                        <div
                          key={rev.id}
                          className="p-5 rounded-2xl bg-[var(--bg-elev-1)] border border-[var(--border)] space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="text-sm font-bold text-white flex items-center gap-2">
                                <span>{rev.name}</span>
                                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                  Verified Alum
                                </span>
                              </div>
                              <div className="text-xs text-[var(--text-muted)]">{rev.title}</div>
                            </div>
                            <div className="flex text-amber-400">
                              {Array.from({ length: rev.rating }).map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                              ))}
                            </div>
                          </div>
                          <p className="text-xs text-[var(--text-muted)] leading-relaxed italic">
                            "{rev.comment}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right 4 cols: Sticky Purchase Card (Desktop) */}
                <div className="lg:col-span-4 sticky top-24 space-y-6">
                  <div className="rounded-3xl border border-[var(--border)] bg-gradient-to-b from-[var(--bg-elev-1)] to-[var(--bg-elev-2)] p-6 sm:p-7 space-y-6 shadow-2xl">
                    <div className="space-y-2">
                      <div className="text-xs font-mono uppercase text-[var(--accent)]">
                        Tuition &amp; Enrollment
                      </div>
                      <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-mono font-extrabold text-white">
                          ₹{(finalPricePaise / 100).toLocaleString("en-IN")}
                        </span>
                        {course.compareAtPaise && (
                          <span className="text-sm font-mono text-[var(--text-muted)] line-through">
                            ₹{(course.compareAtPaise / 100).toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>

                      {appliedCoupon && (
                        <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 flex items-center justify-between">
                          <span>Code '{appliedCoupon.code}' applied</span>
                          <span>-₹{(discountPaise / 100).toLocaleString("en-IN")}</span>
                        </div>
                      )}
                    </div>

                    {/* EMI Hint & Popover trigger */}
                    {course.emiEligible && (
                      <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-[var(--text-muted)] flex items-center gap-1.5">
                            <CreditCard className="w-3.5 h-3.5 text-[var(--accent)]" />
                            Zero-Cost EMI
                          </span>
                          <span className="text-white font-bold">
                            from ₹{Math.round(finalPricePaise / 1200).toLocaleString("en-IN")}/mo
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowEmiModal(true)}
                          className="w-full text-center text-[11px] font-mono text-[var(--accent)] hover:underline"
                        >
                          View all 3, 6, 9, 12 month bank plans →
                        </button>
                      </div>
                    )}

                    {/* Coupon Input */}
                    <form onSubmit={handleApplyCoupon} className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          placeholder="Coupon code (e.g. LAUNCH2026)"
                          className="flex-1 h-10 px-3 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-white placeholder-white/30 focus:outline-none focus:border-[var(--accent)]"
                        />
                        <button
                          type="submit"
                          className="px-3.5 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                      {couponError && (
                        <div className="text-[11px] font-mono text-rose-400">{couponError}</div>
                      )}
                    </form>

                    {/* CTAs (Board 10: Add to cart + Buy now / Go to course) */}
                    <div className="space-y-2.5 pt-2">
                      {isEnrolledParam ? (
                        <Link
                          href={`/student-dashboard/courses/${course.slug}/learn`}
                          className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs text-center block transition-colors shadow-lg shadow-emerald-500/20"
                        >
                          ✓ Enrolled · Go to Classroom
                        </Link>
                      ) : (
                        <>
                          <Link
                            href={`/academy/checkout?course=${course.slug}&coupon=${appliedCoupon?.code || ""}`}
                            className="w-full py-3.5 rounded-xl bg-[var(--accent)] hover:opacity-90 text-black font-semibold text-xs text-center block transition-opacity shadow-lg shadow-[var(--accent)]/20"
                          >
                            Buy Now · Immediate Classroom Access
                          </Link>

                          <button
                            type="button"
                            onClick={handleAddToCart}
                            className={`w-full py-2.5 rounded-xl border text-xs font-mono font-medium transition-all ${
                              addedToCart
                                ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400"
                                : "bg-white/5 border-white/10 hover:bg-white/10 text-white"
                            }`}
                          >
                            {addedToCart ? "✓ Added to Academy Cart" : "+ Add to Cart"}
                          </button>
                        </>
                      )}

                      <Link
                        href={`/student-dashboard/courses/${course.slug}/learn`}
                        className="w-full py-2.5 rounded-xl bg-transparent border border-white/10 hover:bg-white/5 text-[var(--text-muted)] hover:text-white font-mono text-xs text-center block transition-colors"
                      >
                        Launch Interactive Player (Preview)
                      </Link>
                    </div>

                    {/* Trust Guarantees */}
                    <div className="pt-4 border-t border-[var(--border)] space-y-2 text-xs text-[var(--text-muted)]">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>14-day 100% money-back guarantee</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-[var(--accent)]" />
                        <span>Cryptographically signed Ed25519 certificate</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-purple-400" />
                        <span>Direct faculty research office hours</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>

      {/* EMI Calculator Popover Modal (Board 10 Spec) */}
      {showEmiModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[var(--bg-elev-1)] border border-[var(--border)] rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
              <div className="space-y-0.5">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[var(--accent)]" />
                  Indicative EMI Installment Calculator
                </h3>
                <p className="text-xs text-[var(--text-muted)] font-mono">
                  Principal: ₹{(finalPricePaise / 100).toLocaleString("en-IN")} · Razorpay Supported
                </p>
              </div>
              <button
                onClick={() => setShowEmiModal(false)}
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[var(--text-muted)] hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              {emiPlans.map((plan) => (
                <div
                  key={plan.tenureMonths}
                  className={`p-4 rounded-2xl border flex items-center justify-between text-xs font-mono ${
                    plan.isZeroCost
                      ? "bg-[var(--accent)]/10 border-[var(--accent)]/40 text-white"
                      : "bg-black/30 border-[var(--border)] text-[var(--text-muted)]"
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-white flex items-center gap-2">
                      <span>{plan.tenureMonths} Months Tenure</span>
                      {plan.isZeroCost && (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-[var(--accent)] text-black font-extrabold uppercase">
                          Zero-Cost
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-[var(--text-muted)]">
                      {plan.isZeroCost ? "0% Interest · Zero Bank Processing" : "14% p.a. standard bank APR"}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-base font-bold text-white">{plan.formattedMonthly}/mo</div>
                    <div className="text-[11px] text-[var(--text-muted)]">Total: {plan.formattedTotal}</div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[11px] font-mono text-[var(--text-muted)] leading-relaxed">
              * Note: Exact bank interest rates and processing fees depend on your issuing credit or debit card bank. Exact EMI schedule is selected at Razorpay Checkout step.
            </p>

            <button
              onClick={() => setShowEmiModal(false)}
              className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
            >
              Close EMI Calculator
            </button>
          </div>
        </div>
      )}

      {/* Mobile Sticky Bottom Bar (Board 10 Spec) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--bg-elev-1)]/95 backdrop-blur-md border-t border-[var(--border)] p-4 flex items-center justify-between">
        <div>
          <div className="text-[10px] font-mono text-[var(--text-muted)]">Tuition Price</div>
          <div className="text-lg font-mono font-bold text-white">
            ₹{(finalPricePaise / 100).toLocaleString("en-IN")}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAddToCart}
            className="px-3.5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white font-mono text-xs"
          >
            {addedToCart ? "✓" : "+ Cart"}
          </button>
          <Link
            href={`/academy/checkout?course=${course.slug}&coupon=${appliedCoupon?.code || ""}`}
            className="px-5 py-2.5 rounded-xl bg-[var(--accent)] text-black font-semibold text-xs shadow-lg shadow-[var(--accent)]/20"
          >
            Buy Now
          </Link>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
