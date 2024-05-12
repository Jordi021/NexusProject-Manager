import CustomButton from "@/Components/CustomButton";
import Modal from "@/Components/Modal";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Canvas from "@/Layouts/CanvasLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";

export default function Project({ auth, role }) {
    const [showModal, setShowModal] = useState(false);
    return (
        <Authenticated
            user={auth.user}
            header={
                <CustomButton color="blue" onClick={() => setShowModal(true)} className="gap-2 hover:bg-blue-600">
                    Agregar
                    <IoAddCircleOutline className="text-xl" />
                </CustomButton>
            }
            role={role}
        >
            <Head title="Projects" />
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-4">Titulo</h2>
                    <p>
                    Contenido
                    </p>
                </div>
            </Modal>
            <Canvas>
                <h1>Hola 😛</h1>
                <Table></Table>
            </Canvas>
        </Authenticated>
    );
}

function Table({ children }) {
    return (
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
                        Cliente
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        Fecha Inicio
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        Fecha Fin
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        Estado
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        Porcentaje Avance
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
    );
}