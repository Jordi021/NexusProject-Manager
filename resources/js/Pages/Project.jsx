import CustomButton from "@/Components/CustomButton";
import Modal from "@/Components/Modal";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Canvas from "@/Layouts/CanvasLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { EditButton, DeleteButton } from "@/Components/IconButtons";
import ProgressBar from "@/Components/ProgressBar";


export default function Project({ auth, role, proyectos }) {
    const [showModal, setShowModal] = useState(false);
    const proyectos2 = [
        {
            id: "1",
            nombre: "nexusProject",
            cliente: "Manolo",
            fechaInicio: "10-1-2024",
            fechaFin: "5-5-2024",
            estado: "activo",
            porcentajeAvance: 10,
        },
        {
            id: "2",
            nombre: "nexusProject",
            cliente: "Manolo2",
            fechaInicio: "10-1-2024",
            fechaFin: "5-5-2024",
            estado: "cancelado",
            porcentajeAvance: 50,
        },
        {
            id: "4",
            nombre: "nexusProject",
            cliente: "pepe",
            fechaInicio: "10-1-2024",
            fechaFin: "5-5-2024",
            estado: "en desarrollo",
            porcentajeAvance: 99,
        },
    ];

    return (
        <Authenticated
            user={auth.user}
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
            role={role}
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
                <Table proyectos={proyectos2} />
            </Canvas>
        </Authenticated>
    );
}

function ProjectForm() {
    return(<>
         <h2 className="text-xl font-bold mb-4">Agregar Proyecto</h2>
         <form action="">

         </form>
    </>);
}

function TableRow({ proyecto }) {
    return (
        <tr>
            <td className="px-6 py-4 whitespace-nowrap">{proyecto.nombre}</td>
            <td className="px-6 py-4 whitespace-nowrap">{proyecto.cliente}</td>
            <td className="px-6 py-4 whitespace-nowrap">
                {proyecto.fechaInicio}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{proyecto.fechaFin}</td>
            <td className="px-6 py-4 whitespace-nowrap">{proyecto.estado}</td>
            <td className="px-6 py-4 whitespace-nowrap">
                <ProgressBar percent={proyecto.porcentajeAvance}/>
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

function Table({ proyectos }) {
    return (
        <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
                <tr>
                    <Title colName="Nombre" />
                    <Title colName="Cliente" />
                    <Title colName="Fecha Inicio" />
                    <Title colName="Fecha Fin" />
                    <Title colName="Estado" />
                    <Title colName="Porcentaje Avance" />
                    <Title colName="Acciones" />
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {proyectos.map((proyecto) => (
                    <TableRow key={proyecto.id} proyecto={proyecto} />
                ))}
            </tbody>
        </table>
    );
}
