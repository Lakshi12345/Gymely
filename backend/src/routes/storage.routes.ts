import { Router } from "express";
import multer from "multer";
import { handleUpload } from "../controllers/storage.controller";
import {authenticate} from "../middlewares/auth.middleware";

const router = Router();

const upload = multer({
    storage: multer.memoryStorage(),
});

router.post(
    "/upload", authenticate,
    upload.single("file"),
    handleUpload
);

export default router;