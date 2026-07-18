import { ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { generateReceiptNumberAPI, getAllPoojaAPI } from "../../services/allAPI";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";

function ReceiptForm({ receipt, setReceipt }) {
  const [allPooja, setAllPooja] = useState([])

  const getAllPooja = async () => {
    try {
      const res = await getAllPoojaAPI();

      if (res.status === 200) {
        setAllPooja(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };



  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        getAllPooja(),
      ]);
      setReceipt((prev) => ({ ...prev, date: new Date().toISOString().split("T")[0] }))
    };

    loadData();
  }, []);
  return (
    <form className="space-y-4 sm:space-y-6">

      {/* Receipt Details */}
      <section className="rounded-2xl sm:rounded-3xl border border-[#EEDBC1] bg-white p-4 sm:p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.05)]">

        {/* heading */}
        <div className="mb-5 sm:mb-8 flex items-center gap-2.5 sm:gap-4">
          <div className="h-6 sm:h-7 w-1 shrink-0 rounded-full bg-linear-to-b from-[#D8891E] to-[#F3A43A]" />
          <div className="min-w-0">
            <h2 className="font-gelasio text-[15px] sm:text-lg font-semibold text-[#542D12] truncate">
              Receipt Details
            </h2>
          </div>
          <div className="ml-1 sm:ml-4 h-px flex-1 bg-[#F2E3CF]" />
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:gap-5 sm:grid-cols-2">

          <div className="min-w-0">
            <label className="mb-1.5 sm:mb-2 block text-[10px] sm:text-xs font-semibold uppercase tracking-[0.14em] sm:tracking-[0.18em] text-[#9A6428]">
              Receipt Number
            </label>
            <input
              type="text"
              value={receipt.receiptNumber}
              readOnly
              className="w-full rounded-xl sm:rounded-2xl border border-[#EEDCC2] bg-[#FFFEFC] px-3.5 py-2.5 sm:px-5 sm:py-3.5 text-sm sm:text-base text-[#3D220F] placeholder:text-[#C5A88B] transition-all duration-200 outline-none focus:border-[#D98A21] focus:ring-4 focus:ring-[#FCEFD8]"
            />
          </div>

          <div className="min-w-0">
            <label className="mb-1.5 sm:mb-2 block text-[10px] sm:text-xs font-semibold uppercase tracking-[0.14em] sm:tracking-[0.18em] text-[#9A6428]">
              Date
            </label>
            <input
              type="date"
              onChange={(e) => setReceipt({ ...receipt, date: e.target.value })}
              value={receipt.date}
              className="w-full rounded-xl sm:rounded-2xl border border-[#EEDCC2] bg-[#FFFEFC] px-3.5 py-2.5 sm:px-5 sm:py-3.5 text-sm sm:text-base text-[#3D220F] placeholder:text-[#C5A88B] transition-all duration-200 outline-none focus:border-[#D98A21] focus:ring-4 focus:ring-[#FCEFD8]"
            />
          </div>

          <div className="min-w-0">
            <label className="mb-1.5 sm:mb-2 block text-[10px] sm:text-xs font-semibold uppercase tracking-[0.14em] sm:tracking-[0.18em] text-[#9A6428]">
              Devotee Name
            </label>
            <input
              placeholder="Someone"
              onChange={(e) => setReceipt({ ...receipt, name: e.target.value })}
              value={receipt.name}
              className="w-full rounded-xl sm:rounded-2xl border border-[#EEDCC2] bg-[#FFFEFC] px-3.5 py-2.5 sm:px-5 sm:py-3.5 text-sm sm:text-base text-[#3D220F] placeholder:text-[#C5A88B] transition-all duration-200 outline-none focus:border-[#D98A21] focus:ring-4 focus:ring-[#FCEFD8]"
            />
          </div>

          <div className="min-w-0">
            <label className="mb-1.5 sm:mb-2 block text-[10px] sm:text-xs font-semibold uppercase tracking-[0.14em] sm:tracking-[0.18em] text-[#9A6428]">
              Nakshatram
            </label>
            <input
              placeholder="Rohini"
              onChange={(e) => setReceipt({ ...receipt, nakshatram: e.target.value })}
              value={receipt.nakshatram}
              className="w-full rounded-xl sm:rounded-2xl border border-[#EEDCC2] bg-[#FFFEFC] px-3.5 py-2.5 sm:px-5 sm:py-3.5 text-sm sm:text-base text-[#3D220F] placeholder:text-[#C5A88B] transition-all duration-200 outline-none focus:border-[#D98A21] focus:ring-4 focus:ring-[#FCEFD8]"
            />
          </div>

          <div className="min-w-0 sm:col-span-2">
            <label className="mb-1.5 sm:mb-2 block text-[10px] sm:text-xs font-semibold uppercase tracking-[0.14em] sm:tracking-[0.18em] text-[#9A6428]">
              Pooja / Seva
            </label>

            <div className="relative">
              <Select
                value={receipt.pooja}
                onValueChange={(value) => {
                  const selected = allPooja.find((p) => p.name === value)
                  setReceipt({
                    ...receipt,
                    pooja: selected.name,
                    amount: selected.price,
                  });
                }}
              >
                <SelectTrigger type='pooja' className="w-full h-11 sm:h-14 rounded-xl sm:rounded-2xl border border-[#E8D7BC] bg-[#FFFCF8] px-3.5 sm:px-5 text-sm sm:text-base text-[#4A2108]">
                  <SelectValue placeholder="Select Pooja" />
                </SelectTrigger>

                <SelectContent>
                  {allPooja.map((pooja) => (
                    <SelectItem key={pooja._id} value={pooja.name}>
                      <div className="flex w-full min-w-0 items-center justify-between gap-3">
                        <span className="truncate">{pooja.name}</span>
                        <span className="shrink-0 font-medium text-[#D8891E]">
                          ₹{pooja.price}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

        </div>

        {/* payment */}
        <div className="mt-6 sm:mt-12 mb-5 sm:mb-8 flex items-center gap-2.5 sm:gap-4">
          <div className="h-6 sm:h-7 w-1 shrink-0 rounded-full bg-linear-to-b from-[#D8891E] to-[#F3A43A]" />
          <div className="min-w-0">
            <h2 className="font-gelasio text-[15px] sm:text-lg font-semibold text-[#542D12] truncate">
              Payment Details
            </h2>
          </div>
          <div className="ml-1 sm:ml-4 h-px flex-1 bg-[#F2E3CF]" />
        </div>

        <div className="grid grid-cols-1">

          <div className="min-w-0">
            <label className="mb-1.5 sm:mb-2 block text-[10px] sm:text-xs font-semibold uppercase tracking-[0.14em] sm:tracking-[0.18em] text-[#9A6428]">
              Amount
            </label>

            <input
              placeholder="₹ 0.00" readOnly
              value={receipt.amount ? `₹ ${receipt.amount}` : "---"}
              className="w-full rounded-xl sm:rounded-2xl border border-[#EEDCC2] bg-[#FFFEFC] px-3.5 py-2.5 sm:px-5 sm:py-3.5 text-sm sm:text-base text-[#3D220F] placeholder:text-[#C5A88B] transition-all duration-200 outline-none focus:border-[#D98A21] focus:ring-4 focus:ring-[#FCEFD8]"
            />
          </div>
        </div>

      </section>
    </form >
  );
}

export default ReceiptForm;