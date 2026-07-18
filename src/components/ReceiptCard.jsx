import { Printer, ReceiptText } from "lucide-react";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import receiptBG from "../assets/image/receipt-bg.png";

function ReceiptCard({ receipt }) {
    const [isPrinting, setPrinting] = useState(false);

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
        <div className="sticky top-20">

            <div
                className="relative overflow-hidden rounded-lg border border-[#D8BE93] bg-[#FFFDF8] shadow-lg"
                style={{
                    width: "480px",
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
                <div className="relative z-10 p-5">

                    {/* Temple Header */}
                    <div className="text-center">

                        <div className="text-xl text-[#8B5E2A]">
                            🕉
                        </div>

                        <h1 className="mt-1 font-gelasio text-lg font-bold tracking-wide text-[#4A2108] uppercase">
                            Sri Narasimhaswami
                        </h1>

                        <p className="mt-0.5 text-[10px] tracking-[0.3em] uppercase text-[#A4743A]">
                            Temple Trust
                        </p>

                        <div className="mx-auto mt-3 h-px w-32 bg-[#C8A26B]" />

                        <div className="mt-1.5 flex items-center justify-center gap-2">

                            <div className="h-px w-10 bg-[#D5BA92]" />

                            <span className="font-gelasio text-[10px] uppercase tracking-[0.35em] text-[#9A6B33]">
                                Official Receipt
                            </span>

                            <div className="h-px w-10 bg-[#D5BA92]" />

                        </div>

                    </div>

                    {/* Receipt Number Strip */}

                    <div className="mt-4 border-y border-[#D8BE93] py-2">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-[9px] uppercase tracking-[0.3em] text-[#A77A4D]">
                                    Receipt Number
                                </p>

                                <p className="mt-0.5 text-sm font-semibold text-[#3D220F]">
                                    {receipt.receiptNumber || "---"}
                                </p>

                            </div>

                            <div className="text-right">

                                <p className="text-[9px] uppercase tracking-[0.3em] text-[#A77A4D]">
                                    Date
                                </p>

                                <p className="mt-0.5 text-sm font-semibold text-[#3D220F]">
                                    {receipt.date
                                        ? new Date(receipt.date).toLocaleDateString("en-GB")
                                        : "---"}
                                </p>

                            </div>

                        </div>

                    </div>
                    {/* Receipt Details */}

                    <div className="mt-4">

                        <table className="w-full border-collapse">

                            <tbody>

                                {receiptRows.map(([label, value], index) => (

                                    <tr
                                        key={label}
                                        className={`border-b border-[#E8D8BE] ${index === receiptRows.length - 1
                                            ? "border-b-0"
                                            : ""
                                            }`}
                                    >

                                        <td className="w-32 py-1.5 pr-2 align-top">

                                            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#8B5E2A]">
                                                {label}
                                            </span>

                                        </td>

                                        <td className="w-3 py-1.5 text-[10px] text-[#8B5E2A]">
                                            :
                                        </td>

                                        <td className="py-1.5">

                                            <span className="text-xs font-medium text-[#3D220F]">
                                                {value}
                                            </span>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                    {/* Total */}

                    <div className="mt-4">

                        <div className="border-y-2 border-[#A7743A] py-2.5">

                            <div className="flex items-center justify-between">

                                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8B5E2A]">
                                    Total Amount
                                </span>

                                <span className="text-lg font-bold text-[#3D220F]">
                                    ₹ {receipt.amount || "---"}
                                </span>

                            </div>

                        </div>

                    </div>

                    {/* Footer */}

                    <div className="mt-5 grid grid-cols-3 gap-4">

                        <div className="text-center">

                            <div className="h-8 border-b border-[#B88C53]" />

                            <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-[#8B5E2A]">
                                Cashier
                            </p>

                        </div>

                        <div className="flex items-center justify-center">

                            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-dashed border-[#C9A36B]">

                                <span className="text-center text-[7px] uppercase tracking-[0.15em] text-[#A77A4D] leading-3">
                                    Temple
                                    <br />
                                    Seal
                                </span>

                            </div>

                        </div>

                        <div className="text-center">

                            <div className="h-8 border-b border-[#B88C53]" />

                            <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-[#8B5E2A]">
                                Authorized
                            </p>

                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}

export default ReceiptCard;