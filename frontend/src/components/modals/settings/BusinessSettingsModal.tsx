import { useEffect, useState } from "react";

import { Modal } from "../../ui/modal";
import Button from "../../ui/button/Button";

import Label from "../../form/Label";
import Input from "../../form/input/InputField";

interface BusinessSettings {
    monthlyTarget: number;

    clientReferral: number;

    trainerReferral: number;

    ptEarning: number;

    paidLeaves: number;

    redeemPercent: number;

    pointsExpiry: number;

    currency: string;

    timezone: string;

    dateFormat: string;
}

interface BusinessSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;

    data?: Partial<BusinessSettings>;

    loading?: boolean;

    onSave?: (data: BusinessSettings) => void;
}

const defaultForm: BusinessSettings = {
    monthlyTarget: 0,

    clientReferral: 0,

    trainerReferral: 0,

    ptEarning: 0,

    paidLeaves: 0,

    redeemPercent: 0,

    pointsExpiry: 180,

    currency: "INR",

    timezone: "Asia/Kolkata",

    dateFormat: "DD/MM/YYYY",
};

export default function BusinessSettingsModal({
    isOpen,
    onClose,
    data,
    loading = false,
    onSave,
}: BusinessSettingsModalProps) {
    const [form, setForm] = useState<BusinessSettings>(defaultForm);

    useEffect(() => {
        if (!isOpen) return;

        setForm({
            ...defaultForm,
            ...data,
        });
    }, [isOpen, data]);

    const updateField = (key: keyof BusinessSettings, value: any) => {
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
                    Business Settings
                </h2>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Configure business rules, targets and reward settings.
                </p>
            </div>

            {/* Body */}

            <div className="max-h-[70vh] overflow-y-auto p-8">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div>
                        <Label>Monthly Sales Target</Label>

                        <Input
                            type="number"
                            value={form.monthlyTarget}
                            onChange={(e) => updateField("monthlyTarget", Number(e.target.value))}
                        />
                    </div>

                    <div>
                        <Label>Client Referral (%)</Label>

                        <Input
                            type="number"
                            value={form.clientReferral}
                            onChange={(e) => updateField("clientReferral", Number(e.target.value))}
                        />
                    </div>

                    <div>
                        <Label>Trainer Referral (%)</Label>

                        <Input
                            type="number"
                            value={form.trainerReferral}
                            onChange={(e) => updateField("trainerReferral", Number(e.target.value))}
                        />
                    </div>

                    <div>
                        <Label>PT Earning (%)</Label>

                        <Input
                            type="number"
                            value={form.ptEarning}
                            onChange={(e) => updateField("ptEarning", Number(e.target.value))}
                        />
                    </div>

                    <div>
                        <Label>Paid Leaves / Month</Label>

                        <Input
                            type="number"
                            value={form.paidLeaves}
                            onChange={(e) => updateField("paidLeaves", Number(e.target.value))}
                        />
                    </div>

                    <div>
                        <Label>Maximum Redeem (%)</Label>

                        <Input
                            type="number"
                            value={form.redeemPercent}
                            onChange={(e) => updateField("redeemPercent", Number(e.target.value))}
                        />
                    </div>

                    <div>
                        <Label>Gym Points Expiry (Days)</Label>

                        <Input
                            type="number"
                            value={form.pointsExpiry}
                            onChange={(e) => updateField("pointsExpiry", Number(e.target.value))}
                        />
                    </div>

                    <div>
                        <Label>Currency</Label>

                        <select
                            value={form.currency}
                            onChange={(e) => updateField("currency", e.target.value)}
                            className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 text-sm dark:border-gray-700 dark:bg-gray-900"
                        >
                            <option value="INR">Indian Rupee (₹)</option>
                            <option value="USD">US Dollar ($)</option>
                            <option value="EUR">Euro (€)</option>
                            <option value="GBP">British Pound (£)</option>
                        </select>
                    </div>

                    <div>
                        <Label>Time Zone</Label>

                        <select
                            value={form.timezone}
                            onChange={(e) => updateField("timezone", e.target.value)}
                            className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 text-sm dark:border-gray-700 dark:bg-gray-900"
                        >
                            <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>

                            <option value="Asia/Dubai">Asia/Dubai</option>

                            <option value="Europe/London">Europe/London</option>

                            <option value="America/New_York">America/New_York</option>
                        </select>
                    </div>

                    <div className="lg:col-span-2">
                        <Label>Date Format</Label>

                        <select
                            value={form.dateFormat}
                            onChange={(e) => updateField("dateFormat", e.target.value)}
                            className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 text-sm dark:border-gray-700 dark:bg-gray-900"
                        >
                            <option value="DD/MM/YYYY">DD/MM/YYYY</option>

                            <option value="MM/DD/YYYY">MM/DD/YYYY</option>

                            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        </select>
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
