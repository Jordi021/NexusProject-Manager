import CustomButton from "@/Components/CustomButton";
import Modal from "@/Components/Modal";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Canvas from "@/Layouts/CanvasLayout";
import { Head, useForm } from "@inertiajs/react";
import React, { useContext, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { EditButton, DeleteButton } from "@/Components/IconButtons";
import ProgressBar from "@/Components/ProgressBar";

import FormLayout from "@/Layouts/FormLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";

const ProjectContext = React.createContext();
export default function Project({ auth, projects, projectsApproved }) {
    const [showModal, setShowModal] = useState(false);

    const [editMode, setEditMode] = useState(false);
    const [projectData, setProjectData] = useState({
        id: "",
        name: "",
        start_date: "",
        end_date: "",
        progress: 0,
        status: "",
        contract_id: "",
    });

    const handleModalClose = () => {
        setEditMode(false);
        setProjectData({
            id: "",
            name: "",
            start_date: getCurrentDate(),
            end_date: getCurrentDate(),
            progress: 0,
            status: "",
            contract_id: "",
        });
    };

    const contextValue = {
        editMode,
        setEditMode,
        projectData,
        setProjectData,
    };

    return (
        <Authenticated
            user={auth.user}
            role={auth.user.roles[0].name}
            header={
                <CustomButton
                    color="blue"
                    onClick={() => setShowModal(true)}
                    className="bg-blue-500 gap-2 hover:bg-blue-600"
                >
                    Agregar
                    <IoAddCircleOutline className="text-xl" />
                </CustomButton>
            }
        >
            <Head title="Projects" />
            <ProjectContext.Provider value={contextValue}>
                <Modal
                    show={showModal}
                    onClose={() => {
                        setShowModal(false);
                        handleModalClose();
                    }}
                >
                    <div className="p-4">
                        <ProjectForm projectsApproved={projectsApproved} />
                    </div>
                </Modal>
                <Canvas>
                    <Table
                        projects={projects}
                        setShowModal={setShowModal}
                        projectsApproved={projectsApproved}
                    />
                </Canvas>
            </ProjectContext.Provider>
        </Authenticated>
    );
}

function ProjectForm({ projectsApproved }) {
    const { editMode, projectData, setEditMode, setProjectData } =
        useContext(ProjectContext);
    const { data, setData, post, patch, errors } = useForm({
        name: editMode ? projectData.name : "",
        start_date: editMode ? projectData.start_date : getCurrentDate(),
        end_date: editMode ? projectData.end_date : getCurrentDate(),
        progress: editMode ? projectData.progress : 0,
        status: editMode ? projectData.status : "",
        contract_id: editMode ? projectData.contract_id : "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        editMode
            ? patch(route("projects.update", projectData.id), data)
            : post(route("projects.store"), data);
        reset();
    };

    const reset = () => {
        setProjectData({
            id: "",
            name: "",
            start_date: getCurrentDate(),
            end_date: getCurrentDate(),
            progress: 0,
            status: "",
            contract_id: "",
        });
    };

    return (
        <>
            <h2 className="text-xl font-bold mb-4">Agregar Proyecto</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <InputLabel
                        htmlFor="contract_id"
                        value="Nombre del Cliente y Problema"
                    />
                    <SelectInput
                        id="contract_id"
                        name="contract_id"
                        value={data.contract_id}
                        onChange={(e) => setData("contract_id", e.target.value)}
                        className="mt-1 block w-full"
                    >
                        <option value="">
                            Selecciona un cliente y problema...
                        </option>
                        {projectsApproved && projectsApproved.length > 0 ? (
                            projectsApproved.map((projectApproved) => (
                                <option
                                    key={projectApproved.id}
                                    value={projectApproved.id}
                                >
                                    {`${projectApproved.customer_name}, ${projectApproved.problem}`}
                                </option>
                            ))
                        ) : (
                            <option value="">
                                No hay contratos aprobados...
                            </option>
                        )}
                    </SelectInput>
                    <InputError message={errors.contract_id} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="name" value="Nombre del Proyecto" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("name", e.target.value)}
                    />
                </div>
                <InputError message={errors.name} className="mt-2" />
                <div className="flex gap-5">
                    <div>
                        <InputLabel htmlFor="start_date" value="Fecha Inicio" />
                        <input
                            type="date"
                            id="start_date"
                            name="start_date"
                            value={data.start_date}
                            onChange={(e) =>
                                setData("start_date", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.start_date}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="end_date" value="Fecha Fin" />
                        <input
                            type="date"
                            id="end_date"
                            name="end_date"
                            value={data.end_date}
                            onChange={(e) =>
                                setData("end_date", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.end_date}
                            className="mt-2"
                        />
                    </div>
                </div>
                <div>
                    <InputLabel htmlFor="progress" value="Avance" />
                    <input
                        id="progress"
                        name="progress"
                        type="number"
                        min="0"
                        max="100"
                        value={data.progress}
                        onChange={(e) => setData("progress", e.target.value)}
                    />
                    <InputError message={errors.progress} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="status" value="Estado" />
                    <SelectInput
                        id="status"
                        name="status"
                        value={data.status}
                        onChange={(e) => setData("status", e.target.value)}
                        className="mt-1 block w-full"
                    >
                        <option value="">Selecciona un estado...</option>
                        <option value="Iniciado">Iniciado</option>
                        <option value="En Desarrollo">En desarrollo</option>
                        <option value="Cancelado">Cancelado</option>
                        <option value="Finalizado">Finalizado</option>
                    </SelectInput>
                    <InputError message={errors.status} className="mt-2" />
                </div>
                <div className="flex justify-end mt-3">
                    <CustomButton type="submit" color="blue">
                        {editMode ? "Editar" : "Agregar"}
                    </CustomButton>
                </div>
            </form>
        </>
    );
}

function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function TableRow({ proyecto, customerName, setShowModal }) {
    const { setEditMode, setProjectData } = useContext(ProjectContext);
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        destroy(route("projects.destroy", { id: id }));
    };

    const handleEditClick = () => {
        setEditMode(true);
        setProjectData({
            id: proyecto.id,
            name: proyecto.name,
            start_date: proyecto.start_date,
            end_date: proyecto.end_date,
            progress: proyecto.progress,
            status: proyecto.status,
            contract_id: proyecto.contract_id,
        });
        setShowModal(true);
    };

    return (
        <tr>
            <td className="px-6 py-4 whitespace-nowrap">{customerName}</td>
            <td className="px-6 py-4 whitespace-nowrap">{proyecto.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">
                {proyecto.start_date}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{proyecto.end_date}</td>
            <td className="px-6 py-4 whitespace-nowrap">{proyecto.status}</td>
            <td className="px-6 py-4 whitespace-nowrap">
                <ProgressBar percent={proyecto.progress} />
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="space-x-3">
                    <EditButton onClick={handleEditClick} />
                    <DeleteButton onClick={() => handleDelete(proyecto.id)} />
                </div>
            </td>
        </tr>
    );
}

function Title({ colName }) {
    return (
        <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
            {colName}
        </th>
    );
}

function Table({ projects, projectsApproved, setShowModal }) {
    return (
        <>
            {projects.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            <Title colName="Cliente" />
                            <Title colName="Nombre" />
                            <Title colName="Fecha Inicio" />
                            <Title colName="Fecha Fin" />
                            <Title colName="Estado" />
                            <Title colName="Porcentaje Avance" />
                            <Title colName="Acciones" />
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {projects.map((project) => {
                            const approvedProject = projectsApproved.find(
                                (pa) => pa.id === project.contract_id
                            );
                            const { customer_name } = approvedProject;
                            return (
                                <TableRow
                                    key={project.id}
                                    proyecto={project}
                                    customerName={customer_name}
                                    setShowModal={setShowModal}
                                />
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <h2>No hay proyectos, agrega uno.</h2>
            )}
        </>
    );
}
