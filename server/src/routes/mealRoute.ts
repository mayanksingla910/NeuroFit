import { Router } from "express";
import { logMeal, getLoggedMeals, deleteLoggedMeal, updateLoggedMeal } from "../controllers/mealController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.post("/logMeal", logMeal);
router.get("/getLoggedMeals", getLoggedMeals);
router.delete("/deleteLoggedMeal/:id", deleteLoggedMeal);
router.put("/updateLoggedMeal/:id", updateLoggedMeal);

export default router;
