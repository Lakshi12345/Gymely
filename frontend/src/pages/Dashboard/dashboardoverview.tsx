import { Users, Wallet, UserPlus, PhoneCall, CalendarClock, TrendingUp } from "lucide-react";

interface DashboardOverviewProps {
    data: {
        todayCollection: number;
        expectedCollection: number;
        attendance: number;
        newLeads: number;
        todayFollowups: number;
        expiringToday: number;
    };
}

const DashboardOverview = ({ data }: DashboardOverviewProps) => {
    const cards = [
        {
            title: "Today's Collection",
            value: `₹${data.todayCollection.toLocaleString()}`,
            icon: Wallet,
            color: "bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400",
        },
        {
            title: "Expected Collection",
            value: `₹${data.expectedCollection.toLocaleString()}`,
            icon: TrendingUp,
            color: "bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
        },
        {
            title: "Today's Attendance",
            value: data.attendance,
            icon: Users,
            color: "bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400",
        },
        {
            title: "New Leads",
            value: data.newLeads,
            icon: UserPlus,
            color: "bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400",
        },
        {
            title: "Today's Follow-ups",
            value: data.todayFollowups,
            icon: PhoneCall,
            color: "bg-cyan-100 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400",
        },
        {
            title: "Membership Expiry",
            value: data.expiringToday,
            icon: CalendarClock,
            color: "bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400",
        },
    ];

    return (
        <div className="space-y-6">
            {/* Welcome Card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">👋 Good Morning</h2>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Here's your gym summary for today.
                </p>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
                {cards.map((card, index) => {
                    const Icon = card.icon;

                    return (
                        <div
                            key={index}
                            className="rounded-2xl border border-gray-200 bg-white p-3 transition-all hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-white/[0.03]"
                        >
                            <div
                                className={`flex h-8 w-8 items-center justify-center rounded-xl ${card.color}`}
                            >
                                <Icon size={16} />
                            </div>

                            <div className="mt-1">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {card.title}
                                </p>

                                <h3 className="mt-0 text-xl font-bold text-gray-900 dark:text-white">
                                    {card.value}
                                </h3>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DashboardOverview;
