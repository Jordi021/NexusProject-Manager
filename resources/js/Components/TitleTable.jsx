export default function TitleTable({ colName }) {
    return (
        <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
            {colName}
        </th>
    );
}
