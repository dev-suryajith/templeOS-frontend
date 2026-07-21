import React, { useEffect, useState } from "react";
import { Search, Plus, SquarePen, Trash2, ReceiptText } from "lucide-react";
import { deletePoojaAPI, getAllPoojaAPI } from "../../../services/allAPI";
import PoojaModal from "./PoojaModal";

function PoojaList() {
    const [allPooja, setAllPooja] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [selectedPooja, setSelectedPooja] = useState(null)
    const [search, setSearch] = useState("");

    const filteredPooja = allPooja.filter((pooja) =>
        pooja.name.toLowerCase().includes(search.toLowerCase()) ||
        pooja.description.toLowerCase().includes(search.toLowerCase())
    );

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


    const handleAdd = () => {
        setSelectedPooja(null);
        setIsEditing(false);
        setShowModal(true);
    };

    const handleEdit = (pooja) => {
        setSelectedPooja(pooja);
        setIsEditing(true);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this user?")) return;

        try {

            const result = await deletePoojaAPI(id);

            if (result.status === 200) {
                getAllPooja();
            }

        } catch (err) {
            console.log(err);
        }
    };



    const handleSaved = () => {
        setShowModal(false);
        setSelectedPooja(null);
        setIsEditing(false);
        getAllPooja();
    };
    return (
        <div className="space-y-4 sm:space-y-6">

            {/* Header */}

            <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:justify-between">

                <div className="relative w-full md:max-w-md">

                    <Search
                        size={18}
                        className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-[#A77B4A]"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search pooja..."
                        className="w-full rounded-xl border border-[#E5D2B2] bg-white py-2.5 sm:py-3 pl-10 sm:pl-11 pr-4 text-sm sm:text-base outline-none transition focus:border-[#D88718]"
                    />

                </div>

                <button
                    onClick={() => (setSelectedPooja(null), handleAdd(), setIsEditing(false), setShowModal(true))}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#D88718] px-5 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-white transition hover:bg-[#C67610] md:w-auto">

                    <Plus size={18} />

                    Add Pooja

                </button>

            </div>

            {/* Table (md and up) */}

            <div className="hidden overflow-hidden rounded-2xl border border-[#E7D4B4] bg-white shadow-sm md:block">

                <div className="overflow-x-auto">

                    <table className="min-w-full">

                        <thead className="bg-[#FFF4E6]">

                            <tr>

                                <th className="px-4 py-4 text-left text-sm font-semibold text-[#7A4A1A] lg:px-6">
                                    Pooja Name
                                </th>

                                <th className="hidden px-4 py-4 text-left text-sm font-semibold text-[#7A4A1A] lg:table-cell lg:px-6">
                                    Description
                                </th>

                                <th className="px-4 py-4 text-right text-sm font-semibold text-[#7A4A1A] lg:px-6">
                                    Amount
                                </th>

                                <th className="px-4 py-4 text-center text-sm font-semibold text-[#7A4A1A] lg:px-6">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {filteredPooja.length > 0 ? (
                                filteredPooja.map(pooja => (
                                    <tr key={pooja._id} className="border-t border-[#F2E3CB] hover:bg-[#FFFDF9]">

                                        <td className="px-4 py-5 font-semibold text-[#4A2108] lg:px-6">
                                            {pooja.name}
                                            <div className="mt-1 text-xs font-normal text-[#8D7355] lg:hidden">
                                                {pooja.description}
                                            </div>
                                        </td>

                                        <td className="hidden px-4 py-5 text-[#6B5A45] lg:table-cell lg:px-6">
                                            {pooja.description}
                                        </td>

                                        <td className="px-4 py-5 text-right font-semibold text-[#4A2108] lg:px-6">
                                            ₹ {pooja.price}
                                        </td>

                                        <td className="px-4 py-5 lg:px-6">

                                            <div className="flex justify-center gap-2">

                                                <button
                                                    onClick={() => (setSelectedPooja(pooja), setIsEditing(true), handleEdit(pooja), setShowModal(true))}
                                                    className="rounded-lg border border-yellow-200 bg-yellow-50 p-2 transition hover:bg-yellow-100"
                                                    title="Edit"
                                                >
                                                    <SquarePen
                                                        size={18}
                                                        className="text-yellow-600"
                                                    />
                                                </button>

                                                <button
                                                    onClick={() => handleDelete(pooja._id)}
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
                                        colSpan={4}
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
                                                No Poojas Found
                                            </h3>

                                            <p className="text-[#8D6A44]">
                                                Try changing the search options.
                                            </p>

                                        </div>

                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

            {/* Cards (below md) */}

            <div className="space-y-3 md:hidden">

                {filteredPooja.length > 0 ? (

                    filteredPooja.map((pooja) => (

                        <div
                            key={pooja._id}
                            className="rounded-xl border border-[#E7D4B4] bg-white p-3.5 shadow-sm sm:p-4"
                        >

                            <div className="flex items-start justify-between gap-3">

                                <div className="min-w-0 flex-1">

                                    <h3 className="truncate text-sm font-bold text-[#4A2108] sm:text-base">
                                        {pooja.name}
                                    </h3>

                                    {pooja.description && (
                                        <p className="mt-1 text-xs text-[#8D7355] sm:text-sm">
                                            {pooja.description}
                                        </p>
                                    )}

                                </div>

                                <div className="shrink-0 text-right">

                                    <p className="text-[10px] uppercase tracking-wide text-[#9A6428] sm:text-xs">
                                        Amount
                                    </p>

                                    <p className="text-base font-bold text-[#D88718] sm:text-lg">
                                        ₹ {pooja.price}
                                    </p>

                                </div>

                            </div>

                            <div className="mt-3.5 grid grid-cols-2 gap-2.5 sm:mt-4 sm:gap-3">

                                <button
                                    onClick={() => (setSelectedPooja(pooja), setIsEditing(true), setShowModal(true))}
                                    className="flex items-center justify-center gap-1.5 rounded-xl border border-yellow-200 bg-yellow-50 py-2 text-sm font-medium text-yellow-700 transition hover:bg-yellow-100 sm:gap-2 sm:py-2.5"
                                >
                                    <SquarePen size={16} />
                                    Edit
                                </button>

                                <button
                                    onClick={() => handleDelete(pooja._id)}
                                    className="flex items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-red-50 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100 sm:gap-2 sm:py-2.5"
                                >
                                    <Trash2 size={16} />
                                    Delete
                                </button>

                            </div>

                        </div>

                    ))

                ) : (

                    <div className="rounded-xl border border-[#E7D4B4] bg-white py-12 text-center sm:py-16">

                        <div className="flex flex-col items-center gap-3 px-4">

                            <div className="rounded-full bg-[#FFF3E2] p-4 sm:p-5">

                                <ReceiptText
                                    size={36}
                                    className="text-[#D88718] sm:hidden"
                                />
                                <ReceiptText
                                    size={42}
                                    className="hidden text-[#D88718] sm:block"
                                />

                            </div>

                            <h3 className="text-lg font-semibold text-[#4A2108] sm:text-xl">
                                No Poojas Found
                            </h3>

                            <p className="text-sm text-[#8D6A44] sm:text-base">
                                Try changing the search options.
                            </p>

                        </div>

                    </div>

                )}

            </div>

            <PoojaModal
                show={showModal}
                onClose={() => setShowModal(false)}
                isEditing={isEditing}
                pooja={selectedPooja}
                onSaved={handleSaved}
            />

        </div>
    );
}

export default PoojaList;