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
    <form className="space-y-6">

      {/* Receipt Details */}
      <section className="rounded-3xl border border-[#EEDBC1] bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.05)]">

        {/* heading */}
        <div className="mb-8 flex items-center gap-4">
          <div className="h-7 w-1 rounded-full bg-linear-to-b from-[#D8891E] to-[#F3A43A]" />
          <div>
            <h2 className="font-gelasio text-lg font-semibold text-[#542D12]">
              Receipt Details
            </h2>
          </div>
          <div className="ml-4 h-px flex-1 bg-[#F2E3CF]" />
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#9A6428]">
              Receipt Number
            </label>
            <input
              type="text"
              value={receipt.receiptNumber}
              readOnly
              className=" w-full rounded-2xl border border-[#EEDCC2] bg-[#FFFEFC] px-5 py-3.5 text-[#3D220F] placeholder:text-[#C5A88B] transition-all duration-200 outline-none focus:border-[#D98A21] focus:ring-4 focus:ring-[#FCEFD8] "
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#9A6428]">
              Date
            </label>
            <input
              type="date"
              onChange={(e) => setReceipt({ ...receipt, date: e.target.value })}
              value={receipt.date}
              className=" w-full rounded-2xl border border-[#EEDCC2] bg-[#FFFEFC] px-5 py-3.5 text-[#3D220F] placeholder:text-[#C5A88B] transition-all duration-200 outline-none focus:border-[#D98A21] focus:ring-4 focus:ring-[#FCEFD8] "
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#9A6428]">
              Devotee Name
            </label>
            <input
              placeholder="Someone"
              onChange={(e) => setReceipt({ ...receipt, name: e.target.value })}
              value={receipt.name}
              className=" w-full rounded-2xl border border-[#EEDCC2] bg-[#FFFEFC] px-5 py-3.5 text-[#3D220F] placeholder:text-[#C5A88B] transition-all duration-200 outline-none focus:border-[#D98A21] focus:ring-4 focus:ring-[#FCEFD8] "
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#9A6428]">
              Nakshatram
            </label>
            <input
              placeholder="Rohini"
              onChange={(e) => setReceipt({ ...receipt, nakshatram: e.target.value })}
              value={receipt.nakshatram}
              className=" w-full rounded-2xl border border-[#EEDCC2] bg-[#FFFEFC] px-5 py-3.5 text-[#3D220F] placeholder:text-[#C5A88B] transition-all duration-200 outline-none focus:border-[#D98A21] focus:ring-4 focus:ring-[#FCEFD8] "
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#9A6428]">
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
                <SelectTrigger type='pooja' className="w-full h-14 rounded-2xl border border-[#E8D7BC] bg-[#FFFCF8] px-5 text-[#4A2108]">
                  <SelectValue placeholder="Select Pooja" />
                </SelectTrigger>

                <SelectContent>
                  {allPooja.map((pooja) => (
                    <SelectItem key={pooja._id} value={pooja.name}>
                      <div className="flex w-full justify-between items-center">
                        <span>{pooja.name}</span>
                        <span className="text-[#D8891E] font-medium ml-4">
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
        <div className="mt-12 mb-8 flex items-center gap-4">
          <div className="h-7 w-1 rounded-full bg-linear-to-b from-[#D8891E] to-[#F3A43A]" />
          <div>
            <h2 className="font-gelasio text-lg font-semibold text-[#542D12]">
              Payment Details
            </h2>
          </div>
          <div className="ml-4 h-px flex-1 bg-[#F2E3CF]" />
        </div>

        <div className="grid grid-cols-1">

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#9A6428]">
              Amount
            </label>

            <input
              placeholder="₹ 0.00" readOnly
              value={receipt.amount ? `₹ ${receipt.amount}` : "---"}
              className=" w-full rounded-2xl border border-[#EEDCC2] bg-[#FFFEFC] px-5 py-3.5 text-[#3D220F] placeholder:text-[#C5A88B] transition-all duration-200 outline-none focus:border-[#D98A21] focus:ring-4 focus:ring-[#FCEFD8] "
            />
          </div>
        </div>

      </section>
    </form >
  );
}

export default ReceiptForm;