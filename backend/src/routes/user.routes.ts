import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import { getAllUsers } from "../controllers/user.controller";

const router = Router();

router.get("/", requireAuth, getAllUsers);

export default router;
