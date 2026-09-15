import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";

import {
    Search,
    CalendarDays,
    Download,
    RefreshCw,
    Users,
    UserCheck,
    Clock3,
    Smartphone,
} from "lucide-react";

import "react-datepicker/dist/react-datepicker.css";

import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Badge from "../../components/ui/badge/Badge";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";

interface Attendance {
    _id: string;
    uid: string;
    name: string;
    mobile: string;
    photo?: string;
    planName: string;
    expiryDate: string;
    attendanceType: "Customer" | "Staff";
    date: string;
    time: string;
    dueAmount: number;
    device: string;
    status: "Active" | "Inactive";
}

export default function AttendanceAll() {
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [memberType, setMemberType] = useState("Customer");

    const [logType, setLogType] = useState("footfall");

    const [startDate, setStartDate] = useState<Date | null>(null);

    const [endDate, setEndDate] = useState<Date | null>(null);

    const [attendance, setAttendance] = useState<Attendance[]>([]);

    const fetchAttendance = async () => {
        setLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 800));

        setAttendance([
            {
                _id: "1",
                uid: "2322",
                name: "Praveen",
                mobile: "9790722742",
                photo: "",
                planName: "12 Months (General)",
                expiryDate: "24/07/2027",
                attendanceType: "Customer",
                date: "05/08/2026",
                time: "09:23",
                dueAmount: 0,
                device: "3rd Floor",
                status: "Active",
            },

            {
                _id: "2",
                uid: "2451",
                name: "Rahul",
                mobile: "9876543210",
                photo: "",
                planName: "6 Months",
                expiryDate: "18/11/2026",
                attendanceType: "Customer",
                date: "05/08/2026",
                time: "10:15",
                dueAmount: 500,
                device: "ESSL K90",
                status: "Active",
            },
        ]);

        setLoading(false);
    };

    useEffect(() => {
        fetchAttendance();
    }, []);

    const filteredAttendance = useMemo(() => {
        return attendance.filter((item) => {
            return (
                item.name.toLowerCase().includes(search.toLowerCase()) ||
                item.uid.includes(search) ||
                item.mobile.includes(search)
            );
        });
    }, [attendance, search]);

    const dashboard = {
        total: attendance.length,

        customers: attendance.filter((x) => x.attendanceType === "Customer").length,

        staff: attendance.filter((x) => x.attendanceType === "Staff").length,

        active: attendance.filter((x) => x.status === "Active").length,
    };

    return (
        <>
            <PageBreadcrumb pageTitle="Attendance Information" />

            <div className="space-y-6">
                {/* =======================================================
========================== HEADER =======================
======================================================= */}

                <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <div className="flex flex-col gap-6 p-6 xl:flex-row xl:items-center xl:justify-between">
                        <div>
                            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-600">
                                <UserCheck size={16} />
                                Biometric Attendance Dashboard
                            </div>

                            <h1 className="text-3xl font-bold">Attendance Information</h1>

                            <p className="mt-3 text-sm text-gray-500">
                                Track customer attendance, staff attendance, biometric logs, and
                                footfall information.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Button
                                variant="outline"
                                startIcon={<RefreshCw size={16} />}
                                onClick={fetchAttendance}
                            >
                                Refresh
                            </Button>

                            <Button variant="outline" startIcon={<Download size={16} />}>
                                Export
                            </Button>

                            <Button startIcon={<CalendarDays size={16} />}>
                                Attendance Report
                            </Button>
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
                                    <p className="text-sm text-gray-500">Total Attendance</p>

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
                                    <p className="text-sm text-gray-500">Customers</p>

                                    <h2 className="mt-3 text-4xl font-bold">
                                        {dashboard.customers}
                                    </h2>
                                </div>

                                <div className="rounded-2xl bg-green-100 p-4">
                                    <UserCheck size={24} className="text-green-600" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-6 xl:col-span-3">
                        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Staff Attendance</p>

                                    <h2 className="mt-3 text-4xl font-bold">{dashboard.staff}</h2>
                                </div>

                                <div className="rounded-2xl bg-purple-100 p-4">
                                    <Clock3 size={24} className="text-purple-600" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-6 xl:col-span-3">
                        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Active Members</p>

                                    <h2 className="mt-3 text-4xl font-bold">{dashboard.active}</h2>
                                </div>

                                <div className="rounded-2xl bg-orange-100 p-4">
                                    <Smartphone size={24} className="text-orange-600" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* =======================================================
========================= FILTERS =======================
======================================================= */}

                <div className="rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <div className="grid grid-cols-12 gap-5 p-6">
                        {/* START DATE */}

                        <div className="col-span-12 md:col-span-6 xl:col-span-3">
                            <label className="mb-2 block text-sm font-medium">Start Date</label>

                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Select start date"
                                className="h-11 w-full rounded-xl border border-gray-300 px-4 dark:border-gray-700 dark:bg-gray-900"
                            />
                        </div>

                        {/* END DATE */}

                        <div className="col-span-12 md:col-span-6 xl:col-span-3">
                            <label className="mb-2 block text-sm font-medium">End Date</label>

                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Select end date"
                                className="h-11 w-full rounded-xl border border-gray-300 px-4 dark:border-gray-700 dark:bg-gray-900"
                            />
                        </div>

                        {/* MEMBER TYPE */}

                        <div className="col-span-12 md:col-span-6 xl:col-span-3">
                            <label className="mb-3 block text-sm font-medium">Member Type</label>

                            <div className="flex flex-wrap gap-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        value="All"
                                        checked={memberType === "All"}
                                        onChange={(e) => setMemberType(e.target.value)}
                                    />
                                    All
                                </label>

                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        value="Customer"
                                        checked={memberType === "Customer"}
                                        onChange={(e) => setMemberType(e.target.value)}
                                    />
                                    Customer
                                </label>

                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        value="Staff"
                                        checked={memberType === "Staff"}
                                        onChange={(e) => setMemberType(e.target.value)}
                                    />
                                    Staff
                                </label>
                            </div>
                        </div>

                        {/* LOG TYPE */}

                        <div className="col-span-12 md:col-span-6 xl:col-span-3">
                            <label className="mb-3 block text-sm font-medium">Report Type</label>

                            <div className="flex gap-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        value="log"
                                        checked={logType === "log"}
                                        onChange={(e) => setLogType(e.target.value)}
                                    />
                                    Log
                                </label>

                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        value="footfall"
                                        checked={logType === "footfall"}
                                        onChange={(e) => setLogType(e.target.value)}
                                    />
                                    Footfall
                                </label>
                            </div>
                        </div>

                        {/* SEARCH */}

                        <div className="col-span-12">
                            <label className="mb-2 block text-sm font-medium">Search</label>

                            <div className="relative">
                                <Search
                                    size={18}
                                    className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
                                />

                                <Input
                                    value={search}
                                    className="pl-11"
                                    placeholder="Search by UID, member name or mobile number"
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 px-6 py-5 dark:border-gray-800">
                        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                            <div className="flex flex-wrap gap-3">
                                <Badge color="primary">{filteredAttendance.length} Records</Badge>

                                <Badge color="success">Active Members</Badge>

                                <Badge color="warning">Biometric Logs</Badge>
                            </div>

                            <div className="flex gap-3">
                                <Button variant="outline" startIcon={<RefreshCw size={16} />}>
                                    Reset
                                </Button>

                                <Button startIcon={<Search size={16} />}>Search</Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* =======================================================
