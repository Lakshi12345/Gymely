export interface Package {
    _id: string;
    packageName: string;
    amount: number;
    duration: number;
    durationType: "Days";
    sessions: number;
    group?: string;
    description?: string;
    taxIncluded: boolean;
}

export interface MemberForm {
    name: string;
    mobile: string;
    email: string;
    gender: "Male" | "Female" | "Other";
    birthDate: "";
}

export interface PaymentItem {
    method: "Cash" | "Card" | "UPI" | "Online" | "Cheque";
    amount: number;
    referenceNumber: string;
}

export interface PaymentForm {
    soldBy: string | readonly string[] | number | undefined;
    discount: number;
    registrationAmount: number;
    nextPaymentDate: string;
    convenienceFee: number;
    received: number;
    payments: PaymentItem[];
    paymentDate: string;
    remark: string;
}

export interface MembershipForm {
    enrollmentDate: string;
    startDate: string;
    expiryDate: string;
}

export interface AdvancedForm {
    soldBy: string;
    executive: string;
    trainer: string;
    invoiceType: "Non Tax" | "GST" | "VAT";
}
