import { useEffect, useMemo, useState } from "react";

import {
    Bell,
    Building2,
    CreditCard,
    Database,
    Palette,
    Plus,
    QrCode,
    Search,
    Settings2,
    Shield,
    Smartphone,
    UserCog,
    Users,
    Wallet,
    X,
} from "lucide-react";

import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Input from "../../components/form/input/InputField";

import GeneralSection from "../../components/settings/GeneralSection";
import BrandingSection from "../../components/settings/BrandingSection";
import BusinessSection from "../../components/settings/BusinessSection";
import SecuritySection from "../../components/settings/SecuritySection";
import StaffRolesSection from "../../components/settings/StaffRolesSection";
import CustomerSetupSection from "../../components/settings/CustomerSetupSection";
import ExpenseLabelSection from "../../components/settings/ExpenseLabelSection";
import CashbackCouponSection from "../../components/settings/CashbackCouponSection";
import QRCodeSection from "../../components/settings/QRCodeSection";
import SystemToolsSection from "../../components/settings/SystemToolsSection";
import api from "../../services/api.ts";

type ActiveTab =
    | "general"
    | "branding"
    | "business"
    | "security"
    | "staff"
    | "customer"
    | "expense"
    | "coupon"
    | "qr"
    | "system";

const menus = [
    {
        key: "general",
        title: "Gym Profile",
        icon: Building2,
    },

    {
        key: "branding",
        title: "Branding",
        icon: Palette,
    },

    {
        key: "business",
        title: "Business Rules",
        icon: CreditCard,
    },

    {
        key: "security",
        title: "Security",
        icon: Shield,
    },

    {
        key: "staff",
        title: "Staff Roles",
        icon: UserCog,
    },

    {
        key: "customer",
        title: "Customer Setup",
        icon: Users,
    },

    {
        key: "expense",
        title: "Expense Labels",
        icon: Wallet,
    },

    {
        key: "coupon",
        title: "Coupons",
        icon: Bell,
    },

    {
        key: "qr",
        title: "QR Settings",
        icon: QrCode,
    },

    {
        key: "system",
        title: "System Tools",
        icon: Database,
    },
];

