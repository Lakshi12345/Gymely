import {
    ArrowUpRight,
    BadgeIndianRupee,
    CreditCard,
    FileText,
    ReceiptIndianRupee,
    Wallet,
} from "lucide-react";

const cards = [
    {
        title: "Total Billing",
        value: "₹8.4L",
        growth: "+18%",
        icon: BadgeIndianRupee,
    },
    {
        title: "Paid Invoices",
        value: "642",
        growth: "+12%",
        icon: FileText,
    },
    {
        title: "Pending Amount",
        value: "₹84K",
        growth: "+4%",
        icon: Wallet,
    },
    {
        title: "GST Collected",
        value: "₹42K",
        growth: "+8%",
        icon: ReceiptIndianRupee,
    },
];

export default function BillingReport() {
    return (
        <div className="space-y-6">
            {/* HERO */}

            <div className="rounded-3xl bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 p-8 text-white shadow-xl">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
                            <CreditCard size={30} />
                        </div>

                        <h1 className="text-4xl font-bold">Billing Report</h1>

                        <p className="mt-3 max-w-2xl text-orange-100">
                            Monitor invoices, GST collections, payment methods, discounts, refunds,
                            and outstanding payments.
                        </p>
                    </div>
                </div>
            </div>

            {/* FILTERS */}

            <div className="rounded-3xl border border-gray-200 bg-white p-6">
                <div className="grid grid-cols-12 gap-4">
                    <input
                        className="col-span-12 rounded-2xl border p-3 lg:col-span-3"
                        placeholder="Invoice number"
                    />

                    <input
                        type="date"
                        className="col-span-12 rounded-2xl border p-3 lg:col-span-3"
                    />

                    <select className="col-span-12 rounded-2xl border p-3 lg:col-span-3">
                        <option>All Status</option>
                        <option>Paid</option>
                        <option>Pending</option>
                        <option>Cancelled</option>
                    </select>

                    <button className="col-span-12 rounded-2xl bg-orange-600 p-3 font-semibold text-white lg:col-span-3">
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

                                    <div className="rounded-2xl bg-orange-50 p-4">
                                        <Icon size={28} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* =====================================================
            =================== INVOICE SUMMARY ===================
            ===================================================== */}

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 xl:col-span-8">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold">Invoice Summary</h2>

                            <p className="mt-2 text-sm text-gray-500">
                                Billing statistics across all invoices.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
                            <div className="rounded-2xl bg-gray-50 p-5">
                                <p className="text-sm text-gray-500">Today</p>

                                <h3 className="mt-3 text-3xl font-bold">₹18,400</h3>
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

                {/* PAYMENT ANALYSIS */}

                <div className="col-span-12 xl:col-span-4">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-8 text-2xl font-bold">Payment Analysis</h2>

                        <div className="space-y-5">
                            {[
                                {
                                    method: "Cash",
                                    value: "₹2.4L",
                                },
                                {
                                    method: "UPI",
                                    value: "₹3.8L",
                                },
                                {
                                    method: "Card",
                                    value: "₹1.4L",
                                },
                                {
                                    method: "Bank Transfer",
                                    value: "₹82K",
                                },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between rounded-2xl bg-gray-50 p-4"
                                >
                                    <span>{item.method}</span>

                                    <span className="font-semibold">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* =====================================================
            ===================== GST ANALYSIS ====================
            ===================================================== */}

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 lg:col-span-6">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-8 text-2xl font-bold">GST Analysis</h2>

                        <div className="space-y-5">
                            {[
                                {
                                    title: "Taxable Amount",
                                    amount: "₹6.8L",
                                },
                                {
                                    title: "CGST",
                                    amount: "₹21K",
                                },
                                {
                                    title: "SGST",
                                    amount: "₹21K",
                                },
                                {
                                    title: "Total GST",
                                    amount: "₹42K",
                                },
                            ].map((item, index) => (
                                <div key={index} className="rounded-2xl border border-gray-100 p-5">
                                    <div className="flex justify-between">
                                        <span>{item.title}</span>

                                        <span className="font-bold">{item.amount}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* DISCOUNT ANALYSIS */}

                <div className="col-span-12 lg:col-span-6">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-8 text-2xl font-bold">Discount Analysis</h2>

                        <div className="space-y-5">
                            {[
                                {
                                    name: "Festival Offer",
                                    value: "₹12K",
                                },
                                {
                                    name: "Coupon Discount",
                                    value: "₹8K",
                                },
                                {
                                    name: "Referral Offer",
                                    value: "₹6K",
                                },
                                {
                                    name: "Special Discount",
                                    value: "₹4K",
                                },
                            ].map((item, index) => (
                                <div key={index}>
                                    <div className="mb-3 flex justify-between">
                                        <span>{item.name}</span>

                                        <span>{item.value}</span>
                                    </div>

                                    <div className="h-3 rounded-full bg-gray-100">
                                        <div
                                            className="h-3 rounded-full bg-orange-500"
                                            style={{
                                                width: `${80 - index * 15}%`,
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
            ==================== REFUND ANALYSIS ==================
            ===================================================== */}

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 lg:col-span-6">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-8 text-2xl font-bold">Refund Analysis</h2>

                        <div className="space-y-5">
                            {[
                                {
                                    reason: "Membership Cancellation",
                                    amount: "₹12,500",
                                },
                                {
                                    reason: "Duplicate Payment",
                                    amount: "₹8,200",
                                },
                                {
                                    reason: "Package Transfer",
                                    amount: "₹4,600",
                                },
                                {
                                    reason: "Adjustment Entry",
                                    amount: "₹2,300",
                                },
                            ].map((item, index) => (
                                <div key={index} className="rounded-2xl border border-gray-100 p-5">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-semibold">{item.reason}</h3>

                                            <p className="text-sm text-gray-500">Refunded amount</p>
                                        </div>

                                        <span className="font-bold text-red-500">
                                            {item.amount}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* PENDING PAYMENTS */}

                <div className="col-span-12 lg:col-span-6">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-8 text-2xl font-bold">Pending Payments</h2>

                        <div className="space-y-5">
                            {[
                                {
                                    period: "0–7 Days",
                                    amount: "₹14K",
                                    width: "90%",
                                },
                                {
                                    period: "8–15 Days",
                                    amount: "₹28K",
                                    width: "72%",
                                },
                                {
                                    period: "16–30 Days",
                                    amount: "₹21K",
                                    width: "52%",
                                },
                                {
                                    period: "30+ Days",
                                    amount: "₹8K",
                                    width: "25%",
                                },
                            ].map((item, index) => (
                                <div key={index}>
                                    <div className="mb-3 flex justify-between">
                                        <span>{item.period}</span>

                                        <span>{item.amount}</span>
                                    </div>

                                    <div className="h-3 rounded-full bg-gray-100">
                                        <div
                                            className="h-3 rounded-full bg-red-500"
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
            </div>

            {/* =====================================================
            ==================== RECENT INVOICES ==================
            ===================================================== */}

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold">Recent Invoices</h2>

                    <p className="mt-2 text-sm text-gray-500">
                        Recently generated invoices and payment activity.
                    </p>
                </div>

                <div className="space-y-4">
                    {[
                        {
                            invoice: "#INV-1001",
                            member: "Rahul Sharma",
                            amount: "₹2,500",
                            status: "Paid",
                        },
                        {
                            invoice: "#INV-1002",
                            member: "Priya Singh",
                            amount: "₹8,500",
                            status: "Paid",
                        },
                        {
                            invoice: "#INV-1003",
                            member: "Aman Kumar",
                            amount: "₹1,500",
                            status: "Pending",
                        },
                        {
                            invoice: "#INV-1004",
                            member: "Rohit Das",
                            amount: "₹5,500",
                            status: "Paid",
                        },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between rounded-2xl border border-gray-100 p-5"
                        >
                            <div>
                                <h3 className="font-semibold">{item.invoice}</h3>

                                <p className="text-sm text-gray-500">{item.member}</p>
                            </div>

                            <div className="text-right">
                                <h3 className="font-bold">{item.amount}</h3>

                                <p
                                    className={`text-sm ${
                                        item.status === "Paid" ? "text-green-600" : "text-red-500"
                                    }`}
                                >
                                    {item.status}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* =====================================================
            ===================== AI INSIGHTS =====================
            ===================================================== */}

            <div className="rounded-3xl bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 p-8 text-white shadow-xl">
                <h2 className="mb-8 text-3xl font-bold">AI Billing Insights</h2>

                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 md:col-span-6 xl:col-span-3">
                        <div className="rounded-2xl bg-white/10 p-5">
                            <h3 className="font-semibold">Highest Collection</h3>

                            <p className="mt-3 text-xl font-bold">UPI Payments</p>
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-6 xl:col-span-3">
                        <div className="rounded-2xl bg-white/10 p-5">
                            <h3 className="font-semibold">Outstanding Risk</h3>

                            <p className="mt-3 text-xl font-bold">₹84K Pending</p>
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-6 xl:col-span-3">
                        <div className="rounded-2xl bg-white/10 p-5">
                            <h3 className="font-semibold">Growth Indicator</h3>

                            <p className="mt-3 text-xl font-bold">18% Increase</p>
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-6 xl:col-span-3">
                        <div className="rounded-2xl bg-white/10 p-5">
                            <h3 className="font-semibold">Recommendation</h3>

                            <p className="mt-3 text-xl font-bold">Improve Renewals</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}