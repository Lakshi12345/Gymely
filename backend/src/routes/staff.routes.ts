import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import {
    staffAdd,
    getStaff,
    getStaffSingle,
    staffEdit,
    staffDelete,
} from "../controllers/staff.controller";

const router = Router();

router.post("/addStaff", authenticate, staffAdd);

router.get("/getStaff", authenticate, getStaff);

router.get("/getStaff/:id", authenticate, getStaffSingle);

router.put("/editStaff/:id", authenticate, staffEdit);

router.delete("/deleteStaff/:id", authenticate, staffDelete);

export default router;
