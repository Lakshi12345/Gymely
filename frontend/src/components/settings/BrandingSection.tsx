import { useRef, useState } from "react";
import toast from "react-hot-toast";
import SettingRow from "./SettingRow";
import SettingSection from "./SettingSection";
import api from "../../services/api.ts";
import Loader from "../common/Loader.tsx";

interface BrandingSettings {
    taxPercentage: number;
    sgst: number;
    gymLogo?: string;
    invoiceLogo?: string;
    watermark?: string;
    gstNumber?: string;
    taxType?: string;
    invoiceTerm?: string;
    showGST?: boolean;
}

interface Props {
    data: BrandingSettings;
    onConfigure: () => void;
}

type UploadType = "gymLogo" | "invoiceLogo" | "watermark";

export default function BrandingSection({ data, onConfigure }: Props) {
    const [uploadType, setUploadType] = useState<UploadType | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const [loading, setLoading] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [showBillingModal, setShowBillingModal] = useState(false);

    const [billingData, setBillingData] = useState({
        gstNumber: data.gstNumber || "",
        sgst: Math.round((Number(data.taxPercentage ?? 0) / 2) * 100) / 100,
        cgst: Math.round((Number(data.taxPercentage ?? 0) / 2) * 100) / 100,
        taxType: data.taxType || "GST",
        showGST: data.showGST ?? false,
        invoiceTerm: data.invoiceTerm || "",
    });

    console.log(billingData);

    const ImagePreview = ({
        src,
        alt,
        className = "",
    }: {
        src?: string;
        alt: string;
        className?: string;
    }) => {
        if (!src) {
            return (
                <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400 dark:bg-gray-800">
                    —
                </div>
            );
        }

        const imageUrl = src.startsWith("http") ? src : `${import.meta.env.VITE_CDN_URL}/${src}`;

        return (
            <img
                src={imageUrl}
                alt={alt}
                className={`h-20 w-20 rounded-lg border border-gray-200 object-contain dark:border-gray-700 ${className}`}
            />
        );
    };

    const openUploadModal = (type: UploadType) => {
        setUploadType(type);
        setSelectedFile(null);
        setPreview(null);
    };

    const closeUploadModal = () => {
        setUploadType(null);
        setSelectedFile(null);
        setPreview(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (file.type !== "image/jpeg") {
            alert("Please select a JPEG image.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("Image size must be less than 5MB.");
            return;
        }

        setSelectedFile(file);

        const imageUrl = URL.createObjectURL(file);
        setPreview(imageUrl);
        console.log("Selected file:", file);
    };

    const handleUpload = async () => {
        if (!selectedFile || !uploadType) {
            return;
        }

        try {
            setLoading(true);
            const formData = new FormData();

            formData.append("file", selectedFile);
            formData.append("type", uploadType);

            const response = await api.post("/storage/upload", formData);

            console.log("S3 Upload Response:", response.data);
            setLoading(false);
            closeUploadModal();
        } catch (error) {
            setLoading(false);
            console.error("S3 upload failed:", error);
        }
    };

    const handleBillingChange = (field: string, value: string | boolean) => {
        setBillingData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleBillingSave = async () => {
        try {
            setLoading(true);
            const response = await api.put("/settings/updateBilling", billingData);

            if (response.data?.success) {
                toast.success(response.data.message || "Billing settings updated successfully!");

                setShowBillingModal(false);

                // If parent reloads settings, this will reflect automatically.
            } else {
                toast.error(response.data?.error || "Failed to update billing settings");
            }
        } catch (error: any) {
            console.error("Billing settings update failed:", error);

            toast.error(error?.response?.data?.error || "Failed to update billing settings");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Loader loading={loading} text="Updating branding..." />

            <SettingSection
                id="branding"
                title="Branding"
                description="Manage your branding, logos and invoice preferences."
                onConfigure={onConfigure}
            >
                <SettingRow
                    label="Gym Logo"
                    value={
                        <div className="flex items-center gap-3">
                            <ImagePreview src={data.gymLogo} alt="Gym Logo" />

                            <span>{data.gymLogo ? "Uploaded ✓" : "Not Uploaded"}</span>

                            <button
                                type="button"
                                onClick={() => openUploadModal("gymLogo")}
                                className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-white/[0.05]"
                            >
                                {data.gymLogo ? "Change" : "Upload"}
                            </button>
                        </div>
                    }
                />

                <SettingRow
                    label="Invoice Logo"
                    value={
                        <div className="flex items-center gap-3">
                            <ImagePreview src={data.invoiceLogo} alt="Invoice Logo" />

                            <span>{data.invoiceLogo ? "Uploaded ✓" : "Not Uploaded"}</span>

                            <button
                                type="button"
                                onClick={() => openUploadModal("invoiceLogo")}
                                className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-white/[0.05]"
                            >
                                {data.invoiceLogo ? "Change" : "Upload"}
                            </button>
                        </div>
                    }
                />

                <SettingRow
                    label="Watermark"
                    value={
                        <div className="flex items-center gap-3">
                            <ImagePreview src={data.watermark} alt="Watermark" />

                            <span>{data.watermark ? "Configured ✓" : "Not Configured"}</span>

                            <button
                                type="button"
                                onClick={() => openUploadModal("watermark")}
                                className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-white/[0.05]"
                            >
                                {data.watermark ? "Change" : "Upload"}
                            </button>
                        </div>
                    }
                    border={false}
                />
                <div className="mb-3 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-semibold text-gray-800 dark:text-white">
                            Tax & Invoice Settings
                        </p>

                        <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                            GST and invoice configuration
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            setBillingData({
                                gstNumber: data.gstNumber || "",
                                sgst: Math.round((Number(data.taxPercentage ?? 0) / 2) * 100) / 100,
                                cgst: Math.round((Number(data.taxPercentage ?? 0) / 2) * 100) / 100,
                                taxType: data.taxType || "GST",
                                showGST: data.showGST ?? false,
                                invoiceTerm: data.invoiceTerm || "",
                            });

                            setShowBillingModal(true);
                        }}
                        className="group inline-flex items-center gap-2 rounded-xl border border-orange-200 bg-orange-500 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-300 hover:bg-orange-600 hover:text-white hover:shadow-md dark:border-orange-500/30 dark:bg-orange-500 dark:text-white dark:hover:border-orange-400/50 dark:hover:bg-orange-600"
                    >
                        <svg
                            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-45"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"
                            />
                        </svg>
                        Edit Settings
                    </button>
                </div>

                <SettingRow label="GST Number" value={data.gstNumber || "-"} />

                <SettingRow label="Tax Type" value={data.taxType || "GST"} />

                <SettingRow
                    label="Show GST"
                    value={
                        data.showGST ? (
                            <span className="font-medium text-green-600">Enabled</span>
                        ) : (
                            <span className="text-gray-500">Disabled</span>
                        )
                    }
                />

                <SettingRow
                    label="Invoice Terms"
                    value={
                        <div className="max-w-xl text-right text-sm leading-6 whitespace-pre-line text-gray-700 dark:text-gray-300">
                            {data.invoiceTerm || "-"}
                        </div>
                    }
                    border={false}
                />
            </SettingSection>

            {/* Upload Modal */}
            {uploadType && (
                <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900">
                        {/* Header */}
                        <div className="mb-5 flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Upload{" "}
                                    {uploadType === "gymLogo"
                                        ? "Gym Logo"
                                        : uploadType === "invoiceLogo"
                                          ? "Invoice Logo"
                                          : "Watermark"}
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    Select an image from your device.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={closeUploadModal}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-white"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Preview */}
                        <div className="mb-5 flex min-h-[220px] items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-white/[0.02]">
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="max-h-52 max-w-full rounded-lg object-contain"
                                />
                            ) : (
                                <div className="text-center">
                                    <div className="mb-3 text-4xl">🖼️</div>

                                    <p className="text-sm text-gray-500">No image selected</p>
                                </div>
                            )}
                        </div>

                        {/* Hidden input */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/png,image/jpeg,image/webp"
                            className="hidden"
                            onChange={handleFileSelect}
                        />

                        {/* Actions */}
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={closeUploadModal}
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300"
                            >
                                Choose Image
                            </button>

                            <button
                                type="button"
                                disabled={!selectedFile}
                                onClick={handleUpload}
                                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Billing Settings Modal */}

            {showBillingModal && (
                <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 p-4">
                    <div className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-900">
                        <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-800">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Billing Settings
                                </h3>

                                <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                                    Update GST and invoice settings.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setShowBillingModal(false)}
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-white"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="overflow-y-auto p-5">
                            <div className="space-y-5">
                                {/* GST NUMBER */}

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        GST Number
                                    </label>

                                    <input
                                        type="text"
                                        value={billingData.gstNumber}
                                        onChange={(e) =>
                                            handleBillingChange("gstNumber", e.target.value)
                                        }
                                        placeholder="Enter GST number"
                                        className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm transition outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                    />
                                </div>

                                {/* SGST + CGST */}

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    {/* SGST */}

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            SGST %
                                        </label>

                                        <div className="relative">
                                            <input
                                                type="number"
                                                min="0"
                                                max="100"
                                                step="0.01"
                                                value={billingData.sgst}
                                                onChange={(e) =>
                                                    handleBillingChange(
                                                        "sgst",
                                                        Number(e.target.value)
                                                    )
                                                }
                                                placeholder="0"
                                                className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 pr-10 text-sm transition outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                            />

                                            <span className="absolute top-1/2 right-4 -translate-y-1/2 text-sm text-gray-400">
                                                %
                                            </span>
                                        </div>
                                    </div>

                                    {/* CGST */}

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            CGST %
                                        </label>

                                        <div className="relative">
                                            <input
                                                type="number"
                                                min="0"
                                                max="100"
                                                step="0.01"
                                                value={billingData.cgst}
                                                onChange={(e) =>
                                                    handleBillingChange(
                                                        "cgst",
                                                        Number(e.target.value)
                                                    )
                                                }
                                                placeholder="0"
                                                className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 pr-10 text-sm transition outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                            />

                                            <span className="absolute top-1/2 right-4 -translate-y-1/2 text-sm text-gray-400">
                                                %
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* TAX TYPE */}

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Tax Type
                                    </label>

                                    <select
                                        value={billingData.taxType}
                                        onChange={(e) =>
                                            handleBillingChange("taxType", e.target.value)
                                        }
                                        className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm transition outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                    >
                                        <option value="none">No Tax</option>

                                        <option value="GST">GST</option>

                                        <option value="VAT">VAT</option>
                                    </select>
                                </div>

                                {/* SHOW GST */}

                                <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800/50">
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-gray-800 dark:text-white">
                                            Show GST on Invoice
                                        </p>

                                        <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                                            Display GST details on generated invoices.
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleBillingChange("showGST", !billingData.showGST)
                                        }
                                        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                                            billingData.showGST
                                                ? "bg-blue-600"
                                                : "bg-gray-300 dark:bg-gray-700"
                                        }`}
                                    >
                                        <span
                                            className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                                                billingData.showGST ? "left-6" : "left-1"
                                            }`}
                                        />
                                    </button>
                                </div>

                                {/* INVOICE TERMS */}

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Invoice Terms
                                    </label>

                                    <textarea
                                        value={billingData.invoiceTerm}
                                        onChange={(e) =>
                                            handleBillingChange("invoiceTerm", e.target.value)
                                        }
                                        rows={6}
                                        placeholder="Enter invoice terms and conditions..."
                                        className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm transition outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* =====================================================
                FOOTER
            ====================================================== */}

                        <div className="flex shrink-0 justify-end gap-3 border-t border-gray-200 px-5 py-4 dark:border-gray-800">
                            <button
                                type="button"
                                onClick={() => setShowBillingModal(false)}
                                disabled={loading}
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleBillingSave}
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
