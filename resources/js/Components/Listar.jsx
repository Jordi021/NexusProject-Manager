import { useState } from "react";
import { Chip } from "@material-tailwind/react";

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
                Filter by:
            </label>
            <select
                id="filtro"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            >
                <option value="Todos">All</option>
                <option value="Aprobados">Approved</option>
                <option value="Archivados">Archived</option>
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
                                <p className="text-lg font-medium text-gray-800 mb-2">
                                    <span className="font-bold">
                                        Client Name:
                                    </span>{" "}
                                    {cliente.name}
                                </p>
                                <p className="text-gray-600 mb-2">
                                    <span className="font-bold">Problem:</span>{" "}
                                    {contrato.problem}
                                </p>
                                <p className="text-gray-600 mb-2">
                                    <span className="font-bold">
                                        Requirements:
                                    </span>{" "}
                                    {contrato.requirements}
                                </p>
                                <div className="text-gray-600">
                                    {contrato.status === "approved" ? (
                                        <Chip
                                            color="green"
                                            value={contrato.status}
                                            className="w-24"
                                        />
                                    ) : (
                                        <Chip
                                            color="red"
                                            value={contrato.status}
                                            className="w-24"
                                        />
                                    )}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p className="text-lg text-gray-800">
                    There are no reviewed projects, yet...
                </p>
            )}
        </div>
    );
}
