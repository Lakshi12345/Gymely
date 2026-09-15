import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import {
    memberAdd,
    getAllTransactions,
    viewBill,
    checkData,
    getAllMemberships,
    getAllMember,
    memberView,
    renewMemberController,
    importMembersCSV,
} from "../controllers/member.controller";

const router = Router();

import multer from "multer";

const storage = multer.memoryStorage();

export const uploadPic = multer({
    storage,
});

// CSV member import upload
export const uploadCSV = multer({
    storage,

    limits: {
        fileSize: 10 * 1024 * 1024, // 10 MB
    },

    fileFilter: (_req, file, cb) => {
        const isCSV =
            file.mimetype === "text/csv" ||
            file.mimetype === "application/vnd.ms-excel" ||
            file.originalname.toLowerCase().endsWith(".csv");

        if (isCSV) {
            cb(null, true);
        } else {
            cb(new Error("Only CSV files are allowed"));
        }
    },
});

router.post("/addMember", authenticate, uploadPic.single("profile"), memberAdd);

router.get("/getallMember", authenticate, getAllMember);

router.get("/getAllTransactions", authenticate, getAllTransactions);

router.get("/getAllMemberships", authenticate, getAllMemberships);

router.get("/viewBill/:id", authenticate, viewBill);

router.post("/checkdata", authenticate, checkData);

router.get("/getMember/:id", authenticate, memberView);

router.post("/renewMember", authenticate, renewMemberController);

router.post("/import-members", authenticate, uploadCSV.single("file"), importMembersCSV);

export default router;
