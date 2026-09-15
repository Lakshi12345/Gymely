import {
    ArrowUpRight,
    Banknote,
    CreditCard,
    DollarSign,
    IndianRupee,
    TrendingUp,
} from "lucide-react";

const cards = [
    {
        title: "Revenue",
        value: "₹8.4L",
        growth: "+18%",
        icon: IndianRupee,
    },
    {
        title: "Profit",
        value: "₹5.6L",
        growth: "+12%",
        icon: TrendingUp,
    },
    {
        title: "Collections",
        value: "₹7.9L",
        growth: "+8%",
        icon: CreditCard,
    },
    {
        title: "Outstanding",
        value: "₹84K",
        growth: "-5%",
        icon: Banknote,
    },
];

export default function BusinessInsights() {
    return (
        <div className="space-y-6">
            {/* HERO */}

            <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 p-8 text-white shadow-xl">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
                            <DollarSign size={32} />
                        </div>

                        <h1 className="text-4xl font-bold">Business Insights</h1>

                        <p className="mt-3 max-w-2xl text-green-100">
                            Analyze revenue, collections, expenses, renewals, profitability, and
                            growth trends across your entire business.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button className="rounded-2xl bg-white px-5 py-3 font-semibold text-gray-900">
                            Export Report
                        </button>

                        <button className="rounded-2xl border border-white/20 bg-white/10 px-5 py-3">
                            Generate PDF
                        </button>
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
                                            <ArrowUpRight size={16} className="text-green-600" />

                                            <span className="font-medium text-green-600">
                                                {card.growth}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="rounded-2xl bg-green-50 p-4">
                                        <Icon size={28} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* REVENUE SECTION */}

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 xl:col-span-8">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold">Revenue Overview</h2>

                            <p className="mt-2 text-sm text-gray-500">
                                Financial performance across all channels.
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

                                <h3 className="mt-3 text-3xl font-bold">₹96L</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 xl:col-span-4">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-6 text-xl font-bold">Collection Summary</h2>

                        <div className="space-y-5">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500">Cash</span>

                                <span className="font-semibold">₹2.4L</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-gray-500">UPI</span>

                                <span className="font-semibold">₹3.6L</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-gray-500">Card</span>

                                <span className="font-semibold">₹1.2L</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-gray-500">Online</span>

                                <span className="font-semibold">₹68K</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-gray-500">Outstanding</span>

                                <span className="font-semibold text-red-500">₹84K</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* =======================================================
            ================= EXPENSE ANALYSIS =======================
            ======================================================= */}

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 lg:col-span-6">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-6 text-2xl font-bold">Expense Analysis</h2>

                        <div className="space-y-5">
                            <div className="rounded-2xl bg-gray-50 p-5">
                                <div className="mb-2 flex justify-between">
                                    <span>Rent</span>

                                    <span>₹1.2L</span>
                                </div>

                                <div className="h-3 rounded-full bg-gray-200">
                                    <div className="h-3 w-[82%] rounded-full bg-red-500" />
                                </div>
                            </div>

                            <div className="rounded-2xl bg-gray-50 p-5">
                                <div className="mb-2 flex justify-between">
                                    <span>Salary</span>

                                    <span>₹95K</span>
                                </div>

                                <div className="h-3 rounded-full bg-gray-200">
                                    <div className="h-3 w-[65%] rounded-full bg-blue-500" />
                                </div>
                            </div>

                            <div className="rounded-2xl bg-gray-50 p-5">
                                <div className="mb-2 flex justify-between">
                                    <span>Marketing</span>

                                    <span>₹40K</span>
                                </div>

                                <div className="h-3 rounded-full bg-gray-200">
                                    <div className="h-3 w-[45%] rounded-full bg-purple-500" />
                                </div>
                            </div>

                            <div className="rounded-2xl bg-gray-50 p-5">
                                <div className="mb-2 flex justify-between">
                                    <span>Maintenance</span>

                                    <span>₹18K</span>
                                </div>

                                <div className="h-3 rounded-full bg-gray-200">
                                    <div className="h-3 w-[22%] rounded-full bg-orange-500" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* MEMBERSHIP PERFORMANCE */}

                <div className="col-span-12 lg:col-span-6">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-6 text-2xl font-bold">Membership Performance</h2>

                        <div className="space-y-5">
                            <div className="rounded-2xl border border-gray-100 p-5">
                                <div className="mb-2 flex justify-between">
                                    <span>Gold Membership</span>

                                    <span>82%</span>
                                </div>

                                <div className="h-3 rounded-full bg-gray-200">
                                    <div className="h-3 w-[82%] rounded-full bg-yellow-500" />
                                </div>
                            </div>

                            <div className="rounded-2xl border border-gray-100 p-5">
                                <div className="mb-2 flex justify-between">
                                    <span>Silver Membership</span>

                                    <span>67%</span>
                                </div>

                                <div className="h-3 rounded-full bg-gray-200">
                                    <div className="h-3 w-[67%] rounded-full bg-blue-500" />
                                </div>
                            </div>

                            <div className="rounded-2xl border border-gray-100 p-5">
                                <div className="mb-2 flex justify-between">
                                    <span>Personal Training</span>

                                    <span>58%</span>
                                </div>

                                <div className="h-3 rounded-full bg-gray-200">
                                    <div className="h-3 w-[58%] rounded-full bg-green-500" />
                                </div>
                            </div>

                            <div className="rounded-2xl border border-gray-100 p-5">
                                <div className="mb-2 flex justify-between">
                                    <span>CrossFit</span>

                                    <span>37%</span>
                                </div>

                                <div className="h-3 rounded-full bg-gray-200">
                                    <div className="h-3 w-[37%] rounded-full bg-purple-500" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* =======================================================
