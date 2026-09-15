import { useEffect, useState } from "react";

import { Modal } from "../../ui/modal";
import Button from "../../ui/button/Button";

import Label from "../../form/Label";
import Input from "../../form/input/InputField";
import TextArea from "../../form/input/TextArea";

import ImageUploadField from "../../settings/ImageUploadField";

interface BrandingSettings {
    gymLogo: string;
    invoiceLogo: string;

    gstNumber: string;

    taxType: string;

    invoiceHeader: string;
    invoiceFooter: string;

    primaryColor: string;
    secondaryColor: string;

    showGST: boolean;
}

interface BrandingModalProps {
    isOpen: boolean;
    onClose: () => void;

    data?: Partial<BrandingSettings>;

    loading?: boolean;

    onSave?: (data: BrandingSettings) => void;
}

const defaultForm: BrandingSettings = {
    gymLogo: "",
    invoiceLogo: "",

    gstNumber: "",

    taxType: "GST",

    invoiceHeader: "",
    invoiceFooter: "",

    primaryColor: "#3B82F6",
    secondaryColor: "#111827",

    showGST: true,
};

export default function BrandingModal({
    isOpen,
    onClose,
    data,
    onSave,
    loading = false,
}: BrandingModalProps) {
    const [form, setForm] = useState<BrandingSettings>(defaultForm);

    useEffect(() => {
        if (!isOpen) return;

        setForm({
            ...defaultForm,
            ...data,
        });
    }, [isOpen, data]);

    const updateField = (key: keyof BrandingSettings, value: any) => {
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
                    Branding Settings
                </h2>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Customize your gym branding, invoice appearance and theme colors.
                </p>
            </div>

            {/* Body */}

            <div className="max-h-[70vh] overflow-y-auto p-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    <ImageUploadField
                        label="Gym Logo"
                        value={form.gymLogo}
                        onChange={(value) => updateField("gymLogo", value)}
                    />

                    <ImageUploadField
                        label="Invoice Logo"
                        value={form.invoiceLogo}
                        onChange={(value) => updateField("invoiceLogo", value)}
                    />

                    <div>
                        <Label>GST Number</Label>

                        <Input
                            value={form.gstNumber}
                            onChange={(e) => updateField("gstNumber", e.target.value)}
                        />
                    </div>

                    <div>
                        <Label>Tax Type</Label>

                        <Input
                            value={form.taxType}
                            onChange={(e) => updateField("taxType", e.target.value)}
                        />
                    </div>

                    <div className="lg:col-span-2">
                        <Label>Invoice Header</Label>

                        <TextArea
                            rows={2}
                            value={form.invoiceHeader}
                            onChange={(e) => updateField("invoiceHeader", e.target.value)}
                        />
                    </div>

                    <div className="lg:col-span-2">
                        <Label>Invoice Footer</Label>

                        <TextArea
                            rows={3}
                            value={form.invoiceFooter}
                            onChange={(e) => updateField("invoiceFooter", e.target.value)}
                        />
                    </div>

                    <div>
                        <Label>Primary Color</Label>

                        <div className="flex items-center gap-3">
                            <input
                                type="color"
                                value={form.primaryColor}
                                onChange={(e) => updateField("primaryColor", e.target.value)}
                                className="h-11 w-14 cursor-pointer rounded-lg border border-gray-300"
                            />

                            <Input
                                value={form.primaryColor}
                                onChange={(e) => updateField("primaryColor", e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <Label>Secondary Color</Label>

                        <div className="flex items-center gap-3">
                            <input
                                type="color"
                                value={form.secondaryColor}
                                onChange={(e) => updateField("secondaryColor", e.target.value)}
                                className="h-11 w-14 cursor-pointer rounded-lg border border-gray-300"
                            />

                            <Input
                                value={form.secondaryColor}
                                onChange={(e) => updateField("secondaryColor", e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <label className="flex items-center justify-between rounded-xl border border-gray-200 p-4 dark:border-gray-700">
                            <div>
                                <h4 className="font-medium text-gray-900 dark:text-white">
                                    Show GST on Invoice
                                </h4>

                                <p className="mt-1 text-sm text-gray-500">
                                    Display GST details on generated invoices.
                                </p>
                            </div>

                            <input
                                type="checkbox"
                                checked={form.showGST}
                                onChange={(e) => updateField("showGST", e.target.checked)}
                                className="h-5 w-5"
                            />
                        </label>
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
