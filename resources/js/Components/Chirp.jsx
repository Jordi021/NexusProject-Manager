export default function Chirp({ chirp }) {
    return (
        <>
            <div
                style={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <h3>{chirp.user.name}</h3>
                <small>{chirp.created_at}</small>
            </div>
            <p>{chirp.content}</p>
        </>
    );
}
