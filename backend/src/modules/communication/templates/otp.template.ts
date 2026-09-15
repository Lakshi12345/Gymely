import { baseTemplate } from "./base.template";

export const otpTemplate = (otp: string) => {
    return baseTemplate(
        "OTP Verification",
        `
            <h1>${otp}</h1>
            <p>This OTP will expire in 10 minutes.</p>
        `
    );
};
