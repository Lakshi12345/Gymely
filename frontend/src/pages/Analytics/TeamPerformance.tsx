import { Activity, ArrowUpRight, BadgeIndianRupee, Target, Trophy, Users } from "lucide-react";

const cards = [
    {
        title: "Active Staff",
        value: "28",
        growth: "+8%",
        icon: Users,
    },
    {
        title: "Revenue Generated",
        value: "₹8.4L",
        growth: "+14%",
        icon: BadgeIndianRupee,
    },
    {
        title: "Lead Conversion",
        value: "74%",
        growth: "+6%",
        icon: Target,
    },
    {
        title: "Top Performer",
        value: "Aman",
        growth: "+12%",
        icon: Trophy,
    },
];

export default function TeamPerformance() {
    return (
        <div className="space-y-6">
            {/* HERO */}

            <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-violet-700 via-purple-700 to-fuchsia-700 p-8 text-white shadow-xl">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
                            <Activity size={30} />
                        </div>

                        <h1 className="text-4xl font-bold">Team Performance</h1>

                        <p className="mt-3 max-w-2xl text-purple-100">
                            Monitor staff productivity, lead conversion, attendance, revenue
                            generation, and overall business contribution.
                        </p>
                    </div>
                </div>
            </div>

            {/* KPI CARDS */}

            <div className="grid grid-cols-12 gap-6">
                {cards.map((card, index) => {
                    const Icon = card.icon;

                    return (
                        <div key={index} className="col-span-12 md:col-span-6 xl:col-span-3">
                            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">{card.title}</p>

                                        <h2 className="mt-3 text-4xl font-bold">{card.value}</h2>

                                        <div className="mt-3 flex items-center gap-2">
                                            <ArrowUpRight size={16} className="text-green-500" />

                                            <span className="font-medium text-green-500">
                                                {card.growth}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="rounded-2xl bg-purple-50 p-4">
                                        <Icon size={28} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* =====================================================
            ===================== TEAM OVERVIEW ====================
            ===================================================== */}

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 xl:col-span-7">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold">Team Overview</h2>

                            <p className="mt-2 text-sm text-gray-500">
                                Performance across all departments.
                            </p>
                        </div>

                        <div className="space-y-5">
                            {[
                                {
                                    name: "Rahul Sharma",
                                    role: "Manager",
                                    revenue: "₹1.8L",
                                },
                                {
                                    name: "Aman Kumar",
                                    role: "Sales Executive",
                                    revenue: "₹1.5L",
                                },
                                {
                                    name: "Priya Singh",
                                    role: "Trainer",
                                    revenue: "₹1.2L",
                                },
                                {
                                    name: "Rohit Das",
                                    role: "Operator",
                                    revenue: "₹95K",
                                },
                            ].map((staff, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between rounded-2xl border border-gray-100 p-5"
                                >
                                    <div>
                                        <h3 className="font-semibold">{staff.name}</h3>

                                        <p className="text-sm text-gray-500">{staff.role}</p>
                                    </div>

                                    <div className="text-right">
                                        <p className="font-bold">{staff.revenue}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* SALES PERFORMANCE */}

                <div className="col-span-12 xl:col-span-5">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-8 text-2xl font-bold">Sales Performance</h2>

                        <div className="space-y-5">
                            {[
                                {
                                    title: "Membership Sales",
                                    value: "78%",
                                },
                                {
                                    title: "Renewals",
                                    value: "86%",
                                },
                                {
                                    title: "PT Packages",
                                    value: "64%",
                                },
                                {
                                    title: "Supplement Sales",
                                    value: "52%",
                                },
                            ].map((item, index) => (
                                <div key={index}>
                                    <div className="mb-3 flex justify-between">
                                        <span>{item.title}</span>

                                        <span>{item.value}</span>
                                    </div>

                                    <div className="h-3 rounded-full bg-gray-200">
                                        <div
                                            className="h-3 rounded-full bg-purple-500"
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
            </div>

            {/* =====================================================
            ================== LEAD CONVERSION ====================
            ===================================================== */}

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 lg:col-span-6">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-8 text-2xl font-bold">Lead Conversion Funnel</h2>

                        <div className="space-y-5">
                            {[
                                {
                                    title: "New Leads",
                                    count: "842",
                                    width: "100%",
                                },
                                {
                                    title: "Contacted",
                                    count: "736",
                                    width: "85%",
                                },
                                {
                                    title: "Visits",
                                    count: "514",
                                    width: "65%",
                                },
                                {
                                    title: "Trials",
                                    count: "286",
                                    width: "40%",
                                },
                                {
                                    title: "Conversions",
                                    count: "168",
                                    width: "25%",
                                },
                            ].map((item, index) => (
                                <div key={index} className="rounded-2xl border border-gray-100 p-5">
                                    <div className="mb-3 flex justify-between">
                                        <span>{item.title}</span>

                                        <span>{item.count}</span>
                                    </div>

                                    <div className="h-3 rounded-full bg-gray-100">
                                        <div
                                            className="h-3 rounded-full bg-violet-500"
                                            style={{
                                                width: item.width,
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* FOLLOW-UP ANALYSIS */}

                <div className="col-span-12 lg:col-span-6">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-8 text-2xl font-bold">Follow-Up Analysis</h2>

                        <div className="space-y-4">
                            <div className="rounded-2xl bg-gray-50 p-5">Calls completed — 624</div>

                            <div className="rounded-2xl bg-gray-50 p-5">Messages sent — 482</div>

                            <div className="rounded-2xl bg-gray-50 p-5">
                                Appointments scheduled — 328
                            </div>

                            <div className="rounded-2xl bg-gray-50 p-5">
                                Successful conversions — 186
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* =====================================================
            ==================== PT PERFORMANCE ====================
            ===================================================== */}

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 lg:col-span-6">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-8 text-2xl font-bold">Personal Training Sessions</h2>

                        <div className="space-y-4">
                            {[
                                {
                                    name: "Rahul Sharma",
                                    sessions: "84",
                                    revenue: "₹48K",
                                },
                                {
                                    name: "Priya Singh",
                                    sessions: "76",
                                    revenue: "₹42K",
                                },
                                {
                                    name: "Aman Kumar",
                                    sessions: "62",
                                    revenue: "₹38K",
                                },
                                {
                                    name: "Rohit Das",
                                    sessions: "51",
                                    revenue: "₹31K",
                                },
                            ].map((trainer, index) => (
                                <div key={index} className="rounded-2xl border border-gray-100 p-5">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-semibold">{trainer.name}</h3>

                                            <p className="text-sm text-gray-500">
                                                {trainer.sessions} sessions
                                            </p>
                                        </div>

                                        <span className="font-bold">{trainer.revenue}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* REVENUE CONTRIBUTION */}

                <div className="col-span-12 lg:col-span-6">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-8 text-2xl font-bold">Revenue Contribution</h2>

                        <div className="space-y-5">
                            {[
                                {
                                    name: "Aman Kumar",
                                    value: "92%",
                                },
                                {
                                    name: "Rahul Sharma",
                                    value: "84%",
                                },
                                {
                                    name: "Priya Singh",
                                    value: "76%",
                                },
                                {
                                    name: "Rohit Das",
                                    value: "58%",
                                },
                            ].map((item, index) => (
                                <div key={index}>
                                    <div className="mb-3 flex justify-between">
                                        <span>{item.name}</span>

                                        <span>{item.value}</span>
                                    </div>

                                    <div className="h-3 rounded-full bg-gray-100">
                                        <div
                                            className="h-3 rounded-full bg-purple-600"
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
            </div>

            {/* =====================================================
            ================= STAFF ATTENDANCE ====================
            ===================================================== */}

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 lg:col-span-6">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-8 text-2xl font-bold">Staff Attendance</h2>

                        <div className="space-y-4">
                            {["Rahul Sharma", "Aman Kumar", "Priya Singh", "Rohit Das"].map(
                                (staff, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between rounded-2xl border border-gray-100 p-5"
                                    >
                                        <span>{staff}</span>

                                        <span className="font-bold text-green-600">Present</span>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>

                {/* OPERATOR RANKING */}

                <div className="col-span-12 lg:col-span-6">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-8 text-2xl font-bold">Operator Ranking</h2>

                        <div className="space-y-4">
                            {[
                                {
                                    name: "Rahul Sharma",
                                    score: "98",
                                },
                                {
                                    name: "Aman Kumar",
                                    score: "94",
                                },
                                {
                                    name: "Priya Singh",
                                    score: "91",
                                },
                                {
                                    name: "Rohit Das",
                                    score: "88",
                                },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between rounded-2xl border border-gray-100 p-5"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 text-white">
                                            {index + 1}
                                        </div>

                                        <span>{item.name}</span>
                                    </div>

                                    <span className="font-bold">{item.score}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* =====================================================
            ================= INCENTIVE ANALYSIS ==================
            ===================================================== */}

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-8 text-2xl font-bold">Incentive Analysis</h2>

                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 md:col-span-4">
                        <div className="rounded-2xl bg-green-50 p-6">
                            <p className="text-sm text-gray-500">Total Incentives</p>

                            <h3 className="mt-3 text-3xl font-bold">₹84K</h3>
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-4">
                        <div className="rounded-2xl bg-blue-50 p-6">
                            <p className="text-sm text-gray-500">Highest Incentive</p>

                            <h3 className="mt-3 text-3xl font-bold">₹18K</h3>
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-4">
                        <div className="rounded-2xl bg-purple-50 p-6">
                            <p className="text-sm text-gray-500">Average Incentive</p>

                            <h3 className="mt-3 text-3xl font-bold">₹7K</h3>
                        </div>
                    </div>
                </div>
            </div>
            {/* =====================================================
            ================= TASK COMPLETION =====================
            ===================================================== */}

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 xl:col-span-6">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-8 text-2xl font-bold">Task Completion</h2>

                        <div className="space-y-5">
                            {[
                                {
                                    task: "Lead Follow-Up",
                                    value: "94%",
                                },
                                {
                                    task: "Membership Renewals",
                                    value: "88%",
                                },
                                {
                                    task: "Customer Support",
                                    value: "82%",
                                },
                                {
                                    task: "Payment Collection",
                                    value: "76%",
                                },
                            ].map((item, index) => (
                                <div key={index}>
                                    <div className="mb-3 flex justify-between">
                                        <span>{item.task}</span>

                                        <span className="font-semibold">{item.value}</span>
                                    </div>

                                    <div className="h-3 rounded-full bg-gray-100">
                                        <div
                                            className="h-3 rounded-full bg-violet-500"
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

                {/* ACHIEVEMENT BOARD */}

                <div className="col-span-12 xl:col-span-6">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-8 text-2xl font-bold">Achievement Board</h2>

                        <div className="space-y-4">
                            <div className="rounded-2xl bg-yellow-50 p-5">
                                🏆 Highest monthly revenue achieved
                            </div>

                            <div className="rounded-2xl bg-green-50 p-5">
                                🎯 Best lead conversion rate
                            </div>

                            <div className="rounded-2xl bg-blue-50 p-5">
                                ⚡ Fastest follow-up completion
                            </div>

                            <div className="rounded-2xl bg-purple-50 p-5">
                                ⭐ Highest customer satisfaction
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* =====================================================
            ================= RECENT ACTIVITIES ===================
            ===================================================== */}

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold">Recent Activities</h2>

                    <p className="mt-2 text-sm text-gray-500">
                        Track recent staff activities and achievements.
                    </p>
                </div>

                <div className="space-y-4">
                    {[
                        "Rahul Sharma converted a premium membership.",
                        "Aman Kumar completed 15 follow-up calls.",
                        "Priya Singh completed 8 PT sessions.",
                        "Rohit Das achieved the daily sales target.",
                    ].map((activity, index) => (
                        <div key={index} className="rounded-2xl border border-gray-100 p-5">
                            {activity}
                        </div>
                    ))}
                </div>
            </div>

            {/* =====================================================
            ====================== AI INSIGHTS ====================
            ===================================================== */}

            <div className="rounded-3xl bg-gradient-to-r from-violet-700 via-purple-700 to-fuchsia-700 p-8 text-white shadow-xl">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold">AI Performance Insights</h2>

                    <p className="mt-2 text-purple-100">
                        Performance recommendations generated using staff productivity, sales
                        activity, attendance, and customer engagement.
                    </p>
                </div>

                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 md:col-span-6 xl:col-span-3">
                        <div className="rounded-2xl bg-white/10 p-5">
                            <h3 className="font-semibold">Best Performer</h3>

                            <p className="mt-3 text-xl font-bold">Rahul Sharma</p>
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-6 xl:col-span-3">
                        <div className="rounded-2xl bg-white/10 p-5">
                            <h3 className="font-semibold">Highest Conversion</h3>

                            <p className="mt-3 text-xl font-bold">Aman Kumar</p>
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-6 xl:col-span-3">
                        <div className="rounded-2xl bg-white/10 p-5">
                            <h3 className="font-semibold">Improvement Area</h3>

                            <p className="mt-3 text-xl font-bold">Renewals</p>
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-6 xl:col-span-3">
                        <div className="rounded-2xl bg-white/10 p-5">
                            <h3 className="font-semibold">Recommendation</h3>

                            <p className="mt-3 text-xl font-bold">Increase PT Upselling</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
