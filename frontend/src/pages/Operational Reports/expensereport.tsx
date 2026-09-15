import {
    AlertTriangle,
    ArrowDownRight,
    BadgeIndianRupee,
    CreditCard,
    Receipt,
    Wallet,
} from "lucide-react";
const metrics = [
    {
        title: "Total Expense",
        value: "₹3.86L",
        growth: "+12%",
        icon: Wallet,
    },
    {
        title: "Staff Salary",
        value: "₹1.72L",
        growth: "+6%",
        icon: BadgeIndianRupee,
    },
    {
        title: "Vendor Payments",
        value: "₹84K",
        growth: "+8%",
        icon: CreditCard,
    },
    {
        title: "Net Profit",
        value: "₹5.4L",
        growth: "+14%",
        icon: Receipt,
    },
];

export default function ExpenseReport() {
    return (
        <div className="space-y-6">
            {/* HEADER */}

            <div className="overflow-hidden rounded-3xl">
                <div className="bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 p-8 text-white">
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
                                <Wallet size={30} />
                            </div>

                            <h1 className="text-4xl font-bold">Expense Report</h1>

                            <p className="mt-3 max-w-2xl text-orange-100">
                                Monitor expenses, profit margins, budgets, vendor payments,
                                utilities, salaries, and operational spending.
                            </p>
                        </div>

                        <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-sm">
                            <p className="text-orange-100">Monthly Spending</p>

                            <h2 className="mt-3 text-4xl font-bold">₹3.86L</h2>

                            <p className="mt-2 text-orange-100">Updated today</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* KPI STRIP */}

            <div className="grid grid-cols-12 gap-6">
                {metrics.map((metric, index) => {
                    const Icon = metric.icon;

                    return (
                        <div key={index} className="col-span-12 md:col-span-6 xl:col-span-3">
                            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-slate-500">{metric.title}</p>

                                        <h2 className="mt-3 text-4xl font-bold">{metric.value}</h2>

                                        <div className="mt-3 flex items-center gap-2">
                                            <ArrowDownRight size={16} className="text-red-500" />

                                            <span className="font-semibold text-red-500">
                                                {metric.growth}
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

            {/* EXPENSE BREAKDOWN */}

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 xl:col-span-8">
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-8 text-2xl font-bold">Expense Breakdown</h2>

                        <div className="space-y-5">
                            {[
                                ["Salary", "44%"],
                                ["Rent", "28%"],
                                ["Utilities", "14%"],
                                ["Marketing", "9%"],
                                ["Maintenance", "5%"],
                            ].map(([label, value]) => (
                                <div key={label}>
                                    <div className="mb-3 flex justify-between">
                                        <span>{label}</span>

                                        <span>{value}</span>
                                    </div>

                                    <div className="h-4 rounded-full bg-slate-100">
                                        <div
                                            className="h-4 rounded-full bg-gradient-to-r from-red-500 to-orange-500"
                                            style={{
                                                width: value,
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ALERTS */}

                <div className="col-span-12 xl:col-span-4">
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="mb-8 flex items-center gap-3">
                            <AlertTriangle className="text-orange-500" />

                            <h2 className="text-2xl font-bold">Budget Alerts</h2>
                        </div>

                        <div className="space-y-4">
                            {[
                                "Electricity cost increased by 8%",
                                "Marketing budget exceeded by 5%",
                                "Water bill due tomorrow",
                                "Vendor payment pending",
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="rounded-2xl border border-orange-100 bg-orange-50 p-5"
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* =====================================================
            ================= EXPENSE CATEGORIES ==================
            ===================================================== */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold">Expense Categories</h2>

                    <p className="mt-2 text-sm text-slate-500">
                        Category-wise expense distribution.
                    </p>
                </div>

                <div className="grid grid-cols-12 gap-5">
                    {[
                        {
                            title: "Salary",
                            amount: "₹1,72,000",
                        },
                        {
                            title: "Rent",
                            amount: "₹84,000",
                        },
                        {
                            title: "Marketing",
                            amount: "₹36,500",
                        },
                        {
                            title: "Utilities",
                            amount: "₹28,000",
                        },
                        {
                            title: "Equipment",
                            amount: "₹22,000",
                        },
                        {
                            title: "Maintenance",
                            amount: "₹16,000",
                        },
                    ].map((item) => (
                        <div key={item.title} className="col-span-12 md:col-span-6 xl:col-span-4">
                            <div className="rounded-3xl border border-slate-100 p-5">
                                <h3 className="font-semibold">{item.title}</h3>

                                <h2 className="mt-4 text-3xl font-bold">{item.amount}</h2>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* =====================================================
            ================= SALARY ANALYTICS ====================
            ===================================================== */}

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 xl:col-span-7">
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-8 text-2xl font-bold">Staff Salary Analytics</h2>

                        <div className="space-y-5">
                            {[
                                {
                                    name: "Rahul",
                                    salary: "₹35,000",
                                },
                                {
                                    name: "Amit",
                                    salary: "₹28,000",
                                },
                                {
                                    name: "Neha",
                                    salary: "₹24,000",
                                },
                                {
                                    name: "Priya",
                                    salary: "₹20,000",
                                },
                            ].map((item) => (
                                <div
                                    key={item.name}
                                    className="flex items-center justify-between rounded-2xl border border-slate-100 p-5"
                                >
                                    <div>
                                        <h3 className="font-semibold">{item.name}</h3>

                                        <p className="text-sm text-slate-500">Monthly salary</p>
                                    </div>

                                    <div className="text-xl font-bold">{item.salary}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RENT */}

                <div className="col-span-12 xl:col-span-5">
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-8 text-2xl font-bold">Rent & Utilities</h2>

                        <div className="space-y-6">
                            {[
                                ["Rent", "₹84,000"],
                                ["Electricity", "₹18,500"],
                                ["Internet", "₹4,200"],
                                ["Water", "₹3,600"],
                                ["Cleaning", "₹6,000"],
                            ].map(([label, value]) => (
                                <div key={label} className="flex items-center justify-between">
                                    <span>{label}</span>

                                    <span className="font-semibold">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* =====================================================
            ================== VENDOR PAYMENTS ====================
            ===================================================== */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold">Vendor Payments</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-200">
                                <th className="p-4 text-left">Vendor</th>

                                <th className="p-4 text-left">Category</th>

                                <th className="p-4 text-left">Amount</th>

                                <th className="p-4 text-left">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {[
                                {
                                    name: "Power Grid",
                                    category: "Electricity",
                                    amount: "₹18,500",
                                    status: "Paid",
                                },
                                {
                                    name: "Jio Fiber",
                                    category: "Internet",
                                    amount: "₹4,200",
                                    status: "Pending",
                                },
                                {
                                    name: "Fit Equipments",
                                    category: "Maintenance",
                                    amount: "₹12,400",
                                    status: "Paid",
                                },
                            ].map((item) => (
                                <tr key={item.name} className="border-b border-slate-100">
                                    <td className="p-4">{item.name}</td>

                                    <td className="p-4">{item.category}</td>

                                    <td className="p-4">{item.amount}</td>

                                    <td className="p-4">
                                        <span
                                            className={`rounded-full px-3 py-1 text-sm ${
                                                item.status === "Paid"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-orange-100 text-orange-700"
                                            }`}
                                        >
                                            {item.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* =====================================================
            =================== AI INTELLIGENCE ===================
            ===================================================== */}

            <div className="overflow-hidden rounded-3xl">
                <div className="bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 p-8 text-white">
                    <h2 className="mb-8 text-3xl font-bold">Financial Intelligence</h2>

                    <div className="grid grid-cols-12 gap-5">
                        {[
                            "Electricity costs increased by 8%.",
                            "Rent consumes 28% of monthly expenses.",
                            "Marketing expenses produced 18 new leads.",
                            "Vendor payments should be reviewed weekly.",
                        ].map((item) => (
                            <div key={item} className="col-span-12 md:col-span-6 xl:col-span-3">
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
