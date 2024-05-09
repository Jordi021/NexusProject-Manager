import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import FormLayout from "@/Layouts/FormLayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function GProyecto({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Gestión de Proyectos
                </h2>
            }
        >
            <Head title="Gestión de Proyectos" />
            <FormLayout>
                <div>
                    <InputLabel htmlFor="nameCli" value="Nombre del Cliente" />
                    <TextInput
                        id="nameCli"
                        type="text"
                        name="nameCli"
                        className="mt-1 block w-full"
                        isFocused={true}
                    />
                    {/* <InputError message="error" className="mt-2" /> */}
                </div>
                <div>
                    <InputLabel htmlFor="namePro" value="Nombre del Proyecto" />
                    <TextInput
                        id="namePro"
                        type="text"
                        name="namePro"
                        className="mt-1 block w-full"
                    />
                    {/* <InputError message="error" className="mt-2" /> */}
                </div>

                <div>
                    <InputLabel htmlFor="dateIni" value="Fecha de Inicio" />
                    <input id="dateIni" type="date" />
                    <InputLabel htmlFor="dateFin" value="Fecha de Fin" />
                    <input id="dateFin" type="date" />
                </div>

                <div>
                    <InputLabel htmlFor="percent" value="Porcentaje %" />
                </div>
                <div>
                    <InputLabel htmlFor="estate" value="Estado del Proyecto" />
                </div>
            </FormLayout>
        </AuthenticatedLayout>
    );
}
