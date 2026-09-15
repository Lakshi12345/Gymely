import React, { useEffect, useState } from "react";

import {
    Banknote,
    Calendar,
    ChevronLeft,
    ChevronRight,
    Clock3,
    CreditCard,
    Download,
    FileSpreadsheet,
    FileText,
    Landmark,
    RefreshCw,
    Search,
    Smartphone,
    Wallet,
    X,
} from "lucide-react";

import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";

import * as XLSX from "xlsx";

import api from "../../services/api.ts";
import { useParams, useLocation } from "react-router";
import Loader from "../../components/common/Loader.tsx";

function BillingCenter() {
    const [loading, setLoading] = useState(false);
    const [preLoader, setPreLoader] = useState(false);

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 1,
    });

    const [statisticsData, setStatisticsData] = useState({
        total: 0,
        cash: 0,
        card: 0,
        upi: 0,
        cheque: 0,
        pending: 0,
    });

    // ============================================================
    // DATE HELPERS
    // ============================================================

    const getToday = () => {
        const date = new Date();

        return date.toISOString().split("T")[0];
    };

    const getMonthStart = () => {
        const date = new Date();

        date.setDate(1);

        return date.toISOString().split("T")[0];
    };

    // ============================================================
    // FILTERS
    // ============================================================

    const [filters, setFilters] = useState({
        startDate: getMonthStart(),
        endDate: getToday(),
        receiptType: "All",
        dateFilter: "paymentDate",
        taxType: "All",
        soldBy: "All",
        generatedBy: "All",
        search: "",
    });

    // ============================================================
    // STATES
    // ============================================================

    const [billings, setBillings] = useState<any[]>([]);

    const [selectedBill, setSelectedBill] = useState<any>(null);

    const [showDrawer, setShowDrawer] = useState(false);

    const [showInvoiceModal, setShowInvoiceModal] = useState(false);

    const [pdfLink, setPdfLink] = useState<string | null>(null);

    const [billLoading, setBillLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);

    const [pageSize, setPageSize] = useState(10);

    const [staff, setStaff] = useState<any[]>([]);
    const [operator, setOperator] = useState<any[]>([]);

    // ============================================================
    // FETCH BILLINGS
    // ============================================================

    useEffect(() => {
        fetchStaff();
        fetchOperator();
    }, []);

    useEffect(() => {
        const timer = setTimeout(
            () => {
                fetchBillings();
            },
            filters.search ? 400 : 0
        );

        return () => clearTimeout(timer);
    }, [
        currentPage,
        pageSize,
        filters.startDate,
        filters.endDate,
        filters.receiptType,
        filters.taxType,
        filters.soldBy,
        filters.generatedBy,
        filters.dateFilter,
        filters.search,
    ]);

    const fetchBillings = async () => {
        try {
            setLoading(true);
            setPreLoader(true);

            const params = new URLSearchParams();

            params.append("page", String(currentPage));
            params.append("limit", String(pageSize));

            if (filters.startDate) {
                params.append("startDate", filters.startDate);
            }

            if (filters.endDate) {
                params.append("endDate", filters.endDate);
            }

            params.append("receiptType", filters.receiptType);
            params.append("taxType", filters.taxType);
            params.append("soldBy", filters.soldBy);
            params.append("generatedBy", filters.generatedBy);
            params.append("dateFilter", filters.dateFilter);

            if (filters.search.trim()) {
                params.append("search", filters.search.trim());
            }

            const response = await api.get(`/member/getAllTransactions?${params.toString()}`);

            console.log("Transactions API:", response.data);

            if (response.data?.success) {
                setBillings(Array.isArray(response.data.data) ? response.data.data : []);

                setPagination(
                    response.data.pagination || {
                        page: currentPage,
                        limit: pageSize,
                        total: 0,
                        totalPages: 1,
                    }
                );

                if (response.data?.statistics) {
                    setStatisticsData({
                        total: Number(response.data.statistics.total ?? 0),
                        cash: Number(response.data.statistics.cash ?? 0),
                        card: Number(response.data.statistics.card ?? 0),
                        upi: Number(response.data.statistics.upi ?? 0),
                        cheque: Number(response.data.statistics.cheque ?? 0),
                        pending: Number(response.data.statistics.pending ?? 0),
                    });
                } else {
                    calculatePageStatistics(
                        Array.isArray(response.data.data) ? response.data.data : []
                    );
                }
            } else {
                setBillings([]);

                setPagination({
                    page: 1,
                    limit: pageSize,
                    total: 0,
                    totalPages: 1,
                });

                setStatisticsData({
                    total: 0,
                    cash: 0,
                    card: 0,
                    upi: 0,
                    cheque: 0,
                    pending: 0,
                });
            }
        } catch (error: any) {
            console.error("Failed to fetch transactions:", error?.response?.data || error);

            setBillings([]);

            setPagination({
                page: 1,
                limit: pageSize,
                total: 0,
                totalPages: 1,
            });

            setStatisticsData({
                total: 0,
                cash: 0,
                card: 0,
                upi: 0,
                cheque: 0,
                pending: 0,
            });
        } finally {
            setLoading(false);
            setPreLoader(false);
        }
    };

    const fetchStaff = async () => {
        try {
            const response = await api.get("/staff/getStaff");

            if (Array.isArray(response.data?.data)) {
                setStaff(response.data.data);
            } else {
                setStaff([]);
            }
        } catch (error: any) {
            console.error("Failed to fetch staff:", error);
            setStaff([]);
        }
    };
    const fetchOperator = async () => {
        try {
            const response = await api.get("/operator/getOperatorList");

            if (Array.isArray(response.data?.data)) {
                setOperator(response.data.data);
            } else {
                setOperator([]);
            }
        } catch (error: any) {
            console.error("Failed to fetch staff:", error);
            setOperator([]);
        }
    };

    // ============================================================
    // OPTIONS
    // ============================================================

    const receiptTypes = ["All", "Receipt", "Enrollment", "Renewal", "Package Change"];

    const taxTypes = ["All", "GST", "VAT", "Non Tax"];

    // ============================================================
    // FILTER HANDLER
    // ============================================================

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFilters((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

        setCurrentPage(1);
    };

    // ============================================================
    // DATE PICKER HANDLERS
    // ============================================================

    const handleStartDateChange = (dates: Date[]) => {
        if (!dates[0]) return;

        const selected = dates[0];

        const year = selected.getFullYear();

        const month = String(selected.getMonth() + 1).padStart(2, "0");

        const day = String(selected.getDate()).padStart(2, "0");

        const value = `${year}-${month}-${day}`;

        setFilters((prev) => ({
            ...prev,
            startDate: value,
        }));

        setCurrentPage(1);
    };

    const handleEndDateChange = (dates: Date[]) => {
        if (!dates[0]) return;

        const selected = dates[0];

        const year = selected.getFullYear();

        const month = String(selected.getMonth() + 1).padStart(2, "0");

        const day = String(selected.getDate()).padStart(2, "0");

        const value = `${year}-${month}-${day}`;

        setFilters((prev) => ({
            ...prev,
            endDate: value,
        }));

        setCurrentPage(1);
    };

    // ============================================================
    // DATE HELPERS
    // ============================================================

    const normalizeDate = (value: any) => {
        if (!value) return null;

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            return null;
        }

        return date;
    };

    const formatDate = (value: any) => {
        const date = normalizeDate(value);

        if (!date) return "-";

        return date.toLocaleDateString("en-GB");
    };

    const getBillDate = (bill: any) => {
        return bill.paymentDate || bill.updatedAt;
    };

    const getBillId = (bill: any) => {
        return bill.id || bill.billNumber || bill.invoiceNumber || bill._id || "-";
    };

    const getMemberName = (bill: any) => {
        return bill.member || bill.name || bill.memberName || bill.customerName || "-";
    };

    const getMobile = (bill: any) => {
        return bill.mobile || bill.phone || bill.mobileNumber || "-";
    };

    const getPackage = (bill: any) => {
        return bill.package || bill.planName || bill.packageName || "-";
    };

    const getTaxType = (bill: any) => {
        return bill.taxType || "Non Tax";
    };

    const getPaymentMethod = (bill: any) => {
        return bill.paymentMethod || bill.paymentMode || bill.method || "Unknown";
    };

    const getAmount = (bill: any) => {
        const value = bill.amount ?? bill.totalAmount ?? bill.grandTotal ?? bill.cost ?? 0;

        return Number(value) || 0;
    };

    const getBalance = (bill: any) => {
        const value = bill.pendingAmount ?? 0;
        return Number(value) || 0;
    };

    const getStatus = (bill: any) => {
        if (bill.status) {
            return String(bill.status);
        }

        const balance = getBalance(bill);

        if (balance > 0) {
            return "Pending";
        }

        return "Paid";
    };

    const getReceiptType = (bill: any) => {
        return bill.purpose || "Receipt";
    };

    const getSoldBy = (bill: any) => {
        return bill.soldBy || "All";
    };

    const getGeneratedBy = (bill: any) => {
        return bill.operator || "Unknown";
    };

    // ============================================================
    // PAGE STATISTICS FALLBACK
    // ============================================================

    const calculatePageStatistics = (rows: any[]) => {
        let total = 0;
        let cash = 0;
        let card = 0;
        let upi = 0;
        let cheque = 0;
        let pending = 0;

        rows.forEach((bill) => {
            const amount = Number(bill.paidAmount ?? bill.currentInstallment ?? 0) || 0;
            const balance = Number(bill.pendingAmount ?? 0) || 0;
            const method = String(bill.paymentMethod || "")
                .toLowerCase()
                .replace(/\s+/g, "");

            total += amount;

            if (method.includes("cash")) {
                cash += amount;
            } else if (
                method.includes("card") ||
                method.includes("debit") ||
                method.includes("credit")
            ) {
                card += amount;
            } else if (method.includes("upi") || method.includes("online")) {
                upi += amount;
            } else if (method.includes("cheque")) {
                cheque += amount;
            }

            pending += balance;
        });

        setStatisticsData({ total, cash, card, upi, cheque, pending });
    };

    // ============================================================
    // STATISTICS
    // ============================================================

    const statistics = [
        {
            title: "Total Earnings",
            value: statisticsData.total,
            icon: Wallet,
            color: "bg-indigo-50 text-indigo-600",
        },
        {
            title: "Cash",
            value: statisticsData.cash,
            icon: Banknote,
            color: "bg-emerald-50 text-emerald-600",
        },
        {
            title: "Card",
            value: statisticsData.card,
            icon: CreditCard,
            color: "bg-blue-50 text-blue-600",
        },
        {
            title: "UPI",
            value: statisticsData.upi,
            icon: Smartphone,
            color: "bg-violet-50 text-violet-600",
        },
        {
            title: "Cheque",
            value: statisticsData.cheque,
            icon: Landmark,
            color: "bg-orange-50 text-orange-600",
        },
        {
            title: "Pending",
            value: statisticsData.pending,
            icon: Clock3,
            color: "bg-red-50 text-red-600",
        },
    ];

    // ============================================================
    // PAGINATION
    // ============================================================

    const totalPages = pagination.totalPages;

    const pageStart = pagination.total === 0 ? 0 : (currentPage - 1) * pageSize + 1;

    const pageEnd = Math.min(currentPage * pageSize, pagination.total);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    // ============================================================
    // RESET FILTERS
    // ============================================================

    const resetFilters = () => {
        setFilters({
            startDate: getMonthStart(),
            endDate: getToday(),
            receiptType: "All",
            dateFilter: "paymentDate",
            taxType: "All",
            soldBy: "All",
            generatedBy: "All",
            search: "",
        });

        setCurrentPage(1);
    };

    // ============================================================
    // VIEW BILL
    // ============================================================

    const handleViewBill = async (bill: any) => {
        await fetchBill(bill._id);
    };

    const fetchBill = async (billId: string) => {
        try {
            setPreLoader(true);
            setBillLoading(true);

            const response = await api.get(`/member/viewBill/${billId}`);

            console.log("Bill Details:", response.data);

            if (response.data?.success || response.data?.status) {
                const billData = response.data.data;

                console.log("Bill Data:", billData);
                console.log("Invoice Path:", billData?.invoicePath);

                setSelectedBill(billData);

                setPdfLink(billData?.invoicePath || null);

                setShowInvoiceModal(true);

                return billData;
            }

            return null;
        } catch (error: any) {
            console.error("Failed to fetch bill:", error?.response?.data || error);

            return null;
        } finally {
            setPreLoader(false);
            setBillLoading(false);
        }
    };
    // ============================================================
    // OPEN DRAWER
    // ============================================================

    const openDrawer = (bill: any) => {
        setSelectedBill(bill);

        setShowDrawer(true);
    };

    // ============================================================
    // EXCEL REPORT
    // ============================================================

    const generateExcelReport = () => {
        if (billings.length === 0) {
            return;
        }

        const reportData = billings.map((bill, index) => ({
            "#": index + 1,

            "Bill No.": getBillId(bill),

            Date: formatDate(getBillDate(bill)),

            Member: getMemberName(bill),

            Mobile: getMobile(bill),

            Package: getPackage(bill),

            "Receipt Type": getReceiptType(bill),

            Tax: getTaxType(bill),

            Amount: getAmount(bill),

            "Payment Method": getPaymentMethod(bill),

            Status: getStatus(bill),

            Balance: getBalance(bill),

            "Sold By": getSoldBy(bill),

            "Generated By": getGeneratedBy(bill),
        }));

        const worksheet = XLSX.utils.json_to_sheet(reportData);

        worksheet["!cols"] = [
            { wch: 6 },
            { wch: 18 },
            { wch: 14 },
            { wch: 24 },
            { wch: 16 },
            { wch: 24 },
            { wch: 18 },
            { wch: 12 },
            { wch: 14 },
            { wch: 18 },
            { wch: 14 },
            { wch: 14 },
            { wch: 18 },
            { wch: 18 },
        ];

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "Invoice Report");

        const date = new Date().toISOString().split("T")[0];

        XLSX.writeFile(workbook, `Invoice_Report_${date}.xlsx`);
    };

    // ============================================================
    // FORMAT CURRENCY
    // ============================================================

    const formatCurrency = (value: number) => {
        return `₹${Number(value || 0).toLocaleString("en-IN", {
            maximumFractionDigits: 2,
        })}`;
    };

    // ============================================================
    // STATUS CLASS
    // ============================================================

    const getStatusClass = (status: string) => {
        const value = status.toLowerCase().trim();

        if (value === "paid" || value === "completed" || value === "success") {
            return "bg-emerald-50 text-emerald-700 border-emerald-100";
        }

        if (value === "pending" || value === "partial") {
            return "bg-amber-50 text-amber-700 border-amber-100";
        }

        if (value === "cancelled" || value === "failed") {
            return "bg-red-50 text-red-700 border-red-100";
        }

        return "bg-gray-50 text-gray-600 border-gray-100";
    };

    // ============================================================
    // PAYMENT CLASS
    // ============================================================

    const getPaymentClass = (method: string) => {
        const value = method.toLowerCase().trim();

        if (value.includes("upi")) {
            return "bg-violet-50 text-violet-700 border-violet-100";
        }

        if (value.includes("cash")) {
            return "bg-emerald-50 text-emerald-700 border-emerald-100";
        }

        if (value.includes("card") || value.includes("credit") || value.includes("debit")) {
            return "bg-blue-50 text-blue-700 border-blue-100";
        }

        if (value.includes("cheque")) {
            return "bg-orange-50 text-orange-700 border-orange-100";
        }

        return "bg-gray-50 text-gray-600 border-gray-100";
    };

    const { id } = useParams<{ id: string }>();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes("/viewbill/") && id) {
            fetchBill(id);
        }
    }, [id, location.pathname]);

    // ============================================================
    // PAGE
    // ============================================================

    return (
        <>
            <Loader loading={preLoader} text="Loading Bills..." />
            <div className="space-y-5">
                {/*FILTER SECTION*/}

                <div className="overflow-visible rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-100 px-6 py-5">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
                                    <Calendar size={20} className="text-indigo-600" />
                                </div>

                                <div>
                                    <h2 className="text-base font-bold text-gray-900">
                                        Invoice Filters
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Search and filter your billing records
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={resetFilters}
                                    className="flex h-10 items-center gap-2 rounded-xl border border-gray-200 px-4 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                                >
                                    <RefreshCw size={15} />
                                    Reset
                                </button>

                                <button
                                    type="button"
                                    onClick={fetchBillings}
                                    disabled={loading}
                                    className="flex h-10 items-center gap-2 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    <RefreshCw
                                        size={15}
                                        className={loading ? "animate-spin" : ""}
                                    />
                                    Refresh
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-visible p-6">
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                            {/* START DATE */}

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-600">
                                    Start Date
                                </label>

                                <div className="relative">
                                    <Calendar
                                        size={18}
                                        className="pointer-events-none absolute top-1/2 left-3.5 z-10 -translate-y-1/2 text-indigo-500"
                                    />

                                    <Flatpickr
                                        value={filters.startDate}
                                        options={{
                                            dateFormat: "Y-m-d",
                                            altFormat: "d/m/Y",
                                            maxDate: filters.endDate || undefined,
                                            allowInput: true,
                                            altInput: true,
                                            disableMobile: true,
                                        }}
                                        onChange={handleStartDateChange}
                                        className="h-12 w-full cursor-pointer rounded-xl border border-gray-200 bg-white pr-4 pl-11 text-sm font-medium text-gray-700 shadow-sm transition outline-none hover:border-indigo-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                                    />
                                </div>
                            </div>

                            {/* END DATE */}

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-600">
                                    End Date
                                </label>

                                <div className="relative">
                                    <Calendar
                                        size={18}
                                        className="pointer-events-none absolute top-1/2 left-3.5 z-10 -translate-y-1/2 text-indigo-500"
                                    />

                                    <Flatpickr
                                        value={filters.endDate}
                                        options={{
                                            dateFormat: "Y-m-d",
                                            altFormat: "d/m/Y",
                                            minDate: filters.startDate || undefined,
                                            allowInput: true,
                                            altInput: true,
                                            disableMobile: true,
                                        }}
                                        onChange={handleEndDateChange}
                                        className="h-12 w-full cursor-pointer rounded-xl border border-gray-200 bg-white pr-4 pl-11 text-sm font-medium text-gray-700 shadow-sm transition outline-none hover:border-indigo-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                                    />
                                </div>
                            </div>

                            {/* RECEIPT TYPE */}

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-600">
                                    Receipt Type
                                </label>

                                <select
                                    name="receiptType"
                                    value={filters.receiptType}
                                    onChange={handleFilterChange}
                                    className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 transition outline-none hover:border-indigo-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                                >
                                    {receiptTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* TAX */}

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-600">
                                    Tax Type
                                </label>

                                <select
                                    name="taxType"
                                    value={filters.taxType}
                                    onChange={handleFilterChange}
                                    className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 transition outline-none hover:border-indigo-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                                >
                                    {taxTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* SOLD BY */}

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-600">
                                    Sold By
                                </label>

                                <select
                                    name="soldBy"
                                    value={filters.soldBy}
                                    onChange={handleFilterChange}
                                    className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 transition outline-none hover:border-indigo-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                                >
                                    <option value="All"> All </option>
                                    {staff.map((item) => (
                                        <option key={item._id} value={item.name}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* GENERATED BY */}

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-600">
                                    Generated By
                                </label>

                                <select
                                    name="generatedBy"
                                    value={filters.generatedBy}
                                    onChange={handleFilterChange}
                                    className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 transition outline-none hover:border-indigo-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                                >
                                    <option value="All">All</option>
                                    <option value="Owner">Owner</option>
                                    {operator.map((item) => (
                                        <option key={item._id} value={item.name}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* SEARCH */}

                        <div className="mt-5">
                            <label className="mb-2 block text-sm font-semibold text-gray-600">
                                Search Invoices
                            </label>

                            <div className="relative">
                                <Search
                                    size={19}
                                    className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="text"
                                    name="search"
                                    value={filters.search}
                                    onChange={handleFilterChange}
                                    placeholder="Search bill number, member, mobile, package..."
                                    className="h-12 w-full rounded-xl border border-gray-200 bg-white pr-4 pl-11 text-sm font-medium text-gray-700 transition outline-none placeholder:text-gray-400 hover:border-indigo-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ======================================================
                    STATISTICS
                ====================================================== */}

                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
                    {statistics.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={index}
                                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <div className="min-w-0">
                                        <p className="truncate text-xs font-semibold tracking-wide text-gray-500 uppercase">
                                            {item.title}
                                        </p>

                                        <h2 className="mt-2 text-xl font-bold tracking-tight text-gray-900">
                                            {formatCurrency(item.value)}
                                        </h2>
                                    </div>

                                    <div
                                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.color}`}
                                    >
                                        <Icon size={19} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* ======================================================
                    BILLING TABLE
                ====================================================== */}

                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    {/* TABLE HEADER */}

                    <div className="border-b border-gray-100 px-6 py-5">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
                                        <FileText size={19} className="text-indigo-600" />
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h2 className="text-base font-bold text-gray-900">
                                                Invoice History
                                            </h2>

                                            <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-bold text-gray-600">
                                                {pagination.total}
                                            </span>
                                        </div>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Showing {pageStart}–{pageEnd} of {pagination.total}{" "}
                                            invoices
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={generateExcelReport}
                                    disabled={billings.length === 0}
                                    className="flex h-10 items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <FileSpreadsheet size={17} />
                                    Excel Report
                                </button>

                                <button
                                    type="button"
                                    onClick={fetchBillings}
                                    disabled={loading}
                                    className="flex h-10 items-center gap-2 rounded-xl border border-gray-200 px-4 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                                >
                                    <RefreshCw
                                        size={15}
                                        className={loading ? "animate-spin" : ""}
                                    />
                                    Refresh
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* TABLE */}

                    <div className="overflow-x-auto">
                        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
                            <table className="w-full min-w-[1750px] border-collapse">
                                <thead className="border-b border-gray-200 bg-gray-50/80">
                                    <tr className="text-left">
                                        <th className="border-r border-gray-200 px-5 py-4 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                                            #
                                        </th>

                                        <th className="border-r border-gray-200 px-5 py-4 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                                            Member
                                        </th>

                                        <th className="border-r border-gray-200 px-5 py-4 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                                            Bill No
                                        </th>

                                        <th className="border-r border-gray-200 px-5 py-4 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                                            Transaction
                                        </th>

                                        <th className="border-r border-gray-200 px-5 py-4 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                                            Package
                                        </th>

                                        <th className="border-r border-gray-200 px-5 py-4 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                                            Cost
                                        </th>

                                        <th className="border-r border-gray-200 px-5 py-4 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                                            Tax
                                        </th>

                                        <th className="border-r border-gray-200 px-5 py-4 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                                            Total
                                        </th>

                                        <th className="border-r border-gray-200 px-5 py-4 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                                            Paid
                                        </th>

                                        <th className="border-r border-gray-200 px-5 py-4 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                                            Balance
                                        </th>

                                        <th className="border-r border-gray-200 px-5 py-4 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                                            Method
                                        </th>

                                        <th className="border-r border-gray-200 px-5 py-4 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                                            Purpose
                                        </th>

                                        <th className="border-r border-gray-200 px-5 py-4 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                                            Sold By
                                        </th>

                                        <th className="border-r border-gray-200 px-5 py-4 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                                            Bill Date
                                        </th>

                                        <th className="border-r border-gray-200 px-5 py-4 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                                            Payment Date
                                        </th>

                                        <th className="border-r border-gray-200 px-5 py-4 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                                            Membership Period
                                        </th>

                                        <th className="border-r border-gray-200 px-5 py-4 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                                            Next Payment
                                        </th>

                                        <th className="px-5 py-4 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {loading ? (
                                        Array.from({ length: 6 }).map((_, index) => (
                                            <tr key={index} className="border-b border-gray-100">
                                                {Array.from({ length: 18 }).map((__, cellIndex) => (
                                                    <td
                                                        key={cellIndex}
                                                        className="border-r border-gray-100 px-5 py-5 last:border-r-0"
                                                    >
                                                        <div className="h-5 w-full max-w-[110px] animate-pulse rounded bg-gray-100" />
                                                    </td>
                                                ))}
                                            </tr>
                                        ))
                                    ) : billings.length > 0 ? (
                                        <>
                                            {billings.map((bill, index) => {
                                                const paid = Number(
                                                    bill.paidAmount ?? bill.currentInstallment ?? 0
                                                );

                                                const total = Number(bill.totalPayable ?? 0);

                                                const balance = Number(bill.pendingAmount ?? 0);

                                                const paymentMethod =
                                                    bill.paymentMethod || "Unknown";

                                                const status =
                                                    balance <= 0
                                                        ? "PAID"
                                                        : paid > 0
                                                          ? "PARTIAL"
                                                          : "UNPAID";

                                                return (
                                                    <tr
                                                        key={bill._id || index}
                                                        className="border-b border-gray-100 transition odd:bg-white even:bg-gray-50/70 hover:bg-indigo-50/60 dark:border-gray-800 dark:odd:bg-gray-900 dark:even:bg-gray-800/60 dark:hover:bg-gray-800"
                                                    >
                                                        {/* # */}

                                                        <td className="border-r border-gray-100 px-5 py-5 text-sm text-gray-400">
                                                            {(currentPage - 1) * pageSize +
                                                                index +
                                                                1}
                                                        </td>

                                                        {/* MEMBER */}

                                                        <td className="border-r border-gray-100 px-5 py-5">
                                                            <div className="min-w-[190px]">
                                                                <p className="font-semibold text-gray-800">
                                                                    {bill.name || "-"}
                                                                </p>

                                                                <p className="mt-1 text-xs text-gray-500">
                                                                    {bill.mobile || "-"}
                                                                </p>

                                                                <p className="mt-1 text-xs text-gray-400">
                                                                    UID: {bill.UID ?? "-"}
                                                                </p>
                                                            </div>
                                                        </td>

                                                        {/* BILL NUMBER */}

                                                        <td className="border-r border-gray-100 px-5 py-5">
                                                            <button
                                                                type="button"
                                                                onClick={() => handleViewBill(bill)}
                                                                className="font-bold text-indigo-600 hover:text-indigo-800"
                                                            >
                                                                #{bill.billNumber ?? "-"}
                                                            </button>
                                                        </td>

                                                        {/* TRANSACTION */}

                                                        <td className="border-r border-gray-100 px-5 py-5">
                                                            <div>
                                                                <p className="font-semibold text-gray-700">
                                                                    #{bill.transactionId ?? "-"}
                                                                </p>

                                                                <p className="mt-1 text-xs text-gray-400">
                                                                    {bill.purpose || "-"}
                                                                </p>
                                                            </div>
                                                        </td>

                                                        {/* PACKAGE */}

                                                        <td className="border-r border-gray-100 px-5 py-5">
                                                            <div>
                                                                <p className="font-semibold text-gray-800">
                                                                    {bill.planName || "-"}
                                                                </p>

                                                                <p className="mt-1 text-xs text-gray-500">
                                                                    {bill.packageType || "-"}
                                                                </p>
                                                            </div>
                                                        </td>

                                                        {/* COST */}

                                                        <td className="border-r border-gray-100 px-5 py-5 text-sm font-semibold whitespace-nowrap text-gray-800">
                                                            ₹
                                                            {Number(bill.cost ?? 0).toLocaleString(
                                                                "en-IN"
                                                            )}
                                                        </td>

                                                        {/* TAX */}

                                                        <td className="border-r border-gray-100 px-5 py-5">
                                                            <div>
                                                                <p className="font-semibold text-gray-700">
                                                                    ₹
                                                                    {Number(
                                                                        bill.taxAmount ?? 0
                                                                    ).toLocaleString("en-IN")}
                                                                </p>

                                                                <p className="mt-1 text-xs text-gray-500">
                                                                    {bill.taxType || "Non Tax"}
                                                                </p>
                                                            </div>
                                                        </td>

                                                        {/* TOTAL */}

                                                        <td className="border-r border-gray-100 px-5 py-5 text-sm font-bold whitespace-nowrap text-gray-900">
                                                            ₹{total.toLocaleString("en-IN")}
                                                        </td>

                                                        {/* PAID */}

                                                        <td className="border-r border-gray-100 px-5 py-5">
                                                            <p className="font-bold text-green-600">
                                                                ₹{paid.toLocaleString("en-IN")}
                                                            </p>

                                                            {Number(
                                                                bill.currentInstallment ?? 0
                                                            ) !== Number(bill.paidAmount ?? 0) && (
                                                                <p className="mt-1 text-xs text-gray-400">
                                                                    Current: ₹
                                                                    {Number(
                                                                        bill.currentInstallment ?? 0
                                                                    ).toLocaleString("en-IN")}
                                                                </p>
                                                            )}
                                                        </td>

                                                        {/* BALANCE */}

                                                        <td className="border-r border-gray-100 px-5 py-5">
                                                            {balance <= 0 ? (
                                                                <span className="rounded-lg border border-green-100 bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                                                                    Paid
                                                                </span>
                                                            ) : (
                                                                <div>
                                                                    <p className="font-bold text-red-600">
                                                                        ₹
                                                                        {balance.toLocaleString(
                                                                            "en-IN"
                                                                        )}
                                                                    </p>

                                                                    <p className="mt-1 text-xs text-gray-400">
                                                                        Outstanding
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </td>

                                                        {/* PAYMENT METHOD */}

                                                        <td className="border-r border-gray-100 px-5 py-5">
                                                            <div>
                                                                <span
                                                                    className={`rounded-lg border px-3 py-1.5 text-xs font-semibold ${
                                                                        paymentMethod.toLowerCase() ===
                                                                        "cash"
                                                                            ? "border-green-100 bg-green-50 text-green-700"
                                                                            : paymentMethod.toLowerCase() ===
                                                                                "online"
                                                                              ? "border-blue-100 bg-blue-50 text-blue-700"
                                                                              : "border-gray-200 bg-gray-50 text-gray-700"
                                                                    }`}
                                                                >
                                                                    {paymentMethod}
                                                                </span>

                                                                {bill.paymentReference && (
                                                                    <p className="mt-2 max-w-[120px] truncate text-xs text-gray-400">
                                                                        {bill.paymentReference}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </td>

                                                        {/* PURPOSE */}

                                                        <td className="border-r border-gray-100 px-5 py-5">
                                                            <span
                                                                className={`rounded-lg border px-3 py-1.5 text-xs font-semibold ${
                                                                    bill.purpose === "Renewal"
                                                                        ? "border-blue-100 bg-blue-50 text-blue-700"
                                                                        : "border-gray-200 bg-gray-50 text-gray-700"
                                                                }`}
                                                            >
                                                                {bill.purpose || "-"}
                                                            </span>
                                                        </td>

                                                        {/* SOLD BY */}

                                                        <td className="border-r border-gray-100 px-5 py-5">
                                                            <span className="text-sm font-medium text-gray-700">
                                                                {bill.soldBy || "Admin"}
                                                            </span>
                                                        </td>

                                                        {/* BILL DATE */}

                                                        <td className="border-r border-gray-100 px-5 py-5 whitespace-nowrap">
                                                            <div>
                                                                <p className="text-sm font-semibold text-gray-700">
                                                                    {bill.billDate
                                                                        ? new Date(
                                                                              bill.billDate
                                                                          ).toLocaleDateString(
                                                                              "en-GB"
                                                                          )
                                                                        : "-"}
                                                                </p>

                                                                <p className="mt-1 text-xs text-gray-400">
                                                                    Bill Generated
                                                                </p>
                                                            </div>
                                                        </td>

                                                        {/* PAYMENT DATE */}

                                                        <td className="border-r border-gray-100 px-5 py-5 whitespace-nowrap">
                                                            <div>
                                                                <p className="text-sm font-semibold text-gray-700">
                                                                    {bill.paymentDate
                                                                        ? new Date(
                                                                              bill.paymentDate
                                                                          ).toLocaleDateString(
                                                                              "en-GB"
                                                                          )
                                                                        : "-"}
                                                                </p>

                                                                <p className="mt-1 text-xs text-gray-400">
                                                                    Payment
                                                                </p>
                                                            </div>
                                                        </td>

                                                        {/* START DATE */}

                                                        <td className="border-r border-gray-100 px-5 py-5 whitespace-nowrap">
                                                            <div>
                                                                <p className="text-sm font-semibold text-gray-700">
                                                                    <span className="text-green-600">
                                                                        {bill.startDate
                                                                            ? new Date(
                                                                                  bill.startDate
                                                                              ).toLocaleDateString(
                                                                                  "en-GB"
                                                                              )
                                                                            : "-"}
                                                                    </span>{" "}
                                                                    -{" "}
                                                                    <span className="text-red-600">
                                                                        {bill.expiryDate
                                                                            ? new Date(
                                                                                  bill.expiryDate
                                                                              ).toLocaleDateString(
                                                                                  "en-GB"
                                                                              )
                                                                            : "-"}
                                                                    </span>
                                                                </p>
                                                            </div>
                                                        </td>

                                                        {/* NEXT PAYMENT */}

                                                        <td className="border-r border-gray-100 px-5 py-5 whitespace-nowrap">
                                                            {balance > 0 ? (
                                                                bill.nextPaymentDate ? (
                                                                    <div>
                                                                        <p className="text-sm font-semibold text-red-600">
                                                                            {new Date(
                                                                                bill.nextPaymentDate
                                                                            ).toLocaleDateString(
                                                                                "en-GB"
                                                                            )}
                                                                        </p>

                                                                        <p className="mt-1 text-xs text-gray-400">
                                                                            Payment Due
                                                                        </p>
                                                                    </div>
                                                                ) : (
                                                                    <span className="text-xs font-medium text-orange-500">
                                                                        Not Scheduled
                                                                    </span>
                                                                )
                                                            ) : (
                                                                <span className="text-xs text-gray-400">
                                                                    -
                                                                </span>
                                                            )}
                                                        </td>

                                                        {/* ACTIONS */}

                                                        <td className="px-5 py-5">
                                                            <div className="flex items-center gap-2">
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleViewBill(bill)
                                                                    }
                                                                    disabled={billLoading}
                                                                    className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
                                                                >
                                                                    {billLoading ? "..." : "View"}
                                                                </button>

                                                                <button
                                                                    type="button"
                                                                    onClick={() => openDrawer(bill)}
                                                                    className="rounded-lg border border-indigo-100 px-3 py-2 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-50"
                                                                >
                                                                    Details
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </>
                                    ) : (
                                        <tr>
                                            <td colSpan={18} className="px-6 py-20 text-center">
                                                <div className="mx-auto flex max-w-sm flex-col items-center">
                                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
                                                        <FileText
                                                            size={26}
                                                            className="text-gray-400"
                                                        />
                                                    </div>

                                                    <h3 className="mt-5 text-base font-bold text-gray-700">
                                                        No invoices found
                                                    </h3>

                                                    <p className="mt-2 text-sm text-gray-400">
                                                        Try changing your filters or date range.
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* ======================================================
                        PAGINATION
                    ====================================================== */}

                    {billings.length > 0 && (
                        <div className="flex flex-col gap-4 border-t border-gray-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                            {/* Left */}
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                                <span className="font-medium">Rows</span>

                                <select
                                    value={pageSize}
                                    onChange={(e) => {
                                        setPageSize(Number(e.target.value));
                                        setCurrentPage(1);
                                    }}
                                    className="h-9 rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium outline-none focus:border-indigo-400"
                                >
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>

                                <span>
                                    Showing{" "}
                                    <strong className="font-semibold text-gray-700">
                                        {pageStart}–{pageEnd}
                                    </strong>{" "}
                                    of{" "}
                                    <strong className="font-semibold text-gray-700">
                                        {pagination.total}
                                    </strong>
                                </span>
                            </div>

                            {/* Right */}
                            <div className="flex items-center gap-1.5">
                                {/* Previous */}
                                <button
                                    type="button"
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <ChevronLeft size={16} />
                                </button>

                                {/* Page numbers */}
                                {Array.from({
                                    length: Math.min(totalPages, 5),
                                }).map((_, index) => {
                                    let page = index + 1;

                                    if (totalPages > 5) {
                                        if (currentPage <= 3) {
                                            page = index + 1;
                                        } else if (currentPage >= totalPages - 2) {
                                            page = totalPages - 4 + index;
                                        } else {
                                            page = currentPage - 2 + index;
                                        }
                                    }

                                    return (
                                        <button
                                            key={page}
                                            type="button"
                                            onClick={() => setCurrentPage(page)}
                                            className={`h-9 min-w-9 rounded-lg px-3 text-sm font-semibold transition ${
                                                currentPage === page
                                                    ? "bg-indigo-600 text-white shadow-sm"
                                                    : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    );
                                })}

                                {/* Next */}
                                <button
                                    type="button"
                                    disabled={currentPage === totalPages}
                                    onClick={() =>
                                        setCurrentPage((page) => Math.min(page + 1, totalPages))
                                    }
                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* ======================================================
                    BILL DETAILS DRAWER
                ====================================================== */}

                {showDrawer && selectedBill && (
                    <div className="fixed inset-0 z-[99999]">
                        <div
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                            onClick={() => {
                                setShowDrawer(false);
                                setSelectedBill(null);
                            }}
                        />

                        <div className="absolute top-0 right-0 flex h-full w-full max-w-[620px] flex-col overflow-hidden bg-white shadow-2xl">
                            {/* HEADER */}
                            <div className="shrink-0 border-b border-gray-100 bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600 px-5 py-4 text-white">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-sm text-indigo-100">
                                            Invoice #{selectedBill.billNumber ?? "-"}
                                        </p>

                                        <h1 className="mt-1 text-xl font-bold">
                                            {selectedBill.name || "-"}
                                        </h1>

                                        <p className="mt-1 text-sm text-indigo-100">
                                            Transaction #{selectedBill.transactionId ?? "-"}
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowDrawer(false);
                                            setSelectedBill(null);
                                        }}
                                        className="rounded-lg bg-white/15 p-2.5 transition hover:bg-white/25"
                                    >
                                        <X size={19} />
                                    </button>
                                </div>
                            </div>

                            {/* BODY */}
                            <div className="min-h-0 flex-1 overflow-y-auto p-5">
                                {/* MEMBER */}
                                <div className="rounded-xl border border-gray-200 p-4">
                                    <h2 className="mb-4 text-sm font-bold text-gray-900">
                                        Member Information
                                    </h2>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs font-semibold text-gray-400 uppercase">
                                                Name
                                            </p>
                                            <p className="mt-1 text-sm font-semibold text-gray-800">
                                                {selectedBill.name || "-"}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs font-semibold text-gray-400 uppercase">
                                                Mobile
                                            </p>
                                            <p className="mt-1 text-sm font-semibold text-gray-800">
                                                {selectedBill.mobile || "-"}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs font-semibold text-gray-400 uppercase">
                                                UID
                                            </p>
                                            <p className="mt-1 text-sm font-semibold text-gray-800">
                                                {selectedBill.UID ?? "-"}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs font-semibold text-gray-400 uppercase">
                                                Purpose
                                            </p>
                                            <p className="mt-1 text-sm font-semibold text-gray-800">
                                                {selectedBill.purpose || "-"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* PACKAGE */}
                                <div className="mt-4 rounded-xl border border-gray-200 p-4">
                                    <h2 className="mb-4 text-sm font-bold text-gray-900">
                                        Package Information
                                    </h2>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs font-semibold text-gray-400 uppercase">
                                                Package
                                            </p>
                                            <p className="mt-1 text-sm font-semibold text-gray-800">
                                                {selectedBill.planName || "-"}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs font-semibold text-gray-400 uppercase">
                                                Package Type
                                            </p>
                                            <p className="mt-1 text-sm font-semibold text-gray-800">
                                                {selectedBill.packageType || "-"}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs font-semibold text-gray-400 uppercase">
                                                Start Date
                                            </p>
                                            <p className="mt-1 text-sm font-semibold text-gray-800">
                                                {formatDate(selectedBill.startDate)}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs font-semibold text-gray-400 uppercase">
                                                Expiry Date
                                            </p>
                                            <p className="mt-1 text-sm font-semibold text-gray-800">
                                                {formatDate(selectedBill.expiryDate)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* BILLING */}
                                <div className="mt-4 rounded-xl border border-gray-200 p-4">
                                    <h2 className="mb-4 text-sm font-bold text-gray-900">
                                        Billing Information
                                    </h2>

                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Cost</span>
                                            <strong>
                                                {formatCurrency(Number(selectedBill.cost ?? 0))}
                                            </strong>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Discount</span>
                                            <strong className="text-red-500">
                                                -{" "}
                                                {formatCurrency(Number(selectedBill.discount ?? 0))}
                                            </strong>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Tax</span>
                                            <strong>
                                                {formatCurrency(
                                                    Number(selectedBill.taxAmount ?? 0)
                                                )}
                                            </strong>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Convenience</span>
                                            <strong>
                                                {formatCurrency(
                                                    Number(selectedBill.convenience ?? 0)
                                                )}
                                            </strong>
                                        </div>

                                        <div className="flex justify-between border-t pt-3">
                                            <span className="font-semibold">Total Payable</span>
                                            <strong className="text-lg">
                                                {formatCurrency(
                                                    Number(selectedBill.totalPayable ?? 0)
                                                )}
                                            </strong>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Paid</span>
                                            <strong className="text-green-600">
                                                {formatCurrency(
                                                    Number(selectedBill.paidAmount ?? 0)
                                                )}
                                            </strong>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Pending</span>
                                            <strong className="text-red-600">
                                                {formatCurrency(
                                                    Number(selectedBill.pendingAmount ?? 0)
                                                )}
                                            </strong>
                                        </div>
                                    </div>
                                </div>

                                {/* PAYMENT */}
                                <div className="mt-4 rounded-xl border border-gray-200 p-4">
                                    <h2 className="mb-4 text-sm font-bold text-gray-900">
                                        Payment Information
                                    </h2>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs font-semibold text-gray-400 uppercase">
                                                Payment Method
                                            </p>

                                            <p className="mt-1 text-sm font-semibold">
                                                {selectedBill.paymentMethod || "-"}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs font-semibold text-gray-400 uppercase">
                                                Payment Reference
                                            </p>

                                            <p className="mt-1 text-sm font-semibold break-all">
                                                {selectedBill.paymentReference || "-"}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs font-semibold text-gray-400 uppercase">
                                                Payment Date
                                            </p>

                                            <p className="mt-1 text-sm font-semibold">
                                                {formatDate(selectedBill.paymentDate)}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs font-semibold text-gray-400 uppercase">
                                                Next Payment
                                            </p>

                                            <p className="mt-1 text-sm font-semibold">
                                                {selectedBill.pendingAmount > 0
                                                    ? formatDate(selectedBill.nextPaymentDate)
                                                    : "-"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* DATES */}
                                <div className="mt-4 rounded-xl border border-gray-200 p-4">
                                    <h2 className="mb-4 text-sm font-bold text-gray-900">
                                        Invoice Information
                                    </h2>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs font-semibold text-gray-400 uppercase">
                                                Bill Number
                                            </p>

                                            <p className="mt-1 text-sm font-semibold">
                                                #{selectedBill.billNumber ?? "-"}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs font-semibold text-gray-400 uppercase">
                                                Transaction ID
                                            </p>

                                            <p className="mt-1 text-sm font-semibold">
                                                #{selectedBill.transactionId ?? "-"}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs font-semibold text-gray-400 uppercase">
                                                Bill Date
                                            </p>

                                            <p className="mt-1 text-sm font-semibold">
                                                {formatDate(selectedBill.billDate)}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs font-semibold text-gray-400 uppercase">
                                                Sold By
                                            </p>

                                            <p className="mt-1 text-sm font-semibold">
                                                {selectedBill.soldBy || "-"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* REMARKS */}
                                {selectedBill.remarks && (
                                    <div className="mt-4 rounded-xl border border-gray-200 p-4">
                                        <h2 className="mb-2 text-sm font-bold text-gray-900">
                                            Remarks
                                        </h2>

                                        <p className="text-sm text-gray-600">
                                            {selectedBill.remarks}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                {/* ======================================================
                    INVOICE PDF MODAL
                ====================================================== */}

                {showInvoiceModal && selectedBill && (
                    <div className="fixed inset-0 z-[99999] bg-black/60 p-3 sm:p-5">
                        <div className="mx-auto flex h-full w-auto max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
                            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
                                        <FileText size={18} className="text-indigo-600" />
                                    </div>

                                    <div>
                                        <h2 className="text-base font-bold text-gray-900">
                                            Invoice
                                        </h2>

                                        <p className="mt-0.5 text-sm text-gray-500">
                                            Invoice #{selectedBill._id}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowInvoiceModal(false);

                                        setSelectedBill(null);

                                        setPdfLink(null);
                                    }}
                                    className="rounded-xl p-2.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="min-h-0 flex-1 bg-gray-100">
                                {pdfLink ? (
                                    <iframe
                                        src={`${pdfLink}#zoom=75`}
                                        title="Invoice PDF"
                                        className="h-full w-full border-0"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center">
                                        <div className="text-center">
                                            <FileText size={34} className="mx-auto text-gray-300" />

                                            <p className="mt-3 text-sm text-gray-500">
                                                PDF URL not available
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default BillingCenter;
