import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import FormLayout from "@/Layouts/FormLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import CustomButton from "@/Components/CustomButton";
import BreakLayout from "@/Layouts/BreakLayout";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";

export default function Customer({ auth, customers }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl">Agregar Clientes🤑👻</h2>}
        >
            <Head title="Customers" />
            <BreakLayout
                left={<AddForm />}
                right={<List customers={customers} />}
            />
        </AuthenticatedLayout>
    );
}

function AddForm() {
    return (
        <FormLayout>
            <CustomerForm />
            <h3 className="text-2xl">Botón editar no sirve, ayuda!🥲</h3>
        </FormLayout>
    );
}

function List({ customers }) {
    const { patch, delete: destroy } = useForm();

    const handleEdit = (id) => {
        patch(route("customers.patch", {id: id}))
    };

    const handleDelete = (id) => {
        destroy(route("customers.destroy", { id: id }));
    };

    return (
        <div className="w-11/12 mx-auto mt-8 bg-white rounded-lg shadow-lg p-8">
            {customers.length < 1 ? (
                <h2>No hay clientes todavía...</h2>
            ) : (
                <Table>
                    {customers.map((customer) => (
                        <tr key={customer.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {customer.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {customer.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-xl">
                                <button
                                    className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    onClick={() => handleEdit(customer.id)}
                                    disabled
                                >
                                    <span className="text-white">
                                        <MdOutlineEdit />
                                    </span>
                                </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-xl">
                                <button
                                    className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg bg-red-400 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                    onClick={() => handleDelete(customer.id)}
                                >
                                    <span className="text-white">
                                        <MdOutlineDeleteOutline />
                                    </span>
                                </button>
                            </td>
                        </tr>
                    ))}
                </Table>
            )}
        </div>
    );
}

function Table({ children }) {
    return (
        <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
                <tr>
                    <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        Nombre
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        Email
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        Editar
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        Borrar
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {children}
            </tbody>
        </table>
    );
}

function CustomerForm({ customer }) {
    const { data, setData, post, patch, errors } = useForm({
        name: "",
        email: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("customers.store"));
        resetInputs();
    };

    const resetInputs = () => {
        setData((prevState) => ({
            ...prevState,
            name: "",
            email: "",
        }));
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <InputLabel htmlFor="name" value="Client Name:" />

                    <TextInput
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData("name", e.target.value)}
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="email" value="Email:" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("email", e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>
                <div className="flex justify-end mt-3">
                    <CustomButton type="submit" color="blue">
                        Agregar
                    </CustomButton>
                </div>
            </form>
        </div>
    );
}
