import express from "express";
import { createRestaurant } from "../controllers/restaurantController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createRestaurant);

export default router;