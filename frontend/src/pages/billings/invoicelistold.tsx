import React, { useEffect, useState } from "react";

import {
    Banknote,
    Calendar,
    Clock3,
    CreditCard,
    Download,
    FileText,
    Landmark,
    Search,
    Smartphone,
    Wallet,
} from "lucide-react";
import api from "../../services/api.ts";

function BillingCenter() {
    const [loading, setLoading] = useState(false);

    const [filters, setFilters] = useState({
        startDate: "",
        endDate: "",
        receiptType: "All",
        dateFilter: "paymentDate",
        taxType: "All",
        soldBy: "All",
        generatedBy: "All",
        search: "",
    });

    const [selectedBill, setSelectedBill] = useState<any>(null);

    const [showDrawer, setShowDrawer] = useState(false);

    const openDrawer = (bill: any) => {
        setSelectedBill(bill);
        setShowDrawer(true);
    };
    const [billings, setBillings] = useState<any[]>([]);

    useEffect(() => {
        fetchBillings();
    }, []);

    const fetchBillings = async () => {
        try {
            setLoading(true);

            const response = await api.get("/member/getAllTransactions");

            console.log("Transactions API:", response.data);

            if (response.data?.success) {
                setBillings(Array.isArray(response.data.data) ? response.data.data : []);
            } else {
                setBillings([]);
            }
        } catch (error: any) {
            console.error("Failed to fetch transactions:", error?.response?.data || error);

            setBillings([]);
        } finally {
            setLoading(false);
        }
    };

    const statistics = [
        {
            title: "Total Earnings",
            value: "₹20,600",
            icon: Wallet,
            color: "bg-indigo-50",
        },
        {
            title: "Cash",
            value: "₹0",
            icon: Banknote,
            color: "bg-emerald-50",
        },
        {
            title: "Card",
            value: "₹0",
            icon: CreditCard,
            color: "bg-blue-50",
        },
        {
            title: "UPI",
            value: "₹20,600",
            icon: Smartphone,
            color: "bg-violet-50",
        },
        {
            title: "Cheque",
            value: "₹0",
            icon: Landmark,
            color: "bg-orange-50",
        },
        {
            title: "Pending",
            value: "₹0",
            icon: Clock3,
            color: "bg-red-50",
        },
    ];

    const receiptTypes = ["All", "Receipt", "Enrollment", "Renewal", "Package Change"];

    const taxTypes = ["All", "GST", "VAT", "None"];

    const staff = ["All", "Bishan", "Pramodh", "Gopal", "Neha"];

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    const [showInvoiceModal, setShowInvoiceModal] = useState(false);
    const [pdfLink, setPdfLink] = useState<string | null>(null);
    const [billLoading, setBillLoading] = useState(false);
    const handleViewBill = async (bill: any) => {
        try {
            setBillLoading(true);

            const response = await api.get(`/member/viewBill/${bill._id}`);

            console.log("Bill Details:", response.data);

            if (response.data?.status) {
                const billData = response.data.data;

                console.log("Bill Data:", billData);
                console.log("Invoice Path:", billData?.invoicePath);

                setSelectedBill(billData);
                setPdfLink(billData?.invoicePath || null);
                setShowInvoiceModal(true);
            }
        } catch (error: any) {
            console.error("Failed to fetch bill:", error?.response?.data || error);
        } finally {
            setBillLoading(false);
        }
    };
    return (
        <>
            <div className="space-y-6">
                {/* ====================================================== */}
                {/* FILTER SECTION */}
                {/* ====================================================== */}

                <div className="rounded-3xl border border-gray-200 bg-white p-6">
                    <div className="mb-6 flex items-center gap-3">
                        <Calendar className="text-indigo-600" />

                        <h2 className="text-xl font-semibold">Search & Filters</h2>
                    </div>

                    <div className="grid grid-cols-12 gap-5">
                        {/* start date */}

                        <div className="col-span-12 md:col-span-6 xl:col-span-2">
                            <label className="mb-2 block text-sm text-gray-500">Start Date</label>

                            <input
                                type="date"
                                name="startDate"
                                value={filters.startDate}
                                onChange={handleFilterChange}
                                className="h-12 w-full rounded-2xl border border-gray-200 px-4"
                            />
                        </div>

                        {/* end date */}

                        <div className="col-span-12 md:col-span-6 xl:col-span-2">
                            <label className="mb-2 block text-sm text-gray-500">End Date</label>

                            <input
                                type="date"
                                name="endDate"
                                value={filters.endDate}
                                onChange={handleFilterChange}
                                className="h-12 w-full rounded-2xl border border-gray-200 px-4"
                            />
                        </div>

                        {/* receipt type */}

                        <div className="col-span-12 md:col-span-6 xl:col-span-2">
                            <label className="mb-2 block text-sm text-gray-500">Receipt Type</label>

                            <select
                                name="receiptType"
                                value={filters.receiptType}
                                onChange={handleFilterChange}
                                className="h-12 w-full rounded-2xl border border-gray-200 px-4"
                            >
                                {receiptTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* tax */}

                        <div className="col-span-12 md:col-span-6 xl:col-span-2">
                            <label className="mb-2 block text-sm text-gray-500">Tax Type</label>

                            <select
                                name="taxType"
                                value={filters.taxType}
                                onChange={handleFilterChange}
                                className="h-12 w-full rounded-2xl border border-gray-200 px-4"
                            >
                                {taxTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* sold by */}

                        <div className="col-span-12 md:col-span-6 xl:col-span-2">
                            <label className="mb-2 block text-sm text-gray-500">Sold By</label>

                            <select
                                name="soldBy"
                                value={filters.soldBy}
                                onChange={handleFilterChange}
                                className="h-12 w-full rounded-2xl border border-gray-200 px-4"
                            >
                                {staff.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* generated by */}

                        <div className="col-span-12 md:col-span-6 xl:col-span-2">
                            <label className="mb-2 block text-sm text-gray-500">Generated By</label>

                            <select
                                name="generatedBy"
                                value={filters.generatedBy}
                                onChange={handleFilterChange}
                                className="h-12 w-full rounded-2xl border border-gray-200 px-4"
                            >
                                {staff.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="mt-5">
                        <div className="relative">
                            <Search
                                size={18}
                                className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="text"
                                name="search"
                                value={filters.search}
                                onChange={handleFilterChange}
                                placeholder="Search bill number, member, mobile number ..."
                                className="h-14 w-full rounded-2xl border border-gray-200 pl-12"
                            />
                        </div>
                    </div>
                </div>
                {/* ====================================================== */}
                {/* STATISTICS */}
                {/* ====================================================== */}

                <div className="grid grid-cols-12 gap-6">
                    {statistics.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <div key={index} className="col-span-12 sm:col-span-6 xl:col-span-2">
                                <div className="rounded-3xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-500">{item.title}</p>

                                            <h2 className="mt-3 text-3xl font-bold text-gray-800">
                                                {item.value}
                                            </h2>
                                        </div>

                                        <div className={`rounded-2xl p-4 ${item.color}`}>
                                            <Icon size={22} className="text-gray-700" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {/* ====================================================== */}
                {/* BILLING TABLE */}
                {/* ====================================================== */}

                <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white">
                    {/* HEADER */}

                    <div className="border-b border-gray-100 p-6">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <h2 className="text-xl font-semibold">Invoice History</h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    View and manage all invoices and payments.
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <button className="rounded-2xl border border-gray-200 px-5 py-3 transition-all hover:bg-gray-50">
                                    Refresh
                                </button>

                                <button className="rounded-2xl bg-indigo-600 px-5 py-3 text-white transition-all hover:bg-indigo-700">
                                    Generate Report
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* TABLE */}

                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-50">
                                <tr className="text-left">
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                        #
                                    </th>

                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                        Bill No.
                                    </th>

                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                        Member
                                    </th>

                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                        Mobile
                                    </th>

                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                        Package
                                    </th>

                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                        Tax
                                    </th>

                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                        Amount
                                    </th>

                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                        Method
                                    </th>

                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                        Status
                                    </th>

                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                        Balance
                                    </th>

                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {billings.map((bill, index) => (
                                    <tr
                                        key={bill.id}
                                        className="border-t border-gray-100 transition-all hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-5">{index + 1}</td>

                                        <td className="px-6 py-5 font-semibold">#{bill.id}</td>

                                        <td className="px-6 py-5">{bill.member}</td>

                                        <td className="px-6 py-5">{bill.mobile}</td>

                                        <td className="px-6 py-5">{bill.package}</td>

                                        <td className="px-6 py-5">
                                            <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700">
                                                {bill.taxType}
                                            </span>
                                        </td>

                                        <td className="px-6 py-5 font-semibold">₹{bill.amount}</td>

                                        <td className="px-6 py-5">
                                            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                                                {bill.paymentMethod}
                                            </span>
                                        </td>

                                        <td className="px-6 py-5">
                                            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                                                {bill.status}
                                            </span>
                                        </td>

                                        <td className="px-6 py-5">₹{bill.balance}</td>

                                        <td className="px-6 py-5">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleViewBill(bill)}
                                                    disabled={billLoading}
                                                    className="rounded-xl border border-gray-200 px-3 py-2 text-sm transition-all hover:bg-gray-100 disabled:opacity-50"
                                                >
                                                    {billLoading ? "Loading..." : "View"}
                                                </button>

                                                <button className="rounded-xl border border-blue-200 px-3 py-2 text-sm text-blue-600 transition-all hover:bg-blue-50">
                                                    Print
                                                </button>

                                                <button className="rounded-xl border border-emerald-200 px-3 py-2 text-sm text-emerald-600 transition-all hover:bg-emerald-50">
                                                    WhatsApp
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* EMPTY STATE */}

                    {!loading && billings.length === 0 && (
                        <div className="p-16 text-center">
                            <h3 className="text-2xl font-bold text-gray-700">No invoices found</h3>

                            <p className="mt-3 text-gray-500">No billing records are available.</p>
                        </div>
                    )}
                </div>
                {/* ====================================================== */}
                {/* BILL DETAILS DRAWER */}
                {/* ====================================================== */}

                {showDrawer && (
                    <div className="fixed inset-0 z-[99999]">
                        {/* overlay */}

                        <div
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                            onClick={() => setShowDrawer(false)}
                        />

                        {/* drawer */}

                        <div className="absolute top-0 right-0 h-full w-full overflow-y-auto bg-white shadow-2xl md:w-[650px]">
                            {/* header */}

                            <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600 p-8 text-white">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-sm text-indigo-100">Invoice Number</p>

                                        <h1 className="mt-2 text-3xl font-bold">
                                            #{selectedBill?.id}
                                        </h1>
                                    </div>

                                    <button
                                        onClick={() => setShowDrawer(false)}
                                        className="rounded-full bg-white/20 p-3"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>

                            {/* body */}

                            <div className="space-y-6 p-6">
                                {/* member */}

                                <div className="rounded-3xl border border-gray-200 p-6">
                                    <h2 className="mb-5 text-xl font-semibold">
                                        Member Information
                                    </h2>

                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Member Name</p>

                                            <p className="font-semibold">{selectedBill?.member}</p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500">Mobile Number</p>

                                            <p className="font-semibold">{selectedBill?.mobile}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* package */}

                                <div className="rounded-3xl border border-gray-200 p-6">
                                    <h2 className="mb-5 text-xl font-semibold">
                                        Package Information
                                    </h2>

                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Membership Plan</p>

                                            <p className="font-semibold">{selectedBill?.package}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* payment */}

                                <div className="rounded-3xl border border-gray-200 p-6">
                                    <h2 className="mb-5 text-xl font-semibold">
                                        Payment Information
                                    </h2>

                                    <div className="grid grid-cols-2 gap-5">
                                        <div>
                                            <p className="text-sm text-gray-500">Amount</p>

                                            <p className="text-lg font-bold">
                                                ₹{selectedBill?.amount}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500">Balance</p>

                                            <p className="text-lg font-bold">
                                                ₹{selectedBill?.balance}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500">Tax Type</p>

                                            <p className="font-semibold">{selectedBill?.taxType}</p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500">Payment Method</p>

                                            <p className="font-semibold">
                                                {selectedBill?.paymentMethod}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* actions */}

                                <div className="grid grid-cols-2 gap-4">
                                    <button className="rounded-2xl border border-gray-200 py-4">
                                        Print
                                    </button>

                                    <button className="rounded-2xl border border-gray-200 py-4">
                                        Download PDF
                                    </button>

                                    <button className="rounded-2xl border border-emerald-200 py-4 text-emerald-600">
                                        Send WhatsApp
                                    </button>

                                    <button className="rounded-2xl bg-red-500 py-4 text-white">
                                        Delete Invoice
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {showInvoiceModal && selectedBill && (
                <div className="fixed inset-0 z-[99999] bg-black/60 p-4">
                    <div className="mx-auto flex h-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
                        <div className="flex items-center justify-between border-b px-5 py-4">
                            <div>
                                <h2 className="text-lg font-semibold">Invoice</h2>

                                <p className="text-sm text-gray-500">Invoice #{selectedBill._id}</p>
                            </div>

                            <button
                                onClick={() => {
                                    setShowInvoiceModal(false);
                                    setSelectedBill(null);
                                    setPdfLink(null);
                                }}
                                className="rounded-lg px-3 py-2 text-xl text-gray-500 hover:bg-gray-100"
                            >
                                ×
                            </button>
                        </div>

                        <div className="min-h-0 flex-1 bg-gray-100">
                            {pdfLink ? (
                                <iframe
                                    src={pdfLink}
                                    title="Invoice PDF"
                                    className="h-full w-full border-0"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center">
                                    <p className="text-gray-500">PDF URL not available</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default BillingCenter;
