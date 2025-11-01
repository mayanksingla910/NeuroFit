import express from "express";
import cors from "cors";
import authRoute from "./routes/authRoute.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
