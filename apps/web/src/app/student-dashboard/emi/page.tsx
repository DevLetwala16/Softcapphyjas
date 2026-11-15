import { auth, signOut } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { StudentPortalNav } from "@/components/student-portal-nav";
import {
  CreditCard,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Calendar,
  ShieldCheck,
} from "lucide-react";

export default async function StudentEmiPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?next=/student-dashboard/emi");
  }

  const user = session.user;

  async function handleSignOut() {
    "use server";
    await signOut({ redirectTo: "/login" });
  }

  const emiSchedule = [
    { number: 1, dueDate: "Oct 05, 2026", amount: "₹4,166.50", status: "PAID", paidAt: "Oct 04, 2026" },
    { number: 2, dueDate: "Nov 05, 2026", amount: "₹4,166.50", status: "PAID", paidAt: "Nov 03, 2026" },
    { number: 3, dueDate: "Dec 05, 2026", amount: "₹4,166.50", status: "DUE", paidAt: null },
    { number: 4, dueDate: "Jan 05, 2027", amount: "₹4,166.50", status: "SCHEDULED", paidAt: null },
    { number: 5, dueDate: "Feb 05, 2027", amount: "₹4,166.50", status: "SCHEDULED", paidAt: null },
    { number: 6, dueDate: "Mar 05, 2027", amount: "₹4,166.50", status: "SCHEDULED", paidAt: null },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] selection:bg-[var(--accent)] selection:text-[#05070D]">
      <StudentPortalNav user={user} signOutAction={handleSignOut} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[var(--border)] pb-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-amber-400" />
              EMI &amp; Installments Schedule
            </h1>
            <p className="text-xs text-[var(--text-muted)] font-mono">
              6-Month Zero-Cost Installment Plan · Program: ACA-501 Autonomous Multi-Agent Systems
            </p>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-semibold flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>Next Installment Due Dec 05</span>
          </div>
        </div>

        {/* Financing KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-[var(--bg-elev-1)] border border-[var(--border)] space-y-1">
            <span className="text-xs font-mono text-[var(--text-muted)] uppercase">Total Financing</span>
            <div className="text-2xl font-mono font-bold text-white">₹24,999.00</div>
            <div className="text-[11px] font-mono text-emerald-400">0% Interest · 6 Equal Tenures</div>
          </div>

          <div className="p-6 rounded-3xl bg-[var(--bg-elev-1)] border border-[var(--border)] space-y-1">
            <span className="text-xs font-mono text-[var(--text-muted)] uppercase">Principal Paid So Far</span>
            <div className="text-2xl font-mono font-bold text-emerald-400">₹8,333.00</div>
            <div className="text-[11px] font-mono text-[var(--text-muted)]">2 of 6 Installments Settled</div>
          </div>

          <div className="p-6 rounded-3xl bg-[var(--bg-elev-1)] border border-[var(--border)] space-y-1">
            <span className="text-xs font-mono text-[var(--text-muted)] uppercase">Remaining Balance</span>
            <div className="text-2xl font-mono font-bold text-white">₹16,666.00</div>
            <div className="text-[11px] font-mono text-[var(--accent)]">4 Installments Remaining</div>
          </div>
        </div>

        {/* Installment Table */}
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-elev-1)] overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-black/40 text-[var(--text-muted)] uppercase border-b border-[var(--border)]">
                <tr>
                  <th className="p-4">Installment</th>
                  <th className="p-4">Due Date</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Settlement Note</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)] text-white/90">
                {emiSchedule.map((row) => (
                  <tr key={row.number} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-bold text-white">Installment #{row.number} of 6</td>
                    <td className="p-4 text-[var(--text-muted)]">{row.dueDate}</td>
                    <td className="p-4 font-bold text-white">{row.amount}</td>
                    <td className="p-4">
                      {row.status === "PAID" && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                          PAID
                        </span>
                      )}
                      {row.status === "DUE" && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                          DUE NOW
                        </span>
                      )}
                      {row.status === "SCHEDULED" && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-white/5 text-[var(--text-muted)] font-mono">
                          SCHEDULED
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-[var(--text-muted)] text-[11px]">
                      {row.paidAt ? `Settled on ${row.paidAt}` : "Scheduled through Razorpay"}
                    </td>
                    <td className="p-4 text-right">
                      {row.status === "DUE" ? (
                        <button
                          onClick={() => alert("Launching Razorpay Payment Gateway for Installment #3...")}
                          className="px-4 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs ml-auto transition-colors"
                        >
                          Pay Now
                        </button>
                      ) : (
                        <span className="text-[var(--text-muted)]">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
