import { auth, signOut } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@softcapphyjas/db";
import {
  Building2,
  Briefcase,
  FileText,
  Clock,
  CheckCircle2,
  Layers,
  LogOut,
  FolderOpen,
} from "lucide-react";

export default async function ClientDashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?next=/client-dashboard");
  }

  const user = session.user;

  // Fetch client projects with milestones and files
  const projects = await prisma.project.findMany({
    where: { clientId: user.id },
    include: {
      milestones: true,
      files: true,
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
              ENTERPRISE PORTAL
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--accent-2)]/10 border border-[var(--accent-2)]/20 text-[var(--accent-2)]">
              CLIENT WORKSPACE
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
        {/* Welcome Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[var(--bg-elev-1)] to-[var(--bg-elev-2)] border border-[var(--border)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1.5">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Enterprise Dashboard · {user.name || "Client Partner"}
            </h1>
            <p className="text-xs text-[var(--text-muted)] font-mono">
              Account: {user.email} · Sovereign Client Engagement Space
            </p>
          </div>

          <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-center">
            <span className="text-xs text-[var(--text-muted)] block">Active Engagements</span>
            <span className="text-lg font-bold text-white font-mono">{projects.length}</span>
          </div>
        </div>

        {/* Projects List */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[var(--accent-2)]" />
            Active Cognitive Systems & Swarm Projects
          </h2>

          {projects.length === 0 ? (
            <div className="p-8 rounded-2xl bg-[var(--bg-elev-1)] border border-[var(--border)] text-center space-y-3">
              <Building2 className="w-10 h-10 text-[var(--text-muted)] mx-auto" />
              <h3 className="text-base font-semibold text-white">No active engagements</h3>
              <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
                Submit an enterprise inquiry or engage our engineering teams at /hire-us to initiate
                a project.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-2xl bg-[var(--bg-elev-1)] border border-[var(--border)] p-6 sm:p-8 space-y-6"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[var(--border)] pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs px-2 py-0.5 rounded bg-[var(--accent-2)]/10 text-[var(--accent-2)] border border-[var(--accent-2)]/20">
                          {project.ref}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {project.status}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    </div>

                    <div className="text-right text-xs text-[var(--text-muted)] font-mono">
                      <span>Timeline: {project.timelineWeeks} Weeks</span>
                    </div>
                  </div>

                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    {project.brief}
                  </p>

                  {/* Milestones & Deliverables */}
                  <div className="space-y-3">
                    <span className="text-xs font-semibold text-white flex items-center gap-1.5 uppercase tracking-wider font-mono">
                      <Clock className="w-3.5 h-3.5 text-[var(--accent)]" />
                      Milestones
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {project.milestones.map((m) => (
                        <div
                          key={m.id}
                          className="p-3.5 rounded-xl bg-[var(--bg)] border border-[var(--border)] flex items-center justify-between text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <CheckCircle2
                              className={`w-4 h-4 ${
                                m.status === "COMPLETED" ? "text-emerald-400" : "text-amber-400"
                              }`}
                            />
                            <span className="text-white font-medium">{m.title}</span>
                          </div>
                          <span className="font-mono text-[10px] text-[var(--text-muted)]">
                            {m.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Project Files */}
                  {project.files.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-[var(--border)]">
                      <span className="text-xs font-semibold text-white flex items-center gap-1.5 uppercase tracking-wider font-mono">
                        <FolderOpen className="w-3.5 h-3.5 text-[var(--accent-2)]" />
                        Deliverables & Architecture Blueprints
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {project.files.map((file) => (
                          <div
                            key={file.id}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white/90"
                          >
                            <FileText className="w-3.5 h-3.5 text-[var(--accent)]" />
                            <span>{file.name}</span>
                            <span className="text-[10px] font-mono text-emerald-400">
                              [{file.scanStatus}]
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
