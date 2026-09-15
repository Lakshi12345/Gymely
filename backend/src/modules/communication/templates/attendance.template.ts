import { baseTemplate } from "./base.template";

export const attendanceTemplate = (memberName: string, checkInTime: string) => {
    return baseTemplate(
        "Attendance Alert",
        `
            <p>${memberName} checked in at ${checkInTime}</p>
        `
    );
};
