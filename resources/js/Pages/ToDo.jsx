import { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import TitleTable from "@/Components/TitleTable";
import Canvas from "@/Layouts/CanvasLayout";
import { CancelButton, OkButton } from "@/Components/IconButtons";

export default function ToDo({ auth, tasks }) {
    return (
        <Authenticated
            user={auth.user}
            role={auth.user.roles[0].name}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Tasks to do 🤓
                </h2>
            }
        >
            <Head title="To Do" />
            <Canvas>
                <Table tasks={tasks} />
            </Canvas>
        </Authenticated>
    );
}

function Table({ tasks }) {
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
                <>
                    <select
                        className="w-36 px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        value={selectedOption}
                        onChange={handleOptionChange}
                    >
                        <option value="Todos">All</option>
                        <option value="En progreso">In progress</option>
                        <option value="Finalizado">Finished</option>
                    </select>
                    <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
                        <thead className="bg-gray-100">
                            <tr>
                                <TitleTable colName="ID" />
                                <TitleTable colName="Project" />
                                <TitleTable colName="Description" />
                                <TitleTable colName="Content" />
                                <TitleTable colName="Status" />
                                <TitleTable colName="Action" />
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredTasks.map((task) => {
                                return <TableRow key={task.id} task={task} />;
                            })}
                        </tbody>
                    </table>
                </>
            ) : (
                <h2>You have nothing to do.📝</h2>
            )}
        </>
    );
}

function TableRow({ task }) {
    const { patch } = useForm();

    const handleUpdate = (newData) => {
        patch(route("to-do.update", { id: task.id, status: newData }));
    };

    return (
        <tr>
            <td className="px-6 py-4 whitespace-nowrap">{task.id}</td>
            <td className="px-6 py-4 whitespace-nowrap">{task.project_name}</td>
            <td className="px-6 py-4 whitespace-nowrap">{task.description}</td>
            <td className="px-6 py-4 whitespace-nowrap">{task.content}</td>
            <td className="px-6 py-4 whitespace-nowrap">{task.status}</td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="space-x-3">
                    {task.status === "En progreso" ? (
                        <OkButton
                            className="w-16"
                            text="Done"
                            onClick={() => handleUpdate("Finalizado")}
                        />
                    ) : (
                        <CancelButton
                            className="w-16"
                            text="Cancel"
                            onClick={() => handleUpdate("En progreso")}
                        />
                    )}
                </div>
            </td>
        </tr>
    );
}
