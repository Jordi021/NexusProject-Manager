import CustomButton from "@/Components/CustomButton";
import Modal from "@/Components/Modal";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Canvas from "@/Layouts/CanvasLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { EditButton, DeleteButton } from "@/Components/IconButtons";
import ProgressBar from "@/Components/ProgressBar";

import FormLayout from "@/Layouts/FormLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";

export default function Project({ auth, projects }) {
    const [showModal, setShowModal] = useState(false);

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
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <div className="p-4">
                    <ProjectForm />
                </div>
            </Modal>
            <Canvas>
                {/* {proyectos ? (
                    <Table proyectos={proyectos} />
                ) : (
                    <h1>No hay proyectos todavía...</h1>
                )} */}
                <Table projects={projects} />
            </Canvas>
        </Authenticated>
    );
}

function ProjectForm() {
    return (
        <>
            <h2 className="text-xl font-bold mb-4">Agregar Proyecto</h2>
            <form action="">
                <div>
                    <InputLabel
                        htmlFor="customer_id"
                        value="Nombre del Cliente"
                    />

                    <SelectInput
                        id="customer_id"
                        // value={data.customer_id}
                        onChange={(e) => setData("customer_id", e.target.value)}
                        className="mt-1 block w-full"
                    >
                        <option value="">Selecciona un cliente...</option>
                    </SelectInput>
                </div>
                <div>
                    <InputLabel htmlFor="name" value="Nombre del Proyecto" />
                    <TextInput
                        id="name"
                        // value={data.problem}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("problem", e.target.value)}
                    />
                </div>
                <div className="flex gap-5">
                    <div>
                        <InputLabel htmlFor="fechaIn" value="Fecha Inicio" />
                        <input type="date" name="fechaIn" />
                    </div>
                    <div>
                        <InputLabel htmlFor="fechaFn" value="Fecha Final" />
                        <input type="date" name="fechaFn" />
                    </div>
                </div>

                <div>
                    <InputLabel htmlFor="progress" value="Avance" />
                    <input min="0" max="100" type="number" name="progress" />
                </div>
                <div>
                    <InputLabel htmlFor="status" value="Estado" />

                    <SelectInput
                        name="status"
                        // value={data.customer_id}
                        onChange={(e) => setData("customer_id", e.target.value)}
                        className="mt-1 block w-full"
                    >
                        <option value="">Selecciona un estado...</option>
                        <option value="iniciado">Iniciado</option>
                        <option value="en_desarrollo">En desarrollo</option>
                        <option value="cancelado">Cancelado</option>
                        <option value="finalizado">Finalizado</option>
                    </SelectInput>
                </div>
                <div className="flex justify-end mt-3">
                    <CustomButton type="submit" color="blue">
                        Agregar
                    </CustomButton>
                </div>
            </form>
        </>
    );
}

function TableRow({ proyecto }) {
    return (
        <tr>
            <td className="px-6 py-4 whitespace-nowrap">{proyecto.cliente}</td>
            <td className="px-6 py-4 whitespace-nowrap">{proyecto.nombre}</td>
            <td className="px-6 py-4 whitespace-nowrap">
                {proyecto.fechaInicio}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{proyecto.fechaFin}</td>
            <td className="px-6 py-4 whitespace-nowrap">{proyecto.estado}</td>
            <td className="px-6 py-4 whitespace-nowrap">
                <ProgressBar percent={proyecto.porcentajeAvance} />
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="space-x-3">
                    <EditButton />
                    <DeleteButton />
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

function Table({ projects }) {
    return (
        <>
            {projects.length > 0 && projects ? (
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
                        {projects.map((project) => (
                            <TableRow key={project.id} proyecto={project} />
                        ))}
                    </tbody>
                </table>
            ) : (
                <h2>No hay proyectos, agrega uno.</h2>
            )}
        </>
    );
}
