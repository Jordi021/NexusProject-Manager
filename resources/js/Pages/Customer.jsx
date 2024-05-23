import React, { useState, useContext } from "react";
import { useForm } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import FormLayout from "@/Layouts/FormLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import CustomButton from "@/Components/CustomButton";
import BreakLayout from "@/Layouts/BreakLayout";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";

const customerContext = React.createContext();

export default function Customer({ auth, customers }) {
    const [editCustomer, setEditCustomer] = useState(false);
    const [id, setId] = useState(0);
    const [info, setInfo] = useState({
        name: "",
        email: "",
    });

    const updateInfo = (newValue) => {
        setInfo((prevInfo) => {
            return { ...prevInfo, ...newValue };
        });
    };

    const handleEdit = (value) => {
        setEditCustomer(value);
    };

    const handleId = (id) => {
        setId(id);
    };

    const contextValues = {
        customer: {
            id,
            handleId,
            info,
            updateInfo,
        },
        toggleCustomer: {
            editCustomer,
            handleEdit,
        },
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl">Add Customers 📝</h2>}
            role={auth.user.roles[0].name}
        >
            <Head title="Customers" />
            <customerContext.Provider value={contextValues}>
                <BreakLayout
                    left={<AddForm />}
                    right={<List customers={customers} />}
                />
            </customerContext.Provider>
        </AuthenticatedLayout>
    );
}

function AddForm() {
    return (
        <FormLayout>
            <CustomerForm />
        </FormLayout>
    );
}

function List({ customers }) {
    const { delete: destroy } = useForm();
    const {
        customer: { handleId, updateInfo },
        toggleCustomer: { handleEdit: edit },
    } = useContext(customerContext);

    const handleEdit = (id) => {
        handleId(id);
        edit(true);
    };

    const handleDelete = (id) => {
        destroy(route("customers.destroy", { id: id }));
    };

    return (
        <div className="w-11/12 mx-auto mt-8 bg-white rounded-lg shadow-lg p-8">
            {customers.length < 1 ? (
                <h2>No customers yet...</h2>
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
                            <td className="px-6 py-4 whitespace-nowrap text-xl space-x-2">
                                <button
                                    className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    onClick={() => {
                                        updateInfo({
                                            name: customer.name,
                                            email: customer.email,
                                        });
                                        handleEdit(customer.id);
                                    }}
                                >
                                    <span className="text-white">
                                        <MdOutlineEdit />
                                    </span>
                                </button>
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
        <div className="overflow-x-auto">
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
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {children}
                </tbody>
            </table>
        </div>
    );
}

function CustomerForm() {
    const { data, setData, post, patch, errors } = useForm({
        name: "",
        email: "",
    });

    const {
        customer: { id, info },
        toggleCustomer: { editCustomer, handleEdit },
    } = useContext(customerContext);

    const [isEditMode, setIsEditMode] = useState(editCustomer);

    const handleSubmitUpdate = (e) => {
        e.preventDefault();
        patch(route("customers.update", { id: id }), data);
        resetInputs();
        setIsEditMode(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("customers.store"), data);
        resetInputs();
    };

    const resetInputs = () => {
        setData({
            name: "",
            email: "",
        });
    };

    React.useEffect(() => {
        if (editCustomer) {
            setData({
                name: info.name,
                email: info.email,
            });
            setIsEditMode(true);
        }
    }, [editCustomer, info.name, info.email, setData]);

    React.useEffect(() => {
        if (isEditMode) {
            handleEdit(false);
        }
    }, [isEditMode, handleEdit]);

    return (
        <div>
            <form onSubmit={isEditMode ? handleSubmitUpdate : handleSubmit}>
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
                <div className="flex justify-center mt-3 md:justify-end">
                    <CustomButton
                        className="inline-flex items-center px-4 py-2
                                bg-blue-500 border border-transparent 
                                rounded-md font-semibold text-xs text-white 
                                uppercase tracking-widest 
                                hover:bg-blue-700 focus:bg-blue-700 
                                active:bg-blue-800 
                                focus:outline-none 
                                focus:ring-2 focus:ring-blue-500 
                                focus:ring-offset-2 
                                transition ease-in-out duration-150"
                        type="submit"
                        color="blue"
                    >
                        {isEditMode ? "Editar" : "Agregar"}
                    </CustomButton>
                </div>
            </form>
        </div>
    );
}
