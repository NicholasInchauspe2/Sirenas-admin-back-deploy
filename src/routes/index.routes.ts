import { Router } from "express";
const router = Router();

import { userRouter } from "./user.routes";
import { workshopRouter } from "./workshop.routes";

router.use("/users", userRouter)
router.use("/workshops", workshopRouter)

export default router