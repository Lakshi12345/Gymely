import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";

import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";

import DatePicker from "react-datepicker";

import api from "../../services/api";
import useMemberCalculator from "../../hooks/useMemberCalculator";

import { Package, PaymentForm, MembershipForm } from "../../types/member";

interface ExistingMember {
    _id: string;
    name: string;
    mobile: string;
    email?: string;
    UID?: string;
    profile?: string;
    packageName?: string;
    activeMembership?: string;
    expiryDate?: string | null;
    due?: number;
}

type InvoiceType = "Non Tax" | "GST" | "VAT";

interface Bill {
    baseAmount: number;
    subTotal: number;
    taxAmount: number;
    grandTotal: number;
    discountBase: number;
}

export default function MemberRenew() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [member, setMember] = useState<ExistingMember | null>(null);

    const [packages, setPackages] = useState<Package[]>([]);

    const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

    const [invoiceType, setInvoiceType] = useState<InvoiceType>("Non Tax");

    const [billingSetting] = useState({
        taxPercentage: 18,
    });

    /*
    |--------------------------------------------------------------------------
    | MEMBERSHIP
    |--------------------------------------------------------------------------
    */

    const [membership, setMembership] = useState<MembershipForm>({
        enrollmentDate: new Date().toISOString().split("T")[0],

        startDate: new Date().toISOString().split("T")[0],

        expiryDate: new Date().toISOString().split("T")[0],
    });

    /*
    |--------------------------------------------------------------------------
    | PAYMENT
    |--------------------------------------------------------------------------
    */

    const [payment, setPayment] = useState<PaymentForm>({
        discount: 0,

        convenienceFee: 0,

        received: 0,

        nextPaymentDate: "",

        payments: [
            {
                method: "Cash",
                amount: 0,
                referenceNumber: "",
            },
        ],

        paymentDate: new Date().toISOString().split("T")[0],

        remark: "",

        soldBy: "",
    });

    /*
    |--------------------------------------------------------------------------
    | SAFE NUMBER
    |--------------------------------------------------------------------------
    */

    const safeNumber = (value: unknown, fallback = 0) => {
        const parsed = Number(value);

        return Number.isFinite(parsed) ? parsed : fallback;
    };

    /*
    |--------------------------------------------------------------------------
    | CURRENCY
    |--------------------------------------------------------------------------
    */

    const currency = (value: unknown) => {
        const amount = safeNumber(value);

        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);
    };

    /*
    |--------------------------------------------------------------------------
    | FETCH MEMBER
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (!id) {
            setLoading(false);
            return;
        }

        const fetchMember = async () => {
            try {
                setLoading(true);

                const response = await api.get(`/member/getMember/${id}`);

                if (response.data?.status) {
                    setMember(response.data.data);
                } else {
                    setMember(null);
                }
            } catch (error: any) {
                console.error("Failed to fetch member:", error?.response?.data || error);

                setMember(null);
            } finally {
                setLoading(false);
            }
        };

        fetchMember();
    }, [id]);

    /*
    |--------------------------------------------------------------------------
    | FETCH PACKAGES
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await api.get("/package/getallPackages");

                const data = Array.isArray(response.data?.data) ? response.data.data : [];

                setPackages(data);
            } catch (error) {
                console.error("Failed to fetch packages:", error);

                setPackages([]);
            }
        };

        fetchPackages();
    }, []);

    /*
    |--------------------------------------------------------------------------
    | PACKAGE CHANGE
    |--------------------------------------------------------------------------
    */

    const handlePackageChange = (packageId: string) => {
        const pkg = packages.find((item) => String(item._id) === String(packageId));

        if (!pkg) {
            setSelectedPackage(null);
            return;
        }

        setSelectedPackage(pkg);

        /*
         * If package already contains tax,
         * automatically select GST.
         */
        if (pkg.taxIncluded) {
            setInvoiceType("GST");
        } else {
            setInvoiceType("Non Tax");
        }
    };

    /*
    |--------------------------------------------------------------------------
    | MEMBERSHIP CHANGE
    |--------------------------------------------------------------------------
    */

    const handleMembershipChange = (field: keyof MembershipForm, value: any) => {
        setMembership((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    /*
    |--------------------------------------------------------------------------
    | PAYMENT CHANGE
    |--------------------------------------------------------------------------
    */

    const handlePaymentChange = (field: keyof PaymentForm, value: any) => {
        setPayment((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    /*
    |--------------------------------------------------------------------------
    | PACKAGE SESSION COUNT
    |--------------------------------------------------------------------------
    */

    const totalSessions = useMemo(() => {
        if (!selectedPackage?.services) {
            return 0;
        }

        return selectedPackage.services.reduce(
            (sum, service) => sum + safeNumber(service.session),
            0
        );
    }, [selectedPackage]);

    /*
    |--------------------------------------------------------------------------
    | MEMBER CALCULATOR
    |--------------------------------------------------------------------------
    */

    const calculator = useMemberCalculator({
        selectedPackage,
        payment,
        membership,
    });

    /*
    |--------------------------------------------------------------------------
    | BILL CALCULATION
    |--------------------------------------------------------------------------
    */

    const packageAmount = safeNumber(selectedPackage?.amount);

    const discount = Math.max(safeNumber(payment.discount), 0);

    const convenienceFee = Math.max(safeNumber(payment.convenienceFee), 0);

    const taxPercentage = Math.max(safeNumber(billingSetting.taxPercentage), 0);

    /*
    |--------------------------------------------------------------------------
    | DISCOUNTED AMOUNT
    |--------------------------------------------------------------------------
    */

    const discountedAmount = Math.max(packageAmount - discount, 0);

    /*
    |--------------------------------------------------------------------------
    | TAX
    |--------------------------------------------------------------------------
    */

    let baseAmount = discountedAmount;

    let subTotal = discountedAmount;

    let taxAmount = 0;

    if (invoiceType === "Non Tax") {
        baseAmount = discountedAmount;

        subTotal = discountedAmount;

        taxAmount = 0;
    } else if (selectedPackage?.taxIncluded) {
        baseAmount = discountedAmount / (1 + taxPercentage / 100);

        taxAmount = discountedAmount - baseAmount;

        subTotal = discountedAmount;
    } else {
        baseAmount = discountedAmount;

        taxAmount = discountedAmount * (taxPercentage / 100);

        subTotal = discountedAmount;
    }

    /*
    |--------------------------------------------------------------------------
    | GRAND TOTAL
    |--------------------------------------------------------------------------
    */

    const calculatedGrandTotal =
        invoiceType !== "Non Tax" && !selectedPackage?.taxIncluded
            ? baseAmount + taxAmount + convenienceFee
            : subTotal + convenienceFee;

    /*
    |--------------------------------------------------------------------------
    | FINAL BILL
    |--------------------------------------------------------------------------
    */

    const bill: Bill = {
        baseAmount: Number(safeNumber(baseAmount).toFixed(2)),

        subTotal: Number(safeNumber(subTotal).toFixed(2)),

        taxAmount: Number(safeNumber(taxAmount).toFixed(2)),

        grandTotal: Number(safeNumber(calculatedGrandTotal).toFixed(2)),

        discountBase: Number(safeNumber(discount).toFixed(2)),
    };

    /*
    |--------------------------------------------------------------------------
    | RECEIVED
    |--------------------------------------------------------------------------
    */

    const received = useMemo(() => {
        if (!Array.isArray(payment.payments)) {
            return 0;
        }

        return payment.payments.reduce((sum, item) => sum + safeNumber(item?.amount), 0);
    }, [payment.payments]);

    /*
    |--------------------------------------------------------------------------
    | PENDING
    |--------------------------------------------------------------------------
    */

    const pending = Math.max(bill.grandTotal - received, 0);

    /*
    |--------------------------------------------------------------------------
    | STATUS
    |--------------------------------------------------------------------------
    */

    const paymentStatus =
        pending <= 0 && bill.grandTotal > 0 ? "Paid" : received > 0 ? "Partial" : "Unpaid";

    /*
    |--------------------------------------------------------------------------
    | STATUS COLOR
    |--------------------------------------------------------------------------
    */

    const statusColor =
        paymentStatus === "Paid"
            ? "bg-green-100 text-green-700"
            : paymentStatus === "Partial"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700";

    /*
    |--------------------------------------------------------------------------
    | PAYMENT METHODS
    |--------------------------------------------------------------------------
    */

    const updatePayment = (index: number, field: string, value: any) => {
        const current = Array.isArray(payment.payments) ? payment.payments : [];

        const payments = current.map((item, i) =>
            i === index
                ? {
                      ...item,
                      [field]: field === "amount" ? safeNumber(value) : value,
                  }
                : item
        );

        handlePaymentChange("payments", payments);
    };

    const addPayment = () => {
        const current = Array.isArray(payment.payments) ? payment.payments : [];

        handlePaymentChange("payments", [
            ...current,
            {
                method: "Cash",
                amount: 0,
                referenceNumber: "",
            },
        ]);
    };

    const removePayment = (index: number) => {
        const current = Array.isArray(payment.payments) ? payment.payments : [];

        if (current.length <= 1) {
            return;
        }

        handlePaymentChange(
            "payments",
            current.filter((_, i) => i !== index)
        );
    };

    /*
    |--------------------------------------------------------------------------
    | RENEW
    |--------------------------------------------------------------------------
    */

    const handleRenew = async () => {
        if (!member) {
            alert("Member not found");
            return;
        }

        if (!selectedPackage) {
            alert("Please select a package");
            return;
        }

        if (bill.grandTotal <= 0) {
            alert("Invalid package amount");
            return;
        }

        if (received <= 0) {
            alert("Please enter received payment");
            return;
        }

        try {
            setSaving(true);

            const payload = {
                memberId: member._id,

                member: {
                    name: member.name,

                    mobile: member.mobile,

                    email: member.email || "",
                },

                package: selectedPackage,

                membership: {
                    ...membership,

                    expiryDate: calculator.expiryDate,
                },

                payment: {
                    ...payment,

                    received,

                    // Explicitly send the staff/user who sold this renewal
                    soldBy: payment.soldBy || "",

                    tax: {
                        invoiceType,

                        taxPercentage,

                        taxIncluded: Boolean(selectedPackage.taxIncluded),

                        baseAmount: bill.baseAmount,

                        subTotal: bill.subTotal,

                        taxAmount: bill.taxAmount,

                        grandTotal: bill.grandTotal,
                    },
                },
            };

            console.log("RENEW PAYLOAD:", payload);

            const response = await api.post("/member/renewMember", payload);

            if (response.data?.status) {
                const billId = response.data?.transaction?._id;
                if (billId) {
                    navigate(`/dashboard/invoicelist/viewbill/${billId}`);
                } else {
                    navigate("/dashboard/invoicelist");
                }

                return;
            }

            alert(response.data?.error || "Membership renewal failed");
        } catch (error: any) {
            console.error("Renew failed:", error?.response?.data || error);

            alert(error?.response?.data?.error || "Failed to renew membership");
        } finally {
            setSaving(false);
        }
    };

    const [staffOptions, setStaffOptions] = useState<any[]>([]);

    const loadStaffRoles = async () => {
        try {
            const response = await api.get("/staff/getStaff");
            if (response.data?.status) {
                console.log("STAFF:", response.data);

                setStaffOptions(response.data.data || []);
            }
        } catch (error: any) {
            console.error("Failed to load staff roles:", error);
        }
    };

    useEffect(() => {
        loadStaffRoles();
    }, []);

    /*
    |--------------------------------------------------------------------------
    | LOADING
    |--------------------------------------------------------------------------
    */

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

                    <p className="mt-3 text-sm text-gray-500">Loading member...</p>
                </div>
            </div>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | ERROR
    |--------------------------------------------------------------------------
    */

    if (!member) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="text-center">
                    <p className="font-semibold text-red-500">Member not found</p>

                    <button
                        type="button"
                        onClick={() => navigate("/members")}
                        className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
                    >
                        Back to Members
                    </button>
                </div>
            </div>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | PAGE
    |--------------------------------------------------------------------------
    */

    return (
        <>
            <PageBreadcrumb pageTitle="Renew Membership" />

            <div className="space-y-6">
                <div className="grid grid-cols-12 gap-6">
                    {/* =====================================================
                        LEFT SIDE
                    ====================================================== */}

                    <div className="col-span-12 space-y-6 xl:col-span-8">
                        {/* =================================================
                            MEMBER
                        ================================================== */}

                        <ComponentCard title="Member">
                            <div className="flex items-center gap-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                                    {member.name?.charAt(0)?.toUpperCase()}
                                </div>

                                <div>
                                    <h2 className="text-lg font-bold">{member.name}</h2>

                                    <p className="text-sm text-gray-500">{member.mobile}</p>

                                    {member.email && (
                                        <p className="text-sm text-gray-500">{member.email}</p>
                                    )}
                                </div>

                                <div className="ml-auto rounded-xl bg-blue-50 px-4 py-3 text-right">
                                    <p className="text-xs text-gray-500">Current Package</p>

                                    <p className="mt-1 font-semibold text-blue-600">
                                        {member.activeMembership ||
                                            member.packageName ||
                                            "No Package"}
                                    </p>

                                    {member.expiryDate && (
                                        <p className="mt-1 text-xs text-gray-500">
                                            Expiry: {member.expiryDate}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </ComponentCard>

                        {/* =================================================
                            PACKAGE
                        ================================================== */}

                        <ComponentCard title="Renew Membership">
                            <div className="space-y-6">
                                <div>
                                    <Label>Select Package</Label>

                                    <select
                                        value={selectedPackage?._id || ""}
                                        onChange={(e) => handlePackageChange(e.target.value)}
                                        className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    >
                                        <option value="">Select Package</option>

                                        {packages.map((pkg) => (
                                            <option key={pkg._id} value={pkg._id}>
                                                {pkg.packageName}

                                                {pkg.duration
                                                    ? ` - ${pkg.duration} ${pkg.durationType || "Days"}`
                                                    : ""}

                                                {pkg.amount !== undefined
                                                    ? ` - ${currency(pkg.amount)}`
                                                    : ""}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {selectedPackage && (
                                    <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-500">
                                                    Membership Plan
                                                </p>

                                                <h2 className="mt-1 text-2xl font-bold">
                                                    {selectedPackage.packageName}
                                                </h2>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-sm text-gray-500">Duration</p>

                                                <h2 className="mt-1 text-xl font-bold text-blue-600">
                                                    {selectedPackage.duration}{" "}
                                                    {selectedPackage.durationType || "Days"}
                                                </h2>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* =================================================
                                    DATES + GROUP
                                ================================================== */}

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <Label>Enrollment/Renew Date</Label>

                                        <DatePicker
                                            selected={
                                                membership.enrollmentDate
                                                    ? new Date(membership.enrollmentDate)
                                                    : null
                                            }
                                            onChange={(date) =>
                                                handleMembershipChange(
                                                    "enrollmentDate",
                                                    date ? date.toISOString().split("T")[0] : ""
                                                )
                                            }
                                            dateFormat="dd/MM/yyyy"
                                            className="h-11 w-full rounded-lg border px-3"
                                            wrapperClassName="w-full"
                                            popperClassName="z-[9999]"
                                        />
                                    </div>

                                    <div>
                                        <Label>Start Date</Label>

                                        <DatePicker
                                            selected={
                                                membership.startDate
                                                    ? new Date(membership.startDate)
                                                    : null
                                            }
                                            onChange={(date) =>
                                                handleMembershipChange(
                                                    "startDate",
                                                    date ? date.toISOString().split("T")[0] : ""
                                                )
                                            }
                                            dateFormat="dd/MM/yyyy"
                                            className="h-11 w-full rounded-lg border px-3"
                                            wrapperClassName="w-full"
                                        />
                                    </div>

                                    <div>
                                        <Label>Expiry Date</Label>

                                        <DatePicker
                                            selected={
                                                membership.expiryDate
                                                    ? new Date(membership.expiryDate)
                                                    : null
                                            }
                                            onChange={(date) =>
                                                handleMembershipChange(
                                                    "expiryDate",
                                                    date ? date.toISOString().split("T")[0] : ""
                                                )
                                            }
                                            dateFormat="dd/MM/yyyy"
                                            className="h-11 w-full rounded-lg border px-3"
                                            wrapperClassName="w-full"
                                        />
                                    </div>
                                </div>

                                {/* =================================================
                                    PACKAGE SUMMARY
                                ================================================== */}

                                <div className="rounded-xl bg-gray-50 p-5">
                                    <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase">
                                                Package
                                            </p>

                                            <h3 className="mt-2 font-semibold">
                                                {selectedPackage?.packageName || "-"}
                                            </h3>
                                        </div>

                                        <div>
                                            <p className="text-xs text-gray-500 uppercase">
                                                Sessions
                                            </p>

                                            <h3 className="mt-2 font-semibold">{totalSessions}</h3>
                                        </div>

                                        <div>
                                            <p className="text-xs text-gray-500 uppercase">
                                                Activation
                                            </p>

                                            <h3 className="mt-2 font-semibold text-green-600">
                                                Instant
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ComponentCard>

                        {/* =================================================
                            BILLING
                        ================================================== */}

                        <ComponentCard title="Billing">
                            <div className="space-y-8">
                                {/* GRAND TOTAL */}

                                <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-500">Grand Total</p>

                                            <h2 className="mt-2 text-4xl font-bold text-blue-600">
                                                {currency(bill.grandTotal)}
                                            </h2>

                                            {invoiceType !== "Non Tax" && (
                                                <p className="mt-2 text-sm text-gray-500">
                                                    {invoiceType} ({taxPercentage}
                                                    %)
                                                </p>
                                            )}
                                        </div>

                                        <div className="text-right">
                                            <p className="text-sm text-gray-500">Payment Status</p>

                                            <span
                                                className={`mt-3 inline-flex rounded-full px-4 py-2 text-sm font-semibold ${statusColor}`}
                                            >
                                                {paymentStatus}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* BILL SETTINGS */}

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <Label>Discount (₹)</Label>

                                        <Input
                                            type="number"
                                            min="0"
                                            value={discount}
                                            onChange={(e) =>
                                                handlePaymentChange(
                                                    "discount",
                                                    safeNumber(e.target.value)
                                                )
                                            }
                                        />
                                    </div>

                                    <div>
                                        <Label>Convenience Fee (₹)</Label>

                                        <Input
                                            type="number"
                                            min="0"
                                            value={convenienceFee}
                                            onChange={(e) =>
                                                handlePaymentChange(
                                                    "convenienceFee",
                                                    safeNumber(e.target.value)
                                                )
                                            }
                                        />
                                    </div>

                                    <div>
                                        <Label>Invoice Type</Label>

                                        <select
                                            value={invoiceType}
                                            onChange={(e) =>
                                                setInvoiceType(e.target.value as InvoiceType)
                                            }
                                            className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        >
                                            <option value="Non Tax">Non Tax Invoice</option>

                                            <option value="GST">GST Invoice</option>

                                            <option value="VAT">VAT Invoice</option>
                                        </select>
                                    </div>
                                </div>

                                {/* BILL SUMMARY */}

                                <div className="rounded-xl bg-gray-50 p-5">
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span>Package Amount</span>

                                            <strong>{currency(packageAmount)}</strong>
                                        </div>

                                        <div className="flex justify-between">
                                            <span>Discount</span>

                                            <strong className="text-red-500">
                                                - {currency(discount)}
                                            </strong>
                                        </div>

                                        {invoiceType !== "Non Tax" &&
                                            selectedPackage?.taxIncluded && (
                                                <div className="flex justify-between">
                                                    <span>Discount (Excl. Tax)</span>

                                                    <strong className="text-red-500">
                                                        - {currency(bill.discountBase)}
                                                    </strong>
                                                </div>
                                            )}

                                        <div className="flex justify-between">
                                            <span>Taxable Amount</span>

                                            <strong>{currency(bill.subTotal)}</strong>
                                        </div>

                                        <div className="flex justify-between">
                                            <span>Base Amount</span>

                                            <strong>{currency(bill.baseAmount)}</strong>
                                        </div>

                                        {invoiceType !== "Non Tax" && (
                                            <div className="flex justify-between">
                                                <span>
                                                    {invoiceType} ({taxPercentage}
                                                    %)
                                                </span>

                                                <strong className="text-green-600">
                                                    {currency(bill.taxAmount)}
                                                </strong>
                                            </div>
                                        )}

                                        <div className="flex justify-between">
                                            <span>Convenience Fee</span>

                                            <strong>{currency(convenienceFee)}</strong>
                                        </div>

                                        <div className="flex justify-between border-t pt-4 text-xl font-bold">
                                            <span>Grand Total</span>

                                            <span className="text-blue-600">
                                                {currency(bill.grandTotal)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* PAYMENT DETAILS */}

                                <div>
                                    <Label>Payment Details</Label>

                                    <div className="mt-4 space-y-4">
                                        {payment.payments.map((item, index) => (
                                            <div
                                                key={index}
                                                className="rounded-xl border border-gray-200 p-5"
                                            >
                                                <div className="mb-4 flex items-center justify-between">
                                                    <h4 className="font-semibold">
                                                        Payment #{index + 1}
                                                    </h4>

                                                    {payment.payments.length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => removePayment(index)}
                                                            className="rounded-lg bg-red-100 px-3 py-1 text-sm font-medium text-red-600"
                                                        >
                                                            Remove
                                                        </button>
                                                    )}
                                                </div>

                                                <div className="grid grid-cols-12 gap-4">
                                                    <div className="col-span-12 md:col-span-3">
                                                        <Label>Method</Label>

                                                        <select
                                                            value={item.method || "Cash"}
                                                            onChange={(e) =>
                                                                updatePayment(
                                                                    index,
                                                                    "method",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="h-11 w-full rounded-lg border px-3"
                                                        >
                                                            <option value="Cash">Cash</option>

                                                            <option value="Card">Card</option>

                                                            <option value="UPI">UPI</option>

                                                            <option value="Online">Online</option>

                                                            <option value="Cheque">Cheque</option>
                                                        </select>
                                                    </div>

                                                    <div className="col-span-12 md:col-span-3">
                                                        <Label>Amount</Label>

                                                        <Input
                                                            type="number"
                                                            min="0"
                                                            value={safeNumber(item.amount)}
                                                            onChange={(e) =>
                                                                updatePayment(
                                                                    index,
                                                                    "amount",
                                                                    e.target.value
                                                                )
                                                            }
                                                        />
                                                    </div>

                                                    <div className="col-span-12 md:col-span-6">
                                                        <Label>Reference / UTR / Cheque No.</Label>

                                                        <Input
                                                            value={item.referenceNumber || ""}
                                                            placeholder="Optional"
                                                            onChange={(e) =>
                                                                updatePayment(
                                                                    index,
                                                                    "referenceNumber",
                                                                    e.target.value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        <button
                                            type="button"
                                            onClick={addPayment}
                                            className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
                                        >
                                            + Add Payment Method
                                        </button>
                                    </div>
                                </div>

                                {/* DATES */}

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <Label>Payment Date</Label>

                                        <DatePicker
                                            selected={
                                                payment.paymentDate
                                                    ? new Date(payment.paymentDate)
                                                    : null
                                            }
                                            onChange={(date) =>
                                                handlePaymentChange(
                                                    "paymentDate",
                                                    date ? date.toISOString().split("T")[0] : ""
                                                )
                                            }
                                            dateFormat="dd/MM/yyyy"
                                            className="h-11 w-full rounded-lg border px-3"
                                            wrapperClassName="w-full"
                                            popperClassName="z-[9999]"
                                        />
                                    </div>

                                    {pending > 0 && (
                                        <div>
                                            <Label>Next Payment Date</Label>

                                            <DatePicker
                                                selected={
                                                    payment.nextPaymentDate
                                                        ? new Date(payment.nextPaymentDate)
                                                        : null
                                                }
                                                onChange={(date) =>
                                                    handlePaymentChange(
                                                        "nextPaymentDate",
                                                        date ? date.toISOString().split("T")[0] : ""
                                                    )
                                                }
                                                dateFormat="dd/MM/yyyy"
                                                className="h-11 w-full rounded-lg border px-3"
                                                wrapperClassName="w-full"
                                                minDate={new Date()}
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* REMARK */}

                                <div>
                                    <Label>Remark</Label>

                                    <textarea
                                        rows={3}
                                        value={payment.remark || ""}
                                        onChange={(e) =>
                                            handlePaymentChange("remark", e.target.value)
                                        }
                                        placeholder="Payment remark..."
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
                                    />
                                </div>

                                {/* PAYMENT SUMMARY */}

                                <div className="rounded-xl border border-green-200 bg-green-50 p-5">
                                    <div className="grid grid-cols-2 gap-5 md:grid-cols-5">
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase">
                                                Base Amount
                                            </p>

                                            <h3 className="mt-2 font-bold">
                                                {currency(bill.baseAmount)}
                                            </h3>
                                        </div>

                                        <div>
                                            <p className="text-xs text-gray-500 uppercase">Tax</p>

                                            <h3 className="mt-2 font-bold text-blue-600">
                                                {currency(bill.taxAmount)}
                                            </h3>
                                        </div>

                                        <div>
                                            <p className="text-xs text-gray-500 uppercase">
                                                Received
                                            </p>

                                            <h3 className="mt-2 font-bold text-green-600">
                                                {currency(received)}
                                            </h3>
                                        </div>

                                        <div>
                                            <p className="text-xs text-gray-500 uppercase">
                                                Pending
                                            </p>

                                            <h3 className="mt-2 font-bold text-red-500">
                                                {currency(pending)}
                                            </h3>
                                        </div>

                                        <div>
                                            <p className="text-xs text-gray-500 uppercase">
                                                Status
                                            </p>

                                            <span
                                                className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusColor}`}
                                            >
                                                {paymentStatus}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* SOLD BY */}

                                <div className="lg:col-span-2">
                                    <Label>Sold By</Label>
                                    <select
                                        value={payment.soldBy}
                                        onChange={(e) =>
                                            handlePaymentChange("soldBy", e.target.value)
                                        }
                                        className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                    >
                                        <option value="">Select Staff</option>

                                        {staffOptions.map((role) => (
                                            <option key={role._id} value={role.name}>
                                                {role.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </ComponentCard>

                        {/* =================================================
                            ACTIONS
                        ================================================== */}

                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                disabled={saving}
                                onClick={() => navigate("/members")}
                                className="rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                disabled={
                                    saving ||
                                    !selectedPackage ||
                                    bill.grandTotal <= 0 ||
                                    received <= 0
                                }
                                onClick={handleRenew}
                                className="rounded-xl bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {saving ? "Renewing..." : "Renew Membership"}
                            </button>
                        </div>
                    </div>

                    {/* =====================================================
                        RIGHT SUMMARY
                    ====================================================== */}

                    <div className="col-span-12 xl:col-span-4">
                        <div className="sticky top-6">
                            <ComponentCard title="Renewal Summary">
                                <div className="space-y-6">
                                    {/* MEMBER */}

                                    <div className="rounded-xl bg-blue-50 p-5">
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                                                {member.name?.charAt(0)?.toUpperCase()}
                                            </div>

                                            <div>
                                                <h2 className="font-semibold">{member.name}</h2>

                                                <p className="text-sm text-gray-500">
                                                    {member.mobile}
                                                </p>

                                                <p className="text-sm text-gray-500">
                                                    {member.email || "No Email"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* MEMBERSHIP */}

                                    <div className="rounded-xl border p-5">
                                        <h3 className="mb-4 font-semibold">Membership</h3>

                                        <div className="space-y-3 text-sm">
                                            <div className="flex justify-between gap-4">
                                                <span>Package</span>

                                                <strong>
                                                    {selectedPackage?.packageName || "-"}
                                                </strong>
                                            </div>

                                            <div className="flex justify-between">
                                                <span>Duration</span>

                                                <strong>
                                                    {selectedPackage
                                                        ? `${selectedPackage.duration} ${selectedPackage.durationType || "Days"}`
                                                        : "-"}
                                                </strong>
                                            </div>

                                            <div className="flex justify-between">
                                                <span>Start</span>

                                                <strong>{membership.startDate}</strong>
                                            </div>

                                            <div className="flex justify-between">
                                                <span>Expiry</span>

                                                <strong>{calculator.expiryDate}</strong>
                                            </div>

                                            <div className="flex justify-between">
                                                <span>Sessions</span>

                                                <strong>{totalSessions}</strong>
                                            </div>
                                        </div>
                                    </div>

                                    {/* BILLING */}

                                    <div className="rounded-xl border p-5">
                                        <h3 className="mb-4 font-semibold">Billing</h3>

                                        <div className="space-y-3 text-sm">
                                            <div className="flex justify-between">
                                                <span>Package Amount</span>

                                                <strong>{currency(packageAmount)}</strong>
                                            </div>

                                            <div className="flex justify-between">
                                                <span>Discount</span>

                                                <strong className="text-red-500">
                                                    - {currency(discount)}
                                                </strong>
                                            </div>

                                            <div className="flex justify-between">
                                                <span>Taxable Amount</span>

                                                <strong>{currency(bill.subTotal)}</strong>
                                            </div>

                                            <div className="flex justify-between">
                                                <span>Base Amount</span>

                                                <strong>{currency(bill.baseAmount)}</strong>
                                            </div>

                                            {invoiceType !== "Non Tax" && (
                                                <div className="flex justify-between">
                                                    <span>
                                                        {invoiceType} ({taxPercentage}
                                                        %)
                                                    </span>

                                                    <strong className="text-green-600">
                                                        {currency(bill.taxAmount)}
                                                    </strong>
                                                </div>
                                            )}

                                            <div className="flex justify-between">
                                                <span>Convenience</span>

                                                <strong>{currency(convenienceFee)}</strong>
                                            </div>

                                            <div className="flex justify-between border-t pt-4 text-lg font-bold">
                                                <span>Grand Total</span>

                                                <span className="text-blue-600">
                                                    {currency(bill.grandTotal)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* PAYMENTS */}

                                    <div className="rounded-xl border p-5">
                                        <h3 className="mb-4 font-semibold">Payments</h3>

                                        <div className="space-y-3">
                                            {payment.payments.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2"
                                                >
                                                    <div>
                                                        <p className="font-medium">{item.method}</p>

                                                        {item.referenceNumber && (
                                                            <p className="text-xs text-gray-500">
                                                                {item.referenceNumber}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <strong>{currency(item.amount)}</strong>
                                                </div>
                                            ))}

                                            <div className="space-y-2 border-t pt-4">
                                                <div className="flex justify-between">
                                                    <span>Received</span>

                                                    <strong className="text-green-600">
                                                        {currency(received)}
                                                    </strong>
                                                </div>

                                                <div className="flex justify-between">
                                                    <span>Pending</span>

                                                    <strong className="text-red-500">
                                                        {currency(pending)}
                                                    </strong>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <span>Status</span>

                                                    <span
                                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor}`}
                                                    >
                                                        {paymentStatus}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ComponentCard>
                        </div>
                    </div>
                </div>
            </div>

            {/* =============================================================
                SAVING
            ============================================================= */}

            {saving && (
                <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl">
                        <div className="mb-6 flex justify-center">
                            <div className="h-14 w-14 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
                        </div>

                        <h3 className="text-center text-lg font-bold">Renewing Membership</h3>

                        <p className="mt-2 text-center text-sm text-gray-500">
                            Please wait while we activate the membership and generate the invoice.
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