====================== LEAD FUNNEL ========================
======================================================= */}

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 xl:col-span-7">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold">Lead Conversion Funnel</h2>

                            <p className="mt-2 text-sm text-gray-500">
                                Track the customer acquisition journey.
                            </p>
                        </div>

                        <div className="space-y-5">
                            {[
                                {
                                    title: "Leads Generated",
                                    value: "842",
                                    width: "100%",
                                },
                                {
                                    title: "Calls Completed",
                                    value: "714",
                                    width: "85%",
                                },
                                {
                                    title: "Visits Scheduled",
                                    value: "536",
                                    width: "65%",
                                },
                                {
                                    title: "Trial Sessions",
                                    value: "328",
                                    width: "45%",
                                },
                                {
                                    title: "Converted Members",
                                    value: "186",
                                    width: "28%",
                                },
                            ].map((item, index) => (
                                <div key={index} className="rounded-2xl border border-gray-100 p-5">
                                    <div className="mb-3 flex justify-between">
                                        <span className="font-medium">{item.title}</span>

                                        <span className="font-bold">{item.value}</span>
                                    </div>

                                    <div className="h-3 rounded-full bg-gray-100">
                                        <div
                                            className="h-3 rounded-full bg-emerald-500"
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

                {/* REVENUE SOURCES */}

                <div className="col-span-12 xl:col-span-5">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-8 text-2xl font-bold">Revenue Sources</h2>

                        <div className="space-y-5">
                            <div className="rounded-2xl bg-yellow-50 p-5">
                                <div className="flex justify-between">
                                    <span>Memberships</span>

                                    <span className="font-bold">42%</span>
                                </div>
                            </div>

                            <div className="rounded-2xl bg-blue-50 p-5">
                                <div className="flex justify-between">
                                    <span>Personal Training</span>

                                    <span className="font-bold">26%</span>
                                </div>
                            </div>

                            <div className="rounded-2xl bg-purple-50 p-5">
                                <div className="flex justify-between">
                                    <span>Products</span>

                                    <span className="font-bold">18%</span>
                                </div>
                            </div>

                            <div className="rounded-2xl bg-green-50 p-5">
                                <div className="flex justify-between">
                                    <span>Supplements</span>

                                    <span className="font-bold">14%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* =======================================================
==================== RENEWAL ANALYSIS =====================
======================================================= */}

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 lg:col-span-6">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-6 text-2xl font-bold">Renewal Analysis</h2>

                        <div className="space-y-5">
                            <div className="flex justify-between">
                                <span>Total Renewals</span>

                                <span className="font-bold">348</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Renewal Rate</span>

                                <span className="font-bold">91%</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Auto Renewals</span>

                                <span className="font-bold">126</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Lost Renewals</span>

                                <span className="font-bold text-red-500">18</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* OUTSTANDING PAYMENTS */}

                <div className="col-span-12 lg:col-span-6">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-6 text-2xl font-bold">Outstanding Payments</h2>

                        <div className="space-y-5">
                            <div className="rounded-2xl border border-red-100 p-5">
                                <div className="flex justify-between">
                                    <span>0–7 Days</span>

                                    <span>₹12,500</span>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-orange-100 p-5">
                                <div className="flex justify-between">
                                    <span>8–15 Days</span>

                                    <span>₹21,300</span>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-yellow-100 p-5">
                                <div className="flex justify-between">
                                    <span>16–30 Days</span>

                                    <span>₹34,800</span>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-red-200 p-5">
                                <div className="flex justify-between">
                                    <span>30+ Days</span>

                                    <span>₹15,400</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* =======================================================
======================= AI INSIGHTS =======================
======================================================= */}

            <div className="rounded-3xl bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 p-8 text-white shadow-xl">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold">AI Business Insights</h2>

                    <p className="mt-2 text-green-100">
                        Smart recommendations generated from revenue, attendance, renewals,
                        expenses, and customer activity.
                    </p>
                </div>

                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 md:col-span-6 xl:col-span-3">
                        <div className="rounded-2xl bg-white/10 p-5">
                            <h3 className="font-semibold">Best Package</h3>

                            <p className="mt-3 text-xl font-bold">Gold Membership</p>
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-6 xl:col-span-3">
                        <div className="rounded-2xl bg-white/10 p-5">
                            <h3 className="font-semibold">Highest Revenue</h3>

                            <p className="mt-3 text-xl font-bold">Personal Training</p>
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-6 xl:col-span-3">
                        <div className="rounded-2xl bg-white/10 p-5">
                            <h3 className="font-semibold">Risk Alert</h3>

                            <p className="mt-3 text-xl font-bold">Rising Expenses</p>
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-6 xl:col-span-3">
                        <div className="rounded-2xl bg-white/10 p-5">
                            <h3 className="font-semibold">Growth Area</h3>

                            <p className="mt-3 text-xl font-bold">PT Memberships</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* =======================================================
