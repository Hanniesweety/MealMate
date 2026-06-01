import express from "express";
import {
  createFood,
  getRestaurantMenu,
} from "../controllers/foodController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createFood);

router.get(
  "/restaurant/:restaurantId",
  getRestaurantMenu
);

export default router;