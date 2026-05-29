import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("MealMate API Running");
});

app.use("/api/auth", authRoutes);

app.use("/api/user", userRoutes);

export default app;