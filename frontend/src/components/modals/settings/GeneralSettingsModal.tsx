import { useEffect, useState } from "react";

import { Modal } from "../../ui/modal";
import Button from "../../ui/button/Button";

import Label from "../../form/Label";
import Input from "../../form/input/InputField";
import TextArea from "../../form/input/TextArea";

interface GeneralSettings {
    gymName: string;
    gymCode: string;

    ownerName: string;

    adminPhone: string;
    superAdminPhone: string;

    gymEmail: string;
    superAdminEmail: string;

    website: string;

    industry: string;

    address: string;
}

interface GeneralSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;

    data?: Partial<GeneralSettings>;

    loading?: boolean;

    onSave?: (data: GeneralSettings) => void;
}

const defaultForm: GeneralSettings = {
    gymName: "",
    gymCode: "",

    ownerName: "",

    adminPhone: "",
    superAdminPhone: "",

    gymEmail: "",
    superAdminEmail: "",

    website: "",

    industry: "",

    address: "",
};

export default function GeneralSettingsModal({
    isOpen,
    onClose,
    data,
    onSave,
    loading = false,
}: GeneralSettingsModalProps) {
    const [form, setForm] = useState<GeneralSettings>(defaultForm);

    useEffect(() => {
        if (!isOpen) return;

        setForm({
            ...defaultForm,
            ...data,
        });
    }, [isOpen, data]);

    const updateField = (key: keyof GeneralSettings, value: string) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit = () => {
        onSave?.(form);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-5xl">
            {/* Header */}

            <div className="border-b border-gray-200 px-8 py-6 dark:border-gray-800">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    General Settings
                </h2>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Update your gym profile, contact details and business information.
                </p>
            </div>

            {/* Body */}

            <div className="max-h-[70vh] overflow-y-auto p-8">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div>
                        <Label>Gym Name</Label>

                        <Input
                            value={form.gymName}
                            onChange={(e) => updateField("gymName", e.target.value)}
                        />
                    </div>

                    <div>
                        <Label>Gym Code</Label>

                        <Input
                            value={form.gymCode}
                            onChange={(e) => updateField("gymCode", e.target.value)}
                        />
                    </div>

                    <div>
                        <Label>Owner Name</Label>

                        <Input
                            value={form.ownerName}
                            onChange={(e) => updateField("ownerName", e.target.value)}
                        />
                    </div>

                    <div>
                        <Label>Industry</Label>

                        <Input
                            value={form.industry}
                            onChange={(e) => updateField("industry", e.target.value)}
                        />
                    </div>

                    <div>
                        <Label>Admin Mobile</Label>

                        <Input
                            value={form.adminPhone}
                            onChange={(e) => updateField("adminPhone", e.target.value)}
                        />
                    </div>

                    <div>
                        <Label>Super Admin Mobile</Label>

                        <Input
                            value={form.superAdminPhone}
                            onChange={(e) => updateField("superAdminPhone", e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>Gym Email</Label>

                        <Input
                            type="email"
                            value={form.gymEmail}
                            onChange={(e) => updateField("gymEmail", e.target.value)}
                        />
                    </div>

                    <div>
                        <Label>Super Admin Email</Label>

                        <Input
                            type="email"
                            value={form.superAdminEmail}
                            onChange={(e) => updateField("superAdminEmail", e.target.value)}
                        />
                    </div>

                    <div className="lg:col-span-2">
                        <Label>Website</Label>

                        <Input
                            placeholder="https://example.com"
                            value={form.website}
                            onChange={(e) => updateField("website", e.target.value)}
                        />
                    </div>

                    <div className="lg:col-span-2">
                        <Label>Address</Label>

                        <TextArea
                            rows={4}
                            value={form.address}
                            onChange={(e) => updateField("address", e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Footer */}

            <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-8 py-5 dark:border-gray-800">
                <Button variant="outline" onClick={onClose}>
                    Cancel
                </Button>

                <Button onClick={handleSubmit} disabled={loading}>
                    {loading ? "Saving..." : "Save Changes"}
                </Button>
            </div>
        </Modal>
    );
}
