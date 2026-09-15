import { useEffect, useMemo, useState } from "react";
import {
    Plus,
    Search,
    Users,
    UserCheck,
    UserX,
    Target,
    MoreVertical,
    Eye,
    Pencil,
    Trash2,
    KeyRound,
    Copy,
} from "lucide-react";
import { Link } from "react-router-dom";

import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";
import Select from "../../components/form/Select";
import Badge from "../../components/ui/badge/Badge";
import api from "../../services/api";
import { useNavigate } from "react-router";

interface Operator {
    _id: string;
    name: string;
    mobile: string;
    email: string;
    gender: string;
    status: "active" | "inactive";

    permissions: Record<string, boolean>;

    salesTarget: {
        bonus: number;
        incentivePercent: number;
        revenueTarget: number;
    };

    createdAt: string;
}

interface MenuPosition {
    top: number;
    left: number;
}

export default function OperatorAll() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [operators, setOperators] = useState<Operator[]>([]);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("all");

    const [selectedAction, setSelectedAction] = useState<string | null>(null);

    const [menuPosition, setMenuPosition] = useState<MenuPosition | null>(null);

    const fetchOperators = async () => {
        try {
            setLoading(true);

            const response = await api.get("/operator/getOperatorList");

            console.log("Operator API:", response.data);

            if (response.data.status) {
                setOperators(response.data.data || []);
            } else {
                setOperators([]);
            }
        } catch (error) {
            console.error("Failed to load operators:", error);
            setOperators([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOperators();
    }, []);

    const filteredOperators = useMemo(() => {
        return operators.filter((item) => {
            const keyword = search.toLowerCase().trim();

            const matchSearch =
                !keyword ||
                item.name?.toLowerCase().includes(keyword) ||
                item.mobile?.includes(keyword) ||
                item.email?.toLowerCase().includes(keyword);

            const matchStatus =
                statusFilter === "all"
                    ? true
                    : statusFilter === "active"
                      ? item.status === "active"
                      : item.status === "inactive";

            return matchSearch && matchStatus;
        });
    }, [operators, search, statusFilter]);

    const totalOperators = operators.length;

    const activeOperators = operators.filter((item) => item.status === "active").length;

    const inactiveOperators = operators.filter((item) => item.status === "inactive").length;

    const totalRevenueTarget = operators.reduce(
        (sum, item) => sum + Number(item.salesTarget?.revenueTarget || 0),
        0
    );

    const openActionMenu = (event: React.MouseEvent<HTMLButtonElement>, operatorId: string) => {
        const rect = event.currentTarget.getBoundingClientRect();

        const menuWidth = 224;
        const menuHeight = 245;
        const spacing = 8;

        let left = rect.right - menuWidth;

        if (left < 10) {
            left = 10;
        }

        if (left + menuWidth > window.innerWidth - 10) {
            left = window.innerWidth - menuWidth - 10;
        }

        let top = rect.bottom + spacing;

        // If there isn't enough space below,
        // open the menu above the button.
        if (top + menuHeight > window.innerHeight - 10) {
            top = rect.top - menuHeight - spacing;
        }

        // Prevent the menu from going above the viewport.
        if (top < 10) {
            top = 10;
        }

        if (selectedAction === operatorId) {
            setSelectedAction(null);
            setMenuPosition(null);
            return;
        }

        setSelectedAction(operatorId);

        setMenuPosition({
            top,
            left,
        });
    };

    const closeActionMenu = () => {
        setSelectedAction(null);
        setMenuPosition(null);
    };

    useEffect(() => {
        if (!selectedAction) {
            return;
        }

        const handleScroll = () => {
            closeActionMenu();
        };

        const handleResize = () => {
            closeActionMenu();
        };

        window.addEventListener("scroll", handleScroll, true);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("scroll", handleScroll, true);
            window.removeEventListener("resize", handleResize);
        };
    }, [selectedAction]);

    const handleViewOperator = () => {
        const operator = operators.find((item) => item._id === selectedAction);

        if (!operator) return;

        console.log("VIEW OPERATOR:", operator);
        navigate(`/dashboard/operatorEdit/${operator._id}`);
        closeActionMenu();
    };

    return (
        <>
            <PageBreadcrumb pageTitle="Operators" />

            <div className="space-y-6">
                {/* ================= HEADER ================= */}

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Operators
                        </h1>

                        <p className="text-gray-500">
                            Manage all gym operators and their permissions.
                        </p>
                    </div>

                    <Link to="/dashboard/operatoradd">
                        <Button>
                            <Plus size={18} className="mr-2" />
                            Add Operator
                        </Button>
                    </Link>
                </div>

                {/* ================= STATISTICS ================= */}

                <div className="grid grid-cols-12 gap-4">
                    {/* TOTAL STAFF */}

                    <div className="col-span-12 sm:col-span-6 xl:col-span-3">
                        <div className="group rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
                            <div className="flex items-center justify-between gap-3">
                                <div className="min-w-0">
                                    <p className="text-xs font-medium text-gray-500">Total Staff</p>

                                    <h2 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                                        {totalOperators}
                                    </h2>

                                    <p className="mt-1 text-xs text-gray-500">Registered Staff</p>
                                </div>

                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition group-hover:scale-105 dark:bg-blue-900/30">
                                    <Users size={22} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ACTIVE STAFF */}

                    <div className="col-span-12 sm:col-span-6 xl:col-span-3">
                        <div className="group rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
                            <div className="flex items-center justify-between gap-3">
                                <div className="min-w-0">
                                    <p className="text-xs font-medium text-gray-500">
                                        Active Staff
                                    </p>

                                    <h2 className="mt-1 text-2xl font-bold text-green-600">
                                        {activeOperators}
                                    </h2>

                                    <p className="mt-1 text-xs text-gray-500">Currently Working</p>
                                </div>

                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600 transition group-hover:scale-105 dark:bg-green-900/30">
                                    <UserCheck size={22} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* INACTIVE STAFF */}

                    <div className="col-span-12 sm:col-span-6 xl:col-span-3">
                        <div className="group rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
                            <div className="flex items-center justify-between gap-3">
                                <div className="min-w-0">
                                    <p className="text-xs font-medium text-gray-500">
                                        Inactive Staff
                                    </p>

                                    <h2 className="mt-1 text-2xl font-bold text-red-600">
                                        {inactiveOperators}
                                    </h2>

                                    <p className="mt-1 text-xs text-gray-500">Disabled Accounts</p>
                                </div>

                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600 transition group-hover:scale-105 dark:bg-red-900/30">
                                    <UserX size={22} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* REVENUE TARGET */}

                    <div className="col-span-12 sm:col-span-6 xl:col-span-3">
                        <div className="group rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white shadow-md transition hover:-translate-y-0.5">
                            <div className="flex items-center justify-between gap-3">
                                <div className="min-w-0">
                                    <p className="text-xs text-blue-100">Revenue Target</p>

                                    <h2 className="mt-1 text-2xl font-bold">
                                        ₹{totalRevenueTarget.toLocaleString("en-IN")}
                                    </h2>

                                    <p className="mt-1 text-xs text-blue-100">Monthly Goal</p>
                                </div>

                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/20">
                                    <Target size={22} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= SEARCH & FILTER ================= */}

                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <div className="p-6">
                        <div className="grid grid-cols-12 gap-4">
                            {/* SEARCH */}

                            <div className="col-span-12 lg:col-span-7">
                                <div className="relative">
                                    <Search
                                        size={18}
                                        className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
                                    />

                                    <Input
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search by name, mobile or email..."
                                        className="pl-11"
                                    />
                                </div>
                            </div>

                            {/* STATUS */}

                            <div className="col-span-12 md:col-span-6 lg:col-span-3">
                                <Select
                                    value={statusFilter}
                                    onChange={(value) => setStatusFilter(String(value))}
                                    options={[
                                        {
                                            label: "All Status",
                                            value: "all",
                                        },
                                        {
                                            label: "Active",
                                            value: "active",
                                        },
                                        {
                                            label: "Inactive",
                                            value: "inactive",
                                        },
                                    ]}
                                />
                            </div>

                            {/* RESULT */}

                            <div className="col-span-12 flex items-center justify-end md:col-span-6 lg:col-span-2">
                                <Badge color="primary">{filteredOperators.length} Results</Badge>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= OPERATOR TABLE ================= */}

                <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-800">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">
                                        Operator
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">
                                        Mobile
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">
                                        Login Id
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">
                                        Password
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">
                                        Permissions
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">
                                        Revenue Target
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">
                                        Status
                                    </th>

                                    <th className="px-6 py-4 text-right text-xs font-semibold tracking-wider text-gray-500 uppercase">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {loading ? (
                                    [...Array(6)].map((_, index) => (
                                        <tr key={index}>
                                            <td colSpan={6} className="px-6 py-5">
                                                <div className="h-12 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
                                            </td>
                                        </tr>
                                    ))
                                ) : filteredOperators.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="py-20 text-center">
                                            <Users size={50} className="mx-auto text-gray-300" />

                                            <h3 className="mt-4 text-lg font-semibold text-gray-700 dark:text-white">
                                                No Operators Found
                                            </h3>

                                            <p className="mt-2 text-sm text-gray-500">
                                                Try changing your search or create a new operator.
                                            </p>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredOperators.map((operator) => {
                                        const permissionCount = Object.values(
                                            operator.permissions || {}
                                        ).filter(Boolean).length;

                                        const revenueTarget = Number(
                                            operator.salesTarget?.revenueTarget || 0
                                        );

                                        return (
                                            <tr
                                                key={operator._id}
                                                className="transition hover:bg-gray-50 dark:hover:bg-gray-800"
                                            >
                                                {/* OPERATOR */}

                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 font-semibold text-white">
                                                            {operator.name
                                                                ?.charAt(0)
                                                                .toUpperCase() || "?"}
                                                        </div>

                                                        <div>
                                                            <h4 className="font-semibold text-gray-900 dark:text-white">
                                                                {operator.name}
                                                            </h4>

                                                            <p className="text-sm text-gray-500">
                                                                {operator.gender}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* MOBILE */}

                                                <td className="px-6 py-5">
                                                    <div className="font-medium">
                                                        {operator.mobile}
                                                    </div>
                                                </td>

                                                <td className="px-6 py-5">
                                                    <div className="font-medium">
                                                        {operator.email}
                                                    </div>
                                                </td>

                                                <td className="px-6 py-5">
                                                    <div className="font-medium">
                                                        {operator.password}
                                                    </div>
                                                </td>

                                                {/* PERMISSIONS */}

                                                <td className="px-6 py-5">
                                                    <Badge color="primary">
                                                        {permissionCount} Permissions
                                                    </Badge>
                                                </td>

                                                {/* REVENUE */}

                                                <td className="px-6 py-5">
                                                    <div className="font-semibold">
                                                        ₹{revenueTarget.toLocaleString("en-IN")}
                                                    </div>
                                                </td>

                                                {/* STATUS */}

                                                <td className="px-6 py-5">
                                                    {operator.status === "active" ? (
                                                        <Badge color="success">Active</Badge>
                                                    ) : (
                                                        <Badge color="error">Inactive</Badge>
                                                    )}
                                                </td>

                                                {/* ACTION */}

                                                <td className="px-6 py-5 text-right">
                                                    <button
                                                        type="button"
                                                        onClick={(e) =>
                                                            openActionMenu(e, operator._id)
                                                        }
                                                        className="rounded-lg p-2 transition hover:bg-gray-100 dark:hover:bg-gray-700"
                                                    >
                                                        <MoreVertical size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ================= FOOTER ================= */}

                <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-sm md:flex-row md:items-center md:justify-between dark:border-gray-800 dark:bg-gray-900">
                    <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                            Showing {filteredOperators.length} of {operators.length} Operators
                        </h4>

                        <p className="mt-1 text-sm text-gray-500">
                            Manage operator accounts, permissions and sales targets.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant="outline" disabled>
                            Previous
                        </Button>

                        <Button variant="outline" disabled>
                            Next
                        </Button>
                    </div>
                </div>
            </div>

            {/* ================= FIXED ACTION MENU ================= */}

            {selectedAction && menuPosition && (
                <>
                    {/* Backdrop */}
                    <div className="fixed inset-0 z-[9998]" onClick={closeActionMenu} />

                    {/* Menu */}
                    <div
                        className="fixed z-[9999] w-56 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900"
                        style={{
                            top: menuPosition.top,
                            left: menuPosition.left,
                        }}
                    >
                        <button
                            type="button"
                            onClick={closeActionMenu}
                            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                            <Eye size={17} />
                            View Details
                        </button>

                        <button
                            type="button"
                            onClick={handleViewOperator}
                            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                            <Pencil size={17} />
                            Edit Operator
                        </button>

                        <button
                            type="button"
                            onClick={closeActionMenu}
                            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                            <KeyRound size={17} />
                            Reset Password
                        </button>

                        <button
                            type="button"
                            onClick={closeActionMenu}
                            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                            <Copy size={17} />
                            Copy Permissions
                        </button>

                        <div className="border-t border-gray-200 dark:border-gray-700" />

                        <button
                            type="button"
                            onClick={closeActionMenu}
                            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-red-600 transition hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                            <Trash2 size={17} />
                            Delete Operator
                        </button>
                    </div>
                </>
            )}
        </>
    );
}
