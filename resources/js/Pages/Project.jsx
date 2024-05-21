import CustomButton from "@/Components/CustomButton";
import Modal from "@/Components/Modal";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Canvas from "@/Layouts/CanvasLayout";
import { Head, useForm } from "@inertiajs/react";
import React, { useContext, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { EditButton, DeleteButton } from "@/Components/IconButtons";
import ProgressBar from "@/Components/ProgressBar";
import { FiUserPlus } from "react-icons/fi";
import { CancelButton, OkButton } from "@/Components/IconButtons";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import TitleTable from "@/Components/TitleTable";

const ProjectContext = React.createContext();
export default function Project({
    auth,
    projects,
    projectsApproved,
    userswithoutRole,
    allAnalysts,
}) {
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
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

    const [selectedStatus, setSelectedStatus] = useState("");

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
                <ButtonsNav
                    setShowModal={setShowModal}
                    setShowModal2={setShowModal2}
                />
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
                        <ProjectForm
                            projectsApproved={projectsApproved}
                            setShowModal={setShowModal}
                        />
                    </div>
                </Modal>
                <Modal
                    show={showModal2}
                    onClose={() => {
                        setShowModal2(false);
                    }}
                >
                    <AnalystForm
                        setShowModal2={setShowModal2}
                        userswithoutRole={userswithoutRole}
                    />
                </Modal>
                <Canvas>
                    <div className="mb-4">
                        <InputLabel
                            htmlFor="status"
                            value="Filter by status"
                        />
                        <SelectInput
                            id="status"
                            name="status"
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="mt-1 block"
                        >
                            <option value="">All the status</option>
                            <option value="Iniciado">Initiated</option>
                            <option value="En Desarrollo">Developing</option>
                            <option value="Cancelado">Cancelled</option>
                            <option value="Finalizado">Finished</option>
                        </SelectInput>
                    </div>
                    <Table
                        projects={projects}
                        projectsApproved={projectsApproved}
                        selectedStatus={selectedStatus}
                        setShowModal={setShowModal}
                    />
                </Canvas>
            </ProjectContext.Provider>
        </Authenticated>
    );
}

function ButtonsNav({ setShowModal, setShowModal2 }) {
    return (
        <div className="space-x-2">
            <CustomButton
                color="blue"
                onClick={() => setShowModal(true)}
                className="bg-blue-500 gap-2 hover:bg-blue-600"
            >
                Add Project
                <IoAddCircleOutline className="text-xl" />
            </CustomButton>
            <CustomButton
                color="blue"
                onClick={() => setShowModal2(true)}
                className="bg-blue-500 gap-2 hover:bg-blue-600"
            >
                Add Analyst
                <FiUserPlus className="text-xl" />
            </CustomButton>
        </div>
    );
}

function AnalystForm({ setShowModal2, userswithoutRole }) {
    const { data, setData, post, errors } = useForm({
        id: 0,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("analysts.store"));
    };
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Convert to Analyst</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <InputLabel htmlFor="user" value="Users without role" />
                    <SelectInput
                        id="user"
                        name="user"
                        value={data.id}
                        onChange={(e) => setData("id", e.target.value)}
                        className="mt-1 block w-full"
                    >
                        <option value="">Select a user...</option>
                        {userswithoutRole && userswithoutRole.length > 0 ? (
                            userswithoutRole.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))
                        ) : (
                            <option value="">
                                There are no users without a role...
                            </option>
                        )}
                    </SelectInput>
                    <InputError message={errors.id} className="mt-2" />
                </div>
                <div className="flex justify-end mt-3 space-x-1">
                    <CancelButton
                        text="Cancel"
                        onClick={() => setShowModal2(false)}
                        className="w-20"
                    />
                    <OkButton type="submit" text="Ok" className="w-20" />
                </div>
            </form>
        </div>
    );
}

