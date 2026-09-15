import { useEffect, useMemo, useState } from "react";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import { AdvancedForm, Package, PaymentForm } from "../../types/member";
import Select from "../form/Select.tsx";
import DatePicker from "react-datepicker";
import api from "../../services/api.ts";

interface Bill {
    baseAmount: number;
    subTotal: number;
    taxAmount: number;
    grandTotal: number;
}

interface BillingSetting {
    taxPercentage: number;
}

interface BillingCardProps {
    selectedPackage: Package | null;

    payment: PaymentForm;

    bill: Bill;

    invoiceType: "Non Tax" | "GST" | "VAT";

    billingSetting: {
        taxPercentage: number;
    };

    onChange: (field: keyof PaymentForm, value: any) => void;
}
export default function BillingCard({
    selectedPackage,
    payment,
    bill,
    invoiceType,
    billingSetting,
    onChange,
    onInvoiceTypeChange,
}: BillingCardProps) {
    // console.log(bill);
    const received = useMemo(() => {
        return payment.payments.reduce((sum, item) => sum + Number(item.amount || 0), 0);
    }, [payment.payments]);

    const pending = Math.max(bill.grandTotal - received, 0);

    const status = pending <= 0 ? "Paid" : received > 0 ? "Partial" : "Unpaid";

    const currency = (value: number) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 2,
        }).format(value);

    const updatePayment = (index: number, field: string, value: any) => {
        const payments = payment.payments.map((item, i) =>
            i === index
                ? {
                      ...item,
                      [field]: value,
                  }
                : item
        );

        onChange("payments", payments);
    };

    const removePayment = (index: number) => {
        const payments = payment.payments.filter((_, i) => i !== index);

        onChange("payments", payments);
    };

    const addPayment = () => {
        onChange("payments", [
            ...payment.payments,
            {
                method: "Cash",
                amount: 0,
                referenceNumber: "",
            },
        ]);
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

    return (
        <ComponentCard title="Billing">
            <div className="space-y-8">
                <div className="border-brand-200 bg-brand-50 dark:border-brand-900 dark:bg-brand-950/20 rounded-xl border p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Grand Total</p>

                            <h2 className="text-brand-600 mt-2 text-4xl font-bold">
                                {currency(bill.grandTotal)}
                            </h2>

                            {invoiceType !== "Non Tax" && (
                                <p className="mt-2 text-sm text-gray-500">
                                    {invoiceType} ({billingSetting.taxPercentage}
                                    %)
                                </p>
                            )}
                        </div>

                        <div className="text-right">
                            <p className="text-sm text-gray-500">Payment Status</p>

                            <span
                                className={`mt-3 inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                                    status === "Paid"
                                        ? "bg-green-100 text-green-700"
                                        : status === "Partial"
                                          ? "bg-yellow-100 text-yellow-700"
                                          : "bg-red-100 text-red-700"
                                }`}
                            >
                                {status}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div>
                        <Label>Convenience Fee (₹)</Label>

                        <Input
                            type="number"
                            value={payment.convenienceFee}
                            placeholder="0"
                            onChange={(e) => onChange("convenienceFee", Number(e.target.value))}
                        />
                    </div>
                    <div>
                        <Label>Discount (₹)</Label>

                        <Input
                            type="number"
                            value={payment.discount}
                            placeholder="0"
                            onChange={(e) => onChange("discount", Number(e.target.value))}
                        />
                    </div>
                    <div>
                        <Label>Invoice Type</Label>

                        <select
                            className="h-11 w-full rounded-lg border px-3"
                            value={invoiceType}
                            onChange={(e) =>
                                onInvoiceTypeChange(e.target.value as "Non Tax" | "GST" | "VAT")
                            }
                        >
                            <option value="Non Tax">Non Tax Invoice</option>

                            <option value="GST">GST Invoice</option>

                            <option value="VAT">VAT Invoice</option>
                        </select>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="rounded-xl bg-gray-50 p-5 dark:bg-gray-800">
                            <div className="flex justify-between">
                                <span>Package Amount</span>

                                <strong>{currency(selectedPackage?.amount || 0)}</strong>
                            </div>

                            <div className="mt-3 flex justify-between">
                                <span>Discount</span>

                                <strong className="text-red-500">
                                    - {currency(payment.discount)}
                                </strong>
                            </div>

                            {invoiceType !== "Non Tax" && selectedPackage?.taxIncluded && (
                                <div className="mt-3 flex justify-between">
                                    <span>Discount (Excl. Tax)</span>

                                    <strong className="text-red-500">
                                        - {currency(bill.discountBase)}
                                    </strong>
                                </div>
                            )}
                            <div className="mt-3 flex justify-between">
                                <span>Taxable Amount</span>

                                <strong>{currency(bill.subTotal)}</strong>
                            </div>
                            <div className="mt-3 flex justify-between">
                                <p className="text-xs text-gray-500 uppercase">Base Amount</p>

                                <h3 className="mt-2 text-lg font-bold">
                                    {currency(bill.baseAmount)}
                                </h3>
                            </div>

                            {invoiceType !== "Non Tax" && (
                                <div className="mt-3 flex justify-between">
                                    <span>
                                        {invoiceType} ({billingSetting.taxPercentage}
                                        %)
                                    </span>

                                    <strong className="text-green-600">
                                        {currency(bill.taxAmount)}
                                    </strong>
                                </div>
                            )}

                            <div className="mt-3 flex justify-between">
                                <span>Convenience Fee</span>

                                <strong>{currency(payment.convenienceFee)}</strong>
                            </div>

                            <div className="mt-5 border-t pt-5">
                                <div className="flex justify-between text-xl font-bold">
                                    <span>Grand Total</span>

                                    <span className="text-brand-600">
                                        {currency(bill.grandTotal)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <Label>Payment Details</Label>

                        <div className="mt-4 space-y-4">
                            {payment.payments.map((item, index) => (
                                <div key={index} className="rounded-xl border border-gray-200 p-5">
                                    <div className="mb-4 flex items-center justify-between">
                                        <h4 className="font-semibold">Payment #{index + 1}</h4>

                                        {payment.payments.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removePayment(index)}
                                                className="rounded-lg bg-red-100 px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-200"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-12 gap-4">
                                        <div className="col-span-12 md:col-span-3">
                                            <Label>Method</Label>

                                            <select
                                                className="h-11 w-full rounded-lg border px-3"
                                                value={item.method}
                                                onChange={(e) =>
                                                    updatePayment(index, "method", e.target.value)
                                                }
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
                                                placeholder="0"
                                                value={item.amount}
                                                onChange={(e) =>
                                                    updatePayment(
                                                        index,
                                                        "amount",
                                                        Number(e.target.value)
                                                    )
                                                }
                                            />
                                        </div>

                                        <div className="col-span-12 md:col-span-6">
                                            <Label>Reference / UTR / Cheque No.</Label>

                                            <Input
                                                placeholder="Optional"
                                                value={item.referenceNumber}
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
                                className="bg-brand-600 hover:bg-brand-700 rounded-lg px-5 py-3 font-medium text-white transition"
                            >
                                + Add Payment Method
                            </button>
                        </div>
                    </div>

                    <div>
                        <Label>Payment Date</Label>

                        <DatePicker
                            selected={payment.paymentDate ? new Date(payment.paymentDate) : null}
                            onChange={(date: any) =>
                                onChange(
                                    "paymentDate",
                                    date ? date.toISOString().split("T")[0] : ""
                                )
                            }
                            dateFormat="dd/MM/yyyy"
                            className="h-11 w-full rounded-lg border px-3"
                            popperClassName="z-[9999]"
                            wrapperClassName="w-full"
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
                                onChange={(date: any) =>
                                    onChange(
                                        "nextPaymentDate",
                                        date ? date.toISOString().split("T")[0] : ""
                                    )
                                }
                                dateFormat="dd/MM/yyyy"
                                className="h-11 w-full rounded-lg border px-3"
                                popperClassName="z-[9999]"
                                wrapperClassName="w-full"
                                minDate={new Date()}
                            />
                        </div>
                    )}

                    <div className="lg:col-span-2">
                        <Label>Remark</Label>

                        <textarea
                            rows={2}
                            value={payment.remark}
                            onChange={(e) => onChange("remark", e.target.value)}
                            placeholder="Payment remark..."
                            className="focus:border-brand-500 focus:ring-brand-200 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm transition outline-none focus:ring-2 dark:border-gray-700 dark:bg-gray-900"
                        />
                    </div>

                    <div className="lg:col-span-2">
                        <div className="rounded-xl border border-green-200 bg-green-50 p-5 dark:border-green-900 dark:bg-green-950/20">
                            <div className="grid grid-cols-2 gap-5 lg:grid-cols-5">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase">Base Amount</p>

                                    <h3 className="mt-2 text-lg font-bold">
                                        {currency(bill.baseAmount)}
                                    </h3>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500 uppercase">Tax</p>

                                    <h3 className="mt-2 text-lg font-bold text-blue-600">
                                        {currency(bill.taxAmount)}
                                    </h3>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500 uppercase">Received</p>

                                    <h3 className="mt-2 text-lg font-bold text-green-600">
                                        {currency(received)}
                                    </h3>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500 uppercase">Pending</p>

                                    <h3 className="mt-2 text-lg font-bold text-red-500">
                                        {currency(pending)}
                                    </h3>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500 uppercase">Status</p>

                                    <span
                                        className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                                            status === "Paid"
                                                ? "bg-green-100 text-green-700"
                                                : status === "Partial"
                                                  ? "bg-yellow-100 text-yellow-700"
                                                  : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <Label>Sold By</Label>
                        <select
                            value={payment.soldBy}
                            onChange={(e) => onChange("soldBy", e.target.value)}
                            className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                        >
                            <option value="">Select Staff Role</option>

                            {staffOptions.map((role) => (
                                <option key={role._id} value={role.name}>
                                    {role.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </ComponentCard>
    );
}
