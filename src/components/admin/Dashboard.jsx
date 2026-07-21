import React from "react";
import {
  IndianRupee,
  ReceiptText,
  ScrollText,
  Users,
  TrendingUp,
  CalendarDays,
  ArrowUpRight,
} from "lucide-react";

function Dashboard() {
  const stats = [
    {
      title: "Today's Collection",
      value: "₹18,450",
      icon: <IndianRupee size={28} />,
      bg: "bg-green-100",
      color: "text-green-700",
      change: "+12%",
    },
    {
      title: "Receipts Today",
      value: "126",
      icon: <ReceiptText size={28} />,
      bg: "bg-orange-100",
      color: "text-orange-600",
      change: "+8%",
    },
    {
      title: "Available Poojas",
      value: "48",
      icon: <ScrollText size={28} />,
      bg: "bg-blue-100",
      color: "text-blue-700",
      change: "Active",
    },
    {
      title: "Devotees Served",
      value: "92",
      icon: <Users size={28} />,
      bg: "bg-purple-100",
      color: "text-purple-700",
      change: "+15%",
    },
  ];

  const recentReceipts = [
    {
      receipt: "RCP-000123",
      devotee: "Rajesh Kumar",
      pooja: "Ganapathi Homam",
      amount: "₹500",
    },
    {
      receipt: "RCP-000124",
      devotee: "Anjali Nair",
      pooja: "Archana",
      amount: "₹100",
    },
    {
      receipt: "RCP-000125",
      devotee: "Vishnu",
      pooja: "Pal Payasam",
      amount: "₹750",
    },
    {
      receipt: "RCP-000126",
      devotee: "Suresh",
      pooja: "Bhagavathy Seva",
      amount: "₹300",
    },
    {
      receipt: "RCP-000127",
      devotee: "Lakshmi",
      pooja: "Neeranjanam",
      amount: "₹200",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}

      <div className="rounded-3xl border border-[#E8D7BC] bg-linear-to-r from-[#FFF6E8] to-[#FFFDF8] p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-gelasio text-3xl font-bold text-[#4A2108]">
              Welcome, Admin 👋
            </h2>

            <p className="mt-2 text-[#9A6428]">
              Manage temple receipts, poojas and daily collections from one
              place.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-[#FFF2DF] px-5 py-3 text-[#C46E16] shadow-sm">
            <CalendarDays size={20} />
            <span className="font-semibold">
              {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className="rounded-3xl border border-[#E8D7BC] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.bg} ${item.color}`}
              >
                {item.icon}
              </div>

              <div className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                <TrendingUp size={15} />
                {item.change}
              </div>
            </div>

            <h3 className="mt-6 text-sm text-gray-500">{item.title}</h3>

            <h2 className="mt-1 text-3xl font-bold text-[#4A2108]">
              {item.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Bottom Grid */}

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Recent Receipts */}

        <div className="xl:col-span-2 rounded-3xl border border-[#E8D7BC] bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-[#F3E3C8] px-6 py-5">
            <h3 className="font-gelasio text-xl font-bold text-[#4A2108]">
              Recent Receipts
            </h3>

            <button className="flex items-center gap-2 text-sm font-semibold text-[#C46E16] hover:text-[#D88718]">
              View All
              <ArrowUpRight size={16} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-[#FFF8EF]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm text-[#9A6428]">
                    Receipt
                  </th>
                  <th className="px-6 py-4 text-left text-sm text-[#9A6428]">
                    Devotee
                  </th>
                  <th className="px-6 py-4 text-left text-sm text-[#9A6428]">
                    Pooja
                  </th>
                  <th className="px-6 py-4 text-right text-sm text-[#9A6428]">
                    Amount
                  </th>
                </tr>
              </thead>

              <tbody>
                {recentReceipts.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-[#F5E8D2] hover:bg-[#FFFDF8]"
                  >
                    <td className="px-6 py-4 font-medium text-[#4A2108]">
                      {item.receipt}
                    </td>

                    <td className="px-6 py-4">{item.devotee}</td>

                    <td className="px-6 py-4">{item.pooja}</td>

                    <td className="px-6 py-4 text-right font-semibold text-green-700">
                      {item.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}

        <div className="rounded-3xl border border-[#E8D7BC] bg-white p-6 shadow-sm">
          <h3 className="font-gelasio text-xl font-bold text-[#4A2108]">
            Quick Actions
          </h3>

          <div className="mt-6 space-y-4">
            <button className="w-full rounded-2xl bg-[#D88718] px-5 py-4 text-left font-semibold text-white transition hover:bg-[#C46E16]">
              ➕ Create New Receipt
            </button>

            <button className="w-full rounded-2xl border border-[#E8D7BC] bg-[#FFF8EF] px-5 py-4 text-left font-semibold text-[#4A2108] transition hover:bg-[#FFF2DF]">
              📜 Manage Poojas
            </button>

            <button className="w-full rounded-2xl border border-[#E8D7BC] bg-[#FFF8EF] px-5 py-4 text-left font-semibold text-[#4A2108] transition hover:bg-[#FFF2DF]">
              📊 Generate Report
            </button>

            <button className="w-full rounded-2xl border border-[#E8D7BC] bg-[#FFF8EF] px-5 py-4 text-left font-semibold text-[#4A2108] transition hover:bg-[#FFF2DF]">
              ⚙️ Settings
            </button>
          </div>

          <div className="mt-8 rounded-2xl bg-[#FFF6E8] p-5">
            <p className="text-sm text-[#9A6428]">
              Monthly Collection
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#C46E16]">
              ₹5,48,230
            </h2>

            <p className="mt-2 text-sm text-green-700">
              ↑ 18% compared to last month
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;