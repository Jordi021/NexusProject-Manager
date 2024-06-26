import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import WelcomeCarousel from "@/Components/WelcomeCarousel";

export default function welcome({ auth, role }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Welcome
                </h2>
            }
            role={role}
        >
            <Head title="Welcome"/>
            <div className="pt-4">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            You're logged in! {role}
                        </div>
                    </div>
                    <WelcomeCarousel />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
