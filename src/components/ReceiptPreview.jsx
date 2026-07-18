import { Printer, Download, ReceiptText } from "lucide-react";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import receiptBG from '../assets/image/receipt-bg.png'

function ReceiptPreview({ receipt, setReceiptQueue, setSelectedReceipt }) {
  const [isPrinting, setPrinting] = useState(false)

  const receiptRef = useRef()
  const setPrint = useReactToPrint({ contentRef: receiptRef, });
  const handlePrint = () => {
    setPrinting(true)
    setTimeout(() => {
      setPrint()
      setPrinting(false);
    }, [500])
  }

  const addReceipt = () => {
    setReceiptQueue(prev => [...prev, receipt]);
    setSelectedReceipt(receipt);
  };

  return (
    <div ref={receiptRef} style={{
      backgroundImage: `url(${receiptBG})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }} className="static md:sticky md:top-24 w-full max-w-full rounded-2xl sm:rounded-3xl border border-[#EEDBC1] bg-white p-4 sm:p-6 md:p-8 shadow-[0_12px_35px_rgba(0,0,0,0.05)]">

      {/* Temple */}
      <div className="text-center">

        <div className="mx-auto flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#FFE7C3] text-xl sm:text-2xl">
          🕉
        </div>

        <h2 className="mt-2.5 sm:mt-3 font-gelasio text-base sm:text-lg font-semibold text-[#4A2108]">
          SRI NARASIMHASWAMI
        </h2>

        <p className="text-xs sm:text-sm text-[#A77A4D]">
          Temple Trust
        </p>

      </div>

      <div className="my-4 sm:my-6 border-t border-dashed border-[#EDD6B3]" />

      {/* Details */}

      <div className="rounded-xl sm:rounded-2xl bg-[#FFFBF6]/25 p-3.5 sm:p-4">

        <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm">

          {[
            ["Receipt", `${receipt.receiptNumber || "---"}`],
            ["Date", receipt.date ? new Date(receipt.date).toLocaleDateString("en-GB") : "---",],
            ["Devotee", `${receipt.name || "---"}`],
            ["Nakshatra", `${receipt.nakshatram || "---"}`],
            ["Pooja", `${receipt.pooja || "---"}`],
            ["Payment", `${receipt.paymentType || "---"}`],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex items-start justify-between gap-3"
            >
              <span className="shrink-0 text-[#A77A4D]">
                {label}
              </span>

              <span className="min-w-0 wrap-break-word text-right font-medium text-[#3D220F]">
                {value}
              </span>
            </div>
          ))}

        </div>

      </div>

      {/* Total */}

      <div className="my-3.5 sm:my-4 flex items-center justify-between gap-3 rounded-xl sm:rounded-2xl bg-[#FFFBF6] px-4 py-3 sm:px-5 sm:py-4">
        <span className="text-[11px] sm:text-sm font-semibold uppercase tracking-widest sm:tracking-[0.18em] text-[#A77A4D]">
          TOTAL AMOUNT
        </span>

        <span className="shrink-0 text-base sm:text-lg font-semibold uppercase tracking-wide sm:tracking-widest text-[#3D220F]">
          ₹ {receipt.amount || '---'}
        </span>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:gap-3">
        {!isPrinting && (
          <>
            <button
              onClick={handlePrint}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl sm:rounded-2xl bg-linear-to-r from-[#D88718] to-[#F1A13A] py-3 sm:py-3.5 text-xs sm:text-sm font-semibold text-white"
            >
              <Printer size={16} className="shrink-0 sm:hidden" />
              <Printer size={18} className="hidden shrink-0 sm:block" />
              Print Receipt
            </button>

            <button
              onClick={addReceipt}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl sm:rounded-2xl bg-green-600 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold text-white"
            >
              <ReceiptText size={16} className="shrink-0 sm:hidden" />
              <ReceiptText size={18} className="hidden shrink-0 sm:block" />
              Add Receipt
            </button>
          </>
        )}
      </div>
    </div >
  );
}

export default ReceiptPreview;