import { useEffect, useState } from "react";

import PageBreadcrumb from "../../components/common/PageBreadCrumb";

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

// Modals

import GeneralSettingsModal from "../../components/modals/settings/GeneralSettingsModal";
import BrandingModal from "../../components/modals/settings/BrandingModal";
import BusinessSettingsModal from "../../components/modals/settings/BusinessSettingsModal";
import SecurityModal from "../../components/modals/settings/SecurityModal";

import StaffRoleModal from "../../components/modals/settings/StaffRoleModal";
import CustomerSetupModal from "../../components/modals/settings/CustomerSetupModal";
import ExpenseLabelModal from "../../components/modals/settings/ExpenseLabelModal";
// import CashbackCouponModal from "../../components/modals/settings/CashbackCouponModal";
// import QRCodeModal from "../../components/modals/settings/QRCodeModal";

// Services

import {
    getSettings,
    updateGeneralSettings,
    updateBranding,
    updateBusiness,
    updateSecurity,
} from "../../services/settings.service";

type ActiveModal =
    | "general"
    | "branding"
    | "business"
    | "security"
    | "staff"
    | "customer"
    | "package"
    | "expense"
    | "coupon"
    | "qr"
    | null;

export default function Settings() {
    const [loading, setLoading] = useState(true);

    const [activeModal, setActiveModal] = useState<ActiveModal>(null);

    const [settings, setSettings] = useState<any>({
        general: {},
        branding: {},
        business: {},
        security: {},

        staffRoles: [],

        customer: {
            sources: [],
            occupations: [],
            addresses: [],
        },

        packageCategories: [],

        expenseLabels: [],

        cashbackCoupons: [],

        qrCodes: [],
    });

    useEffect(() => {
        loadSettings();
    }, []);

    async function loadSettings() {
        try {
            setLoading(true);

            const { data } = await getSettings();

            setSettings(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function handleGeneralSave(form: any) {
        try {
            const { data } = await updateGeneralSettings(form);

            setSettings((prev: any) => ({
                ...prev,
                general: data,
            }));

            setActiveModal(null);
        } catch (error) {
            console.error(error);
        }
    }

    async function handleBrandingSave(form: any) {
        try {
            const { data } = await updateBranding(form);

            setSettings((prev: any) => ({
                ...prev,
                branding: data,
            }));

            setActiveModal(null);
        } catch (error) {
            console.error(error);
        }
    }

    async function handleBusinessSave(form: any) {
        try {
            const { data } = await updateBusiness(form);

            setSettings((prev: any) => ({
                ...prev,
                business: data,
            }));

            setActiveModal(null);
        } catch (error) {
            console.error(error);
        }
    }

    async function handleSecuritySave(form: any) {
        try {
            const { data } = await updateSecurity(form);

            setSettings((prev: any) => ({
                ...prev,
                security: data,
            }));

            setActiveModal(null);
        } catch (error) {
            console.error(error);
        }
    }

    if (loading) {
        return (
            <>
                <PageBreadcrumb pageTitle="Settings" />

                <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center dark:border-gray-800 dark:bg-gray-900">
                    Loading Settings...
                </div>
            </>
        );
    }

    return (
        <>
            <PageBreadcrumb pageTitle="Settings" />

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gym Settings</h1>

                <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Configure your gym information, branding, business rules and system preferences.
                </p>
            </div>

            <div className="space-y-6">
                {/* ================= GENERAL ================= */}

                <GeneralSection
                    data={settings.general}
                    onConfigure={() => setActiveModal("general")}
                />

                {/* ================= BRANDING ================= */}

                <BrandingSection
                    data={settings.branding}
                    onConfigure={() => setActiveModal("branding")}
                />
                {/* ================= BUSINESS ================= */}

                <BusinessSection
                    data={settings.business}
                    onConfigure={() => setActiveModal("business")}
                />

                {/* ================= SECURITY ================= */}

                <SecuritySection
                    data={settings.security}
                    onConfigure={() => setActiveModal("security")}
                />

                {/* ================= STAFF ROLES ================= */}

                <StaffRolesSection
                    data={settings.staffRoles}
                    onConfigure={() => setActiveModal("staff")}
                />

                {/* ================= CUSTOMER SETUP ================= */}

                <CustomerSetupSection
                    data={settings.customer}
                    onConfigure={() => setActiveModal("customer")}
                />

                {/* ================= EXPENSE LABELS ================= */}

                <ExpenseLabelSection
                    data={settings.expenseLabels}
                    onConfigure={() => setActiveModal("expense")}
                />

                {/* ================= CASHBACK COUPONS ================= */}

                <CashbackCouponSection
                    data={settings.cashbackCoupons}
                    onConfigure={() => setActiveModal("coupon")}
                />

                {/* ================= QR CODES ================= */}

                <QRCodeSection data={settings.qrCodes} onConfigure={() => setActiveModal("qr")} />

                {/* ================= SYSTEM TOOLS ================= */}

                <SystemToolsSection
                    onBackup={() => {
                        console.log("Backup");
                    }}
                    onExport={() => {
                        console.log("Export");
                    }}
                    onImport={() => {
                        console.log("Import");
                    }}
                    onClearCache={() => {
                        console.log("Clear Cache");
                    }}
                    onViewLogs={() => {
                        console.log("View Logs");
                    }}
                />
            </div>

            {/* ======================================================
                            SETTINGS MODALS
            ======================================================= */}

            <GeneralSettingsModal
                isOpen={activeModal === "general"}
                onClose={() => setActiveModal(null)}
                data={settings.general}
                onSave={handleGeneralSave}
            />

            <BrandingModal
                isOpen={activeModal === "branding"}
                onClose={() => setActiveModal(null)}
                data={settings.branding}
                onSave={handleBrandingSave}
            />

            <BusinessSettingsModal
                isOpen={activeModal === "business"}
                onClose={() => setActiveModal(null)}
                data={settings.business}
                onSave={handleBusinessSave}
            />

            <SecurityModal
                isOpen={activeModal === "security"}
                onClose={() => setActiveModal(null)}
                data={settings.security}
                onSave={handleSecuritySave}
            />
            {/*================= STAFF ROLE MODAL ================= */}

            <StaffRoleModal
                isOpen={activeModal === "staff"}
                onClose={() => setActiveModal(null)}
                data={settings.staffRoles}
                onSave={(roles) => {
                    setSettings((prev: any) => ({
                        ...prev,
                        staffRoles: roles,
                    }));

                    setActiveModal(null);
                }}
            />

            {/* ================= CUSTOMER SETUP MODAL ================= */}

            <CustomerSetupModal
                isOpen={activeModal === "customer"}
                onClose={() => setActiveModal(null)}
                data={settings.customer}
                onSave={(customer) => {
                    setSettings((prev: any) => ({
                        ...prev,
                        customer,
                    }));

                    setActiveModal(null);
                }}
            />

            {/* ================= EXPENSE LABEL MODAL ================= */}

            <ExpenseLabelModal
                isOpen={activeModal === "expense"}
                onClose={() => setActiveModal(null)}
                data={settings.expenseLabels}
                onSave={(labels) => {
                    setSettings((prev: any) => ({
                        ...prev,
                        expenseLabels: labels,
                    }));

                    setActiveModal(null);
                }}
            />

            {/* ================= CASHBACK COUPON MODAL ================= */}

            {/*<CashbackCouponModal*/}
            {/*    isOpen={activeModal === "coupon"}*/}
            {/*    onClose={() => setActiveModal(null)}*/}
            {/*    data={settings.cashbackCoupons}*/}
            {/*    onSave={(coupons) => {*/}
            {/*        setSettings((prev: any) => ({*/}
            {/*            ...prev,*/}
            {/*            cashbackCoupons: coupons,*/}
            {/*        }));*/}

            {/*        setActiveModal(null);*/}
            {/*    }}*/}
            {/*/>*/}

            {/* ================= QR CODE MODAL ================= */}

            {/*<QRCodeModal*/}
            {/*    isOpen={activeModal === "qr"}*/}
            {/*    onClose={() => setActiveModal(null)}*/}
            {/*    data={settings.qrCodes}*/}
            {/*    onSave={(qrCodes) => {*/}
            {/*        setSettings((prev: any) => ({*/}
            {/*            ...prev,*/}
            {/*            qrCodes,*/}
            {/*        }));*/}

            {/*        setActiveModal(null);*/}
            {/*    }}*/}
            {/*/>*/}
        </>
    );
}
