import { Router } from "express";
import {
  deleteLoggedWorkout,
  getLoggedWorkouts,
  logWorkout,
  updateLoggedWorkout,
} from "../controllers/workoutController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.post("/logWorkout", logWorkout);
router.get("/logWorkout", getLoggedWorkouts);
router.put("/logWorkout/:id", updateLoggedWorkout);
router.delete("/logWorkout/:id", deleteLoggedWorkout);

export default router;
