import { auth, signOut } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { StudentPortalNav } from "@/components/student-portal-nav";
import {
  Receipt,
  Download,
  Calendar,
  CreditCard,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

export default async function StudentOrdersPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?next=/student-dashboard/orders");
  }

  const user = session.user;

  async function handleSignOut() {
    "use server";
    await signOut({ redirectTo: "/login" });
  }

  const orders = [
    {
      id: "ord_01",
      number: "SCP-ORD-2026-0042",
      date: "October 12, 2026",
      items: "Autonomous Multi-Agent Systems & Tool-Use Architecture (ACA-501)",
      subtotal: "₹24,999.00",
      discount: "-₹4,999.80",
      gst: "₹3,599.86",
      total: "₹23,599.06",
      method: "Card EMI (12 mo zero-cost)",
      status: "PAID",
      invoiceUrl: "#",
    },
    {
      id: "ord_02",
      number: "SCP-ORD-2026-0018",
      date: "August 20, 2026",
      items: "Machine Learning Foundations & Mathematical Rigor (ACA-101)",
      subtotal: "₹4,999.00",
      discount: "₹0.00",
      gst: "₹899.82",
      total: "₹5,898.82",
      method: "UPI (Google Pay)",
      status: "PAID",
      invoiceUrl: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] selection:bg-[var(--accent)] selection:text-[#05070D]">
      <StudentPortalNav user={user} signOutAction={handleSignOut} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[var(--border)] pb-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Receipt className="w-6 h-6 text-purple-400" />
              Orders &amp; GST Invoices
            </h1>
            <p className="text-xs text-[var(--text-muted)] font-mono">
              Past transaction records, payment methods, and downloadable tax receipts
            </p>
          </div>
        </div>

        {/* Orders Table */}
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-elev-1)] overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-black/40 text-[var(--text-muted)] uppercase border-b border-[var(--border)]">
                <tr>
                  <th className="p-4">Order #</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Item(s)</th>
                  <th className="p-4">Method</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)] text-white/90">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-bold text-[var(--accent)]">{ord.number}</td>
                    <td className="p-4 text-[var(--text-muted)]">{ord.date}</td>
                    <td className="p-4 font-sans font-medium text-white max-w-xs truncate">
                      {ord.items}
                    </td>
                    <td className="p-4 text-[var(--text-muted)]">{ord.method}</td>
                    <td className="p-4 font-bold text-white">{ord.total}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                        {ord.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => alert(`Downloading GST Tax Invoice for ${ord.number}...`)}
                        className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 ml-auto transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>PDF</span>
                      </button>
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
