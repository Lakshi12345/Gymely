import { useEffect, useMemo, useState } from "react";
import { Eye, EyeOff, Shield, User, Target, Save, ArrowLeft } from "lucide-react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Checkbox from "../../components/form/input/Checkbox";
import Radio from "../../components/form/input/Radio";
import api from "../../services/api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface OperatorForm {
    name: string;
    mobile: string;
    email: string;
    password: string;
    gender: "Male" | "Female";
}

interface SalesTarget {
    revenueTarget: number;
    bonus: number;
    incentivePercent: number;
}

const permissionGroups = [
    {
        title: "Dashboard",
        permissions: [
            {
                key: "dashboard",
                label: "Dashboard Access",
            },
        ],
    },

    {
        title: "Member Management",
        permissions: [
            {
                key: "members",
                label: "Member Management",
            },
            {
                key: "membership",
                label: "Membership Access",
            },
            {
                key: "attendance",
                label: "Attendance",
            },
            {
                key: "billing",
                label: "Billing",
            },
            {
                key: "memberCount",
                label: "Remove Member Count",
            },
            {
                key: "editMember",
                label: "Edit Member Profile",
            },
            {
                key: "extendMembership",
                label: "Extend Membership",
            },
            {
                key: "upgradeMembership",
                label: "Upgrade Membership",
            },
        ],
    },

    {
        title: "Leads",
        permissions: [
            {
                key: "leads",
                label: "Lead Management",
            },
        ],
    },

    {
        title: "Staff",
        permissions: [
            {
                key: "staff",
                label: "Staff Management",
            },
            {
                key: "staffAttendance",
                label: "Manual Staff Attendance",
            },
        ],
    },

    {
        title: "Business",
        permissions: [
            {
                key: "packages",
                label: "Package Management",
            },
            {
                key: "expense",
                label: "Expense Management",
            },
            {
                key: "sms",
                label: "Bulk SMS & Email",
            },
            {
                key: "salesHistory",
                label: "Sales History",
            },
        ],
    },

    {
        title: "E-Commerce",
        permissions: [
            {
                key: "ecommerce",
                label: "E-Commerce",
            },
            {
                key: "classes",
                label: "Group Classes",
            },
        ],
    },

    {
        title: "Danger Zone",
        permissions: [
            {
                key: "delete",
                label: "Delete Permission",
            },
            {
                key: "backdate",
                label: "Backdate Billing",
            },
            {
                key: "download",
                label: "Download Reports",
            },
            {
                key: "superAdmin",
                label: "Super Admin",
            },
        ],
    },
];

