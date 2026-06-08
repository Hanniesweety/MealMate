import { io } from "../server.js";

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    // MongoDB update logic here

    io.emit("orderStatusUpdated", {
      orderId,
      status,
    });

    res.status(200).json({
      message: "Status updated",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};