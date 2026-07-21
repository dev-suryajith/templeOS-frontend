import React, { useEffect, useState } from "react";
import { X, Save } from "lucide-react";
import { addUserAPI, editUserAPI } from "../../../services/allAPI"

function UserModal({
    open,
    onClose,
    user,
    onSaved,
}) {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "Staff",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                role: user.role || "Staff",
                password: "",
            });
        } else {
            setFormData({
                name: "",
                email: "",
                role: "Staff",
                password: "",
            });
        }

    }, [user, open]);

    if (!open) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            setLoading(true);

            if (user) {

                const result = await editUserAPI(
                    user._id,
                    formData
                );

                if (result.status === 200) {
                    onSaved();
                }

            } else {

                const result = await addUserAPI(formData);

                if (result.status === 201 || result.status === 200) {
                    onSaved();
                }

            }

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/50 backdrop-blur-sm">

            <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-hidden">

                {/* Header */}

                <div className="flex items-center justify-between bg-[#D88718] px-6 py-5 text-white">

                    <div>

                        <h2 className="text-2xl font-bold">
                            {user ? "Edit User" : "Add User"}
                        </h2>

                        <p className="text-sm opacity-80">
                            TempleOS Administration
                        </p>

                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 hover:bg-white/20"
                    >
                        <X size={20} />
                    </button>

                </div>

                {/* Form */}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5 p-6"
                >

                    <div>

                        <label className="mb-2 block font-medium">
                            Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter Name"
                            className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-[#D88718]"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter Email"
                            className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-[#D88718]"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block font-medium">
                            Role
                        </label>

                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-[#D88718]"
                        >
                            <option value="Admin">Admin</option>
                            <option value="Staff">Staff</option>
                            <option value="Cashier">Cashier</option>
                        </select>

                    </div>

                    <div>

                        <label className="mb-2 block font-medium">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder={
                                user
                                    ? "Leave empty to keep existing password"
                                    : "Enter Password"
                            }
                            className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-[#D88718]"
                        />

                    </div>

                    <div className="flex justify-end gap-3 pt-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border px-6 py-3 font-medium hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            disabled={loading}
                            type="submit"
                            className="flex items-center gap-2 rounded-xl bg-[#D88718] px-6 py-3 font-semibold text-white hover:bg-[#c47610] disabled:opacity-50"
                        >

                            <Save size={18} />

                            {loading
                                ? "Saving..."
                                : user
                                    ? "Update User"
                                    : "Add User"}

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );
}

export default UserModal;