import React, { useEffect, useState } from "react";
import {
    Search,
    ReceiptText,
    Trash2,
    SquarePen,
    CircleCheck,
    Clock3,
    IndianRupee,
} from "lucide-react";

import {
    getAllPaymentsAPI,
    deletePaymentAPI,
} from "../../../services/allAPI";

function PaymentList() {

    const [payments, setPayments] = useState([]);
    const [search, setSearch] = useState("");

    const getAllPayments = async () => {

        try {

            const result = await getAllPaymentsAPI();

            if (result.status === 200) {
                setPayments(result.data);
            }

        } catch (err) {
            console.log(err);
        }

    };

    useEffect(() => {
        getAllPayments();
    }, []);

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this payment?")) return;

        try {

            const result = await deletePaymentAPI(id);

            if (result.status === 200) {
                getAllPayments();
            }

        } catch (err) {
            console.log(err);
        }

    };

    const filteredPayments = payments.filter((payment) =>

        payment.orderId.toLowerCase().includes(search.toLowerCase()) ||

        payment.receiptNumber.toLowerCase().includes(search.toLowerCase()) ||

        payment.paymentMethod.toLowerCase().includes(search.toLowerCase()) ||

        payment.status.toLowerCase().includes(search.toLowerCase())

    );

    return (

        <div className="space-y-6">

            {/* Header */}

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <div className="relative w-full md:max-w-md">

                    <Search
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A77B4A]"
                    />

                    <input
                        type="text"
                        placeholder="Search payments..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-xl border border-[#E5D2B2] bg-white py-3 pl-11 pr-4 outline-none focus:border-[#D88718]"
                    />

                </div>

            </div>

            {/* Desktop Table */}

            <div className="hidden overflow-hidden rounded-2xl border border-[#E7D4B4] bg-white shadow-sm md:block">

                <div className="overflow-x-auto">

                    <table className="min-w-full">

                        <thead className="bg-[#FFF4E6]">

                            <tr>

                                <th className="px-6 py-4 text-left text-sm font-semibold text-[#7A4A1A]">
                                    Order ID
                                </th>

                                <th className="px-6 py-4 text-left text-sm font-semibold text-[#7A4A1A]">
                                    Receipt
                                </th>

                                <th className="px-6 py-4 text-right text-sm font-semibold text-[#7A4A1A]">
                                    Amount
                                </th>

                                <th className="px-6 py-4 text-center text-sm font-semibold text-[#7A4A1A]">
                                    Method
                                </th>

                                <th className="px-6 py-4 text-center text-sm font-semibold text-[#7A4A1A]">
                                    Status
                                </th>

                                <th className="px-6 py-4 text-center text-sm font-semibold text-[#7A4A1A]">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                filteredPayments.length > 0 ?

                                    filteredPayments.map((payment) => (

                                        <tr
                                            key={payment._id}
                                            className="border-t border-[#F2E3CB] hover:bg-[#FFFDF9]"
                                        >

                                            <td className="px-6 py-5 font-semibold">
                                                {payment.orderId}
                                            </td>

                                            <td className="px-6 py-5">
                                                {payment.receiptNumber}
                                            </td>

                                            <td className="px-6 py-5 text-right font-semibold">

                                                ₹ {payment.amount}

                                            </td>

                                            <td className="px-6 py-5 text-center">

                                                {payment.paymentType}

                                            </td>

                                            <td className="px-6 py-5 text-center">

                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${payment.status === "SUCCESS"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                        }`}
                                                >
                                                    {payment.status}
                                                </span>

                                            </td>

                                            <td className="px-6 py-5">

                                                <div className="flex justify-center gap-2">

                                                    <button
                                                        onClick={() => handleDelete(payment._id)}
                                                        className="rounded-lg border border-red-200 bg-red-50 p-2 hover:bg-red-100"
                                                    >
                                                        <Trash2
                                                            size={18}
                                                            className="text-red-600"
                                                        />
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))

                                    :

                                    <tr>

                                        <td
                                            colSpan={6}
                                            className="py-16"
                                        >

                                            <div className="flex flex-col items-center gap-3">

                                                <div className="rounded-full bg-[#FFF3E2] p-5">

                                                    <ReceiptText
                                                        size={42}
                                                        className="text-[#D88718]"
                                                    />

                                                </div>

                                                <h3 className="text-xl font-semibold text-[#4A2108]">

                                                    No Payments Found

                                                </h3>

                                            </div>

                                        </td>

                                    </tr>

                            }

                        </tbody>

                    </table>

                </div>

            </div>

            {/* Mobile */}

            <div className="space-y-3 md:hidden">

                {

                    filteredPayments.map((payment) => (

                        <div
                            key={payment._id}
                            className="rounded-xl border border-[#E7D4B4] bg-white p-4 shadow-sm"
                        >

                            <div className="flex items-center justify-between">

                                <h3 className="font-bold text-[#4A2108]">

                                    {payment.orderId}

                                </h3>

                                {

                                    payment.status === "SUCCESS"

                                        ?

                                        <CircleCheck
                                            className="text-green-600"
                                            size={20}
                                        />

                                        :

                                        <Clock3
                                            className="text-yellow-600"
                                            size={20}
                                        />

                                }

                            </div>

                            <p className="mt-2 text-sm text-gray-500">

                                Receipt : {payment.receiptNumber}

                            </p>

                            <div className="mt-3 flex items-center justify-between">

                                <span className="flex items-center gap-1 font-semibold">

                                    <IndianRupee size={16} />

                                    {payment.amount}

                                </span>

                                <span>

                                    {payment.paymentMethod}

                                </span>

                            </div>

                            <button
                                onClick={() => handleDelete(payment._id)}
                                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 py-2 text-red-600"
                            >

                                <Trash2 size={16} />

                                Delete

                            </button>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default PaymentList;