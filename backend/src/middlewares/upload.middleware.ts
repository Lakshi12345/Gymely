import multer from "multer";
import path from "path";
import crypto from "crypto";

const storage =
    multer.diskStorage({

        destination:
            (
                req,
                file,
                cb
            ) => {

                cb(
                    null,
                    "uploads/members"
                );

            },

        filename:
            (
                req,
                file,
                cb
            ) => {

                const randomName =

                    crypto
                        .randomBytes(16)
                        .toString("hex");

                const extension =

                    path.extname(
                        file.originalname
                    );

                cb(
                    null,
                    `${randomName}${extension}`
                );

            }

    });

const upload =
    multer({

        storage,

        limits: {

            fileSize:
                5 * 1024 * 1024

        }

    });

export default upload;