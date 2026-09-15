import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const generateInvoice = async (billData: any, gymDetails: any) => {
    const CDN_URL = process.env.AWS_CDN_URL;

    const border_color = "#9eaac5";
    const bg_color = "#002C94";
    const textColor = "white";

    // ---------------- Image Helper ----------------

    const getImageBuffer = async (url: string): Promise<Buffer> => {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
        }

        return Buffer.from(await response.arrayBuffer());
    };

    try {
        // ---------------- Invoice ----------------

        const invoiceName = billData.gymId + `.pdf`;

        const invoicePath = path.join(process.cwd(), "uploads", "invoices", invoiceName);

        // ---------------- Gym Images ----------------

        const logoPath = `${CDN_URL}/${gymDetails.branding.invoiceLogo}`;

        const watermarkPath = `${CDN_URL}/${gymDetails.branding.watermark}`;

        console.log("Logo URL:", logoPath);
        console.log("Watermark URL:", watermarkPath);

        const logoBuffer = await getImageBuffer(logoPath);

        const watermarkBuffer = await getImageBuffer(watermarkPath);

        // ---------------- PDF ----------------

        const doc = new PDFDocument({
            size: "A4",
            margin: 40,
        });

        const stream = fs.createWriteStream(invoicePath);

        doc.pipe(stream);

        // ---------------- Watermark ----------------

        doc.image(watermarkBuffer, 95, 220, {
            width: 400,
            height: 400,
        });

        // ---------------- Helper ----------------

        const formatDate = (date: Date | string | null | undefined) => {
            if (!date) return "-";

            return new Date(date).toLocaleDateString("en-GB");
        };

        const amount = (value: any) => {
            return Number(value || 0).toFixed(2);
        };

        // ---------------- Header ----------------

        doc.image(logoBuffer, 35, 30, {
            width: 150,
            height: 75,
        });

        // Gym Details Right

        doc.fontSize(15).font("Helvetica-Bold").text(gymDetails.name, 320, 32, {
            width: 220,
            align: "right",
        });

        doc.fontSize(9)
            .font("Helvetica")
            .text(gymDetails.address || "", 320, 55, {
                width: 220,
                align: "right",
            })
            .text(`Phone: ${gymDetails.mobile || "-"}`, {
                width: 220,
                align: "right",
            })
            .text(`Email: ${gymDetails.email || "-"}`, {
                width: 220,
                align: "right",
            })
            .text(`GSTIN: ${gymDetails.gst || gymDetails.business?.gstNumber || "N/A"}`, {
                width: 220,
                align: "right",
            });

        // ---------------- BILL TO ----------------

        doc.fontSize(15).font("Helvetica").fillColor(bg_color).text("Payment Receipt", 40, 118);

        // Compact BILL TO box

        doc.rect(40, 142, 515, 65).strokeColor(border_color).fillColor(bg_color).fill().stroke();

        doc.fontSize(10).font("Helvetica-Bold").fillColor(textColor).text("BILL TO", 50, 150);

        // Bill To - Left

        doc.fontSize(9)
            .font("Helvetica")
            .text(billData.name || "-", 50, 169)
            .text(`BIO ID: ${billData.bioId || billData.UID || "N/A"}`, 50, 182)
            .text(billData.mobile || "-", 50, 195);

        // Invoice Details - Right

        doc.fontSize(9)
            .font("Helvetica")
            .text(`Bill Number: ${billData.billNumber || billData.invoiceNumber || "-"}`, 350, 169)
            .text(
                `Bill Date: ${formatDate(billData.billDate || billData.paymentDate || new Date())}`,
                350,
                182
            )
            .text(`Receipt Type: ${billData.purpose || "NEW PACKAGE"}`, 350, 195);

        // ---------------- Purchase Table ----------------

        const tableTop = 218;

        // Compact Purchase Details box

        doc.rect(40, tableTop, 515, 58).strokeColor(border_color).stroke();

        // Middle Divider

        doc.moveTo(430, tableTop)
            .lineTo(430, tableTop + 58)
            .stroke();

        // Header Line

        doc.moveTo(40, tableTop + 23)
            .lineTo(555, tableTop + 23)
            .stroke();

        // Header Text

        doc.font("Helvetica-Bold")
            .fillColor("#000")
            .fontSize(9)
            .text("Purchase Details", 50, tableTop + 5)
            .text("AMOUNT", 455, tableTop + 5);

        // Package Details

        doc.font("Helvetica")
            .fontSize(10)
            .text(billData.planName || "-", 50, tableTop + 31);

        doc.fontSize(8)
            .fillColor("gray")
            .text(
                `(From ${formatDate(billData.startDate)} till ${formatDate(billData.expiryDate)})`,
                50,
                tableTop + 44
            );

        doc.fontSize(10)
            .fillColor("black")
            .text(`Rs. ${amount(billData.cost)}`, 450, tableTop + 37);

        // ---------------- Summary ----------------

        const summaryY = tableTop + 72;

        doc.rect(315, summaryY - 6, 240, 204)
            .strokeColor(border_color)
            .stroke();

        /*
        |--------------------------------------------------------------------------
        | TAX CALCULATION
        |--------------------------------------------------------------------------
        */

        const taxPercentage = Number(billData.taxPercentage ?? billData.tax?.taxPercentage ?? 0);

        const taxAmount = Number(billData.taxAmount ?? billData.tax?.taxAmount ?? 0);

        /*
        |--------------------------------------------------------------------------
        | CGST / SGST
        |--------------------------------------------------------------------------
        */

        const cgst = Number(billData.cgst ?? billData.tax?.cgst ?? taxPercentage / 2);

        const sgst = Number(billData.sgst ?? billData.tax?.sgst ?? taxPercentage / 2);

        /*
        |--------------------------------------------------------------------------
        | OTHER VALUES
        |--------------------------------------------------------------------------
        */

        const registrationFee = Number(
            billData.registrationAmount ?? billData.registrationFee ?? 0
        );

        const convenience = Number(billData.convenience ?? billData.convenienceFee ?? 0);

        const totalAmount = Number(
            billData.totalAmount ?? billData.cost - (billData.discount || 0)
        );

        const grandTotal = Number(
            billData.totalPayable ??
                billData.grandTotal ??
                totalAmount + registrationFee + convenience + taxAmount
        );

        const paidAmount = Number(
            billData.currentInstallment ?? billData.paidAmount ?? billData.received ?? 0
        );

        const dueAmount = Number(
            billData.remaining ?? billData.pendingAmount ?? Math.max(grandTotal - paidAmount, 0)
        );

        const summary = [
            ["SUB-TOTAL", billData.cost],

            ["DISCOUNT", billData.discount],

            ["REGISTRATION FEE", registrationFee],

            ["CONVENIENCE", convenience],

            ["TOTAL", totalAmount],

            ["CGST", taxPercentage > 0 ? `${amount(cgst)}%` : "0.00"],

            ["SGST", taxPercentage > 0 ? `${amount(sgst)}%` : "0.00"],

            ["GRAND TOTAL", grandTotal],

            ["PAID AMOUNT", paidAmount],

            ["DUE AMOUNT", dueAmount],
        ];

        let y = summaryY;

        summary.forEach((item, index) => {
            doc.fontSize(9)
                .font("Helvetica")
                .text(item[0], 330, y)
                .text(
                    typeof item[1] === "string" && item[1].includes("%")
                        ? item[1]
                        : `Rs. ${amount(item[1])}`,
                    470,
                    y
                );

            // Horizontal line

            if (index !== summary.length - 1) {
                doc.moveTo(320, y + 14)
                    .lineTo(550, y + 14)
                    .strokeColor(border_color)
                    .lineWidth(0.5)
                    .stroke();
            }

            y += 18;
        });

        // ---------------- Payment Mode ----------------

        y += 30;
        // Compact Payment Mode box

        const paymentBoxY = y - 5;
        const paymentBoxHeight = 60;

        doc.rect(40, paymentBoxY, 515, paymentBoxHeight).strokeColor(border_color).stroke();

        doc.font("Helvetica-Bold").fontSize(9).text("Payment Mode Details", 50, y);

        // Payment values

        y += 18;

        doc.font("Helvetica")
            .fontSize(8)
            .text(`Online : Rs. ${amount(billData.online ?? billData.paidByOnline)}`, 50, y)
            .text(`Cash : Rs. ${amount(billData.cash ?? billData.paidByCash)}`, 220, y)
            .text(`Cheque : Rs. ${amount(billData.cheque ?? billData.paidByCheque)}`, 380, y);

        // ---------------- Amount In Words ----------------

        const paidAmountword = Number(
            billData.currentInstallment ?? billData.paidAmount ?? billData.received ?? 0
        );

        const amountInWords = numberToWords(paidAmountword);

        doc.font("Helvetica")
            .fontSize(8)
            .fillColor("#000")
            .text(` ${amountInWords} Rupees Only`, 50, y + 18, {
                width: 495,
                align: "center",
            });

        // Move below the box

        y = paymentBoxY + paymentBoxHeight + 15;
        doc.font("Helvetica-Bold").fontSize(9).text("Terms and Conditions", 50, y);

        y += 16;

        const invoiceTerm =
            gymDetails.invoiceTerm ||
            gymDetails.business?.invoiceTerm ||
            "No refund policy.\nNo disputes or arguments will be entertained without a valid receipt.\nCheque Dishonor Charges applicable if cheque gets bounced.\nPlease go through Terms & Conditions pasted at the entrance.";

        doc.fontSize(8).font("Helvetica").text(invoiceTerm, 50, y, {
            width: 500,
            lineGap: 3,
        });

        // ---------------- Finish PDF ----------------

        doc.end();

        return new Promise((resolve, reject) => {
            stream.on("finish", () => {
                resolve({
                    invoicePath,
                    invoiceName,
                });
            });

            stream.on("error", reject);
        });
    } catch (error) {
        console.error("Invoice generation error:", error);

        throw error;
    }
};
const numberToWords = (num: number): string => {
    if (!Number.isFinite(num)) {
        return "Zero";
    }

    num = Math.round(num);

    if (num === 0) {
        return "Zero";
    }

    const ones = [
        "",
        "One",
        "Two",
        "Three",
        "Four",
        "Five",
        "Six",
        "Seven",
        "Eight",
        "Nine",
        "Ten",
        "Eleven",
        "Twelve",
        "Thirteen",
        "Fourteen",
        "Fifteen",
        "Sixteen",
        "Seventeen",
        "Eighteen",
        "Nineteen",
    ];

    const tens = [
        "",
        "",
        "Twenty",
        "Thirty",
        "Forty",
        "Fifty",
        "Sixty",
        "Seventy",
        "Eighty",
        "Ninety",
    ];

    const convert = (n: number): string => {
        if (n < 20) {
            return ones[n];
        }

        if (n < 100) {
            return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
        }

        if (n < 1000) {
            return ones[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + convert(n % 100) : "");
        }

        if (n < 100000) {
            return (
                convert(Math.floor(n / 1000)) +
                " Thousand" +
                (n % 1000 ? " " + convert(n % 1000) : "")
            );
        }

        if (n < 10000000) {
            return (
                convert(Math.floor(n / 100000)) +
                " Lakh" +
                (n % 100000 ? " " + convert(n % 100000) : "")
            );
        }

        return (
            convert(Math.floor(n / 10000000)) +
            " Crore" +
            (n % 10000000 ? " " + convert(n % 10000000) : "")
        );
    };

    return convert(num);
};
