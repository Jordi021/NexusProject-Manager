import { MdOutlineEdit, MdOutlineDeleteOutline } from "react-icons/md";

const commonStyles =
    "relative inline-flex items-center justify-center w-10 h-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2";

function EditButton({
    text,
    color = "blue",
    iconSize = "text-xl",
    className = "",
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `${commonStyles} bg-${color}-500 hover:bg-${color}-600 focus:ring-${color}-600 ` +
                className
            }
        >
            <span className="text-white">
                <MdOutlineEdit className={iconSize} />
            </span>
        </button>
    );
}

function DeleteButton({
    text,
    color = "red",
    iconSize = "text-xl",
    className = "",
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `${commonStyles} bg-red-500 hover:bg-red-600 focus:ring-red-600 ` +
                className
            }
        >
            <span className="text-white">
                <MdOutlineDeleteOutline className={iconSize} />
            </span>
        </button>
    );
}

function OkButton({
    text,
    color = "green",
    iconSize = "text-xl",
    className = "",
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `${commonStyles} bg-green-500 hover:bg-green-600 focus:ring-green-600 ` +
                className
            }
        >
            <span className="text-white">
                {text}
            </span>
        </button>
    );
}

function CancelButton({
    text,
    color = "red",
    iconSize = "text-xl",
    className = "",
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `${commonStyles} bg-red-500 hover:bg-red-600 focus:ring-red-600 ` +
                className
            }
        >
            <span className="text-white">
                {text}
            </span>
        </button>
    );
}

export { EditButton, DeleteButton, OkButton, CancelButton};
