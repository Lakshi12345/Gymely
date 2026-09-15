import { AlertCircle, ArrowUpRight, PhoneCall, Target, UserPlus, Users } from "lucide-react";
const metrics = [
    {
        title: "Total Leads",
        value: "428",
        growth: "+18%",
        icon: UserPlus,
    },
    {
        title: "Converted",
        value: "124",
        growth: "+11%",
        icon: Target,
    },
    {
        title: "Follow-Ups",
        value: "87",
        growth: "+7%",
        icon: PhoneCall,
    },
    {
        title: "Conversion Rate",
        value: "29%",
        growth: "+5%",
        icon: Users,
    },
];
export default function LeadReport() {
    return (
        <div className="space-y-6">
            {/* HEADER */}

            <div className="overflow-hidden rounded-3xl">
                <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 p-8 text-white">
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
                                <Target size={30} />
                            </div>

                            <h1 className="text-4xl font-bold">Lead Command Center</h1>

                            <p className="mt-3 max-w-2xl text-purple-100">
                                Track lead acquisition, follow-ups, conversions, staff performance
                                and revenue opportunities.
                            </p>
                        </div>

                        <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-sm">
                            <p className="text-purple-100">Today's Conversions</p>

                            <h2 className="mt-3 text-4xl font-bold">28</h2>

                            <p className="mt-2 text-purple-100">Updated just now</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* KPI SECTION */}

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
                                            <ArrowUpRight className="text-emerald-600" size={16} />

                                            <span className="font-semibold text-emerald-600">
                                                {metric.growth}
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

            {/* CONVERSION FUNNEL */}

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 xl:col-span-8">
                    <div className="rounded-3xl border border-slate-200 bg-white p-6">
                        <h2 className="mb-8 text-2xl font-bold">Conversion Funnel</h2>

                        <div className="space-y-6">
                            {[
                                ["New Leads", "428", "100%"],
                                ["Contacted", "318", "74%"],
                                ["Interested", "201", "47%"],
                                ["Trial", "146", "34%"],
                                ["Converted", "124", "29%"],
                            ].map(([title, value, width]) => (
                                <div key={title}>
                                    <div className="mb-3 flex items-center justify-between">
                                        <span className="font-medium">{title}</span>

                                        <span className="font-semibold">{value}</span>
                                    </div>

                                    <div className="h-4 rounded-full bg-slate-100">
                                        <div
                                            className="h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                                            style={{
                                                width,
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
                    <div className="rounded-3xl border border-slate-200 bg-white p-6">
                        <div className="mb-8 flex items-center gap-3">
                            <AlertCircle className="text-orange-500" />

                            <h2 className="text-2xl font-bold">Follow-Up Alerts</h2>
                        </div>

                        <div className="space-y-4">
                            {[
                                "18 leads require a callback.",
                                "7 leads missed appointments.",
                                "4 trials expire today.",
                                "12 follow-ups are overdue.",
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
            ===================== LEAD PIPELINE ===================
            ===================================================== */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold">Sales Pipeline</h2>

                        <p className="mt-2 text-sm text-slate-500">
                            Track every lead from enquiry to conversion.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-6">
                    {[
                        {
                            title: "New",
                            count: 48,
                            color: "bg-blue-50",
                            border: "border-blue-100",
                        },
                        {
                            title: "Contacted",
                            count: 36,
                            color: "bg-violet-50",
                            border: "border-violet-100",
                        },
                        {
                            title: "Interested",
                            count: 24,
                            color: "bg-amber-50",
                            border: "border-amber-100",
                        },
                        {
                            title: "Converted",
                            count: 12,
                            color: "bg-emerald-50",
                            border: "border-emerald-100",
                        },
                    ].map((column) => (
                        <div key={column.title} className="col-span-12 lg:col-span-6 xl:col-span-3">
                            <div className={`rounded-3xl border p-5 ${column.border}`}>
                                <div className="mb-5 flex items-center justify-between">
                                    <h3 className="font-semibold">{column.title}</h3>

                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">
                                        {column.count}
                                    </span>
                                </div>

                                <div className="space-y-4">
                                    {[1, 2, 3].map((item) => (
                                        <div
                                            key={item}
                                            className={`rounded-2xl border p-4 ${column.color}`}
                                        >
                                            <h4 className="font-semibold">Rahul Sharma</h4>

                                            <p className="mt-2 text-sm text-slate-500">
                                                Weight-loss package
                                            </p>

                                            <div className="mt-4 flex justify-between text-xs text-slate-500">
                                                <span>₹12,000</span>

                                                <span>Today</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* =====================================================
            =================== SOURCE ANALYTICS ==================
            ===================================================== */}

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 xl:col-span-5">
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-8 text-2xl font-bold">Lead Sources</h2>

                        <div className="space-y-5">
                            {[
                                ["Instagram", "38%"],
                                ["Google", "24%"],
                                ["Referral", "18%"],
                                ["Facebook", "12%"],
                                ["WhatsApp", "8%"],
                            ].map(([source, value]) => (
                                <div key={source}>
                                    <div className="mb-3 flex justify-between">
                                        <span>{source}</span>

                                        <span>{value}</span>
                                    </div>

                                    <div className="h-3 rounded-full bg-slate-100">
                                        <div
                                            className="h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
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

                {/* COUNSELLOR PERFORMANCE */}

                <div className="col-span-12 xl:col-span-7">
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-8 text-2xl font-bold">Counsellor Ranking</h2>

                        <div className="space-y-4">
                            {[
                                {
                                    name: "Amit",
                                    leads: 52,
                                    conversions: 18,
                                },
                                {
                                    name: "Priya",
                                    leads: 48,
                                    conversions: 15,
                                },
                                {
                                    name: "Rahul",
                                    leads: 42,
                                    conversions: 14,
                                },
                                {
                                    name: "Neha",
                                    leads: 35,
                                    conversions: 11,
                                },
                            ].map((staff, index) => (
                                <div
                                    key={staff.name}
                                    className="flex items-center justify-between rounded-2xl border border-slate-100 p-5"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 font-bold">
                                            #{index + 1}
                                        </div>

                                        <div>
                                            <h3 className="font-semibold">{staff.name}</h3>

                                            <p className="text-sm text-slate-500">
                                                {staff.leads} leads handled
                                            </p>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <h4 className="font-semibold">{staff.conversions}</h4>

                                        <p className="text-sm text-slate-500">Conversions</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* =====================================================
            ====================== AI PANEL =======================
            ===================================================== */}

            <div className="overflow-hidden rounded-3xl">
                <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 p-8 text-white">
                    <h2 className="mb-8 text-3xl font-bold">Lead Intelligence</h2>

                    <div className="grid grid-cols-12 gap-5">
                        {[
                            "Instagram produces the highest conversion rate.",
                            "Twelve leads have a high conversion probability.",
                            "Evening follow-ups perform better than morning calls.",
                            "Three counsellors exceeded their monthly targets.",
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
