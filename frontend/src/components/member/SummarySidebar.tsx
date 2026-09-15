import ComponentCard from "../common/ComponentCard";
import {
    UserIcon,
    PhoneIcon,
    EnvelopeIcon,
    CreditCardIcon,
    CalendarDaysIcon,
} from "@heroicons/react/24/outline";

import { formatDisplayDate } from "../../utils/date";

import { AdvancedForm, MemberForm, MembershipForm, Package, PaymentForm } from "../../types/member";
interface SummarySidebarProps {
    member: MemberForm;
    selectedPackage: Package | null;
    payment: PaymentForm;
    membership: MembershipForm;
    invoiceType: "Non Tax" | "GST" | "VAT";
    bill: {
        baseAmount: number;
        subTotal: number;
        taxAmount: number;
        grandTotal: number;
    };
    billingSetting: {
        taxPercentage: number;
    };
}
export default function SummarySidebar({
    member,
    selectedPackage,
    payment,
    membership,
    invoiceType,
    bill,
    billingSetting,
}: SummarySidebarProps) {
    const received = payment.payments.reduce((sum, item) => sum + Number(item.amount || 0), 0);

    const pending = Math.max(bill.grandTotal - received, 0);

    const status = pending <= 0 ? "Paid" : received > 0 ? "Partial" : "Unpaid";

    const statusColor =
        status === "Paid"
            ? "bg-green-100 text-green-700"
            : status === "Partial"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700";

    const currency = (value: number) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 2,
        }).format(value);
    return (
        <div className="sticky top-6">
            <ComponentCard title="Enrollment Summary">
                <div className="space-y-6">
                    {/* Member */}

                    <div className="bg-brand-50 dark:bg-brand-900/20 rounded-xl p-5">
                        <div className="flex items-center gap-4">
                            <div className="bg-brand-600 flex h-14 w-14 items-center justify-center rounded-full text-white">
                                <UserIcon className="h-7 w-7" />
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold">
                                    {member.name || "New Member"}
                                </h2>

                                <p className="text-sm text-gray-500">
                                    {member.mobile || "No Mobile"}
                                </p>

                                <p className="text-sm text-gray-500">
                                    {member.email || "No Email"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Package */}

                    <div className="rounded-xl border p-5">
                        <h3 className="mb-4 font-semibold">Membership</h3>

                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span>Package</span>

                                <strong>{selectedPackage?.packageName || "-"}</strong>
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

                                <strong>{formatDisplayDate(membership.startDate)}</strong>
                            </div>

                            <div className="flex justify-between">
                                <span>Expiry</span>

                                <strong>{formatDisplayDate(membership.expiryDate)}</strong>
                            </div>
                        </div>
                    </div>

                    {/* Billing */}

                    <div className="rounded-xl border p-5">
                        <h3 className="mb-4 font-semibold">Billing</h3>

                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span>Package Amount</span>

                                <strong>{currency(selectedPackage?.amount || 0)}</strong>
                            </div>

                            <div className="flex justify-between">
                                <span>Registration Fee</span>

                                <strong>{currency(payment.registrationAmount)}</strong>
                            </div>

                            <div className="flex justify-between">
                                <span>Discount</span>

                                <span className="text-red-500">- {currency(payment.discount)}</span>
                            </div>

                            {invoiceType !== "Non Tax" && selectedPackage?.taxIncluded && (
                                <div className="flex justify-between">
                                    <span>Discount (Excl. Tax)</span>

                                    <strong className="text-red-500">
                                        - {currency(bill.discountBase || 0)}
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
                                        {invoiceType} ({billingSetting.taxPercentage}%)
                                    </span>

                                    <strong className="text-green-600">
                                        {currency(bill.taxAmount)}
                                    </strong>
                                </div>
                            )}

                            <div className="flex justify-between">
                                <span>Convenience Fee</span>

                                <strong>{currency(payment.convenienceFee)}</strong>
                            </div>

                            <div className="flex justify-between border-t pt-3 text-lg font-bold">
                                <span>Grand Total</span>

                                <span className="text-brand-600">{currency(bill.grandTotal)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Payments */}

                    <div className="rounded-xl border p-5">
                        <h3 className="mb-4 font-semibold">Payments</h3>

                        <div className="space-y-3">
                            {payment.payments.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-800"
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

                                    <strong className="text-green-600">{currency(received)}</strong>
                                </div>

                                <div className="flex justify-between">
                                    <span>Pending</span>

                                    <strong className="text-red-500">{currency(pending)}</strong>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span>Status</span>

                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor}`}
                                    >
                                        {status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ComponentCard>
        </div>
    );
}
