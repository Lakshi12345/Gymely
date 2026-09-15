import zeptoProvider from "../providers/email/zepto.provider";
import { EmailPayload } from "../types/email.types";

class EmailService {
    async send(payload: EmailPayload) {
        return zeptoProvider.send(payload);
    }
}

export default new EmailService();
