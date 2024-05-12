export default function BreakLayout({left, right}) {
    return (
        <div className="flex">
            <div className="w-2/5 p-4">
                {left}
            </div>
            <div className="w-3/5 p-4">
                {right}
            </div>
        </div>
    );
}
