import { useNavigate } from "react-router-dom";
import { ChevronRight, Wallet } from "lucide-react";

interface PendingPayment {
    _id: string;
    name: string;
    packageName: string;
    remainingAmount: number;
    dueDate: string;
    daysLeft: number;
}

interface Props {
    totalOutstanding: number;
    members: PendingPayment[];
}

export default function UpcomingPendingPayments({ totalOutstanding, members }: Props) {
    const navigate = useNavigate();

    const getDueColor = (daysLeft: number) => {
        if (daysLeft <= 0) return "text-red-600 bg-red-100 dark:bg-red-500/10";

        if (daysLeft === 1) return "text-orange-600 bg-orange-100 dark:bg-orange-500/10";

        if (daysLeft <= 3) return "text-yellow-600 bg-yellow-100 dark:bg-yellow-500/10";

        return "text-green-600 bg-green-100 dark:bg-green-500/10";
    };

    const getDueText = (daysLeft: number) => {
        if (daysLeft < 0) return `${Math.abs(daysLeft)} Day(s) Overdue`;
        if (daysLeft === 0) return "Due Today";
        if (daysLeft === 1) return "Due Tomorrow";
        return `Due in ${daysLeft} Days`;
    };

    return (
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            {/* Header */}

            <div className="border-b border-gray-200 px-4 py-4 dark:border-gray-800">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-red-100 p-3 text-red-600 dark:bg-red-500/10">
                            <Wallet size={22} />
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                Upcoming Pending Payments
                            </h3>

                            <p className="text-sm text-gray-500">Payments due in the coming days</p>
                        </div>
                    </div>

                    <div className="text-right">
                        <h2 className="text-2xl font-bold text-red-600">
                            ₹{totalOutstanding.toLocaleString()}
                        </h2>

                        <p className="text-xs text-gray-500">Outstanding Amount</p>

                        <span className="mt-1 inline-block rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-600 dark:bg-red-500/10">
                            {members.length} Pending
                        </span>
                    </div>
                </div>
            </div>

            {/* List */}

            <div className="max-h-[380px] overflow-y-auto">
                {members.length === 0 ? (
                    <div className="py-12 text-center text-gray-500">🎉 No Pending Payments</div>
                ) : (
                    members.map((member) => (
                        <div
                            key={member._id}
                            className="border-b border-gray-100 px-4 py-4 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-white/[0.02]"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <h4 className="font-semibold text-gray-800 dark:text-white">
                                        {member.name}
                                    </h4>

                                    <p className="text-sm text-gray-500">{member.packageName}</p>

                                    <div className="mt-2 flex flex-wrap items-center gap-2">
                                        <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-600 dark:bg-red-500/10">
                                            ₹{member.remainingAmount.toLocaleString()}
                                        </span>

                                        <span
                                            className={`rounded-full px-2 py-1 text-xs font-medium ${getDueColor(
                                                member.daysLeft
                                            )}`}
                                        >
                                            {getDueText(member.daysLeft)}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={() =>
                                        navigate(`/dashboard/memberprofile/${member._id}`)
                                    }
                                    className="rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700"
                                >
                                    Collect
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Footer */}

            <button
                onClick={() => navigate("/dashboard/pendingpayments")}
                className="text-brand-600 flex w-full items-center justify-center gap-2 border-t border-gray-200 py-3 text-sm font-medium hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-white/[0.02]"
            >
                View All
                <ChevronRight size={18} />
            </button>
        </div>
    );
}
