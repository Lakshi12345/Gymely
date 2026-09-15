import React, { useEffect, useMemo, useState } from "react";

import {
    User,
    RefreshCw,
    EllipsisVertical,
    WalletCards,
    PhoneCall,
    Pencil,
    History,
    Snowflake,
    Trash2,
    Download,
    Plus,
    Search,
    Filter,
    CreditCard,
} from "lucide-react";

import { Link } from "react-router-dom";

import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";
import Badge from "../../components/ui/badge/Badge";
import api from "../../services/api.ts";
import Loader from "../../components/common/Loader.tsx";

interface Member {
    _id: string;
    uid: string | number;
    photo?: string;
    name: string;
    mobile: string;
    packageName: string;
    trainer: string;
    attendance: number;
    totalAttendance: number;
    due: number;
    expiryDate: string | null;
    joinedDate: string | null;
    gymPoints: number;
    status: "ACTIVE" | "EXPIRING" | "EXPIRED" | "FREEZE";
    checkInToday: boolean;
    daysLeft: number;
}

interface Statistics {
    total: number;
    active: number;
    expiring: number;
    expired: number;
    freeze: number;
    dueMembers: number;
    totalDue: number;
    todayCheckIn: number;
    gymPoints: number;
    expiryThisMonth: number;
}

interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

const DEFAULT_STATS: Statistics = {
    total: 0,
    active: 0,
    expiring: 0,
    expired: 0,
    freeze: 0,
    dueMembers: 0,
    totalDue: 0,
    todayCheckIn: 0,
    gymPoints: 0,
    expiryThisMonth: 0,
};

const DEFAULT_PAGINATION: Pagination = {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
};

