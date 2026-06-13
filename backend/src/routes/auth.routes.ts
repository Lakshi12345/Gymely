import  { Router } from "express";
import {fetchUsers, loginUsers, profile, register} from "../controllers/auth.controller";
import {authenticate} from "../middlewares/auth.middleware";

const router = Router();

router.post('/register',register);

router.get('/getusers',fetchUsers);

router.post('/loginuser',loginUsers);

router.get('/getProfile',authenticate, profile);


export default router;