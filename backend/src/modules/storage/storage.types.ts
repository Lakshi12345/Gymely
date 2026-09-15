import {
    PutObjectCommand,
    DeleteObjectCommand,
    S3Client,
} from "@aws-sdk/client-s3";

const s3 = new S3Client({
    region: process.env.AWS_REGION || "eu-north-1",
});

const bucket = process.env.AWS_S3_BUCKET || "gymely";
const cdnUrl = process.env.AWS_CDN_URL || "https://cdn.thelkg.online";

interface UploadFileOptions {
    key: string;
    body: Buffer;
    contentType: string;
}

export const uploadFile = async ({
                                     key,
                                     body,
                                     contentType,
                                 }: UploadFileOptions) => {
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
        url: `${cdnUrl}/${key}`,
    };
};

export const deleteFile = async (key: string) => {
    await s3.send(
        new DeleteObjectCommand({
            Bucket: bucket,
            Key: key,
        })
    );

    return true;
};

export const getFileUrl = (key: string) => {
    return `${cdnUrl}/${key}`;
};