import {
    Activity,
    ArrowUpRight,
    Calendar,
    CreditCard,
    IndianRupee,
    TrendingUp,
    Users,
} from "lucide-react";

const stats = [
    {
        title: "Total Members",
        value: "5,428",
        growth: "+12.4%",
        icon: Users,
    },
    {
        title: "Revenue",
        value: "₹8.4L",
        growth: "+8.2%",
        icon: IndianRupee,
    },
    {
        title: "Check-Ins",
        value: "421",
        growth: "+14.8%",
        icon: Activity,
    },
    {
        title: "Renewal Rate",
        value: "94%",
        growth: "+3.5%",
        icon: TrendingUp,
    },
];

export default function ExecutiveDashboard() {
    return (
        <div className="space-y-6">
            {/* HERO */}

            <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 via-blue-700 to-purple-700 p-8 text-white">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
                            <TrendingUp size={30} />
                        </div>

                        <h1 className="text-4xl font-bold">Executive Dashboard</h1>

                        <p className="mt-3 max-w-2xl text-blue-100">
                            Monitor members, revenue, attendance, renewals and operational
                            performance from one central dashboard.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button className="rounded-2xl bg-white px-5 py-3 font-semibold text-gray-900">
                            Export Report
                        </button>

                        <button className="rounded-2xl border border-white/30 bg-white/10 px-5 py-3">
                            Generate PDF
                        </button>
                    </div>
                </div>
            </div>

            {/* KPI CARDS */}

            <div className="grid grid-cols-12 gap-6">
                {stats.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <div key={index} className="col-span-12 md:col-span-6 xl:col-span-3">
                            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">{item.title}</p>

                                        <h2 className="mt-3 text-4xl font-bold">{item.value}</h2>

                                        <div className="mt-3 flex items-center gap-2">
                                            <ArrowUpRight size={16} className="text-green-500" />

                                            <span className="font-medium text-green-500">
                                                {item.growth}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="rounded-2xl bg-gray-100 p-4">
                                        <Icon size={28} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* =======================================================
            ================= REVENUE ANALYTICS ======================
            ======================================================= */}

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 xl:col-span-8">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold">Revenue Overview</h2>

                            <p className="mt-2 text-sm text-gray-500">
                                Revenue generated across all channels.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
                            <div className="rounded-2xl bg-gray-50 p-5">
                                <p className="text-sm text-gray-500">Today</p>

                                <h3 className="mt-3 text-3xl font-bold">₹18,420</h3>
                            </div>

                            <div className="rounded-2xl bg-gray-50 p-5">
                                <p className="text-sm text-gray-500">Weekly</p>

                                <h3 className="mt-3 text-3xl font-bold">₹1.42L</h3>
                            </div>

                            <div className="rounded-2xl bg-gray-50 p-5">
                                <p className="text-sm text-gray-500">Monthly</p>

                                <h3 className="mt-3 text-3xl font-bold">₹8.4L</h3>
                            </div>

                            <div className="rounded-2xl bg-gray-50 p-5">
                                <p className="text-sm text-gray-500">Yearly</p>

                                <h3 className="mt-3 text-3xl font-bold">₹98L</h3>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-12 xl:col-span-4">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-6 text-xl font-bold">Payment Summary</h2>

                        <div className="space-y-5">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500">Cash</span>

                                <span className="font-semibold">₹2.4L</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-gray-500">UPI</span>

                                <span className="font-semibold">₹3.2L</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-gray-500">Cards</span>

                                <span className="font-semibold">₹1.6L</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-gray-500">Pending</span>

                                <span className="font-semibold text-red-500">₹42,000</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* =======================================================
            ================= MEMBERSHIP OVERVIEW ====================
            ======================================================= */}

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 lg:col-span-6">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-6 text-xl font-bold">Membership Overview</h2>

                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span>Total Members</span>
                                <span className="font-semibold">5428</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Active Members</span>
                                <span className="font-semibold">5102</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Expired Members</span>
                                <span className="font-semibold">147</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Frozen Members</span>
                                <span className="font-semibold">32</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Transferred Members</span>
                                <span className="font-semibold">18</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-12 lg:col-span-6">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-6 text-xl font-bold">Attendance Overview</h2>

                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span>Today's Check-ins</span>
                                <span className="font-semibold">421</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Average Attendance</span>
                                <span className="font-semibold">376</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Peak Hour</span>
                                <span className="font-semibold">06:00 PM</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Weekly Attendance</span>
                                <span className="font-semibold">2,318</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Monthly Attendance</span>
                                <span className="font-semibold">8,982</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* =======================================================
            ================= PACKAGE ANALYTICS ======================
            ======================================================= */}

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 xl:col-span-7">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold">Package Analytics</h2>

                            <p className="mt-2 text-sm text-gray-500">
                                Most popular memberships and training plans.
                            </p>
                        </div>

                        <div className="space-y-5">
                            <div className="rounded-2xl border border-gray-100 p-5">
                                <div className="mb-3 flex items-center justify-between">
                                    <h3 className="font-semibold">Gold Membership</h3>

                                    <span>84%</span>
                                </div>

                                <div className="h-3 rounded-full bg-gray-100">
                                    <div className="h-3 w-[84%] rounded-full bg-yellow-500" />
                                </div>
                            </div>

                            <div className="rounded-2xl border border-gray-100 p-5">
                                <div className="mb-3 flex items-center justify-between">
                                    <h3 className="font-semibold">Personal Training</h3>

                                    <span>72%</span>
                                </div>

                                <div className="h-3 rounded-full bg-gray-100">
                                    <div className="h-3 w-[72%] rounded-full bg-blue-500" />
                                </div>
                            </div>

                            <div className="rounded-2xl border border-gray-100 p-5">
                                <div className="mb-3 flex items-center justify-between">
                                    <h3 className="font-semibold">Cardio Package</h3>

                                    <span>58%</span>
                                </div>

                                <div className="h-3 rounded-full bg-gray-100">
                                    <div className="h-3 w-[58%] rounded-full bg-green-500" />
                                </div>
                            </div>

                            <div className="rounded-2xl border border-gray-100 p-5">
                                <div className="mb-3 flex items-center justify-between">
                                    <h3 className="font-semibold">CrossFit Package</h3>

                                    <span>41%</span>
                                </div>

                                <div className="h-3 rounded-full bg-gray-100">
                                    <div className="h-3 w-[41%] rounded-full bg-purple-500" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* MEMBERSHIP EXPIRY */}

                <div className="col-span-12 xl:col-span-5">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-6 text-2xl font-bold">Membership Expiry</h2>

                        <div className="space-y-5">
                            <div className="rounded-2xl bg-red-50 p-5">
                                <div className="flex justify-between">
                                    <span>Today</span>

                                    <span className="font-bold">18</span>
                                </div>
                            </div>

                            <div className="rounded-2xl bg-orange-50 p-5">
                                <div className="flex justify-between">
                                    <span>Next 7 Days</span>

                                    <span className="font-bold">43</span>
                                </div>
                            </div>

                            <div className="rounded-2xl bg-blue-50 p-5">
                                <div className="flex justify-between">
                                    <span>Next 30 Days</span>

                                    <span className="font-bold">126</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* =======================================================
            ==================== QUICK ACTIONS =======================
            ======================================================= */}

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 xl:col-span-4">
                    <button className="w-full rounded-3xl border border-gray-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1">
                        <Users size={30} />

                        <h3 className="mt-4 text-xl font-bold">Add Member</h3>

                        <p className="mt-2 text-gray-500">Create a new membership profile.</p>
                    </button>
                </div>

                <div className="col-span-12 xl:col-span-4">
                    <button className="w-full rounded-3xl border border-gray-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1">
                        <CreditCard size={30} />

                        <h3 className="mt-4 text-xl font-bold">Create Invoice</h3>

                        <p className="mt-2 text-gray-500">Generate invoices and receipts.</p>
                    </button>
                </div>

                <div className="col-span-12 xl:col-span-4">
                    <button className="w-full rounded-3xl border border-gray-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1">
                        <Calendar size={30} />

                        <h3 className="mt-4 text-xl font-bold">Export Report</h3>

                        <p className="mt-2 text-gray-500">Download PDF and Excel reports.</p>
                    </button>
                </div>
            </div>
            {/* =======================================================
==================== RECENT ACTIVITY ======================
======================================================= */}

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 xl:col-span-7">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold">Recent Activity</h2>

                                <p className="mt-2 text-sm text-gray-500">
                                    Latest events across your gym.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {[
                                {
                                    title: "New member enrolled",
                                    name: "Rahul Sharma",
                                    time: "2 minutes ago",
                                },
                                {
                                    title: "Membership renewed",
                                    name: "Priya Verma",
                                    time: "15 minutes ago",
                                },
                                {
                                    title: "Payment collected",
                                    name: "Amit Kumar",
                                    time: "28 minutes ago",
                                },
                                {
                                    title: "Attendance recorded",
                                    name: "Sneha Singh",
                                    time: "42 minutes ago",
                                },
                            ].map((activity, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between rounded-2xl border border-gray-100 p-4"
                                >
                                    <div>
                                        <h3 className="font-semibold">{activity.title}</h3>

                                        <p className="mt-1 text-sm text-gray-500">
                                            {activity.name}
                                        </p>
                                    </div>

                                    <span className="text-sm text-gray-400">{activity.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* STAFF LEADERBOARD */}

                <div className="col-span-12 xl:col-span-5">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-6 text-2xl font-bold">Team Leaderboard</h2>

                        <div className="space-y-4">
                            {["Rohit Sharma", "Ankit Das", "Priya Singh", "Aditya Kumar"].map(
                                (name, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between rounded-2xl bg-gray-50 p-4"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
                                                {index + 1}
                                            </div>

                                            <span className="font-medium">{name}</span>
                                        </div>

                                        <span className="font-semibold">{120 - index * 12}</span>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* =======================================================
======================= AI INSIGHTS =======================
======================================================= */}

            <div className="rounded-3xl border border-gray-200 bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white shadow-lg">
                <h2 className="text-3xl font-bold">AI Insights</h2>

                <p className="mt-3 max-w-3xl text-indigo-100">
                    Member attendance is 18% higher than last month. Renewal rates have increased by
                    7%, while evening sessions continue to show the highest activity.
                </p>

                <div className="mt-8 grid grid-cols-12 gap-5">
                    <div className="col-span-12 md:col-span-4">
                        <div className="rounded-2xl bg-white/10 p-5">
                            <h3 className="font-semibold">Best Performing Package</h3>

                            <p className="mt-2 text-2xl font-bold">Gold Membership</p>
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-4">
                        <div className="rounded-2xl bg-white/10 p-5">
                            <h3 className="font-semibold">Peak Hour</h3>

                            <p className="mt-2 text-2xl font-bold">06:00 PM</p>
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-4">
                        <div className="rounded-2xl bg-white/10 p-5">
                            <h3 className="font-semibold">Recommended Action</h3>

                            <p className="mt-2 text-2xl font-bold">Launch Campaign</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
