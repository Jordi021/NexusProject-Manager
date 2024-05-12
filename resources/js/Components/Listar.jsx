import { useState } from "react";

export default function Listar({ contratos, contratosArchivados, clientes }) {
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
                    {contratosFiltrados.map((contrato) => {
                        const cliente = clientes.find(
                            (cliente) => cliente.id === contrato.customer_id
                        );

                        return (
                            <li
                                key={contrato.id}
                                className="mb-4 p-4 bg-white shadow-md rounded-md"
                            >
                                <div className="text-lg font-medium text-gray-800 mb-2">
                                    Client Name: {cliente.name}
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
                        );
                    })}
                </ul>
            ) : (
                <p className="text-lg text-gray-800">
                    No hay proyectos revisados todavía...
                </p>
            )}
        </div>
    );
}
