import { Router } from "express";
import {
  register,
  login,
  me,
  updateProfile,
} from "../controllers/auth.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

/* ---------------- AUTH ROUTES ---------------- */

router.post("/register", register);
router.post("/login", login);
router.get("/me", requireAuth, me);
router.put("/profile", requireAuth, updateProfile);

router.post("/logout", (_req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({ message: "Logged out successfully" });
});

export default router;
