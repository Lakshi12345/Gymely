import { baseTemplate } from "./base.template";

export const invoiceTemplate = (data: {
    memberName: string;
    invoiceNumber: string;
    amount: number;
}) => {
    return baseTemplate(
        "Invoice",
        `
        <p>Hello ${data.memberName},</p>

        <table border="1" cellpadding="10">
            <tr>
                <td>Invoice Number</td>
                <td>${data.invoiceNumber}</td>
            </tr>

            <tr>
                <td>Amount</td>
                <td>₹${data.amount}</td>
            </tr>
        </table>
    `
    );
};
