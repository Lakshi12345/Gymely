import { baseTemplate } from "./base.template";

export const welcomeTemplate = (name: string) => {
    return baseTemplate(
        "Welcome",
        `
            <p>Hello ${name},</p>

            <p>Welcome to Gymely.</p>
        `
    );
};
