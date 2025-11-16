import express from "express";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import profileRoute from "./routes/profileRoute.js";
import userRoute from "./routes/userRoute.js";
import mealRoute from "./routes/mealRoute.js";
import workoutRoute from "./routes/workoutRoute.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api", profileRoute);
app.use("/api", userRoute);
app.use("/api", mealRoute);
app.use("/api",workoutRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
