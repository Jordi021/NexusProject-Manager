import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import Chirp from "@/Components/Chirp"

export default function Comment({ auth, comments }) {
    const { data, setData, post, errors } = useForm({
        content: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("comment.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Comment</h2>}
        >
            <Head title="Comment" />
            <h1>Comment</h1>
            <form onSubmit={submit}>
                <label htmlFor="mensaje">Mensaje:</label>
                <br />
                <textarea
                    name="content"
                    id="content"
                    value={data.message}
                    onChange={(e) => setData("content", e.target.value)}
                    cols="30"
                    rows="3"
                    required
                />
                {errors.message && (
                    <p style={{ color: "red" }}>{errors.message}</p>
                )}
                <br />
                <button type="submit">Enviar</button>
            </form>
            <div>
                {comments.length < 1 ? (
                    <h2>No hay comentarios</h2>
                ) : (
                    comments.map((chirp) => (
                        <Chirp key={chirp.id} chirp={chirp} />
                    ))
                )}
            </div>
        </AuthenticatedLayout>
    );
}
