import { baseTemplate } from "./base.template";

export const announcementTemplate = (title: string, message: string) => {
    return baseTemplate(
        title,
        `
            <p>${message}</p>
        `
    );
};
