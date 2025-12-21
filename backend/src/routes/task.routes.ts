import { Router } from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  dashboard,
} from "../controllers/task.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.post("/", requireAuth, createTask);
router.get("/", requireAuth, getTasks);
router.get("/dashboard", requireAuth, dashboard);
router.put("/:id", requireAuth, updateTask);
router.delete("/:id", requireAuth, deleteTask);

export default router;