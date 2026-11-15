import { auth, signOut } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@softcapphyjas/db";
import { StudentPortalNav } from "@/components/student-portal-nav";
import {
  GraduationCap,
  BookOpen,
  Clock,
  PlayCircle,
  AlertTriangle,
  Award,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { ACADEMY_COURSES } from "@/lib/academy-data";

export default async function StudentDashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?next=/student-dashboard");
  }

  const user = session.user;

  // Sign out server action
  async function handleSignOut() {
    "use server";
    await signOut({ redirectTo: "/login" });
  }

  // Fetch enrollments safely from DB or fallback to mock
  let enrollments: any[] = [];
  try {
    enrollments = await prisma.enrollment.findMany({
      where: { userId: user.id },
      include: {
        course: {
          include: {
            modules: {
              include: {
                lessons: true,
              },
            },
          },
        },
        lessonProgress: true,
        certificate: true,
      },
      orderBy: { updatedAt: "desc" },
    });
  } catch (e) {
    console.warn("DB enrollments fetch error:", (e as Error).message);
  }

  // If no enrollments in DB, provide rich mock enrollments for demo
  if (enrollments.length === 0) {
    const c1 = ACADEMY_COURSES[0]!; // autonomous-agents-arch
    const c2 = ACADEMY_COURSES[3]!; // machine-learning-foundations
    enrollments = [
      {
        id: "enr_demo_01",
        courseId: c1.id,
        progressPct: 66,
        course: {
          id: c1.id,
          slug: c1.slug,
          title: c1.title,
          subtitle: c1.subtitle,
          category: c1.category,
          level: c1.level,
          durationMinutes: c1.durationMinutes,
          modules: c1.modules,
        },
        certificate: null,
      },
      {
        id: "enr_demo_02",
        courseId: c2.id,
        progressPct: 100,
        completedAt: new Date("2026-11-01"),
        course: {
          id: c2.id,
          slug: c2.slug,
          title: c2.title,
          subtitle: c2.subtitle,
          category: c2.category,
          level: c2.level,
          durationMinutes: c2.durationMinutes,
          modules: c2.modules,
        },
        certificate: {
          publicId: "SCP-CERT-2026-B8820E",
          issuedAt: new Date("2026-11-01"),
        },
      },
    ];
  }

  // Active / in-progress course
  const activeEnrollment =
    enrollments.find((e) => e.progressPct < 100) || enrollments[0];

  const totalLessonsInActive =
    activeEnrollment?.course?.modules?.reduce(
      (acc: number, m: any) => acc + (m.lessons?.length || 0),
      0
    ) || 7;

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] selection:bg-[var(--accent)] selection:text-[#05070D]">
      <StudentPortalNav user={user} signOutAction={handleSignOut} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
        {/* Overdue Installment Policy Banner (Board 19 Spec) */}
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <div className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wide">
                Upcoming Installment Notice · Policy Grace Period Active
              </div>
              <p className="text-xs text-white/80">
                Installment #3 of 6 (₹4,166.50) is scheduled for Dec 05, 2026. Zero penalty applies during grace days.
              </p>
            </div>
          </div>
          <Link
            href="/student-dashboard/emi"
            className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-mono text-xs font-semibold shrink-0 transition-colors"
          >
            Manage Schedule
          </Link>
        </div>

        {/* 1. CONTINUE LEARNING HERO WIDGET (Board 19) */}
        {activeEnrollment && (
          <div className="rounded-3xl border border-[var(--border)] bg-gradient-to-r from-[var(--bg-elev-1)] via-[var(--bg-elev-2)] to-[var(--bg-elev-1)] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3 py-1 text-xs font-mono text-[var(--accent)]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Continue Where You Left Off</span>
              </div>

              <div className="space-y-1">
                <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {activeEnrollment.course.title}
                </h2>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] font-mono">
                  Up next: Module 2 · Hierarchical Supervisor vs Peer-to-Peer Consensus
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--text-muted)] pt-1">
                <span>Category: {activeEnrollment.course.category}</span>
                <span>·</span>
                <span>Level: {activeEnrollment.course.level}</span>
                <span>·</span>
                <span className="text-emerald-400">
                  {activeEnrollment.progressPct}% Completed
                </span>
              </div>
            </div>

            {/* Circular Progress & Resume Button */}
            <div className="flex flex-col sm:flex-row items-center gap-6 shrink-0 w-full md:w-auto">
              {/* Circular Progress Ring */}
              <div className="relative w-20 h-20 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-white/10"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-[var(--accent)]"
                    strokeDasharray={`${activeEnrollment.progressPct}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute font-mono text-sm font-bold text-white">
                  {activeEnrollment.progressPct}%
                </span>
              </div>

              <Link
                href={`/student-dashboard/courses/${activeEnrollment.course.slug}/learn`}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[var(--accent)] hover:opacity-90 text-black font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-[var(--accent)]/20"
              >
                <PlayCircle className="w-4 h-4 fill-black" />
                <span>Resume Classroom</span>
              </Link>
            </div>
          </div>
        )}

        {/* 2. KPI METRICS STRIP */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[var(--bg-elev-1)] border border-[var(--border)] space-y-1">
            <span className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[var(--accent)]" /> Enrolled Courses
            </span>
            <div className="text-2xl font-mono font-bold text-white">{enrollments.length}</div>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--bg-elev-1)] border border-[var(--border)] space-y-1">
            <span className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-purple-400" /> Lab Hours Completed
            </span>
            <div className="text-2xl font-mono font-bold text-white">42.5 hrs</div>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--bg-elev-1)] border border-[var(--border)] space-y-1">
            <span className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Quizzes Passed
            </span>
            <div className="text-2xl font-mono font-bold text-white">5 / 5</div>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--bg-elev-1)] border border-[var(--border)] space-y-1">
            <span className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" /> Certificates Earned
            </span>
            <div className="text-2xl font-mono font-bold text-white">
              {enrollments.filter((e) => e.certificate || e.progressPct === 100).length}
            </div>
          </div>
        </div>

        {/* 3. MY ENROLLED COURSES GRID (Board 19) */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[var(--accent)]" />
                My Enrolled Curricula
              </h2>
              <p className="text-xs text-[var(--text-muted)] font-mono">
                Access self-paced video lectures, code labs, and quizzes
              </p>
            </div>

            <Link
              href="/academy"
              className="text-xs font-mono text-[var(--accent)] hover:underline inline-flex items-center gap-1"
            >
              <span>Explore More Programs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrollments.map((enrol) => {
              const isCompleted = enrol.progressPct >= 100;

              return (
                <div
                  key={enrol.id}
                  className="rounded-3xl bg-[var(--bg-elev-1)] border border-[var(--border)] hover:border-[var(--accent)]/50 transition-all p-6 flex flex-col justify-between space-y-6 group shadow-lg"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20">
                        {enrol.course.category} · {enrol.course.level}
                      </span>
                      <span
                        className={`text-xs font-mono font-semibold ${
                          isCompleted ? "text-emerald-400" : "text-white/80"
                        }`}
                      >
                        {enrol.progressPct}% complete
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="text-base font-bold text-white group-hover:text-[var(--accent)] transition-colors leading-snug">
                        {enrol.course.title}
                      </h3>
                      <p className="text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                        {enrol.course.subtitle || enrol.course.description}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden border border-white/5">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          isCompleted
                            ? "bg-emerald-400"
                            : "bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)]"
                        }`}
                        style={{ width: `${enrol.progressPct}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs">
                    {isCompleted ? (
                      <Link
                        href={`/academy/verify/${enrol.certificate?.publicId || "SCP-CERT-2026-B8820E"}`}
                        className="inline-flex items-center gap-1.5 text-emerald-400 font-mono text-xs font-semibold hover:underline"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>View Certificate</span>
                      </Link>
                    ) : (
                      <span className="text-[var(--text-muted)] font-mono text-xs">
                        In Progress
                      </span>
                    )}

                    <Link
                      href={`/student-dashboard/courses/${enrol.course.slug}/learn`}
                      className="px-4 py-2 rounded-xl bg-[var(--accent)] hover:opacity-90 text-black font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-[var(--accent)]/20"
                    >
                      <PlayCircle className="w-3.5 h-3.5 fill-black" />
                      <span>{isCompleted ? "Review Lab" : "Classroom"}</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
