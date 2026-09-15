import { useNavigate } from "react-router-dom";
import { PhoneCall, CalendarClock, Dumbbell, CreditCard, UserPlus, Cake } from "lucide-react";

interface TodayTasksProps {
    data: {
        followups: number;
        renewals: number;
        ptSessions: number;
        pendingPayments: number;
        newLeads: number;
        birthdays: number;
    };
}

function TodayTasks({ data }: TodayTasksProps) {
    const navigate = useNavigate();

    const tasks = [
        {
            title: "Today's Follow-ups",
            value: data.followups,
            subtitle: "Pending Calls",
            icon: PhoneCall,
            color: "bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
            path: "/dashboard/leadfollowup",
        },
        {
            title: "Membership Renewals",
            value: data.renewals,
            subtitle: "Expiring Today",
            icon: CalendarClock,
            color: "bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400",
            path: "/dashboard/memberrenewal",
        },
        {
            title: "PT Sessions",
            value: data.ptSessions,
            subtitle: "Today's Schedule",
            icon: Dumbbell,
            color: "bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400",
            path: "/dashboard/ptschedule",
        },
        {
            title: "Pending Payments",
            value: `₹${data.pendingPayments.toLocaleString()}`,
            subtitle: "Outstanding",
            icon: CreditCard,
            color: "bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400",
            path: "/dashboard/paymentpending",
        },
        {
            title: "New Leads",
            value: data.newLeads,
            subtitle: "Today's Enquiry",
            icon: UserPlus,
            color: "bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400",
            path: "/dashboard/leadall",
        },
        {
            title: "Birthdays",
            value: data.birthdays,
            subtitle: "Wish Members",
            icon: Cake,
            color: "bg-pink-100 text-pink-600 dark:bg-pink-500/10 dark:text-pink-400",
            path: "/dashboard/birthday",
        },
    ];

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-3 sm:p-4 lg:p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Today's Tasks
                </h3>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Complete these tasks to keep your gym running smoothly.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                {tasks.map((task, index) => {
                    const Icon = task.icon;

                    return (
                        <button
                            key={index}
                            onClick={() => navigate(task.path)}
                            className="group hover:border-brand-500 hover:bg-brand-50 flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4 text-left transition-all dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-white/[0.05]"
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${task.color}`}
                                >
                                    <Icon size={22} />
                                </div>

                                <div>
                                    <p className="font-semibold text-gray-800 dark:text-white">
                                        {task.title}
                                    </p>

                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                        {task.subtitle}
                                    </p>
                                </div>
                            </div>

                            <div className="text-right">
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {task.value}
                                </p>

                                <p className="text-brand-600 text-xs opacity-0 transition group-hover:opacity-100">
                                    View →
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default TodayTasks;
