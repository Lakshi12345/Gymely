import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import {
    addLeadFollowup,
    deleteLead,
    getLead,
    leadAdd,
    getLeadProfile,
    getLeadFollowupReport,
} from "../controllers/lead.controller";

const router = Router();

router.post("/addLead", authenticate, leadAdd);
//
router.get("/getallleads", authenticate, getLead);

router.delete("/deleteLead/:id", authenticate, deleteLead);

router.post("/leadfollowup", authenticate, addLeadFollowup);
router.get("/getprofile/:id", authenticate, getLeadProfile);
router.post("/leadfollowupreport", authenticate, getLeadFollowupReport);

//
// router.post("/checkdata", authenticate, checkData);

export default router;
