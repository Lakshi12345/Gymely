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
                email_address: item,
            })),

            cc: payload.cc?.map((item) => ({
                email_address: item,
            })),

            bcc: payload.bcc?.map((item) => ({
                email_address: item,
            })),

            reply_to: payload.replyTo?.map((item) => ({
                email_address: item,
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
