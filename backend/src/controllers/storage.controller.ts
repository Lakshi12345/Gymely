import { Request, Response } from "express";
import crypto from "crypto";

import { uploadFile } from "../modules/storage/s3.service";
import { updateBranding } from "../services/storage.service";

export const handleUpload = async (
    req: Request,
    res: Response
) => {


    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }

        const type  = req.body.type;

        if (!type) {
            return res.status(400).json({
                success: false,
                message: "Upload type is required",
            });
        }

        const file = req.file;

        // Generate 32 character filename
        const fileName = crypto
            .randomBytes(16)
            .toString("hex");

        const key = `images/${fileName}.jpeg`;

        // Upload to S3
        const result = await uploadFile({
            key,
            body: file.buffer,
            contentType: file.mimetype,
        });

        // Update MongoDB through service
        const gym = await updateBranding(
            req.user.email,
            type,
            key
        );

        return res.status(200).json({
            success: true,
            message: "File uploaded successfully",
            data: {
                type,
                url: result.url,
                gym,
            },
        });
    } catch (error: any) {
        console.error("S3 upload error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Upload failed",
        });
    }
};