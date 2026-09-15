// import { Request, Response } from "express";
// import emailService from "../modules/communication/services/email.service";
//
// export const sendTestInvoice = async (req: Request, res: Response) => {
//     try {
//         await emailService.send({
//             to: [
//                 {
//                     address: "lakshikantag@gmail.com",
//                 },
//             ],
//
//             cc: [
//                 {
//                     address: "gorailakshikanta@gmail.com",
//                 },
//             ],
//
//             bcc: [
//                 {
//                     address: "gymoryxa@gmail.com",
//                 },
//             ],
//
//             subject: "Invoice INV-1001",
//
//             html: `
//         <h2>Hello John</h2>
//
//         <table border="1">
//             <tr>
//                 <td>Invoice Number</td>
//                 <td>INV-1001</td>
//             </tr>
//
//             <tr>
//                 <td>Amount</td>
//                 <td>₹1000</td>
//             </tr>
//         </table>
//     `,
//         });
//
//         return res.json({
//             success: true,
//         });
//     } catch (error: any) {
//         console.error(error);
//
//         return res.status(500).json({
//             success: false,
//             error: error.message,
//             details: error,
//         });
//     }
// };

import { Request, Response } from "express";

import emailService from "../modules/communication/services/email.service";
import { invoiceTemplate } from "../modules/communication/templates/invoice.template";

export const sendTestInvoice = async (req: Request, res: Response) => {
    try {
        const html = invoiceTemplate({
            memberName: "John",
            invoiceNumber: "INV-1001",
            amount: 1000,
        });

        await emailService.send({
            to: [
                {
                    address: "lakshikantag@gmail.com",
                },
            ],
            subject: "Invoice INV-1001",

            html,
        });

        return res.json({
            success: true,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};
