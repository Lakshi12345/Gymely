import { Router } from "express";
import { sendTestInvoice } from "../controllers/email.controller";

const router = Router();

router.get("/test-invoice", sendTestInvoice);

export default router;
