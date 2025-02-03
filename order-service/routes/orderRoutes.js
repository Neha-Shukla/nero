const express = require("express");
const { createNewOrder, getOrders, getOrder } = require("../controllers/orderController");
const authenticateUser = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticateUser, createNewOrder);  // ✅ Create order (Auth required)
router.get("/", authenticateUser, getOrders);       // ✅ Get all orders (Auth required)
router.get("/:orderId", authenticateUser, getOrder);// ✅ Get order by ID (Auth required)

module.exports = router;
