import { baseTemplate } from "./base.template";

export const membershipExpiryTemplate = (name: string, expiryDate: string) => {
    return baseTemplate(
        "Membership Expiry",
        `
            <p>Hello ${name},</p>

            <p>Your membership expires on ${expiryDate}.</p>
        `
    );
};
