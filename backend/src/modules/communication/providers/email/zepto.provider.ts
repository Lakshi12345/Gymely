// providers/email/zepto.provider.ts

import zeptoClient from "../../../../config/zepto";
import { EmailPayload } from "../../types/email.types";

class ZeptoProvider {
    async send(payload: EmailPayload) {
        return zeptoClient.sendMail({
            from: {
                address: process.env.ZEPTO_FROM_EMAIL!,
                name: process.env.ZEPTO_FROM_NAME!,
            },

            to: payload.to.map((item) => ({
                email_address: {
                    address: typeof item === "string" ? item : item.address,
                    name:
                        typeof item === "string"
                            ? item
                            : item.name || item.address,
                },
            })),

            cc: payload.cc?.map((item) => ({
                email_address: {
                    address: typeof item === "string" ? item : item.address,
                    name:
                        typeof item === "string"
                            ? item
                            : item.name || item.address,
                },
            })),

            bcc: payload.bcc?.map((item) => ({
                email_address: {
                    address: typeof item === "string" ? item : item.address,
                    name:
                        typeof item === "string"
                            ? item
                            : item.name || item.address,
                },
            })),

            reply_to: payload.replyTo?.map((item) => ({
                address: typeof item === "string" ? item : item.address,
                name:
                    typeof item === "string"
                        ? item
                        : item.name || item.address,
            })),

            subject: payload.subject,

            htmlbody: payload.html,

            textbody: payload.text,

            attachments: payload.attachments,

            headers: payload.headers,
        });
    }
}

export default new ZeptoProvider();