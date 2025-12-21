import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import {
  addComment,
  getComments,
} from "../controllers/comment.controller";

const router = Router();

// ✅ GET comments for a task
router.get("/task/:taskId", requireAuth, getComments);

// ✅ ADD comment to a task
router.post("/task/:taskId", requireAuth, addComment);

export default router;