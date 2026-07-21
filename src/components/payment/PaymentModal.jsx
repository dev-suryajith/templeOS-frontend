import React, { useEffect, useState } from "react";
import { CheckCircle2, Loader2, X } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { verifyPaymentAPI } from "../../../services/allAPI";

function PaymentModal({
    open,
    onClose,
    amount,
    orderId,
    qrData,
    receiptCount,
    onSuccess,
    paymentType
}) {
    const [status, setStatus] = useState("PENDING");

    useEffect(() => {
        if (!open) return;

        // Cash payment doesn't need verification
        if (paymentType === "Cash") {
            setStatus("SUCCESS");

            const timer = setTimeout(() => {
                onSuccess();
            }, 1200);

            return () => clearTimeout(timer);
        }

        if (!orderId) return;

        const interval = setInterval(async () => {
            try {
                const res = await verifyPaymentAPI({ orderId });

                if (res.data.status === "SUCCESS") {
                    setStatus("SUCCESS");
                    clearInterval(interval);

                    setTimeout(() => {
                        onSuccess(res.data.transactionId);
                    }, 1200);
                }
            } catch (err) {
                console.error(err);
            }
        }, 2000);

        return () => clearInterval(interval);
    }, [open, orderId, paymentType]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/60 backdrop-blur-sm">

            <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">

                {/* Header */}
                <div className="bg-linear-to-r from-[#D88718] to-[#F3A43A] px-6 py-5 text-white">

                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 rounded-lg p-2 transition hover:bg-white/20"
                    >
                        <X size={18} />
                    </button>

                    <h2 className="text-2xl font-bold">
                        TempleOS Payments
                    </h2>

                    <p className="text-sm opacity-90">
                        {paymentType === "UPI"
                            ? "Secure UPI Payment"
                            : "Cash Collection"}
                    </p>

                </div>

                <div className="p-8">

                    {/* Amount */}
                    <div className="text-center">

                        <p className="text-sm text-gray-500">
                            Total Amount
                        </p>

                        <h1 className="mt-1 text-5xl font-bold text-[#4A2108]">
                            ₹{amount}
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            {receiptCount} Receipt(s)
                        </p>

                    </div>

                    {/* Payment Content */}
                    {paymentType === "UPI" ? (

                        <div className="mt-8 flex justify-center">

                            <div className="rounded-2xl border bg-white p-4 shadow">

                                <QRCodeCanvas
                                    value={qrData}
                                    size={220}
                                    includeMargin
                                />

                            </div>

                        </div>

                    ) : (

                        <div className="mt-8 rounded-2xl border border-[#EEDBC1] bg-[#FFF8EE] p-6 text-center">

                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">

                                <CheckCircle2
                                    className="text-green-600"
                                    size={40}
                                />

                            </div>

                            <h3 className="mt-5 text-2xl font-semibold text-[#4A2108]">
                                Cash Payment
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">
                                Please collect the cash from the devotee before confirming.
                            </p>

                        </div>

                    )}

                    {/* Order Details */}
                    <div className="mt-5 rounded-xl bg-[#FFF8EE] p-4">

                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">
                                Order ID
                            </span>

                            <span className="font-semibold">
                                {orderId}
                            </span>
                        </div>

                        <div className="mt-2 flex justify-between text-sm">
                            <span className="text-gray-500">
                                Payment Method
                            </span>

                            <span className="font-semibold">
                                {paymentType}
                            </span>
                        </div>

                    </div>

                    {/* Status */}
                    <div className="mt-8">

                        {paymentType === "UPI" ? (

                            status === "PENDING" ? (

                                <div className="flex flex-col items-center">

                                    <Loader2
                                        className="animate-spin text-[#D88718]"
                                        size={40}
                                    />

                                    <h3 className="mt-4 text-lg font-semibold">
                                        Waiting for Payment...
                                    </h3>

                                    <p className="mt-2 text-sm text-gray-500">
                                        Verifying payment automatically
                                    </p>

                                </div>

                            ) : (

                                <div className="flex flex-col items-center">

                                    <CheckCircle2
                                        className="text-green-500"
                                        size={60}
                                    />

                                    <h3 className="mt-4 text-2xl font-bold text-green-600">
                                        Payment Successful
                                    </h3>

                                    <p className="mt-2 text-sm text-gray-500">
                                        Printing Receipt...
                                    </p>

                                </div>

                            )

                        ) : (

                            status === "PENDING" ? (

                                <button
                                    onClick={() => {
                                        setStatus("SUCCESS");

                                        setTimeout(() => {
                                            onSuccess();
                                        }, 1000);
                                    }}
                                    className="w-full rounded-xl bg-[#D88718] py-3 text-lg font-semibold text-white transition hover:bg-[#c67812]"
                                >
                                    Confirm Cash Received
                                </button>

                            ) : (

                                <div className="flex flex-col items-center">

                                    <CheckCircle2
                                        className="text-green-500"
                                        size={60}
                                    />

                                    <h3 className="mt-4 text-2xl font-bold text-green-600">
                                        Cash Received
                                    </h3>

                                    <p className="mt-2 text-sm text-gray-500">
                                        Printing Receipt...
                                    </p>

                                </div>

                            )

                        )}

                    </div>

                </div>

            </div>

        </div>
    );
}

export default PaymentModal;