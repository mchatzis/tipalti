import { Transaction } from "../../App";

export interface TableProps {
    transactions: Transaction[];
    className?: string;
}

export default function ({ transactions, className }: TableProps) {
    if (transactions.length === 0) {
        return (
            <div className="bg-white text-black p-4 border border-gray-300">
                No transactions data available.
            </div>
        );
    }

    const columns = Object.keys(transactions[0]);

    return (
        <div className={`${className}`}>
            <table className="min-w-full border-separate border-spacing-0">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column}
                                className="sticky top-0 z-10 bg-white border border-gray-300 border-b px-4 py-2 capitalize text-left"
                            >
                                {column}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            {columns.map((column) => (
                                <td
                                    key={column}
                                    className="px-4 py-2 border border-gray-300"
                                >
                                    {transaction[column as keyof Transaction]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
