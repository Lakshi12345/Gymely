import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../../services/api.ts";
import {
    Users,
    Wallet,
    CalendarDays,
    CalendarClock,
    Clock3,
    Search,
    Download,
    RefreshCw,
    Plus,
    Filter,
    CreditCard,
    Bell,
    Eye,
    Pencil,
    FileText,
    MoreVertical,
    MessageCircle,
    Printer,
    RotateCcw,
    Snowflake,
    Trash2,
    TrendingUp,
    Activity,
    CheckCircle,
    AlertTriangle,
} from "lucide-react";

import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Button from "../../components/ui/button/Button";
import Badge from "../../components/ui/badge/Badge";
import Input from "../../components/form/input/InputField";
import Loader from "../../components/common/Loader.tsx";
// import api from "../../services/api";

interface Memberships {
    _id: string;

    billNo: string;

    transactionId: string;

    uid: string;

    memberName: string;

    mobile: string;

    packageName: string;

    service: string;

    trainer: string;

    amount: number;

    paid: number;

    due: number;

    sessions: number;

    completed: number;

    pending: number;

    startDate: string;

    expiryDate: string;

    paymentDate: string;

    nextPaymentDate: string;

    status: "ACTIVE" | "EXPIRING" | "EXPIRED";
}

export default function MembershipAll() {
    const [loading, setLoading] = useState(true);
    const [preLoader, setPreLoader] = useState(false);

    const [memberships, setMemberships] = useState<Memberships[]>([]);

    const [search, setSearch] = useState("");

    const [membershipType, setMembershipType] = useState("All");

    const [service, setService] = useState("All");

    const [status, setStatus] = useState("All");

    const [trainer, setTrainer] = useState("All");

    const [actionMenu, setActionMenu] = useState<string | null>(null);

    const [startDate, setStartDate] = useState<Date | null>(null);

    const [endDate, setEndDate] = useState<Date | null>(null);

    const fetchMemberships = async () => {
        setLoading(true);
        setPreLoader(true);

        try {
            const response = await api.get("/member/getAllMemberships");

            console.log("Membership API:", response.data);

            if (response.data?.success) {
                const data = response.data.data;

                if (Array.isArray(data)) {
                    setMemberships(data);
                } else {
                    setMemberships([]);
                }
            } else {
                setMemberships([]);
            }
        } catch (error: any) {
            console.error("Failed to fetch memberships:", error?.response?.data || error);

            setMemberships([]);
        } finally {
            setLoading(false);
            setPreLoader(false);
        }
    };

    useEffect(() => {
        fetchMemberships();
    }, []);

    const filteredMemberships = useMemo(() => {
        return memberships.filter((item) => {
            const keyword = search.toLowerCase();

            const matchesSearch =
                item.memberName.toLowerCase().includes(keyword) ||
                item.mobile.includes(keyword) ||
                item.uid.toLowerCase().includes(keyword) ||
                item.billNo.toLowerCase().includes(keyword);

            const matchesType = membershipType === "All" || item.packageName === membershipType;

            const matchesService = service === "All" || item.service === service;

            const matchesStatus = status === "All" || item.status === status;

            const matchesTrainer = trainer === "All" || item.trainer === trainer;

            return (
                matchesSearch && matchesType && matchesService && matchesStatus && matchesTrainer
            );
        });
    }, [memberships, search, membershipType, service, status, trainer]);

    const dashboard = useMemo(
        () => ({
            total: memberships.length,

            active: memberships.filter((x) => x.status === "ACTIVE").length,

            expiring: memberships.filter((x) => x.status === "EXPIRING").length,

            expired: memberships.filter((x) => x.status === "EXPIRED").length,

            collection: memberships.reduce((sum, item) => sum + item.paid, 0),

            outstanding: memberships.reduce((sum, item) => sum + item.due, 0),

            sessions: memberships.reduce((sum, item) => sum + item.sessions, 0),

            completed: memberships.reduce((sum, item) => sum + item.completed, 0),
        }),
        [memberships]
    );

    return (
        <>
            <Loader loading={preLoader} text="Loading Memberships..." />
            <PageBreadcrumb pageTitle="Membership Management" />

            <div className="space-y-6">
                {/* =======================================================
====================== PAGE HEADER =====================
======================================================= */}

                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Membership Management
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Manage memberships, renewals, collections, sessions and reminders.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <Button variant="outline" startIcon={<RefreshCw size={18} />}>
                            Refresh
                        </Button>

                        <Button variant="outline" startIcon={<Download size={18} />}>
                            Export
                        </Button>

                        <Link to="/membership/add">
                            <Button startIcon={<Plus size={18} />}>New Membership</Button>
                        </Link>
                    </div>
                </div>

                {/* =======================================================
==================== DASHBOARD CARDS ===================
======================================================= */}

                <div className="grid grid-cols-12 gap-4">
                    {/* TOTAL */}

                    <div className="col-span-12 sm:col-span-6 xl:col-span-3">
                        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
                            <div className="flex items-center justify-between gap-3">
                                <div className="min-w-0">
                                    <p className="text-xs font-medium text-gray-500">
                                        Total Memberships
                                    </p>

                                    <h2 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                                        {dashboard.total}
                                    </h2>

                                    <p className="mt-1 flex items-center gap-1 text-xs text-green-600">
                                        <TrendingUp size={13} />
                                        +14% this month
                                    </p>
                                </div>

                                <div className="shrink-0 rounded-xl bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/30">
                                    <Users size={24} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ACTIVE */}

                    <div className="col-span-12 sm:col-span-6 xl:col-span-3">
                        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
                            <div className="flex items-center justify-between gap-3">
                                <div className="min-w-0">
                                    <p className="text-xs font-medium text-gray-500">
                                        Active Memberships
                                    </p>

                                    <h2 className="mt-1 text-2xl font-bold text-green-600">
                                        {dashboard.active}
                                    </h2>

                                    <p className="mt-1 text-xs text-gray-500">Running Packages</p>
                                </div>

                                <div className="shrink-0 rounded-xl bg-green-100 p-3 text-green-600 dark:bg-green-900/30">
                                    <CheckCircle size={24} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* EXPIRING */}

                    <div className="col-span-12 sm:col-span-6 xl:col-span-3">
                        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
                            <div className="flex items-center justify-between gap-3">
                                <div className="min-w-0">
                                    <p className="text-xs font-medium text-gray-500">
                                        Expiring Soon
                                    </p>

                                    <h2 className="mt-1 text-2xl font-bold text-orange-500">
                                        {dashboard.expiring}
                                    </h2>

                                    <p className="mt-1 text-xs text-gray-500">Next 7 Days</p>
                                </div>

                                <div className="shrink-0 rounded-xl bg-orange-100 p-3 text-orange-600 dark:bg-orange-900/30">
                                    <CalendarClock size={24} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* EXPIRED */}

                    <div className="col-span-12 sm:col-span-6 xl:col-span-3">
                        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
                            <div className="flex items-center justify-between gap-3">
                                <div className="min-w-0">
                                    <p className="text-xs font-medium text-gray-500">Expired</p>

                                    <h2 className="mt-1 text-2xl font-bold text-red-600">
                                        {dashboard.expired}
                                    </h2>

                                    <p className="mt-1 text-xs text-gray-500">Renewal Required</p>
                                </div>

                                <div className="shrink-0 rounded-xl bg-red-100 p-3 text-red-600 dark:bg-red-900/30">
                                    <AlertTriangle size={24} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* COLLECTION */}

                    <div className="col-span-12 sm:col-span-6 xl:col-span-3">
                        <div className="rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 p-4 text-white shadow-md">
                            <p className="text-xs text-green-100">Total Collection</p>

                            <h2 className="mt-1 text-2xl font-bold">
                                ₹{dashboard.collection.toLocaleString()}
                            </h2>

                            <p className="mt-1 text-xs text-green-100">Membership Revenue</p>
                        </div>
                    </div>

                    {/* DUE */}

                    <div className="col-span-12 sm:col-span-6 xl:col-span-3">
                        <div className="rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 p-4 text-white shadow-md">
                            <p className="text-xs text-red-100">Outstanding</p>

                            <h2 className="mt-1 text-2xl font-bold">
                                ₹{dashboard.outstanding.toLocaleString()}
                            </h2>

                            <p className="mt-1 text-xs text-red-100">Pending Collection</p>
                        </div>
                    </div>

                    {/* SESSIONS */}

                    <div className="col-span-12 sm:col-span-6 xl:col-span-3">
                        <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 p-4 text-white shadow-md">
                            <p className="text-xs text-indigo-100">Total Sessions</p>

                            <h2 className="mt-1 text-2xl font-bold">{dashboard.sessions}</h2>

                            <p className="mt-1 text-xs text-indigo-100">Purchased Sessions</p>
                        </div>
                    </div>

                    {/* COMPLETED */}

                    <div className="col-span-12 sm:col-span-6 xl:col-span-3">
                        <div className="rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 p-4 text-white shadow-md">
                            <p className="text-xs text-purple-100">Completed Sessions</p>

                            <h2 className="mt-1 text-2xl font-bold">{dashboard.completed}</h2>

                            <p className="mt-1 text-xs text-purple-100">Workout Progress</p>
                        </div>
                    </div>
                </div>
                {/* =======================================================
===================== FILTER TOOLBAR ====================
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
                                    placeholder="Name, UID, Mobile, Invoice..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-11"
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
                                className="focus:border-brand-500 h-11 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm outline-none dark:border-gray-700 dark:bg-gray-900"
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
                                className="focus:border-brand-500 h-11 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm outline-none dark:border-gray-700 dark:bg-gray-900"
                            />
                        </div>

                        {/* PACKAGE */}

                        <div className="col-span-12 md:col-span-6 xl:col-span-2">
                            <label className="mb-2 block text-sm font-medium">Package</label>

                            <select
                                value={membershipType}
                                onChange={(e) => setMembershipType(e.target.value)}
                                className="h-11 w-full rounded-xl border border-gray-300 bg-white px-4 dark:border-gray-700 dark:bg-gray-900"
                            >
                                <option>All</option>
                                <option>Gold Membership</option>
                                <option>Silver Membership</option>
                                <option>Platinum</option>
                                <option>Quarterly</option>
                                <option>Yearly</option>
                            </select>
                        </div>

                        {/* STATUS */}

                        <div className="col-span-12 md:col-span-6 xl:col-span-2">
                            <label className="mb-2 block text-sm font-medium">Status</label>

                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="h-11 w-full rounded-xl border border-gray-300 bg-white px-4 dark:border-gray-700 dark:bg-gray-900"
                            >
                                <option>All</option>
                                <option>ACTIVE</option>
                                <option>EXPIRING</option>
                                <option>EXPIRED</option>
                            </select>
                        </div>

                        {/* SERVICE */}

                        <div className="col-span-12 md:col-span-4 xl:col-span-2">
                            <label className="mb-2 block text-sm font-medium">Service</label>

                            <select
                                value={service}
                                onChange={(e) => setService(e.target.value)}
                                className="h-11 w-full rounded-xl border border-gray-300 bg-white px-4 dark:border-gray-700 dark:bg-gray-900"
                            >
                                <option>All</option>
                                <option>Gym</option>
                                <option>Gym + PT</option>
                                <option>CrossFit</option>
                                <option>Yoga</option>
                            </select>
                        </div>

                        {/* TRAINER */}

                        <div className="col-span-12 md:col-span-4 xl:col-span-2">
                            <label className="mb-2 block text-sm font-medium">Trainer</label>

                            <select
                                value={trainer}
                                onChange={(e) => setTrainer(e.target.value)}
                                className="h-11 w-full rounded-xl border border-gray-300 bg-white px-4 dark:border-gray-700 dark:bg-gray-900"
                            >
                                <option>All</option>
                                <option>Amit</option>
                                <option>Rahul</option>
                                <option>Sourav</option>
                                <option>Rakesh</option>
                            </select>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 px-6 py-5 dark:border-gray-800">
                        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                            <div className="flex flex-wrap gap-3">
                                <Badge color="primary">
                                    {filteredMemberships.length} Memberships
                                </Badge>

                                <Badge color="success">
                                    ₹{dashboard.collection.toLocaleString()} Collection
                                </Badge>

                                <Badge color="warning">
                                    ₹{dashboard.outstanding.toLocaleString()} Due
                                </Badge>

                                <Badge color="info">{dashboard.sessions} Sessions</Badge>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <Button variant="outline" startIcon={<Bell size={16} />}>
                                    Send Reminder
                                </Button>

                                <Button variant="outline" startIcon={<Download size={16} />}>
                                    Export
                                </Button>

                                <Button startIcon={<Filter size={16} />}>Advanced Filter</Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* =======================================================
