import { SendMailClient } from "zeptomail";

const zeptoClient = new SendMailClient({
    url: process.env.ZEPTO_URL!,
    token: process.env.ZEPTO_TOKEN!,
});

export default zeptoClient;
