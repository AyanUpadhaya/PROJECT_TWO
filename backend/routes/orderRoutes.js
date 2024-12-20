const express = require("express");
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  getOrdersByStore,
  getUserOrders,
} = require("../controllers/orderController");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

// Create a new order
router.post("/orders", verifyToken, createOrder); 

// Get - orders
router.get("/orders", verifyToken, getAllOrders); 
router.get("/orders/:id", verifyToken, getOrderById);
router.get("/orders/store/:storeId", verifyToken, getOrdersByStore); 
router.get("/orders/:userId/my_orders", verifyToken, getUserOrders);

// patch
router.patch("/orders/status/:orderId", verifyToken, updateOrderStatus); 

module.exports = router;
