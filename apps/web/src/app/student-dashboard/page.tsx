import { auth, signOut } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@softcapphyjas/db";
import { GraduationCap, BookOpen, Clock, PlayCircle, LogOut, Layers } from "lucide-react";

export default async function StudentDashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?next=/student-dashboard");
  }

  const user = session.user;

  // Fetch enrollments with course details and progress
  const enrollments = await prisma.enrollment.findMany({
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
    },
  });

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] selection:bg-[var(--accent)] selection:text-[#05070D]">
      {/* Header */}
      <header className="border-b border-[var(--border)] bg-[var(--bg-elev-1)] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] p-[1px]">
              <div className="w-full h-full bg-[#05070D] rounded-lg flex items-center justify-center font-mono font-bold text-xs text-[var(--accent)]">
                S
              </div>
            </div>
            <span className="font-mono font-bold text-sm text-white tracking-wider">
              ACADEMY WORKSPACE
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)]">
              STUDENT PORTAL
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/workspace-switcher"
              className="text-xs text-[var(--text-muted)] hover:text-white flex items-center gap-1.5 transition"
            >
              <Layers className="w-3.5 h-3.5" />
              Switch Portal
            </Link>

            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/login" });
              }}
            >
              <button
                type="submit"
                className="text-xs text-[var(--text-muted)] hover:text-rose-400 flex items-center gap-1.5 transition"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        {/* Welcome Hero */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[var(--bg-elev-1)] to-[var(--bg-elev-2)] border border-[var(--border)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1.5">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Welcome back, {user.name || "Scholar"}
            </h1>
            <p className="text-xs text-[var(--text-muted)] font-mono">
              Enrolled Student Account: {user.email} · Academic Cohort 2026
            </p>
          </div>

          <div className="flex gap-3">
            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-center">
              <span className="text-xs text-[var(--text-muted)] block">Enrolled Courses</span>
              <span className="text-lg font-bold text-white font-mono">{enrollments.length}</span>
            </div>
          </div>
        </div>

        {/* Continue Learning Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[var(--accent)]" />
            My Learning & Courses
          </h2>

          {enrollments.length === 0 ? (
            <div className="p-8 rounded-2xl bg-[var(--bg-elev-1)] border border-[var(--border)] text-center space-y-3">
              <GraduationCap className="w-10 h-10 text-[var(--text-muted)] mx-auto" />
              <h3 className="text-base font-semibold text-white">No active course enrollments</h3>
              <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
                Explore our catalog to enroll in Machine Learning Foundations, Agentic AI, and
                Frontier LLMOps.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrollments.map((enrol) => {
                const totalLessons = enrol.course.modules.reduce(
                  (acc, m) => acc + m.lessons.length,
                  0
                );

                return (
                  <div
                    key={enrol.id}
                    className="rounded-2xl bg-[var(--bg-elev-1)] border border-[var(--border)] hover:border-[var(--accent)]/50 transition-all p-6 flex flex-col justify-between space-y-5 group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20">
                          {enrol.course.category} · {enrol.course.level}
                        </span>
                        <span className="text-xs font-mono text-emerald-400 font-medium">
                          {enrol.progressPct}% complete
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white group-hover:text-[var(--accent)] transition-colors leading-snug">
                        {enrol.course.title}
                      </h3>

                      <p className="text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                        {enrol.course.subtitle || enrol.course.description}
                      </p>

                      {/* Progress bar */}
                      <div className="w-full bg-[var(--bg)] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] h-full rounded-full transition-all duration-500"
                          style={{ width: `${enrol.progressPct}%` }}
                        />
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs">
                      <span className="text-[var(--text-muted)] flex items-center gap-1 font-mono">
                        <Clock className="w-3.5 h-3.5" />
                        {totalLessons} lessons · {Math.round(enrol.course.durationMinutes / 60)}h
                        total
                      </span>

                      <button
                        type="button"
                        className="px-3.5 py-1.5 rounded-lg bg-[var(--accent)] text-[#05070D] font-medium text-xs flex items-center gap-1.5 hover:brightness-110 transition shadow-[var(--glow)]"
                      >
                        <PlayCircle className="w-3.5 h-3.5" />
                        Continue
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
