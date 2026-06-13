
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const generateInvoice =
(
    billData: any,
    gymDetails: any
) => {

    gymDetails = {
        ...gymDetails,
        gymName : "Fitrig",
        address : "Kamalpur",
        phone : "7632914836",
    }

    const border_color  = "#002C94";
    const bg_color  = "#002C94";
    const textColor = "white";

    return new Promise(

        (
            resolve,
            reject
        ) => {

            const invoiceName =
            `invoice.pdf`;

            const invoicePath =
            path.join(

                process.cwd(),

                "uploads",

                "invoices",

                invoiceName

            );

            const doc =
            new PDFDocument({

                size: "A4",

                margin: 40

            });

            const stream =
            fs.createWriteStream(
                invoicePath
            );

            doc.pipe(
                stream
            );

            const watermarkPath =
                path.join(

                    process.cwd(),

                    "uploads",

                    "water.jpeg"

                );

            doc.image(

                watermarkPath,

                95,

                220,

                {

                    width: 400,

                    height: 400

                }

            );

            // ---------------- Helper ----------------

            const formatDate =
            (
                date: Date
            ) =>

                new Date(
                    date
                )
                .toLocaleDateString(
                    "en-GB"
                );

            // ---------------- Header ----------------

            const logoPath =
                path.join(

                    process.cwd(),

                    "uploads",

                    "logo.jpeg"

                );

            doc.image(

                logoPath,

                35,

                20,

                {

                    width: 200,

                    height: 100

                }

            );

            // Gym Details Right

            doc

            .fontSize(18)

            .font(
                "Helvetica-Bold"
            )

            .text(

                gymDetails.gymName,

                320,

                40,

                {

                    width:
                    220,

                    align:
                    "right"

                }

            );

            doc

            .fontSize(10)

            .font(
                "Helvetica"
            )

            .text(

                gymDetails
                .address,

                320,

                65,

                {

                    width:
                    220,

                    align:
                    "right"

                }

            )

            .text(

                `Phone: ${gymDetails.phone}`,

                {

                    width:
                    220,

                    align:
                    "right"

                }

            )

            .text(

                `Email: ${gymDetails.email}`,

                {

                    width:
                    220,

                    align:
                    "right"

                }

            )

            .text(

                `GSTIN: ${gymDetails.gst || "N/A"}`,

                {

                    width:
                    220,

                    align:
                    "right"

                }

            );

            // Divider

            // doc
            //
            // .moveTo(
            //     40,
            //     130
            // )
            //
            // .lineTo(
            //     555,
            //     130
            // )
            //
            // .strokeColor(
            //     border_color
            // )
            //
            // .lineWidth(
            //     1
            // )
            //
            // .stroke();

            // ---------------- BILL TO ----------------
            doc

                .fontSize(18)

                .font(
                    "Helvetica"
                )
                .fillColor(
                    bg_color
                )
                .text(

                    "Payment Receipt",

                    40,

                    125

                );
            doc

            .rect(
                40,
                150,
                515,
                90
            )

            .strokeColor(
                border_color
            )
                .fillColor(
                    bg_color
                )
                .fill()

            .stroke();

            doc

            .fontSize(12)

            .font(
                "Helvetica-Bold"
            )
            .fillColor(textColor)
            .text(

                "BILL TO",

                50,

                160

            );

            doc
            .fontSize(11)

            .font(
                "Helvetica"
            )

            .text(

                billData.name,

                50,

                185

            )

            .text(

                `BIO ID: ${billData.bioId || "N/A"}`

            )

            .text(
                billData.mobile
            );

            // Invoice Details Right

            doc

            .fontSize(11)

            .font(
                "Helvetica"
            )

            .text(

                `Bill Number: ${Date.now()}`,

                350,

                180

            )

            .text(

                `Bill Date: ${formatDate(new Date())}`,

                350

            )

            .text(

                "Receipt Type: NEW PACKAGE",

                350

            );

            // ---------------- Purchase Table ----------------

            const tableTop =
            270;

            doc

            .rect(
                40,
                tableTop,
                515,
                90
            )

            .strokeColor(
                border_color
            )

            .stroke();

            // Divider

            doc

            .moveTo(
                430,
                tableTop
            )

            .lineTo(
                430,
                tableTop + 90
            )

            .stroke();

            // Header Line

            doc

            .moveTo(
                40,
                tableTop + 30
            )

            .lineTo(
                555,
                tableTop + 30
            )

            .stroke();

            // Header Text

            doc

            .font(
                "Helvetica-Bold"
            )
            .fillColor("#000")
            .fontSize(12)

            .text(

                "Purchase Details",

                50,

                tableTop + 8

            )
            .fillColor("#000")

            .text(

                "AMOUNT",

                455,

                tableTop + 8

            );

            // Package Details

            doc

            .font(
                "Helvetica"
            )

            .fontSize(11)

            .text(

                billData.planName,

                50,

                tableTop + 45

            );

            doc

            .fontSize(9)

            .fillColor(
                "gray"
            )

            .text(

                `(From ${formatDate(billData.startDate)} till ${formatDate(billData.expiryDate)})`,

                50,

                tableTop + 62

            );

            doc

            .fontSize(11)

            .fillColor(
                "black"
            )

            .text(

                `Rs. ${billData.cost}`,

                450,

                tableTop + 53

            );

            // ---------------- Summary ----------------

            const summaryY =
            tableTop + 120;

            doc

            .rect(
                315,
                summaryY - 10,
                240,
                245
            )

            .strokeColor(
                border_color
            )

            .stroke();

            const summary = [

                ["SUB-TOTAL", billData.cost],

                ["DISCOUNT", billData.discount],

                ["REGISTRATION FEE", 0],

                ["CONVENIENCE", 0],

                ["TOTAL", billData.totalAmount],

                ["CGST", 0],

                ["SGST", 0],

                ["GRAND TOTAL", billData.totalAmount],

                ["PAID AMOUNT", billData.currentInstallment],

                ["DUE AMOUNT", billData.remaining]

            ];

            let y =
            summaryY;

            summary.forEach(
                (item, index) => {

                    doc

                    .fontSize(11)

                    .text(
                        item[0],
                        330,
                        y
                    )

                    .text(
                        `Rs. ${item[1]}`,
                        470,
                        y
                    );
                    // Horizontal line

                    if(index != summary.length -1){
                        doc
                            .moveTo(
                                320,
                                y + 18
                            )

                            .lineTo(
                                550,
                                y + 18
                            )

                            .strokeColor(
                                border_color
                            )

                            .lineWidth(
                                0.5
                            )

                            .stroke();
                    }
                    y += 22;



                }
            );

            // ---------------- Payment Mode ----------------

            y += 25;

            doc

            .rect(
                40,
                y - 10,
                515,
                60
            )

            .strokeColor(
                border_color
            )

            .stroke();

            doc

            .font(
                "Helvetica-Bold"
            )

            .text(

                "Payment Mode Details",

                50,

                y

            );

            y += 25;

            doc

            .font(
                "Helvetica"
            )

            .text(
                `Online : Rs. ${billData.online}`,
                50,
                y
            )

            .text(
                `Cash : Rs. ${billData.cash}`,
                220,
                y
            )

            .text(
                `Cheque : Rs. ${billData.cheque}`,
                380,
                y
            );

            // ---------------- Terms ----------------

            y += 70;

            doc

            .font(
                "Helvetica-Bold"
            )

            .text(

                "Terms and Conditions",

                50,

                y

            );

            y += 22;

            doc

            .fontSize(10)

            .font(
                "Helvetica"
            )

            .text(
                "• No refund policy.",
                50,
                y
            )

            .text(
                "• No disputes or arguments will be entertained without a valid receipt."
            )

            .text(
                "• Cheque Dishonor Charges applicable if cheque gets bounced."
            )
            .text(
                "• Please go through Terms & Conditions pasted at the entrance."
            );

            doc.end();

            stream.on(

                "finish",

                () => {

                    resolve({

                        invoicePath,

                        invoiceName

                    });

                }

            );

            stream.on(
                "error",
                reject
            );

        }

    );

};

