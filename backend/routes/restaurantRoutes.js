import express from "express";
import {
  createRestaurant,
  getNearbyRestaurants,
} from "../controllers/restaurantController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createRestaurant);
router.get("/nearby", getNearbyRestaurants);

export default router;