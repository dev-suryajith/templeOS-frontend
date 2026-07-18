import React, { useEffect, useState } from "react";
import { Search, Plus, SquarePen, Trash2, ReceiptText } from "lucide-react";
import { getAllPoojaAPI } from "../../../services/allAPI";
import PoojaModal from "./PoojaModal";

function PoojaList() {
    const [allPooja, setAllPooja] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [selectedPooja, setSelectedPooja] = useState(null)

    const getAllPooja = async () => {
        try {
            const res = await getAllPoojaAPI();

            if (res.status === 200) {
                setAllPooja(res.data);
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getAllPooja()
    }, [])
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
                        placeholder="Search pooja..."
                        className="w-full rounded-xl border border-[#E5D2B2] bg-white py-3 pl-11 pr-4 outline-none transition focus:border-[#D88718]"
                    />

                </div>

                <button
                    onClick={() => (setSelectedPooja(null), setIsEditing(false), setShowModal(true))}
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#D88718] px-5 py-3 font-medium text-white transition hover:bg-[#C67610]">

                    <Plus size={18} />

                    Add Pooja

                </button>

            </div>

            {/* Table */}

            <div className="overflow-hidden rounded-2xl border border-[#E7D4B4] bg-white shadow-sm">

                <div className="overflow-x-auto">

                    <table className="min-w-full">

                        <thead className="bg-[#FFF4E6]">

                            <tr>

                                <th className="px-6 py-4 text-left text-sm font-semibold text-[#7A4A1A]">
                                    Pooja Name
                                </th>

                                <th className="px-6 py-4 text-left text-sm font-semibold text-[#7A4A1A]">
                                    Description
                                </th>

                                <th className="px-6 py-4 text-right text-sm font-semibold text-[#7A4A1A]">
                                    Amount
                                </th>

                                <th className="px-6 py-4 text-center text-sm font-semibold text-[#7A4A1A]">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {allPooja.length > 0 ? (
                                allPooja.map(pooja => (
                                    <tr key={pooja._id} className="border-t border-[#F2E3CB] hover:bg-[#FFFDF9]">

                                        <td className="px-6 py-5 font-semibold text-[#4A2108]">
                                            {pooja.name}
                                        </td>

                                        <td className="px-6 py-5 text-[#6B5A45]">
                                            {pooja.description}
                                        </td>

                                        <td className="px-6 py-5 text-right font-semibold text-[#4A2108]">
                                            ₹ {pooja.price}
                                        </td>

                                        <td className="px-6 py-5">

                                            <div className="flex justify-center gap-2">

                                                <button
                                                    onClick={() => (setSelectedPooja(pooja), setIsEditing(true), setShowModal(true))}
                                                    className="rounded-lg border border-yellow-200 bg-yellow-50 p-2 transition hover:bg-yellow-100"
                                                    title="Edit"
                                                >
                                                    <SquarePen
                                                        size={18}
                                                        className="text-yellow-600"
                                                    />
                                                </button>

                                                <button
                                                    className="rounded-lg border border-red-200 bg-red-50 p-2 transition hover:bg-red-100"
                                                    title="Delete"
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
                            ) : (

                                <tr>

                                    <td
                                        colSpan={8}
                                        className="py-16 text-center"
                                    >

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

                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

            <PoojaModal
                show={showModal}
                onClose={() => setShowModal(false)}
                isEditing={isEditing}
                pooja={selectedPooja}
                getAllPooja={getAllPooja}
            />

        </div>
    );
}

export default PoojaList;