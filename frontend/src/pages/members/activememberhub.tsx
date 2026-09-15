import { useEffect, useMemo, useState } from "react";

import {
    Activity,
    Award,
    Calendar,
    Flame,
    MessageCircle,
    Phone,
    Search,
    Star,
    Trophy,
    UserCheck,
    Users,
    Wallet,
} from "lucide-react";

import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Input from "../../components/form/input/InputField";
import Badge from "../../components/ui/badge/Badge";
import Button from "../../components/ui/button/Button";

interface ActiveMember {
    _id: string;

    uid: string;

    name: string;

    mobile: string;

    photo?: string;

    trainer: string;

    packageName: string;

    gymPoints: number;

    attendance: number;

    totalAttendance: number;

    streak: number;

    due: number;

    lastVisit: string;

    checkedIn: boolean;

    status: "ACTIVE";
}

export default function ActiveMemberAll() {
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [members, setMembers] = useState<ActiveMember[]>([]);

    const fetchMembers = async () => {
        setLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 800));

        setMembers([
            {
                _id: "1",
                uid: "GM1001",
                name: "Rahul Sharma",
                mobile: "9876543210",
                trainer: "Amit",
                packageName: "Gold Membership",
                gymPoints: 1280,
                attendance: 24,
                totalAttendance: 30,
                streak: 17,
                due: 0,
                lastVisit: "Today",
                checkedIn: true,
                status: "ACTIVE",
            },

            {
                _id: "2",
                uid: "GM1002",
                name: "Sneha Roy",
                mobile: "9876543211",
                trainer: "Rahul",
                packageName: "Premium Membership",
                gymPoints: 920,
                attendance: 21,
                totalAttendance: 30,
                streak: 11,
                due: 500,
                lastVisit: "Yesterday",
                checkedIn: false,
                status: "ACTIVE",
            },

            {
                _id: "3",
                uid: "GM1003",
                name: "Rohit Kumar",
                mobile: "9876543212",
                trainer: "Sourav",
                packageName: "Platinum Membership",
                gymPoints: 1500,
                attendance: 28,
                totalAttendance: 30,
                streak: 22,
                due: 0,
                lastVisit: "Today",
                checkedIn: true,
                status: "ACTIVE",
            },
        ]);

        setLoading(false);
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const filteredMembers = useMemo(() => {
        return members.filter((member) => {
            const keyword = search.toLowerCase();

            return (
                member.name.toLowerCase().includes(keyword) ||
                member.uid.toLowerCase().includes(keyword) ||
                member.mobile.includes(keyword)
            );
        });
    }, [search, members]);

    const dashboard = useMemo(() => {
        return {
            total: members.length,

            checkedIn: members.filter((m) => m.checkedIn).length,

            points: members.reduce((sum, item) => sum + item.gymPoints, 0),

            revenue: members.reduce((sum, item) => sum + item.due, 0),
        };
    }, [members]);

    return (
        <>
            <PageBreadcrumb pageTitle="Active Members" />

            <div className="space-y-6">
                {/* ======================================================
========================== HEADER ========================
====================================================== */}

                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Active Members Hub</h1>

                        <p className="mt-2 text-gray-500">Track your most engaged gym members.</p>
                    </div>

                    <div className="flex gap-3">
                        <Button variant="outline">Export</Button>

                        <Button>Top Performers</Button>
                    </div>
                </div>

                {/* ======================================================
========================== SEARCH ========================
====================================================== */}

                <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <div className="relative">
                        <Search
                            size={18}
                            className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
                        />

                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-11"
                            placeholder="Search member, mobile number or UID"
                        />
                    </div>
                </div>

                {/* ======================================================
======================= DASHBOARD ========================
====================================================== */}

                <div className="grid grid-cols-12 gap-6">
                    {/* ACTIVE MEMBERS */}

                    <div className="col-span-12 sm:col-span-6 xl:col-span-3">
                        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-xl">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-blue-100">Active Members</p>

                                    <h2 className="mt-3 text-4xl font-bold">{dashboard.total}</h2>
                                </div>

                                <Users size={34} />
                            </div>
                        </div>
                    </div>

                    {/* TODAY */}

                    <div className="col-span-12 sm:col-span-6 xl:col-span-3">
                        <div className="rounded-3xl bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white shadow-xl">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-green-100">Checked In</p>

                                    <h2 className="mt-3 text-4xl font-bold">
                                        {dashboard.checkedIn}
                                    </h2>
                                </div>

                                <UserCheck size={34} />
                            </div>
                        </div>
                    </div>

                    {/* GYM POINTS */}

                    <div className="col-span-12 sm:col-span-6 xl:col-span-3">
                        <div className="rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white shadow-xl">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-purple-100">Gym Points</p>

                                    <h2 className="mt-3 text-4xl font-bold">{dashboard.points}</h2>
                                </div>

                                <Award size={34} />
                            </div>
                        </div>
                    </div>

                    {/* COLLECTION */}

                    <div className="col-span-12 sm:col-span-6 xl:col-span-3">
                        <div className="rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white shadow-xl">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-orange-100">Outstanding</p>

                                    <h2 className="mt-3 text-4xl font-bold">
                                        ₹{dashboard.revenue}
                                    </h2>
                                </div>

                                <Wallet size={34} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ======================================================
====================== TOP MEMBERS =======================
====================================================== */}

                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold">Most Active Members</h2>

                        <p className="mt-1 text-gray-500">
                            Attendance, consistency and performance.
                        </p>
                    </div>

                    <Badge color="success">{filteredMembers.length} Active</Badge>
                </div>
                <div className="grid grid-cols-12 gap-6">
                    {loading
                        ? [...Array(6)].map((_, index) => (
                              <div key={index} className="col-span-12 md:col-span-6 xl:col-span-4">
                                  <div className="h-[420px] animate-pulse rounded-3xl bg-gray-200 dark:bg-gray-800" />
                              </div>
                          ))
                        : filteredMembers.map((member) => (
                              <div
                                  key={member._id}
                                  className="col-span-12 md:col-span-6 xl:col-span-4"
                              >
                                  <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900">
                                      {/* HEADER */}

                                      <div className="relative h-28 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                                          <div className="absolute top-5 right-5">
                                              <Badge color="success">ACTIVE</Badge>
                                          </div>
                                      </div>

                                      {/* PROFILE */}

                                      <div className="-mt-14 px-6">
                                          <div className="flex items-end justify-between">
                                              <div className="flex h-28 w-28 items-center justify-center rounded-3xl border-4 border-white bg-gradient-to-r from-blue-600 to-indigo-700 text-4xl font-bold text-white shadow-xl">
                                                  {member.name.charAt(0)}
                                              </div>

                                              <div className="rounded-2xl bg-orange-100 px-4 py-2">
                                                  <div className="flex items-center gap-2">
                                                      <Flame
                                                          size={18}
                                                          className="text-orange-600"
                                                      />

                                                      <span className="font-semibold text-orange-600">
                                                          {member.streak} Days
                                                      </span>
                                                  </div>
                                              </div>
                                          </div>

                                          <div className="mt-5">
                                              <h2 className="text-2xl font-bold">{member.name}</h2>

                                              <p className="mt-1 text-gray-500">{member.uid}</p>
                                          </div>
                                      </div>

                                      {/* BODY */}

                                      <div className="space-y-5 p-6">
                                          <div className="grid grid-cols-2 gap-4">
                                              <div className="rounded-2xl bg-gray-50 p-4 dark:bg-gray-800">
                                                  <p className="text-sm text-gray-500">Trainer</p>

                                                  <h4 className="mt-2 font-semibold">
                                                      {member.trainer}
                                                  </h4>
                                              </div>

                                              <div className="rounded-2xl bg-gray-50 p-4 dark:bg-gray-800">
                                                  <p className="text-sm text-gray-500">
                                                      Last Visit
                                                  </p>

                                                  <h4 className="mt-2 font-semibold">
                                                      {member.lastVisit}
                                                  </h4>
                                              </div>
                                          </div>

                                          <div>
                                              <div className="mb-2 flex items-center justify-between">
                                                  <span className="text-sm font-medium">
                                                      Attendance
                                                  </span>

                                                  <span className="text-sm font-semibold">
                                                      {Math.round(
                                                          (member.attendance /
                                                              member.totalAttendance) *
                                                              100
                                                      )}
                                                      %
                                                  </span>
                                              </div>

                                              <div className="h-3 rounded-full bg-gray-200">
                                                  <div
                                                      className="h-3 rounded-full bg-green-600"
                                                      style={{
                                                          width: `${
                                                              (member.attendance /
                                                                  member.totalAttendance) *
                                                              100
                                                          }%`,
                                                      }}
                                                  />
                                              </div>
                                          </div>

                                          <div className="grid grid-cols-3 gap-4">
                                              <div className="rounded-2xl border border-gray-200 p-4 text-center dark:border-gray-700">
                                                  <Award className="mx-auto" size={22} />

                                                  <h4 className="mt-2 font-bold">
                                                      {member.gymPoints}
                                                  </h4>

                                                  <p className="text-xs text-gray-500">Points</p>
                                              </div>

                                              <div className="rounded-2xl border border-gray-200 p-4 text-center dark:border-gray-700">
                                                  <Calendar className="mx-auto" size={22} />

                                                  <h4 className="mt-2 font-bold">
                                                      {member.attendance}
                                                  </h4>

                                                  <p className="text-xs text-gray-500">Visits</p>
                                              </div>

                                              <div className="rounded-2xl border border-gray-200 p-4 text-center dark:border-gray-700">
                                                  <Trophy className="mx-auto" size={22} />

                                                  <h4 className="mt-2 font-bold">
                                                      #{Math.floor(Math.random() * 20)}
                                                  </h4>

                                                  <p className="text-xs text-gray-500">Rank</p>
                                              </div>
                                          </div>

                                          <div className="rounded-2xl bg-blue-50 p-4 dark:bg-gray-800">
                                              <p className="text-sm text-gray-500">Membership</p>

                                              <h3 className="mt-2 font-semibold">
                                                  {member.packageName}
                                              </h3>
                                          </div>

                                          <div className="flex gap-3">
                                              <Button variant="outline" className="flex-1">
                                                  <Phone size={16} />
                                              </Button>

                                              <Button variant="outline" className="flex-1">
                                                  <MessageCircle size={16} />
                                              </Button>

                                              <Button className="flex-[2]">Renew</Button>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          ))}
                </div>
                {/* ======================================================
======================= LEADERBOARD ======================
====================================================== */}

                <div className="grid grid-cols-12 gap-6">
                    {/* TOP PERFORMERS */}

                    <div className="col-span-12 xl:col-span-8">
                        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <div className="mb-6 flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-bold">Top Performers</h3>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Members with the highest engagement.
                                    </p>
                                </div>

                                <Trophy size={26} className="text-yellow-500" />
                            </div>

                            <div className="space-y-4">
                                {filteredMembers
                                    .sort((a, b) => b.attendance - a.attendance)
                                    .slice(0, 5)
                                    .map((member, index) => (
                                        <div
                                            key={member._id}
                                            className="flex items-center justify-between rounded-2xl border border-gray-200 p-4 dark:border-gray-700"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-lg font-bold text-white">
                                                    {member.name.charAt(0)}
                                                </div>

                                                <div>
                                                    <h4 className="font-semibold">{member.name}</h4>

                                                    <p className="text-sm text-gray-500">
                                                        {member.packageName}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="text-right">
                                                <h4 className="font-bold">#{index + 1}</h4>

                                                <p className="text-sm text-gray-500">
                                                    {member.attendance} Visits
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>

                    {/* ACHIEVEMENTS */}

                    <div className="col-span-12 xl:col-span-4">
                        <div className="space-y-6">
                            <div className="rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
                                <Star size={28} />

                                <h3 className="mt-5 text-2xl font-bold">30 Day Challenge</h3>

                                <p className="mt-3 text-purple-100">
                                    12 members completed the challenge.
                                </p>
                            </div>

                            <div className="rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
                                <Flame size={28} />

                                <h3 className="mt-5 text-2xl font-bold">Longest Streak</h3>

                                <h1 className="mt-4 text-5xl font-bold">22</h1>

                                <p className="mt-2 text-orange-100">Consecutive workout days.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ======================================================
======================== FOOTER ==========================
====================================================== */}

                <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h3 className="font-semibold">Gymely Active Member Intelligence</h3>

                            <p className="mt-2 text-sm text-gray-500">
                                Track attendance, engagement, loyalty, check-ins, performance,
                                trainers and membership activity in one place.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Badge color="success">{dashboard.checkedIn} Checked In</Badge>

                            <Badge color="primary">{dashboard.total} Active Members</Badge>

                            <Badge color="warning">Top Performers</Badge>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}