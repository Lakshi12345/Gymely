import { baseTemplate } from "./base.template";

export const leadFollowupTemplate = (name: string) => {
    return baseTemplate(
        "Welcome",
        `
            <p>Hello ${name},</p>

            <p>Thank you for your interest.</p>
        `
    );
};
