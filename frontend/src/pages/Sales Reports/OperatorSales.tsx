import {
    ArrowUpRight,
    BadgeIndianRupee,
    Crown,
    Target,
    TrendingUp,
    Users,
} from "lucide-react";

const cards = [
    {
        title: "Total Revenue",
        value: "₹12.4L",
        growth: "+18%",
        icon: BadgeIndianRupee,
    },
    {
        title: "Leads Converted",
        value: "428",
        growth: "+12%",
        icon: Users,
    },
    {
        title: "Renewal Rate",
        value: "84%",
        growth: "+9%",
        icon: TrendingUp,
    },
    {
        title: "Top Performer",
        value: "Amit",
        growth: "+24%",
        icon: Crown,
    },
];

export default function OperatorSales() {
    return (
        <div className="space-y-6">
            {/* HERO */}

            <div className="rounded-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 p-8 text-white shadow-xl">
                <div>
                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
                        <Target size={30} />
                    </div>

                    <h1 className="text-4xl font-bold">Operator Sales</h1>

                    <p className="mt-3 max-w-2xl text-purple-100">
                        Track sales performance, lead conversion, targets, commissions, renewals,
                        and overall revenue contribution.
                    </p>
                </div>
            </div>

            {/* FILTERS */}

            <div className="rounded-3xl border border-gray-200 bg-white p-6">
                <div className="grid grid-cols-12 gap-4">
                    <input
                        placeholder="Search operator"
                        className="col-span-12 rounded-2xl border p-3 lg:col-span-4"
                    />

                    <input
                        type="date"
                        className="col-span-12 rounded-2xl border p-3 lg:col-span-3"
                    />

                    <select className="col-span-12 rounded-2xl border p-3 lg:col-span-2">
                        <option>All Operators</option>
                        <option>Sales Team</option>
                        <option>Front Desk</option>
                        <option>Managers</option>
                    </select>

                    <button className="col-span-12 rounded-2xl bg-purple-600 p-3 font-semibold text-white lg:col-span-3">
                        Export Report
                    </button>
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
                                            <ArrowUpRight size={16} className="text-green-600" />

                                            <span className="font-medium text-green-600">
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
            ================== OPERATOR OVERVIEW ==================
            ===================================================== */}

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 xl:col-span-8">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold">Operator Overview</h2>

                            <p className="mt-2 text-sm text-gray-500">
                                Revenue, conversions, and customer acquisition performance.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
                            <div className="rounded-2xl bg-gray-50 p-5">
                                <p className="text-sm text-gray-500">Revenue</p>

                                <h3 className="mt-3 text-3xl font-bold">₹12.4L</h3>
                            </div>

                            <div className="rounded-2xl bg-gray-50 p-5">
                                <p className="text-sm text-gray-500">Leads</p>

                                <h3 className="mt-3 text-3xl font-bold">624</h3>
                            </div>

                            <div className="rounded-2xl bg-gray-50 p-5">
                                <p className="text-sm text-gray-500">Conversions</p>

                                <h3 className="mt-3 text-3xl font-bold">428</h3>
                            </div>

                            <div className="rounded-2xl bg-gray-50 p-5">
                                <p className="text-sm text-gray-500">Renewals</p>

                                <h3 className="mt-3 text-3xl font-bold">348</h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* REVENUE CONTRIBUTION */}

                <div className="col-span-12 xl:col-span-4">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-8 text-2xl font-bold">Revenue Contribution</h2>

                        <div className="space-y-5">
                            {[
                                {
                                    name: "Amit",
                                    value: "82%",
                                },
                                {
                                    name: "Rahul",
                                    value: "74%",
                                },
                                {
                                    name: "Neha",
                                    value: "63%",
                                },
                                {
                                    name: "Priya",
                                    value: "52%",
                                },
                            ].map((item, index) => (
                                <div key={index}>
                                    <div className="mb-3 flex justify-between">
                                        <span>{item.name}</span>

                                        <span>{item.value}</span>
                                    </div>

                                    <div className="h-3 rounded-full bg-gray-100">
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
            ================= LEAD CONVERSION =====================
            ===================================================== */}

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 lg:col-span-6">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-8 text-2xl font-bold">Lead Conversion Analysis</h2>

                        <div className="space-y-4">
                            {[
                                {
                                    stage: "New Leads",
                                    value: "624",
                                },
                                {
                                    stage: "Follow Ups",
                                    value: "512",
                                },
                                {
                                    stage: "Trial Members",
                                    value: "463",
                                },
                                {
                                    stage: "Converted",
                                    value: "428",
                                },
                            ].map((item, index) => (
                                <div key={index} className="rounded-2xl border border-gray-100 p-5">
                                    <div className="flex justify-between">
                                        <span>{item.stage}</span>

                                        <span className="font-bold">{item.value}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* TARGET TRACKING */}

                <div className="col-span-12 lg:col-span-6">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-8 text-2xl font-bold">Sales Target Tracking</h2>

                        <div className="space-y-5">
                            {[
                                {
                                    name: "Amit",
                                    value: "92%",
                                },
                                {
                                    name: "Rahul",
                                    value: "84%",
                                },
                                {
                                    name: "Neha",
                                    value: "76%",
                                },
                                {
                                    name: "Priya",
                                    value: "68%",
                                },
                            ].map((item, index) => (
                                <div key={index}>
                                    <div className="mb-3 flex justify-between">
                                        <span>{item.name}</span>

                                        <span>{item.value}</span>
                                    </div>

                                    <div className="h-3 rounded-full bg-gray-100">
                                        <div
                                            className="h-3 rounded-full bg-fuchsia-500"
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
            ================= FOLLOW-UP PERFORMANCE ===============
            ===================================================== */}

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 lg:col-span-6">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-8 text-2xl font-bold">Follow-Up Performance</h2>

                        <div className="space-y-5">
                            {[
                                {
                                    name: "Amit",
                                    completed: "248",
                                    percentage: "92%",
                                },
                                {
                                    name: "Rahul",
                                    completed: "214",
                                    percentage: "84%",
                                },
                                {
                                    name: "Neha",
                                    completed: "182",
                                    percentage: "76%",
                                },
                                {
                                    name: "Priya",
                                    completed: "165",
                                    percentage: "68%",
                                },
                            ].map((item, index) => (
                                <div key={index}>
                                    <div className="mb-3 flex items-center justify-between">
                                        <div>
                                            <h3 className="font-semibold">{item.name}</h3>

                                            <p className="text-sm text-gray-500">
                                                {item.completed} completed
                                            </p>
                                        </div>

                                        <span className="font-bold">{item.percentage}</span>
                                    </div>

                                    <div className="h-3 rounded-full bg-gray-100">
                                        <div
                                            className="h-3 rounded-full bg-violet-500"
                                            style={{
                                                width: item.percentage,
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RENEWAL PERFORMANCE */}

                <div className="col-span-12 lg:col-span-6">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-8 text-2xl font-bold">Renewal Performance</h2>

                        <div className="space-y-4">
                            {[
                                {
                                    name: "Amit",
                                    renewals: "84",
                                },
                                {
                                    name: "Rahul",
                                    renewals: "72",
                                },
                                {
                                    name: "Neha",
                                    renewals: "65",
                                },
                                {
                                    name: "Priya",
                                    renewals: "54",
                                },
                            ].map((item, index) => (
                                <div key={index} className="rounded-2xl border border-gray-100 p-5">
                                    <div className="flex items-center justify-between">
                                        <span>{item.name}</span>

                                        <span className="font-bold text-green-600">
                                            {item.renewals}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* =====================================================
            ================= COMMISSION ANALYSIS =================
            ===================================================== */}

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 xl:col-span-7">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-8 text-2xl font-bold">Commission Analysis</h2>

                        <div className="space-y-4">
                            {[
                                {
                                    name: "Amit",
                                    revenue: "₹3.2L",
                                    commission: "₹18,000",
                                },
                                {
                                    name: "Rahul",
                                    revenue: "₹2.8L",
                                    commission: "₹14,500",
                                },
                                {
                                    name: "Neha",
                                    revenue: "₹2.2L",
                                    commission: "₹12,000",
                                },
                                {
                                    name: "Priya",
                                    revenue: "₹1.6L",
                                    commission: "₹8,500",
                                },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between rounded-2xl border border-gray-100 p-5"
                                >
                                    <div>
                                        <h3 className="font-semibold">{item.name}</h3>

                                        <p className="text-sm text-gray-500">{item.revenue}</p>
                                    </div>

                                    <span className="font-bold text-purple-600">
                                        {item.commission}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* LEADERBOARD */}

                <div className="col-span-12 xl:col-span-5">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-8 text-2xl font-bold">Leaderboard</h2>

                        <div className="space-y-4">
                            {[
                                {
                                    rank: "#1",
                                    name: "Amit",
                                    revenue: "₹3.2L",
                                },
                                {
                                    rank: "#2",
                                    name: "Rahul",
                                    revenue: "₹2.8L",
                                },
                                {
                                    rank: "#3",
                                    name: "Neha",
                                    revenue: "₹2.2L",
                                },
                                {
                                    rank: "#4",
                                    name: "Priya",
                                    revenue: "₹1.6L",
                                },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between rounded-2xl bg-purple-50 p-5"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 font-bold text-white">
                                            {item.rank}
                                        </div>

                                        <div>
                                            <h3 className="font-semibold">{item.name}</h3>

                                            <p className="text-sm text-gray-500">Top performer</p>
                                        </div>
                                    </div>

                                    <span className="font-bold">{item.revenue}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* =====================================================
            ====================== AI INSIGHTS ====================
            ===================================================== */}

            <div className="rounded-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 p-8 text-white shadow-xl">
                <h2 className="mb-8 text-3xl font-bold">AI Operator Insights</h2>

                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 md:col-span-6 xl:col-span-3">
                        <div className="rounded-2xl bg-white/10 p-5">
                            <h3 className="font-semibold">Top Performer</h3>

                            <p className="mt-3 text-xl font-bold">Amit Sharma</p>
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-6 xl:col-span-3">
                        <div className="rounded-2xl bg-white/10 p-5">
                            <h3 className="font-semibold">Highest Conversion</h3>

                            <p className="mt-3 text-xl font-bold">92%</p>
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-6 xl:col-span-3">
                        <div className="rounded-2xl bg-white/10 p-5">
                            <h3 className="font-semibold">Risk Indicator</h3>

                            <p className="mt-3 text-xl font-bold">Follow-Ups Declining</p>
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-6 xl:col-span-3">
                        <div className="rounded-2xl bg-white/10 p-5">
                            <h3 className="font-semibold">Recommendation</h3>

                            <p className="mt-3 text-xl font-bold">Improve Lead Response</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}