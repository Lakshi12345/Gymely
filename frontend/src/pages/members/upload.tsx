import { useRef, useState } from "react";
import { Upload, FileText, Download, X, AlertCircle, CheckCircle2 } from "lucide-react";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import api from "../../services/api.ts";
import toast from "react-hot-toast";

export default function UploadMembers() {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    const [result, setResult] = useState<any>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];

        if (!selectedFile) return;

        const isCSV =
            selectedFile.type === "text/csv" || selectedFile.name.toLowerCase().endsWith(".csv");

        if (!isCSV) {
            toast.error("Please select a valid CSV file.");

            event.target.value = "";

            return;
        }

        setResult(null);
        setFile(selectedFile);
    };

    const removeFile = () => {
        setFile(null);
        setResult(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleUpload = async () => {
        if (!file) {
            toast.error("Please select a CSV file first.");
            return;
        }

        try {
            setUploading(true);
            setResult(null);

            const formData = new FormData();

            formData.append("file", file);

            const response = await api.post("/member/import-members", formData);

            console.log("Import Response:", response.data);

            if (response.data?.success) {
                setResult(response.data.data);

                toast.success(response.data.message || "CSV processed successfully.");
            } else {
                toast.error(response.data?.message || "Failed to process CSV.");
            }
        } catch (error: any) {
            console.error("CSV Upload Error:", error);

            const message =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.message ||
                "Failed to upload CSV.";

            toast.error(message);
        } finally {
            setUploading(false);
        }
    };

    const downloadTemplate = () => {
        const headers = [
            "UID",
            "Name",
            "Mobile",
            "Email",
            "Gender",
            "BirthDate",
            "PackageName",
            "PackageType",
            "PackageAmount",
            "StartDate",
            "ExpiryDate",
            "EnrollmentDate",
            "WorkoutGroup",
            "Discount",
            "TaxAmount",
            "ConvenienceFee",
            "PaidAmount",
            "PaymentMethod",
            "PaymentReference",
            "PaymentDate",
            "NextPaymentDate",
            "SoldBy",
            "Remarks",
        ];

        const exampleRows = [
            [
                "101",
                "Rahul Kumar",
                "9876543210",
                "[rahul@example.com](mailto:rahul@example.com)",
                "Male",
                "1995-05-10",
                "Monthly Gym",
                "Base",
                "2000",
                "2026-09-01",
                "2026-10-01",
                "2026-09-01",
                "General Fitness",
                "0",
                "0",
                "0",
                "2000",
                "Cash",
                "",
                "2026-09-01",
                "",
                "Admin",
                "New enrollment",
            ],
            [
                "",
                "Anita Singh",
                "9988776655",
                "[anita@example.com](mailto:anita@example.com)",
                "Female",
                "1997-08-20",
                "Quarterly Gym",
                "Premium",
                "5000",
                "2026-09-01",
                "2026-12-01",
                "2026-09-01",
                "Yoga",
                "500",
                "0",
                "0",
                "4500",
                "Online",
                "TXN123456",
                "2026-09-01",
                "",
                "Admin",
                "Imported member",
            ],
            [
                "103",
                "Amit Kumar",
                "9123456789",
                "[amit@example.com](mailto:amit@example.com)",
                "Male",
                "1993-02-15",
                "Half Year Gym",
                "Base",
                "9000",
                "2026-09-01",
                "2027-03-01",
                "2026-09-01",
                "Weight Training",
                "0",
                "0",
                "100",
                "5000",
                "Card",
                "CARD98765",
                "2026-09-01",
                "2026-10-01",
                "Manager",
                "Partial payment",
            ],
        ];

        const csvContent = [
            headers.join(","),
            ...exampleRows.map((row) =>
                row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")
            ),
        ].join("\n");

        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
        });

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;
        link.download = "member-import-template.csv";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-6">
            {/* HEADER */}

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Upload Members
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">Import members using a CSV file.</p>
                </div>

                <Button
                    variant="outline"
                    onClick={downloadTemplate}
                    className="flex items-center gap-2"
                >
                    <Download size={18} />
                    Download CSV Template
                </Button>
            </div>

            {/* UPLOAD */}

            <ComponentCard title="Upload CSV File">
                <div className="space-y-6">
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="hover:border-brand-500 hover:bg-brand-50/50 dark:hover:bg-brand-900/10 cursor-pointer rounded-2xl border-2 border-dashed border-gray-300 p-10 text-center transition dark:border-gray-700"
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".csv,text/csv"
                            onChange={handleFileChange}
                            className="hidden"
                        />

                        <div className="bg-brand-100 text-brand-600 dark:bg-brand-900/30 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl">
                            <Upload size={30} />
                        </div>

                        <h3 className="mt-4 font-semibold text-gray-900 dark:text-white">
                            Select or Drop CSV File
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">Only CSV files are supported.</p>

                        <p className="mt-1 text-xs text-gray-400">Maximum file size: 10 MB</p>
                    </div>

                    {/* SELECTED FILE */}

                    {file && (
                        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-100 text-green-600">
                                    <FileText size={22} />
                                </div>

                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">
                                        {file.name}
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        {(file.size / 1024).toFixed(2)} KB
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    removeFile();
                                }}
                                className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    )}

                    {/* ACTION */}

                    <div className="flex justify-end border-t pt-5">
                        <Button
                            variant="primary"
                            disabled={!file || uploading}
                            onClick={handleUpload}
                            className="min-w-[180px]"
                        >
                            {uploading ? (
                                <span className="flex items-center gap-2">
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                                    Processing...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <Upload size={18} />
                                    Upload Members
                                </span>
                            )}
                        </Button>
                    </div>
                </div>
            </ComponentCard>

            {/* RESULT SUMMARY */}

            {result && (
                <ComponentCard title="Import Result">
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
                                <p className="text-sm text-blue-600">Total Rows</p>

                                <h2 className="mt-2 text-3xl font-bold text-blue-700">
                                    {result.totalRows || 0}
                                </h2>
                            </div>

                            <div className="rounded-xl border border-green-200 bg-green-50 p-5">
                                <p className="text-sm text-green-600">Valid Rows</p>

                                <h2 className="mt-2 text-3xl font-bold text-green-700">
                                    {result.validRows || 0}
                                </h2>
                            </div>

                            <div className="rounded-xl border border-red-200 bg-red-50 p-5">
                                <p className="text-sm text-red-600">Invalid Rows</p>

                                <h2 className="mt-2 text-3xl font-bold text-red-700">
                                    {result.invalidRows || 0}
                                </h2>
                            </div>
                        </div>

                        {/* VALID */}

                        {result.validRows > 0 && (
                            <div className="flex items-center gap-3 rounded-xl bg-green-50 p-4 text-green-700 dark:bg-green-900/20">
                                <CheckCircle2 size={20} />

                                <p className="text-sm font-medium">
                                    {result.validRows} member records are ready for processing.
                                </p>
                            </div>
                        )}

                        {/* ERRORS */}

                        {Array.isArray(result.errors) && result.errors.length > 0 && (
                            <div>
                                <div className="mb-4 flex items-center gap-2">
                                    <AlertCircle size={20} className="text-red-500" />

                                    <h3 className="font-semibold text-red-600">
                                        Validation Errors
                                    </h3>
                                </div>

                                <div className="overflow-x-auto rounded-xl border">
                                    <table className="w-full text-sm">
                                        <thead className="bg-gray-50 dark:bg-gray-800">
                                            <tr>
                                                <th className="px-4 py-3 text-left">Row</th>

                                                <th className="px-4 py-3 text-left">Name</th>

                                                <th className="px-4 py-3 text-left">Mobile</th>

                                                <th className="px-4 py-3 text-left">Error</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {result.errors.map((item: any, index: number) => (
                                                <tr key={index} className="border-t">
                                                    <td className="px-4 py-3">{item.row}</td>

                                                    <td className="px-4 py-3">
                                                        {item.name || "-"}
                                                    </td>

                                                    <td className="px-4 py-3">
                                                        {item.mobile || "-"}
                                                    </td>

                                                    <td className="px-4 py-3 text-red-500">
                                                        {Array.isArray(item.errors)
                                                            ? item.errors.join(", ")
                                                            : item.errors}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </ComponentCard>
            )}
        </div>
    );
}
