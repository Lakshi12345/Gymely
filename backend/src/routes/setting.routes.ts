import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import {
    getSettings,
    addStaffRole,
    editStaffRole,
    deleteStaffRole,
    getStaffRoles,
    updateBillingSettings,
    updateGeneralSettings,
} from "../controllers/setting.controller";

const router = Router();

router.get("/getsettings", authenticate, getSettings);
router.post("/addStaffRole", authenticate, addStaffRole);
router.put("/editStaffRole/:id", authenticate, editStaffRole);
router.delete("/deleteStaffRole/:id", authenticate, deleteStaffRole);
router.get("/getStaffRole", authenticate, getStaffRoles);
router.put("/updateBilling", authenticate, updateBillingSettings);
router.put("/updateGeneral", authenticate, updateGeneralSettings);

export default router;
