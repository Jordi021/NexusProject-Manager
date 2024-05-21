import { useState, createContext, useContext, useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import TitleTable from "@/Components/TitleTable";
import CustomButton from "@/Components/CustomButton";
import { IoAddCircleOutline } from "react-icons/io5";
import {
    EditButton,
    DeleteButton,
    CancelButton,
    OkButton,
} from "@/Components/IconButtons";
import Canvas from "@/Layouts/CanvasLayout";
import TextArea from "@/Components/TextArea";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import Modal from "@/Components/Modal";

const TaskContext = createContext();

export default function Task({ auth, tasks, projects, analysts }) {
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [taskData, setTaskData] = useState({
        id: "",
        description: "",
        content: "",
        status: "",
        project_id: "",
        analyst_id: "",
    });

    const contextValue = {
        editMode,
        setEditMode,
        taskData,
        setTaskData,
    };

    useEffect(() => {
        if (!showModal) {
            setEditMode(false);
            setTaskData({
                id: "",
                description: "",
                content: "",
                status: "",
                project_id: "",
                analyst_id: "",
            });
        }
    }, [showModal]);

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
                    Add Task
                    <IoAddCircleOutline className="text-xl" />
                </CustomButton>
            }
        >
            <Head title="Tasks" />
            <TaskContext.Provider value={contextValue}>
                <Modal
                    show={showModal}
                    onClose={() => {
                        setShowModal(false);
                    }}
                >
                    <div className="p-4">
                        <TaskForm
                            projects={projects}
                            analysts={analysts}
                            setShowModal={setShowModal}
                        />
                    </div>
                </Modal>
                <Canvas>
                    <Table
                        tasks={tasks}
                        projects={projects}
                        analysts={analysts}
                        setShowModal={setShowModal}
                    />
                </Canvas>
            </TaskContext.Provider>
        </Authenticated>
    );
}

function TaskForm({ projects, analysts, setShowModal }) {
    const { editMode, taskData, setTaskData } = useContext(TaskContext);
    const { data, setData, post, patch, errors, reset } = useForm({
        description: editMode ? taskData.description : "",
        content: editMode ? taskData.content : "",
        status: editMode ? taskData.status : "En progreso",
        project_id: editMode ? taskData.project_id : "",
        analyst_id: editMode ? taskData.analyst_id : "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editMode) {
            patch(
                route("tasks.update", taskData.id),
                {
                    ...data,
                },
                {
                    onSuccess: () => {
                        setTaskData({
                            id: taskData.id,
                            description: data.description,
                            content: data.content,
                            status: data.status,
                            project_id: data.project_id,
                            analyst_id: data.analyst_id,
                        });
                        reset();
                        setShowModal(false);
                    },
                }
            );
        } else {
            post(
                route("tasks.store"),
                {
                    ...data,
                },
                {
                    onSuccess: () => {
                        reset();
                        setShowModal(false);
                    },
                }
            );
        }
    };

    const handleCancel = (e) => {
        e.preventDefault();
        reset();
        setShowModal(false);
    };

    return (
        <>
            <h2 className="text-xl font-bold mb-4">
                {editMode ? "Edit Task" : "Add Task"}
            </h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <InputLabel htmlFor="project_id" value="Project" />
                    <SelectInput
                        id="project_id"
                        name="project_id"
                        value={data.project_id}
                        onChange={(e) => setData("project_id", e.target.value)}
                        className="mt-1 block w-full"
                    >
                        <option value="">Select a project...</option>
                        {projects && projects.length > 0 ? (
                            projects.map((project) => (
                                <option key={project.id} value={project.id}>
                                    {project.name}
                                </option>
                            ))
                        ) : (
                            <option value="">
                                There are no projects available...
                            </option>
                        )}
                    </SelectInput>
                    <InputError message={errors.project_id} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="analyst_id" value="Analyst" />
                    <SelectInput
                        id="analyst_id"
                        name="analyst_id"
                        value={data.analyst_id}
                        onChange={(e) => setData("analyst_id", e.target.value)}
                        className="mt-1 block w-full"
                    >
                        <option value="">Select an analyst...</option>
                        {analysts && analysts.length > 0 ? (
                            analysts.map((analyst) => (
                                <option
                                    key={analyst.analyst_id}
                                    value={analyst.analyst_id}
                                >
                                    {analyst.user_name}
                                </option>
                            ))
                        ) : (
                            <option value="">No analysts available...</option>
                        )}
                    </SelectInput>
                    <InputError message={errors.analyst_id} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="description" value="Description" />
                    <TextInput
                        id="description"
                        name="description"
                        value={data.description}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("description", e.target.value)}
                    />
                    <InputError message={errors.description} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="content" value="Content" />
                    <TextArea
                        id="content"
                        name="content"
                        value={data.content}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("content", e.target.value)}
                    />
                    <InputError message={errors.content} className="mt-2" />
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
        </>
    );
}

