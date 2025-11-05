import { Router } from "express";
import { getProfile, postProfile, updateProfile } from "../controllers/profileController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/profile", getProfile);
router.post("/profile", postProfile);
router.put("/profile", updateProfile);

export default router;
