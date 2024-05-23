import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function About({ auth, role }) {
    return (
        <Authenticated
            user={auth.user}
            header={<h2 className="text-2xl">All about Nexus</h2>}
            role={role}
        >
            <Head title="About" />
            <div className="mt-5 bg-white overflow-hidden shadow-sm sm:rounded-lg max-w-5xl mx-auto p-10">
                <div className="pt-4 max-w-5xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-center mb-4">
                        <img
                            src="/Nexus.svg"
                            alt="Nexus Logo"
                            className="w-24 h-auto"
                        />
                    </div>
                </div>
                <div className="text-justify">
                    <p>
                        <span className="font-bold text-lg">About Nexus</span>
                        <br />
                        Welcome to Nexus, where technological innovation meets
                        service excellence to provide solutions that transform
                        lives. At Nexus, we are dedicated to offering
                        high-quality technological products and services,
                        constantly adapting to the needs of the market and our
                        customers.
                    </p>
                    <p>
                        <span className="font-bold text-lg">Our Divisions</span>
                        <br />
                        <strong>Computer Sales:</strong> We offer a wide range
                        of computers, from basic models to powerful high-end
                        machines, all subjected to rigorous quality controls to
                        ensure the best for our customers.
                        <br />
                        <strong>Custom Software Development:</strong> We
                        specialize in creating tailored software solutions
                        designed to meet specific needs. Our team transforms
                        ideas into technological realities, from enterprise
                        applications to mobile platforms.
                    </p>
                    <p>
                        <span className="font-bold text-lg">
                            Innovation and Growth
                        </span>
                        <br />
                        Our growth in software development reflects our
                        dedication and expertise. We implement advanced project
                        management strategies to ensure that every IT system is
                        delivered on time, within budget, and with the highest
                        quality.
                    </p>
                    <p>
                        <span className="font-bold text-lg">Our Mission</span>
                        <br />
                        To empower our clients with technology that exceeds
                        their expectations. We aim to be more than a provider;
                        we aspire to be a strategic partner on their path to
                        success.
                    </p>
                    <p>
                        <span className="font-bold text-lg">
                            Our Commitment
                        </span>
                        <br />
                        <strong>Unmatched Quality:</strong> Products and
                        services that stand out for their quality and
                        reliability.
                        <br />
                        <strong>Continuous Innovation:</strong> Staying at the
                        forefront of technological trends.
                        <br />
                        <strong>Personalized Attention:</strong> A unique
                        approach for each client.
                        <br />
                        <strong>Comprehensive Support:</strong> We accompany our
                        clients every step of the way.
                    </p>
                    <p>
                        At Nexus, technology is our passion and excellence is
                        our standard. Join us and discover how we can help you
                        reach new heights in the digital world. Welcome to
                        Nexus!
                    </p>
                </div>
            </div>
        </Authenticated>
    );
}
