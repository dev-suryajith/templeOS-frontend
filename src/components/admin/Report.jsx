import React from "react";
import {
  CalendarDays,
  IndianRupee,
  ReceiptText,
  Wallet,
  Smartphone,
  CreditCard,
  Download,
  TrendingUp,
  BarChart3,
} from "lucide-react";

function Reports() {
  const topPoojas = [
    { name: "Ganapathi Homam", count: 42, amount: "₹21,000" },
    { name: "Archana", count: 35, amount: "₹3,500" },
    { name: "Pal Payasam", count: 28, amount: "₹14,000" },
    { name: "Bhagavathy Seva", count: 22, amount: "₹6,600" },
    { name: "Neeranjanam", count: 18, amount: "₹3,600" },
  ];

  const recentReports = [
    {
      date: "21 Jul 2026",
      receipts: 126,
      collection: "₹18,450",
      cash: "₹8,200",
      online: "₹10,250",
    },
    {
      date: "20 Jul 2026",
      receipts: 118,
      collection: "₹17,120",
      cash: "₹7,820",
      online: "₹9,300",
    },
    {
      date: "19 Jul 2026",
      receipts: 132,
      collection: "₹19,860",
      cash: "₹9,900",
      online: "₹9,960",
    },
  ];

  const cards = [
    {
      title: "Total Collection",
      value: "₹5,48,230",
      icon: <IndianRupee size={28} />,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Total Receipts",
      value: "3,286",
      icon: <ReceiptText size={28} />,
      color: "bg-orange-100 text-orange-700",
    },
    {
      title: "Average Daily",
      value: "₹18,274",
      icon: <TrendingUp size={28} />,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Most Booked",
      value: "Ganapathi Homam",
      icon: <BarChart3 size={28} />,
      color: "bg-purple-100 text-purple-700",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between rounded-3xl border border-[#E8D7BC] bg-[#FFFDF8] p-6">
        <div>
          <h2 className="font-gelasio text-3xl font-bold text-[#4A2108]">
            Reports & Analytics
          </h2>

          <p className="mt-2 text-[#9A6428]">
            View collections, receipts and payment summaries.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-[#E8D7BC] bg-white px-4 py-3 hover:bg-[#FFF2DF]">
            <CalendarDays size={18} />
            Date Range
          </button>

          <button className="flex items-center gap-2 rounded-xl bg-[#D88718] px-4 py-3 font-medium text-white hover:bg-[#C46E16]">
            <Download size={18} />
            Export PDF
          </button>

          <button className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-3 font-medium text-white hover:bg-green-700">
            <Download size={18} />
            Export Excel
          </button>
        </div>
      </div>

      {/* Summary Cards */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="rounded-3xl border border-[#E8D7BC] bg-white p-6 shadow-sm"
          >
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl ${card.color}`}
            >
              {card.icon}
            </div>

            <p className="mt-5 text-sm text-gray-500">
              {card.title}
            </p>

            <h3 className="mt-1 text-2xl font-bold text-[#4A2108]">
              {card.value}
            </h3>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Payment Summary */}

        <div className="rounded-3xl border border-[#E8D7BC] bg-white p-6">
          <h3 className="font-gelasio text-xl font-bold text-[#4A2108]">
            Payment Summary
          </h3>

          <div className="mt-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Wallet className="text-green-600" />
                <span>Cash</span>
              </div>

              <span className="font-bold">₹2,18,450</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone className="text-blue-600" />
                <span>UPI</span>
              </div>

              <span className="font-bold">₹2,56,780</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CreditCard className="text-orange-600" />
                <span>Card</span>
              </div>

              <span className="font-bold">₹73,000</span>
            </div>
          </div>
        </div>

        {/* Top Poojas */}

        <div className="xl:col-span-2 rounded-3xl border border-[#E8D7BC] bg-white p-6">
          <h3 className="mb-5 font-gelasio text-xl font-bold text-[#4A2108]">
            Top Performing Poojas
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-[#FFF8EF]">
                <tr>
                  <th className="px-4 py-3 text-left">Pooja</th>
                  <th className="px-4 py-3 text-center">Bookings</th>
                  <th className="px-4 py-3 text-right">Collection</th>
                </tr>
              </thead>

              <tbody>
                {topPoojas.map((pooja, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-[#FFFDF8]"
                  >
                    <td className="px-4 py-4 font-medium">
                      {pooja.name}
                    </td>

                    <td className="px-4 py-4 text-center">
                      {pooja.count}
                    </td>

                    <td className="px-4 py-4 text-right font-semibold text-green-700">
                      {pooja.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Daily Reports */}

      <div className="rounded-3xl border border-[#E8D7BC] bg-white">
        <div className="border-b border-[#F3E3C8] px-6 py-5">
          <h3 className="font-gelasio text-xl font-bold text-[#4A2108]">
            Daily Collection Report
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-[#FFF8EF]">
              <tr>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-center">Receipts</th>
                <th className="px-6 py-4 text-right">Cash</th>
                <th className="px-6 py-4 text-right">Online</th>
                <th className="px-6 py-4 text-right">
                  Total Collection
                </th>
              </tr>
            </thead>

            <tbody>
              {recentReports.map((report, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-[#FFFDF8]"
                >
                  <td className="px-6 py-4">{report.date}</td>

                  <td className="px-6 py-4 text-center">
                    {report.receipts}
                  </td>

                  <td className="px-6 py-4 text-right">
                    {report.cash}
                  </td>

                  <td className="px-6 py-4 text-right">
                    {report.online}
                  </td>

                  <td className="px-6 py-4 text-right font-bold text-green-700">
                    {report.collection}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Reports;