import { APP_CONFIG } from "@softcapphyjas/config";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 sm:p-12 text-center bg-gradient-to-b from-[#05070D] via-[#0A0E1A] to-[#05070D]">
      <div className="max-w-3xl w-full border border-white/10 rounded-2xl p-8 sm:p-12 bg-white/[0.02] backdrop-blur-xl shadow-2xl relative overflow-hidden">
        {/* Glow backdrop accent */}
        <div
          className="absolute -top-32 -left-32 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, #22D3EE, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, #8B5CF6, transparent 70%)" }}
        />

        {/* Brand Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative w-20 h-20 rounded-2xl p-2 bg-[#0F1526] border border-cyan-400/30 flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.25)]">
            <Image
              src="/brand/S1.png"
              alt="Softcapphyjas Logo"
              width={64}
              height={64}
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Title */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 mb-4">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          Phase 0: Foundation Verified
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          {APP_CONFIG.name}
        </h1>
        <p className="text-base sm:text-lg text-slate-400 mb-8 max-w-xl mx-auto leading-relaxed">
          {APP_CONFIG.tagline}. Monorepo scaffold and foundation active with Next.js 15, TypeScript
          Strict, Tailwind CSS v4, and Docker infrastructure.
        </p>

        {/* Architecture Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
          <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
            <div className="text-xs text-slate-500 font-mono">APP</div>
            <div className="text-sm font-semibold text-slate-200">Next.js 15 App</div>
          </div>
          <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
            <div className="text-xs text-slate-500 font-mono">DATABASE</div>
            <div className="text-sm font-semibold text-slate-200">PostgreSQL 16</div>
          </div>
          <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
            <div className="text-xs text-slate-500 font-mono">QUEUE / CACHE</div>
            <div className="text-sm font-semibold text-slate-200">Redis & BullMQ</div>
          </div>
          <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
            <div className="text-xs text-slate-500 font-mono">AI ENGINE</div>
            <div className="text-sm font-semibold text-slate-200">Groq & Gemini</div>
          </div>
        </div>

        {/* Domains */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap justify-center gap-2">
          {APP_CONFIG.domains.map((domain) => (
            <span
              key={domain.id}
              className="px-2.5 py-1 rounded-md text-xs font-medium border"
              style={{
                color: domain.color,
                borderColor: `${domain.color}40`,
                backgroundColor: `${domain.color}10`,
              }}
            >
              {domain.label}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