function TableRow({ task, analyst, project, setShowModal }) {
    const { delete: destroy } = useForm();
    const { setEditMode, setTaskData } = useContext(TaskContext);

    const handleDelete = (id) => {
        destroy(route("tasks.destroy", { id: id }));
    };

    const handleEditClick = () => {
        setEditMode(true);
        setTaskData({
            id: task.id,
            description: task.description,
            content: task.content,
            status: task.status,
            project_id: project.id,
            analyst_id: analyst.analyst_id,
        });
        setShowModal(true);
    };

    return (
        <tr>
            <td className="px-6 py-4 whitespace-pre-wrap">{project.name}</td>
            <td className="px-6 py-4 whitespace-pre-wrap">
                {analyst.user_name}
            </td>
            <td className="px-6 py-4 whitespace-pre-wrap">
                {task.description}
            </td>
            <td className="px-6 py-4 whitespace-pre-wrap">{task.content}</td>
            <td className="px-6 py-4 whitespace-nowrap">{task.status}</td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="space-x-3">
                    <EditButton onClick={handleEditClick} />
                    <DeleteButton onClick={() => handleDelete(task.id)} />
                </div>
            </td>
        </tr>
    );
}

function Table({ tasks, projects, analysts, setShowModal }) {
    const [selectedOption, setSelectedOption] = useState("Todos");

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const filteredTasks = tasks.filter((task) => {
        if (selectedOption === "Todos") return true;
        if (selectedOption === "En progreso")
            return task.status === "En progreso";
        if (selectedOption === "Finalizado")
            return task.status === "Finalizado";
        return false;
    });

    return (
        <>
            {tasks.length > 0 ? (
                <div className="overflow-x-auto">
                    <SelectInput
                        className="w-36 px-4 py-2 mb-4 border border-gray-300 rounded-md"
                        value={selectedOption}
                        onChange={handleOptionChange}
                    >
                        <option value="Todos">All</option>
                        <option value="En progreso">In progress</option>
                        <option value="Finalizado">Finished</option>
                    </SelectInput>
                    <table className="min-w-full divide-y divide-gray-200 rounded-lg">
                        <thead className="bg-gray-100">
                            <tr>
                                <TitleTable colName="Project" />
                                <TitleTable colName="Analyst" />
                                <TitleTable
                                    colName="Description"
                                    className="hidden md:table-cell"
                                />
                                <TitleTable
                                    colName="Content"
                                    className="hidden md:table-cell"
                                />
                                <TitleTable colName="Status" />
                                <TitleTable colName="Actions" />
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredTasks.map((task) => {
                                const analyst = analysts.find(
                                    (analyst) =>
                                        analyst.analyst_id === task.analyst_id
                                );
                                const project = projects.find(
                                    (project) => project.id === task.project_id
                                );
                                return (
                                    <TableRow
                                        key={task.id}
                                        task={task}
                                        analyst={analyst}
                                        project={project}
                                        setShowModal={setShowModal}
                                    />
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ) : (
                <h2>There are no tasks, add one.📝</h2>
            )}
        </>
    );
}