==================== MEMBERSHIP TABLE ==================
======================================================= */}

                <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-800">
                                <tr>
                                    <th className="w-16 px-6 py-4">
                                        <input type="checkbox" className="h-4 w-4 rounded" />
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider uppercase">
                                        Member
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider uppercase">
                                        Membership
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider uppercase">
                                        Payment
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider uppercase">
                                        Sessions
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider uppercase">
                                        Expiry
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider uppercase">
                                        Status
                                    </th>

                                    <th className="px-6 py-4 text-right text-xs font-semibold tracking-wider uppercase">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {loading
                                    ? [...Array(8)].map((_, index) => (
                                          <tr key={index}>
                                              <td colSpan={8} className="px-6 py-5">
                                                  <div className="h-24 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-700" />
                                              </td>
                                          </tr>
                                      ))
                                    : filteredMemberships.map((item) => {
                                          const paymentPercent = Math.round(
                                              (item.paid / item.amount) * 100
                                          );

                                          const sessionPercent = Math.round(
                                              (item.completed / item.sessions) * 100
                                          );

                                          return (
                                              <tr
                                                  key={item._id}
                                                  className="border-b border-gray-100 transition-all duration-300 hover:bg-blue-50/40 dark:border-gray-800 dark:hover:bg-gray-800"
                                              >
                                                  {/* CHECKBOX */}

                                                  <td className="px-6 py-5">
                                                      <input
                                                          type="checkbox"
                                                          className="h-4 w-4 rounded"
                                                      />
                                                  </td>

                                                  {/* MEMBER */}

                                                  <td className="px-6 py-5">
                                                      <div className="flex items-center gap-4">
                                                          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-lg font-bold text-white">
                                                              {item.memberName.charAt(0)}
                                                          </div>

                                                          <div>
                                                              <h3 className="font-semibold text-gray-900 dark:text-white">
                                                                  {item.memberName}
                                                              </h3>

                                                              <p className="mt-1 text-sm text-gray-500">
                                                                  UID : {item.uid}
                                                              </p>

                                                              <p className="text-sm text-gray-500">
                                                                  {item.mobile}
                                                              </p>
                                                          </div>
                                                      </div>
                                                  </td>

                                                  {/* MEMBERSHIP */}

                                                  <td className="px-6 py-5">
                                                      <div className="space-y-2">
                                                          <Badge color="primary">
                                                              {item.packageName}
                                                          </Badge>

                                                          <p className="text-sm text-gray-500">
                                                              {item.service}
                                                          </p>

                                                          <p className="text-xs text-gray-400">
                                                              Trainer : {item.trainer}
                                                          </p>

                                                          <p className="text-xs text-gray-400">
                                                              Invoice : {item.billNo}
                                                          </p>
                                                      </div>
                                                  </td>
                                                  {/* ================= PAYMENT ================= */}

                                                  <td className="px-6 py-5">
                                                      <div className="w-56">
                                                          <div className="mb-2 flex items-center justify-between">
                                                              <span className="text-sm font-medium">
                                                                  ₹{item.paid.toLocaleString()}
                                                              </span>

                                                              <span className="text-xs text-gray-500">
                                                                  {paymentPercent}%
                                                              </span>
                                                          </div>

                                                          <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                                                              <div
                                                                  className="h-2 rounded-full bg-green-600 transition-all"
                                                                  style={{
                                                                      width: `${paymentPercent}%`,
                                                                  }}
                                                              />
                                                          </div>

                                                          <div className="mt-3 flex items-center justify-between">
                                                              <span className="text-xs text-gray-500">
                                                                  Due
                                                              </span>

                                                              {item.due === 0 ? (
                                                                  <Badge color="success">
                                                                      Paid
                                                                  </Badge>
                                                              ) : (
                                                                  <Badge color="error">
                                                                      ₹{item.due.toLocaleString()}
                                                                  </Badge>
                                                              )}
                                                          </div>
                                                      </div>
                                                  </td>

                                                  {/* ================= SESSIONS ================= */}

                                                  <td className="px-6 py-5">
                                                      <div className="w-48">
                                                          <div className="mb-2 flex items-center justify-between">
                                                              <span className="text-sm font-medium">
                                                                  {item.completed}/{item.sessions}
                                                              </span>

                                                              <span className="text-xs text-gray-500">
                                                                  {sessionPercent}%
                                                              </span>
                                                          </div>

                                                          <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                                                              <div
                                                                  className="h-2 rounded-full bg-indigo-600"
                                                                  style={{
                                                                      width: `${sessionPercent}%`,
                                                                  }}
                                                              />
                                                          </div>

                                                          <p className="mt-2 text-xs text-gray-500">
                                                              Pending {item.pending} Sessions
                                                          </p>
                                                      </div>
                                                  </td>

                                                  {/* ================= EXPIRY ================= */}

                                                  <td className="px-6 py-5">
                                                      <div>
                                                          <h4 className="font-semibold text-gray-900 dark:text-white">
                                                              {item.expiryDate}
                                                          </h4>

                                                          <p className="mt-2 text-xs text-orange-500">
                                                              28 Days Left
                                                          </p>
                                                      </div>
                                                  </td>

                                                  {/* ================= STATUS ================= */}

                                                  <td className="px-6 py-5">
                                                      {item.status === "ACTIVE" && (
                                                          <Badge color="success">Active</Badge>
                                                      )}

                                                      {item.status === "EXPIRING" && (
                                                          <Badge color="warning">Expiring</Badge>
                                                      )}

                                                      {item.status === "EXPIRED" && (
                                                          <Badge color="error">Expired</Badge>
                                                      )}
                                                  </td>

                                                  {/* ================= ACTION ================= */}

                                                  <td className="px-6 py-5 text-right">
                                                      <div className="relative inline-block">
                                                          <button
                                                              onClick={() =>
                                                                  setActionMenu(
                                                                      actionMenu === item._id
                                                                          ? null
                                                                          : item._id
                                                                  )
                                                              }
                                                              className="rounded-xl p-2 transition hover:bg-gray-100 dark:hover:bg-gray-700"
                                                          >
                                                              <MoreVertical size={18} />
                                                          </button>

                                                          {actionMenu === item._id && (
                                                              <div className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900">
                                                                  <button className="flex w-full items-center gap-3 px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                                                                      <Eye size={17} />
                                                                      View Membership
                                                                  </button>

                                                                  <button className="flex w-full items-center gap-3 px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                                                                      <Pencil size={17} />
                                                                      Edit Membership
                                                                  </button>

                                                                  <button className="flex w-full items-center gap-3 px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                                                                      <CreditCard size={17} />
                                                                      Receive Payment
                                                                  </button>

                                                                  <button className="flex w-full items-center gap-3 px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                                                                      <RotateCcw size={17} />
                                                                      Renew Membership
                                                                  </button>

                                                                  <button className="flex w-full items-center gap-3 px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                                                                      <FileText size={17} />
                                                                      Invoice
                                                                  </button>

                                                                  <button className="flex w-full items-center gap-3 px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                                                                      <Printer size={17} />
                                                                      Print
                                                                  </button>

                                                                  <button className="flex w-full items-center gap-3 px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                                                                      <MessageCircle size={17} />
                                                                      WhatsApp
                                                                  </button>

                                                                  <button className="flex w-full items-center gap-3 px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                                                                      <Snowflake size={17} />
                                                                      Freeze Membership
                                                                  </button>

                                                                  <div className="border-t border-gray-200 dark:border-gray-700" />

                                                                  <button className="flex w-full items-center gap-3 px-5 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                                                                      <Trash2 size={17} />
                                                                      Delete Membership
                                                                  </button>
                                                              </div>
                                                          )}
                                                      </div>
                                                  </td>
                                              </tr>
                                          );
                                      })}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* =======================================================
