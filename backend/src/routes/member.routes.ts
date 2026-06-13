import {Router} from "express";
import {authenticate} from "../middlewares/auth.middleware";
import {memberAdd,memberAll,getBillings,viewBill} from "../controllers/member.controller";
import multer from "multer";
import upload from "../middlewares/upload.middleware";

const  router = Router();

router.post(
    "/memberAdd",
    authenticate,
    upload.single('profile'),
    memberAdd
)

router.get(
    "/getallMember",
    authenticate,
    memberAll
)

router.get(
    "/allbillings",
    authenticate,
    getBillings
)

router.get(
    "/viewBill/:id",
    authenticate,
    viewBill,
)

export default router;