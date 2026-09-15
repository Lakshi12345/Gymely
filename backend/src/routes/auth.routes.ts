import { Router } from "express";
import {
    fetchUsers,
    loginUsers,
    profile,
    register,
    importGym,
} from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", register);

router.get("/getusers", fetchUsers);

router.post("/loginuser", loginUsers);

router.get("/getProfile", authenticate, profile);

router.post("/importgym", importGym);

router.get("/profile", authenticate, async (req, res) => {
    try {
        return res.json({
            success: true,
            user: req.user,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
});

export default router;
