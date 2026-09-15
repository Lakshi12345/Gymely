import { useEffect, useState } from "react";

import PageBreadcrumb from "../../components/common/PageBreadCrumb";

import SettingsSection from "../../components/settings/SettingsSection.tsx";

function SettingsNavigation() {
    return null;
}

export default function Settings() {
    const [loading, setLoading] = useState(true);

    if (loading) {
        return (
            <>
                <PageBreadcrumb pageTitle="Settings" />
                <div className="rounded-xl border border-gray-200 bg-white p-10 text-center dark:border-gray-800 dark:bg-gray-900">
                    Loading Settings...
                </div>
            </>
        );
    }

    return (
        <>
            <PageBreadcrumb pageTitle="Settings" />
            {/* Navigation Pills */}
            <SettingsNavigation />
            {/* Sections */}
            <SettingsSection
                id="general"
                title="General Settings"
                description="Manage gym profile and contact information."
                // onConfigure={() => setActiveModal("general")}
            >
                {/* Summary Rows */}
            </SettingsSection>
            <SettingsSection
                id="branding"
                title="Branding"
                description="Logo, invoice and branding preferences."
                // onConfigure={() => setActiveModal("branding")}
            >
                {/* Summary Rows */}
            </SettingsSection>
            <SettingsSection
                id="business"
                title="Business Settings"
                description="Targets, referrals and rewards."
                // onConfigure={() => setActiveModal("business")}
            >
                {/* Summary Rows */}
            </SettingsSection>
            <SettingsSection
                id="security"
                title="Security"
                description="Attendance and membership rules."
                // onConfigure={() => setActiveModal("security")}
            >
                {/* Summary Rows */}
            </SettingsSection>
            <SettingsSection
                id="staff"
                title="Staff Roles"
                description="Manage roles and permissions."
                // onConfigure={() => setActiveModal("staff")}
            >
                {/* Summary Rows */}
            </SettingsSection>
            ...
        </>
    );
}
