import { useNavigate } from "react-router-dom";
import { ChevronRight, IndianRupee } from "lucide-react";

interface Transaction {
    _id: string;
    memberName: string;
    purpose: string;
    paymentMode: string;
    amount: number;
    status: string;
    createdAt: string;
}

interface Props {
    transactions: Transaction[];
}

export default function RecentTransactions({ transactions }: Props) {
    const navigate = useNavigate();

    return (
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4 dark:border-gray-800">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        Recent Transactions
                    </h3>

                    <p className="text-sm text-gray-500">Today's payment activity</p>
                </div>
            </div>

            <div className="max-h-[420px] overflow-y-auto">
                {transactions.length === 0 ? (
                    <div className="py-12 text-center text-gray-500">No Transactions Found</div>
                ) : (
                    transactions.map((item) => (
                        <div
                            key={item._id}
                            className="flex items-center justify-between border-b border-gray-100 px-4 py-4 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-white/[0.02]"
                        >
                            <div className="flex items-center gap-3">
                                <div className="rounded-full bg-green-100 p-3 text-green-600 dark:bg-green-500/10">
                                    <IndianRupee size={18} />
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-800 dark:text-white">
                                        {item.memberName}
                                    </h4>

                                    <p className="text-sm text-gray-500">{item.purpose}</p>

                                    <span className="text-xs text-gray-400">
                                        {item.paymentMode}
                                    </span>
                                </div>
                            </div>

                            <div className="text-right">
                                <h4 className="font-bold text-green-600">
                                    ₹{item.amount.toLocaleString()}
                                </h4>

                                <span
                                    className={`rounded-full px-2 py-1 text-xs ${
                                        item.status === "Paid"
                                            ? "bg-green-100 text-green-600"
                                            : "bg-red-100 text-red-600"
                                    }`}
                                >
                                    {item.status}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <button
                onClick={() => navigate("/dashboard/transactions")}
                className="text-brand-600 flex w-full items-center justify-center gap-2 border-t border-gray-200 py-3 text-sm font-medium hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-white/[0.02]"
            >
                View All
                <ChevronRight size={18} />
            </button>
        </div>
    );
}