========================== TABLE ========================
======================================================= */}

                <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1400px]">
                            <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-800">
                                <tr>
                                    <th className="px-6 py-4 text-left">SN</th>

                                    <th className="px-6 py-4 text-left">Photo</th>

                                    <th className="px-6 py-4 text-left">UID</th>

                                    <th className="px-6 py-4 text-left">Name</th>

                                    <th className="px-6 py-4 text-left">Mobile</th>

                                    <th className="px-6 py-4 text-left">Plan</th>

                                    <th className="px-6 py-4 text-left">Expiry</th>

                                    <th className="px-6 py-4 text-left">Type</th>

                                    <th className="px-6 py-4 text-left">Date</th>

                                    <th className="px-6 py-4 text-left">Time</th>

                                    <th className="px-6 py-4 text-left">Due</th>

                                    <th className="px-6 py-4 text-left">Device</th>

                                    <th className="px-6 py-4 text-left">Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {loading
                                    ? [...Array(8)].map((_, index) => (
                                          <tr key={index}>
                                              <td colSpan={13} className="px-6 py-5">
                                                  <div className="h-20 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800" />
                                              </td>
                                          </tr>
                                      ))
                                    : filteredAttendance.map((item, index) => (
                                          <tr
                                              key={item._id}
                                              className="border-b border-gray-100 transition hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
                                          >
                                              {/* SN */}

                                              <td className="px-6 py-5">{index + 1}</td>

                                              {/* PHOTO */}

                                              <td className="px-6 py-5">
                                                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-xl font-bold text-white">
                                                      {item.name.charAt(0)}
                                                  </div>
                                              </td>

                                              {/* UID */}

                                              <td className="px-6 py-5">
                                                  <Link
                                                      to={`/member/${item.uid}`}
                                                      className="text-brand-600 font-semibold"
                                                  >
                                                      {item.uid}
                                                  </Link>
                                              </td>

                                              {/* NAME */}

                                              <td className="px-6 py-5">
                                                  <div>
                                                      <h4 className="font-semibold">{item.name}</h4>

                                                      <p className="mt-1 text-xs text-gray-500">
                                                          {item.attendanceType}
                                                      </p>
                                                  </div>
                                              </td>

                                              {/* MOBILE */}

                                              <td className="px-6 py-5">{item.mobile}</td>

                                              {/* PLAN */}

                                              <td className="px-6 py-5">
                                                  <Badge color="primary">{item.planName}</Badge>
                                              </td>

                                              {/* EXPIRY */}

                                              <td className="px-6 py-5">{item.expiryDate}</td>

                                              {/* TYPE */}

                                              <td className="px-6 py-5">
                                                  {item.attendanceType === "Customer" ? (
                                                      <Badge color="success">Customer</Badge>
                                                  ) : (
                                                      <Badge color="info">Staff</Badge>
                                                  )}
                                              </td>

                                              {/* DATE */}

                                              <td className="px-6 py-5">{item.date}</td>

                                              {/* TIME */}

                                              <td className="px-6 py-5">
                                                  <div className="flex items-center gap-2">
                                                      <Clock3 size={16} className="text-gray-400" />

                                                      {item.time}
                                                  </div>
                                              </td>

                                              {/* DUE */}

                                              <td className="px-6 py-5">
                                                  {item.dueAmount > 0 ? (
                                                      <Badge color="error">₹{item.dueAmount}</Badge>
                                                  ) : (
                                                      <Badge color="success">Cleared</Badge>
                                                  )}
                                              </td>

                                              {/* DEVICE */}

                                              <td className="px-6 py-5">
                                                  <div className="flex items-center gap-2">
                                                      <Smartphone
                                                          size={16}
                                                          className="text-gray-500"
                                                      />

                                                      {item.device}
                                                  </div>
                                              </td>

                                              {/* STATUS */}

                                              <td className="px-6 py-5">
                                                  {item.status === "Active" ? (
                                                      <Badge color="success">Active</Badge>
                                                  ) : (
                                                      <Badge color="error">Inactive</Badge>
                                                  )}
                                              </td>
                                          </tr>
                                      ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* =======================================================
====================== EMPTY STATE ======================
======================================================= */}

                {!loading && filteredAttendance.length === 0 && (
                    <div className="rounded-3xl border border-dashed border-gray-300 bg-white py-24 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-100">
                            <UserCheck size={40} className="text-blue-600" />
                        </div>

                        <h2 className="mt-6 text-2xl font-bold">No attendance records found</h2>

                        <p className="mt-2 text-gray-500">
                            Try changing your filters and search criteria.
                        </p>

                        <div className="mt-6">
                            <Button
                                onClick={() => {
                                    setSearch("");
                                    setMemberType("Customer");
                                    setLogType("footfall");
                                    setStartDate(null);
                                    setEndDate(null);
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
                                    {filteredAttendance.length}
                                </span>
                                records
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">
                                Attendance data collected from biometric devices and manual entries.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <Button variant="outline">Previous</Button>

                            <Button>1</Button>

                            <Button variant="outline">Next</Button>
                        </div>
                    </div>
                </div>

                {/* =======================================================
======================= ANALYTICS =======================
======================================================= */}

                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 lg:col-span-4">
                        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-xl">
                            <p className="text-blue-100">Total Footfall</p>

                            <h2 className="mt-4 text-4xl font-bold">{dashboard.total}</h2>
                        </div>
                    </div>

                    <div className="col-span-12 lg:col-span-4">
                        <div className="rounded-3xl bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white shadow-xl">
                            <p className="text-green-100">Active Members</p>

                            <h2 className="mt-4 text-4xl font-bold">{dashboard.active}</h2>
                        </div>
                    </div>

                    <div className="col-span-12 lg:col-span-4">
                        <div className="rounded-3xl bg-gradient-to-r from-purple-500 to-indigo-600 p-6 text-white shadow-xl">
                            <p className="text-purple-100">Biometric Devices</p>

                            <h2 className="mt-4 text-4xl font-bold">4</h2>
                        </div>
                    </div>
                </div>

                {/* =======================================================
========================= FOOTER ========================
======================================================= */}

                <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                        <div>
                            <h3 className="font-semibold">Gymely Attendance Centre</h3>

                            <p className="mt-2 text-sm text-gray-500">
                                Integrated with ESSL, Real Matrix, ZKTeco, biometric scanners, QR
                                codes, and mobile check-ins.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Badge color="primary">{dashboard.total} Records</Badge>

                            <Badge color="success">{dashboard.active} Active</Badge>

                            <Badge color="info">Footfall</Badge>

                            <Badge color="warning">Device Logs</Badge>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
