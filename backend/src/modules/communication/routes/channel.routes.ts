import { Router } from "express";

import { authenticate } from "../../../middlewares/auth.middleware";

import { getChannel } from "../controllers/channel.controller";

const router = Router();

router.get("/", authenticate, getChannel);

export default router;
