import { Pencil } from "lucide-react";
import { useState } from "react";
import SettingRow from "./SettingRow";
import SettingSection from "./SettingSection";
import api from "../../services/api.ts";
import toast from "react-hot-toast";

interface GeneralSettings {
    name?: string;
    gymcode?: string;
    ownerName?: string;
    mobile?: string;
    email?: string;
    website?: string;
    address?: string;
}

interface Props {
    data: GeneralSettings;
    onConfigure: () => void;
}

export default function GeneralSection({ data, onConfigure }: Props) {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const [generalData, setGeneralData] = useState<GeneralSettings>({
        name: "",
        gymcode: "",
        ownerName: "",
        mobile: "",
        email: "",
        website: "",
        address: "",
    });

    const openModal = () => {
        setGeneralData({
            name: data.name || "",
            gymcode: data.gymcode || "",
            ownerName: data.ownerName || "",
            mobile: data.mobile || "",
            email: data.email || "",
            website: data.website || "",
            address: data.address || "",
        });

        setShowModal(true);
    };

    const handleChange = (field: keyof GeneralSettings, value: string) => {
        setGeneralData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSave = async () => {
        try {
            setLoading(true);

            const response = await api.put("/settings/updateGeneral", generalData);

            if (response.data?.success) {
                toast.success(response.data.message || "General settings updated successfully!");

                setShowModal(false);

                // Refresh settings page
                // window.location.reload();
            } else {
                toast.error(response.data?.error || "Failed to update settings");
            }
        } catch (error: any) {
            console.error("General settings update failed:", error?.response?.data);

            toast.error(error?.response?.data?.error || "Failed to update general settings");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <SettingSection
                id="general"
                title="General Settings"
                description="Manage gym profile and contact information."
                onConfigure={onConfigure}
            >
                {/* HEADER ACTION */}

                <div className="mb-3 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-semibold text-gray-800 dark:text-white">
                            Gym Information
                        </p>

                        <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                            Profile and contact details
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={openModal}
                        className="group inline-flex items-center gap-2 rounded-xl border border-orange-200 bg-orange-500 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-300 hover:bg-orange-600 hover:shadow-md dark:border-orange-500/30 dark:bg-orange-500 dark:hover:bg-orange-600"
                    >
                        <Pencil
                            size={14}
                            className="transition-transform duration-200 group-hover:rotate-12"
                        />
                        Edit Settings
                    </button>
                </div>
                <SettingRow label="Gym Name" value={data.name} />

                <SettingRow label="Gym Code" value={data.gymcode} />

                <SettingRow label="Owner" value={data.ownerName} />

                <SettingRow label="Phone" value={data.mobile} />

                <SettingRow label="Email" value={data.email} />

                <SettingRow label="Website" value={data.website} />

                <SettingRow label="Address" value={data.address} border={false} />
            </SettingSection>

            {/* =====================================================
                GENERAL SETTINGS MODAL
            ====================================================== */}

            {showModal && (
                <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 p-4">
                    <div className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-900">
                        {/* HEADER */}

                        <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-800">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    General Settings
                                </h3>

                                <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                                    Update your gym profile and contact information.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-white"
                            >
                                ✕
                            </button>
                        </div>

                        {/* BODY */}

                        <div className="overflow-y-auto p-5">
                            <div className="space-y-5">
                                {/* GYM NAME */}

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Gym Name
                                    </label>

                                    <input
                                        type="text"
                                        value={generalData.name}
                                        onChange={(e) => handleChange("name", e.target.value)}
                                        placeholder="Enter gym name"
                                        className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm transition outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                    />
                                </div>

                                {/* GYM CODE */}

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Gym Code
                                    </label>

                                    <input
                                        type="text"
                                        value={generalData.gymcode}
                                        onChange={(e) => handleChange("gymcode", e.target.value)}
                                        placeholder="Enter gym code"
                                        className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm transition outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                    />
                                </div>

                                {/* OWNER + PHONE */}

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Owner Name
                                        </label>

                                        <input
                                            type="text"
                                            value={generalData.ownerName}
                                            onChange={(e) =>
                                                handleChange("ownerName", e.target.value)
                                            }
                                            placeholder="Owner name"
                                            className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Phone
                                        </label>

                                        <input
                                            type="tel"
                                            value={generalData.mobile}
                                            onChange={(e) => handleChange("mobile", e.target.value)}
                                            placeholder="Phone number"
                                            className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                        />
                                    </div>
                                </div>

                                {/* EMAIL */}

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        value={generalData.email}
                                        onChange={(e) => handleChange("email", e.target.value)}
                                        placeholder="gym@example.com"
                                        className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                    />
                                </div>

                                {/* WEBSITE */}

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Website
                                    </label>

                                    <input
                                        type="url"
                                        value={generalData.website}
                                        onChange={(e) => handleChange("website", e.target.value)}
                                        placeholder="https://example.com"
                                        className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                    />
                                </div>

                                {/* ADDRESS */}

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Address
                                    </label>

                                    <textarea
                                        value={generalData.address}
                                        onChange={(e) => handleChange("address", e.target.value)}
                                        rows={3}
                                        placeholder="Enter gym address"
                                        className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* FOOTER */}

                        <div className="flex shrink-0 justify-end gap-3 border-t border-gray-200 px-5 py-4 dark:border-gray-800">
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                disabled={loading}
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleSave}
                                disabled={loading}
                                className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {loading ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
