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

export default function ProjectReview({
    auth,
    projectsContracts,
    contratos,
    contratosArchivados,
    clientes,
    role
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
            header={<NavReview handleActiveTab={handleActiveTab}
            role={auth.user.roles[0].name} />}
        >
            <Head title="Project Review" />
            {renderTab()}
        </AuthenticatedLayout>
    );
}

function NavReview({ handleActiveTab }) {
    return (
        <div className="space-x-5">
            <button onClick={() => handleActiveTab("agregarProyectos")}>
                Agregar
            </button>
            <button onClick={() => handleActiveTab("listar")}>Listar</button>
        </div>
    );
}

function ProjectPending({ contract, clientes }) {
    const { post } = useForm();

    const cliente = clientes.find(
        (cliente) => cliente.id === contract.customer_id
    );

    const handleApprove = (id) => {
        post(route("approve", { id }));
    };

    const handleArchive = (id) => {
        post(route("archive", { id }));
    };

    return (
        <div className="border-2 border-gray-400 rounded-md p-4 mt-5">
            <p className="text-lg font-medium mb-2">
                Client Name: {cliente.name}
            </p>
            <p className="text-gray-600 mb-2">Problem: {contract.problem}</p>
            <p className="text-gray-600 mb-2">
                Requirements: {contract.requirements}
            </p>
            <p className="text-gray-600 mb-2">Status: {contract.status}</p>
            <div className="flex space-x-2 justify-end">
                <CustomButton
                    color="green"
                    onClick={() => handleApprove(contract.id)}
                >
                    Approve
                </CustomButton>
                <CustomButton
                    color="red"
                    onClick={() => handleArchive(contract.id)}
                >
                    Archived
                </CustomButton>
            </div>
        </div>
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
                    </div>
                    <div>
                        <InputLabel htmlFor="problem" value="Problem:" />
                        <TextArea
                            id="problem"
                            value={data.problem}
                            className="mt-1 block w-full"
                            size="small"
                            onChange={(e) => setData("problem", e.target.value)}
                        />
                    </div>
                    <div>
                        <InputLabel
                            htmlFor="requirements"
                            value="Requirements:"
                        />

                        <TextArea
                            id="requirements"
                            value={data.requirements}
                            className="mt-1 block w-full"
                            size="small"
                            onChange={(e) =>
                                setData("requirements", e.target.value)
                            }
                        />
                    </div>
                    <div className="flex justify-end mt-3">
                        <CustomButton type="submit" color="blue">
                            Agregar
                        </CustomButton>
                    </div>
                </form>
            </div>
            <h1>Pendientes:</h1>
            {projectsContracts.length < 1 ? (
                <p>No hay proyectos pendientes que revisar.</p>
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
