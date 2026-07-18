import React, { useEffect, useMemo, useState } from "react";
import { Search, ReceiptText, IndianRupee, Wallet, Filter, ArrowUpDown, CalendarDays, CreditCard, Smartphone, Download, ChevronLeft, ChevronRight, ArrowDown, DownloadIcon, Trash2, } from "lucide-react";
import { exportExcelAPI, getAllReceiptAPI } from "../../../services/allAPI";

function Receipts() {
    const [allReceipts, setAllReceipts] = useState([]);

    const [search, setSearch] = useState("");
    const [paymentFilter, setPaymentFilter] = useState("All");
    const [poojaFilter, setPoojaFilter] = useState("All");
    const [sortBy, setSortBy] = useState("Newest");

    const totalCollection = allReceipts.reduce(
        (sum, item) => sum + item.amount,
        0
    );

    const cashCollection = allReceipts
        .filter((r) => r.paymentType === "Cash")
        .reduce((sum, r) => sum + r.amount, 0);

    const upiCollection = allReceipts
        .filter((r) => r.paymentType === "UPI")
        .reduce((sum, r) => sum + r.amount, 0);

    const filteredReceipts = useMemo(() => {
        let data = [...allReceipts];

        if (search) {
            data = data.filter(
                (r) =>
                    r.receiptNumber
                        ?.toLowerCase()
                        .includes(search.toLowerCase()) ||

                    r.name
                        ?.toLowerCase()
                        .includes(search.toLowerCase()) ||

                    r.pooja
                        ?.toLowerCase()
                        .includes(search.toLowerCase())
            );
        }

        if (paymentFilter !== "All") {
            data = data.filter((r) => r.paymentType === paymentFilter);
        }

        if (poojaFilter !== "All") {
            data = data.filter((r) => r.pooja === poojaFilter);
        }

        switch (sortBy) {
            case "Amount High":
                data.sort((a, b) => b.amount - a.amount);
                break;

            case "Amount Low":
                data.sort((a, b) => a.amount - b.amount);
                break;

            case "Oldest":
                data.sort((a, b) => new Date(a.date) - new Date(b.date));
                break;

            default:
                data.sort((a, b) => new Date(b.date) - new Date(a.date));
        }

        return data;
    }, [allReceipts, search, paymentFilter, poojaFilter, sortBy,]);

    const getAllReceipts = async () => {
        try {
            const res = await getAllReceiptAPI();

            console.log(res.data);
            if (res.status === 200) {
                setAllReceipts(res.data);
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getAllReceipts()
    }, [])


    const handleExport = async () => {
        try {
            const response = await exportExcelAPI();
            console.log(response);
            console.log(response.data);
            console.log(response.data instanceof Blob);
            console.log(typeof response.data);

            const blob = response.data;

            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");

            link.href = url;
            link.download = "Temple_Receipts.xlsx";

            document.body.appendChild(link);
            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="space-y-6">

            {/* Statistics */}

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

                <div className="rounded-2xl border border-[#E7D4B4] bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-[#9A6428]">Total Receipts</p>

                            <h2 className="mt-2 text-3xl font-bold text-[#4A2108]">
                                {allReceipts.length}
                            </h2>
                        </div>

                        <div className="rounded-xl bg-[#FFF3E2] p-3">
                            <ReceiptText className="text-[#D88718]" />
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-[#E7D4B4] bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm text-[#9A6428]">Total Collection</p>

                            <h2 className="mt-2 text-3xl font-bold text-[#4A2108]">
                                ₹{totalCollection}
                            </h2>
                        </div>

                        <div className="rounded-xl bg-[#FFF3E2] p-3">
                            <IndianRupee className="text-[#D88718]" />
                        </div>

                    </div>
                </div>

                <div className="rounded-2xl border border-[#E7D4B4] bg-white p-5 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm text-[#9A6428]">
                                Cash Collection
                            </p>

                            <h2 className="mt-2 text-3xl font-bold text-[#4A2108]">
                                ₹{cashCollection}
                            </h2>

                        </div>

                        <div className="rounded-xl bg-[#FFF3E2] p-3">
                            <Wallet className="text-[#D88718]" />
                        </div>

                    </div>

                </div>

                <div className="rounded-2xl border border-[#E7D4B4] bg-white p-5 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm text-[#9A6428]">
                                UPI Collection
                            </p>

                            <h2 className="mt-2 text-3xl font-bold text-[#4A2108]">
                                ₹{upiCollection}
                            </h2>

                        </div>

                        <div className="rounded-xl bg-[#FFF3E2] p-3">
                            <Smartphone className="text-[#D88718]" />
                        </div>

                    </div>

                </div>

            </div>

            {/* Filters */}

            <div className="rounded-2xl border border-[#E7D4B4] bg-white p-5 shadow-sm">

                <div className="flex flex-wrap gap-4">

                    <div className="relative flex-1 min-w-62.5">

                        <Search
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A77B4A]"
                            size={18}
                        />

                        <input
                            type="text"
                            placeholder="Search receipt, devotee or pooja..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-xl border border-[#E5D2B2] bg-[#FFFDF8] py-3 pl-11 pr-4 outline-none focus:border-[#D88718]"
                        />

                    </div>

                    <select
                        value={paymentFilter}
                        onChange={(e) => setPaymentFilter(e.target.value)}
                        className="rounded-xl border border-[#E5D2B2] bg-[#FFFDF8] px-4"
                    >
                        <option>All</option>
                        <option>Cash</option>
                        <option>UPI</option>
                        <option>Card</option>
                    </select>

                    <select
                        value={poojaFilter}
                        onChange={(e) => setPoojaFilter(e.target.value)}
                        className="rounded-xl border border-[#E5D2B2] bg-[#FFFDF8] px-4"
                    >
                        <option>All</option>
                        <option>Ganapathi Homam</option>
                        <option>Archana</option>
                        <option>Milk Payasam</option>
                        <option>Bhagya Suktha</option>
                        <option>Neeranjanam</option>
                        <option>Special Archana</option>
                    </select>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="rounded-xl border border-[#E5D2B2] bg-[#FFFDF8] px-4"
                    >
                        <option>Newest</option>
                        <option>Oldest</option>
                        <option>Amount High</option>
                        <option>Amount Low</option>
                    </select>

                    <button onClick={handleExport} className="flex items-center gap-2 rounded-xl bg-[#D88718] px-5 text-white hover:bg-[#C67511]">
                        <Download size={18} />
                        Export
                    </button>

                </div>

            </div>




            {/* Table */}
            <div className="overflow-hidden rounded-2xl border border-[#E7D4B4] bg-white shadow-sm">
                <div className="hidden lg:block w-full overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#FFF4E6]">
                            <tr className="border-b border-[#E7D4B4]">
                                <th className="whitespace-nowrap px-3 py-4 text-left text-sm font-semibold text-[#7A4A1A] lg:px-4 xl:px-6">
                                    Receipt No.
                                </th>
                                <th className="px-3 py-4 text-left text-sm font-semibold text-[#7A4A1A] lg:px-4 xl:px-6">
                                    Devotee
                                </th>
                                <th className="hidden px-3 py-4 text-left text-sm font-semibold text-[#7A4A1A] xl:table-cell xl:px-6">
                                    Nakshatram
                                </th>
                                <th className="whitespace-nowrap px-3 py-4 text-left text-sm font-semibold text-[#7A4A1A] lg:px-4 xl:px-6">
                                    Pooja
                                </th>
                                <th className="whitespace-nowrap px-3 py-4 text-left text-sm font-semibold text-[#7A4A1A] lg:px-4 xl:px-6">
                                    Payment
                                </th>
                                <th className="whitespace-nowrap px-3 py-4 text-right text-sm font-semibold text-[#7A4A1A] lg:px-4 xl:px-6">
                                    Amount
                                </th>
                                <th className="hidden whitespace-nowrap px-3 py-4 text-left text-sm font-semibold text-[#7A4A1A] xl:table-cell xl:px-6">
                                    Date
                                </th>
                                <th className="whitespace-nowrap px-3 py-4 text-center text-sm font-semibold text-[#7A4A1A] lg:px-4 xl:px-6">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredReceipts.length > 0 ? (
                                filteredReceipts.map((receipt) => (
                                    <tr
                                        key={receipt._id}
                                        className="border-b border-[#F3E6CF] transition hover:bg-[#FFFDF8]"
                                    >
                                        <td className="whitespace-nowrap px-3 py-5 lg:px-4 xl:px-6">
                                            <span className="font-semibold text-[#4A2108]">
                                                {receipt.receiptNumber}
                                            </span>
                                        </td>

                                        <td className="px-3 py-5 lg:px-4 xl:px-6">
                                            <div className="font-semibold text-[#4A2108]">
                                                {receipt.name}
                                            </div>

                                            <div className="text-xs text-[#7A5A35] xl:hidden">
                                                {receipt.nakshatram}
                                            </div>
                                        </td>

                                        <td className="hidden px-6 py-5 text-[#7A5A35] xl:table-cell">
                                            {receipt.nakshatram}
                                        </td>

                                        <td className="px-3 py-5 lg:px-4 xl:px-6">
                                            <span className="whitespace-nowrap rounded-full bg-[#FFF4E4] px-3 py-1 text-sm font-medium text-[#D88718]">
                                                {receipt.pooja}
                                            </span>
                                        </td>

                                        <td className="px-3 py-5 lg:px-4 xl:px-6">
                                            {receipt.paymentType === "Cash" && (
                                                <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                                                    <Wallet size={15} />
                                                    Cash
                                                </span>
                                            )}
                                            {receipt.paymentType === "UPI" && (
                                                <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                                                    <Smartphone size={15} />
                                                    UPI
                                                </span>
                                            )}
                                        </td>

                                        <td className="whitespace-nowrap px-3 py-5 text-right lg:px-4 xl:px-6">
                                            <span className="font-bold text-[#4A2108]">
                                                ₹{receipt.amount}
                                            </span>
                                        </td>

                                        <td className="hidden px-6 py-5 xl:table-cell">
                                            <div className="flex items-center gap-2 whitespace-nowrap text-[#7A5A35]">
                                                <CalendarDays size={16} />
                                                {new Date(receipt.date).toLocaleDateString("en-GB")}
                                            </div>
                                        </td>

                                        <td className="px-3 py-5 lg:px-4 xl:px-6">
                                            <div className="flex flex-nowrap justify-center gap-1.5 xl:gap-2">
                                                <button className="rounded-lg border border-green-200 bg-green-50 p-2 transition hover:bg-green-100">
                                                    <DownloadIcon size={17} className="text-green-600" />
                                                </button>
                                                <button className="rounded-lg border border-red-200 bg-red-50 p-2 transition hover:bg-red-100">
                                                    <Trash2 size={17} className="text-red-600" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={8} className="py-16 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="rounded-full bg-[#FFF3E2] p-5">
                                                <ReceiptText size={42} className="text-[#D88718]" />
                                            </div>
                                            <h3 className="text-xl font-semibold text-[#4A2108]">
                                                No Receipts Found
                                            </h3>
                                            <p className="text-[#8D6A44]">
                                                Try changing the search or filter options.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* mobile tavble */}

                <div className="block lg:hidden space-y-4">

                    {filteredReceipts.length > 0 ? (

                        filteredReceipts.map((receipt) => (

                            <div
                                key={receipt._id}
                                className="rounded-2xl border border-[#E7D4B4] bg-white p-4 shadow-sm"
                            >

                                {/* Top */}

                                <div className="flex items-start justify-between gap-3">

                                    <div className="min-w-0 flex-1">

                                        <p className="text-xs uppercase tracking-wide text-[#B08554]">
                                            Receipt No.
                                        </p>

                                        <h3 className="truncate text-base font-bold text-[#4A2108]">
                                            {receipt.receiptNumber}
                                        </h3>

                                    </div>

                                    <div className="text-right">

                                        <p className="text-xs text-[#9A6428]">
                                            Amount
                                        </p>

                                        <h3 className="text-lg font-bold text-[#D88718]">
                                            ₹{receipt.amount}
                                        </h3>

                                    </div>

                                </div>

                                {/* Divider */}

                                <div className="my-4 border-t border-dashed border-[#E7D4B4]" />

                                {/* Details */}

                                <div className="space-y-3">

                                    <div className="flex justify-between gap-4">

                                        <span className="text-sm text-[#8A6537]">
                                            Devotee
                                        </span>

                                        <span className="text-right font-medium text-[#4A2108]">
                                            {receipt.name}
                                        </span>

                                    </div>

                                    <div className="flex justify-between gap-4">

                                        <span className="text-sm text-[#8A6537]">
                                            Nakshatram
                                        </span>

                                        <span className="text-right font-medium text-[#4A2108]">
                                            {receipt.nakshatram}
                                        </span>

                                    </div>

                                    <div className="flex justify-between gap-4">

                                        <span className="text-sm text-[#8A6537]">
                                            Pooja
                                        </span>

                                        <span className="rounded-full bg-[#FFF4E4] px-3 py-1 text-xs font-semibold text-[#D88718]">
                                            {receipt.pooja}
                                        </span>

                                    </div>

                                    <div className="flex justify-between gap-4">

                                        <span className="text-sm text-[#8A6537]">
                                            Payment
                                        </span>

                                        {receipt.paymentType === "Cash" ? (

                                            <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">

                                                <Wallet size={14} />

                                                Cash

                                            </span>

                                        ) : (

                                            <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">

                                                <Smartphone size={14} />

                                                UPI

                                            </span>

                                        )}

                                    </div>

                                    <div className="flex justify-between gap-4">

                                        <span className="text-sm text-[#8A6537]">
                                            Date
                                        </span>

                                        <span className="inline-flex items-center gap-2 text-sm text-[#4A2108]">

                                            <CalendarDays size={15} />

                                            {receipt.date}

                                        </span>

                                    </div>

                                </div>

                                {/* Actions */}

                                <div className="mt-5 grid grid-cols-2 gap-3">

                                    <button className="flex items-center justify-center gap-2 rounded-xl border border-green-200 bg-green-50 py-2.5 font-medium text-green-700 transition hover:bg-green-100">

                                        <DownloadIcon size={18} />

                                        Download

                                    </button>

                                    <button className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 py-2.5 font-medium text-red-700 transition hover:bg-red-100">

                                        <Trash2 size={18} />

                                        Delete

                                    </button>

                                </div>

                            </div>

                        ))

                    ) : (

                        <div className="rounded-2xl border border-[#E7D4B4] bg-white py-16 text-center">

                            <div className="flex flex-col items-center gap-3">

                                <div className="rounded-full bg-[#FFF3E2] p-5">

                                    <ReceiptText
                                        size={42}
                                        className="text-[#D88718]"
                                    />

                                </div>

                                <h3 className="text-xl font-semibold text-[#4A2108]">
                                    No Receipts Found
                                </h3>

                                <p className="text-[#8D6A44]">
                                    Try changing the search or filter options.
                                </p>

                            </div>

                        </div>

                    )}

                </div>
            </div>


            <div className="flex flex-col gap-4 rounded-2xl border border-[#E7D4B4] bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">

                <div>

                    <p className="text-sm text-[#8A6537]">
                        Showing
                        <span className="mx-1 font-semibold text-[#4A2108]">
                            {filteredReceipts.length}
                        </span>
                        of
                        <span className="mx-1 font-semibold text-[#4A2108]">
                            {allReceipts.length}
                        </span>
                        receipts
                    </p>

                </div>

                <div className="flex items-center gap-2">

                    <button className="flex items-center gap-2 rounded-xl border border-[#E7D4B4] px-4 py-2 text-[#7A4A1A] transition hover:bg-[#FFF5E7]">

                        <ChevronLeft size={18} />

                        Previous

                    </button>

                    <button className="rounded-xl bg-[#D88718] px-4 py-2 font-semibold text-white">
                        1
                    </button>

                    <button className="rounded-xl border border-[#E7D4B4] px-4 py-2 text-[#7A4A1A] transition hover:bg-[#FFF5E7]">
                        2
                    </button>

                    <button className="rounded-xl border border-[#E7D4B4] px-4 py-2 text-[#7A4A1A] transition hover:bg-[#FFF5E7]">
                        3
                    </button>

                    <button className="flex items-center gap-2 rounded-xl border border-[#E7D4B4] px-4 py-2 text-[#7A4A1A] transition hover:bg-[#FFF5E7]">

                        Next

                        <ChevronRight size={18} />

                    </button>

                </div>

            </div>

        </div>
    );
}

export default Receipts;