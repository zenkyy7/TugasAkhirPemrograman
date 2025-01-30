import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import { Table, Button, Modal, Select, Alert } from "flowbite-react";
import { AlertCircle, Settings, Trash } from "lucide-react";

export default function Users({ auth, users }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const {
        data,
        setData,
        patch,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        role: "",
        status: "",
    });

    const handleEdit = (user) => {
        setSelectedUser(user);
        setData({ role: user.role, status: user.status });
        setShowModal(true);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        patch(route("dashboard.admin.users.update", selectedUser.id), {
            preserveScroll: true,
            onSuccess: () => {
                setShowModal(false);
                reset();
            },
        });
    };

    const handleDelete = (userId) => {
        if (confirm("Are you sure you want to delete this user?")) {
            destroy(route("dashboard.admin.users.destroy", userId));
        }
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    User Accounts
                </h2>
            }
        >
            <Head title="User Accounts" />

            <div className="py-12">
                <Head title="User Accounts" />
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {errors.unauthorized && (
                        <Alert
                            color="failure"
                            icon={AlertCircle}
                            className="mb-6"
                        >
                            <span className="font-medium">Unauthorized!</span>{" "}
                            {errors.unauthorized}
                        </Alert>
                    )}

                    <Table striped>
                        <Table.Head>
                            <Table.HeadCell>Name</Table.HeadCell>
                            <Table.HeadCell>Email</Table.HeadCell>
                            <Table.HeadCell>Chirps Count</Table.HeadCell>
                            <Table.HeadCell>Role</Table.HeadCell>
                            <Table.HeadCell>Status</Table.HeadCell>
                            <Table.HeadCell>Actions</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {users
                                .filter(
                                    (user) => user.email !== auth.user.email
                                )
                                .map((user) => (
                                    <Table.Row
                                        key={user.id}
                                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                    >
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {user.name}
                                        </Table.Cell>
                                        <Table.Cell>{user.email}</Table.Cell>
                                        <Table.Cell>
                                            {user.chirps.length}
                                        </Table.Cell>
                                        <Table.Cell>{user.role}</Table.Cell>
                                        <Table.Cell>
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
                                                    user.status === "active"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-red-100 text-red-800"
                                                }`}
                                            >
                                                {user.status}
                                            </span>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <div className="flex space-x-2">
                                                <Button
                                                    color="info"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleEdit(user)
                                                    }
                                                >
                                                    <Settings className="mr-2 h-4 w-4" />
                                                    Settings
                                                </Button>
                                                <Button
                                                    color="red"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleDelete(user.id)
                                                    }
                                                >
                                                    <Trash className="mr-2 h-4 w-4" />
                                                    Delete
                                                </Button>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                        </Table.Body>
                    </Table>
                </div>

                <Modal show={showModal} onClose={() => setShowModal(false)}>
                    <Modal.Header>Setting User</Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleUpdate} className="space-y-5">
                            <div className="grid grid-cols-4 space-x-5">
                                <div className="col-span-2">
                                    <label
                                        htmlFor="role"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Role
                                    </label>
                                    <Select
                                        id="role"
                                        value={data.role}
                                        onChange={(e) =>
                                            setData("role", e.target.value)
                                        }
                                        required
                                    >
                                        <option value="user">User</option>
                                        <option value="moderator">
                                            Moderator
                                        </option>
                                    </Select>
                                </div>
                                <div className="col-span-2">
                                    <label
                                        htmlFor="status"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Status
                                    </label>
                                    <Select
                                        id="status"
                                        value={data.status}
                                        onChange={(e) =>
                                            setData("status", e.target.value)
                                        }
                                        required
                                    >
                                        <option value="active">Active</option>
                                        <option value="banned">Banned</option>
                                    </Select>
                                </div>
                            </div>
                            <Button type="submit" disabled={processing}>
                                Save
                            </Button>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        </AuthenticatedLayout>
    );
}
