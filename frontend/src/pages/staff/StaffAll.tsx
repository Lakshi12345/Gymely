import { useEffect, useMemo, useState } from "react";
import {
    Users,
    UserCheck,
    UserX,
    Wallet,
    Search,
    Plus,
    Eye,
    Pencil,
    Trash2,
    MoreVertical,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";
import Badge from "../../components/ui/badge/Badge";
import Select from "../../components/form/Select";
import api from "../../services/api";

interface Staff {
    _id: string;
    uid: string;
    name: string;
    mobile: string;
    email: string;
    designation: string;
    role: string;
    salary: number;
    status: boolean;
    joiningDate: string;
}

interface MenuPosition {
    top: number;
    left: number;
}

export default function StaffAll() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [staffs, setStaffs] = useState<Staff[]>([]);

    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");

    const [selectedAction, setSelectedAction] = useState<string | null>(null);

    const [menuPosition, setMenuPosition] = useState<MenuPosition | null>(null);

    // =========================================================
    // FETCH STAFF
    // =========================================================

    const fetchStaff = async () => {
        try {
            setLoading(true);

            const response = await api.get("/staff/getStaff");

            console.log("STAFF API RESPONSE:", response.data);

            const staffData = response.data?.data || [];

            const formattedStaff: Staff[] = staffData.map((item: any) => ({
                _id: item._id,
                uid: item.uid || "",
                name: item.name || "",
                mobile: item.mobile || "",
                email: item.email || "",
                designation: item.designation || "",
                role: item.role || "",
                salary: Number(item.basicSalary || 0),
                status: item.status === "active",
                joiningDate: item.joiningDate || "",
            }));

            setStaffs(formattedStaff);
        } catch (error: any) {
            console.error("Failed to fetch staff:", error);

            setStaffs([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStaff();
    }, []);

    // =========================================================
    // ROLE OPTIONS
    // =========================================================

    const roleOptions = useMemo(() => {
        const roles = Array.from(new Set(staffs.map((staff) => staff.role).filter(Boolean)));

        return [
            {
                value: "all",
                label: "All Roles",
            },
            ...roles.map((role) => ({
                value: role,
                label: role,
            })),
        ];
    }, [staffs]);

    // =========================================================
    // FILTER STAFF
    // =========================================================

    const filteredStaff = useMemo(() => {
        return staffs.filter((staff) => {
            const keyword = search.toLowerCase().trim();

            const searchMatch =
                !keyword ||
                staff.name.toLowerCase().includes(keyword) ||
                staff.mobile.includes(keyword) ||
                staff.email.toLowerCase().includes(keyword) ||
                staff.uid.toLowerCase().includes(keyword) ||
                staff.designation.toLowerCase().includes(keyword);

            const roleMatch = roleFilter === "all" ? true : staff.role === roleFilter;

            const statusMatch =
                statusFilter === "all"
                    ? true
                    : statusFilter === "active"
                      ? staff.status
                      : !staff.status;

            return searchMatch && roleMatch && statusMatch;
        });
    }, [staffs, search, roleFilter, statusFilter]);

    // =========================================================
    // STATISTICS
    // =========================================================

    const totalStaff = staffs.length;

    const activeStaff = staffs.filter((staff) => staff.status).length;

    const inactiveStaff = totalStaff - activeStaff;

    const totalSalary = staffs.reduce((sum, staff) => sum + Number(staff.salary || 0), 0);

    // =========================================================
    // CLOSE ACTION MENU
    // =========================================================

    const closeActionMenu = () => {
        setSelectedAction(null);
        setMenuPosition(null);
    };

    // =========================================================
    // OPEN ACTION MENU
    // =========================================================

    const openActionMenu = (event: React.MouseEvent<HTMLButtonElement>, staffId: string) => {
        event.stopPropagation();

        if (selectedAction === staffId) {
            closeActionMenu();
            return;
        }

        const rect = event.currentTarget.getBoundingClientRect();

        const menuWidth = 208;
        const menuHeight = 150;
        const gap = 8;

        let left = rect.right - menuWidth;

        let top = rect.bottom + gap;

        // Keep menu inside right side of screen
        if (left < 8) {
            left = 8;
        }

        if (left + menuWidth > window.innerWidth - 8) {
            left = window.innerWidth - menuWidth - 8;
        }

        // If menu goes below viewport,
        // open it above the button
        if (top + menuHeight > window.innerHeight - 8) {
            top = rect.top - menuHeight - gap;
        }

        // Safety for very small screens
        if (top < 8) {
            top = 8;
        }

        setSelectedAction(staffId);

        setMenuPosition({
            top,
            left,
        });
    };

    // =========================================================
    // VIEW
    // =========================================================

    const handleView = (staff: Staff) => {
        closeActionMenu();

        navigate(`/staff/view/${staff._id}`);
    };

    // =========================================================
    // EDIT
    // =========================================================

    const handleEdit = (staff: Staff) => {
        closeActionMenu();
        navigate(`/dashboard/staffedit/${staff._id}`);
    };

    // =========================================================
    // DELETE
    // =========================================================

    const handleDelete = async (staff: Staff) => {
        const confirmed = window.confirm(`Are you sure you want to delete ${staff.name}?`);

        if (!confirmed) {
            return;
        }

        try {
            setLoading(true);

            closeActionMenu();

            const response = await api.delete(`/staff/deleteStaff/${staff._id}`);

            console.log("DELETE STAFF RESPONSE:", response.data);

            if (response.data?.status) {
                setStaffs((prev) => prev.filter((item) => item._id !== staff._id));
            }
        } catch (error: any) {
            console.error("Failed to delete staff:", error);

            alert(error?.response?.data?.error || "Failed to delete staff");
        } finally {
            setLoading(false);
        }
    };

    // =========================================================
    // DATE FORMAT
    // =========================================================

    const formatDate = (date: string) => {
        if (!date) {
            return "-";
        }

        const parsed = new Date(date);

        if (Number.isNaN(parsed.getTime())) {
            return "-";
        }

        return parsed.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    // =========================================================
    // RENDER
    // =========================================================

    return (
        <>
            <PageBreadcrumb pageTitle="Staff" />

            <div className="space-y-6">
                {/* =====================================================
                    HEADER
                ====================================================== */}

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Staff Management
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Manage trainers, managers, receptionists and other staff.
                        </p>
                    </div>

                    <Link to="/dashboard/staffadd">
                        <Button>
                            <Plus size={18} className="mr-2" />
                            Add Staff
                        </Button>
                    </Link>
                </div>

                {/* =====================================================
                    STATISTICS
                ====================================================== */}

                <div className="grid grid-cols-12 gap-4">
                    {/* TOTAL */}

                    <div className="col-span-12 sm:col-span-6 xl:col-span-3">
                        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium text-gray-500">Total Staff</p>

                                    <h2 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                                        {totalStaff}
                                    </h2>

                                    <p className="mt-1 text-xs text-green-600">Registered Staff</p>
                                </div>

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30">
                                    <Users size={22} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ACTIVE */}

                    <div className="col-span-12 sm:col-span-6 xl:col-span-3">
                        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium text-gray-500">
                                        Active Staff
                                    </p>

                                    <h2 className="mt-1 text-2xl font-bold text-green-600">
                                        {activeStaff}
                                    </h2>

                                    <p className="mt-1 text-xs text-gray-500">Currently Working</p>
                                </div>

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-900/30">
                                    <UserCheck size={22} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* INACTIVE */}

                    <div className="col-span-12 sm:col-span-6 xl:col-span-3">
                        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium text-gray-500">
                                        Inactive Staff
                                    </p>

                                    <h2 className="mt-1 text-2xl font-bold text-red-600">
                                        {inactiveStaff}
                                    </h2>

                                    <p className="mt-1 text-xs text-gray-500">Disabled Accounts</p>
                                </div>

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-900/30">
                                    <UserX size={22} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SALARY */}

                    <div className="col-span-12 sm:col-span-6 xl:col-span-3">
                        <div className="rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 p-4 text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-green-100">Monthly Salary</p>

                                    <h2 className="mt-1 text-2xl font-bold">
                                        ₹{totalSalary.toLocaleString("en-IN")}
                                    </h2>

                                    <p className="mt-1 text-xs text-green-100">Total Payroll</p>
                                </div>

                                <div className="rounded-xl bg-white/20 p-3">
                                    <Wallet size={22} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* =====================================================
                    SEARCH / FILTER
                ====================================================== */}

                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <div className="p-5">
                        <div className="grid grid-cols-12 gap-4">
                            {/* SEARCH */}

                            <div className="col-span-12 lg:col-span-5">
                                <div className="relative">
                                    <Search
                                        size={18}
                                        className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
                                    />

                                    <Input
                                        placeholder="Search staff..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="pl-11"
                                    />
                                </div>
                            </div>

                            {/* ROLE */}

                            <div className="col-span-12 md:col-span-4 lg:col-span-3">
                                <Select
                                    value={roleFilter}
                                    onChange={(value) => setRoleFilter(String(value))}
                                    options={roleOptions}
                                />
                            </div>

                            {/* STATUS */}

                            <div className="col-span-12 md:col-span-4 lg:col-span-2">
                                <Select
                                    value={statusFilter}
                                    onChange={(value) => setStatusFilter(String(value))}
                                    options={[
                                        {
                                            value: "all",
                                            label: "All Status",
                                        },
                                        {
                                            value: "active",
                                            label: "Active",
                                        },
                                        {
                                            value: "inactive",
                                            label: "Inactive",
                                        },
                                    ]}
                                />
                            </div>

                            {/* RESULTS */}

                            <div className="col-span-12 flex items-center justify-end md:col-span-4 lg:col-span-2">
                                <Badge color="primary">{filteredStaff.length} Results</Badge>
                            </div>
                        </div>
                    </div>
                </div>

                {/* =====================================================
                    TABLE
                ====================================================== */}

                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-800">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">
                                        Staff
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">
                                        UID
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">
                                        Mobile
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">
                                        Designation
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">
                                        Role
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">
                                        Joining Date
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">
                                        Salary
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
                                {/* LOADING */}

                                {loading ? (
                                    [...Array(6)].map((_, index) => (
                                        <tr key={index}>
                                            <td colSpan={9} className="px-6 py-5">
                                                <div className="h-12 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-700" />
                                            </td>
                                        </tr>
                                    ))
                                ) : filteredStaff.length === 0 ? (
                                    /* EMPTY */

                                    <tr>
                                        <td colSpan={9} className="py-20 text-center">
                                            <Users size={50} className="mx-auto text-gray-300" />

                                            <h3 className="mt-4 text-lg font-semibold text-gray-700 dark:text-white">
                                                No Staff Found
                                            </h3>

                                            <p className="mt-2 text-sm text-gray-500">
                                                Try changing the filters or add a new staff member.
                                            </p>
                                        </td>
                                    </tr>
                                ) : (
                                    /* STAFF */

                                    filteredStaff.map((staff) => (
                                        <tr
                                            key={staff._id}
                                            className="transition hover:bg-gray-50 dark:hover:bg-gray-800"
                                        >
                                            {/* STAFF */}

                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 font-semibold text-white">
                                                        {staff.name.charAt(0).toUpperCase()}
                                                    </div>

                                                    <div className="min-w-0">
                                                        <h4 className="truncate font-semibold text-gray-900 dark:text-white">
                                                            {staff.name}
                                                        </h4>

                                                        <p className="max-w-[220px] truncate text-sm text-gray-500">
                                                            {staff.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* UID */}

                                            <td className="px-6 py-5">
                                                <Badge color="light">{staff.uid || "-"}</Badge>
                                            </td>

                                            {/* MOBILE */}

                                            <td className="px-6 py-5">
                                                <span className="font-medium">{staff.mobile}</span>
                                            </td>

                                            {/* DESIGNATION */}

                                            <td className="px-6 py-5">
                                                {staff.designation || "-"}
                                            </td>

                                            {/* ROLE */}

                                            <td className="px-6 py-5">
                                                <Badge color="info">{staff.role || "-"}</Badge>
                                            </td>

                                            {/* JOINING DATE */}

                                            <td className="px-6 py-5">
                                                {formatDate(staff.joiningDate)}
                                            </td>

                                            {/* SALARY */}

                                            <td className="px-6 py-5">
                                                <span className="font-semibold text-green-600">
                                                    ₹
                                                    {Number(staff.salary || 0).toLocaleString(
                                                        "en-IN"
                                                    )}
                                                </span>
                                            </td>

                                            {/* STATUS */}

                                            <td className="px-6 py-5">
                                                {staff.status ? (
                                                    <Badge color="success">Active</Badge>
                                                ) : (
                                                    <Badge color="error">Inactive</Badge>
                                                )}
                                            </td>

                                            {/* ACTION */}

                                            <td className="px-6 py-5 text-right">
                                                <button
                                                    type="button"
                                                    onClick={(e) => openActionMenu(e, staff._id)}
                                                    className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
                                                >
                                                    <MoreVertical size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* =====================================================
                    FOOTER
                ====================================================== */}

                <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-sm md:flex-row md:items-center md:justify-between dark:border-gray-800 dark:bg-gray-900">
                    <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                            Showing {filteredStaff.length} of {staffs.length} Staff
                        </h4>

                        <p className="mt-1 text-sm text-gray-500">Manage your gym staff members.</p>
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

            {/* =========================================================
                FIXED ACTION MENU
                IMPORTANT: OUTSIDE TABLE
            ========================================================== */}

            {selectedAction && menuPosition && (
                <>
                    {/* BACKDROP */}

                    <div className="fixed inset-0 z-[9998]" onClick={closeActionMenu} />

                    {/* MENU */}

                    <div
                        className="fixed z-[9999] w-52 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900"
                        style={{
                            top: menuPosition.top,
                            left: menuPosition.left,
                        }}
                    >
                        {/* VIEW */}

                        <button
                            type="button"
                            onClick={() => {
                                const staff = staffs.find((item) => item._id === selectedAction);

                                if (staff) {
                                    handleView(staff);
                                }
                            }}
                            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-gray-700 transition hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"
                        >
                            <Eye size={17} />
                            View Details
                        </button>

                        {/* EDIT */}

                        <button
                            type="button"
                            onClick={() => {
                                const staff = staffs.find((item) => item._id === selectedAction);

                                if (staff) {
                                    handleEdit(staff);
                                }
                            }}
                            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-gray-700 transition hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"
                        >
                            <Pencil size={17} />
                            Edit Staff
                        </button>

                        <div className="border-t border-gray-200 dark:border-gray-700" />

                        {/* DELETE */}

                        <button
                            type="button"
                            onClick={() => {
                                const staff = staffs.find((item) => item._id === selectedAction);

                                if (staff) {
                                    handleDelete(staff);
                                }
                            }}
                            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-red-600 transition hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                            <Trash2 size={17} />
                            Delete Staff
                        </button>
                    </div>
                </>
            )}
        </>
    );
}
