import { useEffect, useState } from "react";

import { Modal } from "../../ui/modal";
import Button from "../../ui/button/Button";

import Label from "../../form/Label";
import Input from "../../form/input/InputField";

interface SecuritySettings {
    graceDays: number;

    autoBlockExpired: boolean;

    autoBlockDue: boolean;

    allowManualAttendance: boolean;

    biometricRequired: boolean;

    allowFutureJoining: boolean;

    enableTwoFactor: boolean;

    sessionTimeout: number;
}

interface SecurityModalProps {
    isOpen: boolean;
    onClose: () => void;

    data?: Partial<SecuritySettings>;

    loading?: boolean;

    onSave?: (data: SecuritySettings) => void;
}

const defaultForm: SecuritySettings = {
    graceDays: 3,

    autoBlockExpired: true,

    autoBlockDue: false,

    allowManualAttendance: true,

    biometricRequired: false,

    allowFutureJoining: true,

    enableTwoFactor: false,

    sessionTimeout: 30,
};

export default function SecurityModal({
    isOpen,
    onClose,
    data,
    onSave,
    loading = false,
}: SecurityModalProps) {
    const [form, setForm] = useState<SecuritySettings>(defaultForm);

    useEffect(() => {
        if (!isOpen) return;

        setForm({
            ...defaultForm,
            ...data,
        });
    }, [isOpen, data]);

    const updateField = (key: keyof SecuritySettings, value: any) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit = () => {
        onSave?.(form);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-4xl">
            {/* Header */}

            <div className="border-b border-gray-200 px-8 py-6 dark:border-gray-800">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Security Settings
                </h2>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Configure attendance rules, access control and security policies.
                </p>
            </div>

            {/* Body */}

            <div className="max-h-[70vh] overflow-y-auto p-8">
                <div className="grid gap-6">
                    <div>
                        <Label>Grace Period (Days)</Label>

                        <Input
                            type="number"
                            value={form.graceDays}
                            onChange={(e) => updateField("graceDays", Number(e.target.value))}
                        />
                    </div>

                    <ToggleRow
                        title="Auto Block Expired Members"
                        description="Automatically disable members after expiry."
                        checked={form.autoBlockExpired}
                        onChange={(value) => updateField("autoBlockExpired", value)}
                    />

                    <ToggleRow
                        title="Auto Block Due Members"
                        description="Block members with pending dues."
                        checked={form.autoBlockDue}
                        onChange={(value) => updateField("autoBlockDue", value)}
                    />

                    <ToggleRow
                        title="Allow Manual Attendance"
                        description="Allow reception to mark attendance manually."
                        checked={form.allowManualAttendance}
                        onChange={(value) => updateField("allowManualAttendance", value)}
                    />

                    <ToggleRow
                        title="Require Biometric Attendance"
                        description="Members must use biometric device."
                        checked={form.biometricRequired}
                        onChange={(value) => updateField("biometricRequired", value)}
                    />

                    <ToggleRow
                        title="Allow Future Joining Date"
                        description="Allow memberships with a future start date."
                        checked={form.allowFutureJoining}
                        onChange={(value) => updateField("allowFutureJoining", value)}
                    />

                    <ToggleRow
                        title="Enable Two-Factor Authentication"
                        description="Require OTP verification for administrator login."
                        checked={form.enableTwoFactor}
                        onChange={(value) => updateField("enableTwoFactor", value)}
                    />

                    <div>
                        <Label>Session Timeout (Minutes)</Label>

                        <Input
                            type="number"
                            value={form.sessionTimeout}
                            onChange={(e) => updateField("sessionTimeout", Number(e.target.value))}
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

interface ToggleRowProps {
    title: string;
    description: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

function ToggleRow({ title, description, checked, onChange }: ToggleRowProps) {
    return (
        <div className="flex items-center justify-between rounded-xl border border-gray-200 p-5 dark:border-gray-700">
            <div>
                <h4 className="font-medium text-gray-900 dark:text-white">{title}</h4>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
            </div>

            <label className="relative inline-flex cursor-pointer items-center">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    className="peer sr-only"
                />

                <div className="peer peer-checked:bg-brand-600 h-6 w-11 rounded-full bg-gray-300 transition-all">
                    <div
                        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                            checked ? "translate-x-5" : ""
                        }`}
                    />
                </div>
            </label>
        </div>
    );
}