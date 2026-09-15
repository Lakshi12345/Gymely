import {
    Activity,
    ArrowUpRight,
    Clock,
    TrendingUp,
    Trophy,
    Users,
} from "lucide-react";

const cards = [
    {
        title: "Today's Check-Ins",
        value: "421",
        growth: "+14%",
        icon: Activity,
    },
    {
        title: "Average Attendance",
        value: "376",
        growth: "+8%",
        icon: Users,
    },
    {
        title: "Peak Hour",
        value: "06 PM",
        growth: "+4%",
        icon: Clock,
    },
    {
        title: "Retention",
        value: "92%",
        growth: "+3%",
        icon: Trophy,
    },
];

export default function CheckInInsights() {
    return (
        <div className="space-y-6">
            {/* HERO */}

            <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-cyan-700 to-indigo-700 p-8 text-white shadow-xl">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
                            <Activity size={30} />
                        </div>

                        <h1 className="text-4xl font-bold">Check-In Insights</h1>

                        <p className="mt-3 max-w-2xl text-blue-100">
                            Understand attendance patterns, device activity, member engagement, and
                            retention trends.
                        </p>
                    </div>
                </div>
            </div>

            {/* KPI */}

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

                                    <div className="rounded-2xl bg-blue-50 p-4">
                                        <Icon size={28} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* =====================================================
            ================= TODAY'S ATTENDANCE ===================
            ===================================================== */}

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 xl:col-span-8">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold">Today's Attendance</h2>

                            <p className="mt-2 text-sm text-gray-500">
                                Real-time attendance overview.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
                            <div className="rounded-2xl bg-gray-50 p-5">
                                <p className="text-sm text-gray-500">Checked In</p>

                                <h3 className="mt-3 text-3xl font-bold">421</h3>
                            </div>

                            <div className="rounded-2xl bg-gray-50 p-5">
                                <p className="text-sm text-gray-500">Checked Out</p>

                                <h3 className="mt-3 text-3xl font-bold">382</h3>
                            </div>

                            <div className="rounded-2xl bg-gray-50 p-5">
                                <p className="text-sm text-gray-500">Active Members</p>

                                <h3 className="mt-3 text-3xl font-bold">39</h3>
                            </div>

                            <div className="rounded-2xl bg-gray-50 p-5">
                                <p className="text-sm text-gray-500">Average Time</p>

                                <h3 className="mt-3 text-3xl font-bold">1.8 Hrs</h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* WEEKLY ATTENDANCE */}

                <div className="col-span-12 xl:col-span-4">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-8 text-2xl font-bold">Weekly Attendance</h2>

                        <div className="space-y-5">
                            {[
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday",
                                "Saturday",
                            ].map((day, index) => (
                                <div key={index}>
                                    <div className="mb-2 flex justify-between">
                                        <span>{day}</span>

                                        <span>{280 + index * 18}</span>
                                    </div>

                                    <div className="h-3 rounded-full bg-gray-100">
                                        <div
                                            className="h-3 rounded-full bg-blue-500"
                                            style={{
                                                width: `${55 + index * 7}%`,
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
            ================= MONTHLY ANALYSIS =====================
            ===================================================== */}

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 lg:col-span-6">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-6 text-2xl font-bold">Monthly Analysis</h2>

                        <div className="space-y-5">
                            {["January", "February", "March", "April", "May"].map(
                                (month, index) => (
                                    <div
                                        key={index}
                                        className="rounded-2xl border border-gray-100 p-5"
                                    >
                                        <div className="flex justify-between">
                                            <span>{month}</span>

                                            <span className="font-semibold">
                                                {3200 + index * 180}
                                            </span>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>

                {/* PEAK HOURS */}

                <div className="col-span-12 lg:col-span-6">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-6 text-2xl font-bold">Peak Hours</h2>

                        <div className="space-y-5">
                            {[
                                {
                                    time: "05:00 AM",
                                    value: "68%",
                                },
                                {
                                    time: "07:00 AM",
                                    value: "92%",
                                },
                                {
                                    time: "06:00 PM",
                                    value: "100%",
                                },
                                {
                                    time: "08:00 PM",
                                    value: "74%",
                                },
                            ].map((item, index) => (
                                <div key={index} className="rounded-2xl bg-gray-50 p-5">
                                    <div className="mb-3 flex justify-between">
                                        <span>{item.time}</span>

                                        <span>{item.value}</span>
                                    </div>

                                    <div className="h-3 rounded-full bg-gray-200">
                                        <div
                                            className="h-3 rounded-full bg-cyan-500"
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
            {/* ======================================================
==================== DEVICE ANALYTICS ====================
====================================================== */}

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 xl:col-span-5">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-8 text-2xl font-bold">Device Analytics</h2>

                        <div className="space-y-5">
                            {[
                                {
                                    name: "Main Entrance",
                                    status: "Online",
                                    count: "168",
                                },
                                {
                                    name: "Cardio Zone",
                                    status: "Online",
                                    count: "94",
                                },
                                {
                                    name: "Weight Section",
                                    status: "Online",
                                    count: "112",
                                },
                                {
                                    name: "Yoga Room",
                                    status: "Offline",
                                    count: "0",
                                },
                            ].map((device, index) => (
                                <div key={index} className="rounded-2xl border border-gray-100 p-5">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-semibold">{device.name}</h3>

                                            <p className="mt-1 text-sm text-gray-500">
                                                {device.count} check-ins
                                            </p>
                                        </div>

                                        <span
                                            className={`rounded-full px-3 py-1 text-sm ${
                                                device.status === "Online"
                                                    ? "bg-green-100 text-green-600"
                                                    : "bg-red-100 text-red-600"
                                            }`}
                                        >
                                            {device.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* HEAT MAP */}

                <div className="col-span-12 xl:col-span-7">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-8 text-2xl font-bold">Attendance Heat Map</h2>

                        <div className="grid grid-cols-7 gap-3">
                            {Array.from({ length: 35 }).map((_, index) => (
                                <div
                                    key={index}
                                    className={`h-12 rounded-xl ${
                                        index % 5 === 0
                                            ? "bg-blue-200"
                                            : index % 4 === 0
                                              ? "bg-blue-300"
                                              : index % 3 === 0
                                                ? "bg-blue-400"
                                                : "bg-blue-500"
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ======================================================
=================== ATTENDANCE STREAKS ===================
====================================================== */}

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 lg:col-span-6">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-8 text-2xl font-bold">Top Attendance Streaks</h2>

                        <div className="space-y-4">
                            {[
                                {
                                    name: "Rahul Sharma",
                                    streak: "42 days",
                                },
                                {
                                    name: "Aman Kumar",
                                    streak: "36 days",
                                },
                                {
                                    name: "Priya Singh",
                                    streak: "31 days",
                                },
                                {
                                    name: "Rohit Das",
                                    streak: "28 days",
                                },
                            ].map((member, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between rounded-2xl border border-gray-100 p-5"
                                >
                                    <span>{member.name}</span>

                                    <span className="font-bold text-blue-600">{member.streak}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* INACTIVE MEMBERS */}

                <div className="col-span-12 lg:col-span-6">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-8 text-2xl font-bold">Inactive Members</h2>

                        <div className="space-y-4">
                            {[
                                "Member inactive for 3 days",
                                "Member inactive for 5 days",
                                "Member inactive for 8 days",
                                "Member inactive for 12 days",
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="rounded-2xl border border-red-100 bg-red-50 p-5"
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ======================================================
======================= AI INSIGHTS ======================
====================================================== */}

            <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-cyan-700 to-indigo-700 p-8 text-white shadow-xl">
                <h2 className="mb-8 text-3xl font-bold">AI Attendance Insights</h2>

                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 md:col-span-6 xl:col-span-3">
                        <div className="rounded-2xl bg-white/10 p-5">
                            <h3 className="font-semibold">Peak Time</h3>

                            <p className="mt-3 text-xl font-bold">06:00 PM</p>
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-6 xl:col-span-3">
                        <div className="rounded-2xl bg-white/10 p-5">
                            <h3 className="font-semibold">Best Day</h3>

                            <p className="mt-3 text-xl font-bold">Monday</p>
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-6 xl:col-span-3">
                        <div className="rounded-2xl bg-white/10 p-5">
                            <h3 className="font-semibold">Risk Alert</h3>

                            <p className="mt-3 text-xl font-bold">Attendance Drop</p>
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-6 xl:col-span-3">
                        <div className="rounded-2xl bg-white/10 p-5">
                            <h3 className="font-semibold">Recommendation</h3>

                            <p className="mt-3 text-xl font-bold">Launch Campaign</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}