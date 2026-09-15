import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
    region: process.env.AWS_REGION || "eu-north-1",
});

const bucket = process.env.AWS_S3_BUCKET || "gymely";

const cdnUrl = process.env.AWS_CDN_URL || "https://cdn.thelkg.online";

interface UploadFileParams {
    key: string;
    body: Buffer;
    contentType: string;
}

export const uploadFile = async ({ key, body, contentType }: UploadFileParams) => {
    try {
        console.log("S3 Upload:", {
            bucket,
            key,
            contentType,
            bodySize: body.length,
        });

        await s3.send(
            new PutObjectCommand({
                Bucket: bucket,
                Key: key,
                Body: body,
                ContentType: contentType,
            })
        );

        return {
            key,
            url: `${key}`,
        };
    } catch (error) {
        console.error("AWS S3 ERROR:", error);
        throw error;
    }
};
