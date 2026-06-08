import express from "express";
import { updateOrderStatus } from "../controllers/orderController.js";

const router = express.Router();

router.post("/status", updateOrderStatus);

export default router;
