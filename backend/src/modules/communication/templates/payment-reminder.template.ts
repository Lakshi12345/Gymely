import { baseTemplate } from "./base.template";

export const paymentReminderTemplate = (name: string, amount: number) => {
    return baseTemplate(
        "Payment Reminder",
        `
            <p>Hello ${name}</p>

            <p>Outstanding amount: ₹${amount}</p>
        `
    );
};
