import React from "react";

function ReceiptForm() {
  return (
    <form  className="space-y-6">

      {/* Receipt Details */}
      <section className="rounded-3xl border border-[#EEDBC1] bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
        <div className="mb-8 flex items-center gap-4">
          <div className="h-7 w-1 rounded-full bg-linear-to-b from-[#D8891E] to-[#F3A43A]" />

          <div>
            <h2 className="font-gelasio text-lg font-semibold text-[#542D12]">
              Receipt Details
            </h2>

            <p className="mt-1 text-sm text-[#A07C57]">
              Basic receipt information
            </p>
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
              value="RCP-2026-7514"
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
              className=" w-full rounded-2xl border border-[#EEDCC2] bg-[#FFFEFC] px-5 py-3.5 text-[#3D220F] placeholder:text-[#C5A88B] transition-all duration-200 outline-none focus:border-[#D98A21] focus:ring-4 focus:ring-[#FCEFD8] "
            />
          </div>

        </div>
      </section>

      {/* Devotee Information */}
      <section className="rounded-3xl border border-[#EEDBC1] bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.05)]">

        <div className="mb-6 flex items-center gap-4">
          <h2 className="whitespace-nowrap text-sm font-semibold uppercase tracking-[0.25em] text-[#c76b14]">
            Devotee Information
          </h2>
          <div className="h-px flex-1 bg-orange-200"></div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          <div className="md:col-span-2">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#9A6428]">
              Devotee Name
            </label>
            <input
              placeholder="Full name of devotee"
              className=" w-full rounded-2xl border border-[#EEDCC2] bg-[#FFFEFC] px-5 py-3.5 text-[#3D220F] placeholder:text-[#C5A88B] transition-all duration-200 outline-none focus:border-[#D98A21] focus:ring-4 focus:ring-[#FCEFD8] "
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#9A6428]">
              Mobile
            </label>
            <input
              placeholder="+91 9876543210"
              className=" w-full rounded-2xl border border-[#EEDCC2] bg-[#FFFEFC] px-5 py-3.5 text-[#3D220F] placeholder:text-[#C5A88B] transition-all duration-200 outline-none focus:border-[#D98A21] focus:ring-4 focus:ring-[#FCEFD8] "
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#9A6428]">
              Email
            </label>
            <input
              placeholder="devotee@email.com"
              className=" w-full rounded-2xl border border-[#EEDCC2] bg-[#FFFEFC] px-5 py-3.5 text-[#3D220F] placeholder:text-[#C5A88B] transition-all duration-200 outline-none focus:border-[#D98A21] focus:ring-4 focus:ring-[#FCEFD8] "
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#9A6428]">
              Gothram
            </label>
            <input
              placeholder="Kashyapa"
              className=" w-full rounded-2xl border border-[#EEDCC2] bg-[#FFFEFC] px-5 py-3.5 text-[#3D220F] placeholder:text-[#C5A88B] transition-all duration-200 outline-none focus:border-[#D98A21] focus:ring-4 focus:ring-[#FCEFD8] "
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#9A6428]">
              Nakshatram
            </label>
            <input
              placeholder="Rohini"
              className=" w-full rounded-2xl border border-[#EEDCC2] bg-[#FFFEFC] px-5 py-3.5 text-[#3D220F] placeholder:text-[#C5A88B] transition-all duration-200 outline-none focus:border-[#D98A21] focus:ring-4 focus:ring-[#FCEFD8] "
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#9A6428]">
              Address
            </label>
            <textarea
              rows={3}
              placeholder="Address..."
              className="w-full rounded-xl border border-orange-200 px-4 py-3 outline-none resize-none focus:border-orange-500"
            />
          </div>

        </div>

      </section>

      {/* Seva Details */}
      <section className="rounded-3xl border border-[#EEDBC1] bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.05)]">

        <div className="mb-6 flex items-center gap-4">
          <h2 className="whitespace-nowrap text-sm font-semibold uppercase tracking-[0.25em] text-[#c76b14]">
            Seva Details
          </h2>
          <div className="h-px flex-1 bg-orange-200"></div>
        </div>

        <div className="space-y-5">

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#9A6428]">
              Pooja / Seva
            </label>

            <select className="w-full rounded-xl border border-orange-200 px-4 py-3 outline-none focus:border-orange-500">
              <option>Select Pooja</option>
              <option>Archana</option>
              <option>Pushpanjali</option>
              <option>Palpayasam</option>
              <option>Neyvilakku</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#9A6428]">
              Seva Details
            </label>

            <input
              placeholder="Abhishekam for Lord..."
              className=" w-full rounded-2xl border border-[#EEDCC2] bg-[#FFFEFC] px-5 py-3.5 text-[#3D220F] placeholder:text-[#C5A88B] transition-all duration-200 outline-none focus:border-[#D98A21] focus:ring-4 focus:ring-[#FCEFD8] "
            />
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#9A6428]">
                Priest
              </label>

              <input
                placeholder="Archakar Name"
                className=" w-full rounded-2xl border border-[#EEDCC2] bg-[#FFFEFC] px-5 py-3.5 text-[#3D220F] placeholder:text-[#C5A88B] transition-all duration-200 outline-none focus:border-[#D98A21] focus:ring-4 focus:ring-[#FCEFD8] "
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#9A6428]">
                Remarks
              </label>

              <input
                placeholder="Special Notes"
                className=" w-full rounded-2xl border border-[#EEDCC2] bg-[#FFFEFC] px-5 py-3.5 text-[#3D220F] placeholder:text-[#C5A88B] transition-all duration-200 outline-none focus:border-[#D98A21] focus:ring-4 focus:ring-[#FCEFD8] "
              />
            </div>

          </div>

        </div>

      </section>

      {/* Payment */}
      <section className="rounded-3xl border border-[#EEDBC1] bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.05)]">

        <div className="mb-6 flex items-center gap-4">
          <h2 className="whitespace-nowrap text-sm font-semibold uppercase tracking-[0.25em] text-[#c76b14]">
            Payment Details
          </h2>
          <div className="h-px flex-1 bg-orange-200"></div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#9A6428]">
              Amount
            </label>

            <input
              placeholder="₹ 0.00"
              className=" w-full rounded-2xl border border-[#EEDCC2] bg-[#FFFEFC] px-5 py-3.5 text-[#3D220F] placeholder:text-[#C5A88B] transition-all duration-200 outline-none focus:border-[#D98A21] focus:ring-4 focus:ring-[#FCEFD8] "
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#9A6428]">
              Payment
            </label>

            <select className="w-full rounded-xl border border-orange-200 px-4 py-3 outline-none focus:border-orange-500">
              <option>Cash</option>
              <option>UPI</option>
              <option>Card</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#9A6428]">
              Reference
            </label>

            <input
              placeholder="Transaction ID"
              className=" w-full rounded-2xl border border-[#EEDCC2] bg-[#FFFEFC] px-5 py-3.5 text-[#3D220F] placeholder:text-[#C5A88B] transition-all duration-200 outline-none focus:border-[#D98A21] focus:ring-4 focus:ring-[#FCEFD8] "
            />
          </div>

        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {["₹51", "₹101", "₹151", "₹251", "₹501", "₹1001", "₹5001"].map((amt) => (
            <button
              key={amt}
              type="button"
              className="rounded-full border border-orange-200 px-4 py-2 text-sm hover:bg-orange-50"
            >
              {amt}
            </button>
          ))}
        </div>

      </section>

    </form>
  );
}

export default ReceiptForm;