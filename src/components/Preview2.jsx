import { Printer, ReceiptText } from "lucide-react";
import { useState } from "react";
import receiptBG from "../assets/image/receipt-bg.png";

function ReceiptPreview({ isEditing, setIsEditing, setShowQueue, receipt, setReceipt, receiptQueue, setReceiptQueue, setSelectedReceipt, onPrint }) {
  const [isPrinting, setPrinting] = useState(false);

  const addReceipt = () => {
    // Validation
    if (
      !receipt.receiptNumber.trim() ||
      !receipt.date ||
      !receipt.name.trim() ||
      !receipt.nakshatram.trim() ||
      !receipt.pooja.trim() ||
      !receipt.amount
    ) {
      alert("Please fill in all receipt details before continuing.");
      return;
    }

    if (isEditing) {
      // Prevent duplicate receipt number (ignore current receipt)
      const duplicate = receiptQueue.some(
        (item) =>
          item.receiptNumber === receipt.receiptNumber &&
          item.id !== receipt.id
      );

      if (duplicate) {
        alert("Another receipt already has this receipt number.");
        return;
      }

      // Update receipt
      setReceiptQueue((prev) =>
        prev.map((item) =>
          item.id === receipt.id
            ? {
              ...item,
              ...receipt,
            }
            : item
        )
      );

      setSelectedReceipt(receipt);
      setIsEditing(false);

      setReceipt({
        receiptNumber: "",
        date: "",
        name: "",
        nakshatram: "",
        pooja: "",
        amount: "",
        paymentType: "",
      });

      return;
    }

    // Add new receipt

    const exists = receiptQueue.some(
      (item) => item.receiptNumber === receipt.receiptNumber
    );

    if (exists) {
      alert("This receipt has already been added to the queue.");
      return;
    }

    const newReceipt = {
      ...receipt,
      id: Date.now(),
    };

    setReceiptQueue((prev) => [...prev, newReceipt]);
    setSelectedReceipt(newReceipt);

    setReceipt({
      receiptNumber: "",
      date: "",
      name: "",
      nakshatram: "",
      pooja: "",
      amount: "",
      paymentType: "",
    });
  };

  const receiptRows = [
    ["Receipt No", receipt.receiptNumber || "---"],
    [
      "Date",
      receipt.date
        ? new Date(receipt.date).toLocaleDateString("en-GB")
        : "---",
    ],
    ["Devotee", receipt.name || "---"],
    ["Nakshatra", receipt.nakshatram || "---"],
    ["Pooja / Seva", receipt.pooja || "---"],
    ["Payment", receipt.paymentType || "---"],
  ];

  return (
    <div className="static md:sticky md:top-20 w-full">

      <div
        className="relative mx-auto w-full max-w-120 overflow-hidden rounded-lg border border-[#D8BE93] bg-[#FFFDF8] shadow-lg"
        style={{
          minHeight: "260px",
        }}
      >
        {/* Watermark */}
        <img
          src={receiptBG}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-[0.5] pointer-events-none select-none"
        />

        {/* Paper Overlay */}
        <div className="absolute inset-0 bg-[#FFFDF8]/95" />

        {/* Content */}
        <div className="relative z-10 p-3.5 sm:p-5">

          {/* Temple Header */}
          <div className="text-center">

            <div className="text-lg sm:text-xl text-[#8B5E2A]">
              🕉
            </div>

            <h1 className="mt-1 font-gelasio text-base sm:text-lg font-bold tracking-wide text-[#4A2108] uppercase">
              Sri Narasimhaswami
            </h1>

            <p className="mt-0.5 text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#A4743A]">
              Temple Trust
            </p>

            <div className="mx-auto mt-2.5 sm:mt-3 h-px w-24 sm:w-32 bg-[#C8A26B]" />

            <div className="mt-1.5 flex items-center justify-center gap-2">

              <div className="h-px w-7 sm:w-10 bg-[#D5BA92]" />

              <span className="font-gelasio text-[9px] sm:text-[10px] uppercase tracking-[0.28em] sm:tracking-[0.35em] text-[#9A6B33]">
                Official Receipt
              </span>

              <div className="h-px w-7 sm:w-10 bg-[#D5BA92]" />

            </div>

          </div>

          {/* Receipt Number Strip */}

          <div className="mt-3.5 sm:mt-4 border-y border-[#D8BE93] py-2">

            <div className="flex items-center justify-between gap-3">

              <div className="min-w-0">

                <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.22em] sm:tracking-[0.3em] text-[#A77A4D]">
                  Receipt Number
                </p>

                <p className="mt-0.5 truncate text-xs sm:text-sm font-semibold text-[#3D220F]">
                  {receipt.receiptNumber || "---"}
                </p>

              </div>

              <div className="shrink-0 text-right">

                <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.22em] sm:tracking-[0.3em] text-[#A77A4D]">
                  Date
                </p>

                <p className="mt-0.5 text-xs sm:text-sm font-semibold text-[#3D220F]">
                  {receipt.date
                    ? new Date(receipt.date).toLocaleDateString("en-GB")
                    : "---"}
                </p>

              </div>

            </div>

          </div>
          {/* Receipt Details */}

          <div className="mt-3.5 sm:mt-4">

            <table className="w-full table-fixed border-collapse">

              <tbody>

                {receiptRows.map(([label, value], index) => (

                  <tr
                    key={label}
                    className={`border-b border-[#E8D8BE] ${index === receiptRows.length - 1
                      ? "border-b-0"
                      : ""
                      }`}
                  >

                    <td className="w-24 sm:w-32 py-1.5 pr-1.5 sm:pr-2 align-top">

                      <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest sm:tracking-[0.15em] text-[#8B5E2A]">
                        {label}
                      </span>

                    </td>

                    <td className="w-2.5 sm:w-3 py-1.5 text-[9px] sm:text-[10px] text-[#8B5E2A]">
                      :
                    </td>

                    <td className="py-1.5">

                      <span className="wrap-break-word text-[11px] sm:text-xs font-medium text-[#3D220F]">
                        {value}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {/* Total */}

          <div className="mt-3.5 sm:mt-4">

            <div className="border-y-2 border-[#A7743A] py-2 sm:py-2.5">

              <div className="flex items-center justify-between gap-3">

                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#8B5E2A]">
                  Total Amount
                </span>

                <span className="shrink-0 text-base sm:text-lg font-bold text-[#3D220F]">
                  ₹ {receipt.amount || "---"}
                </span>

              </div>

            </div>

          </div>

          {/* Footer */}

          <div className="mt-4 sm:mt-5 grid grid-cols-3 gap-2.5 sm:gap-4">

            <div className="text-center">

              <div className="h-7 sm:h-8 border-b border-[#B88C53]" />

              <p className="mt-1 text-[8px] sm:text-[9px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#8B5E2A]">
                Cashier
              </p>

            </div>

            <div className="flex items-center justify-center">

              <div className="flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-full border-2 border-dashed border-[#C9A36B]">

                <span className="text-center text-[6px] sm:text-[7px] uppercase tracking-widest sm:tracking-[0.15em] text-[#A77A4D] leading-3">
                  Temple
                  <br />
                  Seal
                </span>

              </div>

            </div>

            <div className="text-center">

              <div className="h-7 sm:h-8 border-b border-[#B88C53]" />

              <p className="mt-1 text-[8px] sm:text-[9px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#8B5E2A]">
                Authorized
              </p>

            </div>

          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-120 flex-col gap-2.5 px-1 sm:px-6 mt-3.5 sm:mt-4 sm:flex-row sm:justify-center sm:gap-4">
        {receiptQueue.length > 0 && (
          <button
            onClick={() => setShowQueue(true)}
            className="w-full sm:w-auto rounded-xl bg-[#D88718] px-4 py-2.5 sm:py-2 text-sm text-white"
          >
            View Receipts
          </button>
        )}
        {isEditing ?
          <button
            onClick={addReceipt}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-green-600 py-3 sm:py-3.5 text-sm font-semibold text-white"
          >
            <ReceiptText size={18} />
            Update Receipt
          </button>
          :
          <button
            onClick={addReceipt}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-green-600 py-3 sm:py-3.5 text-sm font-semibold text-white"
          >
            <ReceiptText size={18} />
            Add Receipt
          </button>
        }

      </div>

    </div>
  );
}

export default ReceiptPreview;