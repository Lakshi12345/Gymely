import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
    Search,
    RefreshCw,
    Download,
    Phone,
    MessageCircle,
    CalendarDays,
    Users,
    AlertTriangle,
    TrendingDown,
    Eye,
    Bell,
} from "lucide-react";

import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Button from "../../components/ui/button/Button";
import Badge from "../../components/ui/badge/Badge";
import Input from "../../components/form/input/InputField";

interface AbsenteeMember {
    _id: string;

    uid: string;

    name: string;

    mobile: string;

    trainer: string;

    packageName: string;

    membershipStatus: string;

    dueStatus: boolean;

    dueAmount: number;

    daysAbsent: number;

    lastAttendance: string;

    lastRemark: string;

    lastPlan: string;

    expiryDate: string;

    followupStatus: string;
}

export default function AbsenteeMemberAll() {
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [selectedTab, setSelectedTab] = useState("today");

    const [startDate, setStartDate] = useState<Date | null>(null);

    const [endDate, setEndDate] = useState<Date | null>(null);

    const [members, setMembers] = useState<AbsenteeMember[]>([]);

    const tabs = [
        {
            label: "Today's Absentee",
            value: "today",
            days: 1,
        },

        {
            label: "2+ Days",
            value: "2days",
            days: 2,
        },

        {
            label: "5+ Days",
            value: "5days",
            days: 5,
        },

        {
            label: "10+ Days",
            value: "10days",
            days: 10,
        },

        {
            label: "30+ Days",
            value: "30days",
            days: 30,
        },

        {
            label: "90+ Days",
            value: "90days",
            days: 90,
        },
    ];

    const fetchMembers = async () => {
        setLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 800));

        setMembers([
            {
                _id: "1",
                uid: "5810",
                name: "RAHUL",
                mobile: "8310341245",
                trainer: "Amit",
                packageName: "3 Months Only Gym",
                membershipStatus: "Active",
                dueStatus: false,
                dueAmount: 0,
                daysAbsent: 3,
                lastAttendance: "02/08/2026",
                lastRemark: "Interested",
                lastPlan: "3 Months Only Gym",
                expiryDate: "10/10/2026",
                followupStatus: "Scheduled",
            },

            {
                _id: "2",
                uid: "5822",
                name: "Pawan Singh",
                mobile: "9986876108",
                trainer: "Rahul",
                packageName: "Annual Package",
                membershipStatus: "Active",
                dueStatus: true,
                dueAmount: 1500,
                daysAbsent: 11,
                lastAttendance: "25/07/2026",
                lastRemark: "Busy schedule",
                lastPlan: "Annual Package",
                expiryDate: "20/12/2026",
                followupStatus: "Completed",
            },
        ]);

        setLoading(false);
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const filteredMembers = useMemo(() => {
        let minimumDays = 1;

        if (selectedTab === "2days") {
            minimumDays = 2;
        }

        if (selectedTab === "5days") {
            minimumDays = 5;
        }

        if (selectedTab === "10days") {
            minimumDays = 10;
        }

        if (selectedTab === "30days") {
            minimumDays = 30;
        }

        if (selectedTab === "90days") {
            minimumDays = 90;
        }

        return members.filter((item) => {
            const matchesSearch =
                item.name.toLowerCase().includes(search.toLowerCase()) ||
                item.mobile.includes(search);

            const matchesDays = item.daysAbsent >= minimumDays;

            return matchesSearch && matchesDays;
        });
    }, [members, search, selectedTab]);

    const dashboard = {
        total: members.length,

        today: members.filter((x) => x.daysAbsent >= 1).length,

        highRisk: members.filter((x) => x.daysAbsent >= 10).length,

        recovery: 76,
    };

    return (
        <>
            <PageBreadcrumb pageTitle="Absentee Members" />

            <div className="space-y-6">
                {/* =======================================================
========================== HEADER =======================
======================================================= */}

                <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <div className="flex flex-col gap-6 p-6 xl:flex-row xl:items-center xl:justify-between">
                        <div>
                            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm font-medium text-red-600">
                                <AlertTriangle size={16} />
                                Member Retention Dashboard
                            </div>

                            <h1 className="text-3xl font-bold">Absentee Members</h1>

                            <p className="mt-3 text-sm text-gray-500">
                                Monitor members who have stopped attending the gym and immediately
                                take action.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Button
                                variant="outline"
                                startIcon={<RefreshCw size={16} />}
                                onClick={fetchMembers}
                            >
                                Refresh
                            </Button>

                            <Button variant="outline" startIcon={<Download size={16} />}>
                                Export
                            </Button>

                            <Button startIcon={<Bell size={16} />}>Send Reminder</Button>
                        </div>
                    </div>
                </div>

                {/* =======================================================
===================== DASHBOARD CARDS ===================
======================================================= */}

                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 md:col-span-6 xl:col-span-3">
                        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Active Members</p>

                                    <h2 className="mt-3 text-4xl font-bold">{dashboard.total}</h2>
                                </div>

                                <div className="rounded-2xl bg-blue-100 p-4">
                                    <Users size={24} className="text-blue-600" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-6 xl:col-span-3">
                        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Today's Absentees</p>

                                    <h2 className="mt-3 text-4xl font-bold">{dashboard.today}</h2>
                                </div>

                                <div className="rounded-2xl bg-yellow-100 p-4">
                                    <CalendarDays size={24} className="text-yellow-600" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-6 xl:col-span-3">
                        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">High Risk Members</p>

                                    <h2 className="mt-3 text-4xl font-bold">
                                        {dashboard.highRisk}
                                    </h2>
                                </div>

                                <div className="rounded-2xl bg-red-100 p-4">
                                    <TrendingDown size={24} className="text-red-600" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-6 xl:col-span-3">
                        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Recovery Rate</p>

                                    <h2 className="mt-3 text-4xl font-bold">
                                        {dashboard.recovery}%
                                    </h2>
                                </div>

                                <div className="rounded-2xl bg-green-100 p-4">
                                    <Bell size={24} className="text-green-600" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* =======================================================
========================== TABS =========================
======================================================= */}

                <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <div className="flex flex-wrap gap-3">
                        {tabs.map((tab) => (
                            <button
                                key={tab.value}
                                onClick={() => setSelectedTab(tab.value)}
                                className={`rounded-xl px-5 py-3 text-sm font-medium transition-all ${
                                    selectedTab === tab.value
                                        ? "bg-brand-500 text-white"
                                        : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800"
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
                {/* =======================================================
======================== FILTERS ========================
======================================================= */}

                <div className="rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <div className="grid grid-cols-12 gap-5 p-6">
                        {/* SEARCH */}

                        <div className="col-span-12 xl:col-span-4">
                            <label className="mb-2 block text-sm font-medium">Search Member</label>

                            <div className="relative">
                                <Search
                                    size={18}
                                    className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
                                />

                                <Input
                                    value={search}
                                    placeholder="Name, UID or mobile number"
                                    className="pl-11"
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* START DATE */}

                        <div className="col-span-12 md:col-span-6 xl:col-span-2">
                            <label className="mb-2 block text-sm font-medium">Start Date</label>

                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Select date"
                                className="h-11 w-full rounded-xl border border-gray-300 px-4 dark:border-gray-700 dark:bg-gray-900"
                            />
                        </div>

                        {/* END DATE */}

                        <div className="col-span-12 md:col-span-6 xl:col-span-2">
                            <label className="mb-2 block text-sm font-medium">End Date</label>

                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Select date"
                                className="h-11 w-full rounded-xl border border-gray-300 px-4 dark:border-gray-700 dark:bg-gray-900"
                            />
                        </div>

                        {/* TRAINER */}

                        <div className="col-span-12 md:col-span-6 xl:col-span-2">
                            <label className="mb-2 block text-sm font-medium">Trainer</label>

                            <select className="h-11 w-full rounded-xl border border-gray-300 px-4 dark:border-gray-700 dark:bg-gray-900">
                                <option>All</option>
                                <option>Amit</option>
                                <option>Rahul</option>
                                <option>Sourav</option>
                                <option>Pramodh</option>
                            </select>
                        </div>

                        {/* MEMBERSHIP */}

                        <div className="col-span-12 md:col-span-6 xl:col-span-2">
                            <label className="mb-2 block text-sm font-medium">Membership</label>

                            <select className="h-11 w-full rounded-xl border border-gray-300 px-4 dark:border-gray-700 dark:bg-gray-900">
                                <option>All</option>
                                <option>Monthly</option>
                                <option>Quarterly</option>
                                <option>Half Yearly</option>
                                <option>Annual</option>
                            </select>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 px-6 py-5 dark:border-gray-800">
                        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                            <div className="flex flex-wrap gap-3">
                                <Badge color="primary">{filteredMembers.length} Members</Badge>

                                <Badge color="warning">High Risk Members</Badge>

                                <Badge color="error">Followup Required</Badge>
                            </div>

                            <div className="flex gap-3">
                                <Button variant="outline" startIcon={<RefreshCw size={16} />}>
                                    Reset
                                </Button>

                                <Button startIcon={<Download size={16} />}>Export</Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* =======================================================
======================== TABLE ==========================
======================================================= */}

                <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-800">
                                <tr>
                                    <th className="px-6 py-4 text-left">Member</th>

                                    <th className="px-6 py-4 text-left">Last Attendance</th>

                                    <th className="px-6 py-4 text-left">Days Absent</th>

                                    <th className="px-6 py-4 text-left">Due Status</th>

                                    <th className="px-6 py-4 text-left">Last Remark</th>

                                    <th className="px-6 py-4 text-left">Expiry Date</th>

                                    <th className="px-6 py-4 text-left">Followup</th>

                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {loading
                                    ? [...Array(8)].map((_, index) => (
                                          <tr key={index}>
                                              <td colSpan={8} className="px-6 py-4">
                                                  <div className="h-24 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-700" />
                                              </td>
                                          </tr>
                                      ))
                                    : filteredMembers.map((item) => (
                                          <tr
                                              key={item._id}
                                              className="border-b border-gray-100 transition hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
                                          >
                                              {/* MEMBER */}

                                              <td className="px-6 py-5">
                                                  <div className="flex items-center gap-4">
                                                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-lg font-bold text-white">
                                                          {item.name.charAt(0)}
                                                      </div>

                                                      <div>
                                                          <Link
                                                              to={`/member/${item.uid}`}
                                                              className="font-semibold"
                                                          >
                                                              {item.name}
                                                          </Link>

                                                          <p className="mt-1 text-sm text-gray-500">
                                                              UID : {item.uid}
                                                          </p>

                                                          <p className="text-sm text-gray-500">
                                                              {item.mobile}
                                                          </p>

                                                          <p className="text-xs text-gray-400">
                                                              {item.packageName}
                                                          </p>
                                                      </div>
                                                  </div>
                                              </td>

                                              {/* LAST ATTENDANCE */}

                                              <td className="px-6 py-5">
                                                  <div>
                                                      <h4 className="font-semibold">
                                                          {item.lastAttendance}
                                                      </h4>

                                                      <p className="mt-1 text-xs text-gray-500">
                                                          Last check-in
                                                      </p>
                                                  </div>
                                              </td>

                                              {/* DAYS ABSENT */}

                                              <td className="px-6 py-5">
                                                  {item.daysAbsent >= 30 ? (
                                                      <Badge color="error">
                                                          {item.daysAbsent} Days
                                                      </Badge>
                                                  ) : item.daysAbsent >= 10 ? (
                                                      <Badge color="warning">
                                                          {item.daysAbsent} Days
                                                      </Badge>
                                                  ) : (
                                                      <Badge color="info">
                                                          {item.daysAbsent} Days
                                                      </Badge>
                                                  )}
                                              </td>

                                              {/* DUE */}

                                              <td className="px-6 py-5">
                                                  {item.dueStatus ? (
                                                      <div className="space-y-2">
                                                          <Badge color="error">
                                                              ₹{item.dueAmount}
                                                          </Badge>

                                                          <p className="text-xs text-red-500">
                                                              Payment Due
                                                          </p>
                                                      </div>
                                                  ) : (
                                                      <Badge color="success">No Due</Badge>
                                                  )}
                                              </td>

                                              {/* REMARK */}

                                              <td className="px-6 py-5">
                                                  <div className="space-y-2">
                                                      <p className="font-medium">
                                                          {item.lastRemark}
                                                      </p>

                                                      <p className="text-xs text-gray-500">
                                                          {item.lastPlan}
                                                      </p>
                                                  </div>
                                              </td>

                                              {/* EXPIRY */}

                                              <td className="px-6 py-5">
                                                  <div>
                                                      <p className="font-medium">
                                                          {item.expiryDate}
                                                      </p>

                                                      <p className="text-xs text-gray-500">
                                                          Membership expiry
                                                      </p>
                                                  </div>
                                              </td>

                                              {/* FOLLOWUP */}

                                              <td className="px-6 py-5">
                                                  {item.followupStatus === "Completed" ? (
                                                      <Badge color="success">Completed</Badge>
                                                  ) : (
                                                      <Badge color="warning">Scheduled</Badge>
                                                  )}
                                              </td>

                                              {/* ACTIONS */}

                                              <td className="px-6 py-5">
                                                  <div className="flex flex-wrap justify-end gap-2">
                                                      <Button
                                                          size="sm"
                                                          startIcon={<Phone size={14} />}
                                                          onClick={() => {
                                                              window.location.href = `tel:${item.mobile}`;
                                                          }}
                                                      >
                                                          Call
                                                      </Button>

                                                      <Button
                                                          size="sm"
                                                          variant="outline"
                                                          startIcon={<MessageCircle size={14} />}
                                                          onClick={() => {
                                                              window.open(
                                                                  `https://wa.me/91${item.mobile}`,
                                                                  "_blank"
                                                              );
                                                          }}
                                                      >
                                                          WhatsApp
                                                      </Button>

                                                      <Button
                                                          size="sm"
                                                          variant="outline"
                                                          startIcon={<Eye size={14} />}
                                                      >
                                                          View
                                                      </Button>
                                                  </div>
                                              </td>
                                          </tr>
                                      ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* =======================================================
======================= EMPTY STATE =====================
======================================================= */}

                {!loading && filteredMembers.length === 0 && (
                    <div className="rounded-3xl border border-dashed border-gray-300 bg-white py-24 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
                            <AlertTriangle size={40} className="text-red-500" />
                        </div>

                        <h2 className="mt-6 text-2xl font-bold">No absentee members found</h2>

                        <p className="mt-2 text-gray-500">
                            Try changing your filters or choose another duration.
                        </p>

                        <div className="mt-6">
                            <Button
                                onClick={() => {
                                    setSearch("");
                                    setSelectedTab("today");
                                }}
                            >
                                Reset Filters
                            </Button>
                        </div>
                    </div>
                )}

                {/* =======================================================
======================= PAGINATION ======================
======================================================= */}

                <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                        <div>
                            <h3 className="font-semibold">
                                Showing
                                <span className="text-brand-600 mx-2">
                                    {filteredMembers.length}
                                </span>
                                Members
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">
                                Attendance retention monitoring dashboard
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button variant="outline">Previous</Button>

                            <Button>1</Button>

                            <Button variant="outline">Next</Button>
                        </div>
                    </div>
                </div>

                {/* =======================================================
======================= SUMMARY =========================
======================================================= */}

                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 lg:col-span-4">
                        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-xl">
                            <p className="text-blue-100">Active Members</p>

                            <h2 className="mt-4 text-4xl font-bold">{dashboard.total}</h2>
                        </div>
                    </div>

                    <div className="col-span-12 lg:col-span-4">
                        <div className="rounded-3xl bg-gradient-to-r from-red-500 to-orange-500 p-6 text-white shadow-xl">
                            <p className="text-red-100">High Risk Members</p>

                            <h2 className="mt-4 text-4xl font-bold">{dashboard.highRisk}</h2>
                        </div>
                    </div>

                    <div className="col-span-12 lg:col-span-4">
                        <div className="rounded-3xl bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white shadow-xl">
                            <p className="text-green-100">Recovery Rate</p>

                            <h2 className="mt-4 text-4xl font-bold">{dashboard.recovery}%</h2>
                        </div>
                    </div>
                </div>

                {/* =======================================================
======================== FOOTER =========================
======================================================= */}

                <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                        <div>
                            <h3 className="font-semibold">Gymely Retention Dashboard</h3>

                            <p className="mt-2 text-sm text-gray-500">
                                Identify absentee members, create follow-ups, improve engagement,
                                and reduce member churn.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Badge color="primary">{dashboard.total} Members</Badge>

                            <Badge color="warning">{dashboard.today} Absent</Badge>

                            <Badge color="error">{dashboard.highRisk} High Risk</Badge>

                            <Badge color="success">{dashboard.recovery}% Recovery</Badge>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
