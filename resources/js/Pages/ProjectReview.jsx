import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import FormLayout from "@/Layouts/FormLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextArea from "@/Components/TextArea";
import CustomButton from "@/Components/CustomButton";
import Listar from "@/Components/Listar";
import SelectInput from "@/Components/SelectInput";
import { FaEllipsisH } from "react-icons/fa";
import Dropdown from "@/Components/Dropdown";
import { Chip } from "@material-tailwind/react";

export default function ProjectReview({
    auth,
    projectsContracts,
    contratos,
    contratosArchivados,
    contratosCerrados,
    clientes,
}) {
    const [activeTab, setActiveTab] = useState("agregarProyectos");
    const renderTab = () => {
        switch (activeTab) {
            case "agregarProyectos":
                return (
                    <>
                        <FormLayout>
                            <ContractForm
                                projectsContracts={projectsContracts}
                                clientes={clientes}
                            />
                        </FormLayout>
                    </>
                );
            case "listar":
                return (
                    <>
                        <Listar
                            contratos={contratos}
                            contratosArchivados={contratosArchivados}
                            contratosCerrados={contratosCerrados}
                            clientes={clientes}
                        />
                    </>
                );
            default:
                break;
        }
    };

    const handleActiveTab = (tab) => {
        setActiveTab(tab);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            role={auth.user.roles[0].name}
            header={<NavReview handleActiveTab={handleActiveTab} />}
        >
            <Head title="Project Review" />
            {renderTab()}
        </AuthenticatedLayout>
    );
}

function NavReview({ handleActiveTab }) {
    const [activeTab, setActiveTab] = useState("agregarProyectos");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        handleActiveTab(tab);
    };

    return (
        <div className="space-x-1">
            <button
                onClick={() => handleTabClick("agregarProyectos")}
                className={`px-4 py-3 rounded-md transition duration-150 ${
                    activeTab === "agregarProyectos"
                        ? "bg-blue-400 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
            >
                Add
            </button>
            <button
                onClick={() => handleTabClick("listar")}
                className={`px-4 py-3 rounded-md transition duration-150 ${
                    activeTab === "listar"
                        ? "bg-blue-400 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
            >
                List
            </button>
        </div>
    );
}

function ProjectPending({ contract, clientes }) {
    const { post, delete: destroy } = useForm();
    const cliente = clientes.find(
        (cliente) => cliente.id === contract.customer_id
    );
    const handleDelete = (id) => {
        destroy(route("projects-contracts.destroy", { id: id }));
    };
    const handleApprove = (id) => {
        post(route("approve", { id }));
    };
    const handleArchive = (id) => {
        post(route("archive", { id }));
    };

    return (
        <div className="shadow-xl border border-gray-100 rounded-md p-6 mt-5">
            <div className="flex justify-between">
                <p className="text-lg font-medium mb-2">
                    <span className="font-bold">Client Name:</span>{" "}
                    {cliente.name}
                </p>
                <Options id={contract.id} handleDelete={handleDelete} />
            </div>
            <p className="text-gray-600 mb-2">
                <span className="font-bold">Problem:</span> {contract.problem}
            </p>
            <p className="text-gray-600 mb-2">
                <span className="font-bold">Requirements:</span>{" "}
                {contract.requirements}
            </p>
            <div className="text-gray-600 mb-2">
                <Chip
                    value={contract.status}
                    variant="ghost"
                    className="w-20"
                />
            </div>
            <div className="flex space-x-2 justify-end">
                <CustomButton
                    className=" inline-flex items-center px-4 py-2
                                        bg-green-500 border border-transparent 
                                        rounded-md font-semibold text-xs text-white 
                                        uppercase tracking-widest 
                                        hover:bg-green-700 focus:bg-green-700 
                                        active:bg-green-800 
                                        focus:outline-none 
                                        focus:ring-2 focus:ring-green-500 
                                        focus:ring-offset-2 
                                        transition ease-in-out duration-150"
                    onClick={() => handleApprove(contract.id)}
                >
                    Approve
                </CustomButton>
                <CustomButton
                    className=" inline-flex items-center px-4 py-2
                                bg-red-500 border border-transparent 
                                rounded-md font-semibold text-xs text-white 
                                uppercase tracking-widest 
                                hover:bg-red-700 focus:bg-red-700 
                                active:bg-red-800 
                                focus:outline-none 
                                focus:ring-2 focus:ring-red-500 
                                focus:ring-offset-2 
                                transition ease-in-out duration-150"
                    onClick={() => handleArchive(contract.id)}
                >
                    Archived
                </CustomButton>
            </div>
        </div>
    );
}

function Options({ id, handleDelete }) {
    return (
        <>
            <Dropdown>
                <Dropdown.Trigger>
                    <span className="inline-flex rounded-md">
                        <button
                            type="button"
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                        >
                            <FaEllipsisH />
                        </button>
                    </span>
                </Dropdown.Trigger>
                <Dropdown.Content width="32">
                    <div className="py-2 hover:bg-gray-200 px-5">
                        <button onClick={() => handleDelete(id)}>
                            Eliminar
                        </button>
                    </div>
                </Dropdown.Content>
            </Dropdown>
        </>
    );
}

function ContractForm({ projectsContracts, clientes }) {
    const { data, setData, post, errors } = useForm({
        customer_id: "",
        problem: "",
        requirements: "",
        status: "pending",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("projects-contracts.store"));
        resetInputs();
    };

    const resetInputs = () => {
        setData((prevState) => ({
            ...prevState,
            client_name: "",
            problem: "",
            requirements: "",
        }));
    };
    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <InputLabel htmlFor="client_id" value="Client Name:" />

                        <SelectInput
                            id="customer_id"
                            value={data.customer_id}
                            onChange={(e) =>
                                setData("customer_id", e.target.value)
                            }
                            className="mt-1 block w-full"
                        >
                            <option value="">Select a customer...</option>
                            {clientes.map((cliente) => (
                                <option key={cliente.id} value={cliente.id}>
                                    {cliente.name}
                                </option>
                            ))}
                        </SelectInput>
                        <InputError message={errors.customer_id} />
                    </div>
                    <div className="flex space-x-5">
                        <div className="flex-1">
                            <InputLabel htmlFor="problem" value="Problem:" />
                            <TextArea
                                id="problem"
                                value={data.problem}
                                className="mt-1 block w-full"
                                size="medium"
                                onChange={(e) =>
                                    setData("problem", e.target.value)
                                }
                            />
                        </div>
                        <div className="flex-1">
                            <InputLabel
                                htmlFor="requirements"
                                value="Requirements:"
                            />

                            <TextArea
                                id="requirements"
                                value={data.requirements}
                                className="mt-1 block w-full"
                                size="medium"
                                onChange={(e) =>
                                    setData("requirements", e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div className="flex justify-end mt-3">
                        <CustomButton type="submit" color="blue">
                            ADD
                        </CustomButton>
                    </div>
                </form>
            </div>
            <h1>Pending contracts:</h1>
            {projectsContracts.length < 1 ? (
                <p>There are no pending projects to review.</p>
            ) : (
                projectsContracts.map((contract) => (
                    <ProjectPending
                        key={contract.id}
                        contract={contract}
                        clientes={clientes}
                    />
                ))
            )}
        </>
    );
}
