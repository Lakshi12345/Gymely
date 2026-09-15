import { Activity, ArrowUpRight, Clock3, Smartphone, TrendingUp, Users } from "lucide-react";
const metrics = [
    {
        title: "Today's Check-Ins",
        value: "286",
        growth: "+18%",
        icon: Users,
    },
    {
        title: "Peak Attendance",
        value: "82",
        growth: "+12%",
        icon: TrendingUp,
    },
    {
        title: "Average Duration",
        value: "94 Min",
        growth: "+7%",
        icon: Clock3,
    },
    {
        title: "Active Members",
        value: "1,284",
        growth: "+9%",
        icon: Activity,
    },
];
export default function AttendanceReport() {
    return (
        <div className="space-y-6">
            {/* HEADER */}

            <div className="overflow-hidden rounded-3xl">
                <div className="bg-gradient-to-r from-cyan-500 via-sky-600 to-blue-600 p-8 text-white">
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
                                <Users size={30} />
                            </div>

                            <h1 className="text-4xl font-bold">Attendance Report</h1>

                            <p className="mt-3 max-w-2xl text-sky-100">
                                Analyze attendance patterns, check-in activity, engagement levels,
                                peak hours, and member behavior.
                            </p>
                        </div>

                        <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-sm">
                            <p className="text-sky-100">Live Check-Ins</p>

                            <h2 className="mt-3 text-4xl font-bold">286</h2>

                            <p className="mt-2 text-sky-100">Updated 2 minutes ago</p>
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
                                            <ArrowUpRight size={16} className="text-emerald-600" />

                                            <span className="font-semibold text-emerald-600">
                                                {metric.growth}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="rounded-2xl bg-sky-50 p-4">
                                        <Icon size={28} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* HOURLY ATTENDANCE */}

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 xl:col-span-8">
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-8 text-2xl font-bold">Hourly Attendance</h2>

                        <div className="space-y-5">
                            {[
                                ["06 AM", "18%"],
                                ["08 AM", "42%"],
                                ["10 AM", "34%"],
                                ["04 PM", "58%"],
                                ["06 PM", "82%"],
                                ["08 PM", "71%"],
                            ].map(([time, value]) => (
                                <div key={time}>
                                    <div className="mb-3 flex justify-between">
                                        <span>{time}</span>

                                        <span>{value}</span>
                                    </div>

                                    <div className="h-4 rounded-full bg-slate-100">
                                        <div
                                            className="h-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
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

                {/* PEAK HOURS */}

                <div className="col-span-12 xl:col-span-4">
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-8 text-2xl font-bold">Peak Hours</h2>

                        <div className="space-y-4">
                            {[
                                "06 PM – 07 PM",
                                "07 PM – 08 PM",
                                "08 AM – 09 AM",
                                "09 AM – 10 AM",
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="rounded-2xl border border-cyan-100 bg-cyan-50 p-5"
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* =====================================================
            ==================== HEAT MAP =========================
            ===================================================== */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold">Weekly Attendance Heat Map</h2>

                        <p className="mt-2 text-sm text-slate-500">
                            Attendance intensity across the week.
                        </p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <div className="grid min-w-[900px] grid-cols-8 gap-3">
                        {["", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                            (item, index) => (
                                <div key={index} className="p-3 text-center font-semibold">
                                    {item}
                                </div>
                            )
                        )}

                        {[
                            "06 AM",
                            "08 AM",
                            "10 AM",
                            "12 PM",
                            "02 PM",
                            "04 PM",
                            "06 PM",
                            "08 PM",
                        ].map((time, rowIndex) => (
                            <>
                                <div
                                    key={time}
                                    className="flex items-center justify-center font-medium text-slate-500"
                                >
                                    {time}
                                </div>

                                {[1, 2, 3, 4, 5, 6, 7].map((_, colIndex) => (
                                    <div
                                        key={`${rowIndex}-${colIndex}`}
                                        className={`h-14 rounded-2xl ${
                                            [
                                                "bg-sky-50",
                                                "bg-sky-100",
                                                "bg-sky-200",
                                                "bg-cyan-200",
                                                "bg-cyan-300",
                                                "bg-blue-400",
                                                "bg-blue-500",
                                            ][Math.floor(Math.random() * 7)]
                                        }`}
                                    />
                                ))}
                            </>
                        ))}
                    </div>
                </div>
            </div>

            {/* =====================================================
            ================= DEVICE ANALYTICS ====================
            ===================================================== */}

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 xl:col-span-4">
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="mb-8 flex items-center gap-3">
                            <Smartphone className="text-sky-600" />

                            <h2 className="text-2xl font-bold">Device Analytics</h2>
                        </div>

                        <div className="space-y-5">
                            {[
                                ["ESSL K90", "42%"],
                                ["Face Reader", "26%"],
                                ["QR Scanner", "18%"],
                                ["Manual Entry", "14%"],
                            ].map(([name, value]) => (
                                <div key={name}>
                                    <div className="mb-3 flex justify-between">
                                        <span>{name}</span>

                                        <span>{value}</span>
                                    </div>

                                    <div className="h-3 rounded-full bg-slate-100">
                                        <div
                                            className="h-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
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

                {/* ACTIVE MEMBERS */}

                <div className="col-span-12 xl:col-span-8">
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-8 text-2xl font-bold">Most Active Members</h2>

                        <div className="space-y-4">
                            {[
                                {
                                    name: "Rahul Sharma",
                                    visits: 28,
                                },
                                {
                                    name: "Priya Singh",
                                    visits: 25,
                                },
                                {
                                    name: "Aman Kumar",
                                    visits: 22,
                                },
                                {
                                    name: "Rohit Das",
                                    visits: 21,
                                },
                            ].map((item) => (
                                <div
                                    key={item.name}
                                    className="flex items-center justify-between rounded-2xl border border-slate-100 p-5"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 font-bold">
                                            {item.name[0]}
                                        </div>

                                        <div>
                                            <h3 className="font-semibold">{item.name}</h3>

                                            <p className="text-sm text-slate-500">Premium member</p>
                                        </div>
                                    </div>

                                    <span className="font-semibold">{item.visits} visits</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* =====================================================
            ================= INACTIVE MEMBERS ====================
            ===================================================== */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-8 text-2xl font-bold">Inactive Members</h2>

                <div className="grid grid-cols-12 gap-5">
                    {["Rahul Das", "Aman Sharma", "Ritika Singh", "Priyanshu Roy"].map((name) => (
                        <div key={name} className="col-span-12 md:col-span-6 xl:col-span-3">
                            <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
                                <h3 className="font-semibold">{name}</h3>

                                <p className="mt-2 text-sm text-slate-500">
                                    Last check-in: 16 days ago
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* =====================================================
            ===================== AI INSIGHTS =====================
            ===================================================== */}

            <div className="overflow-hidden rounded-3xl">
                <div className="bg-gradient-to-r from-cyan-500 via-sky-600 to-blue-600 p-8 text-white">
                    <h2 className="mb-8 text-3xl font-bold">Attendance Intelligence</h2>

                    <div className="grid grid-cols-12 gap-5">
                        {[
                            "Peak traffic begins at 6 PM every day.",
                            "Saturday attendance increased by 14%.",
                            "Eight members have become inactive.",
                            "QR-based check-ins grew by 12%.",
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
