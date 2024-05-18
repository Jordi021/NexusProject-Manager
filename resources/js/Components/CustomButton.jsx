export default function CustomButton({
    type = "button",
    className = "",
    color,
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={`
                inline-flex items-center px-4 py-2
                bg-${color}-500 border border-transparent 
                rounded-md font-semibold text-xs text-white 
                uppercase tracking-widest 
                hover:bg-${color}-700 focus:bg-${color}-700 
                active:bg-${color}-800 
                focus:outline-none 
                focus:ring-2 focus:ring-${color}-500 
                focus:ring-offset-2 
                transition ease-in-out duration-150 ${className}`
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}