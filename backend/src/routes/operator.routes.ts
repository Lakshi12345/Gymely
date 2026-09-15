import { Router } from "express";
import {
    editOperator,
    getOperator,
    getSingleOperator,
    operatorAdd,
} from "../controllers/operator.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.post("/create", authenticate, operatorAdd);

router.get("/getOperatorList", authenticate, getOperator);

router.get("/getOperator/:id", authenticate, getSingleOperator);

router.put("/editOperator/:id", authenticate, editOperator);

export default router;
