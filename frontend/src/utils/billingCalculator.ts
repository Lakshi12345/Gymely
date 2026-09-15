export interface BillingCalculation {
    amount: number;
    discount: number;
    registrationAmount: number;
    convenienceFee: number;

    invoiceType: "Non Tax" | "GST" | "VAT";

    taxIncluded: boolean;

    taxPercentage: number;
}

export const calculateBill = ({
    amount,
    discount,
    registrationAmount,
    convenienceFee,
    invoiceType,
    taxIncluded,
    taxPercentage,
}: BillingCalculation) => {
    let baseAmount = 0;
    let taxableAmount = 0;
    let taxAmount = 0;
    let grandTotal = 0;
    let discountBase = 0;

    // -----------------------------------
    // NON TAX INVOICE
    // -----------------------------------
    if (invoiceType === "Non Tax") {
        taxableAmount = amount - discount;

        grandTotal = taxableAmount + registrationAmount + convenienceFee;

        return {
            baseAmount: taxableAmount,
            discountBase: discount,
            taxAmount: 0,
            subTotal: taxableAmount,
            grandTotal,
        };
    }

    // -----------------------------------
    // GST / VAT NOT INCLUDED
    // -----------------------------------
    if (!taxIncluded) {
        taxableAmount = amount - discount;

        taxAmount = (taxableAmount * taxPercentage) / 100;

        grandTotal = taxableAmount + taxAmount + registrationAmount + convenienceFee;

        return {
            baseAmount: taxableAmount,
            discountBase: discount,
            taxAmount,
            subTotal: taxableAmount,
            grandTotal,
        };
    }

    // -----------------------------------
    // GST / VAT INCLUDED
    // -----------------------------------

    // Remove GST from package amount
    baseAmount = amount / (1 + taxPercentage / 100);

    // Remove GST from discount
    discountBase = discount / (1 + taxPercentage / 100);

    // Discount applies only on package
    taxableAmount = baseAmount - discountBase;

    // GST on discounted taxable amount
    taxAmount = (taxableAmount * taxPercentage) / 100;

    // Registration & Convenience are NON-TAXABLE add-ons
    grandTotal = taxableAmount + taxAmount + registrationAmount + convenienceFee;

    return {
        baseAmount,
        discountBase,
        taxAmount,
        subTotal: taxableAmount,
        grandTotal,
    };
};
