import {
    Activity,
    AlertCircle,
    ArrowUpRight,
    BadgeIndianRupee,
    CalendarDays,
    Clock,
    UserPlus,
    Users,
} from "lucide-react";
const stats = [
    {
        title: "Today's Revenue",
        value: "₹48,560",
        growth: "+18%",
        icon: BadgeIndianRupee,
    },
    {
        title: "Check-Ins",
        value: "286",
        growth: "+12%",
        icon: Users,
    },
    {
        title: "New Leads",
        value: "34",
        growth: "+8%",
        icon: UserPlus,
    },
    {
        title: "Renewals",
        value: "18",
        growth: "+6%",
        icon: Activity,
    },
];
export default function DayWiseSummary() {
    return (
        <div className="space-y-6">
            {/* HEADER */}

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
                <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-8 text-white">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
                                <CalendarDays size={30} />
                            </div>

                            <h1 className="text-4xl font-bold">Day Wise Summary</h1>

                            <p className="mt-3 max-w-2xl text-blue-100">
                                Monitor today's revenue, attendance, lead generation, renewals,
                                staff activities, and operational insights.
                            </p>
                        </div>

                        <div className="rounded-3xl bg-white/10 p-6 backdrop-blur">
                            <p className="text-sm text-blue-100">Current Status</p>

                            <h2 className="mt-2 text-3xl font-bold">Monday</h2>

                            <p className="mt-2 text-blue-100">06 Aug 2026</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* KPI STRIP */}

            <div className="grid grid-cols-12 gap-6">
                {stats.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <div key={index} className="col-span-12 md:col-span-6 xl:col-span-3">
                            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-slate-500">{item.title}</p>

                                        <h2 className="mt-3 text-4xl font-bold">{item.value}</h2>

                                        <div className="mt-3 flex items-center gap-2">
                                            <ArrowUpRight size={16} className="text-emerald-600" />

                                            <span className="font-semibold text-emerald-600">
                                                {item.growth}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="rounded-2xl bg-indigo-50 p-4">
                                        <Icon size={28} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* TIMELINE + ALERTS */}

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 xl:col-span-8">
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="mb-8 flex items-center gap-3">
                            <Clock className="text-indigo-600" />

                            <h2 className="text-2xl font-bold">Revenue Timeline</h2>
                        </div>

                        <div className="space-y-5">
                            {[
                                ["06 AM", "₹2,400"],
                                ["08 AM", "₹8,500"],
                                ["10 AM", "₹14,600"],
                                ["12 PM", "₹21,300"],
                                ["02 PM", "₹32,800"],
                                ["04 PM", "₹48,560"],
                            ].map(([time, amount]) => (
                                <div key={time} className="flex items-center gap-4">
                                    <div className="w-20 text-sm text-slate-500">{time}</div>

                                    <div className="h-3 flex-1 rounded-full bg-slate-100">
                                        <div
                                            className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
                                            style={{
                                                width: "75%",
                                            }}
                                        />
                                    </div>

                                    <div className="font-semibold">{amount}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="col-span-12 xl:col-span-4">
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="mb-8 flex items-center gap-3">
                            <AlertCircle className="text-orange-500" />

                            <h2 className="text-2xl font-bold">Alert Center</h2>
                        </div>

                        <div className="space-y-4">
                            {[
                                "12 memberships expire today",
                                "4 pending payments",
                                "2 PT sessions cancelled",
                                "7 leads require follow-up",
                            ].map((alert) => (
                                <div
                                    key={alert}
                                    className="rounded-2xl border border-orange-100 bg-orange-50 p-4"
                                >
                                    {alert}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* =====================================================
            ==================== ACTIVITY STREAM ==================
            ===================================================== */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-8 flex items-center gap-3">
                    <Activity className="text-indigo-600" />

                    <h2 className="text-2xl font-bold">Live Activity Feed</h2>
                </div>

                <div className="space-y-5">
                    {[
                        {
                            time: "07:15 AM",
                            title: "Rahul Sharma checked in",
                            subtitle: "Gold membership",
                        },
                        {
                            time: "08:05 AM",
                            title: "New membership created",
                            subtitle: "Premium package",
                        },
                        {
                            time: "09:12 AM",
                            title: "Invoice generated",
                            subtitle: "₹8,500 received",
                        },
                        {
                            time: "10:45 AM",
                            title: "Lead assigned",
                            subtitle: "Assigned to Amit",
                        },
                        {
                            time: "12:20 PM",
                            title: "Membership renewed",
                            subtitle: "6-month plan",
                        },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="flex gap-5 rounded-2xl border border-slate-100 p-5"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                                <Clock size={18} />
                            </div>

                            <div className="flex-1">
                                <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                                    <div>
                                        <h3 className="font-semibold">{item.title}</h3>

                                        <p className="text-sm text-slate-500">{item.subtitle}</p>
                                    </div>

                                    <span className="text-sm text-slate-500">{item.time}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* =====================================================
            ================== PAYMENT ANALYTICS ==================
            ===================================================== */}

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 xl:col-span-5">
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-8 text-2xl font-bold">Payment Methods</h2>

                        <div className="space-y-5">
                            {[
                                {
                                    label: "UPI",
                                    value: "58%",
                                },
                                {
                                    label: "Cash",
                                    value: "22%",
                                },
                                {
                                    label: "Card",
                                    value: "12%",
                                },
                                {
                                    label: "Bank Transfer",
                                    value: "8%",
                                },
                            ].map((item) => (
                                <div key={item.label}>
                                    <div className="mb-3 flex justify-between">
                                        <span>{item.label}</span>

                                        <span>{item.value}</span>
                                    </div>

                                    <div className="h-3 rounded-full bg-slate-100">
                                        <div
                                            className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
                                            style={{
                                                width: item.value,
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* STAFF ACTIVITIES */}

                <div className="col-span-12 xl:col-span-7">
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-8 text-2xl font-bold">Staff Activities</h2>

                        <div className="space-y-4">
                            {[
                                {
                                    name: "Amit",
                                    task: "Lead follow-up completed",
                                    count: "24",
                                },
                                {
                                    name: "Rahul",
                                    task: "Membership renewals",
                                    count: "18",
                                },
                                {
                                    name: "Neha",
                                    task: "New registrations",
                                    count: "16",
                                },
                                {
                                    name: "Priya",
                                    task: "Invoice creation",
                                    count: "14",
                                },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between rounded-2xl border border-slate-100 p-5"
                                >
                                    <div>
                                        <h3 className="font-semibold">{item.name}</h3>

                                        <p className="text-sm text-slate-500">{item.task}</p>
                                    </div>

                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 font-semibold">
                                        {item.count}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* =====================================================
            ===================== AI INSIGHTS =====================
            ===================================================== */}

            <div className="overflow-hidden rounded-3xl">
                <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-8 text-white">
                    <h2 className="mb-8 text-3xl font-bold">AI Recommendations</h2>

                    <div className="grid grid-cols-12 gap-5">
                        {[
                            "Peak attendance starts at 6 PM.",
                            "UPI remains the most preferred payment method.",
                            "Seven leads require immediate follow-up.",
                            "Renewal conversion increased by 8%.",
                        ].map((item, index) => (
                            <div key={index} className="col-span-12 md:col-span-6 xl:col-span-3">
                                <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
                                    <p className="leading-7">{item}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