export default function Settings() {
    useEffect(() => {
        fetchSettings();
    }, []);

    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState("");

    const [activeTab, setActiveTab] = useState<ActiveTab>("general");

    const [settings, setSettings] = useState({
        general: {
            gymName: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            state: "",
            pincode: "",
            website: "",
        },
        branding: {},
        business: {},
        security: {},
        staffRoles: [],
        customer: {},
        expenseLabels: [],
        cashbackCoupons: [],
        qrCodes: [],
        system: {},
    });

    const [staffRoleModal, setStaffRoleModal] = useState(false);

    const [selectedRole, setSelectedRole] = useState<StaffRole | null>(null);

    const [roleName, setRoleName] = useState("");

    const openAddRole = () => {
        setSelectedRole(null);
        setRoleName("");
        setStaffRoleModal(true);
    };

    const openEditRole = (role: StaffRole) => {
        setSelectedRole(role);
        setRoleName(role.name);
        setStaffRoleModal(true);
    };

    const deleteStaffRole = async (role: StaffRole) => {
        if (!window.confirm(`Delete "${role.name}"?`)) {
            return;
        }
        try {
            await api.delete(`/settings/deleteStaffRole/${role._id}`);
            await fetchSettings();
        } catch (error: any) {
            console.error(error);

            alert(error?.response?.data?.error || "Failed to delete staff role");
        }
    };

    const saveStaffRole = async () => {
        if (!roleName.trim()) {
            alert("Enter role name");
            return;
        }

        try {
            if (selectedRole) {
                await api.put(`/settings/editStaffRole/${selectedRole._id}`, {
                    name: roleName,
                });
            } else {
                await api.post("/settings/addStaffRole", {
                    name: roleName,
                });
            }

            setStaffRoleModal(false);
            setSelectedRole(null);
            setRoleName("");

            // Reload your settings
            await fetchSettings();
        } catch (error: any) {
            console.error(error);

            alert(error?.response?.data?.error || "Failed to save staff role");
        }
    };

    const fetchSettings = async () => {
        try {
            setLoading(true);

            const response = await api.get("/settings/getsettings");

            const data = response.data.data;

            console.log("Branding:", data.general.branding);

            setSettings({
                general: data.general || {},
                // 👇 branding is inside general
                branding: data.general?.branding || {},

                business: data.business || {},
                security: data.security || {},
                staffRoles: data.staffRoles || [],
                customer: data.customer || {},
                expenseLabels: data.expenseLabels || [],
                cashbackCoupons: data.cashbackCoupons || [],
                qrCodes: data.qrCodes || [],
                system: data.system || {},
            });
        } catch (error) {
            console.error("Failed to load settings:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <PageBreadcrumb pageTitle="Settings Center" />

            <div className="space-y-6">
                {/* =====================================================
            ========================= HEADER =======================
            ===================================================== */}

                <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 p-5 text-white shadow-lg">
                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20">
                                <Settings2 size={24} />
                            </div>

                            <div>
                                <h1 className="text-2xl font-bold">Gymely Control Center</h1>

                                <p className="mt-1 max-w-2xl text-sm text-blue-100">
                                    Manage branding, memberships, devices, billing, security, staff
                                    access and business settings.
                                </p>
                            </div>
                        </div>

                        <div className="w-full md:w-[320px]">
                            <div className="relative">
                                <Search
                                    size={17}
                                    className="absolute top-1/2 left-3.5 -translate-y-1/2 text-gray-400"
                                />

                                <Input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="h-10 border-0 bg-white pl-10 text-black"
                                    placeholder="Search settings..."
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* =====================================================
            ====================== MAIN SECTION ====================
            ===================================================== */}

                <div className="grid grid-cols-12 gap-6">
                    {/* =================================================
                ====================== SIDEBAR =====================
                ================================================= */}

                    <div className="col-span-12 xl:col-span-3">
                        <div className="sticky top-6 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <div className="mb-6">
                                <h3 className="text-lg font-bold">Settings</h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    Configure your gym ecosystem.
                                </p>
                            </div>

                            <div className="space-y-2">
                                {menus.map((menu) => {
                                    const Icon = menu.icon;

                                    const isActive = activeTab === menu.key;

                                    return (
                                        <button
                                            key={menu.key}
                                            onClick={() => setActiveTab(menu.key as ActiveTab)}
                                            className={`group flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition-all duration-300 ${
                                                isActive
                                                    ? "bg-blue-600 text-white shadow-lg"
                                                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`rounded-xl p-2 ${
                                                        isActive
                                                            ? "bg-white/20"
                                                            : "bg-gray-100 dark:bg-gray-800"
                                                    }`}
                                                >
                                                    <Icon size={18} />
                                                </div>

                                                <span className="font-medium">{menu.title}</span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* =================================================
                =================== CONTENT AREA ===================
                ================================================= */}

                    <div className="col-span-12 xl:col-span-9">
                        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <div className="mb-8 flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold">
                                        {menus.find((m) => m.key === activeTab)?.title}
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Manage all configurations related to this section.
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-gray-100 px-4 py-2 text-sm font-medium dark:bg-gray-800">
                                    Gymely v2.0
                                </div>
                            </div>
                            {/* =====================================
                        ============ CONTENT AREA ===============
                        ===================================== */}
                            {activeTab === "general" && (
                                <GeneralSection
                                    data={settings.general}
                                    setData={(data) =>
                                        setSettings((prev: any) => ({
                                            ...prev,
                                            general: data,
                                        }))
                                    }
                                />
                            )}

                            {activeTab === "branding" && (
                                <BrandingSection
                                    data={settings.branding}
                                    setData={(data) =>
                                        setSettings((prev: any) => ({
                                            ...prev,
                                            branding: data,
                                        }))
                                    }
                                />
                            )}

                            {activeTab === "business" && (
                                <BusinessSection
                                    data={settings.business}
                                    setData={(data) =>
                                        setSettings((prev: any) => ({
                                            ...prev,
                                            business: data,
                                        }))
                                    }
                                />
                            )}

                            {activeTab === "security" && (
                                <SecuritySection
                                    data={settings.security}
                                    setData={(data) =>
                                        setSettings((prev: any) => ({
                                            ...prev,
                                            security: data,
                                        }))
                                    }
                                />
                            )}

                            {activeTab === "staff" && (
                                <StaffRolesSection
                                    data={settings.staffRoles}
                                    onAdd={openAddRole}
                                    onEdit={openEditRole}
                                    onDelete={deleteStaffRole}
                                />
                            )}

                            {activeTab === "customer" && (
                                <CustomerSetupSection
                                    data={settings.customer}
                                    setData={(data) =>
                                        setSettings((prev: any) => ({
                                            ...prev,
                                            customer: data,
                                        }))
                                    }
                                />
                            )}

                            {activeTab === "expense" && (
                                <ExpenseLabelSection
                                    data={settings.expenseLabels}
                                    setData={(data) =>
                                        setSettings((prev: any) => ({
                                            ...prev,
                                            expenseLabels: data,
                                        }))
                                    }
                                />
                            )}

                            {activeTab === "coupon" && (
                                <CashbackCouponSection
                                    data={settings.cashbackCoupons}
                                    setData={(data) =>
                                        setSettings((prev: any) => ({
                                            ...prev,
                                            cashbackCoupons: data,
                                        }))
                                    }
                                />
                            )}

                            {activeTab === "qr" && (
                                <QRCodeSection
                                    data={settings.qrCodes}
                                    setData={(data) =>
                                        setSettings((prev: any) => ({
                                            ...prev,
                                            qrCodes: data,
                                        }))
                                    }
                                />
                            )}

                            {activeTab === "system" && (
                                <SystemToolsSection
                                    data={settings.system}
                                    setData={(data) =>
                                        setSettings((prev: any) => ({
                                            ...prev,
                                            system: data,
                                        }))
                                    }
                                />
                            )}
                        </div>
                    </div>
                </div>
                {/* =====================================================
==================== STATUS SECTION =====================
===================================================== */}

                <div className="grid grid-cols-12 gap-6">
                    {/* DEVICE STATUS */}

                    <div className="col-span-12 md:col-span-6 xl:col-span-3">
                        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <div className="mb-5 flex items-center justify-between">
                                <div className="rounded-2xl bg-blue-100 p-3 text-blue-600">
                                    <Smartphone size={22} />
                                </div>

                                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                    ONLINE
                                </span>
                            </div>

                            <h3 className="text-lg font-bold">Biometric Devices</h3>

                            <p className="mt-2 text-sm text-gray-500">
                                ESSL, ZKTeco and Real Matrix integrations.
                            </p>

                            <div className="mt-5 space-y-3">
                                <div className="flex justify-between">
                                    <span>ESSL K90</span>
                                    <span className="font-semibold text-green-600">Connected</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>ZKTeco F18</span>
                                    <span className="font-semibold text-green-600">Connected</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Real Matrix</span>
                                    <span className="font-semibold text-yellow-500">Pending</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* WHATSAPP */}

                    <div className="col-span-12 md:col-span-6 xl:col-span-3">
                        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <div className="mb-5 flex items-center justify-between">
                                <div className="rounded-2xl bg-green-100 p-3 text-green-600">
                                    <Bell size={22} />
                                </div>

                                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                    ACTIVE
                                </span>
                            </div>

                            <h3 className="text-lg font-bold">WhatsApp Services</h3>

                            <p className="mt-2 text-sm text-gray-500">
                                Invoice, reminder and marketing automation.
                            </p>

                            <div className="mt-5 space-y-3">
                                <div className="flex justify-between">
                                    <span>Messages sent</span>
                                    <span>12,582</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Templates</span>
                                    <span>24</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Delivery rate</span>
                                    <span>98%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* DATABASE */}

                    <div className="col-span-12 md:col-span-6 xl:col-span-3">
                        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <div className="mb-5 flex items-center justify-between">
                                <div className="rounded-2xl bg-purple-100 p-3 text-purple-600">
                                    <Database size={22} />
                                </div>

                                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                    HEALTHY
                                </span>
                            </div>

                            <h3 className="text-lg font-bold">Database Status</h3>

                            <p className="mt-2 text-sm text-gray-500">
                                Database monitoring and server health.
                            </p>

                            <div className="mt-5 space-y-3">
                                <div className="flex justify-between">
                                    <span>Storage</span>
                                    <span>78 GB</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>CPU</span>
                                    <span>32%</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>RAM</span>
                                    <span>64%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BACKUP */}

                    <div className="col-span-12 md:col-span-6 xl:col-span-3">
                        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <div className="mb-5 flex items-center justify-between">
                                <div className="rounded-2xl bg-orange-100 p-3 text-orange-600">
                                    <Shield size={22} />
                                </div>

                                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                    ENABLED
                                </span>
                            </div>

                            <h3 className="text-lg font-bold">Backup System</h3>

                            <p className="mt-2 text-sm text-gray-500">
                                Automatic backup monitoring.
                            </p>

                            <div className="mt-5 space-y-3">
                                <div className="flex justify-between">
                                    <span>Daily backup</span>
                                    <span>Success</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Last backup</span>
                                    <span>2 hours ago</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Cloud sync</span>
                                    <span>Enabled</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ============================================
================ LOADING STATE =================
============================================ */}

                {loading && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                        <div className="w-96 rounded-3xl bg-white p-8 shadow-2xl dark:bg-gray-900">
                            <div className="mb-6 flex justify-center">
                                <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
                            </div>

                            <h3 className="text-center text-xl font-bold">Updating settings</h3>

                            <p className="mt-2 text-center text-sm text-gray-500">
                                Please wait while we save your changes.
                            </p>
                        </div>
                    </div>
                )}

                {/* ============================================
===================== FOOTER ===================
============================================ */}

                <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h3 className="font-semibold">Gymely Enterprise Edition</h3>

                            <p className="mt-1 text-sm text-gray-500">
                                Version 2.0.0 • Build 2026.08
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                                Database Connected
                            </span>

                            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
                                WhatsApp Active
                            </span>

                            <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700">
                                Backup Enabled
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {staffRoleModal && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl dark:bg-gray-900">
                        <div className="flex items-center justify-between border-b px-5 py-4 dark:border-gray-800">
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                    {selectedRole ? "Edit Staff Role" : "Add Staff Role"}
                                </h3>

                                <p className="mt-1 text-xs text-gray-500">
                                    Enter the staff role name.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setStaffRoleModal(false)}
                                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                ×
                            </button>
                        </div>

                        <div className="p-5">
                            <label className="mb-2 block text-sm font-medium">Role Name</label>

                            <input
                                autoFocus
                                value={roleName}
                                onChange={(e) => setRoleName(e.target.value)}
                                placeholder="e.g. Manager"
                                className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800"
                            />
                        </div>

                        <div className="flex justify-end gap-3 border-t px-5 py-4 dark:border-gray-800">
                            <button
                                type="button"
                                onClick={() => setStaffRoleModal(false)}
                                className="rounded-lg border px-4 py-2 text-sm"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={saveStaffRole}
                                className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
                            >
                                {selectedRole ? "Update" : "Add Role"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
