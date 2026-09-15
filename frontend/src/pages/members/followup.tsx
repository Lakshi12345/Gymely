import { useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";

import {
    Search,
    Calendar,
    Phone,
    Pencil,
    Download,
    RefreshCw,
    Users,
    Clock3,
    CheckCircle,
    AlertCircle,
    MessageCircle,
} from "lucide-react";

import "react-datepicker/dist/react-datepicker.css";

import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Badge from "../../components/ui/badge/Badge";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";

interface Followup {
    _id: string;

    uid: string;

    name: string;

    mobile: string;

    status: "Scheduled" | "Completed";

    purpose: string;

    date: string;

    connectedOn: string;

    response: string;

    remark: string;

    nextActionDate: string;

    followupBy: string;
}

export default function MemberFollowupAll() {
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [status, setStatus] = useState("All");

    const [operator, setOperator] = useState("All");

    const [startDate, setStartDate] = useState<Date | null>(null);

    const [endDate, setEndDate] = useState<Date | null>(null);

    const [followups, setFollowups] = useState<Followup[]>([]);

    const fetchFollowups = async () => {
        setLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        setFollowups([
            {
                _id: "1",
                uid: "5914",
                name: "Divya",
                mobile: "9369628017",
                status: "Scheduled",
                purpose: "CRM Call",
                date: "05/08/2026",
                connectedOn: "",
                response: "",
                remark: "",
                nextActionDate: "08/08/2026",
                followupBy: "Gymoryx",
            },

            {
                _id: "2",
                uid: "5915",
                name: "Pawan Singh",
                mobile: "9986876108",
                status: "Scheduled",
                purpose: "CRM Call",
                date: "05/08/2026",
                connectedOn: "",
                response: "",
                remark: "",
                nextActionDate: "09/08/2026",
                followupBy: "Bishan",
            },

            {
                _id: "3",
                uid: "5916",
                name: "Rahul Sharma",
                mobile: "9876543210",
                status: "Completed",
                purpose: "Renewal",
                date: "03/08/2026",
                connectedOn: "04/08/2026",
                response: "Interested",
                remark: "Will renew next week",
                nextActionDate: "10/08/2026",
                followupBy: "Pramodh",
            },
        ]);

        setLoading(false);
    };

    useEffect(() => {
        fetchFollowups();
    }, []);

    const filteredFollowups = useMemo(() => {
        return followups.filter((item) => {
            const matchesSearch =
                item.name.toLowerCase().includes(search.toLowerCase()) ||
                item.mobile.includes(search);

            const matchesStatus = status === "All" || item.status === status;

            const matchesOperator = operator === "All" || item.followupBy === operator;

            return matchesSearch && matchesStatus && matchesOperator;
        });
    }, [followups, search, status, operator]);

    const dashboard = {
        total: followups.length,

        scheduled: followups.filter((x) => x.status === "Scheduled").length,

        completed: followups.filter((x) => x.status === "Completed").length,
    };

    return (
        <>
            <PageBreadcrumb pageTitle="Member Followups" />

            <div className="space-y-6">
                {/* =======================================================
========================= HEADER ========================
======================================================= */}

                <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <div className="flex flex-col gap-6 p-6 xl:flex-row xl:items-center xl:justify-between">
                        <div>
                            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
                                <MessageCircle size={16} />
                                Member Followup Management
                            </div>

                            <h1 className="text-3xl font-bold">Followup Dashboard</h1>

                            <p className="mt-3 text-sm text-gray-500">
                                Manage scheduled calls, renewal reminders, responses and followup
                                activities.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Button
                                variant="outline"
                                startIcon={<RefreshCw size={16} />}
                                onClick={fetchFollowups}
                            >
                                Refresh
                            </Button>

                            <Button variant="outline" startIcon={<Download size={16} />}>
                                Export
                            </Button>

                            <Button startIcon={<Calendar size={16} />}>Schedule Followup</Button>
                        </div>
                    </div>
                </div>

                {/* =======================================================
==================== DASHBOARD CARDS ====================
======================================================= */}

                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 md:col-span-6 xl:col-span-3">
                        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Total Followups</p>

                                    <h2 className="mt-2 text-4xl font-bold">{dashboard.total}</h2>
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
                                    <p className="text-sm text-gray-500">Scheduled</p>

                                    <h2 className="mt-2 text-4xl font-bold">
                                        {dashboard.scheduled}
                                    </h2>
                                </div>

                                <div className="rounded-2xl bg-yellow-100 p-4">
                                    <Clock3 size={24} className="text-yellow-600" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-6 xl:col-span-3">
                        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Completed</p>

                                    <h2 className="mt-2 text-4xl font-bold">
                                        {dashboard.completed}
                                    </h2>
                                </div>

                                <div className="rounded-2xl bg-green-100 p-4">
                                    <CheckCircle size={24} className="text-green-600" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-6 xl:col-span-3">
                        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Pending Calls</p>

                                    <h2 className="mt-2 text-4xl font-bold">
                                        {dashboard.scheduled}
                                    </h2>
                                </div>

                                <div className="rounded-2xl bg-red-100 p-4">
                                    <AlertCircle size={24} className="text-red-600" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* =======================================================
===================== FILTER SECTION ====================
======================================================= */}

                <div className="rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <div className="border-b border-gray-200 p-6 dark:border-gray-800">
                        <h2 className="text-xl font-semibold">Search Followups</h2>

                        <p className="mt-2 text-sm text-gray-500">
                            Search and filter scheduled calls, responses, renewals and member
                            activities.
                        </p>
                    </div>

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
                                    placeholder="Name or mobile number"
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
                                placeholderText="Select Date"
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
                                placeholderText="Select Date"
                                className="h-11 w-full rounded-xl border border-gray-300 px-4 dark:border-gray-700 dark:bg-gray-900"
                            />
                        </div>

                        {/* STATUS */}

                        <div className="col-span-12 md:col-span-6 xl:col-span-2">
                            <label className="mb-2 block text-sm font-medium">Status</label>

                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="h-11 w-full rounded-xl border border-gray-300 px-4 dark:border-gray-700 dark:bg-gray-900"
                            >
                                <option>All</option>

                                <option>Scheduled</option>

                                <option>Completed</option>
                            </select>
                        </div>

                        {/* OPERATOR */}

                        <div className="col-span-12 md:col-span-6 xl:col-span-2">
                            <label className="mb-2 block text-sm font-medium">Operator</label>

                            <select
                                value={operator}
                                onChange={(e) => setOperator(e.target.value)}
                                className="h-11 w-full rounded-xl border border-gray-300 px-4 dark:border-gray-700 dark:bg-gray-900"
                            >
                                <option>All</option>

                                <option>Owner</option>

                                <option>Bishan</option>

                                <option>Pramodh</option>

                                <option>Gymoryx</option>
                            </select>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 p-6 dark:border-gray-800">
                        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                            <div className="flex flex-wrap gap-3">
                                <Badge color="primary">Total {dashboard.total}</Badge>

                                <Badge color="warning">Scheduled {dashboard.scheduled}</Badge>

                                <Badge color="success">Completed {dashboard.completed}</Badge>
                            </div>

                            <div className="flex gap-3">
                                <Button variant="outline" startIcon={<RefreshCw size={16} />}>
                                    Reset
                                </Button>

                                <Button>Get Data</Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* =======================================================
====================== TABLE START ======================
======================================================= */}

                <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-800">
                                <tr>
                                    <th className="px-6 py-4 text-left">Status</th>

                                    <th className="px-6 py-4 text-left">Date</th>

                                    <th className="px-6 py-4 text-left">Member</th>

                                    <th className="px-6 py-4 text-left">Purpose</th>

                                    <th className="px-6 py-4 text-left">Response</th>

                                    <th className="px-6 py-4 text-left">Next Action</th>

                                    <th className="px-6 py-4 text-left">Followup By</th>

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
                                    : filteredFollowups.map((item) => (
                                          <tr
                                              key={item._id}
                                              className="border-b border-gray-100 transition hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
                                          >
                                              {/* STATUS */}

                                              <td className="px-6 py-5">
                                                  {item.status === "Scheduled" ? (
                                                      <Badge color="warning">Scheduled</Badge>
                                                  ) : (
                                                      <Badge color="success">Completed</Badge>
                                                  )}

                                                  <div className="mt-3">
                                                      <Button
                                                          size="sm"
                                                          startIcon={<Pencil size={14} />}
                                                      >
                                                          Update
                                                      </Button>
                                                  </div>
                                              </td>

                                              {/* DATE */}

                                              <td className="px-6 py-5">
                                                  <div className="space-y-1">
                                                      <p className="font-semibold">{item.date}</p>

                                                      <p className="text-xs text-gray-500">
                                                          Created Date
                                                      </p>
                                                  </div>
                                              </td>

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
                                                              {item.mobile}
                                                          </p>

                                                          <div className="mt-3 flex gap-2">
                                                              <Button
                                                                  size="sm"
                                                                  startIcon={<Phone size={14} />}
                                                              >
                                                                  Call
                                                              </Button>

                                                              <Button
                                                                  size="sm"
                                                                  variant="outline"
                                                                  startIcon={
                                                                      <MessageCircle size={14} />
                                                                  }
                                                              >
                                                                  WhatsApp
                                                              </Button>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </td>

                                              {/* PURPOSE */}

                                              <td className="px-6 py-5">
                                                  <Badge color="primary">{item.purpose}</Badge>
                                              </td>

                                              {/* RESPONSE */}

                                              <td className="px-6 py-5">
                                                  <div className="space-y-2">
                                                      <p className="font-medium">
                                                          {item.response || "No response"}
                                                      </p>

                                                      <p className="text-sm text-gray-500">
                                                          {item.remark || "No remarks"}
                                                      </p>
                                                  </div>
                                              </td>

                                              {/* NEXT ACTION */}

                                              <td className="px-6 py-5">
                                                  <div>
                                                      <p className="font-medium">
                                                          {item.nextActionDate || "-"}
                                                      </p>

                                                      <p className="mt-1 text-xs text-gray-500">
                                                          Next followup
                                                      </p>
                                                  </div>
                                              </td>

                                              {/* FOLLOWUP BY */}

                                              <td className="px-6 py-5">
                                                  <Badge color="info">{item.followupBy}</Badge>
                                              </td>

                                              {/* ACTIONS */}

                                              <td className="px-6 py-5">
                                                  <div className="flex justify-end gap-2">
                                                      <Button size="sm" variant="outline">
                                                          View
                                                      </Button>

                                                      <Button size="sm">Update</Button>
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

                {!loading && filteredFollowups.length === 0 && (
                    <div className="rounded-3xl border border-dashed border-gray-300 bg-white py-20 text-center shadow-sm dark:border-gray-700 dark:bg-gray-900">
                        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-100">
                            <Users size={40} className="text-blue-600" />
                        </div>

                        <h2 className="mt-6 text-2xl font-bold">No Followups Found</h2>

                        <p className="mt-2 text-gray-500">
                            There are no followups matching the selected filters.
                        </p>

                        <div className="mt-6">
                            <Button>Create Followup</Button>
                        </div>
                    </div>
                )}

                {/* =======================================================
======================= PAGINATION ======================
======================================================= */}

                <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h3 className="font-semibold">
                                Showing
                                <span className="text-brand-600 mx-2">
                                    {filteredFollowups.length}
                                </span>
                                entries
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">Member followup activities</p>
                        </div>

                        <div className="flex items-center gap-2">
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
                            <p className="text-blue-100">Total Followups</p>

                            <h2 className="mt-3 text-4xl font-bold">{dashboard.total}</h2>
                        </div>
                    </div>

                    <div className="col-span-12 lg:col-span-4">
                        <div className="rounded-3xl bg-gradient-to-r from-yellow-500 to-orange-500 p-6 text-white shadow-xl">
                            <p className="text-yellow-100">Scheduled Followups</p>

                            <h2 className="mt-3 text-4xl font-bold">{dashboard.scheduled}</h2>
                        </div>
                    </div>

                    <div className="col-span-12 lg:col-span-4">
                        <div className="rounded-3xl bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white shadow-xl">
                            <p className="text-green-100">Completed Followups</p>

                            <h2 className="mt-3 text-4xl font-bold">{dashboard.completed}</h2>
                        </div>
                    </div>
                </div>

                {/* =======================================================
======================== FOOTER =========================
======================================================= */}

                <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h3 className="font-semibold">Gymely Followup Management</h3>

                            <p className="mt-2 text-sm text-gray-500">
                                Manage calls, responses, reminders, renewals and member engagement.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Badge color="primary">{dashboard.total} Total</Badge>

                            <Badge color="warning">{dashboard.scheduled} Scheduled</Badge>

                            <Badge color="success">{dashboard.completed} Completed</Badge>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
