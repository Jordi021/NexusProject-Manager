import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import FormLayout from "@/Layouts/FormLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import TextArea from "@/Components/TextArea";
import CustomButton from "@/Components/CustomButton";

export default function ProjectReview({
    auth,
    projectsContracts,
    contratos,
    contratosArchivados,
}) {
    const [activeTab, setActiveTab] = useState(true);

    const handleActiveTab = () => {
        setActiveTab(!activeTab);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<NavReview handleActiveTab={handleActiveTab} />}
        >
            <Head title="Project Review" />
            {activeTab ? (
                <FormLayout>
                    <ContractForm projectsContracts={projectsContracts} />
                </FormLayout>
            ) : (
                <>
                    <Listar
                        contratos={contratos}
                        contratosArchivados={contratosArchivados}
                    />
                </>
            )}
        </AuthenticatedLayout>
    );
}

function Listar({ contratos, contratosArchivados }) {
    const [filtro, setFiltro] = useState("Todos");

    const contratosFiltrados =
        filtro === "Aprobados"
            ? contratos.filter((contrato) => contrato.status === "approved")
            : filtro === "Archivados"
            ? contratosArchivados
            : [...contratos, ...contratosArchivados];

    return (
        <div className="max-w-lg mx-auto">
            <label
                htmlFor="filtro"
                className="block mb-2 text-lg font-medium text-gray-700"
            >
                Filtrar por:
            </label>
            <select
                id="filtro"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            >
                <option value="Todos">Todos</option>
                <option value="Aprobados">Aprobados</option>
                <option value="Archivados">Archivados</option>
            </select>

            {contratosFiltrados.length > 0 ? (
                <ul>
                    {contratosFiltrados.map((contrato) => (
                        <li
                            key={contrato.id}
                            className="mb-4 p-4 bg-white shadow-md rounded-md"
                        >
                            <div className="text-lg font-medium text-gray-800 mb-2">
                                Client Name: {contrato.client_name}
                            </div>
                            <div className="text-gray-600 mb-2">
                                Problem: {contrato.problem}
                            </div>
                            <div className="text-gray-600 mb-2">
                                Requirements: {contrato.requirements}
                            </div>
                            <div className="text-gray-600">
                                Status: {contrato.status}
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-lg text-gray-800">
                    No hay proyectos revisados todavía...
                </p>
            )}
        </div>
    );
}

function NavReview({ handleActiveTab }) {
    return (
        <div className="space-x-5">
            <button onClick={handleActiveTab}>Agregar</button>
            <button onClick={handleActiveTab}>Listar</button>
        </div>
    );
}

function ProjectPending({ contract }) {
    const { post } = useForm();

    const handleApprove = (id) => {
        post(route("approve", { id }));
    };

    const handleArchive = (id) => {
        post(route("archive", { id }));
    };

    return (
        <div className="border-2 border-gray-400 rounded-md p-4 mt-5">
            <p className="text-lg font-medium mb-2">
                Client Name: {contract.client_name}
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

function ContractForm({ projectsContracts }) {
    const { data, setData, post, errors } = useForm({
        client_name: "",
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
                        <InputLabel
                            htmlFor="client_name"
                            value="Client Name:"
                        />

                        <TextInput
                            id="client_name"
                            type="text"
                            name="client_name"
                            value={data.client_name}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) =>
                                setData("client_name", e.target.value)
                            }
                        />
                        {/* <InputError
                            message={errors.client_name}
                            className="mt-2"
                        /> */}
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
                    {/* <div>
                    <label htmlFor="status">Status:</label>
                    <select
                        id="status"
                        value={data.status}
                        onChange={(e) => setData("status", e.target.value)}
                    >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div> */}
                    <div className="flex justify-end mt-3">
                        <PrimaryButton
                            type="submit"
                            className="bg-blue-500 justify-end"
                        >
                            Agregar
                        </PrimaryButton>
                    </div>
                </form>
            </div>
            <h1>Pendientes:</h1>
            {projectsContracts.length < 1 ? (
                <p>No hay proyectos pendientes que revisar.</p>
            ) : (
                projectsContracts.map((contract) => (
                    <ProjectPending key={contract.id} contract={contract} />
                ))
            )}
        </>
    );
}
