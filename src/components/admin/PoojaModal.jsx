import { useEffect, useState } from "react";
import { addPoojaAPI, editPoojaAPI, } from "../../../services/allAPI";
import { X, IndianRupee, ScrollText } from "lucide-react";

function PoojaModal({ show, onClose, isEditing, pooja, onSaved, }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
    });

    const handleSubmit = async () => {

        if (
            !formData.name.trim() ||
            !formData.description.trim() ||
            !formData.price
        ) {
            alert("Please fill all fields.");
            return;
        }

        try {

            setLoading(true);

            let result;

            if (isEditing) {

                result = await editPoojaAPI(
                    pooja._id,
                    formData
                );

            } else {

                result = await addPoojaAPI(formData);

            }

            if (result.status === 200 || result.status === 201) {

                onSaved();

                onClose();

            }

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {
        if (isEditing && pooja) {
            setFormData({
                name: pooja.name,
                description: pooja.description,
                price: pooja.price,
            });
        } else {
            setFormData({
                name: "",
                description: "",
                price: "",
            });
        }
    }, [isEditing, pooja]);

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

            <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">

                {/* Header */}

                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#E9DCC6] bg-[#FFF8EF] px-6 py-5">

                    <div className="flex items-center gap-3">

                        <div className="rounded-xl bg-[#FFE9C8] p-3">
                            <ScrollText
                                className="text-[#D88718]"
                                size={22}
                            />
                        </div>

                        <div>

                            <h2 className="text-xl font-bold text-[#4A2108]">
                                {isEditing
                                    ? "Edit Pooja"
                                    : "Add New Pooja"}
                            </h2>

                            <p className="text-sm text-[#8B6A42]">
                                {isEditing
                                    ? "Update pooja details."
                                    : "Create a new pooja for devotees."}
                            </p>

                        </div>

                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-xl p-2 transition hover:bg-[#F3E6D3]"
                    >
                        <X />
                    </button>

                </div>

                {/* Body */}

                <div className="max-h-[60vh] space-y-6 overflow-y-auto p-6">

                    {/* Name */}

                    <div>

                        <label className="mb-2 block text-sm font-semibold text-[#5D3415]">
                            Pooja Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter pooja name"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
                            className="w-full rounded-xl border border-[#DFC7A5] bg-[#FFFDF9] px-4 py-3 transition focus:border-[#D88718] focus:ring-4 focus:ring-[#F8DDB2] outline-none"
                        />

                    </div>

                    {/* Description */}

                    <div>

                        <div className="mb-2 flex items-center justify-between">

                            <label className="text-sm font-semibold text-[#5D3415]">
                                Description
                            </label>

                            <span className="text-xs text-gray-400">
                                {formData.description.length}/250
                            </span>

                        </div>

                        <textarea
                            rows={5}
                            maxLength={250}
                            placeholder="Describe this pooja..."
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    description: e.target.value,
                                })
                            }
                            className="w-full resize-none rounded-xl border border-[#DFC7A5] bg-[#FFFDF9] px-4 py-3 transition focus:border-[#D88718] focus:ring-4 focus:ring-[#F8DDB2] outline-none"
                        />

                    </div>

                    {/* Price */}

                    <div>

                        <label className="mb-2 block text-sm font-semibold text-[#5D3415]">
                            Amount
                        </label>

                        <div className="relative">

                            <IndianRupee
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B97B29]"
                            />

                            <input
                                type="number"
                                min={1}
                                placeholder="0"
                                value={formData.price}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        price: e.target.value,
                                    })
                                }
                                className="w-full rounded-xl border border-[#DFC7A5] bg-[#FFFDF9] py-3 pl-11 pr-4 transition focus:border-[#D88718] focus:ring-4 focus:ring-[#F8DDB2] outline-none"
                            />

                        </div>

                    </div>

                </div>

                {/* Footer */}

                <div className="sticky bottom-0 flex flex-col-reverse gap-3 border-t border-[#E9DCC6] bg-white px-6 py-5 sm:flex-row sm:justify-end">

                    <button
                        onClick={() => {
                            setFormData({
                                name: "",
                                description: "",
                                price: "",
                            });
                            onClose();
                        }}
                        className="rounded-xl border border-[#D8BE93] px-6 py-3 font-medium text-[#6D4B23] transition hover:bg-[#FFF5E8]"
                    >
                        Cancel
                    </button>

                    <button
                        disabled={loading}
                        onClick={handleSubmit}
                        className="rounded-xl bg-[#D88718] px-6 py-3 font-medium text-white transition hover:bg-[#C77712] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {
                            loading
                                ? "Saving..."
                                : isEditing
                                    ? "Update Pooja"
                                    : "Create Pooja"
                        }
                    </button>

                </div>

            </div>

        </div>
    );
}

export default PoojaModal;