const getImageUrl = (photo?: string) => {
    if (!photo) return "";
    if (/^https?:\/\//i.test(photo)) return photo;

    const baseURL = String(api.defaults.baseURL || "").replace(/\/$/, "");

    if (photo.startsWith("/")) {
        return baseURL ? `${baseURL}${photo}` : photo;
    }

    return baseURL ? `${baseURL}/${photo}` : `/${photo}`;
};

export default function MemberAll() {
    const [openActionMenu, setOpenActionMenu] = useState<string | null>(null);

    const [preLoader, setPreLoader] = useState(false);
    const [loading, setLoading] = useState(true);
    const [members, setMembers] = useState<Member[]>([]);

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [page, setPage] = useState(1);
    const [limit] = useState(10);

    const [packageName, setPackageName] = useState("All Packages");
    const [trainer, setTrainer] = useState("All Trainers");
    const [status, setStatus] = useState("Status");

    const [pagination, setPagination] = useState<Pagination>(DEFAULT_PAGINATION);
    const [statistics, setStatistics] = useState<Statistics>(DEFAULT_STATS);
    const [staff, setStaff] = useState<any[]>([]);
    const [packageList, setPackageList] = useState<any[]>([]);

    const fetchStaff = async () => {
        try {
            const response = await api.get("/staff/getStaff");

            if (Array.isArray(response.data?.data)) {
                setStaff(response.data.data);
            } else {
                setStaff([]);
            }
        } catch (error: any) {
            console.error("Failed to fetch staff:", error);
            setStaff([]);
        }
    };

    const fetchPackage = async () => {
        try {
            const response = await api.get("/package/getallPackages");

            if (Array.isArray(response.data?.data)) {
                setPackageList(response.data.data);
            } else {
                setPackageList([]);
            }
        } catch (error: any) {
            console.error("Failed to fetch staff:", error);
            setPackageList([]);
        }
    };
    const handleRefresh = () => {
        setFilter("all");
        setSearch("");
        setPackageName("All Packages");
        setTrainer("All Trainers");
        setStatus("Status");
        setPage(1);

        // fetch with reset values immediately
        fetchMembers({
            page: 1,
            filter: "all",
            search: "",
            packageName: "All Packages",
            trainer: "All Trainers",
            status: "Status",
        });
    };
    const fetchMembers = async (options?: {
        page?: number;
        filter?: string;
        search?: string;
        packageName?: string;
        trainer?: string;
        status?: string;
    }) => {
        try {
            setLoading(true);
            setPreLoader(true);

            const currentPage = options?.page ?? page;
            const currentFilter = options?.filter ?? filter;
            const currentSearch = options?.search ?? search;
            const currentPackageName = options?.packageName ?? packageName;
            const currentTrainer = options?.trainer ?? trainer;
            const currentStatus = options?.status ?? status;

            const params = new URLSearchParams({
                page: String(currentPage),
                limit: String(limit),
                filter: currentFilter,
            });

            if (currentSearch.trim()) {
                params.set("search", currentSearch.trim());
            }

            if (currentPackageName !== "All Packages") {
                params.set("packageName", currentPackageName);
            }

            if (currentTrainer !== "All Trainers") {
                params.set("trainer", currentTrainer);
            }

            if (currentStatus !== "Status") {
                params.set("status", currentStatus.toUpperCase());
            }

            const response = await api.get(`/member/getallMember?${params.toString()}`);

            const body = response.data;

            if (body?.status) {
                setMembers(Array.isArray(body.data) ? body.data : []);
                setPagination(body.pagination || DEFAULT_PAGINATION);
                setStatistics({
                    ...DEFAULT_STATS,
                    ...(body.statistics || {}),
                });
            } else {
                setMembers([]);
                setPagination(DEFAULT_PAGINATION);
                setStatistics(DEFAULT_STATS);
            }
        } catch (error) {
            console.error("Failed to fetch members:", error);

            setMembers([]);
            setPagination(DEFAULT_PAGINATION);
            setStatistics(DEFAULT_STATS);
        } finally {
            setLoading(false);
            setPreLoader(false);
        }
    };

    useEffect(() => {
        fetchStaff();
        fetchPackage();
    }, []);

    useEffect(() => {
        const timer = window.setTimeout(
            () => {
                fetchMembers();
            },
            search.trim() ? 350 : 0
        );

        return () => window.clearTimeout(timer);
    }, [page, limit, filter, search, packageName, trainer, status]);

    const handleQuickFilter = (value: string) => {
        setFilter(value);
        setPage(1);
    };

    const handleSearch = (value: string) => {
        setSearch(value);
        setPage(1);
    };

    const handlePackage = (value: string) => {
        setPackageName(value);
        setPage(1);
    };

    const handleTrainer = (value: string) => {
        setTrainer(value);
        setPage(1);
    };

    const handleStatus = (value: string) => {
        setStatus(value);
        setPage(1);
    };

    const filterLabel = useMemo(() => {
        switch (filter) {
            case "active":
                return "Active";
            case "expiring":
                return "Expiring";
            case "expired":
                return "Expired";
            case "due":
                return "Due Members";
            case "freeze":
                return "Frozen";
            default:
                return "All Members";
        }
    }, [filter]);

    const quickFilters = [
        { key: "all", label: "All Members", count: statistics.total },
        { key: "active", label: "Active", count: statistics.active },
        { key: "expiring", label: "Expiring", count: statistics.expiring },
        { key: "due", label: "Due Members", count: statistics.dueMembers },
        { key: "freeze", label: "Frozen", count: statistics.freeze },
        { key: "expired", label: "Expired", count: statistics.expired },
    ];

    const pageNumbers = useMemo(() => {
        const totalPages = pagination.totalPages;
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, index) => index + 1);
        }

        const values: (number | string)[] = [];
        values.push(1);

        const start = Math.max(2, page - 2);
        const end = Math.min(totalPages - 1, page + 2);

        if (start > 2) values.push("...");
        for (let value = start; value <= end; value++) values.push(value);
        if (end < totalPages - 1) values.push("...");

        values.push(totalPages);
        return values;
    }, [page, pagination.totalPages]);

    return (
        <>
            <Loader loading={preLoader} text="Loading Members..." />
            <PageBreadcrumb pageTitle="Members" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Member Management</h1>
                        <p className="mt-1 text-gray-500">
                            Manage memberships, renewals, attendance and dues.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <Button variant="outline">
                            <Download size={18} className="mr-2" />
                            Export
                        </Button>

                        <Link to="/member/add">
                            <Button>
                                <Plus size={18} className="mr-2" />
                                Add Member
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Dashboard Cards */}
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-8">
                    {/* Total */}
                    <div className="min-w-0">
                        <div className="h-[90px] overflow-hidden rounded-xl border border-gray-200 bg-white px-3 py-2.5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <div className="flex h-full flex-col justify-between">
                                <p className="truncate text-xs font-semibold text-gray-500 dark:text-gray-400">
                                    Total Members
                                </p>

                                <h2 className="text-2xl leading-none font-bold text-gray-900 dark:text-white">
                                    {statistics.total}
                                </h2>

                                <p className="truncate text-[14px] text-green-600">All Members</p>
                            </div>
                        </div>
                    </div>

                    {/* Active */}
                    <div className="min-w-0">
                        <div className="h-[90px] overflow-hidden rounded-xl border border-gray-200 bg-white px-3 py-2.5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <div className="flex h-full flex-col justify-between">
                                <p className="truncate text-xs font-semibold text-gray-500 dark:text-gray-400">
                                    Active Members
                                </p>

                                <h2 className="text-2xl leading-none font-bold text-green-600">
                                    {statistics.active}
                                </h2>

                                <p className="truncate text-[14px] text-gray-500 dark:text-gray-400">
                                    Membership Running
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Expiring */}
                    <div className="min-w-0">
                        <div className="h-[90px] overflow-hidden rounded-xl border border-gray-200 bg-white px-3 py-2.5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <div className="flex h-full flex-col justify-between">
                                <p className="truncate text-xs font-semibold text-gray-500 dark:text-gray-400">
                                    Expiring Soon
                                </p>

                                <h2 className="text-2xl leading-none font-bold text-orange-500">
                                    {statistics.expiring}
                                </h2>

                                <p className="truncate text-[14px] text-gray-500 dark:text-gray-400">
                                    Next 7 Days
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Check-ins */}
                    <div className="min-w-0">
                        <div className="h-[90px] overflow-hidden rounded-xl border border-gray-200 bg-white px-3 py-2.5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <div className="flex h-full flex-col justify-between">
                                <p className="truncate text-xs font-semibold text-gray-500 dark:text-gray-400">
                                    Today's Check-ins
                                </p>

                                <h2 className="text-2xl leading-none font-bold text-indigo-600">
                                    {statistics.todayCheckIn}
                                </h2>

                                <div className="h-1 rounded-full bg-gray-200 dark:bg-gray-700">
                                    <div
                                        className="h-1 rounded-full bg-indigo-600 transition-all duration-500"
                                        style={{
                                            width: `${Math.min(
                                                (statistics.todayCheckIn /
                                                    Math.max(statistics.total, 1)) *
                                                    100,
                                                100
                                            )}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Frozen */}
                    <div className="min-w-0">
                        <div className="h-[90px] overflow-hidden rounded-xl border border-gray-200 bg-white px-3 py-2.5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <div className="flex h-full flex-col justify-between">
                                <p className="truncate text-xs font-semibold text-gray-500 dark:text-gray-400">
                                    Frozen Members
                                </p>

                                <h2 className="text-2xl leading-none font-bold text-sky-600">
                                    {statistics.freeze}
                                </h2>

                                <p className="truncate text-[14px] text-gray-500 dark:text-gray-400">
                                    Membership Hold
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Gym Points */}
                    <div className="min-w-0">
                        <div className="h-[90px] overflow-hidden rounded-xl border border-gray-200 bg-white px-3 py-2.5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <div className="flex h-full flex-col justify-between">
                                <p className="truncate text-xs font-semibold text-gray-500 dark:text-gray-400">
                                    Gym Points
                                </p>

                                <h2 className="truncate text-2xl leading-none font-bold text-purple-600">
                                    {statistics.gymPoints.toLocaleString("en-IN")}
                                </h2>

                                <p className="truncate text-[14px] text-gray-500 dark:text-gray-400">
                                    Loyalty Rewards
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Upcoming Renewals */}
                    <div className="min-w-0">
                        <div className="h-[90px] overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-3 py-2.5 text-white shadow-md">
                            <div className="flex h-full flex-col justify-between">
                                <p className="truncate text-xs font-semibold text-orange-100">
                                    Upcoming Renewals
                                </p>

                                <h2 className="text-2xl leading-none font-bold">
                                    {statistics.expiryThisMonth}
                                </h2>

                                <p className="truncate text-[14px] text-orange-100">This Month</p>
                            </div>
                        </div>
                    </div>

                    {/* Outstanding */}
                    <div className="min-w-0">
                        <div className="h-[90px] overflow-hidden rounded-xl bg-gradient-to-r from-yellow-600 to-yellow-700 px-3 py-2.5 text-white shadow-md">
                            <div className="flex h-full flex-col justify-between">
                                <div className="flex items-center justify-between gap-1">
                                    <p className="truncate text-xs font-semibold text-yellow-100">
                                        Outstanding
                                    </p>

                                    <span className="shrink-0 rounded-full bg-white/20 px-1.5 py-0.5 text-[12px] font-medium">
                                        {statistics.dueMembers} Due
                                    </span>
                                </div>

                                <h2 className="truncate text-2xl leading-none font-bold">
                                    ₹{statistics.totalDue.toLocaleString("en-IN")}
                                </h2>

                                <p className="text-[14px] text-yellow-100">Pending Payment</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Filters */}
                <div className="flex flex-wrap items-center gap-2">
                    {quickFilters.map((item) => (
                        <button
                            key={item.key}
                            onClick={() => handleQuickFilter(item.key)}
                            className={`group inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-[14px] font-medium transition-all duration-200 ${
                                filter === item.key
                                    ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                                    : "border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-blue-700 dark:hover:bg-blue-950/30"
                            }`}
                        >
                            <span className="whitespace-nowrap">{item.label}</span>

                            <span
                                className={`inline-flex min-w-[22px] items-center justify-center rounded-md px-1.5 py-0.5 text-[12px] leading-none font-bold ${
                                    filter === item.key
                                        ? "bg-white/20 text-white"
                                        : "bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600 dark:bg-gray-800 dark:text-gray-300"
                                }`}
                            >
                                {item.count}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Toolbar */}
                <div className="rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <div className="grid grid-cols-12 gap-5 p-6">
                        <div className="col-span-12 xl:col-span-4">
                            <div className="relative">
                                <Search
                                    size={18}
                                    className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
                                />
                                <Input
                                    placeholder="Search by name, UID or mobile..."
                                    value={search}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    className="pl-11"
                                />
                            </div>
                        </div>

                        <div className="col-span-6 md:col-span-3 xl:col-span-2">
                            <select
                                value={packageName}
                                onChange={(e) => handlePackage(e.target.value)}
                                className="h-11 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm dark:border-gray-700 dark:bg-gray-900"
                            >
                                <option value="All">All Packages</option>
                                {packageList.map((item) => (
                                    <option key={item._id} value={item.packageName}>
                                        {item.packageName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-span-6 md:col-span-3 xl:col-span-2">
                            <select
                                value={trainer}
                                onChange={(e) => handleTrainer(e.target.value)}
                                className="h-11 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm dark:border-gray-700 dark:bg-gray-900"
                            >
                                <option value="All"> All Trainers </option>
                                {staff.map((item) => (
                                    <option key={item._id} value={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-span-6 md:col-span-3 xl:col-span-2">
                            <select
                                value={status}
                                onChange={(e) => handleStatus(e.target.value)}
                                className="h-11 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm dark:border-gray-700 dark:bg-gray-900"
                            >
                                <option>Status</option>
                                <option>Active</option>
                                <option>Expiring</option>
                                <option>Expired</option>
                                <option>Freeze</option>
                            </select>
                        </div>

                        <div className="col-span-6 md:col-span-3 xl:col-span-2">
                            <Button
                                variant="outline"
                                className="w-full justify-center"
                                onClick={handleRefresh}
                            >
                                <Filter size={17} className="mr-2" />
                                Refresh
                            </Button>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 px-6 py-4 dark:border-gray-800">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex flex-wrap gap-3">
                                <Badge color="primary">
                                    {pagination.total} {filterLabel}
                                </Badge>
                                <Badge color="success">{statistics.active} Active</Badge>
                                <Badge color="warning">{statistics.expiring} Expiring</Badge>
                                <Badge color="error">
                                    ₹{statistics.totalDue.toLocaleString("en-IN")} Due
                                </Badge>
                            </div>
                            <div className="text-sm text-gray-500">
                                Page {pagination.page} of {Math.max(pagination.totalPages, 1)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Member Table */}
                <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-800">
                                <tr>
                                    <th className="px-6 py-4 text-left">Member</th>
                                    <th className="px-6 py-4 text-left">Membership</th>
                                    <th className="px-6 py-4 text-left">Attendance</th>
                                    <th className="px-6 py-4 text-left">Outstanding</th>
                                    <th className="px-6 py-4 text-left">Expiry</th>
                                    <th className="px-6 py-4 text-left">Status</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {loading ? (
                                    [...Array(8)].map((_, index) => (
                                        <tr key={index}>
                                            <td colSpan={7} className="px-6 py-5">
                                                <div className="h-20 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-700" />
                                            </td>
                                        </tr>
                                    ))
                                ) : members.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-16 text-center">
                                            <div className="flex flex-col items-center justify-center text-gray-500">
                                                <UserX size={42} className="mb-3" />
                                                <h3 className="font-semibold text-gray-700 dark:text-gray-200">
                                                    No members found
                                                </h3>
                                                <p className="mt-1 text-sm">
                                                    Try changing the search or filters.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    members.map((member, index) => {
                                        const isLastRow = index === members.length - 1;
                                        const attendance = Number(member.attendance || 0);
                                        const totalAttendance = Number(member.totalAttendance || 0);
                                        const attendancePercent =
                                            totalAttendance > 0
                                                ? Math.min(
                                                      Math.round(
                                                          (attendance / totalAttendance) * 100
                                                      ),
                                                      100
                                                  )
                                                : 0;
                                        const imageUrl = getImageUrl(member.photo);

                                        return (
                                            <tr
                                                key={member._id}
                                                className="border-b border-gray-100 transition hover:bg-blue-50/40 dark:border-gray-800 dark:hover:bg-gray-800"
                                            >
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-4">
                                                        {imageUrl ? (
                                                            <img
                                                                src={imageUrl}
                                                                alt={member.name}
                                                                className="h-14 w-14 rounded-2xl object-cover ring-1 ring-gray-200 dark:ring-gray-700"
                                                                onError={(event) => {
                                                                    event.currentTarget.style.display =
                                                                        "none";
                                                                    event.currentTarget.nextElementSibling?.classList.remove(
                                                                        "hidden"
                                                                    );
                                                                }}
                                                            />
                                                        ) : null}

                                                        <div
                                                            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-xl font-bold text-white ${
                                                                imageUrl ? "hidden" : ""
                                                            }`}
                                                        >
                                                            {member.name
                                                                ?.charAt(0)
                                                                ?.toUpperCase() || "M"}
                                                        </div>

                                                        <div>
                                                            <h3 className="font-semibold">
                                                                {member.name}
                                                            </h3>
                                                            <p className="text-sm text-gray-500">
                                                                UID : {member.uid}
                                                            </p>
                                                            <p className="text-sm text-gray-500">
                                                                {member.mobile}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-5">
                                                    <div className="space-y-2">
                                                        <Badge color="primary">
                                                            {member.packageName || "-"}
                                                        </Badge>
                                                        <p className="text-sm text-gray-500">
                                                            Trainer :{" "}
                                                            {member.trainer || "Not Assigned"}
                                                        </p>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-5">
                                                    <div className="w-40">
                                                        <div className="mb-2 flex justify-between text-xs">
                                                            <span>
                                                                {attendance}/{totalAttendance}
                                                            </span>
                                                            <span>{attendancePercent}%</span>
                                                        </div>
                                                        <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                                                            <div
                                                                className="h-2 rounded-full bg-green-600 transition-all"
                                                                style={{
                                                                    width: `${attendancePercent}%`,
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-5">
                                                    {Number(member.due || 0) === 0 ? (
                                                        <Badge color="success">Paid</Badge>
                                                    ) : (
                                                        <div>
                                                            <h4 className="font-semibold text-red-600">
                                                                ₹
                                                                {Number(
                                                                    member.due || 0
                                                                ).toLocaleString("en-IN")}
                                                            </h4>
                                                            <p className="text-xs text-gray-500">
                                                                Outstanding
                                                            </p>
                                                        </div>
                                                    )}
                                                </td>

                                                <td className="px-6 py-5">
                                                    <div>
                                                        <h4 className="font-semibold">
                                                            {member.expiryDate || "-"}
                                                        </h4>
                                                        {member.status === "EXPIRED" ? (
                                                            <p className="text-xs text-red-500">
                                                                Expired
                                                            </p>
                                                        ) : member.daysLeft === 0 ? (
                                                            <p className="text-xs text-orange-500">
                                                                Expires today
                                                            </p>
                                                        ) : (
                                                            <p className="text-xs text-orange-500">
                                                                {member.daysLeft}{" "}
                                                                {member.daysLeft === 1
                                                                    ? "day"
                                                                    : "days"}{" "}
                                                                left
                                                            </p>
                                                        )}
                                                    </div>
                                                </td>

                                                <td className="px-6 py-5">
                                                    {member.status === "ACTIVE" && (
                                                        <Badge color="success">ACTIVE</Badge>
                                                    )}
                                                    {member.status === "EXPIRING" && (
                                                        <Badge color="warning">EXPIRING</Badge>
                                                    )}
                                                    {member.status === "EXPIRED" && (
                                                        <Badge color="error">EXPIRED</Badge>
                                                    )}
                                                    {member.status === "FREEZE" && (
                                                        <Badge color="info">FREEZE</Badge>
                                                    )}
                                                </td>

                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        {/* View Profile */}
                                                        <Link
                                                            to={`/dashboard/profile/${member._id}`}
                                                        >
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                className="h-8 px-3 text-xs"
                                                            >
                                                                <User
                                                                    size={14}
                                                                    className="mr-1.5"
                                                                />
                                                                Profile
                                                            </Button>
                                                        </Link>

                                                        {/* Renew */}
                                                        <Link
                                                            to={`/dashboard/renewmebership/${member._id}`}
                                                        >
                                                            <Button
                                                                size="sm"
                                                                variant="primary"
                                                                className="h-8 px-3 text-xs"
                                                            >
                                                                <RefreshCw
                                                                    size={14}
                                                                    className="mr-1.5"
                                                                />
                                                                Renew
                                                            </Button>
                                                        </Link>

                                                        {/* More Actions */}
                                                        <div className="relative">
                                                            <Button
                                                                type="button"
                                                                size="sm"
                                                                variant="outline"
                                                                className="h-8 w-8 shrink-0 p-0"
                                                                onClick={() =>
                                                                    setOpenActionMenu(
                                                                        openActionMenu ===
                                                                            member._id
                                                                            ? null
                                                                            : member._id
                                                                    )
                                                                }
                                                            >
                                                                <span className="mt-0 flex flex-col items-center justify-center gap-[2px]">
                                                                    <span className="h-1 w-1 rounded-full bg-gray-600 dark:bg-gray-300" />
                                                                    <span className="h-1 w-1 rounded-full bg-gray-600 dark:bg-gray-300" />
                                                                    <span className="h-1 w-1 rounded-full bg-gray-600 dark:bg-gray-300" />
                                                                </span>
                                                            </Button>

                                                            {openActionMenu === member._id && (
                                                                <div
                                                                    className={`absolute right-0 z-[9999] w-52 overflow-hidden rounded-xl border border-gray-200 bg-white py-1 text-left shadow-2xl dark:border-gray-700 dark:bg-gray-900 ${
                                                                        isLastRow
                                                                            ? "bottom-full mb-2"
                                                                            : "top-full mt-2"
                                                                    }`}
                                                                >
                                                                    {/* Collect Due */}
                                                                    <Link
                                                                        to={`/dashboard/collect-due/${member._id}`}
                                                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"
                                                                    >
                                                                        <WalletCards size={16} />
                                                                        <span>Collect Due</span>
                                                                    </Link>

                                                                    {/* Follow Up */}
                                                                    <Link
                                                                        to={`/dashboard/follow-up/${member._id}`}
                                                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"
                                                                    >
                                                                        <PhoneCall size={16} />
                                                                        <span>Follow-up</span>
                                                                    </Link>

                                                                    {/* Edit */}
                                                                    <Link
                                                                        to={`/dashboard/member/edit/${member._id}`}
                                                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"
                                                                    >
                                                                        <Pencil size={16} />
                                                                        <span>Edit Member</span>
                                                                    </Link>

                                                                    {/* Membership History */}
                                                                    <Link
                                                                        to={`/dashboard/member/${member._id}/membership-history`}
                                                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"
                                                                    >
                                                                        <History size={16} />
                                                                        <span>
                                                                            Membership History
                                                                        </span>
                                                                    </Link>

                                                                    <div className="my-1 border-t border-gray-100 dark:border-gray-800" />

                                                                    {/* Freeze */}
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setOpenActionMenu(null);
                                                                        }}
                                                                        className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-950/30"
                                                                    >
                                                                        <Snowflake size={16} />
                                                                        <span>
                                                                            Freeze Membership
                                                                        </span>
                                                                    </button>

                                                                    {/* Delete */}
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setOpenActionMenu(null);
                                                                        }}
                                                                        className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                                                                    >
                                                                        <Trash2 size={16} />
                                                                        <span>Delete Member</span>
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer / Pagination */}
                <div className="border-t border-gray-200 bg-gray-50 px-6 py-5 dark:border-gray-800 dark:bg-gray-900">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                                Showing <span className="mx-2 text-blue-600">{members.length}</span>{" "}
                                of
                                <span className="mx-2 text-blue-600">{pagination.total}</span>{" "}
                                Members
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Page {pagination.page} of {Math.max(pagination.totalPages, 1)}
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={!pagination.hasPreviousPage || loading}
                                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            >
                                Previous
                            </Button>

                            {pageNumbers.map((pageNumber, index) =>
                                pageNumber === "..." ? (
                                    <span key={`dots-${index}`} className="px-2 text-gray-500">
                                        ...
                                    </span>
                                ) : (
                                    <Button
                                        key={pageNumber}
                                        size="sm"
                                        variant={page === pageNumber ? "primary" : "outline"}
                                        disabled={loading}
                                        onClick={() => setPage(Number(pageNumber))}
                                    >
                                        {pageNumber}
                                    </Button>
                                )
                            )}

                            <Button
                                variant="outline"
                                size="sm"
                                disabled={!pagination.hasNextPage || loading}
                                onClick={() => setPage((prev) => prev + 1)}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