======================= PAGINATION ======================
======================================================= */}

                <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                        <div>
                            <h3 className="text-lg font-semibold">
                                Showing
                                <span className="text-brand-600 mx-2">
                                    {filteredMemberships.length}
                                </span>
                                of
                                <span className="text-brand-600 mx-2">{memberships.length}</span>
                                Memberships
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">
                                Memberships, renewals and payment history.
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <select className="rounded-xl border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900">
                                <option>10 / Page</option>
                                <option>25 / Page</option>
                                <option>50 / Page</option>
                                <option>100 / Page</option>
                            </select>

                            <Button variant="outline">Previous</Button>

                            <Button>1</Button>

                            <Button variant="outline">2</Button>

                            <Button variant="outline">3</Button>

                            <Button variant="outline">Next</Button>
                        </div>
                    </div>
                </div>

                {/* =======================================================
======================= EMPTY STATE =====================
======================================================= */}

                {!loading && filteredMemberships.length === 0 && (
                    <div className="rounded-3xl border border-dashed border-gray-300 bg-white py-24 text-center shadow-sm dark:border-gray-700 dark:bg-gray-900">
                        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-100">
                            <Users size={45} className="text-blue-600" />
                        </div>

                        <h2 className="mt-8 text-3xl font-bold">No Membership Found</h2>

                        <p className="mt-3 text-gray-500">
                            Try changing your filters or create a new membership.
                        </p>

                        <div className="mt-8">
                            <Link to="/membership/add">
                                <Button startIcon={<Plus size={18} />}>Create Membership</Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