function ProjectForm({ projectsApproved, setShowModal }) {
    const { editMode, projectData, setEditMode, setProjectData } =
        useContext(ProjectContext);
    const { data, setData, post, patch, errors, reset } = useForm({
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

        if (errors.name) setData("name", "");
        if (errors.start_date) setData("start_date", getCurrentDate());
        if (errors.end_date) setData("end_date", getCurrentDate());
        if (errors.progress) setData("progress", 0);
        if (errors.status) setData("status", "");
        if (errors.contract_id) setData("contract_id", "");
    };

    const handleCancel = () => {
        setData({
            name: "",
            start_date: getCurrentDate(),
            end_date: getCurrentDate(),
            progress: 0,
            status: "",
            contract_id: "",
        });
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
        setShowModal(false);
    };

    return (
        <div className="p-2">
            <h2 className="text-xl font-bold mb-4">
                {editMode ? "Edit Project" : "Add Project"}
            </h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <InputLabel
                        htmlFor="contract_id"
                        value="Customer Name and Problem"
                    />
                    <SelectInput
                        id="contract_id"
                        name="contract_id"
                        value={data.contract_id}
                        onChange={(e) => setData("contract_id", e.target.value)}
                        className="mt-1 block w-full"
                    >
                        <option value="">Select a client and problem...</option>
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
                                There are no approved contracts...
                            </option>
                        )}
                    </SelectInput>
                    <InputError message={errors.contract_id} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="name" value="Project's name" />
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
                        <InputLabel htmlFor="start_date" value="Start Date" />
                        <input
                            type="date"
                            id="start_date"
                            name="start_date"
                            value={data.start_date}
                            onChange={(e) =>
                                setData("start_date", e.target.value)
                            }
                            className="w-40 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <InputError
                            message={errors.start_date}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="end_date" value="End Date" />
                        <input
                            type="date"
                            id="end_date"
                            name="end_date"
                            value={data.end_date}
                            onChange={(e) =>
                                setData("end_date", e.target.value)
                            }
                            className="w-40 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <InputError
                            message={errors.end_date}
                            className="mt-2"
                        />
                    </div>
                </div>
                <div>
                    <InputLabel htmlFor="progress" value="Progress" />
                    <input
                        id="progress"
                        name="progress"
                        type="number"
                        min="0"
                        max="100"
                        value={data.progress}
                        onChange={(e) => setData("progress", e.target.value)}
                        className="w-20 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <InputError message={errors.progress} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="status" value="Status" />
                    <SelectInput
                        id="status"
                        name="status"
                        value={data.status}
                        onChange={(e) => setData("status", e.target.value)}
                        className="mt-1 block w-full"
                    >
                        <option value="">Select a status...</option>
                        <option value="Iniciado">Initiated</option>
                        <option value="En Desarrollo">Developing</option>
                        <option value="Cancelado">Cancelled</option>
                        <option value="Finalizado">Finished</option>
                    </SelectInput>
                    <InputError message={errors.status} className="mt-2" />
                </div>
                <div className="flex justify-end mt-3 space-x-1">
                    <CancelButton
                        text="Cancel"
                        onClick={handleCancel}
                        className="w-20"
                    />
                    <OkButton type="submit" text="Ok" className="w-20" />
                </div>
            </form>
        </div>
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
            <td className="px-6 py-4 whitespace-pre-wrap">{customerName}</td>
            <td className="px-6 py-4 whitespace-pre-wrap">{proyecto.name}</td>
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

function Table({ projects, projectsApproved, selectedStatus, setShowModal }) {
    // Filtrar los proyectos según el estado seleccionado
    const filteredProjects = selectedStatus
        ? projects.filter((project) => project.status === selectedStatus)
        : projects;

    return (
        <>
            {filteredProjects.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 rounded-lg">
                        <thead className="bg-gray-100">
                            <tr>
                                <TitleTable colName="Customer" />
                                <TitleTable colName="Name" />
                                <TitleTable colName="Start Date" />
                                <TitleTable colName="End Date" />
                                <TitleTable colName="Status" />
                                <TitleTable colName="Progress Percentage" />
                                <TitleTable colName="Actions" />
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredProjects.map((project) => {
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
                </div>
            ) : (
                <h2>There are no projects with the selected status.</h2>
            )}
        </>
    );
}
