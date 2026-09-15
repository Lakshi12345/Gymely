import { Router } from "express";
import { sendTest } from "../controllers/CommunicationController";

const router = Router();

router.post("/test", sendTest);

export default router;
