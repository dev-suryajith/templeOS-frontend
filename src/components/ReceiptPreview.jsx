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

    setReceipt({
      receiptNumber: "",
      date: "",
      name: "",
      nakshatram: "",
      pooja: "",
      amount: "",
      paymentType: ""
    });
  };

  return (
    <div ref={receiptRef} style={{
      backgroundImage: `url(${receiptBG})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }} className="sticky top-24 rounded-3xl border border-[#EEDBC1] bg-white p-6 shadow-[0_12px_35px_rgba(0,0,0,0.05)]">

      {/* Temple */}
      <div className="text-center">

        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FFE7C3] text-2xl">
          🕉
        </div>

        <h2 className="mt-3 font-gelasio text-lg font-semibold text-[#4A2108]">
          SRI NARASIMHASWAMI
        </h2>

        <p className="text-sm text-[#A77A4D]">
          Temple Trust
        </p>

      </div>

      <div className="my-6 border-t border-dashed border-[#EDD6B3]" />

      {/* Details */}

      <div className="rounded-2xl bg-[#FFFBF6]/25 p-4">

        <div className="space-y-3 text-sm">

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
              className="flex items-center justify-between"
            >
              <span className="text-[#A77A4D]">
                {label}
              </span>

              <span className="font-medium text-[#3D220F]">
                {value}
              </span>
            </div>
          ))}

        </div>

      </div>

      {/* Total */}

      <div className="my-4 bg-[#FFFBF6] flex items-center justify-between rounded-2xl  px-5 py-4">
        <span className="text- font-semibold uppercase tracking-[0.18em] text-[#A77A4D]">
          TOTAL AMOUNT
        </span>

        <span className="text-lg font-semibold uppercase tracking-widest text-[#3D220F]">
          ₹ {receipt.amount || '---'}
        </span>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-4">
        {!isPrinting && (
          <>
            <button
              onClick={handlePrint}
              className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-[#D88718] to-[#F1A13A] py-3.5 text-sm font-semibold text-white"
            >
              <Printer size={18} />
              Print Receipt
            </button>

            <button
              onClick={addReceipt}
              className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-green-600 py-3.5 text-sm font-semibold text-white"
            >
              <ReceiptText size={18} />
              Add Receipt
            </button>
          </>
        )}
      </div>
    </div >
  );
}

export default ReceiptPreview;