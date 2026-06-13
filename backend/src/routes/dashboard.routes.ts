import {Router} from "express";
import {authenticate} from "../middlewares/auth.middleware";
import {packageAdd} from "../controllers/dashboard.controller";

const  router = Router();

router.post(
    "/packageAdd",
    authenticate,
    packageAdd
);

export  default router;