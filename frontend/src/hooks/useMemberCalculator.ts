import { useMemo } from "react";
import { MembershipForm, Package, PaymentForm } from "../types/member";

interface CalculatorProps {
    selectedPackage: Package | null;
    payment: PaymentForm;
    membership: MembershipForm;
}

export default function useMemberCalculator({
    selectedPackage,
    payment,
    membership,
}: CalculatorProps) {
    return useMemo(() => {
        const planAmount = Number(selectedPackage?.amount || 0);

        const discount = Number(payment.discount || 0);

        const convenienceFee = Number(payment.convenienceFee || 0);

        const registrationAmount = Number(payment.registrationAmount || 0);

        const total = planAmount - discount + convenienceFee + registrationAmount;

        const received = Number(payment.received || 0);

        const pending = Math.max(total - received, 0);

        let status: "Paid" | "Partial" | "Unpaid" = "Unpaid";

        if (received === 0) {
            status = "Unpaid";
        } else if (pending === 0) {
            status = "Paid";
        } else {
            status = "Partial";
        }

        let duration = selectedPackage ? selectedPackage.duration : 0;

        let expiryDate = "";

        if (membership.startDate) {
            const date = new Date(membership.startDate);

            date.setDate(date.getDate() + duration);

            expiryDate = date.toISOString().split("T")[0];
        }

        return {
            planAmount,
            discount,
            registrationAmount,
            convenienceFee,
            total,
            received,
            pending,
            status,
            expiryDate,
        };
    }, [selectedPackage, payment, membership]);
}
