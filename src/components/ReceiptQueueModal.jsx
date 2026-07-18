import { X, ReceiptText, Printer, Trash2, Pen, SquarePen } from "lucide-react";
import ReceiptCard from "./ReceiptCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { useState } from "react";

function ReceiptQueueModal({ open, onClose, onPrint, receipts, setReceiptQueue, setIsEditing, setReceipt }) {
    if (!open) return null;

    const [paymentMethod, setPaymentMethod] = useState("");

    const handleEdit = (receipt) => {
        setIsEditing(true)
        setReceipt(receipt)
        onClose()
    }
    const handleDelete = (receiptNumber) => {
        setReceiptQueue((prev) => prev.filter((receipt) => receipt.receiptNumber !== receiptNumber))
    }

    const handlePaymentMethod = (type) => {
        setPaymentMethod(type)

        setReceiptQueue((prev) => prev.map((receipt) => ({
            ...receipt,
            paymentType: type,
        }))
        )
    }

    const totalAmount = receipts.reduce(
        (total, receipt) => total + Number(receipt.amount),
        0
    )

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="w-full max-w-6xl rounded-3xl bg-white shadow-2xl overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#EEDBC1] px-6 py-5">
                    <div>
                        <h2 className="text-2xl font-semibold text-[#4A2108]">
                            Receipt Queue
                        </h2>

                        <p className="text-sm text-[#A77A4D]">
                            {`${receipts.length} Receipts Pending`}
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-xl p-2 hover:bg-gray-100"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* List */}
                <div className="max-h-125 overflow-y-auto p-6 space-y-4">

                    <div className="grid md:grid-cols-2 grid-cols-1" >
                        {receipts.map((receipt) => (

                            <div className="relative mb-6"
                                key={receipt.receiptNumber}>
                                <ReceiptCard
                                    key={receipt.receiptNumber}
                                    receipt={receipt}
                                />

                                <div className="absolute top-2 right-20 flex items-center gap-3">
                                    <button onClick={() => handleEdit(receipt)} className="rounded-xl bg-yellow-100 p-2 text-yellow-600 hover:bg-yellow-200">
                                        <SquarePen size={25} />
                                    </button>
                                    <button onClick={() => handleDelete(receipt.receiptNumber)} className="rounded-xl bg-red-100 p-2 text-red-600 hover:bg-red-200">
                                        <Trash2 size={25} />
                                    </button>
                                </div>
                            </div>

                        ))}
                    </div>

                </div>

                {/* Footer */}
                <div className="border-t border-[#EEDBC1] bg-linear-to-r from-[#FFF8EE] to-[#FFFDF9] px-6 py-4">

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                        {/* Summary */}
                        <div className="flex items-center gap-8">

                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9A6428]">
                                    Receipts
                                </p>

                                <p className="mt-1 text-2xl font-bold text-[#4A2108]">
                                    {receipts.length}
                                </p>
                            </div>

                            <div className="h-10 w-px bg-[#E8D7BC]" />

                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9A6428]">
                                    Total Amount
                                </p>

                                <p className="mt-1 text-3xl font-bold text-[#D88718]">
                                    ₹ {totalAmount}
                                </p>
                            </div>

                        </div>

                        {/* Actions */}
                        <div className="flex items-end gap-4">

                            <div className="w-56">

                                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9A6428]">
                                    Payment
                                </label>

                                <Select
                                    value={paymentMethod}
                                    onValueChange={(value) => handlePaymentMethod(value)}
                                >
                                    <SelectTrigger type='paymment' className="h-11 rounded-xl border border-[#E8D7BC] bg-white px-4 text-sm text-[#4A2108] shadow-sm">
                                        <SelectValue placeholder="Select Payment" />
                                    </SelectTrigger>

                                    <SelectContent className='mb-20'>
                                        <SelectItem value="Cash">Cash</SelectItem>
                                        <SelectItem value="UPI">UPI</SelectItem>
                                    </SelectContent>
                                </Select>

                            </div>

                            <button
                                disabled={!paymentMethod || receipts.length === 0}
                                onClick={() => onPrint(paymentMethod)}
                                className="h-11 px-7 rounded-xl bg-linear-to-r from-[#D88718] to-[#F1A13A] text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
                            >
                                <Printer size={18} />
                                Print Queue
                            </button>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default ReceiptQueueModal;