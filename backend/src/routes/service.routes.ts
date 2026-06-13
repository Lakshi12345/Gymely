import {Router} from "express";
import {authenticate} from "../middlewares/auth.middleware";
import {deleteService, serviceAdd, servicesGet} from "../controllers/service.controller";

const  router = Router();

router.post(
    "/serviceAdd",
    authenticate,
    serviceAdd,
)

router.get(
    '/getServices',
    authenticate,
    servicesGet
)

router.delete(
    "/deleteService/:id",
    authenticate,
    deleteService
)

export  default router;