export default function operatorAdd() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const [operator, setOperator] = useState<OperatorForm>({
        name: "",
        mobile: "",
        email: "",
        password: "",
        gender: "Male",
    });

    const [salesTarget, setSalesTarget] = useState<SalesTarget>({
        revenueTarget: 0,
        bonus: 0,
        incentivePercent: 0,
    });

    const [permissions, setPermissions] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const obj: Record<string, boolean> = {};

        permissionGroups.forEach((group) => {
            group.permissions.forEach((permission) => {
                obj[permission.key] = false;
            });
        });

        setPermissions(obj);
    }, []);

    const enabledPermissions = useMemo(() => {
        return Object.values(permissions).filter(Boolean).length;
    }, [permissions]);

    const handleInput = (field: keyof OperatorForm, value: string) => {
        setOperator((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleTarget = (field: keyof SalesTarget, value: string) => {
        setSalesTarget((prev) => ({
            ...prev,
            [field]: Number(value),
        }));
    };

    const togglePermission = (key: string) => {
        setPermissions((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const generatePassword = () => {
        const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";

        let pass = "";

        for (let i = 0; i < 8; i++) {
            pass += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        setOperator((prev) => ({
            ...prev,
            password: pass,
        }));
    };

    const handleSubmit = async () => {
        if (!operator.name.trim()) return toast.error("Enter operator name");

        if (!operator.mobile.trim()) return toast.error("Enter mobile number");

        if (!operator.email.trim()) return toast.error("Enter email");

        if (!operator.password.trim()) return toast.error("Enter password");

        try {
            setLoading(true);

            const payload = {
                ...operator,
                permissions,
                salesTarget,
            };
            await api.post("/operator/create", payload);
            toast.success("Operator created successfully");
            navigate("/dashboard/operatorall");
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <PageBreadcrumb pageTitle="Add Operator" />

            <div className="space-y-6">
                <div className="grid grid-cols-12 gap-6">
                    {/* Left */}

                    <div className="col-span-12 space-y-6 xl:col-span-8">
                        {/* ================= BASIC INFORMATION ================= */}

                        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-800">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30">
                                        <User size={20} />
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            Basic Information
                                        </h2>

                                        <p className="text-sm text-gray-500">
                                            Personal details of the operator.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="grid grid-cols-12 gap-6">
                                    {/* Full Name */}

                                    <div className="col-span-12">
                                        <Label>Full Name</Label>

                                        <Input
                                            placeholder="Enter full name"
                                            value={operator.name}
                                            onChange={(e) => handleInput("name", e.target.value)}
                                        />
                                    </div>

                                    {/* Mobile */}

                                    <div className="col-span-12 lg:col-span-6">
                                        <Label>Mobile Number</Label>

                                        <Input
                                            placeholder="Enter mobile number"
                                            value={operator.mobile}
                                            onChange={(e) => handleInput("mobile", e.target.value)}
                                        />
                                    </div>

                                    {/* Gender */}

                                    <div className="col-span-12 lg:col-span-6">
                                        <Label>Gender</Label>

                                        <div className="mt-3 flex items-center gap-8">
                                            <Radio
                                                id="male"
                                                name="gender"
                                                checked={operator.gender === "Male"}
                                                onChange={() => handleInput("gender", "Male")}
                                                label="Male"
                                            />

                                            <Radio
                                                id="female"
                                                name="gender"
                                                checked={operator.gender === "Female"}
                                                onChange={() => handleInput("gender", "Female")}
                                                label="Female"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ================= LOGIN INFORMATION ================= */}

                        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-800">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30">
                                        <Shield size={20} />
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            Login Credentials
                                        </h2>

                                        <p className="text-sm text-gray-500">
                                            Credentials used to access Gymely.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="grid grid-cols-12 gap-6">
                                    {/* Email */}

                                    <div className="col-span-12 lg:col-span-6">
                                        <Label>Email Address</Label>

                                        <Input
                                            type="email"
                                            placeholder="Enter email"
                                            value={operator.email}
                                            onChange={(e) => handleInput("email", e.target.value)}
                                        />
                                    </div>

                                    {/* Password */}

                                    <div className="col-span-12 lg:col-span-6">
                                        <Label>Password</Label>

                                        <div className="relative">
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Enter password"
                                                value={operator.password}
                                                onChange={(e) =>
                                                    handleInput("password", e.target.value)
                                                }
                                            />

                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                                            >
                                                {showPassword ? (
                                                    <EyeOff size={18} />
                                                ) : (
                                                    <Eye size={18} />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Password Generator */}

                                    <div className="col-span-12">
                                        <div className="rounded-xl border border-dashed border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/10">
                                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                                <div>
                                                    <h4 className="font-medium text-blue-900 dark:text-blue-300">
                                                        Need a secure password?
                                                    </h4>

                                                    <p className="mt-1 text-sm text-blue-700 dark:text-blue-400">
                                                        Generate a strong random password for this
                                                        operator.
                                                    </p>
                                                </div>

                                                <Button
                                                    variant="outline"
                                                    onClick={generatePassword}
                                                >
                                                    Generate Password
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* ================= PERMISSION MANAGEMENT ================= */}

                        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-800">
                                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-900/30">
                                            <Shield size={20} />
                                        </div>

                                        <div>
                                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                Access Permissions
                                            </h2>

                                            <p className="text-sm text-gray-500">
                                                Choose what this operator can access.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="rounded-full bg-violet-50 px-4 py-2 text-sm font-medium text-violet-700 dark:bg-violet-900/20 dark:text-violet-300">
                                        {enabledPermissions} Permissions Enabled
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                    {permissionGroups.map((group) => {
                                        const checkedCount = group.permissions.filter(
                                            (item) => permissions[item.key]
                                        ).length;

                                        const allSelected =
                                            checkedCount === group.permissions.length;

                                        return (
                                            <div
                                                key={group.title}
                                                className="rounded-xl border border-gray-200 dark:border-gray-700"
                                            >
                                                {/* Header */}

                                                <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-5 py-4 dark:border-gray-700 dark:bg-gray-800">
                                                    <div>
                                                        <h3 className="font-semibold text-gray-800 dark:text-white">
                                                            {group.title}
                                                        </h3>

                                                        <p className="text-xs text-gray-500">
                                                            {checkedCount} of{" "}
                                                            {group.permissions.length} selected
                                                        </p>
                                                    </div>

                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => {
                                                            const value = !allSelected;

                                                            const updated = {
                                                                ...permissions,
                                                            };

                                                            group.permissions.forEach((item) => {
                                                                updated[item.key] = value;
                                                            });

                                                            setPermissions(updated);
                                                        }}
                                                    >
                                                        {allSelected ? "Clear" : "Select All"}
                                                    </Button>
                                                </div>

                                                {/* Permissions */}

                                                <div className="space-y-3 p-5">
                                                    {group.permissions.map((permission) => (
                                                        <div
                                                            key={permission.key}
                                                            className="flex items-center justify-between rounded-lg border border-gray-100 p-3 transition hover:border-blue-300 hover:bg-blue-50 dark:border-gray-700 dark:hover:border-blue-700 dark:hover:bg-blue-900/10"
                                                        >
                                                            <div>
                                                                <h4 className="font-medium text-gray-800 dark:text-white">
                                                                    {permission.label}
                                                                </h4>
                                                            </div>

                                                            <Checkbox
                                                                checked={
                                                                    permissions[permission.key]
                                                                }
                                                                onChange={() =>
                                                                    togglePermission(permission.key)
                                                                }
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Summary */}

                                <div className="mt-8 rounded-xl border border-dashed border-indigo-200 bg-indigo-50 p-5 dark:border-indigo-800 dark:bg-indigo-900/10">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-semibold text-indigo-800 dark:text-indigo-300">
                                                Permission Summary
                                            </h3>

                                            <p className="mt-1 text-sm text-indigo-600 dark:text-indigo-400">
                                                The operator currently has{" "}
                                                <span className="font-semibold">
                                                    {enabledPermissions}
                                                </span>{" "}
                                                active permissions.
                                            </p>
                                        </div>

                                        <Shield size={34} className="text-indigo-500" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* ================= SALES TARGET ================= */}

                        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-800">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-900/30">
                                        <Target size={20} />
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            Sales Target
                                        </h2>

                                        <p className="text-sm text-gray-500">
                                            Monthly goals and incentives for this operator.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="grid grid-cols-12 gap-6">
                                    <div className="col-span-12 lg:col-span-4">
                                        <Label>Monthly Revenue Target</Label>

                                        <Input
                                            type="number"
                                            placeholder="0"
                                            value={salesTarget.revenueTarget}
                                            onChange={(e) =>
                                                handleTarget("revenueTarget", e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="col-span-12 lg:col-span-4">
                                        <Label>Bonus</Label>

                                        <Input
                                            type="number"
                                            placeholder="0"
                                            value={salesTarget.bonus}
                                            onChange={(e) => handleTarget("bonus", e.target.value)}
                                        />
                                    </div>

                                    <div className="col-span-12 lg:col-span-4">
                                        <Label>Incentive %</Label>

                                        <Input
                                            type="number"
                                            placeholder="0"
                                            value={salesTarget.incentivePercent}
                                            onChange={(e) =>
                                                handleTarget("incentivePercent", e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ================= RIGHT SIDEBAR ================= */}

                    <div className="col-span-12 xl:col-span-4">
                        <div className="sticky top-6 space-y-6">
                            {/* Profile Card */}

                            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 text-center">
                                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white text-3xl font-bold text-blue-600">
                                        {operator.name
                                            ? operator.name.charAt(0).toUpperCase()
                                            : "O"}
                                    </div>

                                    <h2 className="mt-4 text-xl font-semibold text-white">
                                        {operator.name || "New Operator"}
                                    </h2>

                                    <p className="mt-1 text-blue-100">
                                        {operator.email || "email@example.com"}
                                    </p>
                                </div>

                                <div className="space-y-4 p-6">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500">Mobile</span>

                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {operator.mobile || "--"}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500">Gender</span>

                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {operator.gender}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500">Permissions</span>

                                        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                                            {enabledPermissions}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Sales Summary */}

                            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                                <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-800">
                                    <h3 className="font-semibold">Sales Overview</h3>
                                </div>

                                <div className="space-y-5 p-6">
                                    <div>
                                        <p className="text-sm text-gray-500">Revenue Target</p>

                                        <h2 className="mt-1 text-2xl font-bold">
                                            ₹{salesTarget.revenueTarget.toLocaleString()}
                                        </h2>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">Bonus</p>

                                        <h2 className="mt-1 text-2xl font-bold text-green-600">
                                            ₹{salesTarget.bonus.toLocaleString()}
                                        </h2>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">Incentive</p>

                                        <h2 className="mt-1 text-2xl font-bold text-orange-600">
                                            {salesTarget.incentivePercent}%
                                        </h2>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Stats */}

                            <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white">
                                <h3 className="font-semibold">Operator Summary</h3>

                                <div className="mt-6 space-y-4">
                                    <div className="flex justify-between">
                                        <span>Active Permissions</span>

                                        <strong>{enabledPermissions}</strong>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>Access Groups</span>

                                        <strong>{permissionGroups.length}</strong>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>Revenue Goal</span>

                                        <strong>
                                            ₹{salesTarget.revenueTarget.toLocaleString()}
                                        </strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ================= ACTION BAR ================= */}

                <div className="sticky bottom-0 z-30 mt-8 border-t border-gray-200 bg-white/90 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/90">
                    <div className="flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Ready to Create Operator?
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                Verify the details before creating the operator account.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <Button variant="outline" onClick={() => navigate(-1)}>
                                <ArrowLeft className="mr-2" size={18} />
                                Cancel
                            </Button>

                            <Button onClick={handleSubmit} disabled={loading}>
                                {loading ? (
                                    <>
                                        <svg
                                            className="mr-2 h-4 w-4 animate-spin"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <circle
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="3"
                                                opacity=".25"
                                            />
                                            <path
                                                d="M22 12a10 10 0 00-10-10"
                                                stroke="currentColor"
                                                strokeWidth="3"
                                            />
                                        </svg>
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2" size={18} />
                                        Create Operator
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
