export default function Form({ children }) {
    return (
        <div className="flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div className="w-full lg:w-11/12 mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg space-y-5">
                {children}
            </div>
        </div>
    );
}
