import {Router} from "express";
import {authenticate} from "../middlewares/auth.middleware";
import {
    deletePackage,
    getPackage,
    getSinglePackage,
    packageAdd,
    updatePackage
} from "../controllers/package.controller";

const  router = Router();

router.post(
    "/packageAdd",
    authenticate,
    packageAdd
);
router.get(
    "/getallPackages",
    authenticate,
    getPackage
);
router.delete(
    "/deletePackage/:id",
    authenticate,
    deletePackage
);

router.get(
    "/getSinglePackage/:id",
    authenticate,
    getSinglePackage
)
router.post(
    "/packageUpdate/:id",
    authenticate,
    updatePackage
)


export  default router;