=================== GROWTH OPPORTUNITIES ==================
======================================================= */}

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 xl:col-span-6">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-6 text-2xl font-bold">Growth Opportunities</h2>

                        <div className="space-y-4">
                            <div className="rounded-2xl bg-gray-50 p-5">
                                Weekend campaigns increase conversions by 22%.
                            </div>

                            <div className="rounded-2xl bg-gray-50 p-5">
                                Personal training demand increased by 18%.
                            </div>

                            <div className="rounded-2xl bg-gray-50 p-5">
                                Annual memberships generate higher retention.
                            </div>

                            <div className="rounded-2xl bg-gray-50 p-5">
                                Evening batches have maximum occupancy.
                            </div>
                        </div>
                    </div>
                </div>

                {/* TOP PERFORMERS */}

                <div className="col-span-12 xl:col-span-6">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-6 text-2xl font-bold">Top Performers</h2>

                        <div className="space-y-4">
                            {["Rahul Sharma", "Aman Kumar", "Priya Singh", "Rohit Das"].map(
                                (name, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between rounded-2xl border border-gray-100 p-4"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white">
                                                {index + 1}
                                            </div>

                                            <span className="font-medium">{name}</span>
                                        </div>

                                        <span className="font-bold">₹{85 - index * 8}K</span>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* =======================================================
================== RECENT TRANSACTIONS ====================
======================================================= */}

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-2xl font-bold">Recent Transactions</h2>

                <div className="space-y-4">
                    {[
                        {
                            name: "Rahul Sharma",
                            amount: "₹2,500",
                            status: "Completed",
                        },
                        {
                            name: "Priya Singh",
                            amount: "₹8,000",
                            status: "Completed",
                        },
                        {
                            name: "Amit Kumar",
                            amount: "₹1,500",
                            status: "Pending",
                        },
                        {
                            name: "Rohit Das",
                            amount: "₹5,500",
                            status: "Completed",
                        },
                    ].map((transaction, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between rounded-2xl border border-gray-100 p-5"
                        >
                            <div>
                                <h3 className="font-semibold">{transaction.name}</h3>

                                <p className="mt-1 text-sm text-gray-500">Membership payment</p>
                            </div>

                            <div className="text-right">
                                <h3 className="font-bold">{transaction.amount}</h3>

                                <p className="text-sm text-green-600">{transaction.status}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
