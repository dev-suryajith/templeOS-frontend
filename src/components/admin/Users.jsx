import React, { useEffect, useMemo, useState } from "react";
import {
    Plus,
    Search,
    Pencil,
    Trash2,
    Users as UsersIcon,
} from "lucide-react";
import UserModal from "@/components/admin/UserModal";
import { getUsersAPI } from "../../../services/allAPI";

function Users() {
    const [users, setUsers] = useState([]);

    const [search, setSearch] = useState("");

    const [modalOpen, setModalOpen] = useState(false);

    const [selectedUser, setSelectedUser] = useState(null);

    const [loading, setLoading] = useState(false);

    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            return (
                user.name.toLowerCase().includes(search.toLowerCase()) ||
                user.email.toLowerCase().includes(search.toLowerCase()) ||
                user.role.toLowerCase().includes(search.toLowerCase())
            );
        });
    }, [users, search]);



    const getUsers = async () => {
        try {
            setLoading(true);

            const result = await getUsersAPI()

            if (result.status === 200) {
                setUsers(result.data)
            }


        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);



    const handleAdd = () => {
        setSelectedUser(null);
        setModalOpen(true);
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this user?")) return;

        try {

            const result = await deleteUserAPI(id);

            if (result.status === 200) {
                getUsersAPI();
            }

        } catch (err) {
            console.log(err);
        }
    };



    const handleSaved = () => {
        setModalOpen(false);
        getUsers();
    };

    return (
        <div
            style={{ fontFamily: "Gelasio" }}
            className="min-h-screen bg-[#FFF8EE] p-6"
        >
            {/* Header */}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                <div>

                    <p className="uppercase tracking-[0.25em] text-[#D88718] text-sm font-semibold">
                        Administration
                    </p>

                    <h1 className="text-3xl font-bold text-[#4A2108] mt-1">
                        Users
                    </h1>

                </div>

                <button
                    onClick={handleAdd}
                    className="bg-[#D88718] hover:bg-[#c27711] text-white rounded-xl px-5 py-3 flex items-center gap-2 font-semibold transition"
                >
                    <Plus size={18} />
                    Add User
                </button>

            </div>

            {/* Search */}

            <div className="mt-8 relative max-w-md">

                <Search
                    className="absolute left-4 top-3 text-gray-400"
                    size={18}
                />

                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search users..."
                    className="w-full rounded-xl border bg-white py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-[#D88718]"
                />

            </div>

            {/* Table */}

            <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow">

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-[#FFF3E5]">

                            <tr>

                                <th className="px-6 py-4 text-left">
                                    Name
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Email
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Role
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Password
                                </th>

                                <th className="px-6 py-4 text-center">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {loading ? (

                                <tr>

                                    <td
                                        colSpan={5}
                                        className="text-center py-12"
                                    >
                                        Loading...
                                    </td>

                                </tr>

                            ) : filteredUsers.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan={5}
                                        className="py-12"
                                    >

                                        <div className="flex flex-col items-center gap-3">

                                            <UsersIcon
                                                size={45}
                                                className="text-gray-400"
                                            />

                                            <p className="text-gray-500">
                                                No Users Found
                                            </p>

                                        </div>

                                    </td>

                                </tr>

                            ) : (

                                filteredUsers.map((user, index) => (

                                    <tr
                                        key={index}
                                        className="border-b last:border-none hover:bg-[#FFFDF8]"
                                    >

                                        <td className="px-6 py-5">
                                            {user.name}
                                        </td>

                                        <td className="px-6 py-5">
                                            {user.email}
                                        </td>

                                        <td className="px-6 py-5">

                                            <span className="bg-[#FFF3E5] text-[#D88718] rounded-full px-3 py-1 text-sm font-semibold">

                                                {user.role}

                                            </span>

                                        </td>

                                        <td className="px-6 py-5">
                                            ********
                                        </td>

                                        <td className="px-6 py-5">

                                            <div className="flex justify-center gap-3">

                                                <button
                                                    onClick={() =>
                                                        handleEdit(user)
                                                    }
                                                    className="text-blue-600 hover:text-blue-700"
                                                >

                                                    <Pencil size={18} />

                                                </button>

                                                <button
                                                    onClick={() =>
                                                        handleDelete(user._id)
                                                    }
                                                    className="text-red-600 hover:text-red-700"
                                                >

                                                    <Trash2 size={18} />

                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

            <UserModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                user={selectedUser}
                onSaved={handleSaved}
            />

        </div>
    );
}

export default Users;